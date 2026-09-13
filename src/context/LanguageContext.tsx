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
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  heroSubtitle3: string;
  heroExploreBtn: string;
  heroConsultBtn: string;
  
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
    topbarHub: 'Leverkusen, Germany (EU Hub)',
    topbarHours: 'Mon - Fri: 9:00 - 18:00 (CET) • 24/7 Agile Squads',
    
    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navTeam: 'Engineering Team',
    navBlog: 'Insights & News',
    navContact: 'Contact Us',
    navGetQuote: 'Get Quote',
    
    heroBadge1: 'GERMAN PRECISION & HIGH-VELOCITY ENGINEERING',
    heroBadge2: 'HIGH-AVAILABILITY CLOUD INFRASTRUCTURE',
    heroBadge3: 'HEADLESS COMMERCE & ENTERPRISE SHOPIFY',
    heroTitle1: 'Architecting Scalable Web & Cloud Solutions for German & Global Enterprises',
    heroTitle2: 'Zero-Downtime Linux Server Clusters & European Cloud Mesh',
    heroTitle3: 'High-Converting Headless E-Commerce & Full-Stack Apps',
    heroSubtitle1: 'Strategic European Engineering Hub in Küppersteg, Leverkusen (NRW), Germany with high-capacity global R&D development labs. Delivering mission-critical platforms with strict German GDPR compliance.',
    heroSubtitle2: 'Enterprise-grade Nginx, Hetzner Frankfurt, AWS & automated Docker orchestration with 99.99% SLA uptime and German data governance.',
    heroSubtitle3: 'Custom Shopify Plus themes, Next.js 15 headless architectures, and sub-second checkout speeds built to maximize European and international sales.',
    heroExploreBtn: 'Explore Engineering Services',
    heroConsultBtn: 'Schedule Consultation',
    
    servicesKicker: 'OUR CORE CAPABILITIES',
    servicesHeading: 'High-Impact Software Engineering Services',
    servicesSubheading: 'End-to-end full stack web applications, native mobile apps, and robust cloud infrastructure engineered to German and European quality standards.',
    servicesViewDetails: 'View Specification',
    
    teamKicker: 'ENGINEERING LEADERSHIP',
    teamHeading: 'Direct Access to Senior Software Architects',
    teamSubheading: 'No middle managers or outsourced layers. Collaborate directly with senior full-stack and mobile engineers with a proven European enterprise track record.',
    teamActiveLead: 'Active Lead',
    teamCoreSpecialties: 'Core Specialties',
    teamViewProfile: 'View Specialist Profile',
    
    whoKicker: 'WHO WE ARE',
    whoHeading: 'German Engineering Standards & High-Velocity Global Delivery',
    whoMoreBtn: 'Explore Our Story & Methodology',
    
    footerAboutText: 'Premier software consultancy and engineering powerhouse with our European Hub in Küppersteg, Leverkusen, Germany and dedicated offshore R&D centers. Delivering high-performance web platforms, cloud architectures, and GDPR-compliant digital solutions.',
    footerRights: 'All rights reserved. Bilateral NDAs & 100% IP Transfer guaranteed.'
  },
  de: {
    topbarHub: 'Leverkusen, Deutschland (EU-Hub)',
    topbarHours: 'Mo - Fr: 9:00 - 18:00 (MEZ) • 24/7 Entwickler-Support',
    
    navHome: 'Startseite',
    navAbout: 'Über uns',
    navServices: 'Leistungen',
    navPortfolio: 'Portfolio',
    navTeam: 'Entwicklerteam',
    navBlog: 'Fachartikel',
    navContact: 'Kontakt',
    navGetQuote: 'Angebot anfordern',
    
    heroBadge1: 'DEUTSCHE PRÄZISION & HOCHLEISTUNGS-ENTWICKLUNG',
    heroBadge2: 'HOCHVERFÜGBARE CLOUD-INFRASTRUKTUR',
    heroBadge3: 'HEADLESS COMMERCE & ENTERPRISE SHOPIFY',
    heroTitle1: 'Skalierbare Web- & Cloud-Lösungen für deutsche und internationale Unternehmen',
    heroTitle2: 'Ausfallsichere Linux-Server-Cluster & europäische Cloud-Mesh-Netzwerke',
    heroTitle3: 'Konversionsstarke Headless E-Commerce & Full-Stack Apps',
    heroSubtitle1: 'Strategischer europäischer Engineering-Hub in Küppersteg, Leverkusen (NRW), Deutschland mit leistungsstarken R&D-Entwicklungszentren. Höchste deutsche Qualitätsstandards und strikte DSGVO-Konformität.',
    heroSubtitle2: 'Enterprise Nginx, Hetzner Frankfurt, AWS & automatisierte Docker-Orchestrierung mit 99,99% SLA-Verfügbarkeit und voller deutscher DSGVO-Konformität.',
    heroSubtitle3: 'Maßgeschneiderte Shopify Plus Themes, Next.js 15 Headless-Architekturen und blitzschnelle Ladezeiten für maximalen europäischen Umsatz.',
    heroExploreBtn: 'Leistungen entdecken',
    heroConsultBtn: 'Beratung vereinbaren',
    
    servicesKicker: 'UNSERE KERNKOMPETENZEN',
    servicesHeading: 'Erstklassige Software-Engineering-Leistungen',
    servicesSubheading: 'Ganzheitliche Full-Stack-Webanwendungen, native Mobile Apps und hochverfügbare Cloud-Infrastrukturen nach deutschen und europäischen Qualitätsstandards.',
    servicesViewDetails: 'Spezifikation ansehen',
    
    teamKicker: 'TECHNISCHE FÜHRUNG',
    teamHeading: 'Direkter Kontakt zu Senior Software Architects',
    teamSubheading: 'Keine Zwischenvermittler oder unerfahrenen Junioren. Arbeiten Sie direkt mit erfahrenen Full-Stack- und Mobile-Architekten mit europäischer Projekterfahrung.',
    teamActiveLead: 'Aktiver Projektleiter',
    teamCoreSpecialties: 'Kernkompetenzen',
    teamViewProfile: 'Spezialistenprofil ansehen',
    
    whoKicker: 'ÜBER UNS',
    whoHeading: 'Deutsche Ingenieursstandards & globale Entwicklungsstärke',
    whoMoreBtn: 'Mehr über unsere Arbeitsweise',
    
    footerAboutText: 'Führendes Beratungs- und Softwareunternehmen mit europäischem Hub in Küppersteg, Leverkusen, Deutschland und hochspezialisierten R&D-Zentren. Wir entwickeln performante Webplattformen, Cloud-Architekturen und DSGVO-konforme Enterprise-Systeme.',
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
