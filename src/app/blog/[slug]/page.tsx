import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOSection } from "@/components/features/SEOSection";
import { PremiumSitemapGrid } from "@/components/features/PremiumSitemapGrid";
import { FloatingWhatsApp } from "@/components/features/FloatingWhatsApp";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/mdx";
import { ChevronLeft, Calendar, Clock, User, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: PageProps["params"]): Promise<{ slug: string }> {
  if ("then" in params) {
    return await params;
  }
  return params;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article non trouvé | IPTV For Europe",
    };
  }

  return {
    title: `${post.meta.title} | Blog IPTV For Europe`,
    description: post.meta.description,
    keywords: post.meta.keywords ? post.meta.keywords.split(", ") : [],
    alternates: {
      canonical: "./",
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-[100dvh] bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="relative pt-28 sm:pt-36 pb-20 overflow-x-hidden w-full">
        {/* Background Radial Glow */}
        <div className="hidden md:block pointer-events-none z-0 absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-violet-600/15 via-cyan-500/15 to-transparent blur-[160px]" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to Blog Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 mb-8 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Retour aux articles du blog</span>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/90 dark:bg-cyan-950/90 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 mb-4 backdrop-blur-xl shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>TUTORIEL &amp; GUIDE TECHNIQUE</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-5xl tracking-tight leading-tight mb-6">
              {post.meta.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-500" />
                <span>Publié le {post.meta.date}</span>
              </div>
              {post.meta.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span>{post.meta.readTime} de lecture</span>
                </div>
              )}
              {post.meta.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-emerald-400" />
                  <span>{post.meta.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Article Body (Markdown Content) */}
          <div className="glass-bento rounded-3xl p-6 sm:p-12 border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070714]/95 mb-16 shadow-lg">
            <article className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-500 hover:prose-a:text-cyan-400 prose-img:rounded-2xl max-w-none">
              <MDXRemote source={post.content} />
            </article>
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
