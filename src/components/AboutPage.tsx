import React from 'react';
import { STATS, VALUES } from '../data/mockData';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenPostJob: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPostJob }) => {
  return (
    <div className="space-y-20 pb-12">
      {/* Hero Header */}
      <section className="pt-12 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5925DC]/10 text-[#5925DC] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" /> About Dakarlaton
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1F104F] tracking-tight leading-[1.15] mb-6">
          Connecting Ambition <br className="hidden sm:inline" />
          <span className="text-[#5925DC]">with Opportunity</span>
        </h1>

        <p className="text-base sm:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed mb-10">
          Dakarlaton is where careers take off and great companies find the talent they need to grow. We're building the future of work — one connection at a time.
        </p>

        {/* Hero Banner Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 max-w-4xl mx-auto h-[260px] sm:h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=80"
            alt="Dakarlaton Team and Community"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-[#5925DC] uppercase tracking-wider block">
              Our mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F] leading-tight">
              We believe everyone deserves a career they love
            </h2>
            <p className="text-base text-[#57534E] leading-relaxed">
              Dakarlaton was founded on a simple but powerful idea: finding the right job — or the right person — shouldn't be hard. Too many talented people are stuck in the wrong roles, and too many great companies can't find the talent they need to grow.
            </p>
            <p className="text-base text-[#57534E] leading-relaxed">
              We built Dakarlaton to change that. Our platform brings together ambitious job seekers and forward-thinking employers in one warm, human-centered space — making every connection feel personal, not transactional.
            </p>

            {/* Pull Quote */}
            <div className="border-l-4 border-[#5925DC] pl-5 py-2">
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#1F104F]">
                "The right connection changes everything."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 h-80 sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Creative designer at work"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1F104F] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-purple-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#A3E635]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Drives Us / Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#5925DC] uppercase tracking-wider block mb-1">
            What drives us
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F]">
            Our values shape every decision we make
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((val) => (
            <div
              key={val.number}
              className="bg-white p-8 rounded-3xl border border-[#EBE7DF] shadow-xs space-y-4 hover:border-[#5925DC]/40 transition-all"
            >
              <span className="text-4xl font-serif font-bold text-[#5925DC]/30 block">
                {val.number}
              </span>
              <h3 className="text-xl font-bold text-[#1F104F]">
                {val.title}
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Start Your Journey Today Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="rounded-3xl overflow-hidden shadow-md border border-stone-200 h-48 sm:h-64 mb-8">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80"
            alt="Office collaboration"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1F104F]">
          Start Your Journey Today
        </h2>
        <p className="text-sm sm:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed">
          Whether you're looking for your dream job or your next great hire, Dakarlaton is ready when you are.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('jobs')}
            className="bg-[#5925DC] hover:bg-[#471cb3] text-white px-8 py-3 rounded-full font-medium text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            Find Jobs
          </button>
          <button
            onClick={onOpenPostJob}
            className="bg-white hover:bg-stone-50 text-[#1F104F] border border-stone-300 font-medium px-8 py-3 rounded-full text-sm transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            Post a Job
          </button>
        </div>
      </section>
    </div>
  );
};
