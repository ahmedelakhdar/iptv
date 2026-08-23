"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Play, ArrowRight, ShieldCheck, Tv, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getGlobalSettings, GlobalSettingsData } from "@/app/actions/adminActions";

export function HeroSection() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<GlobalSettingsData>({
    whatsappNumber: "212600000000",
    supportNumber: "212600000000",
    siteName: "IPTV Netherlands",
    logoUrl: "/logo.jpeg",
  });

  useEffect(() => {
    getGlobalSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen pt-28 sm:pt-36 pb-16 overflow-hidden flex flex-col justify-center">
      
      {/* Animated Ambient Glowing Orbs - Strictly pointer-events-none z-0 */}
      <div className="pointer-events-none z-0 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-600/15 to-cyan-500/20 blur-[150px] animate-ambient-orb-1" />
      <div className="pointer-events-none z-0 absolute top-1/3 left-1/3 h-[450px] w-[450px] rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-purple-600/20 blur-[160px] animate-ambient-orb-2" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 dark:bg-violet-950/40 px-4 py-1.5 backdrop-blur-xl mb-6 sm:mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
          <span className="text-xs font-semibold text-violet-900 dark:text-violet-200 tracking-wide">
            {t("hero.badge") || "Plateforme IPTV Nouvelle Génération • 2026"}
          </span>
        </div>

        {/* Center-Aligned Massive Headline - Scaled down on mobile to prevent overflow */}
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-8xl leading-[1.1] max-w-5xl mx-auto">
          {t("hero.title_part1") || "L'Univers du Divertissement."}{" "}
          <span className="block mt-2 animated-gradient-text drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            {t("hero.title_part2") || "Réinventé."}
          </span>
        </h1>

        {/* Sleek Subtitle */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl lg:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle") || `Diffusion Instantanée • Qualité 4K/8K • Curatée par ${settings.siteName}`}
        </p>

        {/* Dual Sleek CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 relative z-50 pointer-events-auto">
          {/* Primary Filled Vibrant Gradient Button */}
          <Link
            href="/tarifs"
            className="group relative z-50 w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full violet-cyan-gradient px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 min-h-[48px] pointer-events-auto"
          >
            <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white text-white" />
            <span>{t("hero.cta_primary") || "Démarrer l'Expérience"}</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Minimal Outline Button with Blur Effect */}
          <Link
            href="/#bento"
            className="group relative z-50 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5 px-8 py-3.5 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 hover:bg-white/90 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:scale-105 min-h-[48px] pointer-events-auto"
          >
            <Tv className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 dark:text-cyan-400" />
            <span>{t("hero.cta_secondary") || "Découvrir les Fonctionnalités"}</span>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>99.9% Uptime Serveurs</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <span>Activation &lt; 15 min</span>
          </div>
        </div>

        {/* Interactive Live Stream Preview Container */}
        <div className="mt-10 sm:mt-14 relative max-w-4xl mx-auto z-10">
          {/* Glowing Backlight Frame */}
          <div className="pointer-events-none z-0 absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-cyan-500/30 blur-3xl opacity-70 animate-pulse" />

          <div className="relative z-10 glass-bento rounded-3xl p-2 sm:p-3 border border-slate-200 dark:border-white/15 shadow-xl overflow-hidden bg-black/40">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#070714] flex items-center justify-center">
              <Image
                src={settings?.logoUrl || "/logo.jpeg"}
                alt={`${settings?.siteName || "IPTV Netherlands"} Stream Visual`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                unoptimized={settings?.logoUrl?.startsWith("data:") || settings?.logoUrl?.startsWith("http")}
                className="object-contain p-6 sm:p-10 transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-80" />

              {/* Floating Stream Stats Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 rounded-full border border-violet-500/40 bg-[#030308]/80 px-3 py-1 text-[10px] sm:text-xs font-bold text-violet-300 backdrop-blur-xl shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>FLUX 4K/8K EN DIRECT</span>
              </div>

              {/* Floating VOD Badge */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-[#030308]/85 px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-200 backdrop-blur-xl shadow-2xl">
                <Tv className="h-3.5 w-3.5 text-cyan-400" />
                <span>+35,000 Chaînes &amp; VOD</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
