import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import ProteinClubLayout from "../../components/ProteinClub/ProteinClubLayout";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import {
  fetchEvents,
  fetchUserRsvpIds,
  toggleEventRsvp,
} from "../../services/proteinClubService";
import { defaultResources } from "./data/communities";

export default function EventsResources({ mode = "events" }) {
  const navigate = useNavigate();
  const { user, profile, showToast } = useProteinClubAuth();

  const [viewOverride, setViewOverride] = useState(null);
  const activeView = viewOverride?.mode === mode ? viewOverride.value : mode;
  const setActiveView = (value) => setViewOverride({ mode, value });

  const [events, setEvents] = useState([]);
  const [rsvpIds, setRsvpIds] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState("All");
  const [resourceSearch, setResourceSearch] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [busyEventId, setBusyEventId] = useState(null);

  const loadEventsData = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const list = await fetchEvents(false);
      setEvents(list || []);
      if (user) {
        const ids = await fetchUserRsvpIds(user.uid, list);
        setRsvpIds(ids);
      } else {
        setRsvpIds([]);
      }
    } catch (err) {
      console.error("Failed loading events:", err);
    } finally {
      setLoadingEvents(false);
    }
  }, [user]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadEventsData();
    });
  }, [loadEventsData]);

  const filteredEvents = useMemo(() => {
    if (eventTypeFilter === "All") return events;
    return events.filter((ev) => ev.type === eventTypeFilter);
  }, [events, eventTypeFilter]);

  const filteredResources = useMemo(() => {
    const q = resourceSearch.trim().toLowerCase();
    if (!q) return defaultResources;
    return defaultResources.filter(
      (res) =>
        res.title.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q) ||
        res.summary.toLowerCase().includes(q)
    );
  }, [resourceSearch]);

  const handleToggleRsvp = async (eventItem) => {
    if (!user) {
      showToast("Please sign in to register for events.", "info");
      navigate("/protein-club/register");
      return;
    }
    if (eventItem._seededFallback) {
      showToast(
        "Events catalog is awaiting initial database activation by an admin.",
        "error"
      );
      return;
    }
    setBusyEventId(eventItem.id);
    try {
      const result = await toggleEventRsvp({ eventItem, user, profile });
      setRsvpIds((prev) =>
        result.registered
          ? [...prev, eventItem.id]
          : prev.filter((id) => id !== eventItem.id)
      );
      setEvents((prev) =>
        prev.map((item) =>
          item.id === eventItem.id ? { ...item, rsvpCount: result.rsvpCount } : item
        )
      );
      showToast(
        result.registered
          ? `Registered for "${eventItem.title}"`
          : "Event registration cancelled."
      );
    } catch (err) {
      showToast(err?.message || "Could not update registration.", "error");
    } finally {
      setBusyEventId(null);
    }
  };

  return (
    <ProteinClubLayout
      breadcrumbs={[
        { label: activeView === "resources" ? "Resources" : "Events & Webinars" },
      ]}
    >
      <div className="space-y-5">
        {/* Header Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-protein-soft via-protein-surface to-protein-tint p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-extrabold text-protein-green">
                <Sparkles size={13} />
                Learn & Connect
              </span>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-protein-dark sm:text-3xl">
                {activeView === "resources"
                  ? "Nutrition & Meal Resources"
                  : "Events, Webinars & Meetups"}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-700">
                Join live nutritionist sessions, local community morning walks, and practical high-protein Indian meal guides.
              </p>
            </div>

            <Link
              to="/protein-calculator"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-protein-green px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-protein-hover"
            >
              <Calculator size={15} />
              Protein Calculator
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveView("events")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                activeView === "events"
                  ? "bg-protein-green text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-green-50"
              }`}
            >
              <CalendarDays size={16} />
              Events & Webinars
            </button>
            <button
              type="button"
              onClick={() => setActiveView("resources")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                activeView === "resources"
                  ? "bg-protein-green text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-green-50"
              }`}
            >
              <BookOpen size={16} />
              Resources & Guides
            </button>
          </div>
        </section>

        {activeView === "events" && (
          <div className="space-y-4">
            {/* Event Type Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Webinar", "Workshop", "Meetup"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventTypeFilter(type)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    eventTypeFilter === type
                      ? "bg-protein-dark text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-green-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {loadingEvents ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-56 animate-pulse rounded-2xl bg-white" />
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-green-100 bg-white p-10 text-center">
                <p className="text-sm font-bold text-gray-700">
                  No upcoming events match this category right now.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((ev) => {
                  const isRegistered = rsvpIds.includes(ev.id);
                  return (
                    <article
                      key={ev.id}
                      className="flex flex-col justify-between rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-protein-soft px-3 py-1 text-xs font-bold text-protein-green">
                            <Video size={13} />
                            {ev.type || "Webinar"}
                          </span>
                          <span className="text-xs font-bold text-gray-500 tabular-nums">
                            {ev.dateLabel}
                          </span>
                        </div>
                        <h2 className="mt-3 text-lg font-extrabold text-protein-dark">
                          {ev.title}
                        </h2>
                        <p className="mt-1 text-xs font-semibold text-protein-green">
                          {ev.hostName} • {ev.communityTitle}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {ev.description}
                        </p>
                      </div>

                      <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={13} />
                            {ev.timeLabel}
                          </span>
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <Users size={13} />
                            {Number(ev.rsvpCount || 0).toLocaleString()} going
                          </span>
                        </div>
                        <button
                          type="button"
                          disabled={busyEventId === ev.id}
                          onClick={() => handleToggleRsvp(ev)}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                            isRegistered
                              ? "border border-green-200 bg-protein-soft text-protein-green"
                              : "bg-protein-green text-white hover:bg-protein-hover"
                          }`}
                        >
                          {isRegistered ? (
                            <>
                              <CheckCircle2 size={15} />
                              Registered ✓
                            </>
                          ) : (
                            <>
                              Register for Event
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeView === "resources" && (
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                placeholder="Search guides, veg templates, breakfast ideas..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-protein-green"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredResources.map((res) => (
                <article
                  key={res.id}
                  className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-protein-soft px-3 py-1 text-xs font-bold text-protein-green">
                      {res.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {res.readTime} • {res.proteinHighlight}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-extrabold text-protein-dark">
                    {res.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                    {res.summary}
                  </p>
                  <ul className="mt-4 space-y-2 rounded-xl bg-protein-surface p-3.5">
                    {res.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-relaxed text-gray-800"
                      >
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-protein-green"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProteinClubLayout>
  );
}
