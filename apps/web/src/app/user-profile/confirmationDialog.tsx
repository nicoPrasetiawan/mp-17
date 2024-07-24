import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: (confirm: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
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
          <WarningIcon sx={{ color: '#FFA000' }} />
          Confirm Changes
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#fff' }}>
          Are you sure you want to save the changes?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose(false)}
          color="primary"
          sx={{
            color: '#FF6347',
            '&:hover': {
              color: '#FF7F50',
            },
          }}
        >
          CANCEL
        </Button>
        <Button
          onClick={() => onClose(true)}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: '#FF7F50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF6347',
            },
          }}
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
