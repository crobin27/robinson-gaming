export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  tag?: string;
}

// TODO: replace with real career milestones. Keep 5-7 entries for best pacing.
export const milestones: Milestone[] = [
  {
    id: "m1",
    year: "2019",
    title: "Started my dev journey",
    description:
      "Taught myself the fundamentals — HTML, CSS, JavaScript — and shipped my first static site to a $5 DigitalOcean droplet.",
    tag: "Foundations",
  },
  {
    id: "m2",
    year: "2020",
    title: "First AWS build",
    description:
      "Spun up my first real cloud infrastructure: EC2, S3, and a Lambda function triggered by an SNS topic. Broke it. Fixed it. Never looked back.",
    tag: "Cloud",
  },
  {
    id: "m3",
    year: "2021",
    title: "Earned AWS Solutions Architect",
    description:
      "Passed the Solutions Architect Associate certification and started designing VPCs, IAM policies, and multi-account setups for real workloads.",
    tag: "Certified",
  },
  {
    id: "m4",
    year: "2022",
    title: "First full-stack product shipped",
    description:
      "Built and launched a full-stack web app with React, Node.js, and Postgres — wired up CI/CD, monitoring, and everything in between.",
    tag: "Product",
  },
  {
    id: "m5",
    year: "2023",
    title: "Infrastructure as Code",
    description:
      "Went all-in on Terraform and CloudFormation. Rebuilt production environments from click-ops to fully reproducible IaC modules.",
    tag: "DevOps",
  },
  {
    id: "m6",
    year: "2024",
    title: "IoT side projects",
    description:
      "Started tinkering with Raspberry Pi, MQTT, and embedded C — home automation, sensor dashboards, and a few things that probably shouldn't be plugged in.",
    tag: "Hardware",
  },
  {
    id: "m7",
    year: "Now",
    title: "Building what's next",
    description:
      "Designing cloud systems by day, shipping side projects by night, and behind a camera whenever I can get outside.",
    tag: "Currently",
  },
];
