"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';

interface Event {
  event_id: number;
  event_name: string;
  end_date: string;

}

const ReviewPage = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events-for-review/${user.userId}`);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (events.length === 0) {
    return <div>No events available for review.</div>;
  }

  return (
    <Box>
      <Typography variant="h4">Events Available for Review</Typography>
      <List>
        {events.map(event => (
          <ListItem key={event.event_id}>
            <ListItemText primary={event.event_name} secondary={event.end_date} />
            <Button variant="contained" color="primary" onClick={() => router.push(`/review/${Number(event.event_id)}`)}>
              Rate and Review
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ReviewPage;
