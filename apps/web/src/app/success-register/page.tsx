'use client';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SuccessRegister() {
  const router = useRouter();

  const handleGoToHomepage = () => {
    router.push('/');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGoToHomepage();
    }, 10000);

    return () => clearTimeout(timeout);
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
      }}
    >
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
        You are successfully registered ✅
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoToHomepage}
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
        GO TO HOMEPAGE
      </Button>
    </Container>
  );
}

export default SuccessRegister;
