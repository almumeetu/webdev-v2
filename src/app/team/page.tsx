'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { MeetOurTeamSection } from '@/components/MeetOurTeamSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function TeamPage() {
  const router = useRouter();
  const { teamMembers } = useAppContext();
  const { lang } = useLanguage();

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumb
        badge={lang === 'de' ? 'FÜHRUNGSTEAM & SENIOR ENGINEERS' : 'EXECUTIVE LEADERSHIP & CORE ENGINEERS'}
        title={lang === 'de' ? 'Engineering-Team & Technische Leitung' : 'Engineering Team & Technical Leadership'}
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Engineering-Team & Führung' : 'Engineering Team & Leadership', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
        dividerFillColor="text-white"
      />
      <MeetOurTeamSection
        teamMembers={teamMembers}
        onSelectMember={(member) => router.push(`/team/${member.id}`)}
      />
    </div>
  );
}
