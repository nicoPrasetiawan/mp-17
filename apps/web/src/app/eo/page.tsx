'use client';

import { Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';

function EventOrganizerPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main>
      <Typography variant="h2">Event Organizer Page</Typography>
    </main>
  );
}

export default EventOrganizerPage;
