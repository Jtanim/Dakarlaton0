import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import {
  RECRUITMENT_INSIGHTS,
  SPECIALIST_SERVICES,
  EXECUTIVE_SERVICES,
  ENTERPRISE_SERVICES,
  InsightArticle
} from '../data/mockData';
import { formatJobDateTime } from '../utils/dateUtils';
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Phone,
  BarChart3,
  FileText,
  DollarSign,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onSelectJob: (job: JobListing) => void;
  onOpenPostJob: () => void;
  onSearch: (keyword: string, location: string) => void;
  onOpenSubmitCv?: () => void;
  onOpenSalaryTrends?: () => void;
  onOpenArticle?: (article: InsightArticle) => void;
  onToggleSaveJob?: (job: JobListing) => void;
  savedJobIds?: string[];
  onOpenApplyModal?: (job: JobListing) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectJob,
  onOpenPostJob,
  onSearch,
  onOpenSubmitCv,
  onOpenSalaryTrends,
  onOpenArticle,
  onToggleSaveJob,
  savedJobIds = [],
  onOpenApplyModal
}) => {
  const { jobs } = useAuth();

  // Search input states
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  // Dropdown filter popover states
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

  // Featured job carousel index
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Service tab state
  const [serviceTab, setServiceTab] = useState<'specialist' | 'executive' | 'enterprise'>('specialist');

  const featuredJobs = jobs.filter((j) => j.featured).length > 0 ? jobs.filter((j) => j.featured) : jobs;
  const currentFeaturedJob = featuredJobs[featuredIndex % featuredJobs.length] || jobs[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
    onNavigate('jobs');
  };

  const handleQuickFilter = (type: string, val: string) => {
    if (type === 'industry' || type === 'function' || type === 'title') {
      onSearch(val, '');
    } else if (type === 'location') {
      onSearch('', val);
    }
    setActiveFilterDropdown(null);
    onNavigate('jobs');
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredJobs.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredJobs.length) % featuredJobs.length);
  };

  const currentServices =
    serviceTab === 'specialist'
      ? SPECIALIST_SERVICES
      : serviceTab === 'executive'
      ? EXECUTIVE_SERVICES
      : ENTERPRISE_SERVICES;

  return (
    <div className="w-full space-y-0 pb-0 font-sans text-stone-900 bg-[#FAF8F5]">
      {/* 1. Hero Section (Video 00:00 - 00:04) */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-sm font-semibold text-[#5925DC] block">
                Dakarlaton. The recruitment agency connecting you to what's next.
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-serif font-black tracking-tight text-[#1F104F] leading-[1.1]">
                We connect talent <br className="hidden sm:inline" />
                that makes a <br className="hidden sm:inline" />
                <span className="text-[#5925DC]">difference</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Specialized recruitment and career opportunities connecting top talent with leading enterprises across all industries in Saudi Arabia, the UAE, and the GCC.
              </p>

              {/* Dual Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="bg-[#5925DC] hover:bg-[#471cb3] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
                >
                  I want to find a job <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenPostJob}
                  className="bg-transparent hover:bg-purple-50 text-[#1F104F] border-2 border-[#5925DC]/40 text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  I want to hire talent
                </button>
              </div>
            </div>

            {/* Right Hero Visual with Cheerful Professional & Geometric Accents */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Playful Floating Geometric Accents */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#A3E635] -z-0 opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-3xl bg-[#5925DC]/20 -z-0 rotate-12" />
              <div className="absolute top-1/2 -right-8 w-12 h-12 rounded-full bg-[#FFF676] -z-0" />

              <div className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#1F104F]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Dakarlaton Professional"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="p-4 bg-[#1F104F] text-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#A3E635] uppercase tracking-wider">Top Talent Network</div>
                    <div className="text-sm font-semibold">GCC Verified Engineers & Designers</div>
                  </div>
                  <button
                    onClick={() => onNavigate('designers')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dark Navy Interactive Search Banner ("Your next move starts here") (Video 00:05 - 00:07) */}
      <section className="bg-[#160838] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-purple-900/40 relative z-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white text-center sm:text-left">
            Your next move starts here
          </h2>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-2xl"
          >
            {/* Input 1: Keywords */}
            <div className="flex items-center gap-3 px-5 py-2.5 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-stone-200">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skills, or industry..."
                className="w-full text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Input 2: Location */}
            <div className="flex items-center gap-3 px-5 py-2.5 w-full sm:w-2/5">
              <MapPin className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Region, postcode or city"
                className="w-full text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#5925DC] hover:bg-[#471cb3] text-white px-8 py-3.5 rounded-2xl sm:rounded-full font-semibold text-sm transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Filter Categories Accordion / Popovers (Video 00:06) */}
          <div className="relative flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-purple-200 border-t border-purple-900/50 pt-6">
            {/* 1. Industry */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveFilterDropdown(activeFilterDropdown === 'industry' ? null : 'industry')
                }
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>Browse jobs by industry</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeFilterDropdown === 'industry' && (
                <div
                  onMouseLeave={() => setActiveFilterDropdown(null)}
                  className="absolute left-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in duration-150 space-y-1"
                >
                  {['Engineering & Construction', 'Architecture & BIM', 'Technology & Digital', 'Banking & Finance', 'Oil & Gas / Energy'].map((ind) => (
                    <button
                      key={ind}
                      onClick={() => handleQuickFilter('industry', ind)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-purple-50 hover:text-[#5925DC] font-medium transition-colors"
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Job Function */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveFilterDropdown(activeFilterDropdown === 'function' ? null : 'function')
                }
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>Browse jobs by job function</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeFilterDropdown === 'function' && (
                <div
                  onMouseLeave={() => setActiveFilterDropdown(null)}
                  className="absolute left-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in duration-150 space-y-1"
                >
                  {['Drafting & CAD Modeling', 'BIM Coordination', 'UI/UX Product Design', 'Project Engineering', 'Executive Management'].map((fn) => (
                    <button
                      key={fn}
                      onClick={() => handleQuickFilter('function', fn)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-purple-50 hover:text-[#5925DC] font-medium transition-colors"
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Location */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveFilterDropdown(activeFilterDropdown === 'location' ? null : 'location')
                }
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>Browse by location</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeFilterDropdown === 'location' && (
                <div
                  onMouseLeave={() => setActiveFilterDropdown(null)}
                  className="absolute left-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in duration-150 space-y-1"
                >
                  {['Riyadh, Saudi Arabia', 'Dubai, UAE', 'Doha, Qatar', 'Muscat, Oman', 'Manama, Bahrain', 'Remote GCC'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleQuickFilter('location', loc)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-purple-50 hover:text-[#5925DC] font-medium transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Job Title */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveFilterDropdown(activeFilterDropdown === 'title' ? null : 'title')
                }
                className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>Browse by job title</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeFilterDropdown === 'title' && (
                <div
                  onMouseLeave={() => setActiveFilterDropdown(null)}
                  className="absolute right-0 top-full mt-2 w-64 bg-white text-stone-900 rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in duration-150 space-y-1"
                >
                  {['AutoCAD Draftsman', 'Senior BIM Specialist', 'Lead UI/UX Designer', 'Structural Engineer'].map((title) => (
                    <button
                      key={title}
                      onClick={() => handleQuickFilter('title', title)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-purple-50 hover:text-[#5925DC] font-medium transition-colors"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Role Carousel ("Find the work that works for you") (Video 00:07 - 00:08) */}
      {currentFeaturedJob && (
        <section className="bg-[#1F104F] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  Featured Spotlight
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  Find the work that works for you
                </h3>
              </div>

              {/* Carousel Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevFeatured}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous role"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextFeatured}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next role"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Featured Job Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 text-stone-900 shadow-2xl relative">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1F104F] text-white font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      Top Role
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#5925DC]">
                      {currentFeaturedJob.category}
                    </span>
                  </div>

                  <h4
                    onClick={() => {
                      onSelectJob(currentFeaturedJob);
                      onNavigate('jobs');
                    }}
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#1F104F] hover:text-[#5925DC] transition-colors cursor-pointer pt-1"
                  >
                    {currentFeaturedJob.title}
                  </h4>

                  <div className="text-sm font-semibold text-stone-700">
                    {currentFeaturedJob.company} • {currentFeaturedJob.location} ({currentFeaturedJob.type})
                  </div>
                </div>

                {/* Bookmark Heart Button */}
                <button
                  onClick={() => onToggleSaveJob && onToggleSaveJob(currentFeaturedJob)}
                  className="p-3 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                  title="Bookmark job"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      savedJobIds.includes(currentFeaturedJob.id)
                        ? 'fill-rose-500 text-rose-500'
                        : ''
                    }`}
                  />
                </button>
              </div>

              {/* Salary Breakdown Block (Video 00:08) */}
              <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Remuneration Package
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-[#1F104F]">
                    {currentFeaturedJob.salary}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectJob(currentFeaturedJob);
                      onNavigate('jobs');
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#1F104F] bg-stone-200 hover:bg-stone-300 transition-colors cursor-pointer"
                  >
                    View Role Details
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenApplyModal) {
                        onOpenApplyModal(currentFeaturedJob);
                      } else {
                        onSelectJob(currentFeaturedJob);
                        onNavigate('jobs');
                      }
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#5925DC] hover:bg-[#471cb3] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    I want to apply <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. "Our recruitment services and specialisms" (Video 00:09 - 00:12) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F]">
            Our recruitment services and specialisms
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            We work with organisations and professionals to connect what matters most, the right people to the right roles, supporting careers and businesses as they grow.
          </p>
        </div>

        {/* 3 Tabs: Specialist | Executive | Enterprise */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setServiceTab('specialist')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              serviceTab === 'specialist'
                ? 'bg-[#1F104F] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Specialist recruitment services
          </button>
          <button
            onClick={() => setServiceTab('executive')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              serviceTab === 'executive'
                ? 'bg-[#1F104F] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Executive search
          </button>
          <button
            onClick={() => setServiceTab('enterprise')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              serviceTab === 'enterprise'
                ? 'bg-[#1F104F] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Enterprise solutions
          </button>
        </div>

        {/* 3 Visual Cards with Photography and Purple Bottom Band */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentServices.map((serv) => (
            <div
              key={serv.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-bold text-[#5925DC] uppercase tracking-wider">
                    {serv.badge}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-[#1F104F]">
                    {serv.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {serv.description}
                  </p>
                </div>
              </div>

              {/* Purple bottom band with arrow */}
              <div
                onClick={() => onNavigate('contact')}
                className="bg-[#5925DC] group-hover:bg-[#471cb3] text-white px-6 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="text-xs font-semibold">Consult an expert</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Let's chat CTA */}
        <div className="pt-2 flex justify-start">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#1F104F] hover:bg-[#160838] text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
          >
            Let's chat <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. "Discover the trends shaping work today" (Video 00:13 - 00:15) */}
      <section className="bg-[#5925DC] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Tablet Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-lg bg-stone-900 rounded-3xl p-4 shadow-2xl border-4 border-purple-300/30">
                <div className="bg-white rounded-2xl p-6 text-stone-900 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[10px] font-bold text-[#5925DC] uppercase tracking-wider">
                      Dakarlaton Intelligence
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">Edition 2026</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-[#1F104F] leading-snug">
                    Global Talent Trends 2026
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Why your company's talent advantage starts with providing clear answers to top talent's most pressing questions about retention, AI augmentation, and compensation parity.
                  </p>
                  <div className="h-28 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                      alt="Talent Trends"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Copy & Lemon Button */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                Annual Report
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
                Discover the trends shaping work today
              </h3>
              <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                Explore comprehensive regional salary trajectories, demand shifts in BIM & AutoCAD drafting, and actionable insights to win top GCC talent.
              </p>
              <div>
                <button
                  onClick={() => {
                    if (onOpenSalaryTrends) onOpenSalaryTrends();
                  }}
                  className="bg-[#A3E635] hover:bg-[#84cc16] text-stone-950 text-sm sm:text-base font-bold px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  Explore the insights <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Why we make the difference at Dakarlaton" (Video 00:16 - 00:18) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5925DC]">
            Our Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F]">
            Why we make the difference at Dakarlaton
          </h2>
        </div>

        {/* Geometric Editorial Stat Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Big Stat Box */}
          <div className="md:col-span-5 bg-[#A3E635] text-stone-950 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-md">
            <div className="text-5xl sm:text-7xl font-black font-serif tracking-tight">
              98%
            </div>
            <div className="text-base sm:text-lg font-bold mt-6 leading-snug">
              of our candidates and partner employers would recommend working with Dakarlaton again.
            </div>
          </div>

          {/* Dark Purple Reputation Card */}
          <div className="md:col-span-7 bg-[#1F104F] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                GCC Leadership
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                Our reputation precedes us. Find out how we helped over 500 businesses hire last year.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200 mt-6 leading-relaxed">
              From Riyadh's giga-developments to Dubai's financial technology corridors, we place engineers, architects, and designers that transform projects.
            </p>
          </div>
        </div>

        {/* Testimonials with Verified Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-[#5925DC] font-bold flex items-center justify-center">
                SA
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Senior Talent Acquisition Officer</h4>
                <p className="text-xs text-stone-500">Tier-1 Contracting Consortium, Riyadh</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
              "Dakarlaton mobilised 12 certified BIM and AutoCAD modelers for our site within two weeks. The quality of pre-vetting is outstanding."
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-800 font-bold flex items-center justify-center">
                HR
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Senior HR & People Director</h4>
                <p className="text-xs text-stone-500">FinTech Venture Hub, Dubai DIFC</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
              "Their deep GCC salary benchmarks gave us clear guidance to price competitive packages for our senior UI/UX leads."
            </p>
          </div>
        </div>
      </section>

      {/* 7. "Salary. Know where you stand." (Video 00:19 - 00:21) */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5925DC]">
                Salary Intelligence
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#1F104F] leading-tight">
                Salary. Know where you stand.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                Pay matters. Our Salary Guides help you understand current ranges by role, experience level and location across Saudi Arabia, UAE, Qatar, Oman, Bahrain and Kuwait.
              </p>
              <div>
                <button
                  onClick={() => {
                    if (onOpenSalaryTrends) onOpenSalaryTrends();
                  }}
                  className="bg-[#5925DC] hover:bg-[#471cb3] text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
                >
                  Check out our 2026 Salary Guides <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Phone Mockup displaying Salary Guides */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-72 bg-stone-900 p-3 rounded-[40px] shadow-2xl border-4 border-stone-800">
                <div className="bg-[#FAF8F5] rounded-[32px] p-5 text-stone-900 space-y-4 overflow-hidden">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-bold text-[#5925DC] uppercase tracking-wider">
                      Dakarlaton Benchmarks
                    </span>
                    <h5 className="font-bold text-sm text-[#1F104F]">2026 Salary Guide</h5>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-semibold uppercase">AutoCAD Draftsman</span>
                    <div className="text-sm font-bold text-[#5925DC]">SAR 8,500 - 15,500 / mo</div>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-semibold uppercase">BIM / Revit Modeler</span>
                    <div className="text-sm font-bold text-[#5925DC]">SAR 12,500 - 19,500 / mo</div>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 space-y-1 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-semibold uppercase">Senior UI/UX Lead</span>
                    <div className="text-sm font-bold text-[#5925DC]">AED 24,000 / mo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. "How can we help?" Dual Banner (Video 00:22 - 00:23) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-[#1F104F] text-white min-h-[340px] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80"
            alt="Collaborative workspace"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10 p-8 sm:p-14 max-w-2xl space-y-6">
            <h3 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
              How can we help?
            </h3>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
              Whether you are searching for your next senior role or mobilizing a specialized project squad, our consultants are ready.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('jobs')}
                className="bg-white hover:bg-stone-100 text-[#1F104F] font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                I'm job hunting
              </button>
              <button
                onClick={onOpenPostJob}
                className="bg-[#5925DC] hover:bg-[#471cb3] text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                I'm hiring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. "Recruitment insights from our experts" (Video 00:24 - 00:27) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5925DC]">
              Expert Commentary
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F]">
              Recruitment insights from our experts
            </h2>
          </div>
          <button
            onClick={() => {
              if (onOpenSalaryTrends) onOpenSalaryTrends();
            }}
            className="text-xs sm:text-sm font-semibold text-[#5925DC] hover:text-[#471cb3] flex items-center gap-1 cursor-pointer"
          >
            Explore all intelligence <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Insight Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECRUITMENT_INSIGHTS.map((art) => {
            if (art.isSpecialCard) {
              return (
                <div
                  key={art.id}
                  onClick={() => onOpenArticle && onOpenArticle(art)}
                  className="bg-[#5925DC] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-white inline-block">
                      Career Tips
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-6">
                    <button className="bg-white text-[#5925DC] font-bold px-6 py-2.5 rounded-full text-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                      Read our career tips <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={art.id}
                onClick={() => onOpenArticle && onOpenArticle(art)}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="font-bold text-[#5925DC] uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#1F104F] group-hover:text-[#5925DC] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#5925DC]">
                  <span>Read report</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
