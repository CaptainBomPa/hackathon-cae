import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const BusinessCard = ({ id, name, email, image, description, onSwipeLeft, onSwipeRight }) => {
  const [swipeBackgroundColor, setSwipeBackgroundColor] = useState('white');
  const [position, setPosition] = useState(0); // Stan do przechowywania pozycji karty

  const maxSwipeDistance = 150; // Maksymalna odległość, na jaką można przesunąć kartę w jedną stronę

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
    },
    onSwipeEnd: () => {
      setSwipeBackgroundColor('white');
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
      animate={{ x: position }}
      initial={{ x: 0 }}
      exit={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag="x"
      dragConstraints={{ left: -maxSwipeDistance, right: maxSwipeDistance }} // Ograniczenie przeciągania
      dragElastic={0.1} // Zmniejszona elastyczność, aby karta wracała szybciej
      onDrag={(event, info) => {
        const offsetX = info.offset.x;
        setPosition(offsetX);
      }}
      onDragEnd={(event, info) => {
        const offsetX = info.offset.x;
        if (offsetX >= maxSwipeDistance) {
          onSwipeRight();
        } else if (offsetX <= -maxSwipeDistance) {
          onSwipeLeft();
        }
        setPosition(0);
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="300"
          src={`http://localhost:4000/api/user/photo/${id}`}
          alt={`${name} image`}
          sx={{ borderRadius: '16px 16px 0 0' }}
        />
      </Box>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {email}
        </Typography>
      </CardContent>
    </motion.div>
  );
};

export default BusinessCard;
