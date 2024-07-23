import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';
import Link from 'next/link';

const HomeUserView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}
      >
        <Typography variant="h2" textAlign="center" mb={4}>
          User Page
        </Typography>

        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <Link href="/review" passHref>
          <Button variant="contained" size="large">
            Rate Your Review!
          </Button>
        </Link>
        <ReviewList />
      </Box>
    </Container>
  );
};

export default HomeUserView;
