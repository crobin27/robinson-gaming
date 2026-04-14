export interface TechItem {
  name: string;
  icon: string;
}

const devicon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`;

export const techRowSoftware: TechItem[] = [
  { name: "React", icon: devicon("react/react-original") },
  { name: "TypeScript", icon: devicon("typescript/typescript-original") },
  { name: "Astro", icon: devicon("astro/astro-original") },
  { name: "Node.js", icon: devicon("nodejs/nodejs-original") },
  { name: "Python", icon: devicon("python/python-original") },
  { name: "Tailwind CSS", icon: devicon("tailwindcss/tailwindcss-original") },
  { name: "JavaScript", icon: devicon("javascript/javascript-original") },
  { name: "HTML5", icon: devicon("html5/html5-original") },
  { name: "CSS3", icon: devicon("css3/css3-original") },
  { name: "Vite", icon: devicon("vitejs/vitejs-original") },
];

export const techRowInfra: TechItem[] = [
  {
    name: "AWS",
    icon: devicon("amazonwebservices/amazonwebservices-original-wordmark"),
  },
  { name: "Docker", icon: devicon("docker/docker-original") },
  { name: "Terraform", icon: devicon("terraform/terraform-original") },
  { name: "Linux", icon: devicon("linux/linux-original") },
  { name: "Git", icon: devicon("git/git-original") },
  { name: "GitHub", icon: devicon("github/github-original") },
  { name: "Bash", icon: devicon("bash/bash-original") },
  { name: "Nginx", icon: devicon("nginx/nginx-original") },
  { name: "Raspberry Pi", icon: devicon("raspberrypi/raspberrypi-original") },
  { name: "Vercel", icon: devicon("vercel/vercel-original") },
];
