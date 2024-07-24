import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ReviewCard from './reviewCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '-20px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'primary.main',
        backgroundColor: 'white',
        boxShadow: 3,
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '-20px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        color: 'primary.main',
        backgroundColor: 'white',
        boxShadow: 3,
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
};

const ReviewList: React.FC = () => {
  const reviews = [
    {
      eventName: 'Ini Event 1',
      comment: 'Event Ini sangat bagus sekali!',
      reviewerName: 'Topik Suranto',
      date: '2024-07-17',
      rating: 4,
    },
    {
      eventName: 'Jogja Itu Istimewa',
      comment: 'Keren banget ini event',
      reviewerName: 'Ndi Surandi',
      date: '2024-07-17',
      rating: 3.5,
    },
    {
      eventName: 'Konser Malam Merdeka',
      comment: 'Pengalaman yang luar biasa dan tidak terlupakan!',
      reviewerName: 'Mane Surahman',
      date: '2024-07-18',
      rating: 5,
    },
    {
      eventName: 'Festival Kuliner Nusantara',
      comment: 'Makanan enak dan suasana sangat meriah.',
      reviewerName: 'Abdul Si Adul',
      date: '2024-07-19',
      rating: 4.5,
    },
    {
      eventName: 'Pameran Seni Kontemporer',
      comment: 'Seni yang dipamerkan sangat inovatif dan menginspirasi.',
      reviewerName: 'Dani Suabdan',
      date: '2024-07-20',
      rating: 4,
    },
    {
      eventName: 'Pertunjukan Tari Tradisional',
      comment: 'Sangat menampilkan budaya lokal dengan indah.',
      reviewerName: 'Bady Sujabad',
      date: '2024-07-21',
      rating: 3.8,
    },
    {
      eventName: 'Konferensi Teknologi Masa Depan',
      comment: 'Informasi yang sangat berguna dan pembicara yang hebat.',
      reviewerName: 'Rizki Surizki',
      date: '2024-07-22',
      rating: 4.2,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: '10px', md: '20px' } }}>
      <Typography
        variant="h4"
        color={'#1e0f00'}
        sx={{
          fontSize: { xs: '20px', md: '28px' },
          fontWeight: 800,
          mb: 3,
          borderBottom: '2px solid #1e0f00',
          display: 'inline-block',
          paddingBottom: '5px',
        }}
      >
        What People Say About Us
      </Typography>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Box key={index} sx={{ padding: { xs: '5px', md: '10px' } }}>
            <ReviewCard {...review} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ReviewList;
