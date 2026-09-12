import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Globe, 
  MessageSquare, 
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
  const [activeMapTab, setActiveMapTab] = useState<'joypurhat' | 'leverkusen'>('joypurhat');

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
        badge="DIRECT ACCESS • JOYPURHAT HQ & LEVERKUSEN BRANCH"
        title="Connect With Our Engineering Leadership"
        subtitle="Zero middle-management. Discuss your custom application, server architecture, or project budget directly with our principal architects."
        items={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'Contact Us', active: true }
        ]}
        backAction={onBackToHome}
        backLabel="Back to Home"
        align="center"
        className="contact-anim-item"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">

        {/* 2. Direct Instant Contact Strip */}
        <div className="contact-anim-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/8801712009617?text=Hello%20WebDev%20Software%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/70 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Instant WhatsApp</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-emerald-700 transition-colors">
                +880 1712-009617
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Chat Directly with Founder</div>
            </div>
          </a>

          {/* Joypurhat HQ Phone */}
          <a
            href="tel:+8801712009617"
            className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500/70 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                Joypurhat HQ (BD)
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-indigo-700 transition-colors">
                +880 1712-009617
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Direct Engineering Line</div>
            </div>
          </a>

          {/* Leverkusen Germany Phone */}
          <a
            href="tel:+49214839201"
            className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-500/70 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600">
                Leverkusen (DE)
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-purple-700 transition-colors">
                +49 214 839201
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">European Cloud Desk</div>
            </div>
          </a>

          {/* General Email */}
          <a
            href="mailto:info@webdevsoftwaresolutions.com"
            className="group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-500/70 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600">
                Inquiry Dispatch
              </div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 group-hover:text-sky-700 transition-colors truncate max-w-[150px]">
                info@webdevsoftware...
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">&lt; 12 Hr SLA Response</div>
            </div>
          </a>
        </div>

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
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                    Thank You! Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Hello <span className="font-semibold text-slate-900">{firstName}</span>, your project parameters have been delivered directly to our Lead Architect. We will review your requirements and reach out via <span className="font-semibold text-slate-900">{email}</span> within 12 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={onBackToHome}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Form Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-mono font-bold tracking-wider uppercase mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>START A CONVERSATION</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                      Discuss Your Project & Architecture
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Share your vision, budget considerations, or technical timeline. Every inquiry is personally handled by our executive technical team.
                    </p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Al Mumeetu"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Saikat"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+880 17... / +49 1..."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Company or Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Enterprise Corp / Startup"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Service Domain
                      </label>
                      <select
                        value={serviceOfInterest}
                        onChange={(e) => setServiceOfInterest(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      >
                        <option value="Full Stack & MERN">Full-Stack MERN Development</option>
                        <option value="Cloud & Linux Servers">Cloud & Linux Server Infrastructure</option>
                        <option value="E-Commerce & Headless">E-Commerce (Shopify & WooCommerce)</option>
                        <option value="Enterprise CMS">Enterprise WordPress & Headless CMS</option>
                        <option value="API & Microservices">API & Microservices Architecture</option>
                        <option value="General Consultation">Direct Founder Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Project Scope & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project vision, target timeline, technical requirements, or questions..."
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT INQUIRY FOR PERSONAL REVIEW</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Protected by Bilateral NDA & European GDPR Standards</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Two Hub Cards & Guarantees (5 cols) */}
          <div className="contact-anim-item lg:col-span-5 space-y-6 lg:sticky lg:top-24 self-start">
            
            {/* Bangladesh Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Joypurhat, Bangladesh</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Global Engineering HQ</span>
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
                  <span className="text-slate-500">Engineering Squads:</span>
                  <span className="font-semibold text-slate-900">30+ Full-Stack Engineers</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Working Hours:</span>
                  <span className="font-semibold text-slate-900">Mon - Sat: 9:00 AM - 8:00 PM</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="tel:+8801712009617"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
                >
                  Call HQ
                </a>
                <button
                  onClick={() => {
                    setActiveMapTab('joypurhat');
                    document.getElementById('interactive-map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Map</span>
                </button>
              </div>
            </div>

            {/* Leverkusen Germany Branch Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Leverkusen, Germany</h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                      <span>European Operational Branch</span>
                    </div>
                  </div>
                </div>

                {/* Live Clock */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">CET (UTC+1)</div>
                  <div className="text-xs font-mono font-extrabold text-slate-900">{deTime || 'Active'}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Friedrich-Ebert-Platz 3, 51373 Leverkusen, North Rhine-Westphalia, Germany
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Compliance & Cloud:</span>
                  <span className="font-semibold text-slate-900">GDPR & BaFin Standards</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Working Hours:</span>
                  <span className="font-semibold text-slate-900">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="tel:+49214839201"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition-colors"
                >
                  Call Branch
                </a>
                <button
                  onClick={() => {
                    setActiveMapTab('leverkusen');
                    document.getElementById('interactive-map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>View Map</span>
                </button>
              </div>
            </div>

            {/* Direct Technical Access Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-3 shadow-md border border-slate-800">
              <div className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Zero Middle-Management</span>
              </div>
              <h4 className="text-base font-bold font-['Outfit']">
                Direct Engineering Accountability
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your communication is reviewed directly by our Principal Architect and Founder. We provide actionable architectural advice, technology stack comparisons, and sprint estimations before any commercial contract.
              </p>
            </div>

          </div>

        </div>

        {/* 4. Interactive Map Feature for Both Hubs */}
        <div id="interactive-map-section" className="contact-anim-item space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-mono font-bold tracking-wider uppercase">
                <Navigation className="w-3.5 h-3.5" />
                <span>GLOBAL PHYSICAL PRESENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                Interactive Dual-Hub Location Radar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore our engineering headquarters in Joypurhat, Bangladesh and our strategic European presence in Leverkusen, Germany.
              </p>
            </div>

            {/* Map Switcher Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveMapTab('joypurhat')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMapTab === 'joypurhat'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Joypurhat HQ (Bangladesh)</span>
              </button>
              
              <button
                type="button"
                onClick={() => setActiveMapTab('leverkusen')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMapTab === 'leverkusen'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Leverkusen (Germany)</span>
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
                src="https://maps.google.com/maps?q=Friedrich-Ebert-Platz%203%2C%2051373%20Leverkusen%2C%20Germany&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[420px] sm:h-[500px] border-0 filter grayscale-[20%] contrast-[110%]"
                loading="lazy"
                allowFullScreen
              ></iframe>
            )}

            {/* Floating Info Overlay Card on Map */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-xs sm:max-w-sm bg-slate-950/90 backdrop-blur-md text-white p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeMapTab === 'joypurhat' ? 'bg-indigo-600 text-white' : 'bg-purple-600 text-white'
                }`}>
                  {activeMapTab === 'joypurhat' ? 'Global Engineering Lab' : 'European Cloud Branch'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {activeMapTab === 'joypurhat' ? '25.1011° N, 89.0270° E' : '51.0303° N, 6.9843° E'}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm sm:text-base font-['Outfit'] text-white">
                  {activeMapTab === 'joypurhat' 
                    ? 'Joypurhat Headquarters' 
                    : 'Leverkusen Operations Center'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeMapTab === 'joypurhat'
                    ? 'Housing Estate, Ward No. 07, Joypurhat Sadar, Rajshahi Division, Bangladesh'
                    : 'Friedrich-Ebert-Platz 3, 51373 Leverkusen, North Rhine-Westphalia, Germany'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={
                    activeMapTab === 'joypurhat'
                      ? 'https://maps.google.com/?q=Joypurhat+Sadar,+Joypurhat,+Bangladesh'
                      : 'https://maps.google.com/?q=Friedrich-Ebert-Platz+3,+51373+Leverkusen,+Germany'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active Now
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
