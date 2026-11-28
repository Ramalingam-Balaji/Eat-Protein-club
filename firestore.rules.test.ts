import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { doc, getDoc, getDocs, setDoc, updateDoc, collection, query, where, serverTimestamp } from 'firebase/firestore';
import fs from 'node:fs';

// Phase 0 Dirty Dozen Security Test Runner
export async function runDirtyDozenTests() {
  const testEnv = await initializeTestEnvironment({
    projectId: 'rosy-market-p4cnq',
    firestore: {
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    },
  });

  const userA = testEnv.authenticatedContext('userA', { email: 'userA@example.com', email_verified: true });
  const userB = testEnv.authenticatedContext('userB', { email: 'userB@example.com', email_verified: true });
  const spoofAdmin = testEnv.authenticatedContext('spoof', { email: 'ramalingambalaji54@gmail.com', email_verified: false });

  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'communities/build-muscle'), {
      id: 'build-muscle', slug: 'build-muscle', title: 'Build Muscle Community',
      description: 'Muscle gain community', goal: 'Build Muscle', status: 'active',
      membersCount: 10, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
    await setDoc(doc(db, 'users/userA/private/info'), {
      uid: 'userA', fullName: 'User A', email: 'userA@example.com', mobile: '+919999999999', updatedAt: serverTimestamp(),
    });
    await setDoc(doc(db, 'posts/post1'), {
      id: 'post1', communityId: 'build-muscle', communitySlug: 'build-muscle',
      authorId: 'userA', authorName: 'User A', category: 'Progress', text: 'Day 1',
      likesCount: 0, commentsCount: 0, status: 'published', isPinned: false,
      createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
    await setDoc(doc(db, 'communitySuggestions/sug1'), {
      id: 'sug1', uid: 'userA', communityName: 'Running', audience: 'Individuals',
      goal: 'Fitness', reason: 'Runners need protein tips', status: 'rejected',
      createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
  });

  // 1. Cross-user PII read -> DENIED
  await assertFails(getDoc(doc(userB.firestore(), 'users/userA/private/info')));
  // 2. Privilege escalation on /admins -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'admins/userA'), { uid: 'userA', email: 'userA@example.com', role: 'super_admin', createdAt: serverTimestamp() }));
  // 3. Unverified admin email spoof -> DENIED
  await assertFails(setDoc(doc(spoofAdmin.firestore(), 'communities/spoof'), { id: 'spoof', slug: 'spoof', title: 'Spoof', description: 'Spoof', goal: 'Build Muscle', status: 'active', membersCount: 0, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 4. Shadow field on user profile -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'users/userA'), { uid: 'userA', displayName: 'A', goal: 'Build Muscle', dailyProteinTarget: 90, points: 0, coins: 0, status: 'active', isVerifiedAdmin: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 5. Role self-elevation on community join -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'communities/build-muscle/members/userA'), { uid: 'userA', communityId: 'build-muscle', displayName: 'A', role: 'moderator', status: 'active', joinedAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 6. Author spoofing on post -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'posts/post2'), { id: 'post2', communityId: 'build-muscle', communitySlug: 'build-muscle', authorId: 'userB', authorName: 'B', category: 'Progress', text: 'Fake', likesCount: 0, commentsCount: 0, status: 'published', isPinned: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 7. Orphaned post creation -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'posts/post3'), { id: 'post3', communityId: 'missing-comm', communitySlug: 'missing-comm', authorId: 'userA', authorName: 'A', category: 'Progress', text: 'Orphan', likesCount: 0, commentsCount: 0, status: 'published', isPinned: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 8. Blanket list scraping on reports -> DENIED
  await assertFails(getDocs(collection(userA.firestore(), 'reports')));
  // 9. Client timestamp forgery -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), 'posts/post4'), { id: 'post4', communityId: 'build-muscle', communitySlug: 'build-muscle', authorId: 'userA', authorName: 'A', category: 'Progress', text: 'Old', likesCount: 0, commentsCount: 0, status: 'published', isPinned: false, createdAt: new Date('2020-01-01'), updatedAt: serverTimestamp() }));
  // 10. ID Poisoning -> DENIED
  await assertFails(setDoc(doc(userA.firestore(), `posts/${'x'.repeat(200)}`), { id: 'x'.repeat(200), communityId: 'build-muscle', communitySlug: 'build-muscle', authorId: 'userA', authorName: 'A', category: 'Progress', text: 'Long', likesCount: 0, commentsCount: 0, status: 'published', isPinned: false, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
  // 11. Terminal state bypass on suggestion -> DENIED
  await assertFails(updateDoc(doc(userA.firestore(), 'communitySuggestions/sug1'), { status: 'pending', updatedAt: serverTimestamp() }));
  // 12. Member mutating post pin/likes arbitrarily -> DENIED
  await assertFails(updateDoc(doc(userA.firestore(), 'posts/post1'), { isPinned: true, likesCount: 9999, updatedAt: serverTimestamp() }));

  // Positive control check
  await assertSucceeds(getDocs(query(collection(userA.firestore(), 'reports'), where('reporterId', '==', 'userA'))));

  await testEnv.cleanup();
}
