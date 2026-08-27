"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import frDict from "@/locales/fr.json";
import enDict from "@/locales/en.json";
import arDict from "@/locales/ar.json";
import nlDict from "@/locales/nl.json";
import ptDict from "@/locales/pt.json";
import esDict from "@/locales/es.json";

export type Locale = "fr" | "ar" | "en" | "nl" | "pt" | "es";

type Dictionaries = typeof frDict;

const dictionaries: Record<Locale, Dictionaries> = {
  fr: frDict,
  ar: arDict,
  en: enDict,
  nl: nlDict,
  pt: ptDict,
  es: esDict,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
  t: (keyPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [mounted, setMounted] = useState(false);

  // Restore saved locale after mount (safe for Safari Private Browsing)
  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        const saved = localStorage.getItem("iptv_locale") as Locale;
        if (saved && ["fr", "ar", "en", "nl", "pt", "es"].includes(saved)) {
          setLocaleState(saved);
        }
      }
    } catch (_err) {
      // Safari Private Browsing may throw SecurityError on localStorage access
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem("iptv_locale", newLocale);
      }
    } catch (_err) {
      // Safe fallback for Safari Private Browsing / Restricted Storage
    }
  }, []);

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  // Apply dir/lang to <html> element only after mount to avoid SSR mismatch
  useEffect(() => {
    if (!mounted) return;
    try {
      document.documentElement.dir = dir;
      document.documentElement.lang = locale;
    } catch (_err) {
      // Guard against any WebKit restriction
    }
  }, [dir, locale, mounted]);

  // Translation helper supporting nested keys like "nav.home" or "howToOrder.title"
  const t = useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split(".");
      let current: any = dictionaries[locale] || dictionaries.fr;

      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          // Fallback to FR
          let fallback: any = dictionaries.fr;
          for (const fk of keys) {
            if (fallback && typeof fallback === "object" && fk in fallback) {
              fallback = fallback[fk];
            } else {
              return keyPath;
            }
          }
          return typeof fallback === "string" ? fallback : keyPath;
        }
      }
      return typeof current === "string" ? current : keyPath;
    },
    [locale]
  );

  const contextValue = useMemo(
    () => ({ locale, setLocale, dir, t }),
    [locale, setLocale, dir, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
