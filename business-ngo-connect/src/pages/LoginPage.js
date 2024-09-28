import React, { useState } from 'react';
import { Container, Typography, Button, Box, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../components/CustomTextField';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion
import { login } from '../services/authService'; // Import funkcji logowania z authService

// Schemat walidacji z yup
const validationSchema = yup.object({
  email: yup.string().email('Niepoprawny adres e-mail').required('Adres e-mail jest wymagany'),
  password: yup.string()
    .min(8, 'Hasło musi mieć przynajmniej 8 znaków')
    .required('Hasło jest wymagane'),
});

const LoginPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate(); // Hook do nawigacji

  // Funkcja obsługująca walidację formik
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
        // Przekierowanie na stronę główną lub inny komponent
        navigate('/main'); // Zamień na odpowiedni adres
      } catch (error) {
        setAlertMessage(error.message || 'Logowanie nie powiodło się');
        setShowAlert(true);
      }
    },
  });

  // Obsługa zamknięcia alertu
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Stan początkowy: niewidoczny, przesunięty w dół
      animate={{ opacity: 1, y: 0 }} // Stan końcowy: widoczny, na właściwej pozycji
      exit={{ opacity: 0, y: 50 }} // Stan podczas wychodzenia: niewidoczny, przesunięty w dół
      transition={{ duration: 0.5 }} // Czas trwania animacji
    >
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: 10, color: "#82ff82" }}>
          LOGOWANIE
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <CustomTextField 
            label="Adres e-mail" 
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
          />
          <CustomTextField 
            label="Hasło" 
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
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
            >
              Zaloguj się
            </Button>
          </Box>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Nie posiadasz konta?{' '}
            <Link
              to="/register"
              style={{
                color: '#82ff82',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Kliknij tutaj
            </Link>{' '}
            aby przejść do formularza rejestracyjnego.
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
      </Container>
    </motion.div>
  );
};

export default LoginPage;
