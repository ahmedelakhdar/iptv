"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { getGlobalSettings, GlobalSettingsData } from "@/app/actions/adminActions";
import { useLanguage } from "@/context/LanguageContext";
import { formatWhatsAppNumber } from "@/lib/utils";
import {
  MessageCircle,
  Zap,
  Mail,
  Coins,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<GlobalSettingsData>({
    whatsappNumber: "31600000000",
    supportNumber: "31600000000",
    siteName: "IPTV For Europe",
    logoUrl: "/logo.jpeg",
    supportEmail: "contact@iptvforeurop.com",
  });

  useEffect(() => {
    getGlobalSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  const waLink = `https://wa.me/${formatWhatsAppNumber(
    settings.whatsappNumber || "212600000000"
  )}?text=${encodeURIComponent(t("whatsapp.trial_msg") || "Bonjour IPTV For Europe, je souhaite demander un essai gratuit 24h.")}`;

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <main className="relative overflow-x-hidden w-full pt-28 sm:pt-36 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-4 py-1.5 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
                {t("contactPage.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t("contactPage.title")}{" "}
              <span className="animated-gradient-text">{settings.siteName}</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {t("contactPage.subtitle")}
            </p>
          </div>

          {/* 2x2 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: WhatsApp Direct */}
            <div className="glass-bento glass-bento-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 flex flex-col justify-between items-start transition-all duration-300 shadow-sm group text-start">
              <div className="w-full flex flex-col items-start text-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-md mb-6 self-start">
                  <MessageCircle className="h-7 w-7" />
                </div>

                <h3 dir="auto" className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors text-start w-full">
                  {t("contactPage.c1_title")}
                </h3>

                <p dir="auto" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6 text-start w-full">
                  {t("contactPage.c1_desc")}
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-4 text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all hover:scale-[1.02] group/btn"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span dir="auto">{t("contactPage.c1_btn")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </a>
            </div>

            {/* Card 2: Chat en Direct */}
            <div className="glass-bento glass-bento-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 flex flex-col justify-between items-start transition-all duration-300 shadow-sm group text-start">
              <div className="w-full flex flex-col items-start text-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 shadow-md mb-6 self-start">
                  <Zap className="h-7 w-7" />
                </div>

                <h3 dir="auto" className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors text-start w-full">
                  {t("contactPage.c2_title")}
                </h3>

                <p dir="auto" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6 text-start w-full">
                  {t("contactPage.c2_desc")}
                </p>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl violet-cyan-gradient py-4 text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all hover:scale-[1.02] group/btn"
              >
                <Zap className="h-4 w-4 shrink-0" />
                <span dir="auto">{t("contactPage.c2_btn")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </a>
            </div>

            {/* Card 3: E-mail Support */}
            <div className="glass-bento glass-bento-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 flex flex-col justify-between items-start transition-all duration-300 shadow-sm group text-start">
              <div className="w-full flex flex-col items-start text-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shadow-md mb-6 self-start">
                  <Mail className="h-7 w-7" />
                </div>

                <h3 dir="auto" className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors text-start w-full">
                  {t("contactPage.c3_title")}
                </h3>

                <p dir="auto" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-1 text-start w-full">
                  {t("contactPage.c3_desc")}
                </p>

                <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mb-6 text-start w-full">
                  {settings.supportEmail || "contact@iptvforeurop.com"}
                </p>
              </div>

              <a
                href={`mailto:${settings.supportEmail || "contact@iptvforeurop.com"}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 py-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-all hover:scale-[1.02] group/btn"
              >
                <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span dir="auto">{t("contactPage.c3_btn")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </a>
            </div>

            {/* Card 4: Forfaits & Tarifs */}
            <div className="glass-bento glass-bento-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 flex flex-col justify-between items-start transition-all duration-300 shadow-sm group text-start">
              <div className="w-full flex flex-col items-start text-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shadow-md mb-6 self-start">
                  <Coins className="h-7 w-7" />
                </div>

                <h3 dir="auto" className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors text-start w-full">
                  {t("contactPage.c4_title")}
                </h3>

                <p dir="auto" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6 text-start w-full">
                  {t("contactPage.c4_desc")}
                </p>
              </div>

              <Link
                href="/tarifs"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-500/40 bg-violet-500/10 dark:bg-violet-950/40 py-4 text-xs sm:text-sm font-extrabold text-violet-700 dark:text-violet-200 hover:bg-violet-500/20 transition-all hover:scale-[1.02] group/btn"
              >
                <Coins className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <span dir="auto">{t("contactPage.c4_btn")}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Quick Security Guarantee Banner */}
          <div className="glass-bento rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 max-w-4xl mx-auto flex items-center justify-center gap-4 text-center">
            <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t("contactPage.guarantee_text")}
            </p>
          </div>

          {/* Premium Sitemap Grid */}
          <PremiumSitemapGrid />

        </div>
      </main>

      <Footer />
    </div>
  );
}
