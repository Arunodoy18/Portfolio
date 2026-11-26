import type { MetadataRoute } from "next";
import { projects } from "@/site/data";
import { siteUrl } from "@/site/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly", images?: string[]) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((i) => `${siteUrl}${i}`) } : {}),
  });
  return [
    page("/", 1, "weekly", ["/og.jpg", "/work/portrait.jpg"]),
    page("/about", 0.9, "monthly", ["/work/portrait.jpg"]),
    page("/projects", 0.9, "weekly"),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.8, "monthly", p.image ? [p.image] : undefined)),
    page("/notes", 0.7, "monthly", ["/work/hills.jpg", "/work/steps.jpg"]),
    page("/open-source", 0.7, "monthly"),
    page("/contact", 0.7, "monthly", ["/work/contact.jpg"]),
    page("/privacy", 0.3, "monthly"),
  ];
}
