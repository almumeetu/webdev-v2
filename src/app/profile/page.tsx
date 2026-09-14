'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { UserProfilePage } from '@/components/UserProfilePage';
import { AuthPage } from '@/components/AuthPage';

export default function ProfileRoute() {
  const router = useRouter();
  const { currentUser, updateProfile, logout, login, inquiries } = useAppContext();

  // If not logged in, show the auth page inline
  if (!currentUser) {
    return (
      <AuthPage
        onBack={() => router.push('/')}
        onLoginSuccess={(user) => {
          login(user);
        }}
      />
    );
  }

  return (
    <UserProfilePage
      currentUser={currentUser}
      onBack={() => router.push('/')}
      onUpdateProfile={updateProfile}
      onLogout={() => {
        logout();
        router.push('/');
      }}
      userInquiries={inquiries.filter(
        (inq) => inq.email.toLowerCase() === currentUser.email.toLowerCase()
      )}
    />
  );
}
