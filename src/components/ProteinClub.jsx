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
import { clubImages } from "../pages/ProteinClub/data/communities";

const features = [
  {
    icon: CalendarDays,
    title: "21-Day",
    subtitle: "Protein Challenge",
    description: "Build a consistent protein habit",
    color: "text-protein-green",
    bg: "bg-protein-soft",
    to: "/protein-club/challenges",
  },
  {
    icon: Users,
    title: "Protein Groups",
    description: "Fitness, weight loss, family nutrition & more",
    color: "text-protein-green",
    bg: "bg-protein-soft",
    to: "/protein-club/communities",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Leaderboard",
    description: "Stay motivated and see your progress",
    color: "text-protein-orange",
    bg: "bg-protein-orange/10",
    to: "/protein-club/leaderboard",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Complete challenges, earn Protein Coins & get benefits",
    color: "text-protein-orange",
    bg: "bg-protein-orange/10",
    to: "/protein-club/rewards",
  },
];

const stats = [
  { icon: Users, value: "12,482", label: "Members", color: "text-protein-green" },
  { icon: Flame, value: "2,341", label: "Active Challengers", color: "text-protein-orange" },
  { icon: Trophy, value: "18,650", label: "Goals Completed", color: "text-protein-gold" },
];

function ProteinClub() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-protein-border bg-protein-soft shadow-card">
        <div className="grid grid-cols-1 items-center gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-5 lg:p-8">
          {/* Community Members Image */}
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-protein-border bg-protein-tint lg:col-span-3 lg:min-h-[250px]">
            <img
              src={clubImages.hero}
              alt="EatProtein community members"
              className="relative z-10 h-full min-h-[220px] w-full object-cover object-center lg:min-h-[250px]"
            />
          </div>

          {/* Main Community Content */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:px-2">
            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-protein-green">
              EatProtein Community
            </span>

            <h2 className="text-2xl font-extrabold leading-tight text-protein-dark sm:text-3xl lg:text-[34px]">
              EatProtein <span className="text-protein-green">Protein Club</span>
            </h2>

            <p className="mt-1 text-base font-semibold text-protein-muted sm:text-lg">
              Your protein journey is better together.
            </p>

            {/* Community Stats */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-protein-border">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center px-2 text-center sm:px-3"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icon className={`${stat.color} h-5 w-5 shrink-0 sm:h-6 sm:w-6`} />
                      <span className="text-base font-extrabold tabular-nums text-protein-dark sm:text-xl">
                        {stat.value}
                      </span>
                    </div>
                    <span className="mt-1 text-xs font-medium leading-tight text-protein-muted sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/protein-club"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-protein-green to-protein-hover px-6 py-3 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
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
                <Link
                  key={index}
                  to={feature.to}
                  className="group flex min-h-[110px] items-start gap-3 rounded-2xl border border-protein-border/70 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-protein-green/40 hover:shadow-md sm:min-h-[120px] sm:p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-protein-dark sm:text-lg">
                      {feature.title}
                    </h3>
                    {feature.subtitle && (
                      <p className="text-sm font-semibold text-protein-text/80">
                        {feature.subtitle}
                      </p>
                    )}
                    <p className="mt-1 text-sm leading-snug text-protein-muted">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProteinClub;
