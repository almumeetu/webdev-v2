import React, { useState, useRef } from 'react';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Breadcrumb } from './Breadcrumb';

interface AuthPageProps {
  onBack: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onBack,
  onLoginSuccess,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client'>('client');
  const [customName, setCustomName] = useState('Client Partner');
  const [customEmail, setCustomEmail] = useState('partner@enterprise.com');
  const [customCountry, setCustomCountry] = useState<'Bangladesh' | 'Germany' | 'International'>('Germany');
  const [isLoading, setIsLoading] = useState(false);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.auth-fade-item',
      { opacity: 0, y: isMobile ? 10 : 20 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.08,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  const handleSignIn = async (roleType: 'admin' | 'client') => {
    setIsLoading(true);

    try {
      const email = roleType === 'admin' ? 'tanvir.admin@webdevsoftware.com' : customEmail;
      const name = roleType === 'admin' ? 'Tanvir Hossain (CTO & Admin)' : customName;
      const avatar = roleType === 'admin' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, picture: avatar, role: roleType })
      });

      const data = await res.json();
      if (data.success && data.user) {
        const profile: UserProfile = {
          ...data.user,
          role: roleType,
          country: customCountry,
          company: roleType === 'admin' ? 'WebDev Software Solutions' : 'Enterprise Partner',
          phone: roleType === 'admin' ? '+880 1700-928374' : '+49 171 000000',
          savedProjects: ['proj-1', 'proj-3'],
          inquiries: []
        };
        onLoginSuccess(profile);
      } else {
        const fallbackProfile: UserProfile = {
          id: `user-${Date.now()}`,
          name,
          email,
          avatar,
          role: roleType,
          country: customCountry,
          company: roleType === 'admin' ? 'WebDev Software Solutions' : 'Enterprise Partner',
          phone: roleType === 'admin' ? '+880 1700-928374' : '+49 171 000000',
          savedProjects: ['proj-1', 'proj-3'],
          inquiries: []
        };
        onLoginSuccess(fallbackProfile);
      }
    } catch {
      const fallbackProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name: roleType === 'admin' ? 'Tanvir Hossain (CTO & Admin)' : customName,
        email: roleType === 'admin' ? 'tanvir.admin@webdevsoftware.com' : customEmail,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: roleType,
        country: customCountry,
        company: roleType === 'admin' ? 'WebDev Software Solutions' : 'Enterprise Partner',
        phone: '+49 171 000000',
        savedProjects: ['proj-1'],
        inquiries: []
      };
      onLoginSuccess(fallbackProfile);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Standard Breadcrumb & Hero Banner */}
      <Breadcrumb
        badge="ENTERPRISE AUTHENTICATION"
        title="Client & Partner Secure Portal"
        subtitle="Access your project milestones, architecture blueprints, sprint updates, and technical telemetry."
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Client Portal & Authentication', active: true }
        ]}
        backAction={onBack}
        backLabel="Back to Home"
        align="center"
      />

      <div className="max-w-xl mx-auto px-4 space-y-8 py-12 sm:py-16">

        {/* Card */}
        <div className="auth-fade-item bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <img 
              src="/images/logo/webdev-logo.png" 
              alt="WebDev Software Solutions" 
              className="h-12 sm:h-14 w-auto object-contain mx-auto mb-2"
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-['Outfit']">
              Client & Enterprise Sign In
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Access your project milestones, consultation dossiers, and server monitoring dashboards.
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedRole('client')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedRole === 'client'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Enterprise Client
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Administrative Staff
            </button>
          </div>

          {selectedRole === 'client' && (
            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                  Partner Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                  Operating Headquarters
                </label>
                <select
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value as any)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                >
                  <option value="Germany">Germany / Europe (DACH)</option>
                  <option value="Bangladesh">Bangladesh (Joypurhat / Dhaka)</option>
                  <option value="International">International (USA / Global)</option>
                </select>
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={() => handleSignIn(selectedRole)}
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span>Authorizing Session...</span>
            ) : (
              <span>Sign In as {selectedRole === 'admin' ? 'Administrator' : 'Client Partner'}</span>
            )}
          </button>

          <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authenticated session with end-to-end encryption.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
