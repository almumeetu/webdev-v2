import { Project, TeamMember, BlogPost, Inquiry, ServiceDetail, SiteSettings, Testimonial, HeroSlide, JobPosting, JobApplication } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'FinTech Cloud-Banking Portal',
    category: 'Full Stack & MERN',
    status: 'completed',
    description: 'Enterprise full-stack banking portal for a European financial institution featuring microservices, sub-second latency, multi-currency accounting, and real-time fraud detection.',
    clientName: 'Bavarian FinTech Group',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    liveUrl: 'https://fintech-portal.example.com',
    features: ['Multi-currency IBAN account management', 'Two-factor biometric authentication', 'BaFin-compliant audit logging', 'Sub-millisecond Redis caching'],
    metrics: '€14M+ processed monthly transaction volume at 99.99% uptime',
    priceRange: '€12,500 - €25,000',
    estimatedDelivery: '3 - 5 Weeks',
    readyToOrder: true,
    highlight: 'BaFin-compliant • €14M+ volume'
  },
  {
    id: 'proj-2',
    title: 'High-End Classical Guitar E-Commerce',
    category: 'E-Commerce',
    status: 'completed',
    description: 'Custom high-converting online shop and instrument showroom for master luthier classical guitars based in North Carolina, USA with worldwide shipping.',
    clientName: 'All Strings Nylon',
    clientCountry: 'USA',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    techStack: ['Next.js', 'Shopify', 'React', 'TailwindCSS', 'Algolia', 'Stripe', 'Audio Waveform API'],
    liveUrl: 'https://allstringsnylon.com',
    features: ['Acoustic audio sample waveform player', 'Ultra-high-res 360° zoom gallery', 'Seamless domestic & international checkout', 'Real-time multi-location warehouse sync'],
    metrics: '+38% increase in average order value (AOV)',
    priceRange: '$8,500 - $16,000',
    estimatedDelivery: '2 - 3 Weeks',
    readyToOrder: true,
    highlight: '+38% AOV Growth • Algolia & Stripe'
  },
  {
    id: 'proj-3',
    title: 'Commercial Electrical & Power Grid SaaS',
    category: 'Web Application',
    status: 'completed',
    description: 'Operations, dispatching, and field assembly portal for a major industrial electrical contractor based in Florida, USA.',
    clientName: 'Gilmore Electric Co.',
    clientCountry: 'USA',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    liveUrl: 'https://gilmoreelectric.example.com',
    features: ['Real-time field technician dispatching', 'Automated OSHA safety compliance checklists', 'Architectural blueprint viewer & annotation tool', 'Multi-tenant commercial billing engine'],
    metrics: 'Managed 350+ commercial construction projects',
    priceRange: '$14,000 - $28,000',
    estimatedDelivery: '3 - 4 Weeks',
    readyToOrder: true,
    highlight: '350+ Projects Managed • Real-Time Dispatch'
  },
  {
    id: 'proj-4',
    title: 'Sustainable Mega Data Center Cloud-Grid',
    category: 'Backend & Cloud',
    status: 'completed',
    description: 'Telemetric IoT energy monitoring and multi-gigawatt cooling grid telemetry for Europe’s largest 100% green data center campus in Sines, Portugal.',
    clientName: 'Start Campus Sines',
    clientCountry: 'Europe',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    techStack: ['Python', 'Django', 'TimescaleDB', 'Grafana', 'Docker', 'AWS IoT', 'Redis'],
    liveUrl: 'https://startcampus.pt',
    features: ['Real-time PUE (Power Usage Effectiveness) analytics', 'Automated anomaly detection and heat distribution', 'EU-ETS compliant carbon footprint tracking', 'Strict TLS 1.3 encrypted industrial telemetry'],
    metrics: 'Real-time telemetry across 495MW campus capacity',
    priceRange: '€18,000 - €35,000',
    estimatedDelivery: '4 - 6 Weeks',
    readyToOrder: true,
    highlight: '495MW Campus Telemetry • TimescaleDB & Grafana'
  },
  {
    id: 'proj-5',
    title: 'Nordic Clean Living Headless Shopify',
    category: 'E-Commerce',
    status: 'completed',
    description: 'High-converting headless Shopify storefront for sustainable home goods across the DACH region with 98+ PageSpeed scores.',
    clientName: 'Nordic Living GmbH',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    techStack: ['Next.js', 'Shopify', 'TypeScript', 'TailwindCSS', 'Klarna', 'Stripe'],
    liveUrl: 'https://nordic-living.example.de',
    features: ['Headless checkout with Klarna & SEPA direct debit', 'GDPR-compliant cookie consent and privacy engine', 'Custom 3D product visualizer', 'Automated DHL Express shipping label generation'],
    metrics: '+43% increase in mobile checkout conversion rate',
    priceRange: '€7,500 - €15,000',
    estimatedDelivery: '2 - 3 Weeks',
    readyToOrder: true,
    highlight: '98+ PageSpeed • Klarna & SEPA Direct Checkout'
  },
  {
    id: 'proj-6',
    title: 'Nationwide Freight & Logistics Telemetry',
    category: 'Web Application',
    status: 'completed',
    description: 'Comprehensive supply chain and fleet tracking platform for a leading German freight logistics provider featuring real-time GPS telemetry.',
    clientName: 'Bavarian Cargo Express GmbH',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Mapbox GL', 'Socket.io', 'Docker'],
    liveUrl: 'https://bavarian-cargo.example.de',
    features: ['Real-time freight truck dispatching and ETA recalculation', 'Automated CMR invoice and bill of lading generation', 'Offline-first PWA for field drivers', 'Integrated SMS and webhook delivery notification gateways'],
    metrics: '4,500+ active consignments tracked daily',
    priceRange: '€11,000 - €22,000',
    estimatedDelivery: '2 - 4 Weeks',
    readyToOrder: true,
    highlight: '4,500+ Shipments/Day • Offline PWA & GPS GIS'
  },
  {
    id: 'proj-7',
    title: 'Global Multi-Vendor Retail Portal',
    category: 'WordPress & Shopify',
    status: 'ongoing',
    description: 'Enterprise multi-vendor architecture with real-time multi-currency support (USD, GBP, EUR) for an expanding UK omnichannel retailer.',
    clientName: 'Crown Retail Group UK',
    clientCountry: 'UK',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026',
    techStack: ['Shopify', 'WordPress', 'GraphQL', 'Next.js', 'TailwindCSS', 'Stripe'],
    liveUrl: 'https://crown-retail.example.co.uk',
    features: ['Sub-second faceted product search', 'Automated UK VAT calculation and digital invoicing', 'London and Manchester multi-warehouse inventory sync', 'Mobile-first PWA shopping experience'],
    metrics: 'Sprint 3 active • 0.38s average server response',
    priceRange: '£9,000 - £18,000',
    estimatedDelivery: '3 - 4 Weeks',
    readyToOrder: true,
    highlight: '0.38s Server Response • Multi-Currency Ledger'
  },
  {
    id: 'proj-8',
    title: 'MedConnect Telemedicine & Patient Portal',
    category: 'Web Application',
    status: 'completed',
    description: 'Next-generation telemedicine platform with encrypted WebRTC video consultations, electronic prescription dispatch, and strict German GDPR compliance.',
    clientName: 'MedConnect Kliniken e.V.',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    techStack: ['Next.js', 'TypeScript', 'WebRTC', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Docker'],
    liveUrl: 'https://medconnect.example.de',
    features: ['End-to-end encrypted video consultations', 'German E-Prescription synchronization', 'Automated doctor appointment booking', 'Integrated SEPA & credit card payment'],
    metrics: '65% reduction in wait times across 14 clinic locations',
    priceRange: '€15,000 - €30,000',
    estimatedDelivery: '3 - 4 Weeks',
    readyToOrder: true,
    highlight: 'GDPR-Encrypted WebRTC • 14 Clinics Powered'
  },
  {
    id: 'proj-9',
    title: 'Luxury Estates PropTech Booking Portal',
    category: 'Full Stack & MERN',
    status: 'completed',
    description: 'Exclusive real estate portal with interactive Mapbox geolocation, 3D virtual tours, mortgage estimation calculator, and lead qualification CRM.',
    clientName: 'Pacific Rim Luxury Realty',
    clientCountry: 'USA',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Mapbox', 'TailwindCSS', 'AWS'],
    liveUrl: 'https://luxury-estates.example.com',
    features: ['Interactive Mapbox parcel and neighborhood search', 'Matterport 3D virtual tour embedding', 'Lead capture funnel with SMS and automated email', 'Automated MLS / IDX property feeds'],
    metrics: '$28M+ in property inquiries generated in first 6 months',
    priceRange: '$10,000 - $20,000',
    estimatedDelivery: '2 - 3 Weeks',
    readyToOrder: true,
    highlight: '$28M+ Inquiries Generated • 3D Virtual Tours'
  },
  {
    id: 'proj-10',
    title: 'OmniFlow AI Customer Support & Automation Suite',
    category: 'Backend & Cloud',
    status: 'ongoing',
    description: 'High-throughput customer interaction engine with multi-channel WhatsApp, email, and live web chat, paired with autonomous LLM routing and CRM connectors.',
    clientName: 'OmniFlow EU Ltd.',
    clientCountry: 'Europe',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026',
    techStack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    liveUrl: 'https://omniflow-ai.example.eu',
    features: ['Autonomous AI first response under 1 second', 'Intelligent sentiment escalation to human agents', 'Omnichannel sync across WhatsApp, Email, and Chat', 'Real-time analytics and CSAT reporting dashboard'],
    metrics: 'Handling 120,000+ monthly customer conversations',
    priceRange: '€16,000 - €32,000',
    estimatedDelivery: '3 - 5 Weeks',
    readyToOrder: true,
    highlight: '120,000+ Conversations/Month • Autonomous LLM'
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-2',
    name: 'Md Moyen Uddin, PMP®',
    role: 'Founder & CEO | Senior Software Engineer & Scrum Master | European Delivery Lead',
    headline: 'Founder & CEO | Senior Software Engineer and Scrum Master | PMP® Certified Project Manager | European Delivery Lead',
    branch: 'Küppersteg, Leverkusen, Germany',
    location: 'Küppersteg, Leverkusen (DE)',
    image: '/images/team/CEO.png',
    bio: 'Founder & CEO, PMP® certified Project Manager and Senior Software Engineer with 10+ years of diverse industry experience in enterprise software development and project management across Germany and Europe. Skilled in Python/Django, AWS, and Agile/Scrum delivery. Proven track record in improving efficiency, managing cross-functional teams, and driving client success in high-impact European projects.',
    skills: ['Founder & CEO', 'PMP® Project Management', 'Agile & Scrum Master', 'European Delivery Lead', 'Python & Django', 'AWS Cloud Infrastructure', 'RESTful APIs', 'Software Architecture', 'Jira & Enterprise Agile'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+49 172 9766016',
    linkedin: 'https://linkedin.com',
    experienceYears: 10,
    education: [
      'Ruhr-Universität Bochum, Germany — Master of Science (M.Sc.) in Computational Engineering (2010 - 2013)',
      'Rajshahi University of Engineering & Technology (RUET) — Bachelor of Science in Engineering (B.Sc. Engg.), Computer Science & Engineering (2001 - 2005)'
    ],
    certifications: [
      'PMP® - Project Management Professional (Project Management Institute, 2022)',
      'Agile with Jira: Project Management for Technical Managers (PMI)',
      'Practical Application of Gen AI for Project Managers (PMI)'
    ],
    experienceHistory: [
      {
        role: 'Founder & CEO / European Delivery Lead',
        company: 'WebDev Software Solutions',
        period: '2021 - Present',
        type: 'Full-time / Leadership',
        location: 'Küppersteg, Leverkusen, Germany',
        description: 'Directing European client engagements, technical project governance, German GDPR compliance, and agile software delivery.'
      },
      {
        role: 'Senior Software Engineer / Scrum Master',
        company: 'Brain Station 23',
        period: 'Aug 2023 - Present',
        type: 'Full-time / Hybrid',
        location: 'Leverkusen, North Rhine-Westphalia, Germany',
        description: 'Venture in healthcare sector eCommerce and consultation, delivering quick medicine dispatch, telemedicine workflows, and agile sprint leadership.'
      },
      {
        role: 'Senior Software Engineer',
        company: 'WebDev Software Solutions',
        period: 'Jun 2023 - Jul 2023',
        type: 'Hybrid',
        location: 'Leverkusen, North Rhine-Westphalia, Germany',
        description: 'Developed eCommerce for electronic parts for clients based in Germany and Austria utilizing Python, Django, and high-performance RESTful APIs.'
      },
      {
        role: 'IT Project Manager (German Markets)',
        company: 'WebDev Software Solutions',
        period: 'Jun 2022 - May 2023',
        type: 'Hybrid',
        location: 'Leverkusen, North Rhine-Westphalia, Germany',
        description: 'Initiated and managed eCommerce software initiatives in Germany & Switzerland with clients from Austria and Switzerland using Agile/Scrum methodologies.'
      },
      {
        role: 'Software Architect / Lead Full Stack / Scrum Master',
        company: 'DiGence GmbH',
        period: 'Aug 2018 - May 2022',
        type: 'Hybrid',
        location: 'Leverkusen, Germany',
        description: 'Led full-stack architecture, Python services, and cross-functional agile development squads.'
      },
      {
        role: 'Technical Lead and Project Manager',
        company: 'German Software Development Ltd',
        period: 'May 2016 - Jul 2018',
        type: 'Full-time',
        location: 'Germany',
        description: 'Oversaw enterprise technical governance, client deliverables, and agile software delivery.'
      }
    ],
    languages: ['Bengali (Native)', 'English (Full Professional)', 'German (Professional Working)'],
    highlightedProjects: ['DACH Enterprise E-Commerce & Logistics Portal', 'Bavaria FinTech Cloud Banking Microservices', 'European Telemedicine & Health SaaS']
  },
  {
    id: 'team-1',
    name: 'Al-Mumeetu Saikat',
    role: 'Full Stack Software Engineer | Business Development & E-Commerce Specialist',
    headline: 'Full Stack Software Engineer | Business Development & E-Commerce Specialist | React, Next.js, Node.js & Cloud Solutions',
    branch: 'Joypurhat, Bangladesh',
    location: 'Joypurhat (BD) HQ',
    image: '/images/team/Full-Stack.png',
    bio: 'Energetic Full Stack Software Engineer & Business Development Specialist with 4+ years of expertise in architecting scalable web applications, e-commerce platforms, and full-stack enterprise systems. Specialized in Next.js, React, Node.js, Express, TypeScript, MongoDB, and secure cloud server infrastructure. Passionate about engineering high-converting web solutions for global clients across USA, Germany, UK, and South Asia.',
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cloud DevOps', 'Nginx & Linux', 'PostgreSQL', 'System Architecture', 'REST & GraphQL APIs', 'Docker'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+880 1722-301927',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com/almumeetusaikat',
    experienceYears: 4,
    education: [
      'First Capital University of Bangladesh — Bachelor of Science in Computer Science and Engineering (CSE)',
      'Bagjana High School — Secondary School Certificate (SSC, Science)'
    ],
    certifications: [
      'Enterprise Full-Stack Architecture & Microservices',
      'Advanced Linux Bare-Metal Server & Cloud Security Administration'
    ],
    experienceHistory: [
      {
        role: 'Full Stack Software Engineer & Business Development Lead',
        company: 'Softzino Technologies',
        period: '2023 - Present',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        description: 'Engineering scalable enterprise web applications, high-performance RESTful APIs, and full-stack microservices using Next.js, React, TypeScript, Node.js, and modern cloud deployment pipelines.'
      },
      {
        role: 'Full Stack Lead & E-Commerce Specialist',
        company: 'WebDev Software Solutions',
        period: 'Nov 2021 - Present · 4+ yrs',
        type: 'Full-time',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Directing architectural strategy, client software engineering, high-converting eCommerce builds, and bare-metal server infrastructure for global clients across USA, Germany, and worldwide.'
      }
    ],
    languages: ['Bengali (Native)', 'English (Professional Working)'],
    highlightedProjects: ['All Strings Nylon High-End E-Commerce & Audio Engine', 'Gilmore Electric Industrial SaaS Platform', 'Start Campus Sines Mega Data Center Telemetry']
  },
  {
    id: 'team-3',
    name: 'MD. AL-MUHEETU',
    role: 'Mobile Application Engineer',
    headline: 'Mobile Application Engineer | Android (Kotlin) | iOS (Swift) | Flutter | Cross-Platform Architecture',
    branch: 'Joypurhat, Bangladesh',
    location: 'Joypurhat (BD) HQ',
    image: '/images/team/android-developer.png',
    bio: 'Dedicated Mobile Application Engineer with 4+ years of comprehensive software development experience, including 2.5 years dedicated to native and cross-platform mobile engineering across Android and iOS, plus 1.5 years of web development. High proficiency in Kotlin, Swift, Flutter, and React Native with clean MVVM architecture, Jetpack Compose, asynchronous coroutines, and robust RESTful API integration.',
    skills: ['Android (Kotlin)', 'iOS (Swift)', 'Flutter', 'React Native', 'Jetpack Compose', 'MVVM Architecture', 'REST APIs', 'Coroutines', 'Next.js', 'TypeScript', 'Git'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+880 1722-301927',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    experienceYears: 4,
    education: [
      'First Capital University of Bangladesh — Bachelor of Computer Science & Engineering (2020 - 2024)',
      'Bagjana High School — Secondary School Certificate (SSC, Science - 2017 - 2019)'
    ],
    certifications: [
      'Modern Android Application Architecture with Jetpack Compose & Kotlin',
      'High-Performance Mobile Cross-Platform Engineering with React Native'
    ],
    experienceHistory: [
      {
        role: 'Mobile Application Engineer (Android & iOS)',
        company: 'Gsitron Technologies',
        period: 'Nov 2024 - Present',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        description: 'Developed mobile applications using Kotlin, Swift, Flutter, Jetpack Compose, Coroutines, REST APIs, Networking Retrofit, and MVVM Architecture.'
      },
      {
        role: 'Mobile & Web Application Engineer',
        company: 'WebDev Software Solutions',
        period: 'Nov 2023 - Nov 2024',
        type: 'Full-time',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Engineered native Android components, cross-platform Flutter modules, and interactive responsive web applications for enterprise clients.'
      },
      {
        role: 'Web Developer & Mobile Specialist',
        company: 'WebDev Software Solutions',
        period: 'Aug 2023 - Oct 2023',
        type: 'Internship',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Built modern web applications and mobile prototypes with industry-standard development workflows.'
      },
      {
        role: 'Software Development Specialist',
        company: 'WebDev Software Solutions',
        period: 'Jan 2022 - Jul 2022',
        type: 'Part-time',
        location: 'Joypurhat, Bangladesh',
        description: 'Supported client software deployment and technical problem resolution.'
      }
    ],
    languages: ['Bengali (Native)', 'English (Professional Working)'],
    highlightedProjects: ['Cross-Platform Enterprise Android Suite', 'AgriTech IoT Cold Storage Mobile Telemetry', 'Real-Time Mobile Logistics Application']
  }
];

export const initialServices: ServiceDetail[] = [];

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Technology and Business Leaders are Architecting High-Availability Systems',
    slug: 'architecting-high-availability-systems',
    excerpt: 'Modern digital enterprises demand zero-downtime. Here is how our engineering teams architect and deploy resilient, high-availability cloud server meshes.',
    content: `In an era where every second of server downtime can cost thousands of euros or dollars, enterprise engineering teams must rethink infrastructure from the ground up. At WebDev Software Solutions, our distributed engineering squads collaborate closely with global clients to architect cloud infrastructure that maintains 99.99% availability under peak production loads.

### 1. The Redundancy Imperative
A single server instance is a single point of failure. Modern architectures leverage multi-region failover, container orchestration via Docker and Kubernetes, and automated health checking. Even if a central data center experiences unexpected network degradation, edge proxies automatically route traffic to the nearest healthy node.

### 2. Microservices vs. Modular Monoliths
While microservices offer tremendous scaling capabilities for large engineering teams, many medium-sized applications benefit from a clean, well-factored modular monolith built in Node.js and TypeScript. It eliminates unnecessary network overhead while maintaining strict domain boundaries.

### 3. Automated Server Hardening
Security cannot be an afterthought. Automated SSH key rotation, non-standard port listeners, strict firewall policies with UFW/iptables, and SSL/TLS auto-renewals ensure your business data remains impregnable against automated botnets and ransomware.`,
    author: 'Tanvir Hossain',
    authorRole: 'Founder & CTO',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'February 18, 2026',
    readTime: '6 min read',
    category: 'Server & Cloud',
    tags: ['Server Architecture', 'DevOps', 'Cloud', 'Nginx', 'High Availability'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    likes: 38
  },
  {
    id: 'blog-2',
    title: 'Getting Started with Digital Transformation: From Local SME to Global E-Commerce',
    slug: 'getting-started-digital-transformation',
    excerpt: 'Transitioning from brick-and-mortar or traditional operations to international headless commerce. What modern growing manufacturers and brands need to know.',
    content: `Digital transformation is no longer a corporate buzzword—it is the prerequisite for sustainable market leadership. Whether you are a regional manufacturer or an ambitious consumer goods producer, your digital architecture determines your market velocity.

### Moving Beyond Generic Templates
Standard off-the-shelf templates often crumble under complex localized logistics. International commerce requires:
- Multi-currency checkout (EUR, USD, BDT)
- Multi-lingual UI support
- Localized payment integrations (Klarna, SEPA, Stripe, bKash, Nagad)
- GDPR and regional data compliance

### The Headless Commerce Revolution
By decoupling the frontend (built in modern React) from the backend commerce engine (such as Shopify Storefront API or custom WooCommerce), companies achieve sub-second page loads, boosting conversion rates by up to 45%.`,
    author: 'Lukas Schneider',
    authorRole: 'Managing Partner Europe',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'February 10, 2026',
    readTime: '5 min read',
    category: 'E-Commerce',
    tags: ['E-Commerce', 'Shopify', 'Headless', 'Digital Transformation'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    likes: 24
  },
  {
    id: 'blog-3',
    title: 'Tackling Legacy App Modernisation: Upgrading to React 19 and Modern MERN',
    slug: 'tackling-legacy-app-modernisation',
    excerpt: 'Step-by-step strategies for refactoring bloated jQuery or monolithic legacy codebases into responsive, type-safe full-stack applications.',
    content: `Many established enterprises still run critical business workflows on legacy systems that are slow, unmaintainable, and vulnerable to security flaws. Refactoring to a modern MERN stack does not mean halting business operations.

### Incremental Migration (Strangler Fig Pattern)
Instead of a risky total rewrite, we recommend isolating individual user journeys (like the customer dashboard or checkout flow) and replacing them with modern React components served via reverse proxy. 

### Why React 19 & TypeScript?
The combination of React 19 server actions, unified hydration, and TypeScript compile-time safety eliminates entire classes of runtime errors. Development velocity surges while bug reports plummet.`,
    author: 'Sarah Rahman',
    authorRole: 'Lead MERN Architect',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: 'January 28, 2026',
    readTime: '7 min read',
    category: 'Full Stack',
    tags: ['React 19', 'MERN Stack', 'TypeScript', 'Code Modernization'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    likes: 42
  }
];

export const initialTestimonials: Testimonial[] = [];

export const clientLogos = [
  { 
    name: 'All Strings Nylon', 
    symbol: 'ASN', 
    image: '/images/brands/allstringsnylon.png',
    country: 'USA',
    location: 'North Carolina, United States',
    category: 'High-End Concert Classical Guitars',
    badge: '🇺🇸 USA Client'
  },
  { 
    name: 'Gilmore Electric', 
    symbol: 'GE', 
    image: '/images/brands/gilmoreelectric.png',
    country: 'USA',
    location: 'Florida, United States',
    category: 'Commercial Electrical & Industrial SaaS',
    badge: '🇺🇸 USA Client'
  },
  { 
    name: 'Start Campus', 
    symbol: 'SC', 
    image: '/images/brands/start-campus.png',
    country: 'Europe',
    location: 'Sines, Portugal (EU)',
    category: 'Sustainable Mega Data Center Telemetry',
    badge: '🇪🇺 EU Enterprise'
  },
  { 
    name: 'Bavaria FinTech AG', 
    symbol: 'BF', 
    image: '',
    country: 'Germany',
    location: 'Frankfurt, Germany',
    category: 'Cloud Banking & Microservices Platform',
    badge: '🇩🇪 German FinTech'
  },
  { 
    name: 'Marfione Guitar', 
    symbol: 'MG', 
    image: '/images/brands/marfione-guitar.webp',
    country: 'USA',
    location: 'United States',
    category: 'Boutique Custom Master Builder',
    badge: '🇺🇸 USA Client'
  },
  { 
    name: 'Agneya Singh', 
    symbol: 'AS', 
    image: '/images/brands/agneyasingh.png',
    country: 'International',
    location: 'United States & Global',
    category: 'Award-Winning Filmmaker & Studio Portfolio',
    badge: '🌐 Global Client'
  }
];

export const globalTrustPillars = [
  {
    id: 'pillar-1',
    title: 'Strict Bilateral NDA & 100% IP Transfer',
    description: 'Complete intellectual property rights, source code, and design assets are legally transferred to you. Every engagement begins with mutual non-disclosure agreements.',
    badge: 'Legal & IP Assurance',
    iconName: 'ShieldCheck'
  },
  {
    id: 'pillar-2',
    title: 'Real-Time Timezone Synchronization',
    description: 'Overlapping working hours with US Eastern & Pacific (EST/PST), UK GMT/BST, and Central Europe (CET). Dedicated Slack/Teams channels with daily async updates.',
    badge: 'Global Collaboration',
    iconName: 'Clock'
  },
  {
    id: 'pillar-3',
    title: 'GDPR & Bank-Grade Security Standards',
    description: 'European GDPR compliance, BaFin security audit standards, OWASP top 10 adherence, end-to-end TLS encryption, and secure Hetzner/AWS server hardening.',
    badge: 'Security & Compliance',
    iconName: 'Lock'
  },
  {
    id: 'pillar-4',
    title: 'Milestone Escrow & Predictable Sprints',
    description: 'Transparent 2-week agile sprints with staged milestone payments. Pay upon verified review and delivery with zero surprise costs or vendor lock-in.',
    badge: 'Financial Peace of Mind',
    iconName: 'Zap'
  }
];

export const internationalStats = [
  { value: '500+', label: 'Projects Successfully Delivered', sublabel: 'Across 15+ countries' },
  { value: '98%', label: 'International Client Retention', sublabel: 'Repeat long-term partners' },
  { value: '14+ Hrs', label: 'Overlapping Daily Support', sublabel: 'US, UK & Europe timezones' },
  { value: '100%', label: 'Intellectual Property Ownership', sublabel: 'Transferred on delivery' }
];

export const companyOffices = [
  {
    title: 'Germany Operating Branch',
    city: 'Küppersteg, Leverkusen, Germany',
    address: 'Küppersteg, 51373 Leverkusen, NRW, Germany',
    phone: '+49 172 9766016',
    email: 'info@webdevsoftwaresolutions.com',
    hours: 'Mon - Sat: 9:00 AM - 8:00 PM (CET)',
    isHQ: false
  },
  {
    title: 'Bangladesh Headquarters',
    city: 'Joypurhat, Bangladesh',
    address: 'Housing Estate, Word No: 07, Joypurhat-5900, Joypurhat, Bangladesh',
    phone: '+880 1722-301927',
    email: 'info@webdevsoftwaresolutions.com',
    hours: 'Mon - Sat: 9:00 AM - 8:00 PM (BST)',
    isHQ: true
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    firstName: 'Maximilian',
    lastName: 'Vogel',
    email: 'm.vogel@vogel-logistik.de',
    phoneNumber: '+49 171 498231',
    company: 'Vogel Logistik GmbH',
    projectType: 'Full Stack & MERN',
    budget: '$6,000 - $15,000',
    targetMarket: 'Germany',
    message: 'We require a customized real-time order tracking and dispatch portal connected with our internal SAP warehouse and German customer portal.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    status: 'new'
  },
  {
    id: 'inq-2',
    firstName: 'Arif',
    lastName: 'Hasan',
    email: 'arif@banglaspin.com',
    phoneNumber: '+880 1819-334455',
    company: 'Bengal Spinning Mills',
    projectType: 'E-Commerce',
    budget: '$3,000 - $6,000',
    targetMarket: 'Both',
    message: 'Looking to launch a B2B wholesale portal to export RMG garments to European buyers. Need multi-currency checkout and automated invoice generator.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    status: 'contacted'
  }
];

export const initialTeamMembers = initialTeam;
export const initialBlogPosts = initialBlogs;
export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'ENGINEERING DIGITAL EXPERIENCES',
    title: 'Web & Mobile Engineering',
    highlightText: 'Built to Scale.',
    subtitle: 'Reliable, high-performance web and mobile products engineered for business growth.',
    primaryBtnText: 'Start Your Project',
    primaryBtnAction: 'quote',
    secondaryBtnText: 'Explore Services',
    secondaryBtnAction: 'services',
    backgroundImage: '/images/background/webdev-bg.webp',
    tag: '01 / Software Engineering'
  },
  {
    id: 'slide-2',
    badge: 'MODERN WEB ENGINEERING',
    title: 'Modern Web Apps',
    highlightText: 'Fast & Scalable.',
    subtitle: 'Fast, secure, and responsive web platforms built for performance.',
    primaryBtnText: 'Build Your Website',
    primaryBtnAction: 'quote',
    secondaryBtnText: 'View Web Services',
    secondaryBtnAction: 'services',
    backgroundImage: '/images/background/hero-img-1.webp',
    tag: '02 / Web Development'
  },
  {
    id: 'slide-3',
    badge: 'NEXT-GENERATION MOBILE SOLUTIONS',
    title: 'Native Mobile Apps',
    highlightText: 'iOS & Android.',
    subtitle: 'High-performance apps built with modern cross-platform technologies.',
    primaryBtnText: 'Discuss Your App',
    primaryBtnAction: 'quote',
    secondaryBtnText: 'Explore Mobile Solutions',
    secondaryBtnAction: 'services',
    backgroundImage: '/images/background/webdev-bg (1).webp',
    tag: '03 / Mobile App Development'
  }
];

export const initialSiteSettings: SiteSettings = {
  companyName: 'WebDev Software Solutions',
  tagline: 'Enterprise Software Engineering & Modern Cloud Architecture',
  logoUrl: '/images/logo/webdev-logo.png',
  darkLogoUrl: '/images/logo/dark-logo-webdevss.png',
  heroSlides: initialHeroSlides,
  email: 'info@webdevsoftwaresolutions.com',
  phone_bd: '+880 1722-301927',
  phone_de: '+49 172 9766016',
  address_bd: 'Housing Estate, Ward No: 07, Joypurhat-5900, Bangladesh',
  address_de: 'Küppersteg, 51373 Leverkusen, NRW, Germany',
  socialLinks: {
    github: 'https://github.com/almumeetusaikat',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    whatsapp_bd: 'https://wa.me/8801722301927',
    whatsapp_de: 'https://wa.me/491729766016'
  },
  privacyPolicy: `# Privacy Policy

**WebDev Software Solutions** ("we", "our", or "us") is committed to protecting your personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable Bangladeshi data protection laws.

## 1. Data We Collect
We collect information you provide directly to us, including name, email address, phone number, company name, and project requirements when you submit an inquiry or contact form. We also collect standard server logs (IP address, browser type, pages visited) to operate and improve our services.

## 2. How We Use Your Data
- To respond to your inquiry and provide requested services
- To send project updates and contractual communications
- To comply with legal and regulatory obligations (including German BaFin and GDPR requirements)
- We do **not** sell or rent your personal data to third parties

## 3. Legal Basis (GDPR)
Processing is based on your consent (Art. 6(1)(a) GDPR), contract performance (Art. 6(1)(b) GDPR), and our legitimate interests in operating our business (Art. 6(1)(f) GDPR).

## 4. Data Retention
We retain inquiry data for up to 36 months or as required by applicable law. You may request deletion at any time.

## 5. Your Rights
Under GDPR, you have the right to access, rectify, erase, restrict, or port your data. To exercise any right, email us at **info@webdevsoftwaresolutions.com**.

## 6. Cookies
Our website uses essential session cookies only. No tracking or advertising cookies are used.

## 7. Contact & Data Controller
**WebDev Software Solutions** · Küppersteg, 51373 Leverkusen, Germany · info@webdevsoftwaresolutions.com

*Last updated: January 2026*`,

  termsOfService: `# Terms of Service

These Terms of Service ("Terms") govern your use of the WebDev Software Solutions website and engagement of our services. By submitting an inquiry or entering a service agreement, you agree to these Terms.

## 1. Services
WebDev Software Solutions provides custom software engineering, cloud architecture, e-commerce development, and related IT consulting services. All engagements are governed by a separate written contract or Statement of Work (SOW).

## 2. Intellectual Property
Upon full payment, all custom code, designs, and digital assets created specifically for you are transferred to you in full. We retain the right to display completed work in our portfolio unless a bilateral NDA prohibits disclosure.

## 3. Confidentiality
We offer mutual Non-Disclosure Agreements (NDAs) on all client engagements. Confidential information shared during discovery and development will not be disclosed to third parties.

## 4. Payment Terms
Milestone-based billing applies unless otherwise agreed. Payments are due within 14 days of milestone invoice. Late payments accrue 2% monthly interest under applicable German commercial law.

## 5. Limitation of Liability
Our liability is limited to the total fees paid for the specific service in question. We are not liable for indirect, consequential, or incidental damages.

## 6. Governing Law
These Terms are governed by the laws of Germany (NRW jurisdiction, Leverkusen) for European clients and the laws of Bangladesh for South Asian clients, as specified in the applicable SOW.

## 7. Amendments
We reserve the right to update these Terms. Continued use of our services constitutes acceptance of the updated Terms.

## 8. Contact
**WebDev Software Solutions** · Küppersteg, 51373 Leverkusen, Germany · info@webdevsoftwaresolutions.com

*Last updated: January 2026*`,

  footerAboutText: 'Premier software engineering consultancy delivering resilient web platforms, scalable cloud architectures, and modern digital applications for enterprises worldwide.',
  gdprBadgeText: 'Transparent project governance, strict bilateral NDAs, and agile sprint delivery with real-time communication.'
};

export const initialTestimonialsData: Testimonial[] = [];

export const initialJobPostings: JobPosting[] = [];

export const initialJobApplications: JobApplication[] = [];

