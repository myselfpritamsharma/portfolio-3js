// ─── PROFILE DATA ────────────────────────────────────────────────────────────
export const profile = {
  name: "Pritam Sharma",
  firstName: "Pritam",
  lastName: "Sharma",
  title: "AI-Centric Full Stack Engineer · Developer II",
  roles: [
    "Developer II @ Hyland",
    "AI-Centric Full Stack Engineer",
    "Custom AI Agent Builder",
    "Multi-LLM Orchestration Engineer",
    "Angular + React + .NET + Node.js",
  ],
  openToWork: false,
  location: "Greater Kolkata Area, India",
  email: "myself.pritam.sharma@gmail.com",
  phone: "+91 XXXXX XXXXX",
  linkedin: "https://www.linkedin.com/in/pritam-sharma-483242199",
  github: "https://github.com/myselfpritamsharma",
  githubAlt: "https://github.com/pritamleo841",
  website: "pritamsharma.dev",

  summary:
    "AI-centric full stack engineer with 5 years across enterprise products. I design custom AI agents and multi-LLM workflows that combine Jira context, product documentation, secure code analysis, and source intelligence to produce minimal, production-ready fixes faster. Core stack: Angular, React, .NET Core, Node.js, Azure, SQL/NoSQL. Currently Developer II at Hyland building OnBase. Gold Medalist x2 and hackathon winner.",

  stats: [
    { label: "Years Exp.", value: "5+" },
    { label: "Companies", value: "3" },
    { label: "Tech Stacks", value: "10+" },
    { label: "Awards", value: "4" },
  ],

  skills: [
    {
      category: "Frontend",
      level: 95,
      color: "#00d4ff",
      items: ["Angular", "React", "TypeScript", "JavaScript", "RxJS", "Redux", "HTML5", "CSS3/SCSS", "Bootstrap", "Angular Material"],
    },
    {
      category: "Backend",
      level: 88,
      color: "#bd34fe",
      items: [".NET Core Web API", "Node.js", "Express.js", "Azure Functions", "REST APIs", "JWT Auth"],
    },
    {
      category: "AI & LLM Engineering",
      level: 86,
      color: "#f0c78b",
      items: [
        "Custom AI Agents",
        "Multi-LLM Orchestration",
        "Prompt Engineering",
        "RAG-style Context Fusion",
        "Copilot-assisted Resolution Flows",
        "Checkmarx API Signal Integration",
      ],
    },
    {
      category: "Database",
      level: 82,
      color: "#ff6b6b",
      items: ["SQL Server", "Oracle", "PL/SQL", "MongoDB", "DDL/DML"],
    },
    {
      category: "Cloud & DevOps",
      level: 78,
      color: "#00ff88",
      items: ["Microsoft Azure", "Azure AD", "Azure Function Apps", "Bitbucket", "Git", "TFS", "Kanban/Agile"],
    },
    {
      category: "Mobile & Other",
      level: 74,
      color: "#ffd700",
      items: ["Apache Cordova", "Hybrid Apps", "Node-RED", "Serverless Architecture", "Code Review", "Release Management"],
    },
  ],

  experience: [
    {
      role: "Developer II",
      company: "Hyland",
      period: "May 2025 – Present",
      location: "Kolkata, India",
      type: "Full-time",
      points: [
        "Contributing to Hyland's flagship OnBase product using the latest Angular and .NET frameworks",
        "Winner of Hyland Hackathon 2025 — 'Most Likely to be Adopted' category for an AI-powered solution",
        "Built AI agents to accelerate issue resolution by connecting Jira tickets, product documentation, and TFS code context—enabling faster and safer vulnerability fixes",
        "Engineered a security resolution agent that combines Checkmarx API findings (selected severities), codebase analysis, product docs, Jira card context, and Copilot-assisted reasoning to propose minimal working code changes and dependency updates",
        "End-to-end product development: feature implementation, code review, and release management via Bitbucket, Git, and TFS",
        "Kanban-style agile development ensuring smooth collaboration across design, development, and QA teams",
        "Actively participated in regression testing and pre-release validation for stable annual releases",
      ],
    },
    {
      role: "Software Engineer",
      company: "PwC India",
      period: "March 2023 – May 2025",
      location: "Kolkata, West Bengal, India",
      type: "Full-time",
      points: [
        "Developed high-end enterprise solutions using .NET Core Web API and Node.js",
        "Advanced Angular development with Redux and RxJS for complex state management",
        "Built responsive front-end solutions using Angular Material and Bootstrap for all devices",
        "Applied React and React Hooks for additional front-end workstreams",
        "Managed and delivered solutions across multiple concurrent projects in an asynchronous environment",
      ],
    },
    {
      role: "Senior Associate Developer",
      company: "Blu Cocoon Digital Pvt. Ltd.",
      period: "December 2020 – February 2023",
      location: "Kolkata, West Bengal, India",
      type: "Full-time",
      points: [
        "Designed and built complex HTTP APIs using Node.js and Express.js for runtime browser-server communication",
        "Implemented serverless backend architecture using Azure Function Apps in Node.js",
        "Added JWT-based authentication and Azure Active Directory integration for secure applications",
        "Developed multiple responsive SPAs that grew application popularity over competitors",
        "Built cross-platform hybrid apps (Android/iOS) using Angular and Cordova plugins",
        "Migrated Node-RED applications to pure Node.js, eliminating third-party dependencies",
        "Managed a small development team through agile ceremonies end-to-end",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Jadavpur University, Kolkata",
      period: "2017 – 2020",
      grade: "Gold Medalist",
      highlights: ["Gold Medalist ×2", "Computer Science specialisation", "Prestigious public research university"],
    },
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "University of Burdwan",
      period: "2014 – 2017",
      grade: "",
      highlights: ["Computer Science foundation", "Strong academic base for MCA"],
    },
  ],

  projects: [
    // ── Featured (ranked by value) ─────────────────────────────────────────
    {
      id: 1,
      name: "AI-Powered Hackathon Solution",
      tagline: "Hyland Hackathon 2025 Winner — Most Likely to be Adopted",
      description:
        "AI-powered internal tooling solution that won the 'Most Likely to be Adopted' category at the Hyland Hackathon 2025, automating a key workflow in the OnBase ecosystem.",
      tech: ["Angular", ".NET Core", "Azure", "AI/ML"],
      github: "#",
      live: "#",
      featured: true,
      color: "#bd34fe",
    },
    {
      id: 2,
      name: "Wordle Multiverse",
      tagline: "Cross-platform multilingual word game — EN / Bengali / Hindi",
      description:
        "Full-product word game built for Web and Android from a single TypeScript codebase. Includes coin economy, Google/Facebook auth, PostgreSQL schema, monetization model, GitHub Actions CI, Playwright E2E tests, and a zero-budget launch plan.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "React Native", "GitHub Actions"],
      github: "https://github.com/myselfpritamsharma/wordle-multiverse",
      live: "#",
      featured: true,
      color: "#a8d7ff",
    },
    {
      id: 3,
      name: "Neural Portfolio",
      tagline: "This portfolio — Interstellar-themed 3D experience",
      description:
        "Interactive 3D neural network portfolio with particle physics, Interstellar-themed cosmos, rocket cursor, and multi-format resume generator supporting 7 country CV styles.",
      tech: ["Three.js", "React", "TypeScript", "Vite"],
      github: "https://github.com/myselfpritamsharma/portfolio-3js",
      live: "#",
      featured: true,
      color: "#00d4ff",
    },
    {
      id: 4,
      name: "Exam Analyzer Pro",
      tagline: "AI-powered exam prep with multi-LLM support",
      description:
        "Analyzes previous year exam papers and current affairs PDFs using OpenAI, Gemini, or Ollama (local). Predicts high-probability topics, generates MCQs, and deploys a full searchable study portal to GitHub Pages automatically.",
      tech: ["Python", "Streamlit", "OpenAI", "Gemini", "Ollama", "OCR"],
      github: "https://github.com/pritamleo841/exam-analyzer",
      live: "#",
      featured: true,
      color: "#f7cc99",
    },
    // ── More Projects (ranked by value) ───────────────────────────────────
    {
      id: 6,
      name: "AI Summarizer Anywhere",
      tagline: "Browser extension — highlight any text, summarize with AI",
      description:
        "Chrome extension that lets users highlight any text on any webpage and instantly summarize it. Supports OpenAI, Hugging Face (free tier), and Ollama (local) as interchangeable AI providers.",
      tech: ["JavaScript", "Chrome Extension API", "OpenAI", "Hugging Face", "Ollama"],
      github: "https://github.com/pritamleo841/ai-summarizer",
      live: "#",
      featured: false,
      color: "#00ff88",
    },
    {
      id: 7,
      name: "Hybrid Mobile Platform",
      tagline: "Cross-platform iOS & Android apps",
      description:
        "Device-agnostic hybrid mobile applications published to both Google Play Store and Apple App Store using Angular and Cordova plugins.",
      tech: ["Angular", "Apache Cordova", "TypeScript", "REST APIs"],
      github: "#",
      live: "#",
      featured: false,
      color: "#ffd700",
    },
    {
      id: 8,
      name: "Serverless API Platform",
      tagline: "Azure Functions microservices backend",
      description:
        "Scalable serverless backend built on Azure Function Apps with JWT authentication, Azure AD integration, and minimal infrastructure overhead.",
      tech: ["Node.js", "Azure Functions", "JWT", "Azure AD"],
      github: "#",
      live: "#",
      featured: false,
      color: "#00d4ff",
    },
    {
      id: 9,
      name: "Secret Rooms",
      tagline: "Private real-time chat rooms for developers",
      description:
        "Real-time developer chat platform with private room creation using Node.js and WebSocket-based messaging. Designed for teams to discuss plans and upcoming events securely.",
      tech: ["Node.js", "JavaScript", "WebSockets", "HTML", "CSS"],
      github: "https://github.com/pritamleo841/secret-rooms",
      live: "#",
      featured: false,
      color: "#bd34fe",
    },
    {
      id: 10,
      name: "AtYourDoor",
      tagline: "AI-powered personalised food subscription PWA",
      description:
        "Progressive Web App for an AI-driven meal subscription service that adapts to user taste profiles and nutritional goals. Built as a responsive landing product with service worker support.",
      tech: ["HTML", "CSS", "JavaScript", "PWA", "Manifest"],
      github: "https://github.com/pritamleo841/AtYourDoorApp",
      live: "#",
      featured: false,
      color: "#ff6b6b",
    },
  ],

  certifications: [
    "Microsoft Certified: Azure Fundamentals",
    "JavaScript – Intermediate (HackerRank)",
    "Problem Solving – Basic (HackerRank)",
    "C# and .NET Essential Training",
    "CSS Certification",
  ],

  awards: [
    "Gold Medalist ×2 — Jadavpur University",
    "Hyland Hackathon 2025 Winner — Most Likely to be Adopted",
    "Spotlight Award — Blu Cocoon Digital",
    "Client Appreciation Award",
    "Spot Award",
  ],

  languages: [
    "Bengali (Native or Bilingual)",
    "Hindi (Professional Working)",
    "English (Full Professional)",
  ],

  hobbies: ["Hackathons", "AI Research", "Open Source", "Problem Solving", "Engineering for Fun"],
};

export type Profile = typeof profile;
