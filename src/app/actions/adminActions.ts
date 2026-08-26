"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { formatWhatsAppNumber, formatEuroPrice } from "@/lib/utils";

export interface PlanData {
  id: string;
  name: string;
  price: string;
  liveChannels: string;
  quality: string;
  isPopular: boolean;
  isVip?: boolean;
  /** Dynamic feature strings shown on the public pricing card and detail modal */
  features: string[];
  bonusDays?: number;
  description?: string;
  originalPrice?: number | null;

  currency?: string;
  duration?: string;
  period?: string;
  subtitle?: string;
  orderIndex?: number;
}

export interface ContactNumbers {
  whatsappNumber: string;
  supportNumber: string;
}

export interface GlobalSettingsData {
  whatsappNumber: string;
  supportNumber: string;
  siteName: string;
  logoUrl: string;
  supportEmail?: string;
  hasAdminPassword?: boolean;
}

const DEFAULT_WHATSAPP_NUMBER = "212600000000";
const DEFAULT_SUPPORT_NUMBER = "212600000000";
const DEFAULT_SITE_NAME = "IPTV For Europe";
const DEFAULT_LOGO_URL = "/logo.jpeg";
const DEFAULT_SUPPORT_EMAIL = "contact@iptvforeurop.com";

const DEFAULT_PLANS: PlanData[] = [
  {
    id: "lite-plan-id",
    name: "Lite",
    price: "27 €",
    liveChannels: "8 000",
    quality: "HD",
    isPopular: false,
    features: [
      "8 000 chaînes TV en direct",
      "Qualité HD",
      "VOD (+200 000 Films & Séries)",
      "EPG Guide TV inclus",
      "IBO Player activé",
      "1 connexion simultanée",
      "Garantie 12 mois",
      "Remboursement 45 jours",
      "Support WhatsApp 24/7",
    ],
    currency: "€",
    duration: "/ 12 mois",
    subtitle: "8 000 chaînes — offre entrée de gamme Europe.",
    orderIndex: 0,
  },
  {
    id: "standard-plan-id",
    name: "Standard",
    price: "35 €",
    liveChannels: "12 000",
    quality: "HD & Full HD",
    isPopular: false,
    features: [
      "12 000 chaînes TV en direct",
      "Qualité HD & Full HD",
      "VOD (+200 000 Films & Séries)",
      "EPG Guide TV inclus",
      "IBO Player activé",
      "2 connexions simultanées",
      "Garantie 12 mois",
      "Remboursement 45 jours",
      "Support WhatsApp 24/7",
    ],
    currency: "€",
    duration: "/ 12 mois",
    subtitle: "12 000 chaînes — excellent équilibre.",
    orderIndex: 1,
  },
  {
    id: "premium-plan-id",
    name: "Premium",
    price: "40 €",
    liveChannels: "25 000",
    quality: "4K",
    isPopular: true,
    features: [
      "25 000 chaînes TV en direct",
      "Qualité 4K Ultra HD",
      "VOD (+200 000 Films & Séries)",
      "EPG Guide TV inclus",
      "Replay 7 jours inclus",
      "IBO Player activé",
      "3 connexions simultanées",
      "Garantie 12 mois",
      "Remboursement 45 jours",
      "Support WhatsApp 24/7",
    ],
    currency: "€",
    duration: "/ 12 mois",
    subtitle: "25 000 chaînes + 4K — le plus choisi.",
    orderIndex: 2,
  },
  {
    id: "vip-plan-id",
    name: "VIP",
    price: "50 €",
    liveChannels: "35 000",
    quality: "4K & 8K",
    isPopular: false,
    isVip: true,
    features: [
      "35 000 chaînes TV en direct",
      "Qualité 4K & 8K",
      "VOD (+200 000 Films & Séries)",
      "EPG Guide TV inclus",
      "Replay 7 jours inclus",
      "Chaînes Adultes (+18) incluses",
      "IBO Player activé",
      "5 connexions simultanées",
      "Garantie 12 mois",
      "Remboursement 45 jours",
      "Support WhatsApp 24/7",
    ],
    currency: "€",
    duration: "/ 12 mois",
    subtitle: "35 000 chaînes + 4K/8K + Adultes.",
    orderIndex: 3,
  },
];

let memoryWhatsapp = DEFAULT_WHATSAPP_NUMBER;
let memorySupport = DEFAULT_SUPPORT_NUMBER;
let memorySiteName = DEFAULT_SITE_NAME;
let memoryLogoUrl = DEFAULT_LOGO_URL;
let memorySupportEmail = DEFAULT_SUPPORT_EMAIL;
let memoryAdminPassword: string | null = null;
let memoryPlans: PlanData[] = [];

export async function getWhatsappNumber(): Promise<string> {
  try {
    const settings = await prisma.globalSettings.findFirst();
    if (settings && settings.whatsappNumber) {
      return settings.whatsappNumber;
    }
  } catch (_error) {
    // Fallback to memory state
  }
  return memoryWhatsapp;
}

export async function getGlobalSettings(): Promise<GlobalSettingsData> {
  try {
    const settings = await prisma.globalSettings.findFirst();
    if (settings) {
      memoryWhatsapp = settings.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
      memorySupport = settings.supportNumber || DEFAULT_SUPPORT_NUMBER;
      memorySiteName = settings.siteName || DEFAULT_SITE_NAME;
      memoryLogoUrl = settings.logoUrl || DEFAULT_LOGO_URL;
      memorySupportEmail = settings.supportEmail || DEFAULT_SUPPORT_EMAIL;
      if (settings.adminPassword) memoryAdminPassword = settings.adminPassword;
      return {
        whatsappNumber: memoryWhatsapp,
        supportNumber: memorySupport,
        siteName: memorySiteName,
        logoUrl: memoryLogoUrl,
        supportEmail: memorySupportEmail,
        hasAdminPassword: Boolean(settings.adminPassword || memoryAdminPassword),
      };
    }
  } catch (_error) {
    // Fallback gracefully on build or unsynced DB column errors
  }
  return {
    whatsappNumber: memoryWhatsapp,
    supportNumber: memorySupport,
    siteName: memorySiteName,
    logoUrl: memoryLogoUrl,
    supportEmail: memorySupportEmail,
    hasAdminPassword: Boolean(memoryAdminPassword),
  };
}

export async function updateGlobalSettings(
  data: Partial<GlobalSettingsData>
): Promise<{ success: boolean; settings: GlobalSettingsData }> {
  if (data.whatsappNumber !== undefined) {
    memoryWhatsapp = data.whatsappNumber.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;
  }
  if (data.supportNumber !== undefined) {
    memorySupport = data.supportNumber.replace(/\D/g, "") || DEFAULT_SUPPORT_NUMBER;
  }
  if (data.siteName !== undefined) {
    memorySiteName = data.siteName.trim() || DEFAULT_SITE_NAME;
  }
  if (data.logoUrl !== undefined) {
    memoryLogoUrl = data.logoUrl.trim() || DEFAULT_LOGO_URL;
  }
  if (data.supportEmail !== undefined) {
    memorySupportEmail = data.supportEmail.trim() || DEFAULT_SUPPORT_EMAIL;
  }

  try {
    const existing = await prisma.globalSettings.findFirst();
    if (existing) {
      await prisma.globalSettings.update({
        where: { id: existing.id },
        data: {
          whatsappNumber: memoryWhatsapp,
          supportNumber: memorySupport,
          siteName: memorySiteName,
          logoUrl: memoryLogoUrl,
          supportEmail: memorySupportEmail,
        },
      });
    } else {
      await prisma.globalSettings.create({
        data: {
          whatsappNumber: memoryWhatsapp,
          supportNumber: memorySupport,
          siteName: memorySiteName,
          logoUrl: memoryLogoUrl,
          supportEmail: memorySupportEmail,
        },
      });
    }
  } catch (error) {
    console.warn("DB connection warning in updateGlobalSettings, updated memory state:", error);
  }

  revalidatePath("/", "layout");
  revalidatePath("/anaAhmedAdmin", "layout");
  revalidatePath("/anaAhmedAdmin/settings");
  return {
    success: true,
    settings: {
      whatsappNumber: memoryWhatsapp,
      supportNumber: memorySupport,
      siteName: memorySiteName,
      logoUrl: memoryLogoUrl,
      supportEmail: memorySupportEmail,
    },
  };
}

export async function getContactNumbers(): Promise<ContactNumbers> {
  const settings = await getGlobalSettings();
  return {
    whatsappNumber: settings.whatsappNumber,
    supportNumber: settings.supportNumber,
  };
}

export async function updateContactNumbers(
  whatsappNumber: string,
  supportNumber?: string
): Promise<{ success: boolean; numbers: ContactNumbers }> {
  const result = await updateGlobalSettings({
    whatsappNumber,
    supportNumber: supportNumber || memorySupport,
  });
  return {
    success: result.success,
    numbers: {
      whatsappNumber: result.settings.whatsappNumber,
      supportNumber: result.settings.supportNumber,
    },
  };
}

export async function updateWhatsAppOnly(newNumber: string): Promise<{ success: boolean; number: string }> {
  const res = await updateContactNumbers(newNumber, memorySupport);
  return { success: res.success, number: res.numbers.whatsappNumber };
}

export async function getPlans(): Promise<PlanData[]> {
  try {
    const dbPlans = await prisma.pricingPlan.findMany({
      orderBy: { orderIndex: "asc" },
    });

    return dbPlans.map((p) => ({
      id: p.id,
      name: p.name,
      price: formatEuroPrice(p.price),
      liveChannels: p.liveChannels,
      quality: p.quality,
      isPopular: p.isPopular,
      isVip: p.isVip ?? false,
      features: p.features,
      bonusDays: p.bonusDays ?? 0,
      description: p.description || "",
      originalPrice: p.originalPrice ?? null,
      currency: "€",
      duration: p.duration,
      period: p.duration,
      subtitle: p.subtitle || "",
      orderIndex: p.orderIndex,
    }));
  } catch (error) {
    console.error("PRISMA ERROR in getPlans:", error);
    return [];
  }
}

export async function createPlan(data: Omit<PlanData, "id">): Promise<{ success: boolean; plan?: PlanData; error?: string }> {
  try {
    if (!data.name || String(data.name).trim() === "") {
      return { success: false, error: "Le nom du forfait est requis." };
    }

    const formattedPrice = formatEuroPrice(data.price || "27");
    const nameStr = String(data.name).trim();
    const durationStr = String(data.duration || "12 mois");
    const liveChannelsStr = String(data.liveChannels || "8 000");
    const qualityStr = String(data.quality || "HD");
    const subtitleStr = String(data.subtitle || "");
    const orderIndexInt = typeof data.orderIndex === "number" && !isNaN(data.orderIndex) ? Math.floor(data.orderIndex) : 0;
    const isPopular = Boolean(data.isPopular && String(data.isPopular) !== "false");
    const isVip = Boolean(data.isVip && String(data.isVip) !== "false");
    const features = Array.isArray(data.features) ? data.features.filter(Boolean) : [];
    const bonusDays = typeof data.bonusDays === "number" && !isNaN(data.bonusDays) ? Math.max(0, Math.floor(data.bonusDays)) : 0;
    const description = data.description ? String(data.description).trim() : null;
    const originalPrice = typeof data.originalPrice === "number" && !isNaN(data.originalPrice) && data.originalPrice > 0 ? data.originalPrice : null;

    const dbPlan = await prisma.pricingPlan.create({
      data: {
        name: nameStr,
        price: formattedPrice,
        liveChannels: liveChannelsStr,
        quality: qualityStr,
        isPopular,
        isVip,
        features,
        bonusDays,
        description,
        originalPrice,
        currency: "€",
        duration: durationStr,
        subtitle: subtitleStr,
        orderIndex: orderIndexInt,
      },
    });

    const newPlan: PlanData = {
      id: dbPlan.id,
      name: dbPlan.name,
      price: dbPlan.price,
      liveChannels: dbPlan.liveChannels,
      quality: dbPlan.quality,
      isPopular: dbPlan.isPopular,
      isVip: dbPlan.isVip,
      features: dbPlan.features,
      bonusDays: dbPlan.bonusDays,
      description: dbPlan.description || "",
      originalPrice: dbPlan.originalPrice,
      currency: "€",
      duration: dbPlan.duration,
      period: dbPlan.duration,
      subtitle: dbPlan.subtitle || "",
      orderIndex: dbPlan.orderIndex,
    };

    memoryPlans.push(newPlan);

    revalidatePath("/", "layout");
    revalidatePath("/tarifs");
    revalidatePath("/tarifs", "page");
    revalidatePath("/anaAhmedAdmin");
    revalidatePath("/anaAhmedAdmin", "layout");
    revalidatePath("/anaAhmedAdmin/forfaits");
    revalidatePath("/anaAhmedAdmin/forfaits", "page");

    return { success: true, plan: newPlan };
  } catch (error: unknown) {
    console.error("PRISMA ERROR in createPlan:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" };
  }
}

export async function updatePlan(id: string, data: Partial<PlanData>): Promise<{ success: boolean; plan?: PlanData; error?: string }> {
  try {
    const planIdx = memoryPlans.findIndex((p) => p.id === id);
    if (planIdx !== -1) {
      const existing = memoryPlans[planIdx];
      const formattedPrice = data.price ? formatEuroPrice(data.price) : existing.price;
      memoryPlans[planIdx] = {
        ...existing,
        ...data,
        price: formattedPrice,
        currency: "€",
        period: data.duration ? String(data.duration) : existing.duration,
      };
    }

    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = String(data.name);
    if (data.price !== undefined) { updateData.price = formatEuroPrice(data.price); updateData.currency = "€"; }
    if (data.liveChannels !== undefined) updateData.liveChannels = String(data.liveChannels);
    if (data.quality !== undefined) updateData.quality = String(data.quality);
    if (data.isPopular !== undefined) updateData.isPopular = Boolean(data.isPopular && String(data.isPopular) !== "false");
    if (data.isVip !== undefined) updateData.isVip = Boolean(data.isVip && String(data.isVip) !== "false");
    if (Array.isArray(data.features)) updateData.features = data.features.filter(Boolean);
    if (data.bonusDays !== undefined) updateData.bonusDays = Math.max(0, Math.floor(Number(data.bonusDays))) || 0;
    if (data.description !== undefined) updateData.description = String(data.description).trim();
    if (data.originalPrice !== undefined) updateData.originalPrice = typeof data.originalPrice === "number" && !isNaN(data.originalPrice) && data.originalPrice > 0 ? data.originalPrice : null;
    if (data.currency !== undefined) updateData.currency = String(data.currency);
    if (data.duration !== undefined) updateData.duration = String(data.duration);
    if (data.subtitle !== undefined) updateData.subtitle = String(data.subtitle);
    if (data.orderIndex !== undefined) updateData.orderIndex = Math.floor(Number(data.orderIndex)) || 0;

    if (!id.startsWith("plan-")) {
      await prisma.pricingPlan.update({ where: { id }, data: updateData });
    }

    revalidatePath("/", "layout");
    revalidatePath("/tarifs");
    revalidatePath("/tarifs", "page");
    revalidatePath("/anaAhmedAdmin");
    revalidatePath("/anaAhmedAdmin", "layout");
    revalidatePath("/anaAhmedAdmin/forfaits");
    revalidatePath("/anaAhmedAdmin/forfaits", "page");

    return { success: true };
  } catch (error: unknown) {
    console.error("PRISMA ERROR in updatePlan:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" };
  }
}

export async function deletePlan(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    memoryPlans = memoryPlans.filter((p) => p.id !== id);

    if (!id.startsWith("plan-")) {
      await prisma.pricingPlan.delete({
        where: { id },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/tarifs");
    revalidatePath("/tarifs", "page");
    revalidatePath("/anaAhmedAdmin");
    revalidatePath("/anaAhmedAdmin", "layout");
    revalidatePath("/anaAhmedAdmin/forfaits");
    revalidatePath("/anaAhmedAdmin/forfaits", "page");

    return { success: true };
  } catch (error: unknown) {
    console.error("PRISMA ERROR in deletePlan:", error);
    return { success: false, error: error instanceof Error ? error.message : "Erreur inconnue" };
  }
}

export async function setAdminPassword(rawPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!rawPassword || rawPassword.trim().length < 4) {
      return { success: false, error: "Le mot de passe doit contenir au moins 4 caractères." };
    }
    const hashedPassword = await bcrypt.hash(rawPassword.trim(), 10);
    memoryAdminPassword = hashedPassword;

    try {
      const existing = await prisma.globalSettings.findFirst();
      if (existing) {
        await prisma.globalSettings.update({
          where: { id: existing.id },
          data: { adminPassword: hashedPassword },
        });
      } else {
        await prisma.globalSettings.create({
          data: {
            whatsappNumber: memoryWhatsapp,
            supportNumber: memorySupport,
            siteName: memorySiteName,
            logoUrl: memoryLogoUrl,
            adminPassword: hashedPassword,
          },
        });
      }
    } catch (dbErr) {
      console.warn("DB connection warning in setAdminPassword, updated memory state:", dbErr);
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
      sameSite: "lax",
    });

    revalidatePath("/anaAhmedAdmin", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("PRISMA ERROR in setAdminPassword:", error);
    return { success: false, error: error.message || "Erreur lors de la définition du mot de passe." };
  }
}

export async function loginAdmin(rawPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    let settings = null;
    try {
      settings = await prisma.globalSettings.findFirst();
    } catch (err) {
      console.warn("DB connection warning in loginAdmin:", err);
    }

    const hashedPassword = settings?.adminPassword || memoryAdminPassword;
    if (!hashedPassword) {
      return { success: false, error: "Aucun mot de passe n'a été défini pour l'administration." };
    }

    const isValid = await bcrypt.compare(rawPassword.trim(), hashedPassword);
    if (!isValid) {
      return { success: false, error: "Mot de passe incorrect." };
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
      sameSite: "lax",
    });

    revalidatePath("/anaAhmedAdmin", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("PRISMA ERROR in loginAdmin:", error);
    return { success: false, error: error.message || "Erreur d'authentification." };
  }
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });
    revalidatePath("/anaAhmedAdmin", "layout");
    return { success: true };
  } catch (err) {
    console.error("Error in logoutAdmin:", err);
    return { success: false };
  }
}

export async function updateAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!currentPassword || !newPassword) {
      return { success: false, error: "Veuillez remplir tous les champs." };
    }
    if (newPassword.trim().length < 4) {
      return { success: false, error: "Le nouveau mot de passe doit contenir au moins 4 caractères." };
    }

    let settings = null;
    try {
      settings = await prisma.globalSettings.findFirst();
    } catch (err) {
      console.warn("DB connection warning in updateAdminPassword:", err);
    }

    const currentHashed = settings?.adminPassword || memoryAdminPassword;
    if (!currentHashed) {
      return { success: false, error: "Aucun mot de passe n'est actuellement configuré." };
    }

    const isMatch = await bcrypt.compare(currentPassword.trim(), currentHashed);
    if (!isMatch) {
      return { success: false, error: "Le mot de passe actuel est incorrect." };
    }

    const newHashed = await bcrypt.hash(newPassword.trim(), 10);
    memoryAdminPassword = newHashed;

    try {
      if (settings) {
        await prisma.globalSettings.update({
          where: { id: settings.id },
          data: { adminPassword: newHashed },
        });
      }
    } catch (dbErr) {
      console.warn("DB connection warning in updateAdminPassword:", dbErr);
    }

    revalidatePath("/anaAhmedAdmin", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("PRISMA ERROR in updateAdminPassword:", error);
    return { success: false, error: error.message || "Erreur lors du changement de mot de passe." };
  }
}

