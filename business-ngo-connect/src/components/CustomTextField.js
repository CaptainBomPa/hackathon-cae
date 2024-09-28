import React from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#DCDCDC', // Ustaw tło na #DCDCDC
    borderRadius: '20px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#418CB5', // Kolor obramowania na #418CB5 (R65, G140, B181 w HEX)
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#418CB5', // Zmieniony kolor podczas najechania
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#418CB5', // Zmieniony kolor podczas fokusa
  },
}));

const CustomTextField = (props) => {
  return <StyledTextField variant="outlined" {...props} />;
};

export default CustomTextField;
