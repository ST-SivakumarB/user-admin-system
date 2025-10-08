import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Box,
  Typography
} from '@mui/material';
import AnimateButton from '../../component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import users from '../../data/user.json'; 

export default function AuthLogin() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      const user = users.find(
        (u) => u.username === values.email && u.password === values.password
      );

      if (user) {
        console.log('Login successful!', user);
        setAuthError('');
      } else {
        setAuthError('Invalid username or password');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(formik.touched.email && formik.errors.email)}>
        <InputLabel htmlFor="email">Email Address / Username</InputLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Email Address / Username"
        />
        {formik.touched.email && formik.errors.email && (
          <Typography color="error" variant="caption">
            {formik.errors.email}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={Boolean(formik.touched.password && formik.errors.password)}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <Typography color="error" variant="caption">
            {formik.errors.password}
          </Typography>
        )}
      </FormControl>

      {authError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {authError}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
