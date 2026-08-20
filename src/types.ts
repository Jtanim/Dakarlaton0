export type UserRole = 'designer' | 'employer' | 'admin';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  tags: string[];
  projectUrl?: string;
  clientName?: string;
  year?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  emailVerified: boolean;
  avatar?: string;
  headline?: string;
  bio?: string;
  location?: string;
  hourlyRate?: string;
  availableForWork?: boolean;
  website?: string;
  dribbble?: string;
  behance?: string;
  figma?: string;
  github?: string;
  skills: string[];
  portfolioProjects: PortfolioProject[];
  createdAt: string;
  twoFactorEnabled?: boolean;
  companyName?: string;
  companyWebsite?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  category: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  postedAt: string;
  postedDate: string;
  postedTime?: string;
  postedTimestamp?: number;
  description: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  featured?: boolean;
  tags: string[];
  employerId: string;
  contactEmail: string;
  applicantCount?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar?: string;
  applicantHeadline?: string;
  portfolioUrl?: string;
  selectedProjects?: PortfolioProject[];
  coverLetter: string;
  proposedRate?: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'interviewing' | 'accepted' | 'declined';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
