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
import { LatestNewsSection } from './LatestNewsSection';
import { CallToActionBanner } from './CallToActionBanner';
import { Footer } from './Footer';

import { QuoteInquiryModal } from './QuoteInquiryModal';
import { GoogleAuthModal } from './GoogleAuthModal';
import { UserProfileModal } from './UserProfileModal';
import { ProjectDetailModal } from './ProjectDetailModal';
import { TeamDetailModal } from './TeamDetailModal';
import { BlogDetailModal } from './BlogDetailModal';
import { AdminDashboard } from './AdminDashboard';
import { AboutUsPage } from './AboutUsPage';

import { 
  initialProjects, 
  initialTeamMembers, 
  initialBlogPosts, 
  initialInquiries 
} from '../data/initialData';

import { 
  Project, 
  TeamMember, 
  BlogPost, 
  Inquiry, 
  UserProfile 
} from '../types';

export function MainApp() {
  // Navigation View State ('home' | 'about' | 'services' | 'portfolio' | 'team' | 'blog' | 'admin')
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string | undefined>(undefined);

  // Core Data State
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
        onOpenQuote={() => setIsQuoteModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Slider matching original v2 */}
            <Hero
              onOpenQuote={() => setIsQuoteModalOpen(true)}
              onExploreServices={() => handleNavigate('services')}
            />

            {/* Service Feature Cards matching original v2 */}
            <ServiceFeatureCards
              onSelectFeature={() => {
                handleNavigate('portfolio');
              }}
            />

            {/* Who We Bring With You matching original v2 */}
            <WhoWeBring
              onAboutClick={() => handleNavigate('about')}
            />

            {/* Our Services Section matching original v2 */}
            <OurServicesSection
              onSelectService={() => {
                setIsQuoteModalOpen(true);
              }}
              onViewAllServices={() => handleNavigate('services')}
            />

            {/* Technology Index & Experience Progress matching original v2 */}
            <TechnologyIndexSection />

            {/* Meet Our Team Section matching original v2 with REAL WebDev Team */}
            <MeetOurTeamSection
              teamMembers={teamMembers}
              onSelectMember={(member) => setSelectedTeamMember(member)}
              onViewAllTeam={() => handleNavigate('team')}
            />

            {/* Working Process matching original v2 */}
            <WorkingProcessSection />

            {/* FAQs & 10+ Years Experience matching original v2 */}
            <FaqAndExperienceSection />

            {/* Recent & Ongoing Launched Projects matching original v2 */}
            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
              onViewAllProjects={() => handleNavigate('portfolio')}
            />

            {/* Testimonials matching original v2 */}
            <TestimonialsSection />

            {/* Client Logos Banner with REAL WebDev Brands */}
            <ClientLogosSection />

            {/* Latest News and Insights matching original v2 */}
            <LatestNewsSection
              blogs={blogs}
              onSelectBlog={(blog) => setSelectedBlog(blog)}
              onViewAllBlogs={() => handleNavigate('blog')}
            />

            {/* Call to Action Banner matching original v2 */}
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
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block cursor-pointer"
              >
                ← Back to Home Overview
              </button>
            </div>
            <OurServicesSection
              onSelectService={() => setIsQuoteModalOpen(true)}
              onViewAllServices={() => setIsQuoteModalOpen(true)}
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
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block cursor-pointer"
              >
                ← Back to Home Overview
              </button>
            </div>
            <RecentProjectsSection
              projects={projects}
              onSelectProject={(project) => setSelectedProject(project)}
              onViewAllProjects={() => setIsQuoteModalOpen(true)}
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
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block cursor-pointer"
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
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider mb-2 inline-block cursor-pointer"
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

      {/* 3. Global Footer matching original v2 */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => setIsQuoteModalOpen(true)}
      />

      {/* MODALS */}
      {/* Quote / Cost Estimator Modal matching original v2 */}
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
        onContactLead={() => {
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
