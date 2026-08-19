import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, LogOut, CheckCircle2, AlertCircle, Plus, ShieldCheck, Palette } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'about' | 'jobs' | 'contact' | 'designers';
  setCurrentTab: (tab: 'home' | 'about' | 'jobs' | 'contact' | 'designers') => void;
  onOpenAuth: () => void;
  onOpenPostJob: () => void;
  onOpenProfile: () => void;
  onOpenVerify: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenPostJob,
  onOpenProfile,
  onOpenVerify
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE7DF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E25B38] flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="font-serif text-2xl font-bold text-[#1C1917] tracking-tight">
              Dakarlaton
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#57534E]">
            <button
              onClick={() => setCurrentTab('home')}
              className={`transition-colors relative py-1 ${
                currentTab === 'home'
                  ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E25B38]'
                  : 'hover:text-[#1C1917]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentTab('about')}
              className={`transition-colors relative py-1 ${
                currentTab === 'about'
                  ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E25B38]'
                  : 'hover:text-[#1C1917]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setCurrentTab('jobs')}
              className={`transition-colors relative py-1 ${
                currentTab === 'jobs'
                  ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E25B38]'
                  : 'hover:text-[#1C1917]'
              }`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => setCurrentTab('designers')}
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentTab === 'designers'
                  ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E25B38]'
                  : 'hover:text-[#1C1917]'
              }`}
            >
              <Palette className="w-4 h-4 text-[#E25B38]" />
              Portfolios
            </button>
            <button
              onClick={() => setCurrentTab('contact')}
              className={`transition-colors relative py-1 ${
                currentTab === 'contact'
                  ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E25B38]'
                  : 'hover:text-[#1C1917]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-stone-200/60 transition-colors focus:outline-none border border-stone-200"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#E25B38]/15 text-[#E25B38] font-semibold flex items-center justify-center text-sm">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#1C1917] hidden sm:inline max-w-[120px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                  {user.emailVerified ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 hidden sm:inline" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 hidden sm:inline" />
                  )}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-stone-100">
                      <div className="font-semibold text-[#1C1917] text-sm truncate">{user.fullName}</div>
                      <div className="text-xs text-stone-500 truncate">{user.email}</div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 capitalize">
                          {user.role}
                        </span>
                        {user.emailVerified ? (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              onOpenVerify();
                            }}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1 cursor-pointer"
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
                        className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        {user.role === 'designer' ? 'My Portfolio & Profile' : 'Company Profile'}
                      </button>

                      {!user.emailVerified && (
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onOpenVerify();
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-amber-800 bg-amber-50/70 hover:bg-amber-100/70 flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
                className="text-[15px] font-medium text-[#1C1917] hover:text-[#E25B38] transition-colors px-2 py-1"
              >
                Sign In
              </button>
            )}

            {/* Post a Job Button */}
            <button
              onClick={onOpenPostJob}
              className="bg-[#E25B38] hover:bg-[#c94929] text-white text-[15px] font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#E25B38]/40"
            >
              <Plus className="w-4 h-4" />
              Post a Job
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-[#EBE7DF] text-xs font-medium text-stone-600">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-2 py-1 ${currentTab === 'home' ? 'text-[#E25B38] font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`px-2 py-1 ${currentTab === 'about' ? 'text-[#E25B38] font-bold' : ''}`}
          >
            About
          </button>
          <button
            onClick={() => setCurrentTab('jobs')}
            className={`px-2 py-1 ${currentTab === 'jobs' ? 'text-[#E25B38] font-bold' : ''}`}
          >
            Find Jobs
          </button>
          <button
            onClick={() => setCurrentTab('designers')}
            className={`px-2 py-1 ${currentTab === 'designers' ? 'text-[#E25B38] font-bold' : ''}`}
          >
            Portfolios
          </button>
          <button
            onClick={() => setCurrentTab('contact')}
            className={`px-2 py-1 ${currentTab === 'contact' ? 'text-[#E25B38] font-bold' : ''}`}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};
