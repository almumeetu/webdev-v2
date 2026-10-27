import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Navigation,
  Check,
  Cpu,
  AlertCircle,
} from 'lucide-react';
import { Inquiry } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

interface ContactUsPageProps {
  onBackToHome: () => void;
  onSubmitSuccess: (inquiry: Inquiry) => void;
  onOpenQuote?: () => void;
  initialLeadName?: string;
  initialProjectTitle?: string;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onBackToHome,
  onSubmitSuccess,
  initialLeadName,
  initialProjectTitle
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('Full Stack & MERN');
  const [selectedBudget] = useState('Custom / Discussion');
  const [message, setMessage] = useState(
    initialProjectTitle ? `Inquiring about ${initialProjectTitle} project specifications...` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Active Map Tab ('leverkusen' | 'joypurhat')
  const [activeMapTab, setActiveMapTab] = useState<'leverkusen' | 'joypurhat'>('leverkusen');

  const officeMaps = {
    leverkusen: {
      title: 'Leverkusen, Germany Delivery HQ',
      directionsUrl: 'https://maps.google.com/?q=K%C3%BCppersteg,+Leverkusen,+Germany',
      embedUrl: 'https://maps.google.com/maps?q=K%C3%BCppersteg,+Leverkusen,+Germany&t=&z=13&ie=UTF8&iwloc=&output=embed'
    },
    joypurhat: {
      title: 'Joypurhat, Bangladesh Engineering Lab',
      directionsUrl: 'https://maps.google.com/?q=Joypurhat,+Bangladesh',
      embedUrl: 'https://maps.google.com/maps?q=Joypurhat,+Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed'
    }
  };
  const activeOfficeMap = officeMaps[activeMapTab];

  // Live clocks for both hubs
  const [bdTime, setBdTime] = useState('');
  const [deTime, setDeTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // Bangladesh Time (UTC+6)
      setBdTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      // Germany Time (UTC+1 / UTC+2 DST)
      setDeTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Europe/Berlin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.contact-anim-item',
      { opacity: 0, y: isMobile ? 10 : 18 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.55,
        stagger: isMobile ? 0.03 : 0.07,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      projectType: serviceOfInterest,
      budget: selectedBudget,
      targetMarket: 'International' as const,
      message
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.inquiry) {
        throw new Error(data.message || 'Inquiry submission failed.');
      }
      onSubmitSuccess(data.inquiry);
      setIsSubmitted(true);
    } catch {
      setSubmitError(lang === 'de'
        ? 'Die Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.'
        : 'Your inquiry could not be saved. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-slate-50/50 text-slate-900">
      {/* 1. Standard Center-Aligned Dark Breadcrumb & Hero Banner */}
      <Breadcrumb
        badge={lang === 'de' ? 'DIREKTE KUNDENBETREUUNG & ARCHITEKTUR-BERATUNG' : 'DIRECT CLIENT ENGAGEMENT & ARCHITECTURE ADVISORY'}
        title={lang === 'de' ? 'Sprechen Sie mit unserer technischen Leitung' : 'Connect With Our Engineering Leadership'}
        subtitle={
          lang === 'de'
            ? 'Ohne Umwege. Besprechen Sie Ihre individuelle Softwareanwendung, Serverarchitektur oder Projektbudgets direkt mit unseren Chef-Architekten.'
            : 'Zero middle-management. Discuss your custom application, server architecture, or project budget directly with our principal architects.'
        }
        items={[
          { label: t.navHome, onClick: onBackToHome },
          { label: t.navContact, active: true }
        ]}
        backAction={onBackToHome}
        backLabel={t.backToHome}
        align="left"
        contentClassName="contact-anim-item"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 sm:space-y-10">

        {/* 3. Main Form & Hub Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Clean Contact & Project Inquiry Form (7 cols) */}
          <div className="contact-anim-item lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-200/40">
              
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Archivo']">
                    {lang === 'de' ? 'Vielen Dank! Anfrage erfolgreich übermittelt' : 'Thank You! Inquiry Received'}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {lang === 'de' ? (
                      <>
                        Hallo <span className="font-semibold text-slate-900">{firstName}</span>, Ihre Projektparameter wurden direkt an unsere Chef-Architekten übermittelt. Wir prüfen Ihre Anforderungen und melden uns unter <span className="font-semibold text-slate-900">{email}</span> innerhalb von 12 Stunden bei Ihnen.
                      </>
                    ) : (
                      <>
                        Hello <span className="font-semibold text-slate-900">{firstName}</span>, your project parameters have been delivered directly to our Lead Architect. We will review your requirements and reach out via <span className="font-semibold text-slate-900">{email}</span> within 12 hours.
                      </>
                    )}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {lang === 'de' ? 'Weitere Nachricht senden' : 'Send Another Message'}
                    </button>
                    <button
                      onClick={onBackToHome}
                      className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 border border-[#9cd5e2] text-xs sm:text-sm font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {t.backToHome}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Form Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 font-['Kufam']">
                      {lang === 'de' ? 'Besprechen Sie Ihr Projekt & Ihre Software-Architektur' : 'Discuss Your Project & Architecture'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {lang === 'de'
                        ? 'Teilen Sie uns Ihre Vorstellungen, Ihr Budget oder Ihren Zeitplan mit. Jede Anfrage wird direkt von unseren technischen Führungskräften betreut.'
                        : 'Share your vision, budget considerations, or technical timeline. Every inquiry is personally handled by our executive technical team.'}
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Vorname *' : 'First Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={lang === 'de' ? 'z. B. Thomas' : 'e.g. John'}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Nachname *' : 'Last Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={lang === 'de' ? 'z. B. Müller' : 'e.g. Smith'}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Geschäftliche E-Mail *' : 'Business Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+49 172 976 6016"
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Only */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                      {lang === 'de' ? 'Unternehmen oder Organisation' : 'Company or Organization'}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={lang === 'de' ? 'z. B. Enterprise GmbH / Startup' : 'e.g. Enterprise Corp / Startup'}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-800 uppercase tracking-wider">
                      {lang === 'de' ? 'Projektumfang & Anforderungen *' : 'Project Scope & Requirements *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        lang === 'de'
                          ? 'Beschreiben Sie Ihre Projektvision, geplante Meilensteine, technische Anforderungen oder Fragen...'
                          : 'Tell us about your project vision, target timeline, technical requirements, or questions...'
                      }
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50/20 placeholder-slate-300 focus:bg-white focus:ring-1 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  {submitError && (
                    <p role="alert" className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                      <AlertCircle className="h-4 w-4 shrink-0" />{submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] disabled:opacity-60 text-slate-950 font-medium text-xs sm:text-sm py-3.5 sm:py-4 px-4 rounded-xl border border-[#9cd5e2] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{lang === 'de' ? 'Anfrage wird übertragen...' : 'Transmitting Inquiry...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>{lang === 'de' ? 'Anfrage zur Prüfung absenden' : 'Submit Inquiry For Review'}</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Two Hub Cards (5 cols) */}
          <aside className="lg:col-span-5 space-y-3 self-start">
            
            {/* Leverkusen Germany European Hub Card */}
            <div className="contact-anim-item bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Küppersteg, Leverkusen (DE)
                    </h3>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-medium">
                    CET (UTC+1)
                  </div>
                  <div className="text-[13px] font-mono font-semibold text-slate-900">{deTime || '—'}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Küppersteg, 51373 Leverkusen, North Rhine-Westphalia, Germany
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-500">{lang === 'de' ? 'Öffnungszeiten:' : 'Working Hours:'}</span>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM CET</div>
                </div>
              </div>

              <a
                href="tel:+491729766016"
                className="w-full text-center block py-3 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors"
              >
                Call German Office
              </a>
            </div>

            {/* Joypurhat Bangladesh R&D Lab Card */}
            <div className="contact-anim-item bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Joypurhat, Bangladesh
                    </h3>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-medium">BST (UTC+6)</div>
                  <div className="text-[13px] font-mono font-semibold text-slate-900">{bdTime || '—'}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Housing Estate, Ward No. 07, Joypurhat Sadar, Rajshahi Division, Bangladesh
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-500">{lang === 'de' ? 'Öffnungszeiten:' : 'Working Hours:'}</span>
                  <div className="font-semibold text-slate-900 text-xs mt-0.5">Mon - Sa: 9:00 AM - 8:00 PM BST</div>
                </div>
              </div>

              <a
                href="tel:+8801722301927"
                className="w-full text-center block py-3 px-4 rounded-lg bg-[#BBE7F1]/40 hover:bg-[#BBE7F1]/70 text-slate-950 border border-[#9cd5e2] font-semibold text-xs transition-colors"
              >
                Call R&D Lab
              </a>
            </div>

            {/* Compact Map Section Below Location Cards */}
            <div className="contact-anim-item">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 p-2">
                  <div className="flex gap-1">
                    {(Object.keys(officeMaps) as Array<keyof typeof officeMaps>).map((office) => (
                      <button
                        key={office}
                        type="button"
                        onClick={() => setActiveMapTab(office)}
                        className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-colors cursor-pointer ${activeMapTab === office ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                      >
                        {office === 'leverkusen' ? 'Leverkusen' : 'Joypurhat'}
                      </button>
                    ))}
                  </div>
                  <a 
                    href={activeOfficeMap.directionsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                  </a>
                </div>
                <iframe
                  title={`${activeOfficeMap.title} — Google Maps`}
                  src={activeOfficeMap.embedUrl}
                  className="block h-48 w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

