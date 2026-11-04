export const PORTFOLIO_DATA = {
  personal: {
    name: "Anushruti",
    title: "Full-Stack Software Engineer — Java",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Bharati Vidyapeeth's College of Engineering (BVCOE)",
    location: "New Delhi, India",
    gpa: "9.1 / 10.0",
    phone: "+91 85956 20079",
    email: "anushrutimalik@gmail.com",
    github: "https://github.com/anushrutimalik",
    githubUsername: "anushrutimalik",
    linkedin: "https://linkedin.com/in/anushruti-malik",
    linkedinUsername: "anushruti-malik",
    status: "Open to full-time Java software engineering roles",
    bio: "Results-driven Software Engineering student specializing in full-stack development with Java, Spring Boot, and Angular. Skilled in optimizing backend performance, building RESTful APIs, and delivering scalable solutions using Agile practices."
  },

  stats: [
    { label: "Cum. GPA", value: "9.1", sub: "BVCOE — B.Tech CSE" },
    { label: "User Sessions Handled", value: "10,000+", sub: "JWT Auth @ Mama's Baby Lounge" },
    { label: "Records Served", value: "100,000+", sub: "AIIMS EHS Portal" },
    { label: "Open-Source PRs", value: "12+", sub: "GSSoC — Top 5% Contributor" }
  ],

  experience: [
    {
      id: "aiims",
      company: "All India Institute of Medical Sciences (AIIMS)",
      shortName: "AIIMS",
      role: "Software Engineer Intern — EHS",
      period: "Jun. 2026 – Aug. 2026",
      location: "New Delhi, India",
      type: "Internship",
      highlights: [
        "Developed the EHS portal card registration module using Spring Boot, JSP, and Angular, streamlining records for 100,000+ members using workflow diagrams (ER, DFD, Use-Case), Agile practices, and Unit Testing."
      ],
      skills: ["Spring Boot", "Angular", "JSP", "Unit Testing", "ER/DFD Design", "Agile", "Java"]
    },
    {
      id: "mamas-baby-lounge",
      company: "Mama’s Baby Lounge",
      shortName: "Mama's Baby Lounge",
      role: "Web Development Intern",
      period: "Jul. 2025 – Sep. 2025",
      location: "Noida, New Delhi, India",
      type: "Internship",
      highlights: [
        "Engineered a dynamic React landing page that boosted user engagement by 25% (analyzed via Google Analytics).",
        "Built a secure JWT authentication system supporting 10,000+ concurrent user sessions within Scrum sprints."
      ],
      skills: ["React", "JWT Auth", "JavaScript (ES6+)", "Google Analytics", "Scrum"]
    },
    {
      id: "rpg-websolutions",
      company: "RPG Websolutions",
      shortName: "RPG Websolutions",
      role: "Web Design & Development Intern",
      period: "Jul. 2025 – Jul. 2025",
      location: "New Delhi, India",
      type: "Internship",
      highlights: [
        "Spearheaded a complete homepage redesign spanning 15+ client web modules, achieving a stellar 45% reduction in overall page load times via aggressive lazy loading.",
        "Drove a 35% surge in mobile traffic through heavily optimized, responsive CSS layouts."
      ],
      skills: ["Tailwind CSS", "Web Optimization", "Lazy Loading", "Responsive Design", "Frontend Development"]
    }
  ],

  projects: [
    {
      id: "work-management-system",
      title: "Work Management System",
      category: "Full Stack",
      year: "2026",
      tech: ["Java", "Spring Boot", "Angular", "PostgreSQL", "AWS", "CI/CD"],
      summary: "Architected a highly scalable full-stack task management portal featuring comprehensive role-based access control, real-time status tracking, and RESTful APIs supporting Microservices architecture with CI/CD pipelines.",
      highlights: [
        "Role-based access control (RBAC) securing manager and team member dashboards.",
        "Real-time task status tracking across cross-functional teams.",
        "RESTful APIs designed on a Microservices architecture with CI/CD pipelines."
      ],
      architecture: "Spring Boot microservices + Angular SPA with PostgreSQL persistence, wired through an AWS-hosted CI/CD pipeline.",
      github: "https://github.com/anushrutimalik",
      demo: null,
      featured: true
    },
    {
      id: "library-management-system",
      title: "Library Management System",
      category: "Full Stack",
      year: "2026",
      tech: ["Java", "Spring Boot", "Angular", "MySQL"],
      summary: "Developed a digital library platform automating inventory tracking, book issuance, and user record management, while optimizing backend database queries and secure JWT authentication to reduce search latency by 30%.",
      highlights: [
        "Automated book issuance, fine calculations, and catalogue indexing.",
        "Secure JWT authentication with multi-role user access.",
        "Optimized backend queries cutting search latency by 30%."
      ],
      architecture: "Spring Boot application + Angular frontend with MySQL indexing and JWT token validation.",
      github: "https://github.com/anushrutimalik",
      demo: null,
      featured: true
    },
    {
      id: "synctransformer-net",
      title: "SyncTransformer-Net: Deepfake Detection",
      category: "Machine Learning",
      year: "2025",
      tech: ["Python", "PyTorch", "Wav2Vec2.0"],
      summary: "Co-engineered an advanced multi-modal deepfake detection framework achieving 97.5% accuracy and 0.99 AUC by effectively detecting audio-visual desynchronization through specialized acoustic feature mapping pipelines.",
      highlights: [
        "97.5% accuracy and 0.99 AUC on the FakeAVCeleb benchmark dataset.",
        "Acoustic pipeline mapping 16kHz audio to dense vector representations.",
        "Highlighted a 48.5% failure rate in traditional audio-only deepfake baselines."
      ],
      architecture: "Dual-stream neural network combining Wav2Vec2.0 audio encoder with spatial video feature transformers for temporal lip-sync cross-attention.",
      github: "https://github.com/anushrutimalik",
      demo: null,
      featured: true
    },
    {
      id: "agrivision",
      title: "AgriVision: Crop Disease Detection (SIH)",
      category: "Machine Learning",
      year: "2025",
      tech: ["Python", "PyTorch", "CNN", "LSTM", "Smart India Hackathon"],
      summary: "Developed a hybrid CNN-LSTM ML model for the Smart India Hackathon to process 50,000+ crop images, achieving 96.8% diagnostic accuracy across 15 distinct disease classes.",
      highlights: [
        "96.8% diagnostic accuracy across 15 different crop disease categories.",
        "Trained on a dataset of 50,000+ high-resolution agricultural crop images.",
        "Optimized inference pipeline for real-time field deployment."
      ],
      architecture: "Hybrid Convolutional LSTM neural architecture for visual feature extraction and spatio-temporal disease progression analysis.",
      github: "https://github.com/anushrutimalik",
      demo: null,
      featured: true
    }
  ],

  skills: {
    languages: [
      { name: "Java", level: 92, tag: "Primary Language" },
      { name: "Python", level: 88, tag: "ML & Scripting" },
      { name: "JavaScript (ES6+)", level: 88, tag: "Frontend & Web" },
      { name: "C++", level: 85, tag: "Data Structures & Alg" },
      { name: "SQL", level: 86, tag: "Databases" },
      { name: "C", level: 80, tag: "Systems Programming" },
      { name: "HTML5 & CSS3", level: 95, tag: "Web Design" }
    ],
    frameworks: [
      { name: "Spring Boot", level: 90, tag: "Backend Framework" },
      { name: "Angular", level: 88, tag: "Frontend SPA" },
      { name: "Tailwind CSS", level: 92, tag: "UI Styling" },
      { name: "Scikit-learn", level: 84, tag: "Machine Learning" },
      { name: "Pandas", level: 88, tag: "Data Processing" },
      { name: "NumPy", level: 86, tag: "Numerical Computing" },
      { name: "Seaborn", level: 78, tag: "Data Visualisation" },
      { name: "Matplotlib", level: 78, tag: "Data Visualisation" }
    ],
    tools: [
      { name: "Git & GitHub", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 86 },
      { name: "Maven", level: 85 },
      { name: "CI/CD", level: 82 },
      { name: "Figma", level: 78 },
      { name: "Vercel", level: 85 },
      { name: "REST APIs", level: 88 }
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOPS)",
      "Database Management Systems (DBMS)",
      "Computer Networks (CN)",
      "Operating Systems (OS)",
      "Compiler Design",
      "Discrete Mathematics"
    ]
  },

  achievements: [
    {
      title: "1st Prize — Technovate 2026",
      organization: "Technovate Hackathon",
      year: "2026",
      badge: "Winner",
      desc: "Secured 1st Prize for constructing an innovative software solution under tight hackathon time constraints."
    },
    {
      title: "3rd Runner-Up — Evotech 2026",
      organization: "Evotech Tech Fest",
      year: "2026",
      badge: "Finalist",
      desc: "Awarded 3rd Runner-Up out of 100+ competing teams."
    },
    {
      title: "1st Runner-Up — Anugoonj '25",
      organization: "GGSIPU Annual Fest",
      year: "2025",
      badge: "Runner-Up",
      desc: "Placed among the top teams at GGSIPU's flagship annual technological showcase."
    },
    {
      title: "Selected Contributor — GirlScript Summer of Code",
      organization: "GirlScript Foundation",
      year: "2025",
      badge: "Top 5% Contributor",
      desc: "Selected among the top 5% of 30,000+ nationwide applicants; contributed 12+ pull requests across open-source repositories."
    },
    {
      title: "Selected Participant — Smart India Hackathon (SIH 2025)",
      organization: "Ministry of Education, Govt of India",
      year: "2025",
      badge: "National Participant",
      desc: "Shortlisted for SIH 2025 for the AgriVision crop disease detection project."
    },
    {
      title: "President — Aagaaz Music Society",
      organization: "BVCOE",
      year: "Aug 2025 – Jun 2026",
      badge: "Leadership",
      desc: "Directed a collegiate society of 150+ members, managing operations, budget, and high-impact events drawing 2,000+ attendees."
    },
    {
      title: "Head of E-Cell (Entrepreneurship)",
      organization: "BVCOE",
      year: "Aug 2024 – Jun 2025",
      badge: "Leadership",
      desc: "Governed campus entrepreneurship initiatives — startup pitch sessions and networking events — representing BVCOE at the National Entrepreneurship Challenge (NEC) at E-Cell IIT Bombay."
    }
  ],

  certifications: [
    {
      name: "DSA in Java",
      issuer: "Coding Blocks",
      year: "Jan 2026",
      verifyUrl: "#"
    },
    {
      name: "MS Excel",
      issuer: "Udemy",
      year: "Aug 2025",
      verifyUrl: "#"
    }
  ]
};
