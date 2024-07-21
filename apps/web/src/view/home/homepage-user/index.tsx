"use client"
import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/eventList';

import ReviewList from '../components/reviewList';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const HomeUserView: React.FC = () => {
  const { loginStatus, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loginStatus.isLogin || user.roleName != 'user') {
      router.push('/');
    }
  }, [loginStatus, user]);
  
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
        <ReviewList/>
      </Box>
    </Container>
  );
};

export default HomeUserView;
