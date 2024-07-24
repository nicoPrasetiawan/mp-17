import React from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { ILogin } from '@/interfaces/login.interface';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
});

interface LoginFormProps {
  initialValues: ILogin;
  handleSubmit: (values: ILogin, actions: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<ILogin>) => {
        const { values, errors, touched, handleChange, isSubmitting } = props;

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
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
