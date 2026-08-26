"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";
import { PlanDetailsModal } from "@/components/ui/PlanDetailsModal";
import { getPlans, PlanData } from "@/app/actions/adminActions";
import { formatEuroPrice } from "@/lib/utils";
import { Check, Flame, Sparkles, ArrowRight, ShieldCheck, Zap, Tv } from "lucide-react";

export default function TarifsPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState<PlanData[]>([]);

  useEffect(() => {
    getPlans().then((loadedPlans) => setPlans(loadedPlans));
  }, []);

  const handleOpenModal = (plan: PlanData) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-violet-600 selection:text-white transition-colors duration-300">
      {/* Floating Pill Navbar */}
      <Navbar />

      <main className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
        
        {/* Pulsing Ambient Background Radial Gradient Orbs - strictly pointer-events-none z-0 */}
        <div className="pointer-events-none z-0 absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-600/20 to-fuchsia-600/20 blur-[160px] animate-ambient-orb-1" />
        <div className="pointer-events-none z-0 absolute top-40 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/15 blur-[140px] animate-ambient-orb-2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Sparkles className="h-4 w-4 animate-spin text-cyan-500 dark:text-cyan-400" />
              <span>GRILLE DES TARIFS OFFICIELS • EUROPE</span>
            </div>

            {/* Title: IPTV For Europe */}
            <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-6xl lg:text-7xl tracking-tight leading-tight">
              <span className="gradient-text-cyan drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                IPTV For Europe
              </span>{" "}
              <span className="text-lg sm:text-3xl text-slate-500 dark:text-slate-400 font-light tracking-normal">
                (EUR)
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Choisissez le forfait adapté à vos besoins. Tous nos abonnements incluent l&apos;activation IBO Player, la stabilité 4K et le support VIP 24/7.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Paiement Sécurisé</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Activation &lt; 15 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tv className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span>IBO Player Inclus</span>
              </div>
            </div>

          </div>

          {/* Responsive Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch pt-4 pb-12 relative z-10">
            {plans.map((plan) => {
              const numPrice = parseFloat(String(plan.price).replace(/[^0-9.]/g, "")) || 0;
              const origPrice = typeof plan.originalPrice === "number" ? plan.originalPrice : 0;
              const discountPercent = origPrice > numPrice && origPrice > 0 ? Math.round(((origPrice - numPrice) / origPrice) * 100) : 0;
              const isVipPlan = Boolean(plan.isVip || plan.name?.toLowerCase().includes("vip"));

              return (
                <div
                  key={plan.id}
                  className={`glass-bento glass-bento-hover relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border transition-all duration-500 group ${
                    isVipPlan
                      ? "border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.2)] bg-gradient-to-b from-[#1b170c]/95 via-[#120f08]/95 to-[#0a0a0f]/95 dark:from-[#1b170c]/95 dark:via-[#120f08]/95 dark:to-[#0a0a0f]/95 lg:scale-105 z-20"
                      : plan.isPopular
                      ? "border-cyan-500/80 dark:border-cyan-400/80 bg-white/90 dark:bg-gradient-to-b dark:from-[#101026]/90 dark:to-[#090918]/80 shadow-xl dark:shadow-[0_0_45px_rgba(6,182,212,0.35)] lg:scale-105 z-20"
                      : "border-slate-200 dark:border-white/10 hover:border-violet-500/40 z-10"
                  }`}
                >
                  {/* Floating Badges */}
                  {isVipPlan ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/80 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 py-1 text-xs font-black text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                      <Sparkles className="h-3.5 w-3.5 text-slate-950 animate-pulse" />
                      <span>FORFAIT VIP DORÉ</span>
                    </div>
                  ) : plan.isPopular ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 px-4 py-1 text-xs font-black text-white shadow-md">
                      <Flame className="h-3.5 w-3.5 text-amber-300" />
                      <span>POPULAIRE</span>
                    </div>
                  ) : null}

                  {/* Auto-Calculated Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="absolute top-4 right-4 border border-red-500 text-red-500 rounded-md px-2 py-1 text-sm font-bold z-20">
                      -{discountPercent}%
                    </div>
                  )}

                <div>
                  {/* Plan Name & Price */}
                  <div className="mb-4">
                    <h3 className={`text-xl font-extrabold mb-2 ${isVipPlan ? "text-amber-300" : "text-slate-900 dark:text-white"}`}>
                      {plan.name}
                    </h3>
                    {plan.originalPrice && plan.originalPrice > 0 && (
                      <div className="text-sm font-semibold text-gray-400 line-through decoration-red-500 mb-0.5">
                        {formatEuroPrice(plan.originalPrice)}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black ${
                        isVipPlan
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                          : plan.isPopular
                          ? "gradient-text-cyan"
                          : "text-slate-900 dark:text-white"
                      }`}>
                        {formatEuroPrice(plan.price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {plan.duration || plan.period || "/ 12 mois"}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-light pb-4 border-b border-slate-200 dark:border-white/10 mb-6 leading-relaxed min-h-[38px]">
                    {plan.subtitle}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {(plan.features && plan.features.length > 0 ? plan.features : []).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border flex-shrink-0 shadow-sm ${
                          isVipPlan
                            ? "bg-amber-500/20 border-amber-400/50"
                            : "bg-cyan-100 dark:bg-cyan-950/80 border-cyan-500/40"
                        }`}>
                          <Check className={`h-3 w-3 ${isVipPlan ? "text-amber-400" : "text-cyan-600 dark:text-cyan-400"}`} />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button - Opens PlanDetailsModal */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 relative z-20">
                  {isVipPlan ? (
                    <button
                      onClick={() => handleOpenModal(plan)}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 py-3.5 text-center text-xs font-black text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-105 min-h-[44px]"
                    >
                      <span>Voir l&apos;offre</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-950 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  ) : plan.isPopular ? (
                    <button
                      onClick={() => handleOpenModal(plan)}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full violet-cyan-gradient py-3.5 text-center text-xs font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-105 min-h-[44px]"
                    >
                      <span>Voir l&apos;offre</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(plan)}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-white/5 py-3.5 text-center text-xs font-bold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm hover:scale-[1.02] min-h-[44px]"
                    >
                      <span>Voir l&apos;offre</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover/btn:text-cyan-600 dark:group-hover/btn:text-cyan-300 transition-all group-hover/btn:translate-x-1" />
                    </button>
                  )}
                </div>

              </div>
              );
            })}
          </div>

        </div>

        {/* Pre-Footer Section 1: SEO & Quick Links */}
        <SEOSection />

        {/* Pre-Footer Section 2: Premium Explorer / Sitemap */}
        <PremiumSitemapGrid />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsApp />

      {/* Reusable Plan Details Glassmorphism Modal */}
      <PlanDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
