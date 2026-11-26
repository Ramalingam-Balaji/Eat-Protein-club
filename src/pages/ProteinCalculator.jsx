
// import React, { useMemo, useState } from "react";
// import {
//   Calculator,
//   UserRound,
//   Users,
//   CalendarDays,
//   ChartNoAxesColumnIncreasing,
  
//   PersonStanding,
//   Target,
//   Flame,
//   Dumbbell,
//   Utensils,
//   Salad,
//   RefreshCw,
//   CheckCircle2,
//   Circle,
//   ArrowRight,
//   Plus,
//   Info,
//   Heart,
//   Activity,
//   ClipboardList,
//   ChevronRight,
//   TrendingUp,
//   Scale,
// } from "lucide-react";

// const initialFamily = [
//   {
//     name: "You",
//     avatar: "👨🏻",
//     weight: 69,
//     protein: 110,
//     goal: "Build Muscle",
//   },
//   {
//     name: "Sri Lakshmi",
//     avatar: "👩🏻",
//     weight: 55,
//     protein: 75,
//     goal: "Hormonal Health",
//   },
//   {
//     name: "Marhavin",
//     avatar: "👦🏻",
//     weight: 36,
//     protein: 44,
//     goal: "Growth & Immunity",
//   },
// ];

// const activities = [
//   { id: "sedentary", label: "Sedentary", description: "Little to no exercise", multiplier: 0.8 },
//   { id: "light", label: "Light Active", description: "1–3 days/week", multiplier: 1.0 },
//   { id: "moderate", label: "Moderately Active", description: "3–5 days/week", multiplier: 1.2 },
//   { id: "very", label: "Very Active", description: "6–7 days/week", multiplier: 1.4 },
// ];

// const goals = [
//   {
//     id: "maintain",
//     label: "Maintain",
//     sub: "Stay healthy",
//     icon: Scale,
//     color: "text-green-600",
//     bg: "bg-green-50",
//   },
//   {
//     id: "lose",
//     label: "Lose Fat",
//     sub: "Reduce weight",
//     icon: Flame,
//     color: "text-orange-500",
//     bg: "bg-orange-50",
//   },
//   {
//     id: "muscle",
//     label: "Build Muscle",
//     sub: "Gain strength",
//     icon: Dumbbell,
//     color: "text-green-600",
//     bg: "bg-green-50",
//   },
// ];

// function Card({ children, className = "" }) {
//   return (
//     <div
//       className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function SectionHeading({ icon: Icon, title, right, className = "" }) {
//   return (
//     <div className={`mb-4 flex flex-wrap items-center justify-between gap-2 ${className}`}>
//       <div className="flex min-w-0 items-center gap-2.5">
//         <Icon size={27} className="shrink-0 text-green-600" />
//         <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
//           {title}
//         </h2>
//       </div>
//       {right}
//     </div>
//   );
// }

// function ProteinCalculator() {
//   const [gender, setGender] = useState("male");
//   const [age, setAge] = useState("43");
//   const [heightCm, setHeightCm] = useState("160");
//   const [weight, setWeight] = useState("69");
//   const [heightUnit, setHeightUnit] = useState("ft");
//   const [weightUnit, setWeightUnit] = useState("kg");
//   const [goal, setGoal] = useState("muscle");
//   const [activity, setActivity] = useState("moderate");
//   const [activeTab, setActiveTab] = useState("personal");
//   const [family, setFamily] = useState(initialFamily);
//   const [showAddMember, setShowAddMember] = useState(false);
//   const [newMemberName, setNewMemberName] = useState("");
//   const [newMemberAge, setNewMemberAge] = useState("");
//   const [newMemberWeight, setNewMemberWeight] = useState("");
//   const [newMemberGender, setNewMemberGender] = useState("male");

//   const height = Number(heightCm) || 0;
//   const weightKg =
//     weightUnit === "kg" ? Number(weight) || 0 : (Number(weight) || 0) / 2.20462;

//   const selectedActivity = activities.find((a) => a.id === activity);
//   const selectedGoal = goals.find((g) => g.id === goal);

//   const results = useMemo(() => {
//     const safeHeight = height > 0 ? height : 160;
//     const safeWeight = weightKg > 0 ? weightKg : 1;
//     const heightMeters = safeHeight / 100;

//     const bmi = safeWeight / (heightMeters * heightMeters);

//     const goalFactor =
//       goal === "muscle" ? 1.6 : goal === "lose" ? 1.4 : 1.0;

//     const activityFactor = selectedActivity?.multiplier || 1;

//     const proteinFactor =
//       goal === "muscle"
//         ? 1.6 * activityFactor
//         : goal === "lose"
//         ? 1.4 * activityFactor
//         : 1.0 * activityFactor;

//     const dailyProtein = Math.round(safeWeight * proteinFactor);

//     const healthyMin = Math.round(18.5 * heightMeters * heightMeters);
//     const healthyMax = Math.round(24.9 * heightMeters * heightMeters);

//     let bmiStatus = "Healthy";
//     if (bmi < 18.5) bmiStatus = "Underweight";
//     else if (bmi < 25) bmiStatus = "Healthy";
//     else if (bmi < 30) bmiStatus = "Overweight";
//     else bmiStatus = "Obesity";

//     return {
//       bmi: bmi.toFixed(1),
//       bmiStatus,
//       dailyProtein,
//       healthyMin,
//       healthyMax,
//       proteinFactor,
//       heightMeters,
//     };
//   }, [height, weightKg, goal, selectedActivity]);

//   const proteinRecommendation =
//     goal === "muscle"
//       ? [
//           `Target ${results.dailyProtein} g of protein per day.`,
//           "Combine high-protein foods in every meal (25–30 g per meal).",
//           "Follow strength training 3–5 days a week for better results.",
//         ]
//       : goal === "lose"
//       ? [
//           `Aim for ${results.dailyProtein} g of protein daily.`,
//           "Include protein-rich foods to support fullness and muscle retention.",
//           "Combine balanced meals with regular movement and exercise.",
//         ]
//       : [
//           `Target approximately ${results.dailyProtein} g of protein per day.`,
//           "Include varied protein sources in your meals.",
//           "Maintain a balanced diet and a regular activity routine.",
//         ];

//   const tabs = [
//     { id: "personal", label: "My Protein & BMI", icon: UserRound },
//     { id: "family", label: "Family Calculator", icon: Users },
//     { id: "plan", label: "My Protein Plan", icon: CalendarDays },
//     { id: "progress", label: "Track Progress", icon: ChartNoAxesColumnIncreasing },
//   ];

//   const heightFeet = Math.floor(height / 30.48);
//   const heightInches = Math.round((height / 2.54) % 12);

//   const changeHeight = (value) => {
//     setHeightCm(value);
//   };

//   const handleRecalculate = () => {
//     setActiveTab("personal");
//   };

//   const addFamilyMember = () => {
//     if (!newMemberName.trim() || !newMemberAge || !newMemberWeight) return;

//     const memberWeight =
//       weightUnit === "kg"
//         ? Number(newMemberWeight)
//         : Number(newMemberWeight) / 2.20462;

//     const memberProtein = Math.round(memberWeight * 1.2);

//     setFamily((prev) => [
//       ...prev,
//       {
//         name: newMemberName.trim(),
//         avatar: newMemberGender === "male" ? "👨🏻" : "👩🏻",
//         weight: Number(newMemberWeight),
//         protein: memberProtein,
//         goal: "Personal Goal",
//       },
//     ]);

//     setNewMemberName("");
//     setNewMemberAge("");
//     setNewMemberWeight("");
//     setShowAddMember(false);
//   };

//   return (
//     <main className="min-h-screen bg-white pb-8">
//       {/* HERO BANNER */}
//       <section className="overflow-hidden bg-gradient-to-r from-[#F1FAF0] via-white to-[#EAF7E8]">
//         <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-8">
//           {/* Hero text */}
//           <div>
//             <div className="flex items-start gap-3 sm:gap-5">
//               <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md sm:h-20 sm:w-20">
//                 <Calculator size={42} className="sm:size-12" />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="text-3xl font-black leading-tight tracking-tight text-[#103B27] sm:text-4xl lg:text-5xl">
//                   Protein Calculator
//                 </h1>
//                 <p className="mt-1 text-base leading-snug text-gray-800 sm:text-lg lg:text-xl">
//                   Know Your Daily Protein, BMI & Personalized Protein Plan
//                 </p>
//               </div>
//             </div>

//             {/* Hero feature list */}
//             <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200">
//               {[
//                 { icon: Target, label: "Set Your Goal", sub: "(Fit, Lose Fat, Gain Muscle)", color: "text-orange-500" },
//                 { icon: Utensils, label: "Get Daily Protein Need", sub: "", color: "text-green-600" },
//                 { icon: Salad, label: "Find Right Protein Packs", sub: "", color: "text-green-600" },
//               ].map((feature) => {
//                 const Icon = feature.icon;
//                 return (
//                   <div
//                     key={feature.label}
//                     className="flex items-center justify-center gap-1.5 px-2 py-2 text-center sm:gap-3"
//                   >
//                     <Icon size={25} className={`shrink-0 ${feature.color} sm:size-8`} />
//                     <div className="min-w-0">
//                       <p className="text-[10px] font-extrabold leading-tight text-gray-900 sm:text-sm">
//                         {feature.label}
//                       </p>
//                       {feature.sub && (
//                         <p className="mt-0.5 text-[9px] leading-tight text-gray-700 sm:text-xs">
//                           {feature.sub}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Hero illustration */}
//           <div className="hidden min-h-[220px] items-center justify-center md:flex">
//             <div className="relative flex h-full min-h-[230px] w-full items-center justify-center overflow-hidden rounded-3xl bg-green-100/50">
//               <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[50%] bg-green-200/70" />
//               <div className="relative flex items-center gap-2 text-7xl lg:gap-5 lg:text-8xl">
//                 <span>💪</span>
//                 <span>👨‍👩‍👦</span>
//                 <span>🥗</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* TABS */}
//       <div className="sticky top-0 z-20 mx-auto max-w-[1440px] px-3 pt-3 sm:px-5 lg:px-8">
//         <div className="grid grid-cols-2 gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-md sm:grid-cols-4">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-bold transition sm:gap-2 sm:text-sm ${
//                   isActive
//                     ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm"
//                     : "text-gray-800 hover:bg-green-50"
//                 }`}
//               >
//                 <Icon size={18} className="shrink-0 sm:size-5" />
//                 <span className="leading-tight">{tab.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* PERSONAL CALCULATOR */}
//       {activeTab === "personal" && (
//         <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
//           <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[0.78fr_1.42fr]">
//             {/* LEFT FORM */}
//             <div className="flex min-w-0 flex-col gap-3">
//               <Card className="p-3 sm:p-4 lg:p-5">
//                 {/* Details */}
//                 <SectionHeading
//                   icon={UserRound}
//                   title="Your Details"
//                 />

//                 {/* Gender */}
//                 <div className="grid grid-cols-3 gap-2">
//                   {[
//                     { id: "male", label: "Male", icon: Mars, color: "text-green-600" },
//                     { id: "female", label: "Female", icon: Venus, color: "text-orange-500" },
//                     { id: "other", label: "Other", icon: UserRound, color: "text-gray-600" },
//                   ].map((item) => {
//                     const Icon = item.icon;
//                     const active = gender === item.id;

//                     return (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => setGender(item.id)}
//                         className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-2.5 text-xs font-bold transition sm:text-sm ${
//                           active
//                             ? "border-green-700 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm"
//                             : "border-gray-200 bg-white text-gray-800 hover:border-green-400 hover:bg-green-50"
//                         }`}
//                       >
//                         <Icon size={19} className={active ? "text-white" : item.color} />
//                         {item.label}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Inputs */}
//                 <div className="mt-4 grid grid-cols-3 gap-2">
//                   <div className="min-w-0">
//                     <label className="mb-1.5 block text-xs font-bold text-gray-800">
//                       Age
//                     </label>
//                     <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
//                       <input
//                         type="number"
//                         min="5"
//                         max="100"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
//                       />
//                       <span className="text-[10px] text-gray-500">Years</span>
//                     </div>
//                   </div>

//                   <div className="min-w-0">
//                     <label className="mb-1.5 block text-xs font-bold text-gray-800">
//                       Height
//                     </label>
//                     <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
//                       {heightUnit === "ft" ? (
//                         <span className="w-full py-3 text-sm font-medium">
//                           {heightFeet} ft {heightInches} in
//                         </span>
//                       ) : (
//                         <input
//                           type="number"
//                           min="80"
//                           max="250"
//                           value={heightCm}
//                           onChange={(e) => changeHeight(e.target.value)}
//                           className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
//                         />
//                       )}
//                       <select
//                         value={heightUnit}
//                         onChange={(e) => setHeightUnit(e.target.value)}
//                         className="shrink-0 bg-transparent text-[10px] font-semibold outline-none"
//                       >
//                         <option value="ft">ft</option>
//                         <option value="cm">cm</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="min-w-0">
//                     <label className="mb-1.5 block text-xs font-bold text-gray-800">
//                       Weight
//                     </label>
//                     <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
//                       <input
//                         type="number"
//                         min="10"
//                         max="300"
//                         value={weight}
//                         onChange={(e) => setWeight(e.target.value)}
//                         className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
//                       />
//                       <select
//                         value={weightUnit}
//                         onChange={(e) => setWeightUnit(e.target.value)}
//                         className="shrink-0 bg-transparent text-[10px] font-semibold outline-none"
//                       >
//                         <option value="kg">kg</option>
//                         <option value="lb">lb</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Goal */}
//                 <div className="mt-5 border-t border-gray-100 pt-4">
//                   <SectionHeading icon={Target} title="Your Goal" />

//                   <div className="grid grid-cols-3 gap-2">
//                     {goals.map((item) => {
//                       const Icon = item.icon;
//                       const active = goal === item.id;

//                       return (
//                         <button
//                           key={item.id}
//                           type="button"
//                           onClick={() => setGoal(item.id)}
//                           className={`relative flex min-w-0 flex-col items-center justify-center rounded-2xl border px-1 py-3 text-center transition ${
//                             active
//                               ? "border-green-500 bg-green-50 shadow-sm"
//                               : "border-gray-200 bg-white hover:border-green-300"
//                           }`}
//                         >
//                           {active && (
//                             <CheckCircle2
//                               size={18}
//                               className="absolute right-1 top-1 fill-green-600 text-white"
//                             />
//                           )}
//                           <Icon size={30} className={`mb-1 ${item.color}`} />
//                           <p className="text-xs font-extrabold text-gray-900 sm:text-sm">
//                             {item.label}
//                           </p>
//                           <p className="text-[10px] leading-tight text-gray-600 sm:text-xs">
//                             ({item.sub})
//                           </p>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Activity */}
//                 <div className="mt-5 border-t border-gray-100 pt-4">
//                   <SectionHeading
//                     icon={Activity}
//                     title="Activity Level"
//                     right={
//                       <Info
//                         size={17}
//                         className="text-gray-500"
//                         title="Select your typical weekly activity level"
//                       />
//                     }
//                   />

//                   <div className="space-y-1.5">
//                     {activities.map((item) => {
//                       const active = activity === item.id;

//                       return (
//                         <button
//                           key={item.id}
//                           type="button"
//                           onClick={() => setActivity(item.id)}
//                           className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
//                             active
//                               ? "border-green-500 bg-green-50"
//                               : "border-gray-200 bg-white hover:bg-gray-50"
//                           }`}
//                         >
//                           <div
//                             className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
//                               active
//                                 ? "border-green-600 bg-green-600"
//                                 : "border-gray-400 bg-white"
//                             }`}
//                           >
//                             {active && <Circle size={10} className="fill-white text-white" />}
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-extrabold leading-tight text-gray-900">
//                               {item.label}
//                             </p>
//                             <p className="text-xs text-gray-600">
//                               ({item.description})
//                             </p>
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* RIGHT RESULTS */}
//             <div className="flex min-w-0 flex-col gap-3">
//               <Card className="p-3 sm:p-4 lg:p-5">
//                 {/* Results header */}
//                 <SectionHeading
//                   icon={ChartNoAxesColumnIncreasing}
//                   title="Your Results"
//                   right={
//                     <button
//                       type="button"
//                       onClick={handleRecalculate}
//                       className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-800 transition hover:bg-green-100 sm:text-sm"
//                     >
//                       <RefreshCw size={15} />
//                       Recalculate
//                     </button>
//                   }
//                 />

//                 {/* Stats cards */}
//                 <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
//                   {/* Protein */}
//                   <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-[#F0F9EC] p-3 text-center sm:p-4">
//                     <div className="mb-1 flex items-center justify-center gap-2">
//                       <Salad size={30} className="text-green-600" />
//                       <p className="text-sm font-extrabold leading-tight text-gray-900">
//                         Your Daily
//                         <br />
//                         Protein Need
//                       </p>
//                     </div>
//                     <p className="mt-2 text-3xl font-black text-[#103B27] sm:text-4xl">
//                       {results.dailyProtein} g
//                       <span className="text-lg"> / day</span>
//                     </p>
//                   </div>

//                   {/* BMI */}
//                   <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-3 text-center sm:p-4">
//                     <div className="mb-1 flex items-center justify-center gap-2">
//                       <div className="rounded-xl bg-orange-100 p-1.5">
//                         <Activity size={23} className="text-orange-500" />
//                       </div>
//                       <p className="text-sm font-extrabold text-gray-900">Your BMI</p>
//                     </div>
//                     <p className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
//                       {results.bmi}
//                     </p>
//                     <span
//                       className={`mx-auto mt-1 rounded-full px-3 py-1 text-xs font-extrabold ${
//                         results.bmiStatus === "Healthy"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-orange-200 text-orange-800"
//                       }`}
//                     >
//                       {results.bmiStatus}
//                     </span>
//                   </div>

//                   {/* Healthy weight */}
//                   <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-gray-50 p-3 text-center sm:p-4">
//                     <div className="mb-1 flex items-center justify-center gap-2">
//                       <Scale size={25} className="text-green-600" />
//                       <p className="text-sm font-extrabold leading-tight text-gray-900">
//                         Healthy Weight Range
//                       </p>
//                     </div>
//                     <p className="mt-2 text-2xl font-black text-[#103B27] sm:text-3xl">
//                       {results.healthyMin} – {results.healthyMax}
//                       <span className="text-base"> kg</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Recommendation */}
//                 <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#EFF9EC] to-[#E4F4DF] p-3 sm:p-4">
//                   <div className="flex items-center gap-2">
//                     <Target size={31} className="shrink-0 text-green-600" />
//                     <h3 className="text-lg font-extrabold text-gray-900 sm:text-xl">
//                       Your Personalized Recommendation
//                     </h3>
//                   </div>

//                   <div className="mt-3 flex items-end gap-3">
//                     <div className="min-w-0 flex-1 space-y-2">
//                       {proteinRecommendation.map((recommendation, index) => (
//                         <div key={index} className="flex items-start gap-2">
//                           <CheckCircle2
//                             size={18}
//                             className="mt-0.5 shrink-0 fill-green-600 text-white"
//                           />
//                           <p className="text-xs leading-relaxed text-gray-900 sm:text-sm">
//                             {recommendation}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="hidden text-6xl sm:block">🍱</div>
//                   </div>
//                 </div>

//                 {/* Family Profiles */}
//                 <div className="mt-5 border-t border-gray-100 pt-4">
//                   <SectionHeading
//                     icon={Users}
//                     title="Family Profiles"
//                     right={
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab("family")}
//                         className="inline-flex items-center gap-1 text-xs font-bold text-green-800 hover:text-green-950 sm:text-sm"
//                       >
//                         Manage Family <ArrowRight size={15} />
//                       </button>
//                     }
//                   />

//                   <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//                     {family.map((member, index) => (
//                       <div
//                         key={`${member.name}-${index}`}
//                         className="flex min-w-0 flex-col items-center rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-green-50 p-3 text-center"
//                       >
//                         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
//                           {member.avatar}
//                         </div>
//                         <p className="mt-2 truncate text-xs font-extrabold text-gray-900 sm:text-sm">
//                           {member.name}
//                         </p>
//                         <p className="mt-1 text-lg font-black text-green-800">
//                           {member.protein} <span className="text-xs">g/day</span>
//                         </p>
//                         <p className="text-[10px] text-gray-700 sm:text-xs">
//                           {member.goal}
//                         </p>
//                       </div>
//                     ))}

//                     <button
//                       type="button"
//                       onClick={() => setShowAddMember(true)}
//                       className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3 text-center transition hover:border-green-500 hover:bg-green-50"
//                     >
//                       <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
//                         <Plus size={24} className="text-green-700" />
//                       </div>
//                       <p className="mt-2 text-xs font-extrabold text-green-800">
//                         Add Member
//                       </p>
//                     </button>
//                   </div>
//                 </div>
//               </Card>

//               {/* Protein Plan CTA */}
//               <div className="overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-[#E8F6E4] via-[#F5FBF3] to-[#E7F4E5]">
//                 <div className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-5">
//                   <div className="flex items-center justify-center gap-2 text-5xl sm:text-6xl">
//                     <span>🥗</span>
//                     <span>🥚</span>
//                     <span>🥤</span>
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-black leading-tight text-gray-900 sm:text-2xl">
//                       Get Your Personalized Protein Plan
//                     </h2>
//                     <p className="mt-1 text-sm leading-relaxed text-gray-800">
//                       Meal plan, protein-rich foods & recommended protein packs for you and your family.
//                     </p>
//                     <button
//                       type="button"
//                       onClick={() => setActiveTab("plan")}
//                       className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
//                     >
//                       Get My Protein Plan
//                       <ArrowRight size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* FAMILY CALCULATOR */}
//       {activeTab === "family" && (
//         <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
//           <Card className="p-4 sm:p-6">
//             <SectionHeading
//               icon={Users}
//               title="Family Protein Calculator"
//               right={
//                 <button
//                   type="button"
//                   onClick={() => setShowAddMember(true)}
//                   className="inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800"
//                 >
//                   <Plus size={16} /> Add Member
//                 </button>
//               }
//             />
//             <p className="mb-4 text-sm text-gray-700">
//               Manage your family members and view their daily protein needs.
//             </p>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {family.map((member, index) => (
//                 <div
//                   key={`${member.name}-${index}`}
//                   className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-green-50 p-5"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
//                       {member.avatar}
//                     </div>
//                     <div>
//                       <p className="font-extrabold text-gray-900">{member.name}</p>
//                       <p className="text-xs text-gray-600">{member.goal}</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 rounded-xl bg-green-100 p-3">
//                     <p className="text-xs text-gray-700">Daily protein target</p>
//                     <p className="text-2xl font-black text-green-800">
//                       {member.protein} g/day
//                     </p>
//                   </div>
//                   <p className="mt-2 text-sm text-gray-700">
//                     Weight: {member.weight} {weightUnit}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </section>
//       )}

//       {/* MY PROTEIN PLAN */}
//       {activeTab === "plan" && (
//         <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
//           <Card className="p-4 sm:p-6">
//             <SectionHeading icon={CalendarDays} title="My Personalized Protein Plan" />
//             <div className="mb-4 rounded-2xl bg-green-50 p-4">
//               <p className="text-sm text-gray-700">Your daily protein target</p>
//               <p className="text-3xl font-black text-green-800">
//                 {results.dailyProtein} g / day
//               </p>
//               <p className="mt-1 text-sm text-gray-700">
//                 Based on your body weight, goal and activity level.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//               {[
//                 { meal: "Breakfast", food: "Eggs, paneer, Greek yogurt", protein: "25–30g", icon: "🍳" },
//                 { meal: "Lunch", food: "Dal, tofu, chicken, rice", protein: "30–35g", icon: "🍛" },
//                 { meal: "Snack", food: "Milk, nuts, protein shake", protein: "10–15g", icon: "🥤" },
//                 { meal: "Dinner", food: "Paneer, legumes, vegetables", protein: "25–30g", icon: "🥗" },
//               ].map((item) => (
//                 <div
//                   key={item.meal}
//                   className="rounded-2xl border border-gray-200 p-4"
//                 >
//                   <div className="text-4xl">{item.icon}</div>
//                   <h3 className="mt-2 font-extrabold text-gray-900">{item.meal}</h3>
//                   <p className="mt-1 text-sm text-gray-700">{item.food}</p>
//                   <p className="mt-2 font-extrabold text-green-700">
//                     {item.protein} protein
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-gray-700">
//               This is a general meal-plan example. Individual protein requirements can vary based on age, health, pregnancy, and other factors.
//             </p>
//           </Card>
//         </section>
//       )}

//       {/* TRACK PROGRESS */}
//       {activeTab === "progress" && (
//         <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
//           <Card className="p-4 sm:p-6">
//             <SectionHeading
//               icon={ChartNoAxesColumnIncreasing}
//               title="Track Your Progress"
//             />
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//               {[
//                 { label: "Daily Protein Target", value: `${results.dailyProtein} g`, icon: Salad },
//                 { label: "Current Weight", value: `${weight} ${weightUnit}`, icon: Scale },
//                 { label: "Current BMI", value: results.bmi, icon: Activity },
//               ].map((stat) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div
//                     key={stat.label}
//                     className="rounded-2xl bg-green-50 p-4"
//                   >
//                     <Icon size={25} className="text-green-600" />
//                     <p className="mt-2 text-sm text-gray-700">{stat.label}</p>
//                     <p className="text-2xl font-black text-green-800">{stat.value}</p>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
//               <TrendingUp size={42} className="mx-auto text-green-600" />
//               <h3 className="mt-3 text-lg font-extrabold text-gray-900">
//                 Your progress tracking starts here
//               </h3>
//               <p className="mt-1 text-sm text-gray-700">
//                 Your weight history, protein intake and goal progress charts can be connected here when tracking data is available.
//               </p>
//             </div>
//           </Card>
//         </section>
//       )}

//       {/* ADD FAMILY MEMBER MODAL */}
//       {showAddMember && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-5">
//           <div className="w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-extrabold text-gray-900">
//                 Add Family Member
//               </h2>
//               <button
//                 type="button"
//                 onClick={() => setShowAddMember(false)}
//                 className="rounded-full px-3 py-1 text-gray-500 hover:bg-gray-100"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-3">
//               <div>
//                 <label className="mb-1 block text-sm font-bold text-gray-800">
//                   Name
//                 </label>
//                 <input
//                   value={newMemberName}
//                   onChange={(e) => setNewMemberName(e.target.value)}
//                   placeholder="Enter member name"
//                   className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-bold text-gray-800">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     value={newMemberAge}
//                     onChange={(e) => setNewMemberAge(e.target.value)}
//                     placeholder="Age"
//                     className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-sm font-bold text-gray-800">
//                     Weight ({weightUnit})
//                   </label>
//                   <input
//                     type="number"
//                     value={newMemberWeight}
//                     onChange={(e) => setNewMemberWeight(e.target.value)}
//                     placeholder="Weight"
//                     className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-bold text-gray-800">
//                   Gender
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {[
//                     { value: "male", label: "Male" },
//                     { value: "female", label: "Female" },
//                   ].map((item) => (
//                     <button
//                       key={item.value}
//                       type="button"
//                       onClick={() => setNewMemberGender(item.value)}
//                       className={`rounded-xl border px-3 py-2.5 text-sm font-bold ${
//                         newMemberGender === item.value
//                           ? "border-green-600 bg-green-50 text-green-800"
//                           : "border-gray-200 text-gray-700"
//                       }`}
//                     >
//                       {item.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={addFamilyMember}
//                 className="mt-2 w-full rounded-full bg-green-700 py-3 text-sm font-extrabold text-white transition hover:bg-green-800"
//               >
//                 Add to Family
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// export default ProteinCalculator;



import React, { useMemo, useState } from "react";
import {
  Calculator,
  UserRound,
  Users,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  PersonStanding,
  Target,
  Flame,
  Dumbbell,
  Utensils,
  Salad,
  RefreshCw,
  CheckCircle2,
  Circle,
  ArrowRight,
  Plus,
  Info,
  Heart,
  Activity,
  ClipboardList,
  ChevronRight,
  TrendingUp,
  Scale,
} from "lucide-react";

const initialFamily = [
  {
    name: "You",
    avatar: "👨🏻",
    weight: 69,
    protein: 110,
    goal: "Build Muscle",
  },
  {
    name: "Sri Lakshmi",
    avatar: "👩🏻",
    weight: 55,
    protein: 75,
    goal: "Hormonal Health",
  },
  {
    name: "Marhavin",
    avatar: "👦🏻",
    weight: 36,
    protein: 44,
    goal: "Growth & Immunity",
  },
];

const activities = [
  { id: "sedentary", label: "Sedentary", description: "Little to no exercise", multiplier: 0.8 },
  { id: "light", label: "Light Active", description: "1–3 days/week", multiplier: 1.0 },
  { id: "moderate", label: "Moderately Active", description: "3–5 days/week", multiplier: 1.2 },
  { id: "very", label: "Very Active", description: "6–7 days/week", multiplier: 1.4 },
];

const goals = [
  {
    id: "maintain",
    label: "Maintain",
    sub: "Stay healthy",
    icon: Scale,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "lose",
    label: "Lose Fat",
    sub: "Reduce weight",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "muscle",
    label: "Build Muscle",
    sub: "Gain strength",
    icon: Dumbbell,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

// Gender symbols use inline React components instead of unsupported Lucide exports.
function MaleSymbol({ size = 19, className = "" }) {
  return <span className={`inline-flex items-center justify-center font-bold leading-none ${className}`} style={{ fontSize: size }}>♂</span>;
}


function FemaleSymbol({ size = 19, className = "" }) {
  return <span className={`inline-flex items-center justify-center font-bold leading-none ${className}`} style={{ fontSize: size }}>♀</span>;
}


function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ icon: Icon, title, right, className = "" }) {
  return (
    <div className={`mb-4 flex flex-wrap items-center justify-between gap-2 ${className}`}>
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon size={27} className="shrink-0 text-green-600" />
        <h2 className="text-lg font-extrabold text-gray-900 sm:text-xl">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

function ProteinCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("43");
  const [heightCm, setHeightCm] = useState("160");
  const [weight, setWeight] = useState("69");
  const [heightUnit, setHeightUnit] = useState("ft");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [goal, setGoal] = useState("muscle");
  const [activity, setActivity] = useState("moderate");
  const [activeTab, setActiveTab] = useState("personal");
  const [family, setFamily] = useState(initialFamily);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberAge, setNewMemberAge] = useState("");
  const [newMemberWeight, setNewMemberWeight] = useState("");
  const [newMemberGender, setNewMemberGender] = useState("male");

  const height = Number(heightCm) || 0;
  const weightKg =
    weightUnit === "kg" ? Number(weight) || 0 : (Number(weight) || 0) / 2.20462;

  const selectedActivity = activities.find((a) => a.id === activity);
  const selectedGoal = goals.find((g) => g.id === goal);

  const results = useMemo(() => {
    const safeHeight = height > 0 ? height : 160;
    const safeWeight = weightKg > 0 ? weightKg : 1;
    const heightMeters = safeHeight / 100;

    const bmi = safeWeight / (heightMeters * heightMeters);

    const goalFactor =
      goal === "muscle" ? 1.6 : goal === "lose" ? 1.4 : 1.0;

    const activityFactor = selectedActivity?.multiplier || 1;

    const proteinFactor =
      goal === "muscle"
        ? 1.6 * activityFactor
        : goal === "lose"
        ? 1.4 * activityFactor
        : 1.0 * activityFactor;

    const dailyProtein = Math.round(safeWeight * proteinFactor);

    const healthyMin = Math.round(18.5 * heightMeters * heightMeters);
    const healthyMax = Math.round(24.9 * heightMeters * heightMeters);

    let bmiStatus = "Healthy";
    if (bmi < 18.5) bmiStatus = "Underweight";
    else if (bmi < 25) bmiStatus = "Healthy";
    else if (bmi < 30) bmiStatus = "Overweight";
    else bmiStatus = "Obesity";

    return {
      bmi: bmi.toFixed(1),
      bmiStatus,
      dailyProtein,
      healthyMin,
      healthyMax,
      proteinFactor,
      heightMeters,
    };
  }, [height, weightKg, goal, selectedActivity]);

  const proteinRecommendation =
    goal === "muscle"
      ? [
          `Target ${results.dailyProtein} g of protein per day.`,
          "Combine high-protein foods in every meal (25–30 g per meal).",
          "Follow strength training 3–5 days a week for better results.",
        ]
      : goal === "lose"
      ? [
          `Aim for ${results.dailyProtein} g of protein daily.`,
          "Include protein-rich foods to support fullness and muscle retention.",
          "Combine balanced meals with regular movement and exercise.",
        ]
      : [
          `Target approximately ${results.dailyProtein} g of protein per day.`,
          "Include varied protein sources in your meals.",
          "Maintain a balanced diet and a regular activity routine.",
        ];

  const tabs = [
    { id: "personal", label: "My Protein & BMI", icon: UserRound },
    { id: "family", label: "Family Calculator", icon: Users },
    { id: "plan", label: "My Protein Plan", icon: CalendarDays },
    { id: "progress", label: "Track Progress", icon: ChartNoAxesColumnIncreasing },
  ];

  const heightFeet = Math.floor(height / 30.48);
  const heightInches = Math.round((height / 2.54) % 12);

  const changeHeight = (value) => {
    setHeightCm(value);
  };

  const handleRecalculate = () => {
    setActiveTab("personal");
  };

  const addFamilyMember = () => {
    if (!newMemberName.trim() || !newMemberAge || !newMemberWeight) return;

    const memberWeight =
      weightUnit === "kg"
        ? Number(newMemberWeight)
        : Number(newMemberWeight) / 2.20462;

    const memberProtein = Math.round(memberWeight * 1.2);

    setFamily((prev) => [
      ...prev,
      {
        name: newMemberName.trim(),
        avatar: newMemberGender === "male" ? "👨🏻" : "👩🏻",
        weight: Number(newMemberWeight),
        protein: memberProtein,
        goal: "Personal Goal",
      },
    ]);

    setNewMemberName("");
    setNewMemberAge("");
    setNewMemberWeight("");
    setShowAddMember(false);
  };

  return (
    <main className="min-h-screen bg-white pb-8">
      {/* HERO BANNER */}
      <section className="overflow-hidden bg-gradient-to-r from-[#F1FAF0] via-white to-[#EAF7E8]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-8">
          {/* Hero text */}
          <div>
            <div className="flex items-start gap-3 sm:gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md sm:h-20 sm:w-20">
                <Calculator size={42} className="sm:size-12" />
              </div>

              <div className="min-w-0">
                <h1 className="text-3xl font-black leading-tight tracking-tight text-[#103B27] sm:text-4xl lg:text-5xl">
                  Protein Calculator
                </h1>
                <p className="mt-1 text-base leading-snug text-gray-800 sm:text-lg lg:text-xl">
                  Know Your Daily Protein, BMI & Personalized Protein Plan
                </p>
              </div>
            </div>

            {/* Hero feature list */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200">
              {[
                { icon: Target, label: "Set Your Goal", sub: "(Fit, Lose Fat, Gain Muscle)", color: "text-orange-500" },
                { icon: Utensils, label: "Get Daily Protein Need", sub: "", color: "text-green-600" },
                { icon: Salad, label: "Find Right Protein Packs", sub: "", color: "text-green-600" },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center justify-center gap-1.5 px-2 py-2 text-center sm:gap-3"
                  >
                    <Icon size={25} className={`shrink-0 ${feature.color} sm:size-8`} />
                    <div className="min-w-0">
                      <p className="text-[10px] font-extrabold leading-tight text-gray-900 sm:text-sm">
                        {feature.label}
                      </p>
                      {feature.sub && (
                        <p className="mt-0.5 text-[9px] leading-tight text-gray-700 sm:text-xs">
                          {feature.sub}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero illustration */}
          <div className="hidden min-h-[220px] items-center justify-center md:flex">
            <div className="relative flex h-full min-h-[230px] w-full items-center justify-center overflow-hidden rounded-3xl bg-green-100/50">
              <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-[50%] bg-green-200/70" />
              <div className="relative flex items-center gap-2 text-7xl lg:gap-5 lg:text-8xl">
                <span>💪</span>
                <span>👨‍👩‍👦</span>
                <span>🥗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-0 z-20 mx-auto max-w-[1440px] px-3 pt-3 sm:px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-md sm:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-bold transition sm:gap-2 sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm"
                    : "text-gray-800 hover:bg-green-50"
                }`}
              >
                <Icon size={18} className="shrink-0 sm:size-5" />
                <span className="leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PERSONAL CALCULATOR */}
      {activeTab === "personal" && (
        <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[0.78fr_1.42fr]">
            {/* LEFT FORM */}
            <div className="flex min-w-0 flex-col gap-3">
              <Card className="p-3 sm:p-4 lg:p-5">
                {/* Details */}
                <SectionHeading
                  icon={UserRound}
                  title="Your Details"
                />

                {/* Gender */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "male", label: "Male", icon: MaleSymbol, color: "text-green-600" },
                    { id: "female", label: "Female", icon: FemaleSymbol, color: "text-orange-500" },
                    { id: "other", label: "Other", icon: UserRound, color: "text-gray-600" },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = gender === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGender(item.id)}
                        className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-2.5 text-xs font-bold transition sm:text-sm ${
                          active
                            ? "border-green-700 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-800 hover:border-green-400 hover:bg-green-50"
                        }`}
                      >
                        <Icon size={19} className={active ? "text-white" : item.color} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Inputs */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-bold text-gray-800">
                      Age
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
                      />
                      <span className="text-[10px] text-gray-500">Years</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-bold text-gray-800">
                      Height
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
                      {heightUnit === "ft" ? (
                        <span className="w-full py-3 text-sm font-medium">
                          {heightFeet} ft {heightInches} in
                        </span>
                      ) : (
                        <input
                          type="number"
                          min="80"
                          max="250"
                          value={heightCm}
                          onChange={(e) => changeHeight(e.target.value)}
                          className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
                        />
                      )}
                      <select
                        value={heightUnit}
                        onChange={(e) => setHeightUnit(e.target.value)}
                        className="shrink-0 bg-transparent text-[10px] font-semibold outline-none"
                      >
                        <option value="ft">ft</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-1.5 block text-xs font-bold text-gray-800">
                      Weight
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-2 focus-within:border-green-500">
                      <input
                        type="number"
                        min="10"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full min-w-0 bg-transparent py-3 text-sm outline-none"
                      />
                      <select
                        value={weightUnit}
                        onChange={(e) => setWeightUnit(e.target.value)}
                        className="shrink-0 bg-transparent text-[10px] font-semibold outline-none"
                      >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Goal */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <SectionHeading icon={Target} title="Your Goal" />

                  <div className="grid grid-cols-3 gap-2">
                    {goals.map((item) => {
                      const Icon = item.icon;
                      const active = goal === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setGoal(item.id)}
                          className={`relative flex min-w-0 flex-col items-center justify-center rounded-2xl border px-1 py-3 text-center transition ${
                            active
                              ? "border-green-500 bg-green-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-green-300"
                          }`}
                        >
                          {active && (
                            <CheckCircle2
                              size={18}
                              className="absolute right-1 top-1 fill-green-600 text-white"
                            />
                          )}
                          <Icon size={30} className={`mb-1 ${item.color}`} />
                          <p className="text-xs font-extrabold text-gray-900 sm:text-sm">
                            {item.label}
                          </p>
                          <p className="text-[10px] leading-tight text-gray-600 sm:text-xs">
                            ({item.sub})
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Activity */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <SectionHeading
                    icon={Activity}
                    title="Activity Level"
                    right={
                      <Info
                        size={17}
                        className="text-gray-500"
                        title="Select your typical weekly activity level"
                      />
                    }
                  />

                  <div className="space-y-1.5">
                    {activities.map((item) => {
                      const active = activity === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActivity(item.id)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                              active
                                ? "border-green-600 bg-green-600"
                                : "border-gray-400 bg-white"
                            }`}
                          >
                            {active && <Circle size={10} className="fill-white text-white" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-extrabold leading-tight text-gray-900">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-600">
                              ({item.description})
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* RIGHT RESULTS */}
            <div className="flex min-w-0 flex-col gap-3">
              <Card className="p-3 sm:p-4 lg:p-5">
                {/* Results header */}
                <SectionHeading
                  icon={ChartNoAxesColumnIncreasing}
                  title="Your Results"
                  right={
                    <button
                      type="button"
                      onClick={handleRecalculate}
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-bold text-green-800 transition hover:bg-green-100 sm:text-sm"
                    >
                      <RefreshCw size={15} />
                      Recalculate
                    </button>
                  }
                />

                {/* Stats cards */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {/* Protein */}
                  <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-[#F0F9EC] p-3 text-center sm:p-4">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <Salad size={30} className="text-green-600" />
                      <p className="text-sm font-extrabold leading-tight text-gray-900">
                        Your Daily
                        <br />
                        Protein Need
                      </p>
                    </div>
                    <p className="mt-2 text-3xl font-black text-[#103B27] sm:text-4xl">
                      {results.dailyProtein} g
                      <span className="text-lg"> / day</span>
                    </p>
                  </div>

                  {/* BMI */}
                  <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-3 text-center sm:p-4">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <div className="rounded-xl bg-orange-100 p-1.5">
                        <Activity size={23} className="text-orange-500" />
                      </div>
                      <p className="text-sm font-extrabold text-gray-900">Your BMI</p>
                    </div>
                    <p className="mt-2 text-3xl font-black text-gray-900 sm:text-4xl">
                      {results.bmi}
                    </p>
                    <span
                      className={`mx-auto mt-1 rounded-full px-3 py-1 text-xs font-extrabold ${
                        results.bmiStatus === "Healthy"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-200 text-orange-800"
                      }`}
                    >
                      {results.bmiStatus}
                    </span>
                  </div>

                  {/* Healthy weight */}
                  <div className="flex min-w-0 flex-col justify-center rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-gray-50 p-3 text-center sm:p-4">
                    <div className="mb-1 flex items-center justify-center gap-2">
                      <Scale size={25} className="text-green-600" />
                      <p className="text-sm font-extrabold leading-tight text-gray-900">
                        Healthy Weight Range
                      </p>
                    </div>
                    <p className="mt-2 text-2xl font-black text-[#103B27] sm:text-3xl">
                      {results.healthyMin} – {results.healthyMax}
                      <span className="text-base"> kg</span>
                    </p>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#EFF9EC] to-[#E4F4DF] p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Target size={31} className="shrink-0 text-green-600" />
                    <h3 className="text-lg font-extrabold text-gray-900 sm:text-xl">
                      Your Personalized Recommendation
                    </h3>
                  </div>

                  <div className="mt-3 flex items-end gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      {proteinRecommendation.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 fill-green-600 text-white"
                          />
                          <p className="text-xs leading-relaxed text-gray-900 sm:text-sm">
                            {recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="hidden text-6xl sm:block">🍱</div>
                  </div>
                </div>

                {/* Family Profiles */}
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <SectionHeading
                    icon={Users}
                    title="Family Profiles"
                    right={
                      <button
                        type="button"
                        onClick={() => setActiveTab("family")}
                        className="inline-flex items-center gap-1 text-xs font-bold text-green-800 hover:text-green-950 sm:text-sm"
                      >
                        Manage Family <ArrowRight size={15} />
                      </button>
                    }
                  />

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {family.map((member, index) => (
                      <div
                        key={`${member.name}-${index}`}
                        className="flex min-w-0 flex-col items-center rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-green-50 p-3 text-center"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
                          {member.avatar}
                        </div>
                        <p className="mt-2 truncate text-xs font-extrabold text-gray-900 sm:text-sm">
                          {member.name}
                        </p>
                        <p className="mt-1 text-lg font-black text-green-800">
                          {member.protein} <span className="text-xs">g/day</span>
                        </p>
                        <p className="text-[10px] text-gray-700 sm:text-xs">
                          {member.goal}
                        </p>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => setShowAddMember(true)}
                      className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-3 text-center transition hover:border-green-500 hover:bg-green-50"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                        <Plus size={24} className="text-green-700" />
                      </div>
                      <p className="mt-2 text-xs font-extrabold text-green-800">
                        Add Member
                      </p>
                    </button>
                  </div>
                </div>
              </Card>

              {/* Protein Plan CTA */}
              <div className="overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-[#E8F6E4] via-[#F5FBF3] to-[#E7F4E5]">
                <div className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-5">
                  <div className="flex items-center justify-center gap-2 text-5xl sm:text-6xl">
                    <span>🥗</span>
                    <span>🥚</span>
                    <span>🥤</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black leading-tight text-gray-900 sm:text-2xl">
                      Get Your Personalized Protein Plan
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-gray-800">
                      Meal plan, protein-rich foods & recommended protein packs for you and your family.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("plan")}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
                    >
                      Get My Protein Plan
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAMILY CALCULATOR */}
      {activeTab === "family" && (
        <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
          <Card className="p-4 sm:p-6">
            <SectionHeading
              icon={Users}
              title="Family Protein Calculator"
              right={
                <button
                  type="button"
                  onClick={() => setShowAddMember(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-bold text-white hover:bg-green-800"
                >
                  <Plus size={16} /> Add Member
                </button>
              }
            />
            <p className="mb-4 text-sm text-gray-700">
              Manage your family members and view their daily protein needs.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {family.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-green-50 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-extrabold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.goal}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-green-100 p-3">
                    <p className="text-xs text-gray-700">Daily protein target</p>
                    <p className="text-2xl font-black text-green-800">
                      {member.protein} g/day
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Weight: {member.weight} {weightUnit}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* MY PROTEIN PLAN */}
      {activeTab === "plan" && (
        <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
          <Card className="p-4 sm:p-6">
            <SectionHeading icon={CalendarDays} title="My Personalized Protein Plan" />
            <div className="mb-4 rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-gray-700">Your daily protein target</p>
              <p className="text-3xl font-black text-green-800">
                {results.dailyProtein} g / day
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Based on your body weight, goal and activity level.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { meal: "Breakfast", food: "Eggs, paneer, Greek yogurt", protein: "25–30g", icon: "🍳" },
                { meal: "Lunch", food: "Dal, tofu, chicken, rice", protein: "30–35g", icon: "🍛" },
                { meal: "Snack", food: "Milk, nuts, protein shake", protein: "10–15g", icon: "🥤" },
                { meal: "Dinner", food: "Paneer, legumes, vegetables", protein: "25–30g", icon: "🥗" },
              ].map((item) => (
                <div
                  key={item.meal}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-2 font-extrabold text-gray-900">{item.meal}</h3>
                  <p className="mt-1 text-sm text-gray-700">{item.food}</p>
                  <p className="mt-2 font-extrabold text-green-700">
                    {item.protein} protein
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-gray-700">
              This is a general meal-plan example. Individual protein requirements can vary based on age, health, pregnancy, and other factors.
            </p>
          </Card>
        </section>
      )}

      {/* TRACK PROGRESS */}
      {activeTab === "progress" && (
        <section className="mx-auto max-w-[1440px] px-3 pt-4 sm:px-5 lg:px-8">
          <Card className="p-4 sm:p-6">
            <SectionHeading
              icon={ChartNoAxesColumnIncreasing}
              title="Track Your Progress"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: "Daily Protein Target", value: `${results.dailyProtein} g`, icon: Salad },
                { label: "Current Weight", value: `${weight} ${weightUnit}`, icon: Scale },
                { label: "Current BMI", value: results.bmi, icon: Activity },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-green-50 p-4"
                  >
                    <Icon size={25} className="text-green-600" />
                    <p className="mt-2 text-sm text-gray-700">{stat.label}</p>
                    <p className="text-2xl font-black text-green-800">{stat.value}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <TrendingUp size={42} className="mx-auto text-green-600" />
              <h3 className="mt-3 text-lg font-extrabold text-gray-900">
                Your progress tracking starts here
              </h3>
              <p className="mt-1 text-sm text-gray-700">
                Your weight history, protein intake and goal progress charts can be connected here when tracking data is available.
              </p>
            </div>
          </Card>
        </section>
      )}

      {/* ADD FAMILY MEMBER MODAL */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-5">
          <div className="w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-gray-900">
                Add Family Member
              </h2>
              <button
                type="button"
                onClick={() => setShowAddMember(false)}
                className="rounded-full px-3 py-1 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-800">
                  Name
                </label>
                <input
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name"
                  className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-800">
                    Age
                  </label>
                  <input
                    type="number"
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(e.target.value)}
                    placeholder="Age"
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-800">
                    Weight ({weightUnit})
                  </label>
                  <input
                    type="number"
                    value={newMemberWeight}
                    onChange={(e) => setNewMemberWeight(e.target.value)}
                    placeholder="Weight"
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-gray-800">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setNewMemberGender(item.value)}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-bold ${
                        newMemberGender === item.value
                          ? "border-green-600 bg-green-50 text-green-800"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addFamilyMember}
                className="mt-2 w-full rounded-full bg-green-700 py-3 text-sm font-extrabold text-white transition hover:bg-green-800"
              >
                Add to Family
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProteinCalculator;
