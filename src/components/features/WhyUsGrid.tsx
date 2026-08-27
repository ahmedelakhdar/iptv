"use client";

import React from "react";
import { Sparkles, Tv, Smartphone, MessageCircle, ShieldCheck, Coins, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function WhyUsGrid() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t("whyUs.c1_title"),
      text: t("whyUs.c1_text"),
      icon: Tv,
      iconColor: "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/50",
    },
    {
      title: t("whyUs.c2_title"),
      text: t("whyUs.c2_text"),
      icon: Smartphone,
      iconColor: "text-violet-600 dark:text-violet-400 border-violet-500/30 bg-violet-950/20 dark:bg-violet-950/50",
    },
    {
      title: t("whyUs.c3_title"),
      text: t("whyUs.c3_text"),
      icon: MessageCircle,
      iconColor: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-950/20 dark:bg-emerald-950/50",
    },
    {
      title: t("whyUs.c4_title"),
      text: t("whyUs.c4_text"),
      icon: ShieldCheck,
      iconColor: "text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-950/20 dark:bg-pink-950/50",
    },
    {
      title: t("whyUs.c5_title"),
      text: t("whyUs.c5_text"),
      icon: Coins,
      iconColor: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-950/20 dark:bg-amber-950/50",
    },
    {
      title: t("whyUs.c6_title"),
      text: t("whyUs.c6_text"),
      icon: Globe,
      iconColor: "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/50",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 border-t border-slate-200 dark:border-white/10">
      {/* Background glow orb - Desktop Only */}
      <div className="hidden md:block pointer-events-none z-0 absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/90 dark:bg-cyan-950/90 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-3 md:backdrop-blur-xl shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t("whyUs.badge")}</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight leading-tight">
            {t("whyUs.title")}{" "}
            <span className="animated-gradient-text">{t("whyUs.title_highlight")}</span>
          </h2>
        </div>

        {/* 3x2 Glassmorphism Grid - Collapses cleanly to 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="glass-bento glass-bento-hover rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-white/10 relative z-10 overflow-hidden flex flex-col justify-between transition-all duration-300 group text-start"
              >
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg mb-6 ${card.iconColor}`}>
                    <IconComp className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 text-start group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed text-start">
                    {card.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
