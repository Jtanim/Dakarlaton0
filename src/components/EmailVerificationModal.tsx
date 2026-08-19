import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
  Inbox,
  ArrowRight,
  Sparkles,
  KeyRound,
  Check
} from 'lucide-react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ isOpen, onClose }) => {
  const {
    user,
    lastVerificationCode,
    lastVerificationToken,
    confirmEmailVerification,
    sendVerificationEmail,
    checkEmailVerificationStatus
  } = useAuth();

  const [code, setCode] = useState(lastVerificationCode || '');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingInbox, setIsCheckingInbox] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [showSimulatedEmail, setShowSimulatedEmail] = useState(true);

  // Sync latest verification code
  useEffect(() => {
    if (lastVerificationCode) {
      setCode(lastVerificationCode);
    }
  }, [lastVerificationCode]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  if (!isOpen || !user) return null;

  const emailDomain = user.email ? user.email.split('@')[1]?.toLowerCase() : '';

  // Generate deep links to user email providers
  const getInboxLinks = () => {
    if (emailDomain.includes('gmail') || emailDomain.includes('google')) {
      return {
        name: 'Gmail',
        url: `https://mail.google.com/mail/u/0/#search/from%3Adakarlaton+OR+verify`,
        badgeColor: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      };
    }
    if (emailDomain.includes('outlook') || emailDomain.includes('hotmail') || emailDomain.includes('live') || emailDomain.includes('msn')) {
      return {
        name: 'Outlook / Hotmail',
        url: 'https://outlook.live.com/mail/0/inbox',
        badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      };
    }
    if (emailDomain.includes('yahoo')) {
      return {
        name: 'Yahoo Mail',
        url: 'https://mail.yahoo.com',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
      };
    }
    if (emailDomain.includes('icloud') || emailDomain.includes('me.com') || emailDomain.includes('mac.com')) {
      return {
        name: 'iCloud Mail',
        url: 'https://www.icloud.com/mail',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
      };
    }
    return {
      name: 'Open Email Inbox',
      url: `mailto:${user.email}`,
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
    };
  };

  const primaryInbox = getInboxLinks();

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsVerifying(true);

    const result = await confirmEmailVerification(code);
    setIsVerifying(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    } else {
      setError(result.error || 'Invalid verification code');
    }
  };

  const handleVerifyViaInboxLink = async () => {
    setError('');
    setIsVerifying(true);
    const tokenOrCode = lastVerificationToken || lastVerificationCode || '849201';
    const result = await confirmEmailVerification(tokenOrCode);
    setIsVerifying(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    } else {
      setError(result.error || 'Could not verify link. Please try entering the 6-digit code.');
    }
  };

  const handleCheckInboxStatus = async () => {
    setIsCheckingInbox(true);
    setError('');
    const status = await checkEmailVerificationStatus();
    setIsCheckingInbox(false);

    if (status.verified) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    } else {
      setResendStatus('Checked inbox status: Verification is still pending. You can click the verification link in your inbox or use the 6-digit code below.');
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResendStatus('Dispatching fresh verification email...');
    const result = await sendVerificationEmail();
    if (result.success) {
      setCode(result.code);
      setCooldown(45);
      setResendStatus(`Verification email resent! Your new 6-digit code is ${result.code}`);
    }
  };

  return (
    <div id="email-verification-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div id="email-verification-modal-card" className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-verification-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-18 h-18 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-serif">Email Verified Successfully!</h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Your account <span className="font-semibold text-stone-900">{user.email}</span> is now fully verified with high-trust GCC designer & employer privileges.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-13 h-13 bg-[#E25B38]/10 text-[#E25B38] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-800">
                <ShieldCheck className="w-3.5 h-3.5" /> Action Required: Verify Email Address
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917] font-serif">Check Your Inbox</h3>
              <p className="text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                We sent a secure verification email to{' '}
                <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md break-all">
                  {user.email}
                </span>
              </p>
            </div>

            {/* Direct Inbox Launch Buttons */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
              <div className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                <span>1-Click Inbox Shortcuts:</span>
                <span className="text-[11px] text-stone-500">Opens in new tab</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  id="link-open-primary-inbox"
                  href={primaryInbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-xs ${primaryInbox.badgeColor}`}
                >
                  <Inbox className="w-4 h-4" />
                  <span>Open {primaryInbox.name}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
                <a
                  id="link-open-webmail"
                  href={`https://${emailDomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Webmail</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Simulated Live Inbox Email View */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-stone-100 px-4 py-2.5 flex items-center justify-between border-b border-stone-200 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-semibold text-stone-800">Incoming Message from Dakarlaton</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSimulatedEmail(!showSimulatedEmail)}
                  className="text-stone-500 hover:text-stone-800 text-[11px] font-medium underline cursor-pointer"
                >
                  {showSimulatedEmail ? 'Hide preview' : 'Show preview'}
                </button>
              </div>

              {showSimulatedEmail && (
                <div className="p-4 bg-white space-y-3.5 text-xs">
                  <div className="flex justify-between items-start pb-2 border-b border-stone-100">
                    <div>
                      <div className="font-semibold text-stone-900">Dakarlaton Security & Team</div>
                      <div className="text-[11px] text-stone-400">security@dakarlaton.com</div>
                    </div>
                    <div className="text-[11px] text-stone-400">Just now</div>
                  </div>

                  <p className="text-stone-700 leading-relaxed">
                    Hello <span className="font-medium text-stone-900">{user.fullName || 'Member'}</span>, please verify your email address to activate your Dakarlaton GCC account and start applying or hiring designers.
                  </p>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">Your 6-Digit Code</div>
                      <div className="font-mono text-lg font-bold text-[#E25B38] tracking-widest">
                        {lastVerificationCode || '849201'}
                      </div>
                    </div>
                    <button
                      id="btn-autofill-verification-code"
                      type="button"
                      onClick={() => setCode(lastVerificationCode || '849201')}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-semibold text-stone-800 flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E25B38]" /> Auto-Fill Code
                    </button>
                  </div>

                  {/* Simulated "Verify in Browser" Clickable Link */}
                  <div className="pt-1">
                    <button
                      id="btn-simulated-inbox-link"
                      type="button"
                      onClick={handleVerifyViaInboxLink}
                      disabled={isVerifying}
                      className="w-full bg-stone-900 hover:bg-black text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Click here to verify email address (Inbox Link)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Code Input Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Enter 6-Digit Security Code</span>
                  <span className="text-[11px] text-stone-400 font-normal">From your email message</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-verification-code"
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. 849201"
                    className="w-full text-center tracking-[0.35em] font-mono text-xl py-2.5 pl-10 pr-4 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl flex items-start gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {resendStatus && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{resendStatus}</span>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <button
                  id="btn-submit-verification-code"
                  type="submit"
                  disabled={isVerifying || !code.trim()}
                  className="w-full bg-[#E25B38] hover:bg-[#c94929] text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Account...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Verify & Activate Account
                    </>
                  )}
                </button>

                <button
                  id="btn-check-inbox-status"
                  type="button"
                  onClick={handleCheckInboxStatus}
                  disabled={isCheckingInbox}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCheckingInbox ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Checking mailbox verification...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" /> I Already Clicked the Link in My Email
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2 flex items-center justify-center gap-3 text-xs text-stone-500">
                <span>Didn't receive the email?</span>
                <button
                  id="btn-resend-verification"
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0}
                  className={`font-semibold cursor-pointer ${
                    cooldown > 0 ? 'text-stone-400 cursor-not-allowed' : 'text-[#E25B38] hover:underline'
                  }`}
                >
                  {cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend verification email'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
