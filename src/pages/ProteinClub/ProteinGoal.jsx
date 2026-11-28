import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Flame,
  HeartPulse,
  Scale,
  Target,
  Users,
  Utensils,
} from "lucide-react";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { calculateProteinNeed } from "../../services/proteinClubService";
import { clubImages } from "./data/communities";

const goalOptions = [
  {
    id: "Build Muscle",
    title: "Build Muscle",
    desc: "Gain lean muscle, strength and stamina",
    icon: Dumbbell,
    color: "text-protein-green",
    bg: "bg-protein-soft",
  },
  {
    id: "Lose Fat",
    title: "Lose Fat",
    desc: "Reduce body fat and stay fit",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: "Improve Health",
    title: "Improve Health",
    desc: "Support immunity, metabolism and wellness",
    icon: HeartPulse,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "Family Nutrition",
    title: "Family Nutrition",
    desc: "Meet protein needs for the entire family",
    icon: Users,
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    id: "Eat More Protein",
    title: "Eat More Protein",
    desc: "Make protein a daily habit with right foods",
    icon: Utensils,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "Stay Active",
    title: "Stay Active",
    desc: "Maintain energy, fitness and active life",
    icon: Target,
    color: "text-protein-green",
    bg: "bg-protein-soft",
  },
];

const activityOptions = [
  "Sedentary (Little or no exercise)",
  "Light Active (1–3 days/week)",
  "Moderately Active (3–5 days/week)",
  "Very Active (6–7 days/week)",
];

const dietOptions = [
  "Non-Vegetarian",
  "Vegetarian",
  "Eggetarian",
  "Vegan",
];

export default function ProteinGoal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, privateInfo, saveGoalAndTarget, showToast } =
    useProteinClubAuth();

  const initialGoal =
    searchParams.get("goal") || profile?.goal || "Build Muscle";

  const [selectedGoal, setSelectedGoal] = useState(
    goalOptions.some((g) => g.id === initialGoal) ? initialGoal : "Build Muscle"
  );
  const [age, setAge] = useState(String(privateInfo?.age || 43));
  const [weightKg, setWeightKg] = useState(String(privateInfo?.weightKg || 69));
  const [heightCm, setHeightCm] = useState(String(privateInfo?.heightCm || 165));
  const [activityLevel, setActivityLevel] = useState(
    privateInfo?.activityLevel || "Moderately Active (3–5 days/week)"
  );
  const [dietPreference, setDietPreference] = useState(
    profile?.dietPreference === "Non-Veg"
      ? "Non-Vegetarian"
      : profile?.dietPreference || "Non-Vegetarian"
  );
  const [saving, setSaving] = useState(false);

  const calculation = useMemo(
    () =>
      calculateProteinNeed({
        weightKg: Number(weightKg) || 69,
        goal: selectedGoal,
        activityLevel,
      }),
    [weightKg, selectedGoal, activityLevel]
  );

  const handleContinue = async () => {
    setSaving(true);
    try {
      if (user) {
        await saveGoalAndTarget({
          goal: selectedGoal,
          dailyProteinTarget: calculation.dailyGrams,
          dietPreference,
          age: Number(age) || 30,
          weightKg: Number(weightKg) || 69,
          heightCm: Number(heightCm) || 165,
          activityLevel,
        });
        showToast(
          `Goal "${selectedGoal}" & ${calculation.dailyGrams}g/day target saved!`
        );
        navigate(
          `/protein-club/communities?goal=${encodeURIComponent(selectedGoal)}`
        );
      } else {
        sessionStorage.setItem(
          "eatprotein_pending_goal",
          JSON.stringify({
            goal: selectedGoal,
            dailyProteinTarget: calculation.dailyGrams,
            dietPreference,
          })
        );
        showToast("Goal selected! Sign in to save your target & join communities.", "info");
        navigate("/protein-club/register");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-protein-surface px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* 3-Step Onboarding Progress Header */}
        <div className="mx-auto mb-8 flex max-w-xl items-center justify-between gap-2">
          {[
            { num: 1, label: "Join / Profile", done: true },
            { num: 2, label: "Goal & Protein", active: true },
            { num: 3, label: "Explore Communities", done: false },
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center text-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ${
                    step.done || step.active
                      ? "bg-protein-green text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.done ? <CheckCircle2 size={16} /> : step.num}
                </span>
                <span
                  className={`mt-1.5 text-xs font-bold ${
                    step.active || step.done ? "text-protein-dark" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  className={`h-0.5 flex-1 ${
                    idx === 0 ? "bg-protein-green" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-protein-dark sm:text-4xl">
            What is your goal?
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 sm:text-base">
            Choose your primary goal to get a personalized daily protein recommendation and the right communities for you.
          </p>
        </div>

        {/* 6 Selectable Goal Cards */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {goalOptions.map((g) => {
            const Icon = g.icon;
            const active = selectedGoal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGoal(g.id)}
                className={`relative flex flex-col items-center rounded-2xl border p-4 text-center transition ${
                  active
                    ? "border-2 border-protein-green bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-green-300"
                }`}
              >
                {active && (
                  <CheckCircle2
                    size={18}
                    className="absolute right-2.5 top-2.5 text-protein-green"
                  />
                )}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${g.bg}`}
                >
                  <Icon size={24} className={g.color} />
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-gray-900">
                  {g.title}
                </h3>
                <p className="mt-1 text-xs leading-snug text-gray-600">
                  {g.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Integrated Protein Calculator Panel */}
        <div className="mt-7 rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left Inputs */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-protein-soft text-protein-green">
                  <Calculator size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-protein-dark sm:text-xl">
                    Protein Calculator
                  </h2>
                  <p className="text-xs text-gray-600">
                    Personalized daily protein requirement based on your profile & activity.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold outline-none focus:border-protein-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min={25}
                    max={250}
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold outline-none focus:border-protein-green"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min={90}
                    max={230}
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold outline-none focus:border-protein-green"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-protein-green"
                  >
                    {activityOptions.map((act) => (
                      <option key={act} value={act}>
                        {act}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">
                    Dietary Preference
                  </label>
                  <select
                    value={dietPreference}
                    onChange={(e) => setDietPreference(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-protein-green"
                  >
                    {dietOptions.map((diet) => (
                      <option key={diet} value={diet}>
                        {diet}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Result Preview */}
            <div className="rounded-2xl border border-green-100 bg-protein-surface p-6 lg:col-span-6">
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <img
                  src={clubImages.mealBowl}
                  alt="High protein nutrition bowl"
                  className="h-32 w-32 shrink-0 rounded-2xl object-cover shadow-sm"
                />
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-gray-700">
                    Your recommended protein requirement is
                  </p>
                  <p className="mt-1 inline-block rounded-2xl bg-protein-tint px-5 py-2 text-4xl font-extrabold tabular-nums text-protein-green">
                    {calculation.dailyGrams}g/day
                  </p>
                  <p className="mt-2 text-xs text-gray-600">
                    Tailored for <strong className="text-protein-dark">{selectedGoal}</strong> ({dietPreference})
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-green-200/70 pt-4 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <Activity size={17} className="shrink-0 text-protein-green" />
                  <div>
                    <p className="text-sm font-extrabold tabular-nums text-gray-900">
                      {calculation.gramsPerKg} g/kg
                    </p>
                    <p className="text-[11px] text-gray-500">For goal & activity</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Scale size={17} className="shrink-0 text-protein-green" />
                  <div>
                    <p className="text-sm font-extrabold tabular-nums text-gray-900">
                      {calculation.weightKg} kg
                    </p>
                    <p className="text-[11px] text-gray-500">Body weight</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={17} className="shrink-0 text-protein-green" />
                  <div>
                    <p className="text-sm font-extrabold tabular-nums text-gray-900">
                      ~{calculation.weeklyGrams} g/week
                    </p>
                    <p className="text-[11px] text-gray-500">Weekly target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleContinue}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-protein-green px-9 py-3.5 text-base font-extrabold text-white shadow-md transition hover:bg-protein-hover disabled:opacity-60"
            >
              {saving ? "Saving Your Goal..." : "Continue to Protein Club"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
