import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string | null;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, onClose, errorMessage }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ErrorIcon sx={{ color: '#d32f2f' }} />
          Update Error
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{errorMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
