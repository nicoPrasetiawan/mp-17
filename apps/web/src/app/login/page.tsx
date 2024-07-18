'use client';

import { useState } from 'react';
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
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/auth/authSlices';

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
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    values: ILogin,
    actions: FormikHelpers<ILogin>,
  ) => {
    const { username, password } = values;

    try {
      await dispatch(login({ password, username }));
      router.push('/redirect');
    } catch (error) {
      console.error(error);
      setOpen(true); // Open the dialog on error
      actions.setSubmitting(false);
    }
  };

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
        PaperProps={{
          sx: {
            padding: '2rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.3s ease-out',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Invalid Login</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Invalid username or password. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;
