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

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ─── Core Data State ──────────────────────────────────────────────────────────
  const [projects, setProjects]         = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers]   = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs]               = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries]       = useState<Inquiry[]>(initialInquiries);
  const [services, setServices]         = useState<ServiceDetail[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonialsData);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [jobs, setJobs]                 = useState<JobPosting[]>(initialJobPostings);
  const [applications, setApplications] = useState<JobApplication[]>(initialJobApplications);

  // ─── Auth ─────────────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // ─── Hydrate all collections from localStorage on mount ─────────────────────────
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('webdev_site_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSiteSettings({
          ...initialSiteSettings,
          ...parsed,
          darkLogoUrl: parsed.darkLogoUrl || initialSiteSettings.darkLogoUrl,
        });
      }

      const savedUser = localStorage.getItem('webdev_auth_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedProjects = localStorage.getItem('webdev_projects');
      if (savedProjects) {
        try {
          const parsed: Project[] = JSON.parse(savedProjects);
          const initialMap = new Map(initialProjects.map((p) => [p.id, p]));
          const merged = parsed.map((p) => {
            const init = initialMap.get(p.id);
            return init
              ? {
                  ...init,
                  ...p,
                  priceRange: p.priceRange || init.priceRange,
                  estimatedDelivery: p.estimatedDelivery || init.estimatedDelivery,
                  readyToOrder: p.readyToOrder ?? init.readyToOrder,
                  highlight: p.highlight || init.highlight,
                  rating: p.rating || init.rating,
                }
              : p;
          });
          const existingIds = new Set(parsed.map((p) => p.id));
          for (const init of initialProjects) {
            if (!existingIds.has(init.id)) {
              merged.push(init);
            }
          }
          setProjects(merged);
        } catch {
          setProjects(initialProjects);
        }
      }

      const savedTeam = localStorage.getItem('webdev_team_members');
      if (savedTeam) setTeamMembers(JSON.parse(savedTeam));

      const savedBlogs = localStorage.getItem('webdev_blogs');
      if (savedBlogs) setBlogs(JSON.parse(savedBlogs));

      const savedInquiries = localStorage.getItem('webdev_inquiries');
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedServices = localStorage.getItem('webdev_services');
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedTestimonials = localStorage.getItem('webdev_testimonials');
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedJobs = localStorage.getItem('webdev_job_postings');
      if (savedJobs) {
        try {
          const parsed: JobPosting[] = JSON.parse(savedJobs);
          const cleaned = parsed.filter((j) => !['job-1', 'job-2', 'job-3', 'job-4', 'job-5'].includes(j.id));
          setJobs(cleaned);
        } catch {
          setJobs([]);
        }
      } else {
        setJobs([]);
      }

      const savedApps = localStorage.getItem('webdev_job_applications');
      if (savedApps) {
        try {
          const parsed: JobApplication[] = JSON.parse(savedApps);
          const cleaned = parsed.filter((a) => !['app-1', 'app-2', 'app-3'].includes(a.id));
          setApplications(cleaned);
        } catch {
          setApplications([]);
        }
      } else {
        setApplications([]);
      }
    } catch (e) {
      console.error('Failed to parse saved state from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // ─── Bidirectional Sync: Persist whenever modified (after hydration) ───────────
  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_projects', JSON.stringify(projects)); } catch {}
  }, [projects, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_team_members', JSON.stringify(teamMembers)); } catch {}
  }, [teamMembers, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_blogs', JSON.stringify(blogs)); } catch {}
  }, [blogs, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_inquiries', JSON.stringify(inquiries)); } catch {}
  }, [inquiries, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_services', JSON.stringify(services)); } catch {}
  }, [services, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try { localStorage.setItem('webdev_testimonials', JSON.stringify(testimonials)); } catch {}
  }, [testimonials, isHydrated]);

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
  const login = (user: UserProfile) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webdev_auth_user', JSON.stringify(user));
      } catch (e) {
        console.error('Failed to persist user session', e);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('webdev_auth_user');
      } catch (e) {
        console.error('Failed to clear user session', e);
      }
    }
  };

  const updateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webdev_auth_user', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update user session', e);
      }
    }
  };

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

  const resetToDefaultData = () => {
    setProjects(initialProjects);
    setTeamMembers(initialTeamMembers);
    setBlogs(initialBlogPosts);
    setInquiries(initialInquiries);
    setServices(initialServices);
    setTestimonials(initialTestimonialsData);
    setSiteSettings(initialSiteSettings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('webdev_projects');
        localStorage.removeItem('webdev_team_members');
        localStorage.removeItem('webdev_blogs');
        localStorage.removeItem('webdev_inquiries');
        localStorage.removeItem('webdev_services');
        localStorage.removeItem('webdev_testimonials');
        localStorage.removeItem('webdev_site_settings');
        localStorage.removeItem('webdev_job_postings');
        localStorage.removeItem('webdev_job_applications');
      } catch {}
    }
  };

  // ─── Careers & Jobs CRUD Implementation ───────────────────────────────────────
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
      description: data.description || 'Join our global engineering team at WebDev Software Solutions.',
      responsibilities: data.responsibilities && data.responsibilities.length > 0 ? data.responsibilities : ['Architect and build high-performance web systems.'],
      requirements: data.requirements && data.requirements.length > 0 ? data.requirements : ['Experience with modern web frameworks and clean code practices.'],
      niceToHave: data.niceToHave || [],
      benefits: data.benefits && data.benefits.length > 0 ? data.benefits : ['Flexible work arrangements', 'Equipment & learning stipend'],
      techStack: data.techStack && data.techStack.length > 0 ? data.techStack : ['React 19', 'Next.js 15', 'TypeScript'],
      isActive: data.isActive ?? true,
      featured: data.featured ?? false,
      postedDate: data.postedDate || new Date().toISOString().split('T')[0],
      deadline: data.deadline,
      applicantsCount: 0
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const updateJob = (id: string, data: Partial<JobPosting>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...data } : j)));
  };

  const toggleJobActive = (id: string) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, isActive: !j.isActive } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const addApplication = async (data: Partial<JobApplication>): Promise<{ success: boolean; id: string }> => {
    const newAppId = `app-${Date.now()}`;
    const targetJob = jobs.find((j) => j.id === data.jobId);
    const newApp: JobApplication = {
      id: newAppId,
      jobId: data.jobId || 'general',
      jobTitle: data.jobTitle || targetJob?.title || 'General Engineering Application',
      applicantName: data.applicantName || 'Anonymous Candidate',
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
      appliedAt: new Date().toISOString()
    };

    setApplications((prev) => [newApp, ...prev]);

    // Bump applicantsCount for the relevant job
    if (data.jobId && data.jobId !== 'general') {
      setJobs((prev) => prev.map((j) => (j.id === data.jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j)));
    }

    // Try posting to API in background (with graceful fallback)
    try {
      await fetch('/api/careers/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
    } catch (e) {
      console.warn('API call failed, local state preserved:', e);
    }

    return { success: true, id: newAppId };
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const updateApplicationNotes = (id: string, notes: string, rating?: number) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, notes, ...(rating !== undefined ? { rating } : {}) } : a)));
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

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
