import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import {
  Fastfood,
  School,
  MusicNote,
  Movie,
  EmojiEmotions,
} from '@mui/icons-material';

const categoryIcons: {
  [key: string]: { icon: React.ReactNode; label: string };
} = {
  '1': { icon: <EmojiEmotions fontSize="large" />, label: 'Comedy' },
  '2': { icon: <Fastfood fontSize="large" />, label: 'Food' },
  '3': { icon: <School fontSize="large" />, label: 'Education' },
  '4': { icon: <MusicNote fontSize="large" />, label: 'Music' },
  '5': { icon: <Movie fontSize="large" />, label: 'Film' },
};

interface QuickFilterProps {
  onCategoryClick: (categoryValue: string) => void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ onCategoryClick }) => {
  return (
    <Box
      id="eventList"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={3}
      mb={3}
    >
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={12}
        mt={2}
        mb={0}
      >
        {Object.entries(categoryIcons).map(([value, { icon, label }]) => (
          <Tooltip title={label} key={value}>
            <IconButton
              onClick={() => onCategoryClick(value)}
              sx={{
                color: '#228d96',
                border: '2px solid #228d96',
                borderRadius: '50%',
                padding: '20px',
                transition: 'all 0.3s ease-in-out',
                fontSize: '2.5rem',
                '&:hover': {
                  backgroundColor: '#0a6169',
                  color: '#FFFFFF',
                },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default QuickFilter;
