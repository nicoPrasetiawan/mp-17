'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Box,
  List,
  Container,
  ListItem,
  Paper,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Button, Card, CardContent, CardActions, Typography } from '@mui/joy';
import { useAppSelector } from '@/lib/hooks';

interface Event {
  event_id: number;
  event_name: string;
  end_date: string;
}
const getDayName = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return new Date(dateString).toLocaleDateString('en-EN', options);
};

// Fungsi untuk mendapatkan tanggal
const getDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-EN', options);
};

const ReviewPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMdOrSmaller = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const checkUserRole = () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.role_id) {
        router.push('/login')
      }
      else if (user.role_id !== 1) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  // to handle if unauthorized user try to access the page, the page will loading first
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events-for-review/${user.userId}`,
        );
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);


  if (events.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>No events available for review.</Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '85vh',
        padding: 0,
        margin: 0,
        width: '100vw',
        background:
          'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: { xs: 3, md: 4 },
          mt: { xs: 4, md: 0 },
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          width: { xs: '80%', sm: '70%', lg: '60%', xl: '50%' },
        }}
      >
        <Typography
          level="h2"
          textAlign={'left'}
          sx={{ mb: 2, alignSelf: 'flex-start' }}
        >
          Events Available for Review
        </Typography>
        <List sx={{ width: '100%' }}>
          {events.map((event) => (
            <Paper
              key={event.event_id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                marginBottom: 2,
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={12} md={3}>
                  <Box
                    sx={{
                      backgroundColor: 'rgb(22, 95, 109,0.3)',
                      padding: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                      width: { xs: '90%', md: '70%' },
                    }}
                  >
                    {isMdOrSmaller ? (
                      <Typography
                        level="body-md"
                        fontWeight="bold"
                        sx={{ fontSize: '18px' }}
                      >
                        {`${getDayName(event.end_date)}, ${getDate(event.end_date)}`}
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          level="body-md"
                          fontWeight="bold"
                          sx={{ fontSize: { md: '16px' } }}
                        >
                          {getDayName(event.end_date)}
                        </Typography>
                        <Typography
                          level="h2"
                          fontWeight="bold"
                          sx={{ fontSize: { md: '16px' } }}
                        >
                          {getDate(event.end_date)}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    level="h2"
                    sx={{
                      fontWeight: 'bold',
                      mt: { xs: 2, md: 0 },
                      ml: { md: 2 },
                      textAlign: { xs: 'center', md: 'left' },
                      fontSize: { xs: '20px', md: '20px' },
                    }}
                  >
                    {event.event_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="solid"
                    color="primary"
                    onClick={() =>
                      router.push(`/review/${Number(event.event_id)}`)
                    }
                    sx={{
                      mt: { xs: 2, md: 0 },
                      bgcolor: 'rgb(106, 98, 167)',
                      color: '#FFFFFF',
                      '&:hover': { bgcolor: 'rgba(10,97,105,1)' },
                      width: { xs: '90%', md: '70%' },
                    }}
                  >
                    Rate and Review
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </List>
      </Box>
    </Container>

    // <Box>
    //   <Typography variant="h4">Events Available for Review</Typography>
    //   <List>
    //     {events.map((event) => (
    //       <ListItem key={event.event_id}>
    //         <ListItemText
    //           primary={event.event_name}
    //           secondary={event.end_date}
    //         />
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={() => router.push(`/review/${Number(event.event_id)}`)}
    //         >
    //           Rate and Review
    //         </Button>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Box>
  );
};

export default ReviewPage;
