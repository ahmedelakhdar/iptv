"use client";

import React from "react";
import Link from "next/link";
import {
  Tv,
  Sparkles,
  Zap,
  ShieldCheck,
  MessageCircle,
  TrendingUp,
  Boxes,
  Film,
  CheckCircle2,
  ArrowRight,
  Flame,
  Radio,
} from "lucide-react";

export function BentoGrid() {
  return (
    <section id="bento" className="relative py-20 lg:py-32">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 dark:bg-violet-950/30 px-4 py-1.5 text-xs font-bold text-violet-700 dark:text-violet-300 mb-4 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            <span>Architecture &amp; Performance Exclusives</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight">
            Conçu Pour L&apos;Excellence Absolue
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 sm:text-lg font-light">
            Découvrez notre infrastructure technique et nos offres curatées à travers une expérience bento unique.
          </p>
        </div>

        {/* Asymmetrical Bento Box Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 grid-rows-none">
          
          {/* TILE 1: Large Tile (Spans 2 Columns on Desktop) - +35,000 Chaînes */}
          <div className="glass-bento glass-bento-hover md:col-span-2 lg:col-span-2 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group min-h-[320px]">
            {/* Abstract background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-950/50 shadow-lg">
                  <Tv className="h-6 w-6 text-violet-400" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-bold text-cyan-300">
                  <Radio className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                  Mise à jour en direct
                </span>
              </div>

              <span className="text-xs font-bold tracking-wider text-violet-500 dark:text-violet-400 uppercase">
                Bibliothèque Complète
              </span>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mt-1 mb-3 tracking-tight">
                +35,000 Chaînes <span className="animated-gradient-text">Live</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md font-light leading-relaxed">
                Accès illimité aux plus grands événements sportifs en direct (Ligue 1, Champions League, F1, UFC), chaînes internationales et plus de 80,000 VOD mis à jour quotidiennement.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                <span>80,000+ VOD Movies &amp; Series</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>EPG Guide TV Inclus</span>
              </div>
            </div>
          </div>

          {/* TILE 2: Tall Tile (Spans 2 Rows on Desktop) - Qualité 4K / 8K */}
          <div className="glass-bento glass-bento-hover md:col-span-1 lg:col-span-1 lg:row-span-2 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group min-h-[380px]">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/50 shadow-lg mb-6">
                <Sparkles className="h-6 w-6 text-cyan-400" />
              </div>

              <span className="text-xs font-bold tracking-wider text-cyan-500 dark:text-cyan-400 uppercase">
                Standard D&apos;Image
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-3">
                Qualité <span className="gradient-text-cyan">4K / 8K</span> HDR
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
                Profitez d&apos;une netteté cristalline jusqu&apos;à 60 images par seconde sans aucune compression excessive.
              </p>

              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-3 text-xs flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Résolution Max</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-300">Ultra HD 8K</span>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-3 text-xs flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Fréquence</span>
                  <span className="font-bold text-violet-600 dark:text-violet-300">60 FPS Fluidité</span>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-3 text-xs flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Audio</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-300">Dolby Atmos</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/10 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Adaptation automatique de la bande passante
              </span>
            </div>
          </div>

          {/* TILE 3: Curated Pricing Tile (Nos Plans Curatés) */}
          <div className="glass-bento glass-bento-hover md:col-span-2 lg:col-span-1 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border border-violet-500/30 group min-h-[320px]">
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-pink-500/40 bg-pink-950/60 px-2.5 py-0.5 text-[10px] font-bold text-pink-300">
              <Flame className="h-3 w-3 text-pink-400" />
              Populaire
            </div>

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-500/30 bg-pink-950/50 shadow-lg mb-4">
                <Boxes className="h-6 w-6 text-pink-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Nos Plans Curatés
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Accès annuel illimité tout-en-un.
              </p>

              <div className="mb-4">
                <span className="text-4xl font-black text-slate-900 dark:text-white">13.00 €</span>
                <span className="text-xs font-semibold text-violet-500 dark:text-violet-400"> / an</span>
              </div>
            </div>

            <Link
              href="/tarifs"
              className="flex items-center justify-center gap-2 rounded-full violet-cyan-gradient py-3 text-xs font-bold text-white transition-all hover:scale-105 shadow-lg"
            >
              <span>Commander Maintenant</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* TILE 4: Small Tile - Activation < 15 Min */}
          <div className="glass-bento glass-bento-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group min-h-[180px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-950/50 shadow-lg">
                <Zap className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Instantané</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Activation Rapide</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light mt-1">
                Identifiants livrés sous <span className="font-bold text-violet-500 dark:text-violet-300">&lt; 15 min</span>.
              </p>
            </div>
          </div>

          {/* TILE 5: Small Tile - Support VIP 24/7 */}
          <div className="glass-bento glass-bento-hover rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group min-h-[180px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/50 shadow-lg">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">WhatsApp</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Support 24/7</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light mt-1">
                Assistance VIP personnalisée par Ahmed.
              </p>
            </div>
          </div>

          {/* TILE 6: Small Tile (Spans 2 cols on tablet) - Anti-Coupure 99.9% */}
          <div className="glass-bento glass-bento-hover md:col-span-2 lg:col-span-2 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group min-h-[180px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-950/50 shadow-lg">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Serveurs En Ligne</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Serveurs Ultra-Stables 99.9%</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-light mt-1">
                  Technologie anti-coupure et répartition de charge intelligente pour les soirs de grands matchs.
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-cyan-500 dark:text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
