'use client';

import { useAppSelector } from '@/lib/hooks';
import { Typography } from '@mui/material';

export default function HomeView() {
  const { loginStatus, user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Typography variant="h2">
        {loginStatus.isLogin ? `Hi ${user.username}` : 'HOMEPAGE'}
      </Typography>
    </>
  );
}
