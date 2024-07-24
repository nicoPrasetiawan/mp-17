import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  Box,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

interface WelcomeDialogProps {
  open: boolean;
  username?: string;
  onClose: () => void;
}

const WelcomeDialog: React.FC<WelcomeDialogProps> = ({
  open,
  username,
  onClose,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Dialog will close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  const handleButtonClick = () => {
    onClose();
    router.push('/');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="greeting-dialog-title"
      aria-describedby="greeting-dialog-description"
      sx={{
        '.MuiPaper-root': {
          background:
            'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
          color: '#fff',
          borderRadius: '10px',
          maxWidth: '600px', // Increased width
          minWidth: '400px',
          textAlign: 'center',
        },
      }}
    >
      <DialogTitle
        id="greeting-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 40 }} />
        {'Welcome Back!'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: '#4caf50', width: 60, height: 60 }}>
            <CheckCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <DialogContentText
            id="greeting-dialog-description"
            sx={{
              color: '#fff',
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {`Hello ${username}, great to see you again!`}
          </DialogContentText>
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
            }}
            onClick={handleButtonClick}
          >
            Home
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
