'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const ctx = useAppContext();

  return (
    <AdminDashboard
      projects={ctx.projects}
      teamMembers={ctx.teamMembers}
      blogs={ctx.blogs}
      inquiries={ctx.inquiries}
      services={ctx.services}
      testimonials={ctx.testimonials}
      siteSettings={ctx.siteSettings}
      onAddProject={ctx.addProject}
      onUpdateProject={ctx.updateProject}
      onUpdateProjectStatus={ctx.updateProjectStatus}
      onDeleteProject={ctx.deleteProject}
      onAddTeamMember={ctx.addTeamMember}
      onUpdateTeamMember={ctx.updateTeamMember}
      onDeleteTeamMember={ctx.deleteTeamMember}
      onAddBlog={ctx.addBlog}
      onUpdateBlog={ctx.updateBlog}
      onDeleteBlog={ctx.deleteBlog}
      onUpdateInquiryStatus={ctx.updateInquiryStatus}
      onDeleteInquiry={ctx.deleteInquiry}
      onAddService={ctx.addService}
      onUpdateService={ctx.updateService}
      onDeleteService={ctx.deleteService}
      onAddTestimonial={ctx.addTestimonial}
      onUpdateTestimonial={ctx.updateTestimonial}
      onDeleteTestimonial={ctx.deleteTestimonial}
      onUpdateSiteSettings={ctx.updateSiteSettings}
      onClose={() => router.push('/')}
    />
  );
}
