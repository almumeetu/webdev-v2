import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, DollarSign, Globe, Calculator, AlertCircle } from 'lucide-react';
import { Inquiry } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang, t } = useLanguage();
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
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'KONTAKT AUFNEHMEN • SCHNELLE ANALYSE & ARCHITEKTUR' : "LET'S CONNECT • RAPID SCOPING & ARCHITECTURE"}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-['Archivo']">
            {lang === 'de' ? 'Haben Sie ein Projekt oder eine Cloud-Infrastruktur im Sinn?' : 'Got an App or Server in Mind?'}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {lang === 'de'
              ? 'Senden Sie uns Ihre Anforderungen. Unsere Lösungsarchitekten erstellen innerhalb von 24 Stunden eine kostenfreie Architekturanalyse und Kostenschätzung.'
              : 'Send us your requirements, and our solutions architects will prepare a complimentary architecture review and estimate within 24 hours.'}
          </p>
        </div>

        {/* Modal Body */}
        {successMessage ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 font-['Archivo']">
              {lang === 'de' ? 'Anfrage erfolgreich eingegangen!' : 'Inquiry Received Successfully!'}
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {lang === 'de' ? (
                <>Vielen Dank, {firstName}! Unsere technischen Leads haben Ihre Projektdetails erhalten. Wir melden uns zeitnah unter <strong className="text-slate-800">{email}</strong> bei Ihnen.</>
              ) : (
                <>Thank you, {firstName}! Our technical leads have received your project details. We will reach out via <strong className="text-slate-800">{email}</strong> promptly.</>
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Vorname *' : 'First Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'de' ? 'z. B. Lukas oder Tanvir' : 'e.g. Lukas or Tanvir'}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Nachname *' : 'Last Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'de' ? 'z. B. Schneider oder Rahman' : 'e.g. Schneider or Rahman'}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 text-slate-900"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Geschäftliche E-Mail *' : 'Work Email *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Telefon / WhatsApp *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+49 ... oder +880 ..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 text-slate-900"
                />
              </div>
            </div>

            {/* Project Type & Target Market */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Projektbereich / Architektur' : 'Project Domain'}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 bg-white text-slate-900"
                >
                  <option value="Full Stack & MERN">{lang === 'de' ? 'Full Stack & MERN Plattform' : 'Full Stack & MERN Platform'}</option>
                  <option value="Cloud & Server Architecture">{lang === 'de' ? 'Linux Server & DevOps Infrastruktur' : 'Linux Server & DevOps Architecture'}</option>
                  <option value="E-Commerce">{lang === 'de' ? 'E-Commerce (Shopify Plus / Woo)' : 'E-Commerce (Shopify Plus / Woo)'}</option>
                  <option value="WordPress & CMS">{lang === 'de' ? 'WordPress & Enterprise Headless CMS' : 'WordPress & Enterprise Custom CMS'}</option>
                  <option value="Web Application">{lang === 'de' ? 'Interaktive Webapplikation' : 'Interactive Web Application'}</option>
                  <option value="Backend & API">{lang === 'de' ? 'Hochperformante Backends & APIs' : 'High-Throughput Backend & APIs'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {lang === 'de' ? 'Zielmarkt / Bereitstellungsregion' : 'Target Market / Deployment Region'}
                </label>
                <select
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 bg-white text-slate-900"
                >
                  <option value="Germany">{lang === 'de' ? 'Deutschland & DACH-Region (Europa)' : 'Germany & DACH Region (Europe)'}</option>
                  <option value="Bangladesh">{lang === 'de' ? 'Bangladesch & Südasien' : 'Bangladesh & South Asia'}</option>
                  <option value="International">{lang === 'de' ? 'International / Weltweit' : 'International / Worldwide'}</option>
                  <option value="Both">{lang === 'de' ? 'Beide (Grenzüberschreitende Integration)' : 'Both (Cross-Border Integration)'}</option>
                </select>
              </div>
            </div>

            {/* Message / Specifications */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {lang === 'de' ? 'Erzählen Sie uns von Ihrem Projekt & Ihren Architekturzielen' : 'Tell Us About Your Project & Architecture Goals'}
              </label>
              <textarea
                rows={3}
                required
                placeholder={lang === 'de' ? 'Beschreiben Sie gewünschte Features, Serverlast, Schnittstellen (z. B. MERN-Stack, Shopify, Hetzner-Server, Zahlungs-Gateways)...' : 'Describe features, server load, integrations (e.g. MERN stack, Shopify, Hetzner server setup, payment gateways)...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50 text-slate-900"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer border border-[#9cd5e2] shadow-sm"
              >
                {isSubmitting ? (
                  <span>{lang === 'de' ? 'Kostenschätzung wird vorbereitet...' : 'Processing Estimate...'}</span>
                ) : (
                  <>
                    <span>{lang === 'de' ? 'ANFRAGE ABSENDEN & SCHÄTZUNG ERHALTEN' : 'SUBMIT INQUIRY & GET ESTIMATE'}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                {lang === 'de' 
                  ? '🔒 Geschützt durch beidseitige Geheimhaltungsvereinbarung (NDA) & DSGVO-Datenschutzstandards.' 
                  : '🔒 Protected by mutual NDA & German GDPR data privacy standards.'}
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
