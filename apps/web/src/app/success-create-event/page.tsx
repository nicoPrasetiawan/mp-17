'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

function SuccessCreateEvent() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleGoToHomepageEOPage = () => {
    router.push('/eo');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGoToHomepageEOPage();
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const confettiTimeout = setTimeout(() => {
      setConfettiOpacity(0); // Start fading out the confetti
      setTimeout(() => {
        setShowConfetti(false); // Remove confetti after fading out
      }, 1000); // Adjust this duration to match the fade-out duration
    }, 4000); // Start fade-out after 4 seconds

    return () => clearTimeout(confettiTimeout);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 4,
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {showConfetti && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: confettiOpacity,
            transition: 'opacity 1s ease-out', // Smooth fade-out transition
          }}
        >
          <Confetti width={windowSize.width} height={windowSize.height} />
        </Box>
      )}
      <Typography
        component="h1"
        variant="h3"
        sx={{ mb: 2, fontWeight: 'bold', animation: 'fadeIn 1s ease-in-out' }}
      >
        Congrats! 🎉
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        sx={{ mb: 4, animation: 'fadeIn 1.5s ease-in-out' }}
      >
        You successfully created event ✅
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToHomepageEOPage}
        sx={{
          padding: '10px 20px',
          fontSize: '1.1rem',
          animation: 'fadeIn 2s ease-in-out',
          backgroundColor: '#1976d2',
          ':hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        HOMEPAGE
      </Button>
    </Container>
  );
}

export default SuccessCreateEvent;
