import { Typography, Box, Divider } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Transactions = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 4,
        py: 4,
        background:
          'linear-gradient(90deg, rgba(33,71,130,1) 0%, rgba(52,52,91,1) 27%, rgba(65,42,88,1) 69%, rgba(77,63,79,1) 100%)',
        borderRadius: '8px',
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          textTransform: 'uppercase',
          mb: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AttachMoneyIcon fontSize="large" />
        Transactions
      </Typography>
      <Divider
        sx={{
          width: '80px',
          height: '4px',
          backgroundColor: 'white',
          margin: '0 auto',
        }}
      />
    </Box>
  );
};

export default Transactions;
