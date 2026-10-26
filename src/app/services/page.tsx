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
        title={lang === 'de' ? 'Web-, App- & Cloud-Services' : 'Web, Mobile & Cloud Services'}
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Web-, App- & Cloud-Services' : 'Web, Mobile & Cloud Services', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
      />
      <div className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
        <OurServicesSection
          services={services}
          showAll={true}
          onSelectService={(serviceId) => router.push(`/services/${serviceId}`)}
          onViewAllServices={() => router.push('/contact')}
        />
      </div>
    </div>
  );
}
