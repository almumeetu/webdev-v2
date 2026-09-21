'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { AuthPage } from '@/components/AuthPage';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const { login } = useAppContext();

  return (
    <AuthPage
      initialMode={mode}
      onBack={() => router.push('/')}
      onLoginSuccess={(user) => {
        login(user);
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      }}
    />
  );
}

export default function AuthRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AuthContent />
    </Suspense>
  );
}
