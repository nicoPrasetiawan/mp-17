"use client";
import { useRouter, useParams } from 'next/navigation'; // Correct import for App Router
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAppSelector } from '@/lib/hooks';

const ReviewSubmissionPage = () => {
  const router = useRouter();
  const params = useParams();
  const event_id = params.event_id;  // Extract event_id from the URL
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!event_id) {
      console.error('Invalid event ID');
    }
  }, [event_id]);

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: ''
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/api/review', {
          user_id: user.userId,
          event_id: Number(event_id),  // Use event_id from URL
          rating: values.rating,
          comment: values.comment
        });
        if (response.status === 200) {
          router.push('/');
        } else {
          console.error('Error posting review:', response);
        }
      } catch (error) {
        console.error('Error posting review:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Submit a Review</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Rating"
          type="number"
          name="rating"
          value={formik.values.rating}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          type="text"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
      </form>
    </Box>
  );
};

export default ReviewSubmissionPage;
