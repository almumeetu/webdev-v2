'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Upload, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Code2, 
  Server, 
  Laptop, 
  GraduationCap, 
  HeartHandshake, 
  Zap, 
  Send,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Link as LinkIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { JobPosting, JobDepartment, JobWorkplace } from '../types';
import { Breadcrumb } from './Breadcrumb';

export const CareersPage: React.FC = () => {
  const router = useRouter();
  const { jobs, addApplication } = useAppContext();

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedWorkplace, setSelectedWorkplace] = useState<string>('all');

  // Modal states
  const [activeJobModal, setActiveJobModal] = useState<JobPosting | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'apply'>('details');

  // General talent pool modal
  const [isGeneralApplyOpen, setIsGeneralApplyOpen] = useState(false);

  // Application form state
  const [applicationForm, setApplicationForm] = useState({
    applicantName: '',
    email: '',
    phoneNumber: '',
    location: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    resumeUrl: '',
    resumeFileName: '',
    experienceYears: 3,
    expectedSalary: '',
    earliestStartDate: 'Immediate / 2 Weeks',
    coverLetter: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccessId, setSubmitSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Departments list for filter
  const departments: { label: string; value: string }[] = [
    { label: 'All Disciplines', value: 'all' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'DevOps & Cloud', value: 'DevOps & Cloud' },
    { label: 'Design & UI/UX', value: 'Design & UI/UX' },
    { label: 'Product & QA', value: 'Product & QA' },
  ];

  // Filtered jobs
  const totalActiveJobs = useMemo(() => (jobs || []).filter((j) => j.isActive).length, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!job.isActive) return false;

      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.techStack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesWorkplace = selectedWorkplace === 'all' || job.workplace === selectedWorkplace;

      return matchesSearch && matchesDept && matchesWorkplace;
    });
  }, [jobs, searchTerm, selectedDepartment, selectedWorkplace]);

  const resetForm = () => {
    setApplicationForm({
      applicantName: '',
      email: '',
      phoneNumber: '',
      location: '',
      portfolioUrl: '',
      linkedinUrl: '',
      githubUrl: '',
      resumeUrl: '',
      resumeFileName: '',
      experienceYears: 3,
      expectedSalary: '',
      earliestStartDate: 'Immediate / 2 Weeks',
      coverLetter: ''
    });
    setErrorMessage(null);
    setSubmitSuccessId(null);
  };

  const handleOpenJob = (job: JobPosting, startTab: 'details' | 'apply' = 'details') => {
    setActiveJobModal(job);
    setActiveTab(startTab);
    resetForm();
  };

  const handleOpenGeneralApply = () => {
    setIsGeneralApplyOpen(true);
    resetForm();
  };

  const handleSubmitApplication = async (e: React.FormEvent, targetJob?: JobPosting) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!applicationForm.applicantName.trim() || !applicationForm.email.trim()) {
      setErrorMessage('Please provide both your full name and a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        jobId: targetJob ? targetJob.id : 'general',
        jobTitle: targetJob ? targetJob.title : 'General Engineering Application (Talent Pool)',
        applicantName: applicationForm.applicantName.trim(),
        email: applicationForm.email.trim(),
        phoneNumber: applicationForm.phoneNumber.trim(),
        location: applicationForm.location.trim() || 'Remote',
        portfolioUrl: applicationForm.portfolioUrl.trim() || undefined,
        linkedinUrl: applicationForm.linkedinUrl.trim() || undefined,
        githubUrl: applicationForm.githubUrl.trim() || undefined,
        resumeUrl: applicationForm.resumeUrl.trim() || undefined,
        resumeFileName: applicationForm.resumeFileName.trim() || undefined,
        experienceYears: Number(applicationForm.experienceYears) || 1,
        expectedSalary: applicationForm.expectedSalary.trim() || undefined,
        earliestStartDate: applicationForm.earliestStartDate.trim() || undefined,
        coverLetter: applicationForm.coverLetter.trim() || undefined,
      };

      const result = await addApplication(payload);
      setSubmitSuccessId(result.id);
    } catch {
      setErrorMessage('An unexpected error occurred while saving your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Instrument_Sans'] selection:bg-[#BBE7F1] selection:text-slate-950 pb-20">
      
      {/* ─── 1. Breadcrumb Header ─── */}
      <Breadcrumb
        badge="JOIN OUR GLOBAL ENGINEERING SQUAD"
        title="Careers & Engineering Openings"
        subtitle="Work alongside senior software architects and DevOps specialists across Germany and Bangladesh. Engineering high-concurrency web systems, cloud architectures, and digital commerce."
        items={[
          { label: 'Home', onClick: () => router.push('/') },
          { label: 'Careers', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel="Back to Home"
        align="left"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        
        {/* ─── 2. Hero Highlights Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-[#9cd5e2]/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3 border border-cyan-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Archivo']">Dual-Hub & Remote</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Leverkusen (Germany), Joypurhat (Bangladesh), and distributed remote talent worldwide.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Archivo']">Modern Tech Only</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              React 19, Next.js 15, TypeScript, Docker, Kubernetes, and enterprise microservices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 border border-purple-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Archivo']">$1,200 Learning Grant</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Fully sponsored AWS, GCP, CKA, and PMP® certifications, tech books, and conferences.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group hover:border-sky-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 border border-sky-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Archivo']">German Quality & SLAs</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              BaFin &amp; GDPR compliance standards, transparent sprint velocity, and zero ego.
            </p>
          </div>
        </div>

        {/* ─── 3. Search & Multi-Faceted Filter Bar ─── */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-2xl space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search open positions by role, skill, or keyword (e.g., React, Cloud, UI/UX)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Workplace Select */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Workplace:</span>
              </div>
              <select
                value={selectedWorkplace}
                onChange={(e) => setSelectedWorkplace(e.target.value)}
                className="bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="all">All Locations / Workplaces</option>
                <option value="Remote">100% Remote</option>
                <option value="Hybrid">Hybrid (Leverkusen or Joypurhat)</option>
                <option value="On-site">On-site Hub</option>
              </select>
            </div>

          </div>

          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            {departments.map((dept) => {
              const active = selectedDepartment === dept.value;
              return (
                <button
                  key={dept.value}
                  onClick={() => setSelectedDepartment(dept.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#BBE7F1] text-slate-950 font-bold border-[#9cd5e2] shadow-sm'
                      : 'bg-slate-950/50 hover:bg-slate-800/80 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}

            <div className="ml-auto text-xs text-slate-400 font-mono hidden sm:block">
              Showing <strong className="text-white">{filteredJobs.length}</strong> of {jobs.filter((j) => j.isActive).length} roles
            </div>
          </div>
        </div>

        {/* ─── 4. Jobs List / Cards Grid ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-['Archivo'] tracking-tight text-white flex items-center gap-2.5">
              <span>Open Engineering Roles</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                totalActiveJobs > 0 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}>
                {totalActiveJobs > 0 ? `${totalActiveJobs} Available` : '0 Active Roles'}
              </span>
            </h2>

            <button
              onClick={handleOpenGeneralApply}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Join Talent Pool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {totalActiveJobs === 0 ? (
            <div className="p-8 sm:p-14 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Archivo']">
                  Currently No Active Openings
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  We currently do not have any open positions available. However, our engineering teams across Germany and Bangladesh are continually expanding. You are welcome to submit a spontaneous application to our General Talent Pool, and we will contact you as soon as a new opportunity matching your skill set opens.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleOpenGeneralApply}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs sm:text-sm font-bold transition-all cursor-pointer border border-[#9cd5e2] flex items-center justify-center gap-2 shadow-lg font-['Archivo']"
                >
                  <Send className="w-4 h-4" />
                  <span>Join Our General Talent Pool</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>New opportunities will appear here as soon as they are announced</span>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">No roles match your filter criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We're always looking for outstanding engineers. Submit a general application or reset your search filters.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDepartment('all');
                    setSelectedWorkplace('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <button
                  onClick={handleOpenGeneralApply}
                  className="px-4 py-2 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Spontaneous Application
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 transition-all duration-200 shadow-lg relative group flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Column: Job Info */}
                  <div className="space-y-3 flex-1">
                    
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {job.type}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {job.experienceLevel}
                      </span>
                      {job.featured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Featured Role</span>
                        </span>
                      )}
                    </div>

                    {/* Job Title & Snippet */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-['Archivo'] text-white group-hover:text-cyan-300 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-['Instrument_Sans']">
                      <div className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <DollarSign className="w-3.5 h-3.5 shrink-0" />
                        <span>{job.salaryRange}</span>
                      </div>
                      {job.applicantsCount !== undefined && job.applicantsCount > 0 && (
                        <div className="text-slate-500 font-mono text-[11px]">
                          {job.applicantsCount} applicants
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex sm:flex-col items-center md:items-end gap-2.5 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800/80">
                    <button
                      onClick={() => handleOpenJob(job, 'details')}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700 hover:border-slate-600 text-center"
                    >
                      View Role Details
                    </button>
                    <button
                      onClick={() => handleOpenJob(job, 'apply')}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs font-bold transition-all cursor-pointer border border-[#9cd5e2] shadow-sm flex items-center justify-center gap-1.5 font-['Archivo']"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── 5. Culture & Benefits Section ─── */}
        <div className="pt-8 border-t border-slate-800/80 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400">
              LIFE AT WEBDEV SOFTWARE SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Archivo'] tracking-tight text-white">
              Why Engineers Thrive Here
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We combine European project governance and client standards with a warm, collaborative, cross-border development atmosphere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">Hardware & Tooling Stipend</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apple Silicon MacBook Pro or high-spec Linux workstation, 4K displays, and top-tier software subscriptions (Figma, Copilot, Docker Pro).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">Flexible & Asynchronous Hours</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We measure results, clean architectures, and deployed code rather than hours spent sitting in front of a webcam.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">Mentorship & Sponsored Certs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn directly from senior software architects with 10+ years in distributed systems, BaFin audits, and PMP® certified governance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">Competitive Global Pay</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Above-market compensation indexed to international client billing with annual milestone bonuses and profit-sharing dividends.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">Culture of Mutual Respect</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An ego-free environment where every engineer's voice is valued. Constructive PR reviews and collaborative problem-solving.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Archivo']">International Relocation Opportunities</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Opportunities for key contributors to participate in European on-site client deployments and exchange programs between Germany & Bangladesh.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 6. Hiring Process Timeline ─── */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 space-y-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              HIRING TIMELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Archivo'] text-white mt-1">
              Transparent, Fast &amp; Pragmatic Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              No endless 6-stage algorithmic puzzles. We value real code, clear communication, and architecture understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 relative">
              <div className="text-2xl font-bold font-mono text-cyan-400/30">01</div>
              <h4 className="text-sm font-bold text-white font-['Archivo']">Application Review</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We review your GitHub, portfolio, and experience within 48 business hours.
              </p>
            </div>

            <div className="space-y-2 relative">
              <div className="text-2xl font-bold font-mono text-cyan-400/30">02</div>
              <h4 className="text-sm font-bold text-white font-['Archivo']">Introductory Conversation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                30-minute Google Meet to discuss your passions, goals, and team expectations.
              </p>
            </div>

            <div className="space-y-2 relative">
              <div className="text-2xl font-bold font-mono text-cyan-400/30">03</div>
              <h4 className="text-sm font-bold text-white font-['Archivo']">Practical System Challenge</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A real-world take-home mini project (2-3 hours) mirroring actual client problems.
              </p>
            </div>

            <div className="space-y-2 relative">
              <div className="text-2xl font-bold font-mono text-cyan-400/30">04</div>
              <h4 className="text-sm font-bold text-white font-['Archivo']">Offer &amp; Onboarding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear contract, hardware arrival, and guided mentorship during your first sprint.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 7. Spontaneous Application CTA Banner ─── */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-['Archivo'] text-white">
              Don't see the exact role you're looking for?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We frequently open new requisitions for talented frontend engineers, backend specialists, DevOps administrators, and technical PMs. Submit your resume to our general talent pool.
            </p>
          </div>

          <button
            onClick={handleOpenGeneralApply}
            className="px-6 py-3.5 rounded-2xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer border border-[#9cd5e2] shadow-lg shrink-0 flex items-center justify-center gap-2 font-['Archivo']"
          >
            <Send className="w-4 h-4" />
            <span>Submit Spontaneous CV</span>
          </button>
        </div>

      </div>

      {/* ─── MODAL: JOB DETAIL & APPLICATION DRAWER ─── */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/50">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {activeJobModal.department}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {activeJobModal.workplace}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {activeJobModal.salaryRange}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Archivo'] text-white">
                  {activeJobModal.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeJobModal.location}</span>
                </p>
              </div>

              <button
                onClick={() => setActiveJobModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center px-6 border-b border-slate-800 bg-slate-950/30">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-cyan-400 text-white font-["Archivo"]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Role Overview &amp; Requirements
              </button>
              <button
                onClick={() => setActiveTab('apply')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'apply'
                    ? 'border-cyan-400 text-white font-["Archivo"]'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Application Form
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {activeTab === 'details' ? (
                <div className="space-y-6 text-xs sm:text-sm">
                  
                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                      About the Role
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {activeJobModal.description}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 text-slate-300">
                      {activeJobModal.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                      Required Skills &amp; Qualifications
                    </h4>
                    <ul className="space-y-1.5 text-slate-300">
                      {activeJobModal.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nice To Have */}
                  {activeJobModal.niceToHave && activeJobModal.niceToHave.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                        Nice to Have / Bonus Points
                      </h4>
                      <ul className="space-y-1.5 text-slate-400">
                        {activeJobModal.niceToHave.map((nth, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                            <span>{nth}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                      What We Offer
                    </h4>
                    <ul className="space-y-1.5 text-slate-300">
                      {activeJobModal.benefits.map((ben, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-['Archivo']">
                      Technologies Involved
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeJobModal.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Footer in Details */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Posted on {activeJobModal.postedDate}
                    </div>
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="px-5 py-2.5 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs font-bold transition-all cursor-pointer border border-[#9cd5e2] flex items-center gap-1.5 font-['Archivo']"
                    >
                      <span>Proceed to Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ) : (
                /* Application Form Tab */
                <div>
                  {submitSuccessId ? (
                    <div className="p-8 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold font-['Archivo'] text-white">Application Received!</h4>
                      <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                        Thank you for applying to WebDev Software Solutions. Our engineering team has received your application (Ref: <strong className="font-mono text-cyan-300">{submitSuccessId}</strong>) and will review your profile within 48 business hours.
                      </p>
                      <button
                        onClick={() => {
                          setActiveJobModal(null);
                          resetForm();
                        }}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmitApplication(e, activeJobModal)} className="space-y-4">
                      
                      {errorMessage && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo'] flex items-center gap-1">
                            <User className="w-3 h-3 text-cyan-400" />
                            <span>Full Name *</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={applicationForm.applicantName}
                            onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo'] flex items-center gap-1">
                            <Mail className="w-3 h-3 text-cyan-400" />
                            <span>Email Address *</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={applicationForm.email}
                            onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo'] flex items-center gap-1">
                            <Phone className="w-3 h-3 text-cyan-400" />
                            <span>Phone / WhatsApp *</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+49 ... or +880 ..."
                            value={applicationForm.phoneNumber}
                            onChange={(e) => setApplicationForm({ ...applicationForm, phoneNumber: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo'] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>Current City &amp; Country</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Leverkusen, Germany or Dhaka, BD"
                            value={applicationForm.location}
                            onChange={(e) => setApplicationForm({ ...applicationForm, location: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            LinkedIn Profile URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://linkedin.com/in/..."
                            value={applicationForm.linkedinUrl}
                            onChange={(e) => setApplicationForm({ ...applicationForm, linkedinUrl: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            GitHub Profile URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/..."
                            value={applicationForm.githubUrl}
                            onChange={(e) => setApplicationForm({ ...applicationForm, githubUrl: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            Portfolio / Website URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://mywebsite.com"
                            value={applicationForm.portfolioUrl}
                            onChange={(e) => setApplicationForm({ ...applicationForm, portfolioUrl: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={applicationForm.experienceYears}
                            onChange={(e) => setApplicationForm({ ...applicationForm, experienceYears: Number(e.target.value) })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            Expected Salary
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. €70,000 / yr or $3,000 / mo"
                            value={applicationForm.expectedSalary}
                            onChange={(e) => setApplicationForm({ ...applicationForm, expectedSalary: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                            Notice / Earliest Start
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Immediate / 1 Month"
                            value={applicationForm.earliestStartDate}
                            onChange={(e) => setApplicationForm({ ...applicationForm, earliestStartDate: e.target.value })}
                            className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      {/* Resume link or document */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 font-['Archivo'] flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3 text-cyan-400" />
                            <span>Resume / CV Link (Google Drive, Dropbox, or Hosted PDF)</span>
                          </span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://drive.google.com/file/d/..."
                          value={applicationForm.resumeUrl}
                          onChange={(e) => setApplicationForm({ ...applicationForm, resumeUrl: e.target.value })}
                          className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      {/* Cover Note */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 font-['Archivo']">
                          Personal Pitch &amp; Summary (Why you're a great fit)
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about the most challenging production problem you solved, and what excites you about WebDev Software Solutions..."
                          value={applicationForm.coverLetter}
                          onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                          className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveTab('details')}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          &larr; Back to Role Details
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-3 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs font-bold transition-all cursor-pointer border border-[#9cd5e2] flex items-center gap-2 font-['Archivo'] disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit Application</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ─── MODAL: GENERAL TALENT POOL APPLICATION ─── */}
      {isGeneralApplyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
            
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  TALENT NETWORK
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Archivo'] text-white">
                  Join Our Engineering Talent Pool
                </h3>
                <p className="text-xs text-slate-400">
                  Tell us about your technical expertise. We will contact you as soon as a fitting requisition opens.
                </p>
              </div>
              <button
                onClick={() => setIsGeneralApplyOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccessId ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-['Archivo'] text-white">Profile Saved to Talent Network</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you! Your profile has been registered (Ref: <strong className="font-mono text-cyan-300">{submitSuccessId}</strong>). We will reach out when relevant opportunities align with your background.
                </p>
                <button
                  onClick={() => {
                    setIsGeneralApplyOpen(false);
                    resetForm();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmitApplication(e)} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={applicationForm.applicantName}
                      onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+49 ... or +880 ..."
                      value={applicationForm.phoneNumber}
                      onChange={(e) => setApplicationForm({ ...applicationForm, phoneNumber: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">Current Location</label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      value={applicationForm.location}
                      onChange={(e) => setApplicationForm({ ...applicationForm, location: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">GitHub / Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={applicationForm.githubUrl || applicationForm.portfolioUrl}
                      onChange={(e) => setApplicationForm({ ...applicationForm, githubUrl: e.target.value, portfolioUrl: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 font-['Archivo']">Resume / CV Link</label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={applicationForm.resumeUrl}
                      onChange={(e) => setApplicationForm({ ...applicationForm, resumeUrl: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 font-['Archivo']">Primary Technical Stack &amp; Areas of Interest</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Next.js 15, PostgreSQL, Kubernetes, Golang, UI/UX..."
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsGeneralApplyOpen(false)}
                    className="px-4 py-2.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 text-xs font-bold transition-all cursor-pointer border border-[#9cd5e2] flex items-center gap-2 font-['Archivo']"
                  >
                    {isSubmitting ? <span>Saving...</span> : <span>Register Profile</span>}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
