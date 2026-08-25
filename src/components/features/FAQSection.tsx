"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function FAQSection() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-28">
      {/* Glow Orb - pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 dark:bg-violet-950/30 px-4 py-1.5 text-xs font-bold text-violet-700 dark:text-violet-300 mb-3 backdrop-blur-xl">
            <HelpCircle className="h-4 w-4" />
            <span>{t("faq.badge")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight leading-tight">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-bento rounded-2xl border border-slate-200 dark:border-white/10 transition-all overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left min-h-[52px]"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400 rotate-180"
                        : "border-slate-300 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed border-t border-slate-200 dark:border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
