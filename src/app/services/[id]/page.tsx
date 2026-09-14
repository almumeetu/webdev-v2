'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';

export default function ServiceDetailRoute() {
  const params = useParams();
  const router = useRouter();
  const { services } = useAppContext();

  const service = services.find((s) => s.id === (params.id as string)) || services[0];

  return (
    <ServiceDetailPage
      service={service}
      onBack={() => router.push('/services')}
      onBackToHome={() => router.push('/')}
      onRequestQuote={(serviceTitle) =>
        router.push(`/contact?project=${encodeURIComponent(serviceTitle)}`)
      }
      onSelectService={(serviceId) => router.push(`/services/${serviceId}`)}
      onSelectProject={(project) => router.push(`/portfolio/${project.id}`)}
    />
  );
}
