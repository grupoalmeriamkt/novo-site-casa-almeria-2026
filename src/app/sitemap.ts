import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menus", "/encomendas", "/unidades", "/sobre", "/contato"];
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
