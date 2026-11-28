import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Coins,
  Dumbbell,
  Flame,
  Gift,
  HeartPulse,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";
import {
  clubImages,
  communities,
  defaultChampions,
  defaultRewards,
} from "./ProteinClub/data/communities";
import { useProteinClubAuth } from "../context/ProteinClubAuthContext";

const goalCards = [
  { title: "Build Muscle", sub: "Lean muscle & strength", icon: Dumbbell, color: "text-protein-green", bg: "bg-protein-soft" },
  { title: "Lose Fat", sub: "Satiety & calorie balance", icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Improve Health", sub: "Immunity & daily energy", icon: HeartPulse, color: "text-emerald-700", bg: "bg-emerald-50" },
  { title: "Family Nutrition", sub: "Balanced meals for all", icon: Users, color: "text-teal-700", bg: "bg-teal-50" },
  { title: "Eat More Protein", sub: "Make protein a habit", icon: Utensils, color: "text-amber-700", bg: "bg-amber-50" },
  { title: "Stay Active", sub: "Stamina & active living", icon: Target, color: "text-protein-green", bg: "bg-protein-soft" },
];

const whyJoinItems = [
  {
    num: "01.",
    title: "Goal-Based Communities",
    desc: "Join dedicated groups for muscle gain, weight management, women's wellness, family meals, or vegetarian nutrition.",
  },
  {
    num: "02.",
    title: "21-Day Habit Challenges",
    desc: "Follow guided daily tasks that turn protein targets into an effortless everyday routine.",
  },
  {
    num: "03.",
    title: "Healthy Engagement Rewards",
    desc: "Earn Protein Points for consistency and Protein Coins redeemable for discounts, delivery passes, and starter boxes.",
  },
  {
    num: "04.",
    title: "Unified EatProtein Account",
    desc: "Your protein target, streak, and community profile sync seamlessly across Website, Protein Club, and EatProtein App.",
  },
];

const stories = [
  {
    name: "Priya Sharma",
    role: "Nutrition Coach · Hyderabad",
    metric: "102g/day sustained · 21-Day Streak",
    quote:
      "Before Protein Club I struggled to cross 55g on a vegetarian diet. Swapping breakfast and tracking daily pushed me past 100g consistently without supplements.",
  },
  {
    name: "Rohit Varma",
    role: "Strength Enthusiast · Visakhapatnam",
    metric: "+2,760 Points · 4-Month Active Member",
    quote:
      "Checking in with the Build Muscle community kept me accountable on busy workweeks. My energy in morning gym sessions improved within two weeks.",
  },
  {
    name: "Sita Reddy",
    role: "Working Mother · Bengaluru",
    metric: "Family Goal Met · 3 Communities",
    quote:
      "The Family Nutrition recipes helped me add 20g extra protein to our kids' lunchboxes and evening snacks using paneer, eggs, and sprouted moong.",
  },
];

function LocalAppQrSvg() {
  const cells = [
    1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0,
    0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1,
    1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1,
    1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1,
  ];
  return (
    <svg
      viewBox="0 0 13 13"
      className="h-28 w-28 rounded-xl border border-green-100 bg-white p-2 text-protein-dark"
      aria-label="EatProtein App QR Code"
    >
      {cells.map((active, idx) =>
        active ? (
          <rect
            key={idx}
            x={idx % 13}
            y={Math.floor(idx / 13)}
            width="0.92"
            height="0.92"
            rx="0.12"
            fill="currentColor"
          />
        ) : null
      )}
    </svg>
  );
}

export default function ProteinClub() {
  const { user } = useProteinClubAuth();
  const primaryCtaTo = user ? "/protein-club/my-club" : "/protein-club/register";
  const primaryCtaLabel = user ? "Open My Protein Club" : "Join Protein Club – FREE";

  return (
    <div className="min-h-screen bg-white text-protein-text">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-protein-soft via-white to-protein-tint">
        <div className="mx-auto grid max-w-[1440px] items-stretch gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-protein-green">
              EatProtein Protein Club · Free Member Community
            </span>

            <h1
              style={{ textWrap: "balance" }}
              className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-protein-dark sm:text-4xl lg:text-5xl"
            >
              Your protein journey is better together.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
              Set your personalized daily protein target, connect with goal-based nutrition communities, complete the 21-Day Protein Challenge, and earn Protein Coins.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={primaryCtaTo}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-protein-orange to-protein-orange px-7 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:text-base"
              >
                {primaryCtaLabel}
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/protein-club/communities"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-protein-green bg-white px-6 py-3.5 text-sm font-bold text-protein-green transition hover:bg-protein-soft sm:text-base"
              >
                Explore Communities
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 divide-x divide-green-200 border-t border-green-100 pt-5">
              <div>
                <p className="text-xl font-extrabold tabular-nums text-protein-dark sm:text-2xl">
                  12,840+
                </p>
                <p className="text-xs font-medium text-gray-600">Active Members</p>
              </div>
              <div className="pl-4">
                <p className="text-xl font-extrabold tabular-nums text-protein-dark sm:text-2xl">
                  9 Official
                </p>
                <p className="text-xs font-medium text-gray-600">Goal Communities</p>
              </div>
              <div className="pl-4">
                <p className="text-xl font-extrabold tabular-nums text-protein-dark sm:text-2xl">
                  21 Days
                </p>
                <p className="text-xs font-medium text-gray-600">Habit Challenge</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-green-100 bg-protein-tint shadow-sm">
              <img
                src={clubImages.hero}
                alt="EatProtein Protein Club members enjoying healthy high-protein meals"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-lime-300">
                  Community · Challenges · Rewards
                </p>
                <p className="mt-1 text-base font-bold sm:text-lg">
                  Learn · Share · Challenge · Grow Together
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY JOIN */}
      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
              Why Join Protein Club?
            </h2>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              Built as your daily support system for sustainable nutrition and strength.
            </p>
          </div>
          <Link
            to="/protein-club/goal"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-protein-green hover:underline"
          >
            Set Your Protein Goal <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyJoinItems.map((item) => (
            <div
              key={item.num}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-green-300"
            >
              <span className="text-sm font-extrabold tabular-nums text-protein-green">
                {item.num}
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROTEIN CALCULATOR & 4. 21-DAY CHALLENGE SPLIT */}
      <section className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          {/* Protein Calculator Spotlight */}
          <div className="flex flex-col justify-between rounded-3xl border border-green-100 bg-protein-surface p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-protein-green text-white">
                <Calculator size={24} />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-protein-dark">
                Know Your Exact Daily Protein Target
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Use our EatProtein Calculator to compute your daily protein requirement in grams based on your age, weight, activity level, and primary goal.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-green-100 bg-white p-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Example Target</p>
                  <p className="mt-0.5 text-2xl font-extrabold tabular-nums text-protein-green">
                    90 g/day
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Synced Goal</p>
                  <p className="mt-0.5 text-base font-bold text-gray-900">
                    Build Muscle
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/protein-club/goal"
                className="inline-flex items-center gap-2 rounded-full bg-protein-green px-5 py-3 text-sm font-bold text-white transition hover:bg-protein-hover"
              >
                Set Goal & Calculate <ArrowRight size={16} />
              </Link>
              <Link
                to="/protein-calculator"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-50"
              >
                Full Calculator
              </Link>
            </div>
          </div>

          {/* 21-Day Protein Challenge Spotlight */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-r from-protein-dark via-protein-hover to-protein-green p-6 text-white sm:p-8 lg:col-span-7">
            <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime-300">
                  <CalendarDays size={15} /> Flagship Habit Program
                </span>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
                  21-Day Protein Challenge
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-green-50">
                  Day 1: Know Your Requirement · Day 2: Protein-Rich Breakfast · Day 7: Track Your Intake · Day 21: Become a Protein Champion.
                </p>
                <div className="mt-4 space-y-1.5 text-xs font-medium text-green-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-lime-300" />
                    <span>+100 Protein Points per daily task completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-lime-300" />
                    <span>+500 Bonus Points for 7-day & 14-day streaks</span>
                  </div>
                </div>
                <Link
                  to="/protein-club/challenges"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-protein-orange px-6 py-3 text-sm font-extrabold text-white shadow transition hover:bg-protein-orange2"
                >
                  Join 21-Day Challenge <ArrowRight size={16} />
                </Link>
              </div>
              <div className="sm:col-span-5">
                <img
                  src={clubImages.challengeDuo}
                  alt="21-Day Protein Challenge participants"
                  className="h-52 w-full rounded-2xl object-cover shadow-md sm:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHOOSE YOUR GOAL */}
      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
              Choose Your Goal
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Select a goal to get personalized daily targets and matching communities.
            </p>
          </div>
          <Link
            to="/protein-club/goal"
            className="inline-flex items-center gap-1 text-sm font-bold text-protein-green hover:underline"
          >
            Personalize My Goal <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {goalCards.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.title}
                to={`/protein-club/goal?goal=${encodeURIComponent(g.title)}`}
                className="group flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-protein-green hover:shadow-sm"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${g.bg}`}>
                  <Icon size={22} className={g.color} />
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-gray-900 group-hover:text-protein-green">
                  {g.title}
                </h3>
                <p className="mt-1 text-xs text-gray-600">{g.sub}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. FIND YOUR COMMUNITY */}
      <section id="communities" className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
              Find Your Community
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Connect with people pursuing the same fitness, diet, or family nutrition goals.
            </p>
          </div>
          <Link
            to="/protein-club/communities"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-protein-green hover:underline"
          >
            Explore All Communities <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communities.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              to={`/protein-club/community/${c.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-sm"
            >
              <div className="relative h-36 overflow-hidden bg-protein-soft">
                <img
                  src={c.heroImage}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-xs font-bold text-white">
                  {c.goal} · {c.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-extrabold text-gray-900 group-hover:text-protein-green">
                  {c.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600">
                  {c.description}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5 text-xs font-bold">
                  <span className="tabular-nums text-gray-700">
                    {c.membersCount.toLocaleString()} members
                  </span>
                  <span className="text-protein-green">Open Community →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. PROTEIN CHAMPIONS & REWARDS */}
      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Champions */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:col-span-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Trophy className="text-amber-500" size={24} />
                <h2 className="text-xl font-extrabold text-protein-dark">
                  This Week&apos;s Protein Champions
                </h2>
              </div>
              <Link
                to="/protein-club/leaderboard"
                className="text-xs font-bold text-protein-green hover:underline"
              >
                Full Leaderboard →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {defaultChampions.slice(0, 5).map((champ, idx) => (
                <div
                  key={champ.uid}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-extrabold tabular-nums ${
                        idx === 0
                          ? "bg-amber-100 text-amber-800"
                          : idx === 1
                          ? "bg-gray-100 text-gray-700"
                          : idx === 2
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-50 text-protein-green"
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">{champ.displayName}</p>
                      <p className="text-xs text-gray-500">
                        {champ.streak}-day streak · {champ.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold tabular-nums text-protein-green">
                    {champ.points.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div className="rounded-3xl border border-green-100 bg-protein-surface p-6 lg:col-span-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Coins className="text-amber-500" size={24} />
                <h2 className="text-xl font-extrabold text-protein-dark">
                  Protein Coins & Member Rewards
                </h2>
              </div>
              <Link
                to="/protein-club/rewards"
                className="text-xs font-bold text-protein-green hover:underline"
              >
                Redeem Coins →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {defaultRewards.map((rw) => (
                <div
                  key={rw.id}
                  className="flex flex-col justify-between rounded-2xl border border-green-100 bg-white p-4"
                >
                  <div>
                    <span className="text-xs font-semibold text-gray-500">
                      {rw.category}
                    </span>
                    <h3 className="mt-1 text-sm font-extrabold text-gray-900">
                      {rw.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">{rw.description}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 text-xs font-extrabold">
                    <span className="tabular-nums text-amber-700">
                      {rw.coinsCost} Coins
                    </span>
                    <Link
                      to="/protein-club/rewards"
                      className="text-protein-green hover:underline"
                    >
                      View Reward →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SUCCESS STORIES */}
      <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
            Member Success Stories
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Real outcomes from consistent daily protein habits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.name}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6"
            >
              <div>
                <p className="text-xs font-bold text-protein-green">{story.metric}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-sm font-extrabold text-gray-900">{story.name}</p>
                <p className="text-xs text-gray-500">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. DOWNLOAD APP / WEB -> MOBILE BRIDGE */}
      <section
        id="download-app"
        className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-protein-dark via-protein-hover to-protein-green p-6 text-white sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime-300">
              <Smartphone size={15} /> Web + Mobile Sync
            </span>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              Track Daily Meals & Streaks in the EatProtein App
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-green-50 sm:text-base">
              Your Protein Club account, daily protein requirement, challenge progress, and Protein Coins stay in sync between web and mobile.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/protein-club/my-club"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-protein-dark transition hover:bg-green-50"
              >
                Open Web Dashboard <ArrowRight size={16} />
              </Link>
              <Link
                to="/protein-club/leader-application"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Award size={16} />
                Apply to be Protein Leader
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:col-span-6 lg:justify-end">
            <img
              src={clubImages.appPhones}
              alt="EatProtein Mobile App screens"
              className="h-48 w-auto rounded-2xl object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="flex flex-col items-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <LocalAppQrSvg />
              <span className="mt-2 text-xs font-bold text-lime-200">
                Scan for EatProtein App
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}