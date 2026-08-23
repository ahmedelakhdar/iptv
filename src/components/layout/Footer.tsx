"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tv, Monitor, Smartphone, Cpu, ShieldCheck, Mail, MessageCircle, Heart } from "lucide-react";
import { getGlobalSettings, GlobalSettingsData } from "@/app/actions/adminActions";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
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

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#030308] pt-16 pb-12 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Left Column: Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full violet-cyan-gradient p-0.5 shadow-lg shadow-violet-500/30">
                <Image
                  src={settings.logoUrl || "/logo.jpeg"}
                  alt={`${settings.siteName || "IPTV Netherlands"} Logo`}
                  width={40}
                  height={40}
                  unoptimized={settings.logoUrl?.startsWith("data:") || settings.logoUrl?.startsWith("http")}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {settings.siteName || "IPTV Netherlands"}
              </span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-light">
              {t("footer.desc")}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>{t("footer.security")}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-2">
              © 2026 {settings.siteName || "IPTV Netherlands"}. {t("footer.rights")}
            </p>
          </div>

          {/* Column 1: Devices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t("footer.compatibility")}
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Monitor className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                <Link href="/#bento">Smart TV (Samsung/LG)</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Smartphone className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                <Link href="/#bento">Smartphones Android / iOS</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Cpu className="h-3.5 w-3.5 text-pink-500 dark:text-pink-400" />
                <Link href="/#bento">Amazon Firestick &amp; MAG</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Monitor className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                <Link href="/#bento">Windows PC &amp; Mac</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Offres */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t("footer.offers_title")}
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-600 dark:text-slate-400">
              <li className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Link href="/tarifs">{t("nav.pricing")}</Link>
              </li>
              <li className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Link href="/fonctionnalites">{t("nav.features")}</Link>
              </li>
              <li className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Link href="/guide">{t("nav.guide")}</Link>
              </li>
              <li className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Link href="/faq">{t("nav.faq")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t("footer.support_title")}
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                <Link href="/contact">Support WhatsApp VIP</Link>
              </li>
              <li className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Mail className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                <Link href="/contact">{t("nav.contact")}</Link>
              </li>
              <li className="hover:text-violet-600 dark:hover:text-violet-300 transition-colors">
                <Link href="/faq">Politique de Remboursement 45j</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row text-xs text-slate-500 dark:text-slate-400 font-light">
          <p>© 2022 - 2026 {settings.siteName || "IPTV Netherlands"}.</p>
          <div className="flex items-center gap-1">
            <span>Conçu avec</span>
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500" />
            <span>pour l&apos;expérience de divertissement ultime.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
