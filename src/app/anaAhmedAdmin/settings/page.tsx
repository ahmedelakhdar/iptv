"use client";

import React, { useState, useEffect } from "react";
import { getGlobalSettings, updateGlobalSettings, updateAdminPassword } from "@/app/actions/adminActions";
import { formatWhatsAppNumber } from "@/lib/utils";
import { Phone, MessageCircle, Save, Link2, Sparkles, CheckCircle2, Globe, Image as ImageIcon, Upload, RefreshCw, Lock, KeyRound, AlertCircle, ShieldCheck, Mail } from "lucide-react";
import { InternationalPhoneInput } from "@/components/ui/InternationalPhoneInput";

export default function AdminSettingsPage() {
  const [whatsappInput, setWhatsappInput] = useState("31600000000");
  const [siteNameInput, setSiteNameInput] = useState("IPTV For Europe");
  const [logoUrlInput, setLogoUrlInput] = useState("/logo.jpeg");
  const [logoPreview, setLogoPreview] = useState("/logo.jpeg");
  const [supportEmailInput, setSupportEmailInput] = useState("contact@iptvforeurop.com");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security Change Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passUpdating, setPassUpdating] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      const settings = await getGlobalSettings();
      setWhatsappInput(settings.whatsappNumber || "31600000000");
      setSiteNameInput(settings.siteName || "IPTV For Europe");
      setSupportEmailInput(settings.supportEmail || "contact@iptvforeurop.com");
      const currentLogo = settings.logoUrl || "/logo.jpeg";
      setLogoUrlInput(currentLogo);
      setLogoPreview(currentLogo);
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const rawBase64 = reader.result as string;
        const img = new Image();
        img.src = rawBase64;
        img.onload = () => {
          const maxDim = 300;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL(file.type || "image/png", 0.9);
            setLogoPreview(compressedBase64);
            setLogoUrlInput(compressedBase64);
          } else {
            setLogoPreview(rawBase64);
            setLogoUrlInput(rawBase64);
          }
        };
        img.onerror = () => {
          setLogoPreview(rawBase64);
          setLogoUrlInput(rawBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setLogoPreview("/logo.jpeg");
    setLogoUrlInput("/logo.jpeg");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    const res = await updateGlobalSettings({
      whatsappNumber: whatsappInput,
      siteName: siteNameInput,
      logoUrl: logoUrlInput,
      supportEmail: supportEmailInput,
    });

    if (res.success) {
      setWhatsappInput(res.settings.whatsappNumber);
      setSiteNameInput(res.settings.siteName);
      setLogoUrlInput(res.settings.logoUrl);
      setLogoPreview(res.settings.logoUrl);
      setSupportEmailInput(res.settings.supportEmail || "contact@iptvforeurop.com");
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
    setSaving(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassUpdating(true);
    setPassError(null);
    setPassSuccess(false);

    if (newPassword !== confirmPassword) {
      setPassError("Les nouveaux mots de passe ne correspondent pas.");
      setPassUpdating(false);
      return;
    }

    const res = await updateAdminPassword(currentPassword, newPassword);
    if (res.success) {
      setPassSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPassSuccess(false), 5000);
    } else {
      setPassError(res.error || "Erreur lors du changement de mot de passe.");
    }
    setPassUpdating(false);
  };

  const formattedNum = formatWhatsAppNumber(whatsappInput);
  const generatedWhatsappLink = `https://wa.me/${formattedNum}?text=Bonjour%20${encodeURIComponent(siteNameInput)},%20je%20souhaite%20commander%20un%20abonnement`;

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-3.5 py-1 text-xs font-bold text-cyan-600 dark:text-cyan-300 mb-2 backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>CONFIGURATION GLOBALE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Paramètres <span className="animated-gradient-text">Plateforme</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-1">
          Configurez l&apos;identité visuelle (Nom, Logo Upload), l&apos;adresse E-mail support, la sécurité et le sélecteur WhatsApp international.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm font-semibold text-slate-400">
          Chargement des paramètres...
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Main Glassmorphism Card Container: Branding & Contact */}
          <div className="glass-bento rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden transition-colors duration-300">
            
            {/* Header Inside Card */}
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 shadow-lg flex-shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Identité Visuelle &amp; Marque
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Importez votre logo personnalisé, modifiez le nom de votre marque et l&apos;adresse e-mail de support.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              
              {/* BRANDING SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Site Name Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <Globe className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Nom du Site (Marque)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={siteNameInput}
                    onChange={(e) => setSiteNameInput(e.target.value)}
                    placeholder="IPTV For Europe"
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                    Sera affiché dans le Navbar, Footer, Admin Sidebar et balises SEO.
                  </p>
                </div>

                {/* Logo File Upload & Preview */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <ImageIcon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <span>Logo de la Marque (Image Base64)</span>
                  </label>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 p-3.5 backdrop-blur-xl transition-colors duration-300">
                    {/* Image Preview Container */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/40 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 p-0.5 shadow-lg flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoPreview || "/logo.jpeg"}
                        alt="Logo Preview"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600/10 dark:bg-violet-600/30 hover:bg-violet-600/20 dark:hover:bg-violet-600/50 border border-violet-500/40 px-3.5 py-2 text-xs font-bold text-violet-700 dark:text-violet-200 transition-all">
                          <Upload className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                          <span>Téléverser...</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp, image/svg+xml"
                            onChange={handleLogoFileChange}
                            className="hidden"
                          />
                        </label>

                        {logoPreview !== "/logo.jpeg" && (
                          <button
                            type="button"
                            onClick={handleResetLogo}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Réinitialiser le logo"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                        PNG, JPEG, WEBP ou SVG (converti en Base64 dans la DB).
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* SUPPORT EMAIL SECTION */}
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>Adresse E-mail de Support</span>
                </label>

                <input
                  type="email"
                  required
                  value={supportEmailInput}
                  onChange={(e) => setSupportEmailInput(e.target.value)}
                  placeholder="contact@iptvforeurop.com"
                  className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-amber-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
                />

                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                  Sera utilisée pour le lien mailto: direct et l&apos;affichage dynamique de l&apos;adresse sur la page Contact.
                </p>
              </div>

              {/* WHATSAPP INTERNATIONAL PHONE SELECTOR SECTION */}
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Numéro WhatsApp International (Sélecteur avec Drapeau)</span>
                </label>

                {/* International Country Selector Component */}
                <InternationalPhoneInput
                  value={whatsappInput}
                  onChange={(val) => setWhatsappInput(val)}
                  placeholder="0612345678"
                />

                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">
                  Sélectionnez l&apos;indicatif du pays (ex: 🇳🇱 Pays-Bas +31, 🇲🇦 Maroc +212, 🇫🇷 France +33) pour formatage automatique.
                </p>
              </div>

              {/* LINK PREVIEW BOX */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#030308] p-5 space-y-2 transition-colors duration-300">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  <Link2 className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>WHATSAPP LINK PREVIEW</span>
                </div>

                <div className="overflow-x-auto text-xs font-mono text-cyan-700 dark:text-cyan-300 font-semibold bg-cyan-500/10 dark:bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/30 break-all">
                  {generatedWhatsappLink}
                </div>
              </div>

              {/* Notification Banner */}
              {saveSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/40 px-4 py-3 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Paramètres enregistrés et synchronisés avec succès !</span>
                </div>
              )}

              {/* FULL WIDTH SAVE BUTTON */}
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl violet-cyan-gradient py-4 text-center text-sm font-extrabold text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? "Enregistrement en cours..." : "Enregistrer la marque et les paramètres"}</span>
              </button>

            </form>

          </div>

          {/* Security Password Change Card */}
          <div className="glass-bento rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl bg-white/90 dark:bg-[#070714]/90 relative overflow-hidden transition-colors duration-300">
            
            <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shadow-lg flex-shrink-0">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sécurité : Modifier le mot de passe
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Saisissez votre mot de passe actuel pour en définir un nouveau sécurisé par hachage Bcrypt.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <KeyRound className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <span>Mot de passe actuel</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <Lock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Nouveau mot de passe</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Confirmer le mot de passe</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-emerald-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
                  />
                </div>

              </div>

              {/* Error Notification */}
              {passError && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/40 bg-rose-500/10 dark:bg-rose-950/40 px-4 py-3 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  <span>{passError}</span>
                </div>
              )}

              {/* Success Notification */}
              {passSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/40 px-4 py-3 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>Mot de passe mis à jour avec succès !</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={passUpdating}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-violet-500/40 bg-violet-600 hover:bg-violet-500 py-3.5 text-center text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>{passUpdating ? "Mise à jour en cours..." : "Mettre à jour le mot de passe"}</span>
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
