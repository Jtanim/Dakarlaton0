import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Check,
  Lock,
  MessageSquare
} from 'lucide-react';

interface AccountVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete?: () => void;
  contextReason?: string; // e.g. 'To post a job, both Email and SMS verification are required.'
}

export const AccountVerificationModal: React.FC<AccountVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationComplete,
  contextReason
}) => {
  const {
    user,
    lastVerificationCode,
    lastVerificationToken,
    lastSmsCode,
    confirmEmailVerification,
    sendVerificationEmail,
    confirmPhoneVerification,
    sendPhoneVerificationSms,
    checkEmailVerificationStatus
  } = useAuth();

  // Active step: 'email' | 'phone' | 'completed'
  const [activeStep, setActiveStep] = useState<'email' | 'phone' | 'completed'>('email');
  
  // Email state
  const [emailCode, setEmailCode] = useState(lastVerificationCode || '');
  const [emailError, setEmailError] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailCooldown, setEmailCooldown] = useState(0);
  const [emailResendMsg, setEmailResendMsg] = useState('');

  // Phone state
  const [phoneCode, setPhoneCode] = useState(lastSmsCode || '');
  const [phoneError, setPhoneError] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneCooldown, setPhoneCooldown] = useState(0);
  const [phoneResendMsg, setPhoneResendMsg] = useState('');

  // Auto-advance step if email or phone is already verified
  useEffect(() => {
    if (user) {
      if (user.emailVerified && user.phoneVerified) {
        setActiveStep('completed');
      } else if (user.emailVerified && !user.phoneVerified) {
        setActiveStep('phone');
      } else {
        setActiveStep('email');
      }
    }
  }, [user?.emailVerified, user?.phoneVerified]);

  // Sync latest codes
  useEffect(() => {
    if (lastVerificationCode) setEmailCode(lastVerificationCode);
  }, [lastVerificationCode]);

  useEffect(() => {
    if (lastSmsCode) setPhoneCode(lastSmsCode);
  }, [lastSmsCode]);

  // Cooldown timers
  useEffect(() => {
    if (emailCooldown > 0) {
      const t = setTimeout(() => setEmailCooldown(emailCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [emailCooldown]);

  useEffect(() => {
    if (phoneCooldown > 0) {
      const t = setTimeout(() => setPhoneCooldown(phoneCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [phoneCooldown]);

  if (!isOpen || !user) return null;

  const emailDomain = user.email ? user.email.split('@')[1]?.toLowerCase() : '';

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

  const handleVerifyEmail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError('');
    setEmailLoading(true);

    const res = await confirmEmailVerification(emailCode);
    setEmailLoading(false);

    if (res.success) {
      if (user.phoneVerified) {
        setActiveStep('completed');
        if (onVerificationComplete) onVerificationComplete();
      } else {
        setActiveStep('phone');
      }
    } else {
      setEmailError(res.error || 'Invalid verification code. Please check and try again.');
    }
  };

  const handleVerifyPhone = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPhoneError('');
    setPhoneLoading(true);

    const res = await confirmPhoneVerification(phoneCode);
    setPhoneLoading(false);

    if (res.success) {
      if (user.emailVerified) {
        setActiveStep('completed');
        if (onVerificationComplete) onVerificationComplete();
      } else {
        setActiveStep('email');
      }
    } else {
      setPhoneError(res.error || 'Invalid SMS verification code. Please check your messages.');
    }
  };

  const handleResendEmail = async () => {
    if (emailCooldown > 0) return;
    setEmailResendMsg('Dispatching fresh verification email...');
    const res = await sendVerificationEmail();
    if (res.success) {
      setEmailCode(res.code);
      setEmailCooldown(45);
      setEmailResendMsg(`New verification code sent! (Code: ${res.code})`);
    }
  };

  const handleResendSms = async () => {
    if (phoneCooldown > 0) return;
    setPhoneResendMsg('Dispatching SMS verification code...');
    const res = await sendPhoneVerificationSms(user.phoneNumber);
    if (res.success) {
      setPhoneCode(res.code);
      setPhoneCooldown(45);
      setPhoneResendMsg(`New SMS code sent! (Code: ${res.code})`);
    }
  };

  const isFullyVerified = user.emailVerified && user.phoneVerified;

  return (
    <div
      id="account-verification-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="account-verification-card"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="btn-close-account-verification"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badging */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-purple-100 text-[#5925DC] rounded-2xl flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-semibold text-[#5925DC]">
            <Lock className="w-3.5 h-3.5" /> Account Security & Platform Verification
          </div>

          <h3 className="text-2xl font-bold font-serif text-[#1F104F]">
            {activeStep === 'completed' ? 'Verification Complete!' : 'Verify Your Account'}
          </h3>

          {contextReason ? (
            <p className="text-xs sm:text-sm text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {contextReason}
            </p>
          ) : (
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Dakarlaton requires email and SMS verification to protect candidates and maintain high recruitment standards across the GCC.
            </p>
          )}
        </div>

        {/* 2-Step Progress Indicator */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {/* Step 1: Email */}
          <button
            type="button"
            onClick={() => setActiveStep('email')}
            className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              user.emailVerified
                ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900'
                : activeStep === 'email'
                ? 'border-[#5925DC] bg-purple-50 ring-1 ring-[#5925DC] text-[#1F104F]'
                : 'border-stone-200 bg-stone-50 text-stone-500'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <Mail className={`w-4 h-4 shrink-0 ${user.emailVerified ? 'text-emerald-600' : 'text-[#5925DC]'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">1. Email Address</div>
                <div className="text-[10px] text-stone-500 truncate">
                  {user.emailVerified ? 'Verified' : 'Pending'}
                </div>
              </div>
            </div>
            {user.emailVerified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 ml-1" />
            )}
          </button>

          {/* Step 2: Phone SMS */}
          <button
            type="button"
            onClick={() => setActiveStep('phone')}
            className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              user.phoneVerified
                ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900'
                : activeStep === 'phone'
                ? 'border-[#5925DC] bg-purple-50 ring-1 ring-[#5925DC] text-[#1F104F]'
                : 'border-stone-200 bg-stone-50 text-stone-500'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <Phone className={`w-4 h-4 shrink-0 ${user.phoneVerified ? 'text-emerald-600' : 'text-[#5925DC]'}`} />
              <div className="truncate">
                <div className="text-xs font-bold truncate">2. SMS Mobile</div>
                <div className="text-[10px] text-stone-500 truncate">
                  {user.phoneVerified ? 'Verified' : 'Pending'}
                </div>
              </div>
            </div>
            {user.phoneVerified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 ml-1" />
            )}
          </button>
        </div>

        {/* Step Views */}
        {activeStep === 'completed' || isFullyVerified ? (
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                Fully Authorized
              </span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                You're Verified on Dakarlaton!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
                Both your email (<span className="font-semibold text-stone-900">{user.email}</span>) and mobile number (
                <span className="font-semibold text-stone-900">{user.phoneNumber || 'Verified'}</span>) are confirmed. You now have full permission to post jobs and publish hiring requisitions.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onVerificationComplete) onVerificationComplete();
                }}
                className="w-full bg-[#1F104F] hover:bg-[#160838] text-white font-medium py-3 rounded-full text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Post Job <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : activeStep === 'email' ? (
          /* EMAIL VERIFICATION STEP */
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Registered Email:</span>
                <span className="font-semibold text-stone-900 break-all">{user.email}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-purple-100/60 text-xs">
                <span className="text-stone-500">Fast open inbox:</span>
                <a
                  href={primaryInbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${primaryInbox.badgeColor}`}
                >
                  <span>{primaryInbox.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Sandbox / Instant Verification code banner */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800">Verification Code:</span>{' '}
                <span className="font-mono font-bold text-[#5925DC] tracking-wider">
                  {lastVerificationCode || '849201'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailCode(lastVerificationCode || '849201')}
                className="text-xs text-[#5925DC] hover:underline font-semibold cursor-pointer"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Enter 6-Digit Email Code
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-email-verify-code"
                    type="text"
                    required
                    maxLength={10}
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    placeholder="e.g. 849201"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                  />
                </div>
              </div>

              {emailError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {emailError}
                </div>
              )}

              {emailResendMsg && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-emerald-200">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  {emailResendMsg}
                </div>
              )}

              <button
                id="btn-confirm-email-step"
                type="submit"
                disabled={emailLoading || !emailCode.trim()}
                className="w-full bg-[#1F104F] hover:bg-[#160838] text-white font-medium py-3 rounded-full text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {emailLoading ? 'Verifying Email...' : 'Confirm Email & Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs pt-1 text-stone-500">
                <span>Didn't receive email?</span>
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={emailCooldown > 0}
                  className="font-semibold text-[#5925DC] hover:underline disabled:opacity-50 cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${emailCooldown > 0 ? 'animate-spin' : ''}`} />
                  {emailCooldown > 0 ? `Resend in ${emailCooldown}s` : 'Resend Email Code'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* PHONE SMS VERIFICATION STEP */
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Registered Mobile:</span>
                <span className="font-semibold text-stone-900 font-mono">
                  {user.phoneNumber || '+966 50 123 4567'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                A 6-digit one-time SMS passcode has been sent to your mobile phone via SMS gateway.
              </p>
            </div>

            {/* Sandbox / SMS Preview code banner */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800">SMS OTP Code:</span>{' '}
                <span className="font-mono font-bold text-[#5925DC] tracking-wider">
                  {lastSmsCode || '582914'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPhoneCode(lastSmsCode || '582914')}
                className="text-xs text-[#5925DC] hover:underline font-semibold cursor-pointer"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleVerifyPhone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Enter 6-Digit SMS Code
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-phone-verify-code"
                    type="text"
                    required
                    maxLength={10}
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    placeholder="e.g. 582914"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                  />
                </div>
              </div>

              {phoneError && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {phoneError}
                </div>
              )}

              {phoneResendMsg && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-emerald-200">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  {phoneResendMsg}
                </div>
              )}

              <button
                id="btn-confirm-phone-step"
                type="submit"
                disabled={phoneLoading || !phoneCode.trim()}
                className="w-full bg-[#1F104F] hover:bg-[#160838] text-white font-medium py-3 rounded-full text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {phoneLoading ? 'Verifying SMS OTP...' : 'Verify Phone & Complete Account'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs pt-1 text-stone-500">
                <span>Didn't receive SMS?</span>
                <button
                  type="button"
                  onClick={handleResendSms}
                  disabled={phoneCooldown > 0}
                  className="font-semibold text-[#5925DC] hover:underline disabled:opacity-50 cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${phoneCooldown > 0 ? 'animate-spin' : ''}`} />
                  {phoneCooldown > 0 ? `Resend in ${phoneCooldown}s` : 'Resend SMS Code'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
