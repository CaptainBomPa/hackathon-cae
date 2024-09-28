import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Box, Alert, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import StyledToggleButton from '../components/StyledToggleButton';
import CustomTextField from '../components/CustomTextField';
import { ToggleButtonGroup } from '@mui/material';
import CategoryCheckbox from '../components/CategoryCheckbox';
import { Link, useNavigate } from 'react-router-dom'; // Dodany import useNavigate
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone'; // Import z react-dropzone
import { ImageList, ImageListItem, IconButton } from '@mui/material'; // Import z Material UI
import DeleteIcon from '@mui/icons-material/Delete'; // Ikona usuwania
import { register } from '../services/authService'; // Import funkcji rejestracji
import { categories } from '../data/categories';



// Schemat walidacji z yup
const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana'),
  email: yup.string().email('Niepoprawny adres e-mail').required('Adres e-mail jest wymagany'),
  password: yup.string()
    .min(8, 'Hasło musi mieć przynajmniej 8 znaków')
    .matches(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną dużą literę')
    .matches(/[a-z]/, 'Hasło musi zawierać przynajmniej jedną małą literę')
    .matches(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę')
    .required('Hasło jest wymagane'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Hasła muszą być takie same')
    .required('Powtórzenie hasła jest wymagane'),
  description: yup.string().min(50, 'Opis musi mieć przynajmniej 50 znaków').required('Opis jest wymagany'),
});

const RegisterPage = () => {
  const [role, setRole] = useState('business');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [images, setImages] = useState([]); // Stan na obrazy
  const navigate = useNavigate(); // Hook do nawigacji

  // Funkcja obsługująca walidację formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        if (selectedCategories.length === 0 || images.length === 0) {
          setAlertMessage('Formularz zawiera błędy! Wybierz przynajmniej jedną kategorię i dodaj przynajmniej jedno zdjęcie.');
          setShowAlert(true);
        } else {
          try {
            // Tworzenie obiektu FormData
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('type', role);
            formData.append('description', values.description);
            selectedCategories.forEach((category, index) => {
              formData.append(`categories[${index}]`, category);
            });
      
            // Dodawanie obrazów do FormData
            images.forEach((image, index) => {
              formData.append('images', image); // `image` musi być obiektem File, nie tylko linkiem
            });
      
            // Rejestracja użytkownika
            await register(formData); // Przekazujemy FormData do funkcji rejestracji
            navigate('/main');
          } catch (error) {
            setAlertMessage(error.message || 'Rejestracja nie powiodła się');
            setShowAlert(true);
          }
        }
      },
  });

  // Obsługa zamknięcia alertu
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleRoleChange = (event, newRole) => {
    setRole(newRole);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 5) {
      setAlertMessage('Możesz dodać maksymalnie 5 zdjęć.');
      setShowAlert(true);
      return;
    }

    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (imageToRemove) => {
    setImages(images.filter((image) => image !== imageToRemove));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 5,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Stan początkowy: niewidoczny, przesunięty w dół
      animate={{ opacity: 1, y: 0 }} // Stan końcowy: widoczny, na właściwej pozycji
      exit={{ opacity: 0, y: 50 }} // Stan podczas wychodzenia: niewidoczny, przesunięty w dół
      transition={{ duration: 0.5 }} // Czas trwania animacji
    >
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: 10, color: "#82ff82" }}>
          REJESTRACJA
        </Typography>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="User Role"
          fullWidth
          sx={{ marginBottom: 1 }}
        >
          <StyledToggleButton value="business">Biznes</StyledToggleButton>
          <StyledToggleButton value="ngo">Organizacja społeczna</StyledToggleButton>
        </ToggleButtonGroup>
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <CustomTextField
            label="Nazwa"
            name="name"
            fullWidth
            required
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <CustomTextField
            label="Powtórz hasło"
            name="confirmPassword"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <CustomTextField
            label="Opis"
            name="description"
            multiline
            rows={4}
            fullWidth
            required
            margin="normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Typography variant="subtitle1" gutterBottom>
            Wybierz kategorie działalności:
          </Typography>
          <Grid container spacing={1}>
            {categories.map((category) => (
              <CategoryCheckbox
                key={category}
                category={category}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            Dodaj zdjęcia (maksymalnie 5):
          </Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #82ff82',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(130, 255, 130, 0.1)',
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body2" color="textSecondary">
              Przeciągnij i upuść zdjęcia tutaj lub kliknij, aby wybrać pliki.
            </Typography>
          </Box>
          <ImageList cols={3} rowHeight={120} sx={{ marginTop: 2 }}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image.preview}
                  alt={`preview-${index}`}
                  loading="lazy"
                  style={{ borderRadius: '5px', objectFit: 'cover' }}
                />
                <IconButton
                  sx={{ position: 'absolute', top: 5, right: 5, color: '#ff0000' }}
                  onClick={() => handleRemoveImage(image)}
                >
                  <DeleteIcon />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
            >
              Zarejestruj się
            </Button>
          </Box>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Posiadasz już konto?{' '}
            <Link
              to="/login"
              style={{
                color: '#82ff82',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Kliknij tutaj
            </Link>{' '}
            aby przejść do strony logowania.
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

export default RegisterPage;
