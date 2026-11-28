import {
  Calculator,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Gift,
  ArrowRight,
} from "lucide-react";


/* =========================================================
   SECTION 1: HOW PROTEIN CLUB WORKS
========================================================= */

const clubSteps = [
  {
    number: "1",
    icon: Calculator,
    title: "Calculate Your Protein",
    description: "Know how much protein you need daily.",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    number: "2",
    icon: CalendarDays,
    title: "Join a Challenge",
    description: "Take up the 21-Day Protein Challenge.",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    number: "3",
    icon: ChartNoAxesColumnIncreasing,
    title: "Track Your Progress",
    description: "Log your protein, stay consistent and see results.",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    number: "4",
    icon: Gift,
    title: "Earn Rewards",
    description: "Complete challenges, maintain streaks and earn Protein Coins.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export function HowProteinClubWorks() {
  return (
    <section className="px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-4 rounded-3xl bg-[#F0F8ED] p-4 sm:p-5 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-6 lg:p-6">
          {/* Intro */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-extrabold leading-tight text-[#103B27] sm:text-2xl">
              How Protein Club Works
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-700">
              A simple 4-step journey to build lasting protein habits with a
              supportive community.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {clubSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative flex items-center">
                  <div className="relative w-full rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-4">
                    {/* <span className="absolute -top-2 left-8 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-extrabold text-white shadow">
                      {step.number}
                    </span> */}

                    <div className="flex items-start gap-2.5">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.bg}`}
                      >
                        <Icon className={`h-6 w-6 ${step.color}`} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold leading-tight text-[#103B27] sm:text-base">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index !== clubSteps.length - 1 && (
                    <ArrowRight className="mx-1 hidden h-5 w-5 shrink-0 text-green-700 xl:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
