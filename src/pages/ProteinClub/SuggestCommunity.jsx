
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  ChevronRight,
  Lightbulb,
  ClipboardList,
  Settings,
  Target,
  CheckCircle2,
  Send,
  Users,
  Search,
  Dumbbell,
  BriefcaseBusiness,
  GraduationCap,
  Flower2,
  MapPin,
  Flame,
  Trophy,
  Utensils,
} from "lucide-react";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { submitCommunitySuggestion } from "../../services/proteinClubService";

const communityIdeas = [
  {
    name: "Marathon & Running",
    icon: Dumbbell,
    color: "text-green-600",
    bg: "bg-green-50",
    goal: "Fitness",
  },
  {
    name: "PCOS Nutrition",
    icon: Flower2,
    color: "text-pink-500",
    bg: "bg-pink-50",
    goal: "Health & Wellness",
  },
  {
    name: "Diabetes & Protein",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-50",
    goal: "Health & Wellness",
  },
  {
    name: "Corporate Wellness",
    icon: BriefcaseBusiness,
    color: "text-amber-500",
    bg: "bg-amber-50",
    goal: "Fitness",
  },
  {
    name: "College Fitness",
    icon: GraduationCap,
    color: "text-green-600",
    bg: "bg-green-50",
    goal: "Fitness",
  },
  {
    name: "Yoga & Wellness",
    icon: Flower2,
    color: "text-pink-500",
    bg: "bg-pink-50",
    goal: "Health & Wellness",
  },
  {
    name: "Regional Protein",
    icon: MapPin,
    color: "text-red-500",
    bg: "bg-red-50",
    goal: "Nutrition",
  },
];

const audienceOptions = [
  "Individuals",
  "Families",
  "Professionals",
  "Students",
  "Others",
];

const goalOptions = [
  "Fitness",
  "Health & Wellness",
  "Nutrition",
  "Weight Management",
  "Muscle Building",
  "Healthy Living",
  "Other",
];

const dietOptions = ["Any", "Veg", "Non-Veg", "Egg", "Vegan"];

function InfoCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ icon: Icon, title, color = "text-green-600" }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Icon size={34} className={`shrink-0 ${color}`} />
      <h2 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function SuggestCommunity() {
  const navigate = useNavigate();
  const { user, showToast } = useProteinClubAuth();

  const [communityName, setCommunityName] = useState("");
  const [audience, setAudience] = useState("Individuals");
  const [goal, setGoal] = useState("");
  const [diet, setDiet] = useState("Any");
  const [reason, setReason] = useState("");
  const [useCase, setUseCase] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleIdeaClick = (idea) => {
    setCommunityName(idea.name);
    setGoal(idea.goal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast("Please sign in first to submit a community suggestion.", "info");
      navigate("/protein-club/register");
      return;
    }

    if (!agreed) {
      showToast("Please accept the Community Guidelines before submitting.", "error");
      return;
    }

    if (!communityName.trim() || !audience || !goal || !reason.trim()) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await submitCommunitySuggestion({
        user,
        data: {
          communityName: communityName.trim(),
          audience,
          goal,
          diet,
          reason: reason.trim(),
          useCase: useCase.trim(),
        },
      });
      setSubmitted(true);
      showToast("Your community suggestion has been submitted for admin review!");
      setCommunityName("");
      setAudience("Individuals");
      setGoal("");
      setDiet("Any");
      setReason("");
      setUseCase("");
      setAgreed(false);
    } catch (err) {
      showToast(err?.message || "Could not submit community suggestion.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-5">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-green-700 hover:text-green-900"
          >
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

          <span className="text-gray-800">Suggest a Community</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mt-3 overflow-hidden bg-gradient-to-r from-protein-soft via-protein-surface to-protein-tint">
        <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-7 sm:px-6 md:grid-cols-2 md:py-10 lg:px-10">
          {/* Hero Text */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden shrink-0 sm:block">
              <Lightbulb
                size={86}
                strokeWidth={1.8}
                className="fill-yellow-400 text-green-700"
              />
            </div>

            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-protein-dark sm:text-4xl lg:text-5xl">
                Suggest a Community
              </h1>

              <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-800 sm:text-lg">
                Can't find the right community?
                <br className="hidden sm:block" />
                Tell us what kind of protein community you'd like to see in EatProtein.
              </p>

              <a
                href="#suggest-form"
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 sm:w-auto"
              >
                Suggest a Community
                <ArrowRight size={21} />
              </a>
            </div>
          </div>

          {/* Hero Illustration Area */}
          <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-green-100/50 to-green-200/50 p-5 sm:min-h-[300px]">
            {/* Decorative circle */}
            <div className="absolute h-48 w-48 rounded-full bg-green-300/30 sm:h-64 sm:w-64" />

            <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Dumbbell, title: "Yoga & Wellness", color: "text-green-600" },
                { icon: Flower2, title: "PCOS & Health", color: "text-pink-500" },
                { icon: Flame, title: "Diabetes Friendly", color: "text-orange-500" },
                { icon: GraduationCap, title: "College Fitness", color: "text-green-600" },
                { icon: BriefcaseBusiness, title: "Working Professionals", color: "text-amber-500" },
                { icon: Utensils, title: "Nutrition Groups", color: "text-orange-500" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-3 py-3 shadow-sm backdrop-blur-sm"
                  >
                    <Icon size={24} className={item.color} />
                    <span className="text-xs font-bold leading-tight text-gray-800 sm:text-sm">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Ideas */}
      <section className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-3">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Popular Community Ideas
          </h2>
          <div className="mt-2 h-1 w-14 rounded-full bg-green-600" />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {communityIdeas.map((idea) => {
            const Icon = idea.icon;

            return (
              <button
                type="button"
                key={idea.name}
                onClick={() => handleIdeaClick(idea)}
                className={`flex min-h-[68px] items-center gap-2 rounded-2xl border border-gray-200 ${idea.bg} p-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-400 hover:shadow-md`}
              >
                <Icon size={30} className={`shrink-0 ${idea.color}`} />

                <span className="text-xs font-bold leading-tight text-gray-900 sm:text-sm">
                  {idea.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Form and Information */}
      <section
        id="suggest-form"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pt-5 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.15fr_0.95fr]">
          {/* Suggestion Form */}
          <InfoCard className="min-w-0">
            <SectionHeading
              icon={ClipboardList}
              title="Suggest a New Community"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Community Name */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-800">
                  Community Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  placeholder="e.g., Marathon Runners Community"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Audience */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Who is it for? <span className="text-red-500">*</span>
                </label>

                <div className="flex flex-wrap gap-2">
                  {audienceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAudience(option)}
                      className={`rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                        audience === option
                          ? "border-green-600 bg-green-50 text-green-800 ring-1 ring-green-500"
                          : "border-gray-300 bg-white text-gray-700 hover:border-green-400"
                      }`}
                    >
                      {audience === option && (
                        <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-green-600" />
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal & Diet */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-800">
                    Main Goal / Focus <span className="text-red-500">*</span>
                  </label>

                  <select
                    required
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">Select a goal</option>
                    {goalOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-gray-800">
                    Diet Preference <span className="font-normal text-gray-500">(Optional)</span>
                  </label>

                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    {dietOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Why */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-800">
                  Why should this community exist?{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us why this community will be valuable for EatProtein members..."
                  className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Use Case */}
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-800">
                  Expected Audience / Use Case{" "}
                  <span className="font-normal text-gray-500">(Optional)</span>
                </label>

                <textarea
                  rows={3}
                  value={useCase}
                  onChange={(e) => setUseCase(e.target.value)}
                  placeholder="e.g., People training for marathons, needing high-protein diet plans, tips and support..."
                  className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Agreement */}
              <label className="flex cursor-pointer items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-green-600"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-green-700 underline underline-offset-2 hover:text-green-900"
                  >
                    EatProtein Community Guidelines
                  </Link>
                  .
                </span>
              </label>

              {submitted && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-xs font-semibold text-green-800">
                  Suggestion received! Our Protein Club admins review new community requests regularly.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mx-auto flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 sm:w-[75%] sm:text-base"
              >
                <Send size={19} />
                {submitting ? "Submitting..." : "Submit Suggestion"}
                <ArrowRight size={19} />
              </button>
            </form>
          </InfoCard>

          {/* Right Information */}
          <div className="flex min-w-0 flex-col gap-3">
            {/* How it works */}
            <InfoCard>
              <SectionHeading
                icon={Settings}
                title="How It Works?"
              />

              <div className="grid grid-cols-4 gap-1">
                {[
                  { icon: Send, title: "You", desc: "Suggest a Community" },
                  { icon: Search, title: "We Review", desc: "your request" },
                  { icon: CheckCircle2, title: "We Approve", desc: "if there's demand" },
                  { icon: Users, title: "Community is Created", desc: "and you'll be notified" },
                ].map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={index} className="relative flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 sm:h-14 sm:w-14">
                        <Icon size={25} className="text-green-600" />
                      </div>

                      <p className="mt-2 text-xs font-extrabold text-gray-900 sm:text-sm">
                        {step.title}
                      </p>

                      <p className="mt-1 text-[10px] leading-tight text-gray-600 sm:text-xs">
                        {step.desc}
                      </p>

                      {index !== 3 && (
                        <ArrowRight
                          size={16}
                          className="absolute -right-2 top-4 text-green-600 sm:-right-3"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </InfoCard>

            {/* What we look for */}
            <InfoCard>
              <SectionHeading
                icon={Target}
                title="What We Look For?"
              />

              <div className="space-y-2.5">
                {[
                  "Clear and relevant purpose (protein, fitness, nutrition or healthy living)",
                  "A defined audience and real need",
                  "Alignment with EatProtein's mission and values",
                  "Non-duplicate and long-term community potential",
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 fill-green-600 text-white"
                    />
                    <p className="text-sm leading-relaxed text-gray-800">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Protein Leader */}
            <InfoCard className="bg-gradient-to-br from-protein-surface to-protein-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Trophy size={31} className="text-yellow-500" />
                    <h2 className="text-xl font-extrabold text-gray-900">
                      Extra Opportunity
                    </h2>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-800">
                    If your suggested community is approved, you can also apply to become its Protein Leader and help grow it!
                  </p>

                  <Link
                    to="/protein-club/leader-application"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-600 bg-white px-4 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-50 sm:w-auto"
                  >
                    Apply to be Protein Leader
                    <ArrowRight size={17} />
                  </Link>
                </div>

                <div className="flex shrink-0 items-center justify-center sm:w-28">
                  <Trophy
                    size={100}
                    strokeWidth={1.5}
                    className="fill-yellow-400 text-yellow-600 drop-shadow-sm"
                  />
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-protein-lime via-protein-green to-protein-green px-5 py-7 text-white shadow-sm sm:px-8 sm:py-9">
          <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-20 sm:w-20">
                <Users size={36} className="text-white sm:h-12 sm:w-12" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
                  Be Part of a Growing Protein Community
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/95 sm:text-base">
                  Help us build meaningful, goal-based communities for a healthier and stronger India.
                </p>
              </div>
            </div>

            <Link
              to="/protein-club/communities"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-green-50 sm:text-base"
            >
              <Users size={19} />
              Explore Communities
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-40 h-36 w-36 rounded-full bg-white/10" />
        </div>
      </section>
    </main>
  );
}

export default SuggestCommunity;
