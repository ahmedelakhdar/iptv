"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tv, Sun, Moon, ShoppingBag, Menu, X, ChevronDown, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage, Locale } from "@/context/LanguageContext";
import { getGlobalSettings, GlobalSettingsData } from "@/app/actions/adminActions";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<GlobalSettingsData>({
    whatsappNumber: "212600000000",
    supportNumber: "212600000000",
    siteName: "IPTV For Europe",
    logoUrl: "/logo.jpeg",
  });

  useEffect(() => {
    setMounted(true);
    getGlobalSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  // Click outside detection for language dropdown (only bound when open to conserve iOS CPU/RAM)
  useEffect(() => {
    if (!langDropdownOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(target)
      ) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [langDropdownOpen]);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.pricing"), href: "/tarifs" },
    { name: t("nav.features"), href: "/fonctionnalites" },
    { name: t("nav.guide"), href: "/guide" },
    { name: t("nav.faq"), href: "/faq" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "nl", label: "Nederlands", flag: "🇳🇱" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <>
      {/* Fixed Header Container - pointer-events-none and max-w-[100vw] removed for iOS Safari stability */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full pt-3 px-3 sm:px-4 box-border">
        <div className="mx-auto w-full max-w-5xl">
          <header className="glass-pill flex flex-row items-center justify-between w-full max-w-full rounded-full px-3.5 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 relative z-50 shadow-xl box-border">

            {/* Starting Edge: Brand Logo & Title Group */}
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="group flex flex-row items-center gap-2 sm:gap-2.5 shrink min-w-0 max-w-[55%] sm:max-w-none me-2">
              <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={settings.logoUrl || "/logo.jpeg"}
                  alt={`${settings.siteName || "IPTV For Europe"} Logo`}
                  width={40}
                  height={40}
                  unoptimized={settings.logoUrl?.startsWith("data:") || settings.logoUrl?.startsWith("http")}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
                {settings.siteName || "IPTV For Europe"}
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white min-h-[38px] flex items-center justify-center"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Ending Edge: Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex shrink-0">

              {/* Desktop Language Switcher Dropdown */}
              <div className="relative z-50" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangDropdownOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 min-h-[38px]"
                >
                  <span>{currentLang.flag}</span>
                  <span className="uppercase">{currentLang.code}</span>
                  <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {langDropdownOpen && (
                  <div className="absolute end-0 top-full mt-2 w-40 rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#070714]/95 p-1.5 shadow-2xl md:backdrop-blur-md z-[9999]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors min-h-[38px] ${
                          locale === lang.code
                            ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hydration-Safe Dark/Light Mode Theme Toggle */}
              <button
                type="button"
                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors hover:border-violet-500/40 hover:text-violet-400"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-violet-600" />
                  )
                ) : (
                  <div className="h-4 w-4" />
                )}
              </button>

              {/* Glowing Commander Button */}
              <Link
                href="/tarifs"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full violet-cyan-gradient px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 min-h-[40px]"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>{t("nav.commander")}</span>
              </Link>

            </div>

            {/* Ending Edge: Mobile Controls Group (Language, Theme, Hamburger) */}
            <div className="ms-auto flex flex-row items-center gap-1 sm:gap-1.5 md:hidden relative z-50 shrink-0">

              {/* 1. Mobile Language Switcher Pill */}
              <div className="relative z-50" ref={mobileDropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangDropdownOpen((prev) => !prev);
                  }}
                  className="flex items-center gap-1 rounded-full border border-slate-300/80 dark:border-white/15 bg-slate-900/95 dark:bg-black/95 px-2.5 py-1.5 text-xs font-bold text-white md:backdrop-blur-md shadow-sm transition-all active:scale-95 min-h-[36px]"
                >
                  <Globe className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown className={`h-3 w-3 text-slate-300 shrink-0 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {langDropdownOpen && (
                  <div className="absolute end-0 top-full mt-2 w-40 rounded-2xl border border-slate-700/60 dark:border-white/20 bg-slate-950/98 dark:bg-[#070714]/98 p-1.5 shadow-2xl md:backdrop-blur-md z-[9999]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLocale(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors min-h-[38px] ${
                          locale === lang.code
                            ? "bg-cyan-500/25 text-cyan-400 font-bold"
                            : "text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Theme Toggle Squircle */}
              <button
                type="button"
                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Theme"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300/80 dark:border-white/15 bg-slate-900/95 dark:bg-black/95 text-slate-100 md:backdrop-blur-md shadow-sm transition-all active:scale-95 min-h-[36px] min-w-[36px] shrink-0"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-violet-400" />
                  )
                ) : (
                  <div className="h-4 w-4" />
                )}
              </button>

              {/* 3. Hamburger Menu Squircle */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen((prev) => !prev);
                }}
                aria-label="Toggle Navigation Menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300/80 dark:border-white/15 bg-slate-900/95 dark:bg-black/95 text-slate-100 md:backdrop-blur-md shadow-sm transition-all active:scale-95 min-h-[36px] min-w-[36px] shrink-0 cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 text-cyan-400" />
                ) : (
                  <Menu className="h-4 w-4 text-slate-100" />
                )}
              </button>
            </div>

          </header>

          {/* Mobile Menu Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="glass-pill mt-2 rounded-3xl p-5 md:hidden md:backdrop-blur-md border border-slate-200 dark:border-white/15 bg-white/98 dark:bg-[#070714]/98 shadow-2xl relative z-[9999] navbar-dropdown-enter w-full max-w-full">

              {/* Mobile Header Logo */}
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-slate-200 dark:border-white/10">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full violet-cyan-gradient p-0.5 shadow-md shrink-0">
                  <Image
                    src={settings.logoUrl || "/logo.jpeg"}
                    alt={`${settings.siteName || "IPTV For Europe"} Logo`}
                    width={32}
                    height={32}
                    unoptimized={settings.logoUrl?.startsWith("data:") || settings.logoUrl?.startsWith("http")}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {settings.siteName || "IPTV For Europe"}
                </span>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1.5 relative z-50">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setLangDropdownOpen(false);
                    }}
                    className="flex items-center rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-slate-100 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 min-h-[44px] transition-all cursor-pointer relative z-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 relative z-50">
                {/* Mobile Commander CTA Button */}
                <Link
                  href="/tarifs"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full violet-cyan-gradient py-3.5 text-center text-xs font-extrabold text-white shadow-lg min-h-[44px] cursor-pointer relative z-50"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{t("nav.commander")}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}