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
  branch: 'Joypurhat, Bangladesh' | 'Leverkusen, Germany';
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
