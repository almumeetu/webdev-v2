'use client';

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
  Check,
  Zap,
  X,
  Star,
  FileCheck,
  Headphones,
  Moon,
  Sun
} from 'lucide-react';
import { UserProfile } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
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
  const { siteSettings } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const isDe = lang === 'de';
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

  // ─── UI Helpers ───────────────────────────────────────────────────────
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // ─── Forgot Password Modal State ─────────────────────────────────────────────
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // ─── Shared UI State ─────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Verifying Credentials...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // GSAP animation for smooth entrance
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

  // CapsLock listener
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'));
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200 dark:bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: isDe ? 'Schwach' : 'Weak', color: 'bg-rose-500' };
    if (score <= 2) return { score: 2, label: isDe ? 'Mittel' : 'Fair', color: 'bg-amber-500' };
    if (score <= 3) return { score: 3, label: isDe ? 'Gut' : 'Good', color: 'bg-cyan-500' };
    return { score: 4, label: isDe ? 'Stark' : 'Strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(signUpPassword);
  const passwordsMatch = signUpConfirmPassword.length > 0 && signUpPassword === signUpConfirmPassword;

  // ─── Quick Fill Demo Credentials ─────────────────────────────────────────────
  const handleQuickFill = (type: 'client' | 'admin') => {
    setAuthMode('signin');
    setErrorMessage(null);
    setSuccessMessage(null);

    if (type === 'client') {
      setSignInEmail('client@enterprise.com');
      setSignInPassword('client123');
      setDemoNotice(isDe ? 'Demo-Kundendaten eingefügt' : 'Demo Client credentials filled');
    } else {
      setSignInEmail('admin@webdevsoftware.com');
      setSignInPassword('admin123');
      setDemoNotice(isDe ? 'Demo-Administratordaten eingefügt' : 'Demo Admin credentials filled');
    }

    setTimeout(() => setDemoNotice(null), 4000);
  };

  // ─── Single Sign-On (SSO) Simulation ─────────────────────────────────────────
  const handleSSO = async (provider: 'Google' | 'GitHub') => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    setLoadingMessage(isDe ? `Verbindung zu ${provider} wird hergestellt...` : `Connecting to ${provider}...`);

    try {
      await new Promise(r => setTimeout(r, 700));

      const ssoUser: UserProfile = {
        id: `user-sso-${Date.now()}`,
        name: provider === 'Google' ? 'Alexander Bergmann' : 'David Chen',
        email: provider === 'Google' ? 'a.bergmann@global-enterprise.de' : 'chen.david@github.com',
        avatar: provider === 'Google' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: 'client',
        country: 'Germany',
        company: provider === 'Google' ? 'Bergmann Digital GmbH' : 'OpenSource Labs',
        phone: '+49 172 8899123',
        savedProjects: ['proj-1', 'proj-2'],
        inquiries: []
      };

      if (typeof window !== 'undefined') {
        try {
          const localAccounts = JSON.parse(localStorage.getItem('webdev_registered_users') || '[]');
          const filtered = localAccounts.filter((a: any) => a.email.toLowerCase() !== ssoUser.email.toLowerCase());
          filtered.push(ssoUser);
          localStorage.setItem('webdev_registered_users', JSON.stringify(filtered));
        } catch {
          // ignore
        }
      }

      setSuccessMessage(isDe ? `${provider}-SSO verifiziert. Arbeitsbereich wird gestartet...` : `${provider} SSO verified. Launching workspace...`);
      setTimeout(() => {
        onLoginSuccess(ssoUser);
      }, 500);
    } catch {
      setErrorMessage(isDe ? `${provider}-SSO fehlgeschlagen. Bitte versuchen Sie es erneut.` : `Failed to complete ${provider} SSO. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Handle Sign In ───────────────────────────────────────────────────────────
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signInEmail.trim() || !signInPassword) {
      setErrorMessage(isDe ? 'Bitte geben Sie sowohl E-Mail als auch Passwort ein.' : 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage(isDe ? 'Anmeldedaten werden überprüft...' : 'Verifying Credentials...');

    try {
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
        setSuccessMessage(isDe ? 'Authentifizierung erfolgreich. Portal wird geladen...' : 'Authentication verified. Loading portal...');
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 500);
        return;
      }

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
            setSuccessMessage(isDe ? 'Anmeldedaten authentifiziert. Initialisierung...' : 'Credentials authenticated. Initializing...');
            setTimeout(() => {
              onLoginSuccess(cleanProfile);
            }, 500);
            return;
          }
        } catch {
          // ignore
        }
      }

      setErrorMessage(data.message || (isDe ? 'Ungültige E-Mail-Adresse oder Passwort.' : 'Invalid email or password.'));
    } catch {
      setErrorMessage(isDe ? 'Server nicht erreichbar. Bitte überprüfen Sie Ihre Internetverbindung.' : 'Unable to reach server. Please check your connection.');
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
      setErrorMessage(isDe ? 'Bitte geben Sie Ihren vollständigen Namen ein.' : 'Please enter your full name.');
      return;
    }

    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setErrorMessage(isDe ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : 'Please enter a valid email.');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMessage(isDe ? 'Das Passwort muss mindestens 6 Zeichen lang sein.' : 'Password must be at least 6 characters.');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setErrorMessage(isDe ? 'Die Passwörter stimmen nicht überein.' : 'Passwords do not match.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMessage(isDe ? 'Bitte akzeptieren Sie die Nutzungsbedingungen.' : 'Please accept the Terms of Service.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage(isDe ? 'Konto wird erstellt...' : 'Creating Account...');

    try {
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
        createdUser = {
          id: `user-${Date.now()}`,
          name: signUpName.trim(),
          email: signUpEmail.trim().toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          role: 'client',
          country: signUpCountry,
          company: signUpCompany.trim() || 'Partner Enterprise',
          phone: signUpPhone.trim() || '+49 171 000000',
          savedProjects: ['proj-1'],
          inquiries: []
        };
      }

      if (typeof window !== 'undefined') {
        try {
          const localAccounts = JSON.parse(localStorage.getItem('webdev_registered_users') || '[]');
          const filtered = localAccounts.filter((a: any) => a.email.toLowerCase() !== createdUser.email.toLowerCase());
          filtered.push({ ...createdUser, password: signUpPassword });
          localStorage.setItem('webdev_registered_users', JSON.stringify(filtered));
        } catch (e) {
          console.error('Failed to save locally', e);
        }
      }

      setSuccessMessage(isDe ? 'Konto erfolgreich erstellt!' : 'Account created successfully!');
      setTimeout(() => {
        onLoginSuccess(createdUser);
      }, 600);
    } catch {
      setErrorMessage(isDe ? 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div 
      ref={pageRef} 
      className={`min-h-screen flex flex-col justify-between relative overflow-hidden font-['Instrument_Sans'] transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0b0f17] text-slate-100' 
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Effects */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] blur-[120px] pointer-events-none transition-opacity duration-300 ${
        isDark 
          ? 'bg-gradient-to-b from-[#BBE7F1]/10 via-cyan-900/10 to-transparent' 
          : 'bg-gradient-to-b from-cyan-200/30 via-blue-200/20 to-transparent'
      }`} />
      
      {isDark && (
        <>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
        </>
      )}

      {/* Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm group backdrop-blur-md ${
            isDark
              ? 'text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
              : 'text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
          }`}
        >
          <ArrowLeft className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
            isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'
          }`} />
          <span>{isDe ? 'Zurück zur Website' : 'Back to Website'}</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[#BBE7F1]'
                : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
            title={`Switch to ${isDark ? (isDe ? 'Hell' : 'light') : (isDe ? 'Dunkel' : 'dark')} mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {siteSettings.darkLogoUrl && (
            <img 
              src={siteSettings.darkLogoUrl} 
              alt={siteSettings.companyName} 
              className="h-10 sm:h-11 w-auto object-contain hidden sm:block" 
            />
          )}

          <div className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-inner backdrop-blur-md ${
            isDark
              ? 'text-slate-300 bg-slate-900/90 border border-slate-800'
              : 'text-slate-700 bg-white border border-slate-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>TLS 1.3</span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>|</span>
            <span className="font-semibold text-emerald-400">256-Bit SSL</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Panel - Auth Form */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 auth-fade-item transition-colors duration-300 ${
            isDark
              ? 'bg-slate-900/90 text-slate-100 border border-slate-800/90'
              : 'bg-white text-slate-900 border border-slate-200'
          }`}>
            
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase font-['Archivo'] ${
                  isDark
                    ? 'bg-[#BBE7F1]/10 border border-[#9cd5e2]/20 text-[#BBE7F1]'
                    : 'bg-cyan-50 border border-cyan-200 text-cyan-900'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                  <span>{isDe ? 'Enterprise-Portal' : 'Enterprise Portal'}</span>
                </div>

                <div className={`text-[11px] font-mono font-medium ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  Gateway v2.4
                </div>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-extrabold font-['Archivo'] tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {authMode === 'signin' ? (isDe ? 'Portal-Anmeldung' : 'Sign In to Portal') : (isDe ? 'Konto erstellen' : 'Create Account')}
              </h1>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {authMode === 'signin' 
                  ? (isDe ? 'Greifen Sie auf Ihre Projekte, Meilensteine und dedizierten Support zu.' : 'Access your projects, milestones, and dedicated support.')
                  : (isDe ? 'Registrieren Sie sich auf unserer Plattform, um Ihre Projekte zu verwalten und mit unserem Team zusammenzuarbeiten.' : 'Join our platform to manage your projects and collaborate with our team.')}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className={`grid grid-cols-2 gap-1.5 p-1 rounded-2xl ${
              isDark 
                ? 'bg-slate-950/80 border border-slate-800' 
                : 'bg-slate-100 border border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-['Archivo'] ${
                  authMode === 'signin'
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className={`w-4 h-4 ${authMode === 'signin' ? (isDark ? 'text-[#BBE7F1]' : 'text-cyan-600') : ''}`} />
                <span>{isDe ? 'Anmelden' : 'Sign In'}</span>
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
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className={`w-4 h-4 ${authMode === 'signup' ? (isDark ? 'text-[#BBE7F1]' : 'text-cyan-600') : ''}`} />
                <span>{isDe ? 'Registrieren' : 'Sign Up'}</span>
              </button>
            </div>

            {/* Quick Fill Demo */}
            <div className={`rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
              isDark
                ? 'bg-[#BBE7F1]/5 border border-[#BBE7F1]/20'
                : 'bg-cyan-50 border border-cyan-200'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-semibold ${
                isDark ? 'text-[#BBE7F1]' : 'text-cyan-900'
              }`}>
                <Zap className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                <span>{isDe ? 'Schnell-Demo:' : 'Quick Demo:'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('client')}
                  className={`px-2.5 py-1 text-xs font-bold font-['Archivo'] rounded-lg transition-colors cursor-pointer shadow-sm ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-[#BBE7F1] border border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-cyan-900 border border-cyan-200'
                  }`}
                >
                  {isDe ? 'Kunde' : 'Client'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin')}
                  className={`px-2.5 py-1 text-xs font-bold font-['Archivo'] rounded-lg transition-colors cursor-pointer shadow-sm ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-[#BBE7F1] border border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-cyan-900 border border-cyan-200'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Demo Notice */}
            {demoNotice && (
              <div className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fadeIn ${
                isDark
                  ? 'text-emerald-300 bg-emerald-500/10 border border-emerald-500/20'
                  : 'text-emerald-800 bg-emerald-50 border border-emerald-200'
              }`}>
                <Check className="w-3.5 h-3.5" />
                <span>{demoNotice}</span>
              </div>
            )}

            {/* SSO Buttons */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSSO('Google')}
                  className={`flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-60 ${
                    isDark
                      ? 'border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300'
                      : 'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSSO('GitHub')}
                  className={`flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm disabled:opacity-60 ${
                    isDark
                      ? 'border border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300'
                      : 'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className={`border-t w-full ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
                <span className={`px-3 text-[11px] font-semibold uppercase tracking-wider font-['Archivo'] shrink-0 ${
                  isDark ? 'bg-slate-900/90 text-slate-500' : 'bg-white text-slate-600'
                }`}>
                  {isDe ? 'oder mit E-Mail' : 'or email'}
                </span>
                <div className={`border-t w-full ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn ${
                isDark
                  ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn ${
                isDark
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {authMode === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                
                {/* Email */}
                <div className="space-y-1.5">
                  <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                    <span>{isDe ? 'E-Mail-Adresse' : 'Email Address'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3.5 pl-10 rounded-xl outline-none transition-all placeholder:text-slate-400 ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                    <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-800'
                    }`}>
                      <Lock className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                      <span>{isDe ? 'Passwort' : 'Password'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotPasswordOpen(true);
                        setForgotPasswordSent(false);
                        setForgotPasswordEmail(signInEmail || '');
                      }}
                      className={`text-[11px] font-semibold underline transition-colors cursor-pointer ${
                        isDark ? 'text-[#BBE7F1] hover:text-cyan-300' : 'text-cyan-800 hover:text-cyan-950'
                      }`}
                    >
                      {isDe ? 'Passwort vergessen?' : 'Forgot password?'}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={signInPassword}
                      onKeyDown={handleKeyDown}
                      onKeyUp={handleKeyDown}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3.5 pl-10 pr-11 rounded-xl outline-none transition-all placeholder:text-slate-400 font-mono ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                    <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                    
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer transition-colors ${
                        isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {capsLockActive && (
                    <div className={`text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-fadeIn ${
                      isDark
                        ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20'
                        : 'text-amber-700 bg-amber-50 border border-amber-200'
                    }`}>
                      <AlertCircle className="w-3 h-3" />
                      <span>{isDe ? 'Feststelltaste ist aktiviert' : 'Caps Lock is ON'}</span>
                    </div>
                  )}
                </div>

                {/* Remember Me */}
                <div className={`flex items-center justify-between text-xs pt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={signInRemember}
                      onChange={(e) => setSignInRemember(e.target.checked)}
                      className={`w-4 h-4 rounded cursor-pointer ${
                        isDark 
                          ? 'accent-[#BBE7F1] border-slate-700' 
                          : 'accent-cyan-600 border-slate-300'
                      }`}
                    />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{isDe ? 'Angemeldet bleiben' : 'Remember me'}</span>
                  </label>
                  <span className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isDe ? 'Verschlüsselt' : 'Encrypted'}</span>
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 mt-3 font-['Archivo'] group ${
                    isDark
                      ? 'bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                        isDark 
                          ? 'border-slate-950/20 border-t-slate-950' 
                          : 'border-white/20 border-t-white'
                      }`} />
                      <span>{loadingMessage}</span>
                    </div>
                  ) : (
                    <>
                      <span>{isDe ? 'Anmelden' : 'Sign In'}</span>
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                        isDark ? 'text-slate-950' : 'text-[#BBE7F1]'
                      }`} />
                    </>
                  )}
                </button>

              </form>
            )}

            {/* SIGN UP FORM */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <User className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                    <span>{isDe ? 'Vollständiger Name *' : 'Full Name *'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3 pl-10 rounded-xl outline-none transition-all placeholder:text-slate-400 ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                    <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                    <span>{isDe ? 'E-Mail-Adresse *' : 'Email *'}</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3 pl-10 rounded-xl outline-none transition-all placeholder:text-slate-400 ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                    <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`} />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    <Globe2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                    <span>{isDe ? 'Region' : 'Region'}</span>
                  </label>
                  <select
                    value={signUpCountry}
                    onChange={(e) => setSignUpCountry(e.target.value as any)}
                    className={`w-full text-xs sm:text-sm p-3 rounded-xl outline-none cursor-pointer font-medium transition-all ${
                      isDark
                        ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                        : 'border border-slate-200 bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                    }`}
                  >
                    <option value="Germany">🇩🇪 {isDe ? 'Deutschland / Europa' : 'Germany / Europe'}</option>
                    <option value="Bangladesh">🇧🇩 {isDe ? 'Bangladesch' : 'Bangladesh'}</option>
                    <option value="International">🌐 {isDe ? 'International' : 'International'}</option>
                  </select>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-800'
                    }`}>
                      <Building className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                      <span>{isDe ? 'Unternehmen' : 'Company'}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={isDe ? 'Name des Unternehmens' : 'Company Name'}
                      value={signUpCompany}
                      onChange={(e) => setSignUpCompany(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3 rounded-xl outline-none transition-all placeholder:text-slate-400 ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-800'
                    }`}>
                      <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                      <span>{isDe ? 'Telefon' : 'Phone'}</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 ..."
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3 rounded-xl outline-none transition-all placeholder:text-slate-400 font-mono ${
                        isDark
                          ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                          : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-800'
                      }`}>
                        <Lock className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                        <span>{isDe ? 'Passwort *' : 'Password *'}</span>
                      </label>
                      {signUpPassword && (
                        <span className={`text-[10px] font-bold ${
                          passwordStrength.score >= 3 ? 'text-emerald-500' : 'text-amber-500'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showSignUpPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder={isDe ? 'Mind. 6 Zeichen' : 'Min 6 characters'}
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className={`w-full text-xs sm:text-sm p-3 pr-10 rounded-xl outline-none transition-all placeholder:text-slate-400 font-mono ${
                          isDark
                            ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                            : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 cursor-pointer transition-colors ${
                          isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    {signUpPassword.length > 0 && (
                      <div className="grid grid-cols-4 gap-1 pt-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div 
                            key={level}
                            className={`h-1 rounded-full transition-colors ${
                              passwordStrength.score >= level 
                                ? passwordStrength.color 
                                : isDark ? 'bg-slate-800' : 'bg-slate-200'
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-800'
                      }`}>
                        <KeyRound className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                        <span>{isDe ? 'Bestätigen *' : 'Confirm *'}</span>
                      </label>
                      {passwordsMatch && (
                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> {isDe ? 'Übereinstimmung' : 'Match'}
                        </span>
                      )}
                    </div>
                    <input
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder={isDe ? 'Passwort wiederholen' : 'Re-enter password'}
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      className={`w-full text-xs sm:text-sm p-3 rounded-xl outline-none transition-all placeholder:text-slate-400 font-mono ${
                        signUpConfirmPassword.length > 0 && !passwordsMatch
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                          : isDark
                            ? 'border border-slate-800 bg-slate-950/50 hover:bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                            : 'border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="pt-1">
                  <label className={`flex items-start gap-2.5 text-xs cursor-pointer select-none ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className={`w-4 h-4 mt-0.5 rounded shrink-0 ${
                        isDark 
                          ? 'accent-[#BBE7F1] border-slate-700' 
                          : 'accent-cyan-600 border-slate-300'
                      }`}
                    />
                    <span className="leading-snug text-[11px]">
                      {isDe ? 'Ich akzeptiere die ' : 'I accept the '}
                      <a href="/terms" className={`font-semibold underline ${
                        isDark ? 'text-[#BBE7F1]' : 'text-cyan-900'
                      }`}>
                        {isDe ? 'AGB' : 'Terms of Service'}
                      </a>
                      {isDe ? ' und die ' : ' and '}
                      <a href="/privacy" className={`font-semibold underline ${
                        isDark ? 'text-[#BBE7F1]' : 'text-cyan-900'
                      }`}>
                        {isDe ? 'Datenschutzerklärung' : 'Privacy Policy'}
                      </a>.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 mt-3 font-['Archivo'] group ${
                    isDark
                      ? 'bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 border-2 rounded-full animate-spin ${
                        isDark 
                          ? 'border-slate-950/20 border-t-slate-950' 
                          : 'border-white/20 border-t-white'
                      }`} />
                      <span>{loadingMessage}</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{isDe ? 'Konto erstellen' : 'Create Account'}</span>
                    </>
                  )}
                </button>

              </form>
            )}

            {/* Security Note */}
            <div className={`text-[11px] text-center flex items-center justify-center gap-2 pt-3 border-t ${
              isDark ? 'text-slate-500 border-slate-800' : 'text-slate-600 border-slate-100'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{isDe ? 'TLS 1.3 Ende-zu-Ende-Verschlüsselung' : 'TLS 1.3 End-to-End Encryption'}</span>
            </div>

          </div>

          {/* Right Panel - Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 auth-fade-item">
            
            {/* Main Info Card */}
            <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden ${
              isDark
                ? 'bg-slate-950/90 border border-slate-800/90'
                : 'bg-white border border-slate-200'
            }`}>
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
                isDark ? 'bg-cyan-500/10' : 'bg-cyan-200/30'
              }`} />
              
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                  isDark
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>99.98% Uptime</span>
                </div>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  SOC2 Type II
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className={`text-xl font-bold font-['Archivo'] tracking-tight flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}>
                  <span>{isDe ? 'Enterprise-Kundenportal' : 'Enterprise Client Portal'}</span>
                  <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {isDe 
                    ? 'Direkter Zugriff auf Ihre Projekte, Meilensteine und dedizierten technischen Support.' 
                    : 'Direct access to your projects, milestones, and dedicated technical support.'}
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                
                <div className={`flex items-start gap-3 p-3 rounded-2xl transition-colors ${
                  isDark
                    ? 'bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80'
                    : 'bg-slate-50 border border-slate-100 hover:border-slate-200'
                }`}>
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-[#BBE7F1]/10 border border-[#9cd5e2]/20 text-[#BBE7F1]'
                      : 'bg-cyan-50 border border-cyan-200 text-cyan-600'
                  }`}>
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-bold font-['Archivo'] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {isDe ? 'Dual-Hub-Engineering' : 'Dual-Hub Engineering'}
                    </h4>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isDe 
                        ? 'Teams in Deutschland und Bangladesch für maximale Umsetzungsgeschwindigkeit.' 
                        : 'Germany and Bangladesh teams for maximum delivery speed.'}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3 rounded-2xl transition-colors ${
                  isDark
                    ? 'bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80'
                    : 'bg-slate-50 border border-slate-100 hover:border-slate-200'
                }`}>
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                      : 'bg-purple-50 border border-purple-200 text-purple-600'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-bold font-['Archivo'] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {isDe ? 'RBAC-Sicherheitsarchitektur' : 'RBAC Governance'}
                    </h4>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isDe 
                        ? 'Rollenbasierte Verschlüsselung für sicheres Projektmanagement.' 
                        : 'Role-based encryption for secure project management.'}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3 rounded-2xl transition-colors ${
                  isDark
                    ? 'bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80'
                    : 'bg-slate-50 border border-slate-100 hover:border-slate-200'
                }`}>
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isDark
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  }`}>
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`font-bold font-['Archivo'] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {isDe ? 'CI/CD-Auditierung' : 'CI/CD Auditing'}
                    </h4>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isDe 
                        ? 'Automatisierte Tests und produktionsreife Bereitstellung.' 
                        : 'Automated testing and production-ready deployments.'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Testimonial */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className={`text-[11px] font-mono ml-1.5 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    5.0
                  </span>
                </div>
                <p className={`text-xs italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isDe 
                    ? '„Hat unsere Plattform 3 Wochen vor dem Zeitplan mit null technischer Schuld geliefert.“' 
                    : '“Delivered our platform 3 weeks ahead of schedule with zero technical debt.”'}
                </p>
                <div className={`mt-2.5 flex items-center justify-between text-[11px] ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span className={`font-semibold font-['Archivo'] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {isDe ? 'Leitung Digitalisierung' : 'Head of Digital'}
                  </span>
                  <span>{isDe ? 'EMEA-Partner' : 'EMEA Partner'}</span>
                </div>
              </div>

            </div>

            {/* Contact Card */}
            <div className={`backdrop-blur-md rounded-2xl p-4 space-y-3 ${
              isDark
                ? 'bg-slate-900/80 border border-slate-800/80'
                : 'bg-white border border-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-xs font-semibold font-['Archivo'] ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className={`flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  <Headphones className={`w-3.5 h-3.5 ${isDark ? 'text-[#BBE7F1]' : 'text-cyan-600'}`} />
                  <span>{isDe ? 'Direkte Hotlines' : 'Direct Hotlines'}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Live</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a 
                  href={`tel:${siteSettings.phone_de.replace(/\s+/g, '')}`} 
                  className={`p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    isDark
                      ? 'bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{isDe ? '🇩🇪 Deutschland:' : '🇩🇪 Germany:'}</span>
                  <span className="font-mono text-cyan-400 font-semibold text-[11px]">{siteSettings.phone_de}</span>
                </a>
                <a 
                  href={`tel:${siteSettings.phone_bd.replace(/\s+/g, '')}`} 
                  className={`p-2.5 rounded-xl transition-colors flex items-center justify-between ${
                    isDark
                      ? 'bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{isDe ? '🇧🇩 Bangladesch:' : '🇧🇩 Bangladesh:'}</span>
                  <span className="font-mono text-emerald-400 font-semibold text-[11px]">{siteSettings.phone_bd}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-3 border-t ${
        isDark 
          ? 'text-slate-500 border-slate-900' 
          : 'text-slate-600 border-slate-200'
      }`}>
        <span>&copy; {new Date().getFullYear()} {siteSettings.companyName}. {isDe ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</span>
        <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <a href="/privacy" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
            {isDe ? 'Datenschutz' : 'Privacy'}
          </a>
          <span>•</span>
          <a href="/terms" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
            {isDe ? 'AGB' : 'Terms'}
          </a>
          <span>•</span>
          <span>{isDe ? 'DSGVO-konform' : 'GDPR Compliant'}</span>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4 ${
            isDark
              ? 'bg-slate-900 text-slate-100 border border-slate-800'
              : 'bg-white text-slate-900 border border-slate-200'
          }`}>
            
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(false)}
              className={`absolute right-4 top-4 p-1.5 rounded-xl transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDark
                ? 'bg-[#BBE7F1]/10 border border-[#9cd5e2]/20 text-[#BBE7F1]'
                : 'bg-cyan-50 border border-cyan-200 text-cyan-900'
            }`}>
              <KeyRound className="w-6 h-6" />
            </div>

            <div>
              <h3 className={`text-xl font-bold font-['Archivo'] ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                {isDe ? 'Passwort zurücksetzen' : 'Reset Password'}
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {isDe 
                  ? 'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Wiederherstellungslink.' 
                  : "Enter your email and we'll send you a recovery link."}
              </p>
            </div>

            {forgotPasswordSent ? (
              <div className={`p-4 rounded-2xl text-xs space-y-2 ${
                isDark
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDe ? 'Wiederherstellungs-E-Mail gesendet' : 'Recovery Email Sent'}</span>
                </div>
                <p className="leading-relaxed">
                  {isDe ? 'Prüfen Sie ' : 'Check '}<strong>{forgotPasswordEmail}</strong>{isDe ? ' für Anweisungen zur Wiederherstellung.' : ' for instructions.'}
                </p>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className={`w-full mt-3 font-bold py-2.5 rounded-xl text-xs ${
                    isDark
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  {isDe ? 'Zurück zur Anmeldung' : 'Back to Sign In'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotPasswordEmail.trim()) {
                    setForgotPasswordSent(true);
                  }
                }}
                className="space-y-3 pt-2"
              >
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold uppercase tracking-wider font-['Archivo'] ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    {isDe ? 'E-Mail-Adresse' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    className={`w-full text-xs sm:text-sm p-3 rounded-xl outline-none transition-all ${
                      isDark
                        ? 'border border-slate-800 bg-slate-950 focus:bg-slate-950 focus:border-[#BBE7F1] focus:ring-4 focus:ring-[#BBE7F1]/20 text-slate-100'
                        : 'border border-slate-200 bg-slate-50 focus:bg-white focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full font-bold text-xs sm:text-sm py-3 rounded-xl transition-all cursor-pointer shadow-md font-['Archivo'] ${
                    isDark
                      ? 'bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isDe ? 'Wiederherstellungslink senden' : 'Send Recovery Link'}
                </button>

                <p className={`text-[10px] text-center pt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {isDe ? 'Geschützt durch 256-Bit-Verschlüsselung.' : 'Protected by 256-bit encryption.'}
                </p>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
