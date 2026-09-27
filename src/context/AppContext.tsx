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
} from '../types';
import {
  initialProjects,
  initialTeamMembers,
  initialBlogPosts,
  initialInquiries,
  initialServices,
  initialSiteSettings,
  initialTestimonialsData,
  initialJobPostings,
  initialJobApplications,
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
  addProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  updateProjectStatus: (id: string, status: Project['status']) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

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
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // ─── Careers & Jobs CRUD ──────────────────────────────────────────────────────
  jobs: JobPosting[];
  applications: JobApplication[];
  addJob: (data: Partial<JobPosting>) => void;
  updateJob: (id: string, data: Partial<JobPosting>) => void;
  toggleJobActive: (id: string) => void;
  deleteJob: (id: string) => void;
  addApplication: (data: Partial<JobApplication>) => Promise<{ success: boolean; id: string }>;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  updateApplicationNotes: (id: string, notes: string, rating?: number) => void;
  deleteApplication: (id: string) => void;

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (updated: UserProfile) => void;

  // ─── Site Settings ────────────────────────────────────────────────────────────
  updateSiteSettings: (settings: SiteSettings) => void;

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

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ─── Core Data State ──────────────────────────────────────────────────────────
  const [projects, setProjects]         = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers]   = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs]               = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries]       = useState<Inquiry[]>(initialInquiries);
  const [services, setServices]         = useState<ServiceDetail[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonialsData);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [jobs, setJobs]                 = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [currentUser, setCurrentUser]   = useState<UserProfile | null>(null);
  const [isHydrated, setIsHydrated]     = useState(false);

  // ─── Load data: try DB first, fall back to localStorage, then initialData ────
  const loadAllData = useCallback(async () => {
    // Projects
    const dbProjects = await apiFetch<Project[]>('/api/projects');
    if (dbProjects && dbProjects.length > 0) {
      setProjects(dbProjects);
    } else {
      try {
        const saved = localStorage.getItem('webdev_projects');
        if (saved) setProjects(JSON.parse(saved));
      } catch {}
    }

    // Team
    const dbTeam = await apiFetch<TeamMember[]>('/api/team');
    if (dbTeam && dbTeam.length > 0) {
      setTeamMembers(dbTeam);
    } else {
      try {
        const saved = localStorage.getItem('webdev_team_members');
        if (saved) setTeamMembers(JSON.parse(saved));
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
    const dbServices = await apiFetch<ServiceDetail[]>('/api/services');
    if (dbServices && dbServices.length > 0) {
      setServices(dbServices);
    } else {
      try {
        const saved = localStorage.getItem('webdev_services');
        if (saved) setServices(JSON.parse(saved));
      } catch {}
    }

    // Testimonials
    const dbTestimonials = await apiFetch<Testimonial[]>('/api/testimonials');
    if (dbTestimonials && dbTestimonials.length > 0) {
      setTestimonials(dbTestimonials);
    } else {
      try {
        const saved = localStorage.getItem('webdev_testimonials');
        if (saved) setTestimonials(JSON.parse(saved));
      } catch {}
    }

    // Inquiries (localStorage only — internal admin data)
    try {
      const saved = localStorage.getItem('webdev_inquiries');
      if (saved) setInquiries(JSON.parse(saved));
    } catch {}

    // Site settings
    try {
      const saved = localStorage.getItem('webdev_site_settings');
      if (saved) setSiteSettings({ ...initialSiteSettings, ...JSON.parse(saved) });
    } catch {}

    // Auth user
    try {
      const saved = localStorage.getItem('webdev_auth_user');
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch {}

    // Jobs (localStorage only)
    try {
      const saved = localStorage.getItem('webdev_job_postings');
      if (saved) {
        const parsed: JobPosting[] = JSON.parse(saved);
        setJobs(parsed.filter((j) => !['job-1', 'job-2', 'job-3', 'job-4', 'job-5'].includes(j.id)));
      }
    } catch {}

    // Applications (localStorage only)
    try {
      const saved = localStorage.getItem('webdev_job_applications');
      if (saved) {
        const parsed: JobApplication[] = JSON.parse(saved);
        setApplications(parsed.filter((a) => !['app-1', 'app-2', 'app-3'].includes(a.id)));
      }
    } catch {}

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // ─── Cross-tab sync for localStorage-backed data ──────────────────────────────
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'webdev_inquiries' && e.newValue) setInquiries(JSON.parse(e.newValue));
        if (e.key === 'webdev_site_settings' && e.newValue) setSiteSettings(JSON.parse(e.newValue));
        if (e.key === 'webdev_job_postings' && e.newValue) setJobs(JSON.parse(e.newValue));
        if (e.key === 'webdev_job_applications' && e.newValue) setApplications(JSON.parse(e.newValue));
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ─── Persist localStorage-backed data ────────────────────────────────────────
  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_inquiries', JSON.stringify(inquiries)); } catch {}
  }, [inquiries, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_site_settings', JSON.stringify(siteSettings)); } catch {}
  }, [siteSettings, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_job_postings', JSON.stringify(jobs)); } catch {}
  }, [jobs, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_job_applications', JSON.stringify(applications)); } catch {}
  }, [applications, isHydrated]);

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
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await apiFetch(`/api/projects/${id}`, { method: 'DELETE' });
  };

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
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      iconName: data.iconName || 'Code2',
      image: data.image || '',
      techs: data.techs || [],
      features: data.features || [],
      deliverables: data.deliverables || [],
    };
    setServices((prev) => [...prev, newService]);
    await apiFetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
  };

  const updateService = async (id: string, data: Partial<ServiceDetail>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    await apiFetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, id }),
    });
  };

  const deleteService = async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
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

  // ─── Inquiry (localStorage only) ─────────────────────────────────────────────
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
  const login = (user: UserProfile) => {
    setCurrentUser(user);
    try { localStorage.setItem('webdev_auth_user', JSON.stringify(user)); } catch {}
  };

  const logout = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('webdev_auth_user'); } catch {}
  };

  const updateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    try { localStorage.setItem('webdev_auth_user', JSON.stringify(updated)); } catch {}
  };

  // ─── Site Settings ────────────────────────────────────────────────────────────
  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    try { localStorage.setItem('webdev_site_settings', JSON.stringify(settings)); } catch {}
  };

  const resetToDefaultData = () => {
    setProjects(initialProjects);
    setTeamMembers(initialTeamMembers);
    setBlogs(initialBlogPosts);
    setInquiries(initialInquiries);
    setServices(initialServices);
    setTestimonials(initialTestimonialsData);
    setSiteSettings(initialSiteSettings);
    try {
      ['webdev_projects','webdev_team_members','webdev_blogs','webdev_inquiries',
       'webdev_services','webdev_testimonials','webdev_site_settings',
       'webdev_job_postings','webdev_job_applications'].forEach(k => localStorage.removeItem(k));
    } catch {}
  };

  // ─── Careers & Jobs CRUD (localStorage) ──────────────────────────────────────
  const addJob = (data: Partial<JobPosting>) => {
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
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
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (id: string, data: Partial<JobPosting>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...data } : j)));
  };

  const toggleJobActive = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, isActive: !j.isActive } : j)));
  };

  const deleteJob = (id: string) => setJobs((prev) => prev.filter((j) => j.id !== id));

  const addApplication = async (data: Partial<JobApplication>): Promise<{ success: boolean; id: string }> => {
    const newAppId = `app-${Date.now()}`;
    const targetJob = jobs.find((j) => j.id === data.jobId);
    const newApp: JobApplication = {
      id: newAppId,
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
    setApplications((prev) => [newApp, ...prev]);
    if (data.jobId && data.jobId !== 'general') {
      setJobs((prev) => prev.map((j) => j.id === data.jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j));
    }
    try {
      await fetch('/api/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp),
      });
    } catch {}
    return { success: true, id: newAppId };
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const updateApplicationNotes = (id: string, notes: string, rating?: number) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, notes, ...(rating !== undefined ? { rating } : {}) } : a)));
  };

  const deleteApplication = (id: string) => setApplications((prev) => prev.filter((a) => a.id !== id));

  // ─── Context Value ────────────────────────────────────────────────────────────
  const value: AppContextType = {
    projects, teamMembers, blogs, inquiries, services, testimonials, siteSettings, currentUser,
    jobs, applications,
    addProject, updateProject, updateProjectStatus, deleteProject,
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
