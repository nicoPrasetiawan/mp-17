'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IRegister } from '../../interfaces/register.interface';
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
import { useAppDispatch } from '@/lib/hooks';
import { register } from '@/lib/features/auth/authSlices';

const registrationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  accountType: Yup.string().required('Account type is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  referral: Yup.string()
    .max(5, 'Referral code can be a maximum of 5 characters')
    .uppercase('Referral code must be in uppercase'),
});

const initialValues: IRegister = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  accountType: '',
  password: '',
  referral: '',
};

function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (values: IRegister) => {
    const {
      username,
      email,
      firstName,
      lastName,
      accountType,
      password,
      referral,
    } = values;

    try {
      setErrorMessage(null);
      setOpen(false);

      await dispatch(
        register({
          username,
          email,
          firstName,
          lastName,
          accountType: Number(accountType),
          password,
          referral,
        }),
      );
      router.push('/success-register');
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 500 && data === 'Invalid referrer code') {
          setErrorMessage('Invalid referral code');
        } else if (
          status === 500 &&
          data === 'Username or email already exists'
        ) {
          setErrorMessage('Username or email is already registered');
        } else {
          setErrorMessage(
            'An unexpected error occurred. Please try again later.',
          );
        }
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.',
        );
      }
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReferralChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const value = e.target.value.toUpperCase().slice(0, 5);
    setFieldValue('referral', value);
  };

  return (
    <Container
      maxWidth="sm"
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
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<IRegister>) => {
            const { values, errors, touched, setFieldValue, handleChange } =
              props;

            return (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    type="username"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.accountType && Boolean(errors.accountType)}
                  >
                    <InputLabel id="accountType-label">Account Type</InputLabel>
                    <Field
                      as={Select}
                      labelId="accountType-label"
                      id="accountType"
                      name="accountType"
                      label="Account Type"
                      onChange={(e: any) => {
                        setFieldValue('accountType', e.target.value);
                      }}
                    >
                      <MenuItem value="1">User</MenuItem>
                      <MenuItem value="2">Event Organizer</MenuItem>
                    </Field>
                    <FormHelperText>
                      {touched.accountType && errors.accountType}
                    </FormHelperText>
                  </FormControl>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="referral"
                    label="Referral"
                    type="referral"
                    name="referral"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleReferralChange(e, setFieldValue)
                    }
                    value={values.referral}
                    error={touched.referral && Boolean(errors.referral)}
                    helperText={touched.referral && errors.referral}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
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

export default Register;
