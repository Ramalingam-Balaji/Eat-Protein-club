import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

export default function WhatsAppSupport() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const phoneNumber = "919440701380";

  const message = encodeURIComponent(
    "Hello EatProtein Support! I need some assistance."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowTooltip(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Detect footer visibility
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Hide WhatsApp widget when footer is visible
  if (isFooterVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3">
      {/* WhatsApp Support Popup */}
      {showTooltip && (
        <div className="relative flex items-center gap-3 rounded-2xl border border-[var(--color-brand-border,#e2ece4)] bg-white px-4 py-3 shadow-xl animate-in fade-in slide-in-from-right-3 duration-300">
          <div>
            <p className="text-sm font-bold text-[var(--color-brand-primary-dark,#064e25)]">
              Need Help?
            </p>
            <p className="text-xs text-gray-500">
              Chat with EatProtein on WhatsApp
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close support popup"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact EatProtein on WhatsApp"
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
        <FaWhatsapp size={32} className="relative z-10" />
      </a>
    </div>
  );
}
