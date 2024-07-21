import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Event } from './types';

interface EventListProps {
  events: Event[];
  loading: boolean;
  error: Error | null;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

const EventList = ({ events, loading, error }: EventListProps) => {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Events
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '50vh' }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">
          Failed to load events. Please try again later.
        </Alert>
      ) : events.length === 0 ? (
        <Typography variant="h6" align="center">
          No events available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ flex: 1 }}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={event.event_id || index}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {event.event_name || 'N/A'}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {event.event_description || 'N/A'}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2">
                    <strong>Event ID:</strong> {event.event_id}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong>{' '}
                    {event.original_price === 0
                      ? 'FREE EVENT'
                      : formatCurrency(event.original_price)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Start Date:</strong>{' '}
                    {event.start_date
                      ? new Date(event.start_date).toLocaleString()
                      : 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>End Date:</strong>{' '}
                    {event.end_date
                      ? new Date(event.end_date).toLocaleString()
                      : 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong>{' '}
                    {event.location ? event.location.city_name : 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong>{' '}
                    {event.categories && event.categories.length > 0
                      ? event.categories
                          .map((cat) => cat.category.name)
                          .join(', ')
                      : 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Total Seats:</strong> {event.total_seats || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Available Seats:</strong>{' '}
                    {event.available_seats || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventList;
