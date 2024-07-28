import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Button, Box, Tooltip, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import axios from 'axios';

interface ProfileFormProps {
  user: any;
  isEditing: boolean;
  editedFirstName: string;
  editedLastName: string;
  editedEmail: string;
  setEditedFirstName: (value: string) => void;
  setEditedLastName: (value: string) => void;
  setEditedEmail: (value: string) => void;
  handleEditToggle: () => void;
  handleSave: () => void;
  loading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  isEditing,
  editedFirstName,
  editedLastName,
  editedEmail,
  setEditedFirstName,
  setEditedLastName,
  setEditedEmail,
  handleEditToggle,
  handleSave,
  loading,
}) => {
  const [tooltipContent, setTooltipContent] = useState<string>('Fetching validity information...');
  const [tooltipLoading, setTooltipLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchValidityInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/referral/${user.referralCode}`);
        const { valid_until } = response.data.data;
        const formattedDate = new Date(valid_until).toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setTooltipContent(`Valid until: ${formattedDate}`);
      } catch (error) {
        setTooltipContent('You currently have no points');
      } finally {
        setTooltipLoading(false);
      }
    };

    if (user.referralCode) {
      fetchValidityInfo();
    } else {
      setTooltipContent('No referral code available');
      setTooltipLoading(false);
    }
  }, [user.referralCode]);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          First Name
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editedFirstName}
            onChange={(e) => setEditedFirstName(e.target.value)}
            sx={{ mt: 1 }}
          />
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {user.firstName}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Last Name
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editedLastName}
            onChange={(e) => setEditedLastName(e.target.value)}
            sx={{ mt: 1 }}
          />
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {user.lastName}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Email
        </Typography>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            sx={{ mt: 1 }}
          />
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {user.email}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Role
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {user.roleName === 'user' ? 'User' : 'Event Organizer'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
          Referral Code
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {user.referralCode || 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            Point Balance
            <Tooltip title={tooltipLoading ? <CircularProgress size={24} /> : tooltipContent}>
              <IconButton sx={{ ml: 1 }}>
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
          {formatCurrency(user.pointBalance)}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<SaveIcon />}
            sx={{ px: 4 }}
            disabled={loading}
          >
            Save
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={handleEditToggle} startIcon={<EditIcon />} sx={{ px: 4 }}>
            Edit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
}

export default ProfileForm;
