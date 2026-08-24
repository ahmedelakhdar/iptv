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
  hasVod: boolean;
  hasEpg: boolean;
  hasReplay: boolean;
  hasAdults: boolean;
  hasIboPlayer: boolean;
  hasConnections: boolean;
  hasGuarantee: boolean;
  hasRefund: boolean;
  hasSupport: boolean;

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
const DEFAULT_SITE_NAME = "IPTV Netherlands";
const DEFAULT_LOGO_URL = "/logo.jpeg";
const DEFAULT_SUPPORT_EMAIL = "contact@iptv-netherlands.com";

const DEFAULT_PLANS: PlanData[] = [
  {
    id: "lite-plan-id",
    name: "Lite",
    price: "27 €",
    liveChannels: "8 000",
    quality: "HD",
    isPopular: false,
    hasVod: true,
    hasEpg: true,
    hasReplay: false,
    hasAdults: false,
    hasIboPlayer: true,
    hasConnections: true,
    hasGuarantee: true,
    hasRefund: true,
    hasSupport: true,
    currency: "€",
    duration: "/ 12 mois",
    subtitle: "8 000 chaînes — offre entrée de gamme Netherlands.",
    orderIndex: 0,
  },
  {
    id: "standard-plan-id",
    name: "Standard",
    price: "35 €",
    liveChannels: "12 000",
    quality: "HD & Full HD",
    isPopular: false,
    hasVod: true,
    hasEpg: true,
    hasReplay: false,
    hasAdults: false,
    hasIboPlayer: true,
    hasConnections: true,
    hasGuarantee: true,
    hasRefund: true,
    hasSupport: true,
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
    hasVod: true,
    hasEpg: true,
    hasReplay: true,
    hasAdults: false,
    hasIboPlayer: true,
    hasConnections: true,
    hasGuarantee: true,
    hasRefund: true,
    hasSupport: true,
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
    hasVod: true,
    hasEpg: true,
    hasReplay: true,
    hasAdults: true,
    hasIboPlayer: true,
    hasConnections: true,
    hasGuarantee: true,
    hasRefund: true,
    hasSupport: true,
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
      hasVod: p.hasVod,
      hasEpg: p.hasEpg,
      hasReplay: p.hasReplay,
      hasAdults: p.hasAdults,
      hasIboPlayer: p.hasIboPlayer,
      hasConnections: p.hasConnections,
      hasGuarantee: p.hasGuarantee,
      hasRefund: p.hasRefund,
      hasSupport: p.hasSupport,
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
    const formattedPrice = formatEuroPrice(data.price || "27");

    const isPopular = Boolean(data.isPopular && String(data.isPopular) !== "false");
    const hasVod = Boolean(data.hasVod && String(data.hasVod) !== "false");
    const hasEpg = Boolean(data.hasEpg && String(data.hasEpg) !== "false");
    const hasReplay = Boolean(data.hasReplay && String(data.hasReplay) !== "false");
    const hasAdults = Boolean(data.hasAdults && String(data.hasAdults) !== "false");
    const hasIboPlayer = Boolean(data.hasIboPlayer && String(data.hasIboPlayer) !== "false");
    const hasConnections = Boolean(data.hasConnections && String(data.hasConnections) !== "false");
    const hasGuarantee = Boolean(data.hasGuarantee && String(data.hasGuarantee) !== "false");
    const hasRefund = Boolean(data.hasRefund && String(data.hasRefund) !== "false");
    const hasSupport = Boolean(data.hasSupport && String(data.hasSupport) !== "false");

    const durationStr = String(data.duration || "12 mois");
    const liveChannelsStr = String(data.liveChannels || "8 000");
    const qualityStr = String(data.quality || "HD");
    const subtitleStr = String(data.subtitle || "");

    const dbPlan = await prisma.pricingPlan.create({
      data: {
        name: String(data.name || "Lite"),
        price: formattedPrice,
        liveChannels: liveChannelsStr,
        quality: qualityStr,
        isPopular,
        hasVod,
        hasEpg,
        hasReplay,
        hasAdults,
        hasIboPlayer,
        hasConnections,
        hasGuarantee,
        hasRefund,
        hasSupport,
        currency: "€",
        duration: durationStr,
        subtitle: subtitleStr,
        orderIndex: data.orderIndex ?? 0,
      },
    });

    const newPlan: PlanData = {
      id: dbPlan.id,
      name: dbPlan.name,
      price: dbPlan.price,
      liveChannels: dbPlan.liveChannels,
      quality: dbPlan.quality,
      isPopular: dbPlan.isPopular,
      hasVod: dbPlan.hasVod,
      hasEpg: dbPlan.hasEpg,
      hasReplay: dbPlan.hasReplay,
      hasAdults: dbPlan.hasAdults,
      hasIboPlayer: dbPlan.hasIboPlayer,
      hasConnections: dbPlan.hasConnections,
      hasGuarantee: dbPlan.hasGuarantee,
      hasRefund: dbPlan.hasRefund,
      hasSupport: dbPlan.hasSupport,
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
  } catch (error: any) {
    console.error("PRISMA ERROR in createPlan:", error);
    return { success: false, error: error.message || "Erreur lors de la création du forfait" };
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

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = String(data.name);
    if (data.price !== undefined) {
      updateData.price = formatEuroPrice(data.price);
      updateData.currency = "€";
    }
    if (data.liveChannels !== undefined) updateData.liveChannels = String(data.liveChannels);
    if (data.quality !== undefined) updateData.quality = String(data.quality);
    if (data.isPopular !== undefined) updateData.isPopular = Boolean(data.isPopular && String(data.isPopular) !== "false");
    if (data.hasVod !== undefined) updateData.hasVod = Boolean(data.hasVod && String(data.hasVod) !== "false");
    if (data.hasEpg !== undefined) updateData.hasEpg = Boolean(data.hasEpg && String(data.hasEpg) !== "false");
    if (data.hasReplay !== undefined) updateData.hasReplay = Boolean(data.hasReplay && String(data.hasReplay) !== "false");
    if (data.hasAdults !== undefined) updateData.hasAdults = Boolean(data.hasAdults && String(data.hasAdults) !== "false");
    if (data.hasIboPlayer !== undefined) updateData.hasIboPlayer = Boolean(data.hasIboPlayer && String(data.hasIboPlayer) !== "false");
    if (data.hasConnections !== undefined) updateData.hasConnections = Boolean(data.hasConnections && String(data.hasConnections) !== "false");
    if (data.hasGuarantee !== undefined) updateData.hasGuarantee = Boolean(data.hasGuarantee && String(data.hasGuarantee) !== "false");
    if (data.hasRefund !== undefined) updateData.hasRefund = Boolean(data.hasRefund && String(data.hasRefund) !== "false");
    if (data.hasSupport !== undefined) updateData.hasSupport = Boolean(data.hasSupport && String(data.hasSupport) !== "false");
    if (data.currency !== undefined) updateData.currency = String(data.currency);
    if (data.duration !== undefined) updateData.duration = String(data.duration);
    if (data.subtitle !== undefined) updateData.subtitle = String(data.subtitle);
    if (data.orderIndex !== undefined) updateData.orderIndex = Number(data.orderIndex);

    if (!id.startsWith("plan-")) {
      await prisma.pricingPlan.update({
        where: { id },
        data: updateData,
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
  } catch (error: any) {
    console.error("PRISMA ERROR in updatePlan:", error);
    return { success: false, error: error.message || "Erreur lors de la modification du forfait" };
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
  } catch (error: any) {
    console.error("PRISMA ERROR in deletePlan:", error);
    return { success: false, error: error.message || "Erreur lors de la suppression du forfait" };
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

