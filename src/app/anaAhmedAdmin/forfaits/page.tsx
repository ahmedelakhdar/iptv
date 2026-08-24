"use client";

import React, { useState, useEffect } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  PlanData,
} from "@/app/actions/adminActions";
import {
  Plus,
  Edit,
  Trash2,
  Check,
  Flame,
  X,
  Layers,
  Tv,
  Film,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { getConnectionsText, formatEuroPrice } from "@/lib/utils";

export default function AdminForfaitsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Toast Feedback State
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Modal State for Adding/Editing Plans
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "Lite",
    price: "",
    duration: "12 mois",
    liveChannels: "8 000",
    quality: "HD",
    isPopular: false,
    hasVod: false,
    hasEpg: false,
    hasReplay: false,
    hasAdults: false,
    hasIboPlayer: false,
    hasConnections: false,
    hasGuarantee: false,
    hasRefund: false,
    hasSupport: false,
  });

  const loadData = async () => {
    setLoading(true);
    const loadedPlans = await getPlans();
    setPlans(loadedPlans);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setFormData({
      name: "Lite",
      price: "27 €",
      duration: "12 mois",
      liveChannels: "8 000",
      quality: "HD",
      isPopular: false,
      hasVod: true,
      hasEpg: true,
      hasReplay: false,
      hasAdults: false,
      hasIboPlayer: true,
      hasConnections: true,
      hasGuarantee: true,
      hasRefund: true,
      hasSupport: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: PlanData) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: (plan.duration || plan.period || "12 mois").replace(/^\/\s*/, ""),
      liveChannels: plan.liveChannels || "8 000",
      quality: plan.quality || "HD",
      isPopular: plan.isPopular ?? false,
      hasVod: plan.hasVod ?? false,
      hasEpg: plan.hasEpg ?? false,
      hasReplay: plan.hasReplay ?? false,
      hasAdults: plan.hasAdults ?? false,
      hasIboPlayer: plan.hasIboPlayer ?? false,
      hasConnections: plan.hasConnections ?? false,
      hasGuarantee: plan.hasGuarantee ?? false,
      hasRefund: plan.hasRefund ?? false,
      hasSupport: plan.hasSupport ?? false,
    });
    setIsModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name,
      price: formData.price,
      duration: formData.duration,
      liveChannels: formData.liveChannels,
      quality: formData.quality,
      isPopular: formData.isPopular,
      hasVod: formData.hasVod,
      hasEpg: formData.hasEpg,
      hasReplay: formData.hasReplay,
      hasAdults: formData.hasAdults,
      hasIboPlayer: formData.hasIboPlayer,
      hasConnections: formData.hasConnections,
      hasGuarantee: formData.hasGuarantee,
      hasRefund: formData.hasRefund,
      hasSupport: formData.hasSupport,
    };

    let res: { success: boolean; error?: string };
    if (editingPlan) {
      res = await updatePlan(editingPlan.id, payload);
    } else {
      res = await createPlan(payload);
    }

    setSaving(false);

    if (res.success) {
      showToast(editingPlan ? "Forfait modifié avec succès !" : "Forfait ajouté avec succès !", "success");
      setIsModalOpen(false);
      router.refresh();
      await loadData();
    } else {
      showToast(res.error || "Erreur lors de l'enregistrement du forfait.", "error");
    }
  };

  const handleDeletePlan = async (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le forfait "${name}" ?`)) {
      const res = await deletePlan(id);
      if (res.success) {
        showToast(`Le forfait "${name}" a été supprimé avec succès.`, "success");
        router.refresh();
        await loadData();
      } else {
        showToast(res.error || "Erreur lors de la suppression.", "error");
      }
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 relative">
      
      {/* Toast Banner Feedback */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-bounce-short ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/50 text-rose-200"
          }`}
        >
          <Check className={`h-5 w-5 ${toast.type === "success" ? "text-emerald-400" : "text-rose-400"}`} />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-300 mb-2 backdrop-blur-xl">
            <Layers className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
            <span>GESTION DES PACKAGES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Gestion des <span className="animated-gradient-text">Forfaits ({plans.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-1">
            Mettez à jour les prix, qualités et options incluses des forfaits IPTV Netherlands en temps réel.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 rounded-full violet-cyan-gradient px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau Forfait</span>
        </button>
      </div>

      {/* PRICING PLANS CARDS GRID */}
      {loading ? (
        <div className="py-12 text-center text-sm font-semibold text-slate-400">
          Chargement des forfaits...
        </div>
      ) : plans.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-8">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Aucun forfait disponible. Cliquez sur &apos;Ajouter&apos; pour créer votre premier forfait.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-bento rounded-3xl p-6 border relative flex flex-col justify-between shadow-sm transition-all bg-white/90 dark:bg-[#070714]/90 ${
                plan.isPopular
                  ? "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] bg-cyan-500/5 dark:bg-cyan-950/20"
                  : "border-slate-200 dark:border-white/10 hover:border-violet-500/40"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-0.5 text-[10px] font-bold text-white shadow-md">
                  <Flame className="h-3 w-3 text-amber-300" />
                  <span>POPULAIRE</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-black gradient-text-cyan mt-1">
                      {formatEuroPrice(plan.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(plan)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id, plan.name)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 font-light mb-4 pb-3 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span>Qualité: <strong className="text-cyan-600 dark:text-cyan-300">{plan.quality}</strong></span>
                  <span>Live: <strong className="text-slate-900 dark:text-white">{plan.liveChannels}</strong></span>
                </div>

                {/* Inclusion Summary Badges */}
                <div className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasVod ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-600"}`} />
                    <span className={plan.hasVod ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500 line-through"}>VOD (Films &amp; Séries)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasEpg ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-600"}`} />
                    <span className={plan.hasEpg ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500 line-through"}>EPG Guide TV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasReplay ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-600"}`} />
                    <span className={plan.hasReplay ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500 line-through"}>Replay 7 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasConnections ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-600"}`} />
                    <span className={plan.hasConnections ? "text-slate-900 dark:text-white font-bold" : "text-slate-400 dark:text-slate-500 line-through"}>{getConnectionsText(plan.name)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`h-3.5 w-3.5 ${plan.hasAdults ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-slate-600"}`} />
                    <span className={plan.hasAdults ? "text-slate-900 dark:text-white font-medium" : "text-slate-400 dark:text-slate-500 line-through"}>Chaînes Adultes (+18)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-white/10 text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  Durée: {plan.duration || "/ 12 mois"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL EDIT / CREATE PLAN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#030308]/85 backdrop-blur-2xl">
          <div className="glass-bento relative z-10 max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-cyan-500/40 bg-white dark:bg-[#070714] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-900 dark:text-white">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingPlan ? `Modifier — ${editingPlan.name}` : "Nouveau Forfait"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSavePlan} className="overflow-y-auto py-5 space-y-6 pr-1 flex-1 custom-scrollbar">
              
              {/* SECTION 1: TEXT & SELECT INPUTS */}
              <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-slate-200 dark:border-white/10 pb-2">
                  Valeurs du forfait
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name Select Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nom du forfait
                    </label>
                    <select
                      value={formData.name || "Lite"}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Lite">Lite</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                      <option value="Duo">Duo</option>
                      <option value="Family">Family</option>
                      <option value="Maison">Maison</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Prix (en €)
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="27"
                        className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                      />
                      <div className="absolute right-3 pointer-events-none flex items-center justify-center font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                        €
                      </div>
                    </div>
                  </div>

                  {/* Duration Select Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Durée d&apos;abonnement
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="3 mois">3 mois</option>
                      <option value="6 mois">6 mois</option>
                      <option value="12 mois">12 mois</option>
                    </select>
                  </div>

                  {/* Live Channels */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Chaînes live
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.liveChannels}
                      onChange={(e) => setFormData({ ...formData, liveChannels: e.target.value })}
                      placeholder="Ex: 8 000"
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Quality Select Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Qualité d&apos;image
                    </label>
                    <select
                      value={formData.quality}
                      onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      <option value="HD">HD</option>
                      <option value="HD & Full HD">HD &amp; Full HD</option>
                      <option value="4K">4K</option>
                      <option value="4K & 8K">4K &amp; 8K</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: CHECKBOXES FOR BOOLEAN FIELDS */}
              <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-white/10 pb-2">
                  Fonctionnalités Incluses (Checkboxes)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20 p-2.5 text-xs text-amber-800 dark:text-amber-200 cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="h-4 w-4 rounded border-amber-500/40 text-amber-500 focus:ring-amber-400"
                    />
                    <span className="font-bold">Badge &quot;POPULAIRE&quot;</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasVod}
                      onChange={(e) => setFormData({ ...formData, hasVod: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">VOD (Films &amp; Séries)</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasEpg}
                      onChange={(e) => setFormData({ ...formData, hasEpg: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">EPG (Guide TV)</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasReplay}
                      onChange={(e) => setFormData({ ...formData, hasReplay: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Replay 7 jours</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasAdults}
                      onChange={(e) => setFormData({ ...formData, hasAdults: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Adultes (+18)</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasIboPlayer}
                      onChange={(e) => setFormData({ ...formData, hasIboPlayer: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">IBO Player</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasConnections}
                      onChange={(e) => setFormData({ ...formData, hasConnections: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Connexions</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasGuarantee}
                      onChange={(e) => setFormData({ ...formData, hasGuarantee: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Abonnement garanti 12 mois</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasRefund}
                      onChange={(e) => setFormData({ ...formData, hasRefund: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Remboursement 45 jours</span>
                  </label>

                  <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.hasSupport}
                      onChange={(e) => setFormData({ ...formData, hasSupport: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 dark:border-white/20 text-cyan-500 focus:ring-cyan-400"
                    />
                    <span className="font-semibold">Support</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-full violet-cyan-gradient px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:scale-105 transition-all"
                >
                  Enregistrer le forfait
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
