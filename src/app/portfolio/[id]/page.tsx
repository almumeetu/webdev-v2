'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ProjectDetailPage } from '@/components/ProjectDetailPage';

export default function ProjectDetailRoute() {
  const params = useParams();
  const router = useRouter();
  const { projects } = useAppContext();

  const project = projects.find((p) => p.id === (params.id as string)) || projects[0];

  return (
    <ProjectDetailPage
      project={project}
      onBack={() => router.push('/portfolio')}
      onBackToHome={() => router.push('/')}
      onGetQuoteForSimilar={(projectTitle) =>
        router.push(`/contact?project=${encodeURIComponent(projectTitle)}`)
      }
    />
  );
}
