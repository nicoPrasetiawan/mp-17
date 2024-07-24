import React from 'react';
import { Box, Button, Typography } from '@mui/joy';
import Link from 'next/link';

const CreateEventBanner: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 5,
        p: 2,
        borderRadius: 6,
        background:
          'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
        color: '#fff',
      }}
    >
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: '38px', sm: '52px', md: '64px' },
          fontWeight: 800,
          background:
            'linear-gradient(90deg, rgba(195,194,208,1) 0%, rgba(186,186,228,1) 22%, rgba(196,230,237,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Post your event now!
      </Typography>
      <Link href="/create-event" passHref>
        <Button
          variant="solid"
          size="lg"
          sx={{
            mt: 2,
            width: { xs: '40%', sm: '35%', md: '25%' },
            backgroundColor: '#FF7F50',
            color: '#fff',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#FF6347',
              transform: 'scale(1.05)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 2s ease-in-out',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Create event
        </Button>
        </Link>
    </Box>
  );
};

export default CreateEventBanner;
