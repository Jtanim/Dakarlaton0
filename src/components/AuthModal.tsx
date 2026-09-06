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
  ChevronLeft,
  CheckCircle2,
  Bookmark,
  Bell,
  FileText
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
  const [staySignedIn, setStaySignedIn] = useState(true);
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
    return Math.min(score, 4);
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
        headline: headline.trim() || (role === 'designer' ? 'Specialist CAD & Creative Designer' : 'Hiring Manager & Enterprise Partner'),
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
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div id="auth-modal-card" className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 relative overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Interactive Form */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-[90vh]">
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

              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 text-[#5925DC] rounded-2xl flex items-center justify-center font-bold text-xl">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F104F] font-serif">Reset Your Password</h3>
                <p className="text-xs sm:text-sm text-stone-600">
                  Enter your registered account email and we will send you a secure password recovery link.
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
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
                  className="w-full bg-[#1F104F] hover:bg-[#160838] text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Sending link...' : 'Send Password Reset Link'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#5925DC]">
                  Dakarlaton Portal
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F104F] mt-1">
                  {mode === 'signin' ? 'Log in to your account' : 'Create your account'}
                </h3>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    {/* Role Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                        I am registering as:
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          id="role-btn-designer"
                          type="button"
                          onClick={() => setRole('designer')}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                            role === 'designer'
                              ? 'border-[#5925DC] bg-purple-50/60 ring-1 ring-[#5925DC]'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Palette className={`w-4 h-4 ${role === 'designer' ? 'text-[#5925DC]' : 'text-stone-500'}`} />
                            {role === 'designer' && <Check className="w-3.5 h-3.5 text-[#5925DC]" />}
                          </div>
                          <span className="font-bold text-xs text-stone-900">Job Seeker / Specialist</span>
                          <span className="text-[11px] text-stone-500">Apply to jobs & upload CV</span>
                        </button>

                        <button
                          id="role-btn-employer"
                          type="button"
                          onClick={() => setRole('employer')}
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                            role === 'employer'
                              ? 'border-[#5925DC] bg-purple-50/60 ring-1 ring-[#5925DC]'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Briefcase className={`w-4 h-4 ${role === 'employer' ? 'text-[#5925DC]' : 'text-stone-500'}`} />
                            {role === 'employer' && <Check className="w-3.5 h-3.5 text-[#5925DC]" />}
                          </div>
                          <span className="font-bold text-xs text-stone-900">Employer / Recruiter</span>
                          <span className="text-[11px] text-stone-500">Post jobs & hire talent</span>
                        </button>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <input
                          id="input-full-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Tariq Al-Mansoor"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                        />
                      </div>
                    </div>

                    {/* Location Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Location / Country
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                        <select
                          id="select-region"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC] bg-white"
                        >
                          <option value="Saudi Arabia (Riyadh)">🇸🇦 Saudi Arabia (Riyadh / Jeddah / Neom)</option>
                          <option value="United Arab Emirates (Dubai / Abu Dhabi)">🇦🇪 United Arab Emirates (Dubai / Abu Dhabi)</option>
                          <option value="Qatar (Doha)">🇶🇦 Qatar (Doha)</option>
                          <option value="Oman (Muscat)">🇴🇲 Oman (Muscat)</option>
                          <option value="Bahrain (Manama)">🇧🇭 Bahrain (Manama)</option>
                          <option value="Kuwait (Kuwait City)">🇰🇼 Kuwait (Kuwait City)</option>
                          <option value="Remote / International">🌐 Remote / International</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Email address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      id="input-auth-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                      Password *
                    </label>
                    {mode === 'signin' && (
                      <button
                        id="btn-forgot-password-trigger"
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setError('');
                        }}
                        className="text-xs text-[#5925DC] hover:underline font-semibold cursor-pointer"
                      >
                        Forgotten password?
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
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5925DC]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength & guidelines for sign up */}
                  {mode === 'signup' && (
                    <div className="mt-2.5 space-y-1.5">
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
                    </div>
                  )}
                </div>

                {/* Stay signed in checkbox */}
                {mode === 'signin' && (
                  <div className="flex items-center gap-2">
                    <input
                      id="checkbox-stay-signed-in"
                      type="checkbox"
                      checked={staySignedIn}
                      onChange={(e) => setStaySignedIn(e.target.checked)}
                      className="rounded border-stone-300 text-[#5925DC] focus:ring-[#5925DC] cursor-pointer"
                    />
                    <label htmlFor="checkbox-stay-signed-in" className="text-xs text-stone-600 font-medium cursor-pointer">
                      Stay signed in
                    </label>
                  </div>
                )}

                {/* Terms checkbox for signup */}
                {mode === 'signup' && (
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="checkbox-terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#5925DC] focus:ring-[#5925DC] cursor-pointer"
                    />
                    <label htmlFor="checkbox-terms" className="text-xs text-stone-600 leading-tight cursor-pointer">
                      I agree to Dakarlaton's{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal && onOpenLegal('terms')}
                        className="text-[#5925DC] hover:underline font-semibold inline"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal && onOpenLegal('privacy')}
                        className="text-[#5925DC] hover:underline font-semibold inline"
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
                  className="w-full bg-[#1F104F] hover:bg-[#160838] text-white font-semibold py-3 rounded-full shadow-sm hover:shadow transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    'Processing...'
                  ) : mode === 'signin' ? (
                    'Sign in'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* SSO Continues */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">Or continue with</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-semibold py-2 px-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
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
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemo('designer');
                      onClose();
                    }}
                    className="bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold py-2 px-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <span>LinkedIn SSO</span>
                  </button>
                </div>
              </div>

              {/* Demo quick switch */}
              <div className="pt-2">
                <div className="text-[11px] text-stone-500 font-medium mb-1.5 text-center">
                  1-Click instant demo logins:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemo('designer');
                      onClose();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold text-center transition-colors cursor-pointer truncate"
                  >
                    🎨 Candidate Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      loginAsDemo('employer');
                      onClose();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold text-center transition-colors cursor-pointer truncate"
                  >
                    🏢 Employer Demo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Branded Visual Showcase Container */}
        <div className="w-full md:w-80 lg:w-96 bg-[#5925DC] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Background decorative ring */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />

          {mode === 'signin' ? (
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 border-2 border-white/30 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    alt="Dakarlaton Candidate"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-2">
                  Create an account
                </h4>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Join thousands of skilled professionals and specialists hired across leading organizations in the GCC.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-purple-50">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <span>View your matched roles and track active applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <span>Apply with one click with your saved CV & portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3E635] shrink-0 mt-0.5" />
                    <span>Manage instant salary & regional role alerts</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="w-full bg-white hover:bg-purple-50 text-[#1F104F] font-bold py-3 rounded-full text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Create an account <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 border-2 border-white/30 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                    alt="Dakarlaton Member"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-2">
                  Already have an account?
                </h4>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Sign back in to review your saved job bookmarks, application status, or manage your company's active talent searches.
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> GCC Market Access
                  </div>
                  <p className="text-[11px] text-purple-100">
                    Get discovered by top giga-project contractors across Saudi Arabia, UAE, and Qatar.
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                  className="w-full bg-white hover:bg-purple-50 text-[#1F104F] font-bold py-3 rounded-full text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Sign in to your account <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
