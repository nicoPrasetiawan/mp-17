"use client"
import React from 'react';
import { Container, Pagination, Box } from '@mui/material';
import EventList from '../components/eventList';
import CreateEventBanner from '../components/createEventBanner';
import ReviewList from '../components/reviewList';


const HomeEOView: React.FC = () => {
  return (
    <Container>
      <EventList />
      <CreateEventBanner />
      <ReviewList/>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Pagination count={68} page={1} onChange={() => {}} />
      </Box>
    </Container>
  );
};

export default HomeEOView;
