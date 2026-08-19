import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, Mail } from 'lucide-react';

interface EmailVerificationBannerProps {
  onOpenVerify: () => void;
}

export const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({ onOpenVerify }) => {
  const { user, lastVerificationCode } = useAuth();

  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div id="email-verification-banner" className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-b border-amber-500/30 text-amber-950 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <div className="w-6 h-6 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-amber-800" />
          </div>
          <span>
            <strong className="font-semibold text-amber-950">Email Verification Required:</strong> Please check your inbox (<span className="font-medium underline">{user.email}</span>) to activate all GCC employer & talent privileges.
            {lastVerificationCode && (
              <span className="ml-2 font-mono bg-amber-100/90 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300 font-semibold inline-block my-0.5">
                Code: {lastVerificationCode}
              </span>
            )}
          </span>
        </div>

        <button
          id="btn-banner-verify-now"
          onClick={onOpenVerify}
          className="inline-flex items-center gap-1.5 bg-[#E25B38] hover:bg-[#c94929] text-white font-semibold px-4 py-1.5 rounded-full text-xs shadow-xs transition-all shrink-0 cursor-pointer"
        >
          Check Inbox & Verify <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
