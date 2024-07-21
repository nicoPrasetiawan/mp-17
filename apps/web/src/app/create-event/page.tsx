'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IEvent } from '../../interfaces/event.interface';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppSelector } from '@/lib/hooks';

const eventSchema = Yup.object({
  eventName: Yup.string().required('Event name is required').max(191, 'Have a concise event name (max: 191 character)'),
  eventDescription: Yup.string().required('Event description is required').max(2000, 'Have a concise event description (max: 2000 character)'),
  startDate: Yup.date().required('Start time is required'),
  endDate: Yup.date().required('End time is required').min(
    Yup.ref('startDate'),
    'End-time must be later than start-time'
  ),
  ticketType: Yup.string().required('Ticket type is required'),
  originalPrice: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
  location: Yup.string().required('Location is required'),
  category: Yup.string().required('Category is required'),
  totalSeats: Yup.number().required('Number of seats is required').min(1, 'Number of seats must be at least 1'),
});

const initialEventValues: IEvent = {
  organizerId: 0,
  eventName: '',
  eventDescription: '',
  startDate: new Date(),
  endDate: new Date(),
  ticketType: '',
  originalPrice: 0,
  location: 0,
  category: 0,
  totalSeats: 0,
};



// NETWORK CALL
const createEvent = async ({
    organizerId,
    eventName,
    eventDescription,
    startDate,
    endDate,
    // ticketType,
    originalPrice,
    location,
    category,
    totalSeats,
}: IEvent) => {
  const event = await axios.post('http://localhost:8000/api/events', {
    organizer_id: organizerId,
    event_name: eventName,
    event_description: eventDescription,
    start_date: startDate ? new Date(startDate).toISOString() : undefined,
    end_date: endDate ? new Date(endDate).toISOString() : undefined,
    // ticketType,
    original_price: originalPrice,
    location_id: location,
    // category,
    total_seats: totalSeats,
    category_id: category
  });
  return event;
};

function CreateEvent() {
  const {user} = useAppSelector((state)=> state.auth)
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<IEvent>(initialEventValues);

  // Saya tambah userEffect supaya komponen nya di render ulang, dan bisa ngambil value user.userId
  useEffect(() => {
    if (user) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        organizerId: user.userId, // saya re-assign value nya ke user.userId
      }));
    }
  }, [user]);

  const handleSubmit = async (values: IEvent) => {
    try {
      setErrorMessage(null);
      setOpen(false);
      console.log(values)
      await createEvent(values);
      router.push('/success-create-event');
    } catch (error: any) {
      console.error("Complete error object:", error);
      if (axios.isAxiosError(error)) {
        // Detailed Axios error handling
        if (error.response) {
          setErrorMessage(`Error: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
          setErrorMessage("No response from the server. Please check your network connection.");
        } else {
          setErrorMessage("Request setup failed before sending.");
        }
      } else {
        // Non-Axios error
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        mt: 5,
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: 4,
          borderRadius: 5,
          boxShadow: 3
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Post your event!
        </Typography>
        <Formik
          initialValues={initialValues} // Disesuaikan ulang, jadinya pakai value yang di useState karna ada re-assign organizerId yg sebelumnya
          enableReinitialize // supaya value yang initialEventValues bisa di reinitialize ke initialValues
          validationSchema={eventSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<IEvent>) => {
            const { values, errors, touched, setFieldValue, handleChange } = props;

            return (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="eventName"
                    label="What’s the title of your event?"
                    name="eventName"
                    onChange={handleChange}
                    value={values.eventName}
                    error={touched.eventName && Boolean(errors.eventName)}
                    helperText={touched.eventName && errors.eventName}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    id="eventDescription"
                    label="Tell your audiences more about the event!"
                    name="eventDescription"
                    onChange={handleChange}
                    value={values.eventDescription}
                    error={touched.eventDescription && Boolean(errors.eventDescription)}
                    helperText={touched.eventDescription && errors.eventDescription}
                  />

                  <FormControl fullWidth margin="normal" sx={{ mt: 4 }}>
                    <InputLabel htmlFor="startDate" sx={{ position: 'absolute', transform: 'translate(0, -1.5rem) scale(0.75)', transformOrigin: 'top left', backgroundColor: '#f9f9f9', padding: '0 0.25rem', color: '#757575' }}>
                      Start Time
                    </InputLabel>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      id="startDate"
                      type="datetime-local"
                      name="startDate"
                      onChange={(e:any) => {
                        setFieldValue('startDate', e.target.value);
                      }}
                      value={values.startDate}
                      error={touched.startDate && Boolean(errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>

                  <FormControl fullWidth margin="normal" sx={{ mt: 4 }}>
                    <InputLabel htmlFor="endDate" sx={{ position: 'absolute', transform: 'translate(0, -1.5rem) scale(0.75)', transformOrigin: 'top left', backgroundColor: '#f9f9f9', padding: '0 0.25rem', color: '#757575' }}>
                      End Time
                    </InputLabel>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      id="endDate"
                      type="datetime-local"
                      name="endDate"
                      onChange={(e:any) => {
                        setFieldValue('endDate', e.target.value);
                      }}
                      value={values.endDate}
                      error={touched.endDate && Boolean(errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.ticketType && Boolean(errors.ticketType)}
                  >
                    <InputLabel id="ticketType-label">Ticket Type</InputLabel>
                    <Field
                      as={Select}
                      labelId="ticketType-label"
                      id="ticketType"
                      name="ticketType"
                      label="Ticket Type"
                      onChange={(e: any) => {
                        setFieldValue('ticketType', e.target.value);
                      }}
                      value={values.ticketType}
                    >
                      <MenuItem value="free">Free</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                    </Field>
                    <FormHelperText>
                      {touched.ticketType && errors.ticketType}
                    </FormHelperText>
                  </FormControl>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="originalPrice"
                    label="Price"
                    type="number"
                    name="originalPrice"
                    onChange={handleChange}
                    value={values.originalPrice}
                    disabled={values.ticketType === 'free'}
                    error={touched.originalPrice && Boolean(errors.originalPrice)}
                    helperText={touched.originalPrice && errors.originalPrice}
                  />
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.location && Boolean(errors.location)}
                  >
                    <InputLabel id="location-label">Location</InputLabel>
                    <Field
                      as={Select}
                      labelId="location-label"
                      id="location"
                      name="location"
                      label="Location"
                      onChange={(e: any) => {
                        setFieldValue('location', parseInt(e.target.value));
                      }}
                      value={values.location}
                    >
                        <MenuItem value="1">Aceh</MenuItem>
                        <MenuItem value="2">Sumatera Utara</MenuItem>
                        <MenuItem value="3">Sumatera Barat</MenuItem>
                        <MenuItem value="4">Riau</MenuItem>
                        <MenuItem value="5">Jambi</MenuItem>
                        <MenuItem value="6">Sumatera Selatan</MenuItem>
                        <MenuItem value="7">Bengkulu</MenuItem>
                        <MenuItem value="8">Lampung</MenuItem>
                        <MenuItem value="9">Kepulauan Bangka Belitung</MenuItem>
                        <MenuItem value="10">Kepulauan Riau</MenuItem>
                        <MenuItem value="11">DKI Jakarta</MenuItem>
                        <MenuItem value="12">Jawa Barat</MenuItem>
                        <MenuItem value="13">Jawa Tengah</MenuItem>
                        <MenuItem value="14">DI Yogyakarta</MenuItem>
                        <MenuItem value="15">Jawa Timur</MenuItem>
                        <MenuItem value="16">Banten</MenuItem>
                        <MenuItem value="17">Bali</MenuItem>
                        <MenuItem value="18">Nusa Tenggara Barat</MenuItem>
                        <MenuItem value="19">Nusa Tenggara Timur</MenuItem>
                        <MenuItem value="20">Kalimantan Barat</MenuItem>
                        <MenuItem value="21">Kalimantan Tengah</MenuItem>
                        <MenuItem value="22">Kalimantan Selatan</MenuItem>
                        <MenuItem value="23">Kalimantan Timur</MenuItem>
                        <MenuItem value="24">Kalimantan Utara</MenuItem>
                        <MenuItem value="25">Sulawesi Utara</MenuItem>
                        <MenuItem value="26">Sulawesi Tengah</MenuItem>
                        <MenuItem value="27">Sulawesi Selatan</MenuItem>
                        <MenuItem value="28">Sulawesi Tenggara</MenuItem>
                        <MenuItem value="29">Gorontalo</MenuItem>
                        <MenuItem value="30">Sulawesi Barat</MenuItem>
                        <MenuItem value="31">Maluku</MenuItem>
                        <MenuItem value="32">Maluku Utara</MenuItem>
                        <MenuItem value="33">Papua</MenuItem>
                        <MenuItem value="34">Papua Barat</MenuItem>
                        <MenuItem value="35">Papua Tengah</MenuItem>
                        <MenuItem value="36">Papua Pegunungan</MenuItem>
                        <MenuItem value="37">Papua Selatan</MenuItem>
                        <MenuItem value="38">Papua Barat Daya</MenuItem>

                    </Field>
                    <FormHelperText>
                      {touched.location && errors.location}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.category && Boolean(errors.category)}
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Field
                      as={Select}
                      labelId="category-label"
                      id="category"
                      name="category"
                      label="Category"
                      onChange={(e: any) => {
                        setFieldValue('category', parseInt(e.target.value));
                      }}
                      value={values.category}
                    >
                      <MenuItem value="1">Comedy</MenuItem>
                      <MenuItem value="2">Food</MenuItem>
                      <MenuItem value="3">Education</MenuItem>
                      <MenuItem value="4">Music</MenuItem>
                      <MenuItem value="5">Film</MenuItem>
                    </Field>
                    <FormHelperText>
                      {touched.category && errors.category}
                    </FormHelperText>
                  </FormControl>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="totalSeats"
                    label="Number of seats"
                    type="number"
                    name="totalSeats"
                    onChange={handleChange}
                    value={values.totalSeats}
                    error={touched.totalSeats && Boolean(errors.totalSeats)}
                    helperText={touched.totalSeats && errors.totalSeats}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create event
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Oopss...'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateEvent;
