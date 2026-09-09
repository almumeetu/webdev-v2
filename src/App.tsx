/**
 * WebDev Software Solutions - Full Stack Web Application
 * Headquarters: Joypurhat, Bangladesh
 * European Branch: Leverkusen, Germany
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceFeatureCards } from './components/ServiceFeatureCards';
import { WhoWeBring } from './components/WhoWeBring';
import { OurServicesSection } from './components/OurServicesSection';
import { TechnologyIndexSection } from './components/TechnologyIndexSection';
import { MeetOurTeamSection } from './components/MeetOurTeamSection';
import { WorkingProcessSection } from './components/WorkingProcessSection';
import { FaqAndExperienceSection } from './components/FaqAndExperienceSection';
import { RecentProjectsSection } from './components/RecentProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ClientLogosSection } from './components/ClientLogosSection';
import { LatestNewsSection } from './components/LatestNewsSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { Footer } from './components/Footer';

import { QuoteInquiryModal } from './components/QuoteInquiryModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutUsPage } from './components/AboutUsPage';

import { 
  initialProjects, 
  initialTeamMembers, 
  initialBlogPosts, 
  initialInquiries 
} from './data/initialData';

import { 
  Project, 
  TeamMember, 
  BlogPost, 
  Inquiry, 
  UserProfile, 
  ProjectStatus 
} from './types';

export default function App() {
  // Navigation View State ('home' | 'about' | 'services' | 'portfolio' | 'team' | 'blog' | 'admin')
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(undefined);

  // Core Data State (synced with Express API)
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);

  // Current Logged-in User (Google Auth)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Modals State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Fetch initial data from Express API
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [projRes, teamRes, blogRes, inqRes] = await Promise.all([
          fetch('/api/projects').catch(() => null),
          fetch('/api/team').catch(() => null),
          fetch('/api/blogs').catch(() => null),
          fetch('/api/inquiries').catch(() => null),
        ]);

        if (projRes && projRes.ok) {
          const data = await projRes.json();
          if (Array.isArray(data) && data.length > 0) setProjects(data);
        }

        if (teamRes && teamRes.ok) {
          const data = await teamRes.json();
          if (Array.isArray(data) && data.length > 0) setTeamMembers(data);
        }

        if (blogRes && blogRes.ok) {
          const data = await blogRes.json();
          if (Array.isArray(data) && data.length > 0) setBlogs(data);
        }

        if (inqRes && inqRes.ok) {
          const data = await inqRes.json();
          if (Array.isArray(data) && data.length > 0) setInquiries(data);
        }
      } catch (e) {
        console.warn('Backend API warming up, using initial rich data bundle:', e);
      }
    };

    fetchApiData();
  }, []);

  // Navigation Handler
  const handleNavigate = (view: string, subParam?: string) => {
    setCurrentView(view);
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
    setIsProfileModalOpen(false);
    if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  // Admin Project CRUD Operations
  const handleAddProject = async (newProjData: Partial<Project>) => {
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

    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
    } catch (e) {
      console.error(e);
    }
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProjectStatus = async (id: string, status: ProjectStatus) => {
    try {
      await fetch(`/api/projects/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error(e);
    }
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Admin Team CRUD Operations
  const handleAddTeamMember = async (memberData: Partial<TeamMember>) => {
    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: memberData.name || 'Engineer',
      role: memberData.role || 'Full Stack Developer',
      branch: memberData.branch || 'Joypurhat, Bangladesh',
      image: memberData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: memberData.bio || 'Software specialist at WebDev Software Solutions.',
      skills: memberData.skills || ['React', 'Node.js', 'TypeScript'],
      experienceYears: memberData.experienceYears || 4,
      email: `${(memberData.name || 'member').toLowerCase().replace(/\s+/g, '.')}@webdevsoftware.com`
    };

    try {
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember)
      });
    } catch (e) {
      console.error(e);
    }
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const handleDeleteTeamMember = async (id: string) => {
    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setTeamMembers((prev) => prev.filter((t) => t.id !== id));
  };

  // Admin Blog CRUD Operations
  const handleAddBlog = async (blogData: Partial<BlogPost>) => {
    const title = blogData.title || 'Engineering Architecture Update';
    const newBlog: BlogPost = {
      id: `b-${Date.now()}`,
      title,
      slug: (blogData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')),
      category: blogData.category || 'Full Stack & MERN',
      date: 'Feb 2026',
      author: blogData.author || 'WebDev Engineering Team',
      authorRole: blogData.authorRole || 'Software Architect',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      excerpt: blogData.excerpt || 'Modern software engineering principles and high-availability server setup.',
      content: blogData.content || 'Comprehensive guide on modern scalable architecture.',
      tags: ['Engineering', 'MERN', 'Server'],
      likes: 12
    };

    try {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
    } catch (e) {
      console.error(e);
    }
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Blog Like
  const handleLikeBlog = async (id: string) => {
    try {
      await fetch(`/api/blogs/${id}/like`, { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error(e);
    }
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
      
      {/* 1. Top Bar matching Frame 00:00 - 00:02 */}
      <TopBar />

      {/* 2. Main Navigation Bar with Dropdowns and Auth Status */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Slider matching Frame 00:00 - 00:03 */}
            <Hero
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onExploreServices={() => handleNavigate('services')}
            />

            {/* Service Feature Cards matching Frame 00:03 - 00:04 */}
            <ServiceFeatureCards
              onSelectCategory={(cat) => {
                handleNavigate('portfolio');
              }}
            />

            {/* Who We Bring With You matching Frame 00:04 */}
            <WhoWeBring
              onLearnMore={() => handleNavigate('about')}
              onConsultUs={() => setIsQuoteModalOpen(true)}
            />

            {/* Our Services Section matching Frame 00:05 */}
            <OurServicesSection
              onSelectService={(servId) => {
                setIsQuoteModalOpen(true);
              }}
              onConsultation={() => setIsQuoteModalOpen(true)}
            />

            {/* Technology Index & Experience Progress matching Frame 00:06 */}
            <TechnologyIndexSection
              onStartProject={() => setIsQuoteModalOpen(true)}
            />

            {/* Meet Our Team Section matching Frame 00:07 */}
            <MeetOurTeamSection
              teamMembers={teamMembers}
              onSelectMember={(member) => setSelectedTeamMember(member)}
              onViewAllTeam={() => handleNavigate('team')}
            />

            {/* Working Process (3 Step numbered flow) matching Frame 00:07 */}
            <WorkingProcessSection
              onStartStep={() => setIsQuoteModalOpen(true)}
            />

            {/* FAQs & 10+ Years Experience matching Frame 00:08 */}
            <FaqAndExperienceSection />

            {/* Recent & Ongoing Launched Projects matching Frame 00:09 */}
            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
              onExploreMore={() => handleNavigate('portfolio')}
            />

            {/* Testimonials from Germany & Bangladesh Clients matching Frame 00:10 */}
            <TestimonialsSection />

            {/* Client Logos Banner matching Frame 00:10 */}
            <ClientLogosSection />

            {/* Latest News and Insights matching Frame 00:11 */}
            <LatestNewsSection
              blogs={blogs}
              onSelectBlog={(blog) => setSelectedBlog(blog)}
              onViewAllBlogs={() => handleNavigate('blog')}
            />

            {/* Call to Action Banner matching Frame 00:12 */}
            <CallToActionBanner
              onContactClick={() => setIsQuoteModalOpen(true)}
            />
          </>
        )}

        {/* Dedicated About Us Page */}
        {currentView === 'about' && (
          <AboutUsPage
            onBackToHome={() => handleNavigate('home')}
            onOpenQuote={() => setIsQuoteModalOpen(true)}
            onExploreTeam={() => handleNavigate('team')}
          />
        )}

        {/* Dedicated Services Page */}
        {currentView === 'services' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
              <button
                onClick={() => handleNavigate('home')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block"
              >
                ← Back to Home Overview
              </button>
            </div>
            <OurServicesSection
              onSelectService={() => setIsQuoteModalOpen(true)}
              onConsultation={() => setIsQuoteModalOpen(true)}
            />
            <CallToActionBanner onContactClick={() => setIsQuoteModalOpen(true)} />
          </div>
        )}

        {/* Dedicated Portfolio Page (Recent & Ongoing Works) */}
        {currentView === 'portfolio' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
              <button
                onClick={() => handleNavigate('home')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block"
              >
                ← Back to Home Overview
              </button>
            </div>
            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
              onExploreMore={() => setIsQuoteModalOpen(true)}
            />
            <CallToActionBanner onContactClick={() => setIsQuoteModalOpen(true)} />
          </div>
        )}

        {/* Dedicated Team Page */}
        {currentView === 'team' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
              <button
                onClick={() => handleNavigate('home')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block"
              >
                ← Back to Home Overview
              </button>
            </div>
            <MeetOurTeamSection
              teamMembers={teamMembers}
              onSelectMember={(member) => setSelectedTeamMember(member)}
              onViewAllTeam={() => {}}
            />
            <CallToActionBanner onContactClick={() => setIsQuoteModalOpen(true)} />
          </div>
        )}

        {/* Dedicated Blog Page */}
        {currentView === 'blog' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
              <button
                onClick={() => handleNavigate('home')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block"
              >
                ← Back to Home Overview
              </button>
            </div>
            <LatestNewsSection
              blogs={blogs}
              onSelectBlog={(blog) => setSelectedBlog(blog)}
              onViewAllBlogs={() => {}}
            />
            <CallToActionBanner onContactClick={() => setIsQuoteModalOpen(true)} />
          </div>
        )}
      </main>

      {/* 3. Global Footer matching Frame 00:12 */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* MODALS */}
      {/* Quote / Cost Estimator Modal matching Frame 00:07 */}
      <QuoteInquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitSuccess={handleInquirySuccess}
      />

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Profile Modal */}
      {currentUser && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          currentUser={currentUser}
          onUpdateProfile={(updated) => setCurrentUser(updated)}
          onLogout={handleLogout}
          userInquiries={inquiries.filter((inq) => inq.email.toLowerCase() === currentUser.email.toLowerCase())}
        />
      )}

      {/* Project Case Study Details Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onGetQuoteForSimilar={() => {
          setSelectedProject(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Team Specialist Details Modal */}
      <TeamDetailModal
        member={selectedTeamMember}
        onClose={() => setSelectedTeamMember(null)}
        onContactLead={(name) => {
          setSelectedTeamMember(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Blog Article Reader Modal */}
      <BlogDetailModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onLike={handleLikeBlog}
      />

    </div>
  );
}
