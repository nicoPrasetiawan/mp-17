import React from 'react';
import { Box, Button, Typography } from '@mui/joy';
import Link from 'next/link';

const CreateEventBanner: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: 5, p:2 }} bgcolor={'#c9cdd6'} borderRadius={6}>
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: "38px", sm: "52px", md: "64px" },
          fontWeight: 800,
        }}
      >
        Post your event now!
      </Typography>
      {/* <Typography variant="h4" gutterBottom>
        Post your event now!
      </Typography>  */}
      <Link href="/create-event" passHref>
        <Button
            variant="solid" 
            size="lg" 
            sx={{ 
              mt:2, 
              width:{xs:'40%',sm:'35%',md:'25%'}, 
              bgcolor:'#203160', 
              borderRadius:'8px',
            }}  >
          Create event
        </Button>
        </Link>
    </Box>
  );
};

export default CreateEventBanner;
