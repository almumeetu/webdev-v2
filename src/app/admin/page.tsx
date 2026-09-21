'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { AdminDashboard } from '@/components/AdminDashboard';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft, 
  LogIn, 
  AlertCircle,
  KeyRound,
  LogOut
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const ctx = useAppContext();
  const isAdmin = ctx.currentUser?.role === 'admin';

  // State for Admin Gatekeeper
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAdminAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both administrator email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        if (data.user.role !== 'admin') {
          setErrorMessage('Access Denied: The authenticated account does not possess administrator privileges.');
          return;
        }

        setSuccessMessage('Administrator credentials verified. Access granted.');
        setTimeout(() => {
          ctx.login(data.user);
        }, 500);
        return;
      }

      setErrorMessage(data.message || 'Invalid administrator credentials. Access restricted.');
    } catch {
      setErrorMessage('Unable to connect to authentication server. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── 1. IF NOT ADMIN: RENDER SECURE GATEKEEPER ONLY ───────────────────────
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between relative overflow-hidden font-['Instrument_Sans']">
        
        {/* Ambient Glows */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-cyan-900/10 blur-3xl pointer-events-none" />

        {/* Minimal Top Header */}
        <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Website</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-medium">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Restricted Gateway</span>
          </div>
        </header>

        {/* Centered Admin Login Box */}
        <main className="relative z-10 max-w-md w-full mx-auto px-4 py-8">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header / Brand */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 mb-1 shadow-inner">
                <KeyRound className="w-7 h-7 text-[#BBE7F1]" />
              </div>
              <h1 className="text-2xl font-bold font-['Archivo'] tracking-tight text-white">
                Admin Console
              </h1>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Authorized engineering personnel only. Enter your administrator credentials to unlock the CMS.
              </p>
            </div>

            {/* Current Client session notice if user is logged in as non-admin */}
            {ctx.currentUser && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-amber-300">Client Session Detected</p>
                  <p className="text-[11px] text-amber-200/80 leading-snug">
                    Logged in as <strong>{ctx.currentUser.email}</strong>. Administrator credentials are required to access this system.
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* Admin Credential Form */}
            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              
              {/* Admin Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#BBE7F1]" />
                  <span>Admin Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@webdevss.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#9cd5e2]/30 outline-none text-white transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Admin Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-['Archivo'] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#BBE7F1]" />
                  <span>Admin Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3.5 pr-11 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#9cd5e2]/30 outline-none text-white transition-all placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-xs sm:text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60 mt-2 font-['Archivo']"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Authenticate & Access CMS</span>
                  </>
                )}
              </button>

            </form>

            {/* Security Indicator */}
            <div className="pt-4 border-t border-white/5 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 256-bit Encrypted Session • Audited Access Log</span>
            </div>

          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="relative z-10 w-full text-center py-6 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} WebDev Software Solutions. Confidential Administrative System.</span>
        </footer>

      </div>
    );
  }

  // ─── 2. IF AUTHENTICATED ADMIN: RENDER DASHBOARD ──────────────────────────
  return (
    <div className="min-h-screen bg-[#090a0f] flex flex-col">
      {/* Top Admin Active Banner */}
      <div className="bg-purple-950/90 border-b border-purple-800/40 px-4 py-2 text-xs text-purple-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Administrator Session Active: <strong>{ctx.currentUser?.name}</strong> ({ctx.currentUser?.email})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/')}
            className="text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-xs"
          >
            <span>Exit to Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <span className="text-purple-700">|</span>
          <button
            onClick={() => ctx.logout()}
            className="text-rose-300 hover:text-rose-200 flex items-center gap-1 cursor-pointer transition-colors text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      <AdminDashboard
        projects={ctx.projects}
        teamMembers={ctx.teamMembers}
        blogs={ctx.blogs}
        inquiries={ctx.inquiries}
        services={ctx.services}
        testimonials={ctx.testimonials}
        siteSettings={ctx.siteSettings}
        onAddProject={ctx.addProject}
        onUpdateProject={ctx.updateProject}
        onUpdateProjectStatus={ctx.updateProjectStatus}
        onDeleteProject={ctx.deleteProject}
        onAddTeamMember={ctx.addTeamMember}
        onUpdateTeamMember={ctx.updateTeamMember}
        onDeleteTeamMember={ctx.deleteTeamMember}
        onAddBlog={ctx.addBlog}
        onUpdateBlog={ctx.updateBlog}
        onDeleteBlog={ctx.deleteBlog}
        onUpdateInquiryStatus={ctx.updateInquiryStatus}
        onDeleteInquiry={ctx.deleteInquiry}
        onAddService={ctx.addService}
        onUpdateService={ctx.updateService}
        onDeleteService={ctx.deleteService}
        onAddTestimonial={ctx.addTestimonial}
        onUpdateTestimonial={ctx.updateTestimonial}
        onDeleteTestimonial={ctx.deleteTestimonial}
        onUpdateSiteSettings={ctx.updateSiteSettings}
        onResetDefaults={ctx.resetToDefaultData}
        onClose={() => router.push('/')}
      />
    </div>
  );
}
