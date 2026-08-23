import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/features/HeroSection";
import { PricingCards } from "@/components/features/PricingCards";
import { ComparisonTable } from "@/components/features/ComparisonTable";
import { WhyUsGrid } from "@/components/features/WhyUsGrid";
import { HowToOrderGrid } from "@/components/features/HowToOrderGrid";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-violet-600 selection:text-white transition-colors duration-300">
      {/* Floating Pill Navbar */}
      <Navbar />

      <main className="relative overflow-x-hidden w-full">
        {/* 1. Cinematic Hero Section */}
        <HeroSection />

        {/* 2. Pricing Cards Grid (Lite, Standard, Premium, VIP) */}
        <PricingCards />

        {/* 3. Comparison Table Component */}
        <ComparisonTable />

        {/* 4. Pourquoi Nous Feature Grid */}
        <WhyUsGrid />

        {/* 5. Comment Commander Section */}
        <HowToOrderGrid />

        {/* 6. Pre-Footer Section 1: SEO & Quick Links Highlight */}
        <SEOSection />

        {/* 7. Pre-Footer Section 2: Premium Explorer / Sitemap Grid */}
        <PremiumSitemapGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsApp />
    </div>
  );
}
