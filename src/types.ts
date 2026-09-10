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
  phoneNumber?: string;
  phoneCountryCode?: string;
  phoneVerified?: boolean;
  isVerified?: boolean;
  authProvider?: 'email' | 'google' | 'linkedin' | 'phone';
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
  linkedinUrl?: string;
  skills: string[];
  portfolioProjects: PortfolioProject[];
  createdAt: string;
  twoFactorEnabled?: boolean;
  companyName?: string;
  companyWebsite?: string;
}

export type JobStatus = 'draft' | 'scheduled' | 'published' | 'expired';

export interface SchedulerLogEntry {
  id: string;
  timestamp: string;
  jobId: string;
  jobTitle: string;
  company: string;
  action: 'SCHEDULED' | 'AUTO_PUBLISHED' | 'AUTO_EXPIRED' | 'MANUAL_PUBLISH' | 'STATUS_CHANGE' | 'ERROR';
  message: string;
  details?: string;
  status: 'success' | 'warning' | 'error';
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
  status?: JobStatus;
  scheduledAt?: string; // ISO 8601 string, e.g. "2026-09-06T14:30:00"
  expiresAt?: string; // ISO 8601 string, e.g. "2026-09-20T23:59:00"
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
