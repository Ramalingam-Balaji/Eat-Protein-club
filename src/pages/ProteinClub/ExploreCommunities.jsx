import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  Lightbulb,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  fetchCommunities,
  getUserJoinedCommunities,
  joinCommunity,
  leaveCommunity,
} from "../../services/proteinClubService";

const goalFilters = [
  "All",
  "Build Muscle",
  "Lose Fat",
  "Improve Health",
  "Family Nutrition",
  "Eat More Protein",
  "Stay Active",
];

const stageFilters = ["All", "Adults", "Women", "Kids (4–12 yrs)", "50+ Senior"];
const dietFilters = ["All", "Vegetarian", "Egg & Dairy", "Non-Vegetarian", "Vegan", "Any"];
const locationFilters = ["All", "India", "Vizag"];

export default function ExploreCommunities() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, refreshProfile, showToast } = useProteinClubAuth();

  const [communities, setCommunities] = useState([]);
  const [joinedIds, setJoinedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const [activeSegment, setActiveSegment] = useState("all"); // all | joined | official
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(searchParams.get("goal") || "All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      try {
        const list = await fetchCommunities(false);
        if (!active) return;
        setCommunities(list);

        if (user) {
          const joined = await getUserJoinedCommunities(user.uid, list);
          if (active) setJoinedIds(joined);
        } else {
          setJoinedIds([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, [user]);

  const filteredCommunities = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const list = communities.filter((c) => {
      if (activeSegment === "joined" && !joinedIds.includes(c.id)) return false;
      if (activeSegment === "official" && !c.official) return false;
      if (selectedGoal !== "All" && c.goal !== selectedGoal) return false;
      if (selectedLocation !== "All" && c.location !== selectedLocation) return false;
      if (selectedStage !== "All" && !c.stage?.includes(selectedStage)) return false;
      if (
        selectedDiet !== "All" &&
        !c.diet?.includes(selectedDiet) &&
        !c.diet?.includes("Any")
      ) {
        return false;
      }
      if (q) {
        const hay = `${c.title} ${c.description} ${c.goal} ${c.category} ${c.location}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === "popular") {
      return [...list].sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0));
    }
    if (sortBy === "discussions") {
      return [...list].sort(
        (a, b) => (b.discussionsCount || 0) - (a.discussionsCount || 0)
      );
    }
    return list;
  }, [
    communities,
    joinedIds,
    activeSegment,
    selectedGoal,
    selectedStage,
    selectedDiet,
    selectedLocation,
    searchTerm,
    sortBy,
  ]);

  const handleToggleJoin = async (e, comm) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      showToast("Sign in first to join communities and track your progress.", "info");
      navigate("/protein-club/register");
      return;
    }

    if (comm._seededFallback) {
      showToast(
        "Community catalog is being initialized. Sign in as admin once to unlock live joins, or browse discussions.",
        "info"
      );
      return;
    }

    setBusyId(comm.id);
    try {
      const isJoined = joinedIds.includes(comm.id);
      if (isJoined) {
        await leaveCommunity({ community: comm, user, profile });
        setJoinedIds((prev) => prev.filter((id) => id !== comm.id));
        setCommunities((prev) =>
          prev.map((c) =>
            c.id === comm.id
              ? { ...c, membersCount: Math.max(0, (c.membersCount || 1) - 1) }
              : c
          )
        );
        showToast(`Left ${comm.shortTitle || comm.title}.`, "info");
      } else {
        await joinCommunity({ community: comm, user, profile });
        setJoinedIds((prev) => [...prev, comm.id]);
        setCommunities((prev) =>
          prev.map((c) =>
            c.id === comm.id
              ? { ...c, membersCount: (c.membersCount || 0) + 1 }
              : c
          )
        );
        showToast(`Joined ${comm.title}!`);
      }
      await refreshProfile();
    } catch (err) {
      showToast(err?.message || "Unable to update membership right now.", "error");
    } finally {
      setBusyId(null);
    }
  };

  const resetFilters = () => {
    setActiveSegment("all");
    setSearchTerm("");
    setSelectedGoal("All");
    setSelectedStage("All");
    setSelectedDiet("All");
    setSelectedLocation("All");
    setSortBy("popular");
  };

  return (
    <ProteinClubLayout breadcrumbs={[{ label: "Explore Communities" }]}>
      {/* Page Header */}
      <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-protein-dark sm:text-3xl">
              Explore Communities
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Join like-minded people, learn, share daily meals, and stay motivated together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex w-full items-center gap-2 rounded-xl border border-gray-300 bg-protein-surface px-3 py-2 focus-within:border-protein-green sm:w-72">
              <Search size={17} className="shrink-0 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search communities..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <Link
              to="/protein-club/suggest-community"
              className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-protein-soft px-3.5 py-2 text-xs font-bold text-protein-dark transition hover:bg-green-100 sm:text-sm"
            >
              <Lightbulb size={16} className="text-orange-500" />
              Suggest a Community
            </Link>
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-protein-surface p-1">
            {[
              { id: "all", label: `All Communities (${communities.length})` },
              { id: "joined", label: `My Communities (${joinedIds.length})` },
              { id: "official", label: "Official" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSegment(tab.id)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                  activeSegment === tab.id
                    ? "bg-protein-green text-white shadow-sm"
                    : "text-gray-700 hover:text-protein-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by Goal"
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-protein-green"
            >
              {goalFilters.map((g) => (
                <option key={g} value={g}>
                  Goal: {g}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Life Stage"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-protein-green"
            >
              {stageFilters.map((s) => (
                <option key={s} value={s}>
                  Stage: {s}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Diet Type"
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-protein-green"
            >
              {dietFilters.map((d) => (
                <option key={d} value={d}>
                  Diet: {d}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-protein-green"
            >
              {locationFilters.map((loc) => (
                <option key={loc} value={loc}>
                  Location: {loc}
                </option>
              ))}
            </select>

            <select
              aria-label="Sort communities"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-protein-green"
            >
              <option value="popular">Popular</option>
              <option value="discussions">Most Active</option>
            </select>

            {(selectedGoal !== "All" ||
              selectedStage !== "All" ||
              selectedDiet !== "All" ||
              selectedLocation !== "All" ||
              searchTerm) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="h-72 animate-pulse rounded-2xl border border-green-100 bg-white p-4"
            />
          ))}
        </div>
      ) : filteredCommunities.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-green-100 bg-white p-10 text-center">
          <Users className="mx-auto text-protein-green" size={40} />
          <h2 className="mt-3 text-lg font-extrabold text-protein-dark">
            No matching communities found
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Try clearing some filters or suggest a new community for your goal.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full border border-protein-green px-5 py-2 text-sm font-bold text-protein-green"
            >
              Show All Communities
            </button>
            <Link
              to="/protein-club/suggest-community"
              className="rounded-full bg-protein-orange px-5 py-2 text-sm font-bold text-white"
            >
              Suggest a Community
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCommunities.map((c) => {
            const isJoined = joinedIds.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/protein-club/community/${c.slug}`)}
                className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:border-protein-green hover:shadow-md"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-protein-soft">
                    <img
                      src={c.heroImage}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-semibold text-white">
                      <span>
                        {c.goal} · {c.category}
                      </span>
                      {c.official && (
                        <span className="inline-flex items-center gap-1 text-lime-300">
                          <ShieldCheck size={14} /> Official
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-extrabold text-gray-900 group-hover:text-protein-green">
                      {c.title}
                    </h2>
                    <p className="mt-1 text-xs font-semibold tabular-nums text-gray-500">
                      {(c.membersCount || 0).toLocaleString()} members ·{" "}
                      <span className="inline-flex items-center gap-0.5">
                        <MapPin size={12} /> {c.location || "India"}
                      </span>
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
                  <button
                    type="button"
                    disabled={busyId === c.id}
                    onClick={(e) => handleToggleJoin(e, c)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-extrabold transition ${
                      isJoined
                        ? "border border-protein-green bg-protein-soft text-protein-green hover:bg-green-100"
                        : "bg-protein-green text-white hover:bg-protein-hover"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 size={15} /> Joined
                      </>
                    ) : busyId === c.id ? (
                      "Joining..."
                    ) : (
                      "Join Community"
                    )}
                  </button>

                  <Link
                    to={`/protein-club/community/${c.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Open <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Suggest Community Banner */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border border-green-100 bg-gradient-to-r from-protein-soft to-white p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-protein-green text-white">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-protein-dark">
              Don&apos;t see the community you&apos;re looking for?
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Suggest a topic — EatProtein admins review and launch new official communities every week.
            </p>
          </div>
        </div>

        <Link
          to="/protein-club/suggest-community"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-protein-orange px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-protein-orange2"
        >
          Suggest a Community <ArrowRight size={16} />
        </Link>
      </div>
    </ProteinClubLayout>
  );
}