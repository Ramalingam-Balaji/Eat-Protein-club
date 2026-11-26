
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Users,
//   Calculator,
//   Flame,
//   Trophy,
//   Gift,
//   CalendarDays,
//   Target,
//   HeartPulse,
//   Dumbbell,
//   Apple,
//   Footprints,
//   TrendingUp,
//   ShieldCheck,
//   Coins,
//   Truck,
//   Star,
//   ArrowRight,
//   CheckCircle2,
//   Zap,
//   ChartNoAxesColumnIncreasing,
//   Leaf,
//   Medal,
// } from "lucide-react";

// const GREEN = "#087C43";
// const ORANGE = "#F47716";

// const communityImages = {
//   muscle:
//     "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
//   weight:
//     "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
//   family:
//     "https://images.unsplash.com/photo-1511895426328-dc8714193e1d?auto=format&fit=crop&w=600&q=80",
//   veg:
//     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
//   vizag:
//     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
// };

// const goals = [
//   { title: "Build Muscle", icon: Dumbbell, color: "text-orange-500" },
//   { title: "Lose Fat", icon: TrendingUp, color: "text-green-600" },
//   { title: "Improve Health", icon: HeartPulse, color: "text-red-500" },
//   { title: "Family Nutrition", icon: Users, color: "text-purple-500" },
//   { title: "Eat More Protein", icon: Apple, color: "text-green-600" },
//   { title: "Stay Active", icon: Footprints, color: "text-blue-500" },
// ];

// const communities = [
//   {
//     title: "Build Muscle Community",
//     members: "4,820 members",
//     image: communityImages.muscle,
//     tag: "Official",
//   },
//   {
//     title: "Weight Management Community",
//     members: "3,962 members",
//     image: communityImages.weight,
//     tag: "Official",
//   },
//   {
//     title: "Family Nutrition Community",
//     members: "3,410 members",
//     image: communityImages.family,
//     tag: "Official",
//   },
//   {
//     title: "Vegetarian Protein Community",
//     members: "2,890 members",
//     image: communityImages.veg,
//     tag: "Official",
//   },
//   {
//     title: "Vizag Protein Community",
//     members: "2,540 members",
//     image: communityImages.vizag,
//     tag: "Community",
//   },
// ];

// const champions = [
//   { rank: 1, name: "Priya M.", points: "2,450 pts", color: "text-yellow-500" },
//   { rank: 2, name: "Rohit S.", points: "1,980 pts", color: "text-gray-400" },
//   { rank: 3, name: "Suresh K.", points: "1,760 pts", color: "text-orange-500" },
// ];

// const coinTasks = [
//   { icon: CalendarDays, text: "Complete a challenge", points: "+1,000" },
//   { icon: Flame, text: "Maintain a 7-day streak", points: "+500" },
//   { icon: Target, text: "Track your protein daily", points: "+200" },
//   { icon: Users, text: "Invite a friend", points: "+500" },
// ];

// const testimonials = [
//   {
//     name: "Rohit S.",
//     location: "Vizag · Build Muscle",
//     image: communityImages.muscle,
//     quote:
//       "The 21-Day Challenge helped me build a consistent protein routine. I am feeling stronger and more motivated!",
//   },
//   {
//     name: "Priya M.",
//     location: "Hyderabad · Family Nutrition",
//     image: communityImages.family,
//     quote:
//       "As a working mom, the community gives me easy protein ideas for my whole family. It makes healthy eating easier.",
//   },
//   {
//     name: "Suresh K.",
//     location: "Kavali · Healthy Living",
//     image: communityImages.weight,
//     quote:
//       "I'm feeling more energetic after tracking my protein and joining the community.",
//   },
// ];

// function SectionHeading({ title, subtitle }) {
//   return (
//     <div className="mb-7 text-center">
//       <h2 className="text-2xl font-extrabold text-[#063D27] sm:text-3xl">
//         {title}
//       </h2>
//       {subtitle && (
//         <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// }

// function SectionButton({ children, href = "#join", orange = false }) {
//   return (
//     <a
//       href={href}
//       className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
//         orange
//           ? "bg-gradient-to-r from-[#F47716] to-[#F15B05] text-white"
//           : "border border-green-700 bg-white text-green-800 hover:bg-green-50"
//       }`}
//     >
//       {children}
//       <ArrowRight size={17} />
//     </a>
//   );
// }

// function ProteinClubHero() {
//   return (
//     <section className="relative overflow-hidden bg-[#F0F8EF]">
//       <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
//         {/* Hero Text */}
//         <div className="relative z-10">
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#DDF4D7] px-3 py-1.5 text-xs font-bold text-green-800">
//             <Users size={17} />
//             EATPROTEIN PROTEIN CLUB
//           </div>

//           <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-[#063D27] sm:text-5xl lg:text-[56px]">
//             Your Protein Journey{" "}
//             <span className="text-green-700">is Better Together.</span>
//           </h1>

//           <p className="mt-5 max-w-lg text-base leading-7 text-gray-700">
//             Learn, track, challenge and grow with a supportive community that helps
//             you build consistent protein habits for a healthier, stronger life.
//           </p>

//           <div className="mt-6 flex flex-col gap-3 sm:flex-row">
//             <SectionButton orange href="#communities">
//               Join Protein Club – FREE
//             </SectionButton>

//             <SectionButton href="/#protein-calculator">
//               Calculate My Protein Need
//             </SectionButton>
//           </div>

//           {/* Hero Benefits */}
//           <div className="mt-8 grid grid-cols-3 divide-x divide-green-200">
//             {[
//               { icon: Users, text: "Join a supportive community" },
//               { icon: Zap, text: "Build healthy protein habits" },
//               { icon: Trophy, text: "Achieve your wellness goals" },
//             ].map((item, i) => (
//               <div key={i} className="px-3 text-center first:pl-0 last:pr-0">
//                 <item.icon className="mx-auto mb-2 text-green-700" size={25} />
//                 <p className="text-xs font-medium leading-4 text-gray-700 sm:text-sm">
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Hero Image */}
//         <div className="relative mx-auto w-full max-w-[650px]">
//           <div className="absolute inset-5 rounded-[45%] bg-[#D2F0C4]" />
//           <img
//             src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
//             alt="Family enjoying a healthy lifestyle"
//             className="relative z-10 h-[330px] w-full rounded-[30px] object-cover sm:h-[450px] lg:h-[480px]"
//           />
//           <div className="absolute -right-2 top-5 z-20 rotate-6 rounded-xl bg-white/90 px-4 py-3 text-sm font-bold text-green-800 shadow-lg sm:-right-5">
//             Learn
//             <br />
//             Track
//             <br />
//             Improve
//             <br />
//             Grow Together
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProteinClubFeatures() {
//   const items = [
//     {
//       icon: Calculator,
//       title: "Know Your Protein",
//       description: "Calculate your daily protein need based on your age, weight, height and goal.",
//       color: "text-green-600",
//     },
//     {
//       icon: Flame,
//       title: "Join Challenges",
//       description: "Build consistent protein habits with fun, guided challenges.",
//       color: "text-orange-500",
//     },
//     {
//       icon: Users,
//       title: "Find Your Community",
//       description: "Connect with people who share your goals, challenges and journey.",
//       color: "text-green-600",
//     },
//     {
//       icon: Gift,
//       title: "Earn Rewards",
//       description: "Stay active, complete challenges and earn Protein Coins for exciting benefits.",
//       color: "text-orange-500",
//     },
//   ];

//   return (
//     <section className="px-4 py-4 sm:px-6">
//       <div className="mx-auto grid max-w-[1440px] grid-cols-1 overflow-hidden rounded-2xl bg-[#F0F8EF] sm:grid-cols-2 lg:grid-cols-4">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="flex gap-3 border-b border-green-100 p-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
//           >
//             <item.icon className={`${item.color} mt-1 shrink-0`} size={30} />
//             <div>
//               <h3 className="text-sm font-extrabold text-gray-900">{item.title}</h3>
//               <p className="mt-1 text-xs leading-5 text-gray-600">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function ProteinChallenge() {
//   const steps = [
//     { icon: CalendarDays, title: "Day 1", text: "Know your protein need", color: "text-green-700" },
//     { icon: Leaf, title: "Day 7", text: "Build a protein-rich breakfast", color: "text-green-700" },
//     { icon: ChartNoAxesColumnIncreasing, title: "Day 14", text: "Track your daily protein", color: "text-green-700" },
//     { icon: Trophy, title: "Day 21", text: "Become a Protein Champion", color: "text-orange-500" },
//   ];

//   return (
//     <section className="px-4 py-8 sm:px-6">
//       <div className="mx-auto grid max-w-[1440px] items-center gap-7 rounded-3xl bg-[#F0F8EF] p-5 sm:p-7 lg:grid-cols-12">
//         {/* Challenge image */}
//         <div className="relative lg:col-span-2">
//           <img
//             src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80"
//             alt="Fitness challenge participant"
//             className="h-52 w-full rounded-2xl object-cover sm:h-64 lg:h-60"
//           />
//         </div>

//         {/* Challenge description */}
//         <div className="lg:col-span-3">
//           <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">
//             <Flame size={17} /> 21-DAY
//           </span>
//           <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#063D27]">
//             Protein Challenge
//           </h2>
//           <p className="mt-2 text-sm leading-6 text-gray-600">
//             A simple, guided 21-day program to build a lasting protein habit.
//           </p>
//         </div>

//         {/* Steps */}
//         <div className="lg:col-span-7">
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//             {steps.map((step, i) => (
//               <div
//                 key={i}
//                 className="relative rounded-2xl bg-white p-4 text-center shadow-sm"
//               >
//                 <step.icon className={`mx-auto mb-2 ${step.color}`} size={27} />
//                 <h3 className="font-extrabold text-gray-900">{step.title}</h3>
//                 <p className="mt-1 text-xs leading-4 text-gray-600">{step.text}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 text-center">
//             <SectionButton orange href="#join">
//               Join the 21-Day Challenge
//             </SectionButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProteinGoals() {
//   return (
//     <section className="px-4 py-9 sm:px-6">
//       <div className="mx-auto max-w-[1440px]">
//         <SectionHeading
//           title="What's Your Goal?"
//           subtitle="Choose your goal and get personalized communities, challenges and content."
//         />
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//           {goals.map((goal, i) => (
//             <a
//               key={i}
//               href="#communities"
//               className="group flex min-h-[100px] items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
//             >
//               <goal.icon className={`${goal.color} shrink-0`} size={29} />
//               <span className="text-sm font-bold leading-4 text-gray-800">{goal.title}</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function CommunityCard({ community }) {
//   return (
//     <Link
//       to="/protein-club/communities"
//       className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
//     >
//       <div className="relative h-32 overflow-hidden">
//         <img
//           src={community.image}
//           alt={community.title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />
//         <span className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-800">
//           {community.tag}
//         </span>
//       </div>
//       <div className="p-3">
//         <h3 className="min-h-[40px] text-sm font-extrabold leading-4 text-gray-900">
//           {community.title}
//         </h3>
//         <p className="mt-2 text-xs text-gray-600">{community.members}</p>
//       </div>
//     </Link>
//   );
// }

// function ProteinCommunities() {
//   return (
//     <section id="communities" className="scroll-mt-24 px-4 py-8 sm:px-6">
//       <div className="mx-auto max-w-[1440px]">
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-extrabold text-[#063D27] sm:text-3xl">
//               Find Your Community
//             </h2>
//             <p className="mt-1 text-sm text-gray-600">
//               Join goal-based communities and connect with people on the same journey.
//             </p>
//           </div>
//           <Link
//   to="/protein-club/communities"
//   className="inline-flex items-center gap-2 font-semibold text-green-800 hover:text-green-600 transition-all duration-300"
// >
//   Explore All Communities
//   <ArrowRight size={18} />
// </Link>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
//           {communities.map((community, i) => (
//             <CommunityCard community={community} key={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProteinLeaderboard() {
//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//       <div className="mb-4 flex items-center gap-3">
//         <Trophy className="text-amber-500" size={26} />
//         <h3 className="text-lg font-extrabold text-gray-900">Protein Club Champions</h3>
//       </div>

//       <div className="space-y-3">
//         {champions.map((person) => (
//           <div key={person.rank} className="flex items-center gap-3 border-b border-gray-100 pb-3">
//             <span className={`text-xl font-black ${person.color}`}>
//               {person.rank === 1 ? "🥇" : person.rank === 2 ? "🥈" : "🥉"}
//             </span>
//             <img
//               src={
//                 person.rank === 2
//                   ? communityImages.family
//                   : communityImages.muscle
//               }
//               alt={person.name}
//               className="h-9 w-9 rounded-full object-cover"
//             />
//             <span className="flex-1 text-sm font-bold text-gray-800">{person.name}</span>
//             <span className="text-xs font-extrabold text-gray-700">{person.points}</span>
//           </div>
//         ))}
//       </div>

//       <a
//         href="#leaderboard"
//         className="mt-4 flex items-center justify-center gap-2 rounded-full border border-green-700 px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
//       >
//         View Full Leaderboard <ArrowRight size={16} />
//       </a>
//     </div>
//   );
// }

// function ProteinRewards() {
//   return (
//     <section className="px-4 py-8 sm:px-6">
//       <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-3">
//         {/* Rewards introduction */}
//         <div className="flex items-center gap-4 rounded-2xl bg-[#F0F8EF] p-5">
//           <Coins size={55} className="shrink-0 text-amber-500" />
//           <div>
//             <h3 className="text-lg font-extrabold text-gray-900">Earn Protein Coins & Benefits</h3>
//             <p className="mt-2 text-sm leading-5 text-gray-600">
//               Stay active, complete challenges and earn Protein Coins. Redeem them for exciting benefits.
//             </p>
//           </div>
//         </div>

//         {/* Earn coins */}
//         <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//           <h3 className="mb-4 text-base font-extrabold text-gray-900">Ways to Earn Coins</h3>
//           <div className="space-y-3">
//             {coinTasks.map((task, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <task.icon className="text-green-600" size={18} />
//                 <span className="flex-1 text-xs text-gray-700">{task.text}</span>
//                 <span className="text-xs font-extrabold text-orange-500">{task.points}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Redeem */}
//         <div className="rounded-2xl bg-[#FFF6DF] p-5">
//           <h3 className="mb-4 text-base font-extrabold text-gray-900">Redeem For</h3>
//           <div className="grid grid-cols-4 gap-2 text-center">
//             {[
//               { icon: Gift, text: "Product Discounts" },
//               { icon: Truck, text: "Free Delivery" },
//               { icon: Star, text: "Special Offers" },
//               { icon: Medal, text: "Exclusive Access" },
//             ].map((reward, i) => (
//               <div key={i} className="rounded-xl bg-white/70 p-3">
//                 <reward.icon className="mx-auto mb-2 text-green-600" size={24} />
//                 <p className="text-[10px] font-bold leading-3 text-gray-700">{reward.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function CommunityGuidelines() {
//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//       <div className="flex items-center gap-3">
//         <ShieldCheck className="text-green-600" size={27} />
//         <h3 className="font-extrabold text-gray-900">Community Guidelines</h3>
//       </div>
//       <p className="mt-3 text-sm leading-5 text-gray-600">
//         A safe, respectful and supportive space focused on protein, nutrition and healthy living.
//       </p>
//       <a
//         href="#guidelines"
//         className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-700 px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-50"
//       >
//         View Guidelines <ArrowRight size={16} />
//       </a>
//     </div>
//   );
// }

// function ProteinTestimonials() {
//   return (
//     <section className="px-4 py-8 sm:px-6">
//       <div className="mx-auto max-w-[1440px]">
//         <div className="grid gap-5 lg:grid-cols-4">
//           <div className="flex items-center">
//             <h2 className="text-3xl font-black leading-tight text-[#063D27]">
//               Real People.
//               <br />
//               Real Protein
//               <br />
//               Journeys.
//               <span className="ml-2 text-green-600">↗</span>
//             </h2>
//           </div>

//           {testimonials.map((person, i) => (
//             <div
//               key={i}
//               className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
//             >
//               <div className="mb-3 flex items-center gap-3">
//                 <img
//                   src={person.image}
//                   alt={person.name}
//                   className="h-12 w-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="text-sm font-extrabold text-gray-900">{person.name}</p>
//                   <p className="text-xs text-gray-500">{person.location}</p>
//                 </div>
//               </div>
//               <p className="text-sm leading-6 text-gray-700">
//                 <span className="text-xl font-black text-green-700">“</span>
//                 {person.quote}
//                 <span className="text-xl font-black text-green-700">”</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProteinClubCTA() {
//   return (
//     <section id="join" className="scroll-mt-24 px-3 pb-8 sm:px-6">
//       <div className="mx-auto grid max-w-[1440px] items-center gap-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#063D27] via-[#087C43] to-[#0C5C35] p-6 text-white sm:p-8 lg:grid-cols-12">
//         <div className="lg:col-span-3">
//           <img
//             src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80"
//             alt="Protein Club community"
//             className="h-48 w-full rounded-2xl object-cover sm:h-56"
//           />
//         </div>

//         <div className="lg:col-span-5">
//           <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
//             Ready to Start Your{" "}
//             <span className="text-lime-300">Protein Journey?</span>
//           </h2>
//           <p className="mt-3 text-sm text-green-50">
//             Join thousands of people building better protein habits together.
//           </p>

//           <div className="mt-5 flex flex-wrap gap-3">
//             <SectionButton orange href="#communities">
//               Join Protein Club – FREE
//             </SectionButton>
//             <a
//               href="#download-app"
//               className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-green-800 hover:bg-green-50"
//             >
//               <ArrowRight size={16} />
//               Download App
//             </a>
//           </div>
//         </div>

//         <div className="space-y-2 lg:col-span-4">
//           {[
//             "Know your protein requirement",
//             "Join goal-based communities",
//             "Track your progress",
//             "Earn rewards & special benefits",
//             "Get expert tips and support",
//           ].map((text, i) => (
//             <div key={i} className="flex items-center gap-2 text-sm">
//               <CheckCircle2 className="shrink-0 text-lime-300" size={19} />
//               {text}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function ProteinClub() {
//   return (
//     <main className="min-h-screen bg-white text-gray-900">
//       <ProteinClubHero />
//       <ProteinClubFeatures />
//       <ProteinChallenge />
//       <ProteinGoals />
//       <ProteinCommunities />

//       {/* Leaderboard + Guidelines */}
//       <section className="px-4 py-4 sm:px-6">
//         <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2">
//           <ProteinLeaderboard />
//           <CommunityGuidelines />
//         </div>
//       </section>

//       <ProteinRewards />
//       <ProteinTestimonials />
//       <ProteinClubCTA />
//     </main>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Calculator, Flame, Trophy, Gift, CalendarDays, Target, HeartPulse,
  Dumbbell, Apple, Footprints, TrendingUp, ShieldCheck, Coins, Truck, Star,
  ArrowRight, CheckCircle2, Zap, ChartNoAxesColumnIncreasing, Leaf, Medal,
  Download, Utensils, Timer, UserRound, ChevronRight, Award,
} from "lucide-react";

const images = {
  muscle: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
  weight: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714193e1d?auto=format&fit=crop&w=600&q=80",
  veg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  vizag: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  hero: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
};

const goals = [
  { title: "Build Muscle", icon: Dumbbell, color: "text-orange-500" },
  { title: "Lose Fat", icon: TrendingUp, color: "text-green-600" },
  { title: "Improve Health", icon: HeartPulse, color: "text-red-500" },
  { title: "Family Nutrition", icon: Users, color: "text-purple-500" },
  { title: "Eat More Protein", icon: Apple, color: "text-green-600" },
  { title: "Stay Active", icon: Footprints, color: "text-blue-500" },
];
const communities = [
  { title: "Build Muscle Community", members: "4,820 members", image: images.muscle, tag: "Official" },
  { title: "Weight Management Community", members: "3,962 members", image: images.weight, tag: "Official" },
  { title: "Family Nutrition Community", members: "3,410 members", image: images.family, tag: "Official" },
  { title: "Vegetarian Protein Community", members: "2,890 members", image: images.veg, tag: "Official" },
  { title: "Vizag Protein Community", members: "2,540 members", image: images.vizag, tag: "Community" },
];
const champions = [
  { rank: "🥇", name: "Priya M.", points: "2,450 pts" },
  { rank: "🥈", name: "Rohit S.", points: "1,980 pts" },
  { rank: "🥉", name: "Suresh K.", points: "1,760 pts" },
];
const coinTasks = [
  { icon: CalendarDays, text: "Complete a challenge", points: "+1,000" },
  { icon: Flame, text: "Maintain a 7-day streak", points: "+500" },
  { icon: Target, text: "Track your protein daily", points: "+200" },
  { icon: Users, text: "Invite a friend", points: "+500" },
];
const testimonials = [
  { name: "Rohit S.", location: "Vizag · Build Muscle", image: images.muscle, quote: "The 21-Day Challenge helped me build a consistent protein routine. I'm feeling stronger and more motivated!" },
  { name: "Priya M.", location: "Hyderabad · Family Nutrition", image: images.family, quote: "As a working mom, the community gives me easy protein ideas for my whole family. It makes healthy eating easier." },
  { name: "Suresh K.", location: "Kavali · Healthy Living", image: images.weight, quote: "I'm feeling more energetic after tracking my protein and joining the community." },
];

const pillButton = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-md";
function ButtonLink({ children, href = "#communities", orange = false, className = "" }) {
  return <a href={href} className={`${pillButton} ${orange ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" : "border border-green-700 bg-white text-green-800 hover:bg-green-50"} ${className}`}>{children}<ArrowRight size={16}/></a>;
}
function Heading({ title, subtitle }) {
  return <div className="mb-5 text-center"><h2 className="text-2xl font-extrabold tracking-tight text-[#063D27] sm:text-3xl">{title}</h2>{subtitle && <p className="mx-auto mt-1.5 max-w-2xl text-sm text-gray-600">{subtitle}</p>}</div>;
}
function Hero() {
  return <section className="overflow-hidden bg-[#F0F8EF]">
    <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-7 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-8 lg:px-8">
      <div className="relative z-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#DDF4D7] px-3 py-1.5 text-xs font-extrabold text-green-900"><Users size={17}/> EATPROTEIN PROTEIN CLUB</div>
        <h1 className="max-w-xl text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.04] tracking-tight text-[#063D27]">Your Protein Journey<br/><span className="text-green-700">is Better Together.</span></h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-700 sm:text-base">Learn, track, challenge and grow with a supportive community that helps you build consistent protein habits for a healthier, stronger life.</p>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"><ButtonLink orange href="#communities">Join Protein Club – FREE</ButtonLink><ButtonLink href="/#protein-calculator">Calculate My Protein Need</ButtonLink></div>
        <div className="mt-5 grid grid-cols-3 divide-x divide-green-200">
          {[{icon:Users,text:"Join a supportive community"},{icon:Zap,text:"Build healthy protein habits"},{icon:Trophy,text:"Achieve your wellness goals"}].map((item,i)=><div key={i} className="px-2 text-center first:pl-0 last:pr-0"><item.icon className="mx-auto mb-1.5 text-green-700" size={24}/><p className="text-[11px] font-medium leading-4 text-gray-700 sm:text-sm">{item.text}</p></div>)}
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[680px] px-1 sm:px-3">
        <div className="absolute inset-5 rounded-[45%] bg-[#D2F0C4] sm:inset-8"/><img src={images.hero} alt="Family enjoying a healthy lifestyle" className="relative z-10 h-[280px] w-full rounded-[28px] object-cover sm:h-[420px] lg:h-[460px]"/>
        <div className="absolute right-0 top-3 z-20 rotate-3 rounded-xl bg-white/90 px-3 py-2 text-sm font-bold leading-5 text-green-900 shadow-md sm:right-2 sm:top-6 sm:px-4 sm:py-3">Learn<br/>Track<br/>Improve<br/>Grow Together</div>
      </div>
    </div>
  </section>;
}
function FeaturesStrip() {
  const items = [
    {icon:Calculator,title:"Know Your Protein",desc:"Calculate your daily protein need based on your age, weight, height and goal.",color:"text-green-600"},
    {icon:Flame,title:"Join Challenges",desc:"Build consistent protein habits with fun, guided challenges.",color:"text-orange-500"},
    {icon:Users,title:"Find Your Community",desc:"Connect with people who share your goals, challenges and journey.",color:"text-green-600"},
    {icon:Gift,title:"Earn Rewards",desc:"Stay active, complete challenges and earn Protein Coins for exciting benefits.",color:"text-orange-500"},
  ];
  return <section className="px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] grid-cols-1 overflow-hidden rounded-2xl bg-[#F0F8EF] sm:grid-cols-2 lg:grid-cols-4">{items.map((item,i)=><div key={i} className="flex gap-3 border-b border-green-100 p-3.5 sm:border-r lg:border-b-0"><item.icon size={30} className={`${item.color} mt-0.5 shrink-0`}/><div><h3 className="text-sm font-extrabold text-gray-900">{item.title}</h3><p className="mt-0.5 text-xs leading-4 text-gray-600">{item.desc}</p></div></div>)}</div></section>;
}
function CalculatorPreview() {
  const [age,setAge]=useState("25"); const [gender,setGender]=useState("Male"); const [weight,setWeight]=useState("70"); const [height,setHeight]=useState("170"); const [goal,setGoal]=useState("Build Muscle"); const [result,setResult]=useState(90);
  const calculate=()=>{const w=Number(weight)||0; const factor=goal==="Build Muscle"?1.3:goal==="Lose Fat"?1.2:goal==="Stay Active"?1.0:0.9;setResult(Math.max(0,Math.round(w*factor)));};
  return <section id="protein-calculator" className="scroll-mt-24 px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] gap-3 rounded-3xl bg-[#F0F8EF] p-3 sm:p-4 lg:grid-cols-12 lg:gap-4">
    <div className="flex flex-col justify-center lg:col-span-3"><span className="mb-2 w-fit rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-800">PROTEIN CALCULATOR</span><h2 className="text-2xl font-black leading-tight text-[#063D27] sm:text-3xl">Know Your<br/>Daily Protein Need</h2><p className="mt-2 text-sm leading-5 text-gray-600">Get your personalized protein requirement based on your age, gender, height, weight and goal.</p><div className="mt-3 grid grid-cols-3 gap-2 text-center">{[{icon:Target,text:"Understand your body"},{icon:ChartNoAxesColumnIncreasing,text:"Get your daily target"},{icon:HeartPulse,text:"Make better food choices"}].map((x,i)=><div key={i}><x.icon className="mx-auto text-green-600" size={22}/><p className="mt-1 text-[10px] leading-3 text-gray-600">{x.text}</p></div>)}</div></div>
    <div className="rounded-2xl bg-white p-3 shadow-md lg:col-span-6 sm:p-4">
      <div className="mb-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">{[{label:"Adult",icon:UserRound},{label:"Kid",icon:Timer},{label:"Pregnant Woman",icon:HeartPulse},{label:"Feeding Mother",icon:Users},{label:"Active Senior",icon:Footprints}].map((p,i)=><button key={p.label} type="button" className={`rounded-xl px-1 py-2 text-[10px] font-bold sm:text-xs ${i===0?"bg-green-700 text-white":"bg-gray-50 text-gray-700 hover:bg-green-50"}`}><p><p.icon className="mx-auto mb-1" size={17}/>{p.label}</p></button>)}</div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"><label className="text-xs font-semibold text-gray-700">Age (Years)<select value={age} onChange={e=>setAge(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm"><option>25</option>{Array.from({length:75},(_,i)=>i+1).map(n=><option key={n}>{n}</option>)}</select></label><label className="text-xs font-semibold text-gray-700 sm:col-span-2">Gender<div className="mt-1 flex rounded-lg border border-gray-200 p-1"><button type="button" onClick={()=>setGender("Male")} className={`flex-1 rounded-md p-1.5 text-sm ${gender==="Male"?"bg-green-700 text-white":"text-gray-700"}`}>Male</button><button type="button" onClick={()=>setGender("Female")} className={`flex-1 rounded-md p-1.5 text-sm ${gender==="Female"?"bg-green-700 text-white":"text-gray-700"}`}>Female</button></div></label><label className="text-xs font-semibold text-gray-700">Height<input value={height} onChange={e=>setHeight(e.target.value)} type="number" className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm"/></label><label className="text-xs font-semibold text-gray-700">Weight<input value={weight} onChange={e=>setWeight(e.target.value)} type="number" className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm"/></label><label className="text-xs font-semibold text-gray-700 sm:col-span-2">Your Goal<select value={goal} onChange={e=>setGoal(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm"><option>Build Muscle</option><option>Lose Fat</option><option>Improve Health</option><option>Stay Active</option></select></label></div>
      <button onClick={calculate} type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 py-2.5 text-sm font-bold text-white shadow hover:from-green-800">Calculate My Protein Need <ArrowRight size={16}/></button>
    </div>
    <div className="flex flex-col justify-center rounded-2xl bg-white p-4 shadow-sm lg:col-span-3"><div className="flex items-center gap-3"><Target className="text-orange-500" size={34}/><h3 className="text-sm font-extrabold text-gray-900">Your Daily<br/>Protein Requirement</h3></div><div className="my-2 text-center text-3xl font-black text-green-700 sm:text-4xl">{result} <span className="text-lg text-gray-800">g / day</span></div><div className="rounded-xl bg-green-50 p-3 text-xs leading-4 text-green-900"><b>🌱 Your next step:</b><p className="mt-1">Join the 21-Day Protein Challenge and build a consistent protein habit.</p></div><ButtonLink orange href="#challenge" className="mt-3 w-full">Join 21-Day Challenge</ButtonLink></div>
  </div></section>;
}
function Challenge() {
  const steps=[{icon:CalendarDays,title:"Day 1",text:"Know your protein need"},{icon:Leaf,title:"Day 7",text:"Build a protein-rich breakfast"},{icon:ChartNoAxesColumnIncreasing,title:"Day 14",text:"Track your daily protein"},{icon:Trophy,title:"Day 21",text:"Become a Protein Champion"}];
  return <section id="challenge" className="px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] items-center gap-4 rounded-3xl bg-[#F0F8EF] p-3 sm:p-4 lg:grid-cols-12"><img src={images.muscle} alt="Participant enjoying an active lifestyle" className="h-44 w-full rounded-2xl object-cover sm:h-52 lg:col-span-2 lg:h-full"/><div className="lg:col-span-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white"><Flame size={15}/> 21-DAY</span><h2 className="mt-2 text-2xl font-black text-[#063D27] sm:text-3xl">Protein Challenge</h2><p className="mt-1 text-sm text-gray-600">A simple, guided 21-day program to build a lasting protein habit.</p></div><div className="lg:col-span-7"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{steps.map((s,i)=><div key={i} className="rounded-xl bg-white p-3 text-center shadow-sm"><s.icon className="mx-auto mb-1.5 text-green-700" size={24}/><h3 className="text-sm font-extrabold text-gray-900">{s.title}</h3><p className="mt-1 text-[11px] leading-4 text-gray-600">{s.text}</p></div>)}</div><div className="mt-3 text-center"><ButtonLink
  orange
  href="/protein-club/21-day-protein-challenge"
>
  Join the 21-Day Challenge
</ButtonLink></div></div></div></section>;
}
function Goals() {return <section className="px-3 py-5 sm:px-5"><div className="mx-auto max-w-[1440px]"><Heading title="What's Your Goal?" subtitle="Choose your goal and get personalized communities, challenges and content."/><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{goals.map((g,i)=><a key={i} href="#communities" className="flex min-h-[84px] items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"><g.icon className={`${g.color} shrink-0`} size={28}/><span className="text-xs font-bold leading-4 text-gray-800 sm:text-sm">{g.title}</span></a>)}</div></div></section>}
function CommunityCard({ community }) {return <Link to="/protein-club/communities" className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="relative h-24 overflow-hidden sm:h-28"><img src={community.image} alt={community.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute right-1.5 top-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">{community.tag}</span></div><div className="p-2.5"><h3 className="min-h-[36px] text-xs font-extrabold leading-4 text-gray-900 sm:text-sm">{community.title}</h3><p className="mt-1 text-[11px] text-gray-600">{community.members}</p></div></Link>}
function CommunitiesAndChampions() {return <section id="communities" className="scroll-mt-24 px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-12"><div className="lg:col-span-9"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-black text-[#063D27]">Find Your Community</h2><p className="mt-1 text-xs text-gray-600 sm:text-sm">Join goal-based communities and connect with people on the same journey.</p></div><Link to="/protein-club/communities" className="inline-flex items-center gap-1 text-xs font-bold text-green-800 hover:text-green-600">Explore All Communities <ArrowRight size={16}/></Link></div><div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">{communities.map((c,i)=><CommunityCard key={i} community={c}/>)}</div></div><div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:col-span-3"><div className="mb-3 flex items-center gap-2"><Trophy className="text-amber-500" size={25}/><h3 className="text-base font-extrabold text-gray-900">Protein Club Champions</h3></div><div className="space-y-2.5">{champions.map((p,i)=><div key={i} className="flex items-center gap-2 border-b border-gray-100 pb-2"><span className="text-lg">{p.rank}</span><img src={i===1?images.family:images.muscle} alt={p.name} className="h-8 w-8 rounded-full object-cover"/><span className="flex-1 text-xs font-bold text-gray-800">{p.name}</span><span className="text-[11px] font-extrabold text-gray-700">{p.points}</span></div>)}</div><Link
  to="/protein-club/leaderboard-rewards"
  className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-full border border-green-700 px-3 py-2 text-xs font-bold text-green-800 transition hover:bg-green-50"
>
  View Full Leaderboard & Rewards
  <ArrowRight size={15} />
</Link></div></div></section>}
// function RewardsAndGuidelines() {return <section className="px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4"><div className="flex items-center gap-3 rounded-2xl bg-[#F0F8EF] p-3"><Coins size={45} className="shrink-0 text-amber-500"/><div><h3 className="text-sm font-extrabold text-gray-900">Earn Protein Coins & Benefits</h3><p className="mt-1 text-xs leading-4 text-gray-600">Stay active, complete challenges and earn Protein Coins. Redeem them for exciting benefits.</p></div></div><div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"><h3 className="mb-2 text-sm font-extrabold">Ways to Earn Coins</h3><div className="space-y-2">{coinTasks.map((t,i)=><div key={i} className="flex items-center gap-1.5"><t.icon size={15} className="text-green-600"/><span className="flex-1 text-[10px] text-gray-700">{t.text}</span><span className="text-[10px] font-bold text-orange-500">{t.points}</span></div>)}</div></div><div className="rounded-2xl bg-[#FFF6DF] p-3"><h3 className="mb-2 text-sm font-extrabold">Redeem For</h3><div className="grid grid-cols-4 gap-1.5 text-center">{[{icon:Gift,text:"Product Discounts"},{icon:Truck,text:"Free Delivery"},{icon:Star,text:"Special Offers"},{icon:Medal,text:"Exclusive Access"}].map((r,i)=><div key={i} className="rounded-lg bg-white/70 p-2"><r.icon className="mx-auto mb-1 text-green-600" size={21}/><p className="text-[9px] font-bold leading-3 text-gray-700">{r.text}</p></div>)}</div></div><div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"><div className="flex items-center gap-2"><ShieldCheck className="text-green-600" size={24}/><h3 className="text-sm font-extrabold">Community Guidelines</h3></div><p className="mt-2 text-xs leading-4 text-gray-600">A safe, respectful and supportive space focused on protein, nutrition and healthy living.</p><a href="#guidelines" className="mt-3 inline-flex items-center gap-1 rounded-full border border-green-700 px-3 py-1.5 text-xs font-bold text-green-800 hover:bg-green-50">View Guidelines <ArrowRight size={14}/></a></div></div></section>}
// function Testimonials() {return <section className="px-3 py-3 sm:px-5"><div className="mx-auto grid max-w-[1440px] gap-2.5 lg:grid-cols-4"><div className="flex items-center"><h2 className="text-2xl font-black leading-tight text-[#063D27] sm:text-3xl">Real People.<br/>Real Protein<br/>Journeys.<span className="ml-1 text-green-600">↗</span></h2></div>{testimonials.map((p,i)=><article key={i} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"><div className="mb-2 flex items-center gap-2.5"><img src={p.image} alt={p.name} className="h-10 w-10 rounded-full object-cover"/><div><p className="text-xs font-extrabold text-gray-900">{p.name}</p><p className="text-[10px] text-gray-500">{p.location}</p></div></div><p className="text-xs leading-5 text-gray-700"><span className="text-lg font-black text-green-700">“</span>{p.quote}<span className="text-lg font-black text-green-700">”</span></p></article>)}</div></section>}
// function BottomCTA() {return <section id="join" className="scroll-mt-24 px-3 pb-5 sm:px-5"><div className="mx-auto grid max-w-[1440px] items-center gap-3 overflow-hidden rounded-[26px] bg-gradient-to-r from-[#063D27] via-[#087C43] to-[#0C5C35] p-3 text-white sm:p-4 lg:grid-cols-12"><img src={images.hero} alt="Protein Club members" className="h-40 w-full rounded-2xl object-cover sm:h-48 lg:col-span-3"/><div className="lg:col-span-5"><h2 className="text-xl font-extrabold leading-tight sm:text-2xl">Ready to Start Your <span className="text-lime-300">Protein Journey?</span></h2><p className="mt-1 text-xs text-green-50 sm:text-sm">Join thousands of people building better protein habits together.</p><div className="mt-3 flex flex-wrap gap-2"><ButtonLink orange href="#communities">Join Protein Club – FREE</ButtonLink><a href="#download-app" className={`${pillButton} bg-white text-green-800`}><Download size={16}/>Download App</a></div></div><div className="space-y-1.5 lg:col-span-4">{["Know your protein requirement","Join goal-based communities","Track your progress","Earn rewards & special benefits","Get expert tips and support"].map((t,i)=><div key={i} className="flex items-center gap-1.5 text-xs"><CheckCircle2 className="shrink-0 text-lime-300" size={16}/>{t}</div>)}</div></div></section>}
function RewardsAndGuidelines() {
  return (
    <section className="px-3 py-3 sm:px-5">
      <div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4">

        {/* Earn Protein Coins */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#F0F8EF] p-4">
          <Coins size={50} className="shrink-0 text-amber-500" />
          <div>
            <h3 className="text-base font-extrabold text-gray-900">
              Earn Protein Coins & Benefits
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-600">
              Stay active, complete challenges and earn Protein Coins.
              Redeem them for exciting benefits.
            </p>
          </div>
        </div>

        {/* Ways to Earn */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-base font-extrabold text-gray-900">
            Ways to Earn Coins
          </h3>

          <div className="space-y-2.5">
            {coinTasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <t.icon size={17} className="shrink-0 text-green-600" />
                <span className="flex-1 text-xs text-gray-700">
                  {t.text}
                </span>
                <span className="text-xs font-bold text-orange-500">
                  {t.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem */}
        <div className="rounded-2xl bg-[#FFF6DF] p-4">
          <h3 className="mb-3 text-base font-extrabold text-gray-900">
            Redeem For
          </h3>

          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            {[
              { icon: Gift, text: "Product Discounts" },
              { icon: Truck, text: "Free Delivery" },
              { icon: Star, text: "Special Offers" },
              { icon: Medal, text: "Exclusive Access" },
            ].map((r, i) => (
              <div key={i} className="rounded-xl bg-white/70 p-2.5">
                <r.icon
                  className="mx-auto mb-1.5 text-green-600"
                  size={23}
                />
                <p className="text-[11px] font-bold leading-4 text-gray-700">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="shrink-0 text-green-600" size={27} />
            <h3 className="text-base font-extrabold text-gray-900">
              Community Guidelines
            </h3>
          </div>

          <p className="mt-2 text-sm leading-5 text-gray-600">
            A safe, respectful and supportive space focused on protein,
            nutrition and healthy living.
          </p>

          <a
            href="#guidelines"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-700 px-3.5 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
          >
            View Guidelines <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-3 py-4 sm:px-5">
      <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-4">

        {/* Heading */}
        <div className="flex items-center">
          <h2 className="text-3xl font-black leading-tight text-[#063D27] sm:text-4xl">
            Real People.
            <br />
            Real Protein
            <br />
            Journeys.
            <span className="ml-1 text-green-600">↗</span>
          </h2>
        </div>

        {/* Testimonials */}
        {testimonials.map((p, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-extrabold text-gray-900">
                  {p.name}
                </p>
                <p className="text-xs text-gray-500">
                  {p.location}
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-gray-700">
              <span className="text-xl font-black text-green-700">“</span>
              {p.quote}
              <span className="text-xl font-black text-green-700">”</span>
            </p>
          </article>
        ))}

      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section id="join" className="scroll-mt-24 px-3 pb-5 sm:px-5">
      <div className="mx-auto grid max-w-[1440px] items-center gap-4 overflow-hidden rounded-[26px] bg-gradient-to-r from-[#063D27] via-[#087C43] to-[#0C5C35] p-4 text-white sm:p-5 lg:grid-cols-12">

        {/* Image */}
        <img
          src={images.hero}
          alt="Protein Club members"
          className="h-44 w-full rounded-2xl object-cover sm:h-52 lg:col-span-3"
        />

        {/* Content */}
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            Ready to Start Your{" "}
            <span className="text-lime-300">Protein Journey?</span>
          </h2>

          <p className="mt-2 text-sm leading-5 text-green-50">
            Join thousands of people building better protein habits together.
          </p>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <ButtonLink orange href="#communities">
              Join Protein Club – FREE
            </ButtonLink>

            <a
              href="#download-app"
              className={`${pillButton} bg-white text-sm text-green-800`}
            >
              <Download size={17} />
              Download App
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2 lg:col-span-4">
          {[
            "Know your protein requirement",
            "Join goal-based communities",
            "Track your progress",
            "Earn rewards & special benefits",
            "Get expert tips and support",
          ].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm leading-5"
            >
              <CheckCircle2
                className="shrink-0 text-lime-300"
                size={18}
              />
              {t}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function ProteinClub() {
  return <main className="min-h-screen overflow-x-hidden bg-white text-gray-900"><Hero/><FeaturesStrip/><CalculatorPreview/><Challenge/><Goals/><CommunitiesAndChampions/><RewardsAndGuidelines/><Testimonials/><BottomCTA/></main>;
}
