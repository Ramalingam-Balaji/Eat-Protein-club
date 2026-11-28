export const THEME_STORAGE_KEY = "eatprotein_brand_theme_v1";

export const DEFAULT_ICON_THEME = {
  id: "eatprotein-icon",
  name: "EatProtein Icon",
  primary: "#0B7A3B",
  primaryHover: "#075E2D",
  dark: "#053D1E",
  footerBg: "#032A14",
  lime: "#84CC16",
  accent: "#FF6B00",
  accentHover: "#E25B00",
  gold: "#F59E0B",
  tint: "#F1F9EC",
  tintStrong: "#E2F2D8",
  surface: "#F7FBF4",
  canvas: "#FFFFFF",
  text: "#0D2216",
  muted: "#4B6354",
  border: "#D9EBD1",
  logoUrl: "",
};

export const ICON_THEME_PRESETS = [
  DEFAULT_ICON_THEME,
  {
    id: "fresh-sprout",
    name: "Fresh Sprout & Citrus",
    primary: "#15803D",
    primaryHover: "#166534",
    dark: "#064E3B",
    footerBg: "#042F24",
    lime: "#A3E635",
    accent: "#F97316",
    accentHover: "#EA580C",
    gold: "#FBBF24",
    tint: "#F0FDF4",
    tintStrong: "#DCFCE7",
    surface: "#F7FEF9",
    canvas: "#FFFFFF",
    text: "#0B2419",
    muted: "#476656",
    border: "#D1F0DC",
    logoUrl: "",
  },
  {
    id: "emerald-vitality",
    name: "Deep Emerald & Amber",
    primary: "#047857",
    primaryHover: "#065F46",
    dark: "#022C22",
    footerBg: "#02231B",
    lime: "#34D399",
    accent: "#D97706",
    accentHover: "#B45309",
    gold: "#F59E0B",
    tint: "#ECFDF5",
    tintStrong: "#D1FAE5",
    surface: "#F5FCF9",
    canvas: "#FFFFFF",
    text: "#08241C",
    muted: "#44625A",
    border: "#CBECE0",
    logoUrl: "",
  },
  {
    id: "orchard-harvest",
    name: "Orchard Green & Tangerine",
    primary: "#2F855A",
    primaryHover: "#276749",
    dark: "#1C4532",
    footerBg: "#122E21",
    lime: "#9AE6B4",
    accent: "#ED642B",
    accentHover: "#D94E18",
    gold: "#ECC94B",
    tint: "#F2FAF5",
    tintStrong: "#E2F4EA",
    surface: "#F8FCF9",
    canvas: "#FFFFFF",
    text: "#12261C",
    muted: "#4A6155",
    border: "#D5EAE0",
    logoUrl: "",
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeHex(hex, fallback = "#0B7A3B") {
  if (!hex || typeof hex !== "string") return fallback;
  const cleaned = hex.trim().replace("#", "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return (
      "#" +
      cleaned
        .split("")
        .map((c) => c + c)
        .join("")
        .toUpperCase()
    );
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return "#" + cleaned.toUpperCase();
  }
  return fallback;
}

export function hexToRgb(hex) {
  const full = normalizeHex(hex).slice(1);
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function hexToRgbTuple(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${r} ${g} ${b}`;
}

export function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToHex(h, s, l) {
  const hn = ((h % 360) + 360) % 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (hn < 60) {
    r = c;
    g = x;
  } else if (hn < 120) {
    r = x;
    g = c;
  } else if (hn < 180) {
    g = c;
    b = x;
  } else if (hn < 240) {
    g = x;
    b = c;
  } else if (hn < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/**
 * Generates a full harmonized WCAG-friendly website theme from a Primary + Accent + Lime seed.
 */
export function buildThemeFromBaseColors({
  id = "custom-icon",
  name = "Custom Icon Theme",
  primary,
  accent,
  lime,
  logoUrl = "",
}) {
  const safePrimary = normalizeHex(primary, DEFAULT_ICON_THEME.primary);
  const safeAccent = normalizeHex(accent, DEFAULT_ICON_THEME.accent);
  const pRgb = hexToRgb(safePrimary);
  const pHsl = rgbToHsl(pRgb.r, pRgb.g, pRgb.b);
  const aRgb = hexToRgb(safeAccent);
  const aHsl = rgbToHsl(aRgb.r, aRgb.g, aRgb.b);

  const normalizedPrimary = hslToHex(
    pHsl.h,
    clamp(pHsl.s, 42, 86),
    clamp(pHsl.l, 24, 36)
  );
  const primaryHover = hslToHex(
    pHsl.h,
    clamp(pHsl.s + 4, 48, 88),
    clamp(pHsl.l - 7, 17, 29)
  );
  const dark = hslToHex(pHsl.h, clamp(pHsl.s, 45, 82), 14);
  const footerBg = hslToHex(pHsl.h, clamp(pHsl.s, 48, 84), 9);

  const safeLime = lime
    ? normalizeHex(lime, DEFAULT_ICON_THEME.lime)
    : hslToHex((pHsl.h + 24) % 360, 78, 47);

  const normalizedAccent = hslToHex(
    aHsl.h,
    clamp(aHsl.s, 65, 98),
    clamp(aHsl.l, 44, 52)
  );
  const accentHover = hslToHex(
    aHsl.h,
    clamp(aHsl.s, 68, 98),
    clamp(aHsl.l - 7, 36, 45)
  );

  return {
    id,
    name,
    primary: normalizedPrimary,
    primaryHover,
    dark,
    footerBg,
    lime: safeLime,
    accent: normalizedAccent,
    accentHover,
    gold: hslToHex((aHsl.h + 16) % 360, 92, 50),
    tint: hslToHex(pHsl.h, clamp(Math.round(pHsl.s * 0.45), 24, 52), 95),
    tintStrong: hslToHex(pHsl.h, clamp(Math.round(pHsl.s * 0.5), 26, 54), 90),
    surface: hslToHex(pHsl.h, clamp(Math.round(pHsl.s * 0.35), 18, 40), 97),
    canvas: "#FFFFFF",
    text: hslToHex(pHsl.h, 38, 10),
    muted: hslToHex(pHsl.h, 16, 36),
    border: hslToHex(pHsl.h, clamp(Math.round(pHsl.s * 0.38), 20, 42), 86),
    logoUrl,
  };
}

/**
 * Extracts dominant brand colors from any icon / logo image using an offscreen Canvas.
 */
export function extractThemeFromIcon(imageSrc, name = "Custom Icon Theme") {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 64;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(DEFAULT_ICON_THEME);
          return;
        }
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 130) continue;

          const { h, s, l } = rgbToHsl(r, g, b);
          if (s < 24 || l < 10 || l > 92) continue;

          const bucketKey = Math.floor(h / 24);
          const weight = (s / 100) * (1 - Math.abs(l - 48) / 60);
          const existing = buckets.get(bucketKey) || {
            weight: 0,
            rSum: 0,
            gSum: 0,
            bSum: 0,
            count: 0,
            h,
          };
          existing.weight += weight;
          existing.rSum += r * weight;
          existing.gSum += g * weight;
          existing.bSum += b * weight;
          existing.count += weight;
          buckets.set(bucketKey, existing);
        }

        const ranked = Array.from(buckets.values())
          .filter((b) => b.count > 0)
          .sort((a, b) => b.weight - a.weight)
          .map((b) => {
            const r = Math.round(b.rSum / b.count);
            const g = Math.round(b.gSum / b.count);
            const bl = Math.round(b.bSum / b.count);
            const hsl = rgbToHsl(r, g, bl);
            return {
              hex: rgbToHex(r, g, bl),
              hsl,
              weight: b.weight,
            };
          });

        if (ranked.length === 0) {
          resolve({ ...DEFAULT_ICON_THEME, name, logoUrl: imageSrc });
          return;
        }

        const primarySeed = ranked[0];
        const accentSeed =
          ranked.find((c) => {
            const diff = Math.abs(c.hsl.h - primarySeed.hsl.h);
            const hueGap = Math.min(diff, 360 - diff);
            return hueGap >= 40;
          }) || {
            hex: hslToHex((primarySeed.hsl.h + 150) % 360, 88, 50),
            hsl: { h: (primarySeed.hsl.h + 150) % 360, s: 88, l: 50 },
          };

        const limeSeed =
          ranked.find(
            (c) =>
              c.hex !== primarySeed.hex &&
              c.hex !== accentSeed.hex &&
              c.hsl.l >= 42
          ) || null;

        resolve(
          buildThemeFromBaseColors({
            id: "icon-extracted",
            name,
            primary: primarySeed.hex,
            accent: accentSeed.hex,
            lime: limeSeed?.hex,
            logoUrl: imageSrc,
          })
        );
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Could not read icon image."));
    img.src = imageSrc;
  });
}

export function loadSavedTheme() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return DEFAULT_ICON_THEME;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.primary) {
      return DEFAULT_ICON_THEME;
    }
    return { ...DEFAULT_ICON_THEME, ...parsed };
  } catch {
    return DEFAULT_ICON_THEME;
  }
}

export function applyThemeToDocument(theme) {
  const t = { ...DEFAULT_ICON_THEME, ...theme };
  const root = document.documentElement;

  const vars = {
    "--ep-primary": t.primary,
    "--ep-primary-rgb": hexToRgbTuple(t.primary),
    "--ep-primary-hover": t.primaryHover,
    "--ep-primary-hover-rgb": hexToRgbTuple(t.primaryHover),
    "--ep-dark": t.dark,
    "--ep-dark-rgb": hexToRgbTuple(t.dark),
    "--ep-footer": t.footerBg,
    "--ep-footer-rgb": hexToRgbTuple(t.footerBg),
    "--ep-lime": t.lime,
    "--ep-lime-rgb": hexToRgbTuple(t.lime),
    "--ep-accent": t.accent,
    "--ep-accent-rgb": hexToRgbTuple(t.accent),
    "--ep-accent-hover": t.accentHover,
    "--ep-accent-hover-rgb": hexToRgbTuple(t.accentHover),
    "--ep-gold": t.gold,
    "--ep-gold-rgb": hexToRgbTuple(t.gold),
    "--ep-tint": t.tint,
    "--ep-tint-rgb": hexToRgbTuple(t.tint),
    "--ep-tint-strong": t.tintStrong,
    "--ep-tint-strong-rgb": hexToRgbTuple(t.tintStrong),
    "--ep-surface": t.surface,
    "--ep-surface-rgb": hexToRgbTuple(t.surface),
    "--ep-canvas": t.canvas,
    "--ep-text": t.text,
    "--ep-text-rgb": hexToRgbTuple(t.text),
    "--ep-muted": t.muted,
    "--ep-muted-rgb": hexToRgbTuple(t.muted),
    "--ep-border": t.border,
    "--ep-border-rgb": hexToRgbTuple(t.border),
  };

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", t.primary);
  }
}
