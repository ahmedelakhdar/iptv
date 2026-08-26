"use client";

import React from "react";
import { Star, Film } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: string;
  image: string;
  accent: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: "Sci-Fi",
    year: 2024,
    rating: "8.7",
    image: "https://images.unsplash.com/photo-1604077157886-d1be9e56e5a5?w=400&h=600&fit=crop&auto=format",
    accent: "#f59e0b",
  },
  {
    id: 2,
    title: "Oppenheimer",
    genre: "Drame Historique",
    year: 2023,
    rating: "8.9",
    image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop&auto=format",
    accent: "#ef4444",
  },
  {
    id: 3,
    title: "Killers of the Flower Moon",
    genre: "Crime",
    year: 2023,
    rating: "8.1",
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=600&fit=crop&auto=format",
    accent: "#8b5cf6",
  },
  {
    id: 4,
    title: "Avatar: The Way of Water",
    genre: "Aventure",
    year: 2022,
    rating: "7.6",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop&auto=format",
    accent: "#06b6d4",
  },
  {
    id: 5,
    title: "The Batman",
    genre: "Action",
    year: 2022,
    rating: "8.0",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&auto=format",
    accent: "#1d4ed8",
  },
  {
    id: 6,
    title: "Poor Things",
    genre: "Fantasy",
    year: 2023,
    rating: "8.1",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop&auto=format",
    accent: "#f97316",
  },
  {
    id: 7,
    title: "Anatomy of a Fall",
    genre: "Thriller",
    year: 2023,
    rating: "7.9",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&auto=format",
    accent: "#64748b",
  },
  {
    id: 8,
    title: "Past Lives",
    genre: "Romance",
    year: 2023,
    rating: "8.2",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&auto=format",
    accent: "#ec4899",
  },
  {
    id: 9,
    title: "Mission: Impossible 7",
    genre: "Action",
    year: 2023,
    rating: "7.8",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&h=600&fit=crop&auto=format",
    accent: "#10b981",
  },
  {
    id: 10,
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation",
    year: 2023,
    rating: "8.6",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop&auto=format",
    accent: "#a855f7",
  },
];

// ─── Movie Card ───────────────────────────────────────────────────────────────

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div
      className="group relative flex-shrink-0 w-44 h-64 sm:w-48 sm:h-72 rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
      style={{
        boxShadow: `0 8px 32px ${movie.accent}20, 0 2px 8px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Poster image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={movie.image}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />

      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Genre pill — logical 'end' side so it stays top-right in LTR, top-left in RTL */}
      <div className="absolute top-2.5 end-2.5 rounded-full bg-black/50 border border-white/10 px-2 py-0.5 backdrop-blur-sm">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{movie.genre}</span>
      </div>

      {/* Bottom text — logical inset */}
      <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-1">
        <p className="text-white font-bold text-xs leading-tight line-clamp-2 drop-shadow">
          {movie.title}
        </p>
        {/* Rating row — flex inherits dir so icons stay natural */}
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
          <span className="text-yellow-400 text-[11px] font-bold">{movie.rating}</span>
          <span className="text-white/40 text-[10px] ms-1">{movie.year}</span>
        </div>
      </div>

      {/* Accent glow line on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${movie.accent}, transparent)` }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function TrendingMovies() {
  const { t, dir } = useLanguage();

  // ── 1. Filter: skip any movie missing a valid, non-empty image URL ──
  const validMovies = MOVIES.filter(
    (movie) => movie.image && movie.image.trim() !== ""
  );

  // ── 2. Duplicate filtered array for seamless loop ──
  const doubled = [...validMovies, ...validMovies];

  return (
    <section
      id="films-tendance"
      className="relative py-16 sm:py-20 overflow-hidden w-full max-w-full bg-slate-50 dark:bg-[#030308]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] sm:h-[500px] sm:w-[800px] rounded-full bg-gradient-to-r from-cyan-600/8 via-violet-600/10 to-pink-600/8 blur-2xl sm:blur-3xl transform-gpu" />

      {/* ── Section Header ── */}
      <div className="relative z-10 text-center px-4 mb-10 sm:mb-12">
        {/* VOD badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900/80 dark:bg-black/60 px-3.5 py-1 mb-4 backdrop-blur-sm shadow-sm transform-gpu">
          <Film className="h-3 w-3 text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">
            {t("vod.badge")}
          </span>
        </div>

        {/* Main title — text-start in RTL makes it flow naturally */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          <span className="text-slate-900 dark:text-white">{t("vod.title_white")}</span>
          <span className="text-cyan-400">{t("vod.title_colored")}</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-light">
          {t("vod.subtitle")}
        </p>

        {/* Decorative line */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </div>

      {/* ── Marquee Track ──
          The marquee always scrolls LTR regardless of locale so movie
          posters remain readable. We force dir="ltr" on the marquee
          wrapper to prevent RTL from reversing the scroll direction.  */}
      <div className="relative marquee-track transform-gpu" dir="ltr">
        {/* Start-side fade (left in LTR, but marquee is always LTR here) */}
        <div className="pointer-events-none absolute start-0 top-0 bottom-0 w-28 sm:w-40 z-10 bg-gradient-to-r from-slate-50 dark:from-[#030308] to-transparent" />
        {/* End-side fade */}
        <div className="pointer-events-none absolute end-0 top-0 bottom-0 w-28 sm:w-40 z-10 bg-gradient-to-l from-slate-50 dark:from-[#030308] to-transparent" />

        {/* Scrolling strip */}
        <div className="overflow-hidden">
          <div className="animate-marquee flex gap-4 px-4 w-max transform-gpu">
            {doubled.map((movie, idx) => (
              <MovieCard key={`${movie.id}-${idx}`} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="relative z-10 mt-10 sm:mt-12 text-center px-4">
        <p className="text-xs text-slate-500 dark:text-slate-600 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-slate-300 dark:bg-slate-700 inline-block" />
          {t("vod.catalogue")}
          <span className="h-px w-10 bg-slate-300 dark:bg-slate-700 inline-block" />
        </p>
      </div>
    </section>
  );
}
