'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAppDispatch } from '@/lib/hooks';
import { register } from '@/lib/features/auth/authSlices';
import { IRegister } from '../../interfaces/register.interface';
import RegisterForm from './registerForm';
import ErrorDialog from './errorDialog';
import SuccessDialog from './successDialog';
import { Box, Container, Avatar, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

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
      setOpenError(false);
      setSuccessMessage(null);
      setOpenSuccess(false);

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
      setSuccessMessage(
        'You have successfully registered! Please proceed to login.',
      );
      setOpenSuccess(true);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 500 && data === 'Invalid referrer code') {
          setErrorMessage('Invalid referral code. Please check and try again.');
        } else if (
          status === 500 &&
          data === 'Username or email already exists'
        ) {
          setErrorMessage('Username or email is already registered.');
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
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    router.push('/login');
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
          width: '100%', // Ensure the form container is responsive
          mt: 5,
          mb: 5,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
          <CheckCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegisterForm
          onSubmit={handleSubmit}
          handleReferralChange={handleReferralChange}
        />
      </Box>
      <ErrorDialog
        open={openError}
        onClose={handleCloseError}
        errorMessage={errorMessage}
      />
      <SuccessDialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        successMessage={successMessage}
      />
    </Container>
  );
};

export default Register;
