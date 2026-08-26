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
    sitemap: "https://www.iptvforeurop.com/sitemap.xml",
  };
}
