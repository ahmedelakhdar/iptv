"use client";

import React from "react";
import Link from "next/link";
import {
  Boxes,
  CheckCircle,
  ShieldCheck,
  Zap,
  Flame,
  Tv,
  Film,
  Server,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FeaturesGrid() {
  const { t } = useLanguage();

  return (
    <section id="tarifs" className="relative py-16 lg:py-24">
      {/* Glow background accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-400 mb-4 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("featuresGrid.badge")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight">
            {t("featuresGrid.title")}
          </h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            {t("featuresGrid.subtitle")}
          </p>
        </div>

        {/* 3 Large Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          
          {/* Card 1: Nos Plans Curatés */}
          <div className="glass-panel glass-panel-hover relative flex flex-col justify-between rounded-3xl p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 right-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
              <Flame className="h-3.5 w-3.5 text-amber-300" />
              <span>{t("pricing.popular")}</span>
            </div>

            <div>
              {/* Stacked Box Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/40 bg-cyan-950/60 shadow-lg mb-6">
                <Boxes className="h-7 w-7 text-cyan-400" />
              </div>

              {/* Header */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("bento.t3_title")}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {t("bento.t3_desc")}
              </p>

              {/* Pricing */}
              <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-[#060913]/80 p-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">27.00 €</span>
                  <span className="text-sm font-semibold text-cyan-400">/ an</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  {t("featuresGrid.c1_promo")}
                </span>
              </div>

              {/* Feature List with Icons */}
              <ul className="space-y-3.5 mb-8">
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Zap className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{t("featuresGrid.c1_item1")}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Tv className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span>{t("featuresGrid.c1_item2")}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Film className="h-4 w-4 text-teal-400 flex-shrink-0" />
                  <span>{t("featuresGrid.c1_item3")}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-200">
                  <Server className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{t("featuresGrid.c1_item4")}</span>
                </li>
              </ul>
            </div>

            <Link
              href="#commander"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-neon-cyan py-3.5 text-center text-sm font-bold text-cyan-200 transition-all hover:scale-[1.02]"
            >
              <span>{t("nav.commander")}</span>
              <ArrowRight className="h-4 w-4 text-cyan-400" />
            </Link>
          </div>

          {/* Card 2: Pourquoi Ahmed */}
          <div className="glass-panel glass-panel-hover flex flex-col justify-between rounded-3xl p-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div>
              {/* Shield Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-950/60 shadow-lg mb-6">
                <ShieldCheck className="h-7 w-7 text-emerald-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {t("featuresGrid.c2_title")}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {t("featuresGrid.c2_desc")}
              </p>

              <div className="space-y-5 mb-8">
                {/* Feature 1: Stability */}
                <div className="rounded-xl border border-emerald-500/20 bg-[#060913]/60 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">Stability</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    {t("featuresGrid.c2_stability_desc")}
                  </p>
                </div>

                {/* Feature 2: Curation */}
                <div className="rounded-xl border border-cyan-500/20 bg-[#060913]/60 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Curation</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    {t("featuresGrid.c2_curation_desc")}
                  </p>
                </div>

                {/* Feature 3: Performance */}
                <div className="rounded-xl border border-teal-500/20 bg-[#060913]/60 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <h4 className="text-sm font-bold text-white">Performance</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    {t("featuresGrid.c2_performance_desc")}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-neon-green py-3.5 text-center text-sm font-bold text-emerald-300 transition-all hover:scale-[1.02]"
            >
              <span>{t("featuresGrid.learn_more")}</span>
            </Link>
          </div>

          {/* Card 3: Statistics */}
          <div className="glass-panel glass-panel-hover flex flex-col justify-between rounded-3xl p-8 border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
            <div>
              {/* Stat Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-500/40 bg-teal-950/60 shadow-lg mb-6">
                <TrendingUp className="h-7 w-7 text-teal-400" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                {t("featuresGrid.c3_stat_header")}
              </span>
              
              <h3 className="text-4xl font-extrabold text-white mt-2 mb-1 gradient-text-hero">
                +35,000
              </h3>
              <p className="text-xl font-bold text-cyan-300 mb-2">
                {t("featuresGrid.c3_live_channels")}
              </p>
              <p className="text-sm font-semibold text-emerald-400 mb-6">
                HD / 4K / 8K
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between rounded-lg bg-[#060913]/70 px-3.5 py-2.5 text-xs">
                  <span className="text-slate-400">{t("featuresGrid.c3_vod")}</span>
                  <span className="font-bold text-white">+80,000 Titres</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#060913]/70 px-3.5 py-2.5 text-xs">
                  <span className="text-slate-400">{t("featuresGrid.c3_activation")}</span>
                  <span className="font-bold text-emerald-400">&lt; 15 Minutes</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#060913]/70 px-3.5 py-2.5 text-xs">
                  <span className="text-slate-400">{t("featuresGrid.c3_uptime")}</span>
                  <span className="font-bold text-cyan-400">99.9% Uptime</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#060913]/70 px-3.5 py-2.5 text-xs">
                  <span className="text-slate-400">{t("featuresGrid.c3_satisfaction")}</span>
                  <span className="font-bold text-amber-400">4.9 / 5.0 ★</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-medium">
                {t("featuresGrid.c3_footer")}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
