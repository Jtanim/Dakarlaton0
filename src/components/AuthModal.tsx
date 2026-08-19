import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, Lock, Mail, User, Briefcase, Palette, ShieldCheck, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onVerificationTrigger?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onVerificationTrigger
}) => {
  const { login, register, loginWithGoogle, loginAsDemo } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [role, setRole] = useState<UserRole>('designer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
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
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signin') {
      const res = await login(email, role);
      setLoading(false);
      if (res.success) {
        onClose();
      } else {
        setError(res.error || 'Sign in failed');
      }
    } else {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const res = await register({
        email,
        fullName,
        password,
        role,
        headline: headline.trim() || (role === 'designer' ? 'Freelance Product Designer' : 'Hiring Manager')
      });
      setLoading(false);
      if (res.success) {
        onClose();
        if (onVerificationTrigger) {
          onVerificationTrigger();
        }
      } else {
        setError(res.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#E25B38] text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-sm">
            D
          </div>
          <h3 className="text-2xl font-bold text-[#1C1917]">
            {mode === 'signin' ? 'Welcome back to Dakarlaton' : 'Join Dakarlaton'}
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            {mode === 'signin'
              ? 'Sign in to access your jobs, applications, and portfolio'
              : 'Showcase your designer portfolio or post open roles'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-stone-100 p-1 rounded-2xl mb-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'signin' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'signup' ? 'bg-white text-[#1C1917] shadow-xs font-semibold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Google One-Click Login */}
        <button
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
          <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">or with email</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              {/* Role Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
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
                    <span className="font-semibold text-xs text-stone-900">Showcase Portfolio</span>
                    <span className="text-[11px] text-stone-500">Freelance Designer</span>
                  </button>

                  <button
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
                    <span className="font-semibold text-xs text-stone-900">Post Jobs & Hire</span>
                    <span className="text-[11px] text-stone-500">Employer / Client</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Amara Diallo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Password
              </label>
              {mode === 'signin' && (
                <span className="text-xs text-stone-400 cursor-not-allowed">Forgot?</span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25B38] focus:border-[#E25B38]"
              />
            </div>

            {/* Password security meter for sign up */}
            {mode === 'signup' && password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1.5">
                  <div className={`flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 2 ? 'bg-amber-500' : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-yellow-500' : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${strength >= 4 ? 'bg-emerald-500' : 'bg-stone-200'}`} />
                </div>
                <div className="text-[11px] text-stone-500 flex items-center justify-between">
                  <span>Security strength</span>
                  <span className="font-medium text-stone-700">
                    {strength <= 1 && 'Weak'}
                    {strength === 2 && 'Fair'}
                    {strength === 3 && 'Good'}
                    {strength === 4 && 'Strong'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl flex items-center gap-1.5 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
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
                Create Account with Email Verification <ShieldCheck className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login presets */}
        <div className="mt-6 pt-5 border-t border-stone-200">
          <div className="text-xs text-stone-500 font-medium mb-3 text-center">
            Or test with instant demo personas:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAsDemo('designer');
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium text-center transition-colors cursor-pointer"
            >
              🎨 Freelance Designer
            </button>
            <button
              type="button"
              onClick={() => {
                loginAsDemo('employer');
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium text-center transition-colors cursor-pointer"
            >
              🏢 Employer / Hiring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
