import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Coins,
  Copy,
  Crown,
  Flame,
  Gift,
  Info,
  Medal,
  Tag,
  Trophy,
  Users,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  fetchLeaderboardUsers,
  fetchRewards,
  fetchUserRedemptions,
  redeemReward,
} from "../../services/proteinClubService";
import {
  defaultChampions,
  pointScoringRules,
} from "./data/communities";

export default function LeaderboardRewards({ defaultTab = "leaderboard" }) {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, showToast } = useProteinClubAuth();

  const [tabOverride, setTabOverride] = useState(null);
  const activeTab = tabOverride?.defaultTab === defaultTab ? tabOverride.value : defaultTab;
  const setActiveTab = (value) => setTabOverride({ defaultTab, value });

  const [period, setPeriod] = useState("This Week");
  const [liveUsers, setLiveUsers] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersList, rewardsList, userRedemptions] = await Promise.all([
        fetchLeaderboardUsers().catch(() => []),
        fetchRewards(false).catch(() => []),
        user ? fetchUserRedemptions(user.uid).catch(() => []) : Promise.resolve([]),
      ]);
      setLiveUsers(usersList || []);
      setRewards(rewardsList || []);
      setRedemptions(userRedemptions || []);
    } catch (err) {
      console.error("Leaderboard/Rewards load error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadData();
    });
  }, [loadData]);

  const mergedLeaderboard = useMemo(() => {
    const map = new Map();
    defaultChampions.forEach((c) => {
      map.set(c.uid, {
        uid: c.uid,
        displayName: c.displayName,
        location: c.location,
        points: c.points,
        streak: c.streak,
        rankBadge: c.rankBadge,
      });
    });

    liveUsers.forEach((u) => {
      map.set(u.uid || u.id, {
        uid: u.uid || u.id,
        displayName: u.displayName || "Member",
        location: u.location || "India",
        points: Number(u.points || 0),
        streak: Number(u.streak || 0),
        rankBadge: u.rankBadge || "Member",
      });
    });

    if (user && profile) {
      map.set(user.uid, {
        uid: user.uid,
        displayName: profile.displayName || user.displayName || "You",
        location: profile.location || "India",
        points: Number(profile.points || 0),
        streak: Number(profile.streak || 0),
        rankBadge: profile.rankBadge || "Member",
        isCurrentUser: true,
      });
    }

    const factor = period === "This Month" ? 1.4 : period === "All Time" ? 2.2 : 1;
    return Array.from(map.values())
      .map((entry) => ({
        ...entry,
        displayPoints:
          entry.isCurrentUser || period === "This Week"
            ? entry.points
            : Math.round(entry.points * factor),
      }))
      .sort((a, b) => b.displayPoints - a.displayPoints);
  }, [liveUsers, period, profile, user]);

  const userRank = useMemo(() => {
    if (!user) return "—";
    const idx = mergedLeaderboard.findIndex((u) => u.uid === user.uid);
    return idx >= 0 ? `#${idx + 1}` : "—";
  }, [mergedLeaderboard, user]);

  const userCoins = Number(profile?.coins || 0);
  const userPoints = Number(profile?.points || 0);
  const userStreak = Number(profile?.streak || 0);

  const handleRedeem = async (reward) => {
    if (!user) {
      showToast("Please sign in to redeem Protein Coins.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (reward._seededFallback) {
      showToast(
        "Rewards catalog requires initial database activation by an admin.",
        "error"
      );
      return;
    }
    setRedeemingId(reward.id);
    try {
      const issued = await redeemReward({ reward, user, profile });
      setRedemptions((prev) => [issued, ...prev]);
      await refreshProfile();
      showToast(`Redeemed "${reward.title}"! Voucher code: ${issued.couponCode}`);
    } catch (err) {
      showToast(err?.message || "Could not redeem reward.", "error");
    } finally {
      setRedeemingId(null);
    }
  };

  const handleCopyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast(`Copied voucher code ${code}`);
      window.setTimeout(() => setCopiedCode(""), 2000);
    } catch {
      showToast(`Voucher code: ${code}`, "info");
    }
  };

  return (
    <ProteinClubLayout
      breadcrumbs={[
        { label: activeTab === "rewards" ? "Rewards & Coins" : "Leaderboard" },
      ]}
    >
      <div className="space-y-5">
        {/* Hero Header */}
        <section className="rounded-3xl bg-gradient-to-r from-protein-soft via-protein-surface to-protein-tint p-5 sm:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-protein-green">
                <Trophy size={14} />
                Protein Club Recognition
              </span>
              <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight text-protein-dark sm:text-3xl">
                {activeTab === "rewards"
                  ? "Protein Coins & Rewards"
                  : "Leaderboard & Rewards"}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-700">
                Rankings reward consistency, challenge completion, daily protein tracking, and helpful community posts — never extreme quantities.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <Coins size={24} />
              </span>
              <div>
                <p className="text-xs font-semibold text-gray-500">Available Balance</p>
                <p className="text-xl font-black text-protein-dark tabular-nums">
                  {userCoins.toLocaleString()} Coins
                </p>
              </div>
            </div>
          </div>

          {/* Primary Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
              { id: "rewards", label: "Rewards & Coins", icon: Gift },
              { id: "rules", label: "How Points Work", icon: Info },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-protein-green text-white shadow-sm"
                      : "bg-white text-gray-700 hover:bg-green-50"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main 2-Column Content */}
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="min-w-0 space-y-5">
            {activeTab === "leaderboard" && (
              <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-protein-dark">
                      {period}’s Protein Champions
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Ranked by healthy engagement, challenge streaks, and community contributions.
                    </p>
                  </div>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    aria-label="Leaderboard timeframe"
                    className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-bold text-gray-800 outline-none focus:border-protein-green"
                  >
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                    <option value="All Time">All Time</option>
                  </select>
                </div>

                {/* Top 3 Podium Cards */}
                {!loading && mergedLeaderboard.length >= 3 && (
                  <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {mergedLeaderboard.slice(0, 3).map((person, idx) => (
                      <div
                        key={person.uid}
                        className={`rounded-2xl border p-4 text-center ${
                          idx === 0
                            ? "border-amber-200 bg-gradient-to-b from-amber-50/70 to-white"
                            : idx === 1
                            ? "border-gray-200 bg-gray-50/60"
                            : "border-orange-200 bg-orange-50/40"
                        }`}
                      >
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                          <Crown
                            size={22}
                            className={
                              idx === 0
                                ? "text-amber-500"
                                : idx === 1
                                ? "text-gray-400"
                                : "text-orange-500"
                            }
                          />
                        </div>
                        <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-gray-500">
                          Rank #{idx + 1}
                        </p>
                        <h3 className="mt-0.5 truncate text-base font-extrabold text-protein-dark">
                          {person.displayName}
                        </h3>
                        <p className="text-xs text-gray-500">{person.location}</p>
                        <p className="mt-2 text-lg font-black text-protein-green tabular-nums">
                          {person.displayPoints.toLocaleString()} pts
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Standings Table */}
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  <div className="grid grid-cols-[52px_1.4fr_0.9fr_100px] bg-protein-surface px-4 py-2.5 text-xs font-extrabold text-gray-600">
                    <span>Rank</span>
                    <span>Member</span>
                    <span>Streak / Badge</span>
                    <span className="text-right">Points</span>
                  </div>

                  {loading ? (
                    <div className="p-6 text-center text-sm text-gray-500">
                      Loading leaderboard...
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {mergedLeaderboard.map((member, index) => (
                        <div
                          key={member.uid}
                          className={`grid grid-cols-[52px_1.4fr_0.9fr_100px] items-center px-4 py-3 text-sm ${
                            member.isCurrentUser ? "bg-protein-soft font-bold" : "bg-white hover:bg-gray-50"
                          }`}
                        >
                          <span className="font-extrabold text-gray-700 tabular-nums">
                            #{index + 1}
                          </span>
                          <div className="min-w-0 pr-2">
                            <p className="truncate font-bold text-gray-900">
                              {member.displayName}
                              {member.isCurrentUser && (
                                <span className="ml-1.5 text-xs font-extrabold text-protein-green">
                                  (You)
                                </span>
                              )}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {member.location || "India"}
                            </p>
                          </div>
                          <div className="min-w-0 pr-2">
                            <p className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 tabular-nums">
                              <Flame size={13} className="text-orange-500" />
                              {member.streak || 0}d • {member.rankBadge || "Member"}
                            </p>
                          </div>
                          <span className="text-right font-extrabold text-protein-green tabular-nums">
                            {member.displayPoints.toLocaleString()} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-5">
                {/* Wallet Card */}
                <section className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-[#FFF9E6] to-[#FFF2C9] p-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                      EatProtein Rewards Wallet
                    </p>
                    <h2 className="mt-1 text-3xl font-black text-protein-dark tabular-nums">
                      {userCoins.toLocaleString()} Protein Coins
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                      Earn coins by completing challenge days, logging daily protein, and helping community members.
                    </p>
                  </div>
                  <Link
                    to="/protein-club/challenges"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-protein-green px-5 py-2.5 text-xs font-bold text-white hover:bg-protein-hover"
                  >
                    Earn More Coins
                    <ArrowRight size={15} />
                  </Link>
                </section>

                {/* Redeemable Rewards Catalog */}
                <section className="grid gap-4 sm:grid-cols-2">
                  {rewards.map((reward) => {
                    const cost = Number(reward.coinsCost || 0);
                    const affordable = userCoins >= cost;
                    return (
                      <div
                        key={reward.id}
                        className="flex flex-col justify-between rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-protein-soft px-3 py-1 text-xs font-bold text-protein-green">
                              <Tag size={12} />
                              {reward.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-amber-600 tabular-nums">
                              <Coins size={15} />
                              {cost.toLocaleString()}
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-extrabold text-protein-dark">
                            {reward.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            {reward.description}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                          <span className="text-xs font-semibold text-gray-500">
                            {!user
                              ? "Sign in to redeem"
                              : affordable
                              ? "Ready to redeem"
                              : `Need ${(cost - userCoins).toLocaleString()} more coins`}
                          </span>
                          <button
                            type="button"
                            disabled={redeemingId === reward.id || (Boolean(user) && !affordable)}
                            onClick={() => handleRedeem(reward)}
                            className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                              !user || affordable
                                ? "bg-protein-green text-white hover:bg-protein-hover"
                                : "cursor-not-allowed bg-gray-100 text-gray-400"
                            }`}
                          >
                            {redeemingId === reward.id ? "Redeeming..." : "Redeem"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </section>

                {/* Redeemed Vouchers History */}
                <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                    <Award size={18} className="text-protein-green" />
                    My Redeemed Vouchers ({redemptions.length})
                  </h3>
                  {redemptions.length === 0 ? (
                    <p className="mt-3 text-sm text-gray-500">
                      No vouchers redeemed yet. Redeem any reward above to generate your EatProtein coupon code.
                    </p>
                  ) : (
                    <div className="mt-3 space-y-2.5">
                      {redemptions.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-100 bg-protein-surface px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-extrabold text-protein-dark">
                              {item.rewardTitle}
                            </p>
                            <p className="text-xs text-gray-500 tabular-nums">
                              Spent {item.coinsSpent} Coins • Status: {item.status}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(item.couponCode)}
                            className="inline-flex items-center gap-2 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-xs font-extrabold text-protein-green hover:bg-green-50"
                          >
                            <span>{item.couponCode}</span>
                            {copiedCode === item.couponCode ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {activeTab === "rules" && (
              <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-extrabold text-protein-dark">
                  How to Earn Protein Points & Coins
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Healthy habits and community helpfulness drive your ranking.
                </p>

                <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
                  {pointScoringRules.map((rule) => (
                    <div
                      key={rule.action}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-2 font-semibold text-gray-800">
                        <CheckCircle2 size={16} className="text-protein-green" />
                        {rule.action}
                      </span>
                      <span className="rounded-full bg-protein-soft px-3 py-1 text-xs font-extrabold text-protein-green tabular-nums">
                        {rule.points}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT RAIL */}
          <aside className="space-y-4">
            {/* Personal Standing Card */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-extrabold text-protein-dark">
                  My Standing
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                  <Medal size={13} />
                  {profile?.rankBadge || "Member"}
                </span>
              </div>

              {user ? (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-protein-surface p-3 text-center">
                      <p className="text-xs font-semibold text-gray-500">My Rank</p>
                      <p className="mt-1 text-2xl font-black text-protein-dark tabular-nums">
                        {userRank}
                      </p>
                    </div>
                    <div className="rounded-xl bg-protein-surface p-3 text-center">
                      <p className="text-xs font-semibold text-gray-500">Total Points</p>
                      <p className="mt-1 text-2xl font-black text-protein-green tabular-nums">
                        {userPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-100 px-3.5 py-2.5 text-xs font-bold text-gray-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Flame size={15} className="text-orange-500" />
                      Current Streak
                    </span>
                    <span className="tabular-nums">{userStreak} Days</span>
                  </div>
                  <Link
                    to="/protein-club/my-club"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-200 px-4 py-2 text-xs font-bold text-protein-green hover:bg-protein-soft"
                  >
                    Open My Protein Club
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-xs leading-relaxed text-gray-600">
                    Sign in to track your rank, collect Protein Points, and redeem Protein Coins.
                  </p>
                  <Link
                    to="/protein-club/register"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-orange px-4 py-2.5 text-xs font-extrabold text-white hover:bg-protein-orange2"
                  >
                    Join Protein Club – FREE
                  </Link>
                </div>
              )}
            </div>

            {/* Scoring Rules Summary */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                <Users size={18} className="text-protein-green" />
                Earn Points Daily
              </h3>
              <div className="mt-3 space-y-2">
                {pointScoringRules.map((rule) => (
                  <div
                    key={rule.action}
                    className="flex items-center justify-between gap-2 rounded-xl bg-protein-surface px-3 py-2 text-xs"
                  >
                    <span className="font-medium text-gray-700">{rule.action}</span>
                    <span className="shrink-0 font-extrabold text-protein-green tabular-nums">
                      {rule.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Become a Protein Leader */}
            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-protein-soft to-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                <Crown size={19} className="text-amber-500" />
                Become a Protein Leader
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                Lead a regional or goal-based EatProtein community and unlock exclusive leader rewards.
              </p>
              <Link
                to="/protein-club/leader-application"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-4 py-2 text-xs font-bold text-white hover:bg-protein-hover"
              >
                Apply Now
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </ProteinClubLayout>
  );
}
