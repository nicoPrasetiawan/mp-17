import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface EventCardProps {
  title: string;
  body: string;
  isFree?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ title, body, isFree = false }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {isFree ? (
            <Button variant="outlined" color="success">
              Free
            </Button>
          ) : (
            <Button variant="contained">Buy ticket</Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
