import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://al-kafi-pharmacy-website.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl.replace(/\/$/, "")}/`,
      lastModified: "2026-07-13",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
