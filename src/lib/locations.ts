export const EUROPEAN_LOCATIONS = [
  "france",
  "netherlands",
  "belgium",
  "switzerland",
  "germany",
  "spain",
  "italy",
  "uk",
  "portugal",
  "sweden",
  "norway",
  "denmark",
  "austria",
  "ireland",
  "luxembourg",
] as const;

export type LocationSlug = (typeof EUROPEAN_LOCATIONS)[number];

export const LOCATION_NAMES: Record<string, string> = {
  france: "France",
  netherlands: "Pays-Bas",
  belgium: "Belgique",
  switzerland: "Suisse",
  germany: "Allemagne",
  spain: "Espagne",
  italy: "Italie",
  uk: "Royaume-Uni",
  portugal: "Portugal",
  sweden: "Suède",
  norway: "Norvège",
  denmark: "Danemark",
  austria: "Autriche",
  ireland: "Irlande",
  luxembourg: "Luxembourg",
};

export function formatLocationName(slug?: string): string {
  if (!slug || typeof slug !== "string") return "Europe";
  const normalized = slug.toLowerCase();
  if (LOCATION_NAMES[normalized]) {
    return LOCATION_NAMES[normalized];
  }
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
