import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

const StringListInput = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      onChange([...value, inputValue]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index) => {
    const newList = value.filter((_, i) => i !== index);
    onChange(newList);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label={label}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        sx={{ 
          marginBottom: 1, 
          '& .MuiInputBase-root': {
            backgroundColor: '#DCDCDC', // Dopasowanie tła TextField
          }
        }}
      />
      <Button variant="contained" onClick={handleAddItem} fullWidth sx={{ marginBottom: 1 }}>
        Add
      </Button>
      <List>
        <AnimatePresence>
          {value.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={item} />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </Box>
  );
};

export default StringListInput;
