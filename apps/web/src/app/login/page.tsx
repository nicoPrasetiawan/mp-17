'use client';

import { useState, useEffect } from 'react';
import { Container, Box, Avatar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlices';
import ErrorIcon from '@mui/icons-material/Error';
import { useRouter } from 'next/navigation';
import LoginForm from './loginForm';
import LoginDialog from './loginDialog';
import WelcomeDialog from './welcomeDialog';
import { ILogin } from '@/interfaces/login.interface';

const initialValues: ILogin = {
  username: '',
  password: '',
};

function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [greetingOpen, setGreetingOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { loginStatus, user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: ILogin, actions: any) => {
    const { username, password } = values;

    try {
      await dispatch(login({ password, username }));
      if (loginStatus.isLogin) {
        setGreetingOpen(true);
        setTimeout(() => {
          setGreetingOpen(false);
          router.push('/');
        }, 3000); // Close the greeting dialog and redirect after 3 seconds
      }
    } catch (error) {
      console.error(error);
      setOpen(true); // Open the dialog on error
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (loginStatus.isLogin) {
      setGreetingOpen(true);
      setTimeout(() => {
        setGreetingOpen(false);
        router.push('/');
      }, 3000); // Close the greeting dialog and redirect after 3 seconds
    }
  }, [loginStatus.isLogin, router]);

  const handleClose = () => {
    setOpen(false);
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
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Add a light overlay color
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        }}
      />
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
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
          }}
        >
          <ErrorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm initialValues={initialValues} handleSubmit={handleSubmit} />
      </Box>
      <LoginDialog open={open} handleClose={handleClose} />
      <WelcomeDialog
        open={greetingOpen}
        username={user?.username}
        onClose={() => setGreetingOpen(false)}
      />
    </Container>
  );
}

export default Login;
