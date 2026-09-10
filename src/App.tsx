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

function MainApp() {
  const { jobs } = useAuth();
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'jobs' | 'contact' | 'designers'>('home');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [userTypeMode, setUserTypeMode] = useState<'candidate' | 'employer'>('candidate');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (keyword: string, location: string) => {
    setSearchKeyword(keyword);
    setSearchLocation(location);
    setSelectedJob(null);
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#5925DC]/20 selection:text-[#5925DC]">
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
              setSelectedJob(job);
              setCurrentTab('jobs');
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
            onSelectJob={setSelectedJob}
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
