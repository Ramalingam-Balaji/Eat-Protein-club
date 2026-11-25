
import React from "react";
import {
  Users,
  Flame,
  Trophy,
  CalendarDays,
  Gift,
  ChartNoAxesColumnIncreasing,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: CalendarDays,
    title: "21-Day",
    subtitle: "Protein Challenge",
    description: "Build a consistent protein habit",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "Protein Groups",
    description: "Fitness, weight loss, family nutrition & more",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Leaderboard",
    description: "Stay motivated and see your progress",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Complete challenges, earn Protein Coins & get benefits",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

const stats = [
  {
    icon: Users,
    value: "12,482",
    label: "Members",
    color: "text-green-600",
  },
  {
    icon: Flame,
    value: "2,341",
    label: "Active Challengers",
    color: "text-orange-500",
  },
  {
    icon: Trophy,
    value: "18,650",
    label: "Goals Completed",
    color: "text-amber-500",
  },
];

function ProteinClub() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-green-100 bg-[#eff9ed]">

        <div className="grid grid-cols-1 items-center gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-5 lg:p-8">

          {/* Community Members Image */}
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#dcf8d5] to-[#b7e9a9] lg:col-span-3 lg:min-h-[250px]">
            <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-green-200/60" />
            <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-green-300/40" />

            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85"
              alt="EatProtein community members"
              className="relative z-10 h-full min-h-[220px] w-full object-cover object-center lg:min-h-[250px]"
            />
          </div>

          {/* Main Community Content */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:px-2">

            <div className="mb-2 w-fit rounded-full bg-[#d6f5c7] px-3 py-1 text-xs font-bold tracking-wide text-green-800">
              COMMUNITY
            </div>

            <h2 className="text-2xl font-extrabold leading-tight text-[#103b27] sm:text-3xl lg:text-[34px]">
              EatProtein{" "}
              <span className="text-green-700">Protein Club</span>
            </h2>

            <p className="mt-1 text-base font-semibold text-gray-700 sm:text-lg">
              Your protein journey is better together.
            </p>

            {/* Community Stats */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-green-200">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center px-2 text-center sm:px-3"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icon className={`${stat.color} h-5 w-5 shrink-0 sm:h-6 sm:w-6`} />
                      <span className="text-base font-extrabold text-gray-900 sm:text-xl">
                        {stat.value}
                      </span>
                    </div>

                    <span className="mt-1 text-xs font-medium leading-tight text-gray-600 sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Join CTA */}
            <Link
  to="/protein-club"
  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-green-800 hover:to-green-700 hover:shadow-lg sm:w-auto"
>
  Join Free
  <ArrowRight className="h-5 w-5" />
</Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group flex min-h-[110px] items-start gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:min-h-[120px] sm:p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 sm:text-lg">
                      {feature.title}
                    </h3>

                    {feature.subtitle && (
                      <p className="text-sm font-semibold text-gray-700">
                        {feature.subtitle}
                      </p>
                    )}

                    <p className="mt-1 text-sm leading-snug text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProteinClub;
