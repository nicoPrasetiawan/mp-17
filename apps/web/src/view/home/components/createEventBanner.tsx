import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

const CreateEventBanner: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post your event now!
      </Typography> 
      <Link href="/create-event" passHref>
        <Button variant="contained" size="large">
          Create event
        </Button>
        </Link>
    </Box>
  );
};

export default CreateEventBanner;
