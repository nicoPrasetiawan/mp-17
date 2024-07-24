import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  successMessage: string | null;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, successMessage }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background:
            'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
          color: '#fff',
          borderRadius: '10px',
          maxWidth: '500px',
          minWidth: '300px',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: '#4caf50' }} />
          Profile Update Success
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#fff' }}>{successMessage}</DialogContentText>
      </DialogContent>
      <Box textAlign="center" pb={3}>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          autoFocus
          sx={{
            mt: 2,
            backgroundColor: '#FF7F50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
          }}
        >
          CLOSE
        </Button>
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;
