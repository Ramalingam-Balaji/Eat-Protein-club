# EatProtein Protein Club — Firestore Security Specification (Phase 0)

## 1. Data Invariants
1. **Default-Deny Net**: Any unmatched path inside `/databases/{database}/documents` is strictly denied for all reads and writes.
2. **PII Isolation**: Private personal details (`email`, `mobile`, `age`, `gender`, `heightCm`, `weightKg`) live exclusively in `/users/{uid}/private/info` and are readable/writable ONLY by `uid == request.auth.uid` or verified Admins (`isAdmin()`). Public `/users/{uid}` contains zero PII.
3. **Privilege & Role Integrity**: Normal users cannot create or update `/admins/{uid}`, cannot elevate `status` or `role` on `/communities/{communityId}/members/{uid}`, and cannot create/delete `/communities`, `/challenges`, `/rewards`, or `/events`.
4. **Master Gate & Relational Integrity**:
   - Creating a `/posts/{postId}` requires `exists(/databases/$(database)/documents/communities/$(incoming().communityId))` and `incoming().authorId == request.auth.uid`.
   - Creating a `/posts/{postId}/comments/{commentId}` or `/posts/{postId}/likes/{uid}` requires `exists(/databases/$(database)/documents/posts/$(postId))`.
   - Joining a community `/communities/{communityId}/members/{memberId}` requires `memberId == request.auth.uid`, `exists(community)`, and `role == 'member'` + `status == 'active'`.
   - Joining a challenge `/challenges/{challengeId}/participants/{uid}` requires `uid == request.auth.uid` and `exists(challenge)`.
   - Creating an RSVP `/events/{eventId}/rsvps/{uid}` requires `uid == request.auth.uid` and `exists(event)`.
5. **Terminal State Locking**: Reports (`resolved`, `dismissed`), Community Suggestions (`approved`, `rejected`), and Leader Applications (`approved`, `rejected`) cannot be updated by non-admins once they reach terminal state.
6. **Temporal Integrity**: All `createdAt` and `updatedAt` timestamps must match `request.time` on create/update, and `createdAt` + `uid`/`authorId`/`reporterId` are immutable after creation.
7. **Strict Shape & Size Guards**: Every document ID matches `^[a-zA-Z0-9_-]{1,128}$`, every string has an explicit `.size()` bound, every array is bounded (`<= 10` or `<= 21`), and every `create` enforces `hasAll` + `hasOnly` while every `update` enforces `affectedKeys().hasOnly(...)` inside an explicit `isValid[Entity]` check.

## 2. The "Dirty Dozen" Payloads (Adversarial Tests -> Must Return PERMISSION_DENIED)
1. **PII Cross-User Read**: Signed-in User B calls `get(/users/userA/private/info)` -> DENIED.
2. **Privilege Escalation on Admin Registry**: User A calls `set(/admins/userA, { uid: 'userA', email: 'userA@example.com', role: 'super_admin', createdAt: serverTimestamp() })` -> DENIED.
3. **Bootstrapped Email Spoofing**: Attacker signs in with `email: 'ramalingambalaji54@gmail.com'` and `email_verified: false` and tries to create `/communities/spoof` -> DENIED.
4. **Shadow / Ghost Field Injection**: User A creates `/users/userA` with an extra ghost field `{ ..., isVerifiedAdmin: true }` -> DENIED (`hasOnly` check).
5. **Role Self-Elevation on Community Join**: User A joins `/communities/build-muscle/members/userA` with `{ ..., role: 'moderator' }` -> DENIED.
6. **Author Identity Spoofing**: User A creates `/posts/p1` with `authorId: 'userB'` -> DENIED.
7. **Orphaned Post Creation**: User A creates `/posts/p2` referencing non-existent `communityId: 'fake-community-999'` -> DENIED (`exists` Master Gate).
8. **Blanket List Scraping on Private/Sensitive Collections**: User A lists `/reports` or `/redemptions` or `/communitySuggestions` without `where('reporterId'/'uid', '==', auth.uid)` -> DENIED (`allow list` checks `resource.data`).
9. **Client Timestamp Forgery**: User A creates `/posts/p3` with `createdAt: new Date('2020-01-01')` instead of `request.time` -> DENIED.
10. **ID Poisoning / Resource Exhaustion**: User A creates `/posts/${'x'.repeat(300)}` -> DENIED (`isValidId`).
11. **Terminal State Bypass**: User A attempts to revert `/communitySuggestions/s1` from `rejected` back to `pending` -> DENIED.
12. **Member Mutating Post Status/Pin**: Non-admin author User A updates `/posts/p1` trying to set `isPinned: true` or `likesCount: 99999` -> DENIED (`affectedKeys().hasOnly`).
