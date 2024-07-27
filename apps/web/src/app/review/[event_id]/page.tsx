"use client";
import { useRouter, useParams } from 'next/navigation'; // Correct import for App Router
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Box, Typography, Button, TextField, Container } from '@mui/material';
import { useFormik } from 'formik';
import { useAppSelector } from '@/lib/hooks';
import ErrorDialog from '../../../components/errorDialog';
import SuccessDialog from '../../../components/successDialog';

const ReviewSubmissionPage = () => {
  const router = useRouter();
  const params = useParams();
  const event_id = params.event_id;  // Extract event_id from the URL
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

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
      setErrorMessage(null);
      setOpenError(false);
      setSuccessMessage(null);
      setOpenSuccess(false);

      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/api/review', {
          user_id: user.userId,
          event_id: Number(event_id),  // Use event_id from URL
          rating: values.rating,
          comment: values.comment
        });
        if (response.status === 201) {
          setSuccessMessage(
            'You have successfully posted a review!',
          );
          setOpenSuccess(true);
          // router.push('/');
        } else {
          console.error('Error posting review:', response);
          setErrorMessage(
            'Error posting review.',
          );
        }
      } catch (error) {
        setErrorMessage(
          'Error posting review. Please try again later.',
        );
        console.error('Error posting review:', error);
        setOpenError(true);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    router.push('/');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
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
        minHeight: '100vh',
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
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          mt: 5,
          mb: 5,
        }}
      >
        <Typography         
          variant="h3"
          sx={{
            fontSize: { xs: '38px', sm: '52px', md: '64px' },
            fontWeight: 800,
            background:
              'linear-gradient(90deg, rgba(155,154,208,1) 0%, rgba(136,136,228,1) 22%, rgba(146,180,237,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
            }}>
              Submit a Review!
        </Typography>
        <br/>
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
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor:'rgb(106, 98, 167)', color:'#FFFFFF','&:hover': { bgcolor:'rgba(10,97,105,1)'}}}>
            Submit Review
          </Button>
        </form>
      </Box>
      <ErrorDialog
        open={openError}
        onClose={handleCloseError}
        errorMessage={errorMessage}
        errorTitle={"Review Error"}
      />
      <SuccessDialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        successMessage={successMessage}
        buttonText={"Go to HomePage"}
      />
    </Container>
  );
};

export default ReviewSubmissionPage;
