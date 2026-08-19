import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  X,
  Lock,
  Mail,
  User,
  Briefcase,
  Palette,
  ShieldCheck,
  Check,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  MapPin,
  Sparkles,
  KeyRound,
  ChevronLeft
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onVerificationTrigger?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onVerificationTrigger,
  onOpenLegal
}) => {
  const { login, register, loginWithGoogle, loginAsDemo, sendPasswordReset } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>('designer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('Saudi Arabia (Riyadh)');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    setInfoMessage('');
    setLoading(true);
    const res = await loginWithGoogle(role);
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Google Sign-In failed');
    }
  };

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return Math.min(score, 4); // 0 to 4
  };

  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please enter your account email');
        setLoading(false);
        return;
      }
      const resetRes = await sendPasswordReset(email);
      setLoading(false);
      setInfoMessage(resetRes.message || 'Password reset instructions have been dispatched to your email.');
      return;
    }

    if (mode === 'signin') {
      const res = await login(email, password, role);
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Sign in failed. Please check your credentials.');
      }
    } else {
      // Sign up validation
      if (!fullName.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }
      if (!agreeTerms) {
        setError('Please accept the Terms of Service & Privacy Policy');
        setLoading(false);
        return;
      }

      const res = await register({
        email,
        fullName,
        password,
        role,
        headline: headline.trim() || (role === 'designer' ? 'Freelance Product Designer & Specialist' : 'Talent Partner & Hiring Lead'),
        location: location
      });
      setLoading(false);
      if (res.success) {
        onClose();
        if (onVerificationTrigger) {
          onVerificationTrigger();
        }
      } else {
        setError(res.error || 'Account registration failed. Please try again.');
      }
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div id="auth-modal-card" className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'forgot' ? (
          <div className="space-y-5">
            <button
              id="btn-back-to-signin"
              type="button"
              onClick={() => {
                setMode('signin');
                setError('');
                setInfoMessage('');
              }}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Sign In
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917] font-serif">Reset Your Password</h3>
              <p className="text-sm text-stone-600 max-w-xs mx-auto">
                Enter your account email address and we'll send a password recovery link to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {infoMessage && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{infoMessage}</span>
                </div>
              )}

              <button
                id="btn-submit-forgot-password"
                type="submit"
                disabled={loading}
                className="w-full bg-[#E25B38] hover:bg-[#c94929] text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Email'}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#E25B38] text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
                D
              </div>
              <h3 className="text-2xl font-bold text-[#1C1917] font-serif">
                {mode === 'signin' ? 'Welcome back to Dakarlaton' : 'Create Your Dakarlaton Account'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-sm mx-auto">
                {mode === 'signin'
                  ? 'Sign in to access your jobs, client messages, applications, and portfolio'
                  : 'Join the GCC creative network with verified email protection & portfolio tools'}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex bg-stone-100 p-1 rounded-2xl mb-5 text-sm font-medium">
              <button
                id="tab-auth-signin"
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'signin' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Sign In
              </button>
              <button
                id="tab-auth-signup"
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                  mode === 'signup' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Google One-Click Login */}
            <button
              id="btn-google-auth"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-medium py-2.5 px-4 rounded-2xl shadow-2xs transition-all flex items-center justify-center gap-3 cursor-pointer mb-4 text-xs sm:text-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">or with email credentials</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Account Type:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        id="role-btn-designer"
                        type="button"
                        onClick={() => setRole('designer')}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                          role === 'designer'
                            ? 'border-[#E25B38] bg-orange-50/50 ring-1 ring-[#E25B38]'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Palette className={`w-4 h-4 ${role === 'designer' ? 'text-[#E25B38]' : 'text-stone-500'}`} />
                          {role === 'designer' && <Check className="w-3.5 h-3.5 text-[#E25B38]" />}
                        </div>
                        <span className="font-semibold text-xs text-stone-900">Talent / Designer</span>
                        <span className="text-[11px] text-stone-500">Apply to jobs & show work</span>
                      </button>

                      <button
                        id="role-btn-employer"
                        type="button"
                        onClick={() => setRole('employer')}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                          role === 'employer'
                            ? 'border-[#E25B38] bg-orange-50/50 ring-1 ring-[#E25B38]'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Briefcase className={`w-4 h-4 ${role === 'employer' ? 'text-[#E25B38]' : 'text-stone-500'}`} />
                          {role === 'employer' && <Check className="w-3.5 h-3.5 text-[#E25B38]" />}
                        </div>
                        <span className="font-semibold text-xs text-stone-900">Employer / Hiring</span>
                        <span className="text-[11px] text-stone-500">Post jobs & hire designers</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        id="input-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Faisal Al-Ghamdi"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                      />
                    </div>
                  </div>

                  {/* GCC Country / Region */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Location / Region
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <select
                        id="select-region"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38] bg-white"
                      >
                        <option value="Saudi Arabia (Riyadh)">🇸🇦 Saudi Arabia (Riyadh / Jeddah / Neom)</option>
                        <option value="United Arab Emirates (Dubai / Abu Dhabi)">🇦🇪 United Arab Emirates (Dubai / Abu Dhabi)</option>
                        <option value="Qatar (Doha)">🇶🇦 Qatar (Doha)</option>
                        <option value="Oman (Muscat)">🇴🇲 Oman (Muscat)</option>
                        <option value="Bahrain (Manama)">🇧🇭 Bahrain (Manama)</option>
                        <option value="Kuwait (Kuwait City)">🇰🇼 Kuwait (Kuwait City)</option>
                        <option value="Egypt (Cairo / Alex)">🇪🇬 Egypt (Cairo)</option>
                        <option value="Remote / Worldwide">🌐 Remote / International</option>
                      </select>
                    </div>
                  </div>

                  {/* Professional Headline */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      {role === 'designer' ? 'Design Specialization / Headline' : 'Company Name / Job Title'}
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        id="input-headline"
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder={role === 'designer' ? 'e.g. Senior UI/UX & AutoCAD Designer' : 'e.g. Head of Talent at Studio Arch'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      id="btn-forgot-password-trigger"
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                      }}
                      className="text-xs text-[#E25B38] hover:underline font-medium cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    id="input-auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength and criteria for sign up */}
                {mode === 'signup' && (
                  <div className="mt-2.5 space-y-2">
                    <div className="flex gap-1.5 h-1.5">
                      <div className={`flex-1 rounded-full transition-colors ${strength >= 1 ? 'bg-red-500' : 'bg-stone-200'}`} />
                      <div className={`flex-1 rounded-full transition-colors ${strength >= 2 ? 'bg-amber-500' : 'bg-stone-200'}`} />
                      <div className={`flex-1 rounded-full transition-colors ${strength >= 3 ? 'bg-yellow-500' : 'bg-stone-200'}`} />
                      <div className={`flex-1 rounded-full transition-colors ${strength >= 4 ? 'bg-emerald-500' : 'bg-stone-200'}`} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Password strength:</span>
                      <span className="font-semibold text-stone-700">
                        {strength === 0 && 'Enter password'}
                        {strength === 1 && 'Weak'}
                        {strength === 2 && 'Fair'}
                        {strength === 3 && 'Good'}
                        {strength >= 4 && 'Strong'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[11px] text-stone-500 pt-0.5">
                      <span className={`flex items-center gap-1 ${password.length >= 6 ? 'text-emerald-700 font-medium' : ''}`}>
                        <Check className={`w-3 h-3 ${password.length >= 6 ? 'text-emerald-600' : 'text-stone-300'}`} /> At least 6 characters
                      </span>
                      <span className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-emerald-700 font-medium' : ''}`}>
                        <Check className={`w-3 h-3 ${/[A-Z]/.test(password) ? 'text-emerald-600' : 'text-stone-300'}`} /> Capital letter
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms checkbox for signup */}
              {mode === 'signup' && (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="checkbox-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-[#E25B38] focus:ring-[#E25B38] cursor-pointer"
                  />
                  <label htmlFor="checkbox-terms" className="text-xs text-stone-600 leading-tight cursor-pointer">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('terms')}
                      className="text-[#E25B38] hover:underline font-medium inline"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('privacy')}
                      className="text-[#E25B38] hover:underline font-medium inline"
                    >
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>
              )}

              {error && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                id="btn-auth-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-[#E25B38] hover:bg-[#c94929] text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  'Processing...'
                ) : mode === 'signin' ? (
                  <>
                    Sign In to Account <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Create Account & Send Verification Email <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Instant Demo Personas */}
            <div className="mt-6 pt-5 border-t border-stone-200">
              <div className="text-xs text-stone-500 font-medium mb-3 text-center">
                Or test immediately with 1-click personas:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-demo-designer"
                  type="button"
                  onClick={() => {
                    loginAsDemo('designer');
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium text-center transition-colors cursor-pointer"
                >
                  🎨 Freelance Designer (GCC)
                </button>
                <button
                  id="btn-demo-employer"
                  type="button"
                  onClick={() => {
                    loginAsDemo('employer');
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium text-center transition-colors cursor-pointer"
                >
                  🏢 Employer / Recruiter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
