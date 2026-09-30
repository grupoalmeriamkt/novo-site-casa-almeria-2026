import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menus", "/encomendas", "/unidades", "/sobre", "/contato", "/termos", "/privacidade", "/cookies"];
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : ["/termos", "/privacidade", "/cookies"].includes(r) ? 0.3 : 0.7,
  }));
}
