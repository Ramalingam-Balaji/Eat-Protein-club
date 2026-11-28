import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Download,
  UserCheck,
  LogOut,
  ChevronDown,
  Shield,
  Target,
  Users,
} from "lucide-react";

import { navItems, appPromoItem } from "../data/navItems";
import eatProteinIcon from "../assets/logo.png";
import { useProteinClubAuth } from "../context/ProteinClubAuthContext";
import { useBrandTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isAdmin, logout } = useProteinClubAuth();
  const { theme } = useBrandTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const scrollToSection = useCallback((target) => {
    if (!target) return;
    const section = document.getElementById(target);
    if (!section) return;

    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, sectionTop),
      behavior: "smooth",
    });
  }, []);

  const handleRouteClick = useCallback(
    (path) => {
      if (!path) return;
      setMobileMenuOpen(false);
      setAccountMenuOpen(false);

      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      navigate(path);
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [location.pathname, navigate]
  );

  const handleSectionClick = useCallback(
    (target) => {
      if (!target) return;
      setMobileMenuOpen(false);
      setAccountMenuOpen(false);

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: target } });
        return;
      }

      scrollToSection(target);
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleNavigation = useCallback(
    (item) => {
      if (!item) return;
      if (item.type === "route" && item.path) {
        handleRouteClick(item.path);
        return;
      }
      if (item.type === "section" && item.id) {
        handleSectionClick(item.id);
        return;
      }
      if (item.label?.toLowerCase().includes("franchise") && item.path) {
        handleRouteClick(item.path.startsWith("/") ? item.path : `/${item.path}`);
      }
    },
    [handleRouteClick, handleSectionClick]
  );

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (location.pathname !== "/" || !target) return;

    let frame1;
    let frame2;
    const timeout = window.setTimeout(() => {
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          scrollToSection(target);
          navigate("/", { replace: true, state: {} });
        });
      });
    }, 100);

    return () => {
      window.clearTimeout(timeout);
      if (frame1 !== undefined) cancelAnimationFrame(frame1);
      if (frame2 !== undefined) cancelAnimationFrame(frame2);
    };
  }, [location.pathname, location.state, navigate, scrollToSection]);

  useEffect(() => {
    queueMicrotask(() => {
      setMobileMenuOpen(false);
      setAccountMenuOpen(false);
    });
  }, [location.pathname]);

  const handleAppClick = () => {
    handleSectionClick(appPromoItem.id);
  };

  const handleLogoClick = () => {
    handleSectionClick("home");
  };

  const isNavItemActive = (item) => {
    if (item.type !== "route" || !item.path) return false;
    if (item.path === "/protein-club") {
      return location.pathname.startsWith("/protein-club");
    }
    return location.pathname === item.path;
  };

  const displayName = profile?.displayName || user?.displayName || "Member";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-protein-border/80 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex min-h-[68px] w-full max-w-[1450px] items-center justify-between gap-3 px-4 py-2.5 sm:px-5 lg:px-6 2xl:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="shrink-0"
          aria-label="Go to Home"
        >
          <img
            src={theme.logoUrl || eatProteinIcon}
            alt="EatProtein"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </button>

        {/* Desktop navigation */}
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = isNavItemActive(item);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-protein-soft text-protein-green"
                    : "text-protein-text/80 hover:bg-protein-soft/70 hover:text-protein-green"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-full border border-protein-border bg-protein-soft px-3.5 py-2 text-sm font-bold text-protein-dark transition hover:bg-protein-tint"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-protein-green text-xs font-extrabold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[120px] truncate">{displayName}</span>
                <ChevronDown size={15} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-protein-border bg-white p-2 shadow-xl">
                  <Link
                    to="/protein-club/my-club"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-protein-text hover:bg-protein-soft"
                  >
                    <UserCheck size={16} className="text-protein-green" />
                    My Protein Club
                  </Link>
                  <Link
                    to="/protein-club/communities"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-protein-text hover:bg-protein-soft"
                  >
                    <Users size={16} className="text-protein-green" />
                    Explore Communities
                  </Link>
                  <Link
                    to="/protein-club/goal"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-protein-text hover:bg-protein-soft"
                  >
                    <Target size={16} className="text-protein-orange" />
                    My Protein Goal
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/protein-club/admin"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-protein-dark hover:bg-protein-soft"
                    >
                      <Shield size={16} className="text-protein-green" />
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="my-1 border-t border-protein-border/60" />
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleRouteClick("/protein-club/register")}
              className="whitespace-nowrap shrink-0 rounded-full border border-protein-green px-4 py-2 text-sm font-bold text-protein-green transition hover:bg-protein-soft"
            >
              Join / Login
            </button>
          )}

          <button
            type="button"
            onClick={handleAppClick}
            className="whitespace-nowrap shrink-0 items-center gap-2 rounded-full bg-protein-green px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-protein-hover xl:inline-flex"
          >
            <Download size={16} />
            <span>{appPromoItem.label}</span>
          </button>
        </div>

        {/* Mobile and tablet menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-protein-dark transition-colors hover:bg-protein-soft xl:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile and tablet navigation */}
      {mobileMenuOpen && (
        <div className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-protein-border bg-white px-4 py-4 shadow-lg sm:px-5 xl:hidden">
          <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigation(item)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  isNavItemActive(item)
                    ? "bg-protein-soft text-protein-green"
                    : "text-protein-text/80 hover:bg-protein-soft/70 hover:text-protein-green"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="my-2 border-t border-protein-border/60 pt-2">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleRouteClick("/protein-club/my-club")}
                    className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-bold text-protein-green hover:bg-protein-soft"
                  >
                    My Protein Club ({displayName})
                  </button>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleRouteClick("/protein-club/admin")}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-bold text-protein-dark hover:bg-protein-soft"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRouteClick("/protein-club/register")}
                  className="mb-2 w-full rounded-full border border-protein-green px-5 py-2.5 text-sm font-bold text-protein-green"
                >
                  Join / Login to Protein Club
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleAppClick}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-protein-green px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-protein-hover"
            >
              <Download size={17} />
              {appPromoItem.label}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
