import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, User, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState<'Bangladesh' | 'Germany' | 'International'>('Germany');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const endpoint = mode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'signin'
        ? { email: email.trim(), password }
        : { name: name.trim(), email: email.trim(), password, country };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
        return;
      }

      setErrorMessage(data.message || 'Authentication failed. Please verify credentials.');
    } catch {
      setErrorMessage('Server connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center justify-center mx-auto mb-3">
            <img 
              src="/images/logo/webdev-logo.png" 
              alt="WebDev Software Solutions" 
              className="h-8 w-auto object-contain"
            />
          </div>

          <h3 className="text-xl font-bold font-['Archivo']">
            {mode === 'signin' ? 'Sign In to Portal' : 'Register Organization'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access enterprise sprint updates, architectural dossiers, and client controls.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-6 pb-0">
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMessage(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signin'
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(null); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lukas Schneider"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#9cd5e2] outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Corporate Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@enterprise.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#9cd5e2] outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#9cd5e2] outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Region / Branch</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as any)}
                className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="Germany">Germany (DE)</option>
                <option value="Bangladesh">Bangladesh (BD)</option>
                <option value="International">International</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 mt-2"
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : mode === 'signin' ? (
              <span>Sign In to Account</span>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Session • TLS 256-bit Security</span>
          </div>

        </form>

      </div>
    </div>
  );
};

// Backwards compatibility alias
export const GoogleAuthModal = AuthModal;
