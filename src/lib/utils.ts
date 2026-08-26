import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppNumber(rawNumber: string): string {
  if (!rawNumber) return "212600000000";
  // Remove all spaces, dashes, +, parentheses, and non-digit characters
  let cleaned = rawNumber.replace(/[^0-9]/g, "");

  // If it starts with leading '0' (e.g. 06..., 07...), replace leading 0 with '212' (Morocco default)
  if (/^0[1-9]/.test(cleaned)) {
    cleaned = "212" + cleaned.substring(1);
  }

  return cleaned || "212600000000";
}

export function getConnectionsText(name: string): string {
  switch (name) {
    case "Duo":
      return "2 appareils";
    case "Family":
      return "3 appareils";
    case "Maison":
      return "4 appareils";
    default:
      return "1 appareil";
  }
}

export function formatEuroPrice(rawPrice?: string | number | null): string {
  if (rawPrice === null || rawPrice === undefined || rawPrice === "") return "0 €";
  const cleaned = String(rawPrice)
    .replace(/DH|MAD|Dirham|€/gi, "")
    .trim();
  return `${cleaned} €`;
}

export function parseDurationMonths(durationStr?: string): number {
  if (!durationStr) return 12;
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 12;
}

export function parsePriceNumeric(priceStr?: string | number): number {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return 0;
  const cleaned = String(priceStr).replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

export function sortPricingPlans<T extends { isVip?: boolean; name?: string; duration?: string; period?: string; price?: string | number }>(plans: T[]): T[] {
  return [...plans].sort((a, b) => {
    const isVipA = Boolean(a.isVip || a.name?.toLowerCase().includes("vip"));
    const isVipB = Boolean(b.isVip || b.name?.toLowerCase().includes("vip"));

    // Condition A (VIP Last): Any VIP plan MUST ALWAYS be placed at the very end
    if (isVipA && !isVipB) return 1;
    if (!isVipA && isVipB) return -1;

    // Condition B (Ascending Duration): 3 months, 6 months, 12 months
    const durationA = parseDurationMonths(a.duration || a.period);
    const durationB = parseDurationMonths(b.duration || b.period);
    if (durationA !== durationB) {
      return durationA - durationB;
    }

    // Condition C (Ascending Price): Cheapest price first if duration is identical
    const priceA = parsePriceNumeric(a.price);
    const priceB = parsePriceNumeric(b.price);
    return priceA - priceB;
  });
}
