import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, Grid, Paper, Alert, Snackbar, Avatar, IconButton } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import { updateProfile, updatePassword, getUser } from '../services/userService';
import { getUserPhoto, updateUserPhoto } from '../services/photoService'; // Import funkcji do obsługi zdjęć
import { motion } from 'framer-motion'; // Import framer-motion
import PhotoCamera from '@mui/icons-material/PhotoCamera'; // Ikona do przesyłania zdjęcia

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
    photoUrl: '',
  });
  const [loggedInUserId, setLoggedInUserId] = useState(null); // Przechowywanie ID zalogowanego użytkownika
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Przechowywanie wybranego zdjęcia

  // Przy pobraniu danych z localStorage zakładamy, że klucz 'user' przechowuje informacje o zalogowanym użytkowniku
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setLoggedInUserId(user.id); // Ustawienie ID użytkownika z localStorage
        
        // Pobieranie danych użytkownika
        setUserData({
          ...userData,
          name: user.name || '',
          email: user.email || '',
        });

        try {
          const photoUrl = await getUserPhoto(user.id); // Pobieranie zdjęcia użytkownika
          setUserData((prevData) => ({ ...prevData, photoUrl })); // Aktualizacja URL zdjęcia
        } catch (error) {
          console.error('Error fetching user photo:', error);
        }
      }
    };
    fetchUserData();
  }, []); // Pusty array dependencies oznacza, że useEffect wykona się tylko raz po montażu komponentu

  const handleProfileUpdate = async () => {
    if (!loggedInUserId) return; // Jeśli brak ID użytkownika, nie wykonujemy operacji

    try {
      await updateProfile(loggedInUserId, { name: userData.name, email: userData.email });
      setAlertMessage('User information updated successfully.');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('Error updating user information.');
      setShowAlert(true);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!loggedInUserId) return; // Jeśli brak ID użytkownika, nie wykonujemy operacji

    if (newPassword !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }

    try {
      await updatePassword(loggedInUserId, { currentPassword, newPassword });
      setAlertMessage('Password updated successfully.');
      setShowAlert(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setAlertMessage('Error updating password.');
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handlePhotoUpload = async () => {
    if (!loggedInUserId || !selectedPhoto) return; // Jeśli brak ID użytkownika lub zdjęcia, nie wykonujemy operacji

    try {
      const updatedUser = await updateUserPhoto(loggedInUserId, selectedPhoto);
      setUserData(updatedUser); // Aktualizacja danych użytkownika z nowym zdjęciem
      setAlertMessage('Profile photo updated successfully.');
      setShowAlert(true);
      setSelectedPhoto(null); // Zresetowanie wybranego zdjęcia

      // Pobranie nowego zdjęcia po aktualizacji
      const photoUrl = await getUserPhoto(loggedInUserId);
      setUserData((prevData) => ({ ...prevData, photoUrl }));
    } catch (error) {
      setAlertMessage('Error uploading photo.');
      setShowAlert(true);
    }
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
                  Update User Information
                </Typography>
                <TextField
                  label="Name"
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileUpdate}
                  sx={{ marginTop: 2, backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
                  fullWidth
                >
                  Update Profile
                </Button>
              </Paper>
            </Grid>

            {/* Prawa strona: Zmiana hasła */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Confirm New Password"
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
                  Change Password
                </Button>
              </Paper>
            </Grid>

            {/* Dodatkowy panel: Aktualizacja zdjęcia profilowego */}
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Update Profile Photo
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Avatar src={userData.photoUrl} sx={{ width: 120, height: 120, marginRight: 2 }} />
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{ backgroundColor: '#82ff82', '&:hover': { backgroundColor: '#70e270' } }}
                  >
                    <PhotoCamera />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setSelectedPhoto(e.target.files[0])}
                    />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePhotoUpload}
                  sx={{ marginTop: 2, backgroundColor: '#418cb5', '&:hover': { backgroundColor: '#3179a3' } }}
                  fullWidth
                  disabled={!selectedPhoto} // Disable button if no photo selected
                >
                  Upload Photo
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
