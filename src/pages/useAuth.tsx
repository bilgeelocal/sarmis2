// hooks/useAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('auth');
    if (!isAuth) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);
};

export default useAuth;
