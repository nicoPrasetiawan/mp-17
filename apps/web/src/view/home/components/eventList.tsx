import React from 'react';
import { Grid, Box } from '@mui/material';
import EventCard from './eventCard';

const EventList: React.FC = () => {
  const events = [
    { title: 'Event 1', body: 'Description for Event 1', isFree: true },
    { title: 'Event 2', body: 'Description for Event 2' },
    // Add more events as needed
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <EventCard title={event.title} body={event.body} isFree={event.isFree} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;
