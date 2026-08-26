"use client";

import React from "react";
import Link from "next/link";
import { Compass, Sparkles, Shield, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function PremiumSitemapGrid() {
  const { t } = useLanguage();

  const category1Main = [
    { title: "IPTV For Europe", sub: t("sitemap.m1_sub"), href: "/" },
    { title: t("sitemap.m2_title"), sub: t("sitemap.m2_sub"), href: "/tarifs" },
    { title: t("sitemap.m3_title"), sub: t("sitemap.m3_sub"), href: "/guide" },
    { title: t("sitemap.m4_title"), sub: t("sitemap.m4_sub"), href: "/fonctionnalites" },
    { title: t("sitemap.m5_title"), sub: t("sitemap.m5_sub"), href: "/faq" },
    { title: t("sitemap.m6_title"), sub: t("sitemap.m6_sub"), href: "/contact" },
    { title: t("sitemap.m7_title"), sub: t("sitemap.m7_sub"), href: "/contact" },
  ];

  const category2Netherlands = [
    { title: "IPTV Lite", sub: t("sitemap.n1_sub"), href: "/tarifs" },
    { title: t("sitemap.n2_title"), sub: t("sitemap.n2_sub"), href: "/tarifs" },
    { title: t("sitemap.n3_title"), sub: t("sitemap.n3_sub"), href: "/tarifs" },
  ];

  const category3Europe = [
    { title: "IPTV Europe 50€", sub: t("sitemap.e1_sub"), href: "/tarifs" },
    { title: "IPTV Europe 60€", sub: t("sitemap.e2_sub"), href: "/tarifs" },
    { title: "IPTV Europe 80€", sub: t("sitemap.e3_sub"), href: "/tarifs" },
  ];

  const category4Guides = [
    { title: t("sitemap.g1_title"), sub: t("sitemap.g1_sub"), href: "/tarifs" },
    { title: "IBO Player Europe", sub: t("sitemap.g2_sub"), href: "/guide" },
    { title: t("sitemap.g3_title"), sub: t("sitemap.g3_sub"), href: "/tarifs" },
    { title: t("sitemap.g4_title"), sub: t("sitemap.g4_sub"), href: "/fonctionnalites" },
    { title: t("sitemap.g5_title"), sub: t("sitemap.g5_sub"), href: "/tarifs" },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 border-t border-slate-200 dark:border-white/10">
      {/* Glow Orbs - strictly pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/3 right-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/30 px-3.5 py-1 text-xs font-bold text-violet-700 dark:text-violet-300 mb-3 backdrop-blur-xl">
            <Compass className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
            <span>{t("sitemap.badge")}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {t("sitemap.title")} <span className="animated-gradient-text">IPTV For Europe</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light mt-1">
            {t("sitemap.desc")}
          </p>
        </div>

        {/* Categories Grid Container */}
        <div className="space-y-10 sm:space-y-12">
          
          {/* CATEGORY 1: Principaux Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-widest">
                Navigation Principale &amp; Services
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {category1Main.map((tile, idx) => (
                <Link
                  key={idx}
                  href={tile.href}
                  className="glass-bento glass-bento-hover group flex flex-col justify-between rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 relative z-10 overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:scale-[1.02] shadow-sm min-h-[72px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {tile.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {tile.sub}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORY 2 & 3: Forfaits Netherlands & Forfaits Europe (2 columns) */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
            
            {/* Category 2: FORFAITS NETHERLANDS */}
            <div className="glass-bento rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  FORFAITS NETHERLANDS
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {category2Netherlands.map((tile, idx) => (
                  <Link
                    key={idx}
                    href={tile.href}
                    className="glass-bento rounded-xl p-4 border border-slate-200 dark:border-white/10 hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group relative z-10 min-h-[64px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                        {tile.title}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light mt-1">
                      {tile.sub}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category 3: FORFAITS EUROPE */}
            <div className="glass-bento rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-widest">
                  FORFAITS EUROPE
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {category3Europe.map((tile, idx) => (
                  <Link
                    key={idx}
                    href={tile.href}
                    className="glass-bento rounded-xl p-4 border border-slate-200 dark:border-white/10 hover:border-violet-500/40 hover:bg-slate-50 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group relative z-10 min-h-[64px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                        {tile.title}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light mt-1">
                      {tile.sub}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* CATEGORY 4: GUIDES & INSTALLATION */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-widest">
                GUIDES &amp; INFORMATIONS PRATIQUES
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {category4Guides.map((tile, idx) => (
                <Link
                  key={idx}
                  href={tile.href}
                  className="glass-bento glass-bento-hover group flex flex-col justify-between rounded-2xl p-4 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 relative z-10 shadow-sm min-h-[64px]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {tile.title}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {tile.sub}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
