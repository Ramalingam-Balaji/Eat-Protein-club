// import {
//   ArrowRight,
//   BarChart3,
//   Heart,
//   Leaf,
// } from "lucide-react";

// import {
//   LuUserRound,
//   LuBaby,
// } from "react-icons/lu";

// import { GiWeightLiftingUp } from "react-icons/gi";
// import { MdPregnantWoman } from "react-icons/md";
// import { FaPersonBreastfeeding } from "react-icons/fa6";
// import {
//   FaChild,
//   FaFemale,
// } from "react-icons/fa";

// import { useState } from "react";

// import { ACTIVITY_LEVELS, PROFILES } from "../data/homeData";
// import SectionTag from "./SectionTag";

// // --------------------------------
// // PROFILE ICONS - REACT ICONS
// // --------------------------------
// const PROFILE_ICONS = {
//   Adult: LuUserRound,
//   Kid: LuBaby,
//   "Pregnant Woman": MdPregnantWoman,
//   "Feeding Mother": FaPersonBreastfeeding,
//   Bodybuilder: GiWeightLiftingUp,
// };

// // --------------------------------
// // KID GENDER ICONS - REACT ICONS
// // --------------------------------
// const GENDER_ICONS = {
//   Boy: FaChild,
//   Girl: FaFemale,
// };

// export default function ProteinCalculator() {
//   // --------------------------------
//   // FORM STATES
//   // --------------------------------
//   const [profile, setProfile] = useState("Adult");
//   const [age, setAge] = useState(25);

//   const [heightUnit, setHeightUnit] = useState("cm");
//   const [height, setHeight] = useState(170);

//   const [weightUnit, setWeightUnit] = useState("kg");
//   const [weight, setWeight] = useState(20);

//   const [gender, setGender] = useState("Boy");

//   const [activity] = useState(
//     ACTIVITY_LEVELS?.[2]?.label ||
//       ACTIVITY_LEVELS?.[0]?.label ||
//       ""
//   );

//   // --------------------------------
//   // RESULT STATE
//   // --------------------------------
//   const [result, setResult] = useState({
//     bmi: "--",
//     protein: "--",
//     status: "",
//     calculated: false,
//   });

//   // --------------------------------
//   // HELPERS
//   // --------------------------------
//   const showValidationMessage = (message) => {
//     alert(message);
//   };

//   const getProfileAgeMessage = (selectedProfile, ageValue) => {
//     const adultProfiles = [
//       "Adult",
//       "Pregnant Woman",
//       "Feeding Mother",
//       "Bodybuilder",
//     ];

//     if (adultProfiles.includes(selectedProfile) && ageValue < 20) {
//       return `For the ${selectedProfile} profile, age must be 20 years or above.`;
//     }

//     if (selectedProfile === "Kid" && ageValue > 19) {
//       return "For the Kid profile, age must be 19 years or below.";
//     }

//     return "";
//   };

//   const getHeightCm = () => {
//     const value = Number(height);

//     if (heightUnit === "cm") {
//       return value;
//     }

//     return value * 30.48;
//   };

//   const getWeightKg = () => {
//     const value = Number(weight);

//     if (weightUnit === "kg") {
//       return value;
//     }

//     return value * 0.45359237;
//   };

//   const validateForm = () => {
//     const ageValue = Number(age);
//     const heightValue = Number(height);
//     const weightValue = Number(weight);

//     if (
//       !Number.isFinite(ageValue) ||
//       ageValue < 0 ||
//       ageValue > 100
//     ) {
//       showValidationMessage("Please select a valid age.");
//       return false;
//     }

//     const ageMessage = getProfileAgeMessage(profile, ageValue);

//     if (ageMessage) {
//       showValidationMessage(ageMessage);
//       return false;
//     }

//     if (!Number.isFinite(heightValue) || heightValue <= 0) {
//       showValidationMessage("Please enter a valid height.");
//       return false;
//     }

//     if (
//       heightUnit === "cm" &&
//       (heightValue < 50 || heightValue > 249)
//     ) {
//       showValidationMessage("Height must be between 50 and 249 cm.");
//       return false;
//     }

//     if (
//       heightUnit === "ft" &&
//       (heightValue < 2 || heightValue > 11.9)
//     ) {
//       showValidationMessage("Height must be between 2 and 11.9 ft.");
//       return false;
//     }

//     if (!Number.isFinite(weightValue) || weightValue <= 0) {
//       showValidationMessage("Please enter a valid weight.");
//       return false;
//     }

//     if (
//       weightUnit === "kg" &&
//       (weightValue < 10 || weightValue > 209)
//     ) {
//       showValidationMessage("Weight must be between 10 and 209 kg.");
//       return false;
//     }

//     if (
//       weightUnit === "lb" &&
//       (weightValue < 20 || weightValue > 419)
//     ) {
//       showValidationMessage("Weight must be between 20 and 419 lb.");
//       return false;
//     }

//     return true;
//   };

//   // --------------------------------
//   // CALCULATE RESULTS
//   // --------------------------------
//   const handleCalculate = () => {
//     if (!validateForm()) return;

//     const heightCm = getHeightCm();
//     const weightKg = getWeightKg();

//     if (!heightCm || !weightKg) {
//       showValidationMessage("Please enter valid height and weight.");
//       return;
//     }

//     const heightM = heightCm / 100;
//     const bmi = weightKg / (heightM * heightM);

//     let status = "";

//     if (bmi < 18.5) {
//       status = "Underweight";
//     } else if (bmi < 25) {
//       status = "Normal";
//     } else if (bmi < 30) {
//       status = "Overweight";
//     } else {
//       status = "High";
//     }

//     const activityData = ACTIVITY_LEVELS?.find(
//       (item) => item.label === activity
//     );

//     const profileProteinFactors = {
//       Adult: 0.8,
//       Kid: 2,
//       "Pregnant Woman": 1.5,
//       "Feeding Mother": 1.5,
//       Bodybuilder: 1.7,
//     };

//     const profileFactor = profileProteinFactors[profile] ?? 1;

//     const protein = Math.max(
//       1,
//       Math.round(weightKg * profileFactor)
//     );

//     setResult({
//       bmi: bmi.toFixed(1),
//       protein,
//       status,
//       calculated: true,
//     });
//   };

//   // --------------------------------
//   // PROFILE CHANGE
//   // --------------------------------
//   const handleProfileChange = (item) => {
//     setProfile(item);

//     setResult({
//       bmi: "--",
//       protein: "--",
//       status: "",
//       calculated: false,
//     });
//   };

//   // --------------------------------
//   // HEIGHT UNIT CHANGE
//   // --------------------------------
//   const handleHeightUnitChange = () => {
//     if (heightUnit === "cm") {
//       const feetValue = Number(height) / 30.48;

//       setHeight(Number(feetValue.toFixed(1)));
//       setHeightUnit("ft");
//     } else {
//       const cmValue = Number(height) * 30.48;

//       setHeight(Math.round(cmValue));
//       setHeightUnit("cm");
//     }

//     setResult((prev) => ({
//       ...prev,
//       calculated: false,
//     }));
//   };

//   // --------------------------------
//   // WEIGHT UNIT CHANGE
//   // --------------------------------
//   const handleWeightUnitChange = () => {
//     if (weightUnit === "kg") {
//       const lbValue = Number(weight) / 0.45359237;

//       setWeight(Math.round(lbValue));
//       setWeightUnit("lb");
//     } else {
//       const kgValue = Number(weight) * 0.45359237;

//       setWeight(Math.round(kgValue));
//       setWeightUnit("kg");
//     }

//     setResult((prev) => ({
//       ...prev,
//       calculated: false,
//     }));
//   };

//   return (
//     <section
//       id="calculator"
//       className="scroll-mt-20 bg-white px-3 py-6 sm:px-5 sm:py-8"
//     >
//       <div
//         className="
//           mx-auto w-full max-w-[1450px] rounded-2xl
//           bg-gradient-to-r from-[#f0faea] to-[#edf9e9]
//           p-4 shadow-soft sm:p-6 lg:p-8
//         "
//       >
//         <div
//           className="
//             grid grid-cols-1 items-center gap-6
//             lg:grid-cols-[39%_61%] lg:gap-7
//           "
//         >
//           {/* LEFT CONTENT */}
//           <div className="min-w-0">
//             <SectionTag>
//               Personalized Nutrition Insights
//             </SectionTag>

//             <h2
//               className="
//                 mt-4 text-[27px] font-black leading-[1.08]
//                 tracking-tight text-protein-dark sm:text-[31px]
//               "
//             >
//               Know Your Protein Need
//               <br />
//               &amp; BMI in Seconds
//             </h2>

//             <p
//               className="
//                 mt-3 max-w-[430px] text-[15px]
//                 leading-5 text-slate-600 sm:text-sm
//               "
//             >
//               Get personalized results based on your age,
//               lifestyle and goals. One simple calculator
//               for everyone.
//             </p>

//             <div
//               className="
//                 mt-5 grid grid-cols-4 gap-1
//                 sm:mt-6 sm:gap-2
//               "
//             >
//               {[
//                 [LuUserRound, "Understand", "Your Body"],
//                 [Leaf, "Know Protein", "Requirement"],
//                 [BarChart3, "Get Your BMI", ""],
//                 [Heart, "Make Better", "Food Choices"],
//               ].map(([Icon, title, subtitle]) => (
//                 <div key={title} className="min-w-0 text-center">
//                   <div
//                     className="
//                       mx-auto grid h-9 w-9 place-items-center
//                       rounded-full bg-white text-protein-green
//                       shadow-sm sm:h-11 sm:w-11
//                     "
//                   >
//                     <Icon
//                       size={22}
//                       className="sm:h-[21px] sm:w-[21px]"
//                     />
//                   </div>

//                   <p
//                     className="
//                       mt-2 text-[12px] semibold
//                       leading-3 text-slate-700
//                     "
//                   >
//                     {title}
//                   </p>

//                   {subtitle && (
//                     <p
//                       className="
//                         text-[10px] semibold leading-3
//                         text-slate-700 sm:text-[12px]
//                       "
//                     >
//                       {subtitle}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CALCULATOR CARD */}
//           <div
//             className="
//               mx-auto w-full max-w-[560px]
//               rounded-2xl bg-white p-2.5
//               shadow-card sm:p-3
//             "
//           >
//             {/* PROFILE TABS */}
//             <div className="flex items-start justify-center gap-2 pb-3 sm:gap-3">
//               {PROFILES.map((item) => {
//                 const Icon = PROFILE_ICONS[item] || LuUserRound;
//                 const selected = profile === item;

//                 return (
//                   <button
//                     key={item}
//                     type="button"
//                     onClick={() => handleProfileChange(item)}
//                     aria-label={item}
//                     aria-pressed={selected}
//                     className="
//                       group flex min-w-0 flex-1
//                       flex-col items-center gap-1.5
//                     "
//                   >
//                     <span
//                       className={`
//                         grid h-11 w-11 place-items-center
//                         rounded-xl border transition-all duration-200
//                         sm:h-12 sm:w-12
//                         ${
//                           selected
//                             ? "border-protein-green bg-protein-green text-white shadow-md"
//                             : "border-slate-200 bg-white text-protein-green hover:border-protein-green hover:bg-green-50"
//                         }
//                       `}
//                     >
//                       <Icon size={23} />
//                     </span>

//                     <span
//                       className={`
//                         max-w-full text-center text-[9px]
//                         font-semibold leading-tight sm:text-[12px]
//                         ${
//                           selected
//                             ? "text-protein-dark"
//                             : "text-slate-600"
//                         }
//                       `}
//                     >
//                       {item}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* KID GENDER */}
//             {profile === "Kid" && (
//               <div className="mt-3">
//                 <p className="mb-3 text-sm font-bold text-slate-800">
//                   Select Gender
//                 </p>

//                 <div className="grid grid-cols-2 gap-3">
//                   {["Boy", "Girl"].map((item) => {
//                     const selected = gender === item;
//                     const Icon = GENDER_ICONS[item];

//                     return (
//                       <button
//                         key={item}
//                         type="button"
//                         onClick={() => {
//                           setGender(item);

//                           setResult((prev) => ({
//                             ...prev,
//                             calculated: false,
//                           }));
//                         }}
//                         aria-pressed={selected}
//                         className="
//                           flex flex-col items-center gap-2
//                           rounded-xl border border-slate-100
//                           bg-white p-3 transition-all
//                           hover:border-green-300 hover:bg-green-50
//                         "
//                       >
//                         <span
//                           className={`
//                             grid h-10 w-10 place-items-center
//                             rounded-full border transition-all duration-200
//                             ${
//                               selected
//                                 ? "border-protein-green bg-green-50 text-protein-green shadow-sm"
//                                 : "border-slate-200 bg-white text-protein-green"
//                             }
//                           `}
//                         >
//                           <Icon size={24} />
//                         </span>

//                         <span
//                           className={`
//                             text-sm font-bold
//                             ${
//                               selected
//                                 ? "text-protein-dark"
//                                 : "text-slate-600"
//                             }
//                           `}
//                         >
//                           {item}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* AGE */}
//             <div className="mt-2 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
//               <label className="block text-xs font-medium text-slate-500">
//                 Age (YRS)

//                 <select
//                   value={age}
//                   onChange={(e) => {
//                     setAge(Number(e.target.value));

//                     setResult((prev) => ({
//                       ...prev,
//                       calculated: false,
//                     }));
//                   }}
//                   className="
//                     mt-1.5 h-9 w-full rounded-lg
//                     border-0 bg-slate-100 px-2.5
//                     text-sm font-medium text-slate-800
//                     outline-none focus:ring-2 focus:ring-green-400
//                   "
//                 >
//                   {Array.from({ length: 101 }, (_, index) => index).map(
//                     (value) => (
//                       <option key={value} value={value}>
//                         {value} years
//                       </option>
//                     )
//                   )}
//                 </select>
//               </label>
//             </div>

//             {/* HEIGHT, WEIGHT, BMI AND DAILY PROTEIN */}
//             <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
//               {/* HEIGHT */}
//               <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
//                 <div className="flex min-h-6 items-center">
//                   <span className="text-xs font-semibold text-slate-600">
//                     Height
//                   </span>
//                 </div>

//                 <input
//                   type="number"
//                   min={heightUnit === "cm" ? 50 : 2}
//                   max={heightUnit === "cm" ? 249 : 11.9}
//                   step={heightUnit === "cm" ? 1 : 0.1}
//                   value={height}
//                   onChange={(e) => {
//                     setHeight(e.target.value);

//                     setResult((prev) => ({
//                       ...prev,
//                       calculated: false,
//                     }));
//                   }}
//                   className="
//                     mt-1.5 h-9 w-full min-w-0 rounded-lg
//                     bg-slate-100 px-2 text-sm text-slate-800
//                     outline-none focus:ring-2 focus:ring-green-400
//                   "
//                 />

//                 <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (heightUnit !== "cm") {
//                         handleHeightUnitChange();
//                       }
//                     }}
//                     className={`
//                       flex-1 rounded-md py-1.5 text-xs font-bold
//                       ${
//                         heightUnit === "cm"
//                           ? "bg-white text-protein-green shadow-sm"
//                           : "text-slate-500"
//                       }
//                     `}
//                   >
//                     CM
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (heightUnit !== "ft") {
//                         handleHeightUnitChange();
//                       }
//                     }}
//                     className={`
//                       flex-1 rounded-md py-1.5 text-xs font-bold
//                       ${
//                         heightUnit === "ft"
//                           ? "bg-white text-protein-green shadow-sm"
//                           : "text-slate-500"
//                       }
//                     `}
//                   >
//                     FT
//                   </button>
//                 </div>
//               </div>

//               {/* WEIGHT */}
//               <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
//                 <div className="flex min-h-6 items-center">
//                   <span className="text-xs font-semibold text-slate-600">
//                     Weight
//                   </span>
//                 </div>

//                 <input
//                   type="number"
//                   min={weightUnit === "kg" ? 10 : 20}
//                   max={weightUnit === "kg" ? 209 : 419}
//                   step="1"
//                   value={weight}
//                   onChange={(e) => {
//                     setWeight(e.target.value);

//                     setResult((prev) => ({
//                       ...prev,
//                       calculated: false,
//                     }));
//                   }}
//                   className="
//                     mt-1.5 h-9 w-full min-w-0 rounded-lg
//                     bg-slate-100 px-2 text-sm text-slate-800
//                     outline-none focus:ring-2 focus:ring-green-400
//                   "
//                 />

//                 <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (weightUnit !== "kg") {
//                         handleWeightUnitChange();
//                       }
//                     }}
//                     className={`
//                       flex-1 rounded-md py-1.5 text-xs font-bold
//                       ${
//                         weightUnit === "kg"
//                           ? "bg-white text-protein-green shadow-sm"
//                           : "text-slate-500"
//                       }
//                     `}
//                   >
//                     KG
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (weightUnit !== "lb") {
//                         handleWeightUnitChange();
//                       }
//                     }}
//                     className={`
//                       flex-1 rounded-md py-1.5 text-xs font-bold
//                       ${
//                         weightUnit === "lb"
//                           ? "bg-white text-protein-green shadow-sm"
//                           : "text-slate-500"
//                       }
//                     `}
//                   >
//                     LB
//                   </button>
//                 </div>
//               </div>

//               {/* BMI */}
//               <div className="flex min-h-[125px] min-w-0 flex-col items-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
//                 <div className="flex min-h-6 items-center justify-center text-blue-500">
//                   <BarChart3 size={19} />
//                 </div>

//                 <p className="mt-1.5 text-xs font-semibold text-slate-600">
//                   Your BMI
//                 </p>

//                 <p className="mt-2 text-2xl font-black text-blue-600">
//                   {result.bmi}
//                 </p>

//                 <span
//                   className={`
//                     mt-1.5 rounded-full px-2 py-1 text-[10px] font-bold
//                     ${
//                       result.calculated
//                         ? "bg-blue-50 text-blue-600"
//                         : "bg-slate-100 text-slate-400"
//                     }
//                   `}
//                 >
//                   {result.calculated ? result.status : "--"}
//                 </span>
//               </div>

//               {/* DAILY PROTEIN */}
//               <div className="flex min-h-[125px] min-w-0 flex-col items-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
//                 <div className="flex min-h-6 items-center justify-center text-protein-green">
//                   <Heart size={19} />
//                 </div>

//                 <p className="mt-1.5 text-xs font-semibold text-slate-600">
//                   Daily Protein
//                 </p>

//                 <p className="mt-2 text-2xl font-black text-protein-green">
//                   {result.calculated ? `${result.protein}g` : "--"}
//                 </p>

//                 <p className="mt-1 text-[11px] leading-3 text-slate-400">
//                   Recommended daily need
//                 </p>
//               </div>
//             </div>

//             {/* CALCULATE BUTTON */}
//             <button
//               type="button"
//               onClick={handleCalculate}
//               className="
//                 mt-3 flex h-10 w-full items-center
//                 justify-center gap-2 rounded-xl
//                 bg-protein-green text-sm font-bold text-white
//                 shadow-sm transition-all duration-200
//                 hover:bg-green-800 hover:shadow-md
//                 active:scale-[0.99]
//               "
//             >
//               Calculate
//               <ArrowRight size={16} />
//             </button>

//             <p className="mt-1.5 text-center text-[12px] leading-3 text-slate-400">
//               Results are estimates. Consult a professional for medical advice.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { useState } from "react";
import { ArrowRight, BarChart3, Heart, Leaf, UserRound } from "lucide-react";

import { LuUserRound, LuBaby } from "react-icons/lu";

import { GiWeightLiftingUp } from "react-icons/gi";
//import { MdOutlinePregnantWoman } from "react-icons/md";
import { FaPersonPregnant } from "react-icons/fa6";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaChild, FaFemale } from "react-icons/fa";

import SectionTag from "./SectionTag";

const PROFILES = [
  "Adult",
  "Kid",
  "Pregnant Woman",
  "Feeding Mother",
  "Bodybuilder",
];

const PROFILE_ICONS = {
  Adult: LuUserRound,
  Kid: LuBaby,
  "Pregnant Woman": FaPersonPregnant,
  "Feeding Mother": FaPersonBreastfeeding,
  Bodybuilder: GiWeightLiftingUp,
};

const PROFILE_PROTEIN_FACTORS = {
  Adult: 0.8,
  Kid: 2,
  "Pregnant Woman": 1.5,
  "Feeding Mother": 1.5,
  Bodybuilder: 1.7,
};

// Gender icons — Boy uses FaChild, Girl uses FaFemale (react-icons/fa)
const GENDER_ICONS = {
  Boy: FaChild,
  Girl: FaFemale,
};

// Age ranges per profile
// Kids: 1 to 19, all others: 20 to 100
const getAgeRange = (selectedProfile) => {
  if (selectedProfile === "Kid") {
    return { min: 1, max: 17, defaultAge: 10 };
  }
  return { min: 18, max: 100, defaultAge: 25 };
};

const BENEFITS = [
  { Icon: UserRound, title: "Understand", subtitle: "Your Body" },
  { Icon: Leaf, title: "Know Protein", subtitle: "Requirement" },
  { Icon: BarChart3, title: "Get Your BMI", subtitle: "" },
  { Icon: Heart, title: "Make Better", subtitle: "Food Choices" },
];

const initialResult = {
  bmi: "--",
  protein: "--",
  status: "",
  calculated: false,
};

export default function BMISection({ showToast }) {
  const [profile, setProfile] = useState("Adult");
  const [age, setAge] = useState(25);
  const [heightUnit, setHeightUnit] = useState("cm");
  const [height, setHeight] = useState(170);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weight, setWeight] = useState(70);
  const [gender, setGender] = useState("Boy");
  const [result, setResult] = useState(initialResult);

  const notify = (message) => {
    if (typeof showToast === "function") {
      showToast(message);
    } else {
      window.alert(message);
    }
  };

  const invalidateResult = () => {
    setResult(initialResult);
  };

  const handleProfileChange = (nextProfile) => {
    setProfile(nextProfile);

    // Reset age to a valid value inside the new profile's age range
    const { defaultAge } = getAgeRange(nextProfile);
    setAge(defaultAge);

    invalidateResult();
  };

  const getHeightCm = () => {
    const value = Number(height);
    return heightUnit === "cm" ? value : value * 30.48;
  };

  const getWeightKg = () => {
    const value = Number(weight);
    return weightUnit === "kg" ? value : value * 0.45359237;
  };

  const validateForm = () => {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);

    const { min: ageMin, max: ageMax } = getAgeRange(profile);

    if (!Number.isFinite(ageValue) || ageValue < ageMin || ageValue > ageMax) {
      notify(
        `For the ${profile} profile, age must be between ${ageMin} and ${ageMax} years.`,
      );
      return false;
    }

    if (!Number.isFinite(heightValue) || heightValue <= 0) {
      notify("Please enter a valid height.");
      return false;
    }

    if (heightUnit === "cm" && (heightValue < 50 || heightValue > 249)) {
      notify("Height must be between 50 and 249 cm.");
      return false;
    }

    if (heightUnit === "ft" && (heightValue < 2 || heightValue > 11.9)) {
      notify("Height must be between 2 and 11.9 ft.");
      return false;
    }

    if (!Number.isFinite(weightValue) || weightValue <= 0) {
      notify("Please enter a valid weight.");
      return false;
    }

    if (weightUnit === "kg" && (weightValue < 10 || weightValue > 209)) {
      notify("Weight must be between 10 and 209 kg.");
      return false;
    }

    if (weightUnit === "lb" && (weightValue < 20 || weightValue > 419)) {
      notify("Weight must be between 20 and 419 lb.");
      return false;
    }

    return true;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    const heightCm = getHeightCm();
    const weightKg = getWeightKg();

    if (
      !Number.isFinite(heightCm) ||
      !Number.isFinite(weightKg) ||
      heightCm <= 0 ||
      weightKg <= 0
    ) {
      notify("Please enter valid height and weight.");
      return;
    }

    // BMI = weight in kg / (height in metres)^2
    const heightM = heightCm / 100;
    const bmi = weightKg / heightM ** 2;

    let status = "";

    if (bmi < 16) {
      status = "Very severely underweight";
    } else if (bmi < 17) {
      status = "Severely underweight";
    } else if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi < 25) {
      status = "Normal";
    } else if (bmi < 30) {
      status = "Overweight";
    }  else if (bmi < 35) {
      status = "Obese Class I";
    }  else if (bmi < 40) {
      status = "Obese Class II";
    } else {
      status = "Obese Class III";
    }

    // Daily protein = weight in kg × profile protein factor
    const profileFactor = PROFILE_PROTEIN_FACTORS[profile] ?? 1;
    const protein = Math.max(1, Math.round(weightKg * profileFactor));

    setResult({
      bmi: bmi.toFixed(1),
      protein,
      status,
      calculated: true,
    });

    // notify(
    //   `BMI: ${bmi.toFixed(1)} | Recommended Goal: ${protein}g protein/day 🎯`,
    // );
  };

  const handleHeightUnitChange = (nextUnit) => {
    if (nextUnit === heightUnit) return;

    const currentHeight = Number(height);

    if (Number.isFinite(currentHeight) && currentHeight > 0) {
      if (nextUnit === "ft") {
        setHeight(Number((currentHeight / 30.48).toFixed(1)));
      } else {
        setHeight(Math.round(currentHeight * 30.48));
      }
    }

    setHeightUnit(nextUnit);
    invalidateResult();
  };

  const handleWeightUnitChange = (nextUnit) => {
    if (nextUnit === weightUnit) return;

    const currentWeight = Number(weight);

    if (Number.isFinite(currentWeight) && currentWeight > 0) {
      if (nextUnit === "lb") {
        setWeight(Math.round(currentWeight / 0.45359237));
      } else {
        setWeight(Math.round(currentWeight * 0.45359237));
      }
    }

    setWeightUnit(nextUnit);
    invalidateResult();
  };

  const unitButtonClass = (selected) =>
    `flex-1 rounded-md py-1.5 text-xs font-bold transition ${
      selected
        ? "bg-white text-[#006e2d] shadow-sm"
        : "text-slate-500 hover:text-[#006e2d]"
    }`;

  // Build the age dropdown options dynamically based on the selected profile
  const { min: ageMin, max: ageMax } = getAgeRange(profile);
  const ageOptions = Array.from(
    { length: ageMax - ageMin + 1 },
    (_, index) => ageMin + index,
  );

  return (
   <section
  id="protein-calculator"
  className="scroll-mt-0 bg-white px-3 py-8 sm:px-5 sm:py-12 lg:py-16"
>
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-gradient-to-r from-[#f0faea] to-[#edf9e9] p-4 shadow-lg shadow-green-900/5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[45%_50%] lg:gap-7">
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <SectionTag>Personalized Nutrition Insights</SectionTag>

            <h2 className="mt-4 text-[27px] font-black leading-[1.08] tracking-tight text-[#123b25] sm:text-[31px]">
              Know Your Protein Need
              <br />
              &amp; BMI in Seconds
            </h2>

            <p className="mt-3 max-w-[430px] text-[15px] leading-6 text-slate-600 sm:text-sm">
              Get personalized results based on your age, lifestyle and goals.
              One simple calculator for everyone.
            </p>

            <div className="mt-5 grid grid-cols-4 gap-1 sm:mt-6 sm:gap-2">
              {BENEFITS.map(({ Icon, title, subtitle }) => (
                <div key={title} className="min-w-0 text-center">
                  <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white text-[#006e2d] shadow-sm sm:h-11 sm:w-11">
                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="sm:h-[21px] sm:w-[21px]"
                    />
                  </div>

                  <p className="mt-2 text-[10px] font-bold leading-3 text-slate-700 sm:text-xs">
                    {title}
                  </p>

                  {subtitle && (
                    <p className="text-[9px] font-bold leading-3 text-slate-600 sm:text-xs">
                      {subtitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CALCULATOR CARD */}
          <div className="mx-auto w-full max-w-[500px] min-w-0 rounded-2xl bg-white p-3 shadow-lg sm:p-4">
            {/* PROFILE TABS */}
            <div className="flex items-start justify-center gap-1.5 pb-3 sm:gap-3">
              {PROFILES.map((item) => {
                const Icon = PROFILE_ICONS[item];
                const selected = profile === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleProfileChange(item)}
                    aria-label={item}
                    aria-pressed={selected}
                    className="group flex min-w-0 flex-1 flex-col items-center gap-1.5"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl border transition-all duration-200 sm:h-12 sm:w-12 ${
                        selected
                          ? "border-[#006e2d] bg-[#006e2d] text-white shadow-md"
                          : "border-slate-200 bg-white text-[#006e2d] hover:border-[#006e2d] hover:bg-green-50"
                      }`}
                    >
                      <Icon size={25} strokeWidth={1.8} />
                    </span>

                    <span
                      className={`max-w-full text-center text-[9px] font-semibold leading-tight sm:text-[11px] ${
                        selected ? "text-[#123b25]" : "text-slate-600"
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* KID GENDER */}
            {profile === "Kid" && (
              <div className="mt-2">
                <p className="mb-2 text-sm font-bold text-slate-800">
                  Select Gender
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {["Boy", "Girl"].map((item) => {
                    const selected = gender === item;
                    const Icon = GENDER_ICONS[item];

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setGender(item);
                          invalidateResult();
                        }}
                        aria-pressed={selected}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3 transition ${
                          selected
                            ? "border-[#006e2d] bg-green-50 text-[#006e2d]"
                            : "border-slate-200 text-slate-600 hover:border-green-300"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.8} />
                        <span className="text-sm font-bold">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AGE — dynamically limited based on selected profile */}

            <div className="mt-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <label className="block text-xs font-medium text-slate-500">
                Age (YRS)
              </label>

              <div className="mt-1.5 flex h-10 items-center overflow-hidden rounded-lg bg-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = ageOptions.indexOf(Number(age));

                    if (currentIndex > 0) {
                      setAge(ageOptions[currentIndex - 1]);
                      invalidateResult();
                    }
                  }}
                  disabled={ageOptions.indexOf(Number(age)) <= 0}
                  className="flex h-full w-11 shrink-0 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease age"
                >
                  −
                </button>

                <div className="flex flex-1 items-center justify-center gap-1">
                  <input
                    type="number"
                    min={ageOptions[0]}
                    max={ageOptions[ageOptions.length - 1]}
                    value={age}
                    onChange={(event) => {
                      const value = event.target.value;

                      if (value === "") {
                        setAge("");
                        invalidateResult();
                        return;
                      }

                      setAge(Number(value));
                      invalidateResult();
                    }}
                    onBlur={() => {
                      const minAge = ageOptions[0];
                      const maxAge = ageOptions[ageOptions.length - 1];
                      const value = Number(age);

                      if (age === "" || !Number.isFinite(value)) {
                        setAge(minAge);
                      } else {
                        const nearestAge = ageOptions.reduce(
                          (previous, current) =>
                            Math.abs(current - value) <
                            Math.abs(previous - value)
                              ? current
                              : previous,
                        );

                        setAge(Math.min(maxAge, Math.max(minAge, nearestAge)));
                      }
                    }}
                    className="w-16 appearance-none border-0 bg-transparent p-0 text-center text-sm font-semibold text-slate-800 outline-none focus:ring-0"
                    aria-label="Enter age in years"
                  />

                  {/* <span className="text-xs font-medium text-slate-500">
        years
      </span> */}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = ageOptions.indexOf(Number(age));

                    if (
                      currentIndex >= 0 &&
                      currentIndex < ageOptions.length - 1
                    ) {
                      setAge(ageOptions[currentIndex + 1]);
                      invalidateResult();
                    }
                  }}
                  disabled={
                    ageOptions.indexOf(Number(age)) >= ageOptions.length - 1
                  }
                  className="flex h-full w-11 shrink-0 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase age"
                >
                  +
                </button>
              </div>
            </div>

            {/* HEIGHT, WEIGHT, BMI AND PROTEIN */}
            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {/* HEIGHT */}
              <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
                <label className="text-xs font-semibold text-slate-600">
                  Height
                </label>

                <input
                  type="number"
                  min={heightUnit === "cm" ? 50 : 2}
                  max={heightUnit === "cm" ? 249 : 11.9}
                  step={heightUnit === "cm" ? 1 : 0.1}
                  value={height}
                  onChange={(event) => {
                    setHeight(event.target.value);
                    invalidateResult();
                  }}
                  aria-label={`Height in ${heightUnit}`}
                  className="mt-2 h-10 w-full min-w-0 rounded-lg bg-slate-100 px-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-400"
                />

                <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange("cm")}
                    className={unitButtonClass(heightUnit === "cm")}
                  >
                    CM
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHeightUnitChange("ft")}
                    className={unitButtonClass(heightUnit === "ft")}
                  >
                    FT
                  </button>
                </div>
              </div>

              {/* WEIGHT */}
              <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm">
                <label className="text-xs font-semibold text-slate-600">
                  Weight
                </label>

                <input
                  type="number"
                  min={weightUnit === "kg" ? 10 : 20}
                  max={weightUnit === "kg" ? 209 : 419}
                  step="1"
                  value={weight}
                  onChange={(event) => {
                    setWeight(event.target.value);
                    invalidateResult();
                  }}
                  aria-label={`Weight in ${weightUnit}`}
                  className="mt-2 h-10 w-full min-w-0 rounded-lg bg-slate-100 px-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-green-400"
                />

                <div className="mt-2 flex items-center rounded-lg bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange("kg")}
                    className={unitButtonClass(weightUnit === "kg")}
                  >
                    KG
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWeightUnitChange("lb")}
                    className={unitButtonClass(weightUnit === "lb")}
                  >
                    LB
                  </button>
                </div>
              </div>

              {/* BMI RESULT */}
              <div className="flex min-h-[130px] min-w-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
                <BarChart3 size={20} className="text-blue-500" />

                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Your BMI
                </p>

                <p className="mt-2 text-2xl font-black text-blue-600">
                  {result.bmi}
                </p>

                <span
                  className={`mt-1 rounded-full px-2 py-1 text-[9px] font-bold ${
                    result.calculated
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {result.calculated ? result.status : "--"}
                </span>
              </div>

              {/* DAILY PROTEIN RESULT */}
              <div className="flex min-h-[130px] min-w-0 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-2 text-center shadow-sm">
                <Heart size={20} className="text-[#006e2d]" />

                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Daily Protein
                </p>

                <p className="mt-2 text-2xl font-black text-[#006e2d]">
                  {result.calculated ? `${result.protein}g` : "--"}
                </p>

                <p className="mt-1 text-[9px] leading-3 text-slate-400">
                  Recommended daily need
                </p>
              </div>
            </div>

            {/* CALCULATE BUTTON */}
            <button
              type="button"
              onClick={handleCalculate}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#006e2d] text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#005320] hover:shadow-md active:scale-[0.99]"
            >
              Calculate
              <ArrowRight size={17} />
            </button>

            <p className="mt-2 text-center text-[10px] leading-4 text-slate-400">
              Results are estimates. Consult a qualified healthcare professional
              for personalized medical or nutrition advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// import React, { useState } from "react";
// import {
//   UserRound,
//   Users,
//   Baby,
//   Heart,
//   Dumbbell,
//   Calculator,
//   Target,
//   ChartNoAxesColumnIncreasing,
//   HeartPulse,
//   ArrowRight,
//   Plus,
//   RefreshCw,
//   CheckCircle2,
//   Info,
// } from "lucide-react";

// const profileOptions = [
//   { label: "Adult", icon: UserRound, factor: 0.8 },
//   { label: "Kid", icon: Baby, factor: 2 },
//   { label: "Pregnant Woman", icon: Heart, factor: 1.5 },
//   { label: "Feeding Mother", icon: Users, factor: 1.5 },
//   { label: "Bodybuilder", icon: Dumbbell, factor: 1.6 },
// ];

// const goalOptions = [
//   {
//     id: "maintain",
//     label: "Maintain",
//     description: "Stay healthy",
//     icon: HeartPulse,
//   },
//   {
//     id: "lose",
//     label: "Lose Fat",
//     description: "Reduce weight",
//     icon: Target,
//   },
//   {
//     id: "muscle",
//     label: "Build Muscle",
//     description: "Gain strength",
//     icon: Dumbbell,
//   },
// ];

// const activityOptions = [
//   { id: "sedentary", label: "Sedentary", description: "Little or no exercise" },
//   { id: "light", label: "Light Active", description: "1–3 days/week" },
//   { id: "moderate", label: "Moderately Active", description: "3–5 days/week" },
//   { id: "very", label: "Very Active", description: "6–7 days/week" },
// ];

// const initialFamily = [
//   {
//     name: "Sri Lakshmi",
//     protein: 75,
//     goal: "Hormonal Health",
//     avatar: "https://i.pravatar.cc/100?img=47",
//   },
//   {
//     name: "Marhavin",
//     protein: 44,
//     goal: "Growth & Immunity",
//     avatar: "https://i.pravatar.cc/100?img=11",
//   },
// ];

// function bmiLabel(bmi) {
//   if (!bmi || !Number.isFinite(bmi)) return "--";
//   if (bmi < 18.5) return "Underweight";
//   if (bmi < 25) return "Normal";
//   if (bmi < 30) return "Overweight";
//   return "Obesity";
// }

// function bmiColor(bmi) {
//   if (!bmi || !Number.isFinite(bmi)) return "bg-gray-100 text-gray-500";
//   if (bmi < 18.5) return "bg-blue-100 text-blue-700";
//   if (bmi < 25) return "bg-green-100 text-green-700";
//   if (bmi < 30) return "bg-orange-100 text-orange-700";
//   return "bg-red-100 text-red-700";
// }

// function getHealthyWeightRange(heightCm) {
//   if (!heightCm || heightCm <= 0) return null;

//   const heightM = heightCm / 100;
//   const minWeight = 18.5 * heightM * heightM;
//   const maxWeight = 24.9 * heightM * heightM;

//   return `${minWeight.toFixed(0)} – ${maxWeight.toFixed(0)}`;
// }

// export default function ProteinCalculator() {
//   const [profile, setProfile] = useState("Adult");
//   const [gender, setGender] = useState("Male");
//   const [age, setAge] = useState("25");

//   const [height, setHeight] = useState("170");
//   const [heightUnit, setHeightUnit] = useState("cm");

//   const [weight, setWeight] = useState("70");
//   const [weightUnit, setWeightUnit] = useState("kg");

//   const [goal, setGoal] = useState("muscle");
//   const [activity, setActivity] = useState("moderate");

//   const [calculated, setCalculated] = useState(false);
//   const [family, setFamily] = useState(initialFamily);

//   const [newMemberOpen, setNewMemberOpen] = useState(false);
//   const [memberName, setMemberName] = useState("");
//   const [memberWeight, setMemberWeight] = useState("");

//   // Convert height into centimeters.
//   const heightCm =
//     heightUnit === "cm"
//       ? Number(height)
//       : Number(height) * 30.48;

//   // Convert weight into kilograms.
//   const weightKg =
//     weightUnit === "kg"
//       ? Number(weight)
//       : Number(weight) * 0.45359237;

//   // BMI calculation.
//   const bmi =
//     heightCm > 0 && weightKg > 0
//       ? weightKg / Math.pow(heightCm / 100, 2)
//       : 0;

//   const validInputs =
//     Number(age) >= 1 &&
//     Number(age) <= 120 &&
//     heightCm >= 50 &&
//     heightCm <= 250 &&
//     weightKg >= 10 &&
//     weightKg <= 300;

//   const selectedProfile = profileOptions.find(
//     (item) => item.label === profile
//   );

//   // Goal/activity adjustments for Adult profile.
//   const goalFactor = {
//     maintain: 1,
//     lose: 1.2,
//     muscle: 1.6,
//   };

//   const activityFactor = {
//     sedentary: 0.8,
//     light: 1,
//     moderate: 1.2,
//     very: 1.4,
//   };

//   const proteinFactor =
//     profile === "Adult"
//       ? goalFactor[goal] * activityFactor[activity]
//       : selectedProfile?.factor || 0.8;

//   const proteinNeed = validInputs
//     ? Math.round(weightKg * proteinFactor)
//     : 0;

//   const healthyWeightRange = getHealthyWeightRange(heightCm);

//   const handleProfileChange = (newProfile) => {
//     setProfile(newProfile);
//     setCalculated(false);

//     // Reset goal when changing profile.
//     if (newProfile !== "Adult") {
//       setGoal("maintain");
//     }
//   };

//   const handleCalculate = () => {
//     if (!validInputs) {
//       alert(
//         "Please enter valid age, height and weight before calculating."
//       );
//       return;
//     }

//     setCalculated(true);
//   };

//   const handleReset = () => {
//     setProfile("Adult");
//     setGender("Male");
//     setAge("25");
//     setHeight("170");
//     setHeightUnit("cm");
//     setWeight("70");
//     setWeightUnit("kg");
//     setGoal("muscle");
//     setActivity("moderate");
//     setCalculated(false);
//   };

//   const handleAddMember = () => {
//     const name = memberName.trim();
//     const kg =
//       weightUnit === "kg"
//         ? Number(memberWeight)
//         : Number(memberWeight) * 0.45359237;

//     if (!name || !kg || kg <= 0) {
//       alert("Enter a family member name and valid weight.");
//       return;
//     }

//     const newMember = {
//       name,
//       protein: Math.round(kg * 0.8),
//       goal: "Daily Protein",
//       avatar: `https://i.pravatar.cc/100?img=${family.length + 20}`,
//     };

//     setFamily((prev) => [...prev, newMember]);
//     setMemberName("");
//     setMemberWeight("");
//     setNewMemberOpen(false);
//   };

//   return (
//     <section
//       id="protein-calculator"
//       className="scroll-mt-24 bg-white px-3 py-5 sm:px-5 lg:px-6"
//     >
//       <div className="mx-auto max-w-[1440px]">
//         <div className="grid grid-cols-1 gap-4 rounded-[28px] bg-[#F0F8EF] p-3 sm:p-5 lg:grid-cols-[0.95fr_1.6fr_0.65fr] lg:gap-5 lg:p-6">
//           {/* =================================================
//               LEFT: INTRODUCTION
//           ================================================= */}
//           <div className="flex flex-col justify-center px-1 py-2 sm:px-3">
//             <span className="mb-2 w-fit rounded-md bg-green-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-green-800">
//               Protein Calculator
//             </span>

//             <h2 className="text-2xl font-black leading-tight tracking-tight text-[#103B27] sm:text-3xl xl:text-4xl">
//               Know Your Protein Need in 60 Seconds
//             </h2>

//             <p className="mt-3 text-sm leading-relaxed text-gray-700">
//               Get your personalized daily protein requirement based on your age,
//               gender, weight, activity level and goal.
//             </p>

//             {/* Benefits */}
//             <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6">
//               {[
//                 { icon: Target, text: "Understand Your Body" },
//                 { icon: Calculator, text: "Know Your Requirement" },
//                 { icon: ChartNoAxesColumnIncreasing, text: "Get Your BMI" },
//                 { icon: Heart, text: "Make Better Food Choices" },
//               ].map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <div key={item.text} className="flex flex-col items-center text-center">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
//                       <Icon size={20} className="text-green-700" />
//                     </div>
//                     <p className="mt-1.5 max-w-[110px] text-xs font-semibold leading-tight text-[#103B27]">
//                       {item.text}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Mini information */}
//             <div className="mt-5 flex items-start gap-2 rounded-2xl border border-green-100 bg-white/80 p-3">
//               <Info size={17} className="mt-0.5 shrink-0 text-green-700" />
//               <p className="text-xs leading-relaxed text-gray-600">
//                 Your protein requirement is estimated according to the profile and
//                 body weight you enter.
//               </p>
//             </div>
//           </div>

//           {/* =================================================
//               CENTER: CALCULATOR CARD
//           ================================================= */}
//           <div className="min-w-0 rounded-2xl border border-green-100 bg-white p-3 shadow-md sm:p-4">
//             {/* Profiles */}
//             <div className="grid grid-cols-5 gap-1.5">
//               {profileOptions.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = profile === item.label;

//                 return (
//                   <button
//                     key={item.label}
//                     type="button"
//                     onClick={() => handleProfileChange(item.label)}
//                     className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition ${
//                       isActive
//                         ? "bg-gradient-to-br from-green-600 to-green-800 text-white shadow-md"
//                         : "bg-white text-gray-700 hover:bg-green-50"
//                     }`}
//                   >
//                     <Icon size={19} />
//                     <span className="text-center text-[10px] font-bold leading-tight sm:text-xs">
//                       {item.label}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Age & Gender */}
//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-gray-700">
//                   Age (Years)
//                 </label>

//                 <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAge(String(Math.max(1, Number(age || 1) - 1)));
//                       setCalculated(false);
//                     }}
//                     className="px-1 py-2 text-gray-500 hover:text-green-700"
//                   >
//                     −
//                   </button>

//                   <input
//                     type="number"
//                     min="1"
//                     max="120"
//                     value={age}
//                     onChange={(e) => {
//                       setAge(e.target.value);
//                       setCalculated(false);
//                     }}
//                     className="w-full bg-transparent py-2 text-center text-sm font-semibold text-gray-800 outline-none"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAge(String(Math.min(120, Number(age || 0) + 1)));
//                       setCalculated(false);
//                     }}
//                     className="px-1 py-2 text-gray-500 hover:text-green-700"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-bold text-gray-700">
//                   Gender
//                 </label>

//                 <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1">
//                   {["Male", "Female"].map((item) => (
//                     <button
//                       key={item}
//                       type="button"
//                       onClick={() => {
//                         setGender(item);
//                         setCalculated(false);
//                       }}
//                       className={`rounded-lg py-2 text-xs font-bold transition ${
//                         gender === item
//                           ? "bg-green-700 text-white shadow"
//                           : "text-gray-600 hover:bg-white"
//                       }`}
//                     >
//                       {item}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Height / Weight / BMI */}
//             <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
//               {/* Height */}
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-gray-700">
//                   Height
//                 </label>

//                 <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
//                   <input
//                     type="number"
//                     value={height}
//                     onChange={(e) => {
//                       setHeight(e.target.value);
//                       setCalculated(false);
//                     }}
//                     className="min-w-0 w-full bg-transparent px-2 py-2.5 text-sm font-semibold outline-none"
//                   />

//                   <select
//                     value={heightUnit}
//                     onChange={(e) => {
//                       const newUnit = e.target.value;

//                       if (newUnit !== heightUnit) {
//                         setHeight(
//                           newUnit === "cm"
//                             ? String((Number(height) * 30.48).toFixed(0))
//                             : String((Number(height) / 30.48).toFixed(1))
//                         );
//                         setHeightUnit(newUnit);
//                         setCalculated(false);
//                       }
//                     }}
//                     className="bg-transparent pr-2 text-xs font-semibold text-gray-600 outline-none"
//                   >
//                     <option value="cm">cm</option>
//                     <option value="ft">ft</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Weight */}
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-gray-700">
//                   Weight
//                 </label>

//                 <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
//                   <input
//                     type="number"
//                     value={weight}
//                     onChange={(e) => {
//                       setWeight(e.target.value);
//                       setCalculated(false);
//                     }}
//                     className="min-w-0 w-full bg-transparent px-2 py-2.5 text-sm font-semibold outline-none"
//                   />

//                   <select
//                     value={weightUnit}
//                     onChange={(e) => {
//                       const newUnit = e.target.value;

//                       if (newUnit !== weightUnit) {
//                         setWeight(
//                           newUnit === "kg"
//                             ? String((Number(weight) * 0.45359237).toFixed(1))
//                             : String((Number(weight) / 0.45359237).toFixed(1))
//                         );
//                         setWeightUnit(newUnit);
//                         setCalculated(false);
//                       }
//                     }}
//                     className="bg-transparent pr-2 text-xs font-semibold text-gray-600 outline-none"
//                   >
//                     <option value="kg">kg</option>
//                     <option value="lb">lb</option>
//                   </select>
//                 </div>
//               </div>

//               {/* BMI */}
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-gray-700">
//                   Your BMI
//                 </label>

//                 <div className="flex h-[42px] items-center justify-between gap-1 rounded-xl border border-gray-200 bg-gray-50 px-2">
//                   <span className="text-sm font-extrabold text-[#103B27]">
//                     {bmi > 0 ? bmi.toFixed(1) : "--"}
//                   </span>

//                   <span
//                     className={`rounded-full px-2 py-1 text-[9px] font-bold ${bmiColor(bmi)}`}
//                   >
//                     {bmi > 0 ? bmiLabel(bmi) : "--"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Goals (Adult only) */}
//             {profile === "Adult" && (
//               <div className="mt-4">
//                 <label className="mb-2 block text-xs font-extrabold text-gray-700">
//                   Your Goal
//                 </label>

//                 <div className="grid grid-cols-3 gap-2">
//                   {goalOptions.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = goal === item.id;

//                     return (
//                       <button
//                         key={item.id}
//                         type="button"
//                         onClick={() => {
//                           setGoal(item.id);
//                           setCalculated(false);
//                         }}
//                         className={`relative flex flex-col items-center rounded-xl border p-2 text-center transition ${
//                           isActive
//                             ? "border-green-500 bg-green-50 text-green-800 shadow-sm"
//                             : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
//                         }`}
//                       >
//                         {isActive && (
//                           <CheckCircle2
//                             size={15}
//                             className="absolute right-1 top-1 text-green-600"
//                           />
//                         )}

//                         <Icon
//                           size={23}
//                           className={`mb-1 ${
//                             item.id === "lose"
//                               ? "text-orange-500"
//                               : "text-green-700"
//                           }`}
//                         />

//                         <span className="text-xs font-extrabold">
//                           {item.label}
//                         </span>

//                         <span className="mt-0.5 text-[10px] leading-tight">
//                           {item.description}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Activity */}
//             {profile === "Adult" && (
//               <div className="mt-4">
//                 <label className="mb-2 block text-xs font-extrabold text-gray-700">
//                   Activity Level
//                 </label>

//                 <div className="grid grid-cols-1 gap-1.5">
//                   {activityOptions.map((item) => (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => {
//                         setActivity(item.id);
//                         setCalculated(false);
//                       }}
//                       className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition ${
//                         activity === item.id
//                           ? "border-green-500 bg-green-50"
//                           : "border-gray-200 bg-white hover:bg-green-50/60"
//                       }`}
//                     >
//                       <span
//                         className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
//                           activity === item.id
//                             ? "border-green-700"
//                             : "border-gray-400"
//                         }`}
//                       >
//                         {activity === item.id && (
//                           <span className="h-2 w-2 rounded-full bg-green-700" />
//                         )}
//                       </span>

//                       <span className="min-w-0">
//                         <span className="block text-xs font-bold text-gray-800">
//                           {item.label}
//                         </span>
//                         <span className="block text-[10px] text-gray-500">
//                           {item.description}
//                         </span>
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Calculate Button */}
//             <button
//               type="button"
//               onClick={handleCalculate}
//               className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-700 to-green-600 px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:from-green-800 hover:to-green-700 hover:shadow-lg"
//             >
//               <Calculator size={17} />
//               Calculate My Protein Need
//               <ArrowRight size={16} />
//             </button>

//             {/* Results */}
//             {calculated && (
//               <div className="mt-4 space-y-3">
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="rounded-2xl bg-[#EAF7E8] p-3 text-center">
//                     <p className="text-xs font-bold text-green-800">
//                       Daily Protein Need
//                     </p>
//                     <p className="mt-1 text-2xl font-black text-[#103B27]">
//                       {proteinNeed} g
//                     </p>
//                     <p className="text-[11px] text-gray-600">per day</p>
//                   </div>

//                   <div className="rounded-2xl bg-orange-50 p-3 text-center">
//                     <p className="text-xs font-bold text-orange-800">Your BMI</p>
//                     <p className="mt-1 text-2xl font-black text-gray-900">
//                       {bmi.toFixed(1)}
//                     </p>
//                     <span
//                       className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-bold ${bmiColor(bmi)}`}
//                     >
//                       {bmiLabel(bmi)}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="rounded-2xl bg-green-50 p-3">
//                   <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#103B27]">
//                     <CheckCircle2 size={18} className="text-green-700" />
//                     Your Personalized Recommendation
//                   </h3>

//                   <ul className="mt-2 space-y-1.5 text-xs text-gray-700">
//                     <li>✓ Aim for approximately {proteinNeed}g protein per day.</li>
//                     <li>✓ Spread your protein intake across meals.</li>
//                     <li>✓ Include a variety of protein-rich foods.</li>
//                   </ul>

//                   {healthyWeightRange && (
//                     <p className="mt-2 text-xs text-gray-600">
//                       Estimated healthy weight range:{" "}
//                       <strong>{healthyWeightRange} kg</strong>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* =================================================
//               RIGHT: COMMUNITY PROMO
//           ================================================= */}
//           <div className="flex flex-col items-center justify-center rounded-2xl bg-white/70 p-4 text-center lg:bg-transparent lg:p-2">
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
//               <Users size={34} className="text-green-700" />
//             </div>

//             <h3 className="mt-3 text-lg font-extrabold leading-tight text-[#103B27] sm:text-xl">
//               Join people on the same journey.
//             </h3>

//             <p className="mt-2 text-sm leading-relaxed text-gray-600">
//               Get your protein goal and be part of a growing community focused on
//               better health.
//             </p>

//             <div className="mt-4 flex -space-x-3">
//               {[
//                 "https://i.pravatar.cc/80?img=12",
//                 "https://i.pravatar.cc/80?img=47",
//                 "https://i.pravatar.cc/80?img=11",
//                 "https://i.pravatar.cc/80?img=68",
//               ].map((src) => (
//                 <img
//                   key={src}
//                   src={src}
//                   alt="Protein Club member"
//                   className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
//                 />
//               ))}
//             </div>

//             <p className="mt-2 text-xs font-bold text-green-800">
//               Growing together, eating better
//             </p>

//             <a
//               href="#protein-club"
//               className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-green-700 hover:text-green-900"
//             >
//               Explore Protein Club
//               <ArrowRight size={16} />
//             </a>

//             <div className="mt-5 hidden w-full max-w-[230px] lg:block">
//               <svg
//                 viewBox="0 0 220 65"
//                 fill="none"
//                 className="w-full"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M205 8 C160 10, 105 20, 30 45"
//                   stroke="#43B84F"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeDasharray="5 5"
//                 />
//                 <path
//                   d="M31 45 L43 36 M31 45 L45 49"
//                   stroke="#43B84F"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* =================================================
//             FAMILY PROFILES
//         ================================================= */}
//         <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
//           <div className="flex flex-wrap items-center justify-between gap-2">
//             <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#103B27] sm:text-xl">
//               <Users className="text-green-700" size={23} />
//               Family Profiles
//             </h3>

//             <button
//               type="button"
//               onClick={() => setNewMemberOpen((prev) => !prev)}
//               className="inline-flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-900"
//             >
//               {newMemberOpen ? "Close" : "Manage Family"}
//               <ArrowRight size={16} />
//             </button>
//           </div>

//           {/* Family member cards */}
//           <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
//             {/* Current user */}
//             <div className="flex flex-col items-center rounded-2xl border border-green-200 bg-green-50/70 p-3 text-center">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-200 text-green-800">
//                 <UserRound size={26} />
//               </div>

//               <p className="mt-2 text-sm font-extrabold text-gray-900">You</p>
//               <p className="text-lg font-black text-green-800">
//                 {calculated ? proteinNeed : "--"} g/day
//               </p>
//               <p className="text-xs text-gray-600">
//                 {calculated ? profile : "Calculate first"}
//               </p>
//             </div>

//             {family.map((member) => (
//               <div
//                 key={member.name}
//                 className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-3 text-center transition hover:border-green-300 hover:shadow-sm"
//               >
//                 <img
//                   src={member.avatar}
//                   alt={member.name}
//                   className="h-14 w-14 rounded-full object-cover"
//                 />

//                 <p className="mt-2 text-sm font-extrabold text-gray-900">
//                   {member.name}
//                 </p>
//                 <p className="text-lg font-black text-green-800">
//                   {member.protein} g/day
//                 </p>
//                 <p className="text-xs text-gray-600">{member.goal}</p>
//               </div>
//             ))}

//             {/* Add member */}
//             <button
//               type="button"
//               onClick={() => setNewMemberOpen((prev) => !prev)}
//               className="flex min-h-[145px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-3 text-center transition hover:border-green-400 hover:bg-green-50"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
//                 <Plus size={25} />
//               </div>

//               <p className="mt-2 text-sm font-extrabold text-green-800">
//                 Add Member
//               </p>
//             </button>
//           </div>

//           {/* Add member form */}
//           {newMemberOpen && (
//             <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4">
//               <h4 className="text-sm font-extrabold text-green-900">
//                 Add a Family Member
//               </h4>

//               <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
//                 <input
//                   type="text"
//                   value={memberName}
//                   onChange={(e) => setMemberName(e.target.value)}
//                   placeholder="Member name"
//                   className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500"
//                 />

//                 <input
//                   type="number"
//                   value={memberWeight}
//                   onChange={(e) => setMemberWeight(e.target.value)}
//                   placeholder={`Weight (${weightUnit})`}
//                   className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={handleAddMember}
//                   className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-green-800"
//                 >
//                   Save Member
//                 </button>
//               </div>

//               <p className="mt-2 text-xs text-gray-500">
//                 Family members are currently saved locally in this component only.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }