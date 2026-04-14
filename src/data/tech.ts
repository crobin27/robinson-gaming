export interface TechItem {
  name: string;
  /** Full icon URL or null to render a "missing" placeholder. */
  src: string | null;
}

const iconify = (set: string, slug: string) =>
  `https://api.iconify.design/${set}:${slug}.svg`;

const logos = (slug: string) => iconify("logos", slug);
const si = (slug: string) => iconify("simple-icons", slug);

// Row 1 — 26 icons, mixed across languages, frameworks, AWS, tooling.
export const techRow1: TechItem[] = [
  { name: "TypeScript", src: logos("typescript") },
  { name: "Python", src: logos("python") },
  { name: "C", src: logos("c") },
  { name: "Node.js", src: logos("nodejs-icon") },
  { name: "pnpm", src: logos("pnpm") },
  { name: "ESLint", src: logos("eslint") },
  { name: "Next.js", src: logos("nextjs-icon") },
  { name: "Tailwind CSS", src: logos("tailwindcss") },
  { name: "Nest.js", src: logos("nestjs") },
  { name: "FastAPI", src: logos("fastapi") },
  { name: "Swagger", src: logos("swagger") },
  { name: "Prisma", src: logos("prisma") },
  { name: "Supabase", src: logos("supabase") },
  { name: "Postgres", src: logos("postgresql") },
  { name: "Jest", src: logos("jest") },
  { name: "Playwright", src: logos("playwright") },
  { name: "OpenAI", src: logos("openai-icon") },
  { name: "EC2", src: logos("aws-ec2") },
  { name: "Lambda", src: logos("aws-lambda") },
  { name: "RDS", src: logos("aws-rds") },
  { name: "CloudWatch", src: logos("aws-cloudwatch") },
  { name: "Terraform", src: logos("terraform-icon") },
  { name: "ESP32", src: null },
  { name: "FPGA", src: null },
  { name: "VS Code", src: logos("visual-studio-code") },
  { name: "GitHub", src: logos("github-icon") },
];

// Row 2 — 26 icons, mixed the same way.
export const techRow2: TechItem[] = [
  { name: "JavaScript", src: logos("javascript") },
  { name: "Go", src: logos("go") },
  { name: "C++", src: logos("c-plusplus") },
  { name: "Bash", src: logos("bash-icon") },
  { name: "Vite", src: logos("vitejs") },
  { name: "React", src: logos("react") },
  { name: "Astro", src: logos("astro") },
  { name: "shadcn/ui", src: si("shadcnui") },
  { name: "Express", src: logos("express") },
  { name: "Flask", src: logos("flask") },
  { name: "Postman", src: logos("postman") },
  { name: "Zod", src: logos("zod") },
  { name: "Firebase", src: logos("firebase") },
  { name: "Clerk", src: si("clerk") },
  { name: "pytest", src: si("pytest") },
  { name: "Claude", src: logos("claude") },
  { name: "AWS", src: logos("aws") },
  { name: "S3", src: logos("aws-s3") },
  { name: "Fargate", src: logos("aws-fargate") },
  { name: "IAM", src: logos("aws-iam") },
  { name: "Docker", src: logos("docker-icon") },
  { name: "Cloudflare", src: logos("cloudflare") },
  { name: "STM32", src: null },
  { name: "Figma", src: logos("figma") },
  { name: "Cursor", src: si("cursor") },
  { name: "Vercel", src: logos("vercel-icon") },
];

/**
 * Pseudo-random but deterministic delay (0-cycleSeconds) for a given index.
 * Used to stagger the color-pop animation so it feels random instead of uniform.
 */
export function popDelay(index: number, cycleSeconds: number): number {
  const hash = ((index + 1) * 2654435761) >>> 0;
  const fraction = (hash % 10_000) / 10_000;
  return Math.round(fraction * cycleSeconds * 100) / 100;
}
