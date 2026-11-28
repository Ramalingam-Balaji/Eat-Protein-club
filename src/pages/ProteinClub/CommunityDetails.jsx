import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Ban,
  BarChart3,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  EyeOff,
  FileText,
  Flag,
  Heart,
  Image as ImageIcon,
  MessageSquare,
  MoreHorizontal,
  Send,
  Share2,
  ShieldCheck,
  Smartphone,
  ThumbsUp,
  Trash2,
  Trophy,
  Users,
  BookOpen,
  Info,
  ArrowRight,
  X,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  addComment,
  blockUser,
  createPost,
  fetchBlockedUserIds,
  fetchCommentsByPost,
  fetchCommunityBySlug,
  fetchCommunityMembers,
  fetchEvents,
  fetchPostsByCommunity,
  fetchSavedPostIds,
  getUserJoinedCommunities,
  fetchUserRsvpIds,
  joinCommunity,
  leaveCommunity,
  submitReport,
  toggleEventRsvp,
  toggleLikePost,
  toggleSavePost,
  adminDeletePost,
  adminModeratePost,
} from "../../services/proteinClubService";
import { clubImages, defaultResources } from "./data/communities";

const postCategories = ["Progress", "Questions", "Tips", "Recipes", "Workouts", "Poll"];

const communityRules = [
  "Keep discussions relevant to muscle building, protein, diet and nutrition.",
  "Be respectful and supportive to all community members.",
  "Share only genuine experiences and verified nutrition information.",
  "No spam, self-promotions, or irrelevant links.",
  "Follow EatProtein community guidelines at all times.",
];

const mealImagePresets = [
  { label: "None", url: "" },
  { label: "Protein Meal Bowl", url: clubImages.mealBowl },
  { label: "Workout Progress", url: clubImages.buildMuscle },
  { label: "Family Meal", url: clubImages.family },
];

export default function CommunityDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, profile, isAdmin, refreshProfile, showToast } = useProteinClubAuth();

  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [rsvpIds, setRsvpIds] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [blockedUids, setBlockedUids] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("posts");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [joinBusy, setJoinBusy] = useState(false);

  // Composer state
  const [postText, setPostText] = useState("");
  const [postCategory, setPostCategory] = useState("Progress");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showPollBuilder, setShowPollBuilder] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [posting, setPosting] = useState(false);

  // Post menus, likes, comments & report modal
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [replyingTo, setReplyingTo] = useState({});
  const [reportTarget, setReportTarget] = useState(null);
  const [reportReason, setReportReason] = useState("");

  const loadCommunityData = useCallback(async () => {
    setLoading(true);
    try {
      const comm = await fetchCommunityBySlug(slug);
      setCommunity(comm);
      if (!comm) {
        setLoading(false);
        return;
      }

      const [feedPosts, allEvents] = await Promise.all([
        fetchPostsByCommunity(comm.id, comm.slug),
        fetchEvents(false),
      ]);

      setPosts(feedPosts);
      setEvents(allEvents.slice(0, 4));

      if (!comm._seededFallback) {
        try {
          const mems = await fetchCommunityMembers(comm.id);
          setMembers(mems);
        } catch {
          setMembers([]);
        }
      }

      if (user) {
        const [joined, saved, blocked, rsvps] = await Promise.all([
          comm._seededFallback ? [] : getUserJoinedCommunities(user.uid, [comm]),
          fetchSavedPostIds(user.uid),
          fetchBlockedUserIds(user.uid),
          fetchUserRsvpIds(user.uid, allEvents),
        ]);
        setIsJoined(joined.includes(comm.id));
        setSavedPostIds(saved);
        setBlockedUids(blocked);
        setRsvpIds(rsvps);
      } else {
        setIsJoined(false);
        setSavedPostIds([]);
        setBlockedUids([]);
        setRsvpIds([]);
      }
    } catch (err) {
      console.error("Failed to load community:", err);
    } finally {
      setLoading(false);
    }
  }, [slug, user]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadCommunityData();
    });
  }, [loadCommunityData]);

  const visiblePosts = useMemo(() => {
    return posts.filter((p) => {
      if (blockedUids.includes(p.authorId)) return false;
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
      return true;
    });
  }, [posts, blockedUids, categoryFilter]);

  const handleToggleJoin = async () => {
    if (!user) {
      showToast("Please sign in to join this community.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (community?._seededFallback) {
      showToast("Community catalog awaits initial admin activation.", "info");
      return;
    }
    setJoinBusy(true);
    try {
      if (isJoined) {
        await leaveCommunity({ community, user, profile });
        setIsJoined(false);
        setCommunity((prev) => ({
          ...prev,
          membersCount: Math.max(0, (prev.membersCount || 1) - 1),
        }));
        showToast(`Left ${community.shortTitle || community.title}.`, "info");
      } else {
        await joinCommunity({ community, user, profile });
        setIsJoined(true);
        setCommunity((prev) => ({
          ...prev,
          membersCount: (prev.membersCount || 0) + 1,
        }));
        showToast(`Welcome to ${community.title}!`);
      }
      await refreshProfile();
    } catch (err) {
      showToast(err?.message || "Failed to update membership.", "error");
    } finally {
      setJoinBusy(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Sign in to share posts in the community.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (!postText.trim()) return;
    if (community?._seededFallback) {
      showToast("Database catalog is pending initial admin activation.", "info");
      return;
    }

    setPosting(true);
    try {
      const created = await createPost({
        communityId: community.id,
        communitySlug: community.slug,
        user,
        profile,
        category: showPollBuilder ? "Poll" : postCategory,
        text: postText.trim(),
        tags: [postCategory, community.goal.replace(/\s+/g, "")],
        imageUrl: postImageUrl,
        pollOptions: showPollBuilder ? pollOptions.filter((o) => o.trim()) : [],
      });
      setPosts((prev) => [
        { ...created, _fromFirestore: true, timeLabel: "Just now" },
        ...prev,
      ]);
      setPostText("");
      setPostImageUrl("");
      setShowPhotoPicker(false);
      setShowPollBuilder(false);
      setPollOptions(["", ""]);
      showToast("Post published! +50 Protein Points & +10 Coins earned.");
      await refreshProfile();
    } catch (err) {
      showToast(err?.message || "Could not publish post.", "error");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (post) => {
    if (!user) {
      showToast("Sign in to like and support member posts.", "info");
      return;
    }
    if (!post._fromFirestore) {
      const already = likedPostIds.includes(post.id);
      setLikedPostIds((prev) =>
        already ? prev.filter((id) => id !== post.id) : [...prev, post.id]
      );
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, likesCount: Math.max(0, (p.likesCount || 0) + (already ? -1 : 1)) }
            : p
        )
      );
      return;
    }

    try {
      const result = await toggleLikePost({ post, user });
      if (result) {
        setLikedPostIds((prev) =>
          result.liked ? [...prev, post.id] : prev.filter((id) => id !== post.id)
        );
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, likesCount: result.likesCount } : p
          )
        );
      }
    } catch (err) {
      showToast(err?.message || "Unable to update like.", "error");
    }
  };

  const handleToggleComments = async (post) => {
    const isOpen = Boolean(expandedComments[post.id]);
    setExpandedComments((prev) => ({ ...prev, [post.id]: !isOpen }));
    if (!isOpen && !commentsByPost[post.id]) {
      if (post._fromFirestore) {
        try {
          const list = await fetchCommentsByPost(post.id);
          setCommentsByPost((prev) => ({ ...prev, [post.id]: list }));
        } catch {
          setCommentsByPost((prev) => ({ ...prev, [post.id]: [] }));
        }
      } else {
        setCommentsByPost((prev) => ({
          ...prev,
          [post.id]: post.seedComments || [],
        }));
      }
    }
  };

  const handleAddComment = async (post) => {
    const text = (commentInputs[post.id] || "").trim();
    if (!text) return;
    if (!user) {
      showToast("Sign in to comment on posts.", "info");
      navigate("/protein-club/register");
      return;
    }

    const parentId = replyingTo[post.id]?.id || "";
    if (!post._fromFirestore) {
      const localCmt = {
        id: `local_${Date.now()}`,
        authorName: profile?.displayName || user.displayName || "You",
        text,
        parentCommentId: parentId,
        timeLabel: "Just now",
      };
      setCommentsByPost((prev) => ({
        ...prev,
        [post.id]: [...(prev[post.id] || []), localCmt],
      }));
      setCommentInputs((prev) => ({ ...prev, [post.id]: "" }));
      setReplyingTo((prev) => ({ ...prev, [post.id]: null }));
      return;
    }

    try {
      const saved = await addComment({
        postId: post.id,
        user,
        profile,
        text,
        parentCommentId: parentId,
      });
      setCommentsByPost((prev) => ({
        ...prev,
        [post.id]: [...(prev[post.id] || []), { ...saved, timeLabel: "Just now" }],
      }));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
        )
      );
      setCommentInputs((prev) => ({ ...prev, [post.id]: "" }));
      setReplyingTo((prev) => ({ ...prev, [post.id]: null }));
      showToast("Comment added! +20 Protein Points.");
      await refreshProfile();
    } catch (err) {
      showToast(err?.message || "Unable to post comment.", "error");
    }
  };

  const handleSavePost = async (post) => {
    setOpenMenuPostId(null);
    if (!user) {
      showToast("Sign in to save posts to your profile.", "info");
      return;
    }
    try {
      const isSaved = await toggleSavePost({
        user,
        postId: post.id,
        communitySlug: community.slug,
      });
      setSavedPostIds((prev) =>
        isSaved ? [...prev, post.id] : prev.filter((id) => id !== post.id)
      );
      showToast(isSaved ? "Post saved!" : "Removed from saved posts.", "info");
    } catch (err) {
      showToast(err?.message || "Could not save post.", "error");
    }
  };

  const handleHidePost = async (post) => {
    setOpenMenuPostId(null);
    if (isAdmin && post._fromFirestore) {
      await adminModeratePost(post.id, { status: "hidden" });
    }
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    showToast("Post hidden from your feed.", "info");
  };

  const handleDeletePost = async (post) => {
    setOpenMenuPostId(null);
    if (post._fromFirestore && (isAdmin || post.authorId === user?.uid)) {
      await adminDeletePost(post.id);
    }
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
    showToast("Post removed.", "info");
  };

  const handleBlockMember = async (post) => {
    setOpenMenuPostId(null);
    if (!user) {
      showToast("Sign in to manage blocked members.", "info");
      return;
    }
    await blockUser({
      user,
      blockedUid: post.authorId || "member",
      blockedName: post.authorName,
    });
    setBlockedUids((prev) => [...prev, post.authorId]);
    showToast(`Posts from ${post.authorName} are now hidden.`, "info");
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Sign in to submit moderation reports.", "info");
      return;
    }
    if (!reportReason.trim()) return;
    await submitReport({
      user,
      profile,
      targetType: "post",
      targetId: reportTarget.id,
      communityId: community.id,
      reason: reportReason.trim(),
    });
    setReportTarget(null);
    setReportReason("");
    showToast("Report submitted to EatProtein moderators. Thank you.");
  };

  const handleShare = async (_post) => {
    const shareUrl = `${window.location.origin}/protein-club/community/${community.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Community link copied to clipboard!");
    } catch {
      showToast(`Share link: ${shareUrl}`, "info");
    }
  };

  const handleRsvp = async (ev) => {
    if (!user) {
      showToast("Sign in to register for community events.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (ev._seededFallback) {
      showToast("Events are pending initial admin activation.", "info");
      return;
    }
    const res = await toggleEventRsvp({ eventItem: ev, user, profile });
    setRsvpIds((prev) =>
      res.registered ? [...prev, ev.id] : prev.filter((id) => id !== ev.id)
    );
    setEvents((prev) =>
      prev.map((item) =>
        item.id === ev.id ? { ...item, rsvpCount: res.rsvpCount } : item
      )
    );
    showToast(res.registered ? "Registered for event!" : "Registration cancelled.", "info");
  };

  if (loading) {
    return (
      <ProteinClubLayout breadcrumbs={[{ label: "Explore Communities", to: "/protein-club/communities" }]}>
        <div className="h-64 animate-pulse rounded-3xl bg-white p-6" />
      </ProteinClubLayout>
    );
  }

  if (!community) {
    return (
      <ProteinClubLayout breadcrumbs={[{ label: "Explore Communities", to: "/protein-club/communities" }]}>
        <div className="rounded-3xl border border-green-100 bg-white p-10 text-center">
          <h1 className="text-2xl font-extrabold text-protein-dark">Community not found</h1>
          <Link
            to="/protein-club/communities"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-protein-green px-5 py-2.5 text-sm font-bold text-white"
          >
            Back to Communities
          </Link>
        </div>
      </ProteinClubLayout>
    );
  }

  return (
    <ProteinClubLayout
      breadcrumbs={[
        { label: "Explore Communities", to: "/protein-club/communities" },
        { label: community.title },
      ]}
      activeCommunityTitle={community.title}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* LEFT / MAIN COMMUNITY COLUMN */}
        <div className="space-y-5 lg:col-span-8">
          {/* Header Banner Card */}
          <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
            <div className="relative h-44 bg-gradient-to-r from-protein-dark via-protein-hover to-protein-green sm:h-52">
              <img
                src={community.heroImage}
                alt={community.title}
                className="h-full w-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-lime-300">
                  {community.goal} · {community.category}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                  {community.title}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-extrabold text-protein-dark">
                    {community.shortTitle || community.title}
                  </span>
                  {community.official && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-protein-green">
                      <ShieldCheck size={15} /> Verified Official
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs font-medium tabular-nums text-gray-500 sm:text-sm">
                  {(community.membersCount || 0).toLocaleString()} Members ·{" "}
                  {(community.discussionsCount || 0).toLocaleString()} Discussions · Public Community
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={joinBusy}
                  onClick={handleToggleJoin}
                  className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-extrabold transition sm:text-sm ${
                    isJoined
                      ? "border border-protein-green bg-protein-soft text-protein-green"
                      : "bg-protein-green text-white shadow-sm hover:bg-protein-hover"
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 size={16} /> Joined
                    </>
                  ) : joinBusy ? (
                    "Joining..."
                  ) : (
                    "Join Community"
                  )}
                </button>
              </div>
            </div>

            {/* 5 Community Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto border-t border-gray-100 px-4">
              {[
                { id: "posts", label: "Posts", icon: MessageSquare },
                { id: "challenges", label: "Challenges", icon: Trophy },
                { id: "events", label: "Events", icon: CalendarDays },
                { id: "resources", label: "Resources", icon: BookOpen },
                { id: "about", label: "About", icon: Info },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition sm:text-sm ${
                      active
                        ? "border-protein-green text-protein-green"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: POSTS & FEED */}
          {activeTab === "posts" && (
            <>
              {/* Composer */}
              <form
                onSubmit={handleCreatePost}
                className="rounded-3xl border border-green-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-protein-green text-sm font-extrabold text-white">
                    {(profile?.displayName || user?.displayName || "E").charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <textarea
                      rows={2}
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Share your protein progress, recipe, or question with the community..."
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-protein-surface px-4 py-2.5 text-sm outline-none focus:border-protein-green"
                    />

                    {showPhotoPicker && (
                      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-green-100 bg-protein-surface p-2.5">
                        <span className="text-xs font-bold text-gray-700">Attach photo:</span>
                        {mealImagePresets.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => setPostImageUrl(img.url)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                              postImageUrl === img.url
                                ? "bg-protein-green text-white"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {showPollBuilder && (
                      <div className="mt-2 space-y-2 rounded-xl border border-green-100 bg-protein-surface p-3">
                        <p className="text-xs font-bold text-gray-700">Poll Options</p>
                        {pollOptions.map((opt, idx) => (
                          <input
                            key={idx}
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const next = [...pollOptions];
                              next[idx] = e.target.value;
                              setPollOptions(next);
                            }}
                            placeholder={`Option ${idx + 1}`}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-protein-green"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShowPhotoPicker((v) => !v)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-protein-soft"
                        >
                          <ImageIcon size={15} className="text-protein-green" />
                          Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPollBuilder((v) => !v)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-protein-soft"
                        >
                          <BarChart3 size={15} className="text-indigo-600" />
                          Poll
                        </button>
                        <select
                          aria-label="Post Category"
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
                          className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none"
                        >
                          {postCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={posting || !postText.trim()}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-protein-green px-5 py-2 text-xs font-extrabold text-white transition hover:bg-protein-hover disabled:opacity-50"
                      >
                        {posting ? "Posting..." : "Post"}
                        <Send size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Category Filter Strip */}
              <div className="flex flex-wrap items-center gap-1.5">
                {["All", ...postCategories].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      categoryFilter === cat
                        ? "bg-protein-green text-white"
                        : "bg-white text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {visiblePosts.map((post) => {
                  const isSaved = savedPostIds.includes(post.id);
                  const isLiked = likedPostIds.includes(post.id);
                  const commentsOpen = Boolean(expandedComments[post.id]);
                  const commentsList = commentsByPost[post.id] || [];
                  const canManage = isAdmin || (user && post.authorId === user.uid);

                  return (
                    <article
                      key={post.id}
                      className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-protein-soft text-sm font-extrabold text-protein-green">
                            {(post.authorName || "M").charAt(0)}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-extrabold text-gray-900">
                                {post.authorName}
                              </span>
                              <span className="text-xs font-semibold text-protein-green">
                                · {post.authorRole || "Member"}
                              </span>
                              {post.isPinned && (
                                <span className="text-xs font-bold text-orange-600">
                                  · Pinned
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {post.timeLabel || "Recently"} · {post.category}
                            </p>
                          </div>
                        </div>

                        <div className="relative">
                          <button
                            type="button"
                            aria-label="Post options"
                            onClick={() =>
                              setOpenMenuPostId(openMenuPostId === post.id ? null : post.id)
                            }
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                          >
                            <MoreHorizontal size={18} />
                          </button>

                          {openMenuPostId === post.id && (
                            <div className="absolute right-0 z-20 mt-1 w-44 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => handleSavePost(post)}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                <Bookmark size={14} />
                                {isSaved ? "Unsave Post" : "Save Post"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuPostId(null);
                                  setReportTarget(post);
                                }}
                                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                <Flag size={14} />
                                Report
                              </button>
                              {canManage && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleHidePost(post)}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                  >
                                    <EyeOff size={14} />
                                    Hide Post
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePost(post)}
                                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                    Delete Post
                                  </button>
                                </>
                              )}
                              {post.authorId !== user?.uid && (
                                <button
                                  type="button"
                                  onClick={() => handleBlockMember(post)}
                                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                                >
                                  <Ban size={14} />
                                  Block User
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-800">
                        {post.text}
                      </p>

                      {post.pollOptions?.length > 0 && (
                        <div className="mt-3 space-y-2 rounded-2xl border border-green-100 bg-protein-surface p-3">
                          {post.pollOptions.map((opt, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {post.imageUrl && (
                        <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100">
                          <img
                            src={post.imageUrl}
                            alt="Community member post"
                            className="max-h-72 w-full object-cover"
                          />
                        </div>
                      )}

                      {/* Post Engagement Bar */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs font-bold text-gray-600">
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleLike(post)}
                            className={`inline-flex items-center gap-1.5 transition ${
                              isLiked ? "text-red-600" : "hover:text-protein-green"
                            }`}
                          >
                            <Heart
                              size={16}
                              className={isLiked ? "fill-red-500 text-red-500" : ""}
                            />
                            <span className="tabular-nums">{post.likesCount || 0}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleComments(post)}
                            className="inline-flex items-center gap-1.5 hover:text-protein-green"
                          >
                            <MessageSquare size={16} />
                            <span className="tabular-nums">
                              {post.commentsCount ?? commentsList.length} Comments
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShare(post)}
                            className="inline-flex items-center gap-1.5 hover:text-protein-green"
                          >
                            <Share2 size={15} />
                            Share
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSavePost(post)}
                            className={`inline-flex items-center gap-1.5 ${
                              isSaved ? "text-protein-green" : "hover:text-protein-green"
                            }`}
                          >
                            <Bookmark size={15} className={isSaved ? "fill-protein-green" : ""} />
                            {isSaved ? "Saved" : "Save"}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setReportTarget(post)}
                          className="inline-flex items-center gap-1 text-gray-500 hover:text-red-600"
                        >
                          <Flag size={13} /> Report
                        </button>
                      </div>

                      {/* Expandable Comments & Replies */}
                      {commentsOpen && (
                        <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                          {commentsList.map((cmt) => (
                            <div
                              key={cmt.id}
                              className={`rounded-2xl bg-protein-surface p-3 text-xs ${
                                cmt.parentCommentId ? "ml-6 border border-green-100" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-gray-900">
                                  {cmt.authorName}
                                </span>
                                <span className="text-gray-400">
                                  {cmt.timeLabel || "Recently"}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-700">{cmt.text}</p>
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyingTo((prev) => ({ ...prev, [post.id]: cmt }))
                                }
                                className="mt-1.5 font-bold text-protein-green hover:underline"
                              >
                                Reply
                              </button>
                              {Array.isArray(cmt.replies) &&
                                cmt.replies.map((rep) => (
                                  <div
                                    key={rep.id}
                                    className="ml-5 mt-2 rounded-xl border border-green-100 bg-white p-2.5"
                                  >
                                    <span className="font-bold text-gray-900">
                                      {rep.authorName}
                                    </span>{" "}
                                    <span className="text-gray-400">· {rep.timeLabel}</span>
                                    <p className="mt-0.5 text-gray-700">{rep.text}</p>
                                  </div>
                                ))}
                            </div>
                          ))}

                          {replyingTo[post.id] && (
                            <div className="flex items-center justify-between rounded-lg bg-protein-soft px-3 py-1.5 text-xs text-protein-dark">
                              <span>Replying to {replyingTo[post.id].authorName}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyingTo((prev) => ({ ...prev, [post.id]: null }))
                                }
                                className="font-bold"
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              placeholder="Write a helpful comment or reply..."
                              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-protein-green"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddComment(post)}
                              className="rounded-xl bg-protein-green px-4 py-2 text-xs font-bold text-white hover:bg-protein-hover"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          )}

          {/* TAB 2: CHALLENGES */}
          {activeTab === "challenges" && (
            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-protein-dark">
                Community Challenges
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Join guided challenges to build consistency and earn Protein Points.
              </p>
              <div className="mt-4 space-y-3">
                {(community.activeChallenges?.length > 0
                  ? community.activeChallenges
                  : [
                      {
                        id: "21-day-protein-challenge",
                        title: "21-Day Protein Challenge",
                        participants: "12,480 Joined",
                        startsLabel: "Active Now",
                      },
                    ]
                ).map((ch, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-green-100 bg-protein-surface p-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-protein-green">{ch.startsLabel}</p>
                      <h3 className="text-base font-extrabold text-gray-900">{ch.title}</h3>
                      <p className="text-xs text-gray-600">{ch.participants}</p>
                    </div>
                    <Link
                      to="/protein-club/challenges"
                      className="inline-flex items-center gap-1.5 rounded-full bg-protein-green px-5 py-2.5 text-xs font-bold text-white hover:bg-protein-hover"
                    >
                      Open Challenge <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === "events" && (
            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-protein-dark">
                Upcoming Events & Webinars
              </h2>
              <div className="mt-4 space-y-3">
                {events.map((ev) => {
                  const isRsvped = rsvpIds.includes(ev.id);
                  return (
                    <div
                      key={ev.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 p-4"
                    >
                      <div>
                        <p className="text-xs font-bold text-protein-green">
                          {ev.type} · {ev.dateLabel} · {ev.timeLabel}
                        </p>
                        <h3 className="mt-1 text-base font-extrabold text-gray-900">
                          {ev.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-600">
                          Host: {ev.hostName} · {ev.rsvpCount} registered
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRsvp(ev)}
                        className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                          isRsvped
                            ? "border border-protein-green bg-protein-soft text-protein-green"
                            : "bg-protein-green text-white hover:bg-protein-hover"
                        }`}
                      >
                        {isRsvped ? "Registered ✓" : "Register"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: RESOURCES */}
          {activeTab === "resources" && (
            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-protein-dark">
                Nutrition Guides & Meal Templates
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {defaultResources.map((res) => (
                  <div
                    key={res.id}
                    className="rounded-2xl border border-gray-200 bg-protein-surface p-4"
                  >
                    <p className="text-xs font-bold text-protein-green">
                      {res.category} · {res.proteinHighlight}
                    </p>
                    <h3 className="mt-1 text-base font-extrabold text-gray-900">
                      {res.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                      {res.summary}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-gray-700">
                      {res.items.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-protein-green" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ABOUT */}
          {activeTab === "about" && (
            <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-protein-dark">
                About {community.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                {community.about || community.description}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-protein-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-protein-green">
                    What You Get
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm text-gray-800">
                    {(community.benefits || []).map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-protein-green" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Community Details
                  </p>
                  <div className="mt-2.5 space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Focus Goal:</strong> {community.goal}
                    </p>
                    <p>
                      <strong>Location:</strong> {community.location || "India"}
                    </p>
                    <p>
                      <strong>Started:</strong> {community.started || "Jan 2026"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-5 lg:col-span-4">
          {/* Community Rules */}
          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
              <ShieldCheck size={20} className="text-protein-green" />
              <h2>Community Rules</h2>
            </div>
            <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-gray-700">
              {communityRules.map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-protein-green" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Members */}
          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                <Users size={19} className="text-protein-green" />
                <h2>Active Members</h2>
              </div>
              <span className="text-xs font-bold tabular-nums text-gray-500">
                {(community.membersCount || 0).toLocaleString()}
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {(members.length > 0
                ? members.slice(0, 4).map((m) => ({
                    name: m.displayName,
                    role: m.role,
                  }))
                : community.moderators || [
                    { name: "Priya Sharma", role: "Nutrition Coach" },
                    { name: "Rohit Varma", role: "Protein Leader" },
                  ]
              ).map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-protein-soft font-extrabold text-protein-green">
                      {(m.name || "M").charAt(0)}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">{m.name}</p>
                      <p className="text-[11px] text-gray-500">{m.role || "Member"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Challenge Card */}
          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-extrabold text-protein-dark">
              Upcoming Challenge
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={clubImages.challengeDuo}
                alt="21-Day Challenge"
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  21-Day Protein Challenge
                </p>
                <p className="text-xs text-gray-500">12,480 Joined · +100 pts/day</p>
              </div>
            </div>
            <Link
              to="/protein-club/challenges"
              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-protein-green py-2.5 text-xs font-extrabold text-white transition hover:bg-protein-hover"
            >
              Join Challenge <ArrowRight size={14} />
            </Link>
          </div>

          {/* Track Protein in App / Web CTA */}
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-protein-dark to-protein-green p-5 text-white shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-300">
              <Smartphone size={14} /> EatProtein Sync
            </div>
            <h2 className="mt-2 text-lg font-extrabold leading-snug">
              Track Your Daily Protein in EatProtein
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-green-100">
              Log your meals, track daily protein targets, and maintain your challenge streak.
            </p>
            <Link
              to="/protein-club/my-club"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-protein-orange py-2.5 text-xs font-extrabold text-white transition hover:bg-protein-orange2"
            >
              Log Today&apos;s Protein <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Report Modal */}
      {reportTarget && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setReportTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-protein-dark">
                Report Content to Moderators
              </h3>
              <button
                type="button"
                onClick={() => setReportTarget(null)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Help keep EatProtein safe and supportive. Describe what violates community guidelines.
            </p>
            <form onSubmit={handleSubmitReport} className="mt-4 space-y-3">
              <textarea
                rows={3}
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Reason (e.g., spam, promotion, off-topic, misleading health claim)..."
                className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-protein-green"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportTarget(null)}
                  className="rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ProteinClubLayout>
  );
}