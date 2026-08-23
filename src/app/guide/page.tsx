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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [whatsappNum, setWhatsappNum] = useState("212600000000");

  useEffect(() => {
    getWhatsappNumber().then((num) => setWhatsappNum(num));
  }, []);

  const steps = [
    {
      num: "01",
      title: "Télécharger IBO Player Pro",
      icon: Download,
      text: "Sur votre Smart TV (Samsung, LG), Firestick, Android TV ou appareil Apple (iOS / Apple TV), ouvrez l'App Store officiel (LG Content Store, Samsung Apps, Amazon Appstore ou Google Play) et recherchez 'IBO Player Pro'.",
      bulletPoints: [
        "Recherchez 'IBO Player Pro' dans le store de votre TV",
        "Téléchargez et installez l'application officielle",
        "Ouvrez IBO Player pour afficher vos identifiants uniques",
      ],
    },
    {
      num: "02",
      title: "Récupérer la MAC Address et le Device Key",
      icon: Key,
      text: "Lancez IBO Player. Dès l'écran d'accueil de l'application, repérez les informations affichées en haut ou dans le menu Paramètres / Device Info : la MAC Address (ex: AA:BB:CC:DD:EE:FF) et le Device Key.",
      bulletPoints: [
        "Notez l'adresse MAC (ex: AA:BB:CC:DD:EE:FF)",
        "Notez le Device Key fourni par l'application",
        "Gardez cet écran ouvert sur votre téléviseur",
      ],
    },
    {
      num: "03",
      title: "Transmettre vos identifiants sur WhatsApp",
      icon: MessageCircle,
      text: "Envoyez-nous simplement votre MAC Address et votre Device Key via notre support WhatsApp dédié. Notre équipe active directement votre lien M3U / XC API sur les serveurs IBO Player.",
      bulletPoints: [
        "Cliquez sur le bouton WhatsApp ci-dessous",
        "Envoyez votre MAC Address et Device Key",
        "Activation instantanée par notre support en < 15 minutes",
      ],
    },
    {
      num: "04",
      title: "Relancer et Profiter de vos chaînes 4K",
      icon: PlayCircle,
      text: "Une fois la confirmation d'activation reçue sur WhatsApp, redémarrez simplement l'application IBO Player sur votre TV. Votre liste de chaînes TV en direct, films et séries VOD est instantanément prête !",
      bulletPoints: [
        "Fermez puis relancez IBO Player Pro",
        "Vos listes de chaînes 4K et VOD se chargent automatiquement",
        "Profitez de votre abonnement IPTV Netherlands garanti 12 mois !",
      ],
    },
  ];

  const guideFaqs = [
    {
      q: "Comment installer IPTV sur Smart TV Samsung / LG ?",
      a: "Accédez au store officiel (Samsung Apps ou LG Content Store), recherchez 'IBO Player Pro', installez l'application puis communiquez-nous votre MAC Address et Device Key sur WhatsApp pour une activation immédiate.",
    },
    {
      q: "Comment installer IPTV sur Firestick Amazon ?",
      a: "Sur votre Amazon Fire TV Stick, ouvrez l'Appstore, recherchez 'IBO Player' ou utilisez l'application Downloader pour installer la version APK officielle. Transmettez-nous vos identifiants pour l'activation.",
    },
    {
      q: "Quel est le délai d'activation après paiement ?",
      a: "L'activation est quasi instantanée, généralement effectuée en moins de 15 minutes dès réception de votre message WhatsApp.",
    },
    {
      q: "Est-ce que je peux installer IBO Player sur plusieurs appareils ?",
      a: "Vous pouvez installer l'application sur tous vos écrans (Smart TV, Smartphone, Tablette, PC), mais l'utilisation simultanée dépend du nombre de connexions incluses dans votre forfait.",
    },
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
              Accueil
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">Guide d&apos;installation IPTV Netherlands</span>
          </nav>

          {/* Page Header */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
              <span>TUTORIEL PAS À PAS • SMART TV &amp; FIRESTICK</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Guide d&apos;installation IPTV Netherlands —{" "}
              <span className="text-slate-600 dark:text-slate-400 font-normal">Tutoriel Smart TV &amp; Box</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Installer votre abonnement IPTV Netherlands sur tous les appareils en quelques minutes. Suivez notre tutoriel simple pour configurer IBO Player Pro sur Samsung, LG, Firestick et Android TV.
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
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">Tous modèles 4K</span>
              </div>
            </div>

            <div className="glass-bento rounded-2xl p-4 border border-slate-200 dark:border-white/10 flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-violet-600 dark:text-violet-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Android &amp; iOS</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-light">Smartphones &amp; Tablettes</span>
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
              Les 4 étapes simples pour activer IBO Player :
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
                Besoin d&apos;aide pour l&apos;installation ?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light max-w-xl">
                Notre équipe support est disponible sur WhatsApp 24/7 pour vous guider pas à pas lors de la configuration de votre téléviseur.
              </p>
            </div>

            <a
              href={`https://wa.me/${formatWhatsAppNumber(whatsappNum)}?text=Bonjour%20IPTV%20Ahmed,%20j%27ai%20besoin%20d%27aide%20pour%20l%27installation%20sur%20IBO%20Player`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2.5 rounded-full violet-cyan-gradient px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg transition-all hover:scale-105 min-h-[44px]"
            >
              <MessageCircle className="h-4 w-4 text-white" />
              <span>Contacter le support WhatsApp</span>
            </a>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-6 mb-16">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Questions fréquentes sur l&apos;installation
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
