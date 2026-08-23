"use client";

import React, { useState, useEffect } from "react";
import { Check, Flame, Sparkles, ArrowRight } from "lucide-react";
import { getPlans, PlanData } from "@/app/actions/adminActions";
import { PlanDetailsModal } from "@/components/ui/PlanDetailsModal";

import { useLanguage } from "@/context/LanguageContext";
import { getConnectionsText, formatEuroPrice } from "@/lib/utils";

export function PricingCards() {
  const { t } = useLanguage();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      const loadedPlans = await getPlans();
      setPlans(loadedPlans);
      setLoading(false);
    }
    fetchPlans();
  }, []);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="pointer-events-none z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-600/15 to-fuchsia-600/15 blur-[170px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t("pricing.badge")}</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            {t("pricing.title_part1")}{" "}
            <span className="animated-gradient-text">{t("pricing.title_part2")}</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-slate-400">
            Chargement des forfaits IPTV...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch pt-4 pb-4 relative z-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`glass-bento glass-bento-hover relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border transition-all duration-500 group ${
                  plan.isPopular
                    ? "border-cyan-500/80 dark:border-cyan-400/80 bg-white/90 dark:bg-gradient-to-b dark:from-[#101026]/90 dark:to-[#090918]/80 shadow-xl dark:shadow-[0_0_45px_rgba(6,182,212,0.35)] lg:scale-105 z-20"
                    : "border-slate-200 dark:border-white/10 hover:border-violet-500/40 z-10"
                }`}
              >
                {/* Floating "POPULAIRE" Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-4 py-1 text-xs font-black text-white shadow-md">
                    <Flame className="h-3.5 w-3.5 text-amber-300" />
                    <span>{t("pricing.popular")}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Price */}
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black ${plan.isPopular ? "gradient-text-cyan" : "text-slate-900 dark:text-white"}`}>
                        {formatEuroPrice(plan.price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        / {plan.duration?.replace(/^\/\s*/, "") || plan.period || "12 mois"}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light pb-4 border-b border-slate-200 dark:border-white/10 mb-6 leading-relaxed min-h-[38px]">
                    {plan.subtitle}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                        <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="leading-snug font-bold text-cyan-600 dark:text-cyan-400">{getConnectionsText(plan.name)}</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                        <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="leading-snug">{plan.liveChannels} chaînes TV</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                        <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="leading-snug">Qualité {plan.quality}</span>
                    </li>
                    {plan.hasVod && (
                      <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                          <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="leading-snug">VOD (Films &amp; Séries)</span>
                      </li>
                    )}
                    {plan.hasEpg && (
                      <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                          <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="leading-snug">EPG Guide TV</span>
                      </li>
                    )}
                    {plan.hasReplay && (
                      <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                          <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="leading-snug">Replay 7 jours</span>
                      </li>
                    )}
                    {plan.hasAdults && (
                      <li className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-500/40 flex-shrink-0 shadow-sm">
                          <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="leading-snug">Chaînes Adultes (+18)</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Card Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 relative z-20">
                  {plan.isPopular ? (
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full violet-cyan-gradient py-3.5 text-center text-xs font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-105 min-h-[44px]"
                    >
                      <span>{t("pricing.view_offer")}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white transition-transform group-hover/btn:translate-x-1 rtl:rotate-180" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-white/5 py-3.5 text-center text-xs font-bold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm hover:scale-[1.02] min-h-[44px]"
                    >
                      <span>{t("pricing.view_offer")}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover/btn:text-cyan-600 dark:group-hover/btn:text-cyan-300 transition-all group-hover/btn:translate-x-1 rtl:rotate-180" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Plan Details Modal */}
      <PlanDetailsModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan}
      />
    </section>
  );
}
