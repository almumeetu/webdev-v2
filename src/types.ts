export type ProjectCategory = 
  | 'All' 
  | 'Web Application' 
  | 'Full Stack & MERN' 
  | 'Backend & Cloud' 
  | 'E-Commerce' 
  | 'WordPress & Shopify';

export type ProjectStatus = 'completed' | 'ongoing';

export interface Project {
  id: string;
  title: string;
  category: 'Web Application' | 'Full Stack & MERN' | 'Backend & Cloud' | 'E-Commerce' | 'WordPress & Shopify';
  status: ProjectStatus;
  description: string;
  clientName: string;
  clientCountry: 'Germany' | 'Bangladesh' | 'USA' | 'UK' | 'Europe' | 'International';
  image: string;
  completionDate: string;
  techStack: string[];
  liveUrl?: string;
  features: string[];
  metrics?: string;
  priceRange?: string;
  estimatedDelivery?: string;
  readyToOrder?: boolean;
  demoUrl?: string;
  rating?: number;
  highlight?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type?: string;
  location?: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  headline?: string;
  branch: 'Joypurhat, Bangladesh' | 'Leverkusen, Germany' | 'Küppersteg, Leverkusen, Germany';
  location?: string;
  image: string;
  bio: string;
  skills: string[];
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  experienceYears: number;
  highlightedProjects?: string[];
  education?: string[];
  certifications?: string[];
  experienceHistory?: ExperienceItem[];
  languages?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  likes: number;
}

export interface Inquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company?: string;
  projectType: string;
  budget: string;
  currency?: string;
  timezone?: string;
  ndaRequested?: boolean;
  targetMarket: 'Bangladesh' | 'Germany' | 'International' | 'Both';
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'client';
  company?: string;
  phone?: string;
  country: 'Bangladesh' | 'Germany' | 'International';
  savedProjects: string[];
  inquiries: Inquiry[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  techs: string[];
  features: string[];
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  country: string;
  flag: string;
  quote: string;
  rating: number;
  verified: boolean;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnAction?: 'quote' | 'services' | 'contact' | 'projects';
  secondaryBtnText?: string;
  secondaryBtnAction?: 'services' | 'projects' | 'contact' | 'quote';
  backgroundImage: string;
  tag?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  logoUrl: string;
  darkLogoUrl?: string;
  email: string;
  phone_bd: string;
  phone_de: string;
  address_bd: string;
  address_de: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    whatsapp_bd: string;
    whatsapp_de: string;
  };
  privacyPolicy: string;
  termsOfService: string;
  footerAboutText: string;
  gdprBadgeText: string;
  heroSlides?: HeroSlide[];
}

export type JobDepartment = 
  | 'Engineering' 
  | 'DevOps & Cloud' 
  | 'Design & UI/UX' 
  | 'Product & QA' 
  | 'Technical Writing & Support';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export type JobExperienceLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Lead' | 'Intern';

export type JobWorkplace = 'Remote' | 'On-site' | 'Hybrid';

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';

export interface JobPosting {
  id: string;
  title: string;
  department: JobDepartment;
  type: JobType;
  experienceLevel: JobExperienceLevel;
  workplace: JobWorkplace;
  location: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits: string[];
  techStack: string[];
  isActive: boolean;
  featured?: boolean;
  postedDate: string;
  deadline?: string;
  applicantsCount?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phoneNumber: string;
  location: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  experienceYears: number;
  expectedSalary?: string;
  earliestStartDate?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  rating?: number;
  notes?: string;
  appliedAt: string;
}

