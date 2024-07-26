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
  fullContent: boolean;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};
const ReviewCard: React.FC<ReviewCardProps> = ({ eventName, comment, reviewerName, date, rating, fullContent}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: fullContent ? { xs: 290, md: 500 } : 320,
        height: fullContent ? 320 : 200,
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
        <Typography
          level="body-sm"
          sx={{
            overflow: 'hidden',
            color: '#203160',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: fullContent ? '' : 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {comment}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'rgba(90,78,130,0.99)' }}> 
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="white">
           {reviewerName}
          </Typography>
          <Divider orientation="vertical" sx={{ height: 20, bgcolor: 'white' }} />
          <Typography level="body-xs" fontWeight="md" textColor="white">
            {formatDate(date)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default ReviewCard;
