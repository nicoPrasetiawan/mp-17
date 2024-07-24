'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  const handleScroll = () => {
    const element = document.getElementById('eventList');
    if (element) {
      const offset = -100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        background:
          'linear-gradient(120deg, rgba(10,97,105,0.9) 0%, rgba(90,78,130,0.9) 29%, rgba(90,82,168,0.9) 65%, rgba(118,91,133,0.9) 100%)',
        color: '#fff',
        minHeight: '82vh', // To set height of the section
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)', // Soft overlay effect
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: '#fff',
          zIndex: -1,
          clipPath: 'ellipse(50% 100% at 50% 100%)',
        }}
      />
      <Box sx={{ flex: 1, padding: '20px' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 'bold',
            animation: 'fadeInUp 1s ease-in-out',
            background:
              'linear-gradient(90deg, rgba(195,194,208,1) 0%, rgba(186,186,228,1) 22%, rgba(196,230,237,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Discover and manage your events with ease
        </Typography>
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            animation: 'fadeInUp 1.5s ease-in-out',
            background:
              'linear-gradient(90deg, rgba(195,194,208,1) 0%, rgba(186,186,228,1) 22%, rgba(196,230,237,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Everything you need to make your event successful, right at your
          fingertips.
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '18px',
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
          onClick={handleScroll}
        >
          GET STARTED
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          textAlign: 'right',
          padding: '20px',
          animation: 'shrinkIn 2s ease-in-out',
          '@keyframes shrinkIn': {
            '0%': { opacity: 0, transform: 'scale(1.2)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Event Management"
          style={{
            maxWidth: '100%',
            borderRadius: '10px',
            animation: 'zoomIn 2s ease-in-out',
          }}
        />
      </Box>
      <style jsx global>{`
        @keyframes animateBackground {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-50%);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shrinkIn {
          0% {
            opacity: 0;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
}

export default HeroSection;
