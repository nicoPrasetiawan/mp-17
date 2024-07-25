import React from 'react';
// import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';
import {Avatar, AvatarGroup, Box, IconButton, Card, Divider, CardOverflow, CardContent, Typography} from '@mui/joy';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

interface ReviewCardProps {
  eventName: string;
  comment: string;
  reviewerName: string;
  date: string;
  rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ eventName, comment, reviewerName, date, rating }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        height: 200,
        // to make the card resizable
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar alt={reviewerName} src="/avatar.jpg" size="lg" />
        <Rating value={rating} precision={0.25} readOnly />
        {/* {'⭐'.repeat(rating) + '☆'.repeat(5 - rating)} */}
      </Box>
      <CardContent>
        <Typography level="title-lg">{eventName}</Typography>
        <Typography level="body-sm">
          {comment}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: '#203160' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="white">
           {reviewerName}
          </Typography>
          <Divider orientation="vertical" sx={{ height: 20, bgcolor: 'white' }} />
          <Typography level="body-xs" fontWeight="md" textColor="white">
            {date}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default ReviewCard;
