'use client';

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  X, 
  Save, 
  ExternalLink, 
  Mail, 
  Phone, 
  FileText, 
  Star, 
  AlertCircle, 
  Check, 
  ChevronRight,
  TrendingUp,
  UserCheck,
  Send,
  Eye
} from 'lucide-react';
import { 
  JobPosting, 
  JobApplication, 
  JobDepartment, 
  JobType, 
  JobExperienceLevel, 
  JobWorkplace,
  ApplicationStatus 
} from '../types';

interface AdminCareersManagerProps {
  jobs: JobPosting[];
  applications: JobApplication[];
  initialTab?: 'jobs' | 'applications';
  onAddJob: (job: Partial<JobPosting>) => void;
  onUpdateJob: (id: string, job: Partial<JobPosting>) => void;
  onToggleJobActive: (id: string) => void;
  onDeleteJob: (id: string) => void;
  onUpdateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  onUpdateApplicationNotes: (id: string, notes: string, rating?: number) => void;
  onDeleteApplication: (id: string) => void;
}

export const AdminCareersManager: React.FC<AdminCareersManagerProps> = ({
  jobs = [],
  applications = [],
  initialTab = 'jobs',
  onAddJob,
  onUpdateJob,
  onToggleJobActive,
  onDeleteJob,
  onUpdateApplicationStatus,
  onUpdateApplicationNotes,
  onDeleteApplication,
}) => {
  const [tab, setTab] = useState<'jobs' | 'applications'>(initialTab);

  // Search & Filter for Jobs
  const [jobSearch, setJobSearch] = useState('');
  const [jobDeptFilter, setJobDeptFilter] = useState('all');
  const [jobStatusFilter, setJobStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Search & Filter for Applications
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [appJobFilter, setAppJobFilter] = useState<string>('all');

  // Modal states for Jobs
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);

  // Job Form state
  const [jobForm, setJobForm] = useState({
    title: '',
    department: 'Engineering' as JobDepartment,
    type: 'Full-time' as JobType,
    experienceLevel: 'Senior' as JobExperienceLevel,
    workplace: 'Remote' as JobWorkplace,
    location: 'Remote (Worldwide)',
    salaryRange: '€65,000 - €85,000 / year',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    techStack: 'React 19, Next.js 15, TypeScript, Node.js',
    isActive: true,
    featured: false,
    deadline: ''
  });

  // Modal states for Application review
  const [viewingApp, setViewingApp] = useState<JobApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewStatus, setReviewStatus] = useState<ApplicationStatus>('new');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Stats
  const stats = useMemo(() => {
    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter((j) => j.isActive).length,
      inactiveJobs: jobs.filter((j) => !j.isActive).length,
      totalApps: applications.length,
      newApps: applications.filter((a) => a.status === 'new').length,
      shortlistedApps: applications.filter((a) => a.status === 'shortlisted').length,
      interviewedApps: applications.filter((a) => a.status === 'interviewed').length,
      hiredApps: applications.filter((a) => a.status === 'hired').length,
    };
  }, [jobs, applications]);

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.location.toLowerCase().includes(jobSearch.toLowerCase()) ||
        job.techStack.some((t) => t.toLowerCase().includes(jobSearch.toLowerCase()));
      const matchDept = jobDeptFilter === 'all' || job.department === jobDeptFilter;
      const matchStatus =
        jobStatusFilter === 'all' ||
        (jobStatusFilter === 'active' && job.isActive) ||
        (jobStatusFilter === 'inactive' && !job.isActive);

      return matchSearch && matchDept && matchStatus;
    });
  }, [jobs, jobSearch, jobDeptFilter, jobStatusFilter]);

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        app.applicantName.toLowerCase().includes(appSearch.toLowerCase()) ||
        app.email.toLowerCase().includes(appSearch.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(appSearch.toLowerCase()) ||
        app.location.toLowerCase().includes(appSearch.toLowerCase());
      const matchStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
      const matchJob = appJobFilter === 'all' || app.jobId === appJobFilter;

      return matchSearch && matchStatus && matchJob;
    });
  }, [applications, appSearch, appStatusFilter, appJobFilter]);

  // Reset Job Form
  const resetJobForm = () => {
    setJobForm({
      title: '',
      department: 'Engineering',
      type: 'Full-time',
      experienceLevel: 'Senior',
      workplace: 'Remote',
      location: 'Remote (Worldwide)',
      salaryRange: '€65,000 - €85,000 / year',
      description: '',
      responsibilities: '',
      requirements: '',
      benefits: '',
      techStack: 'React 19, Next.js 15, TypeScript, Node.js',
      isActive: true,
      featured: false,
      deadline: ''
    });
    setEditingJob(null);
  };

  const handleOpenAddJob = () => {
    resetJobForm();
    setShowJobModal(true);
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      type: job.type,
      experienceLevel: job.experienceLevel,
      workplace: job.workplace,
      location: job.location,
      salaryRange: job.salaryRange,
      description: job.description,
      responsibilities: job.responsibilities.join('\n'),
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      techStack: job.techStack.join(', '),
      isActive: job.isActive,
      featured: job.featured || false,
      deadline: job.deadline || ''
    });
    setShowJobModal(true);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<JobPosting> = {
      title: jobForm.title.trim(),
      department: jobForm.department,
      type: jobForm.type,
      experienceLevel: jobForm.experienceLevel,
      workplace: jobForm.workplace,
      location: jobForm.location.trim(),
      salaryRange: jobForm.salaryRange.trim(),
      description: jobForm.description.trim(),
      responsibilities: jobForm.responsibilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: jobForm.requirements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: jobForm.benefits
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      techStack: jobForm.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      isActive: jobForm.isActive,
      featured: jobForm.featured,
      deadline: jobForm.deadline.trim() || undefined
    };

    if (editingJob) {
      onUpdateJob(editingJob.id, payload);
    } else {
      onAddJob(payload);
    }

    setShowJobModal(false);
    resetJobForm();
  };

  const handleOpenAppReview = (app: JobApplication) => {
    setViewingApp(app);
    setReviewNotes(app.notes || '');
    setReviewRating(app.rating || 0);
    setReviewStatus(app.status);
    setSaveSuccessMsg(false);
  };

  const handleSaveAppReview = () => {
    if (!viewingApp) return;
    onUpdateApplicationStatus(viewingApp.id, reviewStatus);
    onUpdateApplicationNotes(viewingApp.id, reviewNotes, reviewRating);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2500);
  };

  // Status colors helper
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'reviewed':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'shortlisted':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'interviewed':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'hired':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'rejected':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ─── Top Stats Bar ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
            <span>Total Requisitions</span>
            <Briefcase className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-['Archivo'] text-white">
            {stats.totalJobs}
            <span className="text-xs font-normal text-emerald-400 font-mono ml-2">
              ({stats.activeJobs} Active)
            </span>
          </div>
        </div>

        <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
            <span>Total Applicants</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-['Archivo'] text-white">
            {stats.totalApps}
            {stats.newApps > 0 && (
              <span className="text-xs font-bold text-amber-400 font-mono ml-2 px-1.5 py-0.5 rounded bg-amber-500/20">
                {stats.newApps} New
              </span>
            )}
          </div>
        </div>

        <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
            <span>Pipeline In Progress</span>
            <UserCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-['Archivo'] text-white">
            {stats.shortlistedApps + stats.interviewedApps}
            <span className="text-xs font-normal text-zinc-400 font-mono ml-2">
              (Interviewing)
            </span>
          </div>
        </div>

        <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium mb-1">
            <span>Offers / Hired</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-['Archivo'] text-white text-emerald-400">
            {stats.hiredApps}
            <span className="text-xs font-normal text-zinc-400 font-mono ml-2">
              Engineers
            </span>
          </div>
        </div>
      </div>

      {/* ─── Tabs & Action Bar ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12141c] border border-white/[0.06] rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('jobs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'jobs'
                ? 'bg-[#BBE7F1] text-slate-950 font-["Archivo"]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Job Requisitions</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-950/20 text-slate-900">
              {stats.totalJobs}
            </span>
          </button>

          <button
            onClick={() => setTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              tab === 'applications'
                ? 'bg-[#BBE7F1] text-slate-950 font-["Archivo"]'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Candidate Applications</span>
            {stats.newApps > 0 ? (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-bold">
                {stats.newApps} new
              </span>
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-950/20 text-slate-900">
                {stats.totalApps}
              </span>
            )}
          </button>
        </div>

        {tab === 'jobs' && (
          <button
            onClick={handleOpenAddJob}
            className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-['Archivo'] self-end sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Job</span>
          </button>
        )}
      </div>

      {/* ─── TAB 1: JOB REQUISITIONS ─── */}
      {tab === 'jobs' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Filter Bar */}
          <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search job postings by title, location, tech..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#181a24] border border-white/[0.06] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={jobDeptFilter}
                onChange={(e) => setJobDeptFilter(e.target.value)}
                className="bg-[#181a24] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Design & UI/UX">Design & UI/UX</option>
                <option value="Product & QA">Product & QA</option>
                <option value="Technical Writing & Support">Technical Writing</option>
              </select>

              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value as any)}
                className="bg-[#181a24] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive / Closed</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          {filteredJobs.length === 0 ? (
            <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-12 text-center text-zinc-500 space-y-3">
              <Briefcase className="w-10 h-10 mx-auto text-zinc-600" />
              <p className="text-sm font-medium">No job postings found matching your filters.</p>
              <button
                onClick={handleOpenAddJob}
                className="px-4 py-2 bg-[#BBE7F1] text-slate-950 text-xs font-bold rounded-lg font-['Archivo'] inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Your First Job Posting</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredJobs.map((job) => {
                const jobApps = applications.filter((a) => a.jobId === job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-[#12141c] border border-white/[0.06] hover:border-zinc-700/80 rounded-xl p-5 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {job.workplace}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {job.type}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {job.experienceLevel}
                        </span>
                        {job.featured && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            ★ Featured
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          job.isActive 
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {job.isActive ? '● Active / Live' : '○ Closed / Inactive'}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white font-['Archivo']">{job.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{job.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-0.5 font-['Instrument_Sans']">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{job.salaryRange}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[11px] text-purple-300">
                          <Users className="w-3.5 h-3.5" />
                          <span>{jobApps.length} Applicants</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/[0.06]">
                      {/* Active toggle button */}
                      <button
                        onClick={() => onToggleJobActive(job.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                          job.isActive
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border-zinc-700'
                        }`}
                        title="Toggle active status"
                      >
                        {job.isActive ? 'Deactivate' : 'Activate'}
                      </button>

                      {/* View Candidates */}
                      <button
                        onClick={() => {
                          setAppJobFilter(job.id);
                          setTab('applications');
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
                        title="View applicants for this position"
                      >
                        Candidates ({jobApps.length})
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
                        title="Edit requisition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete the job posting "${job.title}"?`)) {
                            onDeleteJob(job.id);
                          }
                        }}
                        className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete requisition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ─── TAB 2: CANDIDATE APPLICATIONS ─── */}
      {tab === 'applications' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Filter Bar */}
          <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search candidates by name, email, role, or city..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#181a24] border border-white/[0.06] rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={appJobFilter}
                onChange={(e) => setAppJobFilter(e.target.value)}
                className="bg-[#181a24] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer max-w-[200px] truncate"
              >
                <option value="all">All Job Requisitions</option>
                <option value="general">General Talent Pool</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>

              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="bg-[#181a24] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="new">New / Unreviewed</option>
                <option value="reviewed">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired / Offered</option>
                <option value="rejected">Rejected / Closed</option>
              </select>
            </div>
          </div>

          {/* Applications Cards/Table */}
          {filteredApplications.length === 0 ? (
            <div className="bg-[#12141c] border border-white/[0.06] rounded-xl p-12 text-center text-zinc-500 space-y-2">
              <Users className="w-10 h-10 mx-auto text-zinc-600" />
              <p className="text-sm font-medium">No candidate applications found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#12141c] border border-white/[0.06] hover:border-zinc-700/80 rounded-xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-2 flex-1">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                        {app.jobTitle}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                      {app.rating ? (
                        <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                          {Array.from({ length: app.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white font-['Archivo'] flex items-center gap-2">
                        <span>{app.applicantName}</span>
                        <span className="text-xs font-normal text-zinc-400">({app.experienceYears}y exp)</span>
                      </h4>
                      {app.coverLetter && (
                        <p className="text-xs text-zinc-400 line-clamp-1 italic mt-0.5">
                          "{app.coverLetter}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-['Instrument_Sans']">
                      <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{app.email}</span>
                      </a>
                      {app.phoneNumber && (
                        <a href={`tel:${app.phoneNumber}`} className="flex items-center gap-1 hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{app.phoneNumber}</span>
                        </a>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{app.location}</span>
                      </div>
                      {app.expectedSalary && (
                        <div className="text-emerald-400 font-semibold">
                          Expected: {app.expectedSalary}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Actions & Quick Status Selector */}
                  <div className="flex items-center gap-2.5 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06]">
                    
                    {/* Status Dropdown */}
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${getStatusBadge(app.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Under Review</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    {/* Resume link */}
                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
                        title="Open Resume / CV"
                      >
                        <FileText className="w-4 h-4 text-cyan-400" />
                      </a>
                    )}

                    {/* Review Modal Button */}
                    <button
                      onClick={() => handleOpenAppReview(app)}
                      className="px-3 py-1.5 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer font-['Archivo'] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (confirm(`Delete application from ${app.applicantName}?`)) {
                          onDeleteApplication(app.id);
                        }
                      }}
                      className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ─── MODAL: CREATE / EDIT JOB REQUISITION ─── */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#12141c] border border-white/[0.1] rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#161822]">
              <div>
                <h3 className="text-lg font-bold font-['Archivo'] text-white">
                  {editingJob ? 'Edit Job Requisition' : 'Create New Job Requisition'}
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in the job details, requirements, and compensation standards.
                </p>
              </div>
              <button
                onClick={() => setShowJobModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full-Stack Engineer (React 19 / Next.js)"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Department</label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value as JobDepartment })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Design & UI/UX">Design & UI/UX</option>
                    <option value="Product & QA">Product & QA</option>
                    <option value="Technical Writing & Support">Technical Writing & Support</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Employment Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as JobType })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Experience Level</label>
                  <select
                    value={jobForm.experienceLevel}
                    onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value as JobExperienceLevel })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Workplace Policy</label>
                  <select
                    value={jobForm.workplace}
                    onChange={(e) => setJobForm({ ...jobForm, workplace: e.target.value as JobWorkplace })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Remote">100% Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site Hub</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Remote (Worldwide) or Leverkusen, Germany"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo']">Salary Range *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. €65,000 - €85,000 / year"
                    value={jobForm.salaryRange}
                    onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 font-['Archivo']">Role Summary Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Overview of the mission, what the engineer will build..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 font-['Archivo']">
                  Key Responsibilities (One item per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Architect scalable microservices in TypeScript&#10;Lead sprint code reviews&#10;Maintain 99.99% uptime SLAs"
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 font-['Archivo']">
                  Required Qualifications (One item per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="4+ years professional software engineering&#10;Deep Next.js and React 19 expertise&#10;Experience with Docker and PostgreSQL"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 font-['Archivo']">
                  Benefits &amp; Perks (One item per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="100% remote flexibility with $800 home setup stipend&#10;$1,200 annual learning and certification grant&#10;Milestone bonus incentives"
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm({ ...jobForm, benefits: e.target.value })}
                  className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300 font-['Archivo']">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React 19, Next.js 15, TypeScript, Docker, PostgreSQL"
                  value={jobForm.techStack}
                  onChange={(e) => setJobForm({ ...jobForm, techStack: e.target.value })}
                  className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={jobForm.isActive}
                    onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                    className="rounded bg-[#181a24] border-white/20 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Active &amp; Visible on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={jobForm.featured}
                    onChange={(e) => setJobForm({ ...jobForm, featured: e.target.checked })}
                    className="rounded bg-[#181a24] border-white/20 text-amber-500 focus:ring-amber-400"
                  />
                  <span>Featured Requisition</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold font-['Archivo'] cursor-pointer"
                >
                  {editingJob ? 'Save Changes' : 'Create Job Requisition'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ─── MODAL: CANDIDATE APPLICATION REVIEW ─── */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-[#12141c] border border-white/[0.1] rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#161822]">
              <div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusBadge(reviewStatus)}`}>
                  {reviewStatus}
                </span>
                <h3 className="text-lg font-bold font-['Archivo'] text-white mt-1">
                  Candidate: {viewingApp.applicantName}
                </h3>
                <p className="text-xs text-zinc-400">
                  Applied for <strong className="text-cyan-300">{viewingApp.jobTitle}</strong>
                </p>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* Contact Information */}
              <div className="p-4 rounded-xl bg-[#181a24] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-zinc-500 block">Email Address:</span>
                  <a href={`mailto:${viewingApp.email}`} className="text-white hover:text-cyan-300 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{viewingApp.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block">Phone / WhatsApp:</span>
                  <a href={`tel:${viewingApp.phoneNumber}`} className="text-white hover:text-cyan-300 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{viewingApp.phoneNumber || 'Not provided'}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block">Location:</span>
                  <span className="text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{viewingApp.location}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 block">Experience &amp; Notice:</span>
                  <span className="text-white">
                    {viewingApp.experienceYears} Years • {viewingApp.earliestStartDate || 'Standard notice'}
                  </span>
                </div>
              </div>

              {/* Profiles & Resume */}
              <div className="space-y-2">
                <span className="font-bold text-zinc-300 font-['Archivo'] block uppercase tracking-wider text-[11px]">
                  Professional Links &amp; Resume
                </span>
                <div className="flex flex-wrap gap-2">
                  {viewingApp.resumeUrl && (
                    <a
                      href={viewingApp.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume / CV</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {viewingApp.linkedinUrl && (
                    <a
                      href={viewingApp.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 font-semibold"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {viewingApp.githubUrl && (
                    <a
                      href={viewingApp.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 font-semibold"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {viewingApp.portfolioUrl && (
                    <a
                      href={viewingApp.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 font-semibold"
                    >
                      <span>Portfolio Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              {viewingApp.coverLetter && (
                <div className="space-y-1.5">
                  <span className="font-bold text-zinc-300 font-['Archivo'] block uppercase tracking-wider text-[11px]">
                    Candidate Pitch / Cover Note
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#181a24] border border-white/[0.06] text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {viewingApp.coverLetter}
                  </div>
                </div>
              )}

              {/* Admin Pipeline Status & Rating */}
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-zinc-300 font-['Archivo'] block">
                      Recruitment Stage
                    </label>
                    <select
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value as ApplicationStatus)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${getStatusBadge(reviewStatus)} cursor-pointer`}
                    >
                      <option value="new">New Candidate</option>
                      <option value="reviewed">Reviewed &amp; Acknowledged</option>
                      <option value="shortlisted">Shortlisted for Interview</option>
                      <option value="interviewed">Technical Interview Completed</option>
                      <option value="hired">Offer Extended / Hired</option>
                      <option value="rejected">Archived / Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-zinc-300 font-['Archivo'] block">
                      Candidate Rating (1 - 5 Stars)
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-zinc-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300 font-['Archivo'] block">
                    Internal Interview &amp; Evaluation Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Candidate demonstrated excellent Next.js 15 knowledge. Passed system design. Needs to verify notice period..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#181a24] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Candidate status and notes saved successfully!</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewingApp(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveAppReview}
                  className="px-5 py-2 rounded-lg bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold font-['Archivo'] flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Review &amp; Stage</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
