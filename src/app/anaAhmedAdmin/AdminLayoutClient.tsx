"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { setAdminPassword } from "@/app/actions/adminActions";
import {
  Sun,
  Moon,
  ShieldCheck,
  Lock,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
  Menu,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  hasAdminPassword: boolean;
  isAuthenticated: boolean;
}

export function AdminLayoutClient({
  children,
  hasAdminPassword,
  isAuthenticated,
}: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [settingPass, setSettingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);

  // ── Mobile sidebar open/close state lives here ──────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      hasAdminPassword &&
      !isAuthenticated &&
      pathname !== "/anaAhmedAdmin/login"
    ) {
      router.push("/anaAhmedAdmin/login");
    } else if (isAuthenticated && pathname === "/anaAhmedAdmin/login") {
      router.push("/anaAhmedAdmin");
    }
  }, [hasAdminPassword, isAuthenticated, pathname, router]);

  // If we are on the login page itself, render without sidebar layout
  if (pathname === "/anaAhmedAdmin/login") {
    return <>{children}</>;
  }

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingPass(true);
    setPassError(null);

    const res = await setAdminPassword(newPassword);
    if (res.success) {
      setPassSuccess(true);
      setNewPassword("");
      setTimeout(() => setPassSuccess(false), 5000);
      router.refresh();
    } else {
      setPassError(res.error || "Erreur lors de la définition du mot de passe.");
    }
    setSettingPass(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-300 overflow-x-hidden">

      {/* Sidebar — receives mobile state + close handler */}
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Main Content Area ── */}
      <main className="flex flex-1 flex-col min-h-screen min-w-0 overflow-x-hidden relative">

        {/* ── Top Admin Header Bar ── */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#030308]/80 px-4 sm:px-6 md:px-10 backdrop-blur-xl transition-colors duration-300 gap-3">

          {/* Left: hamburger (mobile) + page label */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — only on mobile */}
            <button
              id="admin-hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition-all hover:border-cyan-500 hover:scale-105 active:scale-95"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 truncate">
              <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
              <span className="hidden sm:inline truncate">
                ESPACE ADMINISTRATION SÉCURISÉ
              </span>
              <span className="sm:hidden truncate">ADMIN</span>
            </div>
          </div>

          {/* Right: theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition-all hover:scale-110 hover:border-cyan-500"
              aria-label="Basculer le thème"
              title={theme === "dark" ? "Mode Clair" : "Mode Sombre"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-600" />
              )}
            </button>
          )}
        </header>

        {/* ── Set-Password Banner ── */}
        {!hasAdminPassword && (
          <div className="m-4 sm:m-6 rounded-3xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/40 p-5 sm:p-6 shadow-xl backdrop-blur-xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-amber-800 dark:text-amber-200">
                  Sécurité Administrateur Requise
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 font-light">
                  Aucun mot de passe n&apos;est actuellement configuré.
                  Définissez votre mot de passe pour verrouiller la console
                  administration et protéger vos données.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSetPassword}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <div className="relative flex-1 w-full">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-600 dark:text-amber-400" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Définir un nouveau mot de passe admin"
                  className="w-full rounded-2xl border border-amber-500/30 bg-white dark:bg-white/10 pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={settingPass}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-md transition-all flex-shrink-0"
              >
                <Lock className="h-4 w-4" />
                <span>
                  {settingPass
                    ? "Enregistrement..."
                    : "Enregistrer le mot de passe"}
                </span>
              </button>
            </form>

            {passSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Mot de passe administrateur sécurisé avec succès par hachage
                  Bcrypt !
                </span>
              </div>
            )}

            {passError && (
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                {passError}
              </p>
            )}
          </div>
        )}

        {/* ── Page Content ── */}
        <div className="flex-1 w-full p-2 sm:p-4 overflow-x-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
