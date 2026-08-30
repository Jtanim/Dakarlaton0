import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  BellRing,
  Sparkles,
  Send,
  ShieldCheck,
  MapPin,
  Star,
  ArrowRight,
  Award,
  Lock,
  Globe,
  Briefcase,
  Users,
  Building2,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenPostJob: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
  onOpenSubmitCv?: () => void;
  onOpenSalaryTrends?: () => void;
  onOpenPhishingInfo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPostJob,
  onOpenLegal,
  onOpenSubmitCv,
  onOpenSalaryTrends,
  onOpenPhishingInfo
}) => {
  const { subscribeToAlerts } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    await subscribeToAlerts(email, 'GCC - All Categories');
    setLoading(false);
    setIsSubscribed(true);
  };

  const jobSectors = [
    'AutoCAD & 2D/3D Drafting',
    'BIM & Revit Architecture',
    'Civil & Structural Engineering',
    'UI/UX & Product Design',
    'Banking & Financial Services',
    'Construction & Property',
    'Executive & C-Suite Search',
    'Information Technology & Software',
    'Procurement & Supply Chain',
    'Marketing & Digital Strategy',
    'MEP & HVAC Engineering',
    'Human Resources & Talent'
  ];

  return (
    <footer className="w-full bg-[#160838] text-white">
      {/* 3 Pillars Action Cards Bar (as in video 00:28) */}
      <div className="bg-[#1F104F] py-14 border-t border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 text-stone-900 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#5925DC] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F104F]">
                  Talk to the people that know people
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Our team makes hiring easy. We'll connect you with the right talent to take your business forward across the GCC.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={onOpenPostJob}
                  className="w-full bg-[#5925DC] hover:bg-[#471cb3] text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Find talent <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 text-stone-900 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-800 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F104F]">
                  Find work that fits you
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  We're here to help you take the next step. Whatever it is you're looking for, we have the network to make it happen.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (onOpenSubmitCv) onOpenSubmitCv();
                  }}
                  className="w-full bg-[#5925DC] hover:bg-[#471cb3] text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Send us your CV <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 text-stone-900 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F104F]">
                  Work for us
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Join Dakarlaton and you'll be working for one of the most respected agencies in the industry. Grow your career with our specialist team.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => onNavigate('about')}
                  className="w-full bg-[#5925DC] hover:bg-[#471cb3] text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Apply now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Enterprise Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-900/50">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#5925DC] flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                Dakarlaton
              </span>
            </div>

            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-sm">
              The recruitment agency connecting you to what's next. Specialized talent placement across Saudi Arabia, UAE, Qatar, Oman, Bahrain and the GCC region.
            </p>

            {/* Google Rating Badge */}
            <div className="bg-white/5 border border-purple-800/60 rounded-2xl p-3.5 inline-flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">4.3 Google Rating</span>
                <span className="text-purple-300 text-[11px] block">Based on 1,200+ verified reviews</span>
              </div>
            </div>

            {/* Accreditations */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-purple-300">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-purple-800/40 flex items-center gap-1">
                <Award className="w-3 h-3 text-[#A3E635]" /> ISO 9001 Certified
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-purple-800/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#A3E635]" /> DIFC Registered
              </span>
            </div>
          </div>

          {/* Col 2: General */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              General
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-purple-100/80">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Dakarlaton
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Work for us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenSalaryTrends) onOpenSalaryTrends();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  2026 Salary Guides
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPhishingInfo}
                  className="text-amber-300 hover:text-amber-200 transition-colors text-left flex items-center gap-1"
                >
                  <Lock className="w-3 h-3" /> Scam Prevention
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Search for jobs by sector */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Search jobs by sector
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-purple-100/80">
              {jobSectors.slice(0, 7).map((sector) => (
                <button
                  key={sector}
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-white transition-colors text-left truncate py-0.5"
                >
                  {sector}
                </button>
              ))}
              <button
                onClick={() => onNavigate('jobs')}
                className="text-[#A3E635] hover:underline text-xs font-semibold pt-1 text-left"
              >
                View all 15+ specialisms →
              </button>
            </div>
          </div>

          {/* Col 4: Employer Centre & Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Employer Centre
            </h4>
            <ul className="space-y-2 text-xs text-purple-100/80">
              <li>
                <button onClick={onOpenPostJob} className="hover:text-white transition-colors text-left">
                  Bespoke Permanent Recruitment
                </button>
              </li>
              <li>
                <button onClick={onOpenPostJob} className="hover:text-white transition-colors text-left">
                  Fixed-Term Technical Contracting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  Executive Search
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  Enterprise Solutions (RPO)
                </button>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-white block mb-1.5">
                Market Intelligence Newsletter
              </span>
              {isSubscribed ? (
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/50 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email..."
                      className="w-full bg-white/10 border border-purple-800/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5925DC] hover:bg-[#471cb3] text-white py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Subscribing...' : 'Get GCC Talent Reports'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/70 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Dakarlaton. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Notice
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button
              onClick={onOpenPhishingInfo}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Security Advisory
            </button>
          </div>

          <div className="flex items-center gap-2 text-purple-300/80">
            <Globe className="w-3.5 h-3.5" />
            <span>Riyadh • Dubai • Doha • Manama • Muscat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
