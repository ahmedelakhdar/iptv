"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
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
  Sparkles,
  AlertCircle,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatEuroPrice } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "Lite",
  price: "27",
  duration: "12 mois",
  liveChannels: "8 000",
  quality: "HD",
  isPopular: false,
  bonusDays: 0,
  description: "",
  originalPrice: "",
};

export default function AdminForfaitsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);

  // ── Core scalar form fields ──────────────────────────────────────────────
  const [formData, setFormData] = useState(EMPTY_FORM);

  // ── Dynamic features state ───────────────────────────────────────────────
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const featureInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const loadedPlans = await getPlans();
    setPlans(loadedPlans);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  // ── Open create modal ────────────────────────────────────────────────────
  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setModalError(null);
    setFormData({ ...EMPTY_FORM });
    setFeatures([]);
    setFeatureInput("");
    setIsModalOpen(true);
  };

  // ── Open edit modal ──────────────────────────────────────────────────────
  const handleOpenEditModal = (plan: PlanData) => {
    setEditingPlan(plan);
    setModalError(null);
    setFormData({
      name: plan.name || "Lite",
      price: plan.price || "27",
      duration: (plan.duration || plan.period || "12 mois").replace(/^\/\s*/, ""),
      liveChannels: plan.liveChannels || "8 000",
      quality: plan.quality || "HD",
      isPopular: plan.isPopular ?? false,
      bonusDays: plan.bonusDays ?? 0,
      description: plan.description || "",
      originalPrice: plan.originalPrice ? String(plan.originalPrice) : "",
    });
    setFeatures(Array.isArray(plan.features) ? [...plan.features] : []);
    setFeatureInput("");
    setIsModalOpen(true);
  };

  // ── Add a feature tag ────────────────────────────────────────────────────
  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed || features.includes(trimmed)) return;
    setFeatures((prev) => [...prev, trimmed]);
    setFeatureInput("");
    featureInputRef.current?.focus();
  };

  const handleFeatureKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addFeature(); }
  };

  const removeFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setModalError(null);

    const payload: Omit<PlanData, "id"> = {
      name: formData.name,
      price: formData.price,
      duration: formData.duration,
      liveChannels: formData.liveChannels,
      quality: formData.quality,
      isPopular: formData.isPopular,
      bonusDays: Number(formData.bonusDays) || 0,
      description: formData.description,
      originalPrice: formData.originalPrice ? parseFloat(String(formData.originalPrice)) : null,
      features,
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
      setModalError(null);
      router.refresh();
      await loadData();
    } else {
      const errMsg = res.error || "Erreur lors de l'enregistrement du forfait.";
      setModalError(errMsg);
      showToast(errMsg, "error");
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
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-8 relative">

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all ${
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
            <Layers className="h-3.5 w-3.5" />
            <span>GESTION DES PACKAGES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Gestion des <span className="animated-gradient-text">Forfaits ({plans.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-1">
            Créez et éditez les forfaits avec des fonctionnalités entièrement personnalisées.
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

      {/* Plans grid */}
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
                  ? "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
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
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{plan.name}</h3>
                    <p className="text-2xl font-black gradient-text-cyan mt-1">{formatEuroPrice(plan.price)}</p>
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

                {/* Dynamic features list */}
                <ul className="space-y-1.5 mb-4">
                  {(plan.features ?? []).slice(0, 5).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-px" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                  {(plan.features ?? []).length > 5 && (
                    <li className="text-[10px] text-slate-500 dark:text-slate-600 ps-5">
                      + {plan.features.length - 5} autres fonctionnalités
                    </li>
                  )}
                </ul>
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

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-[#030308]/85 backdrop-blur-2xl">
          <div className="glass-bento relative z-10 max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-cyan-500/40 bg-white dark:bg-[#070714] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-900 dark:text-white">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
              <h3 className="text-lg font-bold">
                {editingPlan ? `Modifier — ${editingPlan.name}` : "Nouveau Forfait"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Error */}
            {modalError && (
              <div className="mt-4 p-3.5 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Scrollable Form */}
            <form onSubmit={handleSavePlan} className="overflow-y-auto py-5 space-y-5 pr-1 flex-1 custom-scrollbar">

              {/* ── SECTION 1: Valeurs du forfait ── */}
              <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-slate-200 dark:border-white/10 pb-2">
                  Valeurs du forfait
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nom du forfait</label>
                    <select
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      {["Lite", "Standard", "Premium", "VIP", "Duo", "Family", "Maison"].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Prix (en €)</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="27"
                        className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                      />
                      <div className="absolute right-3 pointer-events-none font-bold text-cyan-600 dark:text-cyan-400 text-sm">€</div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Durée d&apos;abonnement</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      {["3 mois", "6 mois", "12 mois"].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Live channels */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chaînes live</label>
                    <input
                      type="text"
                      required
                      value={formData.liveChannels}
                      onChange={(e) => setFormData({ ...formData, liveChannels: e.target.value })}
                      placeholder="Ex: 8 000"
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Quality */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Qualité d&apos;image</label>
                    <select
                      value={formData.quality}
                      onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#090919] px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                    >
                      {["HD", "HD & Full HD", "4K", "4K & 8K"].map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  {/* isPopular toggle — same row as quality */}
                  <div className="flex items-end">
                    <label className="flex w-full items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20 p-2.5 text-xs text-amber-800 dark:text-amber-200 cursor-pointer hover:border-amber-400 transition-colors h-[42px]">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="h-4 w-4 rounded border-amber-500/40 text-amber-500 focus:ring-amber-400 flex-shrink-0"
                      />
                      <Flame className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                      <span className="font-bold">Badge &quot;POPULAIRE&quot;</span>
                    </label>
                  </div>

                  {/* Original Price */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Prix original barré (Optionnel)
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        placeholder="Ex: 47"
                        className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-3.5 pr-10 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                      />
                      <div className="absolute right-3 pointer-events-none font-bold text-cyan-600 dark:text-cyan-400 text-sm">€</div>
                    </div>
                  </div>

                  {/* Bonus Days */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Jours de garantie supplémentaires (+X jours)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.bonusDays}
                      onChange={(e) => setFormData({ ...formData, bonusDays: Math.max(0, parseInt(e.target.value) || 0) })}
                      placeholder="Ex: 45 (si 0, masque l'affichage + X jours)"
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Détail de l&apos;offre (Description)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Ex: Le forfait Lite est conçu pour un usage personnel sur 1 appareil à la fois. Qualité d'image haute fidélité..."
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none custom-scrollbar"
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: Dynamic Features ── */}
              <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-white/10 pb-2">
                  Fonctionnalités Incluses
                </h4>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light">
                  Tapez une fonctionnalité et appuyez sur <kbd className="rounded bg-slate-200 dark:bg-white/10 px-1 py-px text-[9px] font-mono">Entrée</kbd> ou cliquez sur <strong>Ajouter</strong>.
                </p>

                {/* Input row */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    <input
                      ref={featureInputRef}
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={handleFeatureKeyDown}
                      placeholder="Ex: EPG (Guide TV), Replay 7 jours…"
                      className="w-full rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 pl-9 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addFeature}
                    disabled={!featureInput.trim()}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed px-3.5 py-2.5 text-xs font-bold text-white transition-colors flex-shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Ajouter
                  </button>
                </div>

                {/* Tags list */}
                {features.length === 0 ? (
                  <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 py-3 italic">
                    Aucune fonctionnalité ajoutée — le forfait s&apos;affichera sans liste sur le site.
                  </p>
                ) : (
                  <ul className="space-y-1.5 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
                    {features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/20 bg-white dark:bg-white/5 px-3 py-2 text-xs"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">{feat}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="flex-shrink-0 rounded-full p-0.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                          aria-label={`Supprimer: ${feat}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {features.length > 0 && (
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {features.length} fonctionnalité{features.length > 1 ? "s" : ""} configurée{features.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Footer buttons */}
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
                  disabled={saving}
                  className="rounded-full violet-cyan-gradient px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Enregistrement..." : "Enregistrer le forfait"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
