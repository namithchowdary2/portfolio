// ============================================================
//  data.js — All portfolio content for Namith Chowdary
//  Edit this file to update any content across the site
// ============================================================

const PORTFOLIO_DATA = {

  // ── PERSONAL INFO ─────────────────────────────────────────
  personal: {
    name: "Yedlapalli Devi Namith Chowdary",
    shortName: "Namith Chowdary",
    title: "Full Stack Developer",
    taglines: [
      "Building real software with clean code.",
      "Turning ideas into interactive experiences.",
      "Python • Java • Web • ML",
      "B.Tech CSE @ Lovely Professional University"
    ],
    email: "namithchowdary143@gmail.com",
    phone: "+91-6304475233",
    location: "Phagwara, Punjab, India",
    linkedin: "https://linkedin.com/in/yedlapallidevinamithchowdary",
    github: "https://github.com/namithchowdary2",
    leetcode: "https://leetcode.com/u/GKElTSRAI9/",
    resume: "assets/resume.pdf",
    profilePhoto: "assets/images/profile.png",
    summary: "A passionate Computer Science undergrad at LPU with hands-on experience in full-stack web development and machine learning. I build real, production-level applications — from interactive learning platforms to ML-powered smart systems. Currently deepening my expertise in Java, Python, and database-driven architectures."
  },

  // ── ABOUT ─────────────────────────────────────────────────
  about: {
    story: [
      "I grew up in Vijayawada, Andhra Pradesh — a city that runs on ambition. I was the kid who scored 99% in matriculation and 92% in intermediate, not because I memorized books, but because I was genuinely curious about how things work.",
      "In 2023, I moved to Phagwara to pursue B.Tech in Computer Science at Lovely Professional University. That's where things got real. I stopped just studying code — I started building things. An online learning platform. An ML-based energy conservation system. Soil clustering for precision farming. Real projects, real problems.",
      "Today, I'm someone who believes the best code is code that solves something meaningful. I'm actively building my skills in Java, Python, and full-stack web development — while collecting certifications from Oracle, Infosys, and LinkedIn Learning along the way.",
      "My goal is simple: become a developer who ships impactful software and never stops learning."
    ],
    highlights: [
      { icon: "🎓", label: "University", value: "Lovely Professional University" },
      { icon: "📍", label: "From", value: "Vijayawada, Andhra Pradesh" },
      { icon: "💻", label: "Focus", value: "Full Stack + ML" },
      { icon: "🏆", label: "Hackathon", value: "Hack-a-Throne Finalist" }
    ]
  },

  // ── EDUCATION ─────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Technology — Computer Science & Engineering",
      institution: "Lovely Professional University",
      location: "Punjab, India",
      duration: "August 2023 — Present",
      cgpa: "6.56 CGPA",
      logo: "🎓"
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Chaitanya Junior College",
      location: "Vijayawada, Andhra Pradesh",
      duration: "June 2021 — April 2023",
      cgpa: "92%",
      logo: "📚"
    },
    {
      degree: "Matriculation (SSC)",
      institution: "Sri Chaitanya Techno School",
      location: "Vijayawada, Andhra Pradesh",
      duration: "June 2020 — May 2021",
      cgpa: "99%",
      logo: "🏫"
    }
  ],

  // ── SKILLS ────────────────────────────────────────────────
  skills: {
    languages: [
      { name: "Python", level: 80 },
      { name: "Java", level: 75 },
      { name: "C++", level: 70 },
      { name: "C", level: 68 }
    ],
    web: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 78 },
      { name: "Flask", level: 72 }
    ],
    tools: [
      { name: "MySQL", level: 75 },
      { name: "Git", level: 80 },
      { name: "GitHub", level: 82 },
      { name: "SQLite", level: 70 }
    ],
    ml: [
      { name: "Scikit-learn", level: 68 },
      { name: "Pandas", level: 72 },
      { name: "NumPy", level: 70 },
      { name: "Matplotlib", level: 65 }
    ],
    soft: [
      "Leadership", "Communication", "Critical Thinking",
      "Time Management", "Adaptability", "Problem Solving"
    ]
  },

  // ── PROJECTS ──────────────────────────────────────────────
  projects: [
    {
      id: 1,
      title: "Online Learning Platform",
      tagline: "Interactive Python learning with in-browser code execution",
      description: "A full-stack web application that lets students practice Python with a built-in code editor, real-time execution, quiz-based assessments, and progress tracking — all in the browser.",
      highlights: [
        "In-browser Python editor with real-time code execution",
        "User authentication: secure login and signup system",
        "Progress tracking and quiz-based assessments",
        "Flask backend with SQLite database"
      ],
      tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "SQLite"],
      github: "https://github.com/namithchowdary2/learning-platform",
      date: "January 2026",
      type: "Full Stack Web",
      color: "#00d4ff"
    },
    {
      id: 2,
      title: "ML-Based Smart Resource Conservation",
      tagline: "Predicting energy & water usage in home appliances",
      description: "A machine learning system that predicts real-time energy and water consumption for home appliances. Includes anomaly detection, usage optimization recommendations, and a visual analytics dashboard.",
      highlights: [
        "Gradient Boosting & Decision Tree regression models",
        "Real-time anomaly detection for appliance usage",
        "Optimized-usage recommendations for efficiency",
        "Bar-graph analytics dashboard with Flask + SQLite"
      ],
      tech: ["Python", "Flask", "Scikit-learn", "HTML/CSS/JS", "SQLite"],
      github: "https://github.com/namithchowdary2/Smart---Resource---Conservation---AI",
      live: "https://smart-resource-conservation.vercel.app/",
      date: "May 2025",
      type: "ML + Web",
      color: "#a855f7"
    },
    {
      id: 3,
      title: "Soil Clustering for Precision Farming",
      tagline: "Data-driven crop planning using K-Means clustering",
      description: "An ML model that analyzes soil characteristics and groups agricultural land into clusters using K-Means. Visualizes soil patterns to support smarter crop selection and fertilizer planning.",
      highlights: [
        "K-Means clustering on nutrient & environmental soil data",
        "Pattern recognition across soil composition variables",
        "Visual cluster maps for data-driven farming decisions",
        "Supports precision fertilizer planning by region"
      ],
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      github: "https://github.com/namithchowdary2/soil-clustering-precision-farming",
      date: "April 2025",
      type: "Machine Learning",
      color: "#22c55e"
    }
  ],

  // ── CERTIFICATIONS ────────────────────────────────────────
  certifications: [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle University",
      date: "October 24, 2025",
      expiry: "Valid until October 24, 2027",
      image: "assets/images/cert_oracle.png",
      credential: "102971378OCI25AICFA",
      color: "#f97316",
      badge: "🏅"
    },
    {
      title: "Introduction to Career Skills in Data Analytics",
      issuer: "LinkedIn Learning",
      date: "October 31, 2025",
      expiry: null,
      image: "assets/images/cert_linkedin.png",
      credential: "9668214c51ecb85e0529e70903022d8f18c750dcf6220223c7bed686fa77b90d",
      color: "#0a66c2",
      badge: "📊"
    },
    {
      title: "Computational Theory: Language Principle & Finite Automata Theory",
      issuer: "Infosys Springboard",
      date: "August 11, 2025",
      expiry: null,
      image: "assets/images/cert_infosys1.png",
      credential: "Infosys Springboard",
      color: "#007cc3",
      badge: "⚙️"
    },
    {
      title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
      issuer: "Infosys Springboard",
      date: "August 16, 2025",
      expiry: null,
      image: "assets/images/cert_infosys2.png",
      credential: "Infosys Springboard",
      color: "#007cc3",
      badge: "🤖"
    },
    {
      title: "Java and MySQL: Application Development",
      issuer: "LPU — Centre for Professional Enhancement",
      date: "August 13, 2025",
      expiry: null,
      image: "assets/images/cert_lpu.png",
      credential: "Certificate No. 409625",
      color: "#f97316",
      badge: "☕"
    },
    {
      title: "Responsive Web Design Developer Certification",
      issuer: "freeCodeCamp",
      date: "October 31, 2023",
      expiry: null,
      image: "assets/images/cert_freecodecamp.png",
      credential: "fcccc871c6e-3189-4bd6-9a2b-7e08ed100765",
      color: "#0a0a23",
      badge: "🌐"
    }
  ],

  // ── EXPERIENCE / TRAINING ─────────────────────────────────
  experience: [
    {
      title: "Java and MySQL: Application Development",
      company: "Lovely Professional University",
      type: "Summer Training",
      duration: "June 2025 — July 2025",
      location: "Phagwara, Punjab",
      description: "Practical training in Java-based application development and database-driven software engineering using industry-standard tools.",
      responsibilities: [
        "Applied Java fundamentals, OOP, collections framework, and exception handling",
        "Implemented multithreading and JDBC for database-integrated applications",
        "Built complete applications connecting Java frontend logic to MySQL backends",
        "Worked with Maven for project management and Git for version control"
      ],
      tech: ["Java", "OOP", "JDBC", "MySQL", "Git", "Maven", "Collections", "Exception Handling", "Multithreading"],
      outcome: "Gained strong hands-on experience building database-integrated Java applications. Achieved Grade A.",
      grade: "A",
      icon: "☕"
    }
  ],

  // ── COMPETITIVE PROGRAMMING & HACKATHONS ──────────────────
  competitive: {
    leetcode: {
      username: "GKElTSRAI9",
      url: "https://leetcode.com/u/GKElTSRAI9/",
      label: "LeetCode Profile",
      description: "Actively solving Data Structures & Algorithms problems on LeetCode to sharpen problem-solving skills and prepare for technical interviews."
    },
    achievements: [
      {
        title: "Finalist — Hack-a-Throne 1.0",
        organizer: "GeeksforGeeks",
        date: "October 2024",
        description: "Reached the final round of the competitive hackathon organized by GeeksforGeeks, competing against teams from across the country.",
        badge: "🏆",
        type: "Hackathon"
      },
      {
        title: "Google Skill Badge — Introduction to Responsible AI",
        organizer: "Google",
        date: "November 2025",
        description: "Completed Google's training on ethical AI development, bias awareness, and responsible AI practices.",
        badge: "🎖️",
        type: "Badge"
      }
    ]
  },

  // ── OPEN SOURCE (PLACEHOLDER) ─────────────────────────────
  opensource: {
    placeholder: true,
    message: "Actively exploring open source opportunities. Currently contributing to personal projects on GitHub and planning first official OSS contributions.",
    github: "https://github.com/namithchowdary2",
    stats: [
      { label: "Public Repos", value: "6+" },
      { label: "Commits", value: "50+" },
      { label: "Languages", value: "5" },
      { label: "Stars", value: "Growing" }
    ]
  },

  // ── BLOG (PLACEHOLDER) ────────────────────────────────────
  blog: {
    placeholder: true,
    posts: [
      {
        title: "How I Built a Python Learning Platform in 2 Weeks",
        excerpt: "A behind-the-scenes look at building a full-stack learning platform from scratch — the challenges, decisions, and lessons learned.",
        tag: "Full Stack",
        readTime: "5 min read",
        date: "Coming Soon",
        color: "#00d4ff"
      },
      {
        title: "K-Means Clustering for Beginners: A Farming Use Case",
        excerpt: "Breaking down my Soil Clustering project — how I used unsupervised ML to help farmers make smarter decisions.",
        tag: "Machine Learning",
        readTime: "7 min read",
        date: "Coming Soon",
        color: "#22c55e"
      },
      {
        title: "Oracle AI Foundations: What I Actually Learned",
        excerpt: "My honest review and key takeaways from the Oracle Cloud Infrastructure AI Foundations certification path.",
        tag: "AI & Cloud",
        readTime: "4 min read",
        date: "Coming Soon",
        color: "#f97316"
      }
    ]
  },

  // ── RESEARCH / PATENT (PLACEHOLDER) ──────────────────────
  research: {
    placeholder: true,
    items: [
      {
        title: "ML-Driven Energy Optimization in Smart Home Systems",
        type: "Research Paper (Draft)",
        description: "An investigation into applying Gradient Boosting regression models for real-time energy and water usage prediction in residential IoT appliances.",
        status: "In Progress",
        tags: ["Machine Learning", "IoT", "Energy Efficiency", "Python"],
        date: "2025 — Ongoing"
      }
    ]
  },

  // ── CHATBOT KNOWLEDGE BASE ────────────────────────────────
  chatbot: {
    greetings: ["Hi there! 👋", "Hey!", "Hello!", "Hi! 😊"],
    name: "NamithBot",
    intro: "Hey! I'm NamithBot 🤖 — your guide to Namith's portfolio. Ask me anything about his projects, skills, experience, or just say 'projects' to jump there!",
    quickReplies: ["Tell me about projects", "What are his skills?", "Show certifications", "Contact him"],
    navigationKeywords: {
      hero: ["home", "top", "hero", "start"],
      about: ["about", "story", "background", "who", "himself"],
      skills: ["skills", "technologies", "tech", "languages", "tools"],
      projects: ["projects", "work", "built", "portfolio", "apps"],
      certifications: ["certifications", "certs", "certificates", "oracle", "infosys", "credentials"],
      experience: ["experience", "training", "internship", "java", "mysql"],
      competitive: ["competitive", "leetcode", "hackathon", "coding", "algorithms"],
      contact: ["contact", "email", "reach", "hire", "connect", "linkedin"]
    }
  }
};
