import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Building, 
  Phone, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  AlertCircle,
  KeyRound,
  Shield,
  ArrowRight,
  Server,
  Cpu,
  Globe2,
  Clock,
  Check
} from 'lucide-react';
import { UserProfile } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';

interface AuthPageProps {
  onBack: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onBack,
  onLoginSuccess,
  initialMode = 'signin'
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);

  // ─── Sign In State ───────────────────────────────────────────────────────────
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInRemember, setSignInRemember] = useState(true);

  // ─── Sign Up State ───────────────────────────────────────────────────────────
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpCountry, setSignUpCountry] = useState<'Germany' | 'Bangladesh' | 'International'>('Germany');
  const [signUpCompany, setSignUpCompany] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // ─── Shared UI State ─────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.auth-fade-item',
      { opacity: 0, y: isMobile ? 12 : 20 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.55,
        stagger: isMobile ? 0.04 : 0.07,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  // ─── Handle Sign In ───────────────────────────────────────────────────────────
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signInEmail.trim() || !signInPassword) {
      setErrorMessage('Please enter both your corporate email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call backend authentication route handler
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInEmail.trim(),
          password: signInPassword
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        setSuccessMessage('Authentication verified. Loading your portal...');
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 500);
        return;
      }

      // 2. Check local client accounts in localStorage if server returned 401
      if (typeof window !== 'undefined') {
        try {
          const localAccounts = JSON.parse(localStorage.getItem('webdev_registered_users') || '[]');
          const matched = localAccounts.find(
            (acc: any) => 
              acc.email.toLowerCase() === signInEmail.trim().toLowerCase() && 
              acc.password === signInPassword
          );

          if (matched) {
            const { password: _, ...cleanProfile } = matched;
            setSuccessMessage('Credentials authenticated. Initializing session...');
            setTimeout(() => {
              onLoginSuccess(cleanProfile);
            }, 500);
            return;
          }
        } catch {
          // ignore
        }
      }

      setErrorMessage(data.message || 'Invalid email or password. Please verify your credentials.');
    } catch {
      setErrorMessage('Unable to reach authentication server. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Handle Sign Up ───────────────────────────────────────────────────────────
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signUpName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setErrorMessage('Please enter a valid corporate or business email.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage('Please accept the Terms of Service & Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call backend registration route handler (strictly registers as client)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpName.trim(),
          email: signUpEmail.trim(),
          password: signUpPassword,
          role: 'client',
          country: signUpCountry,
          company: signUpCompany.trim(),
          phone: signUpPhone.trim()
        })
      });

      const data = await res.json();

      let createdUser: UserProfile;

      if (res.ok && data.success && data.user) {
        createdUser = data.user;
      } else {
        // Local client account creation fallback
        createdUser = {
          id: `user-${Date.now()}`,
          name: signUpName.trim(),
          email: signUpEmail.trim().toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          role: 'client',
          country: signUpCountry,
          company: signUpCompany.trim() || 'Partner Enterprise',
          phone: signUpPhone.trim() || (signUpCountry === 'Bangladesh' ? '+880 1700-000000' : '+49 171 000000'),
          savedProjects: ['proj-1'],
          inquiries: []
        };
      }

      // Persist client account locally for offline resilience
      if (typeof window !== 'undefined') {
        try {
          const localAccounts = JSON.parse(localStorage.getItem('webdev_registered_users') || '[]');
          const filtered = localAccounts.filter((a: any) => a.email.toLowerCase() !== createdUser.email.toLowerCase());
          filtered.push({
            ...createdUser,
            password: signUpPassword
          });
          localStorage.setItem('webdev_registered_users', JSON.stringify(filtered));
        } catch (e) {
          console.error('Failed to save to local registry', e);
        }
      }

      setSuccessMessage('Enterprise account registered successfully! Initializing session...');
      setTimeout(() => {
        onLoginSuccess(createdUser);
      }, 600);
    } catch {
      setErrorMessage('Registration server currently unavailable. Please try again in a few moments.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      ref={pageRef} 
      className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#edf7fa]/50 via-[#f8fafc] to-white text-slate-900 flex flex-col justify-between relative overflow-hidden font-['Instrument_Sans'] selection:bg-[#BBE7F1] selection:text-slate-950"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-[#BBE7F1]/35 via-cyan-100/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -right-20 w-80 h-80 bg-[#BBE7F1]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* ─── 1. TOP COMPACT ACTION BAR (NO BREADCRUMB) ───────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 bg-white/80 hover:bg-white border border-slate-200/90 hover:border-slate-300 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-700 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-white/80 border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Portal</span>
        </div>
      </div>

      {/* ─── 2. MAIN LIGHT-THEME AUTH WORKSPACE ─────────────────────────── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Premium White Card (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.05)] space-y-6 auth-fade-item">
            
            {/* Header / Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BBE7F1]/40 border border-[#9cd5e2]/60 text-cyan-950 text-[11px] font-bold tracking-wide uppercase font-['Archivo']">
                <Sparkles className="w-3.5 h-3.5 text-cyan-800" />
                <span>Enterprise Identity Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-['Archivo'] text-slate-950 tracking-tight">
                {authMode === 'signin' ? 'Sign In to Your Portal' : 'Create Enterprise Account'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {authMode === 'signin' 
                  ? 'Sign in to access real-time sprint milestones, architectural dossiers, and billing summaries.'
                  : 'Register your organization to collaborate directly with our European & Bangladesh engineering squads.'}
              </p>
            </div>

            {/* Seamless Light Tab Switcher */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-['Archivo'] ${
                  authMode === 'signin'
                    ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <LogIn className="w-4 h-4 text-slate-900" />
                <span>Sign In</span>
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-['Archivo'] ${
                  authMode === 'signup'
                    ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <UserPlus className="w-4 h-4 text-slate-900" />
                <span>Register</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* SIGN IN FORM (LIGHT THEME) */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {authMode === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Corporate Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Password</span>
                    </label>
                    <a
                      href="mailto:support@webdevsoftwaresolutions.com?subject=Password%20Reset%20Inquiry"
                      className="text-[11px] font-semibold text-cyan-800 hover:text-cyan-950 underline transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3.5 pr-11 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                      title={showSignInPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Security Status */}
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={signInRemember}
                      onChange={(e) => setSignInRemember(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 focus:ring-[#9cd5e2] border-slate-300 cursor-pointer accent-cyan-600"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL</span>
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-950 hover:bg-slate-800 active:bg-slate-900 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 mt-3 font-['Archivo'] group"
                >
                  {isLoading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight className="w-4 h-4 text-[#BBE7F1] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* SIGN UP / REGISTRATION FORM (LIGHT THEME) */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lukas Schneider or Sarah Chowdhury"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Corporate / Business Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Branch Region Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Primary Regional Hub</span>
                  </label>
                  <select
                    value={signUpCountry}
                    onChange={(e) => setSignUpCountry(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 cursor-pointer"
                  >
                    <option value="Germany">Germany / Europe (DACH Region)</option>
                    <option value="Bangladesh">Bangladesh (Joypurhat Engineering HQ)</option>
                    <option value="International">International (Global Enterprise)</option>
                  </select>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Company (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bavarian Tech GmbH"
                      value={signUpCompany}
                      onChange={(e) => setSignUpCompany(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Phone (Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 ... or +880 ..."
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Password *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="Min 6 characters"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 pr-10 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                      >
                        {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Confirm Password *</span>
                    </label>
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Confirm password"
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-[#BBE7F1]/50 outline-none text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-slate-900 focus:ring-[#9cd5e2] border-slate-300 shrink-0 accent-cyan-600"
                    />
                    <span className="leading-snug text-[11px]">
                      I accept the <a href="/terms" className="text-cyan-900 font-semibold underline">Terms of Service</a> and acknowledge GDPR data confidentiality.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-60 mt-3 font-['Archivo'] group border border-[#9cd5e2]"
                >
                  {isLoading ? (
                    <span>Provisioning Account...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-900" />
                      <span>Register Enterprise Account</span>
                    </>
                  )}
                </button>

              </form>
            )}

            {/* Security Guarantee Note */}
            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-3 border-t border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 256-bit encrypted protocol • Zero third-party tracker storage</span>
            </div>

          </div>

          {/* RIGHT: Architecture & Trust Showcase Panel (5 cols on lg - LIGHT THEME) */}
          <div className="lg:col-span-5 space-y-5 auth-fade-item">
            
            {/* Enterprise Security Card */}
            <div className="bg-gradient-to-br from-white via-slate-50 to-[#edf7fa]/60 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.03)] space-y-6">
              
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#BBE7F1] border border-[#9cd5e2] flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-['Archivo'] text-slate-950">
                    European Quality Standards
                  </h3>
                  <p className="text-xs text-slate-600">
                    Agile Delivery & Strict RBAC Protection
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-slate-950 block font-semibold">Dual-Hub Transparency</strong>
                    Direct sync with Bangladesh core development sprints and Leverkusen client milestones.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-cyan-50 border border-cyan-200 shrink-0 mt-0.5">
                    <Server className="w-3.5 h-3.5 text-cyan-700" />
                  </div>
                  <div>
                    <strong className="text-slate-950 block font-semibold">Role-Based Access Control</strong>
                    Client partners view deliverables and invoices, while admin staff access the full CMS suite.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-purple-50 border border-purple-200 shrink-0 mt-0.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-700" />
                  </div>
                  <div>
                    <strong className="text-slate-950 block font-semibold">High-Velocity Engineering</strong>
                    Production deployments backed by Next.js, PostgreSQL, and continuous CI/CD pipelines.
                  </div>
                </div>
              </div>

              {/* Direct Engineering Hotline */}
              <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold font-['Archivo']">
                  Direct Engineering Support:
                </p>
                <div className="flex items-center justify-between text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-500">Joypurhat HQ (BD):</span>
                  <span className="font-mono text-cyan-900 font-semibold">+880 1722-301927</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-slate-500">Leverkusen Hub (DE):</span>
                  <span className="font-mono text-cyan-900 font-semibold">+49 172 9766016</span>
                </div>
              </div>

            </div>

            {/* Quick Consultation Highlight Card */}
            <div className="bg-gradient-to-br from-[#BBE7F1]/30 via-white to-cyan-50/50 rounded-3xl p-5 border border-[#9cd5e2]/60 text-xs text-slate-800 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 font-bold font-['Archivo'] text-slate-950">
                <Sparkles className="w-4 h-4 text-cyan-800" />
                <span>Enterprise Client Dashboard</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Sign in to monitor real-time sprint velocity, download confidential NDA project dossiers, and communicate directly with your dedicated lead engineer.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* ─── 3. MINIMAL LIGHT FOOTER ────────────────────────────────────── */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 text-center text-xs text-slate-500 border-t border-slate-200/60">
        <span>&copy; {new Date().getFullYear()} WebDev Software Solutions. ISO 27001 & GDPR Compliant.</span>
      </footer>

    </div>
  );
};


