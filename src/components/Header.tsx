import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Briefcase,
  User,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  Palette,
  ChevronDown,
  Search,
  Heart,
  Info,
  X,
  FileText,
  TrendingUp,
  Building2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Clock
} from 'lucide-react';
import { InsightArticle } from '../data/mockData';

interface HeaderProps {
  currentTab: 'home' | 'about' | 'jobs' | 'contact' | 'designers';
  setCurrentTab: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenAuth: () => void;
  onOpenPostJob: () => void;
  onOpenProfile: () => void;
  onOpenVerify: () => void;
  savedCount?: number;
  onOpenSavedModal?: () => void;
  onOpenSubmitCv?: () => void;
  onOpenSalaryTrends?: () => void;
  onOpenPhishingInfo?: () => void;
  onOpenArticle?: (articleId: string) => void;
  userTypeMode?: 'candidate' | 'employer';
  setUserTypeMode?: (mode: 'candidate' | 'employer') => void;
  onOpenManageListings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenPostJob,
  onOpenProfile,
  onOpenVerify,
  savedCount = 0,
  onOpenSavedModal,
  onOpenSubmitCv,
  onOpenSalaryTrends,
  onOpenPhishingInfo,
  onOpenArticle,
  userTypeMode = 'candidate',
  setUserTypeMode,
  onOpenManageListings
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobSeekersMenuOpen, setJobSeekersMenuOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [specialismsMenuOpen, setSpecialismsMenuOpen] = useState(false);
  const [showPhishingBanner, setShowPhishingBanner] = useState(true);

  const closeAllMenus = () => {
    setJobSeekersMenuOpen(false);
    setContactMenuOpen(false);
    setSpecialismsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all font-sans">
      {/* Phishing Scam Advisory Top Banner */}
      {showPhishingBanner && (
        <div className="bg-[#1F104F] text-white text-xs py-2 px-4 border-b border-purple-900/40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
                Notice
              </span>
              <p className="truncate text-stone-200 text-[11px] sm:text-xs">
                We're aware of global phishing scams impersonating recruiters via email & Telegram. No Dakarlaton systems have been breached.
              </p>
              <button
                onClick={onOpenPhishingInfo}
                className="underline text-purple-200 hover:text-white font-semibold whitespace-nowrap ml-1 cursor-pointer"
              >
                Find out how to protect yourself
              </button>
            </div>
            <button
              onClick={() => setShowPhishingBanner(false)}
              className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0 transition-colors"
              title="Dismiss notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-4 xl:gap-8 shrink-0">
            <button
              onClick={() => {
                setCurrentTab('home');
                closeAllMenus();
              }}
              className="flex items-center gap-2.5 group focus:outline-none cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#5925DC] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
                D
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1F104F] font-serif whitespace-nowrap">
                Dakarlaton
              </span>
            </button>

            {/* Desktop Mega Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm xl:text-[15px] font-semibold text-stone-700">
              {/* Job Seekers Dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setJobSeekersMenuOpen(!jobSeekersMenuOpen);
                    setContactMenuOpen(false);
                    setSpecialismsMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 py-2 px-1 hover:text-[#5925DC] transition-colors cursor-pointer whitespace-nowrap ${
                    jobSeekersMenuOpen || currentTab === 'jobs' ? 'text-[#5925DC]' : ''
                  }`}
                >
                  <span>Job seekers</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${jobSeekersMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {jobSeekersMenuOpen && (
                  <div
                    onMouseLeave={() => setJobSeekersMenuOpen(false)}
                    className="absolute left-0 top-full mt-2 w-[720px] bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-3 gap-6"
                  >
                    {/* Col 1 */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Find a job
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('jobs');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block"
                          >
                            Search for a job
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              if (onOpenSubmitCv) onOpenSubmitCv();
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block flex items-center gap-1.5"
                          >
                            Submit your CV
                            <span className="text-[10px] bg-purple-100 text-[#5925DC] font-bold px-1.5 py-0.5 rounded">Fast</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('about');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block"
                          >
                            Work for us at Dakarlaton
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 2 */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Career & Insights
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <button
                            onClick={() => {
                              if (onOpenSalaryTrends) onOpenSalaryTrends();
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block"
                          >
                            GCC 2026 Salary Guides
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              if (onOpenArticle) onOpenArticle('talent-trends-2026');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block"
                          >
                            Talent Trends Interactive Tool
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              if (onOpenArticle) onOpenArticle('career-tips-advice');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors cursor-pointer text-left block"
                          >
                            CV & Interview Advice
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Highlight Card */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#5925DC] text-white px-2 py-0.5 rounded-full">
                          Featured Report
                        </span>
                        <h5 className="font-bold text-stone-900 text-sm mt-2">
                          Global Talent Trends 2026
                        </h5>
                        <p className="text-xs text-stone-600 mt-1">
                          Why your company's talent advantage starts with clear answers to top talent's questions.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (onOpenSalaryTrends) onOpenSalaryTrends();
                          closeAllMenus();
                        }}
                        className="text-xs font-bold text-[#5925DC] hover:text-[#471cb3] flex items-center gap-1 mt-3 cursor-pointer"
                      >
                        Explore insights <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Specialisms & Portfolios Dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setSpecialismsMenuOpen(!specialismsMenuOpen);
                    setJobSeekersMenuOpen(false);
                    setContactMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 py-2 px-1 hover:text-[#5925DC] transition-colors cursor-pointer whitespace-nowrap ${
                    specialismsMenuOpen || currentTab === 'designers' ? 'text-[#5925DC]' : ''
                  }`}
                >
                  <span>Our specialisms</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${specialismsMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {specialismsMenuOpen && (
                  <div
                    onMouseLeave={() => setSpecialismsMenuOpen(false)}
                    className="absolute left-0 top-full mt-2 w-[480px] bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-2 gap-4"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                        Technical Disciplines
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('jobs');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            AutoCAD Draftsmen & 2D/3D
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('jobs');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            BIM & Revit Engineering
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('jobs');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            Civil & Structural Engineering
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                        Creative & Executive
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('designers');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            UI/UX & Product Designers
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('designers');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            Architectural 3D Visualizers
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentTab('about');
                              closeAllMenus();
                            }}
                            className="text-stone-800 hover:text-[#5925DC] font-medium transition-colors block text-left"
                          >
                            Executive Search & C-Suite
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Tab Links */}
              <button
                onClick={() => {
                  if (onOpenSalaryTrends) onOpenSalaryTrends();
                  closeAllMenus();
                }}
                className="py-2 px-1 hover:text-[#5925DC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Salary Guides
              </button>

              {/* Contact Dropdown */}
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setContactMenuOpen(!contactMenuOpen);
                    setJobSeekersMenuOpen(false);
                    setSpecialismsMenuOpen(false);
                  }}
                  className={`flex items-center gap-1 py-2 px-1 hover:text-[#5925DC] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    contactMenuOpen || currentTab === 'contact' ? 'text-[#5925DC]' : ''
                  }`}
                >
                  <span>Contact</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${contactMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {contactMenuOpen && (
                  <div
                    onMouseLeave={() => setContactMenuOpen(false)}
                    className="absolute left-0 top-full mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                        Get in Touch
                      </h4>
                      <p className="text-xs text-stone-600 mb-3">
                        We find the best talent. Let our specialist recruiters assist your career or organization.
                      </p>
                      <button
                        onClick={() => {
                          setCurrentTab('contact');
                          closeAllMenus();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-purple-50 text-stone-800 hover:text-[#5925DC] font-semibold text-xs text-left transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>Contact us</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTab('contact');
                          closeAllMenus();
                        }}
                        className="w-full mt-2 py-2 px-3 rounded-xl bg-stone-100 hover:bg-purple-50 text-stone-800 hover:text-[#5925DC] font-semibold text-xs text-left transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>Find our GCC offices</span>
                        <Building2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Candidate / Employer Toggle Pill */}
            {setUserTypeMode && (
              <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-full border border-stone-200 text-xs font-semibold shrink-0">
                <button
                  type="button"
                  onClick={() => setUserTypeMode('candidate')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    userTypeMode === 'candidate'
                      ? 'bg-white text-[#1F104F] shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  I'm a Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setUserTypeMode('employer')}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                    userTypeMode === 'employer'
                      ? 'bg-white text-[#1F104F] shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  I'm an Employer
                </button>
              </div>
            )}

            {/* Quick Scheduler & Listings Modal Trigger */}
            {onOpenManageListings && (
              <button
                type="button"
                onClick={onOpenManageListings}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-[#5925DC] border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer shrink-0 shadow-2xs"
                title="Manage Scheduled & Published Job Listings"
              >
                <Clock className="w-3.5 h-3.5 text-[#5925DC]" />
                <span>Listings & Schedule</span>
              </button>
            )}

            {/* Info Icon Button */}
            <button
              onClick={onOpenPhishingInfo}
              className="p-2 rounded-full text-stone-600 hover:text-[#5925DC] hover:bg-stone-100 transition-colors cursor-pointer hidden sm:flex items-center justify-center shrink-0"
              title="Security & Advisory Info"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Search Icon Button */}
            <button
              onClick={() => setCurrentTab('jobs')}
              className="p-2 rounded-full text-stone-600 hover:text-[#5925DC] hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
              title="Search Jobs"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Heart / Saved Jobs Button with Counter */}
            <button
              onClick={onOpenSavedModal}
              className="relative p-2 rounded-full text-stone-600 hover:text-rose-600 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
              title="Saved Jobs"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* User Account / Sign In */}
            {isAuthenticated && user ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-100 transition-colors focus:outline-none border border-stone-200 cursor-pointer shrink-0"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#5925DC] text-white font-semibold flex items-center justify-center text-sm">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-[#1C1917] hidden md:inline max-w-[100px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                </button>

                {/* Account Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-stone-100">
                      <div className="font-bold text-[#1C1917] text-sm truncate">{user.fullName}</div>
                      <div className="text-xs text-stone-500 truncate">{user.email}</div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 capitalize">
                          {user.role}
                        </span>
                        {user.emailVerified ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              onOpenVerify();
                            }}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1 cursor-pointer"
                          >
                            <AlertCircle className="w-3 h-3" /> Verify Email
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        {user.role === 'designer' ? 'My Portfolio & Profile' : 'Company Dashboard'}
                      </button>

                      {onOpenManageListings && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenManageListings();
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#5925DC] hover:bg-purple-50 flex items-center gap-2 cursor-pointer font-medium"
                        >
                          <Calendar className="w-4 h-4 text-[#5925DC]" />
                          Listings & Schedule Manager
                        </button>
                      )}

                      {!user.emailVerified && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenVerify();
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-amber-800 bg-amber-50/70 hover:bg-amber-100/70 flex items-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          Security & Email Verification
                        </button>
                      )}
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-2 rounded-full text-stone-600 hover:text-[#5925DC] hover:bg-stone-100 transition-colors cursor-pointer"
                title="Sign In / Register"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Post a Job / Hire Talent CTA Button */}
            <button
              onClick={onOpenPostJob}
              className="bg-[#5925DC] hover:bg-[#471cb3] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all duration-200 flex items-center gap-1.5 focus:outline-none cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Post a Job</span>
              <span className="sm:hidden">Post</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Bar */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-stone-200 text-xs font-semibold overflow-x-auto gap-1 px-1">
          <button
            onClick={() => setCurrentTab('home')}
            className={`min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#1F104F] text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('jobs')}
            className={`min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'jobs'
                ? 'bg-[#1F104F] text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Find Jobs
          </button>
          <button
            onClick={() => {
              if (onOpenSubmitCv) onOpenSubmitCv();
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap text-[#5925DC] bg-purple-50 font-bold cursor-pointer"
          >
            Submit CV
          </button>
          <button
            onClick={() => {
              if (onOpenSalaryTrends) onOpenSalaryTrends();
            }}
            className="min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap text-stone-600 hover:bg-stone-100 cursor-pointer"
          >
            Salary Guides
          </button>
          <button
            onClick={() => setCurrentTab('designers')}
            className={`min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'designers'
                ? 'bg-[#1F104F] text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Portfolios
          </button>
          <button
            onClick={() => setCurrentTab('contact')}
            className={`min-h-[40px] px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'contact'
                ? 'bg-[#1F104F] text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};
