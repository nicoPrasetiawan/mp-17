'use client';
import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  IconButton,
  Container,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import DrawerComponent from './drawer';
import EventList from './evenList';
import AttendeeRegistrations from './attendeeRegistrations';
import Transactions from './transactions';
import Statistics from './statistics';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { Event } from './types';

const drawerWidth = 205;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  marginTop: 0,
  paddingTop: 0,
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  minHeight: 27,
  justifyContent: 'space-between',
}));

const getEvents = async (organizer_id: string) => {
  const response = await axios.get(
    `http://localhost:8000/api/events-dashboard/${organizer_id}`,
  );

  return response.data.data;
};

function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('Events');
  const { loginStatus, user } = useAppSelector((state) => state.auth);
  const organizer_id = user?.userId;
  const theme = useTheme();

  useEffect(() => {
    const fetchEvents = async () => {
      if (organizer_id && selectedMenu === 'Events') {
        try {
          setLoading(true);
          const events = await getEvents(String(organizer_id));
          setEvents(events);
        } catch (err) {
          console.error('Failed to fetch events:', err);
          if (err instanceof Error) {
            setError(err);
          } else {
            setError(new Error('Unknown error occurred'));
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, [organizer_id, selectedMenu]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Events':
        return <EventList events={events} loading={loading} error={error} />;
      case 'Attendee Registrations':
        return <AttendeeRegistrations />;
      case 'Transactions':
        return <Transactions />;
      case 'Statistics':
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBarStyled
        position="fixed"
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DASHBOARD
          </Typography>
        </Toolbar>
      </AppBarStyled>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <DrawerComponent
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleDrawerClose={handleDrawerClose}
            open={open}
            theme={theme}
            drawerWidth={drawerWidth}
            setSelectedMenu={setSelectedMenu}
          />
        </Box>
        <Main open={open}>
          <DrawerHeader />
          <Container sx={{ paddingTop: 0, marginTop: 0 }}>
            {renderContent()}
          </Container>
        </Main>
      </Box>
    </Box>
  );
}

export default Dashboard;
