import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, CheckCircle2, AlertCircle, RefreshCw, X, Sparkles } from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ isOpen, onClose }) => {
  const { user, lastVerificationCode, confirmEmailVerification, sendVerificationEmail } = useAuth();
  const [code, setCode] = useState(lastVerificationCode || '');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  if (!isOpen || !user) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    const result = await confirmEmailVerification(code);
    setIsVerifying(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    } else {
      setError(result.error || 'Invalid verification code');
    }
  };

  const handleResend = async () => {
    setResendStatus('Sending new code...');
    const result = await sendVerificationEmail();
    if (result.success) {
      setCode(result.code);
      setResendStatus(`New 6-digit code sent: ${result.code}`);
      setTimeout(() => setResendStatus(''), 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Email Verified!</h3>
            <p className="text-sm text-stone-600">
              Your account is now fully verified with high-trust security status.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917]">Verify Your Email</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                We sent a secure verification code to <span className="font-semibold text-stone-900">{user.email}</span>.
              </p>
            </div>

            {/* Simulated Inbox helper box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1.5 text-stone-700">
                  <Mail className="w-3.5 h-3.5 text-[#E25B38]" /> Verification Inbox Simulator
                </span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Live
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Your instant verification code is:
              </p>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-stone-200">
                <span className="font-mono text-lg font-bold tracking-widest text-[#E25B38]">
                  {lastVerificationCode || '948216'}
                </span>
                <button
                  type="button"
                  onClick={() => setCode(lastVerificationCode || '948216')}
                  className="text-xs font-medium text-stone-600 hover:text-[#E25B38] underline cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. 948216"
                  className="w-full text-center tracking-[0.4em] font-mono text-2xl py-3 px-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  required
                />
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {resendStatus && (
                <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  {resendStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#E25B38] hover:bg-[#c94929] text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Confirm & Secure Account
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Resend verification email
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
