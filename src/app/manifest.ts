import type { MetadataRoute } from "next";
import { fullName, shortBio } from "@/site/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${fullName} — Engineering, as art`,
    short_name: "Arunodoy",
    description: shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
