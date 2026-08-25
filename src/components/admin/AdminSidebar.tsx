"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Layers,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";
import {
  getGlobalSettings,
  GlobalSettingsData,
  logoutAdmin,
} from "@/app/actions/adminActions";

// Props let AdminLayoutClient push the mobile-open state down into the sidebar
interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<GlobalSettingsData>({
    whatsappNumber: "212600000000",
    supportNumber: "212600000000",
    siteName: "IPTV Netherlands",
    logoUrl: "/logo.jpeg",
  });

  useEffect(() => {
    getGlobalSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  // Close the mobile drawer whenever the user navigates
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navItems = [
    {
      name: "Tableau de Bord",
      href: "/anaAhmedAdmin",
      icon: LayoutGrid,
      exact: true,
    },
    {
      name: "Gestion des Forfaits",
      href: "/anaAhmedAdmin/forfaits",
      icon: Layers,
      exact: false,
    },
    {
      name: "Paramètres",
      href: "/anaAhmedAdmin/settings",
      icon: Settings,
      exact: false,
    },
  ];

  const SidebarContent = (
    <aside className="flex h-full w-full flex-col justify-between bg-white dark:bg-[#070714]/95 border-r border-slate-200 dark:border-white/10 backdrop-blur-2xl p-6 transition-colors duration-300">
      <div>
        {/* Top Logo */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href="/anaAhmedAdmin"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full violet-cyan-gradient p-0.5 shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={settings.logoUrl || "/logo.jpeg"}
                alt={`${settings.siteName || "IPTV Netherlands"} Logo`}
                width={40}
                height={40}
                unoptimized={
                  settings.logoUrl?.startsWith("data:") ||
                  settings.logoUrl?.startsWith("http")
                }
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                {settings.siteName || "IPTV Netherlands"}
              </span>
              <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                ADMIN DASHBOARD
              </span>
            </div>
          </Link>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2.5" aria-label="Navigation administration">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const IconComp = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-full px-4 py-3 text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "violet-cyan-gradient text-white shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                    : "text-slate-600 dark:text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                <IconComp
                  className={`h-4 w-4 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-cyan-400/50 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all group"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Voir le site public</span>
          </span>
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400">
            &rarr;
          </span>
        </Link>

        <button
          type="button"
          onClick={async () => {
            await logoutAdmin();
            window.location.href = "/anaAhmedAdmin/login";
          }}
          className="w-full flex items-center justify-between rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-3.5 w-3.5" />
            <span>Déconnexion</span>
          </span>
        </button>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 px-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Session Administrateur</span>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/*
        ── Desktop sidebar ─────────────────────────────────────────────
        Always visible on md+, fixed height, sticky to top.
      */}
      <div className="hidden md:flex w-64 flex-shrink-0 h-screen sticky top-0 z-40">
        {SidebarContent}
      </div>

      {/*
        ── Mobile sidebar overlay ───────────────────────────────────────
        Slides in from the left when mobileOpen === true.
        Backdrop dims the rest of the screen and closes on click.
      */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Administration"
      >
        {SidebarContent}
      </div>
    </>
  );
}
