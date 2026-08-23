"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

  useEffect(() => {
    const saved = localStorage.getItem("iptv_locale") as Locale;
    if (saved && (saved === "fr" || saved === "ar" || saved === "en" || saved === "nl" || saved === "pt" || saved === "es")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("iptv_locale", newLocale);
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  // Translation helper supporting nested keys like "nav.home" or "howToOrder.title"
  const t = (keyPath: string): string => {
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
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dir, t }}>
      <div dir={dir} className={dir === "rtl" ? "font-arabic" : ""}>
        {children}
      </div>
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
