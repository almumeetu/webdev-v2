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
import { GlobalTrustSection } from './GlobalTrustSection';
import { LatestNewsSection } from './LatestNewsSection';
import { CallToActionBanner } from './CallToActionBanner';
import { Footer } from './Footer';

import { TeamMemberProfilePage } from './TeamMemberProfilePage';
import { ProjectDetailPage } from './ProjectDetailPage';
import { BlogDetailPage } from './BlogDetailPage';
import { AuthPage } from './AuthPage';
import { ParallaxShowcaseSection } from './ParallaxShowcaseSection';
import { UserProfilePage } from './UserProfilePage';
import { AdminDashboard } from './AdminDashboard';
import { AboutUsPage } from './AboutUsPage';
import { ContactUsPage } from './ContactUsPage';
import { ServiceDetailPage } from './ServiceDetailPage';
import { Breadcrumb } from './Breadcrumb';

import { 
  initialProjects, 
  initialTeamMembers, 
  initialBlogPosts, 
  initialInquiries,
  initialServices
} from '../data/initialData';

import { 
  Project, 
  TeamMember, 
  BlogPost, 
  Inquiry, 
  UserProfile,
  ServiceDetail
} from '../types';
import { LanguageProvider } from '../context/LanguageContext';

function MainAppContent() {
  // Navigation View State ('home' | 'about' | 'services' | 'portfolio' | 'team' | 'team-member' | 'project-detail' | 'blog' | 'blog-detail' | 'quote' | 'auth' | 'profile' | 'admin')
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(undefined);

  // Core Data State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  // Current Logged-in User (Google Auth)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Dedicated Page Selection States (NO MODALS)
  const [selectedProject, setSelectedProject] = useState<Project | null>(initialProjects[0]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(initialTeamMembers[0]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(initialBlogPosts[0]);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(initialServices[0]);
  const [leadName, setLeadName] = useState<string | undefined>(undefined);
  const [leadProject, setLeadProject] = useState<string | undefined>(undefined);

  // Navigation Handler
  const handleNavigate = (view: string, subParam?: string) => {
    const targetView = view === 'quote' ? 'contact' : view;

    // If navigating to services with a specific service ID (e.g. from dropdown or footer)
    if (targetView === 'services' && subParam && subParam.startsWith('serv-')) {
      const found = initialServices.find((s) => s.id === subParam);
      if (found) {
        setSelectedService(found);
        setCurrentView('service-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // If navigating to service-detail with a specific service ID
    if (targetView === 'service-detail' && subParam) {
      const found = initialServices.find((s) => s.id === subParam);
      if (found) {
        setSelectedService(found);
      }
    }

    setCurrentView(targetView);
    if (subParam) {
      setActiveServiceId(subParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inquiry Submission
  const handleInquirySuccess = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        inquiries: [...currentUser.inquiries, newInquiry]
      });
    }
  };

  // Google Auth Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (currentView === 'admin' || currentView === 'profile') {
      setCurrentView('home');
    }
  };

  // Admin Project CRUD Operations
  const handleAddProject = (newProjData: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: newProjData.title || 'Enterprise Solution',
      category: newProjData.category || 'Full Stack & MERN',
      status: newProjData.status || 'ongoing',
      clientCountry: newProjData.clientCountry || 'Germany',
      clientName: newProjData.clientName || 'Partner Client',
      completionDate: '2026',
      image: newProjData.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      description: newProjData.description || 'Full-stack application engineered by WebDev Software Solutions.',
      techStack: newProjData.techStack || ['React 19', 'Node.js', 'Express', 'MongoDB'],
      features: newProjData.features || ['Modular microservices', 'GDPR compliance', 'Fast loading']
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Admin Team CRUD Operations
  const handleAddTeamMember = (newMemData: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: newMemData.name || 'New Engineer',
      role: newMemData.role || 'Senior Full-Stack Developer',
      branch: newMemData.branch || 'Joypurhat, Bangladesh',
      image: newMemData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: newMemData.bio || 'Experienced software engineer at WebDev Software Solutions.',
      skills: newMemData.skills || ['Full-Stack MERN', 'TypeScript', 'Node.js'],
      email: newMemData.email || 'engineer@webdevsoftware.com',
      experienceYears: newMemData.experienceYears || 5
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Admin Blog CRUD Operations
  const handleAddBlog = (newBlogData: Partial<BlogPost>) => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlogData.title || 'New Engineering Article',
      slug: (newBlogData.title || 'engineering-article').toLowerCase().replace(/\s+/g, '-'),
      excerpt: newBlogData.excerpt || 'Technical breakdown from WebDev Software Solutions engineering team.',
      content: newBlogData.content || 'Content coming soon.',
      author: newBlogData.author || 'Engineering Team',
      authorRole: newBlogData.authorRole || 'Senior Architect',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      category: newBlogData.category || 'Engineering',
      tags: newBlogData.tags || ['Next.js', 'React', 'Cloud'],
      image: newBlogData.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      likes: 0
    };
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Blog Like
  const handleLikeBlog = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  // If Admin View is active
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        projects={projects}
        teamMembers={teamMembers}
        blogs={blogs}
        inquiries={inquiries}
        onAddProject={handleAddProject}
        onUpdateProjectStatus={handleUpdateProjectStatus}
        onDeleteProject={handleDeleteProject}
        onAddTeamMember={handleAddTeamMember}
        onDeleteTeamMember={handleDeleteTeamMember}
        onAddBlog={handleAddBlog}
        onDeleteBlog={handleDeleteBlog}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onClose={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Plus_Jakarta_Sans'] antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* 1. Top Bar matching original v2 */}
      <TopBar />

      {/* 2. Main Navigation Bar with Dropdowns and Auth Status */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenQuote={() => {
          setLeadName(undefined);
          setLeadProject(undefined);
          handleNavigate('contact');
        }}
        onOpenAuth={() => handleNavigate('auth')}
        onOpenProfile={() => handleNavigate('profile')}
        currentUser={currentUser}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Slider matching original v2 with official banner backgrounds */}
            <Hero
              onOpenQuote={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }}
              onExploreServices={() => handleNavigate('services')}
            />

            {/* Client Logos Banner with REAL WebDev Brands */}
            <ClientLogosSection />

            {/* Service Feature Cards */}
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
                const found = initialServices.find((s) => s.id === targetId) || initialServices[0];
                setSelectedService(found);
                handleNavigate('service-detail');
              }}
            />

            {/* Who We Bring With You (About Overview) */}
            <WhoWeBring
              onAboutClick={() => handleNavigate('about')}
            />

            {/* Our Services Section */}
            <OurServicesSection
              onSelectService={(serviceId) => {
                const found = initialServices.find((s) => s.id === serviceId) || initialServices[0];
                setSelectedService(found);
                handleNavigate('service-detail');
              }}
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Meet Our Executive Team & Leadership */}
            <MeetOurTeamSection
              teamMembers={teamMembers}
              onSelectMember={(member) => {
                setSelectedTeamMember(member);
                handleNavigate('team-member');
              }}
              onViewAllTeam={() => handleNavigate('team')}
            />

            {/* Compact Global Client Trust & Compliance */}
            <GlobalTrustSection
              onOpenQuote={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }}
              onExplorePortfolio={() => handleNavigate('portfolio')}
            />

            {/* High-Performance 60fps Parallax Engineering Showcase */}
            <ParallaxShowcaseSection
              onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }}
            />

            {/* Recent & Ongoing Projects with Smooth Running Marquee Slider */}
            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => {
                setSelectedProject(project);
                handleNavigate('project-detail');
              }}
              onViewAllProjects={() => handleNavigate('portfolio')}
            />

            {/* Verified International Testimonials */}
            <TestimonialsSection />

            {/* Latest News and Insights */}
            <LatestNewsSection
              blogs={blogs}
              onSelectBlog={(blog) => {
                setSelectedBlog(blog);
                handleNavigate('blog-detail');
              }}
              onViewAllBlogs={() => handleNavigate('blog')}
            />

            {/* Call to Action Banner */}
            <CallToActionBanner
              onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }}
            />
          </>
        )}

        {/* Dedicated About Us Page */}
        {currentView === 'about' && (
          <AboutUsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenQuote={() => {
              setLeadName(undefined);
              setLeadProject(undefined);
              handleNavigate('contact');
            }}
            onExploreTeam={() => handleNavigate('team')}
          />
        )}

        {/* Dedicated Services Page */}
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
                onSelectService={(serviceId) => {
                  const found = initialServices.find((s) => s.id === serviceId) || initialServices[0];
                  setSelectedService(found);
                  handleNavigate('service-detail');
                }}
                onViewAllServices={() => {
                  setLeadName(undefined);
                  setLeadProject(undefined);
                  handleNavigate('contact');
                }}
              />
              <CallToActionBanner onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }} />
            </div>
          </div>
        )}

        {/* Dedicated Service Specification Detail Page (NO MODALS) */}
        {currentView === 'service-detail' && (
          <ServiceDetailPage
            service={selectedService}
            onBack={() => handleNavigate('services')}
            onBackToHome={() => handleNavigate('home')}
            onRequestQuote={(serviceTitle) => {
              setLeadName(undefined);
              setLeadProject(serviceTitle);
              handleNavigate('contact');
            }}
            onSelectService={(serviceId) => {
              const found = initialServices.find((s) => s.id === serviceId);
              if (found) {
                setSelectedService(found);
                handleNavigate('service-detail');
              }
            }}
            onSelectProject={(project) => {
              setSelectedProject(project);
              handleNavigate('project-detail');
            }}
          />
        )}

        {/* Dedicated Portfolio Page (Recent & Ongoing Works) */}
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
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  handleNavigate('project-detail');
                }}
                onViewAllProjects={() => {
                  setLeadName(undefined);
                  setLeadProject(undefined);
                  handleNavigate('contact');
                }}
              />
              <CallToActionBanner onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }} />
            </div>
          </div>
        )}

        {/* Dedicated Team Page */}
        {currentView === 'team' && (
          <div>
            <Breadcrumb
              badge="EUROPEAN & GLOBAL TALENT"
              title="Engineering Team & Leadership"
              subtitle="Senior software architects, MERN engineers, and technical leadership based in Leverkusen, Germany & global R&D development squads."
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
                onSelectMember={(member) => {
                  setSelectedTeamMember(member);
                  handleNavigate('team-member');
                }}
                onViewAllTeam={() => {}}
              />
              <CallToActionBanner onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }} />
            </div>
          </div>
        )}

        {/* Dedicated Team Member Specialist Profile Page (NO MODALS) */}
        {currentView === 'team-member' && (
          <TeamMemberProfilePage
            member={selectedTeamMember}
            onBack={() => handleNavigate('team')}
            onBackToHome={() => handleNavigate('home')}
            onContactLead={(memberName) => {
              setLeadName(memberName);
              setLeadProject(undefined);
              handleNavigate('contact');
            }}
            onSelectProject={(projectTitle) => {
              const matchedProj = projects.find((p) =>
                p.title.toLowerCase().includes(projectTitle.toLowerCase())
              );
              if (matchedProj) {
                setSelectedProject(matchedProj);
                handleNavigate('project-detail');
              } else {
                handleNavigate('portfolio');
              }
            }}
          />
        )}

        {/* Dedicated Project Case Study Detail Page (NO MODALS) */}
        {currentView === 'project-detail' && (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handleNavigate('portfolio')}
            onBackToHome={() => handleNavigate('home')}
            onGetQuoteForSimilar={(projectTitle) => {
              setLeadName(undefined);
              setLeadProject(projectTitle);
              handleNavigate('contact');
            }}
          />
        )}

        {/* Dedicated Blog Page */}
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
                onSelectBlog={(blog) => {
                  setSelectedBlog(blog);
                  handleNavigate('blog-detail');
                }}
                onViewAllBlogs={() => {}}
              />
              <CallToActionBanner onContactClick={() => {
                setLeadName(undefined);
                setLeadProject(undefined);
                handleNavigate('contact');
              }} />
            </div>
          </div>
        )}

        {/* Dedicated Blog Article Detail Page (NO MODALS) */}
        {currentView === 'blog-detail' && (
          <BlogDetailPage
            blog={selectedBlog}
            onBack={() => handleNavigate('blog')}
            onBackToHome={() => handleNavigate('home')}
            onLike={handleLikeBlog}
          />
        )}

        {/* Dedicated Contact Us Page (handles all contact, budget inquiries, and direct consultations) */}
        {(currentView === 'contact' || currentView === 'quote') && (
          <ContactUsPage
            onBackToHome={() => handleNavigate('home')}
            onSubmitSuccess={handleInquirySuccess}
            initialLeadName={leadName}
            initialProjectTitle={leadProject}
          />
        )}

        {/* Dedicated Authentication Page (NO MODALS) */}
        {currentView === 'auth' && (
          <AuthPage
            onBack={() => handleNavigate('home')}
            onLoginSuccess={(user) => {
              handleLoginSuccess(user);
              handleNavigate('profile');
            }}
          />
        )}

        {/* Dedicated User Profile Page (NO MODALS) */}
        {currentView === 'profile' && (
          currentUser ? (
            <UserProfilePage
              currentUser={currentUser}
              onBack={() => handleNavigate('home')}
              onUpdateProfile={(updated) => setCurrentUser(updated)}
              onLogout={handleLogout}
              userInquiries={inquiries.filter(
                (inq) => inq.email.toLowerCase() === currentUser.email.toLowerCase()
              )}
            />
          ) : (
            <AuthPage
              onBack={() => handleNavigate('home')}
              onLoginSuccess={(user) => {
                handleLoginSuccess(user);
                handleNavigate('profile');
              }}
            />
          )
        )}
      </main>

      {/* 3. Global Footer matching original v2 */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => {
          setLeadName(undefined);
          setLeadProject(undefined);
          handleNavigate('contact');
        }}
      />

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
