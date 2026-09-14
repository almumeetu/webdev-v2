"use client";

/**
 * WebDev Software Solutions - Full Stack Web Application
 * Headquarters: Joypurhat, Bangladesh
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ServiceFeatureCards } from './ServiceFeatureCards';
import { WhoWeBring } from './WhoWeBring';
import { OurServicesSection } from './OurServicesSection';
import { TechnologyIndexSection } from './TechnologyIndexSection';
import { MeetOurTeamSection } from './MeetOurTeamSection';
import { WorkingProcessSection } from './WorkingProcessSection';
import { FaqAndExperienceSection } from './FaqAndExperienceSection';
import { RecentProjectsSection } from './RecentProjectsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ClientLogosSection } from './ClientLogosSection';
import { GlobalEcosystemSection } from './GlobalEcosystemSection';
import { GlobalTrustSection } from './GlobalTrustSection';
import { LatestNewsSection } from './LatestNewsSection';
import { Footer } from './Footer';

import { TeamMemberProfilePage } from './TeamMemberProfilePage';
import { ProjectDetailPage } from './ProjectDetailPage';
import { BlogDetailPage } from './BlogDetailPage';
import { AuthPage } from './AuthPage';
import { UserProfilePage } from './UserProfilePage';
import { AdminDashboard } from './AdminDashboard';
import { AboutUsPage } from './AboutUsPage';
import { ContactUsPage } from './ContactUsPage';
import { ServiceDetailPage } from './ServiceDetailPage';
import { Breadcrumb } from './Breadcrumb';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfServicePage } from './TermsOfServicePage';

import {
  initialProjects,
  initialTeamMembers,
  initialBlogPosts,
  initialInquiries,
  initialServices,
  initialSiteSettings,
  initialTestimonialsData,
} from '../data/initialData';

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
import { LanguageProvider } from '../context/LanguageContext';

function MainAppContent() {
  // ─── Navigation ────────────────────────────────────────────────────────────
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(undefined);

  // ─── Core Data State ────────────────────────────────────────────────────────
  const [projects, setProjects]         = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers]   = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs]               = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries]       = useState<Inquiry[]>(initialInquiries);
  const [services, setServices]         = useState<ServiceDetail[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonialsData);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);

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

  // ─── Auth ───────────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // ─── Selected Item State ────────────────────────────────────────────────────
  const [selectedProject, setSelectedProject]     = useState<Project | null>(initialProjects[0]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(initialTeamMembers[0]);
  const [selectedBlog, setSelectedBlog]           = useState<BlogPost | null>(initialBlogPosts[0]);
  const [selectedService, setSelectedService]     = useState<ServiceDetail | null>(initialServices[0]);
  const [leadName, setLeadName]                   = useState<string | undefined>(undefined);
  const [leadProject, setLeadProject]             = useState<string | undefined>(undefined);

  // ─── Hash Routing for Admin ────────────────────────────────────────────────
  useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '');
        const params = new URLSearchParams(window.location.search);
        if (hash === 'admin' || params.get('view') === 'admin') {
          setCurrentView('admin');
        } else if (hash === 'home' && currentView === 'admin') {
          setCurrentView('home');
        }
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleNavigate = (view: string, subParam?: string) => {
    const targetView = view === 'quote' ? 'contact' : view;

    if (targetView === 'services' && subParam && subParam.startsWith('serv-')) {
      const found = services.find((s) => s.id === subParam);
      if (found) {
        setSelectedService(found);
        setCurrentView('service-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    if (targetView === 'service-detail' && subParam) {
      const found = services.find((s) => s.id === subParam);
      if (found) setSelectedService(found);
    }

    setCurrentView(targetView);
    if (subParam) setActiveServiceId(subParam);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Inquiry ────────────────────────────────────────────────────────────────
  const handleInquirySuccess = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    if (currentUser) {
      setCurrentUser({ ...currentUser, inquiries: [...currentUser.inquiries, newInquiry] });
    }
  };

  // ─── Auth ───────────────────────────────────────────────────────────────────
  const handleLoginSuccess  = (user: UserProfile) => setCurrentUser(user);
  const handleLogout = () => {
    setCurrentUser(null);
    if (currentView === 'admin' || currentView === 'profile') setCurrentView('home');
  };

  // ─── Projects CRUD ──────────────────────────────────────────────────────────
  const handleAddProject = (data: Partial<Project>) => {
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

  const handleUpdateProject = (id: string, data: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const handleUpdateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const handleDeleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  // ─── Team CRUD ───────────────────────────────────────────────────────────────
  const handleAddTeamMember = (data: Partial<TeamMember>) => {
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

  const handleUpdateTeamMember = (id: string, data: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  };

  const handleDeleteTeamMember = (id: string) => setTeamMembers((prev) => prev.filter((m) => m.id !== id));

  // ─── Blog CRUD ───────────────────────────────────────────────────────────────
  const handleAddBlog = (data: Partial<BlogPost>) => {
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

  const handleUpdateBlog = (id: string, data: Partial<BlogPost>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const handleDeleteBlog    = (id: string) => setBlogs((prev) => prev.filter((b) => b.id !== id));
  const handleLikeBlog      = (id: string) => setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b)));

  // ─── Services CRUD ───────────────────────────────────────────────────────────
  const handleAddService = (data: Partial<ServiceDetail>) => {
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

  const handleUpdateService = (id: string, data: Partial<ServiceDetail>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const handleDeleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  // ─── Testimonials CRUD ───────────────────────────────────────────────────────
  const handleAddTestimonial = (data: Partial<Testimonial>) => {
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

  const handleUpdateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const handleDeleteTestimonial = (id: string) => setTestimonials((prev) => prev.filter((t) => t.id !== id));

  // ─── Inquiry Status ──────────────────────────────────────────────────────────
  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const handleDeleteInquiry = (id: string) => setInquiries((prev) => prev.filter((i) => i.id !== id));

  // ─── Site Settings ───────────────────────────────────────────────────────────
  const handleUpdateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('webdev_site_settings', JSON.stringify(settings));
      } catch (e) {
        console.error('Failed to persist siteSettings', e);
      }
    }
  };

  // ─── Admin View ──────────────────────────────────────────────────────────────
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        projects={projects}
        teamMembers={teamMembers}
        blogs={blogs}
        inquiries={inquiries}
        services={services}
        testimonials={testimonials}
        siteSettings={siteSettings}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onUpdateProjectStatus={handleUpdateProjectStatus}
        onDeleteProject={handleDeleteProject}
        onAddTeamMember={handleAddTeamMember}
        onUpdateTeamMember={handleUpdateTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onAddBlog={handleAddBlog}
        onUpdateBlog={handleUpdateBlog}
        onDeleteBlog={handleDeleteBlog}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onAddService={handleAddService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onAddTestimonial={handleAddTestimonial}
        onUpdateTestimonial={handleUpdateTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        onUpdateSiteSettings={handleUpdateSiteSettings}
        onClose={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Instrument_Sans'] antialiased selection:bg-[#BBE7F1] selection:text-slate-950">

      {/* 1. Top Bar */}
      <TopBar />

      {/* 2. Navbar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              slides={siteSettings.heroSlides}
              onOpenQuote={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
              onExploreServices={() => handleNavigate('services')}
              onContactClick={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
              onNavigateProjects={() => handleNavigate('projects')}
            />

            <ServiceFeatureCards
              onSelectFeature={(featureId) => {
                const map: Record<string, string> = {
                  'feat-mern': 'serv-1',
                  'feat-server': 'serv-2',
                  'feat-ecommerce': 'serv-3',
                  'feat-cms': 'serv-4',
                  'feat-global': 'serv-1'
                };
                const targetId = map[featureId] || 'serv-1';
                const found = services.find((s) => s.id === targetId) || services[0];
                setSelectedService(found);
                handleNavigate('service-detail');
              }}
            />

            <WhoWeBring onAboutClick={() => handleNavigate('about')} />

            <OurServicesSection
              services={services}
              onSelectService={(serviceId) => {
                const found = services.find((s) => s.id === serviceId) || services[0];
                setSelectedService(found);
                handleNavigate('service-detail');
              }}
              onViewAllServices={() => handleNavigate('services')}
            />

            <MeetOurTeamSection
              teamMembers={teamMembers}
              onSelectMember={(member) => { setSelectedTeamMember(member); handleNavigate('team-member'); }}
              onViewAllTeam={() => handleNavigate('team')}
            />

            <GlobalTrustSection
              onOpenQuote={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
              onExplorePortfolio={() => handleNavigate('portfolio')}
            />

            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => { setSelectedProject(project); handleNavigate('project-detail'); }}
              onViewAllProjects={() => handleNavigate('portfolio')}
            />

            <TestimonialsSection testimonials={testimonials} />

            <GlobalEcosystemSection />

            <LatestNewsSection
              blogs={blogs}
              onSelectBlog={(blog) => { setSelectedBlog(blog); handleNavigate('blog-detail'); }}
              onViewAllBlogs={() => handleNavigate('blog')}
            />
          </>
        )}

        {/* About */}
        {currentView === 'about' && (
          <AboutUsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenQuote={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
            onExploreTeam={() => handleNavigate('team')}
          />
        )}

        {/* Services */}
        {currentView === 'services' && (
          <div>
            <Breadcrumb
              badge="ENTERPRISE CAPABILITIES"
              title="All IT & Cloud Services"
              subtitle="Full-stack web engineering, cloud infrastructure, AI integrations & bespoke enterprise software development."
              items={[
                { label: 'Home', onClick: () => handleNavigate('home') },
                { label: 'All IT & Cloud Services', active: true }
              ]}
              backAction={() => handleNavigate('home')}
              backLabel="Back to Home"
              align="left"
            />
            <div className="py-8">
              <OurServicesSection
                services={services}
                onSelectService={(serviceId) => {
                  const found = services.find((s) => s.id === serviceId) || services[0];
                  setSelectedService(found);
                  handleNavigate('service-detail');
                }}
                onViewAllServices={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
              />
            </div>
          </div>
        )}

        {/* Service Detail */}
        {currentView === 'service-detail' && (
          <ServiceDetailPage
            service={selectedService}
            onBack={() => handleNavigate('services')}
            onBackToHome={() => handleNavigate('home')}
            onRequestQuote={(serviceTitle) => { setLeadName(undefined); setLeadProject(serviceTitle); handleNavigate('contact'); }}
            onSelectService={(serviceId) => {
              const found = services.find((s) => s.id === serviceId);
              if (found) { setSelectedService(found); handleNavigate('service-detail'); }
            }}
            onSelectProject={(project) => { setSelectedProject(project); handleNavigate('project-detail'); }}
          />
        )}

        {/* Portfolio */}
        {currentView === 'portfolio' && (
          <div>
            <Breadcrumb
              badge="PROVEN DELIVERIES"
              title="Enterprise Projects & Case Studies"
              subtitle="Explore production-grade platforms, e-commerce architectures, and SaaS applications deployed across USA & Europe."
              items={[
                { label: 'Home', onClick: () => handleNavigate('home') },
                { label: 'Projects & Case Studies', active: true }
              ]}
              backAction={() => handleNavigate('home')}
              backLabel="Back to Home"
              align="left"
            />
            <div className="py-8">
              <RecentProjectsSection
                projects={projects}
                onSelectProject={(project) => { setSelectedProject(project); handleNavigate('project-detail'); }}
                onViewAllProjects={() => { setLeadName(undefined); setLeadProject(undefined); handleNavigate('contact'); }}
              />
            </div>
          </div>
        )}

        {/* Team */}
        {currentView === 'team' && (
          <div>
            <Breadcrumb
              badge="EXECUTIVE LEADERSHIP & CORE ENGINEERS"
              title="Engineering Team & Technical Leadership"
              subtitle="Senior software architects, full-stack engineers, and cloud infrastructure specialists delivering enterprise digital solutions."
              items={[
                { label: 'Home', onClick: () => handleNavigate('home') },
                { label: 'Engineering Team & Leadership', active: true }
              ]}
              backAction={() => handleNavigate('home')}
              backLabel="Back to Home"
              align="left"
            />
            <div className="py-8">
              <MeetOurTeamSection
                teamMembers={teamMembers}
                onSelectMember={(member) => { setSelectedTeamMember(member); handleNavigate('team-member'); }}
                onViewAllTeam={() => {}}
              />
            </div>
          </div>
        )}

        {/* Team Member Profile */}
        {currentView === 'team-member' && (
          <TeamMemberProfilePage
            member={selectedTeamMember}
            onBack={() => handleNavigate('team')}
            onBackToHome={() => handleNavigate('home')}
            onContactLead={(memberName) => { setLeadName(memberName); setLeadProject(undefined); handleNavigate('contact'); }}
            onSelectProject={(projectTitle) => {
              const matched = projects.find((p) => p.title.toLowerCase().includes(projectTitle.toLowerCase()));
              if (matched) { setSelectedProject(matched); handleNavigate('project-detail'); }
              else handleNavigate('portfolio');
            }}
          />
        )}

        {/* Project Detail */}
        {currentView === 'project-detail' && (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handleNavigate('portfolio')}
            onBackToHome={() => handleNavigate('home')}
            onGetQuoteForSimilar={(projectTitle) => { setLeadName(undefined); setLeadProject(projectTitle); handleNavigate('contact'); }}
          />
        )}

        {/* Blog */}
        {currentView === 'blog' && (
          <div>
            <Breadcrumb
              badge="ENGINEERING BLOG"
              title="Technical Insights & News"
              subtitle="Deep dives on distributed systems, modern web architecture, cloud deployment, and engineering best practices."
              items={[
                { label: 'Home', onClick: () => handleNavigate('home') },
                { label: 'Technical Insights & News', active: true }
              ]}
              backAction={() => handleNavigate('home')}
              backLabel="Back to Home"
              align="left"
            />
            <div className="py-8">
              <LatestNewsSection
                blogs={blogs}
                onSelectBlog={(blog) => { setSelectedBlog(blog); handleNavigate('blog-detail'); }}
                onViewAllBlogs={() => {}}
              />
            </div>
          </div>
        )}

        {/* Blog Detail */}
        {currentView === 'blog-detail' && (
          <BlogDetailPage
            blog={selectedBlog}
            onBack={() => handleNavigate('blog')}
            onBackToHome={() => handleNavigate('home')}
            onLike={handleLikeBlog}
          />
        )}

        {/* Contact */}
        {(currentView === 'contact' || currentView === 'quote') && (
          <ContactUsPage
            onBackToHome={() => handleNavigate('home')}
            onSubmitSuccess={handleInquirySuccess}
            initialLeadName={leadName}
            initialProjectTitle={leadProject}
          />
        )}

        {/* Auth */}
        {currentView === 'auth' && (
          <AuthPage
            onBack={() => handleNavigate('home')}
            onLoginSuccess={(user) => { handleLoginSuccess(user); handleNavigate('profile'); }}
          />
        )}

        {/* Profile */}
        {currentView === 'profile' && (
          currentUser ? (
            <UserProfilePage
              currentUser={currentUser}
              onBack={() => handleNavigate('home')}
              onUpdateProfile={(updated) => setCurrentUser(updated)}
              onLogout={handleLogout}
              userInquiries={inquiries.filter((inq) => inq.email.toLowerCase() === currentUser.email.toLowerCase())}
            />
          ) : (
            <AuthPage
              onBack={() => handleNavigate('home')}
              onLoginSuccess={(user) => { handleLoginSuccess(user); handleNavigate('profile'); }}
            />
          )
        )}

        {/* Privacy Policy */}
        {currentView === 'privacy' && (
          <PrivacyPolicyPage
            content={siteSettings.privacyPolicy}
            onBack={() => handleNavigate('home')}
          />
        )}

        {/* Terms of Service */}
        {currentView === 'terms' && (
          <TermsOfServicePage
            content={siteSettings.termsOfService}
            onBack={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function MainApp() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
