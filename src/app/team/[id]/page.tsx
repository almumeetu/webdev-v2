'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { TeamMemberProfilePage } from '@/components/TeamMemberProfilePage';

export default function TeamMemberRoute() {
  const params = useParams();
  const router = useRouter();
  const { teamMembers, projects } = useAppContext();

  const member = teamMembers.find((m) => m.id === (params.id as string)) || teamMembers[0];

  return (
    <TeamMemberProfilePage
      member={member}
      onBack={() => router.push('/team')}
      onBackToHome={() => router.push('/')}
      onContactLead={(memberName) =>
        router.push(`/contact?lead=${encodeURIComponent(memberName)}`)
      }
      onSelectProject={(projectTitle) => {
        const matched = projects.find((p) =>
          p.title.toLowerCase().includes(projectTitle.toLowerCase())
        );
        if (matched) router.push(`/portfolio/${matched.id}`);
        else router.push('/portfolio');
      }}
    />
  );
}
