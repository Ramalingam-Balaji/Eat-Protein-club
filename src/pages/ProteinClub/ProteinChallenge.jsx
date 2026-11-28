import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Dumbbell,
  Flame,
  Info,
  Lock,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  completeChallengeDay,
  fetchChallengeLeaderboard,
  fetchChallengeParticipation,
  fetchChallenges,
  joinChallenge,
} from "../../services/proteinClubService";
import {
  clubImages,
  defaultChallengeDays,
  defaultChampions,
} from "./data/communities";

export default function ProteinChallenge() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, showToast } = useProteinClubAuth();

  const [challenges, setChallenges] = useState([]);
  const [activeChallengeId, setActiveChallengeId] = useState("21-day-protein-challenge");
  const [participation, setParticipation] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [checkedTasksByDay, setCheckedTasksByDay] = useState({});
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [completing, setCompleting] = useState(false);

  const loadChallengeState = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchChallenges(false);
      setChallenges(list);
      const primary =
        list.find((c) => c.id === activeChallengeId) ||
        list[0] || {
          id: "21-day-protein-challenge",
          title: "21-Day Protein Challenge",
          subtitle: "Build a consistent protein habit for a stronger, fitter and healthier you.",
          durationDays: 21,
          participantsCount: 12480,
          rewardPoints: 100,
          rewardCoins: 50,
          _seededFallback: true,
        };

      const targetId = primary.id;
      if (targetId !== activeChallengeId && !list.some((c) => c.id === activeChallengeId)) {
        setActiveChallengeId(targetId);
      }

      if (!primary._seededFallback) {
        const [part, board] = await Promise.all([
          user ? fetchChallengeParticipation(targetId, user.uid) : Promise.resolve(null),
          fetchChallengeLeaderboard(targetId).catch(() => []),
        ]);
        setParticipation(part);
        setLeaderboard(board || []);
        if (part?.currentDay) {
          setSelectedDay(Math.min(21, Math.max(1, part.currentDay)));
        } else {
          setSelectedDay(1);
        }
      } else {
        setParticipation(null);
        setLeaderboard([]);
        setSelectedDay(1);
      }
    } catch (err) {
      console.error("Failed loading challenge:", err);
    } finally {
      setLoading(false);
    }
  }, [activeChallengeId, user]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadChallengeState();
    });
  }, [loadChallengeState]);

  const activeChallenge = useMemo(
    () =>
      challenges.find((c) => c.id === activeChallengeId) ||
      challenges[0] || {
        id: "21-day-protein-challenge",
        title: "21-Day Protein Challenge",
        subtitle: "Build a consistent protein habit for a stronger, fitter and healthier you.",
        durationDays: 21,
        participantsCount: 12480,
        rewardPoints: 100,
        rewardCoins: 50,
      },
    [challenges, activeChallengeId]
  );

  const durationDays = Math.min(21, Number(activeChallenge.durationDays || 21));
  const completedDays = useMemo(
    () => (Array.isArray(participation?.completedDays) ? participation.completedDays : []),
    [participation]
  );
  const currentUnlockedDay = participation ? Math.min(durationDays, Number(participation.currentDay || 1)) : 1;
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / durationDays) * 100);
  const streak = Number(participation?.streak || 0);
  const pointsEarned = Number(participation?.pointsEarned || 0);
  const challengeStatus = participation
    ? completedCount >= durationDays
      ? "Completed"
      : "In Progress"
    : "Not Joined";

  const selectedDayInfo = useMemo(
    () =>
      defaultChallengeDays.find((d) => d.day === selectedDay) ||
      defaultChallengeDays[0],
    [selectedDay]
  );

  const isSelectedDayCompleted = completedDays.includes(selectedDay);
  const isSelectedDayUnlocked = participation
    ? selectedDay <= currentUnlockedDay || completedDays.includes(selectedDay)
    : selectedDay === 1;

  const checkedTasks = useMemo(
    () =>
      isSelectedDayCompleted
        ? selectedDayInfo.checklist.map((_, i) => i)
        : checkedTasksByDay[selectedDay] || [],
    [isSelectedDayCompleted, selectedDayInfo, checkedTasksByDay, selectedDay]
  );

  const mergedLeaderboard = useMemo(() => {
    const map = new Map();
    defaultChampions.forEach((c) => {
      map.set(c.uid, {
        uid: c.uid,
        displayName: c.displayName,
        days: c.streak || 19,
        pointsEarned: c.points,
      });
    });
    leaderboard.forEach((row) => {
      map.set(row.uid, {
        uid: row.uid,
        displayName: row.displayName || "Member",
        days: Array.isArray(row.completedDays) ? row.completedDays.length : row.currentDay || 1,
        pointsEarned: Number(row.pointsEarned || 0),
      });
    });
    return Array.from(map.values())
      .sort((a, b) => b.pointsEarned - a.pointsEarned)
      .slice(0, 5);
  }, [leaderboard]);

  const handleJoinChallenge = async () => {
    if (!user) {
      showToast("Please sign in or join Protein Club first.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (activeChallenge._seededFallback) {
      showToast(
        "Challenge catalog is not initialized in Firestore yet. Sign in as admin to activate database collections.",
        "error"
      );
      return;
    }
    setJoining(true);
    try {
      const part = await joinChallenge({
        challengeId: activeChallenge.id,
        user,
        profile,
      });
      setParticipation(part);
      setChallenges((prev) =>
        prev.map((c) =>
          c.id === activeChallenge.id
            ? { ...c, participantsCount: Number(c.participantsCount || 0) + 1 }
            : c
        )
      );
      await refreshProfile();
      showToast("Joined challenge! +100 Protein Points & +25 Coins awarded.");
    } catch (err) {
      showToast(err?.message || "Could not join challenge.", "error");
    } finally {
      setJoining(false);
    }
  };

  const toggleChecklist = (idx) => {
    if (isSelectedDayCompleted) return;
    setCheckedTasksByDay((prev) => {
      const current = prev[selectedDay] || [];
      return {
        ...prev,
        [selectedDay]: current.includes(idx)
          ? current.filter((item) => item !== idx)
          : [...current, idx],
      };
    });
  };

  const handleCompleteDay = async () => {
    if (!user) {
      navigate("/protein-club/register");
      return;
    }
    if (!participation) {
      await handleJoinChallenge();
      return;
    }
    if (isSelectedDayCompleted) return;
    if (!isSelectedDayUnlocked) {
      showToast(`Complete Day ${currentUnlockedDay} first to unlock Day ${selectedDay}.`, "info");
      return;
    }

    setCompleting(true);
    try {
      const res = await completeChallengeDay({
        challengeId: activeChallenge.id,
        dayNumber: selectedDay,
        user,
        profile,
      });
      setParticipation(res);
      await refreshProfile();
      const bonusMsg = res.isStreakBonus ? " (+500 Streak Bonus!)" : "";
      showToast(
        `Day ${selectedDay} completed! +${res.pointsAward || 100} Points & +${res.coinsAward || 30} Coins${bonusMsg}`
      );
      if (selectedDay < durationDays) {
        setSelectedDay(selectedDay + 1);
      }
      const board = await fetchChallengeLeaderboard(activeChallenge.id).catch(() => []);
      setLeaderboard(board || []);
    } catch (err) {
      showToast(err?.message || "Could not mark day complete.", "error");
    } finally {
      setCompleting(false);
    }
  };

  const dayList = defaultChallengeDays.slice(0, durationDays);

  return (
    <ProteinClubLayout
      breadcrumbs={[
        { label: "Challenges", to: "/protein-club/challenges" },
        { label: activeChallenge.title },
      ]}
    >
      <div className="space-y-5">
        {/* Challenge Switcher when multiple active challenges exist */}
        {challenges.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {challenges.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChallengeId(ch.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  ch.id === activeChallenge.id
                    ? "bg-protein-dark text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-green-300"
                }`}
              >
                {ch.title} ({ch.durationDays || 21} Days)
              </button>
            ))}
          </div>
        )}

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* MAIN LEFT WORKSPACE */}
          <div className="min-w-0 space-y-5">
            {/* Hero Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-protein-dark via-protein-hover to-protein-green p-6 text-white shadow-sm sm:p-7">
              <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.25fr_0.95fr]">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-emerald-100">
                    <Sparkles size={13} />
                    Protein Club Challenge
                  </span>
                  <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                    {activeChallenge.title}
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-emerald-50/90">
                    {activeChallenge.subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-100">
                    <span className="inline-flex items-center gap-1.5">
                      <Dumbbell size={14} className="text-amber-300" />
                      {activeChallenge.goal || "Build Muscle"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Flame size={14} className="text-orange-300" />
                      Daily Habit Streak
                    </span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Users size={14} className="text-emerald-200" />
                      {Number(activeChallenge.participantsCount || 12480).toLocaleString()} participants
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
                    <img
                      src={clubImages.challengeDuo}
                      alt="21-Day Protein Challenge athletes"
                      className="h-32 w-full rounded-xl object-cover md:w-56"
                    />
                  </div>
                  {participation ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-protein-dark shadow-sm">
                      <CheckCircle2 size={17} className="text-protein-green" />
                      Joined • Day {currentUnlockedDay} of {durationDays}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={joining}
                      onClick={handleJoinChallenge}
                      className="inline-flex items-center gap-2 rounded-full bg-protein-orange px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:bg-protein-orange2 disabled:opacity-60"
                    >
                      {joining ? "Joining..." : "Join Challenge"}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Progress Summary Strip */}
            <section className="grid grid-cols-2 gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm sm:grid-cols-4">
              <div className="sm:border-r sm:border-gray-100 sm:pr-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500">
                    <CalendarDays size={15} className="text-protein-green" />
                    Day {currentUnlockedDay} of {durationDays}
                  </span>
                  <span className="text-xs font-extrabold text-protein-green tabular-nums">
                    {progressPercent}%
                  </span>
                </div>
                <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-protein-green transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:border-r sm:border-gray-100 sm:px-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Flame size={19} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500">Current Streak</p>
                  <p className="text-base font-extrabold text-protein-dark tabular-nums">
                    {streak} {streak === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:border-r sm:border-gray-100 sm:px-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Star size={19} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500">Protein Points</p>
                  <p className="text-base font-extrabold text-protein-dark tabular-nums">
                    {pointsEarned.toLocaleString()} pts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-protein-green">
                  <Trophy size={19} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-gray-500">Challenge Status</p>
                  <p className="text-sm font-extrabold text-protein-green">{challengeStatus}</p>
                </div>
              </div>
            </section>

            {/* Challenge Journey (21 Days Grid) */}
            <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CalendarDays size={20} className="text-protein-green" />
                  <h2 className="text-lg font-extrabold text-protein-dark">
                    Challenge Journey ({durationDays} Days)
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-protein-green" />
                    Completed ({completedCount})
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    Today ({participation ? 1 : 0})
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                    Upcoming ({Math.max(0, durationDays - completedCount - (participation ? 1 : 0))})
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-7">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-7">
                  {dayList.map((d) => {
                    const isDone = completedDays.includes(d.day);
                    const isToday = participation
                      ? d.day === currentUnlockedDay && !isDone
                      : d.day === 1;
                    const isLocked = participation
                      ? d.day > currentUnlockedDay && !isDone
                      : d.day > 1;
                    const isSelected = selectedDay === d.day;

                    return (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setSelectedDay(d.day)}
                        className={`flex flex-col justify-between rounded-xl border p-2.5 text-left transition ${
                          isSelected
                            ? "border-protein-orange bg-orange-50/70 ring-2 ring-orange-200"
                            : isDone
                            ? "border-green-200 bg-protein-soft"
                            : isToday
                            ? "border-orange-300 bg-orange-50/40"
                            : "border-gray-200 bg-gray-50/70 hover:border-green-200"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-extrabold tabular-nums ${
                              isDone
                                ? "text-protein-green"
                                : isToday
                                ? "text-protein-orange"
                                : "text-gray-600"
                            }`}
                          >
                            Day {d.day}
                          </span>
                          {isDone ? (
                            <CheckCircle2 size={15} className="text-protein-green" />
                          ) : isLocked ? (
                            <Lock size={13} className="text-gray-400" />
                          ) : (
                            <span className="h-3 w-3 rounded-full border-2 border-protein-orange" />
                          )}
                        </div>
                        <p className="mt-2 line-clamp-2 text-[11px] font-bold leading-snug text-gray-800">
                          {d.title}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Day Navigation Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <button
                  type="button"
                  disabled={selectedDay <= 1}
                  onClick={() => setSelectedDay((prev) => Math.max(1, prev - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Previous Day
                </button>
                <span className="text-xs font-bold text-gray-500 tabular-nums">
                  Viewing Day {selectedDay} of {durationDays}
                </span>
                <button
                  type="button"
                  disabled={selectedDay >= durationDays}
                  onClick={() => setSelectedDay((prev) => Math.min(durationDays, prev + 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  Next Day
                  <ChevronRight size={15} />
                </button>
              </div>
            </section>

            {/* Today's Task Card */}
            <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-protein-orange" />
                  <h2 className="text-lg font-extrabold text-protein-dark">
                    Today’s Task
                  </h2>
                  <span className="rounded-full bg-protein-orange px-3 py-0.5 text-xs font-bold text-white tabular-nums">
                    Day {selectedDay} of {durationDays}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-protein-soft px-3 py-1.5 text-xs font-extrabold text-protein-green tabular-nums">
                  <Coins size={14} />
                  +{selectedDayInfo.points} Protein Points
                </span>
              </div>

              <div className="mt-4 grid items-center gap-5 md:grid-cols-[200px_1fr]">
                <img
                  src={clubImages.mealBowl}
                  alt={selectedDayInfo.title}
                  className="h-40 w-full rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-protein-dark">
                    {selectedDayInfo.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{selectedDayInfo.task}</p>

                  <div className="mt-4 space-y-2">
                    {selectedDayInfo.checklist.map((item, idx) => {
                      const isChecked = checkedTasks.includes(idx);
                      return (
                        <label
                          key={item}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition ${
                            isChecked
                              ? "border-green-200 bg-protein-surface text-protein-dark"
                              : "border-gray-200 bg-white text-gray-700 hover:border-green-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleChecklist(idx)}
                            className="h-4 w-4 accent-[#087C43]"
                          />
                          <span className={isChecked ? "font-semibold" : ""}>{item}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {isSelectedDayCompleted ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-protein-soft px-5 py-2.5 text-sm font-extrabold text-protein-green">
                        <CheckCircle2 size={18} />
                        Day {selectedDay} Completed
                      </span>
                    ) : !participation ? (
                      <button
                        type="button"
                        disabled={joining}
                        onClick={handleJoinChallenge}
                        className="inline-flex items-center gap-2 rounded-full bg-protein-orange px-6 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-protein-orange2"
                      >
                        {joining ? "Joining..." : "Join Challenge to Start Day 1"}
                        <ArrowRight size={16} />
                      </button>
                    ) : !isSelectedDayUnlocked ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-bold text-gray-500">
                        <Lock size={16} />
                        Complete Day {currentUnlockedDay} to Unlock
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={completing}
                        onClick={handleCompleteDay}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-protein-green to-protein-green px-6 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
                      >
                        <CheckCircle2 size={17} />
                        {completing ? "Saving..." : `Complete Day ${selectedDay}`}
                      </button>
                    )}

                    <Link
                      to="/protein-club/my-club"
                      className="inline-flex items-center gap-1.5 rounded-full border border-green-200 px-4 py-2.5 text-xs font-bold text-protein-green hover:bg-protein-soft"
                    >
                      Log Today’s Protein
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT RAIL */}
          <aside className="space-y-4">
            {/* Challenge Rules */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                <Info size={18} className="text-protein-green" />
                Challenge Rules
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-gray-700">
                {[
                  "Challenge duration: 21 consistent days.",
                  "Complete the daily task to earn +100 Protein Points.",
                  "Reach 7-day & 14-day streaks for +500 bonus points.",
                  "Share meal updates in your community to stay accountable.",
                  "Be respectful and supportive to fellow challengers.",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-protein-green" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl bg-[#EEF7FE] p-3 text-xs leading-relaxed text-[#0B4A6F]">
                Stay consistent, log your protein daily, and build a sustainable healthy habit.
              </div>
            </div>

            {/* Challenge Leaderboard Top 5 */}
            <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-base font-extrabold text-protein-dark">
                  <Trophy size={18} className="text-protein-green" />
                  Leaderboard (Top 5)
                </h3>
                <Link
                  to="/protein-club/leaderboard"
                  className="text-xs font-bold text-protein-green hover:underline"
                >
                  View Full →
                </Link>
              </div>

              <div className="mt-3 space-y-2.5">
                {mergedLeaderboard.map((member, index) => (
                  <div
                    key={member.uid}
                    className="flex items-center justify-between gap-2 rounded-xl bg-protein-surface px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold tabular-nums ${
                          index === 0
                            ? "bg-amber-400 text-white"
                            : index === 1
                            ? "bg-gray-300 text-gray-800"
                            : index === 2
                            ? "bg-orange-300 text-orange-950"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-gray-900">
                          {member.displayName}
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-gray-500 tabular-nums">
                          <Flame size={11} className="text-orange-500" />
                          {member.days} Days
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-extrabold text-protein-green tabular-nums">
                      {member.pointsEarned.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Ideas & Guides */}
            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-protein-soft to-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-extrabold text-protein-dark">
                <BookOpen size={17} className="text-protein-green" />
                Need High-Protein Meal Ideas?
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                Explore vegetarian 100g protein plans, 10-minute breakfasts, and everyday Indian food guides.
              </p>
              <Link
                to="/protein-club/resources"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-protein-green px-4 py-2 text-xs font-bold text-white hover:bg-protein-hover"
              >
                Explore Meal Guides
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </ProteinClubLayout>
  );
}
