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
    id: 'proj-3',
    title: 'Nordic Clean Living Headless Shopify',
    category: 'E-Commerce',
    status: 'completed',
    description: 'High-converting headless Shopify storefront for a premier sustainable home goods brand shipping across Germany, Austria, and Switzerland (DACH region). Built for blazing 98+ PageSpeed scores.',
    clientName: 'ÖkoWohnen GmbH (Cologne / Leverkusen)',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'December 2025',
    techStack: ['Shopify Storefront API', 'Next.js / React', 'Tailwind CSS', 'Stripe EU', 'Klaviyo'],
    liveUrl: 'https://oekowohnen-demo.webdevsoftware.com',
    features: ['Instant headless checkout with Klarna & SEPA', 'German GDPR / Cookie consent engine', 'Bespoke 3D product visualizer', 'Automated DHL Express label printing'],
    metrics: '+43% mobile conversion rate boost'
  },
  {
    id: 'proj-4',
    title: 'Global High-Traffic WooCommerce Cluster',
    category: 'WordPress & Shopify',
    status: 'completed',
    description: 'Custom WooCommerce enterprise infrastructure designed for a high-volume apparel dropshipper handling 20,000+ orders per week. Rebuilt with custom PHP caching, Redis Object Cache, and Elasticsearch.',
    clientName: 'VelvetStyle Apparel',
    clientCountry: 'International',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'November 2025',
    techStack: ['WordPress Enterprise', 'WooCommerce', 'Elasticsearch', 'Redis', 'Varnish', 'Cloudflare Enterprise'],
    liveUrl: 'https://velvetstyle.webdevsoftware.com',
    features: ['Instant faceted filtering on 80k SKUs', 'Custom multi-warehouse stock sync', 'Automated order dispatch API', '0.4s average server response time'],
    metrics: 'Scaled effortlessly during Black Friday peak'
  },
  {
    id: 'proj-5',
    title: 'Automated Linux Bare-Metal Server Mesh',
    category: 'Backend & Cloud',
    status: 'ongoing',
    description: 'High-availability Kubernetes & Nginx reverse-proxy deployment across German Hetzner data centers and Singapore edge nodes for global enterprise clients needing ultra-low latency and sovereign data privacy.',
    clientName: 'EuroCloud Solutions',
    clientCountry: 'Germany',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'Estimated April 2026',
    techStack: ['Linux Ubuntu/Debian', 'Docker', 'Kubernetes', 'Nginx', 'Prometheus', 'Grafana', 'WireGuard'],
    liveUrl: 'https://mesh-status.webdevsoftware.com',
    features: ['Zero-downtime rolling deployments', 'Automated SSL/TLS rotation with Let\'s Encrypt', 'DDoS mitigation layer', 'Multi-region failover replication'],
    metrics: 'Phase 2 in progress: 99.999% SLA benchmark'
  },
  {
    id: 'proj-6',
    title: 'AgriTech Cold Storage IoT Monitor',
    category: 'Full Stack & MERN',
    status: 'ongoing',
    description: 'Real-time temperature and humidity tracking system for cold storage potato warehouses in Joypurhat & northern agricultural districts of Bangladesh. Features automated alert triggers and predictive spoilage AI.',
    clientName: 'North Bengal Agro Consortium',
    clientCountry: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
    completionDate: 'Estimated May 2026',
    techStack: ['MERN Stack', 'Node.js MQTT', 'TimescaleDB', 'Tailwind CSS', 'Recharts', 'ESP32 IoT'],
    liveUrl: 'https://agri-iot.webdevsoftware.com',
    features: ['Live telemetry gauges', 'Automated WhatsApp & SMS emergency alarm', 'Historical harvest preservation charts', 'Dual language UI: Bengali & English'],
    metrics: 'Active field deployment across 12 cold stores'
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Tanvir Hossain',
    role: 'Founder & Chief Technology Officer',
    branch: 'Joypurhat, Bangladesh',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Visionary full-stack architect with 11+ years guiding engineering teams across Bangladesh and Europe. Specialist in distributed Node.js backends, high-concurrency database design, and enterprise MERN applications.',
    skills: ['Full-Stack MERN', 'System Architecture', 'Node.js & Express', 'MongoDB / SQL', 'Cloud Infrastructure'],
    email: 'tanvir@webdevsoftware.com',
    phone: '+880 1700-928374',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    experienceYears: 11,
    highlightedProjects: ['FinTech Cloud Banking Portal', 'Dhaka-Joypurhat Logistics SaaS']
  },
  {
    id: 'team-2',
    name: 'Lukas Schneider',
    role: 'Managing Partner - European Operations',
    branch: 'Leverkusen, Germany',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'German tech strategist and client partner based in Leverkusen (NRW). Bridges European enterprises with our high-calibre offshore development center, ensuring German DIN/GDPR quality standards and precision engineering.',
    skills: ['Enterprise Client Delivery', 'DevOps & Security', 'GDPR Compliance', 'Cloud Strategy', 'Product Management'],
    email: 'lukas.schneider@webdevsoftware.com',
    phone: '+49 214 839201',
    linkedin: 'https://linkedin.com',
    experienceYears: 13,
    highlightedProjects: ['Nordic Clean Living Headless Shopify', 'Automated Linux Bare-Metal Server Mesh']
  },
  {
    id: 'team-3',
    name: 'Sarah Rahman',
    role: 'Lead Full-Stack & MERN Engineer',
    branch: 'Joypurhat, Bangladesh',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Passionate JavaScript & TypeScript specialist with deep expertise in React 19, state management, RESTful microservices, and reactive real-time applications using WebSockets.',
    skills: ['React 19', 'Next.js', 'Node.js', 'Redux / Zustand', 'Tailwind CSS', 'REST & GraphQL'],
    email: 'sarah.r@webdevsoftware.com',
    github: 'https://github.com',
    experienceYears: 7,
    highlightedProjects: ['Dhaka-Joypurhat Logistics SaaS', 'AgriTech Cold Storage IoT Monitor']
  },
  {
    id: 'team-4',
    name: 'Markus Weber',
    role: 'Principal Cloud & Linux Server Architect',
    branch: 'Leverkusen, Germany',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Server infrastructure guru focusing on hardened Linux setups, Nginx clustering, CI/CD automation, Dockerization, and 24/7 high availability server maintenance.',
    skills: ['Linux Kernel Tuning', 'Nginx & Apache', 'Kubernetes & Docker', 'CI/CD Pipelines', 'DDoS Protection'],
    email: 'm.weber@webdevsoftware.com',
    experienceYears: 10,
    highlightedProjects: ['Automated Linux Bare-Metal Server Mesh', 'FinTech Cloud Banking Portal']
  },
  {
    id: 'team-5',
    name: 'Alina Kabir',
    role: 'Lead E-Commerce & CMS Specialist',
    branch: 'Joypurhat, Bangladesh',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: 'Certified Shopify Plus and WooCommerce developer. Has delivered over 65 custom storefronts with custom liquid extensions, headless cart workflows, and payment integrations.',
    skills: ['Shopify Plus / Liquid', 'WooCommerce', 'WordPress Core', 'PHP / MySQL', 'Payment Gateways'],
    email: 'alina.k@webdevsoftware.com',
    experienceYears: 6,
    highlightedProjects: ['Nordic Clean Living Headless Shopify', 'Global High-Traffic WooCommerce Cluster']
  },
  {
    id: 'team-6',
    name: 'Dennis Boyette',
    role: 'Head of UI/UX & Creative Engineering',
    branch: 'Leverkusen, Germany',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bio: 'Award-winning product designer crafting frictionless, modern digital interfaces for European and global enterprise products. Expert in design systems and micro-interactions.',
    skills: ['Figma Design Systems', 'Design-to-Code', 'Motion / Micro-interactions', 'Accessibility (WCAG)', 'User Research'],
    email: 'dennis.b@webdevsoftware.com',
    experienceYears: 8,
    highlightedProjects: ['FinTech Cloud Banking Portal', 'Nordic Clean Living Headless Shopify']
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
    name: 'Henrik Von Klaus',
    role: 'Managing Director',
    company: 'Rheinland Tech Logistik GmbH, Leverkusen, Germany',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    country: 'Germany',
    quote: '"Very well thought out and articulate communication. Clear milestones, deadliness and fast work. Patience, infinite patience. No shortcuts. Even if the client is being careless. The best part... always solving problems with great original ideas! WebDev Software Solutions delivers true German-grade engineering with incredible cost-efficiency."',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Kawsar Mahmud',
    role: 'Chief Operating Officer',
    company: 'Prime Agro Industries Ltd, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    country: 'Bangladesh',
    quote: '"Working with WebDev Software Solutions transformed our supply chain logistics across Joypurhat, Rajshahi, and Dhaka. Their MERN stack system handles our tracking effortlessly and their 24/7 server support gives us complete peace of mind. Highly recommended for any serious business."',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Head of Product',
    company: 'Nordic Commerce Group, Munich & Berlin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    country: 'Germany / International',
    quote: '"The headless Shopify build they produced for our brand surpassed every performance target. Our mobile conversion rate jumped by 43% in the first month alone. The collaboration between their German partner and Bangladeshi engineering core is flawless."',
    rating: 5
  }
];

export const clientLogos = [
  { name: 'Frank G. Fabell', symbol: 'F' },
  { name: 'Remote Studio', symbol: 'RS' },
  { name: 'Success Glassware', symbol: 'SG' },
  { name: 'Build YourHome', symbol: 'BYH' },
  { name: 'Youths Dream', symbol: 'YD' },
  { name: 'EuroTech Labs', symbol: 'ETL' }
];

export const companyOffices = [
  {
    title: 'Bangladesh Headquarters',
    city: 'Joypurhat, Bangladesh',
    address: 'Main Commercial Avenue, Joypurhat Sadar, Rajshahi Division, Bangladesh',
    phone: '+880 1700-928374',
    email: 'dhaka.office@webdevsoftware.com',
    hours: 'Sun - Thu: 9:00 AM - 7:00 PM (BST)',
    isHQ: true
  },
  {
    title: 'European Operations Branch',
    city: 'Leverkusen, Germany',
    address: 'Heinrich-von-Stephan-Straße / Willy-Brandt-Ring, 51373 Leverkusen, NRW, Germany',
    phone: '+49 214 839201',
    email: 'germany.branch@webdevsoftware.com',
    hours: 'Mon - Fri: 8:30 AM - 6:00 PM (CET)',
    isHQ: false
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
