"use client";

import React, { useEffect, useState } from "react";
import { X, Check, ShieldCheck, MessageCircle, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { getWhatsappNumber } from "@/app/actions/adminActions";
import { formatWhatsAppNumber, getConnectionsText, formatEuroPrice } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export interface PlanData {
  id: string;
  name: string;
  price: string;
  liveChannels: string;
  quality: string;
  isPopular: boolean;
  features: string[];
  bonusDays?: number;
  description?: string;
  originalPrice?: number | null;
  discountBadge?: string | null;
  period?: string;
  duration?: string;
  subtitle?: string;
}

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanData | null;
}

export function PlanDetailsModal({ isOpen, onClose, plan }: PlanDetailsModalProps) {
  const { t } = useLanguage();
  const [whatsappNumber, setWhatsappNumber] = useState("212600000000");

  useEffect(() => {
    getWhatsappNumber().then((num) => setWhatsappNumber(num));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !plan) return null;

  const uniqueFeatures = plan.features && plan.features.length > 0 ? plan.features : [];

  const formattedNum = formatWhatsAppNumber(whatsappNumber);

  const whatsappOrderUrl = `https://wa.me/${formattedNum}?text=Bonjour%20IPTV%20Ahmed,%20je%20souhaite%20commander%20l%27offre%20IPTV%20${encodeURIComponent(
    plan.name
  )}%20(${encodeURIComponent(plan.price)})`;

  const whatsappQuestionUrl = `https://wa.me/${formattedNum}?text=Bonjour,%20j%27ai%20une%20question%20sur%20l%27offre%20IPTV%20${encodeURIComponent(
    plan.name
  )}`;

  const cleanDuration = (plan.duration || plan.period || "12 mois").replace(/^\/\s*/, "");
  const hasBonusDays = typeof plan.bonusDays === "number" && plan.bonusDays > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#030308]/85 backdrop-blur-2xl transition-all duration-300">
      
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="glass-bento relative z-10 max-w-3xl w-full rounded-3xl p-6 sm:p-8 border border-cyan-500/40 bg-white/95 dark:bg-[#070714]/95 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {plan.name} — <span className="gradient-text-cyan">{formatEuroPrice(plan.price)}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                / {cleanDuration}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light">
              {plan.subtitle}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 dark:border-white/15 bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400 transition-colors hover:border-cyan-500 hover:text-slate-900 dark:hover:text-white"
            aria-label="Fermer la fenêtre"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-6 space-y-6 pr-1 custom-scrollbar flex-1">
          
          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Ce qui est inclus */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>{t("modal.included")}</span>
              </h4>

              <ul className="space-y-2.5">
                {uniqueFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-light">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/90 border border-cyan-500/50 flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Info Cards */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>{t("modal.guarantees")}</span>
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {/* Info Card 1: Dynamic Guarantee */}
                <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {t("modal.guarantee_title")}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {t("modal.guarantee_desc")}
                  </p>
                </div>

                {/* Info Card 2 */}
                <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">{t("modal.support_title")}</h5>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    {t("modal.support_desc")}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Description: Détail de l'offre */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 sm:p-5 text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              Détail de l&apos;offre {plan.name}
            </h5>
            <p>
              {plan.description && plan.description.trim() !== ""
                ? plan.description
                : `Le forfait ${plan.name} est conçu pour un usage personnel sur 1 appareil à la fois. Qualité d'image haute fidélité, accès instantané à la playlist IPTV Netherlands avec IBO Player. Activation rapide après confirmation de paiement via WhatsApp.`}
            </p>
          </div>

        </div>

        {/* Footer CTAs (Sticky at bottom) */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex-shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Primary Button */}
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 w-full flex items-center justify-center gap-2 rounded-full violet-cyan-gradient py-3.5 text-center text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4 text-white" />
              <span>{t("modal.order_btn")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Secondary Button */}
            <a
              href={whatsappQuestionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-white/5 py-3.5 text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm"
            >
              <HelpCircle className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>{t("modal.question_btn")}</span>
            </a>
          </div>

          {/* Bottom Minimal Onboarding Text */}
          <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 font-light">
            {t("modal.how_to_order")}{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">{t("modal.step1")}</span> ·{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">{t("modal.step2")}</span> ·{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">{t("modal.step3")}</span> ·{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">{t("modal.step4")}</span>
          </p>
        </div>

      </div>
    </div>
  );
}
