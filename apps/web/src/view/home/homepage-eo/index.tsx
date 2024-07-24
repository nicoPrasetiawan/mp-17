import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/eventList';
import CreateEventBanner from '../components/createEventBanner';
import ReviewList from '../components/reviewList';

const HomeEOView: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}
      >
        <Typography id="event-organizer" variant="h2" textAlign="center" mb={4}>
          {' '}
          {/* change the id for targeting the handleScroll in heroSection button GET STARTED */}
          Event Organizer Page
        </Typography>
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <CreateEventBanner />
        <ReviewList />
      </Box>
    </Container>
  );
};

export default HomeEOView;
