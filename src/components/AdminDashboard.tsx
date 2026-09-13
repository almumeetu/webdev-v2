import React, { useState } from 'react';
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
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Project, TeamMember, BlogPost, Inquiry, ProjectCategory, ProjectStatus } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  teamMembers: TeamMember[];
  blogs: BlogPost[];
  inquiries: Inquiry[];
  onAddProject: (project: Partial<Project>) => void;
  onUpdateProjectStatus: (id: string, status: ProjectStatus) => void;
  onDeleteProject: (id: string) => void;
  onAddTeamMember: (member: Partial<TeamMember>) => void;
  onDeleteTeamMember: (id: string) => void;
  onAddBlog: (blog: Partial<BlogPost>) => void;
  onDeleteBlog: (id: string) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  teamMembers,
  blogs,
  inquiries,
  onAddProject,
  onUpdateProjectStatus,
  onDeleteProject,
  onAddTeamMember,
  onDeleteTeamMember,
  onAddBlog,
  onDeleteBlog,
  onUpdateInquiryStatus,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'inquiries' | 'team' | 'blogs'>('overview');

  // New Project Form State
  const [showAddProject, setShowAddProject] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Project['category']>('Full Stack & MERN');
  const [newStatus, setNewStatus] = useState<ProjectStatus>('ongoing');
  const [newClientCountry, setNewClientCountry] = useState<Project['clientCountry']>('Germany');
  const [newClientName, setNewClientName] = useState('');
  const [newTechStack, setNewTechStack] = useState('React 19, Node.js, Express, MongoDB');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80');

  // New Team Member Form State
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBranch, setMemberBranch] = useState<'Joypurhat, Bangladesh' | 'Leverkusen, Germany'>('Joypurhat, Bangladesh');
  const [memberSkills, setMemberSkills] = useState('MERN Stack, TypeScript, Cloud');
  const [memberExp, setMemberExp] = useState(4);

  // New Blog Form State
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Full Stack & MERN');
  const [blogContent, setBlogContent] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      title: newTitle || 'New Solution',
      category: newCategory,
      status: newStatus,
      clientCountry: newClientCountry,
      clientName: newClientName || 'Confidential Client',
      techStack: newTechStack.split(',').map(s => s.trim()),
      description: newDescription || 'Modern web & server engineering platform.',
      image: newImage,
      features: ['High-throughput architecture', 'GDPR/BaFin compliance', 'Continuous CI/CD']
    });
    setNewTitle('');
    setNewClientName('');
    setNewDescription('');
    setShowAddProject(false);
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTeamMember({
      name: memberName,
      role: memberRole,
      branch: memberBranch,
      skills: memberSkills.split(',').map(s => s.trim()),
      experienceYears: Number(memberExp),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    });
    setMemberName('');
    setMemberRole('');
    setShowAddTeam(false);
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBlog({
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      author: 'WebDev Engineering Team',
      authorRole: 'Tech Specialist'
    });
    setBlogTitle('');
    setBlogContent('');
    setBlogExcerpt('');
    setShowAddBlog(false);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1520px] mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm inline-flex items-center justify-center shrink-0">
              <img 
                src="/images/logo/webdev-logo.png" 
                alt="WebDev Software Solutions" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
                  Admin Control Center
                </h1>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] px-2.5 py-0.5 rounded-full font-mono">
                  Full-Stack Live
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Joypurhat, Bangladesh & Leverkusen, Germany Operations Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700 transition-colors"
            >
              Back to Public Site
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 touch-pan-x scroll-smooth no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.length})</span>
            {inquiries.filter(i => i.status === 'new').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'team'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'blogs'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles ({blogs.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800">
                <div className="text-slate-400 text-xs uppercase font-mono font-bold">Total Portfolio Works</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-['Outfit']">{projects.length}</div>
                <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                  <span>{projects.filter(p => p.status === 'completed').length} Completed</span>
                  <span>•</span>
                  <span>{projects.filter(p => p.status === 'ongoing').length} Ongoing Live</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800">
                <div className="text-slate-400 text-xs uppercase font-mono font-bold">Client Inquiries / Leads</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-['Outfit']">{inquiries.length}</div>
                <div className="text-[11px] text-indigo-400 mt-2">
                  {inquiries.filter(i => i.status === 'new').length} Unread / Action Needed
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800">
                <div className="text-slate-400 text-xs uppercase font-mono font-bold">Germany & EU Clients</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-['Outfit']">
                  {projects.filter(p => p.clientCountry === 'Germany').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Managed via Leverkusen Branch
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800">
                <div className="text-slate-400 text-xs uppercase font-mono font-bold">Bangladesh & Global</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-['Outfit']">
                  {projects.filter(p => p.clientCountry !== 'Germany').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Engineering Hub Joypurhat
                </div>
              </div>
            </div>

            {/* Quick Inquiries Preview */}
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Recent Inbound Project Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  View All Inquiries →
                </button>
              </div>

              <div className="space-y-3">
                {inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">{inq.firstName} {inq.lastName} ({inq.company || 'Enterprise'})</div>
                      <div className="text-slate-400 mt-0.5">
                        Domain: <strong className="text-indigo-300">{inq.projectType}</strong> • Budget: {inq.budget} • Region: {inq.targetMarket}
                      </div>
                      <p className="text-slate-500 mt-1 line-clamp-1 italic">"{inq.message}"</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded text-xs font-bold"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Approved</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-['Outfit']">Manage Portfolio Projects</h2>
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddProject ? 'Cancel' : 'Add New Project'}</span>
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <form onSubmit={handleCreateProject} className="p-6 rounded-2xl bg-[#0e1424] border border-indigo-500/40 space-y-4">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                  Create New Client Project / Case Study
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Frankfurt FinTech Portal"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="Full Stack & MERN">Full Stack & MERN</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Backend & Cloud">Backend & Cloud</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="WordPress & Shopify">WordPress & Shopify</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Project Status *</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="ongoing">Ongoing Work</option>
                      <option value="completed">Recent Completed Work</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Client Country *</label>
                    <select
                      value={newClientCountry}
                      onChange={(e) => setNewClientCountry(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="Germany">Germany</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="International">International</option>
                      <option value="USA">USA</option>
                      <option value="Europe">Europe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Client Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rheinland Tech GmbH"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={newTechStack}
                    onChange={(e) => setNewTechStack(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Description & Scope</label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg"
                >
                  Publish Project to Portfolio
                </button>
              </form>
            )}

            {/* Projects Table */}
            <div className="rounded-2xl bg-[#0e1424] border border-slate-800 overflow-hidden">
              <div className="divide-y divide-slate-800">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-900/50">
                    <div className="flex items-center gap-3">
                      <img src={proj.image} alt={proj.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-sm text-white">{proj.title}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span>{proj.category}</span>
                          <span>•</span>
                          <span>{proj.clientCountry}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={() => onUpdateProjectStatus(proj.id, proj.status === 'completed' ? 'ongoing' : 'completed')}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors ${
                          proj.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {proj.status === 'completed' ? 'Mark as Ongoing' : 'Mark as Completed'}
                      </button>

                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold font-['Outfit']">Client Inquiries & Quote Leads</h2>
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="font-bold text-base text-white">{inq.firstName} {inq.lastName}</span>
                      {inq.company && <span className="text-xs text-indigo-400 ml-2">({inq.company})</span>}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</span>
                      <select
                        value={inq.status}
                        onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                        className="bg-slate-900 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg text-xs font-bold"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">Scoping / In Progress</option>
                        <option value="completed">Contract Signed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div>Email: <strong className="text-white">{inq.email}</strong></div>
                    <div>Phone / WhatsApp: <strong className="text-white">{inq.phoneNumber}</strong></div>
                    <div>Target Market: <strong className="text-white">{inq.targetMarket}</strong></div>
                    <div>Domain: <strong className="text-indigo-400">{inq.projectType}</strong></div>
                    <div>Budget: <strong className="text-emerald-400">{inq.budget}</strong></div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl text-xs text-slate-300">
                    <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Client Message:</span>
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEAM */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-['Outfit']">Engineering Specialists</h2>
              <button
                onClick={() => setShowAddTeam(!showAddTeam)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddTeam ? 'Cancel' : 'Add Team Member'}</span>
              </button>
            </div>

            {showAddTeam && (
              <form onSubmit={handleCreateTeam} className="p-6 rounded-2xl bg-[#0e1424] border border-indigo-500/40 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Role</label>
                    <input
                      type="text"
                      required
                      value={memberRole}
                      onChange={(e) => setMemberRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Branch</label>
                    <select
                      value={memberBranch}
                      onChange={(e) => setMemberBranch(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      <option value="Joypurhat, Bangladesh">Joypurhat, Bangladesh</option>
                      <option value="Leverkusen, Germany">Leverkusen, Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Years of Exp</label>
                    <input
                      type="number"
                      value={memberExp}
                      onChange={(e) => setMemberExp(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Skills</label>
                    <input
                      type="text"
                      value={memberSkills}
                      onChange={(e) => setMemberSkills(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg"
                >
                  Save Team Member
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-sm text-white">{member.name}</div>
                      <div className="text-xs text-slate-400">{member.role}</div>
                      <div className="text-[11px] text-indigo-400 font-mono mt-0.5">{member.branch.split(',')[0]}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteTeamMember(member.id)}
                    className="text-slate-500 hover:text-rose-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BLOGS */}
        {activeTab === 'blogs' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-['Outfit']">Engineering Insights & Blog Articles</h2>
              <button
                onClick={() => setShowAddBlog(!showAddBlog)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddBlog ? 'Cancel' : 'Write New Article'}</span>
              </button>
            </div>

            {showAddBlog && (
              <form onSubmit={handleCreateBlog} className="p-6 rounded-2xl bg-[#0e1424] border border-indigo-500/40 space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Summary / Excerpt</label>
                  <input
                    type="text"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Content (Markdown / Text)</label>
                  <textarea
                    rows={4}
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-lg"
                >
                  Publish Article
                </button>
              </form>
            )}

            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-white">{b.title}</div>
                    <div className="text-xs text-slate-400">{b.category} • {b.date} • {b.author}</div>
                  </div>
                  <button
                    onClick={() => onDeleteBlog(b.id)}
                    className="text-slate-500 hover:text-rose-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
