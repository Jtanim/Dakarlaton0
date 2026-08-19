import { JobListing, UserProfile, FAQItem } from '../types';

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-autocad-riyadh',
    title: 'AutoCAD Draftsman / Draftswoman | Riyadh',
    company: 'MAS Future Group',
    companyLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    type: 'Full-time',
    location: 'Riyadh, Saudi Arabia',
    workplaceType: 'On-site',
    salary: 'SAR 8,500 - SAR 12,000 / month',
    postedAt: 'Just now',
    postedDate: '2026-08-19',
    featured: true,
    description: 'MAS Future Group is looking for a skilled AutoCAD Draftsman/Draftswoman based in Riyadh to produce technical, architectural, and structural shop drawings for ongoing construction and infrastructure projects.',
    aboutRole: 'MAS Future Group is seeking an experienced AutoCAD Draftsman/Draftswoman in Riyadh. You will collaborate closely with structural engineers, site managers, and consultants to generate accurate, code-compliant as-built and detailed construction drawings.',
    responsibilities: [
      'Strong proficiency in AutoCAD 2D/3D and technical drafting',
      'Experience in construction drawings, shop drawings, and as-built documentation',
      'Ability to read, coordinate, and understand architectural and structural drawings',
      'Liaise with engineering teams and project managers on site specifications'
    ],
    requirements: [
      'Relevant diploma or degree in Civil/Architectural Engineering or Drafting',
      '3+ years hands-on experience in construction or engineering drafting in KSA/GCC',
      'Proficiency with AutoCAD, Revit, and BIM software is an advantage',
      'Strong attention to detail, accuracy, and adherence to Saudi building codes'
    ],
    benefits: [
      'Competitive monthly salary with annual increments',
      'Medical insurance and standard Saudi labor law benefits',
      'Professional project environment with major infrastructure developments',
      'Annual paid leave with return flight allowance'
    ],
    tags: ['AutoCAD', 'Revit', 'Drafting', 'Shop Drawings', 'BIM Modeling', 'Construction'],
    employerId: 'emp-mas-future',
    contactEmail: 'career@mascofuture.com',
    applicantCount: 5
  },
  {
    id: 'job-1',
    title: 'Senior Product Designer',
    company: 'Brightwave Studio',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    type: 'Full-time',
    location: 'Remote',
    workplaceType: 'Remote',
    salary: '$90k - $120k',
    postedAt: '2 days ago',
    postedDate: '2026-08-16',
    featured: true,
    description: 'Lead end-to-end product design for our core platform. You will work closely with engineering and product teams to ship beautiful, user-centered experiences at scale.',
    aboutRole: 'Lead end-to-end product design for our core platform. You’ll work closely with engineering and product to ship beautiful, user-centered experiences at scale.',
    responsibilities: [
      'Architect design systems and component libraries in Figma for web and mobile',
      'Conduct user research, interviews, and usability testing sessions with global customers',
      'Collaborate directly with product managers and engineers throughout agile sprints',
      'Prototype micro-interactions and interactive motion specs'
    ],
    requirements: [
      '5+ years of experience designing complex web applications or SaaS tools',
      'A stellar portfolio demonstrating strong UI/UX craft, typography, and case studies',
      'Deep mastery of Figma, auto-layout, tokens, and prototyping workflows',
      'Strong communication skills and freelance/remote self-direction'
    ],
    benefits: [
      '100% remote work flexibility from anywhere',
      '$3,000 annual home office & equipment stipend',
      'Comprehensive health, dental, and vision coverage',
      'Unlimited paid time off (minimum 25 days encouraged)'
    ],
    tags: ['Figma', 'Design Systems', 'UI/UX', 'SaaS', 'Mobile & Web'],
    employerId: 'emp-brightwave',
    contactEmail: 'careers@brightwavestudio.com',
    applicantCount: 14
  },
  {
    id: 'job-2',
    title: 'Growth Marketing Manager',
    company: 'Launchpad HQ',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=150&auto=format&fit=crop&q=80',
    category: 'Marketing',
    type: 'Full-time',
    location: 'Dakar, SN',
    workplaceType: 'Hybrid',
    salary: '$75k - $95k',
    postedAt: '3 days ago',
    postedDate: '2026-08-15',
    featured: true,
    description: 'Drive high-impact user acquisition and conversion rate optimization campaigns across organic and paid channels in emerging tech hubs.',
    aboutRole: 'Drive high-impact user acquisition and conversion rate optimization campaigns across organic and paid channels in emerging tech hubs.',
    responsibilities: [
      'Design, test, and scale multichannel growth experiments across paid search, social, and content',
      'Optimize landing pages and signup funnels alongside product design teams',
      'Analyze lifecycle metrics, cohort retention, and CAC/LTV dynamics'
    ],
    requirements: [
      '3+ years in growth marketing or performance marketing at a fast-growing tech startup',
      'Data-driven mindset with proficiency in Google Analytics, Mixpanel, and SQL basics',
      'Fluency in English and French is an advantage for West African regional markets'
    ],
    benefits: [
      'Flexible hybrid schedule in Dakar workspace or remote',
      'Annual equity grant and performance bonus structure',
      'Learning budget for courses and industry conferences'
    ],
    tags: ['Growth', 'Paid Ads', 'SEO', 'Analytics', 'Funnel Optimization'],
    employerId: 'emp-launchpad',
    contactEmail: 'jobs@launchpadhq.io',
    applicantCount: 9
  },
  {
    id: 'job-3',
    title: 'Full-Stack Engineer',
    company: 'Nexora Tech',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    category: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    workplaceType: 'Remote',
    salary: '$110k - $140k',
    postedAt: '1 day ago',
    postedDate: '2026-08-17',
    featured: true,
    description: 'Build fast, scalable web applications with React, TypeScript, Node.js, and cloud native architectures.',
    aboutRole: 'Build fast, scalable web applications with React, TypeScript, Node.js, and cloud native architectures.',
    responsibilities: [
      'Develop pixel-perfect web interfaces matching responsive Figma designs',
      'Design and maintain clean GraphQL and REST APIs with Node.js/PostgreSQL',
      'Ensure high code quality through automated testing and code reviews'
    ],
    requirements: [
      '4+ years building full-stack applications in modern React and TypeScript',
      'Strong knowledge of relational databases, caching, and serverless deployments',
      'Comfortable communicating asynchronously across global time zones'
    ],
    benefits: [
      'Competitive salary + early employee equity',
      'Flexible working hours & async-first culture',
      'Top-tier MacBook Pro and home setup budget'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    employerId: 'emp-nexora',
    contactEmail: 'talent@nexoratech.dev',
    applicantCount: 22
  },
  {
    id: 'job-4',
    title: 'Operations Lead',
    company: 'Meridian Group',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
    category: 'Operations',
    type: 'Full-time',
    location: 'Dakar, SN',
    workplaceType: 'On-site',
    salary: '$65k - $85k',
    postedAt: '5 days ago',
    postedDate: '2026-08-13',
    featured: true,
    description: 'Oversee operational workflows, vendor coordination, and internal cross-team efficiency.',
    aboutRole: 'Oversee operational workflows, vendor coordination, and internal cross-team efficiency across multinational offices.',
    responsibilities: [
      'Streamline business operations and standard operating procedures (SOPs)',
      'Manage supply chain, vendor contracts, and logistics operations',
      'Coordinate quarterly OKRs and performance tracking across regional teams'
    ],
    requirements: [
      '4+ years in operational leadership or consulting',
      'Strong organizational, project management, and negotiation skills',
      'Proven track record scaling operational processes'
    ],
    benefits: [
      'Private health insurance & pension plan',
      'Generous relocation support if moving to Dakar',
      'Annual executive retreat and wellness perks'
    ],
    tags: ['Operations', 'Strategy', 'Project Management', 'Logistics'],
    employerId: 'emp-meridian',
    contactEmail: 'hr@meridiangroup.com',
    applicantCount: 7
  },
  {
    id: 'job-5',
    title: 'Content Strategist',
    company: 'Pulse Media',
    companyLogo: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=150&auto=format&fit=crop&q=80',
    category: 'Content',
    type: 'Freelance',
    location: 'Hybrid',
    workplaceType: 'Hybrid',
    salary: '$55k - $70k',
    postedAt: '1 week ago',
    postedDate: '2026-08-11',
    featured: true,
    description: 'Shape storytelling, editorial strategy, and content marketing narratives for high-growth tech brands.',
    aboutRole: 'Shape storytelling, editorial strategy, and content marketing narratives for high-growth tech brands.',
    responsibilities: [
      'Produce compelling thought leadership articles, case studies, and video scripts',
      'Build editorial calendars and distribution strategies across social & newsletter platforms',
      'Collaborate with visual designers to create engaging infographics'
    ],
    requirements: [
      '3+ years in editorial journalism, content strategy, or copywriting',
      'Exceptional portfolio of published digital articles and branded content',
      'Strong research skills and ability to unpack complex technical topics'
    ],
    benefits: [
      'Flexible freelance contract with retainer options',
      'Direct exposure to top global founders and creative directors'
    ],
    tags: ['Content Strategy', 'Copywriting', 'Storytelling', 'Editorial'],
    employerId: 'emp-pulse',
    contactEmail: 'editorial@pulsemedia.net',
    applicantCount: 11
  },
  {
    id: 'job-6',
    title: 'Data Analyst',
    company: 'Clearview Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&auto=format&fit=crop&q=80',
    category: 'Data',
    type: 'Full-time',
    location: 'Remote',
    workplaceType: 'Remote',
    salary: '$80k - $100k',
    postedAt: '4 days ago',
    postedDate: '2026-08-14',
    featured: true,
    description: 'Transform complex datasets into actionable business intelligence and interactive visual dashboards.',
    aboutRole: 'Transform complex datasets into actionable business intelligence and interactive visual dashboards.',
    responsibilities: [
      'Build and maintain executive Tableau & PowerBI dashboards',
      'Write optimized SQL queries against large data warehouses (BigQuery/Snowflake)',
      'Present analytical findings and product recommendations to stakeholders'
    ],
    requirements: [
      '3+ years of data analytics experience',
      'Proficiency in SQL, Python/R, and modern data visualization tools',
      'Experience in e-commerce or marketplace metrics is a plus'
    ],
    benefits: [
      'Full remote working flexibility',
      'Health insurance, 401(k) matching, and annual bonus'
    ],
    tags: ['SQL', 'Python', 'Tableau', 'BigQuery', 'Data Modeling'],
    employerId: 'emp-clearview',
    contactEmail: 'careers@clearviewanalytics.co',
    applicantCount: 16
  },
  {
    id: 'job-7',
    title: 'Brand & Visual Identity Designer',
    company: 'Studio Kora',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    type: 'Freelance',
    location: 'Remote',
    workplaceType: 'Remote',
    salary: '$60 - $85 / hr',
    postedAt: 'Just now',
    postedDate: '2026-08-18',
    featured: false,
    description: 'Create memorable visual identities, brand guidelines, packaging, and digital assets for exciting global clients.',
    aboutRole: 'We are seeking an outstanding freelance Brand & Visual Designer to partner with us on high-profile rebranding projects.',
    responsibilities: [
      'Develop comprehensive brand guideline books including typography, palette, and iconography',
      'Design logo marks, visual assets, 3D renderings, and packaging mockups',
      'Present creative concepts to client stakeholders with persuasive rationales'
    ],
    requirements: [
      'Standout portfolio showcasing high-end brand identity systems',
      'Mastery of Adobe Illustrator, Photoshop, InDesign, and Figma',
      'Strong typography sensibility and layout craft'
    ],
    benefits: [
      'Flexible hourly contract with regular project volume',
      'Direct attribution on major studio releases'
    ],
    tags: ['Branding', 'Typography', 'Visual Identity', 'Illustrator', 'Packaging'],
    employerId: 'emp-studiokora',
    contactEmail: 'hello@studiokora.design',
    applicantCount: 5
  },
  {
    id: 'job-8',
    title: 'UX/UI Freelance Designer (Mobile App)',
    company: 'FinTrack Global',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    type: 'Contract',
    location: 'Remote',
    workplaceType: 'Remote',
    salary: '$8,000 - $12,000 / project',
    postedAt: '1 day ago',
    postedDate: '2026-08-17',
    featured: false,
    description: 'Redesign our iOS & Android mobile financial tracking application with modern gesture-driven interactions.',
    aboutRole: 'Looking for a seasoned freelance mobile UI/UX designer to lead the v3.0 redesign of our consumer fintech application.',
    responsibilities: [
      'Create intuitive mobile wireframes, user flows, and interactive prototypes',
      'Design iOS Human Interface Guidelines and Material Design compliant UI components',
      'Deliver final developer-ready Figma tokens and assets'
    ],
    requirements: [
      'Demonstrated portfolio of shipped iOS/Android mobile apps',
      'Deep understanding of mobile UX patterns, animations, and accessibility standards',
      'Available for 20-30 hours per week for 2 months'
    ],
    benefits: [
      'Project milestone-based payout with upfront deposit',
      'Possibility of long-term design advisory retainer'
    ],
    tags: ['Mobile UI', 'iOS Design', 'Figma Prototype', 'Fintech', 'Micro-interactions'],
    employerId: 'emp-fintrack',
    contactEmail: 'design@fintrackglobal.com',
    applicantCount: 8
  }
];

export const INITIAL_DESIGNERS: UserProfile[] = [
  {
    id: 'des-1',
    email: 'amara.diallo@design.dev',
    fullName: 'Amara Diallo',
    role: 'designer',
    emailVerified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    headline: 'Senior Product & Systems Designer',
    bio: '7+ years crafting scalable design systems and intuitive SaaS web products. Focused on clean typography, accessibility, and high conversion interfaces.',
    location: 'Dakar, Senegal (Remote worldwide)',
    hourlyRate: '$75 / hr',
    availableForWork: true,
    website: 'https://amaradiallo.design',
    dribbble: 'https://dribbble.com/amaradiallo',
    behance: 'https://behance.net/amaradiallo',
    figma: 'https://figma.com/@amaradiallo',
    skills: ['Design Systems', 'Figma', 'UI/UX', 'User Research', 'Design Tokens', 'Prototyping', 'Accessibility (WCAG)'],
    createdAt: '2026-01-10',
    portfolioProjects: [
      {
        id: 'proj-1',
        title: 'FinScale Enterprise Banking UI',
        category: 'Product Design',
        description: 'Comprehensive design system and responsive dashboard for an international merchant banking platform serving 40k+ daily operators.',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        tags: ['Figma', 'Fintech', 'Dashboard', 'Design System'],
        projectUrl: 'https://dribbble.com',
        clientName: 'FinScale Global',
        year: '2026'
      },
      {
        id: 'proj-2',
        title: 'Aura Studio Brand Identity & Mobile App',
        category: 'Branding & Mobile',
        description: 'End-to-end visual identity, typography system, custom 3D iconography, and iOS mobile experience for a wellness creative studio.',
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
        tags: ['Mobile UI', 'Branding', 'iOS', 'Motion Design'],
        projectUrl: 'https://behance.net',
        clientName: 'Aura Wellness',
        year: '2025'
      }
    ]
  },
  {
    id: 'des-2',
    email: 'fatou.sow@creative.io',
    fullName: 'Fatou Sow',
    role: 'designer',
    emailVerified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    headline: 'Brand Identity & Visual Storyteller',
    bio: 'Helping ambitious technology companies communicate their mission through bold visual identities, packaging, and memorable web experiences.',
    location: 'Abidjan, Ivory Coast (Remote)',
    hourlyRate: '$65 / hr',
    availableForWork: true,
    website: 'https://fatousow.art',
    dribbble: 'https://dribbble.com/fatousow',
    behance: 'https://behance.net/fatousow',
    skills: ['Brand Identity', 'Visual Design', 'Art Direction', 'Packaging', 'Typography', 'Illustrator'],
    createdAt: '2026-02-14',
    portfolioProjects: [
      {
        id: 'proj-3',
        title: 'Koba Organic Coffee Rebrand & Packaging',
        category: 'Packaging & Identity',
        description: 'Sustainable packaging architecture, bespoke serif typography, and unboxing identity for premium single-origin coffee roasters.',
        coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
        tags: ['Packaging', 'Branding', 'Print', 'Typography'],
        projectUrl: 'https://behance.net',
        clientName: 'Koba Roasters',
        year: '2026'
      }
    ]
  },
  {
    id: 'des-3',
    email: 'tariq.mansoor@designhub.sa',
    fullName: 'Tariq Al-Mansoor',
    role: 'designer',
    emailVerified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    headline: 'Motion Designer & 3D Interactive Specialist',
    bio: 'Creating interactive 3D web experiences, micro-interactions, and engaging promotional motion graphics for next-generation tech startups.',
    location: 'Riyadh, Saudi Arabia',
    hourlyRate: '$90 / hr',
    availableForWork: true,
    website: 'https://tariqmansoor.com',
    dribbble: 'https://dribbble.com/tariq',
    skills: ['3D Design', 'Spline', 'Three.js', 'After Effects', 'Micro-interactions', 'Figma'],
    createdAt: '2026-03-01',
    portfolioProjects: [
      {
        id: 'proj-4',
        title: 'CyberVanguard 3D Interactive Landing Page',
        category: '3D & Web Design',
        description: 'Interactive WebGL 3D model configuration and cinematic scroll animations for a cyber security hardware manufacturer.',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        tags: ['3D Web', 'Spline', 'UI/UX', 'Motion'],
        projectUrl: 'https://dribbble.com',
        clientName: 'CyberVanguard Inc',
        year: '2026'
      }
    ]
  }
];

export const CATEGORIES = [
  { name: 'Engineering', count: '2,450+ jobs', iconName: 'Code', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { name: 'Architecture & 3D', count: '1,580+ jobs', iconName: 'Building', color: 'bg-stone-100 text-stone-700 border-stone-200' },
  { name: 'Design', count: '1,240+ jobs', iconName: 'Palette', color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { name: 'Technology & Software', count: '3,100+ jobs', iconName: 'Code', color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { name: 'Marketing', count: '890+ jobs', iconName: 'TrendingUp', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { name: 'Data', count: '740+ jobs', iconName: 'BarChart3', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
  { name: 'Operations', count: '650+ jobs', iconName: 'Settings', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { name: 'Finance', count: '650+ jobs', iconName: 'DollarSign', color: 'bg-green-50 text-green-600 border-green-200' },
  { name: 'Content', count: '420+ jobs', iconName: 'FileText', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { name: 'Sales', count: '1,100+ jobs', iconName: 'Users', color: 'bg-rose-50 text-rose-600 border-rose-200' }
];

export const STATS = [
  { value: '12,000+', label: 'JOBS POSTED', sublabel: 'Open roles across design, tech & ops' },
  { value: '800+', label: 'COMPANIES HIRING', sublabel: 'Top global startups & studios' },
  { value: '50,000+', label: 'JOB SEEKERS', sublabel: 'Curated freelance & fulltime talent' },
  { value: '94%', label: 'PLACEMENT RATE', sublabel: 'Candidates matched in 14 days' }
];

export const VALUES = [
  {
    number: '01',
    title: 'People first',
    description: 'Every feature we build starts with a human need. We design for real people navigating real career moments — not just data points on a dashboard.'
  },
  {
    number: '02',
    title: 'Radical transparency',
    description: 'No hidden fees, no mystery algorithms. Job seekers see honest listings with transparent salary ranges. Employers get real candidate insights. Everyone wins when trust is the foundation.'
  },
  {
    number: '03',
    title: 'Growth without limits',
    description: 'We believe ambition should never be capped by circumstance or geography. Dakarlaton opens doors for talented designers and professionals at every stage of their career journey.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Amara Diallo',
    role: 'Product Designer at Brightwave',
    quote: 'Dakarlaton helped me land multiple high-paying freelance contracts and connect with visionary tech founders without endless cold outreach.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Karim Ndiaye',
    role: 'CTO at Nexora Tech',
    quote: 'We hired two senior UI designers within 10 days of posting. The quality of portfolios showcased on Dakarlaton is leagues ahead of other platforms.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Fatou Sow',
    role: 'Marketing Manager at Launchpad HQ',
    quote: 'The direct portfolio view and verified designer profiles saved us dozens of hours filtering through unqualified candidates.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is Dakarlaton free for job seekers and freelance designers?',
    answer: 'Yes! Dakarlaton is 100% free for job seekers and freelance designers. You can build your rich portfolio showcase, display case studies, apply to verified jobs, and receive direct inquiries from employers with zero commission taken from your earnings.'
  },
  {
    id: 'faq-2',
    question: 'How do I post a job as an employer?',
    answer: 'Click the "Post a Job" button in the top navigation bar. Once you create a secure employer account and complete email verification, fill in your role details, compensation range, and candidate expectations. Your listing will go live immediately on the job board.'
  },
  {
    id: 'faq-3',
    question: 'How does the email verification and security system work?',
    answer: 'To protect our community against spam and fraudulent postings, all new accounts receive an instant email verification code upon signup. Verified accounts receive a verified security badge, priority placement in designer searches, and full access to post jobs and submit direct proposals.'
  },
  {
    id: 'faq-4',
    question: 'How long does it take to hear back after applying to a job?',
    answer: 'Most employers review applications within 2 to 5 business days. When you submit your portfolio through Dakarlaton, the employer receives your rich case study preview and direct contact links immediately.'
  },
  {
    id: 'faq-5',
    question: 'Can I edit or remove my job listing after posting?',
    answer: 'Yes, as the job author or an authorized employer, you have full access from your account dashboard to edit the job details, mark the role as filled, or remove the listing at any time.'
  }
];
