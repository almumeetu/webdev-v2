'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { OurServicesSection } from '@/components/OurServicesSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function ServicesPage() {
  const router = useRouter();
  const { services } = useAppContext();
  const { lang } = useLanguage();

  return (
    <div>
      <Breadcrumb
        badge={lang === 'de' ? 'ENTERPRISE LEISTUNGSSPEKTRUM' : 'ENTERPRISE CAPABILITIES'}
        title={lang === 'de' ? 'Alle IT- & Cloud-Services' : 'All IT & Cloud Services'}
        subtitle={
          lang === 'de'
            ? 'Full-Stack-Webentwicklung, Cloud-Infrastruktur, KI-Integrationen & maßgeschneiderte Unternehmenssoftware.'
            : 'Full-stack web engineering, cloud infrastructure, AI integrations & bespoke enterprise software development.'
        }
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Alle IT- & Cloud-Services' : 'All IT & Cloud Services', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
      />
      <div className="py-8">
        <OurServicesSection
          services={services}
          onSelectService={(serviceId) => router.push(`/services/${serviceId}`)}
          onViewAllServices={() => router.push('/contact')}
        />
      </div>
    </div>
  );
}
