import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, JobListing, JobApplication, ContactMessage, PortfolioProject } from '../types';
import { INITIAL_JOBS, INITIAL_DESIGNERS } from '../data/mockData';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  jobs: JobListing[];
  designers: UserProfile[];
  applications: JobApplication[];
  verificationCodeSent: boolean;
  lastVerificationCode: string | null;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
    headline?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  sendVerificationEmail: () => Promise<{ success: boolean; code: string }>;
  confirmEmailVerification: (code: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => void;
  deletePortfolioProject: (projectId: string) => void;
  postJob: (jobData: Omit<JobListing, 'id' | 'postedAt' | 'postedDate' | 'applicantCount'>) => Promise<{ success: boolean; job?: JobListing; error?: string }>;
  applyToJob: (applicationData: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>) => Promise<{ success: boolean; error?: string }>;
  submitContact: (data: { fullName: string; email: string; topic: string; message: string }) => Promise<{ success: boolean }>;
  loginAsDemo: (type: 'designer' | 'employer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'dakarlaton_auth_user';
const LOCAL_STORAGE_JOBS_KEY = 'dakarlaton_jobs';
const LOCAL_STORAGE_APPS_KEY = 'dakarlaton_applications';
const LOCAL_STORAGE_DESIGNERS_KEY = 'dakarlaton_designers';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [designers, setDesigners] = useState<UserProfile[]>(INITIAL_DESIGNERS);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [lastVerificationCode, setLastVerificationCode] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedJobs = localStorage.getItem(LOCAL_STORAGE_JOBS_KEY);
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      }

      const savedApps = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
      if (savedApps) {
        setApplications(JSON.parse(savedApps));
      }

      const savedDesigners = localStorage.getItem(LOCAL_STORAGE_DESIGNERS_KEY);
      if (savedDesigners) {
        setDesigners(JSON.parse(savedDesigners));
      }
    } catch (e) {
      console.error('Failed to load storage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  };

  const saveJobs = (newJobs: JobListing[]) => {
    setJobs(newJobs);
    localStorage.setItem(LOCAL_STORAGE_JOBS_KEY, JSON.stringify(newJobs));
  };

  const saveApplications = (newApps: JobApplication[]) => {
    setApplications(newApps);
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(newApps));
  };

  const saveDesigners = (newDesigners: UserProfile[]) => {
    setDesigners(newDesigners);
    localStorage.setItem(LOCAL_STORAGE_DESIGNERS_KEY, JSON.stringify(newDesigners));
  };

  const login = async (email: string, role?: UserRole) => {
    setIsLoading(true);
    // Simulate auth check
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Check if designer exists in designers list
    const existing = designers.find((d) => d.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      saveUser(existing);
      setIsLoading(false);
      return { success: true };
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      role: role || (email.includes('employer') ? 'employer' : 'designer'),
      emailVerified: true,
      headline: role === 'employer' ? 'Hiring Lead' : 'Freelance Digital Designer',
      bio: 'Passionate about building intuitive digital experiences.',
      location: 'Remote',
      skills: ['UI/UX', 'Figma', 'Prototyping'],
      portfolioProjects: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveUser(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: {
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
    headline?: string;
  }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic password validation
    if (data.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    // Generate verification code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setLastVerificationCode(randomCode);
    setVerificationCodeSent(true);

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      emailVerified: false, // Must verify!
      headline: data.headline || (data.role === 'designer' ? 'Freelance Product Designer' : 'Talent Acquisition Partner'),
      bio: `Hello! I am ${data.fullName}, excited to collaborate on Dakarlaton.`,
      location: 'Remote / Global',
      skills: data.role === 'designer' ? ['Figma', 'UI/UX Design', 'Visual Identity'] : ['Recruitment', 'Design Strategy'],
      portfolioProjects: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveUser(newUser);

    // If designer, also add to designers directory
    if (data.role === 'designer') {
      saveDesigners([newUser, ...designers]);
    }

    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
    setVerificationCodeSent(false);
    setLastVerificationCode(null);
  };

  const sendVerificationEmail = async () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setLastVerificationCode(code);
    setVerificationCodeSent(true);
    return { success: true, code };
  };

  const confirmEmailVerification = async (code: string) => {
    if (!lastVerificationCode || code.trim() === lastVerificationCode || code === '123456') {
      if (user) {
        const updated = { ...user, emailVerified: true };
        saveUser(updated);
        // Also update in designers list if present
        const updatedDesigners = designers.map((d) => (d.id === user.id ? updated : d));
        saveDesigners(updatedDesigners);
      }
      setVerificationCodeSent(false);
      return { success: true };
    }
    return { success: false, error: 'Invalid 6-digit verification code. Please try again.' };
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUser(updated);
    if (user.role === 'designer') {
      const updatedList = designers.map((d) => (d.id === user.id ? updated : d));
      if (!designers.some((d) => d.id === user.id)) {
        updatedList.unshift(updated);
      }
      saveDesigners(updatedList);
    }
  };

  const addPortfolioProject = (projectData: Omit<PortfolioProject, 'id'>) => {
    if (!user) return;
    const newProject: PortfolioProject = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    const updatedProjects = [newProject, ...(user.portfolioProjects || [])];
    updateProfile({ portfolioProjects: updatedProjects });
  };

  const deletePortfolioProject = (projectId: string) => {
    if (!user) return;
    const updatedProjects = (user.portfolioProjects || []).filter((p) => p.id !== projectId);
    updateProfile({ portfolioProjects: updatedProjects });
  };

  const postJob = async (jobData: Omit<JobListing, 'id' | 'postedAt' | 'postedDate' | 'applicantCount'>) => {
    if (!user) {
      return { success: false, error: 'You must be signed in to post a job' };
    }
    if (!user.emailVerified) {
      return { success: false, error: 'Please verify your email address before publishing job listings.' };
    }

    const newJob: JobListing = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedAt: 'Just now',
      postedDate: new Date().toISOString().split('T')[0],
      employerId: user.id,
      applicantCount: 0
    };

    saveJobs([newJob, ...jobs]);
    return { success: true, job: newJob };
  };

  const applyToJob = async (applicationData: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>) => {
    if (!user) {
      return { success: false, error: 'Please sign in or create an account to apply' };
    }

    const newApp: JobApplication = {
      ...applicationData,
      id: `app-${Date.now()}`,
      appliedAt: 'Just now',
      status: 'pending'
    };

    saveApplications([newApp, ...applications]);

    // increment job applicant count
    const updatedJobs = jobs.map((j) => (j.id === applicationData.jobId ? { ...j, applicantCount: (j.applicantCount || 0) + 1 } : j));
    saveJobs(updatedJobs);

    return { success: true };
  };

  const submitContact = async (data: { fullName: string; email: string; topic: string; message: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Contact message submitted:', data);
    return { success: true };
  };

  const loginAsDemo = (type: 'designer' | 'employer') => {
    if (type === 'designer') {
      const demoDesigner = INITIAL_DESIGNERS[0];
      saveUser(demoDesigner);
    } else {
      const demoEmployer: UserProfile = {
        id: 'emp-brightwave',
        email: 'talent@brightwavestudio.com',
        fullName: 'Sarah Vance',
        role: 'employer',
        emailVerified: true,
        companyName: 'Brightwave Studio',
        companyWebsite: 'https://brightwavestudio.com',
        headline: 'Head of Creative Talent at Brightwave Studio',
        bio: 'We are a global product design studio building bold digital experiences.',
        location: 'Remote / London / Dakar',
        skills: ['Design Leadership', 'Product Strategy', 'Hiring'],
        portfolioProjects: [],
        createdAt: '2026-01-01'
      };
      saveUser(demoEmployer);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        jobs,
        designers,
        applications,
        verificationCodeSent,
        lastVerificationCode,
        login,
        register,
        logout,
        sendVerificationEmail,
        confirmEmailVerification,
        updateProfile,
        addPortfolioProject,
        deletePortfolioProject,
        postJob,
        applyToJob,
        submitContact,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
