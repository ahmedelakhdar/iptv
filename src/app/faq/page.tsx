import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { FAQSection } from "@/components/features/FAQSection";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Foire Aux Questions IPTV | FAQ IPTV Netherlands",
  description:
    "Trouvez les réponses à toutes vos questions sur l'abonnement IPTV Netherlands : compatibilité Smart TV, vitesse internet requise, IBO Player et support WhatsApp.",
};

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-violet-600 selection:text-white transition-colors duration-300">
      {/* Floating Pill Navbar */}
      <Navbar />

      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Pulsing Ambient Background Radial Gradient Orbs */}
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-fuchsia-600/20 blur-[160px] animate-ambient-orb-1" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-300 transition-colors">
              Accueil
            </Link>
            <span>&gt;</span>
            <span className="text-cyan-400 font-bold">FAQ IPTV Netherlands</span>
          </nav>

          {/* FAQ Accordions Section */}
          <FAQSection />

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
