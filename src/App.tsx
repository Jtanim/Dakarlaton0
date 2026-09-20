/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { FindJobsPage } from './components/FindJobsPage';
import { ContactPage } from './components/ContactPage';
import { PortfoliosPage } from './components/PortfoliosPage';
import { AuthModal } from './components/AuthModal';
import { PostJobModal } from './components/PostJobModal';
import { ApplyModal } from './components/ApplyModal';
import { ProfileModal } from './components/ProfileModal';
import { EmailVerificationBanner } from './components/EmailVerificationBanner';
import { AccountVerificationModal } from './components/AccountVerificationModal';
import { LegalModal } from './components/LegalModal';
import { SubmitCvModal } from './components/SubmitCvModal';
import { SavedJobsModal } from './components/SavedJobsModal';
import { ArticleModal } from './components/ArticleModal';
import { PhishingAlertModal } from './components/PhishingAlertModal';
import { SalaryTrendsModal } from './components/SalaryTrendsModal';
import { ManageListingsModal } from './components/ManageListingsModal';
import { RECRUITMENT_INSIGHTS, InsightArticle } from './data/mockData';
import { JobListing } from './types';
import { SEOHead } from './components/SEOHead';

function MainApp() {
  const { jobs } = useAuth();
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'jobs' | 'contact' | 'designers'>('home');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userTypeMode, setUserTypeMode] = useState<'candidate' | 'employer'>('candidate');

  // URL Deep-Linking & History Synchronizer
  useEffect(() => {
    const parseUrlRoute = () => {
      try {
        const path = window.location.pathname.toLowerCase();
        const params = new URLSearchParams(window.location.search);
        const jobId = params.get('id') || params.get('job');
        const q = params.get('q') || params.get('keyword') || params.get('category');
        const loc = params.get('location');

        if (q) setSearchKeyword(q);
        if (loc) setSearchLocation(loc);

        if (path.includes('about')) {
          setCurrentTab('about');
          setSelectedJob(null);
        } else if (path.includes('contact')) {
          setCurrentTab('contact');
          setSelectedJob(null);
        } else if (path.includes('designer') || path.includes('talent')) {
          setCurrentTab('designers');
          setSelectedJob(null);
        } else if (path.includes('job') || jobId) {
          setCurrentTab('jobs');
          if (jobId) {
            const match = jobs.find((j) => j.id === jobId);
            if (match) setSelectedJob(match);
          }
        }
      } catch (e) {
        console.warn('URL parsing error:', e);
      }
    };

    parseUrlRoute();

    const handlePopState = () => {
      parseUrlRoute();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [jobs]);

  // Maintain active job selection across background job updates
  useEffect(() => {
    if (selectedJob) {
      const match = jobs.find((j) => j.id === selectedJob.id);
      if (
        match &&
        (match.applicantCount !== selectedJob.applicantCount ||
          match.title !== selectedJob.title ||
          match.description !== selectedJob.description ||
          match.postedTimestamp !== selectedJob.postedTimestamp)
      ) {
        setSelectedJob(match);
      }
    }
  }, [jobs, selectedJob]);

  // Saved Jobs Bookmarking State
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dakarlaton_saved_jobs');
      return stored ? JSON.parse(stored) : ['job-1', 'job-4'];
    } catch {
      return ['job-1', 'job-4'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dakarlaton_saved_jobs', JSON.stringify(savedJobIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedJobIds]);

  const handleToggleSaveJob = (job: JobListing) => {
    setSavedJobIds((prev) =>
      prev.includes(job.id) ? prev.filter((id) => id !== job.id) : [...prev, job.id]
    );
  };

  const handleRemoveSavedJob = (jobId: string) => {
    setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
  };

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);

  // New Modals based on Video Template
  const [isSubmitCvOpen, setIsSubmitCvOpen] = useState(false);
  const [isSavedJobsOpen, setIsSavedJobsOpen] = useState(false);
  const [isPhishingModalOpen, setIsPhishingModalOpen] = useState(false);
  const [isSalaryTrendsOpen, setIsSalaryTrendsOpen] = useState(false);
  const [isManageListingsOpen, setIsManageListingsOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const handleOpenLegal = (tab: 'privacy' | 'terms' = 'privacy') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleNavigate = (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => {
    setCurrentTab(tab);
    setSelectedJob(null);
    const path = tab === 'home' ? '/' : `/${tab}`;
    try {
      window.history.pushState(null, '', path);
    } catch {
      // Ignore if iframe sandbox restricts
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectJob = (job: JobListing | null) => {
    setSelectedJob(job);
    if (job) {
      setCurrentTab('jobs');
      try {
        window.history.pushState(null, '', `/jobs?id=${job.id}`);
      } catch {
        // Ignore
      }
    } else {
      try {
        window.history.pushState(null, '', '/jobs');
      } catch {
        // Ignore
      }
    }
  };

  const handleSearch = (keyword: string, location: string) => {
    setSearchKeyword(keyword);
    setSearchLocation(location);
    setSelectedJob(null);
    setCurrentTab('jobs');
    const params = new URLSearchParams();
    if (keyword) params.set('q', keyword);
    if (location) params.set('location', location);
    const searchStr = params.toString() ? `?${params.toString()}` : '';
    try {
      window.history.pushState(null, '', `/jobs${searchStr}`);
    } catch {
      // Ignore
    }
  };

  const handleOpenAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenArticleById = (articleId: string) => {
    const found = RECRUITMENT_INSIGHTS.find((a) => a.id === articleId) || RECRUITMENT_INSIGHTS[0];
    setActiveArticle(found);
  };

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  // Determine dynamic SEO parameters
  let seoTitle = '';
  let seoDescription = '';
  let canonicalPath = '/';
  let breadcrumbs: Array<{ name: string; url: string }> = [{ name: 'Home', url: '/' }];

  if (selectedJob) {
    seoTitle = `${selectedJob.title} in ${selectedJob.location} (${selectedJob.company})`;
    seoDescription = `${selectedJob.company} is hiring for ${selectedJob.title} in ${selectedJob.location}. ${selectedJob.description?.slice(0, 140) || ''} Apply now on Dakarlaton.`;
    canonicalPath = `/jobs?id=${selectedJob.id}`;
    breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Find Jobs', url: '/jobs' },
      { name: selectedJob.title, url: `/jobs?id=${selectedJob.id}` }
    ];
  } else if (currentTab === 'jobs') {
    seoTitle = 'Explore Verified Jobs in Saudi Arabia, UAE & GCC';
    seoDescription = 'Search thousands of verified career opportunities in Riyadh, Dubai, Jeddah, and Doha across engineering, BIM, architecture, design, and technology.';
    canonicalPath = '/jobs';
    breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Find Jobs', url: '/jobs' }
    ];
  } else if (currentTab === 'designers') {
    seoTitle = 'Browse Pre-Vetted Designers & Tech Talent';
    seoDescription = 'Hire top freelance product designers, design systems specialists, 3D artists, and creative technologists across the Middle East and worldwide.';
    canonicalPath = '/designers';
    breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Browse Talent', url: '/designers' }
    ];
  } else if (currentTab === 'about') {
    seoTitle = 'About Dakarlaton — Leading Middle East Recruitment Platform';
    seoDescription = 'Learn how Dakarlaton connects top professionals with leading enterprises and high-growth startups across Saudi Arabia, UAE, and GCC.';
    canonicalPath = '/about';
    breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' }
    ];
  } else if (currentTab === 'contact') {
    seoTitle = 'Contact Us — Dakarlaton Support & Inquiries';
    seoDescription = 'Get in touch with the Dakarlaton recruitment team in Riyadh and Dubai. Direct support for job seekers, hiring managers, and corporate partnerships.';
    canonicalPath = '/contact';
    breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ];
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#5925DC]/20 selection:text-[#5925DC]">
      {/* Dynamic SEO Meta & Schema.org Injector */}
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={canonicalPath}
        jobPosting={selectedJob}
        breadcrumbs={breadcrumbs}
      />

      {/* Email Verification Persistent Security Banner */}
      <EmailVerificationBanner onOpenVerify={() => setIsVerifyOpen(true)} />

      {/* Navigation Header with Mega-menus & Security Advisory */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        onOpenAuth={() => handleOpenAuthModal('signin')}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenVerify={() => setIsVerifyOpen(true)}
        savedCount={savedJobIds.length}
        onOpenSavedModal={() => setIsSavedJobsOpen(true)}
        onOpenSubmitCv={() => setIsSubmitCvOpen(true)}
        onOpenSalaryTrends={() => setIsSalaryTrendsOpen(true)}
        onOpenPhishingInfo={() => setIsPhishingModalOpen(true)}
        onOpenArticle={handleOpenArticleById}
        userTypeMode={userTypeMode}
        setUserTypeMode={setUserTypeMode}
        onOpenManageListings={() => setIsManageListingsOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectJob={(job) => {
              handleSelectJob(job);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onSearch={handleSearch}
            onOpenSubmitCv={() => setIsSubmitCvOpen(true)}
            onOpenSalaryTrends={() => setIsSalaryTrendsOpen(true)}
            onOpenArticle={(art) => setActiveArticle(art)}
            onToggleSaveJob={handleToggleSaveJob}
            savedJobIds={savedJobIds}
            onOpenApplyModal={(job) => setApplyingJob(job)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenPostJob={() => setIsPostJobOpen(true)}
          />
        )}

        {currentTab === 'jobs' && (
          <FindJobsPage
            selectedJob={selectedJob}
            onSelectJob={handleSelectJob}
            onOpenApply={(job) => setApplyingJob(job)}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onNavigate={handleNavigate}
            initialKeyword={searchKeyword}
            initialLocation={searchLocation}
          />
        )}

        {currentTab === 'designers' && (
          <PortfoliosPage
            onOpenAuth={() => handleOpenAuthModal('signup')}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {currentTab === 'contact' && <ContactPage />}
      </main>

      {/* Global Enterprise Footer with 3 Action Cards */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onOpenLegal={handleOpenLegal}
        onOpenSubmitCv={() => setIsSubmitCvOpen(true)}
        onOpenSalaryTrends={() => setIsSalaryTrendsOpen(true)}
        onOpenPhishingInfo={() => setIsPhishingModalOpen(true)}
      />

      {/* All Application Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onVerificationTrigger={() => setIsVerifyOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onOpenVerify={() => setIsVerifyOpen(true)}
        onOpenAuth={() => handleOpenAuthModal('signup')}
        onOpenManageListings={() => setIsManageListingsOpen(true)}
        onViewCreatedJob={(job) => {
          setSelectedJob(job);
          setCurrentTab('jobs');
          setIsPostJobOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <ApplyModal
        job={applyingJob}
        isOpen={!!applyingJob}
        onClose={() => setApplyingJob(null)}
        onOpenAuth={() => handleOpenAuthModal('signin')}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenVerify={() => setIsVerifyOpen(true)}
      />

      <AccountVerificationModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        onVerificationComplete={() => {
          setIsVerifyOpen(false);
        }}
      />

      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
      />

      <SubmitCvModal
        isOpen={isSubmitCvOpen}
        onClose={() => setIsSubmitCvOpen(false)}
        onOpenAuth={() => handleOpenAuthModal('signup')}
      />

      <SavedJobsModal
        isOpen={isSavedJobsOpen}
        onClose={() => setIsSavedJobsOpen(false)}
        savedJobs={savedJobs}
        onRemoveSavedJob={handleRemoveSavedJob}
        onSelectJob={(job) => {
          setSelectedJob(job);
          setCurrentTab('jobs');
          setIsSavedJobsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onApplyJob={(job) => {
          setIsSavedJobsOpen(false);
          setApplyingJob(job);
        }}
      />

      <ArticleModal
        article={activeArticle}
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenSalaryTrends={() => {
          setActiveArticle(null);
          setIsSalaryTrendsOpen(true);
        }}
      />

      <PhishingAlertModal
        isOpen={isPhishingModalOpen}
        onClose={() => setIsPhishingModalOpen(false)}
      />

      <SalaryTrendsModal
        isOpen={isSalaryTrendsOpen}
        onClose={() => setIsSalaryTrendsOpen(false)}
      />

      <ManageListingsModal
        isOpen={isManageListingsOpen}
        onClose={() => setIsManageListingsOpen(false)}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onViewJobInFeed={(job) => {
          setSelectedJob(job);
          setCurrentTab('jobs');
          setIsManageListingsOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
