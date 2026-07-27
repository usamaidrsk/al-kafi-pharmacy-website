import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export const dynamic = "force-static";

const siteUrl = business.siteUrl.replace(/\/$/, "");

const routes = [
  "/",
  "/about/",
  "/services/",
  "/shop/",
  "/consultation/",
  "/health-hub/",
  "/locations/",
  "/contact/",
  "/careers/",
  "/complaints/",
  "/prescription-support/",
  "/privacy/",
  "/terms/",
  "/accessibility/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: "2026-07-27",
      changeFrequency: "monthly",
      priority: route === "/" ? 1 : 0.7,
  }));
}
