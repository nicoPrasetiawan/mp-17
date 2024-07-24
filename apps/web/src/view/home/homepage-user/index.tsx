import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';
import Link from 'next/link';
import CtaButton from '../components/ctaButton';

const HomeUserView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}
      >
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <ReviewList />
        <Box textAlign="center">
          <CtaButton href="/review" buttonText="WRITE YOURS!" />
        </Box>
      </Box>
    </Container>
  );
};

export default HomeUserView;
