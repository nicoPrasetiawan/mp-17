"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button } from '@mui/material';

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
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Confirm Payment</Typography>
      <Button variant="contained" color="primary" onClick={handleConfirmPayment}>
        I Confirm the Payment
      </Button>
    </Box>
  );
};

export default PaymentPage;
