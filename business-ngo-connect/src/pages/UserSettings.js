import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, Grid, Paper, Checkbox, FormControlLabel, Alert, Snackbar } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import { categories } from '../data/categories';
import { updateProfile, updatePassword, getUser } from '../services/userService';
import { motion } from 'framer-motion'; // Import framer-motion

// Definicja animacji
const pageVariants = {
  initial: { opacity: 0, y: 50 }, // Stan początkowy: niewidoczny, przesunięty w dół
  animate: { opacity: 1, y: 0 }, // Stan końcowy: widoczny, na właściwej pozycji
  exit: { opacity: 0, y: 50 } // Stan podczas wychodzenia: niewidoczny, przesunięty w dół
};

const UserSettingsPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    description: '',
    categories: [],
    images: []
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Zakładamy, że użytkownik o id=4 jest zalogowany
    const fetchData = async () => {
      try {
        const user = await getUser(4); // Funkcja do pobierania danych użytkownika
        setUserData(user);
        setSelectedCategories(user.categories || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(4, { ...userData, categories: selectedCategories });
      setAlertMessage('Dane użytkownika zostały zaktualizowane.');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('Błąd podczas aktualizacji danych.');
      setShowAlert(true);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setAlertMessage('Nowe hasła nie są zgodne.');
      setShowAlert(true);
      return;
    }

    try {
      await updatePassword(4, { currentPassword, newPassword });
      setAlertMessage('Hasło zostało zmienione.');
      setShowAlert(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setAlertMessage('Błąd podczas zmiany hasła.');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }} // Czas trwania animacji
      >
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <Grid container spacing={4}>
            {/* Lewa strona: Edycja danych użytkownika */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Informacje o firmie
                </Typography>
                <TextField
                  label="Nazwa"
                  fullWidth
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Opis"
                  fullWidth
                  multiline
                  rows={4}
                  value={userData.description}
                  onChange={(e) => setUserData({ ...userData, description: e.target.value })}
                  sx={{ marginBottom: 2 }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Wybierz kategorie działalności:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                      }
                      label={category}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileUpdate}
                  sx={{ marginTop: 2, backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
                  fullWidth
                >
                  Zaktualizuj dane
                </Button>
              </Paper>
            </Grid>

            {/* Prawa strona: Zmiana hasła */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Zmiana hasła
                </Typography>
                <TextField
                  label="Aktualne hasło"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Nowe hasło"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Powtórz nowe hasło"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasswordUpdate}
                  sx={{ marginTop: 2, backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
                  fullWidth
                >
                  Zmień hasło
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Alert */}
          <Snackbar
            open={showAlert}
            autoHideDuration={5000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserSettingsPage;
