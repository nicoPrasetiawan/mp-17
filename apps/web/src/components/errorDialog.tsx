import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string | null;
  errorTitle: string | null;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onClose,
  errorMessage,
  errorTitle
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {errorTitle}
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
            {errorMessage}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          autoFocus
          sx={{
            mt: 2,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
