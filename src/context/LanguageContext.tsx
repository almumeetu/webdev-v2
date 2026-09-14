'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de';

interface Translations {
  // TopBar
  topbarHub: string;
  topbarHours: string;
  
  // Navbar
  navHome: string;
  navAbout: string;
  navServices: string;
  navPortfolio: string;
  navTeam: string;
  navBlog: string;
  navContact: string;
  navGetQuote: string;
  
  // Hero
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  
  // Services
  servicesKicker: string;
  servicesHeading: string;
  servicesSubheading: string;
  servicesViewDetails: string;
  
  // Team
  teamKicker: string;
  teamHeading: string;
  teamSubheading: string;
  teamActiveLead: string;
  teamCoreSpecialties: string;
  teamViewProfile: string;
  
  // Who We Are
  whoKicker: string;
  whoHeading: string;
  whoMoreBtn: string;
  
  // Footer
  footerAboutText: string;
  footerRights: string;
}

const translations: Record<Language, Translations> = {
  en: {
    topbarHub: '',
    topbarHours: 'Mon - Fri: 9:00 AM - 6:00 PM · Dedicated Client Support',
    
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navTeam: 'Engineering Team',
    navBlog: 'Insights & News',
    navContact: 'Contact Us',
    navGetQuote: 'Get Quote',
    
    heroEyebrow: 'Software · Architecture · Cloud',
    heroHeadline: 'We Build Scalable Digital Products That Move Your Business Forward',
    heroSubtext: 'Full-stack web engineering, resilient cloud infrastructure, and bespoke digital platforms engineered for performance, security, and measurable impact.',
    heroPrimaryBtn: 'Start a Project',
    heroSecondaryBtn: 'Explore Our Work',
    
    servicesKicker: 'OUR CORE CAPABILITIES',
    servicesHeading: 'High-Impact Software Engineering Services',
    servicesSubheading: 'End-to-end full stack web applications, scalable cloud infrastructure, and modern digital platforms engineered to top production standards.',
    servicesViewDetails: 'View Specification',
    
    teamKicker: 'ENGINEERING LEADERSHIP',
    teamHeading: 'Direct Access to Senior Software Architects',
    teamSubheading: 'Collaborate directly with senior full-stack architects, cloud specialists, and engineering leads who take full ownership of your product delivery.',
    teamActiveLead: 'Active Lead',
    teamCoreSpecialties: 'Core Specialties',
    teamViewProfile: 'View Specialist Profile',
    
    whoKicker: 'WHO WE ARE',
    whoHeading: 'Engineering Excellence Built for High-Growth Global Enterprises',
    whoMoreBtn: 'Explore Our Story & Methodology',
    
    footerAboutText: 'Premier software engineering consultancy delivering resilient web applications, scalable cloud architectures, and modern digital platforms for enterprises worldwide.',
    footerRights: 'All rights reserved. Bilateral NDAs & 100% IP Transfer guaranteed.'
  },
  de: {
    topbarHub: '',
    topbarHours: 'Mo - Fr: 9:00 - 18:00 (MEZ) · Dedizierter Support',
    
    navHome: 'Startseite',
    navAbout: 'Über uns',
    navServices: 'Leistungen',
    navPortfolio: 'Portfolio',
    navTeam: 'Entwicklerteam',
    navBlog: 'Fachartikel',
    navContact: 'Kontakt',
    navGetQuote: 'Angebot anfordern',
    
    heroEyebrow: 'Software · Architektur · Cloud',
    heroHeadline: 'Wir entwickeln skalierbare Produkte, die Ihr Unternehmen voranbringen',
    heroSubtext: 'Full-Stack-Engineering, belastbare Cloud-Infrastruktur und moderne digitale Plattformen – entwickelt für höchste Performance, Sicherheit und messbaren Erfolg.',
    heroPrimaryBtn: 'Projekt starten',
    heroSecondaryBtn: 'Unsere Arbeit entdecken',
    
    servicesKicker: 'UNSERE KERNKOMPETENZEN',
    servicesHeading: 'Erstklassige Software-Engineering-Leistungen',
    servicesSubheading: 'Ganzheitliche Full-Stack-Webanwendungen, robuste Cloud-Infrastrukturen und moderne digitale Systeme nach höchsten Qualitätsstandards.',
    servicesViewDetails: 'Spezifikation ansehen',
    
    teamKicker: 'TECHNISCHE FÜHRUNG',
    teamHeading: 'Direkter Kontakt zu Senior Software Architects',
    teamSubheading: 'Arbeiten Sie direkt mit erfahrenen Full-Stack-Architekten, Cloud-Spezialisten und technischen Lead-Entwicklern zusammen.',
    teamActiveLead: 'Aktiver Projektleiter',
    teamCoreSpecialties: 'Kernkompetenzen',
    teamViewProfile: 'Spezialistenprofil ansehen',
    
    whoKicker: 'ÜBER UNS',
    whoHeading: 'Ingenieursqualität & verlässliche Software-Entwicklung für Unternehmen',
    whoMoreBtn: 'Mehr über unsere Arbeitsweise',
    
    footerAboutText: 'Führendes Beratungs- und Softwareunternehmen für performante Webplattformen, skalierbare Cloud-Architekturen und zukunftssichere Enterprise-Systeme weltweit.',
    footerRights: 'Alle Rechte vorbehalten. Bilaterale Geheimhaltungsvereinbarungen & 100% IP-Übertragung garantiert.'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('webdev_lang') as Language;
      if (saved === 'en' || saved === 'de') {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('webdev_lang', newLang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
