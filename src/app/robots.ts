import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/anaAhmedAdmin/", "/admin/"],
      },
    ],
    sitemap: "https://iptv-netherlands.com/sitemap.xml",
  };
}
