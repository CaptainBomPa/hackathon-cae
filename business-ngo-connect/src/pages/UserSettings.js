import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Alert,
  Snackbar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DashboardLayout from '../components/DashboardLayout';
import { updateProfile, updatePassword, getUser } from '../services/userService';
import { getUserPhoto, updateUserPhoto } from '../services/photoService';
import CustomTextField from '../components/CustomTextField';

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

const filterOptions = [
  { label: 'Edit Profile', value: 'profile' },
  { label: 'Edit Photo', value: 'photo' },
  { label: 'Change Password', value: 'password' },
];

const UserSettingsPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photoUrl: '',
  });
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setLoggedInUserId(user.id);
        setUserData({
          ...userData,
          name: user.name || '',
          email: user.email || '',
        });

        try {
          const photoUrl = await getUserPhoto(user.id);
          setUserData((prevData) => ({ ...prevData, photoUrl }));
        } catch (error) {
          console.error('Error fetching user photo:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    if (!loggedInUserId) return;

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
    if (!loggedInUserId) return;

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
    if (!loggedInUserId || !selectedPhoto) return;

    try {
      const updatedUser = await updateUserPhoto(loggedInUserId, selectedPhoto);
      setUserData(updatedUser);
      setAlertMessage('Profile photo updated successfully.');
      setShowAlert(true);
      setSelectedPhoto(null);

      const photoUrl = await getUserPhoto(loggedInUserId);
      setUserData((prevData) => ({ ...prevData, photoUrl }));
    } catch (error) {
      setAlertMessage('Error uploading photo.');
      setShowAlert(true);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Paper
            sx={{
              paddingBottom: 7,
              paddingTop: 7,
              backgroundColor: '#f0f0f0', // Gray background
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center items
              borderRadius: '20px',
              width: '70%',
              marginTop:'10vh'
              
            }}
          >
            <Typography variant="h6" gutterBottom sx={{
              marginBottom:2
            }}>
              Update User Information
            </Typography>
            <TextField
              label="Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              sx={{ 
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                '& .MuiOutlinedInput-root': {
                  width: '50vh', // Ustawia szerokość dla komponentu OutlinedInput
                  borderRadius:'20px',
                },
               }}
            />
            <TextField
              label="Email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              sx={{ 
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                '& .MuiOutlinedInput-root': {
                  width: '50vh', // Ustawia szerokość dla komponentu OutlinedInput
                  borderRadius:'20px'
                },
               }}
            />
            <Button
              variant="contained"
              color="primary"
              
              onClick={handleProfileUpdate}
              sx={{ 
                width: '50vh',
                height: '6vh',
                borderRadius: '20px',
                marginTop: 2, 
                backgroundColor: 'rgba(65, 140, 181, 0.8)', 
                '&:hover': { backgroundColor: 'rgba(65, 140, 181, 1.0)' }
              }}
              fullWidth
            >
              Update Profile
            </Button>
          </Paper>
        );
      case 'password':
        return (
          <Paper
            sx={{
              padding: 7,
              backgroundColor: '#f0f0f0', // Gray background
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center items
              borderRadius: '20px',
              width:'70%',
              marginTop:'10vh'
            
            }}
          >
            <Typography variant="h6" gutterBottom sx={{
              marginBottom:2
            }}>
              Change Password
            </Typography>
            <TextField
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ 
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                '& .MuiOutlinedInput-root': {
                  width: '50vh', // Ustawia szerokość dla komponentu OutlinedInput
                  borderRadius:'20px'
                },
               }}
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ 
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                '& .MuiOutlinedInput-root': {
                  width: '50vh', // Ustawia szerokość dla komponentu OutlinedInput
                  borderRadius:'20px'
                },
               }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ 
                marginBottom: 2,
                '& .MuiInputLabel-root': {
                  fontSize: '18px', // Zwiększenie rozmiaru etykiety
                },
                '& .MuiOutlinedInput-root': {
                  width: '50vh', // Ustawia szerokość dla komponentu OutlinedInput
                  borderRadius:'20px'
                },
               }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordUpdate}
              sx={{ 
                width: '50vh',
                height: '6vh',
                borderRadius: '20px',
                marginTop: 2, 
                backgroundColor: 'rgba(65, 140, 181, 0.8)', 
                '&:hover': { backgroundColor: 'rgba(65, 140, 181, 1.0)' }
              }}
              fullWidth
            >
              Change Password
            </Button>
          </Paper>
        );
      case 'photo':
        return (
          <Paper
            sx={{
              padding: 7,
              backgroundColor: '#f0f0f0', // Gray background
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center items
              width:'70%',
              marginTop:'10vh'
            }}
          >
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
              sx={{ 
                width: '50vh',
                height: '6vh',
                borderRadius: '20px',
                marginTop: 2, 
                backgroundColor: 'rgba(65, 140, 181, 0.8)', 
                '&:hover': { backgroundColor: 'rgba(65, 140, 181, 1.0)' }
              }}              fullWidth
              disabled={!selectedPhoto}
            >
              Upload Photo
            </Button>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout >
      <Container maxWidth="lg" sx={{ marginTop: 2, background:'transparent' }}>
        <Grid container spacing={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '12%',
              height: '100%',
              backgroundColor: 'rgba(109, 109, 109, 0.4)',
              padding: 0,
              marginTop: "64px",
              marginRight: 4,
              position: 'fixed',
              left: 0,
              top: 0,
            }}
          >
            <List sx={{ width: '100%' }}>
              {filterOptions.map((option, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => setActiveTab(option.value)}
                  sx={{
                    backgroundColor:
                      activeTab === option.value
                        ? 'rgba(65, 140, 181, 0.6)'
                        : 'rgba(109, 109, 109, 0.0)',
                    '&:hover': {
                      backgroundColor: 'rgba(109, 109, 109, 0.6)',
                    },
                    opacity: 'inherit',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <ListItemText primary={option.label} sx={{ color: 'black' }} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Grid item xs={12} md={9} sx={{ 
            marginLeft: '30%', 
            height:'80vh',
            justifyContent:'center'
            }}> {/* Add margin to offset the fixed sidebar */}
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              {renderActiveTab()}
            </motion.div>
          </Grid>
        </Grid>

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
    </DashboardLayout>
  );
};

export default UserSettingsPage;
