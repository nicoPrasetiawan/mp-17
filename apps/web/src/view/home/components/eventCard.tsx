"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {Box} from '@mui/material';
import {Card, Button, CardActions, CardContent, Chip, Divider, List, ListItem, ListItemDecorator, Typography} from '@mui/joy';
import {LocationOnRounded,Check, KeyboardArrowRight, ConfirmationNumber} from '@mui/icons-material';

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
        // invertedColors
        sx={{ bgcolor:'#FFFFFF',color:'#203160',height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
        <LocationOnRounded/>
        <Chip size="sm" variant="outlined" >
          {event_location}
        </Chip>
      </Box>
        <Divider inset="none" />
      <CardContent>
        <Typography sx={{ color:'#203160' }} level="h2">{event_name}</Typography>
        <Typography level="body-md"
          sx={{ overflow: 'hidden',color:'#203160', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
        >
          {event_description}
        </Typography>

      </CardContent>
        <Divider  inset="none" />
        <CardActions>
        <Typography level="title-lg" sx={{ mr: 'auto', color:'#c57731' }}>
          {original_price === 0 ? 'FREE' : `Rp${new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(original_price)}`}
        </Typography>
          <Button onClick={() => onBuyTicket(event_id)} sx={{ bgcolor:'#203160', color:'#FFFFFF' }} startDecorator={<ConfirmationNumber />}>{original_price === 0 ? 'Get Ticket' : 'Buy Ticket'}</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EventCard;
