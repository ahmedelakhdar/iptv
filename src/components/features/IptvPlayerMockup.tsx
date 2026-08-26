"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Trophy,
  PlaySquare,
  Clapperboard,
  Newspaper,
  Music,
  Wifi,
  Signal,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "sport" | "livetv" | "cinema" | "news" | "musique";

const TAB_KEYS: TabKey[] = ["sport", "livetv", "cinema", "news", "musique"];

interface Channel {
  number: string;
  name: string;
  desc: string;
  isLive: boolean;
  quality: "FHD" | "4K" | "HD";
  color: string;
  logoText: string;
}

interface TabConfig {
  key: TabKey;
  labelKey: string; // i18n key e.g. "iptv.tab_sport"
  Icon: React.FC<{ className?: string }>;
  headerKey: string;
  subHeaderKey: string;
  channels: Channel[];
}

// ─── Static channel data (labels stay in French/universal since they are
//     proper channel brand names, not UI strings) ───────────────────────────

const TABS: TabConfig[] = [
  {
    key: "sport",
    labelKey: "iptv.tab_sport",
    Icon: Trophy,
    headerKey: "iptv.header_sport",
    subHeaderKey: "iptv.sub_sport",
    channels: [
      { number: "001", name: "beIN SPORTS 1 HD", desc: "PSG vs Marseille — Ligue 1", isLive: true, quality: "FHD", color: "bg-pink-600", logoText: "bS1" },
      { number: "002", name: "beIN SPORTS 2 HD", desc: "Real Madrid vs Bayern — UCL", isLive: true, quality: "4K", color: "bg-pink-700", logoText: "bS2" },
      { number: "003", name: "Canal+ Sport", desc: "Monaco vs Lyon — Ligue 1", isLive: true, quality: "FHD", color: "bg-sky-700", logoText: "C+S" },
      { number: "004", name: "Eurosport 1", desc: "Tour de France — Étape 12", isLive: false, quality: "HD", color: "bg-orange-600", logoText: "ES1" },
      { number: "005", name: "RMC Sport 1", desc: "Manchester City vs Arsenal", isLive: true, quality: "FHD", color: "bg-blue-700", logoText: "RMC" },
    ],
  },
  {
    key: "livetv",
    labelKey: "iptv.tab_livetv",
    Icon: PlaySquare,
    headerKey: "iptv.header_livetv",
    subHeaderKey: "iptv.sub_livetv",
    channels: [
      { number: "101", name: "TF1", desc: "Journal de 20h — Anne-Claire Coudray", isLive: true, quality: "FHD", color: "bg-blue-500", logoText: "TF1" },
      { number: "102", name: "France 2", desc: "Envoyé Spécial — Reportage exclusif", isLive: true, quality: "FHD", color: "bg-red-600", logoText: "F2" },
      { number: "103", name: "M6", desc: "Capital — Économie & Business", isLive: true, quality: "4K", color: "bg-yellow-500", logoText: "M6" },
      { number: "104", name: "Arte", desc: "Documentaire — La Planète Océan", isLive: false, quality: "FHD", color: "bg-purple-600", logoText: "ART" },
      { number: "105", name: "C8", desc: "TPMP — Cyril Hanouna en direct", isLive: true, quality: "HD", color: "bg-green-600", logoText: "C8" },
    ],
  },
  {
    key: "cinema",
    labelKey: "iptv.tab_cinema",
    Icon: Clapperboard,
    headerKey: "iptv.header_cinema",
    subHeaderKey: "iptv.sub_cinema",
    channels: [
      { number: "201", name: "Canal+ Cinéma", desc: "Dune: Part Two — Première Diffusion", isLive: true, quality: "4K", color: "bg-sky-600", logoText: "C+" },
      { number: "202", name: "OCS Max", desc: "House of the Dragon — S02E08", isLive: true, quality: "FHD", color: "bg-red-700", logoText: "OCS" },
      { number: "203", name: "Netflix FR", desc: "Squid Game — Saison 2", isLive: false, quality: "4K", color: "bg-rose-600", logoText: "NF" },
      { number: "204", name: "Ciné+ Premier", desc: "Oppenheimer — Version Longue", isLive: true, quality: "FHD", color: "bg-indigo-600", logoText: "C+P" },
      { number: "205", name: "TCM Cinéma", desc: "Casablanca — Classique Restauré 4K", isLive: false, quality: "FHD", color: "bg-amber-700", logoText: "TCM" },
    ],
  },
  {
    key: "news",
    labelKey: "iptv.tab_news",
    Icon: Newspaper,
    headerKey: "iptv.header_news",
    subHeaderKey: "iptv.sub_news",
    channels: [
      { number: "301", name: "BFM TV", desc: "Flash Info — Résultats Élections", isLive: true, quality: "FHD", color: "bg-red-500", logoText: "BFM" },
      { number: "302", name: "LCI", desc: "Grand Journal du Soir — En direct", isLive: true, quality: "FHD", color: "bg-blue-600", logoText: "LCI" },
      { number: "303", name: "Al Jazeera English", desc: "Middle East Crisis — Live Coverage", isLive: true, quality: "FHD", color: "bg-emerald-700", logoText: "AJE" },
      { number: "304", name: "France Info", desc: "Météo & Économie — Direct", isLive: true, quality: "HD", color: "bg-violet-600", logoText: "FI" },
      { number: "305", name: "Euronews", desc: "Europe Today — Analyses & Débats", isLive: true, quality: "FHD", color: "bg-slate-600", logoText: "EN" },
    ],
  },
  {
    key: "musique",
    labelKey: "iptv.tab_musique",
    Icon: Music,
    headerKey: "iptv.header_musique",
    subHeaderKey: "iptv.sub_musique",
    channels: [
      { number: "401", name: "MTV France", desc: "Top 50 — Meilleurs Clips du Moment", isLive: true, quality: "FHD", color: "bg-yellow-400", logoText: "MTV" },
      { number: "402", name: "MCM", desc: "Rap Français — Playlist Non-Stop", isLive: true, quality: "FHD", color: "bg-fuchsia-600", logoText: "MCM" },
      { number: "403", name: "Mezzo Live HD", desc: "Concert — Orchestre de Paris Live", isLive: true, quality: "4K", color: "bg-rose-500", logoText: "MZO" },
      { number: "404", name: "Trace Urban", desc: "Urban Hits — R&B & Hip Hop", isLive: false, quality: "HD", color: "bg-orange-500", logoText: "TRU" },
      { number: "405", name: "Jazz à Paris TV", desc: "Festival Jazz — Sessions Live", isLive: true, quality: "FHD", color: "bg-cyan-700", logoText: "JAZ" },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function QualityBadge({ quality }: { quality: Channel["quality"] }) {
  if (quality === "4K") {
    return (
      <span className="inline-flex items-center rounded-md border border-cyan-500/50 bg-cyan-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-cyan-300">
        4K
      </span>
    );
  }
  if (quality === "FHD") {
    return (
      <span className="inline-flex items-center rounded-md border border-blue-500/40 bg-blue-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-blue-300">
        FHD
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md border border-slate-500/40 bg-slate-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-slate-400">
      HD
    </span>
  );
}

function ChannelRow({ ch, index }: { ch: Channel; index: number }) {
  return (
    // RTL-safe: w-full ensures flex container takes full width in both directions
    <div
      className="group flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-all duration-200 hover:border-cyan-500/20 hover:bg-white/[0.07] cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Channel Number */}
      <span className="w-7 shrink-0 text-center text-[10px] font-mono font-semibold text-slate-500">
        {ch.number}
      </span>

      {/* Logo Square */}
      <div
        className={`${ch.color} flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[9px] font-black tracking-tight text-white shadow-lg`}
      >
        {ch.logoText}
      </div>

      {/* Channel Info — min-w-0 + flex-1 lets it truncate in both LTR and RTL */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
          {ch.name}
        </span>
        <span className="truncate text-[10px] text-slate-500 leading-tight">
          {ch.desc}
        </span>
      </div>

      {/* Badges */}
      <div className="flex shrink-0 items-center gap-1.5">
        {ch.isLive && (
          <span className="inline-flex items-center gap-1 rounded-md bg-red-600/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow">
            <span className="h-1 w-1 rounded-full bg-white/80 animate-pulse" />
            LIVE
          </span>
        )}
        <QualityBadge quality={ch.quality} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function IptvPlayerMockup() {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("sport");
  // Track whether user manually selected a tab to pause auto-cycle
  const [userPaused, setUserPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeConfig = TABS.find((tab) => tab.key === activeTab)!;

  // ── Auto-cycle every 5 s, pauses when user clicks a tab ──────────────────
  useEffect(() => {
    if (userPaused) return;

    const timer = setInterval(() => {
      setActiveTab((current) => {
        const currentIdx = TAB_KEYS.indexOf(current);
        return TAB_KEYS[(currentIdx + 1) % TAB_KEYS.length];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [userPaused]);

  // Clean up pauseTimeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleTabClick = useCallback((key: TabKey) => {
    setActiveTab(key);
    // Pause auto-cycle for 15 s after manual interaction, then resume
    setUserPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setUserPaused(false), 15000);
  }, []);

  const extraCounts: Record<TabKey, string> = {
    sport: "575",
    livetv: "1 195",
    cinema: "39 995",
    news: "195",
    musique: "145",
  };

  return (
    <div className="relative h-[430px] w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-[#0a0a0f] shadow-2xl ring-1 ring-white/10 transform-gpu">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -bottom-16 -start-16 h-60 w-60 rounded-full bg-cyan-600/10 blur-2xl transform-gpu" />
      <div className="pointer-events-none absolute -top-10 -end-10 h-48 w-48 rounded-full bg-violet-600/10 blur-2xl transform-gpu" />

      {/*
        flex-row respects direction:
        in RTL the sidebar naturally renders on the RIGHT side.
        w-full min-w-0 prevents flex-shrink collapsing in RTL mode.
      */}
      <div className="relative flex h-full w-full min-w-0 flex-row">

        {/* ── Sidebar (start side — left in LTR, right in RTL) ── */}
        <aside className="flex w-20 min-w-[80px] shrink-0 flex-col items-center gap-1 border-e border-white/5 bg-black/30 py-3 backdrop-blur-md transform-gpu">
          {/* Mini logo */}
          <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Wifi className="h-3.5 w-3.5 text-white" />
          </div>

          {/* Nav items */}
          <nav className="flex flex-1 flex-col items-center gap-1 pt-1" aria-label="IPTV category navigation">
            {TABS.map(({ key, labelKey, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  id={`iptv-tab-${key}`}
                  onClick={() => handleTabClick(key)}
                  aria-label={t(labelKey)}
                  aria-pressed={isActive}
                  className={`group flex w-[56px] flex-col items-center gap-1 rounded-xl px-1 py-2 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30"
                      : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span
                    className={`text-center text-[8.5px] font-semibold leading-none transition-colors ${
                      isActive ? "text-white" : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  >
                    {t(labelKey)}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Auto-cycle progress dots */}
          <div className="mt-1 flex gap-0.5">
            {TAB_KEYS.map((key) => (
              <div
                key={key}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  activeTab === key ? "w-3 bg-cyan-400" : "w-1 bg-white/15"
                }`}
              />
            ))}
          </div>

          {/* Signal indicator */}
          <div className="mt-1.5 flex flex-col items-center gap-0.5">
            <Signal className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[7px] font-bold text-emerald-400/80 tracking-wider">LIVE</span>
          </div>
        </aside>

        {/* ── Main Content (flex-1 — fills remaining space regardless of dir) ── */}
        <main className="flex flex-1 w-full min-w-0 flex-col overflow-hidden">
          {/* Header — justify-between already handles RTL flip */}
          <header className="flex shrink-0 items-center justify-between border-b border-white/5 bg-black/20 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex flex-col">
              <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-white">
                {t(activeConfig.headerKey)}
              </h2>
              <p className="mt-0.5 text-[9px] font-medium text-slate-500 tracking-wide">
                {t(activeConfig.subHeaderKey)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[9px] font-bold text-cyan-400 tracking-widest">
                4K · FHD
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </header>

          {/* Channel List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
            {/* Divider label */}
            <div className="mb-2 flex items-center gap-2 px-1">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                {t("iptv.channels_available")}
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="flex flex-col gap-1.5">
              {activeConfig.channels.map((ch, i) => (
                <ChannelRow key={ch.number} ch={ch} index={i} />
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-center gap-2 pb-1">
              <div className="h-px w-12 bg-white/5" />
              <span className="text-[9px] text-slate-700">
                +{extraCounts[activeTab]} {t("iptv.more_channels")}
              </span>
              <div className="h-px w-12 bg-white/5" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
