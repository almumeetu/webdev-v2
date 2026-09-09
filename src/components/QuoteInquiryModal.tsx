import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, DollarSign, Globe, Calculator, AlertCircle } from 'lucide-react';
import { Inquiry } from '../types';

interface QuoteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (inquiry: Inquiry) => void;
}

export const QuoteInquiryModal: React.FC<QuoteInquiryModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('Full Stack & MERN');
  const [budget, setBudget] = useState('$3,000 - $6,000');
  const [targetMarket, setTargetMarket] = useState<'Bangladesh' | 'Germany' | 'International' | 'Both'>('International');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        projectType,
        budget,
        targetMarket,
        message
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        onSubmitSuccess(data.inquiry);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      // Fallback local creation
      const localInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        projectType,
        budget,
        targetMarket,
        message,
        createdAt: new Date().toISOString(),
        status: 'new'
      };
      onSubmitSuccess(localInquiry);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 relative my-8">
        
        {/* Modal Header */}
        <div className="bg-[#090d18] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S CONNECT • JOYPURHAT & LEVERKUSEN</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Got an App or Server in Mind?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Send us your requirements, and our engineering leads in Bangladesh and Germany will prepare a complimentary architecture review & estimate within 24 hours.
          </p>
        </div>

        {/* Modal Body */}
        {successMessage ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 font-['Outfit']">
              Inquiry Received Successfully!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, {firstName}! Our technical leads have received your project details. We will reach out via <strong className="text-slate-800">{email}</strong> promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lukas or Tanvir"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schneider or Rahman"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+49 ... or +880 ..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Project Type & Target Market */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project Domain
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-white"
                >
                  <option value="Full Stack & MERN">Full Stack & MERN Platform</option>
                  <option value="Cloud & Server Architecture">Linux Server & DevOps Architecture</option>
                  <option value="E-Commerce">E-Commerce (Shopify Plus / Woo)</option>
                  <option value="WordPress & CMS">WordPress & Enterprise Custom CMS</option>
                  <option value="Web Application">Interactive Web Application</option>
                  <option value="Backend & API">High-Throughput Backend & APIs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Market / Deployment Region
                </label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-white"
                >
                  <option value="Germany">Germany & DACH Region (Europe)</option>
                  <option value="Bangladesh">Bangladesh & South Asia</option>
                  <option value="International">International / Worldwide</option>
                  <option value="Both">Both (Cross-Border Integration)</option>
                </select>
              </div>
            </div>

            {/* Budget & Timeline selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Project Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['$1,500 - $3,000', '$3,000 - $6,000', '$6,000 - $15,000', '$15,000+'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBudget(tier)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                      budget === tier
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Message / Specifications */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tell Us About Your Project & Architecture Goals
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe features, server load, integrations (e.g. MERN stack, Shopify, Hetzner server setup, payment gateways)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Estimate...</span>
                ) : (
                  <>
                    <span>SUBMIT INQUIRY & GET ESTIMATE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                🔒 Protected by mutual NDA & German GDPR data privacy standards.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
