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
