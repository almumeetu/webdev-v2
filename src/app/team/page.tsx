'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { MeetOurTeamSection } from '@/components/MeetOurTeamSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function TeamPage() {
  const router = useRouter();
  const { teamMembers } = useAppContext();

  return (
    <div>
      <Breadcrumb
        badge="EXECUTIVE LEADERSHIP & CORE ENGINEERS"
        title="Engineering Team & Technical Leadership"
        subtitle="Senior software architects, full-stack engineers, and cloud infrastructure specialists delivering enterprise digital solutions."
        items={[
          { label: 'Home', onClick: () => router.push('/') },
          { label: 'Engineering Team & Leadership', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel="Back to Home"
        align="left"
      />
      <div className="py-8">
        <MeetOurTeamSection
          teamMembers={teamMembers}
          onSelectMember={(member) => router.push(`/team/${member.id}`)}
          onViewAllTeam={() => {}}
        />
      </div>
    </div>
  );
}
