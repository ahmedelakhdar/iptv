"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getWhatsappNumber, getPlans } from "@/app/actions/adminActions";
import { formatWhatsAppNumber } from "@/lib/utils";
import {
  Sparkles,
  Package,
  MessageCircle,
  TrendingUp,
  Settings,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardWelcomePage() {
  const [whatsappNumber, setWhatsappNumber] = useState("33600000000");
  const [planCount, setPlanCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const num = await getWhatsappNumber();
      const plans = await getPlans();
      setWhatsappNumber(num);
      setPlanCount(plans.length);
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-8 sm:space-y-10 overflow-x-auto">
      
      {/* Welcome Banner */}
      <div className="glass-bento rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden bg-white/80 dark:bg-gradient-to-r dark:from-violet-950/40 dark:via-cyan-950/30 dark:to-[#070714] shadow-sm dark:shadow-none transition-colors duration-300">
        <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-300 mb-4 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>TABLEAU DE BORD ADMINISTRATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            Bienvenue sur l&apos;Administration{" "}
            <span className="animated-gradient-text">IPTV For Europe</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
            Gérez vos offres IPTV For Europe, mettez à jour votre numéro WhatsApp et suivez l&apos;état global de votre plateforme.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/anaAhmedAdmin/settings"
              className="inline-flex items-center gap-2 rounded-full violet-cyan-gradient px-6 py-3 text-xs font-extrabold text-white shadow-lg hover:scale-105 transition-all"
            >
              <Settings className="h-4 w-4" />
              <span>Gérer les Paramètres &amp; Forfaits</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 px-6 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-cyan-500 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <span>Ouvrir le Site Public</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1: Total Packages */}
        <div className="glass-bento rounded-3xl p-7 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden flex flex-col justify-between group shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/50 shadow-sm">
              <Package className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider bg-violet-500/10 dark:bg-violet-950/60 px-2.5 py-1 rounded-full border border-violet-500/30">
              ACTIFS
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Total des Forfaits
            </span>
            <div className="text-4xl font-black text-slate-900 dark:text-white">
              {loading ? "..." : `${planCount} Forfaits`}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-2">
              Lite, Standard, Premium et VIP en ligne.
            </p>
          </div>
        </div>

        {/* Stat Card 2: Active WhatsApp Number */}
        <div className="glass-bento rounded-3xl p-7 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden flex flex-col justify-between group shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/50 shadow-sm">
              <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
              EN LIGNE
            </span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              WhatsApp Global
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {loading ? "..." : `+${formatWhatsAppNumber(whatsappNumber)}`}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-2">
              Réception dynamique des commandes via wa.me.
            </p>
          </div>
        </div>

        {/* Stat Card 3: Server Status */}
        <div className="glass-bento rounded-3xl p-7 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden flex flex-col justify-between group shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/50 shadow-sm">
              <TrendingUp className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>99.9%</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Statut des Serveurs
            </span>
            <div className="text-2xl font-black text-cyan-600 dark:text-cyan-300">
              Opérationnel 4K/8K
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-2">
              Répartition de charge &amp; technologie anti-coupure.
            </p>
          </div>
        </div>

      </div>

      {/* Quick Access Info Block */}
      <div className="glass-bento rounded-3xl p-8 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 flex-shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Gestion centralisée des paramètres
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-light">
              Cliquez sur &quot;Paramètres&quot; dans le menu latéral pour modifier l&apos;identité visuelle et les forfaits IPTV.
            </p>
          </div>
        </div>

        <Link
          href="/anaAhmedAdmin/settings"
          className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-cyan-500 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all flex-shrink-0"
        >
          <Settings className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <span>Accéder aux Paramètres</span>
        </Link>
      </div>

    </div>
  );
}
