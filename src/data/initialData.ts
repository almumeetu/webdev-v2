import { Project, TeamMember, BlogPost, Inquiry, ServiceDetail } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'FinTech Cloud Banking Portal',
    category: 'Full Stack & MERN',
    status: 'completed',
    description: 'Enterprise full-stack banking portal built for a financial services client in Frankfurt & Leverkusen, Germany. Featuring high-throughput microservices, sub-second latency, multi-currency ledger, and real-time fraud monitoring.',
    clientName: 'Bavaria FinTech AG',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'February 2026',
    techStack: ['React 19', 'Node.js', 'Express', 'MongoDB Atlas', 'Redis', 'Docker', 'AWS'],
    liveUrl: 'https://demo-fintech.webdevsoftware.com',
    features: ['Multi-currency IBAN handling', 'Two-Factor biometric authentication', 'Automated German BaFin compliance audit logs', 'Sub-millisecond Redis caching'],
    metrics: 'Processed €14M+ transactions with 99.99% uptime'
  },
  {
    id: 'proj-2',
    title: 'High-End Classical Guitar Commerce',
    category: 'E-Commerce',
    status: 'completed',
    description: 'Custom high-converting eCommerce experience and specialized concert luthier instrument inventory portal for premier classical guitars in North Carolina, USA.',
    clientName: 'All Strings Nylon',
    clientCountry: 'USA',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'January 2026',
    techStack: ['Next.js 15', 'Shopify Plus API', 'Tailwind CSS', 'Stripe US', 'Algolia Search'],
    liveUrl: 'https://allstringsnylon.com',
    features: ['Acoustic sound sample waveform player', 'High-res 360 zoom gallery', 'Instant US domestic & international checkout', 'Real-time multi-warehouse inventory'],
    metrics: '+38% increase in average US order value (AOV)'
  },
  {
    id: 'proj-3',
    title: 'Commercial Contracting & Grid SaaS',
    category: 'Web Application',
    status: 'completed',
    description: 'Enterprise operations, dispatching, and field engineering portal engineered for a major commercial & industrial electrical engineering contractor in Florida, USA.',
    clientName: 'Gilmore Electric Co.',
    clientCountry: 'USA',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'December 2025',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Lambda', 'Tailwind CSS'],
    liveUrl: 'https://gilmore-demo.webdevsoftware.com',
    features: ['Real-time electrical crew dispatching', 'Automated OSHA safety compliance logs', 'Blueprint PDF viewer & annotation tool', 'Multi-tenant client billing engine'],
    metrics: 'Managed 350+ commercial engineering contracts'
  },
  {
    id: 'proj-4',
    title: 'Sustainable Mega Data Center Cloud',
    category: 'Backend & Cloud',
    status: 'completed',
    description: 'Telemetric IoT energy monitoring and multi-gigawatt cooling grid software developed for Europe\'s largest 100% green data center campus in Sines, Portugal.',
    clientName: 'Start Campus',
    clientCountry: 'Europe',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'November 2025',
    techStack: ['Node.js', 'TimescaleDB', 'Docker / K8s', 'Nginx', 'Prometheus', 'Grafana'],
    liveUrl: 'https://startcampus-demo.webdevsoftware.com',
    features: ['Live PUE (Power Usage Effectiveness) analytics', 'Automated anomaly detection alerts', 'European EU ETS carbon emission tracker', 'Strict TLS 1.3 encrypted telemetry'],
    metrics: 'Real-time telemetry across 495MW campus capacity'
  },
  {
    id: 'proj-5',
    title: 'Nordic Clean Living Headless Shopify',
    category: 'E-Commerce',
    status: 'completed',
    description: 'High-converting headless Shopify storefront for a premier sustainable home goods brand shipping across Germany, Austria, and Switzerland (DACH region). Built for blazing 98+ PageSpeed scores.',
    clientName: 'ÖkoWohnen GmbH',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'October 2025',
    techStack: ['Shopify Storefront API', 'Next.js / React', 'Tailwind CSS', 'Klarna / SEPA', 'Klaviyo'],
    liveUrl: 'https://oekowohnen-demo.webdevsoftware.com',
    features: ['Instant headless checkout with Klarna & SEPA', 'German GDPR / Cookie consent engine', 'Bespoke 3D product visualizer', 'Automated DHL Express label printing'],
    metrics: '+43% mobile conversion rate boost'
  },
  {
    id: 'proj-6',
    title: 'Dhaka-Joypurhat Logistics SaaS',
    category: 'Web Application',
    status: 'completed',
    description: 'Comprehensive nationwide supply chain & fleet tracking platform for a major freight operator in Bangladesh. Connects dispatchers, warehouse hubs in Joypurhat, Bogura, and Dhaka with live GPS telemetry.',
    clientName: 'Bengal Cargo & Logistics',
    clientCountry: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'January 2026',
    techStack: ['MERN Stack', 'Socket.io', 'Tailwind CSS', 'PostgreSQL', 'Leaflet / GIS', 'Nginx'],
    liveUrl: 'https://cargo-tracker.webdevsoftware.com',
    features: ['Real-time truck dispatch tracking', 'Automated challan & invoice generation in BDT', 'Offline-first PWA for field drivers', 'SMS notification gateway integration'],
    metrics: 'Over 4,500 daily active shipments managed'
  },
  {
    id: 'proj-7',
    title: 'Global Multi-Vendor Retail Engine',
    category: 'WordPress & Shopify',
    status: 'ongoing',
    description: 'Custom enterprise multi-vendor digital commerce architecture with real-time multi-currency conversion (USD, GBP, EUR) for a premier UK high-growth retail brand.',
    clientName: 'Apex Retail Solutions Ltd',
    clientCountry: 'UK',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'Estimated April 2026',
    techStack: ['WooCommerce Enterprise', 'Redis Cache', 'Stripe UK', 'Elasticsearch', 'Cloudflare Enterprise'],
    liveUrl: 'https://apex-demo.webdevsoftware.com',
    features: ['Sub-second faceted product search', 'Automated UK VAT calculation', 'Warehouse sync across London & Manchester', 'Mobile PWA shopping experience'],
    metrics: 'Sprint 3 in progress • 0.38s average server response'
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Al-Mumeetu Saikat',
    role: 'Founder & Principal Full-Stack Lead',
    headline: 'Senior Software Engineer | MERN & Next.js Specialist | Cloud & DevOps Enthusiast | Founder & Lead Developer at WebDev Software Solutions',
    branch: 'Joypurhat, Bangladesh',
    location: 'Joypurhat, Rajshahi, Bangladesh',
    image: '/images/team/Full-Stack.png',
    bio: 'Energetic Senior Software Engineer & Team Lead with 4+ years of expertise in architecting scalable web applications, cloud solutions, and full-stack enterprise systems. Specialized in Next.js, React, Node.js, Express, TypeScript, MongoDB, and secure cloud server infrastructure. Passionate about engineering high-converting web solutions for global clients across USA, Germany, UK, and South Asia.',
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cloud DevOps', 'Nginx & Linux', 'PostgreSQL', 'System Architecture', 'REST & GraphQL APIs', 'Docker'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+880 1712-009617',
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
        role: 'Software Engineer',
        company: 'Softzino Technologies',
        period: '2023 - Present',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        description: 'Engineering scalable enterprise web applications, high-performance RESTful APIs, and full-stack microservices using Next.js, React, TypeScript, Node.js, and modern cloud deployment pipelines.'
      },
      {
        role: 'Founder & Lead Developer',
        company: 'WebDev Software Solutions',
        period: 'Nov 2021 - Present · 3+ yrs',
        type: 'Full-time',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Directing architectural strategy, client software engineering, high-converting eCommerce builds, and bare-metal server infrastructure for global clients across USA, Germany, and worldwide.'
      }
    ],
    languages: ['Bengali (Native)', 'English (Professional Working)'],
    highlightedProjects: ['All Strings Nylon High-End E-Commerce & Audio Engine', 'Gilmore Electric Industrial SaaS Platform', 'Start Campus Sines Mega Data Center Telemetry']
  },
  {
    id: 'team-2',
    name: 'Md Moyen Uddin, PMP®',
    role: 'Senior Software Engineer & Scrum Master | European Delivery Lead',
    headline: 'Senior Software Engineer and Scrum Master at Brain Station 23 | PMP® Certified Project Manager',
    branch: 'Leverkusen, Germany',
    location: 'Leverkusen, North Rhine-Westphalia, Germany',
    image: '/images/team/CEO.png',
    bio: 'PMP® certified Project Manager and Senior Software Engineer with 10+ years of diverse industry experience in enterprise software development and project management across Germany and Europe. Skilled in Python/Django, AWS, and Agile/Scrum delivery. Proven track record in improving efficiency, managing cross-functional teams, and driving client success in high-impact projects.',
    skills: ['PMP® Project Management', 'Agile & Scrum Master', 'Python & Django', 'AWS Cloud Infrastructure', 'RESTful APIs', 'Software Architecture', 'Cross-Border European Delivery', 'Jira & Enterprise Agile'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+880 1712-009617',
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
    id: 'team-3',
    name: 'MD. AL-MUHEETU',
    role: 'Mobile & Web Application Engineer',
    headline: 'Mobile & Web Developer | Kotlin | React Native | Next.js | TypeScript | Android',
    branch: 'Joypurhat, Bangladesh',
    location: 'Joypurhat, Rajshahi, Bangladesh',
    image: '/images/team/android-developer.png',
    bio: 'Energetic Software Engineer with over 3 years of hands-on experience in the Tech industry. Specialised in Mobile application and Front-End/Web development, building high-performance scalable apps using Kotlin, TypeScript, React Native & Next.js. Proven expertise in transforming complex ideas into user-friendly cross-platform applications with MVVM architecture.',
    skills: ['Kotlin', 'React Native', 'Jetpack Compose', 'Next.js', 'TypeScript', 'Android SDK', 'MVVM Architecture', 'Retrofit & Coroutines', 'REST APIs', 'XML Layouts', 'Git'],
    email: 'info@webdevsoftwaresolutions.com',
    phone: '+880 1712-009617',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    experienceYears: 3,
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
        role: 'Associate Software Engineer',
        company: 'Gsitron Technologies',
        period: 'Nov 2024 - Present',
        type: 'Full-time',
        location: 'Dhaka, Bangladesh',
        description: 'Developed mobile applications using Kotlin, Jetpack Compose, XML, Coroutines, REST APIs, Networking Retrofit, and MVVM Architecture.'
      },
      {
        role: 'Web Designer',
        company: 'WebDev Software Solutions',
        period: 'Nov 2023 - Nov 2024',
        type: 'Part-time',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Crafted modern, scalable, client-tailored web interfaces and digital solutions for enterprise and global clients.'
      },
      {
        role: 'Web Developer Intern',
        company: 'WebDev Software Solutions',
        period: 'Aug 2023 - Oct 2023',
        type: 'Internship',
        location: 'Joypurhat, Rajshahi, Bangladesh',
        description: 'Built modern web applications and learned industry-standard development workflows and modern frameworks.'
      },
      {
        role: 'Technical Specialist',
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

export const initialServices: ServiceDetail[] = [
  {
    id: 'serv-1',
    title: 'Full Stack & MERN Development',
    shortDesc: 'Custom, reactive web applications engineered with MongoDB, Express, React 19, and Node.js for extreme speed and scalability.',
    fullDesc: 'We develop bespoke web software and scalable SaaS platforms using the modern MERN stack. From enterprise dashboards to real-time collaboration tools, our codebases are modular, fully type-safe in TypeScript, and optimized for low latency.',
    iconName: 'Code2',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    techs: ['React 19', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    features: ['Single Page & Progressive Web Apps', 'Real-time WebSocket event architecture', 'REST & GraphQL API design', 'Role-based access control (RBAC)'],
    deliverables: ['Production-ready web application', 'Complete source code & documentation', 'Automated unit/integration tests', 'Deployment pipeline setup']
  },
  {
    id: 'serv-2',
    title: 'Cloud & Server Architecture',
    shortDesc: 'Reliable Linux servers, Nginx reverse proxies, cloud migrations, and 24/7 automated monitoring with 99.99% uptime guarantees.',
    fullDesc: 'Whether hosting on Hetzner Germany, AWS, DigitalOcean, or private bare-metal servers, our engineering team sets up hardened environments, automated backups, zero-downtime CI/CD workflows, and DDoS defenses.',
    iconName: 'Server',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    techs: ['Linux (Ubuntu/Debian)', 'Nginx', 'Docker', 'Kubernetes', 'AWS / Hetzner', 'SSL/TLS', 'Redis'],
    features: ['Zero-downtime containerized deployments', 'Hardened Linux firewall & security audits', 'Database clustering & replication', '24/7 uptime monitoring & alerting'],
    deliverables: ['Configured production server', 'Automated backup scripts', 'Security hardening report', 'Server monitoring dashboard']
  },
  {
    id: 'serv-3',
    title: 'E-Commerce Specialist (Shopify & Woo)',
    shortDesc: 'High-converting custom Shopify storefronts, headless ecommerce architectures, and hyper-optimized WooCommerce stores.',
    fullDesc: 'We turn browsers into buyers. Our e-commerce engineering covers custom theme architecture, headless Shopify with React/Next.js, complex multi-currency checkout, and seamless inventory management across Europe and South Asia.',
    iconName: 'ShoppingCart',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    techs: ['Shopify Plus', 'Liquid', 'WooCommerce', 'Headless Storefronts', 'Stripe', 'Klarna', 'bKash / Nagad'],
    features: ['Sub-second page load times', 'Custom product customizers & filters', 'Multi-currency & localized tax/VAT handling', 'Payment gateway integrations'],
    deliverables: ['Turnkey high-converting store', 'Payment & shipping integrations', 'Mobile checkout optimization', 'Staff training walkthrough']
  },
  {
    id: 'serv-4',
    title: 'WordPress & Custom CMS Solutions',
    shortDesc: 'Fast, secure, custom-coded WordPress themes and plugins built without bloated page builders for peak speed and security.',
    fullDesc: 'Say goodbye to slow, bloated templates. We build bespoke, lightweight WordPress systems engineered around custom post types, Gutenberg blocks, and strict PHP standards that score 95+ on Google PageSpeed Insights.',
    iconName: 'Globe',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    techs: ['WordPress Core', 'PHP 8.3', 'Custom Gutenberg Blocks', 'Advanced Custom Fields Pro', 'MySQL', 'Redis Cache'],
    features: ['No heavy bloated plugins', 'Enterprise level security hardening', 'Full SEO metadata structure', 'Easy non-technical client editing'],
    deliverables: ['Custom lightweight theme', 'Clean backend editing experience', 'Full speed optimization (95+ score)', 'Security certificate & firewall']
  },
  {
    id: 'serv-5',
    title: 'Backend & API Engineering',
    shortDesc: 'Robust microservices, high-volume database queries, authentication systems, and seamless third-party API integrations.',
    fullDesc: 'We build the mission-critical engines that power modern software. From payment webhooks and banking integrations to high-throughput data processing pipelines, we ensure your backend operates flawlessly under heavy traffic.',
    iconName: 'Cpu',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    techs: ['Node.js', 'Express', 'Python / Fastify', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'],
    features: ['RESTful & gRPC interfaces', 'Automated data backups and transactions', 'JWT & OAuth authentication', 'API documentation with Swagger'],
    deliverables: ['Fully documented API suite', 'Postman collections & testing', 'Database schema migrations', 'Scalability architecture roadmap']
  },
  {
    id: 'serv-6',
    title: 'Cybersecurity, Maintenance & SLA',
    shortDesc: 'Ongoing support, continuous vulnerability scanning, database tuning, and guaranteed SLA response times.',
    fullDesc: 'Software is a living asset. We provide continuous maintenance, security patching, dependency upgrades, and rapid-response bug fixing so business operations in Germany, Bangladesh, and worldwide never stop.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    techs: ['SSL/TLS', 'Fail2ban', 'WAF Cloudflare', 'Automated Pentesting', 'GitLab / GitHub Actions'],
    features: ['Guaranteed 1-hour critical response SLA', 'Weekly automated security snapshots', 'Dependency vulnerability patching', 'Performance health monitoring'],
    deliverables: ['Monthly maintenance audit reports', 'Dedicated support hotline', 'Emergency on-call coverage', 'Continuous performance tuning']
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Technology and Business Leaders are Architecting High-Availability Systems',
    slug: 'architecting-high-availability-systems',
    excerpt: 'Modern digital enterprises demand zero-downtime. Here is how our cross-border engineering teams deploy resilient cloud server meshes between Germany and South Asia.',
    content: `In an era where every second of server downtime can cost thousands of euros or dollars, enterprise engineering teams must rethink infrastructure from the ground up. At WebDev Software Solutions, operating between our development center in Joypurhat, Bangladesh, and our European client hub in Leverkusen, Germany, we observe firsthand how international businesses maintain 99.99% availability.

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
    excerpt: 'Transitioning from brick-and-mortar or traditional operations to international headless commerce. What German and Bangladeshi manufacturers need to know.',
    content: `Digital transformation is no longer a corporate buzzword—it is the prerequisite for sustainable market leadership. Whether you are a manufacturing company in North Rhine-Westphalia, Germany, or an ambitious textile and consumer goods producer in Bangladesh, your digital footprint determines your reach.

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

export const initialTestimonials = [
  {
    id: 'test-1',
    name: 'David H. Miller',
    role: 'Chief Operating Officer',
    company: 'All Strings Nylon, Apex, North Carolina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    country: 'USA',
    flag: '🇺🇸',
    quote: '"WebDev Software Solutions overhauled our entire eCommerce infrastructure. Communicating with Saikat and the team during our US Eastern business hours was seamless. Their attention to detail, sub-second search speeds, and custom audio player helped increase our US conversion rate by 38%. We trust them completely with our core digital assets."',
    rating: 5,
    verified: true
  },
  {
    id: 'test-2',
    name: 'Henrik Von Klaus',
    role: 'Managing Director',
    company: 'Rheinland Tech Logistik GmbH, Leverkusen / Frankfurt',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    country: 'Germany',
    flag: '🇩🇪',
    quote: '"Very well thought out and articulate communication. Clear sprint milestones, zero shortcuts, and uncompromising precision. Even when requirements shifted, they responded with ingenious architectural solutions. WebDev delivers authentic German-grade engineering with incredible cost-efficiency. A premier software partner."',
    rating: 5,
    verified: true
  },
  {
    id: 'test-3',
    name: 'Oliver Kensington',
    role: 'Head of Engineering',
    company: 'Apex Retail Solutions Ltd, London',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    country: 'UK',
    flag: '🇬🇧',
    quote: '"Working with WebDev felt like having an elite senior engineering squad right inside our London office. Their clean TypeScript code, Dockerized microservices, and adherence to strict bilateral NDAs gave our board total peace of mind. Delivered our platform two weeks ahead of schedule."',
    rating: 5,
    verified: true
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    role: 'Head of Product',
    company: 'Nordic Commerce Group, Munich & Berlin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    country: 'Germany',
    flag: '🇩🇪',
    quote: '"The headless Shopify build they produced for our brand surpassed every performance target. Our mobile conversion rate jumped by 43% in the first month alone. The collaboration between their German branch and Bangladeshi engineering core is world-class."',
    rating: 5,
    verified: true
  },
  {
    id: 'test-5',
    name: 'Kawsar Mahmud',
    role: 'Chief Operating Officer',
    company: 'Prime Agro Industries Ltd, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    country: 'Bangladesh',
    flag: '🇧🇩',
    quote: '"Working with WebDev Software Solutions transformed our supply chain logistics across Joypurhat, Rajshahi, and Dhaka. Their MERN stack system handles our tracking effortlessly and their 24/7 server support gives us complete peace of mind. Highly recommended for any serious business."',
    rating: 5,
    verified: true
  }
];

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
    title: 'Bangladesh Headquarters',
    city: 'Joypurhat, Bangladesh',
    address: 'Housing Estate, Word No: 07, Joypurhat-5900, Joypurhat, Bangladesh',
    phone: '+880 1712-009617',
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
    company: 'Vogel Logistik GmbH (Leverkusen)',
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
    company: 'Bengal Spinning Mills (Joypurhat / Bogura)',
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
