
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  CalendarDays,
  Dumbbell,
  Soup,
  Users,
  Trophy,
  Flame,
  Star,
  Coins,
  Target,
  CheckCircle2,
  LockKeyhole,
  Gift,
  ArrowRight,
  Headphones,
  ClipboardCheck,
  CircleHelp,
  MessageSquare,
  TrendingUp,
  Salad,
  Clock,
  Heart,
  BookOpen,
  ChevronDown,
} from "lucide-react";

const challengeMeals = [
  {
    name: "Paneer Scramble",
    protein: "28g Protein",
    emoji: "🍳",
    description: "Paneer with veggies",
    bg: "bg-orange-50",
  },
  {
    name: "Egg & Veg Bowl",
    protein: "30g Protein",
    emoji: "🥚",
    description: "Eggs with fresh veggies",
    bg: "bg-yellow-50",
  },
  {
    name: "Greek Yogurt Bowl",
    protein: "25g Protein",
    emoji: "🫐",
    description: "Yogurt with fruits",
    bg: "bg-blue-50",
  },
  {
    name: "Moong Dal Chilla",
    protein: "26g Protein",
    emoji: "🥞",
    description: "Protein-rich lentil chilla",
    bg: "bg-green-50",
  },
];

const dailyTasks = [
  {
    id: 1,
    title: "Eat a protein-rich breakfast (≥ 25g protein)",
    icon: Salad,
    detail: "Start your day with a protein-rich breakfast.",
  },
  {
    id: 2,
    title: "Track your total protein intake for the day",
    icon: TrendingUp,
    detail: "Track your protein intake throughout the day.",
  },
  {
    id: 3,
    title: "Read: Why breakfast protein matters?",
    icon: BookOpen,
    detail: "Learn how protein at breakfast supports your day.",
  },
  {
    id: 4,
    title: "Share a photo or tip with the community",
    icon: MessageSquare,
    detail: "Share your progress with fellow challengers.",
  },
];

const milestones = [
  { day: 1, title: "Know Your Protein", unlocked: true },
  { day: 7, title: "Build a Protein Habit", unlocked: true },
  { day: 14, title: "Stay Consistent", unlocked: false },
  { day: 21, title: "Become a Protein Champion", unlocked: false },
];

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function PanelTitle({ icon: Icon, title, className = "" }) {
  return (
    <div className={`mb-3 flex items-center gap-2.5 ${className}`}>
      <Icon size={23} className="shrink-0 text-green-600" />
      <h2 className="text-base font-extrabold leading-tight text-gray-900 sm:text-lg">
        {title}
      </h2>
    </div>
  );
}

function ProteinChallenge() {
  const [currentDay, setCurrentDay] = useState(7);
  const [activeTab, setActiveTab] = useState("today");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedDays, setCompletedDays] = useState([1, 2, 3, 4, 5, 6]);
  const [expandedMeal, setExpandedMeal] = useState(null);

  const totalDays = 21;
  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / totalDays) * 100);
  const tasksCompleted = completedTasks.length;

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const markDayComplete = () => {
    if (tasksCompleted !== dailyTasks.length) {
      alert("Complete all daily tasks before marking this day complete!");
      return;
    }

    if (completedDays.includes(currentDay)) {
      alert(`Day ${currentDay} is already completed!`);
      return;
    }

    setCompletedDays((prev) => [...prev, currentDay]);
    alert(`Day ${currentDay} completed! Great job!`);

    if (currentDay < 21) {
      setCurrentDay((prev) => prev + 1);
      setCompletedTasks([]);
    }
  };

  const selectDay = (day) => {
    setCurrentDay(day);
    setActiveTab("today");
    setCompletedTasks([]);
  };

  const challengeTabs = [
    { id: "today", label: `Today's Plan (Day ${currentDay})`, icon: CalendarDays },
    { id: "overview", label: "Challenge Overview", icon: ClipboardCheck },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "rewards", label: "Rewards", icon: Gift },
  ];

  const challengeBenefits = [
    "Build a consistent protein habit",
    "Improve strength and recovery",
    "Get expert tips & meal plans",
    "Stay motivated with a community",
    "Earn Protein Points & Coins",
    "Get exclusive offers on EatProtein",
  ];

  return (
    <main className="min-h-screen bg-white pb-6">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold sm:text-sm">
          <Link to="/" className="text-green-700 hover:text-green-900">
            <Home size={17} />
          </Link>
          <ChevronRight size={15} className="text-gray-400" />
          <Link
            to="/protein-club"
            className="text-green-700 hover:text-green-900"
          >
            Protein Club
          </Link>
          <ChevronRight size={15} className="text-gray-400" />
          <Link
            to="/protein-club/challenges"
            className="text-green-700 hover:text-green-900"
          >
            Challenges
          </Link>
          <ChevronRight size={15} className="text-gray-400" />
          <span className="text-gray-800">21-Day Protein Challenge</span>
        </nav>
      </div>

      {/* Hero Banner */}
      <section className="mt-3 overflow-hidden bg-gradient-to-r from-[#EDF8E9] via-[#F7FCF5] to-[#E4F3DF]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-5 px-4 py-6 sm:px-6 md:grid-cols-[0.8fr_1.5fr_0.9fr] md:py-8 lg:px-8">
          {/* Left visual */}
          <div className="hidden items-center justify-center md:flex">
            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-green-100/70">
              <Dumbbell
                size={105}
                strokeWidth={1.7}
                className="text-green-700"
              />
            </div>
          </div>

          {/* Hero content */}
          <div className="text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-1.5 text-white">
              <CalendarDays size={19} />
              <span className="text-sm font-extrabold">21-Day</span>
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-[#103B27] sm:text-4xl lg:text-5xl">
              Protein Challenge
            </h1>

            <p className="mt-2 text-base font-semibold text-gray-800 sm:text-lg">
              Build a consistent protein habit in 21 days.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {[
                { icon: Dumbbell, text: "Right Proteins Every Day" },
                { icon: Soup, text: "Simple Meal Ideas" },
                { icon: CalendarDays, text: "Daily Action Plan" },
                { icon: Users, text: "Community Support" },
                { icon: Trophy, text: "Earn Rewards" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex flex-col items-center gap-1">
                    <Icon size={23} className="text-green-600 sm:size-7" />
                    <p className="text-[10px] font-bold leading-tight text-gray-800 sm:text-xs">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden flex-col items-center justify-center lg:flex">
            <p className="rotate-[-6deg] text-center text-2xl font-black italic leading-tight text-green-800">
              21 Days
              <br />
              Stronger,
              <br />
              Healthier,
              <br />
              You!
            </p>
            <div className="mt-3 flex items-center gap-3 text-5xl">
              🥗 🥚
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-column layout */}
      <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[0.86fr_1.58fr_0.86fr]">
          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* Progress */}
            <Panel className="p-3 sm:p-4">
              <h2 className="mb-3 text-base font-extrabold text-gray-900 sm:text-lg">
                Your Challenge Progress
              </h2>

              <div className="flex items-center gap-3 rounded-2xl bg-green-50/70 p-3">
                <div
                  className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#24963A ${progressPercent}%, #DDEBE1 ${progressPercent}% 100%)`,
                  }}
                >
                  <div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-white">
                    <p className="text-xl font-black text-gray-900">
                      {completedCount} / 21
                    </p>
                    <p className="text-xs font-semibold text-gray-700">Days</p>
                  </div>
                </div>

                <div>
                  <p className="text-2xl font-black text-green-700 sm:text-3xl">
                    {progressPercent}%
                  </p>
                  <p className="text-sm font-bold text-gray-800">Completed</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-100 pt-3">
                {[
                  { icon: Flame, value: "7-Day", label: "Streak", color: "text-orange-500" },
                  { icon: Star, value: "1,200", label: "Protein Points", color: "text-yellow-500" },
                  { icon: Coins, value: "500", label: "Protein Coins", color: "text-amber-500" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="px-1 text-center">
                      <Icon size={24} className={`mx-auto mb-1 ${stat.color}`} />
                      <p className="text-sm font-extrabold text-gray-900 sm:text-base">
                        {stat.value}
                      </p>
                      <p className="text-[10px] leading-tight text-gray-600 sm:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Challenge goals */}
            <Panel className="p-3 sm:p-4">
              <PanelTitle icon={Target} title="Your Challenge Goals" />

              <div className="divide-y divide-gray-100">
                {[
                  {
                    icon: Target,
                    title: "Daily Protein Target",
                    value: "90 g / day",
                    color: "text-red-500",
                  },
                  {
                    icon: Dumbbell,
                    title: "Primary Goal",
                    value: "Build Muscle",
                    color: "text-orange-500",
                  },
                  {
                    icon: CalendarDays,
                    title: "Target Duration",
                    value: "21 Days",
                    color: "text-green-600",
                  },
                ].map((goal) => {
                  const Icon = goal.icon;
                  return (
                    <div
                      key={goal.title}
                      className="flex items-center gap-3 py-3"
                    >
                      <Icon size={30} className={`shrink-0 ${goal.color}`} />
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">
                          {goal.title}
                        </p>
                        <p className="text-sm text-gray-700">{goal.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Benefits */}
            <Panel className="p-3 sm:p-4">
              <h2 className="mb-3 text-base font-extrabold text-gray-900 sm:text-lg">
                Challenge Benefits
              </h2>

              <div className="space-y-2.5">
                {challengeBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 fill-green-600 text-white"
                    />
                    <p className="text-xs leading-relaxed text-gray-800 sm:text-sm">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* CENTER COLUMN */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* Milestone timeline */}
            <div className="rounded-2xl border border-gray-100 bg-white px-2 py-3 sm:px-3">
              <div className="grid grid-cols-4">
                {milestones.map((milestone, index) => {
                  const isCompleted = completedDays.includes(milestone.day);
                  const isCurrent = currentDay === milestone.day;

                  return (
                    <button
                      key={milestone.day}
                      type="button"
                      onClick={() => selectDay(milestone.day)}
                      className={`relative flex min-w-0 flex-col items-center rounded-xl px-1 py-2 text-center transition ${
                        isCurrent ? "bg-green-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {index !== 0 && (
                        <div className="absolute left-0 top-5 h-0.5 w-full -translate-x-1/2 bg-gray-200" />
                      )}

                      <div
                        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${
                          isCompleted
                            ? "bg-green-600 text-white shadow-sm"
                            : "border border-gray-300 bg-white text-gray-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={22} />
                        ) : (
                          <LockKeyhole size={17} />
                        )}
                      </div>

                      <p className="mt-2 text-xs font-extrabold text-gray-900 sm:text-sm">
                        Day {milestone.day}
                      </p>

                      <p className="mt-1 max-w-[100px] text-[10px] leading-tight text-gray-700 sm:text-xs">
                        {milestone.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Challenge tabs */}
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm sm:grid-cols-4">
              {challengeTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex min-h-10 items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold transition sm:text-xs ${
                      isActive
                        ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Daily Plan */}
            {activeTab === "today" && (
              <Panel className="overflow-hidden p-3 sm:p-4">
                {/* Daily intro */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                    🥗
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl">
                      Day {currentDay} – Build a Protein-Rich Breakfast
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      Start your day with 25–30g of protein to stay energized and support muscle growth.
                    </p>
                  </div>
                </div>

                {/* Task progress */}
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-gray-900">
                    Today's Tasks
                  </h3>
                  <span className="text-xs font-semibold text-gray-700">
                    {tasksCompleted} of {dailyTasks.length} completed
                  </span>
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-600 transition-all duration-300"
                    style={{ width: `${(tasksCompleted / dailyTasks.length) * 100}%` }}
                  />
                </div>

                {/* Task list */}
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  {dailyTasks.map((task, index) => {
                    const Icon = task.icon;
                    const checked = completedTasks.includes(task.id);

                    return (
                      <div
                        key={task.id}
                        className={`flex items-center gap-2.5 border-b border-gray-100 px-3 py-3 last:border-b-0 sm:gap-3 ${
                          checked ? "bg-green-50" : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTask(task.id)}
                          className="h-5 w-5 shrink-0 cursor-pointer accent-green-600"
                        />

                        <label
                          onClick={() => toggleTask(task.id)}
                          className={`min-w-0 flex-1 cursor-pointer text-xs font-medium leading-relaxed sm:text-sm ${
                            checked
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {task.title}
                        </label>

                        <Icon size={19} className="shrink-0 text-green-600" />
                      </div>
                    );
                  })}
                </div>

                {/* Complete day */}
                <button
                  type="button"
                  onClick={markDayComplete}
                  disabled={completedDays.includes(currentDay)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-extrabold text-white shadow-sm transition ${
                    completedDays.includes(currentDay)
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gradient-to-r from-green-700 to-green-600 hover:-translate-y-0.5 hover:from-green-800 hover:to-green-700"
                  }`}
                >
                  <CheckCircle2 size={19} />
                  {completedDays.includes(currentDay)
                    ? `Day ${currentDay} Completed`
                    : `Mark Day ${currentDay} as Complete`}
                </button>
              </Panel>
            )}

            {/* Overview tab */}
            {activeTab === "overview" && (
              <Panel className="p-3 sm:p-4">
                <PanelTitle icon={ClipboardCheck} title="21-Day Challenge Overview" />
                <p className="mb-4 text-sm leading-relaxed text-gray-700">
                  Follow the daily plan, track your protein, complete activities and develop a healthy routine over 21 days.
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => selectDay(day)}
                      className={`flex min-h-16 flex-col items-center justify-center rounded-xl border text-sm font-bold transition ${
                        completedDays.includes(day)
                          ? "border-green-300 bg-green-50 text-green-700"
                          : currentDay === day
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50"
                      }`}
                    >
                      {completedDays.includes(day) ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <span>Day {day}</span>
                      )}
                      {completedDays.includes(day) && (
                        <span className="text-[10px]">Completed</span>
                      )}
                    </button>
                  ))}
                </div>
              </Panel>
            )}

            {/* Leaderboard tab */}
            {activeTab === "leaderboard" && (
              <Panel className="p-3 sm:p-4">
                <PanelTitle icon={Trophy} title="Challenge Leaderboard" />
                <div className="space-y-2">
                  {[
                    { rank: 1, name: "Priya M.", points: 2450, icon: "🥇" },
                    { rank: 2, name: "Rohit S.", points: 1980, icon: "🥈" },
                    { rank: 3, name: "Suresh K.", points: 1760, icon: "🥉" },
                    { rank: 4, name: "Anjali R.", points: 1640, icon: "4" },
                    { rank: 5, name: "Vikram P.", points: 1520, icon: "5" },
                  ].map((member) => (
                    <div
                      key={member.rank}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold">{member.icon}</span>
                        <span className="text-sm font-bold text-gray-800">{member.name}</span>
                      </div>
                      <span className="text-sm font-extrabold text-green-700">
                        {member.points.toLocaleString()} pts
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* Rewards tab */}
            {activeTab === "rewards" && (
              <Panel className="p-3 sm:p-4">
                <PanelTitle icon={Gift} title="Your Challenge Rewards" />
                <div className="space-y-3">
                  {[
                    { days: "Complete 7 Days", coins: "+500 Coins", icon: "🥇" },
                    { days: "Complete 14 Days", coins: "+1,000 Coins", icon: "🥈" },
                    { days: "Complete 21 Days", coins: "+2,100 Coins", icon: "🥉" },
                  ].map((reward) => (
                    <div
                      key={reward.days}
                      className="flex items-center justify-between gap-2 rounded-xl bg-yellow-50 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{reward.icon}</span>
                        <p className="text-sm font-bold text-gray-800">{reward.days}</p>
                      </div>
                      <span className="text-sm font-extrabold text-orange-600">
                        {reward.coins}
                      </span>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* Meal ideas */}
            <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-gray-900 sm:text-lg">
                  High-Protein Breakfast Ideas (≥ 25g Protein)
                </h2>
                <button
                  type="button"
                  onClick={() => alert("More meal ideas coming soon!")}
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-green-800 hover:text-green-950"
                >
                  View More <ArrowRight size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {challengeMeals.map((meal) => (
                  <button
                    key={meal.name}
                    type="button"
                    onClick={() =>
                      setExpandedMeal(
                        expandedMeal === meal.name ? null : meal.name
                      )
                    }
                    className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div
                      className={`flex h-20 items-center justify-center text-4xl ${meal.bg} sm:h-24 sm:text-5xl`}
                    >
                      {meal.emoji}
                    </div>
                    <div className="p-2">
                      <p className="truncate text-xs font-extrabold text-gray-900 sm:text-sm">
                        {meal.name}
                      </p>
                      <p className="mt-1 text-[10px] font-bold text-green-700 sm:text-xs">
                        {meal.protein}
                      </p>
                    </div>

                    {expandedMeal === meal.name && (
                      <p className="border-t border-gray-100 px-2 py-2 text-[10px] leading-relaxed text-gray-600">
                        {meal.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* Community */}
            <Panel className="p-3 sm:p-4">
              <PanelTitle icon={Users} title="Challenge Community" />

              <p className="text-sm leading-relaxed text-gray-800">
                Be part of the 21-Day Challenge community. Share, learn and stay motivated together.
              </p>

              <div className="my-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["MK", "AR", "PS", "VK"].map((initials, index) => (
                    <div
                      key={index}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[9px] font-extrabold text-gray-700 ${
                        ["bg-orange-100", "bg-green-100", "bg-blue-100", "bg-pink-100"][index]
                      }`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-gray-800">
                  4,820+ participants
                </span>
              </div>

              <Link
                to="/protein-club/communities"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-700 px-3 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                <Users size={17} />
                Go to Challenge Community
                <ArrowRight size={16} />
              </Link>
            </Panel>

            {/* Rewards */}
            <Panel className="p-3 sm:p-4">
              <PanelTitle icon={Gift} title="Your Rewards in this Challenge" iconClass="text-orange-500" />

              <div className="space-y-3">
                {[
                  { icon: "🥇", label: "Complete 7 Days", coins: "+500 Coins" },
                  { icon: "🥈", label: "Complete 14 Days", coins: "+1,000 Coins" },
                  { icon: "🥉", label: "Complete 21 Days", coins: "+2,100 Coins" },
                ].map((reward) => (
                  <div
                    key={reward.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="text-xl">{reward.icon}</span>
                      <span className="truncate text-xs font-semibold text-gray-800 sm:text-sm">
                        {reward.label}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs font-extrabold text-orange-600 sm:text-sm">
                      {reward.coins}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-100 p-3">
                <Gift size={37} className="shrink-0 text-orange-500" />
                <p className="text-xs font-bold leading-relaxed text-gray-800 sm:text-sm">
                  Finish all 21 days to unlock exclusive offers on EatProtein products!
                </p>
              </div>
            </Panel>

            {/* Help */}
            <Panel className="p-3 sm:p-4">
              <PanelTitle icon={Headphones} title="Need Help?" />

              <div className="divide-y divide-gray-100">
                {[
                  {
                    icon: ClipboardCheck,
                    label: "Challenge Rules & Guidelines",
                  },
                  { icon: CircleHelp, label: "FAQs" },
                  { icon: MessageSquare, label: "Get Support" },
                ].map((help) => {
                  const Icon = help.icon;
                  return (
                    <button
                      key={help.label}
                      type="button"
                      onClick={() => alert(`${help.label} page coming soon!`)}
                      className="flex w-full items-center gap-2 py-3 text-left transition hover:text-green-700"
                    >
                      <Icon size={18} className="shrink-0 text-gray-600" />
                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {help.label}
                      </span>
                      <ChevronRight size={17} className="text-gray-500" />
                    </button>
                  );
                })}
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProteinChallenge;
