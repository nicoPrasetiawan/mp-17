"use client"
import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const HomeNonUserView: React.FC = () => {
  const {  user } = useAppSelector((state) => state.auth);
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}>
        <Typography variant="h2" textAlign="center" mb={4}>Non-User Page</Typography>
        <Typography variant="h2" textAlign="center" mb={4}>
          {`username: ${user.username} - role: ${user.roleName}`}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <ReviewList/>
      </Box>
    </Container>
  );
};

export default HomeNonUserView;
