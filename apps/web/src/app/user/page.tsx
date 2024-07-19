'use client';

import { Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';

function UserPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main>
      <Typography variant="h2">USER PAGE</Typography>
    </main>
  );
}

export default UserPage;
