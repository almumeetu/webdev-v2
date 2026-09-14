'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { OurServicesSection } from '@/components/OurServicesSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function ServicesPage() {
  const router = useRouter();
  const { services } = useAppContext();

  return (
    <div>
      <Breadcrumb
        badge="ENTERPRISE CAPABILITIES"
        title="All IT & Cloud Services"
        subtitle="Full-stack web engineering, cloud infrastructure, AI integrations & bespoke enterprise software development."
        items={[
          { label: 'Home', onClick: () => router.push('/') },
          { label: 'All IT & Cloud Services', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel="Back to Home"
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
