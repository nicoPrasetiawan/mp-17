import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
  Box,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '.MuiPaper-root': {
          backgroundColor: '#ffebee',
          color: '#d32f2f',
          borderRadius: '10px',
          maxWidth: '500px',
          minWidth: '300px',
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontWeight: 'bold',
          justifyContent: 'center',
        }}
      >
        <ErrorIcon sx={{ color: '#d32f2f' }} />
        {'Login Error'}
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
          <Avatar sx={{ bgcolor: '#d32f2f', width: 60, height: 60 }}>
            <ErrorIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: '#d32f2f',
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Invalid username or password. Please try again.
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
