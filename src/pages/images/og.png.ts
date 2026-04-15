import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";

export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;

// Hand-built SVG matches the live site palette (dark bg, electric cyan
// accent) and reuses the CR monogram from the navbar. Resvg loads system
// fonts at build time; the generic font-family fallbacks here resolve to
// reasonable sans-serif choices on Vercel's Linux build environment.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f14" />
      <stop offset="100%" stop-color="#11181f" />
    </linearGradient>
    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#67d4e8" stop-opacity="0.28" />
      <stop offset="100%" stop-color="#67d4e8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3aa8c4" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#3aa8c4" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <!-- Aurora glows -->
  <ellipse cx="900" cy="120" rx="520" ry="320" fill="url(#glow1)" />
  <ellipse cx="180" cy="540" rx="420" ry="260" fill="url(#glow2)" />

  <!-- Faint grid texture -->
  <g stroke="#67d4e8" stroke-opacity="0.05" stroke-width="1">
    <line x1="0" y1="157" x2="${WIDTH}" y2="157" />
    <line x1="0" y1="315" x2="${WIDTH}" y2="315" />
    <line x1="0" y1="473" x2="${WIDTH}" y2="473" />
    <line x1="300" y1="0" x2="300" y2="${HEIGHT}" />
    <line x1="600" y1="0" x2="600" y2="${HEIGHT}" />
    <line x1="900" y1="0" x2="900" y2="${HEIGHT}" />
  </g>

  <!-- CR monogram (top-left) -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="86" height="86" rx="16" fill="rgba(103, 212, 232, 0.08)" stroke="#67d4e8" stroke-width="2.5" />
    <text x="43" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="36" font-weight="800" text-anchor="middle" fill="#67d4e8" letter-spacing="1">CR</text>
  </g>

  <!-- Eyebrow label -->
  <text x="80" y="320" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="22" font-weight="600" fill="#67d4e8" letter-spacing="4" text-transform="uppercase">FULL-STACK ENGINEER · CLOUD ARCHITECT</text>

  <!-- Name -->
  <text x="80" y="408" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="86" font-weight="800" fill="#ffffff" letter-spacing="-1.5">Cole Robinson</text>

  <!-- Tagline line 1 -->
  <text x="80" y="478" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="32" font-weight="400" fill="#cbd5e0">I build web apps, automate the boring parts,</text>

  <!-- Tagline line 2 -->
  <text x="80" y="520" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="32" font-weight="400" fill="#cbd5e0">and deploy them on AWS.</text>

  <!-- Footer URL -->
  <g transform="translate(80, 565)">
    <circle cx="6" cy="0" r="6" fill="#67d4e8" />
    <text x="22" y="6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="22" font-weight="600" fill="#67d4e8">robinsongaming.com</text>
  </g>

  <!-- Bottom-right tag chips -->
  <g transform="translate(820, 540)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif" font-size="18" font-weight="600">
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="80" height="32" rx="16" fill="rgba(103, 212, 232, 0.12)" stroke="rgba(103, 212, 232, 0.35)" stroke-width="1" />
      <text x="40" y="22" text-anchor="middle" fill="#67d4e8">TS</text>
    </g>
    <g transform="translate(92, 0)">
      <rect x="0" y="0" width="100" height="32" rx="16" fill="rgba(103, 212, 232, 0.12)" stroke="rgba(103, 212, 232, 0.35)" stroke-width="1" />
      <text x="50" y="22" text-anchor="middle" fill="#67d4e8">Next.js</text>
    </g>
    <g transform="translate(204, 0)">
      <rect x="0" y="0" width="80" height="32" rx="16" fill="rgba(103, 212, 232, 0.12)" stroke="rgba(103, 212, 232, 0.35)" stroke-width="1" />
      <text x="40" y="22" text-anchor="middle" fill="#67d4e8">AWS</text>
    </g>
  </g>
</svg>
`;

export const GET: APIRoute = () => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: "Arial",
    },
    background: "rgba(10, 15, 20, 1)",
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
