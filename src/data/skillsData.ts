export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'engineering',
    name: 'Engineering & CAD/BIM',
    skills: [
      'AutoCAD',
      'Revit',
      'BIM Modeling',
      'Navisworks',
      'Civil 3D',
      'SolidWorks',
      'Shop Drawings',
      'Architectural Drafting',
      'Structural Drafting',
      'MEP Drafting',
      'HVAC Design',
      'Electrical Systems',
      'Piping & Plumbing (P&ID)',
      'Quantity Surveying',
      'Site Supervision',
      'Primavera P6',
      'Structural Analysis (ETABS / SAP2000 / STAAD)',
      'Construction Management',
      'Geotechnical Engineering',
      'GIS / ArcGIS',
      'Steel Structure Detailing (Tekla)',
      'Fire Fighting Systems',
      'As-Built Drawings',
      'Bill of Quantities (BOQ)',
      'Saudi Building Code (SBC) Compliance'
    ]
  },
  {
    id: 'architecture',
    name: 'Architecture & 3D',
    skills: [
      '3ds Max',
      'SketchUp',
      'Rhino 3D',
      'Lumion',
      'V-Ray',
      'Enscape',
      'Corona Renderer',
      'Blender',
      'Unreal Engine',
      'Interior Design',
      'Landscape Architecture',
      'Urban Planning',
      '3D Visualization',
      'Parametric Design (Grasshopper)',
      'Concept Design',
      'Moodboards & FF&E',
      'Lighting Design',
      'Façade Engineering',
      'Physical Model Making',
      'Spatial Planning'
    ]
  },
  {
    id: 'design',
    name: 'UI/UX & Product Design',
    skills: [
      'Figma',
      'UI/UX Design',
      'Product Design',
      'Design Systems',
      'Wireframing',
      'Interactive Prototyping',
      'User Research',
      'Usability Testing',
      'Information Architecture',
      'Mobile App Design (iOS & Android)',
      'Web Design',
      'Interaction Design',
      'Micro-interactions',
      'Accessibility (WCAG)',
      'Adobe XD',
      'Sketch',
      'Framer',
      'Webflow',
      'UX Writing',
      'Design Sprint Facilitation'
    ]
  },
  {
    id: 'branding',
    name: 'Graphic Design & Branding',
    skills: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe InDesign',
      'Brand Identity',
      'Logo Design',
      'Typography',
      'Packaging Design',
      'Print Production',
      'Vector Illustration',
      'Art Direction',
      'Marketing Collateral',
      'Editorial & Layout Design',
      'Iconography & Visual Assets',
      'Infographic Design',
      'Merchandise & Apparel Design'
    ]
  },
  {
    id: 'media',
    name: 'Motion, Media & Animation',
    skills: [
      'Adobe After Effects',
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Motion Graphics',
      '2D Animation',
      '3D Animation',
      'Video Editing',
      'Sound Design & Audio Editing',
      'Color Grading',
      'Storyboarding',
      'Visual Effects (VFX)',
      'Cinema 4D',
      'Social Media Reels & Shorts Editing',
      'Commercial Video Production'
    ]
  },
  {
    id: 'tech',
    name: 'Software, Web & Mobile',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5 / CSS3',
      'Node.js',
      'Express.js',
      'Python',
      'Django / FastAPI',
      'PHP / Laravel',
      'Vue.js',
      'Angular',
      'Flutter',
      'React Native',
      'Swift (iOS)',
      'Kotlin (Android)',
      'RESTful APIs & GraphQL',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Firebase / Firestore',
      'AWS (Amazon Web Services)',
      'Google Cloud Platform (GCP)',
      'Azure',
      'Docker & Containerization',
      'Kubernetes',
      'CI/CD Pipelines',
      'Git & GitHub / GitLab',
      'Microservices Architecture',
      'Cybersecurity & Pen Testing'
    ]
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    skills: [
      'SQL',
      'Python for Data Science (Pandas / NumPy)',
      'Power BI',
      'Tableau',
      'Advanced Excel (VLOOKUP, Macros, VBA)',
      'Google Analytics 4 (GA4)',
      'BigQuery',
      'Snowflake',
      'Data Warehousing',
      'ETL Pipelines',
      'Machine Learning',
      'Prompt Engineering & Generative AI',
      'Data Visualization',
      'Statistical Analysis',
      'Business Intelligence (BI)',
      'A/B Testing & Experimentation'
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    skills: [
      'Search Engine Optimization (SEO)',
      'Technical SEO',
      'Content Strategy',
      'Social Media Marketing (SMM)',
      'Performance Marketing',
      'Google Ads (Search & Display)',
      'Meta Ads (Facebook & Instagram)',
      'LinkedIn Ads',
      'TikTok Ads',
      'Email Marketing (Klaviyo / Mailchimp)',
      'Conversion Rate Optimization (CRO)',
      'Copywriting',
      'Brand Strategy',
      'Influencer Marketing',
      'Marketing Automation (HubSpot)',
      'Public Relations (PR)'
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Management',
    skills: [
      'Agile / Scrum Methodology',
      'Jira',
      'Asana',
      'Trello',
      'Notion',
      'Microsoft Project',
      'Supply Chain Management',
      'Logistics & Procurement',
      'Vendor & Contract Management',
      'Quality Assurance & Control (QA/QC)',
      'Process Improvement (Six Sigma)',
      'Enterprise Resource Planning (ERP / SAP)',
      'Risk Management',
      'Cross-functional Team Leadership'
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    skills: [
      'Financial Modeling & Valuation',
      'Corporate Finance',
      'Bookkeeping & Accounting',
      'Financial Reporting & Analysis (FP&A)',
      'QuickBooks',
      'Xero',
      'SAP Financials (FICO)',
      'IFRS & GAAP Compliance',
      'Budgeting & Forecasting',
      'Zakat & VAT Compliance (GCC / ZATCA)',
      'Auditing & Internal Controls',
      'Payroll Management'
    ]
  },
  {
    id: 'content',
    name: 'Content & Writing',
    skills: [
      'Technical Writing',
      'Creative Writing',
      'Arabic-English Translation',
      'Localization',
      'Blog & Article Writing',
      'Copywriting',
      'Proofreading & Editing',
      'Ghostwriting',
      'Press Releases',
      'Scriptwriting',
      'Scientific & Academic Writing'
    ]
  },
  {
    id: 'sales',
    name: 'Sales & Customer Success',
    skills: [
      'CRM (Salesforce / HubSpot)',
      'B2B Sales',
      'Enterprise Account Management',
      'Lead Generation & Prospecting',
      'Customer Relationship Management',
      'Customer Support (Zendesk / Intercom)',
      'Contract Negotiation',
      'Client Onboarding',
      'Customer Retention & Churn Reduction'
    ]
  }
];

// Flat unique list of all skills across all categories
export const ALL_SKILLS: string[] = Array.from(
  new Set(SKILL_CATEGORIES.flatMap((c) => c.skills))
).sort((a, b) => a.localeCompare(b));
