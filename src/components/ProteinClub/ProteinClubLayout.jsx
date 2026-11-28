import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Trophy,
  BarChart3,
  Gift,
  CalendarDays,
  BookOpen,
  Shield,
  Target,
  Smartphone,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useProteinClubAuth } from "../../context/ProteinClubAuthContext";
import { clubImages } from "../../pages/ProteinClub/data/communities";

const sidebarLinks = [
  { label: "My Protein Club", to: "/protein-club/my-club", icon: Home, match: ["/protein-club/my-club", "/protein-club/dashboard"] },
  { label: "Explore Communities", to: "/protein-club/communities", icon: Users, match: ["/protein-club/communities", "/protein-club/explore-communities", "/protein-club/community"] },
  { label: "Challenges", to: "/protein-club/challenges", icon: Trophy, match: ["/protein-club/challenges", "/protein-club/21-day-protein-challenge"] },
  { label: "Leaderboard", to: "/protein-club/leaderboard", icon: BarChart3, match: ["/protein-club/leaderboard", "/protein-club/leaderboard-rewards"] },
  { label: "Rewards", to: "/protein-club/rewards", icon: Gift, match: ["/protein-club/rewards"] },
  { label: "Events & Webinars", to: "/protein-club/events", icon: CalendarDays, match: ["/protein-club/events"] },
  { label: "Resources", to: "/protein-club/resources", icon: BookOpen, match: ["/protein-club/resources"] },
];

export default function ProteinClubLayout({
  children,
  breadcrumbs = [],
  activeCommunityTitle = "",
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin } = useProteinClubAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isRouteActive = (item) =>
    item.match.some((prefix) => location.pathname === prefix || location.pathname.startsWith(prefix + "/"));

  const handleOpenAppPromo = () => {
    navigate("/", { state: { scrollTo: "app-promo" } });
  };

  return (
    <div className="min-h-screen bg-protein-surface">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row">
        {/* Desktop Left Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-protein-border bg-white px-4 py-5 lg:flex">
          <div className="sticky top-[88px] flex flex-col gap-5">
            <Link
              to="/protein-club"
              className="flex items-center gap-2.5 px-2 text-lg font-extrabold text-protein-dark"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-protein-soft text-protein-green">
                <Users size={20} />
              </span>
              <span>Protein Club</span>
            </Link>

            <nav className="flex flex-col gap-1" aria-label="Protein Club navigation">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                      active
                        ? "bg-gradient-to-r from-protein-green to-protein-hover text-white shadow-sm"
                        : "text-protein-text/80 hover:bg-protein-soft hover:text-protein-dark"
                    }`}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}

              <Link
                to="/protein-club/goal"
                className={`mt-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  location.pathname === "/protein-club/goal"
                    ? "bg-gradient-to-r from-protein-green to-protein-hover text-white shadow-sm"
                    : "text-protein-text/80 hover:bg-protein-soft hover:text-protein-dark"
                }`}
              >
                <Target
                  size={18}
                  className={`shrink-0 ${
                    location.pathname === "/protein-club/goal"
                      ? "text-white"
                      : "text-protein-orange"
                  }`}
                />
                <span>My Protein Goal</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/protein-club/admin"
                  className={`mt-2 flex items-center gap-3 rounded-xl border border-protein-border px-3.5 py-2.5 text-sm font-bold whitespace-nowrap transition-colors ${
                    location.pathname.startsWith("/protein-club/admin")
                      ? "bg-protein-dark text-white"
                      : "bg-protein-soft text-protein-dark hover:bg-protein-tint"
                  }`}
                >
                  <Shield size={18} className="shrink-0" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>

            {/* Bottom Mobile App Handoff Card */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-protein-border bg-gradient-to-b from-protein-soft to-white p-4">
              <div className="flex items-start gap-3">
                <img
                  src={clubImages.eatProteinApp}
                  alt="EatProtein Mobile App"
                  className="h-16 w-12 shrink-0 rounded-lg object-cover shadow-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-protein-dark">
                    Get the EatProtein App
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-protein-muted">
                    Track daily protein, meals, recipes & streaks on the go.
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleOpenAppPromo}
                  className="inline-flex items-center justify-center gap-1 rounded-lg bg-protein-dark px-2 py-1.5 text-[11px] font-bold text-white transition hover:bg-black"
                >
                  <Smartphone size={12} />
                  App Store
                </button>
                <button
                  type="button"
                  onClick={handleOpenAppPromo}
                  className="inline-flex items-center justify-center gap-1 rounded-lg bg-protein-green px-2 py-1.5 text-[11px] font-bold text-white transition hover:bg-protein-hover"
                >
                  <Smartphone size={12} />
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-7">
          {/* Mobile Club Sub-Nav Strip */}
          <div className="mb-4 flex items-center justify-between gap-2 rounded-2xl border border-protein-border bg-white px-3.5 py-2.5 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-sm font-bold text-protein-dark"
            >
              {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              <span>Protein Club Menu</span>
            </button>
            <div className="flex items-center gap-2">
              {user ? (
                <span className="truncate max-w-[140px] text-xs font-semibold text-protein-green">
                  {profile?.displayName || user.displayName || "Member"}
                </span>
              ) : (
                <Link
                  to="/protein-club/register"
                  className="rounded-full bg-protein-green px-3 py-1 text-xs font-bold text-white"
                >
                  Join Free
                </Link>
              )}
            </div>
          </div>

          {mobileSidebarOpen && (
            <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-protein-border bg-white p-3 shadow-sm lg:hidden">
              {sidebarLinks.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${
                      active
                        ? "bg-protein-green text-white"
                        : "bg-protein-surface text-protein-text"
                    }`}
                  >
                    <Icon size={15} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                to="/protein-club/goal"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 rounded-xl bg-protein-surface px-3 py-2 text-xs font-semibold text-protein-text"
              >
                <Target size={15} className="text-protein-orange" />
                <span>Protein Goal</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/protein-club/admin"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2 rounded-xl bg-protein-dark px-3 py-2 text-xs font-bold text-white"
                >
                  <Shield size={15} />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>
          )}

          {/* Contextual Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-medium text-protein-muted sm:text-sm"
            >
              <Link to="/protein-club" className="text-protein-green hover:underline">
                Protein Club
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label + idx}>
                  <ChevronRight size={14} className="text-protein-muted/60" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="text-protein-green hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-protein-dark">
                      {activeCommunityTitle || crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
