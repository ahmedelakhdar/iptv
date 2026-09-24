import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { TrendingMovies } from "@/components/features/TrendingMovies";
import { PricingCards } from "@/components/features/PricingCards";
import { WhyUsGrid } from "@/components/features/WhyUsGrid";
import { HowToOrderGrid } from "@/components/features/HowToOrderGrid";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";
import { IptvPlayerMockup } from "@/components/features/IptvPlayerMockup";
import { EUROPEAN_LOCATIONS, formatLocationName } from "@/lib/locations";
import { Sparkles, Play, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

interface PageProps {
  params: Promise<{ location: string }> | { location: string };
}

async function resolveParams(params: PageProps["params"]): Promise<{ location: string }> {
  const p = await params;
  return p && p.location ? p : { location: "france" };
}

export async function generateStaticParams() {
  return EUROPEAN_LOCATIONS.map((loc) => ({
    location: loc,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { location } = await resolveParams(params);
  const locationName = formatLocationName(location);

  return {
    title: `Meilleur Abonnement IPTV ${locationName} 4K (2026) — Sans Coupure & IBO Player`,
    description: `Découvrez le meilleur abonnement IPTV en ${locationName} avec toutes les chaînes sport, cinéma & VOD en 4K/8K. Activation rapide en < 15 min & support WhatsApp 24/7.`,
    keywords: [
      `Abonnement IPTV ${locationName}`,
      `IPTV ${locationName} 4K sans coupure`,
      `Meilleur IPTV ${locationName} 2026`,
      `Fournisseur IPTV ${locationName} IBO Player`,
      `IPTV 4K ${location}`,
    ],
    alternates: {
      canonical: "./",
    },
    openGraph: {
      title: `Meilleur Abonnement IPTV ${locationName} 4K (2026) — Chaînes & Sport Live`,
      description: `Profitez du meilleur service IPTV 4K en ${locationName} avec +35 000 chaînes live et 80 000 VOD sans buffering.`,
    },
  };
}

export default async function IptvLocationPage({ params }: PageProps) {
  const { location } = await resolveParams(params);
  const locationName = formatLocationName(location);

  return (
    <div className="relative min-h-[100dvh] bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="relative overflow-x-hidden w-full">
        {/* Dynamic Location Hero Section */}
        <section className="relative min-h-[90dvh] pt-28 sm:pt-36 pb-16 overflow-hidden flex flex-col justify-center w-full max-w-full">
          <div className="hidden md:block pointer-events-none z-0 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-violet-600/20 via-cyan-500/15 to-blue-600/15 blur-3xl animate-ambient-orb-1" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full max-w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/90 dark:bg-cyan-950/90 md:backdrop-blur-md px-3.5 sm:px-4 py-1.5 mb-6 sm:mb-8 shadow-sm max-w-full">
              <Globe className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <Sparkles className="h-3.5 w-3.5 text-violet-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-cyan-200 tracking-wide truncate">
                Service IPTV N°1 en {locationName} • Édition 2026
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.1] max-w-5xl mx-auto break-words px-1">
              Abonnement IPTV {locationName} 4K —{" "}
              <span className="block mt-2 animated-gradient-text">
                Chaînes &amp; Sport en Direct Sans Coupure
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 text-sm sm:text-xl lg:text-2xl font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed px-1">
              Accédez au meilleur du divertissement en {locationName}. Plus de 35 000 chaînes en direct, 80 000 VOD en 4K/8K, activation IBO Player offerte et support WhatsApp 24/7.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 relative z-50 pointer-events-auto">
              <Link
                href="/tarifs"
                className="group relative z-50 w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-full violet-cyan-gradient px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 min-h-[48px]"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white text-white shrink-0" />
                <span>Voir les Forfaits {locationName}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Flux Ultra-Stables 99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-400" />
                <span>Activation Rapide &lt; 15 min</span>
              </div>
            </div>

            <div className="mt-8 sm:mt-14 relative max-w-4xl mx-auto z-10 w-full overflow-hidden">
              <div className="relative z-10 glass-bento rounded-2xl sm:rounded-3xl p-1 sm:p-3 border border-slate-200 dark:border-white/15 shadow-md md:shadow-xl overflow-hidden bg-slate-900/98 dark:bg-[#070714]/98">
                <IptvPlayerMockup />
              </div>
            </div>
          </div>
        </section>

        <TrendingMovies />
        <PricingCards />
        <WhyUsGrid />
        <HowToOrderGrid />
        <SEOSection />
        <PremiumSitemapGrid />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
