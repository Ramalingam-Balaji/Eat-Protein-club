import { ArrowUp, Instagram, Facebook, Youtube, Palette } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { navItems } from "../data/navItems";
import eatProteinFooterLogo from "../assets/logo1.png";
import appStore from "../assets/images/app-store.png";
import googlePlay from "../assets/images/google-play.png";
import { useBrandTheme } from "../context/ThemeContext";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, openStudio } = useBrandTheme();

  const goTo = (target) => {
    if (!target) return;

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: target } });
      return;
    }

    const section = document.getElementById(target);
    if (!section) return;

    const navbar = document.querySelector("header");
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
    const sectionTop =
      window.scrollY + section.getBoundingClientRect().top - navbarHeight;

    window.scrollTo({
      top: Math.max(0, sectionTop),
      behavior: "smooth",
    });
  };

  return (
    <footer className="scroll-mt-0 bg-protein-footer px-5 py-10 text-white">
      <div className="mx-auto grid max-w-[1450px] gap-7 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center">
            {theme.logoUrl ? (
              <div className="inline-flex rounded-xl bg-white px-3 py-1.5 shadow-sm">
                <img
                  src={theme.logoUrl}
                  alt="EatProtein"
                  className="h-12 w-auto object-contain"
                />
              </div>
            ) : (
              <img
                src={eatProteinFooterLogo}
                alt="EatProtein"
                className="h-16 w-auto object-contain"
              />
            )}
          </div>

          <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
            Your trusted partner for premium protein-rich foods and healthy nutrition solutions. Join thousands of satisfied customers on their wellness journey.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.type === "route" ? (
                  <Link
                    to={item.path}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
                    className="text-left text-sm text-white/85 transition-colors hover:text-protein-lime"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => goTo(item.id)}
                    className="text-left text-sm text-white/85 transition-colors hover:text-protein-lime"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-bold text-white">Download Our App</h3>

          <div className="mt-5 w-full">
            <div className="flex flex-nowrap items-center gap-3">
              <a
                href="https://apps.apple.com/in/app/eat-protein/id6636532383"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download EatProtein on the App Store"
                className="transition duration-200 hover:-translate-y-1"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-12 w-auto rounded-lg object-contain"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.mannschaft.eatprotien"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get EatProtein on Google Play"
                className="transition duration-200 hover:-translate-y-1"
              >
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-12 w-auto rounded-lg object-contain"
                />
              </a>
            </div>

            <div className="mt-5 flex w-full flex-row flex-nowrap items-center gap-2 sm:gap-3">
              <a
                href="https://www.instagram.com/eatprotein_offl?igsh=cjJtZnVtdjlzcGpq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-200 hover:border-protein-lime hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61560653348052&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-200 hover:border-protein-lime hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
              >
                <Facebook size={19} />
              </a>

              <a
                href="https://youtube.com/@eatprotein-offl?si=BFJs5bMrQZ6iZpy9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-200 hover:border-protein-lime hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
              >
                <Youtube size={19} />
              </a>

              <a
                href="https://wa.me/9440701380"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-200 hover:border-protein-lime hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
              >
                <FaWhatsapp size={21} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-7 flex max-w-[1450px] flex-col gap-4 border-t border-white/15 pt-5 text-[12px] text-white/85 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} EatProtein. All rights reserved.</span>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link to="/terms" className="transition-colors hover:text-protein-lime">
            Terms &amp; Conditions
          </Link>

          <Link to="/privacy" className="transition-colors hover:text-protein-lime">
            Privacy Policy
          </Link>

          <Link to="/shipping" className="transition-colors hover:text-protein-lime">
            Shipping Policy
          </Link>

          <button
            type="button"
            onClick={openStudio}
            className="inline-flex items-center gap-1.5 text-protein-lime transition-colors hover:text-white"
          >
            <Palette size={13} />
            Brand Theme
          </button>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1 transition-colors hover:text-protein-lime"
        >
          Back to top <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
