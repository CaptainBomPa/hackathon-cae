import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessCard = ({ id, name, email, images, categories, description, onSwipeLeft, onSwipeRight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swipeBackgroundColor, setSwipeBackgroundColor] = useState('white');
  const [position, setPosition] = useState(0); // Stan do przechowywania pozycji karty
  const [dragging, setDragging] = useState(false); // Zmienna pomocnicza do śledzenia przeciągania

  const maxSwipeDistance = 150; // Maksymalna odległość, na jaką można przesunąć kartę w jedną stronę

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (Math.abs(position) >= maxSwipeDistance) {
        onSwipeLeft();
      }
      setSwipeBackgroundColor('white');
    },
    onSwipedRight: () => {
      if (Math.abs(position) >= maxSwipeDistance) {
        onSwipeRight();
      }
      setSwipeBackgroundColor('white');
    },
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setSwipeBackgroundColor('rgba(255, 23, 68, 0.1)');
      } else if (eventData.dir === 'Right') {
        setSwipeBackgroundColor('rgba(76, 175, 80, 0.1)');
      }
    },
    onSwipeStart: () => {
      setSwipeBackgroundColor('white');
      setDragging(true); // Zaczyna przeciąganie
    },
    onSwipeEnd: () => {
      setSwipeBackgroundColor('white');
      setDragging(false); // Kończy przeciąganie
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <motion.div
      {...swipeHandlers}
      style={{
        maxWidth: 600,
        margin: 'auto',
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        background: swipeBackgroundColor,
        position: 'relative',
        transition: 'background 0.3s',
      }}
      whileTap={{ cursor: 'grabbing' }}
      animate={{ x: position }}
      initial={{ x: 0 }}
      exit={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag="x"
      dragConstraints={{ left: -maxSwipeDistance, right: maxSwipeDistance }} // Ograniczenie przeciągania
      dragElastic={0.1} // Zmniejszona elastyczność, aby karta wracała szybciej
      onDragStart={() => setDragging(true)} // Ustawienie zmiennej na true na początku przeciągania
      onDrag={(event, info) => {
        const offsetX = info.offset.x;
        
        // Ograniczenie przesuwania karty tylko do maksymalnej wartości
        if (Math.abs(offsetX) >= maxSwipeDistance) {
          setPosition(offsetX > 0 ? maxSwipeDistance : -maxSwipeDistance);
        } else {
          setPosition(offsetX);
        }
      }}
      onDragEnd={(event, info) => {
        const offsetX = info.offset.x;

        // Po zakończeniu przeciągania, jeśli karta jest wystarczająco przesunięta, wywołanie odpowiednich funkcji
        if (offsetX >= maxSwipeDistance) {
          onSwipeRight();
          setPosition(0); // Reset pozycji karty
        } else if (offsetX <= -maxSwipeDistance) {
          onSwipeLeft();
          setPosition(0); // Reset pozycji karty
        } else {
          setPosition(0); // Powrót do środkowej pozycji
        }
        setDragging(false); // Zakończenie przeciągania
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, x: position > 0 ? 50 : -50 }} // Startowe przesunięcie w zależności od kierunku
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: position > 0 ? -50 : 50 }} // Końcowe przesunięcie w zależności od kierunku
            transition={{ duration: 0.3 }}
            style={{ position: 'relative' }}
          >
            <CardMedia
              component="img"
              height="300"
              src={`http://localhost:4000/${id}/${images[currentImageIndex]}`}
              alt={`${name} image ${currentImageIndex + 1}`}
              sx={{ borderRadius: '16px 16px 0 0' }}
            />
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <ArrowForward />
                </IconButton>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 1 }}>
          {categories.map((category, index) => (
            <Chip key={index} label={category} sx={{ backgroundColor: '#82ff82', color: '#000000' }} />
          ))}
        </Box>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </motion.div>
  );
};

export default BusinessCard;
