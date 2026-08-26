import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { getGlobalSettings } from "@/app/actions/adminActions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#030308" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    settings = (await Promise.race([
      getGlobalSettings(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 3000)
      ),
    ])) as any;
  } catch (_err) {
  }

  const siteName = settings?.siteName || "IPTV For Europe";
  const logoUrl = settings?.logoUrl || "/logo.jpeg";

  return {
    title: `${siteName} | L'Expérience IPTV Ultime & Streaming 4K`,
    description: `Diffusion Instantanée, Qualité Impeccable. Découvrez ${siteName} avec +35,000 chaînes en direct et 80,000 VOD en 4K/8K. Activation < 15 min.`,
    keywords: [
      siteName,
      "IPTV Premium",
      "Abonnement IPTV 4K",
      "Chaînes Sport Live",
      "IPTV Europe",
      "IPTV For Europe",
      "IBO Player",
    ],
    authors: [{ name: siteName }],
    metadataBase: new URL("https://www.iptvforeurop.com"),
    alternates: {
      canonical: "https://www.iptvforeurop.com",
      languages: {
        fr: "https://www.iptvforeurop.com",
        nl: "https://www.iptvforeurop.com?lang=nl",
        ar: "https://www.iptvforeurop.com?lang=ar",
        en: "https://www.iptvforeurop.com?lang=en",
        es: "https://www.iptvforeurop.com?lang=es",
        pt: "https://www.iptvforeurop.com?lang=pt",
      },
    },
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
    verification: {
      google: "ovPZcOFou2AOtK_RhTFuX6uumaFngJMlg5ncZwj4oew",
    },
    openGraph: {
      title: `${siteName} | L'Expérience IPTV Ultime 4K/8K`,
      description:
        "Abonnement IPTV Premium 4K/8K avec activation rapide en 15 minutes et support VIP WhatsApp 24/7.",
      siteName: siteName,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | Streaming IPTV 4K Premium`,
      description:
        "Abonnement IPTV haut de gamme en 4K/8K sans buffering avec activation IBO Player offerte.",
      images: [logoUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Safari / iOS PWA meta
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteName,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning prevents Safari from crashing on class/dir attribute differences
    // set by next-themes and LanguageProvider after client-side hydration
    <html lang="fr" dir="ltr" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 antialiased transition-colors duration-300 selection:bg-cyan-500 selection:text-white dark:bg-[#030308] dark:text-slate-100"
        suppressHydrationWarning
      >
        {/* ── SAFARI DIAGNOSTIC: On-Screen Error Logger ─────────────────────
            Captures JS errors BEFORE React mounts. Remove after diagnosis. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  function showErr(msg, src, line, col, err) {
    var d = document.getElementById('__safari_err');
    if (!d) {
      d = document.createElement('div');
      d.id = '__safari_err';
      d.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#c0392b;color:#fff;padding:16px;font:13px/1.5 monospace;word-break:break-all;max-height:60vh;overflow:auto;';
      document.body.insertBefore(d, document.body.firstChild);
    }
    var entry = document.createElement('div');
    entry.style.cssText = 'border-bottom:1px solid rgba(255,255,255,0.3);padding:8px 0;';
    entry.innerHTML = '<b>[JS ERROR]</b> ' + String(msg) + '<br><small>' + (src||'') + ':' + (line||'?') + ':' + (col||'?') + '</small>' + (err && err.stack ? '<br><small style="opacity:.7">' + err.stack.slice(0,400) + '</small>' : '');
    d.appendChild(entry);
    return false;
  }
  window.onerror = showErr;
  window.addEventListener('unhandledrejection', function(e) {
    var reason = e.reason;
    showErr(reason && reason.message ? reason.message : String(reason), 'Promise', 0, 0, reason);
  });
  window.addEventListener('error', function(e) {
    if (e.target && e.target !== window) {
      showErr('Resource failed to load: ' + (e.target.src || e.target.href || 'unknown'), 'resource', 0, 0, null);
    }
  }, true);
})();
`,
          }}
        />
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}