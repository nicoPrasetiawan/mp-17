import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function useAuthorizeUser() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.role_id) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  return loading;
}

export default useAuthorizeUser;
