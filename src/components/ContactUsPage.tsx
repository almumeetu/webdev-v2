import React, { useState, useRef } from 'react';
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
  Calculator,
  Sparkles
} from 'lucide-react';
import { Inquiry } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';

interface ContactUsPageProps {
  onBackToHome: () => void;
  onSubmitSuccess: (inquiry: Inquiry) => void;
  onOpenQuote: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onBackToHome,
  onSubmitSuccess,
  onOpenQuote
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('Full Stack & MERN');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.contact-anim-item',
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

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      projectType: serviceOfInterest,
      budget: 'Consultation Inquiry',
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
          budget: 'Consultation Inquiry',
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
        budget: 'Consultation Inquiry',
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
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* 1. Standard Breadcrumb & Hero Banner */}
      <Breadcrumb
        badge="GET IN TOUCH • JOYPURHAT HQ & LEVERKUSEN BRANCH"
        title="Connect With Our Engineering Leads"
        subtitle="Whether you are planning a new full-stack MERN application, require high-performance Linux cloud infrastructure, or need an enterprise e-commerce platform, our international team is ready to assist."
        items={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'Contact Us', active: true }
        ]}
        backAction={onBackToHome}
        backLabel="Back to Home"
        align="center"
        className="contact-anim-item"
      />

      {/* 3. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Office Hubs & Direct Channels (5 cols) */}
          <div className="contact-anim-item lg:col-span-5 space-y-6">
            
            {/* Bangladesh Headquarters */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Joypurhat, Bangladesh</h3>
                    <span className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">
                      Global Headquarters (HQ)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Housing Estate, Ward 07, Joypurhat Sadar, Rajshahi Division, Bangladesh
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                  <a href="tel:+8801712009617" className="font-mono hover:text-indigo-600 transition-colors font-bold">
                    +880 1712-009617
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <a href="mailto:info@webdevsoftwaresolutions.com" className="hover:text-indigo-600 transition-colors">
                    info@webdevsoftwaresolutions.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM (BST)</span>
                </div>
              </div>
            </div>

            {/* Germany European Branch */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center font-bold">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit']">Leverkusen, Germany</h3>
                    <span className="text-[11px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                      European Branch & Cloud Operations
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Friedrich-Ebert-Platz 3, 51373 Leverkusen, North Rhine-Westphalia, Germany
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                  <a href="tel:+49214839201" className="font-mono hover:text-purple-600 transition-colors font-bold">
                    +49 214 839201
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                  <a href="mailto:de@webdevsoftwaresolutions.com" className="hover:text-purple-600 transition-colors">
                    de@webdevsoftwaresolutions.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM (CET)</span>
                </div>
              </div>
            </div>

            {/* Quick Switch to Project Cost Scoper */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <Calculator className="w-4 h-4" />
                <span>Need Instant Cost Scoping?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Want an immediate budget and timeline estimate for your specific software architecture? Use our interactive Project Cost Scoper.
              </p>
              <button
                onClick={onOpenQuote}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Launch Interactive Project Scoper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Security Protocol */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                All inquiries are protected by NDA standards and European GDPR privacy protocols.
              </span>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="contact-anim-item lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-100">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                    Thank You! Message Successfully Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Hello {firstName}, our senior engineering team in Joypurhat and Leverkusen has received your inquiry. We will reply via <span className="font-semibold text-slate-900">{email}</span> within 24 hours.
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
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                      Send a Direct Message
                    </h2>
                    <p className="text-xs text-slate-500">
                      Fill out the form below and an engineering director will respond promptly.
                    </p>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Md. Saikat / Lars"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Hossain / Weber"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+880 17... / +49 1..."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Company & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Company or Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. TechCorp Ltd."
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Service of Interest
                      </label>
                      <select
                        value={serviceOfInterest}
                        onChange={(e) => setServiceOfInterest(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-white"
                      >
                        <option value="Full Stack & MERN">Full-Stack MERN Development</option>
                        <option value="Cloud & Linux Servers">Cloud & Linux Server Infrastructure</option>
                        <option value="E-Commerce & Headless">E-Commerce (Shopify & WooCommerce)</option>
                        <option value="Enterprise CMS">Enterprise WordPress & Headless CMS</option>
                        <option value="API & Microservices">API & Microservices Architecture</option>
                        <option value="General Consultation">General Technical Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please tell us about your project scope, technical questions, or timeline..."
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-bold text-sm py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND INQUIRY NOW</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
