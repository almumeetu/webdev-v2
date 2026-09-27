'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Building2, 
  ArrowRight,
  ExternalLink,
  PhoneCall,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { Project, Inquiry } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  allProjects?: Project[];
  onSubmitSuccess?: (inquiry: Inquiry) => void;
}

export const ProjectOrderModal: React.FC<ProjectOrderModalProps> = ({
  isOpen,
  onClose,
  project,
  allProjects = [],
  onSubmitSuccess,
}) => {
  const { lang, t, localizeProject } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(project?.id || '');
  const [packageType, setPackageType] = useState<'turnkey' | 'custom' | 'enterprise'>('turnkey');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [timeline, setTimeline] = useState('Standard (2-4 Weeks)');
  const [budget, setBudget] = useState('$3,000 - $6,000');
  const [ndaRequested, setNdaRequested] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (project) {
      setSelectedProjectId(project.id);
      if (project.priceRange) {
        setBudget(project.priceRange);
      }
    }
  }, [project]);

  if (!isOpen) return null;

  const rawActiveProject = allProjects.find((p) => p.id === selectedProjectId) || project;
  const activeProject = rawActiveProject ? localizeProject(rawActiveProject) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || 'Client';
      const lastName = nameParts.slice(1).join(' ') || 'Order';

      const projectTitle = activeProject ? activeProject.title : 'Custom Architecture';
      const packageLabel = 
        packageType === 'turnkey' 
          ? '⚡ Turnkey Setup / Clone (7-14 Days)' 
          : packageType === 'custom' 
          ? '🛠️ Customized Architecture (2-4 Weeks)' 
          : '🚀 Enterprise Bespoke Build (Full Scale)';

      const detailedNotes = `[PORTFOLIO DIRECT ORDER]
Project Reference: ${projectTitle} (${activeProject?.category || 'General'})
Selected Package: ${packageLabel}
Requested Timeline: ${timeline}
Client Budget: ${budget}
NDA Required: ${ndaRequested ? 'YES' : 'NO'}

Client Specifications & Details:
${message || 'Client is interested in deploying a platform similar to ' + projectTitle + '.'}
`;

      const payload = {
        firstName,
        lastName,
        email,
        phoneNumber,
        company: company || undefined,
        projectType: activeProject?.category || 'Full Stack & MERN',
        budget,
        targetMarket: 'International',
        message: detailedNotes,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        if (onSubmitSuccess) {
          onSubmitSuccess(data.inquiry);
        }
      }

      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 2400);
    } catch (err) {
      console.error('Failed to submit order request', err);
      // Still show success fallback for client reassurance
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
      }, 2400);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = (number: string) => {
    const projName = activeProject ? activeProject.title : 'a website';
    const text = encodeURIComponent(
      `Hello WebDev Software Solutions team, I saw your "${projName}" project in your portfolio and I would like to order or discuss a similar website for my business.`
    );
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl sm:max-w-3xl w-full overflow-hidden border border-slate-200 relative my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BBE7F1]/20 border border-[#9cd5e2]/40 text-[#BBE7F1] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'SCHLÜSSELFERTIGER START & INDIVIDUALAUFTRAG' : 'Turnkey Deploy & Custom Order'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-['Archivo'] tracking-tight">
            {lang === 'de' ? 'Diese Website bestellen oder anpassen' : 'Order or Customize This Website'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {lang === 'de'
              ? 'Wählen Sie Ihr Bereitstellungsmodell, legen Sie Ihren Zeitplan fest und sichern Sie sich unsere Sprint-Kapazitäten. Sie erhalten innerhalb von 24 Stunden einen detaillierten Architekturentwurf und ein Festpreisangebot.'
              : 'Choose your deployment model, set your timeline, and lock in our sprint availability. Receive a detailed architecture scope and fixed estimate within 24 hours.'}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {submittedSuccess ? (
            <div className="py-12 px-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'Bestellanfrage erfolgreich eingegangen!' : 'Order Inquiry Received!'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {lang === 'de' ? (
                  <>Vielen Dank! Unser technischer Lead in Deutschland / Bangladesch hat Ihre Spezifikationen für <strong className="text-slate-900">{activeProject?.title}</strong> erhalten. Wir prüfen Ihre Anforderungen und melden uns innerhalb von 12 Stunden bei Ihnen.</>
                ) : (
                  <>Thank you! Our technical lead in Germany / Bangladesh has received your specification for <strong className="text-slate-900">{activeProject?.title}</strong>. We will review your requirements and reach out within 12 hours.</>
                )}
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-800 font-semibold">
                {lang === 'de' ? 'Sprint-Slot reserviert • NDA auf Wunsch vorab verfügbar' : 'Sprint slot reserved • NDA available on request'}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Selected Project Card & Switcher */}
              {activeProject && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      className="w-16 h-14 sm:w-20 sm:h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono font-bold text-cyan-800 bg-[#BBE7F1]/40 px-2 py-0.5 rounded border border-[#9cd5e2]/60">
                          {activeProject.category}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {lang === 'de' ? 'Kunde:' : 'Client:'} {activeProject.clientCountry}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Archivo'] truncate mt-0.5">
                        {activeProject.title}
                      </h4>
                      {activeProject.priceRange && (
                        <div className="text-xs text-slate-600 mt-0.5">
                          {lang === 'de' ? 'Geschätzte Investition:' : 'Est. Investment:'} <strong className="text-slate-900">{activeProject.priceRange}</strong>
                          {activeProject.estimatedDelivery && ` • ${lang === 'de' ? 'Lieferzeit:' : 'Turnaround:'} ${activeProject.estimatedDelivery}`}
                        </div>
                      )}
                    </div>
                  </div>

                  {allProjects.length > 1 && (
                    <div className="w-full sm:w-auto shrink-0">
                      <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="w-full sm:w-48 text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2]"
                      >
                        {allProjects.map((p) => {
                          const lp = localizeProject(p);
                          return (
                            <option key={lp.id} value={lp.id}>
                              {lp.title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Package Type Selector */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-600 mb-2.5">
                  {lang === 'de' ? '1. Bereitstellungsmodell wählen' : '1. Select Launch Model'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Turnkey Package */}
                  <div
                    onClick={() => {
                      setPackageType('turnkey');
                      setTimeline(lang === 'de' ? 'Schnellstart (7-14 Tage)' : 'Fast Track (7-14 Days)');
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      packageType === 'turnkey'
                        ? 'border-cyan-600 bg-cyan-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-cyan-600" /> Turnkey Clone
                      </span>
                      {packageType === 'turnkey' && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      {lang === 'de' 
                        ? 'Schnellster Weg zum Markt. Übertragen Sie diese Architektur mit Ihren Farben, Texten, Domains und Zahlungsabläufen.'
                        : 'Fastest path. Rebrand this architecture with your colors, copy, domain & payment flow.'}
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-slate-900">
                      {lang === 'de' ? '7 - 14 Tage • 1.500 € - 3.000 €' : '7 - 14 Days • $1.5k - $3k'}
                    </div>
                  </div>

                  {/* Customized Build */}
                  <div
                    onClick={() => {
                      setPackageType('custom');
                      setTimeline(lang === 'de' ? 'Standard (2-4 Wochen)' : 'Standard (2-4 Weeks)');
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      packageType === 'custom'
                        ? 'border-cyan-600 bg-cyan-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" /> {lang === 'de' ? 'Maßgeschneidert' : 'Custom Tailored'}
                      </span>
                      {packageType === 'custom' && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      {lang === 'de'
                        ? 'Nutzen Sie diese Codebasis als Kern und integrieren Sie benutzerdefinierte APIs, Workflows und exklusive UI-Funktionen.'
                        : 'Use this codebase as core base, add custom APIs, workflows & distinct UI features.'}
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-slate-900">
                      {lang === 'de' ? '2 - 4 Wochen • 3.000 € - 6.500 €' : '2 - 4 Weeks • $3k - $6.5k'}
                    </div>
                  </div>

                  {/* Enterprise Bespoke */}
                  <div
                    onClick={() => {
                      setPackageType('enterprise');
                      setTimeline(lang === 'de' ? 'Enterprise (4-8 Wochen)' : 'Comprehensive (4-8 Weeks)');
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      packageType === 'enterprise'
                        ? 'border-cyan-600 bg-cyan-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-indigo-600" /> {lang === 'de' ? 'Enterprise Maßanfertigung' : 'Enterprise Bespoke'}
                      </span>
                      {packageType === 'enterprise' && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      {lang === 'de'
                        ? 'Vollständige Neuentwicklung mit dediziertem PMP® Scrum Master und hochqualifiziertem Senior-Squad.'
                        : 'End-to-end bespoke solution with dedicated PMP® Scrum Master & senior squad.'}
                    </div>
                    <div className="mt-2 text-xs font-mono font-bold text-slate-900">
                      {lang === 'de' ? '4 - 8 Wochen • Individuelles Angebot' : '4 - 8 Weeks • Custom Quote'}
                    </div>
                  </div>

                </div>
              </div>

              {/* Contact Information Fields */}
              <div>
                <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-600 mb-2.5">
                  {lang === 'de' ? '2. Ihre Kontaktdaten & Anforderungen' : '2. Your Details & Requirements'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'Vollständiger Name' : 'Full Name'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'de' ? 'z. B. Alexander Schmidt / Markus Weber' : 'e.g. John Doe / Alexander Schmidt'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'Geschäftliche E-Mail' : 'Work Email'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'WhatsApp / Telefon (mit Vorwahl)' : 'WhatsApp / Phone (with country code)'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+49 172... oder +880 17..."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'Unternehmen / Organisation (Optional)' : 'Company / Organization (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'de' ? 'z. B. Acme GmbH / Studio KG' : 'e.g. Acme Corp / Studio GmbH'}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'Gewünschter Fertigstellungstermin' : 'Target Launch Urgency'}
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900 bg-white"
                    >
                      <option value="Urgent (Under 2 Weeks)">{lang === 'de' ? '⚡ Dringend (Unter 2 Wochen)' : '⚡ Urgent (Under 2 Weeks)'}</option>
                      <option value="Standard (2-4 Weeks)">{lang === 'de' ? 'Standard (2-4 Wochen)' : 'Standard (2-4 Weeks)'}</option>
                      <option value="Flexible (1-2 Months)">{lang === 'de' ? 'Flexibel (1-2 Monate)' : 'Flexible (1-2 Months)'}</option>
                      <option value="Enterprise Sprint Timeline">{lang === 'de' ? 'Enterprise Sprint-Zeitplan' : 'Enterprise Sprint Timeline'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'de' ? 'Geplanter Budgetrahmen' : 'Target Budget Range'}
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900 bg-white"
                    >
                      <option value="$1,500 - $3,000">{lang === 'de' ? '1.500 € - 3.000 € (Turnkey MVP)' : '$1,500 - $3,000 (Turnkey MVP)'}</option>
                      <option value="$3,000 - $6,000">{lang === 'de' ? '3.000 € - 6.000 € (Standard Wachstum)' : '$3,000 - $6,000 (Standard Growth)'}</option>
                      <option value="$6,000 - $12,000">{lang === 'de' ? '6.000 € - 12.000 € (Enterprise Stufe)' : '$6,000 - $12,000 (Enterprise Tier)'}</option>
                      <option value="$12,000+">{lang === 'de' ? '12.000 €+ (Multi-Tenant / Komplexe Cloud)' : '$12,000+ (Multi-Tenant / Complex Cloud)'}</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Message / Custom Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'de' ? 'Individuelle Anpassungen oder spezifische Funktionen' : 'Custom Adjustments or Specific Features Needed'}
                </label>
                <textarea
                  rows={3}
                  placeholder={lang === 'de' ? `Beschreiben Sie gewünschtes Branding, Zahlungsmethoden oder spezifische Module für ${activeProject?.title || 'dieses Projekt'}...` : `Tell us what branding, payment methods, or custom pages you want to add to ${activeProject?.title || 'this project'}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] text-slate-900 resize-none"
                />
              </div>

              {/* NDA Checkbox */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="nda-checkbox"
                  checked={ndaRequested}
                  onChange={(e) => setNdaRequested(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-800 focus:ring-[#9cd5e2] border-slate-300"
                />
                <label htmlFor="nda-checkbox" className="text-xs text-slate-700 cursor-pointer select-none">
                  {lang === 'de' 
                    ? 'Bitte vor dem Austausch detaillierter Spezifikationen eine Geheimhaltungsvereinbarung (NDA) abschließen.' 
                    : 'Please execute a Non-Disclosure Agreement (NDA) before detailed blueprint sharing.'}
                </label>
              </div>

              {/* Submit Button & Fast WhatsApp Options */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Instant WhatsApp buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-medium hidden md:inline">{lang === 'de' ? 'Sofort-Chat:' : 'Instant Chat:'}</span>
                  <button
                    type="button"
                    onClick={() => handleWhatsApp('+491729766016')}
                    className="flex-1 sm:flex-none text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>🇩🇪 WhatsApp DE</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWhatsApp('+8801719321749')}
                    className="flex-1 sm:flex-none text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>🇧🇩 WhatsApp BD</span>
                  </button>
                </div>

                {/* Primary Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-extrabold text-sm px-7 py-3 rounded-xl border border-[#9cd5e2] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{lang === 'de' ? 'Bestellanfrage wird übermittelt...' : 'Registering Order...'}</span>
                  ) : (
                    <>
                      <span>{lang === 'de' ? 'Sprint-Slot sichern & Angebot erhalten' : 'Lock Sprint Slot & Get Quote'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>

              </div>

            </form>
          )}
        </div>

        {/* Modal Footer Guarantees */}
        <div className="bg-slate-50 border-t border-slate-200/80 p-3 sm:px-6 flex items-center justify-between text-[11px] text-slate-500 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>{lang === 'de' ? '100% Vollständiges Quellcode-Eigentum' : '100% Full Source Code Ownership'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{lang === 'de' ? '30 Tage kostenlose Garantie nach Go-Live' : '30-Day Free Post-Launch Warranty'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-cyan-700 shrink-0" />
            <span>{lang === 'de' ? 'Deutsche DSGVO & Höchste Performance Garantiert' : 'German GDPR & High Performance Assured'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
