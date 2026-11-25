
import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calculator,
  Flame,
  Trophy,
  Gift,
  CalendarDays,
  Target,
  HeartPulse,
  Dumbbell,
  Apple,
  Footprints,
  TrendingUp,
  ShieldCheck,
  Coins,
  Truck,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  ChartNoAxesColumnIncreasing,
  Leaf,
  Medal,
} from "lucide-react";

const GREEN = "#087C43";
const ORANGE = "#F47716";

const communityImages = {
  muscle:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
  weight:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714193e1d?auto=format&fit=crop&w=600&q=80",
  veg:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  vizag:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
};

const goals = [
  { title: "Build Muscle", icon: Dumbbell, color: "text-orange-500" },
  { title: "Lose Fat", icon: TrendingUp, color: "text-green-600" },
  { title: "Improve Health", icon: HeartPulse, color: "text-red-500" },
  { title: "Family Nutrition", icon: Users, color: "text-purple-500" },
  { title: "Eat More Protein", icon: Apple, color: "text-green-600" },
  { title: "Stay Active", icon: Footprints, color: "text-blue-500" },
];

const communities = [
  {
    title: "Build Muscle Community",
    members: "4,820 members",
    image: communityImages.muscle,
    tag: "Official",
  },
  {
    title: "Weight Management Community",
    members: "3,962 members",
    image: communityImages.weight,
    tag: "Official",
  },
  {
    title: "Family Nutrition Community",
    members: "3,410 members",
    image: communityImages.family,
    tag: "Official",
  },
  {
    title: "Vegetarian Protein Community",
    members: "2,890 members",
    image: communityImages.veg,
    tag: "Official",
  },
  {
    title: "Vizag Protein Community",
    members: "2,540 members",
    image: communityImages.vizag,
    tag: "Community",
  },
];

const champions = [
  { rank: 1, name: "Priya M.", points: "2,450 pts", color: "text-yellow-500" },
  { rank: 2, name: "Rohit S.", points: "1,980 pts", color: "text-gray-400" },
  { rank: 3, name: "Suresh K.", points: "1,760 pts", color: "text-orange-500" },
];

const coinTasks = [
  { icon: CalendarDays, text: "Complete a challenge", points: "+1,000" },
  { icon: Flame, text: "Maintain a 7-day streak", points: "+500" },
  { icon: Target, text: "Track your protein daily", points: "+200" },
  { icon: Users, text: "Invite a friend", points: "+500" },
];

const testimonials = [
  {
    name: "Rohit S.",
    location: "Vizag · Build Muscle",
    image: communityImages.muscle,
    quote:
      "The 21-Day Challenge helped me build a consistent protein routine. I am feeling stronger and more motivated!",
  },
  {
    name: "Priya M.",
    location: "Hyderabad · Family Nutrition",
    image: communityImages.family,
    quote:
      "As a working mom, the community gives me easy protein ideas for my whole family. It makes healthy eating easier.",
  },
  {
    name: "Suresh K.",
    location: "Kavali · Healthy Living",
    image: communityImages.weight,
    quote:
      "I'm feeling more energetic after tracking my protein and joining the community.",
  },
];

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-7 text-center">
      <h2 className="text-2xl font-extrabold text-[#063D27] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function SectionButton({ children, href = "#join", orange = false }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        orange
          ? "bg-gradient-to-r from-[#F47716] to-[#F15B05] text-white"
          : "border border-green-700 bg-white text-green-800 hover:bg-green-50"
      }`}
    >
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

function ProteinClubHero() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8EF]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
        {/* Hero Text */}
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#DDF4D7] px-3 py-1.5 text-xs font-bold text-green-800">
            <Users size={17} />
            EATPROTEIN PROTEIN CLUB
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-[#063D27] sm:text-5xl lg:text-[56px]">
            Your Protein Journey{" "}
            <span className="text-green-700">is Better Together.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-700">
            Learn, track, challenge and grow with a supportive community that helps
            you build consistent protein habits for a healthier, stronger life.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <SectionButton orange href="#communities">
              Join Protein Club – FREE
            </SectionButton>

            <SectionButton href="/#protein-calculator">
              Calculate My Protein Need
            </SectionButton>
          </div>

          {/* Hero Benefits */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-green-200">
            {[
              { icon: Users, text: "Join a supportive community" },
              { icon: Zap, text: "Build healthy protein habits" },
              { icon: Trophy, text: "Achieve your wellness goals" },
            ].map((item, i) => (
              <div key={i} className="px-3 text-center first:pl-0 last:pr-0">
                <item.icon className="mx-auto mb-2 text-green-700" size={25} />
                <p className="text-xs font-medium leading-4 text-gray-700 sm:text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-[650px]">
          <div className="absolute inset-5 rounded-[45%] bg-[#D2F0C4]" />
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Family enjoying a healthy lifestyle"
            className="relative z-10 h-[330px] w-full rounded-[30px] object-cover sm:h-[450px] lg:h-[480px]"
          />
          <div className="absolute -right-2 top-5 z-20 rotate-6 rounded-xl bg-white/90 px-4 py-3 text-sm font-bold text-green-800 shadow-lg sm:-right-5">
            Learn
            <br />
            Track
            <br />
            Improve
            <br />
            Grow Together
          </div>
        </div>
      </div>
    </section>
  );
}

function ProteinClubFeatures() {
  const items = [
    {
      icon: Calculator,
      title: "Know Your Protein",
      description: "Calculate your daily protein need based on your age, weight, height and goal.",
      color: "text-green-600",
    },
    {
      icon: Flame,
      title: "Join Challenges",
      description: "Build consistent protein habits with fun, guided challenges.",
      color: "text-orange-500",
    },
    {
      icon: Users,
      title: "Find Your Community",
      description: "Connect with people who share your goals, challenges and journey.",
      color: "text-green-600",
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      description: "Stay active, complete challenges and earn Protein Coins for exciting benefits.",
      color: "text-orange-500",
    },
  ];

  return (
    <section className="px-4 py-4 sm:px-6">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 overflow-hidden rounded-2xl bg-[#F0F8EF] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 border-b border-green-100 p-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
          >
            <item.icon className={`${item.color} mt-1 shrink-0`} size={30} />
            <div>
              <h3 className="text-sm font-extrabold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProteinChallenge() {
  const steps = [
    { icon: CalendarDays, title: "Day 1", text: "Know your protein need", color: "text-green-700" },
    { icon: Leaf, title: "Day 7", text: "Build a protein-rich breakfast", color: "text-green-700" },
    { icon: ChartNoAxesColumnIncreasing, title: "Day 14", text: "Track your daily protein", color: "text-green-700" },
    { icon: Trophy, title: "Day 21", text: "Become a Protein Champion", color: "text-orange-500" },
  ];

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-[1440px] items-center gap-7 rounded-3xl bg-[#F0F8EF] p-5 sm:p-7 lg:grid-cols-12">
        {/* Challenge image */}
        <div className="relative lg:col-span-2">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80"
            alt="Fitness challenge participant"
            className="h-52 w-full rounded-2xl object-cover sm:h-64 lg:h-60"
          />
        </div>

        {/* Challenge description */}
        <div className="lg:col-span-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">
            <Flame size={17} /> 21-DAY
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#063D27]">
            Protein Challenge
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            A simple, guided 21-day program to build a lasting protein habit.
          </p>
        </div>

        {/* Steps */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white p-4 text-center shadow-sm"
              >
                <step.icon className={`mx-auto mb-2 ${step.color}`} size={27} />
                <h3 className="font-extrabold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-xs leading-4 text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <SectionButton orange href="#join">
              Join the 21-Day Challenge
            </SectionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProteinGoals() {
  return (
    <section className="px-4 py-9 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          title="What's Your Goal?"
          subtitle="Choose your goal and get personalized communities, challenges and content."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {goals.map((goal, i) => (
            <a
              key={i}
              href="#communities"
              className="group flex min-h-[100px] items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <goal.icon className={`${goal.color} shrink-0`} size={29} />
              <span className="text-sm font-bold leading-4 text-gray-800">{goal.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCard({ community }) {
  return (
    <Link
      to="/protein-club/communities"
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={community.image}
          alt={community.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-800">
          {community.tag}
        </span>
      </div>
      <div className="p-3">
        <h3 className="min-h-[40px] text-sm font-extrabold leading-4 text-gray-900">
          {community.title}
        </h3>
        <p className="mt-2 text-xs text-gray-600">{community.members}</p>
      </div>
    </Link>
  );
}

function ProteinCommunities() {
  return (
    <section id="communities" className="scroll-mt-24 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#063D27] sm:text-3xl">
              Find Your Community
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Join goal-based communities and connect with people on the same journey.
            </p>
          </div>
          <Link
  to="/protein-club/communities"
  className="inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-600 transition-all duration-300"
>
  Explore All Communities
  <ArrowRight size={18} />
</Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {communities.map((community, i) => (
            <CommunityCard community={community} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProteinLeaderboard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <Trophy className="text-amber-500" size={26} />
        <h3 className="text-lg font-extrabold text-gray-900">Protein Club Champions</h3>
      </div>

      <div className="space-y-3">
        {champions.map((person) => (
          <div key={person.rank} className="flex items-center gap-3 border-b border-gray-100 pb-3">
            <span className={`text-xl font-black ${person.color}`}>
              {person.rank === 1 ? "🥇" : person.rank === 2 ? "🥈" : "🥉"}
            </span>
            <img
              src={
                person.rank === 2
                  ? communityImages.family
                  : communityImages.muscle
              }
              alt={person.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="flex-1 text-sm font-bold text-gray-800">{person.name}</span>
            <span className="text-xs font-extrabold text-gray-700">{person.points}</span>
          </div>
        ))}
      </div>

      <a
        href="#leaderboard"
        className="mt-4 flex items-center justify-center gap-2 rounded-full border border-green-700 px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
      >
        View Full Leaderboard <ArrowRight size={16} />
      </a>
    </div>
  );
}

function ProteinRewards() {
  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-3">
        {/* Rewards introduction */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#F0F8EF] p-5">
          <Coins size={55} className="shrink-0 text-amber-500" />
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">Earn Protein Coins & Benefits</h3>
            <p className="mt-2 text-sm leading-5 text-gray-600">
              Stay active, complete challenges and earn Protein Coins. Redeem them for exciting benefits.
            </p>
          </div>
        </div>

        {/* Earn coins */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-extrabold text-gray-900">Ways to Earn Coins</h3>
          <div className="space-y-3">
            {coinTasks.map((task, i) => (
              <div key={i} className="flex items-center gap-2">
                <task.icon className="text-green-600" size={18} />
                <span className="flex-1 text-xs text-gray-700">{task.text}</span>
                <span className="text-xs font-extrabold text-orange-500">{task.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem */}
        <div className="rounded-2xl bg-[#FFF6DF] p-5">
          <h3 className="mb-4 text-base font-extrabold text-gray-900">Redeem For</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { icon: Gift, text: "Product Discounts" },
              { icon: Truck, text: "Free Delivery" },
              { icon: Star, text: "Special Offers" },
              { icon: Medal, text: "Exclusive Access" },
            ].map((reward, i) => (
              <div key={i} className="rounded-xl bg-white/70 p-3">
                <reward.icon className="mx-auto mb-2 text-green-600" size={24} />
                <p className="text-[10px] font-bold leading-3 text-gray-700">{reward.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityGuidelines() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-green-600" size={27} />
        <h3 className="font-extrabold text-gray-900">Community Guidelines</h3>
      </div>
      <p className="mt-3 text-sm leading-5 text-gray-600">
        A safe, respectful and supportive space focused on protein, nutrition and healthy living.
      </p>
      <a
        href="#guidelines"
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-700 px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-50"
      >
        View Guidelines <ArrowRight size={16} />
      </a>
    </div>
  );
}

function ProteinTestimonials() {
  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="flex items-center">
            <h2 className="text-3xl font-black leading-tight text-[#063D27]">
              Real People.
              <br />
              Real Protein
              <br />
              Journeys.
              <span className="ml-2 text-green-600">↗</span>
            </h2>
          </div>

          {testimonials.map((person, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-extrabold text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.location}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-gray-700">
                <span className="text-xl font-black text-green-700">“</span>
                {person.quote}
                <span className="text-xl font-black text-green-700">”</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProteinClubCTA() {
  return (
    <section id="join" className="scroll-mt-24 px-3 pb-8 sm:px-6">
      <div className="mx-auto grid max-w-[1440px] items-center gap-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#063D27] via-[#087C43] to-[#0C5C35] p-6 text-white sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80"
            alt="Protein Club community"
            className="h-48 w-full rounded-2xl object-cover sm:h-56"
          />
        </div>

        <div className="lg:col-span-5">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            Ready to Start Your{" "}
            <span className="text-lime-300">Protein Journey?</span>
          </h2>
          <p className="mt-3 text-sm text-green-50">
            Join thousands of people building better protein habits together.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <SectionButton orange href="#communities">
              Join Protein Club – FREE
            </SectionButton>
            <a
              href="#download-app"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-green-800 hover:bg-green-50"
            >
              <ArrowRight size={16} />
              Download App
            </a>
          </div>
        </div>

        <div className="space-y-2 lg:col-span-4">
          {[
            "Know your protein requirement",
            "Join goal-based communities",
            "Track your progress",
            "Earn rewards & special benefits",
            "Get expert tips and support",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="shrink-0 text-lime-300" size={19} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProteinClub() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <ProteinClubHero />
      <ProteinClubFeatures />
      <ProteinChallenge />
      <ProteinGoals />
      <ProteinCommunities />

      {/* Leaderboard + Guidelines */}
      <section className="px-4 py-4 sm:px-6">
        <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2">
          <ProteinLeaderboard />
          <CommunityGuidelines />
        </div>
      </section>

      <ProteinRewards />
      <ProteinTestimonials />
      <ProteinClubCTA />
    </main>
  );
}
