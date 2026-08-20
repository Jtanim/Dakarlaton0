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
    postedAt: 'Aug 20, 2026 at 02:00 PM',
    postedDate: '2026-08-20',
    postedTime: '02:00 PM',
    postedTimestamp: 1787205600000,
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
    id: 'job-gcc-architectural-bim',
    title: 'Senior Architectural & 3D BIM Designer',
    company: 'Al-Madar Engineering Consultants',
    companyLogo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=150&auto=format&fit=crop&q=80',
    category: 'Architecture & 3D',
    type: 'Full-time',
    location: 'Jeddah / Riyadh, Saudi Arabia',
    workplaceType: 'On-site',
    salary: 'SAR 14,000 - SAR 18,000 / month',
    postedAt: 'Aug 20, 2026 at 01:15 PM',
    postedDate: '2026-08-20',
    postedTime: '01:15 PM',
    postedTimestamp: 1787202900000,
    featured: true,
    description: 'Lead 3D BIM model coordination, Revit architectural detailing, and clash detection for high-profile hospitality and commercial towers in Western KSA.',
    aboutRole: 'Al-Madar Engineering is hiring a Senior Architectural BIM Specialist to supervise multi-disciplinary BIM models and ensure compliance with Saudi Vision 2030 building standards.',
    responsibilities: [
      'Develop LOD 300-400 BIM models in Autodesk Revit and Navisworks',
      'Perform automated clash detection with MEP and structural disciplines',
      'Generate high-precision architectural shop drawings and bill of quantities (BOQ)',
      'Mentor junior draftspersons and modelers across active project sites'
    ],
    requirements: [
      'Bachelors degree in Architecture or Architectural Engineering',
      '5+ years experience in GCC architectural projects',
      'Expert proficiency in Autodesk Revit, AutoCAD 3D, and Navisworks Manage',
      'Registered with Saudi Council of Engineers (SCE) or eligible for immediate accreditation'
    ],
    benefits: [
      'Competitive tax-free monthly compensation package',
      'Class-A family medical insurance',
      'Performance-based project milestone bonuses',
      'Relocation and housing assistance provided'
    ],
    tags: ['Revit', 'BIM', 'AutoCAD', 'Navisworks', 'Architecture', 'Saudi Arabia'],
    employerId: 'emp-almadar',
    contactEmail: 'careers@almadarconsult.sa',
    applicantCount: 8
  },
  {
    id: 'job-gcc-uiux-dubai',
    title: 'Senior UI/UX & Design Systems Lead',
    company: 'FinTech Oasis GCC',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    type: 'Full-time',
    location: 'Dubai, UAE (Hybrid)',
    workplaceType: 'Hybrid',
    salary: 'AED 18,000 - AED 26,000 / month',
    postedAt: 'Aug 20, 2026 at 11:30 AM',
    postedDate: '2026-08-20',
    postedTime: '11:30 AM',
    postedTimestamp: 1787196600000,
    featured: true,
    description: 'Design bilingual (Arabic & English) mobile fintech banking applications and cross-platform design systems for 500k+ active Gulf consumers.',
    aboutRole: 'FinTech Oasis is looking for an experienced Design Systems & UI/UX Lead in Dubai to evolve our core payment ecosystems and micro-interaction libraries.',
    responsibilities: [
      'Architect robust multi-brand Figma token systems supporting RTL (Arabic) & LTR layout symmetry',
      'Conduct user testing with local UAE, Saudi, and GCC consumer demographics',
      'Deliver developer-ready component specs, auto-layout tokens, and micro-motion prototypes',
      'Partner closely with product managers and React Native engineering squads'
    ],
    requirements: [
      '4+ years designing consumer mobile applications (Fintech, E-commerce, or SaaS)',
      'Expertise in Figma, RTL Arabic typography, and WCAG accessibility standards',
      'Strong portfolio demonstrating end-to-end design thinking and shipped products'
    ],
    benefits: [
      'Hybrid work schedule (2 days in Dubai DIFC office, 3 days remote)',
      'Annual flight ticket allowance to home country',
      'Comprehensive UAE premium healthcare plan',
      'Equipment and workspace upgrade budget'
    ],
    tags: ['Figma', 'UI/UX', 'Design Systems', 'Fintech', 'RTL Arabic', 'Dubai'],
    employerId: 'emp-fintechoasis',
    contactEmail: 'talent@fintechoasis.ae',
    applicantCount: 12
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
