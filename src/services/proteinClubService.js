import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";
import {
  communities as seedCommunities,
  defaultChallenges,
  defaultEvents,
  defaultRewards,
} from "../pages/ProteinClub/data/communities";
import { communityPosts as seedPostsBySlug } from "../pages/ProteinClub/data/communityPosts";

// Sanitize helpers enforcing blueprint volumetric constraints
export const clampStr = (val, maxLen) =>
  typeof val === "string" ? val.trim().slice(0, maxLen) : "";

export const clampId = (val) =>
  String(val || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 128) || `id_${Date.now()}`;

export const clampUrl = (val) => {
  if (typeof val !== "string") return "";
  const trimmed = val.trim();
  if (!trimmed || trimmed.startsWith("data:") || trimmed.length > 500) {
    return "";
  }
  return trimmed;
};

export const VALID_GOALS = [
  "Build Muscle",
  "Lose Fat",
  "Improve Health",
  "Family Nutrition",
  "Eat More Protein",
  "Stay Active",
];

export const VALID_DIETS = [
  "Veg",
  "Vegetarian",
  "Non-Veg",
  "Non-Vegetarian",
  "Eggetarian",
  "Egg & Dairy",
  "Vegan",
  "Any",
];

export function calculateProteinNeed({
  weightKg = 69,
  goal = "Build Muscle",
  activityLevel = "Moderately Active",
}) {
  const safeWeight = Math.max(25, Math.min(250, Number(weightKg) || 69));

  let baseFactor = 1.0;
  if (goal === "Build Muscle") baseFactor = 1.6;
  else if (goal === "Lose Fat") baseFactor = 1.4;
  else if (goal === "Stay Active") baseFactor = 1.3;
  else if (goal === "Eat More Protein") baseFactor = 1.25;
  else if (goal === "Family Nutrition" || goal === "Improve Health") baseFactor = 1.1;

  let activityMult = 1.0;
  if (activityLevel.toLowerCase().includes("sedentary")) activityMult = 0.85;
  else if (activityLevel.toLowerCase().includes("light")) activityMult = 0.95;
  else if (activityLevel.toLowerCase().includes("moderate")) activityMult = 1.0;
  else if (activityLevel.toLowerCase().includes("very")) activityMult = 1.15;

  const gramsPerKg = Number(Math.min(2.4, Math.max(0.8, baseFactor * activityMult)).toFixed(1));
  const dailyGrams = Math.min(400, Math.max(25, Math.round(safeWeight * gramsPerKg)));

  return {
    dailyGrams,
    gramsPerKg,
    weeklyGrams: dailyGrams * 7,
    weightKg: safeWeight,
  };
}

// =====================================================
// ADMIN INITIAL CATALOG SEEDING
// =====================================================
export async function ensureDefaultCatalogSeeded() {
  try {
    const existingCommSnap = await getDocs(query(collection(db, "communities"), limit(1)));
    if (existingCommSnap.empty) {
      const batch = writeBatch(db);
      for (const c of seedCommunities) {
        const ref = doc(db, "communities", c.id);
        batch.set(ref, {
          id: c.id,
          slug: c.slug,
          title: clampStr(c.title, 120),
          shortTitle: clampStr(c.shortTitle, 80),
          badge: clampStr(c.badge, 60),
          official: Boolean(c.official),
          category: clampStr(c.category, 60),
          description: clampStr(c.description, 500),
          about: clampStr(c.about || c.description, 1200),
          goal: clampStr(c.goal, 60),
          diet: Array.isArray(c.diet) ? c.diet.slice(0, 10) : ["Any"],
          stage: Array.isArray(c.stage) ? c.stage.slice(0, 10) : ["Adults"],
          location: clampStr(c.location || "India", 80),
          heroImage: clampUrl(c.heroImage),
          membersCount: Number(c.membersCount) || 100,
          discussionsCount: Number(c.discussionsCount) || 10,
          challengesCount: Number(c.challengesCount) || 1,
          status: "active",
          started: clampStr(c.started || "Jan 2026", 40),
          benefits: Array.isArray(c.benefits) ? c.benefits.slice(0, 10) : [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      for (const ch of defaultChallenges) {
        batch.set(doc(db, "challenges", ch.id), {
          id: ch.id,
          title: clampStr(ch.title, 120),
          subtitle: clampStr(ch.subtitle, 300),
          communityId: ch.communityId,
          durationDays: Number(ch.durationDays) || 21,
          goal: clampStr(ch.goal || "Build Muscle", 60),
          participantsCount: Number(ch.participantsCount) || 100,
          rewardPoints: Number(ch.rewardPoints) || 100,
          rewardCoins: Number(ch.rewardCoins) || 50,
          status: "active",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      for (const rw of defaultRewards) {
        batch.set(doc(db, "rewards", rw.id), {
          id: rw.id,
          title: clampStr(rw.title, 120),
          description: clampStr(rw.description, 300),
          category: clampStr(rw.category, 60),
          coinsCost: Number(rw.coinsCost) || 500,
          codePrefix: clampStr(rw.codePrefix || "EP", 20),
          status: "active",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      for (const ev of defaultEvents) {
        batch.set(doc(db, "events", ev.id), {
          id: ev.id,
          title: clampStr(ev.title, 140),
          communityId: ev.communityId,
          communityTitle: clampStr(ev.communityTitle, 120),
          hostName: clampStr(ev.hostName, 80),
          dateLabel: clampStr(ev.dateLabel, 60),
          timeLabel: clampStr(ev.timeLabel, 60),
          type: ev.type || "Webinar",
          description: clampStr(ev.description, 500),
          rsvpCount: Number(ev.rsvpCount) || 50,
          status: "upcoming",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      await batch.commit();
    }
    return true;
  } catch (err) {
    console.warn("Catalog seed skipped or deferred:", err);
    return false;
  }
}

// =====================================================
// COMMUNITIES & MEMBERSHIPS
// =====================================================
export async function fetchCommunities(includePaused = false) {
  try {
    const q = includePaused
      ? query(collection(db, "communities"))
      : query(collection(db, "communities"), where("status", "==", "active"));
    const snap = await getDocs(q);
    if (snap.empty) {
      return seedCommunities.map((c) => ({ ...c, _seededFallback: true }));
    }
    const docs = snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
    docs.sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0));
    return docs;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "communities");
  }
}

export async function fetchCommunityBySlug(slug) {
  try {
    const cleanSlug = clampId(slug);
    const directRef = doc(db, "communities", cleanSlug);
    const directSnap = await getDoc(directRef);
    if (directSnap.exists()) {
      return { id: directSnap.id, ...directSnap.data(), _fromFirestore: true };
    }

    const q = query(
      collection(db, "communities"),
      where("slug", "==", cleanSlug),
      where("status", "==", "active"),
      limit(1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...d.data(), _fromFirestore: true };
    }
  } catch (err) {
    console.warn("Community Firestore fetch fallback:", err);
  }
  const fallback = seedCommunities.find((c) => c.slug === slug || c.id === slug);
  return fallback ? { ...fallback, _seededFallback: true } : null;
}

export async function getUserJoinedCommunities(uid, allCommunities = []) {
  if (!uid) return [];
  const joinedIds = [];
  const sourceList = allCommunities.length > 0 ? allCommunities : seedCommunities;
  try {
    await Promise.all(
      sourceList.map(async (comm) => {
        try {
          const memberSnap = await getDoc(doc(db, "communities", comm.id, "members", uid));
          if (memberSnap.exists()) {
            joinedIds.push(comm.id);
          }
        } catch {
          // ignore unseeded community docs
        }
      })
    );
    return joinedIds;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `communities/*/members/${uid}`);
  }
}

export async function joinCommunity({ community, user, profile }) {
  if (!user || !community) return { joined: false };
  const path = `communities/${community.id}/members/${user.uid}`;
  try {
    const commRef = doc(db, "communities", community.id);
    const commSnap = await getDoc(commRef);
    if (!commSnap.exists()) {
      throw new Error(
        "Community catalog is awaiting initial database activation. Ask admin or sign in as admin once to initialize communities."
      );
    }
    const memberRef = doc(db, "communities", community.id, "members", user.uid);
    const existingMember = await getDoc(memberRef);
    if (existingMember.exists()) {
      return { joined: true, alreadyMember: true };
    }

    await setDoc(memberRef, {
      uid: user.uid,
      communityId: community.id,
      displayName: clampStr(profile?.displayName || user.displayName || "Member", 80),
      photoURL: clampUrl(profile?.photoURL || user.photoURL || ""),
      role: "member",
      status: "active",
      joinedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const currentMembers = Number(commSnap.data().membersCount || 0);
    await updateDoc(commRef, {
      membersCount: currentMembers + 1,
      updatedAt: serverTimestamp(),
    });

    if (profile) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        joinedCommunitiesCount: Math.min(200, Number(profile.joinedCommunitiesCount || 0) + 1),
        updatedAt: serverTimestamp(),
      });
    }

    return { joined: true };
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function leaveCommunity({ community, user, profile }) {
  if (!user || !community) return { joined: true };
  const path = `communities/${community.id}/members/${user.uid}`;
  try {
    const memberRef = doc(db, "communities", community.id, "members", user.uid);
    await deleteDoc(memberRef);

    const commRef = doc(db, "communities", community.id);
    const commSnap = await getDoc(commRef);
    if (commSnap.exists()) {
      const currentMembers = Math.max(0, Number(commSnap.data().membersCount || 1) - 1);
      await updateDoc(commRef, {
        membersCount: currentMembers,
        updatedAt: serverTimestamp(),
      });
    }

    if (profile) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        joinedCommunitiesCount: Math.max(0, Number(profile.joinedCommunitiesCount || 1) - 1),
        updatedAt: serverTimestamp(),
      });
    }
    return { joined: false };
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export async function fetchCommunityMembers(communityId) {
  const path = `communities/${communityId}/members`;
  try {
    const q = query(
      collection(db, "communities", communityId, "members"),
      where("status", "==", "active"),
      limit(20)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// =====================================================
// POSTS, COMMENTS & INTERACTIONS
// =====================================================
export async function fetchPostsByCommunity(communityId, slug) {
  const path = "posts";
  try {
    const q = query(
      collection(db, "posts"),
      where("communityId", "==", communityId),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(40)
    );
    const snap = await getDocs(q);
    const fsPosts = snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
    if (fsPosts.length > 0) {
      return fsPosts.sort((a, b) => Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned)));
    }
  } catch (err) {
    if (err?.message?.includes("index")) {
      // Fallback query without composite orderBy if index isn't built yet
      try {
        const simpleQ = query(
          collection(db, "posts"),
          where("communityId", "==", communityId),
          where("status", "==", "published"),
          limit(40)
        );
        const snap2 = await getDocs(simpleQ);
        const fsPosts = snap2.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
        if (fsPosts.length > 0) return fsPosts;
      } catch (innerErr) {
        handleFirestoreError(innerErr, OperationType.LIST, path);
      }
    } else {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  }

  return (seedPostsBySlug[slug] || []).map((p) => ({ ...p, _seededFallback: true }));
}

export async function fetchRecentFeedPosts(limitCount = 6) {
  try {
    const q = query(
      collection(db, "posts"),
      where("status", "==", "published"),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
    }
  } catch (err) {
    console.warn("Recent posts fetch skipped:", err);
  }
  return [
    ...(seedPostsBySlug["build-muscle"] || []),
    ...(seedPostsBySlug["weight-management"] || []),
  ].slice(0, limitCount);
}

export async function createPost({
  communityId,
  communitySlug,
  user,
  profile,
  category = "Progress",
  text,
  tags = [],
  imageUrl = "",
  pollOptions = [],
}) {
  const postId = `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const path = `posts/${postId}`;
  try {
    const commSnap = await getDoc(doc(db, "communities", communityId));
    if (!commSnap.exists()) {
      throw new Error("Community not initialized in database yet.");
    }

    const allowedCategories = ["Progress", "Questions", "Tips", "Recipes", "Workouts", "Poll"];
    const safeCategory = allowedCategories.includes(category) ? category : "Progress";

    const payload = {
      id: postId,
      communityId,
      communitySlug: clampId(communitySlug || communityId),
      authorId: user.uid,
      authorName: clampStr(profile?.displayName || user.displayName || "Member", 80),
      authorAvatar: clampUrl(profile?.photoURL || user.photoURL || ""),
      authorRole: clampStr(profile?.rankBadge || "Member", 40),
      category: safeCategory,
      text: clampStr(text, 2000),
      tags: Array.isArray(tags) ? tags.slice(0, 10).map((t) => clampStr(t, 40)).filter(Boolean) : [],
      imageUrl: clampUrl(imageUrl),
      pollOptions: Array.isArray(pollOptions)
        ? pollOptions.slice(0, 6).map((o) => clampStr(o, 80)).filter(Boolean)
        : [],
      likesCount: 0,
      commentsCount: 0,
      status: "published",
      isPinned: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "posts", postId), payload);

    // Increment discussionsCount
    const currentDiscussions = Number(commSnap.data().discussionsCount || 0);
    await updateDoc(doc(db, "communities", communityId), {
      discussionsCount: currentDiscussions + 1,
      updatedAt: serverTimestamp(),
    });

    // Award +50 Protein Points & +10 Protein Coins
    if (profile) {
      await updateDoc(doc(db, "users", user.uid), {
        points: Math.min(1000000, Number(profile.points || 0) + 50),
        coins: Math.min(1000000, Number(profile.coins || 0) + 10),
        updatedAt: serverTimestamp(),
      });
    }

    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function toggleLikePost({ post, user }) {
  if (!user || !post?._fromFirestore) return null;
  const path = `posts/${post.id}/likes/${user.uid}`;
  try {
    const likeRef = doc(db, "posts", post.id, "likes", user.uid);
    const likeSnap = await getDoc(likeRef);
    const postRef = doc(db, "posts", post.id);
    const postSnap = await getDoc(postRef);
    const currentLikes = postSnap.exists() ? Number(postSnap.data().likesCount || 0) : 0;

    if (likeSnap.exists()) {
      await deleteDoc(likeRef);
      await updateDoc(postRef, {
        likesCount: Math.max(0, currentLikes - 1),
        updatedAt: serverTimestamp(),
      });
      return { liked: false, likesCount: Math.max(0, currentLikes - 1) };
    } else {
      await setDoc(likeRef, {
        uid: user.uid,
        postId: post.id,
        createdAt: serverTimestamp(),
      });
      await updateDoc(postRef, {
        likesCount: currentLikes + 1,
        updatedAt: serverTimestamp(),
      });
      return { liked: true, likesCount: currentLikes + 1 };
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchCommentsByPost(postId) {
  const path = `posts/${postId}/comments`;
  try {
    const q = query(
      collection(db, "posts", postId, "comments"),
      where("status", "==", "published"),
      limit(50)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function addComment({ postId, user, profile, text, parentCommentId = "" }) {
  const commentId = `cmt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `posts/${postId}/comments/${commentId}`;
  try {
    const commentData = {
      id: commentId,
      postId,
      authorId: user.uid,
      authorName: clampStr(profile?.displayName || user.displayName || "Member", 80),
      authorAvatar: clampUrl(profile?.photoURL || user.photoURL || ""),
      parentCommentId: clampStr(parentCommentId, 128),
      text: clampStr(text, 1000),
      likesCount: 0,
      status: "published",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "posts", postId, "comments", commentId), commentData);

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      await updateDoc(postRef, {
        commentsCount: Number(postSnap.data().commentsCount || 0) + 1,
        updatedAt: serverTimestamp(),
      });
    }

    if (profile) {
      await updateDoc(doc(db, "users", user.uid), {
        points: Math.min(1000000, Number(profile.points || 0) + 20),
        updatedAt: serverTimestamp(),
      });
    }
    return commentData;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function toggleSavePost({ user, postId, communitySlug }) {
  if (!user) return false;
  const path = `users/${user.uid}/savedPosts/${postId}`;
  try {
    const cleanPostId = clampId(postId);
    const ref = doc(db, "users", user.uid, "savedPosts", cleanPostId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      await deleteDoc(ref);
      return false;
    } else {
      await setDoc(ref, {
        uid: user.uid,
        postId: cleanPostId,
        communitySlug: clampStr(communitySlug || "", 100),
        savedAt: serverTimestamp(),
      });
      return true;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchSavedPostIds(uid) {
  if (!uid) return [];
  const path = `users/${uid}/savedPosts`;
  try {
    const snap = await getDocs(
      query(collection(db, "users", uid, "savedPosts"), where("uid", "==", uid))
    );
    return snap.docs.map((d) => d.id);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function blockUser({ user, blockedUid, blockedName }) {
  if (!user || !blockedUid) return;
  const cleanBlocked = clampId(blockedUid);
  const path = `users/${user.uid}/blockedUsers/${cleanBlocked}`;
  try {
    await setDoc(doc(db, "users", user.uid, "blockedUsers", cleanBlocked), {
      uid: user.uid,
      blockedUid: cleanBlocked,
      blockedName: clampStr(blockedName || "Member", 80),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchBlockedUserIds(uid) {
  if (!uid) return [];
  const path = `users/${uid}/blockedUsers`;
  try {
    const snap = await getDocs(
      query(collection(db, "users", uid, "blockedUsers"), where("uid", "==", uid))
    );
    return snap.docs.map((d) => d.id);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function submitReport({
  user,
  profile,
  targetType,
  targetId,
  communityId = "",
  reason,
}) {
  const reportId = `rep_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `reports/${reportId}`;
  try {
    await setDoc(doc(db, "reports", reportId), {
      id: reportId,
      reporterId: user.uid,
      reporterName: clampStr(profile?.displayName || user.displayName || "Member", 80),
      targetType: ["post", "comment", "member"].includes(targetType) ? targetType : "post",
      targetId: clampId(targetId),
      communityId: clampStr(communityId, 128),
      reason: clampStr(reason, 500),
      status: "pending",
      adminNotes: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return reportId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

// =====================================================
// CHALLENGES & PROGRESS
// =====================================================
export async function fetchChallenges(includeArchived = false) {
  try {
    const q = includeArchived
      ? query(collection(db, "challenges"))
      : query(collection(db, "challenges"), where("status", "==", "active"));
    const snap = await getDocs(q);
    if (snap.empty) {
      return defaultChallenges.map((c) => ({ ...c, _seededFallback: true }));
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "challenges");
  }
}

export async function fetchChallengeParticipation(challengeId, uid) {
  if (!uid) return null;
  const path = `challenges/${challengeId}/participants/${uid}`;
  try {
    const snap = await getDoc(doc(db, "challenges", challengeId, "participants", uid));
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

export async function fetchChallengeLeaderboard(challengeId) {
  const path = `challenges/${challengeId}/participants`;
  try {
    const q = query(
      collection(db, "challenges", challengeId, "participants"),
      where("challengeId", "==", challengeId),
      limit(15)
    );
    const snap = await getDocs(q);
    const rows = snap.docs.map((d) => d.data());
    rows.sort((a, b) => (b.pointsEarned || 0) - (a.pointsEarned || 0));
    return rows;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function joinChallenge({ challengeId, user, profile }) {
  const path = `challenges/${challengeId}/participants/${user.uid}`;
  try {
    const chRef = doc(db, "challenges", challengeId);
    const chSnap = await getDoc(chRef);
    if (!chSnap.exists()) {
      throw new Error("Challenge catalog is not initialized in Firestore yet.");
    }

    const partRef = doc(db, "challenges", challengeId, "participants", user.uid);
    const existingSnap = await getDoc(partRef);
    if (existingSnap.exists()) return existingSnap.data();

    const data = {
      uid: user.uid,
      challengeId,
      displayName: clampStr(profile?.displayName || user.displayName || "Member", 80),
      currentDay: 1,
      completedDays: [],
      streak: 0,
      pointsEarned: 100,
      coinsEarned: 25,
      status: "in_progress",
      joinedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(partRef, data);

    await updateDoc(chRef, {
      participantsCount: Number(chSnap.data().participantsCount || 0) + 1,
      updatedAt: serverTimestamp(),
    });

    if (profile) {
      await updateDoc(doc(db, "users", user.uid), {
        points: Math.min(1000000, Number(profile.points || 0) + 100),
        coins: Math.min(1000000, Number(profile.coins || 0) + 25),
        activeChallengesCount: Math.min(100, Number(profile.activeChallengesCount || 0) + 1),
        updatedAt: serverTimestamp(),
      });
    }

    return data;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function completeChallengeDay({ challengeId, dayNumber, user, profile }) {
  const path = `challenges/${challengeId}/participants/${user.uid}`;
  try {
    const partRef = doc(db, "challenges", challengeId, "participants", user.uid);
    const snap = await getDoc(partRef);
    if (!snap.exists()) {
      throw new Error("Join the challenge first before marking a day complete.");
    }
    const existingData = snap.data();
    const prevDays = Array.isArray(existingData.completedDays) ? existingData.completedDays : [];
    if (prevDays.includes(dayNumber)) {
      return existingData;
    }

    const updatedDays = [...prevDays, dayNumber].sort((a, b) => a - b);
    const newStreak = Number(existingData.streak || 0) + 1;
    const isStreakBonus = newStreak > 0 && newStreak % 7 === 0;
    const pointsAward = dayNumber === 21 || isStreakBonus ? 500 : 100;
    const coinsAward = dayNumber === 21 || isStreakBonus ? 100 : 30;
    const nextDay = Math.min(21, Math.max(Number(existingData.currentDay || 1), dayNumber + 1));
    const newStatus = updatedDays.length >= 21 ? "completed" : "in_progress";

    const updatePayload = {
      currentDay: nextDay,
      completedDays: updatedDays,
      streak: newStreak,
      pointsEarned: Math.min(100000, Number(existingData.pointsEarned || 0) + pointsAward),
      coinsEarned: Math.min(100000, Number(existingData.coinsEarned || 0) + coinsAward),
      status: newStatus,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(partRef, updatePayload);

    if (profile) {
      await updateDoc(doc(db, "users", user.uid), {
        points: Math.min(1000000, Number(profile.points || 0) + pointsAward),
        coins: Math.min(1000000, Number(profile.coins || 0) + coinsAward),
        streak: Math.max(Number(profile.streak || 0), newStreak),
        updatedAt: serverTimestamp(),
      });
    }

    return {
      ...existingData,
      ...updatePayload,
      pointsAward,
      coinsAward,
      isStreakBonus,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// =====================================================
// DAILY PROTEIN LOGGING
// =====================================================
export async function logProteinIntake({ user, profile, mealName, proteinGrams, notes = "" }) {
  const logId = `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `users/${user.uid}/proteinLogs/${logId}`;
  const todayStr = new Date().toISOString().slice(0, 10);
  const grams = Math.max(1, Math.min(250, Math.round(Number(proteinGrams) || 15)));

  try {
    const logData = {
      id: logId,
      uid: user.uid,
      date: todayStr,
      mealName: clampStr(mealName, 120),
      proteinGrams: grams,
      notes: clampStr(notes, 300),
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", user.uid, "proteinLogs", logId), logData);

    const newTodayTotal = Math.min(500, Number(profile?.todayProtein || 0) + grams);
    await updateDoc(doc(db, "users", user.uid), {
      todayProtein: newTodayTotal,
      points: Math.min(1000000, Number(profile?.points || 0) + 20),
      coins: Math.min(1000000, Number(profile?.coins || 0) + 10),
      updatedAt: serverTimestamp(),
    });

    return { logData, newTodayTotal };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchProteinLogs(uid) {
  if (!uid) return [];
  const path = `users/${uid}/proteinLogs`;
  try {
    const q = query(
      collection(db, "users", uid, "proteinLogs"),
      where("uid", "==", uid),
      limit(30)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// =====================================================
// LEADERBOARD & REWARDS
// =====================================================
export async function fetchLeaderboardUsers() {
  const path = "users";
  try {
    const q = query(
      collection(db, "users"),
      where("status", "in", ["active", "warned", "restricted"]),
      limit(30)
    );
    const snap = await getDocs(q);
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    rows.sort((a, b) => (b.points || 0) - (a.points || 0));
    return rows;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function fetchRewards(includePaused = false) {
  const path = "rewards";
  try {
    const q = includePaused
      ? query(collection(db, "rewards"))
      : query(collection(db, "rewards"), where("status", "==", "active"));
    const snap = await getDocs(q);
    if (snap.empty) {
      return defaultRewards.map((r) => ({ ...r, _seededFallback: true }));
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function redeemReward({ reward, user, profile }) {
  const redemptionId = `rdm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `redemptions/${redemptionId}`;
  const currentCoins = Number(profile?.coins || 0);
  const cost = Number(reward.coinsCost || 0);
  if (currentCoins < cost) {
    throw new Error(`You need ${cost - currentCoins} more Protein Coins to redeem this reward.`);
  }

  try {
    const couponCode = `${reward.codePrefix || "EP"}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    const redemptionDoc = {
      id: redemptionId,
      uid: user.uid,
      rewardId: clampId(reward.id),
      rewardTitle: clampStr(reward.title, 120),
      coinsSpent: cost,
      couponCode,
      status: "issued",
      redeemedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "redemptions", redemptionId), redemptionDoc);
    await updateDoc(doc(db, "users", user.uid), {
      coins: Math.max(0, currentCoins - cost),
      updatedAt: serverTimestamp(),
    });

    return redemptionDoc;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchUserRedemptions(uid) {
  if (!uid) return [];
  const path = "redemptions";
  try {
    const q = query(collection(db, "redemptions"), where("uid", "==", uid), limit(25));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// =====================================================
// EVENTS & RSVPS
// =====================================================
export async function fetchEvents(includeAll = false) {
  const path = "events";
  try {
    const q = includeAll
      ? query(collection(db, "events"))
      : query(collection(db, "events"), where("status", "==", "upcoming"));
    const snap = await getDocs(q);
    if (snap.empty) {
      return defaultEvents.map((e) => ({ ...e, _seededFallback: true }));
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export async function toggleEventRsvp({ eventItem, user, profile }) {
  const path = `events/${eventItem.id}/rsvps/${user.uid}`;
  try {
    const eventRef = doc(db, "events", eventItem.id);
    const eventSnap = await getDoc(eventRef);
    if (!eventSnap.exists()) {
      throw new Error("Events catalog is awaiting admin initialization.");
    }

    const rsvpRef = doc(db, "events", eventItem.id, "rsvps", user.uid);
    const rsvpSnap = await getDoc(rsvpRef);
    const currentRsvps = Number(eventSnap.data().rsvpCount || 0);

    if (rsvpSnap.exists()) {
      await deleteDoc(rsvpRef);
      await updateDoc(eventRef, {
        rsvpCount: Math.max(0, currentRsvps - 1),
        updatedAt: serverTimestamp(),
      });
      return { registered: false, rsvpCount: Math.max(0, currentRsvps - 1) };
    } else {
      await setDoc(rsvpRef, {
        uid: user.uid,
        eventId: eventItem.id,
        displayName: clampStr(profile?.displayName || user.displayName || "Member", 80),
        createdAt: serverTimestamp(),
      });
      await updateDoc(eventRef, {
        rsvpCount: currentRsvps + 1,
        updatedAt: serverTimestamp(),
      });
      return { registered: true, rsvpCount: currentRsvps + 1 };
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function fetchUserRsvpIds(uid, eventsList = []) {
  if (!uid) return [];
  const list = eventsList.length > 0 ? eventsList : defaultEvents;
  const rsvpIds = [];
  await Promise.all(
    list.map(async (ev) => {
      try {
        const snap = await getDoc(doc(db, "events", ev.id, "rsvps", uid));
        if (snap.exists()) rsvpIds.push(ev.id);
      } catch {
        // ignore unseeded
      }
    })
  );
  return rsvpIds;
}

// =====================================================
// SUGGESTIONS & LEADER APPLICATIONS
// =====================================================
export async function submitCommunitySuggestion({ user, data }) {
  const suggestionId = `sug_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `communitySuggestions/${suggestionId}`;
  try {
    await setDoc(doc(db, "communitySuggestions", suggestionId), {
      id: suggestionId,
      uid: user.uid,
      communityName: clampStr(data.communityName, 120),
      audience: clampStr(data.audience, 60),
      goal: clampStr(data.goal, 60),
      diet: clampStr(data.diet || "Any", 40),
      reason: clampStr(data.reason, 1000),
      useCase: clampStr(data.useCase || "", 1000),
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return suggestionId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function submitLeaderApplication({ user, data }) {
  const applicationId = `ldr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const path = `leaderApplications/${applicationId}`;
  try {
    await setDoc(doc(db, "leaderApplications", applicationId), {
      id: applicationId,
      uid: user.uid,
      fullName: clampStr(data.fullName, 100),
      city: clampStr(data.city, 80),
      occupation: clampStr(data.occupation, 80),
      experience: clampStr(data.experience || "", 300),
      interest: clampStr(data.interest, 120),
      reason: clampStr(data.reason, 1500),
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return applicationId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

// =====================================================
// ADMIN FUNCTIONS
// =====================================================
export async function adminCreateCommunity(data) {
  const slug = clampId(data.slug || data.title.toLowerCase());
  const path = `communities/${slug}`;
  try {
    await setDoc(doc(db, "communities", slug), {
      id: slug,
      slug,
      title: clampStr(data.title, 120),
      shortTitle: clampStr(data.shortTitle || data.title, 80),
      badge: clampStr(data.badge || "EatProtein Official", 60),
      official: Boolean(data.official ?? true),
      category: clampStr(data.category || "Goal Based", 60),
      description: clampStr(data.description, 500),
      about: clampStr(data.about || data.description, 1200),
      goal: clampStr(data.goal || "Build Muscle", 60),
      diet: Array.isArray(data.diet) ? data.diet : ["Any"],
      stage: Array.isArray(data.stage) ? data.stage : ["Adults"],
      location: clampStr(data.location || "India", 80),
      heroImage: clampUrl(data.heroImage),
      membersCount: Number(data.membersCount || 1),
      discussionsCount: Number(data.discussionsCount || 0),
      challengesCount: Number(data.challengesCount || 0),
      status: "active",
      started: "Apr 2026",
      benefits: ["Expert Guidance", "Community Support", "Meal Ideas"],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return slug;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function adminUpdateCommunityStatus(communityId, status) {
  const path = `communities/${communityId}`;
  try {
    await updateDoc(doc(db, "communities", communityId), {
      status: status === "paused" ? "paused" : "active",
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminFetchAllMembers() {
  try {
    const snap = await getDocs(query(collection(db, "users"), limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "users");
  }
}

export async function adminUpdateMemberStatus(uid, status) {
  const path = `users/${uid}`;
  try {
    await updateDoc(doc(db, "users", uid), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminFetchAllPosts() {
  try {
    const snap = await getDocs(query(collection(db, "posts"), limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data(), _fromFirestore: true }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "posts");
  }
}

export async function adminModeratePost(postId, updates) {
  const path = `posts/${postId}`;
  try {
    await updateDoc(doc(db, "posts", postId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminDeletePost(postId) {
  const path = `posts/${postId}`;
  try {
    await deleteDoc(doc(db, "posts", postId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export async function adminCreateChallenge(data) {
  const id = clampId(data.title.toLowerCase() + "-" + Date.now().toString().slice(-4));
  const path = `challenges/${id}`;
  try {
    await setDoc(doc(db, "challenges", id), {
      id,
      title: clampStr(data.title, 120),
      subtitle: clampStr(data.subtitle, 300),
      communityId: clampStr(data.communityId || "build-muscle", 128),
      durationDays: Math.max(1, Math.min(365, Number(data.durationDays) || 21)),
      goal: clampStr(data.goal || "Build Muscle", 60),
      participantsCount: 0,
      rewardPoints: Number(data.rewardPoints || 100),
      rewardCoins: Number(data.rewardCoins || 50),
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function adminUpdateChallengeStatus(challengeId, status) {
  const path = `challenges/${challengeId}`;
  try {
    await updateDoc(doc(db, "challenges", challengeId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminCreateEvent(data) {
  const id = `evt_${Date.now().toString().slice(-6)}`;
  const path = `events/${id}`;
  try {
    await setDoc(doc(db, "events", id), {
      id,
      title: clampStr(data.title, 140),
      communityId: clampStr(data.communityId || "build-muscle", 128),
      communityTitle: clampStr(data.communityTitle || "Build Muscle Community", 120),
      hostName: clampStr(data.hostName || "EatProtein Coach", 80),
      dateLabel: clampStr(data.dateLabel, 60),
      timeLabel: clampStr(data.timeLabel || "7:00 PM IST", 60),
      type: ["Webinar", "Meetup", "Workshop"].includes(data.type) ? data.type : "Webinar",
      description: clampStr(data.description || "", 500),
      rsvpCount: 0,
      status: "upcoming",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function adminFetchReports() {
  try {
    const snap = await getDocs(query(collection(db, "reports"), limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "reports");
  }
}

export async function adminUpdateReportStatus(reportId, status, adminNotes = "") {
  const path = `reports/${reportId}`;
  try {
    await updateDoc(doc(db, "reports", reportId), {
      status,
      adminNotes: clampStr(adminNotes, 500),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminFetchSuggestions() {
  try {
    const snap = await getDocs(query(collection(db, "communitySuggestions"), limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "communitySuggestions");
  }
}

export async function adminReviewSuggestion(suggestion, decision) {
  const path = `communitySuggestions/${suggestion.id}`;
  try {
    await updateDoc(doc(db, "communitySuggestions", suggestion.id), {
      status: decision,
      updatedAt: serverTimestamp(),
    });

    if (decision === "approved") {
      await adminCreateCommunity({
        title: suggestion.communityName,
        description: suggestion.reason,
        goal: suggestion.goal,
        diet: [suggestion.diet || "Any"],
        category: "Community Requested",
        official: true,
        badge: "EatProtein Official",
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminFetchLeaderApplications() {
  try {
    const snap = await getDocs(query(collection(db, "leaderApplications"), limit(100)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, "leaderApplications");
  }
}

export async function adminReviewLeaderApplication(application, decision) {
  const path = `leaderApplications/${application.id}`;
  try {
    await updateDoc(doc(db, "leaderApplications", application.id), {
      status: decision,
      updatedAt: serverTimestamp(),
    });

    if (decision === "approved" && application.uid) {
      const userSnap = await getDoc(doc(db, "users", application.uid));
      if (userSnap.exists()) {
        await updateDoc(doc(db, "users", application.uid), {
          rankBadge: "Protein Leader",
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function adminCreateReward(data) {
  const id = `rw_${Date.now().toString().slice(-6)}`;
  const path = `rewards/${id}`;
  try {
    await setDoc(doc(db, "rewards", id), {
      id,
      title: clampStr(data.title, 120),
      description: clampStr(data.description, 300),
      category: clampStr(data.category || "Special Offer", 60),
      coinsCost: Math.max(1, Number(data.coinsCost) || 500),
      codePrefix: clampStr(data.codePrefix || "EP", 20),
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}
