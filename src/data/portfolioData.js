export const PORTFOLIO_DATA = {
  personal: {
    name: "Anushruti",
    title: "Full-Stack Software Developer & AI Engineer",
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
    status: "Available for Software Engineering & AI Roles",
    bio: "Passionate CS undergraduate (9.1 CGPA) with hands-on software engineering experience at AIIMS, Mama's Baby Lounge, and RPG Websolutions. Specialized in building high-throughput Spring Boot & Angular microservices, modern React web applications, and state-of-the-art PyTorch deep learning models."
  },
  
  stats: [
    { label: "Cum. CGPA", value: "9.1", sub: "Top 20% in Batch" },
    { label: "ML Model Accuracy", value: "97.5%", sub: "SyncTransformer-Net" },
    { label: "User Sessions Handled", value: "10,000+", sub: "React JWT Auth" },
    { label: "Open-Source PRs", value: "12+", sub: "GSSoC Top 5% Contributor" }
  ],

  experience: [
    {
      id: "aiims",
      company: "All India Institute of Medical Sciences (AIIMS)",
      shortName: "AIIMS",
      role: "Software Engineering Intern - EHS",
      period: "Jun. 2026 – Jul. 2026",
      location: "New Delhi, India",
      type: "Internship",
      highlights: [
        "Architected a scalable backend infrastructure for the EHS portal using Spring Boot, Maven, and JSP; integrated Spring AI to automate query resolutions and streamline internal healthcare data processing.",
        "Engineered responsive, high-performance user interfaces using Angular, enhancing system accessibility for medical staff and significantly optimizing the end-to-end management of digital health records."
      ],
      skills: ["Spring Boot", "Spring AI", "Angular", "Maven", "JSP", "Healthcare Systems", "Java"]
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
        "Engineered a dynamic React-based landing page, accelerating site load speed by 40% and boosting daily user engagement by 25%.",
        "Architected a secure JWT authentication system effectively handling 10,000+ concurrent user sessions."
      ],
      skills: ["React", "JWT Auth", "JavaScript (ES6+)", "Page Speed Optimization", "UI/UX"]
    },
    {
      id: "rpg-websolutions",
      company: "RPG Websolutions",
      shortName: "RPG Websolutions",
      role: "Web Design & Development Intern",
      period: "Jul. 2025",
      location: "New Delhi, India",
      type: "Internship",
      highlights: [
        "Spearheaded a complete homepage redesign, achieving a 45% reduction in page load times via aggressive lazy loading and CDN integration.",
        "Drove a 35% surge in mobile traffic via heavily optimized, responsive Tailwind CSS layouts."
      ],
      skills: ["Tailwind CSS", "Web Optimization", "CDN Integration", "Responsive Design", "Frontend Development"]
    }
  ],

  projects: [
    {
      id: "work-management-system",
      title: "Work Management System",
      category: "Full Stack",
      year: "2026",
      tech: ["Java", "Spring Boot", "Angular", "PostgreSQL", "REST APIs"],
      summary: "Architected a scalable full-stack task management portal featuring role-based access control and real-time status tracking to streamline team workflows.",
      highlights: [
        "Role-Based Access Control (RBAC) securing manager and team member dashboards.",
        "Real-time task status tracking and cross-functional data synchronization.",
        "Optimized PostgreSQL queries for zero-latency workspace loading."
      ],
      architecture: "Spring Boot REST backend communicating with an Angular 17 SPA, backed by PostgreSQL relational persistence.",
      github: "https://github.com/anushrutimalik/work-management-system",
      demo: "https://work-management-system.demo.app",
      featured: true
    },
    {
      id: "library-management-system",
      title: "Library Management System",
      category: "Full Stack",
      year: "2026",
      tech: ["Java", "Spring Boot", "Angular", "MySQL", "JWT"],
      summary: "Developed a comprehensive digital library platform automating inventory management, book issuance, and user record tracking with JWT authentication.",
      highlights: [
        "Automated book issuance, fine calculations, and catalog indexing.",
        "Integrated secure JWT authentication handling multi-role user access.",
        "Optimized backend database queries, reducing search latency by 30%."
      ],
      architecture: "Spring Boot Microservice + Angular Frontend with MySQL database indexing and JWT token validation.",
      github: "https://github.com/anushrutimalik/library-management-system",
      demo: "https://library-management.demo.app",
      featured: true
    },
    {
      id: "synctransformer-net",
      title: "SyncTransformer-Net: Deepfake Detection",
      category: "Machine Learning",
      year: "2025",
      tech: ["Python", "PyTorch", "Wav2Vec2.0", "Transformers", "Computer Vision"],
      summary: "Co-engineered a multi-modal framework achieving 97.5% accuracy and 0.99 AUC on FakeAVCeleb by detecting audio-visual desynchronization.",
      highlights: [
        "97.5% accuracy and 0.99 AUC on FakeAVCeleb benchmark dataset.",
        "Acoustic pipeline mapping 16kHz audio to dense 1024D vector representations.",
        "Exposed a 48.5% failure rate in traditional audio-only deepfake baselines."
      ],
      architecture: "Dual-stream neural network combining Wav2Vec2.0 audio encoder with spatial video feature transformers for temporal lip-sync cross-attention.",
      github: "https://github.com/anushrutimalik/SyncTransformer-Net",
      demo: "https://huggingface.co/spaces/anushrutimalik/SyncTransformer-Net",
      featured: true
    },
    {
      id: "agrivision",
      title: "AgriVision: Crop Disease Detection (SIH)",
      category: "Machine Learning",
      year: "2025",
      tech: ["Python", "PyTorch", "CNN", "LSTM", "Smart India Hackathon"],
      summary: "Developed a hybrid CNN-LSTM machine learning model for Smart India Hackathon to accurately detect crop diseases from 50,000+ agricultural images.",
      highlights: [
        "96.8% diagnostic accuracy across 15 different crop disease categories.",
        "Trained on a massive dataset of 50,000+ high-resolution agricultural crop images.",
        "Optimized model inference pipeline for real-time mobile deployment in remote farms."
      ],
      architecture: "Hybrid Convolutional Long Short-Term Memory (CNN-LSTM) neural architecture for visual feature extraction and spatio-temporal disease progression analysis.",
      github: "https://github.com/anushrutimalik/AgriVision-SIH",
      demo: "https://agrivision.demo.app",
      featured: true
    }
  ],

  skills: {
    languages: [
      { name: "Java", level: 92, tag: "Primary Language" },
      { name: "Python", level: 90, tag: "AI / ML & Scripts" },
      { name: "C++", level: 85, tag: "Data Structures & Alg" },
      { name: "JavaScript (ES6+)", level: 88, tag: "Frontend & Web" },
      { name: "SQL", level: 86, tag: "Databases" },
      { name: "C", level: 80, tag: "Systems Programming" },
      { name: "HTML5 & CSS3", level: 95, tag: "Web Design" }
    ],
    frameworks: [
      { name: "Spring Boot", level: 90, tag: "Backend Framework" },
      { name: "Spring AI", level: 85, tag: "AI Backend Integration" },
      { name: "React", level: 88, tag: "Frontend SPA" },
      { name: "Angular", level: 86, tag: "Enterprise Web Apps" },
      { name: "PyTorch", level: 87, tag: "Deep Learning" },
      { name: "Tailwind CSS", level: 92, tag: "UI Styling" },
      { name: "Scikit-learn", level: 84, tag: "Machine Learning" },
      { name: "Pandas & NumPy", level: 88, tag: "Data Processing" }
    ],
    tools: [
      { name: "Git & GitHub", level: 90 },
      { name: "Maven", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 86 },
      { name: "MongoDB", level: 80 },
      { name: "Vercel", level: 85 },
      { name: "Figma", level: 78 },
      { name: "Google Analytics", level: 75 }
    ],
    coursework: [
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOPS)",
      "Database Management Systems (DBMS)",
      "Computer Networks (CN)",
      "Operating Systems (OS)",
      "Compiler Design",
      "Theory of Computation (TOC)",
      "PSLP"
    ]
  },

  achievements: [
    {
      title: "1st Prize — Technovate 2026",
      organization: "Technovate Hackathon",
      year: "2026",
      badge: "Winner",
      desc: "Secured 1st Prize for constructing an innovative AI software solution under tight hackathon time constraints."
    },
    {
      title: "3rd Runner-Up — Evotech 2026",
      organization: "Evotech Tech Fest",
      year: "2026",
      badge: "Finalist",
      desc: "Awarded 3rd Runner-Up out of 100+ competing engineering teams."
    },
    {
      title: "Selected Contributor — GirlScript Summer of Code (GSSoC)",
      organization: "GirlScript Foundation",
      year: "2025",
      badge: "Top 5% Contributor",
      desc: "Selected among top 5% of 30,000+ nationwide applicants. Contributed 12+ pull requests impacting 10,000+ lines of code across 3 open-source repositories."
    },
    {
      title: "1st Runner-Up — Anugoonj '25",
      organization: "GGSIPU Annual Fest",
      year: "2025",
      badge: "Runner-Up",
      desc: "Recognized among top teams at GGSIPU's flagship annual technological showcase."
    },
    {
      title: "Selected Participant — Smart India Hackathon (SIH 2025)",
      organization: "Ministry of Education, Govt of India",
      year: "2025",
      badge: "National Participant",
      desc: "Shortlisted for SIH 2025 for AgriVision crop disease detection AI project."
    },
    {
      title: "President — Aagaaz Music Society",
      organization: "BVCOE",
      year: "2025 – 2026",
      badge: "Leadership",
      desc: "Direct a premier collegiate society of 150+ members, managing administrative operations and executing events drawing 2,000+ attendees."
    },
    {
      title: "Head of E-Cell (Entrepreneurship)",
      organization: "BVCOE",
      year: "2024 – Present",
      badge: "Leadership",
      desc: "Lead campus entrepreneurship cell, organizing pitch sessions and representing college at National Entrepreneurship Challenge (NEC) at E-Summit IIT Bombay."
    },
    {
      title: "Top Performer — BVCOE CSE Batch",
      organization: "BVCOE Department of CSE",
      year: "2024 – 2025",
      badge: "Academic Excellence",
      desc: "Maintained dominant 9.1 CGPA with 95%+ in 15+ core CS courses, consistently ranking in top 20% of 134-student cohort."
    }
  ],

  certifications: [
    {
      name: "DSA in Java",
      issuer: "Coding Blocks",
      year: "2026",
      verifyUrl: "#"
    },
    {
      name: "Microsoft Excel - Advanced Analytics",
      issuer: "Udemy",
      year: "2025",
      verifyUrl: "#"
    },
    {
      name: "Digital Marketing Specialization",
      issuer: "Udemy",
      year: "2024",
      verifyUrl: "#"
    }
  ]
};
