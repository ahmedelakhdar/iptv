"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";
import { getWhatsappNumber } from "@/app/actions/adminActions";
import { formatWhatsAppNumber } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronRight,
  Tv,
  Download,
  Key,
  PlayCircle,
  HelpCircle,
  Sparkles,
  Smartphone,
  Monitor,
  Flame,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

export default function InstallationGuidePage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [whatsappNum, setWhatsappNum] = useState("212600000000");

  useEffect(() => {
    getWhatsappNumber().then((num) => setWhatsappNum(num));
  }, []);

  const steps = [
    {
      num: "01",
      title: t("guidePage.s1_title"),
      icon: Download,
      text: t("guidePage.s1_text"),
      bulletPoints: [
        t("guidePage.s1_bp1"),
        t("guidePage.s1_bp2"),
        t("guidePage.s1_bp3"),
      ],
    },
    {
      num: "02",
      title: t("guidePage.s2_title"),
      icon: Key,
      text: t("guidePage.s2_text"),
      bulletPoints: [
        t("guidePage.s2_bp1"),
        t("guidePage.s2_bp2"),
        t("guidePage.s2_bp3"),
      ],
    },
    {
      num: "03",
      title: t("guidePage.s3_title"),
      icon: MessageCircle,
      text: t("guidePage.s3_text"),
      bulletPoints: [
        t("guidePage.s3_bp1"),
        t("guidePage.s3_bp2"),
        t("guidePage.s3_bp3"),
      ],
    },
    {
      num: "04",
      title: t("guidePage.s4_title"),
      icon: PlayCircle,
      text: t("guidePage.s4_text"),
      bulletPoints: [
        t("guidePage.s4_bp1"),
        t("guidePage.s4_bp2"),
        t("guidePage.s4_bp3"),
      ],
    },
  ];

  const guideFaqs = [
    { q: t("guidePage.fq1"), a: t("guidePage.fa1") },
    { q: t("guidePage.fq2"), a: t("guidePage.fa2") },
    { q: t("guidePage.fq3"), a: t("guidePage.fa3") },
    { q: t("guidePage.fq4"), a: t("guidePage.fa4") },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-violet-600 selection:text-white transition-colors duration-300">
      {/* Floating Pill Navbar */}
      <Navbar />

      <main className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
        
        {/* Pulsing Ambient Background Radial Gradient Orbs - strictly pointer-events-none z-0 */}
        <div className="pointer-events-none z-0 absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-600/20 to-fuchsia-600/20 blur-[160px] animate-ambient-orb-1" />
        <div className="pointer-events-none z-0 absolute top-40 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/15 blur-[140px] animate-ambient-orb-2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
              {t("nav.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">{t("guidePage.breadcrumb")}</span>
          </nav>

          {/* Page Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
              <span>{t("guidePage.badge")}</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              {t("guidePage.title")}{" "}
              <span className="text-slate-600 dark:text-slate-400 font-normal">{t("guidePage.title_sub")}</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              {t("guidePage.subtitle")}
            </p>
          </div>

          {/* Device Compatibility Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Tv className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Smart TV</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">Samsung &amp; LG WebOS</span>
              </div>
            </div>

            <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Flame className="h-6 w-6 text-amber-500 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Amazon Firestick</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">{t("guidePage.all_4k_models")}</span>
              </div>
            </div>

            <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-violet-600 dark:text-violet-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Android &amp; iOS</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">{t("guidePage.smartphones_tablets")}</span>
              </div>
            </div>

            <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Monitor className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">MAG &amp; Box TV</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">Android Box &amp; Apple TV</span>
              </div>
            </div>
          </div>

          {/* Main Content Container: 4 Detailed Steps */}
          <div className="space-y-8 mb-20">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("guidePage.steps_header")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <div
                    key={idx}
                    className="glass-bento rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-white/10 relative z-10 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-4xl font-black text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                          {step.num}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-100 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
                          <IconComp className="h-6 w-6" />
                        </div>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
                        {step.text}
                      </p>

                      <ul className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10">
                        {step.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-light">
                            <CheckCircle className="h-4 w-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="glass-bento rounded-3xl p-8 sm:p-10 border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 via-violet-600/10 to-transparent mb-20 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-20">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                {t("guidePage.cta_title")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl">
                {t("guidePage.cta_desc")}
              </p>
            </div>

            <a
              href={`https://wa.me/${formatWhatsAppNumber(whatsappNum)}?text=Bonjour%20IPTV%20Ahmed,%20j%27ai%20besoin%20d%27aide%20pour%20l%27installation%20sur%20IBO%20Player`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 rounded-full violet-cyan-gradient px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all hover:scale-105 min-h-[44px]"
            >
              <MessageCircle className="h-4 w-4 text-white" />
              <span>{t("guidePage.cta_btn")}</span>
            </a>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("guidePage.faq_title")}
              </h2>
            </div>

            <div className="space-y-4">
              {guideFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="glass-bento rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 dark:text-white min-h-[48px]"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`h-4 w-4 text-cyan-600 dark:text-cyan-400 transition-transform ${
                        openFaq === idx ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed border-t border-slate-200 dark:border-white/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
    </div>
  );
}
