import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.iptvforeurop.com";
  const locales = ["fr", "nl", "ar", "en", "es", "pt"];
  const routes = ["", "/tarifs", "/fonctionnalites", "/contact", "/guide", "/faq"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const isDefault = locale === "fr";
      const url = isDefault ? `${baseUrl}${route}` : `${baseUrl}${route}?lang=${locale}`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : route === "/tarifs" ? 0.9 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
