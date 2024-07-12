'use client';

import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IRegister } from '../interfaces/register.interface';
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
} from '@mui/material';
import { useRouter } from 'next/navigation';

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
  referral: Yup.string(),
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

  const handleSubmit = (values: any) => {
    console.log('Form data:', values);

    router.push('/success-register');
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
                      labelId="accoutType=label"
                      id="accountType"
                      name="accountType"
                      label="Account Type"
                      onChange={(e: any) => {
                        setFieldValue('accountType', e.target.value);
                      }}
                    >
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Event Organizer">
                        Event Organizer
                      </MenuItem>
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
                    onChange={handleChange}
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
    </Container>
  );
}

export default Register;
