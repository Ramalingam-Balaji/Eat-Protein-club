import React, { useRef, useState } from "react";
import { Check, Palette, RotateCcw, Upload, X } from "lucide-react";
import { useBrandTheme } from "../context/ThemeContext";
import defaultLogo from "../assets/logo.png";

export default function BrandThemeStudioModal() {
  const {
    theme,
    presets,
    isStudioOpen,
    closeStudio,
    applyPreset,
    applyColorsFromSeeds,
    applyIconImage,
    resetTheme,
  } = useBrandTheme();

  const fileInputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (!isStudioOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setStatusMessage("");
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = String(reader.result || "");
          await applyIconImage(dataUrl, file.name.replace(/\.[^.]+$/, ""));
          setStatusMessage("Theme extracted from your uploaded icon and applied site-wide.");
        } catch {
          setStatusMessage("Could not read colors from that image. Try another PNG or JPG.");
        } finally {
          setBusy(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setBusy(false);
      setStatusMessage("Unable to process that icon file.");
    }
  };

  const handleExtractFromCurrentLogo = async () => {
    setBusy(true);
    setStatusMessage("");
    try {
      await applyIconImage(theme.logoUrl || defaultLogo, "EatProtein Icon");
      setStatusMessage("Palette synced directly from the active brand icon.");
    } catch {
      setStatusMessage("Could not read palette from the active icon.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      onClick={closeStudio}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-theme-studio-title"
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-protein-border bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-protein-border/70 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-protein-soft text-protein-green">
              <Palette size={20} />
            </span>
            <div>
              <h2
                id="brand-theme-studio-title"
                className="text-lg font-extrabold text-protein-dark"
              >
                Icon Brand Theme
              </h2>
              <p className="text-xs text-protein-muted">
                Update the entire website palette automatically from any brand icon.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeStudio}
            aria-label="Close theme customizer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-protein-border text-protein-muted transition hover:bg-protein-soft hover:text-protein-dark"
          >
            <X size={18} />
          </button>
        </div>

        {/* Active Icon & Upload */}
        <div className="mt-5 rounded-xl border border-protein-border bg-protein-tint p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-28 items-center justify-center overflow-hidden rounded-lg border border-protein-border bg-white p-2">
                <img
                  src={theme.logoUrl || defaultLogo}
                  alt="Active brand icon"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-protein-dark">{theme.name}</p>
                <p className="text-xs text-protein-muted">
                  Active across header, sections, cards, and footer
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={busy}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg bg-protein-green px-3.5 py-2 text-xs font-bold text-white transition hover:bg-protein-hover disabled:opacity-60"
              >
                <Upload size={14} />
                {busy ? "Extracting..." : "Upload Icon"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleExtractFromCurrentLogo}
                className="inline-flex items-center gap-1.5 rounded-lg border border-protein-border bg-white px-3 py-2 text-xs font-bold text-protein-dark transition hover:bg-protein-soft"
              >
                Sync Icon Colors
              </button>
            </div>
          </div>
          {statusMessage && (
            <p className="mt-2.5 text-xs font-semibold text-protein-green">{statusMessage}</p>
          )}
        </div>

        {/* Quick Icon Presets */}
        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-protein-muted">
            Theme Presets
          </h3>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {presets.map((preset) => {
              const isActive = theme.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    applyPreset(preset.id);
                    setStatusMessage(`Applied "${preset.name}".`);
                  }}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition ${
                    isActive
                      ? "border-protein-green bg-protein-soft"
                      : "border-protein-border bg-white hover:border-protein-green/50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-protein-dark">{preset.name}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {[preset.dark, preset.primary, preset.lime, preset.accent].map(
                        (swatch, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-full border border-black/10"
                            style={{ backgroundColor: swatch }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-protein-green text-white">
                      <Check size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fine-tune Seed Swatches */}
        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-protein-muted">
            Fine-Tune Icon Colors
          </h3>
          <div className="mt-2.5 grid grid-cols-3 gap-3">
            {[
              { label: "Primary", key: "primary", value: theme.primary },
              { label: "Accent", key: "accent", value: theme.accent },
              { label: "Highlight", key: "lime", value: theme.lime },
            ].map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-protein-border bg-protein-tint/50 px-3 py-2"
              >
                <div>
                  <span className="block text-xs font-bold text-protein-dark">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] text-protein-muted">
                    {item.value}
                  </span>
                </div>
                <input
                  type="color"
                  value={item.value}
                  onChange={(e) =>
                    applyColorsFromSeeds({ [item.key]: e.target.value })
                  }
                  className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-protein-border/70 pt-4">
          <button
            type="button"
            onClick={() => {
              resetTheme();
              setStatusMessage("Reset to default EatProtein Icon theme.");
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-protein-border px-3.5 py-2 text-xs font-bold text-protein-dark transition hover:bg-protein-soft"
          >
            <RotateCcw size={14} />
            Reset to EatProtein Icon
          </button>

          <button
            type="button"
            onClick={closeStudio}
            className="rounded-lg bg-protein-green px-5 py-2 text-xs font-bold text-white transition hover:bg-protein-hover"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
