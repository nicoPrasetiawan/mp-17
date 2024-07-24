'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/authSlices';

function Header() {
  const path: string = usePathname();
  const router = useRouter();
  const { loginStatus, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setLogoutOpen(true);
    setTimeout(() => {
      setLogoutOpen(false);
      router.push('/');
      router.refresh(); // Re-render the page
    }, 3000); // Close the dialog and redirect after 3 seconds
    handleClose();
  };

  const open = Boolean(anchorEl);

  const menuItems = [
    <MenuItem
      key="home"
      component={Link}
      href="/"
      onClick={handleClose}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </MenuItem>,
    <Divider key="divider-home" />,
    <MenuItem
      key="profile"
      component={Link}
      href="/user-profile"
      onClick={handleClose}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </MenuItem>,
    <Divider key="divider-profile" />,
  ];

  if (user.roleId === 2) {
    menuItems.push(
      <MenuItem
        key="dashboard"
        component={Link}
        href="/dashboard"
        onClick={handleClose}
        sx={{
          borderRadius: '5px',
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </MenuItem>,
      <Divider key="divider-dashboard" />,
      <MenuItem
        key="create-event"
        component={Link}
        href="/create-event"
        onClick={handleClose}
        sx={{
          borderRadius: '5px',
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
      >
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Create Event" />
      </MenuItem>,
      <Divider key="divider-create-event" />,
    );
  }

  menuItems.push(
    <MenuItem
      key="logout"
      onClick={handleLogout}
      sx={{
        borderRadius: '5px',
        '&:hover': { backgroundColor: '#f0f0f0' },
      }}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </MenuItem>,
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background:
            'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
          transition: 'box-shadow 0.3s',
          top: 0,
          boxShadow: scrolled ? '0px 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
          width: '100%',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/" passHref>
                <img
                  src="/appLogo.svg"
                  alt="Logo"
                  style={{
                    height: '30px',
                    marginRight: '10px',
                    filter: 'invert(1)',
                  }}
                />
              </Link>
              EVENTICA
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {loginStatus.isLogin ? (
              <>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#228d96',
                      color: '#fff',
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{
                    '.MuiPaper-root': {
                      borderRadius: '10px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                      animation: 'fadeIn 0.3s ease-in-out',
                    },
                  }}
                >
                  {menuItems}
                </Menu>
              </>
            ) : (
              <>
                <Button
                  href="/login"
                  variant={path.startsWith('/login') ? 'contained' : 'outlined'}
                  sx={{
                    color: path.startsWith('/login') ? '#fff' : '#fff',
                    backgroundColor: path.startsWith('/login')
                      ? '#228d96'
                      : 'transparent',
                    borderColor: '#fff',
                    '&:hover': {
                      backgroundColor: path.startsWith('/login')
                        ? '#228d96'
                        : '#0a6169',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  href="/register"
                  variant={
                    path.startsWith('/register') ? 'contained' : 'outlined'
                  }
                  sx={{
                    color: path.startsWith('/register') ? '#fff' : '#fff',
                    backgroundColor: path.startsWith('/register')
                      ? '#228d96'
                      : 'transparent',
                    borderColor: '#fff',
                    '&:hover': {
                      backgroundColor: path.startsWith('/register')
                        ? '#228d96'
                        : '#0a6169',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '64px' }} /> {/* Adjust the margin to match the header height */}
      <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        sx={{
          '.MuiPaper-root': {
            background: 'linear-gradient(90deg, rgba(10,97,105,1) 0%, rgba(90,78,130,1) 29%, rgba(90,82,168,1) 65%, rgba(118,91,133,1) 100%)',
            color: '#fff',
            borderRadius: '10px',
            maxWidth: '600px',
            minWidth: '400px',
            textAlign: 'center',
          },
        }}
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <WavingHandIcon sx={{ color: '#4caf50', fontSize: 40 }} />
          {'See You Soon!'}
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
              <WavingHandIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <DialogContentText
              id="logout-dialog-description"
              sx={{
                color: '#fff',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {'You have successfully logged out.'}
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
