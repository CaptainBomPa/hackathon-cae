import React, { useState, useEffect } from 'react';
import { Container, Box, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import BusinessCard from '../components/BusinessCard';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { motion } from 'framer-motion';
import {
  getCompanyRecommendations,
  getVolunteerRecommendations,
  getNgoCompanyRecommendations,
  getNgoVolunteerRecommendations,
} from '../services/mainService';

const pageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const MainPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const role = storedUser.role.toLowerCase();
      setUserRole(role);
      setUserId(storedUser.id);
      setSelectedFilter(role === 'business' || role === 'volunteer' ? 'ngo' : 'companies');
      fetchData(role, storedUser.id, role === 'business' || role === 'volunteer' ? 'ngo' : 'companies');
    }
  }, []);

  const fetchData = async (role, id, filter) => {
    try {
      let response;
      switch (role) {
        case 'ngo':
          response = filter === 'companies'
            ? await getNgoCompanyRecommendations(id)
            : await getNgoVolunteerRecommendations(id);
          break;
        case 'business':
          response = await getCompanyRecommendations(id);
          break;
        case 'volunteer':
          response = await getVolunteerRecommendations(id);
          break;
        default:
          throw new Error('Invalid role');
      }
      setBusinesses(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex < businesses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < businesses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleFilter = (filterType) => {
    setSelectedFilter(filterType);
    fetchData(userRole, userId, filterType);
  };

  const getFilterOptions = () => {
    switch (userRole) {
      case 'ngo':
        return [
          { label: 'Search NGO', value: 'ngo' }, // Dodanie opcji 'Search NGO' dla NGO
          { label: 'Search Companies', value: 'companies' },
          { label: 'Search Volunteers', value: 'volunteers' },
        ];
      case 'business':
      case 'volunteer':
        return [
          { label: 'Search NGO', value: 'ngo' },
        ];
      default:
        return [];
    }
  };

  const filterOptions = getFilterOptions();

  return (
    <DashboardLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            height: '87vh',
            padding: 0,
          }}
        >
          {/* Lewy panel z przyciskami filtrowania */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '12%',
              height: '100%', // Pełna wysokość kontenera
              backgroundColor: 'rgba(109, 109, 109, 0.4)', // Ustawienie tła z opacity
              padding: 0,
              marginTop: "64px",
              marginRight: 4, // Dodanie odstępu od głównej zawartości
              position: 'fixed', // Ustawienie pozycji na stałe przy lewej krawędzi
              left: 0, // Przesunięcie listy do lewej krawędzi
              top: 0, // Przesunięcie listy do góry
            }}
          >
            <List sx={{ width: '100%' }}>
              {filterOptions.map((option, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleFilter(option.value)}
                  sx={{
                    backgroundColor:
                      selectedFilter === option.value
                        ? 'rgba(65, 140, 181, 0.6)'
                        : 'rgba(109, 109, 109, 0.0)', // Zmiana tła po wybraniu
                    '&:hover': {
                      backgroundColor: 'rgba(109, 109, 109, 0.6)', // Zmiana opacity po najechaniu
                    },
                    opacity: 'inherit', // Dziedziczenie opacity całej listy
                    transition: 'background-color 0.3s ease', // Płynne przejście tła
                  }}
                >
                  <ListItemText primary={option.label} sx={{ color: 'black' }} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Główna zawartość */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
              marginLeft: '20%', // Przesunięcie zawartości głównej w prawo, aby nie była zasłonięta przez lewy panel
              marginTop: '5%'
            }}
          >
            {/* Karta Biznesowa */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 8, // Zwiększony odstęp między kartą a przyciskami
                width: '100%',
              }}
            >
              {businesses.length > 0 ? (
                <BusinessCard
                  id={businesses[currentIndex].id}
                  name={businesses[currentIndex].name}
                  email={businesses[currentIndex].email}
                  image={businesses[currentIndex].image}
                  description={businesses[currentIndex].description}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                />
              ) : (
                <Typography variant="h6" align="center">
                  No data available to display.
                </Typography>
              )}
            </Box>

            {/* Przyciski akcji */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <IconButton
                sx={{
                  backgroundColor: '#E38888', // Zmieniony kolor tła przycisku X
                  color: 'black',
                  width: 64, // Zwiększony rozmiar przycisku
                  height: 64, // Zwiększony rozmiar przycisku
                  '&:hover': { backgroundColor: '#ff6666' },
                }}
                onClick={handleSwipeLeft}
              >
                <CloseIcon sx={{ fontSize: '2rem' }} />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: '#61B688', // Zmieniony kolor tła przycisku serca
                  color: 'black',
                  width: 64, // Zwiększony rozmiar przycisku
                  height: 64, // Zwiększony rozmiar przycisku
                  '&:hover': { backgroundColor: '#66ff66' },
                }}
                onClick={handleSwipeRight}
              >
                <FavoriteBorderIcon sx={{ fontSize: '2rem' }} />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: '#9DADBC', // Zmieniony kolor tła przycisku do skipowania
                  color: 'black',
                  width: 64, // Zwiększony rozmiar przycisku
                  height: 64, // Zwiększony rozmiar przycisku
                  '&:hover': { backgroundColor: '#999999' },
                }}
                onClick={handleSwipeRight}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </motion.div>
    </DashboardLayout>
  );
};

export default MainPage;
