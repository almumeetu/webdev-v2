import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Navigation,
  Check,
  Building2,
  Cpu,
  Sparkles
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

  // Active Map Tab ('joypurhat' | 'leverkusen' | 'both')
  const [activeMapTab, setActiveMapTab] = useState<'leverkusen' | 'joypurhat'>('leverkusen');

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
      if (data.success && data.inquiry) {
        onSubmitSuccess(data.inquiry);
        setIsSubmitted(true);
      } else {
        const fallbackInq: Inquiry = {
          id: `inq-${Date.now()}`,
          firstName,
          lastName,
          email,
          phoneNumber,
          company,
          projectType: serviceOfInterest,
          budget: selectedBudget,
          targetMarket: 'International',
          message,
          status: 'new',
          createdAt: new Date().toISOString()
        };
        onSubmitSuccess(fallbackInq);
        setIsSubmitted(true);
      }
    } catch {
      const fallbackInq: Inquiry = {
        id: `inq-${Date.now()}`,
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        projectType: serviceOfInterest,
        budget: selectedBudget,
        targetMarket: 'International',
        message,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      onSubmitSuccess(fallbackInq);
      setIsSubmitted(true);
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
        className="contact-anim-item"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">

        {/* 3. Main Form & Hub Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
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
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {lang === 'de' ? 'Weitere Nachricht senden' : 'Send Another Message'}
                    </button>
                    <button
                      onClick={onBackToHome}
                      className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 border border-[#9cd5e2] text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      {t.backToHome}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Form Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide mb-1">
                      <Sparkles className="w-4 h-4 text-cyan-700" />
                      <span>{lang === 'de' ? 'Starten Sie ein Projekt mit uns' : 'Start a Conversation with Us'}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Kufam']">
                      {lang === 'de' ? 'Besprechen Sie Ihr Projekt & Ihre Software-Architektur' : 'Discuss Your Project & Architecture'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {lang === 'de'
                        ? 'Teilen Sie uns Ihre Vorstellungen, Ihr Budget oder Ihren Zeitplan mit. Jede Anfrage wird direkt von unseren technischen Führungskräften betreut.'
                        : 'Share your vision, budget considerations, or technical timeline. Every inquiry is personally handled by our executive technical team.'}
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Vorname *' : 'First Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={lang === 'de' ? 'z. B. Max' : 'e.g. Al Mumeetu'}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Nachname *' : 'Last Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={lang === 'de' ? 'z. B. Mustermann' : 'e.g. Saikat'}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Geschäftliche E-Mail *' : 'Business Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+49 1... / +880 17..."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Unternehmen oder Organisation' : 'Company or Organization'}
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={lang === 'de' ? 'z. B. Enterprise GmbH / Startup' : 'e.g. Enterprise Corp / Startup'}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {lang === 'de' ? 'Fachbereich / Leistungsfeld' : 'Service Domain'}
                      </label>
                      <select
                        value={serviceOfInterest}
                        onChange={(e) => setServiceOfInterest(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                      >
                        <option value="Full Stack & MERN">
                          {lang === 'de' ? 'Full-Stack MERN & Next.js Entwicklung' : 'Full-Stack MERN Development'}
                        </option>
                        <option value="Cloud & Linux Servers">
                          {lang === 'de' ? 'Cloud & Linux Server-Infrastruktur' : 'Cloud & Linux Server Infrastructure'}
                        </option>
                        <option value="E-Commerce & Headless">
                          {lang === 'de' ? 'E-Commerce (Shopify & WooCommerce)' : 'E-Commerce (Shopify & WooCommerce)'}
                        </option>
                        <option value="Enterprise CMS">
                          {lang === 'de' ? 'Enterprise WordPress & Headless CMS' : 'Enterprise WordPress & Headless CMS'}
                        </option>
                        <option value="API & Microservices">
                          {lang === 'de' ? 'API- & Microservices-Architektur' : 'API & Microservices Architecture'}
                        </option>
                        <option value="General Consultation">
                          {lang === 'de' ? 'Direkte Beratung durch Gründer / Lead' : 'Direct Founder Consultation'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
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
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] disabled:opacity-60 text-slate-950 font-bold text-xs sm:text-sm py-4 rounded-xl border border-[#9cd5e2] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span>{lang === 'de' ? 'Anfrage wird übertragen...' : 'Transmitting Inquiry...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>{lang === 'de' ? 'ANFRAGE ZUR PRÜFUNG ABSENDEN' : 'SUBMIT INQUIRY FOR PERSONAL REVIEW'}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'de' ? 'Geschützt durch bilaterale Vertraulichkeitsvereinbarung & DSGVO-Standards' : 'Protected by Bilateral NDA & European GDPR Standards'}</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Two Hub Cards & Guarantees (5 cols) */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto no-scrollbar z-20">
            
            {/* Leverkusen Germany European Hub Card - FIRST */}
            <div className="contact-anim-item bg-white rounded-3xl p-6 sm:p-7 border border-emerald-500/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Archivo']">
                      {lang === 'de' ? 'Küppersteg, Leverkusen (Deutschland)' : 'Küppersteg, Leverkusen (DE)'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{lang === 'de' ? 'Europäischer Engineering-Hub' : 'European Engineering Hub'}</span>
                    </div>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                    {lang === 'de' ? 'MEZ (UTC+1)' : 'CET (UTC+1)'}
                  </div>
                  <div className="text-xs font-mono font-extrabold text-slate-900">{deTime || 'Active'}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de' 
                  ? 'Küppersteg, 51373 Leverkusen, Nordrhein-Westfalen, Deutschland'
                  : 'Küppersteg, 51373 Leverkusen, North Rhine-Westphalia, Germany'}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'de' ? 'Compliance & Sicherheit:' : 'Compliance & Security:'}</span>
                  <span className="font-semibold text-slate-900">{lang === 'de' ? 'Deutsche DSGVO & ISO 27001' : 'German GDPR (DSGVO) & ISO 27001'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'de' ? 'Öffnungszeiten:' : 'Working Hours:'}</span>
                  <span className="font-semibold text-slate-900">
                    {lang === 'de' ? 'Mo - Fr: 9:00 - 18:00 MEZ' : 'Mon - Fri: 9:00 AM - 6:00 PM CET'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="tel:+491729766016"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  {lang === 'de' ? 'Büro Leverkusen anrufen' : 'Call German Office'}
                </a>
                <button
                  onClick={() => {
                    setActiveMapTab('leverkusen');
                    document.getElementById('interactive-map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'de' ? 'Karte' : 'View Map'}</span>
                </button>
              </div>
            </div>

            {/* Joypurhat Bangladesh Dedicated R&D Card */}
            <div className="contact-anim-item bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Archivo']">
                      {lang === 'de' ? 'Joypurhat, Bangladesch' : 'Joypurhat, Bangladesh'}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-800 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse"></span>
                      <span>{lang === 'de' ? 'Dediziertes Offshore R&D-Zentrum' : 'Dedicated Offshore R&D Center'}</span>
                    </div>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">BST (UTC+6)</div>
                  <div className="text-xs font-mono font-extrabold text-slate-900">{bdTime || 'Active'}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Housing Estate, Ward No. 07, Joypurhat Sadar, Rajshahi Division, Bangladesh
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'de' ? 'Entwickler-Squads:' : 'Engineering Squads:'}</span>
                  <span className="font-semibold text-slate-900">
                    {lang === 'de' ? '30+ Full-Stack Softwareentwickler' : '30+ Full-Stack Engineers'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{lang === 'de' ? 'Öffnungszeiten:' : 'Working Hours:'}</span>
                  <span className="font-semibold text-slate-900">
                    {lang === 'de' ? 'Mo - Sa: 9:00 - 20:00 BST' : 'Mon - Sat: 9:00 AM - 8:00 PM BST'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="tel:+8801722301927"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-[#BBE7F1]/40 hover:bg-[#BBE7F1]/70 text-slate-950 border border-[#9cd5e2]/60 font-bold text-xs sm:text-sm transition-colors"
                >
                  {lang === 'de' ? 'R&D-Labor anrufen' : 'Call R&D Lab'}
                </a>
                <button
                  onClick={() => {
                    setActiveMapTab('joypurhat');
                    document.getElementById('interactive-map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'de' ? 'Karte' : 'View Map'}</span>
                </button>
              </div>
            </div>

            {/* Direct Technical Access Card */}
            <div className="contact-anim-item bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-7 text-white space-y-3.5 shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'de' ? 'Deutsche & EU SLA-Garantie' : 'German & EU SLA Guarantee'}</span>
              </div>
              <h4 className="font-extrabold text-lg sm:text-xl text-white font-['Archivo']">
                {lang === 'de' ? 'Direkte technische Zusammenarbeit' : 'Direct Engineering Collaboration'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'de'
                  ? 'Verbinden Sie sich direkt mit unseren Chef-Architekten. Wir bieten bilaterale Vertraulichkeitsvereinbarungen (NDA), europäische Verträge und ein erstes Scoping innerhalb von 12 Stunden.'
                  : 'Connect directly with lead architects. We offer strict bilateral NDAs, local European contracts, and sub-12h scoping turnarounds.'}
              </p>
              <div className="pt-1 flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'de' ? '100% IP-Übertragung' : '100% IP Transfer'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'de' ? 'DSGVO-konform' : 'GDPR Compliant'}</span>
                </span>
              </div>
            </div>

          </aside>

        </div>

        {/* 4. Interactive Map Feature for Both Hubs */}
        <div id="interactive-map-section" className="contact-anim-item space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                <Navigation className="w-4 h-4 text-cyan-700" />
                <span>{lang === 'de' ? 'Präsenz vor Ort & Entwicklungszentren' : 'Physical Presence & Engineering Hubs'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Kufam'] mt-1">
                {lang === 'de' ? 'Europäische Standorte & Globale Entwicklungszentren' : 'European Operations & Global Engineering Map'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-['Kufam']">
                {lang === 'de'
                  ? 'Kundenberatung und Entwicklungsressourcen weltweit mit direkter Abstimmung und zügigen Sprints.'
                  : 'Global client consulting and development facilities with direct communication and rapid sprint execution.'}
              </p>
            </div>

            {/* Map Switcher Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveMapTab('leverkusen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMapTab === 'leverkusen'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'de' ? 'Leverkusen Hub (Deutschland)' : 'Leverkusen Hub (Germany)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapTab('joypurhat')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMapTab === 'joypurhat'
                    ? 'bg-[#BBE7F1] text-slate-950 font-bold border border-[#9cd5e2] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{lang === 'de' ? 'Joypurhat Zentrum (Bangladesch)' : 'Joypurhat Center (Bangladesh)'}</span>
              </button>
            </div>
          </div>

          {/* Map Display Frame */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 min-h-[420px] sm:min-h-[500px]">
            
            {activeMapTab === 'joypurhat' ? (
              <iframe
                title="WebDev Software Solutions Joypurhat HQ Map"
                src="https://maps.google.com/maps?q=Joypurhat%20Sadar%2C%20Joypurhat%2C%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[420px] sm:h-[500px] border-0 filter grayscale-[20%] contrast-[110%]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                title="WebDev Software Solutions Leverkusen Branch Map"
                src="https://maps.google.com/maps?q=K%C3%BCppersteg%2C%2051373%20Leverkusen%2C%20Germany&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[420px] sm:h-[500px] border-0 filter grayscale-[20%] contrast-[110%]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            )}

            {/* Floating Info Overlay Card on Map */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-xs sm:max-w-sm bg-slate-950/90 backdrop-blur-md text-white p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeMapTab === 'joypurhat' ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2]' : 'bg-emerald-600 text-white'
                }`}>
                  {activeMapTab === 'joypurhat' 
                    ? (lang === 'de' ? 'Globales R&D-Labor' : 'Global Engineering Lab')
                    : (lang === 'de' ? 'Europäische Cloud-Niederlassung' : 'European Cloud Branch')}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeMapTab === 'joypurhat' ? '25.1011° N, 89.0270° E' : '51.0435° N, 6.9961° E'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm sm:text-base font-['Archivo'] text-white">
                  {activeMapTab === 'joypurhat' 
                    ? (lang === 'de' ? 'Joypurhat Entwicklungszentrum' : 'Joypurhat Headquarters')
                    : (lang === 'de' ? 'Küppersteg, Leverkusen Niederlassung' : 'Küppersteg, Leverkusen Operations')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {activeMapTab === 'joypurhat'
                    ? 'Housing Estate, Ward No. 07, Joypurhat Sadar, Rajshahi Division, Bangladesh'
                    : (lang === 'de' ? 'Küppersteg, 51373 Leverkusen, Nordrhein-Westfalen, Deutschland' : 'Küppersteg, 51373 Leverkusen, North Rhine-Westphalia, Germany')}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={
                    activeMapTab === 'joypurhat'
                      ? 'https://maps.google.com/?q=Joypurhat+Sadar,+Joypurhat,+Bangladesh'
                      : 'https://maps.google.com/?q=K%C3%BCppersteg,+51373+Leverkusen,+Germany'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#BBE7F1] hover:text-[#a7dfed] transition-colors"
                >
                  <span>{lang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {lang === 'de' ? 'Jetzt aktiv' : 'Active Now'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
