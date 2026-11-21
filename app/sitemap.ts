import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";
import { SITE_URL } from "@/lib/site-url";

/*
 * Served at /sitemap.xml. Built from data/projects.json, so every project page
 * is listed automatically. The anchors on the home page (#sobre, #projetos, ...)
 * are not separate pages and are not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/assets/retrato.png`],
    },
    ...getProjects().map((p) => ({
      url: `${SITE_URL}/projetos/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${encodeURI(p.detailImage)}`],
    })),
  ];
}
