import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ReviewCard from './reviewCard';

const ReviewList: React.FC = () => {
  const reviews = [
    { eventName: 'Ini Event 1', comment: 'Event Ini sangat bagus sekali!', reviewerName: 'Topik Suranto', date: '2024-07-17', rating: 4 },
    { eventName: 'Jogja Itu Istimewa', comment: 'Keren banget ini event', reviewerName: 'Ndi Surandi', date: '2024-07-17', rating: 3.5 },
    { eventName: 'Konser Malam Merdeka', comment: 'Pengalaman yang luar biasa dan tidak terlupakan!', reviewerName: 'Mane Surahman', date: '2024-07-18', rating: 5 },
    { eventName: 'Festival Kuliner Nusantara', comment: 'Makanan enak dan suasana sangat meriah.', reviewerName: 'Abdul Si Adul', date: '2024-07-19', rating: 4.5 },
    { eventName: 'Pameran Seni Kontemporer', comment: 'Seni yang dipamerkan sangat inovatif dan menginspirasi.', reviewerName: 'Dani Suabdan', date: '2024-07-20', rating: 4 },
    { eventName: 'Pertunjukan Tari Tradisional', comment: 'Sangat menampilkan budaya lokal dengan indah.', reviewerName: 'Bady Sujabad', date: '2024-07-21', rating: 3.8 },
    { eventName: 'Konferensi Teknologi Masa Depan', comment: 'Informasi yang sangat berguna dan pembicara yang hebat.', reviewerName: 'Rizki Surizki', date: '2024-07-22', rating: 4.2 }
];


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h2"
        color={'#1e0f00'}
        sx={{
          fontSize: '24px',
          fontWeight: 800,
          mb:3
        }}
      >
        Latest Reviews
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ReviewCard {...review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewList;
