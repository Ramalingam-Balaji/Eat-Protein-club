import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  DEFAULT_ICON_THEME,
  ICON_THEME_PRESETS,
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  buildThemeFromBaseColors,
  extractThemeFromIcon,
  loadSavedTheme,
} from "../theme/brandTheme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const initial = loadSavedTheme();
    applyThemeToDocument(initial);
    return initial;
  });
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  useEffect(() => {
    applyThemeToDocument(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // ignore storage quota errors
    }
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState((prev) => ({ ...prev, ...nextTheme }));
  }, []);

  const applyPreset = useCallback((presetId) => {
    const found = ICON_THEME_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setThemeState({ ...found });
    }
  }, []);

  const applyColorsFromSeeds = useCallback(({ primary, accent, lime, name, logoUrl }) => {
    setThemeState((prev) =>
      buildThemeFromBaseColors({
        id: "custom-icon",
        name: name || prev.name,
        primary: primary || prev.primary,
        accent: accent || prev.accent,
        lime: lime || prev.lime,
        logoUrl: logoUrl !== undefined ? logoUrl : prev.logoUrl,
      })
    );
  }, []);

  const applyIconImage = useCallback(async (imageSrc, name = "Custom Icon Theme") => {
    const extracted = await extractThemeFromIcon(imageSrc, name);
    setThemeState(extracted);
    return extracted;
  }, []);

  const resetTheme = useCallback(() => {
    setThemeState(DEFAULT_ICON_THEME);
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const openStudio = useCallback(() => setIsStudioOpen(true), []);
  const closeStudio = useCallback(() => setIsStudioOpen(false), []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        presets: ICON_THEME_PRESETS,
        setTheme,
        applyPreset,
        applyColorsFromSeeds,
        applyIconImage,
        resetTheme,
        isStudioOpen,
        openStudio,
        closeStudio,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useBrandTheme must be used inside ThemeProvider");
  }
  return ctx;
}
