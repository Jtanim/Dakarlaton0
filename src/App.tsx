/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { EmailVerificationModal } from './components/EmailVerificationModal';
import { LegalModal } from './components/LegalModal';
import { JobListing } from './types';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<'home' | 'about' | 'jobs' | 'contact' | 'designers'>('home');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);

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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#E25B38]/20 selection:text-[#E25B38]">
      {/* Email Verification Persistent Security Banner */}
      <EmailVerificationBanner onOpenVerify={() => setIsVerifyOpen(true)} />

      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        onOpenAuth={() => handleOpenAuthModal('signin')}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenVerify={() => setIsVerifyOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectJob={(job) => {
              setSelectedJob(job);
              setCurrentTab('jobs');
            }}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onSearch={handleSearch}
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

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        onOpenLegal={handleOpenLegal}
      />

      {/* Modals & Overlays */}
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

      <EmailVerificationModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />

      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        initialTab={legalTab}
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
