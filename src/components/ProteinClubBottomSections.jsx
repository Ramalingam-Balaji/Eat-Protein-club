import React, { useState } from "react";
import {
  Calculator,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const green = "#13852F";
const orange = "#F4770B";


/* =========================================================
   SECTION 2: COMMUNITY SUCCESS STORIES
========================================================= */

const testimonials = [
  {
    name: "Rohit S.",
    location: "Vijayawada",
    goal: "Muscle Gain",
    image: "https://i.pravatar.cc/120?img=12",
    quote:
      "The 21-Day Challenge helped me build a consistent protein routine. I've gained 4 kg of lean muscle!",
  },
  {
    name: "Priya M.",
    location: "Hyderabad",
    goal: "Family Health",
    image: "https://i.pravatar.cc/120?img=47",
    quote:
      "As a working mom, the EatProtein community gives me easy, practical protein ideas for my whole family.",
  },
  {
    name: "Suresh K.",
    location: "Kavali",
    goal: "Better Health",
    image: "https://i.pravatar.cc/120?img=68",
    quote:
      "I'm 52 and feel more energetic after tracking my protein and joining the community.",
  },
  {
    name: "Anjali R.",
    location: "Guntur",
    goal: "Healthy Lifestyle",
    image: "https://i.pravatar.cc/120?img=44",
    quote:
      "Tracking my daily protein intake has helped me become more mindful about my food choices.",
  },
  {
    name: "Vikram P.",
    location: "Chennai",
    goal: "Fitness",
    image: "https://i.pravatar.cc/120?img=15",
    quote:
      "The challenges keep me motivated. It's easier to stay consistent when people support you.",
  },
];

export function CommunitySuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleTestimonials = Array.from({ length: 3 }, (_, i) => {
    return testimonials[(activeIndex + i) % testimonials.length];
  });

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="community-success-stories"
      className="px-3 py-4 sm:px-5 lg:px-6"
    >
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-[220px_1fr] lg:items-center">
        {/* Intro */}
        <div className="flex flex-row items-center justify-between gap-3 lg:flex-col lg:items-start">
          <div>
            <h2 className="text-xl font-extrabold leading-tight text-[#103B27] sm:text-2xl">
              Community
              <br className="hidden lg:block" /> Success Stories
            </h2>

            <div className="mt-2 h-1 w-12 rounded-full bg-green-700" />

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600">
              Real people. Real results. Healthier lives with the EatProtein
              Protein Club.
            </p>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 gap-2 lg:mt-3">
            <button
              onClick={previous}
              aria-label="Previous success story"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-600 hover:text-green-700"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              onClick={next}
              aria-label="Next success story"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-green-600 hover:text-green-700"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((person, index) => (
            <article
              key={`${person.name}-${activeIndex}`}
              className={`flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md ${
                index === 2 ? "hidden xl:flex" : ""
              }`}
            >
              <img
                src={person.image}
                alt={person.name}
                className="h-14 w-14 shrink-0 rounded-full border-2 border-green-100 object-cover sm:h-16 sm:w-16"
                loading="lazy"
              />

              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-gray-700">
                  <span className="mr-1 text-lg font-black text-[#103B27]">
                    “
                  </span>
                  {person.quote}
                  <span className="ml-1 text-lg font-black text-[#103B27]">
                    ”
                  </span>
                </p>

                <p className="mt-2 text-sm font-extrabold text-gray-900">
                  {person.name}
                </p>

                <p className="text-xs text-gray-500">
                  {person.location} · {person.goal}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 3: JOIN PROTEIN CLUB CTA
========================================================= */

const joinBenefits = [
  "Know your protein requirement",
  "Join challenges & stay motivated",
  "Track your progress",
  "Get expert tips & support",
  "Earn rewards & special offers",
];

export function JoinProteinClubBanner() {
  return (
    <section
      id="protein-club-join"
      className="px-3 py-4 sm:px-5 lg:px-6"
    >
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#12652D] via-[#087A36] to-[#005421] text-white shadow-md">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-green-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-5 p-5 sm:p-7 lg:grid-cols-[1.1fr_1.4fr_0.9fr] lg:items-center lg:gap-7 lg:p-8">
          {/* Member image group */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="flex -space-x-5 sm:-space-x-6">
              {[
                "https://i.pravatar.cc/180?img=12",
                "https://i.pravatar.cc/180?img=47",
                "https://i.pravatar.cc/180?img=15",
                "https://i.pravatar.cc/180?img=68",
              ].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Protein Club member ${i + 1}`}
                  className="h-16 w-16 rounded-full border-[3px] border-green-800 object-cover shadow-md sm:h-20 sm:w-20 lg:h-[88px] lg:w-[88px]"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
              Join the EatProtein{" "}
              <span className="text-lime-300">Protein Club</span>
            </h2>

            <p className="mt-2 text-sm text-green-50 sm:text-base">
              Build better protein habits together.
            </p>

            <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link
  to="/protein-club"
  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
>
  Join Free <ArrowRight size={16} />
</Link>

              <a
                href="https://play.google.com/store/apps/details?id=com.mannschaft.eatprotien"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-extrabold text-green-800 shadow-sm transition hover:bg-green-50"
              >
                <span className="text-base">↓</span>
                Download App
              </a>
            </div>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-2 border-t border-green-300/30 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            {joinBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-lime-300"
                />
                <span className="text-xs font-medium text-white sm:text-sm">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ALL THREE NEW SECTIONS
========================================================= */

export default function ProteinClubBottomSections() {
  return (
    <>
     
      <CommunitySuccessStories />
      <JoinProteinClubBanner />
    </>
  );
}