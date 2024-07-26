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
import ErrorDialog from '@/components/errorDialog';
import SuccessDialog from '@/components/successDialog';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const transaction_id = searchParams.get('transaction_id');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    console.log('transaction_id:', transaction_id);
  }, [transaction_id]);

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      setErrorMessage(null);
      setOpenError(false);
      setSuccessMessage(null);
      setOpenSuccess(false);

      const url = `http://localhost:8000/api/payment/${Number(transaction_id)}`;

      const response = await axios.patch(url);
      if (response.status === 200) {
        setSuccessMessage(
          'You have been confirmed buying tickets!',
        );
        setOpenSuccess(true);
        // router.push('/');
      } else {
        console.error('Error confirming payment:', response);
        setErrorMessage(
          'Error confirming payment.'
        );
      }
    } catch (error) {
      setErrorMessage(
        'Error during payment confirmation.'
      );
      console.error('Error during payment confirmation:', error);
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    router.push('/');
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
      <ErrorDialog
        open={openError}
        onClose={handleCloseError}
        errorMessage={errorMessage}
      />
      <SuccessDialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        successMessage={successMessage}
        buttonText={"Go to HomePage"}
      />
    </Container>
  );
};

export default PaymentPage;
