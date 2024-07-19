'use client';

import { Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import HomeEOView from '@/view/home/homepage-eo';

function EventOrganizerPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main>
      <Typography variant="h2">Event Organizer Page</Typography>
      <HomeEOView/>
    </main>
  );
}

export default EventOrganizerPage;
