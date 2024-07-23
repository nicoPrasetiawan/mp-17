"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAppSelector } from '@/lib/hooks';

interface Event {
  event_id: number;
  event_name: string;
  event_description: string;
  original_price: number;
  discount_applied?: number;
  earlybird_applied?: number;
}

const TransactionPage = () => {
  const searchParams = useSearchParams();
  const event_id = searchParams.get('event_id');
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${event_id}`);
        if (response.status === 200) {
          setEvent(response.data.data);
        } else {
          console.error('Error fetching event:', response);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (event_id) {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [event_id]);

  const formik = useFormik({
    initialValues: {
      number_of_ticket: 1,
    },
    onSubmit: async (values) => {
      try {

        const transaction = await axios.post('http://localhost:8000/api/transaction', {
          user_id: user.userId, 
          event_id: Number(event_id),
          number_of_ticket: values.number_of_ticket,
        });

        router.push(`/payment/?transaction_id=${transaction.data.data.transaction_id}`);
      } catch (error) {
        console.error('Error during form submission:', error); 
      }
    },
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  const finalPrice = event.original_price - (event.discount_applied || 0) - (event.earlybird_applied || 0);

  return (
    <Box>
      <Typography variant="h4">{event.event_name}</Typography>
      <Typography variant="body1">{event.event_description}</Typography>
      <Typography variant="body1">
        Original Price: <s>{event.original_price}</s>
      </Typography>
      <Typography variant="body1">Final Price: {finalPrice}</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Number of Tickets"
          type="number"
          name="number_of_ticket"
          value={formik.values.number_of_ticket}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Buy Tickets
        </Button>
      </form>
    </Box>
  );
};

export default TransactionPage;
