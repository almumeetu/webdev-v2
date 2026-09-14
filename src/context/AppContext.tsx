'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  TeamMember,
  BlogPost,
  Inquiry,
  UserProfile,
  ServiceDetail,
  SiteSettings,
  Testimonial,
} from '../types';
import {
  initialProjects,
  initialTeamMembers,
  initialBlogPosts,
  initialInquiries,
  initialServices,
  initialSiteSettings,
  initialTestimonialsData,
} from '../data/initialData';

interface AppContextType {
  // ─── Data ─────────────────────────────────────────────────────────────────────
  projects: Project[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  inquiries: Inquiry[];
  services: ServiceDetail[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
  currentUser: UserProfile | null;

  // ─── Project CRUD ─────────────────────────────────────────────────────────────
  addProject: (data: Partial<Project>) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  deleteProject: (id: string) => void;

  // ─── Team CRUD ────────────────────────────────────────────────────────────────
  addTeamMember: (data: Partial<TeamMember>) => void;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // ─── Blog CRUD ────────────────────────────────────────────────────────────────
  addBlog: (data: Partial<BlogPost>) => void;
  updateBlog: (id: string, data: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;
  likeBlog: (id: string) => void;

  // ─── Service CRUD ─────────────────────────────────────────────────────────────
  addService: (data: Partial<ServiceDetail>) => void;
  updateService: (id: string, data: Partial<ServiceDetail>) => void;
  deleteService: (id: string) => void;

  // ─── Testimonial CRUD ─────────────────────────────────────────────────────────
  addTestimonial: (data: Partial<Testimonial>) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // ─── Inquiry ──────────────────────────────────────────────────────────────────
  addInquiry: (inquiry: Inquiry) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (updated: UserProfile) => void;

  // ─── Site Settings ────────────────────────────────────────────────────────────
  updateSiteSettings: (settings: SiteSettings) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ─── Core Data State ──────────────────────────────────────────────────────────
  const [projects, setProjects]         = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers]   = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs]               = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries]       = useState<Inquiry[]>(initialInquiries);
  const [services, setServices]         = useState<ServiceDetail[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonialsData);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // ─── Hydrate site settings from localStorage ─────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem('webdev_site_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSiteSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to parse saved siteSettings', e);
    }
  }, []);

  // ─── Projects CRUD ────────────────────────────────────────────────────────────
  const addProject = (data: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: data.title || 'Enterprise Solution',
      category: data.category || 'Full Stack & MERN',
      status: data.status || 'ongoing',
      clientCountry: data.clientCountry || 'Germany',
      clientName: data.clientName || 'Partner Client',
      completionDate: data.completionDate || '2026',
      image: data.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      description: data.description || 'Full-stack application engineered by WebDev Software Solutions.',
      techStack: data.techStack || ['React 19', 'Node.js', 'Express', 'MongoDB'],
      features: data.features || ['Modular microservices', 'GDPR compliance', 'Fast loading'],
      liveUrl: data.liveUrl,
      metrics: data.metrics,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  // ─── Team CRUD ────────────────────────────────────────────────────────────────
  const addTeamMember = (data: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: data.name || 'New Engineer',
      role: data.role || 'Senior Full-Stack Developer',
      branch: data.branch || 'Joypurhat, Bangladesh',
      image: data.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: data.bio || 'Experienced software engineer at WebDev Software Solutions.',
      skills: data.skills || ['Full-Stack MERN', 'TypeScript', 'Node.js'],
      email: data.email || 'engineer@webdevsoftware.com',
      experienceYears: data.experienceYears || 5,
      headline: data.headline,
      location: data.location,
      phone: data.phone,
      linkedin: data.linkedin,
      github: data.github,
      highlightedProjects: data.highlightedProjects,
      education: data.education,
      certifications: data.certifications,
      languages: data.languages,
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, data: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  };

  const deleteTeamMember = (id: string) => setTeamMembers((prev) => prev.filter((m) => m.id !== id));

  // ─── Blog CRUD ────────────────────────────────────────────────────────────────
  const addBlog = (data: Partial<BlogPost>) => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: data.title || 'New Engineering Article',
      slug: (data.title || 'engineering-article').toLowerCase().replace(/\s+/g, '-'),
      excerpt: data.excerpt || 'Technical breakdown from WebDev Software Solutions engineering team.',
      content: data.content || 'Content coming soon.',
      author: data.author || 'Engineering Team',
      authorRole: data.authorRole || 'Senior Architect',
      authorImage: data.authorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: data.readTime || '5 min read',
      category: data.category || 'Engineering',
      tags: data.tags || ['Next.js', 'React', 'Cloud'],
      image: data.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      likes: 0,
    };
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const updateBlog = (id: string, data: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const deleteBlog = (id: string) => setBlogs((prev) => prev.filter((b) => b.id !== id));

  const likeBlog = (id: string) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b)));
  };

  // ─── Services CRUD ────────────────────────────────────────────────────────────
  const addService = (data: Partial<ServiceDetail>) => {
    const newService: ServiceDetail = {
      id: `serv-${Date.now()}`,
      title: data.title || 'New Service',
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      iconName: data.iconName || 'Code2',
      image: data.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      techs: data.techs || [],
      features: data.features || [],
      deliverables: data.deliverables || [],
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, data: Partial<ServiceDetail>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const deleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  // ─── Testimonials CRUD ────────────────────────────────────────────────────────
  const addTestimonial = (data: Partial<Testimonial>) => {
    const newT: Testimonial = {
      id: data.id || `test-${Date.now()}`,
      name: data.name || '',
      role: data.role || '',
      company: data.company || '',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      country: data.country || 'International',
      flag: data.flag || '🌐',
      quote: data.quote || '',
      rating: data.rating ?? 5,
      verified: data.verified ?? true,
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const updateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTestimonial = (id: string) => setTestimonials((prev) => prev.filter((t) => t.id !== id));

  // ─── Inquiry ──────────────────────────────────────────────────────────────────
  const addInquiry = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    if (currentUser) {
      setCurrentUser({ ...currentUser, inquiries: [...currentUser.inquiries, newInquiry] });
    }
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const deleteInquiry = (id: string) => setInquiries((prev) => prev.filter((i) => i.id !== id));

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  const login = (user: UserProfile) => setCurrentUser(user);

  const logout = () => setCurrentUser(null);

  const updateProfile = (updated: UserProfile) => setCurrentUser(updated);

  // ─── Site Settings ────────────────────────────────────────────────────────────
  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webdev_site_settings', JSON.stringify(settings));
      } catch (e) {
        console.error('Failed to persist siteSettings', e);
      }
    }
  };

  // ─── Context Value ────────────────────────────────────────────────────────────
  const value: AppContextType = {
    projects, teamMembers, blogs, inquiries, services, testimonials, siteSettings, currentUser,
    addProject, updateProject, updateProjectStatus, deleteProject,
    addTeamMember, updateTeamMember, deleteTeamMember,
    addBlog, updateBlog, deleteBlog, likeBlog,
    addService, updateService, deleteService,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addInquiry, updateInquiryStatus, deleteInquiry,
    login, logout, updateProfile,
    updateSiteSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
