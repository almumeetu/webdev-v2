import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Building, Shield, Check, LogOut, FileText, Bookmark, RefreshCw } from 'lucide-react';
import { UserProfile, Inquiry } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  userInquiries: Inquiry[];
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onLogout,
  userInquiries
}) => {
  const [name, setName] = useState(currentUser.name);
  const [company, setCompany] = useState(currentUser.company || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [country, setCountry] = useState(currentUser.country);
  const [role, setRole] = useState(currentUser.role);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name,
      company,
      phone,
      country,
      role
    };
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 relative animate-fadeIn my-8">
        
        {/* Header */}
        <div className="bg-[#090d18] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-['Outfit']">{currentUser.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  currentUser.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'
                }`}>
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">{currentUser.email}</p>
              <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Connected via Google Authentication
              </div>
            </div>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Bavarian Tech GmbH"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 ... or +880 ..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Location / Branch
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Germany">Germany (Leverkusen / NRW)</option>
                  <option value="Bangladesh">Bangladesh (Joypurhat / Dhaka)</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>

            {/* Quick Role Toggle to easily test Admin Dashboard */}
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-indigo-950">Active Role Mode</div>
                <div className="text-[11px] text-indigo-700">Switch role to test Admin Dashboard or Client view</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    role === 'client' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-900 border border-indigo-200'
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    role === 'admin' ? 'bg-purple-600 text-white' : 'bg-white text-purple-900 border border-purple-200'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{isSaved ? 'Saved Changes!' : 'Update Profile'}</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </form>

          {/* User Submitted Inquiries Section */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Your Recent Project Estimates & Inquiries</span>
            </h4>

            {userInquiries.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {userInquiries.map((inq) => (
                  <div key={inq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{inq.projectType}</div>
                      <div className="text-[11px] text-slate-500">Budget: {inq.budget} • {inq.targetMarket}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
                No active project inquiries yet. Click "GET STARTED" to submit your project requirements!
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
