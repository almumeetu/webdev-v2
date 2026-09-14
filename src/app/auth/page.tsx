'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { AuthPage } from '@/components/AuthPage';

export default function AuthRoute() {
  const router = useRouter();
  const { login } = useAppContext();

  return (
    <AuthPage
      onBack={() => router.push('/')}
      onLoginSuccess={(user) => {
        login(user);
        router.push('/profile');
      }}
    />
  );
}
