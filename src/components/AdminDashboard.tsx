import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  FileText, 
  MessageSquare, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Globe, 
  TrendingUp, 
  Search, 
  Edit3, 
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  AlertCircle,
  Settings,
  Save,
  X,
  Eye,
  Filter,
  Download,
  Upload,
  BarChart3,
  Package,
  Mail,
  Calendar,
  Tag,
  Link as LinkIcon,
  Image as ImageIcon,
  Menu,
  Phone,
  MapPin,
  Star,
  MessageCircle,
  Palette,
  FileCode2,
  Lock,
  ExternalLink,
  Grid,
  List,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Code,
  User
} from 'lucide-react';
import { Project, TeamMember, BlogPost, Inquiry, ProjectStatus, ServiceDetail, SiteSettings, Testimonial, HeroSlide } from '../types';
import { initialHeroSlides } from '../data/initialData';
import ImageDropZone from './ImageDropZone';

interface AdminDashboardProps {
  projects: Project[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  inquiries: Inquiry[];
  services?: ServiceDetail[];
  testimonials?: Testimonial[];
  siteSettings?: SiteSettings;
  onAddProject: (project: Partial<Project>) => void;
  onUpdateProject?: (id: string, project: Partial<Project>) => void;
  onUpdateProjectStatus: (id: string, status: ProjectStatus) => void;
  onDeleteProject: (id: string) => void;
  onAddTeamMember: (member: Partial<TeamMember>) => void;
  onUpdateTeamMember?: (id: string, member: Partial<TeamMember>) => void;
  onDeleteTeamMember: (id: string) => void;
  onAddBlog: (blog: Partial<BlogPost>) => void;
  onUpdateBlog?: (id: string, blog: Partial<BlogPost>) => void;
  onDeleteBlog: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteInquiry?: (id: string) => void;
  onAddService?: (service: Partial<ServiceDetail>) => void;
  onUpdateService?: (id: string, service: Partial<ServiceDetail>) => void;
  onDeleteService?: (id: string) => void;
  onAddTestimonial?: (t: Partial<Testimonial>) => void;
  onUpdateTestimonial?: (id: string, t: Partial<Testimonial>) => void;
  onDeleteTestimonial?: (id: string) => void;
  onUpdateSiteSettings?: (settings: SiteSettings) => void;
  onClose: () => void;
}

type TabType = 'overview' | 'projects' | 'inquiries' | 'team' | 'blogs' | 'services' | 'testimonials' | 'hero' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  teamMembers,
  blogs,
  inquiries,
  services = [],
  testimonials = [],
  siteSettings,
  onAddProject,
  onUpdateProject,
  onUpdateProjectStatus,
  onDeleteProject,
  onAddTeamMember,
  onUpdateTeamMember,
  onDeleteTeamMember,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onAddService,
  onUpdateService,
  onDeleteService,
  onAddTestimonial,
  onUpdateTestimonial,
  onDeleteTestimonial,
  onUpdateSiteSettings,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectViewMode, setProjectViewMode] = useState<'cards' | 'table'>('cards');
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack & MERN' as Project['category'],
    status: 'ongoing' as ProjectStatus,
    clientCountry: 'Germany' as Project['clientCountry'],
    clientName: '',
    techStack: '',
    description: '',
    image: '',
    liveUrl: '',
    features: '',
    metrics: '',
    completionDate: new Date().toISOString().split('T')[0]
  });

  // Team Member Form State
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    headline: '',
    branch: 'Joypurhat, Bangladesh' as TeamMember['branch'],
    location: '',
    bio: '',
    skills: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    experienceYears: 0,
    image: '',
    highlightedProjects: '',
    education: '',
    certifications: '',
    languages: ''
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: 'WebDev Engineering Team',
    authorRole: 'Tech Specialist',
    authorImage: '',
    image: '',
    readTime: '5 min read'
  });

  // Service Form State
  const [serviceForm, setServiceForm] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    iconName: 'Code',
    image: '',
    techs: '',
    features: '',
    deliverables: ''
  });

  // Testimonial Form State
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    avatar: '',
    country: '',
    flag: '',
    quote: '',
    rating: 5,
    verified: true
  });

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: '', role: '', company: '', avatar: '', country: '', flag: '', quote: '', rating: 5, verified: true });
    setEditingItem(null);
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Partial<Testimonial> = { ...testimonialForm };
    if (editingItem) {
      onUpdateTestimonial?.(editingItem.id, data);
    } else {
      onAddTestimonial?.({ ...data, id: `test-${Date.now()}` });
    }
    resetTestimonialForm();
    setShowTestimonialModal(false);
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingItem(t);
    setTestimonialForm({
      name: t.name, role: t.role, company: t.company, avatar: t.avatar,
      country: t.country, flag: t.flag, quote: t.quote, rating: t.rating, verified: t.verified
    });
    setShowTestimonialModal(true);
  };

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings ?? {
    companyName: 'WebDev Software Solutions',
    tagline: 'Enterprise-Grade Web Engineering · Germany & Bangladesh',
    logoUrl: '/images/logo/webdev-logo.png',
    heroSlides: initialHeroSlides,
    email: 'info@webdevsoftwaresolutions.com',
    phone_bd: '+880 1722-301927',
    phone_de: '+49 172 9766016',
    address_bd: 'Housing Estate, Ward No: 07, Joypurhat-5900, Bangladesh',
    address_de: 'Küppersteg, 51373 Leverkusen, NRW, Germany',
    socialLinks: { github: '', twitter: '', linkedin: '', whatsapp_bd: '', whatsapp_de: '' },
    privacyPolicy: '',
    termsOfService: '',
    footerAboutText: '',
    gdprBadgeText: ''
  });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [editingSlideIndex, setEditingSlideIndex] = useState(0);
  const [heroSlidesSaved, setHeroSlidesSaved] = useState(false);

  // Sync settingsForm when siteSettings prop changes
  React.useEffect(() => {
    if (siteSettings) {
      setSettingsForm(prev => ({
        ...siteSettings,
        heroSlides: siteSettings.heroSlides && siteSettings.heroSlides.length > 0
          ? siteSettings.heroSlides
          : (prev.heroSlides || initialHeroSlides)
      }));
    }
  }, [siteSettings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings?.(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleSaveHeroSlides = () => {
    onUpdateSiteSettings?.(settingsForm);
    setHeroSlidesSaved(true);
    setTimeout(() => setHeroSlidesSaved(false), 3000);
  };

  const handleUpdateCurrentSlide = (updatedSlide: Partial<HeroSlide>) => {
    const currentSlides = [...(settingsForm.heroSlides || initialHeroSlides)];
    currentSlides[editingSlideIndex] = {
      ...currentSlides[editingSlideIndex],
      ...updatedSlide
    };
    setSettingsForm(prev => ({
      ...prev,
      heroSlides: currentSlides
    }));
  };

  // Reset forms
  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      category: 'Full Stack & MERN',
      status: 'ongoing',
      clientCountry: 'Germany',
      clientName: '',
      techStack: '',
      description: '',
      image: '',
      liveUrl: '',
      features: '',
      metrics: '',
      completionDate: new Date().toISOString().split('T')[0]
    });
    setEditingItem(null);
  };

  const resetTeamForm = () => {
    setTeamForm({
      name: '',
      role: '',
      headline: '',
      branch: 'Joypurhat, Bangladesh',
      location: '',
      bio: '',
      skills: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      experienceYears: 0,
      image: '',
      highlightedProjects: '',
      education: '',
      certifications: '',
      languages: ''
    });
    setEditingItem(null);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      author: 'WebDev Engineering Team',
      authorRole: 'Tech Specialist',
      authorImage: '',
      image: '',
      readTime: '5 min read'
    });
    setEditingItem(null);
  };

  const resetServiceForm = () => {
    setServiceForm({
      title: '',
      shortDesc: '',
      fullDesc: '',
      iconName: 'Code',
      image: '',
      techs: '',
      features: '',
      deliverables: ''
    });
    setEditingItem(null);
  };

  // Handle Project CRUD
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      title: projectForm.title,
      category: projectForm.category,
      status: projectForm.status,
      clientCountry: projectForm.clientCountry,
      clientName: projectForm.clientName,
      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean),
      description: projectForm.description,
      image: projectForm.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      liveUrl: projectForm.liveUrl,
      features: projectForm.features.split('\n').map(s => s.trim()).filter(Boolean),
      metrics: projectForm.metrics,
      completionDate: projectForm.completionDate
    };

    if (editingItem) {
      onUpdateProject?.(editingItem.id, projectData);
    } else {
      onAddProject(projectData);
    }
    
    resetProjectForm();
    setShowProjectModal(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingItem(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      status: project.status,
      clientCountry: project.clientCountry,
      clientName: project.clientName,
      techStack: project.techStack.join(', '),
      description: project.description,
      image: project.image,
      liveUrl: project.liveUrl || '',
      features: project.features.join('\n'),
      metrics: project.metrics || '',
      completionDate: project.completionDate
    });
    setShowProjectModal(true);
  };

  // Handle Team CRUD
  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const teamData = {
      name: teamForm.name,
      role: teamForm.role,
      headline: teamForm.headline,
      branch: teamForm.branch,
      location: teamForm.location,
      bio: teamForm.bio,
      skills: teamForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      email: teamForm.email,
      phone: teamForm.phone,
      linkedin: teamForm.linkedin,
      github: teamForm.github,
      experienceYears: teamForm.experienceYears,
      image: teamForm.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      highlightedProjects: teamForm.highlightedProjects.split(',').map(s => s.trim()).filter(Boolean),
      education: teamForm.education.split('\n').map(s => s.trim()).filter(Boolean),
      certifications: teamForm.certifications.split('\n').map(s => s.trim()).filter(Boolean),
      languages: teamForm.languages.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingItem) {
      onUpdateTeamMember?.(editingItem.id, teamData);
    } else {
      onAddTeamMember(teamData);
    }
    
    resetTeamForm();
    setShowTeamModal(false);
  };

  const handleEditTeamMember = (member: TeamMember) => {
    setEditingItem(member);
    setTeamForm({
      name: member.name,
      role: member.role,
      headline: member.headline || '',
      branch: member.branch,
      location: member.location || '',
      bio: member.bio,
      skills: member.skills.join(', '),
      email: member.email,
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      experienceYears: member.experienceYears,
      image: member.image,
      highlightedProjects: member.highlightedProjects?.join(', ') || '',
      education: member.education?.join('\n') || '',
      certifications: member.certifications?.join('\n') || '',
      languages: member.languages?.join(', ') || ''
    });
    setShowTeamModal(true);
  };

  // Handle Blog CRUD
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      category: blogForm.category,
      tags: blogForm.tags.split(',').map(s => s.trim()).filter(Boolean),
      author: blogForm.author,
      authorRole: blogForm.authorRole,
      authorImage: blogForm.authorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      image: blogForm.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
      readTime: blogForm.readTime,
      slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    if (editingItem) {
      onUpdateBlog?.(editingItem.id, blogData);
    } else {
      onAddBlog(blogData);
    }
    
    resetBlogForm();
    setShowBlogModal(false);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingItem(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(', '),
      author: blog.author,
      authorRole: blog.authorRole,
      authorImage: blog.authorImage,
      image: blog.image,
      readTime: blog.readTime
    });
    setShowBlogModal(true);
  };

  // Handle Service CRUD
  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      title: serviceForm.title,
      shortDesc: serviceForm.shortDesc,
      fullDesc: serviceForm.fullDesc,
      iconName: serviceForm.iconName,
      image: serviceForm.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      techs: serviceForm.techs.split(',').map(s => s.trim()).filter(Boolean),
      features: serviceForm.features.split('\n').map(s => s.trim()).filter(Boolean),
      deliverables: serviceForm.deliverables.split('\n').map(s => s.trim()).filter(Boolean)
    };

    if (editingItem) {
      onUpdateService?.(editingItem.id, serviceData);
    } else {
      onAddService?.(serviceData);
    }
    
    resetServiceForm();
    setShowServiceModal(false);
  };

  const handleEditService = (service: ServiceDetail) => {
    setEditingItem(service);
    setServiceForm({
      title: service.title,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc,
      iconName: service.iconName,
      image: service.image,
      techs: service.techs.join(', '),
      features: service.features.join('\n'),
      deliverables: service.deliverables.join('\n')
    });
    setShowServiceModal(true);
  };

  // Filtered and searched data
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projects, searchTerm, filterStatus, filterCategory]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inquiry => {
      const matchesSearch = inquiry.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, searchTerm, filterStatus]);

  const filteredTeam = useMemo(() => {
    return teamMembers.filter(member => {
      return member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [teamMembers, searchTerm]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, filterCategory]);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.techs.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [services, searchTerm]);

  // Statistics
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    ongoingProjects: projects.filter(p => p.status === 'ongoing').length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === 'new').length,
    contactedInquiries: inquiries.filter(i => i.status === 'contacted').length,
    inProgressInquiries: inquiries.filter(i => i.status === 'in_progress').length,
    completedInquiries: inquiries.filter(i => i.status === 'completed').length,
    totalTeam: teamMembers.length,
    bangladeshTeam: teamMembers.filter(m => m.branch === 'Joypurhat, Bangladesh').length,
    germanyTeam: teamMembers.filter(m => m.branch.includes('Germany')).length,
    totalBlogs: blogs.length,
    totalServices: services.length,
    germanyProjects: projects.filter(p => p.clientCountry === 'Germany').length,
    internationalProjects: projects.filter(p => p.clientCountry !== 'Germany').length
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex font-['Instrument_Sans']">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Fixed Sidebar (Daily.dev / Linear sleek dark style) */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-[#0c0d12] border-r border-white/[0.06] shadow-2xl flex flex-col z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Logo & Brand */}
        <div className="p-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#BBE7F1] p-2 rounded-md shadow-lg border border-[#9cd5e2]/30">
              <img 
                src="/images/logo/webdev-logo.png" 
                alt="WebDev" 
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold font-['Archivo'] text-white tracking-tight flex items-center gap-1.5">
                WebDev Admin
                <span className="text-[10px] px-1.5 py-0.2 bg-[#BBE7F1]/20 text-cyan-300 rounded border border-[#9cd5e2]/30 font-semibold">v2.0</span>
              </h1>
              <span className="text-[11px] text-zinc-500 block">Control Center</span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Create Pill Button (Mirrors '+ New post' in Reference Screenshot) */}
        <div className="px-3 pt-3 pb-1 relative">
          <button
            onClick={() => setCreateMenuOpen(!createMenuOpen)}
            className="w-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs tracking-wide py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
            <span>+ Create New</span>
          </button>

          {/* Quick Create Dropdown Menu */}
          {createMenuOpen && (
            <div className="absolute left-3 right-3 top-14 bg-[#161822] border border-white/10 rounded-lg shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
              <button
                onClick={() => {
                  setCreateMenuOpen(false);
                  setActiveTab('projects');
                  resetProjectForm();
                  setShowProjectModal(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.06] rounded-md transition-colors text-left cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>New Project</span>
              </button>
              <button
                onClick={() => {
                  setCreateMenuOpen(false);
                  setActiveTab('services');
                  resetServiceForm();
                  setShowServiceModal(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.06] rounded-md transition-colors text-left cursor-pointer"
              >
                <Package className="w-4 h-4 text-emerald-400" />
                <span>New Service</span>
              </button>
              <button
                onClick={() => {
                  setCreateMenuOpen(false);
                  setActiveTab('blogs');
                  resetBlogForm();
                  setShowBlogModal(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.06] rounded-md transition-colors text-left cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>New Blog Article</span>
              </button>
              <button
                onClick={() => {
                  setCreateMenuOpen(false);
                  setActiveTab('team');
                  resetTeamForm();
                  setShowTeamModal(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/[0.06] rounded-md transition-colors text-left cursor-pointer"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>New Team Member</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Sections (Grouped matching daily.dev reference) */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
          {/* Main Direct Navigation (Mirrors 'For You', 'Following', 'Happening Now') */}
          <div className="space-y-1">
            <SidebarItem
              active={activeTab === 'overview'}
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
            />
            <SidebarItem
              active={activeTab === 'projects'}
              onClick={() => {
                setActiveTab('projects');
                setSidebarOpen(false);
              }}
              icon={<Briefcase className="w-4 h-4" />}
              label="Projects"
              badge={stats.totalProjects}
            />
            <SidebarItem
              active={activeTab === 'services'}
              onClick={() => {
                setActiveTab('services');
                setSidebarOpen(false);
              }}
              icon={<Package className="w-4 h-4" />}
              label="Services"
              badge={stats.totalServices}
            />
            <SidebarItem
              active={activeTab === 'inquiries'}
              onClick={() => {
                setActiveTab('inquiries');
                setSidebarOpen(false);
              }}
              icon={<MessageSquare className="w-4 h-4" />}
              label="Inquiries"
              badge={stats.newInquiries}
              badgeType="alert"
            />
          </div>

          {/* Group 1: Editorial & Content (Mirrors 'Feeds v +' in screenshot) */}
          <div>
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              <button
                onClick={() => toggleSection('content')}
                className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>Editorial & Content</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collapsedSections['content'] ? '-rotate-90' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setActiveTab('blogs');
                  resetBlogForm();
                  setShowBlogModal(true);
                }}
                className="text-zinc-500 hover:text-white p-0.5 hover:bg-white/[0.06] rounded cursor-pointer transition-colors"
                title="Add Article"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {!collapsedSections['content'] && (
              <div className="mt-1 space-y-1">
                <SidebarItem
                  active={activeTab === 'blogs'}
                  onClick={() => {
                    setActiveTab('blogs');
                    setSidebarOpen(false);
                  }}
                  icon={<FileText className="w-4 h-4" />}
                  label="Blog Articles"
                  badge={stats.totalBlogs}
                />
                <SidebarItem
                  active={activeTab === 'testimonials'}
                  onClick={() => {
                    setActiveTab('testimonials');
                    setSidebarOpen(false);
                  }}
                  icon={<Star className="w-4 h-4" />}
                  label="Testimonials"
                  badge={testimonials.length}
                />
              </div>
            )}
          </div>

          {/* Group 2: Organization (Mirrors 'Squads v +' in screenshot) */}
          <div>
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              <button
                onClick={() => toggleSection('team')}
                className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>Organization</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collapsedSections['team'] ? '-rotate-90' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setActiveTab('team');
                  resetTeamForm();
                  setShowTeamModal(true);
                }}
                className="text-zinc-500 hover:text-white p-0.5 hover:bg-white/[0.06] rounded cursor-pointer transition-colors"
                title="Add Team Member"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            {!collapsedSections['team'] && (
              <div className="mt-1 space-y-1">
                <SidebarItem
                  active={activeTab === 'team'}
                  onClick={() => {
                    setActiveTab('team');
                    setSidebarOpen(false);
                  }}
                  icon={<Users className="w-4 h-4" />}
                  label="Team Members"
                  badge={stats.totalTeam}
                />
              </div>
            )}
          </div>

          {/* Group 3: System & Discover (Mirrors 'Discover v' & 'Get API Access' in screenshot) */}
          <div>
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              <button
                onClick={() => toggleSection('system')}
                className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>System & Preferences</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collapsedSections['system'] ? '-rotate-90' : ''}`} />
              </button>
            </div>
            {!collapsedSections['system'] && (
              <div className="mt-1 space-y-1">
                <SidebarItem
                  active={activeTab === 'hero'}
                  onClick={() => {
                    setActiveTab('hero');
                    setSidebarOpen(false);
                  }}
                  icon={<Layers className="w-4 h-4 text-cyan-400" />}
                  label="Hero Slider"
                  badge={3}
                />
                <SidebarItem
                  active={activeTab === 'settings'}
                  onClick={() => {
                    setActiveTab('settings');
                    setSidebarOpen(false);
                  }}
                  icon={<Settings className="w-4 h-4" />}
                  label="Site Settings"
                />
                <SidebarItem
                  active={false}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open('/', '_blank');
                    }
                  }}
                  icon={<Globe className="w-4 h-4" />}
                  label="Live Portfolio Site"
                  accent={true}
                  external={true}
                />
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Bottom: Status & Exit */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0c0d12]/60 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-[#141620] border border-white/[0.06] rounded-md">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">SYSTEM ACTIVE</span>
            </div>
            <div className="text-[10px] font-medium text-zinc-400">
              {stats.ongoingProjects} Active / {stats.totalProjects} Proj
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.03] hover:bg-rose-500/10 hover:text-rose-300 text-zinc-400 text-xs font-semibold rounded-md border border-white/[0.06] hover:border-rose-500/30 transition-all cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Exit Admin Panel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-w-0 bg-[#090a0f]">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-[#0c0e14]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-xl">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-all cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex-1 lg:flex-none">
                <h2 className="text-xl lg:text-2xl font-bold text-white font-['Archivo'] flex items-center gap-2.5">
                  {activeTab === 'overview' && 'Overview & Analytics'}
                  {activeTab === 'projects' && 'Projects Showcase'}
                  {activeTab === 'inquiries' && 'Client Inquiries'}
                  {activeTab === 'team' && 'Team Management'}
                  {activeTab === 'blogs' && 'Blog Management'}
                  {activeTab === 'services' && 'Services Catalog'}
                  {activeTab === 'testimonials' && 'Testimonials Management'}
                  {activeTab === 'hero' && 'Hero Slider Management'}
                  {activeTab === 'settings' && 'Site Settings'}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {activeTab === 'overview' && 'Dashboard with key metrics and insights'}
                  {activeTab === 'projects' && 'Visual developer card feed & case studies'}
                  {activeTab === 'inquiries' && 'Track and manage client leads'}
                  {activeTab === 'team' && 'Manage team members and specialists'}
                  {activeTab === 'blogs' && 'Create and manage blog articles'}
                  {activeTab === 'services' && 'Manage service offerings and deliverables'}
                  {activeTab === 'testimonials' && 'Manage client testimonials and reviews'}
                  {activeTab === 'hero' && 'Customize background images, content, and buttons for the 3 homepage hero slides'}
                  {activeTab === 'settings' && 'Logo, social links, legal pages, company info'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5">
                {activeTab === 'hero' && (
                  <button
                    onClick={handleSaveHeroSlides}
                    className="px-4 py-2 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] text-xs rounded-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{heroSlidesSaved ? 'Slides Saved!' : 'Save Slides'}</span>
                  </button>
                )}
                {activeTab === 'projects' && (
                  <button
                    onClick={() => {
                      resetProjectForm();
                      setShowProjectModal(true);
                    }}
                    className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Project</span>
                  </button>
                )}
                {activeTab === 'team' && (
                  <button
                    onClick={() => {
                      resetTeamForm();
                      setShowTeamModal(true);
                    }}
                    className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Member</span>
                  </button>
                )}
                {activeTab === 'blogs' && (
                  <button
                    onClick={() => {
                      resetBlogForm();
                      setShowBlogModal(true);
                    }}
                    className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Write Article</span>
                  </button>
                )}
                {activeTab === 'services' && onAddService && (
                  <button
                    onClick={() => {
                      resetServiceForm();
                      setShowServiceModal(true);
                    }}
                    className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Service</span>
                  </button>
                )}
                {activeTab === 'testimonials' && onAddTestimonial && (
                  <button
                    onClick={() => {
                      resetTestimonialForm();
                      setShowTestimonialModal(true);
                    }}
                    className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add Review</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-6 lg:px-8 py-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Projects"
                  value={stats.totalProjects}
                  subtitle={`${stats.completedProjects} Completed • ${stats.ongoingProjects} Ongoing`}
                  icon={<Briefcase className="w-6 h-6" />}
                  color="cyan"
                />
                <StatCard
                  title="Active Inquiries"
                  value={stats.totalInquiries}
                  subtitle={`${stats.newInquiries} New • ${stats.inProgressInquiries} In Progress`}
                  icon={<MessageSquare className="w-6 h-6" />}
                  color="purple"
                  trend={stats.newInquiries > 0 ? `${stats.newInquiries} unread` : 'All reviewed'}
                />
                <StatCard
                  title="Team Members"
                  value={stats.totalTeam}
                  subtitle={`${stats.bangladeshTeam} BD • ${stats.germanyTeam} Germany`}
                  icon={<Users className="w-6 h-6" />}
                  color="emerald"
                />
                <StatCard
                  title="Content Published"
                  value={stats.totalBlogs}
                  subtitle={`${stats.totalServices} Services Active`}
                  icon={<FileText className="w-6 h-6" />}
                  color="amber"
                />
              </div>

              {/* Charts & Insights Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Project Distribution */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                  <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-white">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    Project Distribution by Category
                  </h3>
                  <div className="space-y-3.5">
                    <ProgressBar label="Full Stack & MERN" value={projects.filter(p => p.category === 'Full Stack & MERN').length} max={stats.totalProjects} color="cyan" />
                    <ProgressBar label="Web Application" value={projects.filter(p => p.category === 'Web Application').length} max={stats.totalProjects} color="purple" />
                    <ProgressBar label="Backend & Cloud" value={projects.filter(p => p.category === 'Backend & Cloud').length} max={stats.totalProjects} color="blue" />
                    <ProgressBar label="E-Commerce" value={projects.filter(p => p.category === 'E-Commerce').length} max={stats.totalProjects} color="emerald" />
                    <ProgressBar label="WordPress & Shopify" value={projects.filter(p => p.category === 'WordPress & Shopify').length} max={stats.totalProjects} color="amber" />
                  </div>
                </div>

                {/* Inquiry Status */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                  <h3 className="text-sm font-bold mb-5 flex items-center gap-2 text-white">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    Inquiry Pipeline
                  </h3>
                  <div className="space-y-3.5">
                    <ProgressBar label="New Leads" value={stats.newInquiries} max={stats.totalInquiries} color="rose" />
                    <ProgressBar label="Contacted" value={stats.contactedInquiries} max={stats.totalInquiries} color="amber" />
                    <ProgressBar label="In Progress" value={stats.inProgressInquiries} max={stats.totalInquiries} color="blue" />
                    <ProgressBar label="Completed" value={stats.completedInquiries} max={stats.totalInquiries} color="emerald" />
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-white">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Recent Client Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-cyan-400 hover:text-cyan-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    View All Leads
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="p-4 bg-[#161822] border border-white/[0.06] rounded-md hover:border-zinc-700 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-bold text-white text-sm">{inquiry.firstName} {inquiry.lastName}</span>
                            {inquiry.company && (
                              <span className="text-[10px] text-cyan-300 bg-[#BBE7F1]/15 px-2 py-0.5 rounded border border-[#9cd5e2]/25">
                                {inquiry.company}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-400 flex flex-wrap gap-2.5 mb-1.5">
                            <span>{inquiry.email}</span>
                            <span>•</span>
                            <span>{inquiry.projectType}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-semibold">{inquiry.budget}</span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1 italic">"{inquiry.message}"</p>
                        </div>
                        <select
                          value={inquiry.status}
                          onChange={(e) => onUpdateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                          className="bg-[#12141c] text-zinc-200 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-bold hover:border-zinc-500 transition-colors shadow-sm cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                  icon={<Briefcase className="w-6 h-6" />}
                  title="Add New Project"
                  description="Create portfolio entry"
                  onClick={() => {
                    resetProjectForm();
                    setShowProjectModal(true);
                  }}
                  color="cyan"
                />
                <QuickActionCard
                  icon={<Users className="w-6 h-6" />}
                  title="Add Team Member"
                  description="Onboard new specialist"
                  onClick={() => {
                    resetTeamForm();
                    setShowTeamModal(true);
                  }}
                  color="purple"
                />
                <QuickActionCard
                  icon={<FileText className="w-6 h-6" />}
                  title="Write Blog Post"
                  description="Publish new article"
                  onClick={() => {
                    resetBlogForm();
                    setShowBlogModal(true);
                  }}
                  color="emerald"
                />
                <QuickActionCard
                  icon={<Package className="w-6 h-6" />}
                  title="Add Service"
                  description="Create service offering"
                  onClick={() => {
                    resetServiceForm();
                    setShowServiceModal(true);
                  }}
                  color="amber"
                />
              </div>
            </div>
          )}

          {/* PROJECTS TAB (Daily.dev Feed Style) */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Category & Status Filter Pills (Mirrors top tabs '[Want chips 🍟?] [For you]' in screenshot) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#12141c] border border-white/[0.06] rounded-lg p-4 shadow-xl">
                {/* Horizontal Scrolling Pill Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
                  {[
                    { label: 'All Projects', value: 'all' },
                    { label: 'Full Stack & MERN', value: 'Full Stack & MERN' },
                    { label: 'Web Application', value: 'Web Application' },
                    { label: 'Backend & Cloud', value: 'Backend & Cloud' },
                    { label: 'E-Commerce', value: 'E-Commerce' },
                    { label: 'WordPress & Shopify', value: 'WordPress & Shopify' }
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setFilterCategory(cat.value)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        filterCategory === cat.value
                          ? 'bg-white text-zinc-950 shadow-md shadow-white/10'
                          : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.05]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                      filterStatus === 'all'
                        ? 'bg-[#BBE7F1] text-slate-950 font-bold border border-[#9cd5e2]'
                        : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.04]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('ongoing')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterStatus === 'ongoing'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.04]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Ongoing
                  </button>
                  <button
                    onClick={() => setFilterStatus('completed')}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      filterStatus === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.04]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Completed
                  </button>
                </div>
              </div>

              {/* Search & View Mode Switcher */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search projects by title, client, or tech..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#12141c] border border-white/[0.06] rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] focus:border-transparent transition-all shadow-inner"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-zinc-500">
                    <span className="font-bold text-zinc-300 tabular-nums">{filteredProjects.length}</span> projects
                  </span>

                  {/* Cards vs Table Switcher */}
                  <div className="bg-[#12141c] border border-white/[0.06] p-1 rounded-md flex items-center gap-1">
                    <button
                      onClick={() => setProjectViewMode('cards')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        projectViewMode === 'cards'
                          ? 'bg-white text-zinc-950'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Cards</span>
                    </button>
                    <button
                      onClick={() => setProjectViewMode('table')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        projectViewMode === 'table'
                          ? 'bg-white text-zinc-950'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Table</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* VIEW 1: DAILY.DEV STYLE VISUAL CARD FEED */}
              {projectViewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="bg-[#12141c] hover:bg-[#151824] border border-white/[0.06] hover:border-zinc-700/80 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 relative"
                    >
                      <div>
                        {/* Top Header: Source / Client Icon & Status Pill */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-[#BBE7F1]/15 border border-[#9cd5e2]/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                              <Briefcase className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-zinc-200 truncate block">
                                {project.clientName}
                              </span>
                              <span className="text-[10px] text-zinc-500 block">
                                {project.clientCountry}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge (Mirrors 'Must-read' pill from screenshot) */}
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            project.status === 'completed'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          }`}>
                            {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                          </span>
                        </div>

                        {/* Title (Bold, crisp white typography) */}
                        <h3 
                          onClick={() => handleEditProject(project)}
                          className="text-[16px] font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2.5"
                          title={project.title}
                        >
                          {project.title}
                        </h3>

                        {/* Badges / Tags Row (Reference Image Style) */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#BBE7F1]/15 text-cyan-300 border border-[#9cd5e2]/25">
                            {project.category}
                          </span>
                          {project.techStack.slice(0, 2).map((tech, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.05]">
                              #{tech}
                            </span>
                          ))}
                          {project.techStack.length > 2 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500 font-medium">
                              +{project.techStack.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Date & Meta line */}
                        <div className="text-[11px] text-zinc-500 mb-2 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-zinc-600" />
                          <span>{project.completionDate}</span>
                        </div>

                        {/* Description excerpt */}
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                          {project.description}
                        </p>

                        {/* Visual Media Preview (THE DAILY.DEV IMAGE AREA) */}
                        <div className="relative aspect-video w-full rounded-md overflow-hidden border border-white/5 bg-zinc-900 group/img my-2">
                          {project.image && project.image.trim() !== '' ? (
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900/50">
                              <Code className="w-8 h-8 opacity-30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          
                          {project.metrics && (
                            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 text-[10px] font-medium bg-black/70 backdrop-blur-md text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 truncate">
                              <TrendingUp className="w-3 h-3 flex-shrink-0 text-emerald-400" />
                              <span className="truncate">{project.metrics}</span>
                            </div>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-2 right-2 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur-md shadow-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <span>Demo</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Bar (Mirrors Reference Image bottom bar '💬 ▲ 🔖 🔗') */}
                      <div className="pt-3 mt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-zinc-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                              title="View Live URL"
                            >
                              <LinkIcon className="w-3 h-3" />
                              <span className="text-[11px] font-medium">Live URL</span>
                            </a>
                          ) : (
                            <span className="text-[11px] text-zinc-600 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Private
                            </span>
                          )}
                        </div>

                        {/* Action icons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onUpdateProjectStatus(project.id, project.status === 'completed' ? 'ongoing' : 'completed')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              project.status === 'completed'
                                ? 'text-emerald-400 hover:bg-emerald-500/10'
                                : 'text-amber-400 hover:bg-amber-500/10'
                            }`}
                            title={project.status === 'completed' ? 'Mark Ongoing' : 'Mark Completed'}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
                            title="Edit project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this project?')) {
                                onDeleteProject(project.id);
                              }
                            }}
                            className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 2: TABLE VIEW */}
              {projectViewMode === 'table' && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#161822] border-b border-white/[0.06]">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Project</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Client</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {project.image && project.image.trim() !== '' ? (
                                  <img src={project.image} alt={project.title} className="w-12 h-12 rounded-md object-cover border border-white/10" />
                                ) : (
                                  <div className="w-12 h-12 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500">
                                    <Code className="w-5 h-5" />
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-white text-sm">{project.title}</div>
                                  <div className="text-xs text-zinc-400 line-clamp-1">{project.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-cyan-300 bg-[#BBE7F1]/15 px-2.5 py-1 rounded-full font-medium border border-[#9cd5e2]/25">
                                {project.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs font-semibold text-white">{project.clientName}</div>
                              <div className="text-[11px] text-zinc-500">{project.clientCountry}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                                project.status === 'completed' 
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                  : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              }`}>
                                {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-zinc-400">
                              {project.completionDate}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"
                                  title="Edit project"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => onUpdateProjectStatus(project.id, project.status === 'completed' ? 'ongoing' : 'completed')}
                                  className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer"
                                  title="Toggle status"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this project?')) {
                                      onDeleteProject(project.id);
                                    }
                                  }}
                                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                                  title="Delete project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {filteredProjects.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 font-medium">No projects found matching your filter.</p>
                </div>
              )}
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filters & Search */}
              <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search inquiries by name, company, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all shadow-inner"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Inquiries List */}
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl hover:border-zinc-700/80 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-[#BBE7F1]/15 border border-[#9cd5e2]/30 rounded-md flex items-center justify-center text-cyan-400 font-bold text-base">
                          {inquiry.firstName[0]}{inquiry.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-base text-white">{inquiry.firstName} {inquiry.lastName}</div>
                          {inquiry.company && (
                            <div className="text-xs text-cyan-400 font-medium">{inquiry.company}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500">
                          {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <select
                          value={inquiry.status}
                          onChange={(e) => onUpdateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                          className="bg-[#181a24] text-zinc-200 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold hover:border-zinc-500 transition-colors cursor-pointer"
                        >
                          <option value="new">New Lead</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        {onDeleteInquiry && (
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this inquiry?')) {
                                onDeleteInquiry(inquiry.id);
                              }
                            }}
                            className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-[11px] text-zinc-500 mb-1">Email</div>
                        <div className="text-xs text-zinc-200 font-medium">{inquiry.email}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 mb-1">Phone</div>
                        <div className="text-xs text-zinc-200 font-medium">{inquiry.phoneNumber}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 mb-1">Project Type</div>
                        <div className="text-xs text-cyan-400 font-medium">{inquiry.projectType}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 mb-1">Budget</div>
                        <div className="text-xs text-emerald-400 font-bold">{inquiry.budget}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 mb-1">Target Market</div>
                        <div className="text-xs text-zinc-200 font-medium">{inquiry.targetMarket}</div>
                      </div>
                      {inquiry.currency && (
                        <div>
                          <div className="text-[11px] text-zinc-500 mb-1">Currency</div>
                          <div className="text-xs text-zinc-200 font-medium">{inquiry.currency}</div>
                        </div>
                      )}
                      {inquiry.timezone && (
                        <div>
                          <div className="text-[11px] text-zinc-500 mb-1">Timezone</div>
                          <div className="text-xs text-zinc-200 font-medium">{inquiry.timezone}</div>
                        </div>
                      )}
                      {inquiry.ndaRequested && (
                        <div>
                          <div className="text-[11px] text-zinc-500 mb-1">NDA</div>
                          <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Required
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#181a24] border border-white/[0.06] rounded-md p-4">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Message</div>
                      <p className="text-xs text-zinc-300 leading-relaxed">{inquiry.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredInquiries.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 font-medium">No inquiries found</p>
                </div>
              )}
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Search */}
              <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                <div className="relative max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search team members by name, role, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeam.map((member) => (
                  <div key={member.id} className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl hover:border-zinc-700/80 transition-all group hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      {member.image && member.image.trim() !== '' ? (
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded-lg object-cover border border-white/10 group-hover:border-[#9cd5e2]/50 transition-colors" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditTeamMember(member)}
                          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"
                          title="Edit member"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to remove this team member?')) {
                              onDeleteTeamMember(member.id);
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-white mb-0.5">{member.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium mb-2">{member.role}</p>
                    {member.headline && (
                      <p className="text-[11px] text-zinc-400 mb-3 line-clamp-1">{member.headline}</p>
                    )}

                    <div className="space-y-1.5 mb-4 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{member.branch.split(',')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="truncate">{member.email}</span>
                      </div>

                      <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{member.experienceYears}+ years experience</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.05] rounded-md text-zinc-300">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>

              {filteredTeam.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <Users className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 font-medium">No team members found</p>
                </div>
              )}
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filters & Search */}
              <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search blog posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all shadow-inner"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer transition-all"
                  >
                    <option value="all">All Categories</option>
                    {Array.from(new Set(blogs.map(b => b.category))).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-[#12141c] border border-white/[0.06] rounded-lg overflow-hidden shadow-xl hover:border-zinc-700/80 transition-all group hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden bg-zinc-900">
                      {blog.image && blog.image.trim() !== '' ? (
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <FileText className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-[#12141c]/50 to-transparent"></div>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="p-1.5 bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this blog post?')) {
                              onDeleteBlog(blog.id);
                            }
                          }}
                          className="p-1.5 bg-black/60 backdrop-blur-md text-zinc-300 hover:text-rose-400 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] px-2.5 py-0.5 bg-[#BBE7F1]/15 text-cyan-300 border border-[#9cd5e2]/25 rounded-full font-bold">
                          {blog.category}
                        </span>
                        <span className="text-xs text-zinc-500">{blog.readTime}</span>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-zinc-500">{new Date(blog.date).toLocaleDateString()}</span>
                      </div>

                      <h3 className="font-bold text-base text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{blog.title}</h3>
                      <p className="text-xs text-zinc-400 mb-4 line-clamp-2 leading-relaxed">{blog.excerpt}</p>

                      <div className="flex items-center gap-3 mb-4">
                        {blog.authorImage && blog.authorImage.trim() !== '' ? (
                          <img src={blog.authorImage} alt={blog.author} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-white">{blog.author}</div>
                          <div className="text-[10px] text-zinc-500">{blog.authorRole}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.05] rounded-md text-zinc-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredBlogs.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 font-medium">No blog posts found</p>
                </div>
              )}
            </div>
          )}

          {/* SERVICES TAB (Daily.dev Visual Card Style) */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Search & Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#12141c] border border-white/[0.06] rounded-lg p-4 shadow-xl">
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search services by title, tech stack, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#181a24] border border-white/[0.06] rounded-md text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all shadow-inner"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-zinc-400">
                    Showing <span className="font-bold text-white tabular-nums">{filteredServices.length}</span> of {services.length} services
                  </span>

                  {onAddService && (
                    <button
                      onClick={() => {
                        resetServiceForm();
                        setShowServiceModal(true);
                      }}
                      className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-md flex items-center gap-1.5 text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>New Service</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Services Visual Grid (Mirrors Reference Screenshot Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="bg-[#12141c] hover:bg-[#151824] border border-white/[0.06] hover:border-zinc-700/80 rounded-lg p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 relative"
                  >
                    <div>
                      {/* Top Header: Glowing Icon, Title & Edit/Delete actions */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#BBE7F1]/15 border border-[#9cd5e2]/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                            <Package className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h3 
                              onClick={() => handleEditService(service)}
                              className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors cursor-pointer truncate"
                            >
                              {service.title}
                            </h3>
                            <p className="text-[11px] text-zinc-400 truncate">{service.shortDesc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          {onUpdateService && (
                            <button
                              onClick={() => handleEditService(service)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
                              title="Edit service"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {onDeleteService && (
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this service?')) {
                                  onDeleteService(service.id);
                                }
                              }}
                              className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tech Stack Pills (Mirrors tags in Reference Screenshot) */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                          Enterprise Grade
                        </span>
                        {service.techs.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.05] rounded-md text-zinc-300 font-medium">
                            #{tech}
                          </span>
                        ))}
                        {service.techs.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500">
                            +{service.techs.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Visual Media Preview (THE DAILY.DEV IMAGE AREA) */}
                      <div className="relative h-36 rounded-md overflow-hidden border border-white/5 bg-zinc-900 group/img my-2">
                        {service.image && service.image.trim() !== '' ? (
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <Layers className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
                          <span className="text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                            <Layers className="w-3 h-3 text-cyan-400" />
                            {service.deliverables.length} Deliverables
                          </span>
                          <span className="text-[10px] text-zinc-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                            Turnkey Ready
                          </span>
                        </div>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed my-2.5">
                        {service.fullDesc}
                      </p>

                      {/* Core Deliverables Checklist */}
                      <div className="space-y-1.5 my-2.5 bg-white/[0.02] border border-white/[0.04] p-3 rounded-md">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Key Deliverables</span>
                        </div>
                        {service.deliverables.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="text-xs text-zinc-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 mt-2 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-zinc-200">5.0</span>
                        <span className="text-[10px] text-zinc-500">Tier-1 Support</span>
                      </div>

                      {onUpdateService && (
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Configure</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <Package className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400 font-medium">No services found matching your search.</p>
                </div>
              )}
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl hover:border-zinc-700/60 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {t.avatar && t.avatar.trim() !== '' ? (
                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#9cd5e2]/30" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-[#BBE7F1]/20 border-2 border-[#9cd5e2]/30 flex items-center justify-center text-cyan-300 font-bold">
                              {t.name?.charAt(0) || 'U'}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-white text-sm">{t.name}</h3>
                            <p className="text-xs text-cyan-400 font-medium">{t.role}</p>
                            <p className="text-xs text-zinc-400">{t.company.split(',')[0]}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {onUpdateTestimonial && (
                            <button onClick={() => handleEditTestimonial(t)} className="p-1.5 text-zinc-400 hover:text-cyan-300 hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                          )}
                          {onDeleteTestimonial && (
                            <button onClick={() => { if (confirm('Delete this review?')) onDeleteTestimonial(t.id); }} className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-white/[0.06] rounded-lg transition-all cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        <span className="ml-1 text-xs text-zinc-400">{t.country} {t.flag}</span>
                      </div>
                      <p className="text-sm text-zinc-300 italic line-clamp-3 leading-relaxed">"{t.quote}"</p>
                    </div>
                    {t.verified && (
                      <div className="mt-4 pt-3 border-t border-white/[0.04] inline-flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Client
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {testimonials.length === 0 && (
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-12 text-center shadow-xl">
                  <Star className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-400">No testimonials yet. Add your first client review.</p>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn max-w-4xl">
              <form onSubmit={handleSaveSettings} className="space-y-8">

                {/* Hero Slider Shortcut Banner */}
                <div className="bg-gradient-to-r from-slate-900/60 via-purple-950/30 to-cyan-950/40 border border-cyan-500/20 rounded-lg p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-cyan-400" /> Homepage Hero Slider (3 Slides)
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Configure background images from <code className="text-cyan-300 font-mono">public/images/background/</code>, headlines, small content, and CTA links.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('hero')}
                    className="px-5 py-2.5 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] text-xs rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Edit 3 Hero Slides</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Brand & Identity */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                    <Palette className="w-5 h-5 text-cyan-400" /> Brand & Identity
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Company Name</label>
                      <input type="text" value={settingsForm.companyName} onChange={e => setSettingsForm({...settingsForm, companyName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Tagline</label>
                      <input type="text" value={settingsForm.tagline} onChange={e => setSettingsForm({...settingsForm, tagline: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <ImageDropZone
                        label="Company Logo"
                        value={settingsForm.logoUrl}
                        onChange={(url) => setSettingsForm({...settingsForm, logoUrl: url})}
                        placeholder="/images/logo/webdev-logo.png"
                        helperText="Upload transparent PNG, SVG or WebP logo. Supports drag and drop."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Footer About Text</label>
                      <textarea rows={3} value={settingsForm.footerAboutText} onChange={e => setSettingsForm({...settingsForm, footerAboutText: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all resize-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">GDPR Badge Text</label>
                      <textarea rows={2} value={settingsForm.gdprBadgeText} onChange={e => setSettingsForm({...settingsForm, gdprBadgeText: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all resize-none" />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                    <Phone className="w-5 h-5 text-emerald-400" /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Email</label>
                      <input type="email" value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">🇧🇩 Bangladesh Phone</label>
                      <input type="text" value={settingsForm.phone_bd} onChange={e => setSettingsForm({...settingsForm, phone_bd: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">🇩🇪 Germany Phone</label>
                      <input type="text" value={settingsForm.phone_de} onChange={e => setSettingsForm({...settingsForm, phone_de: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">🇧🇩 Bangladesh Address</label>
                      <input type="text" value={settingsForm.address_bd} onChange={e => setSettingsForm({...settingsForm, address_bd: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">🇩🇪 Germany Address</label>
                      <input type="text" value={settingsForm.address_de} onChange={e => setSettingsForm({...settingsForm, address_de: e.target.value})}
                        className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all" />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                    <Globe className="w-5 h-5 text-sky-400" /> Social Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
                      { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/...' },
                      { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://x.com/...' },
                      { key: 'whatsapp_bd', label: '🇧🇩 WhatsApp BD', placeholder: 'https://wa.me/880...' },
                      { key: 'whatsapp_de', label: '🇩🇪 WhatsApp DE', placeholder: 'https://wa.me/49...' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">{label}</label>
                        <input type="url" value={settingsForm.socialLinks[key as keyof typeof settingsForm.socialLinks]}
                          onChange={e => setSettingsForm({...settingsForm, socialLinks: {...settingsForm.socialLinks, [key]: e.target.value}})}
                          className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all"
                          placeholder={placeholder} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Policy */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                    <Lock className="w-5 h-5 text-cyan-400" /> Privacy Policy
                  </h3>
                  <p className="text-xs text-zinc-400">Supports Markdown. Content displayed on the Privacy Policy page.</p>
                  <textarea rows={12} value={settingsForm.privacyPolicy}
                    onChange={e => setSettingsForm({...settingsForm, privacyPolicy: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all font-mono text-xs resize-y" />
                </div>

                {/* Terms of Service */}
                <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                    <FileCode2 className="w-5 h-5 text-cyan-400" /> Terms of Service
                  </h3>
                  <p className="text-xs text-zinc-400">Supports Markdown. Content displayed on the Terms of Service page.</p>
                  <textarea rows={12} value={settingsForm.termsOfService}
                    onChange={e => setSettingsForm({...settingsForm, termsOfService: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all font-mono text-xs resize-y" />
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <button type="submit"
                    className="px-8 py-3 bg-white hover:bg-zinc-200 text-slate-950 font-bold rounded-md transition-all flex items-center gap-2 cursor-pointer">
                    <Save className="w-5 h-5" />
                    {settingsSaved ? 'Saved!' : 'Save All Settings'}
                  </button>
                  {settingsSaved && (
                    <span className="text-sm text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Settings saved successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* HERO SLIDER TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-8 animate-fadeIn max-w-5xl">
              {/* Top Explanation & Actions */}
              <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" /> Homepage Hero Slider (3 Slides)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage the 3 slides displayed on the homepage hero. Choose background images from <code className="text-cyan-300 font-mono bg-white/5 px-1.5 py-0.5 rounded">public/images/background/</code>, customize badges, titles, descriptions, and CTA buttons.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHeroSlides}
                  className="px-6 py-3 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] text-sm rounded-md flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Save className="w-4 h-4" />
                  <span>{heroSlidesSaved ? 'Slides Saved!' : 'Save All Slides'}</span>
                </button>
              </div>

              {heroSlidesSaved && (
                <div className="p-4 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Hero slider changes saved successfully and updated live on the homepage!</span>
                </div>
              )}

              {/* Slide Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(settingsForm.heroSlides && settingsForm.heroSlides.length === 3 ? settingsForm.heroSlides : initialHeroSlides).map((slide, idx) => {
                  const isSelected = editingSlideIndex === idx;
                  return (
                    <button
                      key={slide.id || `tab-slide-${idx}`}
                      type="button"
                      onClick={() => setEditingSlideIndex(idx)}
                      className={`relative rounded-lg p-4 text-left transition-all border cursor-pointer overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-slate-900/80 to-[#12141c] border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                          : 'bg-[#12141c] border-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      {/* Background Thumbnail Watermark */}
                      {slide.backgroundImage && slide.backgroundImage.trim() !== '' ? (
                        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none overflow-hidden">
                          <img src={slide.backgroundImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : null}

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-zinc-400'
                          }`}>
                            Slide 0{idx + 1}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                        </div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{slide.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{slide.highlightText || slide.subtitle}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                        <span>{slide.tag || `Slide 0${idx + 1}`}</span>
                        <span className="text-cyan-400 font-medium">{isSelected ? 'Active Editor' : 'Click to Edit'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Editor for Current Slide */}
              {(() => {
                const currentSlides = settingsForm.heroSlides && settingsForm.heroSlides.length === 3
                  ? settingsForm.heroSlides
                  : initialHeroSlides;
                const activeSlide = currentSlides[editingSlideIndex] || currentSlides[0];

                const backgroundOptions = [
                  {
                    path: '/images/background/webdev-bg.webp',
                    name: 'Enterprise Blueprint (webdev-bg.webp)',
                    desc: 'High-tech architectural grid with deep blue tones'
                  },
                  {
                    path: '/images/background/hero-img-1.webp',
                    name: 'Modern Tech Matrix (hero-img-1.webp)',
                    desc: 'Dynamic cloud networking & modern UI matrix'
                  },
                  {
                    path: '/images/background/webdev-bg-s.webp',
                    name: 'Cyber Flow Grid (webdev-bg-s.webp)',
                    desc: 'Sleek server cluster & digital infrastructure'
                  },
                  {
                    path: '/images/background/webdev-bg (1).webp',
                    name: 'Deep Gradient Network (webdev-bg (1).webp)',
                    desc: 'Soft gradient cybernetic glow'
                  }
                ];

                return (
                  <div className="space-y-6">
                    {/* Live Slide Preview */}
                    <div className="bg-[#0c0d12] border border-white/10 rounded-lg p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Eye className="w-4 h-4" /> Live Visual Preview — Slide 0{editingSlideIndex + 1}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">Updates in real-time</span>
                      </div>

                      {/* Mini Hero Container */}
                      <div className="relative rounded-md overflow-hidden min-h-[260px] flex items-center p-6 sm:p-8 border border-white/10 shadow-inner">
                        {/* Background Image Preview */}
                        {activeSlide.backgroundImage && activeSlide.backgroundImage.trim() !== '' ? (
                          <img
                            src={activeSlide.backgroundImage}
                            alt="Preview Background"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : null}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_rgba(79,70,229,0.25),_transparent_60%)]" />

                        {/* Slide Content Preview */}
                        <div className="relative z-10 max-w-xl">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{activeSlide.badge || 'SLIDE BADGE'}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug font-['Archivo']">
                            {activeSlide.title}{' '}
                            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                              {activeSlide.highlightText}
                            </span>
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-md">
                            {activeSlide.subtitle}
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold text-xs shadow-md">
                              {activeSlide.primaryBtnText || 'Request Consultation'}
                              <ArrowRight className="w-3 h-3" />
                            </span>
                            {activeSlide.secondaryBtnText && (
                              <span className="px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                {activeSlide.secondaryBtnText}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Background Image Selection */}
                    <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                      <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                        <ImageIcon className="w-5 h-5 text-cyan-400" /> Background Image Selection (from public/images/background/)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {backgroundOptions.map((bg) => {
                          const isSelectedBg = activeSlide.backgroundImage === bg.path;
                          return (
                            <button
                              key={bg.path}
                              type="button"
                              onClick={() => handleUpdateCurrentSlide({ backgroundImage: bg.path })}
                              className={`group relative rounded-md overflow-hidden border p-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
                                isSelectedBg
                                  ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-cyan-950/20'
                                  : 'border-white/10 bg-[#0c0d12] hover:border-white/30'
                              }`}
                            >
                              <div className="aspect-video w-full rounded-lg overflow-hidden relative mb-2.5 bg-black">
                                <img src={bg.path} alt={bg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                {isSelectedBg && (
                                  <div className="absolute top-2 right-2 bg-cyan-500 text-slate-950 p-1 rounded-full shadow-lg">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white line-clamp-1">{bg.name}</p>
                                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2">{bg.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div>
                        <ImageDropZone
                          label="Custom Background Image"
                          value={activeSlide.backgroundImage}
                          onChange={(url) => handleUpdateCurrentSlide({ backgroundImage: url })}
                          placeholder="/images/background/webdev-bg.webp"
                          aspectRatio="wide"
                          helperText="Drag & drop or upload high-res hero background image (WebP, JPG, PNG)."
                        />
                      </div>
                    </div>

                    {/* Slide Content Form */}
                    <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                      <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                        <Sparkles className="w-5 h-5 text-cyan-400" /> Slide Content & Typography (Slide 0{editingSlideIndex + 1})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                            Pill Badge / Eyebrow Text
                          </label>
                          <input
                            type="text"
                            value={activeSlide.badge}
                            onChange={(e) => handleUpdateCurrentSlide({ badge: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                            placeholder="✦ GERMANY & BANGLADESH ENGINEERING"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                            Slide Category Tag
                          </label>
                          <input
                            type="text"
                            value={activeSlide.tag || ''}
                            onChange={(e) => handleUpdateCurrentSlide({ tag: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                            placeholder="01 / Enterprise Systems"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                            Main Headline Title
                          </label>
                          <input
                            type="text"
                            value={activeSlide.title}
                            onChange={(e) => handleUpdateCurrentSlide({ title: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm font-semibold"
                            placeholder="Modern Full-Stack & Cloud Solutions"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                            Gradient Highlighted Phrase (Cyan to Ice Blue Accent)
                          </label>
                          <input
                            type="text"
                            value={activeSlide.highlightText || ''}
                            onChange={(e) => handleUpdateCurrentSlide({ highlightText: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                            placeholder="Built to Scale"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                            Subtitle / Small Description
                          </label>
                          <textarea
                            rows={3}
                            value={activeSlide.subtitle}
                            onChange={(e) => handleUpdateCurrentSlide({ subtitle: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm resize-none"
                            placeholder="We craft high-performance web applications, enterprise software, and scalable digital architectures with European precision."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="bg-[#12141c] border border-white/[0.06] rounded-lg p-6 shadow-xl space-y-5">
                      <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.06] pb-4">
                        <ArrowUpRight className="w-5 h-5 text-cyan-400" /> Action Buttons
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Primary Button */}
                        <div className="p-4 rounded-md bg-[#0c0d12] border border-white/10 space-y-3">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Primary CTA Button</span>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Button Label</label>
                            <input
                              type="text"
                              value={activeSlide.primaryBtnText}
                              onChange={(e) => handleUpdateCurrentSlide({ primaryBtnText: e.target.value })}
                              className="w-full px-3 py-2 bg-[#12141c] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9cd5e2]"
                              placeholder="Request Consultation"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Target Action</label>
                            <select
                              value={activeSlide.primaryBtnAction || 'quote'}
                              onChange={(e) => handleUpdateCurrentSlide({ primaryBtnAction: e.target.value as HeroSlide['primaryBtnAction'] })}
                              className="w-full px-3 py-2 bg-[#12141c] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer"
                            >
                              <option value="quote">Open Quote / Inquiry Modal</option>
                              <option value="services">Navigate to Services</option>
                              <option value="projects">Navigate to Projects Showcase</option>
                              <option value="contact">Navigate to Contact Form</option>
                            </select>
                          </div>
                        </div>

                        {/* Secondary Button */}
                        <div className="p-4 rounded-md bg-[#0c0d12] border border-white/10 space-y-3">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">Secondary CTA Button</span>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Button Label</label>
                            <input
                              type="text"
                              value={activeSlide.secondaryBtnText || ''}
                              onChange={(e) => handleUpdateCurrentSlide({ secondaryBtnText: e.target.value })}
                              className="w-full px-3 py-2 bg-[#12141c] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9cd5e2]"
                              placeholder="Our Services"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Target Action</label>
                            <select
                              value={activeSlide.secondaryBtnAction || 'services'}
                              onChange={(e) => handleUpdateCurrentSlide({ secondaryBtnAction: e.target.value as HeroSlide['secondaryBtnAction'] })}
                              className="w-full px-3 py-2 bg-[#12141c] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer"
                            >
                              <option value="services">Navigate to Services</option>
                              <option value="projects">Navigate to Projects Showcase</option>
                              <option value="contact">Navigate to Contact Form</option>
                              <option value="quote">Open Quote / Inquiry Modal</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleSaveHeroSlides}
                          className="px-8 py-3.5 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] rounded-md flex items-center gap-2.5 transition-all cursor-pointer text-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>{heroSlidesSaved ? 'All Slides Saved!' : 'Save All 3 Slides'}</span>
                        </button>
                        {heroSlidesSaved && (
                          <span className="text-sm text-emerald-400 font-semibold flex items-center gap-1.5 animate-fadeIn">
                            <CheckCircle2 className="w-4 h-4" /> Saved & live on homepage!
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-zinc-500">
                        Editing Slide {editingSlideIndex + 1} of 3
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </main>
      </div>

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <Modal
          title={editingItem ? 'Edit Project' : 'Add New Project'}
          onClose={() => {
            setShowProjectModal(false);
            resetProjectForm();
          }}
        >
          <form onSubmit={handleProjectSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                  placeholder="e.g. Frankfurt FinTech Platform"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Category *</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({...projectForm, category: e.target.value as Project['category']})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer transition-all text-sm"
                >
                  <option value="Full Stack & MERN" className="bg-[#12141c]">Full Stack & MERN</option>
                  <option value="Web Application" className="bg-[#12141c]">Web Application</option>
                  <option value="Backend & Cloud" className="bg-[#12141c]">Backend & Cloud</option>
                  <option value="E-Commerce" className="bg-[#12141c]">E-Commerce</option>
                  <option value="WordPress & Shopify" className="bg-[#12141c]">WordPress & Shopify</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Status *</label>
                <select
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({...projectForm, status: e.target.value as ProjectStatus})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer transition-all text-sm"
                >
                  <option value="ongoing" className="bg-[#12141c]">Ongoing</option>
                  <option value="completed" className="bg-[#12141c]">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Client Country *</label>
                <select
                  value={projectForm.clientCountry}
                  onChange={(e) => setProjectForm({...projectForm, clientCountry: e.target.value as Project['clientCountry']})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer transition-all text-sm"
                >
                  <option value="Germany" className="bg-[#12141c]">Germany</option>
                  <option value="Bangladesh" className="bg-[#12141c]">Bangladesh</option>
                  <option value="USA" className="bg-[#12141c]">USA</option>
                  <option value="UK" className="bg-[#12141c]">UK</option>
                  <option value="Europe" className="bg-[#12141c]">Europe</option>
                  <option value="International" className="bg-[#12141c]">International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Client Name *</label>
                <input
                  type="text"
                  required
                  value={projectForm.clientName}
                  onChange={(e) => setProjectForm({...projectForm, clientName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                  placeholder="e.g. Confidential Client"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                  placeholder="e.g. React 19, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm resize-none"
                  placeholder="Brief description of the project..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Features (one per line) *</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm resize-none"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Completion Date *</label>
                <input
                  type="date"
                  required
                  value={projectForm.completionDate}
                  onChange={(e) => setProjectForm({...projectForm, completionDate: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer transition-all text-sm [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Metrics</label>
                <input
                  type="text"
                  value={projectForm.metrics}
                  onChange={(e) => setProjectForm({...projectForm, metrics: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                  placeholder="e.g. 50K+ Users, 99.9% Uptime"
                />
              </div>

              <div className="sm:col-span-2">
                <ImageDropZone
                  label="Project Cover Image"
                  required
                  value={projectForm.image}
                  onChange={(url) => setProjectForm({...projectForm, image: url})}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  aspectRatio="video"
                  helperText="Upload project thumbnail or screenshot (16:9 ratio recommended)."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Live URL</label>
                <input
                  type="url"
                  value={projectForm.liveUrl}
                  onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-sm"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setShowProjectModal(false);
                  resetProjectForm();
                }}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold text-xs rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold border border-[#9cd5e2] text-xs rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* TEAM MODAL */}
      {showTeamModal && (
        <Modal
          title={editingItem ? 'Edit Team Member' : 'Add Team Member'}
          onClose={() => {
            setShowTeamModal(false);
            resetTeamForm();
          }}
        >
          <form onSubmit={handleTeamSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Role *</label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({...teamForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="Full Stack Developer"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Headline</label>
                <input
                  type="text"
                  value={teamForm.headline}
                  onChange={(e) => setTeamForm({...teamForm, headline: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="Expert in MERN Stack & Cloud Solutions"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Branch *</label>
                <select
                  value={teamForm.branch}
                  onChange={(e) => setTeamForm({...teamForm, branch: e.target.value as TeamMember['branch']})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all text-sm"
                >
                  <option value="Joypurhat, Bangladesh" className="bg-[#12141c]">Joypurhat, Bangladesh</option>
                  <option value="Leverkusen, Germany" className="bg-[#12141c]">Leverkusen, Germany</option>
                  <option value="Küppersteg, Leverkusen, Germany" className="bg-[#12141c]">Küppersteg, Leverkusen, Germany</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Experience (years) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={teamForm.experienceYears}
                  onChange={(e) => setTeamForm({...teamForm, experienceYears: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={teamForm.email}
                  onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Phone</label>
                <input
                  type="tel"
                  value={teamForm.phone}
                  onChange={(e) => setTeamForm({...teamForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="+49 123 456 7890"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Skills (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={teamForm.skills}
                  onChange={(e) => setTeamForm({...teamForm, skills: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="React, Node.js, MongoDB, AWS, Docker"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Bio *</label>
                <textarea
                  required
                  rows={3}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
                  placeholder="Brief professional bio..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={teamForm.linkedin}
                  onChange={(e) => setTeamForm({...teamForm, linkedin: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">GitHub</label>
                <input
                  type="url"
                  value={teamForm.github}
                  onChange={(e) => setTeamForm({...teamForm, github: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="sm:col-span-2">
                <ImageDropZone
                  label="Profile Photo"
                  required
                  value={teamForm.image}
                  onChange={(url) => setTeamForm({...teamForm, image: url})}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  aspectRatio="square"
                  helperText="Upload member portrait photo (square 1:1 ratio recommended)."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Languages (comma separated)</label>
                <input
                  type="text"
                  value={teamForm.languages}
                  onChange={(e) => setTeamForm({...teamForm, languages: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="English, German, Bengali"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Education (one per line)</label>
                <textarea
                  rows={2}
                  value={teamForm.education}
                  onChange={(e) => setTeamForm({...teamForm, education: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
                  placeholder="B.Sc. in Computer Science&#10;M.Sc. in Software Engineering"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Certifications (one per line)</label>
                <textarea
                  rows={2}
                  value={teamForm.certifications}
                  onChange={(e) => setTeamForm({...teamForm, certifications: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm resize-none"
                  placeholder="AWS Certified Solutions Architect&#10;MongoDB Certified Developer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setShowTeamModal(false);
                  resetTeamForm();
                }}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold text-xs rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update Member' : 'Add Member'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* BLOG MODAL */}
      {showBlogModal && (
        <Modal
          title={editingItem ? 'Edit Blog Post' : 'Write New Article'}
          onClose={() => {
            setShowBlogModal(false);
            resetBlogForm();
          }}
          size="large"
        >
          <form onSubmit={handleBlogSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="e.g. Building Scalable MERN Applications"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Category *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    placeholder="Web Development"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({...blogForm, readTime: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm resize-none"
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Content *</label>
                <textarea
                  required
                  rows={8}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-mono text-sm resize-y"
                  placeholder="Full article content..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Tags (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="React, Node.js, Best Practices"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    placeholder="WebDev Engineering Team"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Author Role *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.authorRole}
                    onChange={(e) => setBlogForm({...blogForm, authorRole: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                    placeholder="Tech Specialist"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <ImageDropZone
                    label="Featured Banner Image"
                    required
                    value={blogForm.image}
                    onChange={(url) => setBlogForm({...blogForm, image: url})}
                    placeholder="https://images.unsplash.com/... or /images/..."
                    aspectRatio="video"
                    helperText="Upload article cover (16:9 ratio recommended)."
                  />
                </div>

                <div>
                  <ImageDropZone
                    label="Author Avatar Image"
                    value={blogForm.authorImage}
                    onChange={(url) => setBlogForm({...blogForm, authorImage: url})}
                    placeholder="https://images.unsplash.com/... or /images/..."
                    aspectRatio="square"
                    helperText="Upload author photo (1:1 ratio recommended)."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setShowBlogModal(false);
                  resetBlogForm();
                }}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold text-xs rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* TESTIMONIAL MODAL */}
      {showTestimonialModal && (
        <Modal
          title={editingItem ? 'Edit Testimonial' : 'Add Client Review'}
          onClose={() => { setShowTestimonialModal(false); resetTestimonialForm(); }}
        >
          <form onSubmit={handleTestimonialSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Client Name *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="David H. Miller"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Role / Title *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="Chief Operating Officer"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Company *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.company}
                  onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="Acme Corp, New York"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Country *</label>
                <input
                  type="text"
                  required
                  value={testimonialForm.country}
                  onChange={(e) => setTestimonialForm({...testimonialForm, country: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="USA"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Flag Emoji</label>
                <input
                  type="text"
                  value={testimonialForm.flag}
                  onChange={(e) => setTestimonialForm({...testimonialForm, flag: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                  placeholder="🇺🇸"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Rating (1-5)</label>
                <select
                  value={testimonialForm.rating}
                  onChange={(e) => setTestimonialForm({...testimonialForm, rating: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer transition-all text-sm"
                >
                  {[5,4,3,2,1].map((r) => (
                    <option key={r} value={r} className="bg-[#12141c]">
                      {r} Star{r > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={testimonialForm.verified}
                  onChange={(e) => setTestimonialForm({...testimonialForm, verified: e.target.checked})}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer rounded"
                />
                <label htmlFor="verified" className="text-xs font-semibold text-zinc-300 uppercase tracking-wider cursor-pointer">
                  Verified Client
                </label>
              </div>

              <div className="sm:col-span-2">
                <ImageDropZone
                  label="Client Avatar Image"
                  value={testimonialForm.avatar}
                  onChange={(url) => setTestimonialForm({...testimonialForm, avatar: url})}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  aspectRatio="square"
                  helperText="Upload client avatar photo (1:1 ratio recommended)."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Review Quote *</label>
                <textarea
                  required
                  rows={4}
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({...testimonialForm, quote: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm resize-none"
                  placeholder="The team delivered exceptional results..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setShowTestimonialModal(false);
                  resetTestimonialForm();
                }}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold text-xs rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update Review' : 'Add Review'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* SERVICE MODAL */}
      {showServiceModal && onAddService && (
        <Modal
          title={editingItem ? 'Edit Service' : 'Add New Service'}
          onClose={() => {
            setShowServiceModal(false);
            resetServiceForm();
          }}
        >
          <form onSubmit={handleServiceSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                  placeholder="e.g. Full Stack Development"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Short Description *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({...serviceForm, shortDesc: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                  placeholder="Brief one-line description"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Full Description *</label>
                <textarea
                  required
                  rows={3}
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({...serviceForm, fullDesc: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm resize-none"
                  placeholder="Detailed description of the service..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Technologies (comma separated) *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.techs}
                  onChange={(e) => setServiceForm({...serviceForm, techs: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                  placeholder="React, Node.js, MongoDB, AWS"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Key Features (one per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm resize-none"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Deliverables (one per line) *</label>
                <textarea
                  required
                  rows={4}
                  value={serviceForm.deliverables}
                  onChange={(e) => setServiceForm({...serviceForm, deliverables: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm resize-none"
                  placeholder="Deliverable 1&#10;Deliverable 2&#10;Deliverable 3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Icon Name</label>
                <input
                  type="text"
                  value={serviceForm.iconName}
                  onChange={(e) => setServiceForm({...serviceForm, iconName: e.target.value})}
                  className="w-full px-4 py-3 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                  placeholder="Code"
                />
              </div>

              <div>
                <ImageDropZone
                  label="Service Showcase Image"
                  value={serviceForm.image}
                  onChange={(url) => setServiceForm({...serviceForm, image: url})}
                  placeholder="https://images.unsplash.com/... or /images/..."
                  aspectRatio="video"
                  helperText="Upload service feature or preview screenshot (16:9 ratio recommended)."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => {
                  setShowServiceModal(false);
                  resetServiceForm();
                }}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 font-semibold text-xs rounded-md border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingItem ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Helper Components

interface SidebarItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
  badge?: number;
  badgeType?: 'normal' | 'alert';
  accent?: boolean;
  external?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  active, 
  onClick, 
  icon, 
  label, 
  description, 
  badge, 
  badgeType = 'normal',
  accent,
  external
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 cursor-pointer group ${
      active
        ? 'bg-[#181a24] text-white font-semibold border border-white/10'
        : accent
        ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
    }`}
  >
    <div className="flex items-center gap-2.5 min-w-0">
      <div className={`transition-colors duration-200 ${
        active 
          ? 'text-cyan-400' 
          : accent
          ? 'text-rose-400'
          : 'text-zinc-400 group-hover:text-white'
      }`}>
        {icon}
      </div>
      <span className="text-[13px] font-medium tracking-tight truncate">{label}</span>
    </div>
    
    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums ${
          badgeType === 'alert'
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
            : active
            ? 'bg-[#BBE7F1]/20 text-cyan-300 border border-[#9cd5e2]/30'
            : 'bg-white/[0.06] text-zinc-400 border border-white/[0.06] group-hover:text-zinc-200'
        }`}>
          {badge}
        </span>
      )}
      {external && (
        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  </button>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  badgeType?: 'normal' | 'alert';
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label, badge, badgeType = 'normal' }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
      active
        ? 'bg-white text-zinc-950'
        : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
    }`}
  >
    {icon}
    <span>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
        badgeType === 'alert'
          ? 'bg-rose-500 text-white'
          : active
          ? 'bg-zinc-200 text-zinc-900'
          : 'bg-white/[0.1] text-zinc-400'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'emerald' | 'amber';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color, trend }) => {
  const borderColors = {
    cyan: 'border-l-[#9cd5e2]',
    purple: 'border-l-purple-500',
    emerald: 'border-l-emerald-500',
    amber: 'border-l-amber-500'
  };

  const iconColors = {
    cyan: 'text-cyan-400 bg-[#BBE7F1]/10 border border-[#9cd5e2]/20',
    purple: 'text-purple-400 bg-purple-500/10 border border-purple-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
  };

  return (
    <div className={`bg-[#12141c] border border-white/[0.06] border-l-4 ${borderColors[color]} rounded-lg p-5 shadow-xl hover:border-zinc-700/60 transition-all group`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{title}</div>
        <div className={`p-2 rounded-md ${iconColors[color]} group-hover:scale-110 transition-transform`}>{icon}</div>
      </div>
      <div className="text-3xl font-extrabold text-white mb-1 font-['Archivo'] tracking-tight">{value}</div>
      <div className="text-xs text-zinc-400">{subtitle}</div>
      {trend && (
        <div className="text-xs text-zinc-500 mt-1.5">{trend}</div>
      )}
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: 'cyan' | 'purple' | 'blue' | 'emerald' | 'amber' | 'rose';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  const colors = {
    cyan: 'bg-[#BBE7F1]',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-zinc-300">{label}</span>
        <span className="text-xs font-bold text-white tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: 'cyan' | 'purple' | 'emerald' | 'amber';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, description, onClick, color }) => {
  const iconColors = {
    cyan: 'bg-[#BBE7F1]/15 text-cyan-400 border-[#9cd5e2]/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
  };

  return (
    <button
      onClick={onClick}
      className="bg-[#12141c] border border-white/[0.06] rounded-lg p-5 hover:border-zinc-700/60 transition-all text-left group cursor-pointer hover:-translate-y-0.5"
    >
      <div className={`w-10 h-10 border ${iconColors[color]} rounded-md flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-bold text-white mb-1 text-sm">{title}</h4>
      <p className="text-xs text-zinc-400">{description}</p>
    </button>
  );
};

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'normal' | 'large';
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, size = 'normal' }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className={`bg-[#12141c] border border-zinc-850 text-slate-100 rounded-lg shadow-2xl w-full ${
          size === 'large' ? 'max-w-4xl' : 'max-w-2xl'
        } max-h-[90vh] overflow-hidden flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <h2 className="text-xl font-bold text-white font-['Archivo']">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
