import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';

const CategoryCheckbox = ({ category, selectedCategories, handleCategoryChange }) => {
  return (
    <Grid item>
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
            sx={{
              color: selectedCategories.includes(category) ? '#82ff82' : 'rgba(0, 0, 0, 0.54)',
              transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(130, 255, 130, 0.1)',
                transform: 'scale(1.1)',
              },
              '&.Mui-checked': {
                color: '#82ff82',
                transform: 'scale(1.2)',
              },
            }}
          />
        }
        label={category}
        sx={{ color: selectedCategories.includes(category) ? '#82ff82' : 'inherit' }}
      />
    </Grid>
  );
};

export default CategoryCheckbox;
