"use client"
import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';
import { useAppSelector } from '@/lib/hooks';
import useAuthorizeUser from '@/lib/customHook/useAuthorizeUser';
import Link from 'next/link';

const HomeUserView: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  useAuthorizeUser()
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', padding: '16px' }}>
        <Typography variant="h2" textAlign="center" mb={4}>User Page</Typography>
        <Typography variant="h2" textAlign="center" mb={4}>
          {`username: ${user.username} - role: ${user.roleName}`}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <EventList />
        </Box>
        <Link href="/review" passHref>
          <Button variant="contained" size="large">
            Rate Your Review!
          </Button>
        </Link>
        <ReviewList/>
      </Box>
    </Container>
  );
};

export default HomeUserView;
