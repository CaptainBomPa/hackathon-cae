import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import BusinessCard from '../components/BusinessCard';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion'; // Import framer-motion

const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
};

const MainPage = () => {
    const [businesses, setBusinesses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '80vh',
                        padding: 0,
                        // margin: 0,
                    }}
                >
                    {/* Ikona i napis po lewej stronie */}
                    <Box
                        sx={{
                            flex: '0 1 20%', // Ustawienie minimalnej szerokości dla ikony i tekstu
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginRight: 5,
                            minWidth: "25%"
                        }}
                    >
                        <CloseIcon sx={{ fontSize: '5vw', marginBottom: 1, color: "#3F3F3FFF", }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '2vw',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                color: "#3F3F3FFF",
                            }}
                        >
                            Nie zainteresowany
                        </Typography>
                    </Box>

                    {/* Karta Biznesowa */}
                    <Box
                        sx={{
                            flex: '0 1 60%', // Ustawienie minimalnej szerokości dla ikony i tekstu
                            display: 'flex',
                            justifyContent: 'center',
                            minWidth: "50%"
                        }}
                    >
                        {businesses.length > 0 ? (
                            <BusinessCard
                                id={businesses[currentIndex].id}
                                name={businesses[currentIndex].name}
                                email={businesses[currentIndex].email}
                                images={businesses[currentIndex].images}
                                categories={businesses[currentIndex].categories}
                                description={businesses[currentIndex].description}
                                onSwipeLeft={handleSwipeLeft}
                                onSwipeRight={handleSwipeRight}
                            />
                        ) : (
                            <Typography variant="h6" align="center">
                                Brak dostępnych firm do wyświetlenia.
                            </Typography>
                        )}
                    </Box>

                    {/* Ikona i napis po prawej stronie */}
                    <Box
                        sx={{
                            flex: '0 1 20%', // Ustawienie minimalnej szerokości dla ikony i tekstu
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginLeft: 5,
                            minWidth: "25%"
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: '5vw', marginBottom: 1, color: "#3F3F3FFF", }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '2vw',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                color: "#3F3F3FFF",
                            }}
                        >
                            Zainteresowany
                        </Typography>
                    </Box>
                </Container>
            </motion.div>
        </DashboardLayout>
    );
};

export default MainPage;
