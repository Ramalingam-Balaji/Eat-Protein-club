// // src/pages/ProteinClub/CommunityDetails.jsx

// import React, { useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";

// import {
//   Home,
//   ChevronRight,
//   Users,
//   MessageSquare,
//   Trophy,
//   BookOpen,
//   Info,
//   ShieldCheck,
//   CalendarDays,
//   CheckCircle2,
//   Circle,
//   ArrowRight,
//   Camera,
//   Video,
//   BarChart3,
//   FileText,
//   Send,
//   Heart,
//   Share2,
//   MoreHorizontal,
//   Pin,
//   Dumbbell,
//   Target,
//   Salad,
//   Crown,
//   ChevronRight as RightIcon,
// } from "lucide-react";

// import { communities } from "./data/communities";
// import {
//   communityPosts,
//   defaultCommunityPosts,
// } from "./data/communityPosts";

// // --------------------------------------------------
// // SMALL REUSABLE COMPONENTS
// // --------------------------------------------------

// function Stat({ icon: Icon, value, label, color }) {
//   return (
//     <div className="flex items-center gap-2 border-r border-green-200 px-3 last:border-0 sm:px-5">
//       <Icon size={27} className={color} />
//       <div>
//         <p className="text-lg font-black text-gray-900 sm:text-xl">{value}</p>
//         <p className="text-xs text-gray-700">{label}</p>
//       </div>
//     </div>
//   );
// }

// function CommunityTab({ active, icon: Icon, label, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex min-w-fit items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition ${
//         active
//           ? "bg-green-700 text-white shadow-sm"
//           : "text-gray-700 hover:bg-green-50"
//       }`}
//     >
//       <Icon size={18} />
//       {label}
//     </button>
//   );
// }

// function Panel({ children, className = "" }) {
//   return (
//     <div
//       className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function PanelHeading({ icon: Icon, title, color = "text-green-600" }) {
//   return (
//     <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-gray-900">
//       {Icon && <Icon size={22} className={color} />}
//       {title}
//     </h2>
//   );
// }

// // --------------------------------------------------
// // COMMUNITY HERO
// // --------------------------------------------------

// function CommunityHero({ community }) {
//   return (
//     <section className="overflow-hidden bg-[#EFF8EC]">
//       <div className="mx-auto max-w-[1500px] px-4 pb-5 pt-4 sm:px-6">
//         {/* Breadcrumbs */}
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-600">
//           <Link to="/" className="text-green-800 hover:text-green-600">
//             <Home size={18} />
//           </Link>

//           <ChevronRight size={18} />

//           <Link to="/protein-club" className="hover:text-green-700">
//             Protein Club
//           </Link>

//           <ChevronRight size={18} />

//           <Link
//             to="/protein-club/communities"
//             className="hover:text-green-700"
//           >
//             Communities
//           </Link>

//           <ChevronRight size={18} />

//           <span className="font-bold text-gray-900">{community.title}</span>
//         </div>

//         <div className="grid items-center gap-5 lg:grid-cols-12">
//           {/* Hero image */}
//           <div className="relative order-2 h-[220px] overflow-hidden rounded-2xl lg:order-1 lg:col-span-3 lg:h-[225px]">
//             <img
//               src={community.heroImage}
//               alt={community.title}
//               className="h-full w-full object-cover"
//             />
//           </div>

//           {/* Community info */}
//           <div className="order-1 lg:order-2 lg:col-span-6">
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#DDF3D8] px-4 py-2 text-sm font-bold text-[#175D27]">
//               <Users size={17} />
//               {community.badge}
//             </div>

//             <h1 className="text-3xl font-black leading-tight text-[#063D27] sm:text-4xl">
//               {community.title}
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700 sm:text-base">
//               {community.description}
//             </p>

//             <div className="mt-5 flex flex-wrap gap-y-3">
//               <Stat
//                 icon={Users}
//                 value={community.members}
//                 label="Members"
//                 color="text-green-600"
//               />
//               <Stat
//                 icon={MessageSquare}
//                 value={community.discussions}
//                 label="Discussions"
//                 color="text-green-600"
//               />
//               <Stat
//                 icon={Trophy}
//                 value={community.challenges}
//                 label="Active Challenges"
//                 color="text-amber-500"
//               />
//             </div>
//           </div>

//           {/* Benefits */}
//           <div className="order-3 lg:col-span-3">
//             <div className="space-y-2.5">
//               {community.benefits.map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-2.5 text-sm font-semibold text-gray-800"
//                 >
//                   <CheckCircle2
//                     size={19}
//                     className="shrink-0 fill-green-600 text-white"
//                   />
//                   {benefit}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // --------------------------------------------------
// // COMMUNITY NAVIGATION
// // --------------------------------------------------

// function CommunityNavigation({ activeTab, setActiveTab }) {
//   const tabs = [
//     { label: "Community Home", icon: Home },
//     { label: "Discussions", icon: MessageSquare },
//     { label: "Challenges", icon: Target },
//     { label: "Resources", icon: BookOpen },
//     { label: "Members", icon: Users },
//     { label: "About", icon: Info },
//   ];

//   return (
//     <div className="sticky top-[70px] z-30 border-b border-gray-100 bg-white/95 px-3 py-3 backdrop-blur-md sm:px-5">
//       <div className="mx-auto flex max-w-[1000px] gap-3.5 overflow-x-auto rounded-full border border-gray-200 bg-gray-50 p-1.5 scrollbar-hide">
//         {tabs.map((tab) => (
//           <CommunityTab
//             key={tab.label}
//             label={tab.label}
//             icon={tab.icon}
//             active={activeTab === tab.label}
//            onClick={() => {
//   setActiveTab(tab.label);

//   const sectionMap = {
//     "Community Home": "community-feed",
//     Discussions: "community-discussions",
//     Challenges: "community-challenges",
//     Resources: "community-resources",
//     Members: "community-members",
//     About: "community-about",
//   };

//   document.getElementById(sectionMap[tab.label])?.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//   });
// }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // --------------------------------------------------
// // ABOUT SIDEBAR
// // --------------------------------------------------

// function AboutCommunity({ community }) {
//   return (
//     <div className="space-y-4">
//       <Panel>
//         <PanelHeading icon={Users} title="About This Community" />

//         <p className="text-sm leading-6 text-gray-700">{community.about}</p>

//         <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
//           <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
//             <CheckCircle2 className="fill-green-600 text-white" size={19} />
//             {community.badge}
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <CalendarDays size={18} className="text-green-600" />
//             Started: {community.started}
//           </div>

//           <div className="flex items-center gap-2 text-sm text-gray-700">
//             <Users size={18} className="text-green-600" />
//             {community.members} Members
//           </div>
//         </div>

//         <button
//           onClick={() => alert("Community guidelines will be opened here.")}
//           className="mt-4 flex items-center gap-1 text-sm font-bold text-green-800 hover:text-green-600"
//         >
//           Community Guidelines <ArrowRight size={16} />
//         </button>
//       </Panel>

//       <Panel>
//         <PanelHeading icon={ShieldCheck} title="Community Moderators" />

//         {community.moderators?.length > 0 ? (
//           <div className="space-y-3">
//             {community.moderators.map((person, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
//               >
//                 <img
//                   src={person.avatar}
//                   alt={person.name}
//                   className="h-12 w-12 rounded-full object-cover"
//                 />

//                 <div>
//                   <p className="text-sm font-bold text-gray-900">
//                     {person.name}
//                   </p>
//                   <span className="mt-1 inline-block rounded-full bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700">
//                     {person.role}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">
//             Community moderators will be displayed here.
//           </p>
//         )}
//       </Panel>

//       <Panel className="overflow-hidden bg-gradient-to-br from-[#F0F9EC] to-white">
//         <PanelHeading
//           icon={Trophy}
//           title="Join the 21-Day Challenge"
//           color="text-amber-500"
//         />

//         <p className="text-sm leading-5 text-gray-700">
//           Build a healthy protein habit with our guided community challenge.
//         </p>

//         <button
//           onClick={() => alert("Challenge joining will be connected soon.")}
//           className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:shadow-md"
//         >
//           Join Challenge <ArrowRight size={16} />
//         </button>
//       </Panel>
//     </div>
//   );
// }

// // --------------------------------------------------
// // POST COMPOSER
// // --------------------------------------------------

// function PostComposer({ onPost }) {
//   const [text, setText] = useState("");

//   return (
//     <Panel>
//       <div className="flex gap-3">
//         <img
//           src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
//           alt="Your profile"
//           className="h-11 w-11 rounded-full object-cover"
//         />

//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Share a question, progress, tip or meal..."
//           rows={2}
//           className="min-h-[54px] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
//         />
//       </div>

//       <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => alert("Photo upload can be connected to your API.")}
//             className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
//           >
//             <Camera size={16} className="text-green-600" /> Photo
//           </button>

//           <button
//             onClick={() => alert("Video upload can be connected to your API.")}
//             className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
//           >
//             <Video size={16} className="text-purple-500" /> Video
//           </button>

//           <button
//             onClick={() => alert("Poll creation will be implemented next.")}
//             className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
//           >
//             <BarChart3 size={16} className="text-orange-500" /> Poll
//           </button>

//           <button
//             onClick={() => alert("Document attachment will be connected.")}
//             className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
//           >
//             <FileText size={16} className="text-blue-500" /> Document
//           </button>
//         </div>

//         <button
//           disabled={!text.trim()}
//           onClick={() => {
//             onPost(text);
//             setText("");
//           }}
//           className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
//         >
//           <Send size={15} /> Post
//         </button>
//       </div>
//     </Panel>
//   );
// }

// // --------------------------------------------------
// // PINNED CHALLENGE
// // --------------------------------------------------

// function PinnedChallenge({ community }) {
//   return (
//     <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-[#EFF8EC] to-white p-4 sm:p-5">
//       <div className="mb-3 flex items-center gap-2 text-sm font-bold text-green-800">
//         <Pin size={17} className="fill-green-600" />
//         Pinned by Moderators
//       </div>

//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
//           <CalendarDays size={27} className="text-orange-500" />
//         </div>

//         <div className="flex-1">
//           <h3 className="text-base font-extrabold text-gray-900">
//             21-Day {community.goal} Challenge — Join Now!
//           </h3>
//           <p className="mt-1 text-xs leading-5 text-gray-600">
//             Build a consistent protein routine, follow a simple workout plan and
//             see real progress in 21 days.
//           </p>
//         </div>

//         <button
//           onClick={() => alert("You can connect challenge enrollment here.")}
//           className="inline-flex shrink-0 items-center gap-2 rounded-full border border-green-700 px-4 py-2 text-xs font-bold text-green-800 hover:bg-green-50"
//         >
//           Join Challenge <ArrowRight size={15} />
//         </button>
//       </div>
//     </div>
//   );
// }

// // --------------------------------------------------
// // POST CARD
// // --------------------------------------------------

// function PostCard({ post }) {
//   const [liked, setLiked] = useState(false);

//   return (
//     <Panel className="overflow-hidden p-4 sm:p-5">
//       {/* Post author */}
//       <div className="flex items-center gap-3">
//         <img
//           src={post.avatar}
//           alt={post.user}
//           className="h-11 w-11 rounded-full object-cover"
//         />

//         <div className="min-w-0 flex-1">
//           <div className="flex flex-wrap items-center gap-2">
//             <h3 className="text-sm font-extrabold text-gray-900">
//               {post.user}
//             </h3>

//             {post.role === "Protein Leader" && (
//               <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-800">
//                 <CheckCircle2 size={12} /> Protein Leader
//               </span>
//             )}
//           </div>

//           <p className="mt-0.5 text-xs text-gray-500">{post.time}</p>
//         </div>

//         <button
//           className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
//           aria-label="Post menu"
//         >
//           <MoreHorizontal size={19} />
//         </button>
//       </div>

//       {/* Post content */}
//       <div className="mt-3 flex flex-col gap-3 sm:flex-row">
//         <div className="min-w-0 flex-1">
//           <p className="whitespace-pre-line text-sm leading-6 text-gray-800">
//             {post.text}
//           </p>

//           {post.tags?.length > 0 && (
//             <div className="mt-3 flex flex-wrap gap-1.5">
//               {post.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-800"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {post.image && (
//           <img
//             src={post.image}
//             alt="Community post"
//             className="h-36 w-full rounded-xl object-cover sm:h-32 sm:w-40"
//           />
//         )}
//       </div>

//       {/* Actions */}
//       <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-gray-100 pt-3">
//         <button
//           onClick={() => setLiked(!liked)}
//           className={`flex items-center gap-1.5 text-sm font-bold ${
//             liked ? "text-red-500" : "text-gray-600"
//           }`}
//         >
//           <Heart size={17} className={liked ? "fill-red-500" : ""} />
//           {post.likes + (liked ? 1 : 0)}
//         </button>

//         <button
//           onClick={() => alert("Comments section can be opened here.")}
//           className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-700"
//         >
//           <MessageSquare size={17} />
//           {post.comments}
//         </button>

//         <button
//           onClick={() => alert("Share functionality will be connected.")}
//           className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-700"
//         >
//           <Share2 size={17} /> Share
//         </button>
//       </div>
//     </Panel>
//   );
// }

// // --------------------------------------------------
// // COMMUNITY PROGRESS
// // --------------------------------------------------

// function CommunityProgress() {
//   return (
//     <Panel>
//       <PanelHeading icon={Users} title="My Community Progress" />

//       <div className="flex flex-col items-center gap-4 sm:flex-row">
//         <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[12px] border-green-100">
//           <div className="absolute inset-[-12px] rounded-full border-[12px] border-green-600 border-b-transparent border-l-transparent rotate-45" />

//           <div className="text-center">
//             <p className="text-xs font-bold text-gray-600">Day</p>
//             <p className="text-2xl font-black text-gray-900">7/21</p>
//           </div>
//         </div>

//         <div className="space-y-2 text-sm">
//           <p className="flex items-center gap-2 text-gray-800">
//             <CheckCircle2 size={17} className="fill-green-600 text-white" />
//             Challenge Joined
//           </p>
//           <p className="flex items-center gap-2 text-gray-800">
//             <CheckCircle2 size={17} className="fill-green-600 text-white" />
//             3/7 Days Completed
//           </p>
//           <p className="flex items-center gap-2 text-gray-500">
//             <Circle size={17} /> 14 Days Remaining
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={() => alert("Your challenge dashboard will open here.")}
//         className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 hover:bg-green-50"
//       >
//         View My Challenge <ArrowRight size={16} />
//       </button>
//     </Panel>
//   );
// }

// // --------------------------------------------------
// // ACTIVE CHALLENGES
// // --------------------------------------------------

// function ActiveChallenges({ community }) {
//   const iconMap = {
//     calendar: CalendarDays,
//     dumbbell: Dumbbell,
//     meal: Salad,
//   };

//   return (
//     <Panel>
//       <PanelHeading
//         icon={Target}
//         title={`Active Challenges (${community.activeChallenges.length || 3})`}
//         color="text-orange-500"
//       />

//       <div className="divide-y divide-gray-100">
//         {community.activeChallenges.length > 0 ? (
//           community.activeChallenges.map((challenge, index) => {
//             const Icon = iconMap[challenge.icon] || Target;

//             return (
//               <button
//                 key={index}
//                 onClick={() => alert(`${challenge.title} details coming soon.`)}
//                 className="flex w-full items-center gap-3 py-3 text-left hover:bg-green-50/60"
//               >
//                 <div
//                   className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
//                     challenge.color === "orange"
//                       ? "bg-orange-50 text-orange-500"
//                       : challenge.color === "yellow"
//                       ? "bg-yellow-50 text-yellow-600"
//                       : "bg-green-50 text-green-600"
//                   }`}
//                 >
//                   <Icon size={21} />
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="text-sm font-bold text-gray-900">
//                     {challenge.title}
//                   </p>
//                   <p className="mt-1 text-xs text-gray-500">
//                     {challenge.participants}
//                   </p>
//                 </div>

//                 <RightIcon size={17} className="text-gray-500" />
//               </button>
//             );
//           })
//         ) : (
//           <p className="py-3 text-sm text-gray-500">
//             New challenges will be available soon.
//           </p>
//         )}
//       </div>
//     </Panel>
//   );
// }

// // --------------------------------------------------
// // TOP CONTRIBUTORS
// // --------------------------------------------------

// function TopContributors() {
//   const contributors = [
//     {
//       name: "Priya M.",
//       points: "2,450 pts",
//       avatar:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
//     },
//     {
//       name: "Rohit S.",
//       points: "1,980 pts",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
//     },
//     {
//       name: "Suresh K.",
//       points: "1,760 pts",
//       avatar:
//         "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
//     },
//   ];

//   return (
//     <Panel>
//       <PanelHeading
//         icon={Trophy}
//         title="Top Contributors (This Week)"
//         color="text-amber-500"
//       />

//       <div className="space-y-3">
//         {contributors.map((person, index) => (
//           <div key={index} className="flex items-center gap-3">
//             <span className="w-6 text-lg font-black text-amber-500">
//               {index + 1}
//             </span>

//             <img
//               src={person.avatar}
//               alt={person.name}
//               className="h-10 w-10 rounded-full object-cover"
//             />

//             <p className="flex-1 text-sm font-bold text-gray-900">
//               {person.name}
//             </p>

//             <p className="text-xs font-bold text-gray-700">{person.points}</p>
//           </div>
//         ))}
//       </div>

//       <Link
//   to="/protein-club/leaderboard-rewards"
//   className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-50 hover:shadow-sm"
// >
//   View Leaderboard
//   <ArrowRight size={16} />
// </Link>
//     </Panel>
//   );
// }

// // --------------------------------------------------
// // POSTS FILTER
// // --------------------------------------------------

// function FeedFilters({ selected, setSelected }) {
//   const filters = ["All Posts", "Questions", "Progress", "Tips", "Recipes", "Workouts"];

//   return (
//     <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
//       {filters.map((filter) => (
//         <button
//           key={filter}
//           onClick={() => setSelected(filter)}
//           className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
//             selected === filter
//               ? "bg-green-700 text-white"
//               : "border border-gray-200 bg-white text-gray-700 hover:bg-green-50"
//           }`}
//         >
//           {filter}
//         </button>
//       ))}
//     </div>
//   );
// }

// // --------------------------------------------------
// // MAIN COMMUNITY DETAILS PAGE
// // --------------------------------------------------

// export default function CommunityDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const community = communities.find((item) => item.slug === slug);

//   const [activeTab, setActiveTab] = useState("Community Home");
//   const [feedFilter, setFeedFilter] = useState("All Posts");
//   const [posts, setPosts] = useState([]);
//   const [joined, setJoined] = useState(false);

//   // If URL slug is invalid
//   if (!community) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
//         <h1 className="text-2xl font-black text-[#063D27]">
//           Community not found
//         </h1>

//         <p className="mt-2 text-gray-600">
//           This community may not exist or the link may be incorrect.
//         </p>

//         <button
//           onClick={() => navigate("/protein-club/communities")}
//           className="mt-5 rounded-full bg-green-700 px-6 py-3 font-bold text-white"
//         >
//           Back to Communities
//         </button>
//       </div>
//     );
//   }

//   const basePosts = communityPosts[community.slug] || defaultCommunityPosts;
//   const allPosts = [...posts, ...basePosts];

//   const visiblePosts =
//     feedFilter === "All Posts"
//       ? allPosts
//       : allPosts.filter((post) => post.category === feedFilter);

//   const handlePost = (text) => {
//     const newPost = {
//       id: Date.now(),
//       user: "You",
//       role: "Member",
//       time: "Just now",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
//       category: "Progress",
//       text,
//       tags: [],
//       likes: 0,
//       comments: 0,
//     };

//     setPosts((previous) => [newPost, ...previous]);
//     setFeedFilter("All Posts");
//   };

//   return (
//     <main className="min-h-screen bg-[#F7FAF6] text-gray-900">
//       {/* Hero */}
//       <CommunityHero community={community} />

//       {/* Community Tabs */}
//       <CommunityNavigation
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {/* Main 3 column layout */}
//       <div
//         id="community-feed"
//         className="mx-auto max-w-[1500px] scroll-mt-36 px-3 py-5 sm:px-5 lg:px-6"
//       >
//         <div className="grid items-start gap-4 xl:grid-cols-[250px_minmax(0,1fr)_305px]">
//           {/* LEFT SIDEBAR */}
//           <aside
//   id="community-about"
//   className="scroll-mt-36 space-y-4"
// >
//   <AboutCommunity community={community} />
// </aside>

//           {/* CENTER FEED */}
//           <section className="min-w-0 space-y-4">
//             <div id="community-discussions" className="scroll-mt-36">
//   <PostComposer onPost={handlePost} />
// </div>

//             <div id="community-challenges" className="scroll-mt-36">
//   <PinnedChallenge community={community} />
// </div>

//             <FeedFilters
//               selected={feedFilter}
//               setSelected={setFeedFilter}
//             />

//             <div id="community-resources" className="scroll-mt-36">
//   <Panel>
//     <PanelHeading icon={BookOpen} title="Community Resources" />

//     <p className="text-sm text-gray-600">
//       Protein guides, recipes, workout tips and helpful community resources
//       will be available here.
//     </p>
//   </Panel>
// </div>

//             {visiblePosts.length > 0 ? (
//               visiblePosts.map((post) => (
//                 <PostCard key={post.id} post={post} />
//               ))
//             ) : (
//               <Panel className="py-12 text-center">
//                 <MessageSquare
//                   size={35}
//                   className="mx-auto mb-3 text-gray-400"
//                 />
//                 <h3 className="font-bold text-gray-800">No posts in this category</h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Be the first to share something with your community!
//                 </p>
//               </Panel>
//             )}
//           </section>

//           {/* RIGHT SIDEBAR */}
//           <aside className="space-y-4">
//             <CommunityProgress />

//             <ActiveChallenges community={community} />

//             <TopContributors />
//             <div id="community-members" className="scroll-mt-36">
//   <Panel>
//     <PanelHeading icon={Users} title="Community Members" />

//     <p className="text-sm text-gray-600">
//       Connect with members who share the same goals.
//     </p>

//     <button
//       onClick={() => alert("Member directory will be connected later.")}
//       className="mt-3 w-full rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 hover:bg-green-50"
//     >
//       Explore Members →
//     </button>
//   </Panel>
// </div>
//           </aside>
//         </div>
//       </div>

//       {/* Join community bottom floating CTA on mobile */}
//       {!joined && (
//         <div className="fixed bottom-4 left-4 right-4 z-40 xl:hidden">
//           <button
//             onClick={() => setJoined(true)}
//             className="w-full rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 text-sm font-extrabold text-white shadow-xl"
//           >
//             Join {community.shortTitle} Community
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

import {
  Home,
  ChevronRight,
  Users,
  MessageSquare,
  Trophy,
  BookOpen,
  Info,
  ShieldCheck,
  CalendarDays,
  CheckCircle2,
  Circle,
  ArrowRight,
  Camera,
  Video,
  BarChart3,
  FileText,
  Send,
  Heart,
  Share2,
  MoreHorizontal,
  Pin,
  Dumbbell,
   Phone,
  Target,
  Salad,
} from "lucide-react";

import { communities } from "./data/communities";
import {
  communityPosts,
  defaultCommunityPosts,
} from "./data/communityPosts";

// ======================================================
// REUSABLE COMPONENTS
// ======================================================

function Stat({ icon: Icon, value, label, color }) {
  return (
    <div className="flex items-center gap-2 border-r border-green-200 px-3 last:border-0 sm:px-5">
      <Icon size={27} className={color} />
      <div>
        <p className="text-lg font-black text-gray-900 sm:text-xl">{value}</p>
        <p className="text-xs text-gray-700">{label}</p>
      </div>
    </div>
  );
}

function CommunityTab({ active, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-fit items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-green-700 text-white shadow-sm"
          : "text-gray-700 hover:bg-green-50"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function PanelHeading({ icon: Icon, title, color = "text-green-600" }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-gray-900">
      {Icon && <Icon size={22} className={color} />}
      {title}
    </h2>
  );
}

// ======================================================
// COMMUNITY HERO
// ======================================================

function CommunityHero({ community }) {
  return (
    <section className="overflow-hidden bg-[#EFF8EC]">
      <div className="mx-auto max-w-[1500px] px-4 pb-5 pt-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-600">
          <Link to="/" className="text-green-800 hover:text-green-600">
            <Home size={18} />
          </Link>

          <ChevronRight size={18} />

          <Link to="/protein-club" className="hover:text-green-700">
            Protein Club
          </Link>

          <ChevronRight size={18} />

          <Link to="/protein-club/communities" className="hover:text-green-700">
            Communities
          </Link>

          <ChevronRight size={18} />

          <span className="font-bold text-gray-900">{community.title}</span>
        </div>

        <div className="grid items-center gap-5 lg:grid-cols-12">
          {/* Hero Image */}
          <div className="relative order-2 h-[220px] overflow-hidden rounded-2xl lg:order-1 lg:col-span-3 lg:h-[225px]">
            <img
              src={community.heroImage}
              alt={community.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Community Information */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#DDF3D8] px-4 py-2 text-sm font-bold text-[#175D27]">
              <Users size={17} />
              {community.badge}
            </div>

            <h1 className="text-3xl font-black leading-tight text-[#063D27] sm:text-4xl">
              {community.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700 sm:text-base">
              {community.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-y-3">
              <Stat
                icon={Users}
                value={community.members}
                label="Members"
                color="text-green-600"
              />

              <Stat
                icon={MessageSquare}
                value={community.discussions}
                label="Discussions"
                color="text-green-600"
              />

              <Stat
                icon={Trophy}
                value={community.challenges}
                label="Active Challenges"
                color="text-amber-500"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="order-3 lg:col-span-3">
            <div className="space-y-2.5">
              {community.benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-sm font-semibold text-gray-800"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 fill-green-600 text-white"
                  />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================
// COMMUNITY NAVIGATION
// ======================================================

function CommunityNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { label: "Community Home", icon: Home, target: "community-feed" },
    { label: "Discussions", icon: MessageSquare, target: "community-discussions" },
    { label: "Challenges", icon: Target, target: "community-challenges" },
    { label: "Resources", icon: BookOpen, target: "community-resources" },
    { label: "Members", icon: Users, target: "community-members" },
    { label: "About", icon: Info, target: "community-about" },
  ];

  return (
    <div className="sticky top-[70px] z-30 border-b border-gray-100 bg-white/95 px-3 py-3 backdrop-blur-md sm:px-5">
      <div className="mx-auto flex max-w-[1000px] gap-3.5 overflow-x-auto rounded-full border border-gray-200 bg-gray-50 p-1.5 scrollbar-hide">
        {tabs.map((tab) => (
          <CommunityTab
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.label}
            onClick={() => {
              setActiveTab(tab.label);
              document.getElementById(tab.target)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ======================================================
// OTP LOGIN MODAL
// ======================================================


function ChallengeLoginModal({ onClose, onLoginSuccess, onRegister }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const recaptchaRef = useRef(null);

  // ==========================================
  // CLEANUP RECAPTCHA
  // ==========================================
  const clearRecaptcha = () => {
    try {
      recaptchaRef.current?.clear();
    } catch (err) {
      console.warn("reCAPTCHA cleanup error:", err);
    }

    recaptchaRef.current = null;

    const container = document.getElementById("challenge-recaptcha");

    if (container) {
      container.innerHTML = "";
    }
  };

  useEffect(() => {
    return () => clearRecaptcha();
  }, []);

  // ==========================================
  // CREATE RECAPTCHA
  // ==========================================
  const createRecaptcha = () => {
    if (recaptchaRef.current) {
      return recaptchaRef.current;
    }

    const container = document.getElementById("challenge-recaptcha");

    if (!container) {
      throw new Error("reCAPTCHA container not found.");
    }

    container.innerHTML = "";

    const verifier = new RecaptchaVerifier(auth, container, {
      size: "invisible",

      callback: () => {
        setError("");
      },

      "expired-callback": () => {
        setError("Verification expired. Please try again.");
      },
    });

    recaptchaRef.current = verifier;

    return verifier;
  };

  // ==========================================
  // SEND OTP
  // ==========================================
  const sendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const verifier = createRecaptcha();

      const result = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        verifier
      );

      setConfirmationResult(result);
      setOtp("");
      setError("");

    } catch (err) {
      console.error("OTP sending error:", err);

      if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else if (err.code === "auth/invalid-phone-number") {
        setError("Invalid mobile number. Please check and try again.");
      } else {
        setError(err.message || "Unable to send OTP. Please try again.");
      }

      clearRecaptcha();

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP + CHECK PROTEIN CLUB MEMBER
  // ==========================================
  const verifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!confirmationResult) {
      setError("Please request an OTP first.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (loading) return;

    setLoading(true);

    let verifiedUser = null;
    let verifiedMobile = "";

    // ------------------------------------------
    // STEP 1: VERIFY PHONE OTP
    // ------------------------------------------
    try {
      const credential = await confirmationResult.confirm(otp);

      verifiedUser = credential.user;

      verifiedMobile =
        verifiedUser.phoneNumber || `+91${mobile}`;

      console.log("Phone OTP verified successfully.");
      console.log("Firebase UID:", verifiedUser.uid);

    } catch (err) {
      console.error("OTP verification error:", err);

      if (err.code === "auth/invalid-verification-code") {
        setError("Incorrect OTP. Please enter the correct code.");
      } else if (err.code === "auth/code-expired") {
        setError("OTP expired. Please request a new OTP.");
        setConfirmationResult(null);
      } else {
        setError(err.message || "OTP verification failed.");
      }

      setLoading(false);
      return;
    }

    // ------------------------------------------
    // STEP 2: CHECK FIRESTORE MEMBER RECORD
    // ------------------------------------------
    try {
      const memberQuery = query(
        collection(db, "proteinClubMembers"),
        where("mobile", "==", verifiedMobile)
      );

      const memberSnapshot = await getDocs(memberQuery);

      // ------------------------------------------
      // STEP 3: NEW MEMBER → REGISTRATION
      // ------------------------------------------
      if (memberSnapshot.empty) {
        console.log("No Protein Club member found.");

        onRegister(verifiedMobile);
        return;
      }

      // ------------------------------------------
      // STEP 4: EXISTING MEMBER → DASHBOARD
      // ------------------------------------------
      const memberData = memberSnapshot.docs[0].data();

      console.log("Existing Protein Club member found.");

      onLoginSuccess({
        uid: verifiedUser.uid,
        phone: verifiedMobile,
        member: memberData,
      });

    } catch (err) {
      console.error("Firestore member lookup error:", err);

      if (
        err.code === "permission-denied" ||
        err.code === "firestore/permission-denied"
      ) {
        setError(
          "Your mobile number is verified, but Firestore access is denied. Please check Firebase Security Rules."
        );
      } else {
        setError(
          "Your mobile number is verified, but we couldn't check your Protein Club membership. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CHANGE MOBILE NUMBER
  // ==========================================
  const changeMobile = () => {
    clearRecaptcha();

    setConfirmationResult(null);
    setOtp("");
    setError("");
  };

  // ==========================================
  // UI — KEEPING YOUR EXISTING DESIGN
  // ==========================================
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-3 py-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login modal"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
        >
          <span className="sr-only">Close</span>
          <ChevronRight className="rotate-180" size={18} />
        </button>

        {/* HEADER */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ShieldCheck size={30} />
          </div>

          <h2 className="text-2xl font-black text-green-900">
            Join Challenge
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue your protein journey.
          </p>
        </div>

        {/* ======================================
            MOBILE NUMBER FORM
        ====================================== */}
        {!confirmationResult ? (
          <form onSubmit={sendOTP} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                Mobile Number
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-green-600">
                <Phone size={18} className="text-gray-400" />

                <span className="border-r border-gray-200 pr-3 text-sm font-semibold text-gray-600">
                  +91
                </span>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="10-digit mobile number"
                  autoComplete="tel-national"
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full bg-transparent text-sm outline-none"
                  required
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="break-words rounded-xl bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div id="challenge-recaptcha" />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 font-extrabold text-white shadow-lg transition hover:from-green-800 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        ) : (
          /* ======================================
             OTP VERIFICATION FORM
          ====================================== */
          <form onSubmit={verifyOTP} className="space-y-4">
            <div className="rounded-xl bg-green-50 p-4 text-center">
              <p className="text-sm text-green-800">OTP sent to</p>

              <p className="mt-1 font-bold text-green-900">
                +91 {mobile}
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                Enter 6-Digit OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="------"
                className="w-full rounded-xl border border-gray-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-green-600"
                required
              />
            </div>

            {error && (
              <p
                role="alert"
                className="break-words rounded-xl bg-red-50 p-3 text-sm leading-5 text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-green-700 py-3.5 font-extrabold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              type="button"
              onClick={changeMobile}
              disabled={loading}
              className="w-full py-2 text-sm font-bold text-green-700 disabled:opacity-50"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-xs text-gray-400">
          Your mobile number will be verified securely.
        </p>
      </div>
    </div>
  );
}


// ======================================================
// ABOUT COMMUNITY
// ======================================================

function AboutCommunity({ community, onJoinChallenge }) {
  return (
    <div className="space-y-4">
      <Panel>
        <PanelHeading icon={Users} title="About This Community" />

        <p className="text-sm leading-6 text-gray-700">{community.about}</p>

        <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <CheckCircle2 size={19} className="fill-green-600 text-white" />
            {community.badge}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CalendarDays size={18} className="text-green-600" />
            Started: {community.started}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users size={18} className="text-green-600" />
            {community.members} Members
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Community guidelines will be opened here.")}
          className="mt-4 flex items-center gap-1 text-sm font-bold text-green-800 hover:text-green-600"
        >
          Community Guidelines <ArrowRight size={16} />
        </button>
      </Panel>

      <Panel>
        <PanelHeading icon={ShieldCheck} title="Community Moderators" />

        {community.moderators?.length > 0 ? (
          <div className="space-y-3">
            {community.moderators.map((person, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {person.name}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700">
                    {person.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Community moderators will be displayed here.
          </p>
        )}
      </Panel>

      <Panel className="overflow-hidden bg-gradient-to-br from-[#F0F9EC] to-white">
        <PanelHeading
          icon={Trophy}
          title="Join the 21-Day Challenge"
          color="text-amber-500"
        />

        <p className="text-sm leading-5 text-gray-700">
          Build a healthy protein habit with our guided community challenge.
        </p>

        <button
          type="button"
          onClick={onJoinChallenge}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:shadow-md"
        >
          Join Challenge <ArrowRight size={16} />
        </button>
      </Panel>
    </div>
  );
}

// ======================================================
// POST COMPOSER
// ======================================================

function PostComposer({ onPost }) {
  const [text, setText] = useState("");

  return (
    <Panel>
      <div className="flex gap-3">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
          alt="Your profile"
          className="h-11 w-11 rounded-full object-cover"
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a question, progress, tip or meal..."
          rows={2}
          className="min-h-[54px] flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:bg-white"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => alert("Photo upload can be connected to your API.")}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
          >
            <Camera size={16} className="text-green-600" /> Photo
          </button>

          <button
            type="button"
            onClick={() => alert("Video upload can be connected to your API.")}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
          >
            <Video size={16} className="text-purple-500" /> Video
          </button>

          <button
            type="button"
            onClick={() => alert("Poll creation will be implemented next.")}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
          >
            <BarChart3 size={16} className="text-orange-500" /> Poll
          </button>

          <button
            type="button"
            onClick={() => alert("Document attachment will be connected.")}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-green-50"
          >
            <FileText size={16} className="text-blue-500" /> Document
          </button>
        </div>

        <button
          type="button"
          disabled={!text.trim()}
          onClick={() => {
            onPost(text);
            setText("");
          }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-5 py-2.5 text-sm font-bold text-white transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={15} /> Post
        </button>
      </div>
    </Panel>
  );
}

// ======================================================
// PINNED CHALLENGE
// ======================================================

function PinnedChallenge({ community, onJoinChallenge }) {
  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-[#EFF8EC] to-white p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-green-800">
        <Pin size={17} className="fill-green-600" />
        Pinned by Moderators
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
          <CalendarDays size={27} className="text-orange-500" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-extrabold text-gray-900">
            21-Day {community.goal} Challenge — Join Now!
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-600">
            Build a consistent protein routine, follow a simple workout plan and
            see real progress in 21 days.
          </p>
        </div>

        <button
          type="button"
          onClick={onJoinChallenge}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-green-700 px-4 py-2 text-xs font-bold text-green-800 hover:bg-green-50"
        >
          Join Challenge <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ======================================================
// POST CARD
// ======================================================

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <Panel className="overflow-hidden p-4 sm:p-5">
      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={post.avatar}
          alt={post.user}
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-extrabold text-gray-900">{post.user}</h3>

            {post.role === "Protein Leader" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-800">
                <CheckCircle2 size={12} /> Protein Leader
              </span>
            )}
          </div>

          <p className="mt-0.5 text-xs text-gray-500">{post.time}</p>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Post menu"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      {/* Post content */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="min-w-0 flex-1">
          <p className="whitespace-pre-line text-sm leading-6 text-gray-800">
            {post.text}
          </p>

          {post.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.image && (
          <img
            src={post.image}
            alt="Community post"
            className="h-36 w-full rounded-xl object-cover sm:h-32 sm:w-40"
          />
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 text-sm font-bold ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
        >
          <Heart size={17} className={liked ? "fill-red-500" : ""} />
          {post.likes + (liked ? 1 : 0)}
        </button>

        <button
          type="button"
          onClick={() => alert("Comments section can be opened here.")}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-700"
        >
          <MessageSquare size={17} />
          {post.comments}
        </button>

        <button
          type="button"
          onClick={() => alert("Share functionality will be connected.")}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-700"
        >
          <Share2 size={17} /> Share
        </button>
      </div>
    </Panel>
  );
}

// ======================================================
// COMMUNITY PROGRESS
// ======================================================

function CommunityProgress({ onJoinChallenge }) {
  return (
    <Panel>
      <PanelHeading icon={Users} title="My Community Progress" />

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[12px] border-green-100">
          <div className="absolute inset-[-12px] rotate-45 rounded-full border-[12px] border-green-600 border-b-transparent border-l-transparent" />

          <div className="text-center">
            <p className="text-xs font-bold text-gray-600">Day</p>
            <p className="text-2xl font-black text-gray-900">7/21</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-gray-800">
            <CheckCircle2 size={17} className="fill-green-600 text-white" />
            Challenge Joined
          </p>

          <p className="flex items-center gap-2 text-gray-800">
            <CheckCircle2 size={17} className="fill-green-600 text-white" />
            3/7 Days Completed
          </p>

          <p className="flex items-center gap-2 text-gray-500">
            <Circle size={17} /> 14 Days Remaining
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onJoinChallenge}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 hover:bg-green-50"
      >
        View My Challenge <ArrowRight size={16} />
      </button>
    </Panel>
  );
}

// ======================================================
// ACTIVE CHALLENGES
// ======================================================

function ActiveChallenges({ community, onJoinChallenge }) {
  const iconMap = {
    calendar: CalendarDays,
    dumbbell: Dumbbell,
    meal: Salad,
  };

  return (
    <Panel>
      <PanelHeading
        icon={Target}
        title={`Active Challenges (${community.activeChallenges?.length || 0})`}
        color="text-orange-500"
      />

      <div className="divide-y divide-gray-100">
        {community.activeChallenges?.length > 0 ? (
          community.activeChallenges.map((challenge, index) => {
            const Icon = iconMap[challenge.icon] || Target;

            return (
              <button
                type="button"
                key={index}
                onClick={onJoinChallenge}
                className="flex w-full items-center gap-3 py-3 text-left hover:bg-green-50/60"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    challenge.color === "orange"
                      ? "bg-orange-50 text-orange-500"
                      : challenge.color === "yellow"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900">{challenge.title}</p>
                  <p className="mt-1 text-xs text-gray-500">{challenge.participants}</p>
                </div>

                <ArrowRight size={17} className="text-gray-500" />
              </button>
            );
          })
        ) : (
          <p className="py-3 text-sm text-gray-500">
            New challenges will be available soon.
          </p>
        )}
      </div>
    </Panel>
  );
}

// ======================================================
// TOP CONTRIBUTORS
// ======================================================

function TopContributors() {
  const contributors = [
    {
      name: "Priya M.",
      points: "2,450 pts",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Rohit S.",
      points: "1,980 pts",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    {
      name: "Suresh K.",
      points: "1,760 pts",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <Panel>
      <PanelHeading
        icon={Trophy}
        title="Top Contributors (This Week)"
        color="text-amber-500"
      />

      <div className="space-y-3">
        {contributors.map((person, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-6 text-lg font-black text-amber-500">
              {index + 1}
            </span>

            <img
              src={person.avatar}
              alt={person.name}
              className="h-10 w-10 rounded-full object-cover"
            />

            <p className="flex-1 text-sm font-bold text-gray-900">{person.name}</p>

            <p className="text-xs font-bold text-gray-700">{person.points}</p>
          </div>
        ))}
      </div>

      <Link
        to="/protein-club/leaderboard-rewards"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 transition hover:bg-green-50 hover:shadow-sm"
      >
        View Leaderboard
        <ArrowRight size={16} />
      </Link>
    </Panel>
  );
}

// ======================================================
// FEED FILTERS
// ======================================================

function FeedFilters({ selected, setSelected }) {
  const filters = ["All Posts", "Questions", "Progress", "Tips", "Recipes", "Workouts"];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          onClick={() => setSelected(filter)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
            selected === filter
              ? "bg-green-700 text-white"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-green-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

// ======================================================
// MAIN COMMUNITY DETAILS PAGE
// ======================================================

export default function CommunityDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const community = communities.find((item) => item.slug === slug);

  const [activeTab, setActiveTab] = useState("Community Home");
  const [feedFilter, setFeedFilter] = useState("All Posts");
  const [posts, setPosts] = useState([]);
  const [joined, setJoined] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Invalid slug handling
  if (!community) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-black text-[#063D27]">
          Community not found
        </h1>

        <p className="mt-2 text-gray-600">
          This community may not exist or the link may be incorrect.
        </p>

        <button
          type="button"
          onClick={() => navigate("/protein-club/communities")}
          className="mt-5 rounded-full bg-green-700 px-6 py-3 font-bold text-white"
        >
          Back to Communities
        </button>
      </div>
    );
  }

  const basePosts = communityPosts?.[community.slug] || defaultCommunityPosts;
  const allPosts = [...posts, ...basePosts];

  const visiblePosts =
    feedFilter === "All Posts"
      ? allPosts
      : allPosts.filter((post) => post.category === feedFilter);

  // Add a new post
  const handlePost = (text) => {
    const newPost = {
      id: Date.now(),
      user: "You",
      role: "Member",
      time: "Just now",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      category: "Progress",
      text,
      tags: [],
      likes: 0,
      comments: 0,
    };

    setPosts((previous) => [newPost, ...previous]);
    setFeedFilter("All Posts");
  };

  // Open login modal from challenge buttons
  const handleJoinChallenge = () => {
    setShowLogin(true);
  };

  // Existing member: navigate to dashboard
  const handleLoginSuccess = (loginData) => {
    setShowLogin(false);

    navigate("/protein-club/my-club", {
      state: {
        member: loginData.member,
        user: {
          uid: loginData.uid,
          phone: loginData.phone,
        },
        community: {
          slug: community.slug,
          title: community.title,
          shortTitle: community.shortTitle,
        },
        challenge: {
          title: `21-Day ${community.goal} Challenge`,
        },
      },
    });
  };

  // New member: navigate to registration page
  const handleRegister = (verifiedMobile) => {
    setShowLogin(false);

    navigate("/protein-club", {
      state: {
        mobile: verifiedMobile,
        fromChallenge: true,
        community: community.slug,
        challengeTitle: `21-Day ${community.goal} Challenge`,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#F7FAF6] text-gray-900">
      {/* HERO */}
      <CommunityHero community={community} />

      {/* COMMUNITY TABS */}
      <CommunityNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* PAGE CONTENT */}
      <div
        id="community-feed"
        className="mx-auto max-w-[1500px] scroll-mt-36 px-3 py-5 sm:px-5 lg:px-6"
      >
        <div className="grid items-start gap-4 xl:grid-cols-[250px_minmax(0,1fr)_305px]">
          {/* LEFT SIDEBAR */}
          <aside
            id="community-about"
            className="scroll-mt-36 space-y-4"
          >
            <AboutCommunity
              community={community}
              onJoinChallenge={handleJoinChallenge}
            />
          </aside>

          {/* CENTER FEED */}
          <section className="min-w-0 space-y-4">
            {/* Post composer */}
            <div id="community-discussions" className="scroll-mt-36">
              <PostComposer onPost={handlePost} />
            </div>

            {/* Pinned challenge */}
            <div id="community-challenges" className="scroll-mt-36">
              <PinnedChallenge
                community={community}
                onJoinChallenge={handleJoinChallenge}
              />
            </div>

            {/* Filters */}
            <FeedFilters
              selected={feedFilter}
              setSelected={setFeedFilter}
            />

            {/* Resources */}
            <div id="community-resources" className="scroll-mt-36">
              <Panel>
                <PanelHeading icon={BookOpen} title="Community Resources" />

                <p className="text-sm text-gray-600">
                  Protein guides, recipes, workout tips and helpful community
                  resources will be available here.
                </p>
              </Panel>
            </div>

            {/* Posts */}
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Panel className="py-12 text-center">
                <MessageSquare
                  size={35}
                  className="mx-auto mb-3 text-gray-400"
                />

                <h3 className="font-bold text-gray-800">
                  No posts in this category
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Be the first to share something with your community!
                </p>
              </Panel>
            )}
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            <CommunityProgress onJoinChallenge={handleJoinChallenge} />

            <ActiveChallenges
              community={community}
              onJoinChallenge={handleJoinChallenge}
            />

            <TopContributors />

            <div id="community-members" className="scroll-mt-36">
              <Panel>
                <PanelHeading icon={Users} title="Community Members" />

                <p className="text-sm text-gray-600">
                  Connect with members who share the same goals.
                </p>

                <button
                  type="button"
                  onClick={handleJoinChallenge}
                  className="mt-3 w-full rounded-full border border-green-700 py-2.5 text-sm font-bold text-green-800 hover:bg-green-50"
                >
                  Explore Members →
                </button>
              </Panel>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE JOIN BUTTON */}
      {!joined && (
        <div className="fixed bottom-4 left-4 right-4 z-40 xl:hidden">
          <button
            type="button"
            onClick={handleJoinChallenge}
            className="w-full rounded-full bg-gradient-to-r from-green-700 to-green-600 py-3.5 text-sm font-extrabold text-white shadow-xl"
          >
            Join {community.shortTitle} Community
          </button>
        </div>
      )}

      {/* OTP LOGIN MODAL */}
      {showLogin && (
        <ChallengeLoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegister={handleRegister}
        />
      )}
    </main>
  );
}