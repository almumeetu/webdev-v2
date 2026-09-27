import { Project, ServiceDetail, TeamMember, BlogPost, Testimonial, HeroSlide } from '../types';

export type Language = 'en' | 'de';

export interface Translations {
  // Common
  viewDetails: string;
  viewAll: string;
  learnMore: string;
  requestConsultation: string;
  exploreWork: string;
  contactUs: string;
  getInTouch: string;
  readMore: string;
  applyNow: string;
  loading: string;
  backToHome: string;

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
  navCareers: string;
  navContact: string;
  navGetQuote: string;
  navSignIn: string;
  navSignUp: string;
  navProfile: string;
  navLogout: string;
  navAdmin: string;
  navCoreServices: string;
  navGermanGovernance: string;
  navPmpTitle: string;
  navPmpDesc: string;

  // Hero Section
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;

  // Service Feature Cards
  featMernTitle: string;
  featMernDesc: string;
  featServerTitle: string;
  featServerDesc: string;
  featEcommerceTitle: string;
  featEcommerceDesc: string;
  featCmsTitle: string;
  featCmsDesc: string;
  featApiTitle: string;
  featApiDesc: string;

  // Who We Are Section
  whoKicker: string;
  whoHeading: string;
  whoSubtext: string;
  whoBullet1: string;
  whoBullet2: string;
  whoBullet3: string;
  whoBullet4: string;
  whoQuote: string;
  whoMoreBtn: string;
  whoYearsExperience: string;

  // Services Section
  servicesKicker: string;
  servicesHeading: string;
  servicesSubheading: string;
  servicesTag: string;
  servicesViewDetails: string;
  servicesViewAll: string;

  // Team Section
  teamKicker: string;
  teamHeading: string;
  teamSubheading: string;
  teamActiveLead: string;
  teamCoreSpecialties: string;
  teamViewProfile: string;
  teamViewAll: string;

  // Portfolio Section
  portfolioKicker: string;
  portfolioHeading: string;
  portfolioSubheading: string;
  portfolioAllCategory: string;
  portfolioViewProject: string;
  portfolioLiveDemo: string;
  portfolioViewAll: string;
  portfolioDeliveryTime: string;

  // Testimonials Section
  testimonialsKicker: string;
  testimonialsHeading: string;
  testimonialsSubheading: string;
  testimonialsRating: string;

  // Trust & Ecosystem
  trustKicker: string;
  trustHeading: string;
  trustSubheading: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  ecosystemKicker: string;
  ecosystemHeading: string;
  ecosystemSubtext: string;

  // Blog Section
  blogKicker: string;
  blogHeading: string;
  blogSubheading: string;
  blogReadArticle: string;
  blogViewAll: string;

  // Contact & Quote
  contactKicker: string;
  contactHeading: string;
  contactSubheading: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formCompany: string;
  formService: string;
  formBudget: string;
  formMessage: string;
  formSubmit: string;
  formSubmitting: string;
  formSuccess: string;

  // Footer
  footerAboutText: string;
  footerRights: string;
  footerQuickLinks: string;
  footerServicesHeading: string;
  footerLegal: string;
  footerPrivacy: string;
  footerTerms: string;
  newsletterTitle: string;
  newsletterDesc: string;
  newsletterPlaceholder: string;
  newsletterBtn: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    viewDetails: 'View Details',
    viewAll: 'View All',
    learnMore: 'Learn More',
    requestConsultation: 'Request Consultation',
    exploreWork: 'Explore Our Work',
    contactUs: 'Contact Us',
    getInTouch: 'Get In Touch',
    readMore: 'Read More',
    applyNow: 'Apply Now',
    loading: 'Loading...',
    backToHome: 'Back to Home',

    topbarHub: 'Leverkusen, Germany · European Delivery Hub',
    topbarHours: 'Mon - Fri: 9:00 AM - 6:00 PM · Dedicated Client Support',

    navHome: 'Home',
    navAbout: 'About Us',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navTeam: 'Engineering Team',
    navBlog: 'Insights & News',
    navCareers: 'Careers',
    navContact: 'Contact Us',
    navGetQuote: 'Get Quote',
    navSignIn: 'Sign In',
    navSignUp: 'Sign Up',
    navProfile: 'My Profile',
    navLogout: 'Sign Out',
    navAdmin: 'Admin Dashboard',
    navCoreServices: 'Core Engineering Services',
    navGermanGovernance: '🇩🇪 LEVERKUSEN, GERMANY',
    navPmpTitle: 'PMP® Certified Project Governance',
    navPmpDesc: 'Managed directly under German quality standards and Scrum methodology. Transparent sprint velocity and verified SLAs.',

    heroEyebrow: 'Software · Architecture · Cloud',
    heroHeadline: 'We Build Scalable Digital Products That Move Your Business Forward',
    heroSubtext: 'Full-stack web engineering, resilient cloud infrastructure, and bespoke digital platforms engineered for performance, security, and measurable impact.',
    heroPrimaryBtn: 'Start a Project',
    heroSecondaryBtn: 'Explore Our Work',

    featMernTitle: 'Full Stack & MERN',
    featMernDesc: 'High-performance React 19 apps with Node, Express & MongoDB/PostgreSQL backends.',
    featServerTitle: 'Linux & Cloud Mesh',
    featServerDesc: 'Nginx reverse proxies, Docker orchestration, Hetzner, AWS & automated CI/CD.',
    featEcommerceTitle: 'E-Commerce Specialist',
    featEcommerceDesc: 'Headless Shopify Plus & WooCommerce stores engineered for rapid global conversions.',
    featCmsTitle: 'Enterprise CMS',
    featCmsDesc: 'Custom lightweight WordPress themes, secure REST API plugins, sub-second speed.',
    featApiTitle: 'API & Microservices',
    featApiDesc: 'Distributed architectures, event-driven streaming, and low-latency API gateways.',

    whoKicker: 'WHO WE ARE & OUR PEDIGREE',
    whoHeading: 'World-Class Engineering for High-Growth Global Businesses',
    whoSubtext: 'With over 10+ years of collective experience delivering software for enterprise clients in the USA, Germany, United Kingdom, and across Europe, we build mission-critical digital systems engineered to perform under heavy production loads.',
    whoBullet1: 'Strict Bilateral NDA & 100% IP Transfer',
    whoBullet2: 'Hardened Cloud & Server DevOps (99.99% SLA)',
    whoBullet3: 'Full-Stack MERN & Next.js Core Engineering',
    whoBullet4: 'US, UK & German Overlapping Timezone Sync',
    whoQuote: '"Our engineering teams harness the power of scalable cloud servers, full-stack MERN architecture, and modern headless frameworks to optimize operations and drive sustainable revenue for global enterprises."',
    whoMoreBtn: 'MORE ABOUT US',
    whoYearsExperience: 'Years of Engineering',

    servicesKicker: 'OUR SERVICES & SOLUTIONS',
    servicesHeading: 'We Offer a Wide Variety of IT Services',
    servicesSubheading: 'From modern web application development and cloud server setup to high-converting international e-commerce platforms, we engineer results.',
    servicesTag: 'Engineering',
    servicesViewDetails: 'View Specification',
    servicesViewAll: 'View All Services',

    teamKicker: 'ENGINEERING LEADERSHIP',
    teamHeading: 'Direct Access to Senior Software Architects',
    teamSubheading: 'Collaborate directly with senior full-stack architects, cloud specialists, and engineering leads who take full ownership of your product delivery.',
    teamActiveLead: 'Active Lead',
    teamCoreSpecialties: 'Core Specialties',
    teamViewProfile: 'View Specialist Profile',
    teamViewAll: 'View Entire Team',

    portfolioKicker: 'RECENT CLIENT CASE STUDIES',
    portfolioHeading: 'Featured Enterprise Engagements & Live Deployments',
    portfolioSubheading: 'Explore high-concurrency platforms, cloud architectures, and digital commerce applications engineered for global enterprise clients.',
    portfolioAllCategory: 'All Projects',
    portfolioViewProject: 'Explore Case Study',
    portfolioLiveDemo: 'Live Demo',
    portfolioViewAll: 'View All Projects',
    portfolioDeliveryTime: 'Delivery Time',

    testimonialsKicker: 'CLIENT TESTIMONIALS',
    testimonialsHeading: 'Trusted by Technical Leaders Worldwide',
    testimonialsSubheading: 'Hear directly from CTOs, product directors, and founders who rely on our engineering teams for mission-critical software.',
    testimonialsRating: 'Rated 4.9/5 by Enterprise Clients',

    trustKicker: 'ENTERPRISE STANDARDS',
    trustHeading: 'German Engineering Precision Meets Global Agility',
    trustSubheading: 'Strict adherence to European data privacy (GDPR), ISO-certified security protocols, and continuous integration pipelines.',
    trustBadge1: 'GDPR / DSGVO Compliant',
    trustBadge2: 'PMP® Agile Governance',
    trustBadge3: '99.99% Guaranteed SLA',
    ecosystemKicker: 'OUR GLOBAL INFRASTRUCTURE',
    ecosystemHeading: 'Built on Reliable Cloud Infrastructure',
    ecosystemSubtext: 'We partner with premier infrastructure providers to guarantee low-latency delivery, automated failover, and global reach.',

    blogKicker: 'INSIGHTS & INDUSTRY UPDATES',
    blogHeading: 'Latest Software Engineering Insights',
    blogSubheading: 'In-depth architectural breakdowns, DevOps best practices, and frontend performance optimizations from our engineering team.',
    blogReadArticle: 'Read Full Article',
    blogViewAll: 'View All Articles',

    contactKicker: 'START A CONVERSATION',
    contactHeading: 'Let’s Architect Your Next Digital Breakthrough',
    contactSubheading: 'Have a project in mind? Connect directly with our engineering architects for a comprehensive technical consultation and quote within 24 hours.',
    formName: 'Your Full Name',
    formEmail: 'Business Email Address',
    formPhone: 'Phone Number (Optional)',
    formCompany: 'Company / Organization',
    formService: 'Select Required Service',
    formBudget: 'Target Budget Range',
    formMessage: 'Project Details & Scope',
    formSubmit: 'Submit Consultation Request',
    formSubmitting: 'Submitting Request...',
    formSuccess: 'Thank you! Your inquiry has been received. Our engineering lead will respond within 24 hours.',

    footerAboutText: 'Premier software engineering consultancy delivering resilient web applications, scalable cloud architectures, and modern digital platforms for enterprises worldwide.',
    footerRights: 'All rights reserved. Bilateral NDAs & 100% IP Transfer guaranteed.',
    footerQuickLinks: 'Quick Links',
    footerServicesHeading: 'Services',
    footerLegal: 'Legal & Compliance',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    newsletterTitle: 'Engineering Newsletter',
    newsletterDesc: 'Monthly technical deep-dives into modern web architecture and DevOps.',
    newsletterPlaceholder: 'Enter your business email',
    newsletterBtn: 'Subscribe'
  },
  de: {
    viewDetails: 'Details ansehen',
    viewAll: 'Alle ansehen',
    learnMore: 'Mehr erfahren',
    requestConsultation: 'Beratung anfordern',
    exploreWork: 'Unsere Arbeiten entdecken',
    contactUs: 'Kontaktieren Sie uns',
    getInTouch: 'Kontakt aufnehmen',
    readMore: 'Weiterlesen',
    applyNow: 'Jetzt bewerben',
    loading: 'Wird geladen...',
    backToHome: 'Zurück zur Startseite',

    topbarHub: 'Leverkusen, Deutschland · Europäischer Delivery Hub',
    topbarHours: 'Mo - Fr: 9:00 - 18:00 (MEZ) · Dedizierter Support',

    navHome: 'Startseite',
    navAbout: 'Über uns',
    navServices: 'Leistungen',
    navPortfolio: 'Portfolio',
    navTeam: 'Entwicklerteam',
    navBlog: 'Fachartikel & News',
    navCareers: 'Karriere',
    navContact: 'Kontakt',
    navGetQuote: 'Angebot anfordern',
    navSignIn: 'Anmelden',
    navSignUp: 'Registrieren',
    navProfile: 'Mein Profil',
    navLogout: 'Abmelden',
    navAdmin: 'Admin-Bereich',
    navCoreServices: 'Kernkompetenzen & Softwareentwicklung',
    navGermanGovernance: '🇩🇪 LEVERKUSEN, DEUTSCHLAND',
    navPmpTitle: 'PMP®-zertifizierte Projektsteuerung',
    navPmpDesc: 'Geleitet nach deutschen Qualitätsstandards und Scrum-Methodik. Transparente Sprint-Velocity und garantierte SLAs.',

    heroEyebrow: 'Software · Architektur · Cloud',
    heroHeadline: 'Wir entwickeln skalierbare Produkte, die Ihr Unternehmen voranbringen',
    heroSubtext: 'Full-Stack-Engineering, belastbare Cloud-Infrastruktur und moderne digitale Plattformen – entwickelt für höchste Performance, Sicherheit und messbaren Erfolg.',
    heroPrimaryBtn: 'Projekt starten',
    heroSecondaryBtn: 'Unsere Arbeiten entdecken',

    featMernTitle: 'Full Stack & MERN',
    featMernDesc: 'Hochperformante React 19 Web-Apps mit Node, Express & MongoDB/PostgreSQL Backends.',
    featServerTitle: 'Linux & Cloud-Infrastruktur',
    featServerDesc: 'Nginx Reverse Proxies, Docker-Orchestrierung, Hetzner, AWS & automatisierte CI/CD.',
    featEcommerceTitle: 'E-Commerce Spezialist',
    featEcommerceDesc: 'Headless Shopify Plus & WooCommerce Onlineshops optimiert für weltweite Conversions.',
    featCmsTitle: 'Enterprise CMS-Portale',
    featCmsDesc: 'Individuelle, schlanke WordPress-Systeme, sichere REST-APIs und Ladezeiten unter einer Sekunde.',
    featApiTitle: 'APIs & Microservices',
    featApiDesc: 'Verteilte Cloud-Architekturen, ereignisgesteuertes Streaming und hochperformante Schnittstellen.',

    whoKicker: 'ÜBER UNS & UNSERE ERFAHRUNG',
    whoHeading: 'Erstklassiges Software-Engineering für anspruchsvolle Unternehmen',
    whoSubtext: 'Mit über 10 Jahren gemeinsamer Erfahrung in der Softwareentwicklung für Enterprise-Kunden in Deutschland, den USA, Großbritannien und ganz Europa entwickeln wir unternehmenskritische Systeme für höchste Belastungen.',
    whoBullet1: 'Strenge bilaterale NDA & 100% IP-Eigentumsübertragung',
    whoBullet2: 'Gehärtetes Cloud & Server DevOps (99,99% SLA)',
    whoBullet3: 'Full-Stack MERN & Next.js Kernarchitektur',
    whoBullet4: 'Nahtlose Abstimmung in deutschen & europäischen Zeitzonen',
    whoQuote: '"Unsere Entwicklerteams nutzen moderne Cloud-Server, Full-Stack-MERN-Architekturen und Headless-Frameworks, um Geschäftsprozesse zu optimieren und nachhaltiges Unternehmenswachstum zu sichern."',
    whoMoreBtn: 'MEHR ÜBER UNS',
    whoYearsExperience: 'Jahre Engineering-Erfahrung',

    servicesKicker: 'UNSERE LEISTUNGEN & LÖSUNGEN',
    servicesHeading: 'Umfassende IT- & Software-Engineering-Dienstleistungen',
    servicesSubheading: 'Von moderner Webanwendungsentwicklung und Cloud-Server-Infrastruktur bis hin zu internationalen High-Conversion E-Commerce Plattformen.',
    servicesTag: 'Engineering',
    servicesViewDetails: 'Spezifikation ansehen',
    servicesViewAll: 'Alle Leistungen anzeigen',

    teamKicker: 'TECHNISCHE FÜHRUNG',
    teamHeading: 'Direkter Kontakt zu Senior Software Architects',
    teamSubheading: 'Arbeiten Sie direkt mit erfahrenen Full-Stack-Architekten, Cloud-Spezialisten und technischen Leads zusammen, die volle Verantwortung übernehmen.',
    teamActiveLead: 'Aktiver Lead',
    teamCoreSpecialties: 'Kernkompetenzen',
    teamViewProfile: 'Spezialistenprofil ansehen',
    teamViewAll: 'Gesamtes Team ansehen',

    portfolioKicker: 'AKTUELLE KUNDENPROJEKTE',
    portfolioHeading: 'Ausgewählte Enterprise-Projekte & Live-Deployments',
    portfolioSubheading: 'Entdecken Sie hochskalierbare Webplattformen, Cloud-Infrastrukturen und E-Commerce-Systeme für globale Kunden.',
    portfolioAllCategory: 'Alle Projekte',
    portfolioViewProject: 'Fallstudie ansehen',
    portfolioLiveDemo: 'Live-Demo',
    portfolioViewAll: 'Alle Projekte ansehen',
    portfolioDeliveryTime: 'Lieferzeit',

    testimonialsKicker: 'KUNDENSTIMMEN',
    testimonialsHeading: 'Geschätzt von technischen Führungskräften weltweit',
    testimonialsSubheading: 'Erfahren Sie, was CTOs, Produktleiter und Gründer über die Zusammenarbeit mit unseren Engineering-Teams berichten.',
    testimonialsRating: 'Bewertet mit 4,9/5 von Unternehmenskunden',

    trustKicker: 'ENTERPRISE-STANDARDS',
    trustHeading: 'Deutsche Ingenieurspräzision vereint mit globaler Agilität',
    trustSubheading: 'Strikte Einhaltung der europäischen Datenschutz-Grundverordnung (DSGVO), geprüfte Sicherheitsstandards und automatisierte CI/CD-Pipelines.',
    trustBadge1: '100% DSGVO / GDPR-konform',
    trustBadge2: 'PMP® Agile Governance',
    trustBadge3: '99,99% garantierte SLA',
    ecosystemKicker: 'UNSERE GLOBALE INFRASTRUKTUR',
    ecosystemHeading: 'Aufgebaut auf hochverfügbaren Cloud-Systemen',
    ecosystemSubtext: 'Wir kooperieren mit führenden Infrastrukturanbietern, um minimale Latenzzeiten, automatische Ausfallsicherheit und globale Skalierbarkeit zu gewährleisten.',

    blogKicker: 'FACHARTIKEL & BRANCHEN-NEWS',
    blogHeading: 'Aktuelle Einblicke aus der Softwareentwicklung',
    blogSubheading: 'Tiefgehende Architekturanalysen, Best Practices für DevOps und Performance-Optimierungen von unseren Experten.',
    blogReadArticle: 'Vollständigen Artikel lesen',
    blogViewAll: 'Alle Artikel ansehen',

    contactKicker: 'PROJEKT BESPRECHEN',
    contactHeading: 'Lassen Sie uns Ihre nächste digitale Lösung realisieren',
    contactSubheading: 'Haben Sie ein konkretes Projektvorhaben? Sprechen Sie direkt mit unseren technischen Architekten für eine unverbindliche Beratung und ein Angebot innerhalb von 24 Stunden.',
    formName: 'Ihr vollständiger Name',
    formEmail: 'Geschäftliche E-Mail-Adresse',
    formPhone: 'Telefonnummer (Optional)',
    formCompany: 'Unternehmen / Organisation',
    formService: 'Gewünschte Leistung wählen',
    formBudget: 'Geplantes Budget',
    formMessage: 'Projektbeschreibung & Anforderungen',
    formSubmit: 'Beratungsanfrage absenden',
    formSubmitting: 'Anfrage wird gesendet...',
    formSuccess: 'Vielen Dank! Ihre Anfrage ist eingegangen. Unser technischer Projektleiter wird sich innerhalb von 24 Stunden bei Ihnen melden.',

    footerAboutText: 'Führendes Beratungs- und Softwareunternehmen für performante Webplattformen, skalierbare Cloud-Architekturen und zukunftssichere Enterprise-Systeme weltweit.',
    footerRights: 'Alle Rechte vorbehalten. Bilaterale Geheimhaltungsvereinbarungen & 100% IP-Übertragung garantiert.',
    footerQuickLinks: 'Schnellzugriff',
    footerServicesHeading: 'Leistungen',
    footerLegal: 'Rechtliches & Compliance',
    footerPrivacy: 'Datenschutzerklärung',
    footerTerms: 'Allgemeine Geschäftsbedingungen (AGB)',
    newsletterTitle: 'Technologie-Newsletter',
    newsletterDesc: 'Monatliche technische Fachberichte über moderne Webarchitektur und Cloud-DevOps.',
    newsletterPlaceholder: 'Geschäftliche E-Mail eingeben',
    newsletterBtn: 'Abonnieren'
  }
};

// ─── German Localized Data Mappings ──────────────────────────────────────────

export const germanHeroSlides: Record<number, Partial<HeroSlide>> = {
  0: {
    badge: 'Full-Stack Webentwicklung • MERN & Next.js',
    title: 'Enterprise-Webanwendungen optimiert für',
    highlightText: 'Höchste Skalierbarkeit & Performance',
    subtitle: 'Wir konzipieren robuste Cloud-Architekturen, maßgeschneiderte digitale Plattformen und hochperformante Webanwendungen für zukunftsorientierte Unternehmen.',
    primaryBtnText: 'Beratung anfragen',
    secondaryBtnText: 'Leistungen entdecken'
  },
  1: {
    badge: 'Linux-Servertechnik & DevOps',
    title: 'Gehärtete Cloud-Infrastruktur mit',
    highlightText: '99,99 % garantierter Verfügbarkeit',
    subtitle: 'Zero-Downtime CI/CD-Pipelines, automatisierte Kubernetes-Orchestrierung und 24/7 proaktive Systemüberwachung.',
    primaryBtnText: 'Infrastruktur-SLAs ansehen',
    secondaryBtnText: 'Projekte entdecken'
  },
  2: {
    badge: 'Headless E-Commerce & Conversion-Optimierung',
    title: 'Digitale Shopping-Erlebnisse für',
    highlightText: 'Maximale Conversion-Geschwindigkeit',
    subtitle: 'Individuelle Headless-Storefronts mit Shopify Plus, nahtlose Stripe-Zahlungsabwicklung und blitzschnelle Produktsuche.',
    primaryBtnText: 'E-Commerce-Projekt starten',
    secondaryBtnText: 'Fallstudien ansehen'
  },
  3: {
    badge: 'Corporate CMS & Enterprise-Portale',
    title: 'Sichere & skalierbare CMS-Systeme mit',
    highlightText: 'Globaler Auslieferung unter 1 Sekunde',
    subtitle: 'Enterprise-WordPress-Lösungen und Headless-CMS-Architekturen mit geprüfter Sicherheit und blitzschnellem CDN-Caching.',
    primaryBtnText: 'Architektur-Audit vereinbaren',
    secondaryBtnText: 'Kontakt aufnehmen'
  }
};

export const germanServices: Record<string, Partial<ServiceDetail>> = {
  'serv-1': {
    title: 'Full Stack & MERN Entwicklung',
    shortDesc: 'Reaktive, maßgeschneiderte Webanwendungen mit MongoDB, Express, React 19 und Node.js für extreme Geschwindigkeit und Skalierbarkeit.',
    fullDesc: 'Wir entwickeln individuelle Websoftware und skalierbare SaaS-Plattformen auf Basis des modernen MERN-Stacks. Von Enterprise-Dashboards bis hin zu Echtzeit-Kollaborationstools sind unsere Codebasen modular, typsicher in TypeScript und auf minimale Latenzzeiten optimiert.',
    features: ['Single Page & Progressive Web Apps (PWA)', 'Echtzeit-WebSocket-Ereignisarchitektur', 'REST & GraphQL API-Design', 'Rollenbasierte Zugriffskontrolle (RBAC)'],
    deliverables: ['Produktionsbereite Webanwendung', 'Vollständiger Quellcode & Dokumentation', 'Automatisierte Unit- und Integrationstests', 'Einrichtung der Deployment-Pipeline']
  },
  'serv-2': {
    title: 'Cloud- & Server-Architektur',
    shortDesc: 'Zuverlässige Linux-Server, Nginx Reverse Proxies, Cloud-Migrationen und 24/7-Monitoring mit 99,99% Verfügbarkeitsgarantie.',
    fullDesc: 'Ob Hosting bei Hetzner Deutschland, AWS, DigitalOcean oder auf Bare-Metal-Servern: Unser Team richtet gehärtete Umgebungen, automatisierte Backups, unterbrechungsfreie CI/CD-Pipelines und DDoS-Schutz ein.',
    features: ['Containerisierte Zero-Downtime Deployments', 'Gehärtete Linux-Firewall & Sicherheitsaudits', 'Datenbank-Clustering & Replikation', '24/7 Systemüberwachung & Alerting'],
    deliverables: ['Konfigurierter Produktionsserver', 'Automatisierte Backup-Skripte', 'Sicherheits-Auditbericht', 'Server-Monitoring-Dashboard']
  },
  'serv-3': {
    title: 'E-Commerce Spezialist (Shopify & WooCommerce)',
    shortDesc: 'Umsatzstarke individuelle Shopify-Storefronts, Headless E-Commerce Architekturen und hochoptimierte WooCommerce-Shops.',
    fullDesc: 'Wir verwandeln Besucher in Kunden. Unsere E-Commerce-Entwicklung umfasst maßgeschneiderte Theme-Entwicklung, Headless Shopify mit React/Next.js, Multi-Währungs-Checkouts und nahtlose Warenwirtschaftsintegrationen.',
    features: ['Ladezeiten unter einer Sekunde', 'Individuelle Produktkonfiguratoren & Filter', 'Multi-Währungs- & Mehrwertsteuer-Handling', 'Zahlungsgateway-Integrationen (Stripe, Klarna, PayPal)'],
    deliverables: ['Schlüsselfertiger Onlineshop', 'Optimierter Checkout-Funnel', 'Anbindung an ERP & Warenwirtschaft', 'Mitarbeiterschulung & Dokumentation']
  },
  'serv-4': {
    title: 'Enterprise CMS & WordPress-Lösungen',
    shortDesc: 'Moderne, sichere WordPress-Portale, schlanke individuelle Themes und Headless-CMS-Architekturen ohne Bloatware.',
    fullDesc: 'Wir bauen professionelle Unternehmens-Websites mit maßgeschneiderten Themes, individuellen Gutenberg-Blöcken, optimierter Datenbankstruktur und höchster Sicherheitskonfiguration.',
    features: ['Maßgeschneiderte Themes ohne Page-Builder-Ballast', 'Google Core Web Vitals 95+ Score', 'DSGVO-konforme Tracking- & Cookie-Lösungen', 'Automatisierte Sicherheits- & Update-Mechanismen'],
    deliverables: ['Individuelle WordPress-Installation', 'Gutenberg-Blockbibliothek', 'SEO- & Performance-Audit', 'Schulungsvideo für Redakteure']
  },
  'serv-5': {
    title: 'REST- & GraphQL-API-Entwicklung',
    shortDesc: 'Sichere, gut dokumentierte und hochgradig skalierbare Schnittstellen für Web-, Mobile- und Drittanbieter-Integrationen.',
    fullDesc: 'Wir konzipieren und implementieren robuste API-Ökosysteme mit automatischer OpenAPI/Swagger-Dokumentation, Token-basierter Authentifizierung und intelligenter Ratenbegrenzung.',
    features: ['RESTful & GraphQL Schnittstellenarchitektur', 'JWT- & OAuth2-Authentifizierung', 'Redis-Caching für Sub-Millisekunden-Antworten', 'Umfassende Swagger/Postman Dokumentation'],
    deliverables: ['Getestete & deployte API-Endpunkte', 'Interaktive API-Dokumentation', 'Postman-Testsammlung', 'SDK-Beispielcodes']
  },
  'serv-6': {
    title: 'Mobile App Entwicklung (React Native & Flutter)',
    shortDesc: 'Plattformübergreifende iOS- & Android-Apps mit nativer Performance, Offline-Fähigkeit und intuitiver Benutzerführung.',
    fullDesc: 'Entwicklung nativer mobiler Erlebnisse für iOS und Android mit einheitlicher Codebasis. Von Push-Benachrichtigungen bis hin zu Offline-Datensynchronisation bieten wir ganzheitliche mobile Lösungen.',
    features: ['Native Performance auf iOS und Android', 'Offline-First Datenarchitektur', 'Biometrische Anmeldung & Push-Notifications', 'Automatisierter App Store & Google Play Release'],
    deliverables: ['Kompilierte iOS- und Android-Builds', 'Quellcode & CI/CD-Konfiguration', 'App Store Einreichungsunterstützung', 'Wartungs- & Update-Plan']
  }
};

export const germanProjects: Record<string, Partial<Project>> = {
  'proj-1': {
    title: 'FinTech Cloud-Banking Portal',
    category: 'Full Stack & MERN',
    description: 'Enterprise Full-Stack-Banking-Portal für ein europäisches Finanzinstitut mit Microservices, Sub-Sekunden-Latenz, Multi-Währungsbuchhaltung und Echtzeit-Betrugserkennung.',
    features: ['Multi-Währungs-IBAN-Verwaltung', 'Zwei-Faktor-Biometrie-Authentifizierung', 'BaFin-konforme Audit-Protokollierung', 'Sub-Millisekunden Redis-Caching'],
    metrics: 'Über 14 Mio. € Transaktionsvolumen bei 99,99% Verfügbarkeit',
    estimatedDelivery: '3 - 5 Wochen',
    highlight: 'BaFin-konform • Über 14 Mio. € Transaktionen'
  },
  'proj-2': {
    title: 'High-End Klassikgitarren E-Commerce',
    category: 'E-Commerce',
    description: 'Individueller, hochkonvertierender Onlineshop und Instrumentenportal für Meistergitarren in North Carolina, USA mit weltweitem Versand.',
    features: ['Akustischer Audio-Sample Waveform-Player', 'Hochauflösende 360-Grad-Zoomgalerie', 'Nahtloser nationaler & internationaler Checkout', 'Echtzeit-Lagerverwaltung über mehrere Standorte'],
    metrics: '+38% Steigerung des durchschnittlichen Bestellwerts (AOV)',
    estimatedDelivery: '2 - 3 Wochen',
    highlight: '+38% AOV-Wachstum • Algolia & Stripe'
  },
  'proj-3': {
    title: 'Gewerbliches Elektro- & Netzkraft-SaaS',
    category: 'Web Application',
    description: 'Betriebs-, Dispositions- und Montageportal für ein großes Industrie-Elektrounternehmen in Florida, USA.',
    features: ['Echtzeit-Disposition von Montageteams', 'Automatisierte OSHA-Sicherheitscompliance', 'Bauplan-Viewer & Annotations-Werkzeug', 'Mandantenfähige Abrechnungs-Engine'],
    metrics: 'Verwaltung von über 350 gewerblichen Großprojekten',
    estimatedDelivery: '3 - 4 Wochen',
    highlight: '350+ Großprojekte verwaltet • Echtzeit-Disposition'
  },
  'proj-4': {
    title: 'Nachhaltiges Mega-Rechenzentrum Cloud-Grid',
    category: 'Backend & Cloud',
    description: 'Telemetrisches IoT-Energiemonitoring und Multi-Gigawatt-Kühlungsnetz für Europas größten 100% grünen Rechenzentrumscampus in Sines, Portugal.',
    features: ['Echtzeit-PUE-Analytik (Power Usage Effectiveness)', 'Automatisierte Anomalie-Erkennung', 'EU-ETS-konformes CO2-Emissions-Tracking', 'Strenge TLS 1.3 verschlüsselte Telemetrie'],
    metrics: 'Echtzeit-Telemetrie über 495-MW-Campus-Kapazität',
    estimatedDelivery: '4 - 6 Wochen',
    highlight: '495MW Campus-Telemetrie • TimescaleDB & Grafana'
  },
  'proj-5': {
    title: 'Nordic Clean Living Headless Shopify',
    category: 'E-Commerce',
    description: 'Hochkonvertierender Headless-Shopify-Store für nachhaltige Wohnartikel in der DACH-Region (Deutschland, Österreich, Schweiz) mit 98+ PageSpeed-Werten.',
    features: ['Headless-Checkout mit Klarna & SEPA-Lastschrift', 'DSGVO- & Cookie-Consent-Engine', 'Individueller 3D-Produktkonfigurator', 'Automatisierte DHL Express Versandetiketten'],
    metrics: '+43% Steigerung der mobilen Konversionsrate',
    estimatedDelivery: '2 - 3 Wochen',
    highlight: '98+ PageSpeed • Klarna & SEPA Sofort-Checkout'
  },
  'proj-6': {
    title: 'Bundesweite Fracht- & Logistik-Telemetrie',
    category: 'Web Application',
    description: 'Umfassende Supply-Chain- und Flottenverfolgungsplattform für einen führenden Logistikdienstleister mit Echtzeit-GPS-Telemetrie.',
    features: ['Echtzeit-Disposition von Fracht-LKW', 'Automatisierte Rechnungs- & Frachtbrief-Erstellung', 'Offline-fähige PWA für Fahrer vor Ort', 'Integrierte SMS-Benachrichtigungs-Gateways'],
    metrics: 'Über 4.500 aktiv verwaltete Sendungen pro Tag',
    estimatedDelivery: '2 - 4 Wochen',
    highlight: '4.500+ Sendungen/Tag • Offline-PWA & GPS GIS'
  },
  'proj-7': {
    title: 'Globales Multi-Vendor Handelsportal',
    category: 'WordPress & Shopify',
    description: 'Enterprise-Multi-Vendor-Architektur mit Echtzeit-Währungsumrechnung (USD, GBP, EUR) für einen stark expandierenden britischen Einzelhändler.',
    features: ['Sub-Sekunden facettierte Produktsuche', 'Automatisierte UK-MwSt.-Berechnung', 'Lagerhaussynchronisation London & Manchester', 'Mobile PWA Shopping-Experience'],
    metrics: 'Sprint 3 aktiv • 0,38s durchschnittliche Serverantwortzeit',
    estimatedDelivery: '3 - 4 Wochen',
    highlight: '0,38s Serverantwort • Multi-Währungs-Ledger'
  },
  'proj-8': {
    title: 'MedConnect Telemedizin & Patientenportal',
    category: 'Web Application',
    description: 'Telemedizin-Plattform der nächsten Generation mit verschlüsselten WebRTC-Videosprechstunden, E-Rezept-Anbindung und strenger DSGVO-Konformität.',
    features: ['Ende-zu-Ende verschlüsselte Videosprechstunden', 'Deutsche E-Rezept-Synchronisation', 'Automatisierte Arzttermin-Buchung', 'Integrierte SEPA- & Kreditkartenzahlung'],
    metrics: '65% kürzere Wartezeiten über 14 Klinikstandorte hinweg',
    estimatedDelivery: '3 - 4 Wochen',
    highlight: 'DSGVO-verschlüsseltes WebRTC • 14 Kliniken versorgt'
  },
  'proj-9': {
    title: 'Luxury Estates PropTech Buchungsportal',
    category: 'Full Stack & MERN',
    description: 'Exklusives Maklerportal mit interaktiver Mapbox-Geolokalisierung, virtuellen 3D-Rundgängen, Hypothekenrechner und Lead-Qualifizierungs-CRM.',
    features: ['Interaktive Mapbox-Grundstückssuche', 'Matterport 3D-Virtual-Tour-Einbindung', 'Lead-Erfassungs-Funnel mit SMS & E-Mail', 'Automatische MLS / IDX Immobilien-Feeds'],
    metrics: 'Über 28 Mio. $ an Immobilienanfragen in den ersten 6 Monaten',
    estimatedDelivery: '2 - 3 Wochen',
    highlight: '28M+ $ Anfragen generiert • 3D Virtual Tours'
  },
  'proj-10': {
    title: 'OmniFlow KI Kundensupport- & Automations-Suite',
    category: 'Backend & Cloud',
    description: 'Hochdurchsatz-Kundeninteraktions-Engine mit Multi-Channel-WhatsApp, E-Mail und Live-Webchat sowie autonomem LLM-Routing und CRM-Konnektoren.',
    features: ['Autonome KI-First-Response unter 1 Sekunde', 'Intelligente Eskalation an menschliche Berater', 'Omnichannel-Synchronisation (WhatsApp, E-Mail, Chat)', 'Echtzeit-Sentiment-Analytik & Berichte'],
    metrics: 'Bearbeitung von über 120.000 Kundenkonversationen pro Monat',
    estimatedDelivery: '3 - 5 Wochen',
    highlight: '120.000+ Konversationen/Monat • Autonomes LLM'
  }
};

export const germanTeamMembers: Record<string, Partial<TeamMember>> = {
  'founder': {
    role: 'Gründer & Geschäftsführer | European Technical Delivery Lead',
    headline: 'Gründer & Geschäftsführer | PMP®-zertifizierter Projektleiter & Software-Architekt | Leverkusen, Deutschland',
    bio: 'PMP®-zertifizierter IT-Projektmanager und Senior Software Engineer mit Sitz in Leverkusen, Deutschland. Master of Science (M.Sc.) der Ruhr-Universität Bochum mit über 10 Jahren Führungserfahrung in europäischen Softwareprojekten.',
    location: 'Leverkusen, Deutschland (EU-Zentrale)'
  },
  'team-1': {
    role: 'Full Stack Software Engineer | E-Commerce & Cloud Spezialist',
    headline: 'Full Stack Software Engineer | React, Next.js, Node.js & Cloud-Lösungen',
    bio: 'Erfahrener Full-Stack-Entwickler mit Schwerpunkt auf skalierbaren React- und Next.js-Architekturen, resilienten Node.js-Backends und Cloud-Serverinfrastrukturen.'
  }
};

export const germanTestimonials: Record<string, Partial<Testimonial>> = {
  'test-1': {
    quote: 'Die Zusammenarbeit mit WebDev Software Solutions unter deutscher Projektleitung war herausragend. Unser neues Banking-Portal läuft absolut ausfallsicher und erfüllt alle strengen BaFin-Vorgaben.',
    role: 'Head of Digital Banking, München'
  },
  'test-2': {
    quote: 'Innerhalb von nur drei Wochen hat das Team unseren Shopify-Plus-Shop komplett neu aufgebaut. Die Ladezeit sank um 70% und unser internationaler Umsatz stieg direkt spürbar an.',
    role: 'E-Commerce Direktor, Berlin'
  }
};

export const germanBlogs: Record<string, Partial<BlogPost>> = {
  'blog-1': {
    title: 'Skalierung von Next.js 15 und React 19 in Hochlast-Unternehmensumgebungen',
    excerpt: 'Praxisnahe Architekturstrategien zur Optimierung von Server Components, Caching-Ebenen und Docker-Deployments unter extremen Lastspitzen.',
    readTime: '6 Min. Lesezeit'
  },
  'blog-2': {
    title: 'Zero-Downtime Linux-Server-Deployment mit PM2, Nginx & Docker',
    excerpt: 'Eine Schritt-für-Schritt-Anleitung für gehärtete Server-Infrastrukturen mit 99,99% Verfügbarkeit und automatisiertem Rollback.',
    readTime: '8 Min. Lesezeit'
  }
};
