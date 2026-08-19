import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EmailVerificationBannerProps {
  onOpenVerify: () => void;
}

export const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({ onOpenVerify }) => {
  const { user, lastVerificationCode } = useAuth();

  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-950 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong className="font-semibold text-amber-900">Email Verification Required:</strong> Please verify your email ({user.email}) to unlock full job posting & portfolio features.
            {lastVerificationCode && (
              <span className="ml-2 font-mono bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                Code: {lastVerificationCode}
              </span>
            )}
          </span>
        </div>

        <button
          onClick={onOpenVerify}
          className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white font-medium px-3.5 py-1 rounded-full text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          Verify Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
