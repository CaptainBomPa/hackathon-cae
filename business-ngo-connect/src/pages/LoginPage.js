import React, { useState } from 'react';
import { Container, Typography, Button, Box, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../components/CustomTextField';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import { login } from '../services/authService'; // Import login function

// Validation schema with yup
const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string()
    .required('Password is required'),
});

const LoginPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Formik form validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = await login(values.email, values.password);
        console.log(userData);
        navigate('/main'); // Redirect after successful login
      } catch (error) {
        setAlertMessage(error.message || 'Login failed');
        setShowAlert(true);
      }
    },
  });

  // Handle alert close
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial state: hidden, shifted down
      animate={{ opacity: 1, y: 0 }} // Final state: visible, in place
      exit={{ opacity: 0, y: 50 }} // Exit state: hidden, shifted down
      transition={{ duration: 0.5 }} // Animation duration
    >
      <Container 
        maxWidth="sm"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh' // Centers the form vertically and horizontally
        }}
      >
        <Box 
          sx={{ 
            backgroundColor: '#8F8F8F', 
            padding: 7, // Zwiększenie paddingu
            borderRadius: '20px', // Zaokrąglenie rogów formularza
            textAlign: 'center',
            width: '100%', 
            maxWidth: '500px' // Zwiększenie maksymalnej szerokości formularza
          }}
        >
          {/* Logo */}
          <Box mb={4}>
            <img src="/logo.png" alt="Logo" style={{ width: '200px' }} /> {/* Zwiększenie rozmiaru logo */}
          </Box>
          
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <CustomTextField 
              label="Email Address" 
              name="email"
              type="email" 
              fullWidth 
              required 
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ 
                '& .MuiInputBase-input': {
                  fontSize: '18px', // Zwiększenie rozmiaru tekstu w polu tekstowym
                },
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                
              }}
            />
            <CustomTextField 
              label="Password" 
              name="password"
              type="password" 
              fullWidth 
              required 
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ 
                '& .MuiInputBase-input': {
                  fontSize: '18px', // Zwiększenie rozmiaru tekstu w polu tekstowym
                },
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                  borderRadius: '20px'
                },
                
              }}
            />
            <Box mt={3}> {/* Zwiększenie odstępu */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ 
                  backgroundColor: 'rgba(65, 140, 181, 0.6)', 
                  '&:hover': { backgroundColor: 'rgba(65, 140, 181, 1.0)' }, 
                  fontSize: '20px', // Zwiększenie rozmiaru czcionki przycisku
                  padding: '12px 0', // Zwiększenie paddingu przycisku
                  borderRadius: '20px'
                }}
              >
                Log in
              </Button>
            </Box>
          </form>

          <Box mt={3} textAlign="center"> {/* Zwiększenie odstępu */}
            <Typography variant="body1" style={{ color: '#fff' }}> {/* Zwiększenie rozmiaru tekstu linku */}
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#fff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Sign up here
              </Link>{' '}
              to create an account.
            </Typography>
          </Box>

          <Snackbar
            open={showAlert}
            autoHideDuration={10000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
