import { ArrowRight, Heart, Leaf, ShieldCheck, Store } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

import { BENEFITS } from "../data/homeData";
import BANNERS from "../data/bannerData";

const icons = {
  leaf: Leaf,
  shield: ShieldCheck,
  store: Store,
  heart: Heart,
};

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (!BANNERS || BANNERS.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbar = document.querySelector("header");
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;

    const targetPosition =
      section.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="home"
      className="relative isolate scroll-mt-16 overflow-hidden bg-protein-surface"
    >
      {/* Full-width responsive background banners */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            role="img"
            aria-label={banner.alt}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBanner
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{
              backgroundImage: `url("${banner.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-protein-surface/92 via-protein-surface/65 to-transparent lg:via-protein-surface/35"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid min-h-[540px] max-w-[1500px] grid-cols-1 sm:min-h-[580px] lg:min-h-[620px] lg:grid-cols-[44%_56%]">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-14 lg:px-7 lg:py-12">
          <h1 className="max-w-[500px] text-[34px] font-black leading-[1.04] tracking-[-1.2px] text-protein-dark sm:text-[43px] md:text-[48px] lg:text-[49px]">
            Healthy
            <br />
            Protein Choices
            <br />
            <span
              key={currentBanner}
              className="inline-block text-protein-green animate-fade-in"
            >
              {BANNERS[currentBanner]?.headline || "for a Better You"}
            </span>
          </h1>

          <p className="mt-4 max-w-[465px] text-sm leading-6 text-protein-muted sm:text-[15px]">
            Discover high protein foods from local stores, make smarter choices
            with nutrition intelligence and live a healthier, stronger life.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("high-protein-foods")}
              className="flex w-fit items-center justify-center gap-2 rounded-full bg-gradient-to-r from-protein-orange to-protein-orange2 px-5 py-3 text-sm font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:px-7"
            >
              Explore High Protein Foods
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("protein-calculator")}
              className="flex w-fit items-center justify-center rounded-full border-2 border-protein-green bg-white/80 px-5 py-3 text-sm font-bold text-protein-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-protein-green hover:text-white hover:shadow-md sm:px-7"
            >
              Calculate Your Needs
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 grid max-w-[480px] grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 sm:gap-3">
            {BENEFITS.map((item) => {
              const Icon = icons[item.icon];
              if (!Icon) return null;

              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto mb-2 grid h-11 w-11 place-items-center rounded-full border border-protein-border bg-white text-protein-green shadow-sm sm:h-12 sm:w-12">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <p className="text-xs font-semibold leading-4 text-protein-text">
                    {item.title}
                  </p>

                  <p className="text-xs font-semibold leading-4 text-protein-text">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side space for background showcase */}
        <div className="hidden min-h-[420px] lg:block" />
      </div>

      {/* Realistic Nutrition Info Card */}
      <div className="absolute bottom-14 right-8 z-20 hidden w-44 rounded-2xl border border-protein-border bg-white/95 p-4 shadow-soft backdrop-blur-sm md:block lg:right-12 xl:right-20">
        <p className="text-[11px] font-bold text-protein-dark">High Protein</p>

        <span className="mt-1 inline-block rounded-md bg-protein-soft px-2.5 py-1 text-[11px] font-bold tabular-nums text-protein-green">
          24g Protein
        </span>

        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-protein-text">
          <Leaf size={13} className="text-protein-green" />
          Nutri Score <b className="text-protein-green">A</b>
        </p>

        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-protein-text">
          <Heart size={13} className="text-protein-orange" />
          Healthy Choice
        </p>
      </div>

      {/* Banner Dots */}
      {BANNERS.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
          {BANNERS.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
              aria-pressed={index === currentBanner}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentBanner
                  ? "w-6 bg-protein-green"
                  : "w-1.5 bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
