import React from 'react';
import { Box, IconButton } from '@mui/joy';
import {Typography } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SchoolIcon from '@mui/icons-material/School';
import MovieIcon from '@mui/icons-material/Movie';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

const categories = [
  { icon: <TheaterComedyIcon sx={{ fontSize: 60 }} />, label: 'Comedy', value: '1' },
  { icon: <LocalDiningIcon sx={{ fontSize: 60 }} />, label: 'Food', value: '2' },
  { icon: <SchoolIcon sx={{fontSize: 60 }} />, label: 'Education', value: '3' },
  { icon: <MusicNoteIcon sx={{fontSize: 60 }} />, label: 'Music', value: '4' },
  { icon: <MovieIcon sx={{ fontSize: 60 }} />, label: 'Film', value: '5' },  
];

const CategoryIcons: React.FC<{ selectedCategory: string, onChange: (value: string) => void }> = ({ selectedCategory, onChange }) => {
  return (
    <Box id="eventList" display="flex" flexDirection="column" alignItems="center" mt={3} mb={3}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #228d96, #0a6169)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          '::after': {
            content: '""',
            position: 'absolute',
            width: '50%',
            height: '3px',
            backgroundColor: '#228d96',
            left: '25%',
            bottom: '-10px',
            borderRadius: '5px',
          },
        }}
      >
        Browse Events by Your Interests
      </Typography>
      <Box display="flex" justifyContent="center" gap={9.5} padding={1} flexWrap="wrap">
        {categories.map((category) => (
          <Box key={category.value} textAlign="center" sx={{ margin: '8px' }}>
            <IconButton
              size="lg"
              variant={selectedCategory === category.value ? 'solid' : 'outlined'}
              onClick={() => onChange(selectedCategory === category.value ? "" : category.value)}
              sx={{
                borderRadius: '50%',
                width: '87px',
                height: '87px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedCategory === category.value ? 'rgb(98, 90, 159)' : 'rgba(0, 0, 255, 0.1)',
                color: selectedCategory === category.value ? 'white' : '#203160',
                '&:hover': {
                  backgroundColor: selectedCategory === category.value ? 'rgb(106, 98, 167)' : 'transparent',
                  border: '8px solid rgb(98, 90, 159)'
                },
              }}
            >
              {category.icon}
            </IconButton>
            <Typography>{category.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryIcons;
