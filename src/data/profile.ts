// ─── PROFILE DATA ────────────────────────────────────────────────────────────
export const profile = {
  name: "Pritam Sharma",
  firstName: "Pritam",
  lastName: "Sharma",
  title: "Developer II · Full Stack Engineer",
  roles: [
    "Developer II @ Hyland",
    "Full Stack Engineer",
    "Angular & React Specialist",
    ".NET & Node.js Developer",
    "Azure Cloud Practitioner",
  ],
  location: "Greater Kolkata Area, India",
  email: "myself.pritam.sharma@gmail.com",
  phone: "+91 XXXXX XXXXX",
  linkedin: "https://www.linkedin.com/in/pritam-sharma-483242199",
  github: "https://github.com/pritamsharma",
  website: "pritamsharma.dev",

  summary:
    "Developer II at Hyland with 5+ years of full-stack experience crafting high-quality software across Angular, React, .NET Core, and Node.js. I deliver robust, scalable applications that blend precise functionality with polished user experience. Hackathon winner, Azure-certified, and passionate about engineering for innovation — currently targeting senior roles in product-based companies.",

  stats: [
    { label: "Years Exp.", value: "5+" },
    { label: "Companies", value: "4" },
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
    {
      role: "Software Developer (Trainee)",
      company: "Alumnus Software Limited",
      period: "January 2020 – June 2020",
      location: "Salt Lake City Metropolitan Area",
      type: "Internship",
      points: [
        "Trainee role in full-stack software development, gaining hands-on industry experience",
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
    {
      id: 1,
      name: "Neural Portfolio",
      tagline: "This portfolio — Interstellar-themed 3D experience",
      description:
        "Interactive 3D neural network portfolio with particle physics, Interstellar-themed cosmos, rocket cursor, and multi-format resume generator supporting 7 country CV styles.",
      tech: ["Three.js", "React", "TypeScript", "Vite"],
      github: "https://github.com/pritamsharma/neural-portfolio",
      live: "#",
      featured: true,
      color: "#00d4ff",
    },
    {
      id: 2,
      name: "AI-Powered Hackathon Solution",
      tagline: "Hyland Hackathon 2025 Winner",
      description:
        "AI-powered internal tooling solution that won the 'Most Likely to be Adopted' category at the Hyland Hackathon 2025, automating a key workflow in the OnBase ecosystem.",
      tech: ["Angular", ".NET Core", "Azure", "AI/ML"],
      github: "#",
      live: "#",
      featured: true,
      color: "#bd34fe",
    },
    {
      id: 3,
      name: "Enterprise SPA Suite",
      tagline: "Multi-platform responsive SPAs",
      description:
        "Suite of enterprise single-page applications with responsive UI designs for all screen sizes, resulting in significant market adoption growth over competitor products.",
      tech: ["Angular", "Node.js", "MongoDB", "Azure Functions"],
      github: "#",
      live: "#",
      featured: true,
      color: "#ff6b6b",
    },
    {
      id: 4,
      name: "Hybrid Mobile Platform",
      tagline: "Cross-platform iOS & Android apps",
      description:
        "Device-agnostic hybrid mobile applications published to both Google Play Store and Apple App Store using Angular and Cordova plugins.",
      tech: ["Angular", "Apache Cordova", "TypeScript", "REST APIs"],
      github: "#",
      live: "#",
      featured: false,
      color: "#00ff88",
    },
    {
      id: 5,
      name: "Serverless API Platform",
      tagline: "Azure Functions microservices backend",
      description:
        "Scalable serverless backend built on Azure Function Apps with JWT authentication, Azure AD integration, and minimal infrastructure overhead.",
      tech: ["Node.js", "Azure Functions", "JWT", "Azure AD"],
      github: "#",
      live: "#",
      featured: false,
      color: "#ffd700",
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
