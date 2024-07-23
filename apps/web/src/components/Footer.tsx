'use client';

import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { usePathname } from 'next/navigation';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  const path: string = usePathname();

  return (
    <>
      {path.startsWith('/dashboard') ? (
        <></>
      ) : (
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#f1f1f1',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              © mp-17 2024. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <YouTubeIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Footer;
