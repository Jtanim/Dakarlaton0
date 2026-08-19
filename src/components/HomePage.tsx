import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JobListing } from '../types';
import { CATEGORIES, STATS, TESTIMONIALS } from '../data/mockData';
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  Check,
  Palette,
  TrendingUp,
  Code,
  Settings,
  FileText,
  BarChart3,
  DollarSign,
  Users,
  HeartHandshake,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onSelectJob: (job: JobListing) => void;
  onOpenPostJob: () => void;
  onSearch: (keyword: string, location: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectJob,
  onOpenPostJob,
  onSearch
}) => {
  const { jobs } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
    onNavigate('jobs');
  };

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Design': return <Palette className="w-5 h-5" />;
      case 'Marketing': return <TrendingUp className="w-5 h-5" />;
      case 'Engineering': return <Code className="w-5 h-5" />;
      case 'Operations': return <Settings className="w-5 h-5" />;
      case 'Content': return <FileText className="w-5 h-5" />;
      case 'Data': return <BarChart3 className="w-5 h-5" />;
      case 'Finance': return <DollarSign className="w-5 h-5" />;
      case 'Sales': return <Users className="w-5 h-5" />;
      default: return <HeartHandshake className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E25B38]/10 text-[#E25B38] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Welcome to Dakarlaton
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15] mb-6">
          Find the Job You <br className="hidden sm:inline" />
          <span className="text-[#1C1917]">Were Meant to Do</span>
        </h1>

        <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed mb-10">
          Dakarlaton connects ambitious people with companies that are ready to grow. Browse thousands of roles or post your next great hire — all in one warm, human-centered platform.
        </p>

        {/* Search Bar matching video */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-lg border border-[#EBE7DF] max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2 mb-12"
        >
          <div className="flex items-center gap-3 px-4 py-2 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-stone-200">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title, skill, or company"
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
            type="submit"
            className="w-full sm:w-auto bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-3 rounded-xl sm:rounded-full font-medium text-sm transition-all shadow-xs hover:shadow whitespace-nowrap cursor-pointer"
          >
            Search Jobs
          </button>
        </form>

        {/* Hero image banner */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 max-w-4xl mx-auto h-[260px] sm:h-[380px] relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80"
            alt="Collaborative creative team"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* Stats Bar (Orange Banner from Video) */}
      <section className="bg-[#E25B38] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block mb-1">
              Featured opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
              Roles worth getting excited about
            </h2>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E25B38] hover:text-[#c94929] group self-start sm:self-auto cursor-pointer"
          >
            View all jobs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 6).map((job) => (
            <div
              key={job.id}
              onClick={() => {
                onSelectJob(job);
                onNavigate('jobs');
              }}
              className="bg-white rounded-2xl p-6 border border-[#EBE7DF] hover:border-[#E25B38]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#E25B38]">
                    {job.category}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1C1917] group-hover:text-[#E25B38] transition-colors leading-snug">
                  {job.title}
                </h3>

                <p className="text-sm font-medium text-stone-700">
                  {job.company}
                </p>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {job.location}
                </span>
                <span className="font-semibold text-stone-800">
                  {job.salary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block mb-1">
            Explore by category
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
            Every career path, covered
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSearch(cat.name, '');
                onNavigate('jobs');
              }}
              className="bg-white rounded-2xl p-5 border border-[#EBE7DF] hover:border-[#E25B38] hover:shadow-sm transition-all cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#E25B38] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.name)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1C1917] group-hover:text-[#E25B38] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-stone-500 font-medium">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For Job Seekers / Freelance Designers (Section from Video 00:12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F4EE] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-stone-200 h-72 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
              alt="Designer with portfolio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block">
              For job seekers & freelance designers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] leading-tight">
              Your next chapter is one click away
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              Set your preferences, showcase your case studies with verified portfolios, and apply with confidence. Dakarlaton puts the best design and tech opportunities right in front of you.
            </p>

            <ul className="space-y-3 text-sm text-[#1C1917]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Smart matching based on your skills, style, and goals</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Thousands of verified, up-to-date listings with honest compensation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>One-click apply with your Dakarlaton portfolio showcase</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('jobs')}
                className="bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-3 rounded-full font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Find jobs now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers (Section from Video 00:13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F4EE] rounded-3xl p-8 sm:p-12 border border-[#EBE7DF] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <span className="text-xs font-semibold text-[#E25B38] uppercase tracking-wider block">
              For employers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] leading-tight">
              Hire people who are ready to grow
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              Post your roles to a motivated, diverse talent pool. Our smart matching surfaces the right candidates fast — so you spend less time searching and more time building.
            </p>

            <ul className="space-y-3 text-sm text-[#1C1917]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Reach 50,000+ active, qualified candidates worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Smart filtering to surface the best fits fast with live portfolio reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E25B38]/15 text-[#E25B38] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Simple dashboard to manage and review all your postings securely</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenPostJob}
                className="bg-[#E25B38] hover:bg-[#c94929] text-white px-7 py-3 rounded-full font-medium text-sm shadow-sm hover:shadow transition-all cursor-pointer"
              >
                Post a job
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-stone-200 h-72 sm:h-96 order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
              alt="Hiring manager at desk"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Banner (Video 00:14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-[#EBE7DF] space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">{t.name}</h4>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Orange Bottom CTA Banner (Video 00:15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E25B38] text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Ready to Make Your Move?
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you're chasing a new career or building a great team, Dakarlaton is where it starts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('jobs')}
              className="bg-white text-[#1C1917] hover:bg-stone-100 font-medium px-8 py-3 rounded-full text-sm transition-all shadow-sm cursor-pointer"
            >
              Browse Jobs
            </button>
            <button
              onClick={onOpenPostJob}
              className="bg-transparent hover:bg-white/10 text-white border border-white/40 font-medium px-8 py-3 rounded-full text-sm transition-all cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
