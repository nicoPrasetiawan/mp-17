"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import { Button, Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ReviewCard from './reviewCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '-20px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'primary.main',
        backgroundColor: 'white',
        boxShadow: 3,
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '-20px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'primary.main',
        backgroundColor: 'white',
        boxShadow: 3,
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
};

interface Review {
  review_id: number;
  user_id: number;
  event_id: number;
  rating: number;
  comment: string;
  created_at: string;
}

interface Event {
  event_id: number;
  event_name: string;
}

interface User {
  user_id: number;
  username: string;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [reviewsResponse, eventsResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/reviews'),
          axios.get('http://localhost:8000/api/events-all'),
          axios.get('http://localhost:8000/api/users'),
        ]);

        setReviews(reviewsResponse.data.data);
        setEvents(eventsResponse.data.data);
        setUsers(usersResponse.data.data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const findEventName = (eventId: number) => {
    const event = events.find((event) => event.event_id === eventId);
    return event ? event.event_name : 'Unknown Event';
  };

  const findUserName = (userId: number) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.username : 'Unknown User';
  };

  const handleOpenModal = (review: Review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedReview(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', md: '20px' } }}>
      <Typography
        level="h4"
        sx={{
          fontSize: { xs: '20px', md: '28px' },
          fontWeight: 800,
          color: '#1e0f00',
          mb: 3,
          borderBottom: '2px solid #1e0f00',
          display: 'inline-block',
          paddingBottom: '5px',
        }}
      >
        What People Say About Us
      </Typography>
      <Slider {...settings}>
        {reviews.map((review) => (
          <Box
            key={review.review_id}
            sx={{ padding: { xs: '5px', md: '10px' } }}
            onClick={() => handleOpenModal(review)}
          >
            <ReviewCard
              eventName={findEventName(review.event_id)}
              comment={review.comment}
              reviewerName={findUserName(review.user_id)}
              date={new Date(review.created_at).toLocaleDateString()}
              rating={review.rating}
              fullContent={false} // Display truncated content
            />
          </Box>
        ))}
      </Slider>

      {selectedReview && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleCloseModal}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: { xs: 320, md: 530 },
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="plain"
              sx={{ m: 1 }}
              onClick={handleCloseModal}
            />
            <ReviewCard
              eventName={findEventName(selectedReview.event_id)}
              comment={selectedReview.comment}
              reviewerName={findUserName(selectedReview.user_id)}
              date={new Date(selectedReview.created_at).toLocaleDateString()}
              rating={selectedReview.rating}
              fullContent={true} // Display full content
            />
          </Sheet>
        </Modal>
      )}
    </Box>
  );
};

export default ReviewList;
