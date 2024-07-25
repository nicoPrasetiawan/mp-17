import React from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { IRegister } from '../../interfaces/register.interface';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material';

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

interface RegisterFormProps {
  onSubmit: (values: IRegister) => void;
  handleReferralChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  handleReferralChange,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IRegister>) => {
        const { values, errors, touched, setFieldValue, handleChange } = props;
        return (
          <Form>
            <Box sx={{ mt: 1 }}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
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
                  sx={{ textAlign: 'left' }}
                >
                  <MenuItem value="1" sx={{ textAlign: 'left' }}>
                    User
                  </MenuItem>
                  <MenuItem value="2" sx={{ textAlign: 'left' }}>
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
  );
};

export default RegisterForm;
