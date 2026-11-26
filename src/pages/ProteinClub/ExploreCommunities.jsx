import { communities } from "./data/communities";
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Search,
  ShieldCheck,
  Target,
  Users,
  Leaf,
  MapPin,
  RotateCcw,
  ArrowRight,
  MessageCircle,
  Lightbulb,
  ClipboardList,
  Crown,
  Dumbbell,
  Heart,
  Apple,
  Activity,
  Baby,
  Salad,
  Egg,
  X,
  ChevronDown,
  Flame,
  Trophy,
} from "lucide-react";

// --------------------------------------------------
// COMMUNITY DATA
// --------------------------------------------------

// const communities = [
//   {
//     id: 1,
//     slug: "build-muscle",
//     title: "Build Muscle Community",
//     members: "4,820",
//     description:
//       "Muscle gain, high-protein diets, workouts and expert guidance.",
//     image:
//       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Build Muscle",
//     diet: ["Any", "Non-Vegetarian", "Egg & Dairy"],
//     stage: ["Adults", "50+ Senior"],
//     type: "Goal Based",
//     location: "India",
//   },
//   {
//     id: 2,
//     slug: "weight-management",
//     title: "Weight Management Community",
//     members: "3,962",
//     description:
//       "Healthy weight loss, fat loss, diet plans and habit building.",
//     image:
//       "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Lose Fat",
//     diet: ["Any", "Vegetarian", "Vegan"],
//     stage: ["Adults", "Women"],
//     type: "Goal Based",
//     location: "India",
//   },
//   {
//     id: 3,
//     slug: "family-nutrition",
//     title: "Family Nutrition Community",
//     members: "3,410",
//     description:
//       "Better protein, balanced meals and healthy habits for the whole family.",
//     image:
//       "https://images.unsplash.com/photo-1511895426328-dc8714193e1d?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Family Nutrition",
//     diet: ["Any", "Vegetarian", "Egg & Dairy"],
//     stage: ["Adults", "Kids (4–12 yrs)", "Women"],
//     type: "Life Stage",
//     location: "India",
//   },
//   {
//     id: 4,
//     slug: "women-protein",
//     title: "Women's Protein Community",
//     members: "2,608",
//     description:
//       "Nutrition for women's health, PCOS, hormones, fitness and more.",
//     image:
//       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Improve Health",
//     diet: ["Any", "Vegetarian", "Vegan"],
//     stage: ["Women", "Pregnant / Feeding"],
//     type: "Life Stage",
//     location: "India",
//   },
//   {
//     id: 5,
//     slug: "kids-nutrition",
//     title: "Kids Nutrition Community",
//     members: "1,980",
//     description:
//       "Protein-rich foods, healthy growth and immunity for kids.",
//     image:
//       "https://images.unsplash.com/photo-1503919005314-30d3b8d2b8d3?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Family Nutrition",
//     diet: ["Any", "Vegetarian", "Egg & Dairy"],
//     stage: ["Kids (4–12 yrs)"],
//     type: "Life Stage",
//     location: "India",
//   },
//   {
//     id: 6,
//     slug: "healthy-living-50",
//     title: "50+ Healthy Living Community",
//     members: "1,756",
//     description:
//       "Stay fit, strong and active with the right protein and nutrition.",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Stay Active",
//     diet: ["Any", "Vegetarian", "Egg & Dairy"],
//     stage: ["50+ Senior"],
//     type: "Life Stage",
//     location: "India",
//   },
//   {
//     id: 7,
//     slug: "vegetarian-protein",
//     title: "Vegetarian Protein Community",
//     members: "2,890",
//     description:
//       "High-protein vegetarian foods, recipes and meal ideas.",
//     image:
//       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Eat More Protein",
//     diet: ["Vegetarian", "Vegan"],
//     stage: ["Adults", "Women", "Kids (4–12 yrs)"],
//     type: "Diet Type",
//     location: "India",
//   },
//   {
//     id: 8,
//     slug: "egg-dairy",
//     title: "Egg & Dairy Community",
//     members: "2,430",
//     description:
//       "Daily protein from eggs, milk and dairy for a stronger you.",
//     image:
//       "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Eat More Protein",
//     diet: ["Egg & Dairy", "Vegetarian"],
//     stage: ["Adults", "Kids (4–12 yrs)"],
//     type: "Diet Type",
//     location: "India",
//   },
//   {
//     id: 9,
//     slug: "vizag-protein",
//     title: "Vizag Protein Community",
//     members: "2,540",
//     description:
//       "Local community for Vizag meetups, events and challenges.",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
//     official: false,
//     goal: "Stay Active",
//     diet: ["Any"],
//     stage: ["Adults", "Women", "50+ Senior"],
//     type: "Local",
//     location: "Vizag",
//   },
//   {
//     id: 10,
//     slug: "healthy-protein",
//     title: "Healthy Protein Community",
//     members: "1,620",
//     description:
//       "Simple everyday food choices to improve your health and protein intake.",
//     image:
//       "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
//     official: true,
//     goal: "Improve Health",
//     diet: ["Any", "Vegetarian", "Non-Vegetarian"],
//     stage: ["Adults", "Women", "50+ Senior"],
//     type: "Goal Based",
//     location: "India",
//   },
// ];

const discussions = [
  {
    title: "High-protein breakfast ideas for busy mornings?",
    comments: 128,
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "How to reach 100g protein daily?",
    comments: 96,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Protein-rich food options for kids (4–8 years)",
    comments: 72,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Eggs daily – how many are safe?",
    comments: 64,
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80",
  },
];

// --------------------------------------------------
// FILTER DATA
// --------------------------------------------------

const filterGroups = [
  {
    title: "Community Type",
    key: "communityType",
    options: ["All Communities", "EatProtein Official", "Local Community"],
  },
  {
    title: "Your Goal",
    key: "goal",
    options: [
      "Build Muscle",
      "Lose Fat",
      "Improve Health",
      "Family Nutrition",
      "Eat More Protein",
      "Stay Active",
    ],
  },
  {
    title: "Diet Preference",
    key: "diet",
    options: ["Any", "Vegetarian", "Non-Vegetarian", "Egg & Dairy", "Vegan"],
  },
  {
    title: "Life Stage",
    key: "stage",
    options: ["Adults", "Kids (4–12 yrs)", "Women", "Pregnant / Feeding", "50+ Senior"],
  },
];

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function SectionTitle({ title, action, onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-extrabold text-[#063D27] sm:text-xl">
        {title}
      </h2>
      {action && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900 sm:text-sm"
        >
          {action} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

function FilterAccordion({ title, options, selected, onChange }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-extrabold text-gray-800">{title}</span>
        <ChevronDown
          size={17}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-3 space-y-2.5">
          {options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-700 hover:text-green-800"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="h-4 w-4 accent-green-700"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function CommunityCard({ community }) {
  const navigate = useNavigate();

  return (
    <article className="group flex min-h-[190px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[210px] sm:p-4">
      <div className="flex flex-1 gap-3">
        {/* Community Image */}
        <div className="h-[132px] w-[105px] shrink-0 overflow-hidden rounded-xl sm:h-[145px] sm:w-[115px]">
          <img
            src={community.image}
            alt={community.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Community Info */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-1">
            {community.official ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-800">
                <ShieldCheck size={12} /> Official
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-1 text-[10px] font-bold text-teal-800">
                <Users size={12} /> Community
              </span>
            )}
          </div>

          <h3 className="text-sm font-extrabold leading-4 text-gray-900 sm:text-base">
            {community.title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <Users size={14} />
            {community.members} members
          </div>

          <p className="mt-2 line-clamp-3 text-xs leading-4 text-gray-600">
            {community.description}
          </p>

          <button
            onClick={() => navigate(`/protein-club/community/${community.slug}`)}
            className="mt-auto inline-flex items-center justify-center gap-1 self-start rounded-full bg-gradient-to-r from-green-700 to-green-600 px-3 py-2 text-xs font-bold text-white transition hover:from-green-800 hover:to-green-700 sm:mt-3"
          >
            View Community <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

// --------------------------------------------------
// SUGGEST COMMUNITY MODAL
// --------------------------------------------------

function SuggestCommunityModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    goal: "",
    email: "",
  });

  if (!open) return null;

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    // Frontend demo: connect this to your API later
    alert("Thank you! Your community suggestion has been submitted.");
    setForm({ name: "", description: "", goal: "", email: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-5">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#EFF8EC] px-5 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#063D27]">
              Suggest a Community
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Tell us what community you would like to see.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 hover:bg-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Community Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              placeholder="e.g. Marathon Runners Protein Club"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Community Goal
            </label>
            <select
              name="goal"
              value={form.goal}
              onChange={update}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
            >
              <option value="">Choose a goal</option>
              <option>Build Muscle</option>
              <option>Lose Fat</option>
              <option>Improve Health</option>
              <option>Family Nutrition</option>
              <option>Eat More Protein</option>
              <option>Stay Active</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={update}
              required
              rows={3}
              placeholder="What is this community about?"
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={update}
              type="email"
              required
              placeholder="Your email address"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-green-700 py-3 font-bold text-white hover:bg-green-800"
          >
            Submit Suggestion <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------------
// HERO
// --------------------------------------------------

function ExploreHero() {
  return (
    <section className="overflow-hidden bg-[#EFF8EC]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-5 pb-7 pt-5 lg:grid-cols-12 lg:px-8">
        {/* Breadcrumb */}
        <div className="lg:col-span-12">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Link to="/" className="text-green-800 hover:text-green-600">
              <Home size={18} />
            </Link>
            <ChevronRight size={18} />
            <Link to="/protein-club" className="text-green-800 hover:underline">
              Protein Club
            </Link>
            <ChevronRight size={18} />
            <span className="text-gray-800">Explore Communities</span>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-5">
          <h1 className="text-3xl font-black leading-tight text-[#063D27] sm:text-4xl lg:text-[42px]">
            Explore Protein{" "}
            <span className="text-green-700">Communities</span>
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-700 sm:text-base">
            Find your people, share, learn and grow together on your protein
            journey.
          </p>

          <div className="mt-6 grid grid-cols-3 divide-x divide-green-200">
            {[
              { icon: Users, number: "12,482", label: "Members", color: "text-green-600" },
              { icon: Flame, number: "2,341", label: "Active Challengers", color: "text-orange-500" },
              { icon: Trophy, number: "18,650", label: "Goals Completed", color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="px-2 first:pl-0">
                <div className="flex items-center gap-1.5">
                  <stat.icon className={stat.color} size={25} />
                  <span className="text-lg font-black text-gray-900">{stat.number}</span>
                </div>
                <p className="mt-1 text-xs font-medium text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:col-span-7">
          <div className="absolute bottom-0 left-4 right-4 top-8 rounded-[50%] bg-[#CDEEBF]" />
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Protein community members"
            className="relative h-[270px] w-full rounded-2xl object-cover object-center sm:h-[340px]"
          />
          <div className="absolute -right-1 top-3 rotate-3 text-base font-bold leading-6 text-green-900 sm:right-2 sm:top-5 sm:text-xl">
            Same Goals
            <br />
            Better Habits
            <br />
            Stronger
            <br />
            Together
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// MAIN EXPLORE COMMUNITIES PAGE
// --------------------------------------------------

export default function ExploreCommunities() {
  const [activeTab, setActiveTab] = useState("All Communities");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    communityType: [],
    goal: [],
    diet: [],
    stage: [],
  });
  const [page, setPage] = useState(1);
  const [suggestOpen, setSuggestOpen] = useState(false);

  const itemsPerPage = 9;

  const tabs = [
    { label: "All Communities", icon: Users },
    { label: "EatProtein Official", icon: ShieldCheck },
    { label: "Goal Based", icon: Target },
    { label: "Life Stage", icon: Users },
    { label: "Diet Type", icon: Leaf },
    { label: "Local", icon: MapPin },
  ];

  // Toggle selected checkbox filters
  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const current = prev[group];
      return {
        ...prev,
        [group]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
    setPage(1);
  };

  // Clear all selected filters
  const clearFilters = () => {
    setFilters({
      communityType: [],
      goal: [],
      diet: [],
      stage: [],
    });
    setSearch("");
    setActiveTab("All Communities");
    setPage(1);
  };

  // Filter community cards
  const filteredCommunities = useMemo(() => {
    return communities.filter((community) => {
      const matchesSearch =
        community.title.toLowerCase().includes(search.toLowerCase()) ||
        community.description.toLowerCase().includes(search.toLowerCase()) ||
        community.goal.toLowerCase().includes(search.toLowerCase()) ||
        community.location.toLowerCase().includes(search.toLowerCase());

      const matchesTab =
        activeTab === "All Communities" ||
        (activeTab === "EatProtein Official" && community.official) ||
        community.type === activeTab;

      const matchesType =
        filters.communityType.length === 0 ||
        filters.communityType.some((filter) => {
          if (filter === "All Communities") return true;
          if (filter === "EatProtein Official") return community.official;
          if (filter === "Local Community") return !community.official;
          return true;
        });

      const matchesGoal =
        filters.goal.length === 0 || filters.goal.includes(community.goal);

      const matchesDiet =
        filters.diet.length === 0 ||
        filters.diet.some((diet) => community.diet.includes(diet));

      const matchesStage =
        filters.stage.length === 0 ||
        filters.stage.some((stage) => community.stage.includes(stage));

      return (
        matchesSearch &&
        matchesTab &&
        matchesType &&
        matchesGoal &&
        matchesDiet &&
        matchesStage
      );
    });
  }, [search, activeTab, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCommunities.length / itemsPerPage));

  const paginatedCommunities = filteredCommunities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const changeTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <ExploreHero />

      {/* Filter + Search Section */}
      <section className="px-3 py-5 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1440px]">
          {/* Desktop filter bar */}
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center">
            <h2 className="shrink-0 text-lg font-extrabold text-gray-900">
              Filter Communities
            </h2>

            {/* Tabs */}
            <div className="flex flex-1 flex-wrap items-center gap-3.5 rounded-2xl bg-gray-50 p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => changeTab(tab.label)}
                  className={`inline-flex items-center gap-3.5 rounded-full px-3 py-2 text-sm font-bold transition ${
                    activeTab === tab.label
                      ? "bg-green-100 text-green-900 shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-green-800"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex h-11 w-full items-center gap-2 rounded-full border border-gray-200 bg-white px-4 shadow-sm xl:max-w-[300px]">
              <Search size={17} className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search communities (e.g. Muscle, Family, Vizag)"
                className="w-full bg-transparent text-xs outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Community grid + sidebar */}
          <div className="grid gap-5 lg:grid-cols-[205px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
              {filterGroups.map((group) => (
                <FilterAccordion
                  key={group.key}
                  title={group.title}
                  options={group.options}
                  selected={filters[group.key]}
                  onChange={(value) => toggleFilter(group.key, value)}
                />
              ))}

              <button
                onClick={clearFilters}
                className="mb-3 mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 bg-green-50 px-3 py-2.5 text-xs font-bold text-green-800 transition hover:bg-green-100"
              >
                <RotateCcw size={14} />
                Clear Filters
              </button>
            </aside>

            {/* Cards */}
            <div className="min-w-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>

              {/* Empty state */}
              {paginatedCommunities.length === 0 && (
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-5 text-center">
                  <Search className="mb-3 text-gray-400" size={36} />
                  <h3 className="font-bold text-gray-800">No communities found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 rounded-full bg-green-700 px-5 py-2 text-sm font-bold text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-gray-600">
                  Showing {filteredCommunities.length} of {communities.length} communities
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="rounded-full border border-gray-200 px-3 py-2 text-sm disabled:opacity-40"
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => setPage(number)}
                      className={`h-9 w-9 rounded-full text-sm font-bold ${
                        page === number
                          ? "bg-green-700 text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="rounded-full border border-gray-200 px-3 py-2 text-sm disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  onClick={() => setSuggestOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-green-700 bg-green-50 px-4 py-2.5 text-xs font-bold text-green-800 transition hover:bg-green-100"
                >
                  <Lightbulb size={15} />
                  Suggest a Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Discussions */}
      <section className="px-3 pb-6 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-[1440px]">
          <SectionTitle
            title="Popular Discussions"
            action="View All Discussions"
            onAction={() => alert("Discussions page will be connected here.")}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {discussions.map((discussion, i) => (
              <button
                key={i}
                onClick={() => alert(`Opening discussion: ${discussion.title}`)}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={discussion.image}
                  alt=""
                  className="h-[70px] w-[82px] shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-extrabold leading-4 text-gray-900">
                    {discussion.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-600">
                    <MessageCircle size={14} />
                    {discussion.comments} comments
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom banners */}
      <section className="px-3 pb-8 sm:px-5 lg:px-6">
        <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-2">
          {/* Suggest banner */}
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-[#EFF8EC] p-5 sm:flex-row sm:p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-100">
              <Lightbulb size={37} className="text-yellow-500" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-[#063D27]">
                Can’t find your community?
                <br />
                Suggest a Community
              </h2>
              <p className="mt-2 text-xs leading-5 text-gray-600">
                Tell us what kind of protein community you’d like to see.
              </p>
              <Link
  to="/protein-club/suggest-community"
  className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-700 bg-white px-5 py-2.5 text-sm font-bold text-green-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-md"
>
  <Lightbulb size={16} />
  Suggest a Community
  <ArrowRight size={15} />
</Link>
            </div>

            <ClipboardList size={70} className="hidden shrink-0 text-green-600 sm:block" />
          </div>

          {/* Leader banner */}
          <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#FFF3E3] p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-100">
              <Crown size={38} className="text-amber-500" />
            </div>

            <div className="relative z-10 flex-1">
              <h2 className="text-xl font-extrabold text-[#783D16]">
                Become a Protein Leader
              </h2>
              <p className="mt-2 text-xs leading-5 text-gray-700">
                Help people build better protein habits, lead a community, get
                recognized, earn rewards and exclusive benefits.
              </p>
              <a
                href="/protein-club/leader-application"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:shadow-md"
              >
                Apply to be a Protein Leader <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <SuggestCommunityModal
        open={suggestOpen}
        onClose={() => setSuggestOpen(false)}
      />
    </main>
    
  );
}
export function CommunityDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const community = communities.find((item) => item.slug === slug);

  if (!community) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Community not found
        </h1>
        <button
          onClick={() => navigate("/protein-club/communities")}
          className="mt-5 rounded-full bg-green-700 px-5 py-3 text-white"
        >
          Back to Communities
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F8EF] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-bold text-green-800"
        >
          ← Back to Communities
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <img
            src={community.image}
            alt={community.title}
            className="h-64 w-full object-cover sm:h-80"
          />

          <div className="p-6 sm:p-10">
            {community.official && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
                <ShieldCheck size={15} /> EatProtein Official
              </span>
            )}

            <h1 className="mt-4 text-3xl font-black text-[#063D27] sm:text-4xl">
              {community.title}
            </h1>

            <p className="mt-3 text-gray-600">{community.description}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
                <Users className="mr-1 inline" size={16} />
                {community.members} Members
              </span>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800">
                {community.goal}
              </span>
            </div>

            <button
              onClick={() => alert("Join community will be connected to your backend")}
              className="mt-7 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-7 py-3 font-bold text-white shadow hover:shadow-lg"
            >
              Join Community <ArrowRight className="ml-2 inline" size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}