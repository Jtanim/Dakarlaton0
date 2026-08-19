import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import {
  Search,
  MapPin,
  Filter,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  CheckCircle2,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface FindJobsPageProps {
  selectedJob: JobListing | null;
  onSelectJob: (job: JobListing) => void;
  onOpenApply: (job: JobListing) => void;
  onOpenPostJob: () => void;
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  initialKeyword?: string;
  initialLocation?: string;
}

export const FindJobsPage: React.FC<FindJobsPageProps> = ({
  selectedJob,
  onSelectJob,
  onOpenApply,
  onOpenPostJob,
  onNavigate,
  initialKeyword = '',
  initialLocation = ''
}) => {
  const { jobs } = useAuth();

  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase())) ||
        job.description.toLowerCase().includes(keyword.toLowerCase());

      const matchLocation =
        !location ||
        job.location.toLowerCase().includes(location.toLowerCase()) ||
        (location.toLowerCase() === 'remote' && job.workplaceType === 'Remote');

      const matchCategory =
        selectedCategory === 'All' ||
        job.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchType =
        selectedType === 'All' ||
        job.type.toLowerCase() === selectedType.toLowerCase();

      const matchWorkplace =
        selectedWorkplace === 'All' ||
        job.workplaceType.toLowerCase() === selectedWorkplace.toLowerCase();

      return matchKeyword && matchLocation && matchCategory && matchType && matchWorkplace;
    });
  }, [jobs, keyword, location, selectedCategory, selectedType, selectedWorkplace]);

  const activeJob = selectedJob || filteredJobs[0] || null;

  const toggleSaveJob = (id: string) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((j) => j !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Section */}
      <section className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block mb-1">
            Job listings
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight mb-3">
            Find your next opportunity
          </h1>
          <p className="text-sm sm:text-base text-[#57534E]">
            Browse thousands of roles across every industry. Filter by category, location, or type to find the perfect fit.
          </p>
        </div>

        {/* Search & Filter Bar (Matching Video 00:18) */}
        <div className="bg-white p-3 rounded-2xl sm:rounded-full shadow-sm border border-[#EBE7DF] flex flex-col sm:flex-row items-center gap-2 mb-4">
          <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-stone-200">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, keyword, or company"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full text-sm text-[#1C1917] placeholder-stone-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-2/5">
            <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="City or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm text-[#1C1917] placeholder-stone-400 focus:outline-none bg-transparent"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              showFilters || selectedCategory !== 'All' || selectedType !== 'All'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>

        {/* Expandable Filters Drawer */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-5 border border-[#EBE7DF] shadow-sm mb-6 space-y-4 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                >
                  <option value="All">All Categories</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Architecture & 3D">Architecture & 3D</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Content">Content</option>
                  <option value="Data">Data</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Job Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                >
                  <option value="All">All Types</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Workplace</label>
                <select
                  value={selectedWorkplace}
                  onChange={(e) => setSelectedWorkplace(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                >
                  <option value="All">All Workplaces</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSelectedWorkplace('All');
                  setKeyword('');
                  setLocation('');
                }}
                className="text-xs text-stone-500 hover:text-stone-800 font-medium underline"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Main 2-Column Split Layout (Matching Video 00:19 - 00:24) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold text-stone-500 mb-4">
          <span className="text-[#1C1917] font-bold">{filteredJobs.length}</span> roles found
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Job List */}
          <div className="lg:col-span-5 space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                const isSelected = activeJob?.id === job.id;
                return (
                  <div
                    key={job.id}
                    onClick={() => onSelectJob(job)}
                    className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#E25B38] ring-1 ring-[#E25B38] shadow-md'
                        : 'border-[#EBE7DF] hover:border-stone-400 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#E25B38]">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" /> {job.postedAt}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1C1917] mb-1">
                      {job.title}
                    </h3>
                    <p className="text-xs font-medium text-stone-600 mb-3">
                      {job.company}
                    </p>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {job.location}
                      </span>
                      <span className="font-semibold text-stone-800">
                        {job.salary}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-stone-300">
                <Briefcase className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-700">No jobs match your search</p>
                <p className="text-xs text-stone-500 mt-1">Try resetting filters or searching with different keywords.</p>
              </div>
            )}
          </div>

          {/* Right Column: Selected Job Details (Matching Video 00:20) */}
          <div className="lg:col-span-7 sticky top-28">
            {activeJob ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE7DF] shadow-md space-y-6">
                {/* Header */}
                <div className="border-b border-stone-100 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#E25B38]">
                      {activeJob.category}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Posted {activeJob.postedAt}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-2">
                    {activeJob.title}
                  </h2>

                  <p className="text-base font-semibold text-stone-700 mb-4">
                    {activeJob.company}
                  </p>

                  {/* Meta Items with radio-style icons matching video */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E25B38]" />
                      {activeJob.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E25B38]" />
                      {activeJob.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E25B38]" />
                      {activeJob.salary}
                    </span>
                  </div>
                </div>

                {/* About this role */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                    About this role
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {activeJob.aboutRole || activeJob.description}
                  </p>
                </div>

                {/* Responsibilities */}
                {activeJob.responsibilities && activeJob.responsibilities.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                      Responsibilities
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                      {activeJob.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#E25B38] font-bold text-xs mt-0.5">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {activeJob.requirements && activeJob.requirements.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider">
                      Requirements & Skills
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                      {activeJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-[#E25B38] font-bold text-xs mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills tags */}
                {activeJob.tags && activeJob.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeJob.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons (Matching Video 00:21) */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenApply(activeJob)}
                      className="bg-[#E25B38] hover:bg-[#c94929] text-white px-8 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                      Apply now
                    </button>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-6 py-3 rounded-full font-medium text-sm transition-all cursor-pointer"
                    >
                      Ask a question
                    </button>
                    <button
                      onClick={() => toggleSaveJob(activeJob.id)}
                      className={`p-3 rounded-full border transition-colors cursor-pointer ${
                        savedJobIds.includes(activeJob.id)
                          ? 'border-[#E25B38] text-[#E25B38] bg-orange-50'
                          : 'border-stone-300 text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full border border-stone-300 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer relative"
                    >
                      <Share2 className="w-4 h-4" />
                      {copySuccess && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                          Link copied!
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 italic">
                    You'll be connected with our team to complete your application.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <p className="text-stone-500 text-sm">Select a job from the list to view full specifications.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Don't see the right role? Bottom Callout (Matching Video 00:25) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-12">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
          Don't see the right role?
        </h3>
        <p className="text-sm text-[#57534E] max-w-lg mx-auto">
          New jobs are added every day. Set up your profile and we'll match you when something fits.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#E25B38] hover:bg-[#c94929] text-white px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            Get in touch
          </button>
          <button
            onClick={onOpenPostJob}
            className="bg-white hover:bg-stone-50 text-[#1C1917] border border-stone-300 px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            Post a job instead
          </button>
        </div>
      </section>
    </div>
  );
};
