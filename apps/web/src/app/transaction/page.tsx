'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

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
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFormik } from 'formik';
import { useAppSelector } from '@/lib/hooks';
import { locations } from '../../lib/constant';

interface Event {
  event_id: number;
  event_name: string;
  event_description: string;
  event_location: string;
  original_price: number;
  discount_applied?: number;
  earlybird_applied?: number;
  location_id: number;
  start_date: string;
  end_date: string;
  earlybird_promo?: boolean;
}

const TransactionPage = () => {
  const searchParams = useSearchParams();
  const event_id = searchParams.get('event_id');
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [earlyBirdAmount, setEarlyBirdAmount] = useState(0);
  const [pointsRedeemed, setPointsRedeemed] = useState(0);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events/${event_id}`,
        );
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

  const calculateFinalPrice = async (numberOfTickets: number) => {
    if (event && user) {
      let final_price = event.original_price;
      let discount_applied = 0;
      let earlybird_applied = 0;
      let points_redeemed = 0;

      if (event.original_price !== 0) {
        const userDiscountResponse = await axios.get(
          `http://localhost:8000/api/user-discount/${user.userId}`,
        );
        const userDiscount = userDiscountResponse.data;

        if (userDiscount) {
          discount_applied =
            (event.original_price * userDiscount.discount_percentage) / 100;
          final_price -= discount_applied;
        }

        const currentDate = new Date();
        const startDate = new Date(event.start_date);
        const thirtyDaysBeforeStart = new Date(
          startDate.getTime() - 30 * 24 * 60 * 60 * 1000,
        );

        if (event.earlybird_promo && currentDate > thirtyDaysBeforeStart) {
          earlybird_applied = final_price * 0.07;
          final_price -= earlybird_applied;
        }

        // Ensure final_price does not go below zero
        final_price = Math.max(final_price, 0);

        final_price *= numberOfTickets;

        if (user.pointBalance && user.pointBalance > 0) {
          points_redeemed = Math.min(
            Math.round(final_price),
            user.pointBalance,
          );
          final_price = Math.max(final_price - points_redeemed, 0);
        }
      }

      setFinalPrice(parseFloat(final_price.toFixed(2))); // Ensure final_price has two decimal places
      setDiscountAmount(parseFloat(discount_applied.toFixed(2)));
      setEarlyBirdAmount(parseFloat(earlybird_applied.toFixed(2)));
      setPointsRedeemed(points_redeemed);
    }
  };

  useEffect(() => {
    if (event && user) {
      calculateFinalPrice(numberOfTickets);
    }
  }, [event, user, numberOfTickets]);

  const formik = useFormik({
    initialValues: {
      number_of_ticket: 0,
    },
    validationSchema: Yup.object({
      number_of_ticket: Yup.number()
        .min(1, 'Number of tickets must be at least 1')
        .required('Number of tickets is required'),
    }),
    onSubmit: async (values) => {
      try {
        const transaction = await axios.post(
          'http://localhost:8000/api/transaction',
          {
            user_id: user.userId,
            event_id: Number(event_id),
            number_of_ticket: values.number_of_ticket,
          },
        );

        router.push(
          `/payment/?transaction_id=${transaction.data.data.transaction_id}`,
        );
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    },
  });

  const getCityName = (locationId: number) => {
    const location = locations.find(
      (loc) => loc.value === locationId.toString(),
    );
    return location ? location.label : 'Unknown Location';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-EN', options);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const optionsDate: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString('en-EN', optionsDate);
    const formattedTime = date
      .toLocaleTimeString('en-EN', optionsTime)
      .toLowerCase();
    return `${formattedDate} · ${formattedTime}`;
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

  if (!event) {
    return <div>Event not found</div>;
  }

  const originalTotalPrice = event.original_price * numberOfTickets;
  const totalDiscountAmount = discountAmount * numberOfTickets;
  const totalEarlyBirdAmount = earlyBirdAmount * numberOfTickets;
  const formattedDateStart = formatDate(event.start_date);
  const formattedStartDate = formatDateTime(event.start_date);
  const formattedEndDate = formatDateTime(event.end_date);
  const formattedDate = `${formattedStartDate} - ${formattedEndDate} WIB`;

  return (
    <Container>
      <Box
        sx={{
          padding: '2rem',
          marginTop: '2rem',
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Typography
              level="body-md"
              component="p"
              sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
            >
              {formattedDateStart}
            </Typography>
            <Typography
              level="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: '64px' }}
            >
              {event.event_name}
            </Typography>
            <Typography level="body-md" sx={{ color: '#171a1c' }}>
              {event.event_description}
            </Typography>
            <Box sx={{ marginTop: '1rem' }}>
              <Typography
                level="h3"
                component="h3"
                sx={{ fontWeight: 'bold', mt: 4 }}
                gutterBottom
              >
                Date and time
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <EventIcon />
                <Typography
                  level="body-sm"
                  component="p"
                  sx={{ marginLeft: '0.5rem', fontWeight: 'bold' }}
                >
                  {formattedDate}
                </Typography>
              </Box>

              <Typography
                level="h3"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 'bold', mt: 4 }}
              >
                Location
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <LocationOnIcon />
                <Typography
                  level="body-sm"
                  component="p"
                  sx={{ marginLeft: '0.5rem', fontWeight: 'bold' }}
                >
                  {getCityName(event.location_id)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  padding: '1rem',
                  border: '1px solid',
                  borderColor: '#203160',
                  borderRadius: 12,
                  textAlign: 'left',
                }}
              >
                <TextField
                  label="Number of Tickets"
                  type="number"
                  name="number_of_ticket"
                  value={numberOfTickets}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setNumberOfTickets(value);
                    formik.setFieldValue('number_of_ticket', value);
                  }}
                  sx={{ mb: 2 }}
                  fullWidth
                  margin="normal"
                  onBlur={formik.handleBlur}
                  error={formik.touched.number_of_ticket && Boolean(formik.errors.number_of_ticket)}
                  helperText={formik.touched.number_of_ticket && formik.errors.number_of_ticket}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography level="body-lg">Original Price:</Typography>
                  <Typography level="body-lg">
                    Rp{originalTotalPrice.toLocaleString('id-ID')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography level="body-lg">Referral Discount:</Typography>
                  <Typography level="body-lg">
                    Rp{totalDiscountAmount.toLocaleString('id-ID')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography level="body-lg">Early Bird Discount:</Typography>
                  <Typography level="body-lg">
                    Rp{totalEarlyBirdAmount.toLocaleString('id-ID')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography level="body-lg">Points Redeemed:</Typography>
                  <Typography level="body-lg">
                    Rp{pointsRedeemed.toLocaleString('id-ID')}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <Typography level="body-lg" fontWeight="bold">
                    Final Price:
                  </Typography>
                  <Typography level="body-lg" fontWeight="bold">
                    Rp{finalPrice.toLocaleString('id-ID')}
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  size="lg"
                  sx={{ mt: 2, bgcolor: '#203160' }}
                  fullWidth
                >
                  Buy Tickets
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TransactionPage;
