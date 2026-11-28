
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Target,
  Flame,
  Coins,
  Users,
  Dumbbell,
    Home,
  BarChart3,
  ChartNoAxesColumnIncreasing,
  Gift,
  Activity,
  Bookmark,
  Settings,
  Trophy,
  ArrowRight,
  Plus,
  Camera,
  MessageCircle,
  UserPlus,
  ChevronRight,
  Heart,
  Share2,
  Clock,
  CheckCircle2,
  Crown,
  Utensils,
} from "lucide-react";

const communities = [
  {
    title: "Build Muscle Community",
    members: "4,820 members",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Family Nutrition Community",
    members: "3,410 members",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714196bcd?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Vegetarian Protein Community",
    members: "2,890 members",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80",
  },
];

const recommendations = [
  {
    title: "High-Protein Meal Plan",
    subtitle: "7-day plan to reach your goal",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Protein-Rich Foods",
    subtitle: "Top foods for muscle gain",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "Beginner Workout Plan",
    subtitle: "Simple & effective workouts",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=200&q=80",
  },
  {
    title: "High-Protein Recipes",
    subtitle: "Tasty & easy recipes at home",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=200&q=80",
  },
];

function DashboardCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, action, onClick }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 border-b border-gray-100 px-4 pb-3 sm:px-5">
      <h2 className="text-lg font-black text-gray-900 sm:text-xl">
        {title}
      </h2>

      {action && (
        <button
          onClick={onClick}
          className="shrink-0 text-sm font-bold text-green-800 hover:text-green-600"
        >
          {action} →
        </button>
      )}
    </div>
  );
}

function SummaryCard({ icon: Icon, title, value, color }) {
  return (
    <DashboardCard className="flex items-center gap-3 p-3 transition hover:-translate-y-0.5 hover:shadow-md sm:p-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon size={25} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-gray-900">{title}</p>
        <p className="mt-1 text-sm font-extrabold text-green-800">{value}</p>
      </div>

      <ArrowRight size={16} className="ml-auto shrink-0 text-gray-500" />
    </DashboardCard>
  );
}

function SidebarItem({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
        active
          ? "bg-gradient-to-r from-green-800 to-green-600 text-white shadow-md"
          : "text-gray-700 hover:bg-green-50 hover:text-green-800"
      }`}
    >
      <Icon size={19} />
      {label}
    </button>
  );
}

export default function MyProteinClub() {
  const navigate = useNavigate();

  const go = (path) => navigate(path);

  return (
    <main className="min-h-screen bg-[#F7FAF6] text-gray-900">
      <div className="mx-auto max-w-[1600px] px-3 py-4 sm:px-5 lg:px-6">
        <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block">
            <DashboardCard className="sticky top-24 overflow-hidden p-3">
              {/* User profile */}
              <button
                onClick={() => go("/protein-club/profile")}
                className="mb-4 flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-green-50"
              >
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-extrabold">Member</p>
                  <span className="mt-1 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800">
                    ● Member
                  </span>
                </div>
                <ChevronRight size={18} />
              </button>

              <div className="mb-3 border-t border-gray-100" />

              <SidebarItem icon={Users} label="My Protein Club" active />
              <SidebarItem icon={Users} label="My Communities" onClick={() => go("/protein-club/communities")} />
              <SidebarItem icon={Dumbbell} label="My Challenges" onClick={() => go("/protein-club/my-challenges")} />
              <SidebarItem icon={ChartNoAxesColumnIncreasing} label="My Progress" onClick={() => go("/protein-club/progress")} />
              <SidebarItem icon={Gift} label="My Rewards" onClick={() => go("/protein-club/rewards")} />
              <SidebarItem icon={Activity} label="My Activity" onClick={() => go("/protein-club/activity")} />
              <SidebarItem icon={Bookmark} label="Saved Posts" onClick={() => go("/protein-club/saved")} />
              <SidebarItem icon={Settings} label="Settings" onClick={() => go("/protein-club/settings")} />

              {/* Protein Leader Banner */}
              <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#E7F6D9] to-[#C9EDBD] p-4">
                <div className="mb-3 flex justify-center">
                  <Crown size={45} className="text-amber-500" />
                </div>
                <h3 className="font-black leading-tight text-green-950">
                  Become a Protein Leader
                </h3>
                <p className="mt-2 text-xs leading-5 text-gray-700">
                  Lead a community, help people and earn rewards.
                </p>
                <button
                  onClick={() => go("/protein-club/leader-application")}
                  className="mt-3 rounded-full border border-green-700 px-4 py-2 text-xs font-bold text-green-800 hover:bg-green-50"
                >
                  Apply Now →
                </button>
              </div>
            </DashboardCard>
          </aside>

          {/* MAIN CONTENT */}
          <div className="min-w-0 space-y-5">
            {/* Welcome header */}
            <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EAF8E5] via-[#F4FAEF] to-white p-5 sm:p-7">
              <div className="relative z-10 max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-wider text-green-700">
                  Welcome to your dashboard
                </p>
                <h1 className="mt-2 text-3xl font-black text-[#073D27] sm:text-4xl">
                  My Protein Club
                </h1>
                <p className="mt-2 text-sm text-gray-700 sm:text-base">
                  Your community, challenges, progress and rewards — all in one place.
                </p>
              </div>
              <div className="pointer-events-none absolute -right-8 -top-10 hidden opacity-30 sm:block">
                <Utensils size={170} className="text-green-600" />
              </div>
            </header>

            {/* SUMMARY */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={CalendarDays}
                title="21-Day Challenge"
                value="Day 7 of 21"
                color="bg-green-100 text-green-700"
              />
              <SummaryCard
                icon={Target}
                title="Today's Protein"
                value="85 g / 90 g"
                color="bg-orange-100 text-orange-600"
              />
              <SummaryCard
                icon={Flame}
                title="7-Day Streak"
                value="On Track"
                color="bg-orange-100 text-orange-600"
              />
              <SummaryCard
                icon={Coins}
                title="Protein Coins"
                value="3,500 Coins"
                color="bg-yellow-100 text-yellow-600"
              />
            </section>

            {/* COMMUNITIES + PROGRESS */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <DashboardCard className="overflow-hidden">
                <SectionTitle
                  title="My Active Communities (3)"
                  action="View All"
                  onClick={() => go("/protein-club/communities")}
                />
                <div className="divide-y divide-gray-100 px-3 sm:px-4">
                  {communities.map((community) => (
                    <div
                      key={community.title}
                      className="flex items-center gap-3 py-3"
                    >
                      <img
                        src={community.image}
                        alt={community.title}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold">
                          {community.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <Users size={14} /> {community.members}
                        </p>
                      </div>
                      <button
                        onClick={() => go("/protein-club/communities")}
                        className="rounded-full bg-gradient-to-r from-green-700 to-green-600 px-4 py-2 text-xs font-bold text-white hover:shadow-md"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Progress */}
              <DashboardCard className="overflow-hidden">
                <SectionTitle
                  title="My Progress"
                  action="View Details"
                  onClick={() => go("/protein-club/progress")}
                />
                <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 justify-center">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[16px] border-green-100">
                      <div className="absolute inset-[-16px] rounded-full border-[16px] border-green-600 border-b-transparent border-l-transparent rotate-[35deg]" />
                      <div className="text-center">
                        <p className="text-3xl font-black">78%</p>
                        <p className="text-sm">Goal Progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex gap-3 border-b border-gray-100 pb-3">
                      <Target className="text-orange-500" />
                      <div>
                        <p className="text-sm">Daily Protein Goal</p>
                        <p className="font-black">90 g</p>
                      </div>
                    </div>
                    <div className="flex gap-3 border-b border-gray-100 pb-3">
                      <ChartNoAxesColumnIncreasing className="text-green-600" />
                      <div>
                        <p className="text-sm">Today's Intake</p>
                        <p className="font-black">85 g</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CalendarDays className="text-green-600" />
                      <div>
                        <p className="text-sm">Days Active</p>
                        <p className="font-black">7 Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </section>

            {/* CHALLENGE + QUICK ACTIONS */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <DashboardCard className="overflow-hidden">
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 sm:px-5">
                  <h2 className="text-lg font-black">Continue Your Challenge</h2>
                  <span className="whitespace-nowrap rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-800">
                    <CalendarDays size={14} className="mr-1 inline" /> Day 7 of 21
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-4 sm:flex-row">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=85"
                    alt="Protein-rich breakfast"
                    className="h-48 w-full rounded-2xl object-cover sm:h-36 sm:w-36"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="text-lg font-black leading-tight">
                      Day 7 – Build a Protein-Rich Breakfast
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Include 25–30g protein in your breakfast and share your meal.
                    </p>
                    <button
                      onClick={() => go("/protein-club/my-challenges")}
                      className="mt-auto rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3 text-sm font-extrabold text-white hover:shadow-md"
                    >
                      Complete Day 7 <ArrowRight size={16} className="ml-1 inline" />
                    </button>
                  </div>
                </div>
              </DashboardCard>

              {/* Quick actions */}
              <DashboardCard className="overflow-hidden">
                <SectionTitle title="Today's Quick Actions" />
                <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
                  {[
                    { icon: Plus, label: "Log Protein", path: "/protein-club/log-protein" },
                    { icon: Camera, label: "Share Progress", path: "/protein-club/share-progress" },
                    { icon: MessageCircle, label: "Ask a Question", path: "/protein-club/communities" },
                    { icon: UserPlus, label: "Invite a Friend", path: "/protein-club/invite" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => go(action.path)}
                      className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-green-100 bg-[#F5FBF2] p-3 text-center transition hover:-translate-y-0.5 hover:bg-green-100"
                    >
                      <action.icon size={28} className="text-green-600" />
                      <span className="text-xs font-bold leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              </DashboardCard>
            </section>

            {/* HIGHLIGHTS + RECOMMENDATIONS */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <DashboardCard className="overflow-hidden">
                <SectionTitle
                  title="Community Highlights"
                  action="View All"
                  onClick={() => go("/protein-club/communities")}
                />

                <div className="space-y-4 p-4">
                  {[
                    {
                      name: "Priya M.",
                      community: "Build Muscle Community",
                      time: "2 hours ago",
                      text: "Completed my Day 7! 💪 Hit 95g protein today. Feeling more energetic!",
                      likes: 124,
                      comments: 32,
                      avatar:
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
                      food:
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
                    },
                    {
                      name: "Suresh K.",
                      community: "Vegetarian Protein Community",
                      time: "5 hours ago",
                      text: "High-protein lunch today – Paneer, dal, quinoa & salad. Total: 32g protein. 🥗",
                      likes: 98,
                      comments: 21,
                      avatar:
                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
                      food:
                        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
                    },
                  ].map((post) => (
                    <div key={post.name} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex gap-3">
                        <img src={post.avatar} alt={post.name} className="h-11 w-11 rounded-full object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold">{post.name}</p>
                          <p className="text-xs text-gray-500">{post.time} in {post.community}</p>
                          <p className="mt-2 text-sm leading-5">{post.text}</p>
                        </div>
                        <img src={post.food} alt="Meal" className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 pl-1 text-xs font-semibold text-gray-600">
                        <button className="flex items-center gap-1"><Heart size={15} className="text-red-500" /> {post.likes}</button>
                        <button className="flex items-center gap-1"><MessageCircle size={15} /> {post.comments}</button>
                        <button className="flex items-center gap-1"><Share2 size={15} /> Share</button>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Recommendations */}
              <DashboardCard className="overflow-hidden">
                <SectionTitle title="Recommended for You" />
                <div className="divide-y divide-gray-100 px-3 sm:px-4">
                  {recommendations.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => go("/protein-club/recommendations")}
                      className="flex w-full items-center gap-3 py-3 text-left transition hover:bg-green-50"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold">{item.title}</p>
                        <p className="mt-1 text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                      <ChevronRight size={18} className="shrink-0 text-gray-500" />
                    </button>
                  ))}
                </div>
              </DashboardCard>
            </section>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-2 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg justify-around gap-1">
          {[
            { icon: Home, label: "Home", path: "/protein-club/my-club" },
            { icon: Users, label: "Communities", path: "/protein-club/communities" },
            { icon: Trophy, label: "Challenges", path: "/protein-club/my-challenges" },
            { icon: ChartNoAxesColumnIncreasing, label: "Progress", path: "/protein-club/progress" },
            { icon: Settings, label: "Settings", path: "/protein-club/settings" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.path)}
              className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-bold text-gray-600 hover:bg-green-50 hover:text-green-700"
            >
              <item.icon size={19} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile bottom navigation spacing */}
      <div className="h-20 lg:hidden" />
    </main>
  );
}
