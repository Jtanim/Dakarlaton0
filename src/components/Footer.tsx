import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenPostJob: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPostJob }) => {
  return (
    <footer className="bg-white border-t border-[#EBE7DF] pt-16 pb-12 mt-20 text-[#57534E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EBE7DF]">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E25B38] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                D
              </div>
              <span className="font-serif text-2xl font-bold text-[#1C1917] tracking-tight">
                Dakarlaton
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#78716C] max-w-sm">
              Connecting ambition with opportunity. Find the job you were meant to do.
            </p>
          </div>

          {/* Column 1: Seekers */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-[#1C1917]">Seekers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Browse Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('designers')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Designer Portfolios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  How it works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Get support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Employers */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-[#1C1917]">Employers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenPostJob}
                  className="hover:text-[#E25B38] transition-colors font-medium text-[#E25B38]"
                >
                  Post a Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Why Dakarlaton
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('designers')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Hire Freelance Talent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-[#1C1917]">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#E25B38] transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <span className="text-stone-400 cursor-not-allowed">Privacy</span>
              </li>
              <li>
                <span className="text-stone-400 cursor-not-allowed">Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Dakarlaton. All rights reserved.</p>
          <p className="font-medium text-stone-600">Built for ambition.</p>
        </div>
      </div>
    </footer>
  );
};
