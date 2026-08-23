"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, Minus, Flame } from "lucide-react";
import { getPlans, PlanData } from "@/app/actions/adminActions";
import { PlanDetailsModal } from "@/components/ui/PlanDetailsModal";
import { useLanguage } from "@/context/LanguageContext";
import { getConnectionsText, formatEuroPrice } from "@/lib/utils";

export function ComparisonTable() {
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

  const rowDefinitions = [
    {
      label: t("comparison.price_row"),
      getValue: (p: PlanData) => {
        const dur = (p.duration || p.period || "12 mois").replace(/^\/\s*/, "");
        return `${formatEuroPrice(p.price)} / ${dur}`;
      },
    },
    { label: t("comparison.live_row"), getValue: (p: PlanData) => p.liveChannels || "8 000" },
    { label: t("comparison.quality_row"), getValue: (p: PlanData) => p.quality || "HD" },
    { label: t("comparison.devices_row"), getValue: (p: PlanData) => getConnectionsText(p.name) },
    { label: t("comparison.vod_row"), getValue: (p: PlanData) => p.hasVod },
    { label: t("comparison.epg_row"), getValue: (p: PlanData) => p.hasEpg },
    { label: t("comparison.replay_row"), getValue: (p: PlanData) => p.hasReplay },
    { label: t("comparison.adults_row"), getValue: (p: PlanData) => p.hasAdults },
    { label: t("comparison.ibo_row"), getValue: (p: PlanData) => p.hasIboPlayer },
    { label: t("comparison.guarantee_row"), getValue: (p: PlanData) => p.hasGuarantee },
    { label: t("comparison.refund_row"), getValue: (p: PlanData) => p.hasRefund },
    { label: t("comparison.support_row"), getValue: (p: PlanData) => p.hasSupport },
  ];

  const renderValue = (val: boolean | string, isPopularCol: boolean = false) => {
    if (typeof val === "boolean") {
      if (val) {
        return (
          <div className="flex items-center justify-center">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-950/90 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              <Check className="h-3.5 w-3.5 text-cyan-400" />
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center">
          <Minus className="h-4 w-4 text-slate-400 dark:text-slate-600" />
        </div>
      );
    }
    return (
      <span className={`text-xs font-semibold ${isPopularCol ? "text-cyan-600 dark:text-cyan-300 font-bold" : "text-slate-800 dark:text-slate-200"}`}>
        {val}
      </span>
    );
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28">
      {/* Ambient background glow - pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-3 backdrop-blur-xl shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <span>{t("comparison.badge")}</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight leading-tight">
            {t("comparison.title_part1")}{" "}
            <span className="animated-gradient-text">{t("comparison.title_part2")}</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            {t("comparison.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm font-semibold text-slate-400">
            Chargement du tableau comparatif...
          </div>
        ) : (
          /* Responsive Table Wrapper with touch overflow scroll */
          <div className="glass-bento rounded-3xl border border-slate-200 dark:border-white/10 p-3 sm:p-8 shadow-lg overflow-x-auto custom-scrollbar relative z-10 touch-pan-x">
            <table className="w-full min-w-[650px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="p-3 sm:p-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/4">
                    {t("comparison.feature_header")}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`p-3 sm:p-4 text-center text-xs font-bold uppercase tracking-wider ${
                        plan.isPopular
                          ? "text-cyan-600 dark:text-cyan-400 font-black bg-cyan-100/50 dark:bg-cyan-950/40 border-x border-cyan-500/40 rounded-t-2xl relative"
                          : "text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="inline-flex items-center gap-1 text-[10px] text-amber-900 dark:text-amber-300 font-bold bg-amber-200/80 dark:bg-cyan-900/60 px-2 py-0.5 rounded-full mb-1">
                          <Flame className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                          <span>{t("pricing.popular")}</span>
                        </div>
                      )}
                      <div className="block">{plan.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {rowDefinitions.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="p-3 sm:p-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                      {row.label}
                    </td>
                    {plans.map((plan) => {
                      const val = row.getValue(plan);
                      return (
                        <td
                          key={plan.id}
                          className={`p-3 sm:p-4 text-center ${
                            plan.isPopular ? "bg-cyan-50/50 dark:bg-cyan-950/30 border-x border-cyan-500/30" : ""
                          }`}
                        >
                          {renderValue(val, plan.isPopular)}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Fiche Offre Action Row */}
                <tr>
                  <td className="p-3 sm:p-4 text-xs font-bold text-slate-900 dark:text-white">
                    {t("comparison.offer_sheet")}
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`p-3 sm:p-4 text-center ${
                        plan.isPopular
                          ? "bg-cyan-50/50 dark:bg-cyan-950/30 border-x border-b border-cyan-500/30 rounded-b-2xl"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => setSelectedPlan(plan)}
                        className={`inline-flex items-center justify-center rounded-full px-3.5 py-2 text-[11px] font-extrabold transition-all min-h-[38px] ${
                          plan.isPopular
                            ? "violet-cyan-gradient text-white shadow-md hover:scale-105"
                            : "border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300"
                        }`}
                      >
                        {t("pricing.view_offer")}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 text-center relative z-20">
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline transition-all group min-h-[44px]"
          >
            <span>{t("comparison.view_detail")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </div>

      </div>

      {/* Offer Modal */}
      <PlanDetailsModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan}
      />
    </section>
  );
}
