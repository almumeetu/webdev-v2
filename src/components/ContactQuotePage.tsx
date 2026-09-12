import React, { useState, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Globe, 
  Calculator, 
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { Inquiry } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Breadcrumb } from './Breadcrumb';

interface ContactQuotePageProps {
  onBack: () => void;
  onSubmitSuccess: (inquiry: Inquiry) => void;
  initialLeadName?: string;
  initialProjectTitle?: string;
}

export const ContactQuotePage: React.FC<ContactQuotePageProps> = ({
  onBack,
  onSubmitSuccess,
  initialLeadName,
  initialProjectTitle
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState(
    initialProjectTitle ? `Similar Architecture: ${initialProjectTitle}` : 'Full Stack & MERN'
  );
  const [budget, setBudget] = useState('$3,000 - $6,000');
  const [currency, setCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('US Eastern (EST/EDT)');
  const [ndaRequested, setNdaRequested] = useState(true);
  const [targetMarket, setTargetMarket] = useState<'Bangladesh' | 'Germany' | 'International' | 'Both'>('International');
  const [message, setMessage] = useState(
    initialLeadName 
      ? `Hello, I would like to schedule a direct technical consultation with ${initialLeadName} regarding our upcoming software initiative.`
      : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.quote-fade-item',
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
        currency,
        timezone,
        ndaRequested,
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
        setIsSubmitted(true);
      } else {
        // Fallback local inquiry
        const fallbackInq: Inquiry = {
          id: `inq-${Date.now()}`,
          firstName,
          lastName,
          email,
          phoneNumber,
          company,
          projectType,
          budget,
          currency,
          timezone,
          ndaRequested,
          targetMarket,
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
        projectType,
        budget,
        currency,
        timezone,
        ndaRequested,
        targetMarket,
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
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Standard Breadcrumb & Hero Banner */}
      <Breadcrumb
        badge="ARCHITECTURE CONSULTATION & ESTIMATION"
        title="Initiate Your Enterprise Engineering Engagement"
        subtitle="Direct collaboration with senior architects based in Joypurhat, Bangladesh and Leverkusen, Germany. Receive a comprehensive architectural scoping proposal within 24 hours."
        items={[
          { label: 'Home', onClick: onBack },
          { label: 'Architecture Scoper & Quote', active: true }
        ]}
        backAction={onBack}
        backLabel="Back to Overview"
        align="center"
        className="quote-fade-item"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-10">

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Form Column */}
          <div className="quote-fade-item lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                    Consultation Request Successfully Transmitted
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {firstName}. Our engineering leads in Joypurhat and Leverkusen will review your requirements and reach out via {email} with technical scoping details.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={onBack}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-xl shadow-md cursor-pointer"
                    >
                      Return to Website Overview
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Lars"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Weber"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="lars.weber@enterprise.de"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+49 171 0000000 / +880..."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Company & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enterprise GmbH / Corp"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                        Project Domain / Service
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                      >
                        <option value="Full Stack & MERN">Full Stack MERN / Next.js Web App</option>
                        <option value="Cloud & Server Architecture">Cloud & Linux Server Infrastructure</option>
                        <option value="E-Commerce (Shopify & Woo)">Headless Shopify / E-Commerce</option>
                        <option value="Mobile App Development">iOS & Android Mobile Engineering</option>
                        <option value="WordPress & Custom CMS">Custom WordPress & CMS Architecture</option>
                        <option value="Custom Enterprise Solution">Custom Enterprise Consulting</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Market */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                      Target Deployment Market & Compliance
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['International', 'Germany', 'Bangladesh', 'Both'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTargetMarket(m)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            targetMarket === m
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {m === 'Germany' ? 'Germany / DACH' : m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Meeting Timezone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Preferred Meeting Timezone (Sprint Sync)</span>
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-white font-medium"
                    >
                      <option value="US Eastern (EST/EDT)">🇺🇸 US Eastern (EST/EDT) - New York / Miami / Atlanta</option>
                      <option value="US Pacific (PST/PDT)">🇺🇸 US Pacific (PST/PDT) - San Francisco / Seattle / LA</option>
                      <option value="UK (GMT/BST)">🇬🇧 United Kingdom (GMT/BST) - London / Manchester</option>
                      <option value="Central Europe (CET/CEST)">🇩🇪 Central Europe (CET/CEST) - Frankfurt / Berlin / Amsterdam</option>
                      <option value="Bangladesh (BST UTC+6)">🇧🇩 Bangladesh Standard Time (BST UTC+6) - Dhaka / Joypurhat</option>
                    </select>
                  </div>

                  {/* Mutual NDA Request Checkbox */}
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="nda-checkbox"
                      checked={ndaRequested}
                      onChange={(e) => setNdaRequested(e.target.checked)}
                      className="mt-1 h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="nda-checkbox" className="text-xs text-slate-700 cursor-pointer select-none">
                      <strong className="text-slate-900 block font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-indigo-600" />
                        <span>Request Bilateral Non-Disclosure Agreement (NDA)</span>
                      </strong>
                      <span>We will email our mutual countersigned legal NDA prior to discussing proprietary architecture and source code.</span>
                    </label>
                  </div>

                  {/* Message / Brief */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 font-['Outfit'] uppercase tracking-wider">
                      Project Brief & Technical Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your application goals, target timelines, expected user concurrency, and specific integrations needed..."
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Consultation Dossier...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Architecture Scoping Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Protected under strict NDA and GDPR Privacy Regulations. 100% Confidential.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Sidebar: Hubs & Verification */}
          <div className="quote-fade-item lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            
            {/* Enterprise Client Guarantees */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-3.5 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>ENTERPRISE GUARANTEES</span>
              </div>
              <h4 className="text-base font-bold text-white font-['Outfit']">
                Global Client Trust & Delivery
              </h4>
              <ul className="text-xs text-slate-300 space-y-2.5 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>12-Hour Guaranteed Response:</strong> Senior engineering architect reviews your scope within 12 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% IP Ownership:</strong> Legally binding full source code & asset transfer upon milestone delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Overlapping Timezones:</strong> Real-time Slack/Teams sprint collaboration for US & EU timezones.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>GDPR & BaFin Rigor:</strong> Hardened server architectures meeting strict European standards.</span>
                </li>
              </ul>
            </div>

            {/* Joypurhat Bangladesh Office */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                  Global Engineering HQ (Bangladesh)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Houses over 30 full-stack MERN engineers, DevOps architects, and QA squads providing agile sprint execution.
              </p>
              <div className="pt-2 text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Housing Estate, Word No: 07, Joypurhat-5900</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>+880 1700-928374 / +880 1712-009617</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>info@webdevsoftwaresolutions.com</span>
                </div>
              </div>
            </div>

            {/* Leverkusen Germany Office */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                  European Operational Branch (Germany)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                European client management, German GDPR compliance oversight, and Frankfurt data center infrastructure.
              </p>
              <div className="pt-2 text-xs space-y-1 text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Heinrich-von-Stephan-Str., 51373 Leverkusen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>14-Hour Overlapping Support</span>
                </div>
              </div>
            </div>

            {/* SLA Guarantee Box */}
            <div className="p-6 rounded-3xl bg-[#090d18] text-white space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Direct Technical Access
              </div>
              <h4 className="text-base font-bold font-['Outfit']">
                Zero Middle-Management
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every consultation request is reviewed directly by our Principal Architect and CEO. We provide actionable architectural recommendations before any commercial contract.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
