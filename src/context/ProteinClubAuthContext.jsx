import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from "../firebase";
import {
  clampStr,
  clampUrl,
  ensureDefaultCatalogSeeded,
  VALID_DIETS,
  VALID_GOALS,
} from "../services/proteinClubService";

const BOOTSTRAP_ADMIN_EMAIL = "ramalingambalaji54@gmail.com";

const ProteinClubAuthContext = createContext(null);

export function ProteinClubAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [privateInfo, setPrivateInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(Boolean(auth));
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 3800 ? null : prev));
    }, 4000);
  }, []);

  const hydrateUserDocs = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setProfile(null);
      setPrivateInfo(null);
      setIsAdmin(false);
      return null;
    }

    const emailMatch =
      firebaseUser.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL &&
      firebaseUser.emailVerified;

    let adminDocExists;
    try {
      const adminSnap = await getDoc(doc(db, "admins", firebaseUser.uid));
      adminDocExists = adminSnap.exists();
    } catch {
      adminDocExists = false;
    }

    const adminFlag = Boolean(emailMatch || adminDocExists);
    setIsAdmin(adminFlag);

    if (adminFlag) {
      ensureDefaultCatalogSeeded();
    }

    let pubData = null;
    try {
      const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
      pubData = userSnap.exists() ? userSnap.data() : null;
      setProfile(pubData);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
    }

    try {
      const privSnap = await getDoc(doc(db, "users", firebaseUser.uid, "private", "info"));
      setPrivateInfo(privSnap.exists() ? privSnap.data() : null);
    } catch {
      setPrivateInfo(null);
    }

    return pubData;
  }, []);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setUser(firebaseUser);
        await hydrateUserDocs(firebaseUser);
      } catch (err) {
        console.error("Auth state hydration error:", err);
      } finally {
        setAuthLoading(false);
      }
    });

    return unsubscribe;
  }, [hydrateUserDocs]);

  const refreshProfile = useCallback(async () => {
    if (auth.currentUser) {
      return hydrateUserDocs(auth.currentUser);
    }
    return null;
  }, [hydrateUserDocs]);

  const signInWithGoogle = useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const existingProfile = await hydrateUserDocs(result.user);
    return { user: result.user, hasProfile: Boolean(existingProfile) };
  }, [hydrateUserDocs]);

  const saveProfile = useCallback(
    async ({
      fullName,
      mobile = "",
      email = "",
      age = 30,
      gender = "Male",
      location = "Visakhapatnam, AP",
      dietPreference = "Non-Vegetarian",
      photoURL = "",
      goal = "Build Muscle",
      dailyProteinTarget = 90,
      heightCm = 165,
      weightKg = 69,
      activityLevel = "Moderately Active",
    }) => {
      const activeUser = auth.currentUser;
      if (!activeUser) {
        throw new Error("Please sign in first to save your profile.");
      }

      const safeGoal = VALID_GOALS.includes(goal) ? goal : "Build Muscle";
      const safeDiet = VALID_DIETS.includes(dietPreference) ? dietPreference : "Non-Vegetarian";
      const cleanName = clampStr(fullName || activeUser.displayName || "EatProtein Member", 80);
      const cleanPhoto = clampUrl(photoURL || activeUser.photoURL || "");
      const safeTarget = Math.min(400, Math.max(20, Number(dailyProteinTarget) || 90));

      try {
        await updateProfile(activeUser, {
          displayName: cleanName,
          ...(cleanPhoto ? { photoURL: cleanPhoto } : {}),
        });
      } catch {
        // non-blocking
      }

      const publicRef = doc(db, "users", activeUser.uid);
      const existingSnap = await getDoc(publicRef);

      try {
        if (!existingSnap.exists()) {
          await setDoc(publicRef, {
            uid: activeUser.uid,
            displayName: cleanName,
            photoURL: cleanPhoto,
            location: clampStr(location, 100),
            goal: safeGoal,
            dietPreference: safeDiet,
            dailyProteinTarget: safeTarget,
            todayProtein: 0,
            streak: 0,
            points: 0,
            coins: 0,
            rankBadge: isAdmin ? "Super Admin" : "Protein Member",
            status: "active",
            joinedCommunitiesCount: 0,
            activeChallengesCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          await updateDoc(publicRef, {
            displayName: cleanName,
            photoURL: cleanPhoto,
            location: clampStr(location, 100),
            goal: safeGoal,
            dietPreference: safeDiet,
            dailyProteinTarget: safeTarget,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${activeUser.uid}`);
      }

      const privateRef = doc(db, "users", activeUser.uid, "private", "info");
      try {
        await setDoc(privateRef, {
          uid: activeUser.uid,
          fullName: clampStr(fullName || cleanName, 100),
          email: clampStr(email || activeUser.email || "", 160),
          mobile: clampStr(mobile || activeUser.phoneNumber || "", 20),
          age: Math.min(120, Math.max(1, Number(age) || 30)),
          gender: ["Male", "Female", "Other", ""].includes(gender) ? gender : "Other",
          heightCm: Math.min(260, Math.max(40, Number(heightCm) || 165)),
          weightKg: Math.min(350, Math.max(5, Number(weightKg) || 69)),
          activityLevel: clampStr(activityLevel, 60),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${activeUser.uid}/private/info`);
      }

      await hydrateUserDocs(activeUser);
    },
    [hydrateUserDocs, isAdmin]
  );

  const saveGoalAndTarget = useCallback(
    async ({
      goal,
      dailyProteinTarget,
      dietPreference,
      age,
      weightKg,
      heightCm,
      activityLevel,
    }) => {
      const activeUser = auth.currentUser;
      if (!activeUser) {
        throw new Error("Please sign in to save your protein goal.");
      }

      const safeGoal = VALID_GOALS.includes(goal) ? goal : "Build Muscle";
      const safeTarget = Math.min(400, Math.max(20, Math.round(Number(dailyProteinTarget) || 90)));
      const safeDiet = VALID_DIETS.includes(dietPreference)
        ? dietPreference
        : profile?.dietPreference || "Non-Vegetarian";

      const publicRef = doc(db, "users", activeUser.uid);
      const existingSnap = await getDoc(publicRef);

      try {
        if (!existingSnap.exists()) {
          await setDoc(publicRef, {
            uid: activeUser.uid,
            displayName: clampStr(activeUser.displayName || "EatProtein Member", 80),
            photoURL: clampUrl(activeUser.photoURL || ""),
            location: "India",
            goal: safeGoal,
            dietPreference: safeDiet,
            dailyProteinTarget: safeTarget,
            todayProtein: 0,
            streak: 0,
            points: 0,
            coins: 0,
            rankBadge: isAdmin ? "Super Admin" : "Protein Member",
            status: "active",
            joinedCommunitiesCount: 0,
            activeChallengesCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          await updateDoc(publicRef, {
            goal: safeGoal,
            dailyProteinTarget: safeTarget,
            dietPreference: safeDiet,
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${activeUser.uid}`);
      }

      const privRef = doc(db, "users", activeUser.uid, "private", "info");
      try {
        const privSnap = await getDoc(privRef);
        const existingPriv = privSnap.exists() ? privSnap.data() : {};
        await setDoc(privRef, {
          uid: activeUser.uid,
          fullName: clampStr(existingPriv.fullName || activeUser.displayName || "Member", 100),
          email: clampStr(existingPriv.email || activeUser.email || "", 160),
          mobile: clampStr(existingPriv.mobile || activeUser.phoneNumber || "", 20),
          age: Math.min(120, Math.max(1, Number(age || existingPriv.age || 30))),
          gender: existingPriv.gender || "Male",
          heightCm: Math.min(260, Math.max(40, Number(heightCm || existingPriv.heightCm || 165))),
          weightKg: Math.min(350, Math.max(5, Number(weightKg || existingPriv.weightKg || 69))),
          activityLevel: clampStr(activityLevel || existingPriv.activityLevel || "Moderately Active", 60),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${activeUser.uid}/private/info`);
      }

      await hydrateUserDocs(activeUser);
    },
    [hydrateUserDocs, isAdmin, profile]
  );

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
    setPrivateInfo(null);
    setIsAdmin(false);
    showToast("Signed out successfully.", "info");
  }, [showToast]);

  return (
    <ProteinClubAuthContext.Provider
      value={{
        user,
        profile,
        privateInfo,
        isAdmin,
        authLoading,
        loading: authLoading,
        setProfile,
        signInWithGoogle,
        saveProfile,
        saveGoalAndTarget,
        refreshProfile,
        logout,
        toast,
        showToast,
        clearToast: () => setToast(null),
      }}
    >
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-20 right-4 z-[9999] flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg transition-all sm:bottom-6 ${
            toast.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : toast.type === "info"
              ? "border-blue-200 bg-blue-50 text-blue-800"
              : "border-green-200 bg-protein-dark text-white"
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-2 text-xs font-bold opacity-80 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}
    </ProteinClubAuthContext.Provider>
  );
}

export function useProteinClubAuth() {
  const context = useContext(ProteinClubAuthContext);
  if (!context) {
    throw new Error("useProteinClubAuth must be used inside ProteinClubAuthProvider");
  }
  return context;
}