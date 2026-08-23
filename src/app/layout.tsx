import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { getGlobalSettings } from "@/app/actions/adminActions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let settings = null;
  try {
    settings = await getGlobalSettings();
  } catch (_err) {
    // Silently fall back to default settings during build
  }

  const siteName = settings?.siteName || "IPTV Netherlands";
  const logoUrl = settings?.logoUrl || "/logo.jpeg";

  return {
    title: `${siteName} | L'Expérience IPTV Ultime & Streaming 4K`,
    description:
      `Diffusion Instantanée, Qualité Impeccable. Découvrez ${siteName} avec +35,000 chaînes en direct et 80,000 VOD en 4K/8K. Activation < 15 min.`,
    keywords: [
      siteName,
      "IPTV Premium",
      "Abonnement IPTV 4K",
      "Chaînes Sport Live",
      "IPTV Europe",
      "IPTV Netherlands",
      "IPTV Pays-Bas",
      "IBO Player",
    ],
    authors: [{ name: siteName }],
    metadataBase: new URL("https://iptv-netherlands.com"),
    alternates: {
      canonical: "https://iptv-netherlands.com",
      languages: {
        fr: "https://iptv-netherlands.com",
        nl: "https://iptv-netherlands.com?lang=nl",
        ar: "https://iptv-netherlands.com?lang=ar",
        en: "https://iptv-netherlands.com?lang=en",
        es: "https://iptv-netherlands.com?lang=es",
        pt: "https://iptv-netherlands.com?lang=pt",
      },
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 antialiased selection:bg-cyan-500 selection:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw]">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
