'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import axios from 'axios';
import { updateUserProfile } from '@/lib/features/auth/authSlices';
import { Container, Box, Avatar, Typography, Paper, CircularProgress } from '@mui/material';
import ProfileForm from './profileForm';
import ConfirmationDialog from './confirmationDialog';
import SuccessDialog from './successDialog';
import ErrorDialog from './errorDialog';
import useAuthorizeUser from '@/lib/customHook/useAuthorizeUser';

const UserProfile = () => {
  const loadingAuth = useAuthorizeUser();

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(user.firstName);
  const [editedLastName, setEditedLastName] = useState(user.lastName);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/user/profile/${user.userId}`,
        {
          first_name: editedFirstName,
          last_name: editedLastName,
          email: editedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.status === 200) {
        setOpenDialog(false);
        setIsEditing(false);
        setOpenSuccessDialog(true);

        // Dispatch action to update user in the store
        dispatch(
          updateUserProfile({
            firstName: editedFirstName,
            lastName: editedLastName,
            email: editedEmail,
          }),
        );
      } else {
        setOpenErrorDialog(true);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setOpenErrorDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (confirm: boolean) => {
    if (confirm) {
      handleSave();
    } else {
      setOpenDialog(false);
    }
  };

  // to handle if unauthorized user try to access the page, the page will loading first
  if (loadingAuth) {
    return (
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          mt: 0,
          minHeight: 'calc(100vh - 84px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        mt: 0,
        minHeight: 'calc(100vh - 84px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
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
        <ProfileForm
          user={user}
          isEditing={isEditing}
          editedFirstName={editedFirstName}
          editedLastName={editedLastName}
          editedEmail={editedEmail}
          setEditedFirstName={setEditedFirstName}
          setEditedLastName={setEditedLastName}
          setEditedEmail={setEditedEmail}
          handleEditToggle={handleEditToggle}
          handleSave={() => setOpenDialog(true)}
          loading={loading}
        />
      </Paper>
      <ConfirmationDialog open={openDialog} onClose={handleDialogClose} />
      <SuccessDialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        successMessage="Your profile has been updated successfully."
      />
      <ErrorDialog
        open={openErrorDialog}
        onClose={() => setOpenErrorDialog(false)}
        errorMessage="Failed to update profile. Please try again later."
      />
    </Container>
  );
};

export default UserProfile;
