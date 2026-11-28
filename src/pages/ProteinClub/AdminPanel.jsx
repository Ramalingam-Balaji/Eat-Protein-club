import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Coins,
  Crown,
  Database,
  Eye,
  EyeOff,
  Flag,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Palette,
  Pin,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { useBrandTheme } from "../../context/ThemeContext";
import {
  adminCreateChallenge,
  adminCreateCommunity,
  adminCreateEvent,
  adminCreateReward,
  adminDeletePost,
  adminFetchAllMembers,
  adminFetchAllPosts,
  adminFetchLeaderApplications,
  adminFetchReports,
  adminFetchSuggestions,
  adminModeratePost,
  adminReviewLeaderApplication,
  adminReviewSuggestion,
  adminUpdateChallengeStatus,
  adminUpdateCommunityStatus,
  adminUpdateMemberStatus,
  adminUpdateReportStatus,
  ensureDefaultCatalogSeeded,
  fetchChallenges,
  fetchCommunities,
  fetchEvents,
  fetchRewards,
} from "../../services/proteinClubService";

const navSections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "communities", label: "Communities", icon: Users },
  { id: "members", label: "Members", icon: Users },
  { id: "posts", label: "Posts & Discussions", icon: MessageSquare },
  { id: "challenges", label: "Challenges", icon: Trophy },
  { id: "events", label: "Events & Webinars", icon: CalendarDays },
  { id: "reports", label: "Reports & Moderation", icon: Flag },
  { id: "suggestions", label: "Community Suggestions", icon: Lightbulb },
  { id: "leaders", label: "Leader Applications", icon: Crown },
  { id: "rewards", label: "Rewards & Coins", icon: Coins },
];

const growthMonths = [
  { month: "Apr", members: 8400 },
  { month: "May", members: 9100 },
  { month: "Jun", members: 9800 },
  { month: "Jul", members: 10500 },
  { month: "Aug", members: 11200 },
  { month: "Sep", members: 11850 },
  { month: "Oct", members: 12350 },
  { month: "Nov", members: 12840 },
];

export default function AdminPanel() {
  const { user, profile, showToast } = useProteinClubAuth();
  const { openStudio } = useBrandTheme();

  const [section, setSection] = useState("dashboard");
  const [timeframe, setTimeframe] = useState("Last 30 Days");
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const [communities, setCommunities] = useState([]);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [events, setEvents] = useState([]);
  const [reports, setReports] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [leaderApps, setLeaderApps] = useState([]);
  const [rewards, setRewards] = useState([]);

  // Filters
  const [memberSearch, setMemberSearch] = useState("");
  const [postFilter, setPostFilter] = useState("all");

  // Creation forms
  const [newComm, setNewComm] = useState({
    title: "",
    category: "Goal Based",
    goal: "Build Muscle",
    location: "India",
    description: "",
  });
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    subtitle: "",
    communityId: "build-muscle",
    durationDays: 21,
    goal: "Build Muscle",
    rewardPoints: 100,
    rewardCoins: 50,
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    communityId: "build-muscle",
    communityTitle: "Build Muscle Community",
    hostName: "Priya Sharma, Nutrition Coach",
    dateLabel: "Dec 18, 2026",
    timeLabel: "7:00 PM – 8:00 PM IST",
    type: "Webinar",
    description: "",
  });
  const [newReward, setNewReward] = useState({
    title: "",
    description: "",
    category: "Product Discount",
    coinsCost: 500,
    codePrefix: "EP",
  });

  const loadAllAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        commList,
        memList,
        postList,
        challList,
        eventList,
        repList,
        sugList,
        ldrList,
        rwList,
      ] = await Promise.all([
        fetchCommunities(true).catch(() => []),
        adminFetchAllMembers().catch(() => []),
        adminFetchAllPosts().catch(() => []),
        fetchChallenges(true).catch(() => []),
        fetchEvents(true).catch(() => []),
        adminFetchReports().catch(() => []),
        adminFetchSuggestions().catch(() => []),
        adminFetchLeaderApplications().catch(() => []),
        fetchRewards(true).catch(() => []),
      ]);
      setCommunities(commList || []);
      setMembers(memList || []);
      setPosts(postList || []);
      setChallenges(challList || []);
      setEvents(eventList || []);
      setReports(repList || []);
      setSuggestions(sugList || []);
      setLeaderApps(ldrList || []);
      setRewards(rwList || []);
    } catch (err) {
      console.error("Admin load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = Promise.resolve().then(() => {
      loadAllAdminData();
    });
    return () => {
      void timer;
    };
  }, [loadAllAdminData]);

  const handleSeedCatalog = async () => {
    setSeeding(true);
    try {
      const ok = await ensureDefaultCatalogSeeded();
      if (ok) {
        showToast("Default communities, challenges, events & rewards synced to Firestore.");
        await loadAllAdminData();
      } else {
        showToast("Catalog sync skipped or failed — check console.", "error");
      }
    } finally {
      setSeeding(false);
    }
  };

  const pendingReportsCount = reports.filter((r) => r.status === "pending").length;
  const pendingSuggestionsCount = suggestions.filter((s) => s.status === "pending").length;
  const pendingLeadersCount = leaderApps.filter((l) => l.status === "pending").length;

  const totalCommunityMembers = useMemo(
    () =>
      communities.reduce((acc, c) => acc + Number(c.membersCount || 0), 0) ||
      members.length,
    [communities, members]
  );

  const filteredMembers = useMemo(() => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        (m.displayName || "").toLowerCase().includes(q) ||
        (m.location || "").toLowerCase().includes(q) ||
        (m.goal || "").toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  const filteredPosts = useMemo(() => {
    if (postFilter === "all") return posts;
    return posts.filter((p) => p.status === postFilter);
  }, [posts, postFilter]);

  const handleCreateCommunity = async (e) => {
    e.preventDefault();
    if (!newComm.title.trim() || !newComm.description.trim()) return;
    try {
      await adminCreateCommunity(newComm);
      showToast(`Community "${newComm.title}" created.`);
      setNewComm({
        title: "",
        category: "Goal Based",
        goal: "Build Muscle",
        location: "India",
        description: "",
      });
      await loadAllAdminData();
    } catch (err) {
      showToast(err?.message || "Failed to create community.", "error");
    }
  };

  const handleToggleCommunityStatus = async (comm) => {
    if (comm._seededFallback) {
      showToast("Click 'Sync Default Catalog' first to persist communities in Firestore.", "info");
      return;
    }
    const nextStatus = comm.status === "paused" ? "active" : "paused";
    try {
      await adminUpdateCommunityStatus(comm.id, nextStatus);
      setCommunities((prev) =>
        prev.map((c) => (c.id === comm.id ? { ...c, status: nextStatus } : c))
      );
      showToast(`Community set to ${nextStatus}.`);
    } catch (err) {
      showToast(err?.message || "Failed to update community.", "error");
    }
  };

  const handleUpdateMemberStatus = async (uid, status) => {
    try {
      await adminUpdateMemberStatus(uid, status);
      setMembers((prev) =>
        prev.map((m) => (m.id === uid || m.uid === uid ? { ...m, status } : m))
      );
      showToast(`Member status updated to ${status}.`);
    } catch (err) {
      showToast(err?.message || "Could not update member status.", "error");
    }
  };

  const handleModeratePost = async (post, updates) => {
    try {
      await adminModeratePost(post.id, updates);
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, ...updates } : p))
      );
      showToast("Post moderation updated.");
    } catch (err) {
      showToast(err?.message || "Could not moderate post.", "error");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await adminDeletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast("Post deleted permanently.");
    } catch (err) {
      showToast(err?.message || "Could not delete post.", "error");
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    if (!newChallenge.title.trim()) return;
    try {
      await adminCreateChallenge(newChallenge);
      showToast(`Challenge "${newChallenge.title}" created.`);
      setNewChallenge({
        title: "",
        subtitle: "",
        communityId: "build-muscle",
        durationDays: 21,
        goal: "Build Muscle",
        rewardPoints: 100,
        rewardCoins: 50,
      });
      await loadAllAdminData();
    } catch (err) {
      showToast(err?.message || "Failed to create challenge.", "error");
    }
  };

  const handleToggleChallengeStatus = async (ch) => {
    if (ch._seededFallback) {
      showToast("Sync default catalog first.", "info");
      return;
    }
    const next = ch.status === "archived" ? "active" : "archived";
    try {
      await adminUpdateChallengeStatus(ch.id, next);
      setChallenges((prev) =>
        prev.map((c) => (c.id === ch.id ? { ...c, status: next } : c))
      );
      showToast(`Challenge marked ${next}.`);
    } catch (err) {
      showToast(err?.message || "Update failed.", "error");
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    try {
      await adminCreateEvent(newEvent);
      showToast(`Event "${newEvent.title}" published.`);
      setNewEvent({
        title: "",
        communityId: "build-muscle",
        communityTitle: "Build Muscle Community",
        hostName: "Priya Sharma, Nutrition Coach",
        dateLabel: "Dec 18, 2026",
        timeLabel: "7:00 PM – 8:00 PM IST",
        type: "Webinar",
        description: "",
      });
      await loadAllAdminData();
    } catch (err) {
      showToast(err?.message || "Failed to create event.", "error");
    }
  };

  const handleCreateReward = async (e) => {
    e.preventDefault();
    if (!newReward.title.trim()) return;
    try {
      await adminCreateReward(newReward);
      showToast(`Reward "${newReward.title}" added to catalog.`);
      setNewReward({
        title: "",
        description: "",
        category: "Product Discount",
        coinsCost: 500,
        codePrefix: "EP",
      });
      await loadAllAdminData();
    } catch (err) {
      showToast(err?.message || "Failed to create reward.", "error");
    }
  };

  // Responsive SVG Growth Path
  const chartPoints = useMemo(() => {
    const maxVal = 14000;
    const minVal = 8000;
    const w = 520;
    const h = 150;
    return growthMonths.map((item, idx) => {
      const x = 30 + (idx * (w - 60)) / (growthMonths.length - 1);
      const y = h - 20 - ((item.members - minVal) / (maxVal - minVal)) * (h - 40);
      return { ...item, x, y };
    });
  }, []);

  const linePath = chartPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${chartPoints[chartPoints.length - 1].x.toFixed(
    1
  )},130 L${chartPoints[0].x.toFixed(1)},130 Z`;

  return (
    <div className="min-h-screen bg-protein-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row">
        {/* Dark-Green Admin Sidebar (Mockup 9) */}
        <aside className="w-full shrink-0 bg-protein-dark p-4 text-white lg:min-h-[calc(100vh-76px)] lg:w-64">
          <div className="flex items-center justify-between border-b border-emerald-800/70 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700/80 text-emerald-100">
                <Shield size={19} />
              </span>
              <div>
                <p className="text-sm font-extrabold leading-tight">Protein Club Admin</p>
                <p className="text-[11px] text-emerald-200/80">Super Admin Console</p>
              </div>
            </div>
          </div>

          <nav className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
            {navSections.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              let badgeCount = 0;
              if (item.id === "reports") badgeCount = pendingReportsCount;
              if (item.id === "suggestions") badgeCount = pendingSuggestionsCount;
              if (item.id === "leaders") badgeCount = pendingLeadersCount;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${
                    active
                      ? "bg-protein-green text-white shadow-sm"
                      : "text-emerald-100/85 hover:bg-emerald-900/60"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {badgeCount > 0 && (
                    <span className="rounded-full bg-protein-orange px-1.5 py-0.5 text-[10px] font-extrabold text-white tabular-nums">
                      {badgeCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-emerald-800/70 pt-4">
            <Link
              to="/protein-club/my-club"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600/60 px-3 py-2 text-xs font-bold text-emerald-100 hover:bg-emerald-900/60"
            >
              Back to Member View
            </Link>
          </div>
        </aside>

        {/* Main Workspace */}
        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {/* Top Bar */}
          <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold text-protein-dark sm:text-2xl">
                  {navSections.find((n) => n.id === section)?.label || "Dashboard"}
                </h1>
                <span className="rounded-full bg-protein-soft px-2.5 py-0.5 text-xs font-extrabold text-protein-green">
                  Super Admin
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">
                Signed in as {profile?.displayName || user?.email} • Overview of Protein Club performance & moderation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                aria-label="Admin dashboard timeframe"
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 outline-none"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="All Time">All Time</option>
              </select>

              <button
                type="button"
                disabled={seeding}
                onClick={handleSeedCatalog}
                className="inline-flex items-center gap-1.5 rounded-xl bg-protein-green px-3.5 py-2 text-xs font-bold text-white hover:bg-protein-hover disabled:opacity-60"
              >
                <Database size={14} />
                {seeding ? "Syncing..." : "Sync Default Catalog"}
              </button>

              <button
                type="button"
                onClick={openStudio}
                className="inline-flex items-center gap-1.5 rounded-xl border border-protein-border bg-protein-soft px-3 py-2 text-xs font-bold text-protein-dark hover:bg-protein-tint"
              >
                <Palette size={14} className="text-protein-orange" />
                Brand Theme
              </button>

              <button
                type="button"
                onClick={loadAllAdminData}
                className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </header>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : (
            <>
              {/* DASHBOARD OVERVIEW */}
              {section === "dashboard" && (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <p className="text-xs font-bold text-gray-500">Total Community Reach</p>
                      <p className="mt-1 text-3xl font-black text-protein-dark tabular-nums">
                        {totalCommunityMembers.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-protein-green">
                        {members.length} registered accounts ({timeframe})
                      </p>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <p className="text-xs font-bold text-gray-500">Communities</p>
                      <p className="mt-1 text-3xl font-black text-protein-dark tabular-nums">
                        {communities.length}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-protein-green">
                        {communities.filter((c) => c.status !== "paused").length} Active
                      </p>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <p className="text-xs font-bold text-gray-500">Firestore Posts</p>
                      <p className="mt-1 text-3xl font-black text-protein-dark tabular-nums">
                        {posts.length}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-orange-600">
                        {pendingReportsCount} pending reports
                      </p>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <p className="text-xs font-bold text-gray-500">Active Challenges</p>
                      <p className="mt-1 text-3xl font-black text-protein-dark tabular-nums">
                        {challenges.filter((c) => c.status !== "archived").length}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-protein-green">
                        {pendingSuggestionsCount} community suggestions
                      </p>
                    </div>
                  </div>

                  {/* Chart + Top Communities */}
                  <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-extrabold text-protein-dark">
                        Member Growth ({timeframe})
                      </h2>
                      <p className="text-xs text-gray-500">
                        Monthly cumulative Protein Club participation trend
                      </p>
                      <div className="mt-4 overflow-x-auto">
                        <svg
                          viewBox="0 0 520 175"
                          className="h-44 w-full min-w-[360px]"
                          role="img"
                          aria-label="Member growth area chart"
                        >
                          <defs>
                            <linearGradient id="adminGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#087C43" stopOpacity="0.28" />
                              <stop offset="100%" stopColor="#087C43" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>
                          <path d={areaPath} fill="url(#adminGrowthGrad)" />
                          <path
                            d={linePath}
                            fill="none"
                            stroke="#087C43"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          {chartPoints.map((pt) => (
                            <g key={pt.month}>
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="4.5"
                                fill="#FFFFFF"
                                stroke="#087C43"
                                strokeWidth="2.5"
                              />
                              <text
                                x={pt.x}
                                y="155"
                                textAnchor="middle"
                                className="fill-gray-500 text-[11px] font-semibold"
                              >
                                {pt.month}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-extrabold text-protein-dark">
                        Top Communities
                      </h2>
                      <div className="mt-3 divide-y divide-gray-100">
                        {communities.slice(0, 5).map((comm) => (
                          <div
                            key={comm.id}
                            className="flex items-center justify-between py-2.5 text-sm"
                          >
                            <span className="truncate font-bold text-gray-800">
                              {comm.title}
                            </span>
                            <span className="shrink-0 font-extrabold text-protein-green tabular-nums">
                              {Number(comm.membersCount || 0).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COMMUNITIES MANAGEMENT */}
              {section === "communities" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleCreateCommunity}
                    className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                  >
                    <h2 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                      <Plus size={18} className="text-protein-green" />
                      Create Official Community (Admin Only)
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <input
                        required
                        value={newComm.title}
                        onChange={(e) => setNewComm((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Community Name"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <select
                        value={newComm.category}
                        onChange={(e) => setNewComm((p) => ({ ...p, category: e.target.value }))}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      >
                        <option>Goal Based</option>
                        <option>Life Stage</option>
                        <option>Diet Type</option>
                        <option>Local</option>
                      </select>
                      <input
                        value={newComm.goal}
                        onChange={(e) => setNewComm((p) => ({ ...p, goal: e.target.value }))}
                        placeholder="Primary Goal (e.g. Build Muscle)"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        value={newComm.location}
                        onChange={(e) => setNewComm((p) => ({ ...p, location: e.target.value }))}
                        placeholder="Location (e.g. India / Vizag)"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        required
                        value={newComm.description}
                        onChange={(e) =>
                          setNewComm((p) => ({ ...p, description: e.target.value }))
                        }
                        placeholder="Short community description"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-protein-green px-5 py-2 text-sm font-bold text-white hover:bg-protein-hover"
                      >
                        Create Community
                      </button>
                    </div>
                  </form>

                  <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-extrabold text-protein-dark">
                      All Communities ({communities.length})
                    </h3>
                    <div className="mt-3 divide-y divide-gray-100">
                      {communities.map((comm) => (
                        <div
                          key={comm.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            <p className="font-bold text-gray-900">{comm.title}</p>
                            <p className="text-xs text-gray-500">
                              {comm.category} • {comm.location} •{" "}
                              {Number(comm.membersCount || 0).toLocaleString()} members
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                comm.status === "paused"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-protein-green"
                              }`}
                            >
                              {comm.status || "active"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleCommunityStatus(comm)}
                              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                            >
                              {comm.status === "paused" ? "Activate" : "Pause"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MEMBERS */}
              {section === "members" && (
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-base font-extrabold text-protein-dark">
                      Registered Members ({filteredMembers.length})
                    </h2>
                    <input
                      type="search"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search by name, city, goal..."
                      className="rounded-xl border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-protein-green"
                    />
                  </div>

                  <div className="mt-4 divide-y divide-gray-100">
                    {filteredMembers.length === 0 ? (
                      <p className="py-6 text-center text-sm text-gray-500">
                        No members found in Firestore yet.
                      </p>
                    ) : (
                      filteredMembers.map((m) => (
                        <div
                          key={m.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {m.displayName || "Member"}{" "}
                              <span className="ml-1 text-xs font-semibold text-protein-green">
                                ({m.rankBadge || "Member"})
                              </span>
                            </p>
                            <p className="text-xs text-gray-500">
                              {m.goal} • {m.dailyProteinTarget || 90}g/day • {m.points || 0} pts •{" "}
                              {m.location || "India"}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {["active", "warned", "restricted", "blocked"].map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => handleUpdateMemberStatus(m.id, st)}
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition ${
                                  m.status === st
                                    ? st === "blocked"
                                      ? "bg-red-600 text-white"
                                      : "bg-protein-green text-white"
                                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* POSTS & DISCUSSIONS */}
              {section === "posts" && (
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-base font-extrabold text-protein-dark">
                      Posts & Discussions ({filteredPosts.length})
                    </h2>
                    <div className="flex gap-2">
                      {["all", "published", "hidden"].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setPostFilter(f)}
                          className={`rounded-full px-3.5 py-1 text-xs font-bold capitalize ${
                            postFilter === f
                              ? "bg-protein-dark text-white"
                              : "border border-gray-200 text-gray-700"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 divide-y divide-gray-100">
                    {filteredPosts.length === 0 ? (
                      <p className="py-6 text-center text-sm text-gray-500">
                        No posts in Firestore matching this filter.
                      </p>
                    ) : (
                      filteredPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-protein-green">
                              {post.authorName} • {post.communitySlug} • {post.status}
                              {post.isPinned ? " • Pinned" : ""}
                            </p>
                            <p className="mt-1 text-sm text-gray-800">{post.text}</p>
                          </div>
                          <div className="flex shrink-0 flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleModeratePost(post, { isPinned: !post.isPinned })
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                            >
                              <Pin size={13} />
                              {post.isPinned ? "Unpin" : "Pin"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleModeratePost(post, {
                                  status: post.status === "hidden" ? "published" : "hidden",
                                })
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                            >
                              {post.status === "hidden" ? <Eye size={13} /> : <EyeOff size={13} />}
                              {post.status === "hidden" ? "Restore" : "Hide"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePost(post.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={13} />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* CHALLENGES */}
              {section === "challenges" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleCreateChallenge}
                    className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                  >
                    <h2 className="text-base font-extrabold text-protein-dark">
                      Create New Challenge
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <input
                        required
                        value={newChallenge.title}
                        onChange={(e) =>
                          setNewChallenge((p) => ({ ...p, title: e.target.value }))
                        }
                        placeholder="Challenge Title"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        value={newChallenge.goal}
                        onChange={(e) =>
                          setNewChallenge((p) => ({ ...p, goal: e.target.value }))
                        }
                        placeholder="Target Goal"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={newChallenge.durationDays}
                        onChange={(e) =>
                          setNewChallenge((p) => ({ ...p, durationDays: e.target.value }))
                        }
                        placeholder="Days"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        type="number"
                        value={newChallenge.rewardPoints}
                        onChange={(e) =>
                          setNewChallenge((p) => ({ ...p, rewardPoints: e.target.value }))
                        }
                        placeholder="Points Reward"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        value={newChallenge.subtitle}
                        onChange={(e) =>
                          setNewChallenge((p) => ({ ...p, subtitle: e.target.value }))
                        }
                        placeholder="Challenge subtitle"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-protein-green px-5 py-2 text-sm font-bold text-white hover:bg-protein-hover"
                      >
                        Publish Challenge
                      </button>
                    </div>
                  </form>

                  <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-extrabold text-protein-dark">
                      Manage Challenges ({challenges.length})
                    </h3>
                    <div className="mt-3 divide-y divide-gray-100">
                      {challenges.map((ch) => (
                        <div
                          key={ch.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            <p className="font-bold text-gray-900">{ch.title}</p>
                            <p className="text-xs text-gray-500">
                              {ch.durationDays} Days • {ch.participantsCount || 0} participants •{" "}
                              {ch.status}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleChallengeStatus(ch)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                          >
                            {ch.status === "archived" ? "Activate" : "Archive"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* EVENTS & WEBINARS */}
              {section === "events" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleCreateEvent}
                    className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                  >
                    <h2 className="text-base font-extrabold text-protein-dark">
                      Publish New Event / Webinar
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <input
                        required
                        value={newEvent.title}
                        onChange={(e) => setNewEvent((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Event Title"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent((p) => ({ ...p, type: e.target.value }))}
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      >
                        <option>Webinar</option>
                        <option>Workshop</option>
                        <option>Meetup</option>
                      </select>
                      <input
                        value={newEvent.dateLabel}
                        onChange={(e) =>
                          setNewEvent((p) => ({ ...p, dateLabel: e.target.value }))
                        }
                        placeholder="Date (e.g. Dec 20, 2026)"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        value={newEvent.timeLabel}
                        onChange={(e) =>
                          setNewEvent((p) => ({ ...p, timeLabel: e.target.value }))
                        }
                        placeholder="Time (e.g. 7:00 PM IST)"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent((p) => ({ ...p, description: e.target.value }))
                        }
                        placeholder="Event summary"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-protein-green px-5 py-2 text-sm font-bold text-white hover:bg-protein-hover"
                      >
                        Create Event
                      </button>
                    </div>
                  </form>

                  <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-extrabold text-protein-dark">
                      Scheduled Events ({events.length})
                    </h3>
                    <div className="mt-3 divide-y divide-gray-100">
                      {events.map((ev) => (
                        <div key={ev.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-bold text-gray-900">{ev.title}</p>
                            <p className="text-xs text-gray-500">
                              {ev.type} • {ev.dateLabel} • {ev.timeLabel} • {ev.rsvpCount || 0} RSVPs
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* REPORTS */}
              {section === "reports" && (
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <h2 className="text-base font-extrabold text-protein-dark">
                    Moderation Queue ({reports.length})
                  </h2>
                  <div className="mt-4 divide-y divide-gray-100">
                    {reports.length === 0 ? (
                      <p className="py-6 text-center text-sm text-gray-500">
                        No reports filed yet.
                      </p>
                    ) : (
                      reports.map((rep) => (
                        <div
                          key={rep.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            <p className="text-xs font-bold text-orange-600 uppercase">
                              {rep.targetType} • {rep.status}
                            </p>
                            <p className="mt-0.5 text-sm font-bold text-gray-900">
                              {rep.reason}
                            </p>
                            <p className="text-xs text-gray-500">
                              Reported by {rep.reporterName} • Target: {rep.targetId}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {["reviewed", "resolved", "dismissed"].map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={async () => {
                                  await adminUpdateReportStatus(rep.id, st);
                                  setReports((prev) =>
                                    prev.map((r) => (r.id === rep.id ? { ...r, status: st } : r))
                                  );
                                  showToast(`Report marked ${st}.`);
                                }}
                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold capitalize text-gray-700 hover:bg-gray-50"
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* COMMUNITY SUGGESTIONS */}
              {section === "suggestions" && (
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <h2 className="text-base font-extrabold text-protein-dark">
                    Member Community Suggestions ({suggestions.length})
                  </h2>
                  <div className="mt-4 divide-y divide-gray-100">
                    {suggestions.length === 0 ? (
                      <p className="py-6 text-center text-sm text-gray-500">
                        No community suggestions submitted yet.
                      </p>
                    ) : (
                      suggestions.map((sug) => (
                        <div
                          key={sug.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                        >
                          <div>
                            <p className="text-sm font-extrabold text-protein-dark">
                              {sug.communityName}{" "}
                              <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold capitalize text-gray-700">
                                {sug.status}
                              </span>
                            </p>
                            <p className="text-xs text-gray-600">
                              Audience: {sug.audience} • Goal: {sug.goal} • Diet: {sug.diet}
                            </p>
                            <p className="mt-1 text-xs text-gray-700">{sug.reason}</p>
                          </div>
                          {sug.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={async () => {
                                  await adminReviewSuggestion(sug, "approved");
                                  showToast(`Approved "${sug.communityName}" & created community!`);
                                  await loadAllAdminData();
                                }}
                                className="inline-flex items-center gap-1 rounded-lg bg-protein-green px-3 py-1.5 text-xs font-bold text-white"
                              >
                                <CheckCircle2 size={14} />
                                Approve & Create
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  await adminReviewSuggestion(sug, "rejected");
                                  showToast("Suggestion declined.", "info");
                                  await loadAllAdminData();
                                }}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600"
                              >
                                <XCircle size={14} />
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* LEADER APPLICATIONS */}
              {section === "leaders" && (
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <h2 className="text-base font-extrabold text-protein-dark">
                    Protein Leader Applications ({leaderApps.length})
                  </h2>
                  <div className="mt-4 divide-y divide-gray-100">
                    {leaderApps.length === 0 ? (
                      <p className="py-6 text-center text-sm text-gray-500">
                        No leader applications submitted yet.
                      </p>
                    ) : (
                      leaderApps.map((app) => (
                        <div
                          key={app.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                        >
                          <div>
                            <p className="text-sm font-extrabold text-protein-dark">
                              {app.fullName} ({app.city}){" "}
                              <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold capitalize text-gray-700">
                                {app.status}
                              </span>
                            </p>
                            <p className="text-xs text-gray-600">
                              {app.occupation} • Focus: {app.interest}
                            </p>
                            <p className="mt-1 text-xs text-gray-700">{app.reason}</p>
                          </div>
                          {app.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={async () => {
                                  await adminReviewLeaderApplication(app, "approved");
                                  showToast(`${app.fullName} granted Protein Leader badge!`);
                                  await loadAllAdminData();
                                }}
                                className="inline-flex items-center gap-1 rounded-lg bg-protein-green px-3 py-1.5 text-xs font-bold text-white"
                              >
                                <Award size={14} />
                                Approve Leader
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  await adminReviewLeaderApplication(app, "rejected");
                                  showToast("Application declined.", "info");
                                  await loadAllAdminData();
                                }}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600"
                              >
                                <XCircle size={14} />
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* REWARDS & COINS */}
              {section === "rewards" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleCreateReward}
                    className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                  >
                    <h2 className="text-base font-extrabold text-protein-dark">
                      Add Reward Voucher
                    </h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <input
                        required
                        value={newReward.title}
                        onChange={(e) => setNewReward((p) => ({ ...p, title: e.target.value }))}
                        placeholder="Reward Title"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <select
                        value={newReward.category}
                        onChange={(e) =>
                          setNewReward((p) => ({ ...p, category: e.target.value }))
                        }
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      >
                        <option>Product Discount</option>
                        <option>Delivery Benefit</option>
                        <option>Protein Product</option>
                        <option>Special Offer</option>
                      </select>
                      <input
                        type="number"
                        min={50}
                        value={newReward.coinsCost}
                        onChange={(e) =>
                          setNewReward((p) => ({ ...p, coinsCost: e.target.value }))
                        }
                        placeholder="Coins Cost"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <input
                        value={newReward.codePrefix}
                        onChange={(e) =>
                          setNewReward((p) => ({ ...p, codePrefix: e.target.value }))
                        }
                        placeholder="Code Prefix (e.g. EP100)"
                        className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <input
                        required
                        value={newReward.description}
                        onChange={(e) =>
                          setNewReward((p) => ({ ...p, description: e.target.value }))
                        }
                        placeholder="Voucher description"
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-protein-green"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-protein-green px-5 py-2 text-sm font-bold text-white hover:bg-protein-hover"
                      >
                        Add Reward
                      </button>
                    </div>
                  </form>

                  <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                    <h3 className="text-base font-extrabold text-protein-dark">
                      Active Rewards Catalog ({rewards.length})
                    </h3>
                    <div className="mt-3 divide-y divide-gray-100">
                      {rewards.map((rw) => (
                        <div key={rw.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-bold text-gray-900">{rw.title}</p>
                            <p className="text-xs text-gray-500">
                              {rw.category} • {rw.description}
                            </p>
                          </div>
                          <span className="font-extrabold text-amber-600 tabular-nums">
                            {rw.coinsCost} Coins
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
