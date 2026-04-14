export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export const milestones: Milestone[] = [
  {
    id: "m01-ds",
    year: "2007",
    title: "A Nintendo DS and a whole new world",
    description:
      "Got my first Nintendo DS and fell straight down the digital rabbit hole. A Wii and Xbox 360 followed shortly after — the first seeds of a lifelong fascination with what software could do.",
    tag: "Digital roots",
  },
  {
    id: "m02-math",
    year: "2015",
    title: "Math clicked, and the trajectory was set",
    description:
      "Math stopped feeling like work — equations started reading more like patterns than problems. That one realization shaped everything that followed: engineering, computers, and eventually writing code for a living.",
    tag: "Foundations",
  },
  {
    id: "m03-slo",
    year: "2019",
    title: "Off to Cal Poly SLO for engineering",
    description:
      "Graduated high school and headed north to Cal Poly San Luis Obispo on an engineering track — ready to trade beach afternoons for long nights in the engineering building.",
    tag: "University",
  },
  {
    id: "m04-python",
    year: "2020",
    title: "Python 101 changed the major",
    description:
      "Took my first Python course — also my first fully-remote COVID-era class — and something just clicked. By the end of the quarter I'd switched my major to Computer Engineering and never looked back.",
    tag: "The switch",
  },
  {
    id: "m05-mw",
    year: "Summer 2022",
    title: "DevOps intern at MobilityWare",
    description:
      "Interned on the DevOps team at MobilityWare in Irvine — the mobile studio behind a huge chunk of the solitaire and card games on the App Store. First real exposure to AWS at production scale: security groups, IAM, subnetting, EC2, and what 'prod' actually feels like.",
    tag: "First internship",
  },
  {
    id: "m06-grad",
    year: "2023",
    title: "BS Computer Engineering, *cum laude*",
    description:
      "Graduated Cal Poly SLO cum laude with a Computer Engineering degree — a hands-on blend of software engineering, embedded systems, computer architecture, and network engineering. Most of it taught through long in-person labs and real-world projects whose lessons I still lean on today.",
    tag: "Graduated",
  },
  {
    id: "m07-firstship",
    year: "Summer 2023",
    title: "First mobile game shipped to the stores",
    description:
      "Built, deployed, and published a mobile game on iOS and Google Play with Firebase as the backend — my first real end-to-end taste of running cloud infrastructure. Also dabbled in monetization, wiring up IronSource ads and learning how live services actually make money.",
    tag: "First launch",
  },
  {
    id: "m08-ccp",
    year: "2024",
    title: "Earned AWS Cloud Practitioner",
    description:
      "Passed the AWS Cloud Practitioner exam — the point where my casual interest in cloud infra turned into a real study habit. Currently working through the Solutions Architect Associate next.",
    tag: "Certified",
  },
  {
    id: "m09-firstjob",
    year: "Feb 2025",
    title: "First career role as IT & Business Analyst",
    description:
      "Joined a Southern California general contractor as IT & Business Analyst. Focused on growing revenue, automating internal workflows, and turning scattered business data into decisions people could actually act on.",
    tag: "Career start",
  },
  {
    id: "m10-firstdeploy",
    year: "Jul 2025",
    title: "Shipped the first internal web app",
    description:
      "Designed, built, and deployed the company's first internal web app — fully on AWS, OAuth-secured, Postgres-backed. Used daily by employees and executives to visualize project management, operational, and financial data.",
    tag: "First production deploy",
  },
  {
    id: "m11-manager",
    year: "Aug 2025",
    title: "Promoted to IT Manager",
    description:
      "Stepped into an IT Manager role leading a small team and the automation stack that keeps the business moving. Current focus: expanding from internal-only tools toward client-facing products that handle real concurrency and bigger stakes.",
    tag: "Promoted",
  },
  {
    id: "m12-present",
    year: "Present",
    title: "Still shipping, now with AI in the loop",
    description:
      "Happily planted in the construction tech space, layering modern AI APIs on top of the full-stack work to turn raw project and company data into the kind of analysis people actually make decisions on. Always staying one step ahead of the tech.",
    tag: "Currently",
  },
];
