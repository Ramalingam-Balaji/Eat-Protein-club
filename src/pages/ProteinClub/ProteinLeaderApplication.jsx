
// import React from "react";
// import { Link } from "react-router-dom";
// import { Crown, ArrowLeft } from "lucide-react";

// export default function ProteinLeaderApplication() {
//   return (
//     <section className="min-h-screen bg-protein-soft px-4 py-12">
//       <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
//         <Link
//           to="/protein-club/communities"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-green-800"
//         >
//           <ArrowLeft size={16} />
//           Back to Communities
//         </Link>

//         <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
//           <Crown className="text-orange-500" size={34} />
//         </div>

//         <h1 className="text-3xl font-extrabold text-protein-dark">
//           Become a Protein Leader
//         </h1>

//         <p className="mt-3 text-gray-600">
//           Help others build better protein habits, grow a community, lead
//           challenges, and earn recognition within EatProtein.
//         </p>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             alert("Application form submitted! Backend integration will be added later.");
//           }}
//           className="mt-8 space-y-4"
//         >
//           <input
//             required
//             placeholder="Full Name"
//             className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
//           />

//           <input
//             required
//             type="email"
//             placeholder="Email Address"
//             className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
//           />

//           <input
//             required
//             type="tel"
//             placeholder="Phone Number"
//             className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
//           />

//           <input
//             required
//             placeholder="City / Location"
//             className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
//           />

//           <textarea
//             required
//             rows={4}
//             placeholder="Why would you like to become a Protein Leader?"
//             className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
//           />

//           <button
//             type="submit"
//             className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-3 font-bold text-white hover:shadow-lg"
//           >
//             Submit Application →
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Users,
  Trophy,
  Coins,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  Flag,
  Megaphone,
  MessageCircle,
  CalendarDays,
  ShieldCheck,
  Layers,
  FileText,
  Search,
  Rocket,
  Crown,
  Star,
  UserRound,
} from "lucide-react";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { submitLeaderApplication } from "../../services/proteinClubService";

const benefits = [
  {
    title: "Recognition",
    description: "Get a verified Protein Leader badge & profile.",
    icon: Trophy,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    title: "Rewards",
    description: "Earn Protein Coins, product benefits & exclusive offers.",
    icon: Coins,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    title: "Build Community",
    description: "Create a positive impact and grow your network.",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Learning",
    description: "Access expert sessions, nutrition & leadership training.",
    icon: GraduationCap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Growth Opportunity",
    description: "Get chances for collaborations & referral rewards.",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const eligibility = [
  "Fitness & nutrition enthusiasts",
  "Trainers, coaches & health experts",
  "Working professionals with a passion for health",
  "Parents & community organizers",
  "Active EatProtein community members",
];

const leaderRoles = [
  {
    icon: Megaphone,
    text: "Keep the community active & supportive",
  },
  {
    icon: MessageCircle,
    text: "Share practical, safe and relevant content",
  },
  {
    icon: CalendarDays,
    text: "Organize challenges & community activities",
  },
  {
    icon: Users,
    text: "Encourage healthy protein habits",
  },
  {
    icon: ShieldCheck,
    text: "Follow EatProtein community guidelines",
  },
];

const levels = [
  {
    title: "Protein Leader",
    description: "Lead a community & grow members",
    icon: Star,
    color: "bg-protein-tint",
    height: "h-28",
  },
  {
    title: "Senior Protein Leader",
    description: "Drive higher engagement & run bigger initiatives",
    icon: Star,
    color: "bg-protein-lime",
    height: "h-36",
  },
  {
    title: "City Protein Champion",
    description: "Lead at city level, host events & represent EatProtein",
    icon: Crown,
    color: "bg-protein-lime",
    height: "h-44",
  },
];

const applicationSteps = [
  {
    title: "Apply",
    description: "Fill out the application",
    icon: FileText,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Review",
    description: "Our team reviews your application",
    icon: Search,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Approval",
    description: "Get selected as a Protein Leader",
    icon: CheckCircle,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Lead",
    description: "Start leading your community with support",
    icon: Rocket,
    color: "bg-orange-100 text-orange-600",
  },
];

const nextSteps = [
  "You will hear from our team within 5–7 working days.",
  "If selected, you'll get a Protein Leader onboarding kit.",
  "You'll be added to the official Protein Leader community.",
  "You'll receive training, resources and ongoing support.",
];

function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
      <Icon className="h-7 w-7 shrink-0 text-green-600" />
      {children}
    </h2>
  );
}

function ProteinLeaderApplication() {
  const navigate = useNavigate();
  const { user, profile, showToast } = useProteinClubAuth();

  const [formData, setFormData] = useState({
    fullName: profile?.displayName || user?.displayName || "",
    city: "",
    occupation: "",
    experience: "",
    interest: "",
    reason: "",
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      showToast("Please sign in first to submit your Protein Leader application.", "info");
      navigate("/protein-club/register");
      return;
    }

    if (!formData.agreed) {
      showToast("Please accept the community guidelines and program terms.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await submitLeaderApplication({
        user,
        data: formData,
      });
      setSubmitted(true);
      showToast("Your Protein Leader application has been submitted for review!");
    } catch (err) {
      showToast(err?.message || "Could not submit your application.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-600">
          <Link to="/" className="text-green-700 hover:text-green-900">
            <Home size={18} />
          </Link>
          <span className="text-gray-400">|</span>

          <Link to="/protein-club" className="hover:text-green-700">
            Protein Club
          </Link>

          <ArrowRight size={15} className="text-green-700" />

          <span className="font-semibold text-gray-900">
            Become a Protein Leader
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative mt-3 overflow-hidden bg-gradient-to-r from-protein-soft via-protein-surface to-protein-tint">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[45%] h-48 w-48 rounded-full bg-green-200/40 blur-2xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[210px_1fr_350px] lg:px-8 lg:py-10">
          {/* Leader Badge */}
          <div className="mx-auto flex w-full max-w-[200px] flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full items-center justify-center rounded-[38%] border-[7px] border-yellow-400 bg-gradient-to-b from-green-700 to-green-950 p-4 shadow-xl">
              <div className="absolute inset-2 rounded-[35%] border border-yellow-300/50" />
              <div className="relative flex flex-col items-center text-center text-white">
                <Crown className="mb-2 h-12 w-12 text-yellow-300" />
                <span className="text-sm font-black leading-tight">
                  EatProtein
                </span>
                <span className="mt-1 text-xl font-extrabold leading-tight">
                  Protein
                  <br />
                  Leader
                </span>
                <Star className="mt-3 h-5 w-5 fill-yellow-300 text-yellow-300" />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
              <Users size={18} />
              Protein Club
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Become a{" "}
              <span className="text-green-700">Protein Leader</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base lg:mx-0">
              Lead a community, inspire healthier protein habits, help people
              achieve their goals, and get recognized and rewarded by EatProtein.
            </p>

            <a
              href="#leader-application"
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
            >
              Apply Now
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Hero Guide Card */}
          <div className="mx-auto hidden w-full max-w-[350px] lg:block">
            <div className="rounded-3xl border border-green-100 bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-green-100 p-3 text-green-700">
                  <Users size={30} />
                </div>
                <div>
                  <p className="font-extrabold text-green-900">
                    Make an Impact
                  </p>
                  <p className="text-xs text-gray-500">
                    Become a community leader
                  </p>
                </div>
              </div>

              {["Guide", "Motivate", "Support", "Grow"].map((item) => (
                <div
                  key={item}
                  className="mb-2 flex items-center gap-3 rounded-xl bg-green-50 px-4 py-2.5"
                >
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="font-bold text-green-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-[210px_repeat(5,minmax(0,1fr))]">
          <div className="flex items-center">
            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              Why Become a
              <br />
              Protein Leader?
              <span className="mt-3 block h-1 w-14 rounded-full bg-green-600" />
            </h2>
          </div>

          {benefits.map(({ title, description, icon: Icon, color, bg }) => (
            <div
              key={title}
              className={`rounded-2xl border border-gray-100 ${bg} p-4 text-center transition hover:-translate-y-1 hover:shadow-md`}
            >
              <Icon className={`mx-auto mb-3 h-9 w-9 ${color}`} />
              <h3 className="text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-snug text-gray-700">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility, Roles, Levels */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 py-2 sm:px-6 xl:grid-cols-3 lg:px-8">
        {/* Who can apply */}
        <div className="rounded-2xl border border-green-100 bg-protein-soft p-5 sm:p-6">
          <SectionTitle icon={Users}>Who Can Apply?</SectionTitle>

          <ul className="space-y-3">
            {eligibility.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 fill-green-600 text-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Roles */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <SectionTitle icon={Flag}>Your Role as Protein Leader</SectionTitle>

          <ul className="space-y-4">
            {leaderRoles.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm">
                <Icon className="h-5 w-5 shrink-0 text-green-600" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leader Levels */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <SectionTitle icon={Layers}>Protein Leader Levels</SectionTitle>

          <div className="flex items-end gap-2 pt-2">
            {levels.map(({ title, description, icon: Icon, color, height }) => (
              <div
                key={title}
                className={`flex min-w-0 flex-1 flex-col justify-end rounded-t-2xl ${color} ${height} p-2 text-center sm:p-3`}
              >
                <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 shadow">
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-xs font-extrabold leading-tight sm:text-sm">
                  {title}
                </h3>

                <p className="mt-2 text-[10px] leading-tight text-gray-800 sm:text-xs">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form + Process */}
      <section
        id="leader-application"
        className="mx-auto grid max-w-[1440px] scroll-mt-24 grid-cols-1 gap-4 px-4 py-6 sm:px-6 lg:px-8 xl:grid-cols-[1.2fr_1fr]"
      >
        {/* Application Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionTitle icon={FileText}>
            Apply to Become a Protein Leader
          </SectionTitle>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 p-6 text-center">
              <CheckCircle className="mx-auto h-14 w-14 text-green-600" />
              <h3 className="mt-3 text-xl font-extrabold text-green-800">
                Application Submitted!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Thank you for your interest in becoming an EatProtein Leader.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-full border border-green-700 px-5 py-2 text-sm font-bold text-green-800 hover:bg-green-100"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & City */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={updateField}
                    placeholder="Enter your full name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    <option value="">Select your city</option>
                    <option>Chennai</option>
                    <option>Bengaluru</option>
                    <option>Hyderabad</option>
                    <option>Vijayawada</option>
                    <option>Visakhapatnam</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Pune</option>
                    <option>Coimbatore</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Occupation & Experience */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-bold">
                    Occupation / Profession{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={updateField}
                    className={inputClass}
                    required
                  >
                    <option value="">Select option</option>
                    <option>Fitness Trainer</option>
                    <option>Nutritionist / Dietitian</option>
                    <option>Student</option>
                    <option>Healthcare Professional</option>
                    <option>Working Professional</option>
                    <option>Business Owner</option>
                    <option>Community Organizer</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold">
                    Experience / Background
                  </label>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={updateField}
                    placeholder="e.g., Fitness Trainer, Nutrition, Community Work"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Community Interest */}
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  Community Interest / Focus{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={updateField}
                  className={inputClass}
                  required
                >
                  <option value="">Select a community area</option>
                  <option>Fitness & Muscle Building</option>
                  <option>Weight Management</option>
                  <option>Healthy Lifestyle</option>
                  <option>Nutrition Awareness</option>
                  <option>Sports & Athletes</option>
                  <option>Women’s Health & Wellness</option>
                  <option>Student Wellness</option>
                  <option>General Community</option>
                </select>
              </div>

              {/* Why Apply */}
              <div>
                <label className="mb-1.5 block text-sm font-bold">
                  Why do you want to be a Protein Leader?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={updateField}
                  placeholder="Tell us about your interest, experience and how you can add value to the community..."
                  rows={4}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              {/* Agreement */}
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                <input
                  name="agreed"
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={updateField}
                  className="mt-1 h-4 w-4 shrink-0 accent-green-600"
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="font-semibold text-green-700 underline">
                    EatProtein Community Guidelines
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-semibold text-green-700 underline">
                    Protein Leader Program Terms
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Application"}
                <ArrowRight size={20} />
              </button>
            </form>
          )}
        </div>

        {/* Process & Next Steps */}
        <div className="flex flex-col gap-4">
          {/* Application Process */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <SectionTitle icon={Users}>Application Process</SectionTitle>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {applicationSteps.map(({ title, description, icon: Icon, color }, i) => (
                <div key={title} className="relative flex flex-col items-center text-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon size={26} />
                  </div>

                  {i < applicationSteps.length - 1 && (
                    <ArrowRight className="absolute right-[-10px] top-5 hidden h-4 w-4 text-green-600 sm:block" />
                  )}

                  <h3 className="mt-2 font-extrabold">{title}</h3>
                  <p className="mt-1 text-xs leading-snug text-gray-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-protein-soft to-protein-tint p-5 sm:p-6">
            <SectionTitle icon={CalendarDays}>What Happens Next?</SectionTitle>

            <ul className="space-y-3">
              {nextSteps.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 fill-green-600 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pointer-events-none absolute -bottom-5 -right-4 rotate-12 opacity-10">
              <UserRound size={120} className="text-green-800" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProteinLeaderApplication;
