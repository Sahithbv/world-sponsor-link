import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/create-opportunity/",
        "/organization/",
        "/forgot-password/",
        "/reset-password/",
      ],
    },
    sitemap: "https://world-sponsor-link.vercel.app/sitemap.xml",
  };
}