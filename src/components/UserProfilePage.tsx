import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Mail, Phone, Building, Globe, CheckCircle2, Clock, LogOut } from 'lucide-react';
import { UserProfile, Inquiry } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Breadcrumb } from './Breadcrumb';

interface UserProfilePageProps {
  currentUser: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  userInquiries: Inquiry[];
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  currentUser,
  onBack,
  onUpdateProfile,
  onLogout,
  userInquiries
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [company, setCompany] = useState(currentUser.company || '');
  const [isSaved, setIsSaved] = useState(false);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.profile-fade-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      name,
      phone,
      company
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Standard Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Client Profile & Portal', active: true }
        ]}
        backAction={onBack}
        backLabel="Back to Home"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-12 sm:py-16">

        {/* User Card */}
        <div className="profile-fade-item bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-600 shadow-md shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                {currentUser.role === 'admin' ? 'System Administrator' : 'Client Partner'}
              </span>
              <span className="text-xs text-slate-500 font-medium">({currentUser.country})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-['Outfit']">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {currentUser.email} • {currentUser.company || 'Enterprise Organization'}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Update Profile Form & Inquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Edit form */}
          <div className="profile-fade-item lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
              Account Information
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Corporate Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isSaved ? 'Updated Successfully!' : 'Save Account Updates'}
              </button>
            </form>
          </div>

          {/* Inquiries */}
          <div className="profile-fade-item lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
              Submitted Architecture Inquiries ({userInquiries.length})
            </h2>
            {userInquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No active consultation requests found for this account.
              </p>
            ) : (
              <div className="space-y-3">
                {userInquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{inq.projectType}</span>
                      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {inq.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {inq.message}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Budget: {inq.budget} • Region: {inq.targetMarket}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
