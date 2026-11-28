import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

const ProteinClubAuthContext = createContext(null);

export function ProteinClubAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setUser(firebaseUser);

        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);

          setProfile(snap.exists() ? snap.data() : null);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Auth profile error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ProteinClubAuthContext.Provider
      value={{ user, profile, loading, setProfile }}
    >
      {children}
    </ProteinClubAuthContext.Provider>
  );
}

export function useProteinClubAuth() {
  const context = useContext(ProteinClubAuthContext);

  if (!context) {
    throw new Error(
      "useProteinClubAuth must be used inside ProteinClubAuthProvider"
    );
  }

  return context;
}