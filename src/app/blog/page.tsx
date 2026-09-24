import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";
import { getAllBlogPosts } from "@/lib/mdx";
import { Sparkles, BookOpen, Calendar, Clock, ArrowRight, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Guides IPTV (2026) | Tutoriels, Dépannage & Optimisation 4K",
  description:
    "Découvrez nos articles, guides et tutoriels complets pour installer IBO Player, supprimer le buffering IPTV et optimiser votre streaming 4K.",
  keywords: [
    "Blog IPTV",
    "Tutoriels IBO Player",
    "Guide installation IPTV Smart TV",
    "Dépannage buffering IPTV",
    "Conseils streaming 4K IPTV",
  ],
  alternates: {
    canonical: "./",
  },
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="relative min-h-[100dvh] bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="relative pt-28 sm:pt-36 pb-20 overflow-x-hidden w-full">
        {/* Ambient Glow Orbs */}
        <div className="hidden md:block pointer-events-none z-0 absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-fuchsia-600/20 blur-[160px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/90 dark:bg-violet-950/90 px-4 py-1.5 text-xs font-bold text-violet-700 dark:text-violet-300 mb-4 backdrop-blur-xl shadow-sm">
              <BookOpen className="h-4 w-4 text-violet-400" />
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>GUIDES &amp; TUTORIELS IPTV • 2026</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-6xl lg:text-7xl tracking-tight leading-tight">
              Blog &amp; Centre d&apos;Aide{" "}
              <span className="animated-gradient-text">IPTV Premium</span>
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
              Consultez nos articles techniques pour optimiser votre expérience IPTV, configurer vos Smart TV et résoudre tous les problèmes de buffering.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass-bento glass-bento-hover rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070714]/95 flex flex-col justify-between transition-all duration-300 group shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-600 dark:text-cyan-400">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime} de lecture</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <User className="h-3.5 w-3.5 text-violet-400" />
                    <span>{post.author || "Support Technique"}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Lire l&apos;article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <SEOSection />
          <PremiumSitemapGrid />
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
