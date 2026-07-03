import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// Zero-config: no `site`/`base` needed for a `<user>.github.io` repo,
// since it's served from the domain root. If you fork this into a
// *project* page (`github.io/<repo>`), set `base: "/<repo>/"` below.
export default defineConfig({
  integrations: [preact()],
});
