export const bio = {
  name: "Limson",
  title: "Software Engineer",
  tagline:
    "I build reliable, interactive web experiences with React, Next.js, and TypeScript.",
  years: 7,
  tech: ["TypeScript", "Next.js", "Node.js", "Tailwind", "PostgreSQL"],
};

export type Skill = {
  name: string;
  icon?: string; // key for inline icon renderer
  category: "Frontend" | "Backend" | "Tools";
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description?: string;
};

export const skills: Skill[] = [
  { name: "TypeScript", icon: "ts", category: "Frontend", level: "Expert", description: "Typed JS for robust apps" },
  { name: "React", icon: "react", category: "Frontend", level: "Expert", description: "Modern UI with hooks" },
  { name: "Next.js", icon: "next", category: "Frontend", level: "Advanced", description: "App Router, SSR/SSG" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend", level: "Advanced", description: "Utility-first styling" },
  { name: "GSAP", icon: "gsap", category: "Frontend", level: "Advanced", description: "Timelines and motion" },
  { name: "Framer Motion", icon: "framer", category: "Frontend", level: "Advanced", description: "React animation library" },
  { name: "Node.js", icon: "node", category: "Backend", level: "Advanced", description: "APIs, workers, tooling" },
  { name: "PostgreSQL", icon: "postgres", category: "Backend", level: "Advanced", description: "Relational DB design" },
  { name: "Docker", icon: "docker", category: "Tools", level: "Advanced", description: "Dev containers & CI" },
  { name: "GitHub Actions", icon: "gh", category: "Tools", level: "Advanced", description: "CI/CD automation" },
];

export type Project = {
  title: string;
  description: string;
  image?: string;
  github?: string;
  demo?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Realtime Dashboard",
    description:
      "Realtime analytics dashboard with WebSocket updates, charting, and role-based access.",
    image: "/next.svg",
    github: "https://github.com/yourname/realtime-dashboard",
    demo: "https://example.com/realtime",
    tags: ["Next.js", "WebSockets", "Tailwind"],
  },
  {
    title: "3D Product Gallery",
    description: "Interactive 3D cards with GSAP parallax and Framer Motion hover effects.",
    image: "/vercel.svg",
    github: "https://github.com/yourname/3d-gallery",
    demo: "https://example.com/gallery",
    tags: ["Framer Motion", "GSAP"],
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Stratpoint",
    role: "Senior Software Engineer",
    period: "November 2021 — Present",
    bullets: [
      "Built Digital Identity Wallet platform from scratch using Node.js, TypeScript, and NestJS with AWS services (DynamoDB, SNS, SES)",
      "Optimized Records Imaging System with multi-queue approach for document processing using NestJS Framework",
      "Developed Cadet Welfare Office Mental Wellness Booking App with SSO Google auth, Prisma ORM, and MySQL",
      "Enhanced Resource Management Tool using NodeJS and Parse Server on AWS with GitLab CI/CD",
      "Built Real-Time Payment Processing Web App for telecom client using NodeJS and GraphQL",
      "Designed serverless E-wallet Application architecture using AWS Lambda and serverless technology",
      "Implemented SocketIO for real-time features and integrated third-party identity management (ProofSpace)",
      "Created comprehensive feature specifications and maintained API documentation using Swagger"
    ],
  },
  {
    company: "PCCW Solutions",
    role: "Mid-Level Software Engineer",
    period: "April 2021 — September 2021",
    bullets: [
      "Maintained Securities and Futures Commission platform on Google Cloud Platform",
      "Developed server-side features with Node.js and client-side with React.js",
      "Implemented automation testing with MochaJS and Katalon",
      "Managed feature releases using Jenkins with comprehensive release notes"
    ],
  },
  {
    company: "Mclinica",
    role: "Associate Software Engineer",
    period: "July 2019 — March 2021",
    bullets: [
      "Built complex multi-tenant Pharmaceutical Rebate System with microservices",
      "Worked with Google Cloud Platform, Kubernetes, Docker, and MySQL",
      "Developed multiple admin dashboards using React.js",
      "Created CLI automation tools and handled releases via Azure DevOps"
    ],
  },
  {
    company: "ITMG",
    role: "Junior Full Stack Developer",
    period: "April 2018 — June 2019",
    bullets: [
      "Migrated PHP legacy HRMS codebase to Node.js for improved performance",
      "Developed React.js applications and implemented Laravel framework",
      "Created CI/CD pipeline using Bitbucket and maintained API documentation",
      "Led technical discussions between clients and management"
    ],
  },
  {
    company: "Portal Integrators",
    role: "Junior Web Developer",
    period: "January 2018 — April 2018",
    bullets: [
      "Developed e-commerce website features and maintained responsiveness",
      "Implemented Firebase as primary data storage solution",
      "Created API documentation and managed production/development environments",
      "Updated themes and developed custom plugins"
    ],
  },
];

