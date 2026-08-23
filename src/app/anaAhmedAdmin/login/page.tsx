"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/adminActions";
import { Lock, KeyRound, Sparkles, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loginAdmin(password);
    if (res.success) {
      router.push("/anaAhmedAdmin");
      router.refresh();
    } else {
      setError(res.error || "Mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 p-4 transition-colors duration-300 selection:bg-cyan-500 selection:text-white">
      {/* Glowing Backdrop Orbs */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-600/20 via-cyan-500/20 to-emerald-500/20 blur-[140px]" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 dark:bg-violet-950/40 px-3.5 py-1 text-xs font-bold text-violet-700 dark:text-violet-300 backdrop-blur-xl">
            <ShieldCheck className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>ACCÈS SÉCURISÉ ADMIN</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Connexion <span className="animated-gradient-text">Administration</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
            Veuillez saisir votre mot de passe administrateur pour déverrouiller la console.
          </p>
        </div>

        {/* Login Glassmorphism Card */}
        <div className="glass-bento rounded-3xl p-7 sm:p-9 border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070714]/90 shadow-2xl space-y-6 transition-colors duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 shadow-md mx-auto">
            <Lock className="h-6 w-6" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <KeyRound className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Mot de passe administrateur</span>
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3.5 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur-xl shadow-inner transition-colors duration-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/40 bg-rose-500/10 dark:bg-rose-950/40 px-4 py-3 text-xs font-bold text-rose-700 dark:text-rose-300">
                <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl violet-cyan-gradient py-4 text-center text-sm font-extrabold text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{loading ? "Vérification..." : "Se connecter"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
