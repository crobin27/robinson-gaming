import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  publicDir: "./public", // default is 'public'
  integrations: [
    react(),
    sitemap({
      // Specify the site's base URL. Necessary for generating the correct links in the sitemap
      site: "https://www.robinsongaming.com",
    }),
  ],

  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
