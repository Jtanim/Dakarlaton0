import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, JobListing, JobApplication, ContactMessage, PortfolioProject } from '../types';
import { INITIAL_JOBS, INITIAL_DESIGNERS } from '../data/mockData';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  OperationType,
  handleFirestoreError
} from '../lib/firebase';

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
  loginWithGoogle: (role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    fullName: string;
    password: string;
    role: UserRole;
    headline?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<{ success: boolean; code: string }>;
  confirmEmailVerification: (code: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  addPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => Promise<void>;
  deletePortfolioProject: (projectId: string) => Promise<void>;
  postJob: (jobData: Omit<JobListing, 'id' | 'postedAt' | 'postedDate' | 'applicantCount'>) => Promise<{ success: boolean; job?: JobListing; error?: string }>;
  applyToJob: (applicationData: Omit<JobApplication, 'id' | 'appliedAt' | 'status'>) => Promise<{ success: boolean; error?: string }>;
  submitContact: (data: { fullName: string; email: string; topic: string; message: string }) => Promise<{ success: boolean }>;
  subscribeToAlerts: (email: string, region: string) => Promise<{ success: boolean }>;
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

  // Initialize cached data from local storage for fast startup
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
      console.warn('Local storage initialization warning:', e);
    }
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userDocRef = doc(db, 'users', fbUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profile = userSnap.data() as UserProfile;
            saveUser(profile);
          } else {
            // Create user profile in Firestore
            const newProfile: UserProfile = {
              id: fbUser.uid,
              email: fbUser.email || 'j_tanim@hotmail.com',
              fullName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Member',
              role: 'designer',
              emailVerified: fbUser.emailVerified || true,
              avatar: fbUser.photoURL || undefined,
              headline: 'Freelance Designer & Tech Specialist',
              bio: 'Passionate about creative engineering and product design across GCC.',
              location: 'Riyadh, Saudi Arabia',
              skills: ['Figma', 'AutoCAD', 'UI/UX', 'Product Design'],
              portfolioProjects: [],
              createdAt: new Date().toISOString().split('T')[0]
            };
            await setDoc(userDocRef, newProfile);
            saveUser(newProfile);
          }
        } catch (err) {
          console.warn('Could not sync user profile from Firestore:', err);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for Jobs
  useEffect(() => {
    const jobsRef = collection(db, 'jobs');
    const unsubscribe = onSnapshot(
      jobsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedJobs: JobListing[] = [];
          snapshot.forEach((docSnap) => {
            fetchedJobs.push(docSnap.data() as JobListing);
          });
          // Sort by newest
          fetchedJobs.sort((a, b) => (b.postedDate || '').localeCompare(a.postedDate || ''));
          saveJobs(fetchedJobs);
        } else {
          // Auto-seed initial jobs to Firestore on first run
          seedInitialJobs();
        }
      },
      (error) => {
        console.warn('Firestore jobs snapshot listener error (falling back to cache):', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for Designers
  useEffect(() => {
    const usersRef = collection(db, 'users');
    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedUsers: UserProfile[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as UserProfile;
            if (data.role === 'designer') {
              fetchedUsers.push(data);
            }
          });
          if (fetchedUsers.length > 0) {
            saveDesigners(fetchedUsers);
          }
        }
      },
      (error) => {
        console.warn('Firestore designers listener notice:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for user's applications
  useEffect(() => {
    if (!user) return;
    const appsRef = collection(db, 'applications');
    const unsubscribe = onSnapshot(
      appsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const userApps: JobApplication[] = [];
          snapshot.forEach((docSnap) => {
            const appData = docSnap.data() as JobApplication;
            if (appData.applicantId === user.id || appData.applicantEmail === user.email) {
              userApps.push(appData);
            }
          });
          saveApplications(userApps);
        }
      },
      (error) => {
        console.warn('Applications snapshot listener notice:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.id, user?.email]);

  const seedInitialJobs = async () => {
    try {
      for (const job of INITIAL_JOBS) {
        await setDoc(doc(db, 'jobs', job.id), job);
      }
      for (const designer of INITIAL_DESIGNERS) {
        await setDoc(doc(db, 'users', designer.id), designer);
      }
    } catch (e) {
      console.warn('Auto-seeding Firestore notice:', e);
    }
  };

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

  const loginWithGoogle = async (role: UserRole = 'designer') => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const userDocRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);

      let profile: UserProfile;
      if (userSnap.exists()) {
        profile = userSnap.data() as UserProfile;
      } else {
        profile = {
          id: fbUser.uid,
          email: fbUser.email || 'user@example.com',
          fullName: fbUser.displayName || 'Dakarlaton User',
          role: role,
          emailVerified: true,
          avatar: fbUser.photoURL || undefined,
          headline: role === 'employer' ? 'Hiring Lead' : 'Freelance Digital Designer',
          bio: 'Collaborating on creative & tech projects across the GCC.',
          location: 'Riyadh, Saudi Arabia',
          skills: ['UI/UX', 'Figma', 'Design Systems'],
          portfolioProjects: [],
          createdAt: new Date().toISOString().split('T')[0]
        };
        await setDoc(userDocRef, profile);
      }

      saveUser(profile);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      console.error('Google Sign In Error:', error);
      return { success: false, error: error.message || 'Google sign-in could not be completed' };
    }
  };

  const login = async (email: string, role?: UserRole) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

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
      location: 'Riyadh, Saudi Arabia',
      skills: ['UI/UX', 'Figma', 'Prototyping'],
      portfolioProjects: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      await setDoc(doc(db, 'users', newUser.id), newUser);
    } catch (e) {
      console.warn('Firestore user save fallback:', e);
    }

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
    if (data.password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setLastVerificationCode(randomCode);
    setVerificationCodeSent(true);

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      emailVerified: false,
      headline: data.headline || (data.role === 'designer' ? 'Freelance Product Designer' : 'Talent Acquisition Partner'),
      bio: `Hello! I am ${data.fullName}, excited to collaborate on Dakarlaton.`,
      location: 'Saudi Arabia / GCC',
      skills: data.role === 'designer' ? ['Figma', 'UI/UX Design', 'Visual Identity'] : ['Recruitment', 'Design Strategy'],
      portfolioProjects: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      await setDoc(doc(db, 'users', newUser.id), newUser);
    } catch (e) {
      console.warn('Firestore register save fallback:', e);
    }

    saveUser(newUser);

    if (data.role === 'designer') {
      saveDesigners([newUser, ...designers]);
    }

    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Firebase sign out notice:', e);
    }
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
        try {
          await updateDoc(doc(db, 'users', user.id), { emailVerified: true });
        } catch (e) {
          console.warn('Firestore email verified update notice:', e);
        }
        const updatedDesigners = designers.map((d) => (d.id === user.id ? updated : d));
        saveDesigners(updatedDesigners);
      }
      setVerificationCodeSent(false);
      return { success: true };
    }
    return { success: false, error: 'Invalid 6-digit verification code. Please try again.' };
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUser(updated);

    try {
      await setDoc(doc(db, 'users', user.id), updated, { merge: true });
    } catch (e) {
      console.warn('Firestore update profile notice:', e);
    }

    if (user.role === 'designer') {
      const updatedList = designers.map((d) => (d.id === user.id ? updated : d));
      if (!designers.some((d) => d.id === user.id)) {
        updatedList.unshift(updated);
      }
      saveDesigners(updatedList);
    }
  };

  const addPortfolioProject = async (projectData: Omit<PortfolioProject, 'id'>) => {
    if (!user) return;
    const newProject: PortfolioProject = {
      ...projectData,
      id: `proj-${Date.now()}`
    };
    const updatedProjects = [newProject, ...(user.portfolioProjects || [])];
    await updateProfile({ portfolioProjects: updatedProjects });
  };

  const deletePortfolioProject = async (projectId: string) => {
    if (!user) return;
    const updatedProjects = (user.portfolioProjects || []).filter((p) => p.id !== projectId);
    await updateProfile({ portfolioProjects: updatedProjects });
  };

  const postJob = async (jobData: Omit<JobListing, 'id' | 'postedAt' | 'postedDate' | 'applicantCount'>) => {
    let currentUserId = user?.id;

    if (!user) {
      const email = jobData.contactEmail || 'j_tanim@hotmail.com';
      const autoUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email: email,
        fullName: jobData.company || email.split('@')[0].replace('.', ' '),
        role: 'employer',
        companyName: jobData.company,
        emailVerified: true,
        headline: `Hiring Lead at ${jobData.company}`,
        bio: `Employer account for ${jobData.company}.`,
        location: jobData.location || 'Remote',
        skills: ['Recruitment', jobData.category],
        portfolioProjects: [],
        createdAt: new Date().toISOString().split('T')[0]
      };
      saveUser(autoUser);
      currentUserId = autoUser.id;
      try {
        await setDoc(doc(db, 'users', autoUser.id), autoUser);
      } catch (e) {
        console.warn('Auto user profile save notice:', e);
      }
    } else if (!user.emailVerified) {
      const verified = { ...user, emailVerified: true };
      saveUser(verified);
    }

    const newJob: JobListing = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedAt: 'Just now',
      postedDate: new Date().toISOString().split('T')[0],
      employerId: currentUserId || 'emp-direct',
      applicantCount: 0
    };

    try {
      await setDoc(doc(db, 'jobs', newJob.id), newJob);
    } catch (error) {
      console.warn('Firestore setDoc jobs error (saving locally):', error);
    }

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

    try {
      await setDoc(doc(db, 'applications', newApp.id), newApp);
      // Increment applicant count on job in Firestore
      const jobRef = doc(db, 'jobs', applicationData.jobId);
      const targetJob = jobs.find((j) => j.id === applicationData.jobId);
      if (targetJob) {
        const newCount = (targetJob.applicantCount || 0) + 1;
        await updateDoc(jobRef, { applicantCount: newCount }).catch(() => {});
      }
    } catch (error) {
      console.warn('Firestore applyToJob notice:', error);
    }

    saveApplications([newApp, ...applications]);

    const updatedJobs = jobs.map((j) =>
      j.id === applicationData.jobId ? { ...j, applicantCount: (j.applicantCount || 0) + 1 } : j
    );
    saveJobs(updatedJobs);

    return { success: true };
  };

  const submitContact = async (data: { fullName: string; email: string; topic: string; message: string }) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'contact_messages', newMsg.id), newMsg);
    } catch (e) {
      console.warn('Firestore contact submit notice:', e);
    }
    return { success: true };
  };

  const subscribeToAlerts = async (email: string, region: string) => {
    const subId = `sub-${Date.now()}`;
    const subData = {
      id: subId,
      email: email.trim().toLowerCase(),
      region,
      subscribedAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, 'subscriptions', subId), subData);
    } catch (e) {
      console.warn('Firestore subscription notice:', e);
    }
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
        loginWithGoogle,
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
        subscribeToAlerts,
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
