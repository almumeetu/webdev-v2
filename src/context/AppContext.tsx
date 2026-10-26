'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Project,
  TeamMember,
  BlogPost,
  Inquiry,
  UserProfile,
  ServiceDetail,
  SiteSettings,
  Testimonial,
  JobPosting,
  JobApplication,
  HeroSlide,
  DEFAULT_PROJECT_CATEGORIES,
} from '../types';
import {
  initialProjects,
  initialTeamMembers,
  initialBlogPosts,
  initialServices,
  initialSiteSettings,
  initialHeroSlides,
  initialTestimonialsData,
} from '../data/initialData';
import { removeSeededTestimonials } from '../utils/testimonials';

interface AppContextType {
  // ─── Data ─────────────────────────────────────────────────────────────────────
  projects: Project[];
  projectCategories: string[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  inquiries: Inquiry[];
  services: ServiceDetail[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
  currentUser: UserProfile | null;

  // ─── Project CRUD ─────────────────────────────────────────────────────────────
  addProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  updateProjectStatus: (id: string, status: Project['status']) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // ─── Project Categories Management ───────────────────────────────────────────
  addProjectCategory: (name: string) => boolean;
  updateProjectCategory: (oldName: string, newName: string) => Promise<void>;
  deleteProjectCategory: (name: string, fallbackCategory?: string) => Promise<{ success: boolean; affectedProjects: number }>;
  resetProjectCategories: () => void;

  // ─── Team CRUD ────────────────────────────────────────────────────────────────
  addTeamMember: (data: Partial<TeamMember>) => Promise<void>;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // ─── Blog CRUD ────────────────────────────────────────────────────────────────
  addBlog: (data: Partial<BlogPost>) => Promise<void>;
  updateBlog: (id: string, data: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  likeBlog: (id: string) => void;

  // ─── Service CRUD ─────────────────────────────────────────────────────────────
  addService: (data: Partial<ServiceDetail>) => Promise<void>;
  updateService: (id: string, data: Partial<ServiceDetail>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // ─── Testimonial CRUD ─────────────────────────────────────────────────────────
  addTestimonial: (data: Partial<Testimonial>) => Promise<void>;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // ─── Inquiry ──────────────────────────────────────────────────────────────────
  addInquiry: (inquiry: Inquiry) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;

  // ─── Careers & Jobs CRUD ──────────────────────────────────────────────────────
  jobs: JobPosting[];
  applications: JobApplication[];
  addJob: (data: Partial<JobPosting>) => Promise<void>;
  updateJob: (id: string, data: Partial<JobPosting>) => Promise<void>;
  toggleJobActive: (id: string) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  addApplication: (data: Partial<JobApplication>) => Promise<{ success: boolean; id: string }>;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => Promise<void>;
  updateApplicationNotes: (id: string, notes: string, rating?: number) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  login: (user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updated: UserProfile) => Promise<void>;

  // ─── Site Settings ────────────────────────────────────────────────────────────
  updateSiteSettings: (settings: SiteSettings) => Promise<void>;

  // ─── Factory Reset ───────────────────────────────────────────────────────────
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

// ─── Helper: fetch with fallback ───────────────────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function apiMutation<T = unknown>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'The request could not be completed.');
  }
  return payload.data as T;
}

const LEGACY_DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'GERMANY & BANGLADESH ENGINEERING',
    title: 'Modern Full-Stack & Cloud Solutions',
    highlightText: 'Built to Scale',
    subtitle: 'We craft high-performance web applications, enterprise software, and scalable digital architectures with European precision.',
    primaryBtnText: 'Request Consultation',
    primaryBtnAction: 'quote',
    secondaryBtnText: 'Our Services',
    secondaryBtnAction: 'services',
    backgroundImage: '/images/background/webdev-bg.webp',
    tag: '01 / Enterprise Systems',
  },
  {
    id: 'slide-2',
    badge: 'NEXT.JS & ENTERPRISE PERFORMANCE',
    title: 'Transforming Ideas into Digital Realities',
    highlightText: 'Fast & Secure',
    subtitle: 'Specialized in MERN stack, Next.js, and cloud ecosystems engineered for high availability, security, and peak performance.',
    primaryBtnText: 'Explore Portfolio',
    primaryBtnAction: 'projects',
    secondaryBtnText: 'Contact Us',
    secondaryBtnAction: 'contact',
    backgroundImage: '/images/background/hero-img-1.webp',
    tag: '02 / Cloud Architecture',
  },
  {
    id: 'slide-3',
    badge: 'TAILORED SOFTWARE DEVELOPMENT',
    title: 'End-to-End Engineering for Visionary Brands',
    highlightText: 'Worldwide Impact',
    subtitle: 'Empowering ambitious businesses worldwide with scalable architecture, robust code, and dedicated technical partnership.',
    primaryBtnText: 'Start Your Project',
    primaryBtnAction: 'quote',
    secondaryBtnText: 'Explore Services',
    secondaryBtnAction: 'services',
    backgroundImage: '/images/background/webdev-bg-s.webp',
    tag: '03 / Tailored Solutions',
  },
];

const KNOWN_LEGACY_TITLES = [
  'Modern Full-Stack & Cloud Solutions',
  'Web & Mobile Engineering.',
  'Web & Mobile Engineering',
  'Transforming Ideas into Digital Realities',
  'Exceptional Web Experiences.',
  'Exceptional Web Experiences',
  'End-to-End Engineering for Visionary Brands',
  'Powerful Mobile Apps.',
  'Powerful Mobile Apps',
  'Native Mobile Apps',
  'Modern Web Apps',
];

function refreshLegacyHeroDefaults(settings: SiteSettings): SiteSettings {
  if (!settings.heroSlides?.length) return { ...settings, heroSlides: initialHeroSlides };

  // If saved slides are in the old default order where slide 0 is 'Web & Mobile Engineering',
  // seamlessly refresh directly to the new initialHeroSlides!
  const isOldDefaultOrder = settings.heroSlides.length === 3 &&
    settings.heroSlides[0]?.title === 'Web & Mobile Engineering' &&
    settings.heroSlides[2]?.title === 'Native Mobile Apps';

  if (isOldDefaultOrder) {
    return { ...settings, heroSlides: initialHeroSlides };
  }

  const refreshedSlides = settings.heroSlides.map((slide, index) => {
    const fresh = initialHeroSlides[index];
    if (!fresh) return slide;

    const legacy = LEGACY_DEFAULT_HERO_SLIDES[index];
    const isKnownLegacy = KNOWN_LEGACY_TITLES.includes(slide.title) ||
      (legacy && (
        slide.id === legacy.id &&
        slide.title === legacy.title &&
        slide.highlightText === legacy.highlightText
      ));

    if (!isKnownLegacy) return slide;

    return {
      ...slide,
      badge: fresh.badge,
      title: fresh.title,
      highlightText: fresh.highlightText,
      subtitle: fresh.subtitle,
      primaryBtnText: fresh.primaryBtnText,
      primaryBtnAction: fresh.primaryBtnAction,
      secondaryBtnText: fresh.secondaryBtnText,
      secondaryBtnAction: fresh.secondaryBtnAction,
      backgroundImage: fresh.backgroundImage,
      tag: fresh.tag,
    };
  });

  return { ...settings, heroSlides: refreshedSlides };
}

function refreshLegacyCompanySettings(settings: SiteSettings): SiteSettings {
  const companyEmail = 'webdevsoftwaresolutions26@gmail.com';
  const legacyEmails = ['info@webdevsoftwaresolutions.com', 'engineer@webdevsoftware.com'];
  const socialLinks = {
    ...initialSiteSettings.socialLinks,
    ...settings.socialLinks,
  };

  if (!socialLinks.github || socialLinks.github === 'https://github.com/almumeetusaikat') {
    socialLinks.github = 'https://github.com/webdevsoftware';
  }
  if (!socialLinks.linkedin || socialLinks.linkedin === 'https://linkedin.com') {
    socialLinks.linkedin = 'https://www.linkedin.com/in/webdevss';
  }

  const replaceLegacyEmail = (value: string) => legacyEmails.reduce(
    (result, legacyEmail) => result.split(legacyEmail).join(companyEmail),
    value,
  );

  return {
    ...settings,
    email: legacyEmails.includes(settings.email) ? companyEmail : settings.email,
    socialLinks,
    privacyPolicy: replaceLegacyEmail(settings.privacyPolicy || ''),
    termsOfService: replaceLegacyEmail(settings.termsOfService || ''),
  };
}

function refreshLegacyTeamDetails(members: TeamMember[]): TeamMember[] {
  const companyEmail = 'webdevsoftwaresolutions26@gmail.com';
  const legacyEmails = ['info@webdevsoftwaresolutions.com', 'engineer@webdevsoftware.com'];
  const ceoDefaults = initialTeamMembers.find((member) => member.id === 'team-2');

  return members.map((member) => {
    if (member.id === 'team-2' && ceoDefaults) {
      return {
        ...member,
        email: companyEmail,
        linkedin: ceoDefaults.linkedin,
        education: ceoDefaults.education,
      };
    }

    return legacyEmails.includes(member.email) ? { ...member, email: companyEmail } : member;
  });
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ─── Core Data State ──────────────────────────────────────────────────────────
  const [projects, setProjects]                 = useState<Project[]>(initialProjects);
  const [projectCategories, setProjectCategories] = useState<string[]>(DEFAULT_PROJECT_CATEGORIES);
  const [teamMembers, setTeamMembers]           = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs]                       = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries]               = useState<Inquiry[]>([]);
  const [services, setServices]                 = useState<ServiceDetail[]>(initialServices);
  const [testimonials, setTestimonials]         = useState<Testimonial[]>(initialTestimonialsData);
  const [siteSettings, setSiteSettings]         = useState<SiteSettings>(initialSiteSettings);
  const [jobs, setJobs]                         = useState<JobPosting[]>([]);
  const [applications, setApplications]         = useState<JobApplication[]>([]);
  const [currentUser, setCurrentUser]           = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated]             = useState(false);

  // ─── Load data: try DB first, fall back to localStorage, then initialData ────
  const loadAllData = useCallback(async () => {
    // Projects
    let currentProjects: Project[] = initialProjects;
    const dbProjects = await apiFetch<Project[]>('/api/projects');
    if (dbProjects && dbProjects.length > 0) {
      currentProjects = dbProjects;
      setProjects(dbProjects);
    } else {
      try {
        const saved = localStorage.getItem('webdev_projects');
        if (saved) {
          currentProjects = JSON.parse(saved);
          setProjects(currentProjects);
        }
      } catch {}
    }

    // Project Categories
    const dbCats = await apiFetch<string[]>('/api/projects/categories');
    let loadedCats: string[] = DEFAULT_PROJECT_CATEGORIES;
    try {
      const savedCats = localStorage.getItem('webdev_project_categories');
      if (savedCats) {
        loadedCats = JSON.parse(savedCats);
      } else if (dbCats && Array.isArray(dbCats) && dbCats.length > 0) {
        loadedCats = dbCats;
      }
    } catch {}

    const projectCats = currentProjects.map((p) => p.category).filter(Boolean);
    const finalCats = Array.from(new Set([...loadedCats, ...projectCats]));
    setProjectCategories(finalCats);

    // Team
    const dbTeam = await apiFetch<TeamMember[]>('/api/team');
    if (dbTeam && dbTeam.length > 0) {
      setTeamMembers(refreshLegacyTeamDetails(dbTeam));
    } else {
      try {
        const saved = localStorage.getItem('webdev_team_members');
        if (saved) {
          const refreshedTeam = refreshLegacyTeamDetails(JSON.parse(saved));
          setTeamMembers(refreshedTeam);
          localStorage.setItem('webdev_team_members', JSON.stringify(refreshedTeam));
        }
      } catch {}
    }

    // Blogs
    const dbBlogs = await apiFetch<BlogPost[]>('/api/blogs');
    if (dbBlogs && dbBlogs.length > 0) {
      setBlogs(dbBlogs);
    } else {
      try {
        const saved = localStorage.getItem('webdev_blogs');
        if (saved) setBlogs(JSON.parse(saved));
      } catch {}
    }

    // Services
    const mergeServiceWithDefaults = (s: Partial<ServiceDetail> & { id: string }): ServiceDetail => {
      const init = initialServices.find((item) => item.id === s.id);
      if (!init) return s as ServiceDetail;
      return {
        ...init,
        ...s,
        title: init.title,
        shortDesc: init.shortDesc,
        category: s.category || init.category || 'Development',
        features: init.features,
        deliverables: (s.deliverables && s.deliverables.length > 0) ? s.deliverables : init.deliverables,
        techs: init.techs,
      } as ServiceDetail;
    };

    const dbServices = await apiFetch<ServiceDetail[]>('/api/services');
    if (dbServices && dbServices.length > 0) {
      const mergedDb = dbServices.map(mergeServiceWithDefaults);
      const existingIds = new Set(mergedDb.map((s) => s.id));
      const missing = initialServices.filter((s) => !existingIds.has(s.id));
      const allServices = [...mergedDb, ...missing];
      setServices(allServices);
      try {
        localStorage.setItem('webdev_services', JSON.stringify(allServices));
      } catch {}
    } else {
      try {
        const saved = localStorage.getItem('webdev_services');
        if (saved) {
          const parsed: ServiceDetail[] = JSON.parse(saved);
          const enriched = parsed.map(mergeServiceWithDefaults);
          const existingIds = new Set(enriched.map((s) => s.id));
          const missing = initialServices.filter((s) => !existingIds.has(s.id));
          const merged = missing.length > 0 ? [...enriched, ...missing] : enriched;
          setServices(merged);
          localStorage.setItem('webdev_services', JSON.stringify(merged));
        } else {
          setServices(initialServices);
          localStorage.setItem('webdev_services', JSON.stringify(initialServices));
        }
      } catch {
        setServices(initialServices);
      }
    }

    // Testimonials
    const dbTestimonials = await apiFetch<Testimonial[]>('/api/testimonials');
    if (dbTestimonials && dbTestimonials.length > 0) {
      setTestimonials(removeSeededTestimonials(dbTestimonials));
    } else {
      try {
        const saved = localStorage.getItem('webdev_testimonials');
        if (saved) {
          const cleanTestimonials = removeSeededTestimonials(JSON.parse(saved));
          setTestimonials(cleanTestimonials);
          localStorage.setItem('webdev_testimonials', JSON.stringify(cleanTestimonials));
        }
      } catch {}
    }

    // Settings and career records are loaded from the server so admin changes survive devices.
    const serverSettings = await apiFetch<SiteSettings>('/api/site-settings');
    if (serverSettings) {
      setSiteSettings(refreshLegacyCompanySettings(refreshLegacyHeroDefaults({
        ...initialSiteSettings,
        ...serverSettings,
        socialLinks: { ...initialSiteSettings.socialLinks, ...serverSettings.socialLinks },
      })));
    }

    const publicJobs = await apiFetch<JobPosting[]>('/api/careers');
    setJobs(publicJobs || []);

    let sessionUser: UserProfile | null = null;
    try {
      const sessionResponse = await fetch('/api/auth/me', { cache: 'no-store' });
      if (sessionResponse.ok) {
        const sessionPayload = await sessionResponse.json();
        if (sessionPayload.success && sessionPayload.user) sessionUser = sessionPayload.user as UserProfile;
      }
    } catch {
      sessionUser = null;
    }
    setCurrentUser(sessionUser);

    if (sessionUser?.role === 'admin') {
      const [adminJobs, adminApplications, adminInquiries] = await Promise.all([
        apiFetch<JobPosting[]>('/api/careers?all=true'),
        apiFetch<JobApplication[]>('/api/careers/applications'),
        apiFetch<Inquiry[]>('/api/inquiries'),
      ]);
      if (adminJobs) setJobs(adminJobs);
      if (adminApplications) setApplications(adminApplications);
      if (adminInquiries) setInquiries(adminInquiries);
    } else if (sessionUser) {
      const ownInquiries = await apiFetch<Inquiry[]>('/api/inquiries/mine');
      setInquiries(ownInquiries || []);
    } else {
      setApplications([]);
      setInquiries([]);
    }

    // Remove legacy client-side credentials and private records from earlier releases.
    try {
      ['webdev_auth_user', 'webdev_registered_users', 'webdev_job_applications', 'webdev_inquiries']
        .forEach((key) => localStorage.removeItem(key));
    } catch {}

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    let active = true;
    const startLoading = () => {
      if (active) void loadAllData();
    };
    queueMicrotask(startLoading);
    return () => { active = false; };
  }, [loadAllData]);

  // ─── Cross-tab sync for non-sensitive local cache data ────────────────────────
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'webdev_projects' && e.newValue) setProjects(JSON.parse(e.newValue));
        if (e.key === 'webdev_project_categories' && e.newValue) setProjectCategories(JSON.parse(e.newValue));
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ─── Persist localStorage-backed data ────────────────────────────────────────
  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_projects', JSON.stringify(projects)); } catch {}
  }, [projects, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_project_categories', JSON.stringify(projectCategories)); } catch {}
  }, [projectCategories, isHydrated]);

  // ─── Projects CRUD (DB-backed) ────────────────────────────────────────────────
  const addProject = async (data: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: data.title || 'Enterprise Solution',
      category: data.category || 'Full Stack & MERN',
      status: data.status || 'ongoing',
      clientCountry: data.clientCountry || 'Germany',
      clientName: data.clientName || 'Partner Client',
      completionDate: data.completionDate || '2026',
      image: data.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      description: data.description || '',
      techStack: data.techStack || ['React 19', 'Node.js'],
      features: data.features || [],
      liveUrl: data.liveUrl,
      metrics: data.metrics,
    };

    // Optimistic UI update
    setProjects((prev) => [newProject, ...prev]);

    // Persist to DB
    const saved = await apiFetch<Project>('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });

    // If DB returned a record with a server-generated id, sync it
    if (saved && saved.id !== newProject.id) {
      setProjects((prev) => prev.map((p) => p.id === newProject.id ? { ...p, id: saved.id } : p));
    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    await apiFetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const updateProjectStatus = async (id: string, status: Project['status']) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    await apiFetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try { localStorage.setItem('webdev_projects', JSON.stringify(next)); } catch {}
      return next;
    });
    await apiFetch(`/api/projects/${id}`, { method: 'DELETE' });
  };

  // ─── Project Categories Management ───────────────────────────────────────────
  const addProjectCategory = useCallback((name: string): boolean => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    if (projectCategories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      return false;
    }
    const updated = [...projectCategories, trimmed];
    setProjectCategories(updated);
    try {
      localStorage.setItem('webdev_project_categories', JSON.stringify(updated));
    } catch {}
    apiFetch('/api/projects/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    });
    return true;
  }, [projectCategories]);

  const updateProjectCategory = useCallback(async (oldName: string, newName: string) => {
    const trimmedOld = oldName.trim();
    const trimmedNew = newName.trim();
    if (!trimmedNew || trimmedOld.toLowerCase() === trimmedNew.toLowerCase()) return;

    // 1. Update categories list
    setProjectCategories((prev) => {
      const updated = prev.map((c) => (c === trimmedOld ? trimmedNew : c));
      try { localStorage.setItem('webdev_project_categories', JSON.stringify(updated)); } catch {}
      return updated;
    });

    // 2. Update projects matching old category
    let affected: Project[] = [];
    setProjects((prev) => {
      affected = prev.filter((p) => p.category === trimmedOld);
      const updated = prev.map((p) => (p.category === trimmedOld ? { ...p, category: trimmedNew } : p));
      try { localStorage.setItem('webdev_projects', JSON.stringify(updated)); } catch {}
      return updated;
    });

    // 3. Persist to API
    await apiFetch('/api/projects/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldName: trimmedOld, newName: trimmedNew }),
    });

    // Also update affected projects in DB if reachable
    for (const proj of affected) {
      apiFetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proj, category: trimmedNew }),
      });
    }
  }, []);

  const deleteProjectCategory = useCallback(async (name: string, fallbackCategory?: string) => {
    const trimmedName = name.trim();
    const remaining = projectCategories.filter((c) => c !== trimmedName);
    const fallback = fallbackCategory || remaining[0] || 'Web Application';

    // 1. Update categories list
    setProjectCategories(remaining);
    try { localStorage.setItem('webdev_project_categories', JSON.stringify(remaining)); } catch {}

    // 2. Reassign projects
    let affectedCount = 0;
    let affectedProjects: Project[] = [];
    setProjects((prev) => {
      affectedProjects = prev.filter((p) => p.category === trimmedName);
      affectedCount = affectedProjects.length;
      const updated = prev.map((p) => (p.category === trimmedName ? { ...p, category: fallback } : p));
      try { localStorage.setItem('webdev_projects', JSON.stringify(updated)); } catch {}
      return updated;
    });

    // 3. Persist to API
    await apiFetch(`/api/projects/categories?name=${encodeURIComponent(trimmedName)}&fallback=${encodeURIComponent(fallback)}`, {
      method: 'DELETE',
    });

    // Also update affected projects in DB
    for (const proj of affectedProjects) {
      apiFetch(`/api/projects/${proj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...proj, category: fallback }),
      });
    }

    return { success: true, affectedProjects: affectedCount };
  }, [projectCategories]);

  const resetProjectCategories = useCallback(() => {
    setProjectCategories(DEFAULT_PROJECT_CATEGORIES);
    try {
      localStorage.setItem('webdev_project_categories', JSON.stringify(DEFAULT_PROJECT_CATEGORIES));
    } catch {}
  }, []);

  // ─── Team CRUD (DB-backed) ────────────────────────────────────────────────────
  const addTeamMember = async (data: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: data.name || 'New Engineer',
      role: data.role || 'Senior Full-Stack Developer',
      branch: data.branch || 'Joypurhat, Bangladesh',
      image: data.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: data.bio || '',
      skills: data.skills || [],
      email: data.email || '',
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
    await apiFetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember),
    });
  };

  const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    await apiFetch(`/api/team/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    await apiFetch(`/api/team/${id}`, { method: 'DELETE' });
  };

  // ─── Blog CRUD (DB-backed) ────────────────────────────────────────────────────
  const addBlog = async (data: Partial<BlogPost>) => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: data.title || 'New Article',
      slug: (data.title || 'new-article').toLowerCase().replace(/\s+/g, '-'),
      excerpt: data.excerpt || '',
      content: data.content || '',
      author: data.author || 'Engineering Team',
      authorRole: data.authorRole || 'Senior Architect',
      authorImage: data.authorImage || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: data.readTime || '5 min read',
      category: data.category || 'Engineering',
      tags: data.tags || [],
      image: data.image || '',
      likes: 0,
    };
    setBlogs((prev) => [newBlog, ...prev]);
    await apiFetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });
  };

  const updateBlog = async (id: string, data: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    await apiFetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const deleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    await apiFetch(`/api/blogs/${id}`, { method: 'DELETE' });
  };

  const likeBlog = (id: string) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b)));
  };

  // ─── Services CRUD (DB-backed) ────────────────────────────────────────────────
  const addService = async (data: Partial<ServiceDetail>) => {
    const newService: ServiceDetail = {
      id: `serv-${Date.now()}`,
      title: data.title || 'New Service',
      category: data.category || 'Development',
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      iconName: data.iconName || 'Code2',
      image: data.image || '',
      techs: data.techs || [],
      features: data.features || [],
      deliverables: data.deliverables || [],
    };
    setServices((prev) => {
      const updated = [...prev, newService];
      try { localStorage.setItem('webdev_services', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await apiFetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
  };

  const updateService = async (id: string, data: Partial<ServiceDetail>) => {
    setServices((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, ...data } : s));
      try { localStorage.setItem('webdev_services', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await apiFetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const deleteService = async (id: string) => {
    setServices((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      try { localStorage.setItem('webdev_services', JSON.stringify(updated)); } catch {}
      return updated;
    });
    await apiFetch(`/api/services/${id}`, { method: 'DELETE' });
  };

  // ─── Testimonials CRUD (DB-backed) ───────────────────────────────────────────
  const addTestimonial = async (data: Partial<Testimonial>) => {
    const newT: Testimonial = {
      id: data.id || `test-${Date.now()}`,
      name: data.name || '',
      role: data.role || '',
      company: data.company || '',
      avatar: data.avatar || '',
      country: data.country || 'International',
      flag: data.flag || '🌐',
      quote: data.quote || '',
      rating: data.rating ?? 5,
      verified: data.verified ?? true,
    };
    setTestimonials((prev) => [newT, ...prev]);
    await apiFetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newT),
    });
  };

  const updateTestimonial = async (id: string, data: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    await apiFetch(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await apiFetch(`/api/testimonials/${id}`, { method: 'DELETE' });
  };

  // ─── Inquiry ─────────────────────────────────────────────────────────────────
  const addInquiry = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    if (currentUser) {
      setCurrentUser({ ...currentUser, inquiries: [...(currentUser.inquiries || []), newInquiry] });
    }
  };

  const updateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    const updated = await apiMutation<Inquiry>('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setInquiries((prev) => prev.map((inquiry) => inquiry.id === id ? updated : inquiry));
  };

  const deleteInquiry = async (id: string) => {
    await apiMutation(`/api/inquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
  };

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  const login = async (_user: UserProfile) => {
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload.success || !payload.user) throw new Error('Session validation failed.');
      const verifiedUser = payload.user as UserProfile;
      setCurrentUser(verifiedUser);
      if (verifiedUser.role === 'admin') {
        const [adminJobs, adminApplications, adminInquiries] = await Promise.all([
          apiFetch<JobPosting[]>('/api/careers?all=true'),
          apiFetch<JobApplication[]>('/api/careers/applications'),
          apiFetch<Inquiry[]>('/api/inquiries'),
        ]);
        if (adminJobs) setJobs(adminJobs);
        if (adminApplications) setApplications(adminApplications);
        if (adminInquiries) setInquiries(adminInquiries);
      } else {
        const ownInquiries = await apiFetch<Inquiry[]>('/api/inquiries/mine');
        setInquiries(ownInquiries || []);
      }
    } catch {
      setCurrentUser(null);
      setApplications([]);
      setInquiries([]);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    setCurrentUser(null);
    setApplications([]);
    setInquiries([]);
    const publicJobs = await apiFetch<JobPosting[]>('/api/careers');
    setJobs(publicJobs || []);
  };

  const updateProfile = async (updated: UserProfile) => {
    const saved = await apiMutation<UserProfile>('/api/auth/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: updated.name, company: updated.company, phone: updated.phone }),
    });
    setCurrentUser(saved);
  };

  // ─── Site Settings ────────────────────────────────────────────────────────────
  const updateSiteSettings = async (settings: SiteSettings) => {
    const saved = await apiMutation<SiteSettings>('/api/site-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSiteSettings(saved);
  };

  const resetToDefaultData = () => {
    setProjects(initialProjects);
    setProjectCategories(DEFAULT_PROJECT_CATEGORIES);
    setTeamMembers(initialTeamMembers);
    setBlogs(initialBlogPosts);
    setInquiries([]);
    setServices(initialServices);
    setTestimonials(initialTestimonialsData);
    setSiteSettings(initialSiteSettings);
    setJobs([]);
    setApplications([]);
    try {
      ['webdev_projects','webdev_project_categories','webdev_team_members','webdev_blogs','webdev_inquiries',
       'webdev_services','webdev_testimonials','webdev_site_settings',
       'webdev_job_postings','webdev_job_applications'].forEach(k => localStorage.removeItem(k));
    } catch {}
  };

  // ─── Careers & Jobs CRUD (PostgreSQL) ─────────────────────────────────────────
  const addJob = async (data: Partial<JobPosting>) => {
    const newJob: JobPosting = {
      id: '',
      title: data.title || 'Software Engineer',
      department: data.department || 'Engineering',
      type: data.type || 'Full-time',
      experienceLevel: data.experienceLevel || 'Mid-Level',
      workplace: data.workplace || 'Remote',
      location: data.location || 'Remote (Worldwide)',
      salaryRange: data.salaryRange || 'Competitive',
      description: data.description || '',
      responsibilities: data.responsibilities?.length ? data.responsibilities : ['Architect and build high-performance web systems.'],
      requirements: data.requirements?.length ? data.requirements : ['Experience with modern web frameworks.'],
      niceToHave: data.niceToHave || [],
      benefits: data.benefits?.length ? data.benefits : ['Flexible work arrangements'],
      techStack: data.techStack?.length ? data.techStack : ['React 19', 'Next.js 15', 'TypeScript'],
      isActive: data.isActive ?? true,
      featured: data.featured ?? false,
      postedDate: data.postedDate || new Date().toISOString().split('T')[0],
      deadline: data.deadline,
      applicantsCount: 0,
    };
    const savedJob = await apiMutation<JobPosting>('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });
    setJobs((prev) => [savedJob, ...prev]);
  };

  const updateJob = async (id: string, data: Partial<JobPosting>) => {
    const savedJob = await apiMutation<JobPosting>(`/api/careers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setJobs((prev) => prev.map((job) => job.id === id ? savedJob : job));
  };

  const toggleJobActive = async (id: string) => {
    const job = jobs.find((item) => item.id === id);
    if (!job) return;
    await updateJob(id, { isActive: !job.isActive });
  };

  const deleteJob = async (id: string) => {
    const archived = await apiMutation<JobPosting>(`/api/careers/${id}`, { method: 'DELETE' });
    setJobs((prev) => prev.map((job) => job.id === id ? archived : job));
  };

  const addApplication = async (data: Partial<JobApplication>): Promise<{ success: boolean; id: string }> => {
    const targetJob = jobs.find((j) => j.id === data.jobId);
    const newApp: JobApplication = {
      id: '',
      jobId: data.jobId || 'general',
      jobTitle: data.jobTitle || targetJob?.title || 'General Application',
      applicantName: data.applicantName || 'Anonymous',
      email: data.email || '',
      phoneNumber: data.phoneNumber || '',
      location: data.location || 'Remote',
      portfolioUrl: data.portfolioUrl,
      linkedinUrl: data.linkedinUrl,
      githubUrl: data.githubUrl,
      resumeUrl: data.resumeUrl,
      resumeFileName: data.resumeFileName,
      experienceYears: data.experienceYears ?? 1,
      expectedSalary: data.expectedSalary,
      earliestStartDate: data.earliestStartDate,
      coverLetter: data.coverLetter,
      status: 'new',
      rating: 0,
      notes: '',
      appliedAt: new Date().toISOString(),
    };
    try {
      const result = await apiMutation<{ id: string }>('/api/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
      if (currentUser?.role === 'admin') {
        setApplications((prev) => [{ ...newApp, id: result.id, appliedAt: new Date().toISOString() }, ...prev]);
      }
      if (data.jobId && data.jobId !== 'general') {
        setJobs((prev) => prev.map((job) => job.id === data.jobId
          ? { ...job, applicantsCount: (job.applicantsCount || 0) + 1 }
          : job));
      }
      return { success: true, id: result.id };
    } catch {
      return { success: false, id: '' };
    }
  };

  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    const updated = await apiMutation<JobApplication>('/api/careers/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setApplications((prev) => prev.map((application) => application.id === id ? updated : application));
  };

  const updateApplicationNotes = async (id: string, notes: string, rating?: number) => {
    const updated = await apiMutation<JobApplication>('/api/careers/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, notes, ...(rating !== undefined ? { rating } : {}) }),
    });
    setApplications((prev) => prev.map((application) => application.id === id ? updated : application));
  };

  const deleteApplication = async (id: string) => {
    await apiMutation(`/api/careers/applications?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setApplications((prev) => prev.filter((application) => application.id !== id));
  };

  // ─── Context Value ────────────────────────────────────────────────────────────
  const value: AppContextType = {
    projects, projectCategories, teamMembers, blogs, inquiries, services, testimonials, siteSettings, currentUser,
    jobs, applications,
    addProject, updateProject, updateProjectStatus, deleteProject,
    addProjectCategory, updateProjectCategory, deleteProjectCategory, resetProjectCategories,
    addTeamMember, updateTeamMember, deleteTeamMember,
    addBlog, updateBlog, deleteBlog, likeBlog,
    addService, updateService, deleteService,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addInquiry, updateInquiryStatus, deleteInquiry,
    addJob, updateJob, toggleJobActive, deleteJob,
    addApplication, updateApplicationStatus, updateApplicationNotes, deleteApplication,
    login, logout, updateProfile,
    updateSiteSettings,
    resetToDefaultData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
