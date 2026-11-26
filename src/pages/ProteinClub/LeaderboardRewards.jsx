
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Trophy,
  Gift,
  Info,
  Tag,
  Users,
  Flame,
  CalendarDays,
  Target,
  TrendingUp,
  Medal,
  Coins,
  ArrowRight,
  Crown,
  CheckCircle2,
  Dumbbell,
  Heart,
  Star,
  Zap,
  Award,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    name: "Priya M.",
    initials: "PM",
    points: 2450,
    community: "Women's Protein Community",
    color: "bg-pink-100 text-pink-700",
    avatar: "bg-pink-200",
  },
  {
    rank: 2,
    name: "Rohit S.",
    initials: "RS",
    points: 1980,
    community: "Build Muscle Community",
    color: "bg-gray-100 text-gray-600",
    avatar: "bg-blue-100",
  },
  {
    rank: 3,
    name: "Suresh K.",
    initials: "SK",
    points: 1760,
    community: "Fitness & Wellness Community",
    color: "bg-orange-100 text-orange-700",
    avatar: "bg-orange-100",
  },
  {
    rank: 4,
    name: "Anjali R.",
    initials: "AR",
    points: 1640,
    community: "Women's Protein Community",
    color: "bg-green-100 text-green-700",
    avatar: "bg-pink-100",
  },
  {
    rank: 5,
    name: "Vikram P.",
    initials: "VP",
    points: 1520,
    community: "Build Muscle Community",
    color: "bg-purple-100 text-purple-700",
    avatar: "bg-purple-100",
  },
  {
    rank: 6,
    name: "Neha T.",
    initials: "NT",
    points: 1480,
    community: "Weight Management Community",
    color: "bg-pink-100 text-pink-700",
    avatar: "bg-pink-100",
  },
  {
    rank: 7,
    name: "Arjun M.",
    initials: "AM",
    points: 1420,
    community: "Vegetarian Protein Community",
    color: "bg-green-100 text-green-700",
    avatar: "bg-green-100",
  },
  {
    rank: 8,
    name: "Divya S.",
    initials: "DS",
    points: 1380,
    community: "Family Nutrition Community",
    color: "bg-amber-100 text-amber-700",
    avatar: "bg-amber-100",
  },
  {
    rank: 9,
    name: "Kiran V.",
    initials: "KV",
    points: 1260,
    community: "Vizag Protein Community",
    color: "bg-blue-100 text-blue-700",
    avatar: "bg-blue-100",
  },
  {
    rank: 10,
    name: "Megha P.",
    initials: "MP",
    points: 1180,
    community: "Kids Nutrition Community",
    color: "bg-red-100 text-red-700",
    avatar: "bg-red-100",
  },
];

const earnItems = [
  {
    icon: CalendarDays,
    title: "Complete daily challenge",
    points: "+100 Points",
    coins: "+100 Coins",
    color: "text-green-600",
  },
  {
    icon: Dumbbell,
    title: "Maintain 7-day streak",
    points: "+300 Points",
    coins: "+500 Coins",
    color: "text-green-700",
  },
  {
    icon: TrendingUp,
    title: "Track your protein for 7 days",
    points: "+200 Points",
    coins: "+200 Coins",
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "Active in community (post, comment, help)",
    points: "+50 Points",
    coins: "+50 Coins",
    color: "text-green-700",
  },
  {
    icon: Zap,
    title: "Invite a friend to Protein Club",
    points: "+500 Points",
    coins: "+500 Coins",
    color: "text-green-600",
  },
];

const rewards = [
  {
    title: "Protein Starter Pack",
    description: "Redeem your coins for a protein nutrition starter reward.",
    coins: 1500,
    icon: Gift,
  },
  {
    title: "EatProtein Discount",
    description: "Unlock exclusive discounts on selected products.",
    coins: 2500,
    icon: Tag,
  },
  {
    title: "Premium Club Badge",
    description: "Show off your consistency with an exclusive badge.",
    coins: 1000,
    icon: Award,
  },
];

const tabs = [
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "rewards", label: "My Rewards", icon: Gift },
  { id: "how", label: "How It Works", icon: Info },
  { id: "redeem", label: "Redeem Rewards", icon: Tag },
];

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeading({ icon: Icon, title, iconClass = "text-green-600" }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon size={27} className={`shrink-0 ${iconClass}`} />
      <h2 className="text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

function Avatar({ initials, className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white font-extrabold text-gray-700 shadow-sm ${className}`}
    >
      {initials}
    </div>
  );
}

function LeaderboardRewards() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [period, setPeriod] = useState("This Week");

  const user = {
    name: "Manoj Kumar",
    initials: "MK",
    points: 1250,
    rank: 42,
    totalMembers: 4820,
    coins: 3500,
    streak: 7,
    challengeDays: 7,
    challengeTotal: 21,
    protein: 85,
    communities: 3,
  };

  const topThree = [
    leaderboardData[1],
    leaderboardData[0],
    leaderboardData[2],
  ];

  const podiumRanks = [2, 1, 3];

  const sortedLeaderboard =
    period === "This Week"
      ? leaderboardData
      : [...leaderboardData].sort((a, b) => b.points - a.points);

  const renderLeaderboard = () => (
    <>
      {/* Champions */}
      <div className="mb-5 rounded-2xl bg-gradient-to-b from-green-50/50 to-white p-2 sm:p-3">
        <div className="grid grid-cols-3 items-end gap-1.5 sm:gap-3">
          {topThree.map((person, index) => {
            const isFirst = index === 1;
            const rank = podiumRanks[index];

            return (
              <div
                key={person.rank}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <div className="relative mb-1">
                  <Crown
                    size={isFirst ? 32 : 25}
                    className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[85%] ${
                      rank === 1
                        ? "fill-yellow-400 text-yellow-500"
                        : rank === 2
                        ? "fill-gray-300 text-gray-400"
                        : "fill-orange-300 text-orange-400"
                    }`}
                  />

                  <Avatar
                    initials={person.initials}
                    className={`${
                      isFirst ? "h-24 w-24 text-2xl sm:h-32 sm:w-32 sm:text-3xl" : "h-16 w-16 text-lg sm:h-24 sm:w-24 sm:text-2xl"
                    } ${person.avatar} ${
                      rank === 1
                        ? "border-yellow-300 ring-4 ring-yellow-100"
                        : rank === 2
                        ? "border-gray-300 ring-2 ring-gray-100"
                        : "border-orange-300 ring-2 ring-orange-100"
                    }`}
                  />
                </div>

                <h3 className="mt-2 max-w-full truncate text-xs font-extrabold text-gray-900 sm:text-sm">
                  {person.name}
                </h3>

                <p className="mt-0.5 text-xs font-bold text-gray-700 sm:text-sm">
                  {person.points.toLocaleString()} Points
                </p>

                <div
                  className={`mt-2 flex h-8 w-full items-center justify-center rounded-t-xl text-lg font-black sm:h-11 sm:text-xl ${
                    rank === 1
                      ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                      : rank === 2
                      ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                      : "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800"
                  }`}
                >
                  {rank}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100">
        {/* Table Header */}
        <div className="grid grid-cols-[42px_minmax(100px,1fr)_minmax(110px,1.3fr)_65px] items-center gap-1 bg-gray-50 px-2 py-2 text-[10px] font-extrabold text-gray-700 sm:grid-cols-[55px_minmax(130px,1fr)_minmax(150px,1.5fr)_85px] sm:gap-2 sm:px-3 sm:text-xs">
          <span>Rank</span>
          <span>Member</span>
          <span>Community</span>
          <span className="text-right">Points</span>
        </div>

        {sortedLeaderboard.slice(3, 10).map((person) => (
          <div
            key={person.rank}
            className="grid grid-cols-[42px_minmax(100px,1fr)_minmax(110px,1.3fr)_65px] items-center gap-1 border-t border-gray-100 px-2 py-2.5 transition hover:bg-green-50/50 sm:grid-cols-[55px_minmax(130px,1fr)_minmax(150px,1.5fr)_85px] sm:gap-2 sm:px-3"
          >
            <span className="text-xs font-bold text-gray-600 sm:text-sm">
              {person.rank}
            </span>

            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <Avatar
                initials={person.initials}
                className={`h-7 w-7 text-[9px] ${person.avatar} sm:h-9 sm:w-9 sm:text-xs`}
              />
              <span className="truncate text-[11px] font-bold text-gray-800 sm:text-sm">
                {person.name}
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-1.5">
              <Users size={16} className={`shrink-0 ${person.color.split(" ")[1]} sm:size-[18px]`} />
              <span className="truncate text-[10px] font-semibold text-gray-700 sm:text-xs">
                {person.community}
              </span>
            </div>

            <span className="whitespace-nowrap text-right text-[10px] font-bold text-gray-800 sm:text-sm">
              {person.points.toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => alert("Full leaderboard coming soon!")}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-green-700 bg-white px-5 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
        >
          View Full Leaderboard
          <ArrowRight size={17} />
        </button>
      </div>
    </>
  );

  const renderRewards = () => (
    <div className="space-y-3">
      <CardHeading icon={Gift} title="My Rewards" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          return (
            <div
              key={reward.title}
              className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-4"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Icon size={25} className="text-green-700" />
              </div>
              <h3 className="font-extrabold text-gray-900">{reward.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {reward.description}
              </p>
              <div className="mt-3 flex items-center gap-1.5 font-bold text-amber-600">
                <Coins size={17} />
                {reward.coins.toLocaleString()} Coins
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div>
      <CardHeading icon={Info} title="How Protein Club Rewards Work" />
      <div className="space-y-4">
        {[
          {
            icon: ShieldCheck,
            title: "Join Protein Club",
            desc: "Become a member and join communities that match your health and fitness goals.",
          },
          {
            icon: CalendarDays,
            title: "Complete Daily Activities",
            desc: "Participate in daily challenges, log your protein and maintain healthy habits.",
          },
          {
            icon: TrendingUp,
            title: "Earn Points & Coins",
            desc: "Earn points for leaderboard rankings and coins for redeemable rewards.",
          },
          {
            icon: Trophy,
            title: "Climb the Leaderboard",
            desc: "Stay consistent, contribute to communities and earn recognition.",
          },
          {
            icon: Gift,
            title: "Redeem Rewards",
            desc: "Use your Protein Coins to unlock rewards and special benefits.",
          },
        ].map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex items-start gap-3 rounded-xl bg-green-50/70 p-3 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <Icon size={23} className="text-green-700" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 sm:text-base">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRedeem = () => (
    <div>
      <CardHeading icon={Tag} title="Redeem Your Protein Coins" />
      <div className="mb-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-100 p-4">
        <p className="text-sm font-semibold text-gray-700">Your available balance</p>
        <div className="mt-1 flex items-center gap-2">
          <Coins size={28} className="text-amber-500" />
          <span className="text-3xl font-black text-green-800">
            {user.coins.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-gray-700">Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          return (
            <div
              key={reward.title}
              className="flex flex-col rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <Icon size={25} className="text-green-700" />
              </div>
              <h3 className="mt-3 font-extrabold text-gray-900">{reward.title}</h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">
                {reward.description}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  <Coins size={16} /> {reward.coins}
                </span>
                <button
                  type="button"
                  onClick={() => alert("Reward redemption will be available soon!")}
                  className="rounded-full border border-green-600 px-4 py-2 text-xs font-bold text-green-800 hover:bg-green-50"
                >
                  Redeem
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pb-5">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
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
          <span className="text-gray-800">Leaderboard & Rewards</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mt-3 overflow-hidden bg-gradient-to-r from-[#EDF8E9] via-[#F7FCF5] to-[#E5F4E1]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-5 px-4 py-5 sm:px-6 md:grid-cols-[0.8fr_1.5fr_0.8fr] md:py-7 lg:px-8">
          {/* Trophy illustration */}
          <div className="hidden items-center justify-center md:flex">
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-green-100/60">
              <Trophy
                size={100}
                strokeWidth={1.5}
                className="fill-yellow-400 text-yellow-600 drop-shadow-md"
              />
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-extrabold text-green-800">
              <Users size={17} />
              Protein Club
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-[#103B27] sm:text-4xl lg:text-5xl">
              Leaderboard & Rewards
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-gray-800 sm:text-base">
              Celebrate consistency, healthy habits and community contribution.
              Stay active, earn Protein Points & Coins, and unlock exciting benefits!
            </p>
          </div>

          {/* Reward message */}
          <div className="hidden flex-col items-center justify-center gap-3 lg:flex">
            <p className="rotate-[-5deg] text-center text-2xl font-black italic leading-tight text-green-800">
              Participate
              <br />
              Earn
              <br />
              Get Rewarded!
            </p>
            <div className="flex gap-2">
              <Gift size={45} className="fill-green-200 text-green-700" />
              <Trophy size={45} className="fill-yellow-400 text-yellow-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm sm:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-bold transition sm:gap-2 sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                <Icon size={18} className="shrink-0 sm:size-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[1.55fr_1fr]">
          {/* Left Column */}
          <Card className="min-w-0 p-3 sm:p-5">
            {activeTab === "leaderboard" && (
              <>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                      This Week’s Protein Club Champions
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">
                      Top members based on challenge completion, consistency, protein tracking and community contribution.
                    </p>
                  </div>

                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full shrink-0 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 outline-none focus:border-green-600 sm:w-auto"
                  >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>All Time</option>
                  </select>
                </div>

                {renderLeaderboard()}
              </>
            )}

            {activeTab === "rewards" && renderRewards()}
            {activeTab === "how" && renderHowItWorks()}
            {activeTab === "redeem" && renderRedeem()}
          </Card>

          {/* Right Column */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* Member Progress */}
            <Card className="p-3 sm:p-5">
              <h2 className="mb-3 text-lg font-extrabold text-gray-900 sm:text-xl">
                My Protein Club Progress
              </h2>

              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar initials={user.initials} className="h-11 w-11 bg-green-100 text-sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-gray-900">
                      Hi {user.name}!
                    </p>
                    <p className="text-xs text-gray-500">Keep up the great work</p>
                  </div>
                </div>

                <div className="inline-flex shrink-0 items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1.5 text-xs font-bold text-gray-800">
                  <Medal size={17} className="text-yellow-500" />
                  Member
                </div>
              </div>

              {/* Points and Rank */}
              <div className="my-4 grid grid-cols-2 items-center gap-2">
                <div className="flex justify-center">
                  <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border-[10px] border-green-600 border-t-green-300 sm:h-40 sm:w-40">
                    <Trophy size={27} className="mb-1 fill-yellow-400 text-yellow-500" />
                    <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                      {user.points.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium text-gray-700">Points</p>
                  </div>
                </div>

                <div className="rounded-xl bg-green-50/60 p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={26} className="text-green-600" />
                    <div>
                      <p className="text-xs font-bold text-gray-700">My Rank</p>
                      <p className="text-2xl font-black text-gray-900">
                        #{user.rank}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gray-600">
                    / {user.totalMembers.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 divide-x divide-gray-200 border-t border-gray-100 pt-3">
                {[
                  {
                    icon: Flame,
                    value: `${user.streak}-Day`,
                    label: "Streak",
                    color: "text-orange-500",
                  },
                  {
                    icon: CalendarDays,
                    value: `${user.challengeDays} / ${user.challengeTotal}`,
                    label: "Challenge Days",
                    color: "text-green-600",
                  },
                  {
                    icon: Target,
                    value: `${user.protein} g`,
                    label: "Today's Protein",
                    color: "text-red-500",
                  },
                  {
                    icon: Users,
                    value: `${user.communities}`,
                    label: "Communities",
                    color: "text-green-600",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="min-w-0 px-1 text-center">
                      <Icon size={21} className={`mx-auto mb-1 ${stat.color}`} />
                      <p className="truncate text-xs font-extrabold text-gray-900 sm:text-sm">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-tight text-gray-600 sm:text-[10px]">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Rewards and Coins */}
            <Card className="bg-gradient-to-r from-[#FFF8D8] to-[#FFF3BE] p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                  <Coins size={35} className="text-amber-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-extrabold text-gray-900 sm:text-lg">
                    My Rewards & Coins
                  </h2>
                  <p className="text-2xl font-black text-green-800 sm:text-3xl">
                    {user.coins.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">Protein Coins</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("redeem")}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-700 bg-white px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
              >
                Redeem Rewards
                <ArrowRight size={17} />
              </button>
            </Card>

            {/* Earn Points */}
            <Card className="p-3 sm:p-4">
              <h2 className="mb-3 text-lg font-extrabold text-gray-900 sm:text-xl">
                Earn More Points & Coins
              </h2>

              <div className="space-y-1.5">
                {earnItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="grid grid-cols-[25px_minmax(0,1fr)] gap-2 rounded-xl bg-gray-50/80 p-2 sm:grid-cols-[28px_minmax(0,1fr)] sm:p-2.5"
                    >
                      <Icon size={21} className={`mt-0.5 ${item.color}`} />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug text-gray-800 sm:text-sm">
                          {item.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-600 sm:text-xs">
                            {item.points}
                          </span>
                          <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-orange-600 sm:text-xs">
                            {item.coins}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Protein Leader Banner */}
      <section className="mx-auto max-w-[1440px] px-3 pt-5 sm:px-5 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#EFF9E9] via-[#E9F7E4] to-[#DDF2D6] p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:h-16 sm:w-16">
              <Crown size={35} className="fill-yellow-400 text-yellow-500 sm:size-10" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 sm:text-2xl">
                Become a Protein Leader
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-700 sm:text-sm">
                Lead a community, inspire others, get recognized and earn exclusive rewards with EatProtein.
              </p>
            </div>
          </div>

          <Link
            to="/protein-club/leader-application"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 sm:w-auto sm:text-base"
          >
            Apply to be a Protein Leader
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LeaderboardRewards;
