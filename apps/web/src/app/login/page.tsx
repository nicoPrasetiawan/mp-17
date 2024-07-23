'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ILogin } from '../../interfaces/login.interface';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlices';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
});

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

  const handleSubmit = async (
    values: ILogin,
    actions: FormikHelpers<ILogin>,
  ) => {
    const { username, password } = values;

    try {
      await dispatch(login({ password, username }));
      if (loginStatus.isLogin) {
        setGreetingOpen(true);
        setTimeout(() => {
          setGreetingOpen(false);
          router.push('/');
        }, 1000); // Close the greeting dialog and redirect after 1 second
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
      }, 1000); // Close the greeting dialog and redirect after 1 second
    }
  }, [loginStatus.isLogin, router]);

  const handleClose = () => {
    setOpen(false);
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
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<ILogin>) => {
            const { values, errors, touched, handleChange, isSubmitting } =
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
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    LOGIN
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
        sx={{
          '.MuiPaper-root': {
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            borderRadius: '10px',
            maxWidth: '500px',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold',
            justifyContent: 'center',
          }}
        >
          <ErrorIcon sx={{ color: '#d32f2f' }} />
          {'Login Error'}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: '#d32f2f', width: 60, height: 60 }}>
              <ErrorIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                color: '#d32f2f',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Invalid username or password. Please try again.
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={greetingOpen}
        aria-labelledby="greeting-dialog-title"
        aria-describedby="greeting-dialog-description"
        sx={{
          '.MuiPaper-root': {
            backgroundColor: '#e0f7fa',
            color: '#00796b',
            borderRadius: '10px',
            maxWidth: '500px',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle
          id="greeting-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold',
            justifyContent: 'center',
          }}
        >
          <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 40 }} />
          {'Welcome Back!'}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <DialogContentText
              id="greeting-dialog-description"
              sx={{
                color: '#00796b',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {`Hello ${user?.username}, great to see you again!`}
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Login;
