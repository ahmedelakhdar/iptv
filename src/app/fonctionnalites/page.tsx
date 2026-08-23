"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Play,
  Monitor,
  Zap,
  MessageSquare,
  Tv,
  ShieldCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function FonctionnalitesPage() {
  const { t } = useLanguage();

  const featureItems = [
    {
      title: t("featuresPage.f1_title"),
      description: t("featuresPage.f1_desc"),
      icon: Play,
      badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/50 border-cyan-500/30",
    },
    {
      title: t("featuresPage.f2_title"),
      description: t("featuresPage.f2_desc"),
      icon: Monitor,
      badgeColor: "text-violet-600 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-950/50 border-violet-500/30",
    },
    {
      title: t("featuresPage.f3_title"),
      description: t("featuresPage.f3_desc"),
      icon: Tv,
      badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/50 border-emerald-500/30",
    },
    {
      title: t("featuresPage.f4_title"),
      description: t("featuresPage.f4_desc"),
      icon: Zap,
      badgeColor: "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-950/50 border-amber-500/30",
    },
    {
      title: t("featuresPage.f5_title"),
      description: t("featuresPage.f5_desc"),
      icon: ShieldCheck,
      badgeColor: "text-pink-600 dark:text-pink-400 bg-pink-500/10 dark:bg-pink-950/50 border-pink-500/30",
    },
    {
      title: t("featuresPage.f6_title"),
      description: t("featuresPage.f6_desc"),
      icon: MessageSquare,
      badgeColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/50 border-cyan-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/40 px-4 py-1.5 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold text-violet-700 dark:text-violet-300">
                {t("featuresPage.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t("featuresPage.title_part1")}{" "}
              <span className="animated-gradient-text">{t("featuresPage.title_part2")}</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {t("featuresPage.subtitle")}
            </p>
          </div>

          {/* 6 Features Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featureItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-bento glass-bento-hover rounded-3xl p-7 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-sm"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-md mb-6 ${item.badgeColor}`}>
                      <IconComp className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{t("featuresPage.included")}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlighted Bottom Box: "Pour qui est cet IPTV Netherlands ?" */}
          <div className="glass-bento rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-gradient-to-br dark:from-violet-950/40 dark:via-cyan-950/30 dark:to-[#070714] relative overflow-hidden shadow-lg transition-colors duration-300">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/50 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                  <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{t("featuresPage.whoBadge")}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t("featuresPage.whoTitle")}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                  {t("featuresPage.whoText")}
                </p>
              </div>

              <div className="flex-shrink-0 w-full lg:w-auto">
                <Link
                  href="/tarifs"
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-3 rounded-full violet-cyan-gradient px-8 py-4 text-sm font-extrabold text-white shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>{t("nav.pricing")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Sitemap Grid */}
          <PremiumSitemapGrid />

        </div>
      </main>

      <Footer />
    </div>
  );
}
