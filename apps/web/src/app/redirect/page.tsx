'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RedirectPage() {
  const { loginStatus, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (loginStatus.isLogin && user.roleName) {
      const fadeOutTimer = setTimeout(() => {
        setFade(false);
      }, 2000);

      const redirectTimer = setTimeout(() => {
        if (user.roleName === 'user') {
          router.push('/user');
        } else if (user.roleName === 'event_organizer') {
          router.push('/eo');
        }
      }, 2500);
      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [user, router, loginStatus.isLogin]);

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 1 }}
      animate={{ opacity: fade ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 0,
        margin: 0,
        width: '100vw',
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        sx={{ color: '#333' }}
        variant="h2"
      >
        {`Welcome back, ${user.username}!`}
      </Typography>
    </Container>
  );
}
