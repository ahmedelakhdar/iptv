import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { ErrorBoundary } from "@/components/providers/ErrorBoundary";
import { getGlobalSettings } from "@/app/actions/adminActions";

const interVariable = "font-sans";

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
        setTimeout(() => reject(new Error("Timeout")), 1000)
      ),
    ])) as any;
  } catch (_err) {
    // Fall back immediately to default branding if DB query stalls
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
    <html lang="fr" dir="ltr" className={`${interVariable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 antialiased transition-colors duration-300 selection:bg-cyan-500 selection:text-white dark:bg-[#030308] dark:text-slate-100"
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}