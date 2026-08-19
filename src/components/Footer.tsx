import React, { useState } from 'react';
import { Mail, CheckCircle2, BellRing, Sparkles, Send, ShieldCheck, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FooterProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenPostJob: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPostJob, onOpenLegal }) => {
  const { subscribeToAlerts } = useAuth();
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('All');
  const [region, setRegion] = useState('GCC');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    await subscribeToAlerts(email, `${region} - ${category}`);
    setLoading(false);
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-white border-t border-[#EBE7DF] pt-14 pb-12 mt-20 text-[#57534E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Job Alert Subscription Banner */}
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#EBE7DF] mb-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Subscription Copy */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E25B38]/10 text-[#E25B38] text-xs font-semibold uppercase tracking-wider">
                <BellRing className="w-3.5 h-3.5" /> Job Alerts & Rate Insights
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
                Get new design, CAD & tech jobs delivered to your inbox
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-lg leading-relaxed">
                Receive instant curated notifications for verified openings across Saudi Arabia, UAE, Qatar, Oman, Bahrain & remote opportunities. No spam, unsubscribe anytime.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2 animate-in fade-in duration-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-base">You're on the list!</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    We've registered <span className="font-semibold">{email}</span> for <span className="font-semibold">{category}</span> alerts in <span className="font-semibold">{region}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }}
                    className="text-[11px] text-emerald-800 underline hover:text-emerald-950 font-medium cursor-pointer pt-1"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                        Domain
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                      >
                        <option value="All">All Disciplines</option>
                        <option value="Engineering & CAD">Engineering & AutoCAD</option>
                        <option value="BIM & Revit">BIM & Revit</option>
                        <option value="Architecture & 3D">Architecture & 3D Vis</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                        <option value="Tech & Web Development">Tech & Web Development</option>
                        <option value="Marketing & Content">Marketing & Content</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                        Region
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                      >
                        <option value="GCC">All GCC Countries</option>
                        <option value="Saudi Arabia">Saudi Arabia (KSA)</option>
                        <option value="UAE">United Arab Emirates (UAE)</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Oman">Oman</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Remote">Worldwide Remote</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#E25B38]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E25B38] hover:bg-[#c94929] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        'Subscribing...'
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Subscribe
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Your privacy is protected. One-click unsubscribe anytime.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-[#EBE7DF]">
          {/* Brand Info */}
          <div className="sm:col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E25B38] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                D
              </div>
              <span className="font-serif text-2xl font-bold text-[#1C1917] tracking-tight">
                Dakarlaton
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[#78716C] max-w-sm">
              Connecting ambition with opportunity across Saudi Arabia, UAE, Qatar, Oman, Bahrain and the GCC. Find the job you were meant to do.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-[#E25B38]" />
              <span>GCC Regional Hub • Riyadh & Dubai</span>
            </div>
          </div>

          {/* Column 1: Seekers */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Seekers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Browse Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('designers')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Designer Portfolios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Get support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Employers */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Employers
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenPostJob}
                  className="hover:text-[#E25B38] transition-colors font-semibold text-[#E25B38] py-1 cursor-pointer"
                >
                  Post a Job Directly
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Why Dakarlaton
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('designers')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Hire Freelance Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Contact Talent Team
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal && onOpenLegal('privacy')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal && onOpenLegal('terms')}
                  className="hover:text-[#E25B38] transition-colors py-1 cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 border-t border-stone-100 mt-6">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 Dakarlaton (dakarlaton.com). All rights reserved.</p>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="hover:text-[#E25B38] transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-[#E25B38] transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
          <p className="font-medium text-stone-600">Built for ambition in the GCC.</p>
        </div>
      </div>
    </footer>
  );
};
