export interface TechItem {
  name: string;
  /** Full icon URL or null to render a "missing" placeholder. */
  src: string | null;
  /** Alternate icon URL used in dark mode (skill-icons themed variant). */
  srcDark?: string;
  /** Visual scale multiplier for icons that render too small in their viewBox. */
  sizeBoost?: number;
  /** Apply a white tint filter in dark mode for black/dark logos. */
  tintDark?: boolean;
}

const iconify = (set: string, slug: string) =>
  `https://api.iconify.design/${set}:${slug}.svg`;

const logos = (slug: string) => iconify("logos", slug);
const si = (slug: string) => iconify("simple-icons", slug);

// Row 1 — mixed across languages, frameworks, AWS, tooling,
// the Microsoft stack I run at work, and the hardware I tinker with.
export const techRow1: TechItem[] = [
  { name: "TypeScript", src: logos("typescript"), sizeBoost: 1.2 },
  { name: "Python", src: logos("python") },
  { name: "C", src: logos("c") },
  { name: "Node.js", src: logos("nodejs-icon") },
  { name: "pnpm", src: logos("pnpm") },
  { name: "ESLint", src: logos("eslint") },
  { name: "Next.js", src: logos("nextjs-icon"), tintDark: true },
  {
    name: "Tailwind CSS",
    src: iconify("skill-icons", "tailwindcss-light"),
    srcDark: iconify("skill-icons", "tailwindcss-dark"),
  },
  { name: "Nest.js", src: logos("nestjs") },
  { name: "FastAPI", src: logos("fastapi") },
  {
    name: "Prisma",
    src: si("prisma") + "?color=%232D3748",
    srcDark: si("prisma") + "?color=%23ffffff",
  },
  {
    name: "Supabase",
    src: iconify("skill-icons", "supabase-light"),
    srcDark: iconify("skill-icons", "supabase-dark"),
  },
  { name: "Postgres", src: logos("postgresql") },
  { name: "SQL Server", src: si("microsoftsqlserver") },
  {
    name: "Linux",
    src: iconify("skill-icons", "linux-light"),
    srcDark: iconify("skill-icons", "linux-dark"),
  },
  { name: "Jest", src: logos("jest") },
  { name: "Playwright", src: logos("playwright") },
  { name: "OpenAI", src: logos("openai-icon"), tintDark: true },
  { name: "Google Maps", src: logos("google-maps") },
  { name: "EC2", src: logos("aws-ec2") },
  { name: "Lambda", src: logos("aws-lambda") },
  { name: "RDS", src: logos("aws-rds") },
  { name: "CloudWatch", src: logos("aws-cloudwatch") },
  { name: "Terraform", src: logos("terraform-icon") },
  { name: "Azure", src: logos("microsoft-azure") },
  { name: "ESP32", src: null },
  { name: "FPGA", src: null },
  { name: "VS Code", src: logos("visual-studio-code") },
  {
    name: "GitHub",
    src: iconify("skill-icons", "github-light"),
    srcDark: iconify("skill-icons", "github-dark"),
  },
  { name: "Swagger", src: logos("swagger") },
];

// Row 2.
export const techRow2: TechItem[] = [
  { name: "JavaScript", src: logos("javascript") },
  { name: "Go", src: logos("go") },
  { name: "C++", src: logos("c-plusplus") },
  { name: "Bash", src: logos("bash-icon") },
  { name: "Vite", src: logos("vitejs") },
  { name: "React", src: logos("react") },
  { name: "Astro", src: iconify("skill-icons", "astro"), sizeBoost: 1.25 },
  { name: "shadcn/ui", src: si("shadcnui"), tintDark: true },
  {
    name: "Express",
    src: iconify("skill-icons", "expressjs-light"),
    srcDark: iconify("skill-icons", "expressjs-dark"),
  },
  {
    name: "Flask",
    src: iconify("skill-icons", "flask-light"),
    srcDark: iconify("skill-icons", "flask-dark"),
  },
  { name: "Postman", src: logos("postman"), sizeBoost: 1.3 },
  { name: "Zod", src: logos("zod") },
  { name: "Firebase", src: logos("firebase"), sizeBoost: 1.3 },
  {
    name: "Clerk",
    src: si("clerk") + "?color=%236C47FF",
    srcDark: si("clerk") + "?color=%23ffffff",
  },
  {
    name: "pytest",
    src: si("pytest") + "?color=%23009fe3",
    srcDark: si("pytest") + "?color=%23ffffff",
  },
  {
    name: "Claude",
    src: logos("claude"),
    srcDark: si("claude") + "?color=%23D4A574",
    sizeBoost: 1.5,
  },
  { name: "Microsoft Graph", src: null },
  {
    name: "Excel",
    src: si("microsoftexcel") + "?color=%23217346",
    srcDark: si("microsoftexcel") + "?color=%2321a366",
  },
  { name: "Windows", src: logos("microsoft-windows-icon") },
  { name: "AWS", src: logos("aws") },
  { name: "S3", src: logos("aws-s3") },
  { name: "Fargate", src: logos("aws-fargate") },
  { name: "IAM", src: logos("aws-iam") },
  { name: "Docker", src: logos("docker-icon") },
  {
    name: "Cloudflare",
    src: iconify("skill-icons", "cloudflare-light"),
    srcDark: iconify("skill-icons", "cloudflare-dark"),
    sizeBoost: 1.3,
  },
  { name: "STM32", src: null },
  { name: "Figma", src: logos("figma") },
  {
    name: "Cursor",
    src: si("cursor") + "?color=%23000000",
    srcDark: si("cursor") + "?color=%23ffffff",
  },
  {
    name: "Vercel",
    src: iconify("skill-icons", "vercel-light"),
    srcDark: iconify("skill-icons", "vercel-dark"),
  },
];
