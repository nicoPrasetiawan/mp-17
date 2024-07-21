'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(user.firstName);
  const [editedLastName, setEditedLastName] = useState(user.lastName);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // logic to save changes after edit
    setIsEditing(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 0,
        minHeight: 'calc(100vh - 84px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            mb: 4,
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            {user.username}
          </Typography>
        </Box>
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
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
              Point Balance
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
              {formatCurrency(user.pointBalance)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          >
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                startIcon={<SaveIcon />}
                sx={{ px: 4 }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEditToggle}
                startIcon={<EditIcon />}
                sx={{ px: 4 }}
              >
                Edit
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
