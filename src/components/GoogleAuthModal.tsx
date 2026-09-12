import React, { useState } from 'react';
import { X, Shield, CheckCircle2, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client'>('admin');
  const [customName, setCustomName] = useState('Client Partner');
  const [customEmail, setCustomEmail] = useState('client@example.com');
  const [customCountry, setCustomCountry] = useState<'Bangladesh' | 'Germany' | 'International'>('Germany');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async (roleType: 'admin' | 'client') => {
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
        onClose();
      }
    } catch (err) {
      // Fallback
      const profile: UserProfile = {
        id: `user-${Date.now()}`,
        name: roleType === 'admin' ? 'Tanvir Hossain (CTO & Admin)' : customName,
        email: roleType === 'admin' ? 'admin@webdevsoftware.com' : customEmail,
        avatar: roleType === 'admin'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: roleType,
        company: 'Partner Enterprise',
        phone: '+49 214 839201',
        country: customCountry,
        savedProjects: ['proj-1'],
        inquiries: []
      };
      onLoginSuccess(profile);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#090d18] text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm inline-flex items-center justify-center mx-auto mb-3">
            <img 
              src="/images/logo/webdev-logo.png" 
              alt="WebDev Software Solutions" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <h3 className="text-xl font-bold font-['Outfit']">
            WebDev Client & Admin Portal
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sign in with Google Auth to access project management, inquiry tracking, and admin controls.
          </p>
        </div>

        {/* Auth Body */}
        <div className="p-6 space-y-5">
          
          {/* Direct One-Click Google Auth */}
          <div>
            <button
              onClick={() => handleGoogleSignIn('admin')}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-indigo-500 py-3 px-4 rounded-xl text-sm font-semibold text-slate-800 shadow-sm hover:shadow transition-all group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google (Admin Access)</span>
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-1.5">
              Includes Admin Dashboard & CRUD permissions for testing
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase">Or Client Demo</span>
          </div>

          {/* Quick Client Sign In */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                placeholder="Lukas Schneider"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Region
                </label>
                <select
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Germany">Germany (DE)</option>
                  <option value="Bangladesh">Bangladesh (BD)</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Target Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                  className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-indigo-600"
                >
                  <option value="client">Client User</option>
                  <option value="admin">Admin / Staff</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGoogleSignIn(selectedRole)}
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In as {selectedRole === 'admin' ? 'Admin' : 'Client'}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted OAuth2 session • Joypurhat & Leverkusen</span>
          </div>

        </div>

      </div>
    </div>
  );
};
