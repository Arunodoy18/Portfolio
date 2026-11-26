import type { MetadataRoute } from "next";
import { siteUrl } from "@/site/seo";

export const dynamic = "force-static";

// search engines and AI answer engines are all welcome.
// (the old resume PDF is kept out of results by an X-Robots-Tag noindex header in netlify.toml,
// which crawlers can only see if they are allowed to fetch it)
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
  "DuckAssistBot",
  "YouBot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: ["/", "/llms.txt", "/llms-full.txt"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
