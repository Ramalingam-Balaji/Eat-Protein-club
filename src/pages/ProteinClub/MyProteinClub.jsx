import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Coins,
  Crown,
  Edit3,
  Flame,
  Gift,
  Heart,
  MessageSquare,
  Plus,
  Smartphone,
  Target,
  Trophy,
  Users,
  Utensils,
  X,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  fetchChallenges,
  fetchChallengeParticipation,
  fetchCommunities,
  fetchLeaderboardUsers,
  fetchProteinLogs,
  fetchRecentFeedPosts,
  getUserJoinedCommunities,
  logProteinIntake,
} from "../../services/proteinClubService";
import {
  clubImages,
  defaultChampions,
} from "./data/communities";

const mealPresets = [
  { name: "2 Boiled Eggs + Milk", grams: 18 },
  { name: "Paneer Bowl (120g)", grams: 24 },
  { name: "Chicken Breast (150g)", grams: 35 },
  { name: "Greek Yogurt + Nuts", grams: 16 },
  { name: "Whey / Plant Protein Shake", grams: 25 },
  { name: "Moong Dal Chilla (2 pcs)", grams: 18 },
];

export default function MyProteinClub() {
  const navigate = useNavigate();
  const { user, profile, authLoading, refreshProfile, showToast } = useProteinClubAuth();

  const [communities, setCommunities] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [challengePart, setChallengePart] = useState(null);
  const [proteinLogs, setProteinLogs] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [topLeaders, setTopLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track Protein Modal
  const [showLogModal, setShowLogModal] = useState(false);
  const [mealName, setMealName] = useState("");
  const [proteinGrams, setProteinGrams] = useState(25);
  const [mealNotes, setMealNotes] = useState("");
  const [logging, setLogging] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [allComms, allChalls, posts, board] = await Promise.all([
        fetchCommunities(false).catch(() => []),
        fetchChallenges(false).catch(() => []),
        fetchRecentFeedPosts(4).catch(() => []),
        fetchLeaderboardUsers().catch(() => []),
      ]);
      setCommunities(allComms || []);
      setChallenges(allChalls || []);
      setRecentPosts(posts || []);
      setTopLeaders(board || []);

      if (user) {
        const [joined, part, logs] = await Promise.all([
          getUserJoinedCommunities(user.uid, allComms).catch(() => []),
          fetchChallengeParticipation("21-day-protein-challenge", user.uid).catch(() => null),
          fetchProteinLogs(user.uid).catch(() => []),
        ]);
        setJoinedIds(joined || []);
        setChallengePart(part);
        setProteinLogs(logs || []);
      } else {
        setJoinedIds([]);
        setChallengePart(null);
        setProteinLogs([]);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadDashboard();
    });
  }, [loadDashboard]);

  const myCommunities = useMemo(() => {
    if (joinedIds.length > 0) {
      return communities.filter((c) => joinedIds.includes(c.id));
    }
    return communities.slice(0, 3);
  }, [communities, joinedIds]);

  const leaderboardTop5 = useMemo(() => {
    const map = new Map();
    defaultChampions.forEach((c) => map.set(c.uid, c));
    topLeaders.forEach((u) =>
      map.set(u.uid || u.id, {
        uid: u.uid || u.id,
        displayName: u.displayName || "Member",
        points: Number(u.points || 0),
        streak: Number(u.streak || 0),
      })
    );
    return Array.from(map.values())
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  }, [topLeaders]);

  const dailyGoal = Number(profile?.dailyProteinTarget || 90);
  const todayProtein = Number(profile?.todayProtein || 0);
  const todayPercent = Math.min(100, Math.round((todayProtein / dailyGoal) * 100));
  const currentStreak = Number(profile?.streak || challengePart?.streak || 0);
  const activeChallengesCount = Number(
    profile?.activeChallengesCount || (challengePart ? 1 : 0)
  );
  const joinedCommunitiesCount = joinedIds.length || Number(profile?.joinedCommunitiesCount || 0);
  const totalPoints = Number(profile?.points || 0);
  const totalCoins = Number(profile?.coins || 0);

  const challengeCompletedCount = Array.isArray(challengePart?.completedDays)
    ? challengePart.completedDays.length
    : 0;
  const challengePercent = Math.round((challengeCompletedCount / 21) * 100);

  const todayDateStr = new Date().toISOString().slice(0, 10);
  const todaysLogs = proteinLogs.filter((l) => l.date === todayDateStr);

  const handleTrackProteinSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/protein-club/register");
      return;
    }
    if (!mealName.trim()) {
      showToast("Enter a meal name first.", "error");
      return;
    }
    setLogging(true);
    try {
      const { logData } = await logProteinIntake({
        user,
        profile,
        mealName: mealName.trim(),
        proteinGrams,
        notes: mealNotes,
      });
      setProteinLogs((prev) => [logData, ...prev]);
      await refreshProfile();
      setMealName("");
      setProteinGrams(25);
      setMealNotes("");
      setShowLogModal(false);
      showToast(`Logged +${logData.proteinGrams}g protein! +20 Points & +10 Coins awarded.`);
    } catch (err) {
      showToast(err?.message || "Could not log protein intake.", "error");
    } finally {
      setLogging(false);
    }
  };

  if (!authLoading && !user) {
    return (
      <ProteinClubLayout breadcrumbs={[{ label: "My Protein Club" }]}>
        <div className="mx-auto max-w-2xl rounded-3xl border border-green-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-protein-soft text-protein-green">
            <Users size={30} />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-protein-dark sm:text-3xl">
            Welcome to My Protein Club
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Sign in with your EatProtein account to view your daily protein progress, active 21-day challenge streak, joined communities, and Protein Coins.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/protein-club/register"
              className="inline-flex items-center gap-2 rounded-full bg-protein-orange px-6 py-3 text-sm font-extrabold text-white shadow-sm hover:bg-protein-orange2"
            >
              Join Protein Club – FREE
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/protein-club/communities"
              className="inline-flex items-center gap-2 rounded-full border border-green-200 px-6 py-3 text-sm font-bold text-protein-green hover:bg-protein-soft"
            >
              Explore Communities
            </Link>
          </div>
        </div>
      </ProteinClubLayout>
    );
  }

  return (
    <ProteinClubLayout breadcrumbs={[{ label: "My Protein Club" }]}>
      <div className="space-y-5">
        {/* Profile Header Card */}
        <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {profile?.photoURL || user?.photoURL ? (
                <img
                  src={profile?.photoURL || user?.photoURL}
                  alt={profile?.displayName || "Member"}
                  className="h-16 w-16 rounded-2xl border border-green-100 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-protein-soft text-xl font-black text-protein-green">
                  {(profile?.displayName || user?.displayName || "E")[0]}
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-extrabold text-protein-dark sm:text-2xl">
                    {profile?.displayName || user?.displayName || "EatProtein Member"}
                  </h1>
                  <span className="rounded-full bg-protein-soft px-2.5 py-0.5 text-xs font-bold text-protein-green">
                    {profile?.rankBadge || "Protein Member"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  Goal: <span className="font-bold text-protein-dark">{profile?.goal || "Build Muscle"}</span> • Diet:{" "}
                  <span className="font-bold text-protein-dark">{profile?.dietPreference || "Balanced"}</span> •{" "}
                  {profile?.location || "India"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/protein-club/register"
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                <Edit3 size={14} />
                Edit Profile
              </Link>
              <Link
                to="/protein-club/goal"
                className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-protein-soft px-4 py-2 text-xs font-bold text-protein-green hover:bg-green-100"
              >
                <Target size={14} />
                Edit Goal
              </Link>
            </div>
          </div>

          {/* 7 Summary Tiles (Phase 10 Spec) */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            <div className="rounded-2xl border border-green-100 bg-protein-surface p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Protein Goal</p>
              <p className="mt-1 text-lg font-black text-protein-dark tabular-nums">
                {dailyGoal}g/day
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-protein-surface p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Today’s Progress</p>
              <p className="mt-1 text-lg font-black text-protein-green tabular-nums">
                {todayProtein}g / {dailyGoal}g
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-protein-green"
                  style={{ width: `${todayPercent}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-orange-50/40 p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Current Streak</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-black text-orange-600 tabular-nums">
                <Flame size={17} />
                {currentStreak} Days
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-protein-surface p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Challenges</p>
              <p className="mt-1 text-lg font-black text-protein-dark tabular-nums">
                {activeChallengesCount} Active
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-protein-surface p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Communities</p>
              <p className="mt-1 text-lg font-black text-protein-dark tabular-nums">
                {joinedCommunitiesCount} Joined
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-protein-surface p-3.5">
              <p className="text-[11px] font-semibold text-gray-500">Protein Points</p>
              <p className="mt-1 text-lg font-black text-protein-green tabular-nums">
                {totalPoints.toLocaleString()}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 sm:col-span-1">
              <p className="text-[11px] font-semibold text-amber-800">Protein Coins</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-black text-amber-700 tabular-nums">
                <Coins size={17} />
                {totalCoins.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 4 Primary Action Buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setShowLogModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-protein-orange px-5 py-2.5 text-xs font-extrabold text-white shadow-sm hover:bg-protein-orange2"
            >
              <Plus size={15} />
              Track Protein
            </button>
            <Link
              to="/protein-club/challenges"
              className="inline-flex items-center gap-2 rounded-full bg-protein-green px-5 py-2.5 text-xs font-extrabold text-white shadow-sm hover:bg-protein-hover"
            >
              <Trophy size={15} />
              Continue Challenge
            </Link>
            <Link
              to="/protein-club/communities"
              className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2.5 text-xs font-bold text-protein-dark hover:bg-protein-soft"
            >
              <Users size={15} className="text-protein-green" />
              My Communities
            </Link>
            <Link
              to="/protein-club/rewards"
              className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-100"
            >
              <Gift size={15} className="text-amber-600" />
              Rewards
            </Link>
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid items-start gap-5 xl:grid-cols-2">
          {/* Active Challenge & Today's Meal Logs */}
          <section className="space-y-5">
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-protein-dark">
                  Active Challenge Progress
                </h2>
                <Link
                  to="/protein-club/challenges"
                  className="text-xs font-bold text-protein-green hover:underline"
                >
                  Open Challenge →
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-protein-surface p-4 sm:flex-row sm:items-center">
                <img
                  src={clubImages.challengeDuo}
                  alt="21-Day Challenge"
                  className="h-24 w-full rounded-xl object-cover sm:w-28"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-protein-green">
                    {challenges[0]?.title || "21-Day Protein Challenge"}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-protein-dark">
                    {challengePart
                      ? `Day ${challengePart.currentDay} of 21 (${challengePercent}% complete)`
                      : "Ready to start your 21-day protein habit"}
                  </p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-protein-green"
                      style={{ width: `${challengePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Logged Meals */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                  <Utensils size={17} className="text-protein-green" />
                  Today’s Logged Protein Meals
                </h2>
                <button
                  type="button"
                  onClick={() => setShowLogModal(true)}
                  className="text-xs font-bold text-protein-orange hover:underline"
                >
                  + Log Meal
                </button>
              </div>

              {todaysLogs.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center">
                  <p className="text-xs text-gray-600">
                    No meals logged yet today. Log a meal to earn +20 Protein Points.
                  </p>
                </div>
              ) : (
                <div className="mt-3 divide-y divide-gray-100">
                  {todaysLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between py-2.5 text-sm"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{log.mealName}</p>
                        {log.notes && (
                          <p className="text-xs text-gray-500">{log.notes}</p>
                        )}
                      </div>
                      <span className="rounded-full bg-protein-soft px-3 py-1 text-xs font-extrabold text-protein-green tabular-nums">
                        +{log.proteinGrams}g
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* My Communities & Community Highlights */}
          <section className="space-y-5">
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-protein-dark">
                  {joinedIds.length > 0
                    ? `My Communities (${joinedIds.length})`
                    : "Recommended Communities"}
                </h2>
                <Link
                  to="/protein-club/communities"
                  className="text-xs font-bold text-protein-green hover:underline"
                >
                  Explore All →
                </Link>
              </div>

              {loading ? (
                <div className="mt-3 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
                  ))}
                </div>
              ) : (
                <div className="mt-3 divide-y divide-gray-100">
                  {myCommunities.slice(0, 4).map((comm) => (
                    <div
                      key={comm.id}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={comm.heroImage || clubImages.mealBowl}
                          alt={comm.title}
                          className="h-12 w-12 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-protein-dark">
                            {comm.title}
                          </p>
                          <p className="text-xs text-gray-500 tabular-nums">
                            {Number(comm.membersCount || 0).toLocaleString()} members
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/protein-club/community/${comm.slug}`}
                        className="shrink-0 rounded-full bg-protein-soft px-3.5 py-1.5 text-xs font-bold text-protein-green hover:bg-green-100"
                      >
                        Open
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Community Highlights + Top 5 */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-protein-dark">
                  Community Highlights
                </h2>
                <Link
                  to="/protein-club/leaderboard"
                  className="text-xs font-bold text-protein-green hover:underline"
                >
                  Leaderboard →
                </Link>
              </div>

              <div className="mt-3 space-y-3">
                {recentPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    to={`/protein-club/community/${post.communitySlug || "build-muscle"}`}
                    className="block rounded-xl border border-gray-100 bg-protein-surface p-3.5 transition hover:border-green-200"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-protein-dark">
                        {post.authorName}
                      </span>
                      <span className="text-gray-500">{post.category || "Progress"}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-700">
                      {post.text}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[11px] font-semibold text-gray-500 tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <Heart size={12} className="text-red-500" />
                        {post.likesCount || post.likes || 0}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare size={12} />
                        {post.commentsCount || 0}
                      </span>
                    </div>
                  </Link>
                ))}

                {/* Mini Leaderboard Strip */}
                <div className="rounded-xl border border-green-100 bg-white p-3.5">
                  <p className="flex items-center gap-1.5 text-xs font-extrabold text-protein-dark">
                    <Crown size={14} className="text-amber-500" />
                    This Week’s Leaders
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {leaderboardTop5.slice(0, 3).map((leader, idx) => (
                      <div
                        key={leader.uid}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-gray-800">
                          #{idx + 1} {leader.displayName}
                        </span>
                        <span className="font-extrabold text-protein-green tabular-nums">
                          {leader.points.toLocaleString()} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Phase 11 Web -> Mobile App Sync Banner */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-protein-dark p-6 text-white sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Smartphone size={24} />
            </span>
            <div>
              <h2 className="text-lg font-extrabold">
                Sync Your Progress with the EatProtein Mobile App
              </h2>
              <p className="mt-0.5 text-xs text-emerald-100/90 sm:text-sm">
                Log meals in seconds, scan packaged foods, and keep your Protein Club streak alive on Android & iOS.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/", { state: { scrollTo: "app-promo" } })}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-protein-orange px-5 py-2.5 text-xs font-extrabold text-white hover:bg-protein-orange2"
          >
            Get the App
            <ArrowRight size={15} />
          </button>
        </section>
      </div>

      {/* Track Protein Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-protein-dark">
                Track Today’s Protein
              </h2>
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3">
              <p className="text-xs font-bold text-gray-500">Quick Presets</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mealPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setMealName(preset.name);
                      setProteinGrams(preset.grams);
                    }}
                    className="rounded-full border border-green-200 bg-protein-surface px-3 py-1 text-xs font-semibold text-protein-dark hover:bg-green-100"
                  >
                    {preset.name} ({preset.grams}g)
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleTrackProteinSubmit} className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">
                  Meal / Food Description
                </label>
                <input
                  type="text"
                  required
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="e.g., Grilled Paneer & Dal Bowl"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-protein-green"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">
                  Protein Amount (grams)
                </label>
                <input
                  type="number"
                  min={1}
                  max={250}
                  required
                  value={proteinGrams}
                  onChange={(e) => setProteinGrams(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-bold outline-none focus:border-protein-green"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-gray-700">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={mealNotes}
                  onChange={(e) => setMealNotes(e.target.value)}
                  placeholder="Breakfast / Post-workout"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-protein-green"
                />
              </div>

              <button
                type="submit"
                disabled={logging}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-5 py-3 text-sm font-extrabold text-white hover:bg-protein-hover disabled:opacity-60"
              >
                <CheckCircle2 size={17} />
                {logging ? "Logging Meal..." : "Save Protein Log (+20 Points)"}
              </button>
            </form>
          </div>
        </div>
      )}
    </ProteinClubLayout>
  );
}
