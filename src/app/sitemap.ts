import { MetadataRoute } from "next";
import { EUROPEAN_LOCATIONS } from "@/lib/locations";
import { getBlogPostSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.iptvforeurop.com";
  const locales = ["fr", "nl", "ar", "en", "es", "pt"];

  const blogSlugs = getBlogPostSlugs();
  const blogRoutes = ["/blog", ...blogSlugs.map((slug) => `/blog/${slug}`)];

  const baseRoutes = ["", "/tarifs", "/fonctionnalites", "/contact", "/guide", "/faq", "/iptv-smart-tv", "/free-iptv-trial"];
  const locationRoutes = EUROPEAN_LOCATIONS.map((loc) => `/iptv-${loc}`);
  const routes = [...baseRoutes, ...locationRoutes, ...blogRoutes];

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
