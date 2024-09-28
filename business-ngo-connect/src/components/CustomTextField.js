import React from 'react';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(128, 128, 128, 0.3)',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const CustomTextField = (props) => {
  return <StyledTextField variant="outlined" {...props} />;
};

export default CustomTextField;
