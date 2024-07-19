import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const CreateEventBanner: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post your event now!
      </Typography>
      <Button variant="contained" size="large">
        Create event
      </Button>
    </Box>
  );
};

export default CreateEventBanner;
