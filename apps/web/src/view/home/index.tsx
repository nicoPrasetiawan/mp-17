'use client';

import { useEffect, useState } from 'react';
import HomeEOView from './homepage-eo';
import HomeUserView from './homepage-user';
import HomeNonUserView from './homepage-non';

interface User {
  role_id: number;
  [key: string]: any;
}

function HomeView() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user || !user.role_id) {
    return <HomeNonUserView />;
  }

  switch (user.role_id) {
    case 1:
      return <HomeUserView />;
    case 2:
      return <HomeEOView />;
    default:
      return <HomeNonUserView />;
  }
}

export default HomeView;
