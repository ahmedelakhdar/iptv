"use client";

import React from "react";
import { Sparkles, ShoppingBag, MessageCircle, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HowToOrderGrid() {
  const { t } = useLanguage();

  const cards = [
    {
      num: t("howToOrder.card1_num") || "01",
      title: t("howToOrder.card1_title") || "Choisissez",
      text: t("howToOrder.card1_text") || "Lite, Standard, Premium ou VIP selon votre besoin.",
      icon: ShoppingBag,
    },
    {
      num: t("howToOrder.card2_num") || "02",
      title: t("howToOrder.card2_title") || "WhatsApp",
      text: t("howToOrder.card2_text") || "Un clic ouvre la conversation avec le forfait pré-rempli.",
      icon: MessageCircle,
    },
    {
      num: t("howToOrder.card3_num") || "03",
      title: t("howToOrder.card3_title") || "Regardez",
      text: t("howToOrder.card3_text") || "Codes + guide IBO Player. Vous regardez dans la foulée.",
      icon: Play,
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 border-t border-black/10 dark:border-white/10">
      {/* Background glow orb - strictly pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-300 mb-3 backdrop-blur-xl shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>{t("howToOrder.badge") || "SIMPLE"}</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight leading-tight">
            Comment <span className="animated-gradient-text">commander</span>
          </h2>
        </div>

        {/* 3-Column Glassmorphism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="glass-bento rounded-3xl p-6 sm:p-10 border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-2xl transition-all duration-300 relative z-10 overflow-hidden group hover:scale-[1.02] shadow-lg flex flex-col justify-between items-start text-start"
              >
                <div className="w-full text-start">
                  <div className="flex items-center justify-between mb-6 w-full">
                    <span className="text-4xl sm:text-5xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                      {card.num}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 dir="auto" className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors text-start">
                    {card.title}
                  </h3>

                  <p dir="auto" className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed text-start">
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
