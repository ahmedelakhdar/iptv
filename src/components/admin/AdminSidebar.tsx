"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, Layers, Settings, ExternalLink, ShieldCheck, LogOut } from "lucide-react";
import { getGlobalSettings, GlobalSettingsData, logoutAdmin } from "@/app/actions/adminActions";

export function AdminSidebar() {
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

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-white dark:bg-[#070714]/95 border-r border-slate-200 dark:border-white/10 backdrop-blur-2xl flex flex-col justify-between p-6 z-40 transition-colors duration-300">
      <div>
        {/* Top Logo */}
        <Link href="/anaAhmedAdmin" className="group flex items-center gap-3 mb-10">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full violet-cyan-gradient p-0.5 shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
            <Image
              src={settings.logoUrl || "/logo.jpeg"}
              alt={`${settings.siteName || "IPTV Netherlands"} Logo`}
              width={40}
              height={40}
              unoptimized={settings.logoUrl?.startsWith("data:") || settings.logoUrl?.startsWith("http")}
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

        {/* Navigation Items */}
        <nav className="space-y-2.5">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
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
                <IconComp className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
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
          <span className="text-[10px] text-slate-500 group-hover:text-slate-400">&rarr;</span>
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
}
