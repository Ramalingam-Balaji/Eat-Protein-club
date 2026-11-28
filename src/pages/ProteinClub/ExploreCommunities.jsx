// import { communities } from "./data/communities";
// import React, { useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import {
//   Home,
//   ChevronRight,
//   Search,
//   ShieldCheck,
//   Target,
//   Users,
//   Leaf,
//   MapPin,
//   RotateCcw,
//   ArrowRight,
//   MessageCircle,
//   Lightbulb,
//   ClipboardList,
//   Crown,
//   Dumbbell,
//   Heart,
//   Apple,
//   Activity,
//   Baby,
//   Salad,
//   Egg,
//   X,
//   ChevronDown,
//   Flame,
//   Trophy,
// } from "lucide-react";

// // --------------------------------------------------
// // COMMUNITY DATA
// // --------------------------------------------------

// // const communities = [
// //   {
// //     id: 1,
// //     slug: "build-muscle",
// //     title: "Build Muscle Community",
// //     members: "4,820",
// //     description:
// //       "Muscle gain, high-protein diets, workouts and expert guidance.",
// //     image:
// //       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Build Muscle",
// //     diet: ["Any", "Non-Vegetarian", "Egg & Dairy"],
// //     stage: ["Adults", "50+ Senior"],
// //     type: "Goal Based",
// //     location: "India",
// //   },
// //   {
// //     id: 2,
// //     slug: "weight-management",
// //     title: "Weight Management Community",
// //     members: "3,962",
// //     description:
// //       "Healthy weight loss, fat loss, diet plans and habit building.",
// //     image:
// //       "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Lose Fat",
// //     diet: ["Any", "Vegetarian", "Vegan"],
// //     stage: ["Adults", "Women"],
// //     type: "Goal Based",
// //     location: "India",
// //   },
// //   {
// //     id: 3,
// //     slug: "family-nutrition",
// //     title: "Family Nutrition Community",
// //     members: "3,410",
// //     description:
// //       "Better protein, balanced meals and healthy habits for the whole family.",
// //     image:
// //       "https://images.unsplash.com/photo-1511895426328-dc8714193e1d?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Family Nutrition",
// //     diet: ["Any", "Vegetarian", "Egg & Dairy"],
// //     stage: ["Adults", "Kids (4–12 yrs)", "Women"],
// //     type: "Life Stage",
// //     location: "India",
// //   },
// //   {
// //     id: 4,
// //     slug: "women-protein",
// //     title: "Women's Protein Community",
// //     members: "2,608",
// //     description:
// //       "Nutrition for women's health, PCOS, hormones, fitness and more.",
// //     image:
// //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Improve Health",
// //     diet: ["Any", "Vegetarian", "Vegan"],
// //     stage: ["Women", "Pregnant / Feeding"],
// //     type: "Life Stage",
// //     location: "India",
// //   },
// //   {
// //     id: 5,
// //     slug: "kids-nutrition",
// //     title: "Kids Nutrition Community",
// //     members: "1,980",
// //     description:
// //       "Protein-rich foods, healthy growth and immunity for kids.",
// //     image:
// //       "https://images.unsplash.com/photo-1503919005314-30d3b8d2b8d3?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Family Nutrition",
// //     diet: ["Any", "Vegetarian", "Egg & Dairy"],
// //     stage: ["Kids (4–12 yrs)"],
// //     type: "Life Stage",
// //     location: "India",
// //   },
// //   {
// //     id: 6,
// //     slug: "healthy-living-50",
// //     title: "50+ Healthy Living Community",
// //     members: "1,756",
// //     description:
// //       "Stay fit, strong and active with the right protein and nutrition.",
// //     image:
// //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Stay Active",
// //     diet: ["Any", "Vegetarian", "Egg & Dairy"],
// //     stage: ["50+ Senior"],
// //     type: "Life Stage",
// //     location: "India",
// //   },
// //   {
// //     id: 7,
// //     slug: "vegetarian-protein",
// //     title: "Vegetarian Protein Community",
// //     members: "2,890",
// //     description:
// //       "High-protein vegetarian foods, recipes and meal ideas.",
// //     image:
// //       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Eat More Protein",
// //     diet: ["Vegetarian", "Vegan"],
// //     stage: ["Adults", "Women", "Kids (4–12 yrs)"],
// //     type: "Diet Type",
// //     location: "India",
// //   },
// //   {
// //     id: 8,
// //     slug: "egg-dairy",
// //     title: "Egg & Dairy Community",
// //     members: "2,430",
// //     description:
// //       "Daily protein from eggs, milk and dairy for a stronger you.",
// //     image:
// //       "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Eat More Protein",
// //     diet: ["Egg & Dairy", "Vegetarian"],
// //     stage: ["Adults", "Kids (4–12 yrs)"],
// //     type: "Diet Type",
// //     location: "India",
// //   },
// //   {
// //     id: 9,
// //     slug: "vizag-protein",
// //     title: "Vizag Protein Community",
// //     members: "2,540",
// //     description:
// //       "Local community for Vizag meetups, events and challenges.",
// //     image:
// //       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
// //     official: false,
// //     goal: "Stay Active",
// //     diet: ["Any"],
// //     stage: ["Adults", "Women", "50+ Senior"],
// //     type: "Local",
// //     location: "Vizag",
// //   },
// //   {
// //     id: 10,
// //     slug: "healthy-protein",
// //     title: "Healthy Protein Community",
// //     members: "1,620",
// //     description:
// //       "Simple everyday food choices to improve your health and protein intake.",
// //     image:
// //       "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
// //     official: true,
// //     goal: "Improve Health",
// //     diet: ["Any", "Vegetarian", "Non-Vegetarian"],
// //     stage: ["Adults", "Women", "50+ Senior"],
// //     type: "Goal Based",
// //     location: "India",
// //   },
// // ];

// const discussions = [
//   {
//     title: "High-protein breakfast ideas for busy mornings?",
//     comments: 128,
//     image:
//       "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80",
//   },
//   {
//     title: "How to reach 100g protein daily?",
//     comments: 96,
//     image:
//       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80",
//   },
//   {
//     title: "Protein-rich food options for kids (4–8 years)",
//     comments: 72,
//     image:
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
//   },
//   {
//     title: "Eggs daily – how many are safe?",
//     comments: 64,
//     image:
//       "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80",
//   },
// ];

// // --------------------------------------------------
// // FILTER DATA
// // --------------------------------------------------

// const filterGroups = [
//   {
//     title: "Community Type",
//     key: "communityType",
//     options: ["All Communities", "EatProtein Official", "Local Community"],
//   },
//   {
//     title: "Your Goal",
//     key: "goal",
//     options: [
//       "Build Muscle",
//       "Lose Fat",
//       "Improve Health",
//       "Family Nutrition",
//       "Eat More Protein",
//       "Stay Active",
//     ],
//   },
//   {
//     title: "Diet Preference",
//     key: "diet",
//     options: ["Any", "Vegetarian", "Non-Vegetarian", "Egg & Dairy", "Vegan"],
//   },
//   {
//     title: "Life Stage",
//     key: "stage",
//     options: ["Adults", "Kids (4–12 yrs)", "Women", "Pregnant / Feeding", "50+ Senior"],
//   },
// ];

// // --------------------------------------------------
// // HELPERS
// // --------------------------------------------------

// function SectionTitle({ title, action, onAction }) {
//   return (
//     <div className="mb-4 flex items-center justify-between gap-3">
//       <h2 className="text-lg font-extrabold text-[#063D27] sm:text-xl">
//         {title}
//       </h2>
//       {action && (
//         <button
//           onClick={onAction}
//           className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900 sm:text-sm"
//         >
//           {action} <ArrowRight size={16} />
//         </button>
//       )}
//     </div>
//   );
// }

// function FilterAccordion({ title, options, selected, onChange }) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="border-b border-gray-100 py-4">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex w-full items-center justify-between text-left"
//       >
//         <span className="text-sm font-extrabold text-gray-800">{title}</span>
//         <ChevronDown
//           size={17}
//           className={`transition-transform ${open ? "rotate-180" : ""}`}
//         />
//       </button>

//       {open && (
//         <div className="mt-3 space-y-2.5">
//           {options.map((option) => (
//             <label
//               key={option}
//               className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-700 hover:text-green-800"
//             >
//               <input
//                 type="checkbox"
//                 checked={selected.includes(option)}
//                 onChange={() => onChange(option)}
//                 className="h-4 w-4 accent-green-700"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function CommunityCard({ community }) {
//   const navigate = useNavigate();

//   return (
//     <article className="group flex min-h-[190px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[210px] sm:p-4">
//       <div className="flex flex-1 gap-3">
//         {/* Community Image */}
//         <div className="h-[132px] w-[105px] shrink-0 overflow-hidden rounded-xl sm:h-[145px] sm:w-[115px]">
//           <img
//             src={community.image}
//             alt={community.title}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//           />
//         </div>

//         {/* Community Info */}
//         <div className="flex min-w-0 flex-1 flex-col">
//           <div className="mb-1">
//             {community.official ? (
//               <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-800">
//                 <ShieldCheck size={12} /> Official
//               </span>
//             ) : (
//               <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-[10px] font-bold text-teal-800">
//                 <Users size={12} /> Community
//               </span>
//             )}
//           </div>

//           <h3 className="text-sm font-extrabold leading-4 text-gray-900 sm:text-base">
//             {community.title}
//           </h3>

//           <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
//             <Users size={14} />
//             {community.members} members
//           </div>

//           <p className="mt-2 line-clamp-3 text-xs leading-4 text-gray-600">
//             {community.description}
//           </p>

//           <button
//             onClick={() => navigate(`/protein-club/community/${community.slug}`)}
//             className="mt-auto inline-flex items-center justify-center gap-1 self-start rounded-full bg-gradient-to-r from-green-700 to-green-600 px-3 py-2 text-xs font-bold text-white transition hover:from-green-800 hover:to-green-700 sm:mt-3"
//           >
//             View Community <ArrowRight size={14} />
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

// // --------------------------------------------------
// // SUGGEST COMMUNITY MODAL
// // --------------------------------------------------

// function SuggestCommunityModal({ open, onClose }) {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     goal: "",
//     email: "",
//   });

//   if (!open) return null;

//   const update = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = (e) => {
//     e.preventDefault();

//     // Frontend demo: connect this to your API later
//     alert("Thank you! Your community suggestion has been submitted.");
//     setForm({ name: "", description: "", goal: "", email: "" });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-5">
//       <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
//         <div className="flex items-center justify-between bg-[#EFF8EC] px-5 py-4">
//           <div>
//             <h2 className="text-xl font-extrabold text-[#063D27]">
//               Suggest a Community
//             </h2>
//             <p className="mt-1 text-xs text-gray-600">
//               Tell us what community you would like to see.
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-full p-2 text-gray-600 hover:bg-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={submit} className="space-y-4 p-5">
//           <div>
//             <label className="mb-1 block text-sm font-bold text-gray-700">
//               Community Name
//             </label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={update}
//               required
//               placeholder="e.g. Marathon Runners Protein Club"
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm font-bold text-gray-700">
//               Community Goal
//             </label>
//             <select
//               name="goal"
//               value={form.goal}
//               onChange={update}
//               required
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
//             >
//               <option value="">Choose a goal</option>
//               <option>Build Muscle</option>
//               <option>Lose Fat</option>
//               <option>Improve Health</option>
//               <option>Family Nutrition</option>
//               <option>Eat More Protein</option>
//               <option>Stay Active</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="mb-1 block text-sm font-bold text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={update}
//               required
//               rows={3}
//               placeholder="What is this community about?"
//               className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm font-bold text-gray-700">
//               Email
//             </label>
//             <input
//               name="email"
//               value={form.email}
//               onChange={update}
//               type="email"
//               required
//               placeholder="Your email address"
//               className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
//             />
//           </div>

//           <button
//             type="submit"
//             className="flex w-full items-center justify-center gap-2 rounded-full bg-green-700 py-3 font-bold text-white hover:bg-green-800"
//           >
//             Submit Suggestion <ArrowRight size={17} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // --------------------------------------------------
// // HERO
// // --------------------------------------------------

// function ExploreHero() {
//   return (
//     <section className="overflow-hidden bg-[#EFF8EC]">
//       <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-5 pb-7 pt-5 lg:grid-cols-12 lg:px-8">
//         {/* Breadcrumb */}
//         <div className="lg:col-span-12">
//           <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
//             <Link to="/" className="text-green-800 hover:text-green-600">
//               <Home size={18} />
//             </Link>
//             <ChevronRight size={18} />
//             <Link to="/protein-club" className="text-green-800 hover:underline">
//               Protein Club
//             </Link>
//             <ChevronRight size={18} />
//             <span className="text-gray-800">Explore Communities</span>
//           </div>
//         </div>

//         {/* Text */}
//         <div className="lg:col-span-5">
//           <h1 className="text-3xl font-black leading-tight text-[#063D27] sm:text-4xl lg:text-[42px]">
//             Explore Protein{" "}
//             <span className="text-green-700">Communities</span>
//           </h1>

//           <p className="mt-3 max-w-md text-sm leading-6 text-gray-700 sm:text-base">
//             Find your people, share, learn and grow together on your protein
//             journey.
//           </p>

//           <div className="mt-6 grid grid-cols-3 divide-x divide-green-200">
//             {[
//               { icon: Users, number: "12,482", label: "Members", color: "text-green-600" },
//               { icon: Flame, number: "2,341", label: "Active Challengers", color: "text-orange-500" },
//               { icon: Trophy, number: "18,650", label: "Goals Completed", color: "text-amber-500" },
//             ].map((stat, i) => (
//               <div key={i} className="px-2 first:pl-0">
//                 <div className="flex items-center gap-1.5">
//                   <stat.icon className={stat.color} size={25} />
//                   <span className="text-lg font-black text-gray-900">{stat.number}</span>
//                 </div>
//                 <p className="mt-1 text-xs font-medium text-gray-700">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Image */}
//         <div className="relative lg:col-span-7">
//           <div className="absolute bottom-0 left-4 right-4 top-8 rounded-[50%] bg-[#CDEEBF]" />
//           <img
//             src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
//             alt="Protein community members"
//             className="relative h-[270px] w-full rounded-2xl object-cover object-center sm:h-[340px]"
//           />
//           <div className="absolute -right-1 top-3 rotate-3 text-base font-bold leading-6 text-green-900 sm:right-2 sm:top-5 sm:text-xl">
//             Same Goals
//             <br />
//             Better Habits
//             <br />
//             Stronger
//             <br />
//             Together
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // --------------------------------------------------
// // MAIN EXPLORE COMMUNITIES PAGE
// // --------------------------------------------------

// export default function ExploreCommunities() {
//   const [activeTab, setActiveTab] = useState("All Communities");
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({
//     communityType: [],
//     goal: [],
//     diet: [],
//     stage: [],
//   });
//   const [page, setPage] = useState(1);
//   const [suggestOpen, setSuggestOpen] = useState(false);

//   const itemsPerPage = 9;

//   const tabs = [
//     { label: "All Communities", icon: Users },
//     { label: "EatProtein Official", icon: ShieldCheck },
//     { label: "Goal Based", icon: Target },
//     { label: "Life Stage", icon: Users },
//     { label: "Diet Type", icon: Leaf },
//     { label: "Local", icon: MapPin },
//   ];

//   // Toggle selected checkbox filters
//   const toggleFilter = (group, value) => {
//     setFilters((prev) => {
//       const current = prev[group];
//       return {
//         ...prev,
//         [group]: current.includes(value)
//           ? current.filter((item) => item !== value)
//           : [...current, value],
//       };
//     });
//     setPage(1);
//   };

//   // Clear all selected filters
//   const clearFilters = () => {
//     setFilters({
//       communityType: [],
//       goal: [],
//       diet: [],
//       stage: [],
//     });
//     setSearch("");
//     setActiveTab("All Communities");
//     setPage(1);
//   };

//   // Filter community cards
//   const filteredCommunities = useMemo(() => {
//     return communities.filter((community) => {
//       const matchesSearch =
//         community.title.toLowerCase().includes(search.toLowerCase()) ||
//         community.description.toLowerCase().includes(search.toLowerCase()) ||
//         community.goal.toLowerCase().includes(search.toLowerCase()) ||
//         community.location.toLowerCase().includes(search.toLowerCase());

//       const matchesTab =
//         activeTab === "All Communities" ||
//         (activeTab === "EatProtein Official" && community.official) ||
//         community.type === activeTab;

//       const matchesType =
//         filters.communityType.length === 0 ||
//         filters.communityType.some((filter) => {
//           if (filter === "All Communities") return true;
//           if (filter === "EatProtein Official") return community.official;
//           if (filter === "Local Community") return !community.official;
//           return true;
//         });

//       const matchesGoal =
//         filters.goal.length === 0 || filters.goal.includes(community.goal);

//       const matchesDiet =
//         filters.diet.length === 0 ||
//         filters.diet.some((diet) => community.diet.includes(diet));

//       const matchesStage =
//         filters.stage.length === 0 ||
//         filters.stage.some((stage) => community.stage.includes(stage));

//       return (
//         matchesSearch &&
//         matchesTab &&
//         matchesType &&
//         matchesGoal &&
//         matchesDiet &&
//         matchesStage
//       );
//     });
//   }, [search, activeTab, filters]);

//   const totalPages = Math.max(1, Math.ceil(filteredCommunities.length / itemsPerPage));

//   const paginatedCommunities = filteredCommunities.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const changeTab = (tab) => {
//     setActiveTab(tab);
//     setPage(1);
//   };

//   return (
//     <main className="min-h-screen bg-white text-gray-900">
//       <ExploreHero />

//       {/* Filter + Search Section */}
//       <section className="px-3 py-5 sm:px-5 lg:px-6">
//         <div className="mx-auto max-w-[1440px]">
//           {/* Desktop filter bar */}
//           <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center">
//             <h2 className="shrink-0 text-lg font-extrabold text-gray-900">
//               Filter Communities
//             </h2>

//             {/* Tabs */}
//             <div className="flex flex-1 flex-wrap items-center gap-3.5 rounded-2xl bg-gray-50 p-1.5">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.label}
//                   onClick={() => changeTab(tab.label)}
//                   className={`inline-flex items-center gap-3.5 rounded-full px-3 py-2 text-sm font-bold transition ${
//                     activeTab === tab.label
//                       ? "bg-green-100 text-green-900 shadow-sm"
//                       : "text-gray-600 hover:bg-white hover:text-green-800"
//                   }`}
//                 >
//                   <tab.icon size={18} />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Search */}
//             <div className="flex h-11 w-full items-center gap-2 rounded-full border border-gray-200 bg-white px-4 shadow-sm xl:max-w-[300px]">
//               <Search size={17} className="text-gray-500" />
//               <input
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 placeholder="Search communities (e.g. Muscle, Family, Vizag)"
//                 className="w-full bg-transparent text-xs outline-none"
//               />
//               {search && (
//                 <button onClick={() => setSearch("")} aria-label="Clear search">
//                   <X size={15} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Community grid + sidebar */}
//           <div className="grid gap-5 lg:grid-cols-[205px_minmax(0,1fr)]">
//             {/* Sidebar */}
//             <aside className="h-fit rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
//               {filterGroups.map((group) => (
//                 <FilterAccordion
//                   key={group.key}
//                   title={group.title}
//                   options={group.options}
//                   selected={filters[group.key]}
//                   onChange={(value) => toggleFilter(group.key, value)}
//                 />
//               ))}

//               <button
//                 onClick={clearFilters}
//                 className="mb-3 mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 bg-green-50 px-3 py-2.5 text-xs font-bold text-green-800 transition hover:bg-green-100"
//               >
//                 <RotateCcw size={14} />
//                 Clear Filters
//               </button>
//             </aside>

//             {/* Cards */}
//             <div className="min-w-0">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                 {paginatedCommunities.map((community) => (
//                   <CommunityCard key={community.id} community={community} />
//                 ))}
//               </div>

//               {/* Empty state */}
//               {paginatedCommunities.length === 0 && (
//                 <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-5 text-center">
//                   <Search className="mb-3 text-gray-400" size={36} />
//                   <h3 className="font-bold text-gray-800">No communities found</h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Try changing your search or filters.
//                   </p>
//                   <button
//                     onClick={clearFilters}
//                     className="mt-4 rounded-full bg-green-700 px-5 py-2 text-sm font-bold text-white"
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               )}

//               {/* Pagination */}
//               <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
//                 <p className="text-xs text-gray-600">
//                   Showing {filteredCommunities.length} of {communities.length} communities
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//                     disabled={page === 1}
//                     className="rounded-full border border-gray-200 px-3 py-2 text-sm disabled:opacity-40"
//                   >
//                     ‹
//                   </button>

//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                     <button
//                       key={number}
//                       onClick={() => setPage(number)}
//                       className={`h-9 w-9 rounded-full text-sm font-bold ${
//                         page === number
//                           ? "bg-green-700 text-white"
//                           : "border border-gray-200 bg-white text-gray-700 hover:bg-green-50"
//                       }`}
//                     >
//                       {number}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
//                     disabled={page === totalPages}
//                     className="rounded-full border border-gray-200 px-3 py-2 text-sm disabled:opacity-40"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setSuggestOpen(true)}
//                   className="inline-flex items-center gap-2 rounded-full border border-green-700 bg-green-50 px-4 py-2.5 text-xs font-bold text-green-800 transition hover:bg-green-100"
//                 >
//                   <Lightbulb size={15} />
//                   Suggest a Community
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Popular Discussions */}
//       <section className="px-3 pb-6 sm:px-5 lg:px-6">
//         <div className="mx-auto max-w-[1440px]">
//           <SectionTitle
//             title="Popular Discussions"
//             action="View All Discussions"
//             onAction={() => alert("Discussions page will be connected here.")}
//           />

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//             {discussions.map((discussion, i) => (
//               <button
//                 key={i}
//                 onClick={() => alert(`Opening discussion: ${discussion.title}`)}
//                 className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//               >
//                 <img
//                   src={discussion.image}
//                   alt=""
//                   className="h-[70px] w-[82px] shrink-0 rounded-xl object-cover"
//                 />
//                 <div className="min-w-0">
//                   <h3 className="line-clamp-2 text-sm font-extrabold leading-4 text-gray-900">
//                     {discussion.title}
//                   </h3>
//                   <p className="mt-2 flex items-center gap-1 text-xs text-gray-600">
//                     <MessageCircle size={14} />
//                     {discussion.comments} comments
//                   </p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bottom banners */}
//       <section className="px-3 pb-8 sm:px-5 lg:px-6">
//         <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-2">
//           {/* Suggest banner */}
//           <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#EFF8EC] p-5 sm:flex-row sm:p-6">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-100">
//               <Lightbulb size={37} className="text-yellow-500" />
//             </div>

//             <div className="flex-1">
//               <h2 className="text-xl font-extrabold text-[#063D27]">
//                 Can’t find your community?
//                 <br />
//                 Suggest a Community
//               </h2>
//               <p className="mt-2 text-xs leading-5 text-gray-600">
//                 Tell us what kind of protein community you’d like to see.
//               </p>
//               <Link
//   to="/protein-club/suggest-community"
//   className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-700 bg-white px-5 py-2.5 text-sm font-bold text-green-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md"
// >
//   <Lightbulb size={16} />
//   Suggest a Community
//   <ArrowRight size={15} />
// </Link>
//             </div>

//             <ClipboardList size={70} className="hidden shrink-0 text-green-600 sm:block" />
//           </div>

//           {/* Leader banner */}
//           <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#FFF3E3] p-5 sm:flex-row sm:items-center sm:p-6">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-100">
//               <Crown size={38} className="text-amber-500" />
//             </div>

//             <div className="relative z-10 flex-1">
//               <h2 className="text-xl font-extrabold text-[#783D16]">
//                 Become a Protein Leader
//               </h2>
//               <p className="mt-2 text-xs leading-5 text-gray-700">
//                 Help people build better protein habits, lead a community, get
//                 recognized, earn rewards and exclusive benefits.
//               </p>
//               <a
//                 href="/protein-club/leader-application"
//                 className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:shadow-md"
//               >
//                 Apply to be a Protein Leader <ArrowRight size={16} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modal */}
//       <SuggestCommunityModal
//         open={suggestOpen}
//         onClose={() => setSuggestOpen(false)}
//       />
//     </main>
    
//   );
// }
// export function CommunityDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const community = communities.find((item) => item.slug === slug);

//   if (!community) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Community not found
//         </h1>
//         <button
//           onClick={() => navigate("/protein-club/communities")}
//           className="mt-5 rounded-full bg-green-700 px-5 py-3 text-white"
//         >
//           Back to Communities
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F0F8EF] px-4 py-10">
//       <div className="mx-auto max-w-5xl">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-5 flex items-center gap-2 text-sm font-bold text-green-800"
//         >
//           ← Back to Communities
//         </button>

//         <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
//           <img
//             src={community.image}
//             alt={community.title}
//             className="h-64 w-full object-cover sm:h-80"
//           />

//           <div className="p-6 sm:p-10">
//             {community.official && (
//               <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
//                 <ShieldCheck size={15} /> EatProtein Official
//               </span>
//             )}

//             <h1 className="mt-4 text-3xl font-black text-[#063D27] sm:text-4xl">
//               {community.title}
//             </h1>

//             <p className="mt-3 text-gray-600">{community.description}</p>

//             <div className="mt-5 flex flex-wrap gap-3">
//               <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
//                 <Users className="mr-1 inline" size={16} />
//                 {community.members} Members
//               </span>
//               <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800">
//                 {community.goal}
//               </span>
//             </div>

//             <button
//               onClick={() => alert("Join community will be connected to your backend")}
//               className="mt-7 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-7 py-3 font-bold text-white shadow hover:shadow-lg"
//             >
//               Join Community <ArrowRight className="ml-2 inline" size={17} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useMemo, useState } from "react";
import {
  Search,
  Users,
  Dumbbell,
  Weight,
  Heart,
  UserRound,
  Baby,
  Leaf,
  Milk,
  Activity,
  MapPin,
  Target,
  Flame,
  ChevronDown,
  ArrowRight,
  Menu,
  Bell,
  Utensils,
} from "lucide-react";

const communities = [
  {
    title: "Build Muscle Community",
    description: "Build lean muscle with the right protein, workouts and recovery tips.",
    members: "4,280",
    category: "Goal",
    goal: "Build Muscle",
    lifeStage: "Adults",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-build-muscle.webp",
    icon: Dumbbell,
    iconColor: "text-green-700",
    iconBg: "bg-green-50",
  },
  {
    title: "Weight Management",
    description: "Manage your weight in a healthy and sustainable way with protein, nutrition and daily habits.",
    members: "3,960",
    category: "Goal",
    goal: "Lose Weight",
    lifeStage: "Adults",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-weight-management.webp",
    icon: Weight,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    title: "Family Nutrition",
    description: "Protein-rich meal ideas and healthy habits for the entire family.",
    members: "2,760",
    category: "Life Stage",
    goal: "Healthy Living",
    lifeStage: "Family",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-family-nutrition.webp",
    icon: Users,
    iconColor: "text-purple-700",
    iconBg: "bg-purple-50",
  },
  {
    title: "Women's Protein",
    description: "Right protein, better hormones, stronger bones and overall wellness for every stage of a woman's life.",
    members: "2,190",
    category: "Life Stage",
    goal: "Healthy Living",
    lifeStage: "Women",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-womens-protein.webp",
    icon: Heart,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
  },
  {
    title: "Kids Nutrition",
    description: "High-protein, tasty and balanced nutrition for your child's growth, strength and immunity.",
    members: "1,850",
    category: "Life Stage",
    goal: "Healthy Living",
    lifeStage: "Kids",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-kids-nutrition.webp",
    icon: Baby,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    title: "Vegetarian Protein",
    description: "Complete protein solutions for an active, healthy lifestyle on a vegetarian diet.",
    members: "2,640",
    category: "Diet Type",
    goal: "Healthy Living",
    lifeStage: "Adults",
    diet: "Vegetarian",
    location: "All Locations",
    image: "/assets/community-vegetarian-protein.webp",
    icon: Leaf,
    iconColor: "text-green-700",
    iconBg: "bg-green-50",
  },
  {
    title: "Egg & Dairy Community",
    description: "Make the most of high-quality protein from eggs and dairy for energy and daily nutrition.",
    members: "3,120",
    category: "Diet Type",
    goal: "Healthy Living",
    lifeStage: "Adults",
    diet: "Egg & Dairy",
    location: "All Locations",
    image: "/assets/community-egg-dairy.webp",
    icon: Milk,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    title: "50+ Healthy Living",
    description: "Stay strong, active and independent with the right protein, nutrition and lifestyle habits after 50.",
    members: "1,630",
    category: "Life Stage",
    goal: "Healthy Living",
    lifeStage: "50+",
    diet: "All Diets",
    location: "All Locations",
    image: "/assets/community-healthy-living-50.webp",
    icon: Heart,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
  {
    title: "Vizag Protein Community",
    description: "A local community for health and fitness enthusiasts in Visakhapatnam. Join, meet, learn and grow together.",
    members: "980",
    category: "Location",
    goal: "Healthy Living",
    lifeStage: "Adults",
    diet: "All Diets",
    location: "Vizag",
    image: "/assets/community-vizag.webp",
    icon: MapPin,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
];

function FilterDropdown({ icon: Icon, label, options, value, onChange }) {
  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-green-300 sm:px-4">
        <Icon className="h-5 w-5 shrink-0 text-green-700" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-full min-w-0 cursor-pointer appearance-none bg-transparent text-sm font-bold text-gray-800 outline-none"
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="h-4 w-4 shrink-0 text-gray-600 pointer-events-none" />
      </div>
    </div>
  );
}

function CommunityCard({ community }) {
  const Icon = community.icon;

  return (
    <article className="group grid min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:grid-cols-[40%_60%]">
      {/* Image */}
      <div className="relative min-h-[190px] overflow-hidden sm:min-h-[190px] lg:min-h-[205px]">
        <img
          src={community.image}
          alt={community.title}
          className="h-full min-h-[190px] w-full object-cover transition duration-500 group-hover:scale-105 sm:absolute sm:inset-0"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Image fallback */}
        <div className="absolute inset-0 -z-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50">
          <Icon className="h-16 w-16 text-green-700/30" />
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col justify-between p-3.5 sm:p-3.5 lg:p-4">
        <div>
          <div className="flex items-start gap-2.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${community.iconBg}`}
            >
              <Icon className={`h-5 w-5 ${community.iconColor}`} />
            </div>

            <h3 className="min-w-0 pt-1 text-base font-extrabold leading-snug text-gray-900 sm:text-[17px]">
              {community.title}
            </h3>
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-700">
            {community.description}
          </p>
        </div>

        {/* Members */}
        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-gray-900">
          <Users className="h-5 w-5 shrink-0 text-gray-700" />
          <span>{community.members} members</span>
        </div>

        {/* Button (UI only) */}
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-700 to-green-600 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:from-green-800 hover:to-green-700 active:scale-[0.98]"
        >
          Join Community
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function ExploreCommunities() {
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [diet, setDiet] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("Popular");

  const filteredCommunities = useMemo(() => {
    let result = communities.filter((community) => {
      const searchMatch =
        community.title.toLowerCase().includes(search.toLowerCase()) ||
        community.description.toLowerCase().includes(search.toLowerCase());

      const goalMatch = !goal || community.goal === goal;
      const lifeMatch = !lifeStage || community.lifeStage === lifeStage;
      const dietMatch = !diet || community.diet === diet;
      const locationMatch = !location || community.location === location;

      return searchMatch && goalMatch && lifeMatch && dietMatch && locationMatch;
    });

    if (sort === "Popular") {
      result = [...result].sort(
        (a, b) =>
          Number(b.members.replace(",", "")) - Number(a.members.replace(",", ""))
      );
    } else if (sort === "Newest") {
      result = [...result].reverse();
    }

    return result;
  }, [search, goal, lifeStage, diet, location, sort]);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* ===================================================
          HERO BANNER
      ==================================================== */}
      <section className="relative overflow-hidden bg-[#071D35]">
        {/* Background decorations */}
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-green-500/15 blur-3xl" />
        <div className="absolute right-[20%] bottom-0 h-48 w-48 rounded-full bg-green-700/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-4 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-8">
          {/* Banner text */}
          <div className="z-10">
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find your{" "}
              <span className="text-lime-400">protein community</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base lg:text-lg">
              Join like-minded people, get expert guidance, take challenges, share
              progress and stay motivated on your protein journey.
            </p>
          </div>

          {/* Banner image */}
          <div className="relative flex h-[180px] items-end justify-center sm:h-[230px] lg:h-[230px]">
            <div className="absolute bottom-0 right-10 h-40 w-64 rounded-t-full bg-gradient-to-br from-green-500 to-lime-400 opacity-90 sm:h-48 sm:w-80" />

            <img
              src="/assets/protein-community-banner.webp"
              alt="Protein Club community"
              className="relative z-10 max-h-full w-full object-contain object-bottom"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          SEARCH + FILTER BAR
      ==================================================== */}
      <section className="sticky top-0 z-20 border-b border-gray-100 bg-[#F7F9FC]/95 px-3 py-3 backdrop-blur-md sm:px-5 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100">
            <Search className="h-5 w-5 shrink-0 text-gray-700" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search communities..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-9 w-px bg-gray-200 lg:block" />

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-1 lg:gap-2">
            <FilterDropdown
              icon={Target}
              label="Goal"
              value={goal}
              onChange={setGoal}
              options={["Build Muscle", "Lose Weight", "Healthy Living"]}
            />

            <FilterDropdown
              icon={Users}
              label="Life Stage"
              value={lifeStage}
              onChange={setLifeStage}
              options={["Adults", "Women", "Kids", "Family", "50+"]}
            />

            <FilterDropdown
              icon={Utensils}
              label="Diet Type"
              value={diet}
              onChange={setDiet}
              options={["Vegetarian", "Egg & Dairy"]}
            />

            <FilterDropdown
              icon={MapPin}
              label="Location"
              value={location}
              onChange={setLocation}
              options={["Vizag"]}
            />

            <FilterDropdown
              icon={Flame}
              label="Popular"
              value={sort}
              onChange={setSort}
              options={["Popular", "Newest"]}
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          COMMUNITY GRID
      ==================================================== */}
      <section className="px-3 pb-8 pt-5 sm:px-5 sm:pt-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          {/* Result count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-600">
              Showing{" "}
              <span className="font-extrabold text-gray-900">
                {filteredCommunities.length}
              </span>{" "}
              communities
            </p>

            {(search || goal || lifeStage || diet || location) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setGoal("");
                  setLifeStage("");
                  setDiet("");
                  setLocation("");
                  setSort("Popular");
                }}
                className="text-sm font-bold text-green-700 hover:text-green-900"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredCommunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCommunities.map((community) => (
                <CommunityCard key={community.title} community={community} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white px-5 py-16 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-3 text-lg font-extrabold text-gray-900">
                No communities found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try another search term or change your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setGoal("");
                  setLifeStage("");
                  setDiet("");
                  setLocation("");
                }}
                className="mt-4 rounded-full bg-green-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}