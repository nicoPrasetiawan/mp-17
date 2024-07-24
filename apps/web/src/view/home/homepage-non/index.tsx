import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';

const HomeNonUserView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}
      >
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <ReviewList />
      </Box>
    </Container>
  );
};

export default HomeNonUserView;
