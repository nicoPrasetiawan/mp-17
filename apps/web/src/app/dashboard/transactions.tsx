import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface EventDetail {
  event_id: number;
  organizer_id: number;
  event_name: string;
  event_description: string;
}

interface Transaction {
  transaction_id: number;
  event_id: number;
  event: EventDetail;
  user_id: number;
  number_of_ticket: number;
  type: string;
  final_price: number;
  discount_applied: number;
  earlybird_applied: number;
  points_redeemed: number;
  ticket_status: string;
}

interface TransactionsProps {
  organizer_id: number;
}

const Transactions = ({ organizer_id }: TransactionsProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/transactions/${organizer_id}`);
        setTransactions(response.data.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [organizer_id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load transactions. Please try again later.
      </Alert>
    );
  }

  // Calculate summaries
  const totalFinalPrice = transactions.reduce((acc, transaction) => acc + transaction.final_price, 0);
  const totalTickets = transactions.reduce((acc, transaction) => acc + transaction.number_of_ticket, 0);
  const totalTransactions = transactions.length;

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
          mb: 4,
        }}
      />
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          textAlign: 'left',
          boxShadow: 1,
          p: 3,
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Number of Tickets</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Final Price</TableCell>
                <TableCell>Discount Applied</TableCell>
                <TableCell>Earlybird Applied</TableCell>
                <TableCell>Points Redeemed</TableCell>
                <TableCell>Ticket Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.transaction_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell>{transaction.event.event_name}</TableCell>
                  <TableCell>{transaction.user_id}</TableCell>
                  <TableCell>{transaction.number_of_ticket}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.final_price}</TableCell>
                  <TableCell>{transaction.discount_applied}</TableCell>
                  <TableCell>{transaction.earlybird_applied}</TableCell>
                  <TableCell>{transaction.points_redeemed}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        backgroundColor: transaction.ticket_status === 'success-paid' ? 'green' : 'darkorange',
                        color: 'white',
                        textTransform: 'capitalize',
                      }}
                    >
                      {transaction.ticket_status === 'success-paid' ? 'Success' : 'Pending'}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Summary
          </Typography>
          <Box>
            <Typography variant="body1" component="div">
              <strong>Total Transactions:</strong> {totalTransactions}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Total Tickets Sold:</strong> {totalTickets}
            </Typography>
            <Typography variant="body1" component="div">
              <strong>Total GTV:</strong> IDR {totalFinalPrice.toLocaleString('id-ID')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;
