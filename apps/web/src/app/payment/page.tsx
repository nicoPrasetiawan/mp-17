'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  Button,
  Divider,
  FormLabel,
} from '@mui/joy';
import {
  CircularProgress,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const transaction_id = searchParams.get('transaction_id');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('transaction_id:', transaction_id);
  }, [transaction_id]);

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/api/payment/${Number(transaction_id)}`;

      const response = await axios.patch(url);
      if (response.status === 200) {
        router.push('/');
      } else {
        console.error('Error confirming payment:', response);
      }
    } catch (error) {
      console.error('Error during payment confirmation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          mb: 5,
          p: 8,
          borderRadius: 24,
          background:
            'linear-gradient(120deg, rgba(10,97,105,0.9) 0%, rgba(90,78,130,0.9) 29%, rgba(90,82,168,0.9) 65%, rgba(118,91,133,0.9) 100%)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          color: '#ffffff',
          animation: 'backgroundPulse 5s infinite',
        }}
      >
        <Typography
          level="h1"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '40px', md: '70px' },
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          Confirm Payment
        </Typography>
        <Divider sx={{ marginBottom: '1rem', bgcolor: '#fff' }} />
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              level="h4"
              gutterBottom
              sx={{ color: '#ffffff', fontSize: '18px' }}
            >
              By clicking &quot;Confirm Payment&quot;, you agree to pay the
              total price amount
            </Typography>
          </Grid>
          <Grid xs={12} display="flex" justifyContent="center">
            <Button
              variant="solid"
              onClick={handleConfirmPayment}
              size="lg"
              sx={{
                mt: 2,
                p: 3,
                bgcolor: '#ffdd57',
                color: '#000',
                ':hover': { bgcolor: '#ffc107', transform: 'scale(1.05)' },
              }}
              fullWidth
            >
              Confirm Payment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PaymentPage;
