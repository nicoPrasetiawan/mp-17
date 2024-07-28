"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Card, Button, CardActions, CardContent, Chip, Divider, Typography } from '@mui/joy';
import { LocationOnRounded, ConfirmationNumber } from '@mui/icons-material';

interface EventCardProps {
  event_name: string;
  event_description: string;
  event_id: number;
  original_price: number;
  event_location: string;
  onBuyTicket: (event_id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event_name, event_description, onBuyTicket, event_id, event_location, original_price }) => {
  const router = useRouter();

  return (
    <Box>
      <Card
        size="lg"
        variant="outlined"
        color="neutral"
        sx={{
          bgcolor: '#FFFFFF',
          color: '#203160',
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          },
          animation: 'fadeInUp 2s ease-in-out',
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <LocationOnRounded sx={{ color: "rgba(10,97,105,1)" }} />
          <Chip size="sm" variant="outlined">
            {event_location}
          </Chip>
        </Box>
        <Divider inset="none" />
        <CardContent>
          <Typography sx={{ color: 'rgba(10,97,105,1)' }} level="h2">{event_name}</Typography>
          <Typography
            level="body-md"
            sx={{
              overflow: 'hidden',
              color: '#203160',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {event_description}
          </Typography>
        </CardContent>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto', color: '#c57731' }}>
            {original_price === 0 ? 'FREE' : `Rp${new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(original_price)}`}
          </Typography>
          <Button
            onClick={() => onBuyTicket(event_id)}
            sx={{ bgcolor: 'rgb(106, 98, 167)', color: '#FFFFFF', '&:hover': { bgcolor: 'rgba(10,97,105,1)' } }}
            startDecorator={<ConfirmationNumber />}
          >
            {original_price === 0 ? 'Get Ticket' : 'Buy Ticket'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EventCard;
