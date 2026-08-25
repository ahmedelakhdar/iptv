"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SEOSection() {
  const { t } = useLanguage();

  const quickLinks = [
    { name: "IPTV Netherlands", href: "#bento" },
    { name: t("seo.link_pricing"), href: "#tarifs" },
    { name: "IPTV 4K", href: "#bento" },
    { name: t("seo.link_guide"), href: "/guide" },
    { name: t("seo.link_faq"), href: "/faq" },
  ];

  return (
    <section className="relative py-12 lg:py-16">
      {/* Background Glow - strictly pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Wide Glassmorphism Container */}
        <div className="glass-bento relative overflow-hidden rounded-3xl p-6 sm:p-12 border border-cyan-500/30 shadow-lg dark:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="max-w-3xl">
              {/* Subtitle Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/20 dark:bg-cyan-950/50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
                <span>{t("seo.badge")}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {t("seo.title")}{" "}
                <span className="animated-gradient-text">{t("seo.title_highlight")}</span> ?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {t("seo.desc")}
              </p>
            </div>

            {/* Right Icon Accent */}
            <div className="hidden lg:flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 shadow-xl flex-shrink-0">
              <Compass className="h-8 w-8 text-cyan-500 dark:text-cyan-400 animate-spin-slow" />
            </div>

          </div>

          {/* Quick Link Pills Row */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              {t("seo.keywords_title")}
            </span>

            <div className="flex flex-wrap items-center gap-3 relative z-20">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="group relative z-20 inline-flex items-center rounded-full border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm min-h-[38px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mr-2 group-hover:animate-ping" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
