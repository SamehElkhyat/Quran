'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

// Import prayer time images
import Asr from "../Images/img/asr-prayer-mosque.png";
import Dhuru from "../Images/img/dhhr-prayer-mosque.png";
import Fajr from "../Images/img/fajr-prayer.png";
import Isha from "../Images/img/night-prayer-mosque.png";
import Maghrep from "../Images/img/sunset-prayer-mosque.png";

const prayerData = [
  { name: 'Fajr', arabicName: 'الفجر', image: Fajr, timeKey: 'Fajr', color: '#4CAF50' },
  { name: 'Dhuhr', arabicName: 'الظهر', image: Dhuru, timeKey: 'Dhuhr', color: '#2196F3' },
  { name: 'Asr', arabicName: 'العصر', image: Asr, timeKey: 'Asr', color: '#FF9800' },
  { name: 'Maghrib', arabicName: 'المغرب', image: Maghrep, timeKey: 'Maghrib', color: '#9C27B0' },
  { name: 'Isha', arabicName: 'العشاء', image: Isha, timeKey: 'Isha', color: '#607D8B' }
];

const cities = [
  { name: 'Cairo', value: 'cairo' },
  { name: 'Mecca', value: 'mecca' },
  { name: 'Medina', value: 'medina' },
  { name: 'Istanbul', value: 'istanbul' },
  { name: 'Dubai', value: 'dubai' },
  { name: 'Riyadh', value: 'riyadh' },
  { name: 'Amman', value: 'amman' },
  { name: 'Beirut', value: 'beirut' },
  { name: 'Kuwait City', value: 'kuwait' },
  { name: 'Doha', value: 'doha' }
];

export default function PrayerTimes() {
  const [timing, setTiming] = useState({});
  const [selectedCity, setSelectedCity] = useState('cairo');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getTiming = async (city = selectedCity) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`
      );
      
      setTiming(data.data);
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Failed to fetch prayer times. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTiming();
  }, []);

  const handleCityChange = (event) => {
    const newCity = event.target.value;
    setSelectedCity(newCity);
    getTiming(newCity);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 50%, var(--primary-light) 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            size={60} 
            sx={{ color: 'var(--accent-color)', mb: 3 }}
          />
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.8 }}>
            Loading Prayer Times...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                fontFamily: 'var(--font-family-arabic)',
                direction: 'rtl',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                background: 'linear-gradient(45deg, #ffc107, #198754)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              أوقات الصلاة
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 400,
                opacity: 0.9,
                mb: 3,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              Prayer Times
            </Typography>
          </Box>
        </motion.div>

        {/* Date and Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            mb: 4
          }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarIcon sx={{ mr: 2, color: 'var(--accent-color)' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        {timing.date?.gregorian?.date}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {timing.date?.hijri?.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 2, color: 'var(--accent-color)' }} />
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                        {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Egypt
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Select City
                    </InputLabel>
                    <Select
                      value={selectedCity}
                      onChange={handleCityChange}
                      sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255,255,255,0.3)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--accent-color)'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--accent-color)'
                        }
                      }}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.value} value={city.value}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Prayer Times Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {prayerData.map((prayer, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                        borderColor: prayer.color,
                        '& .prayer-image': {
                          transform: 'scale(1.1)'
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <Image 
                        src={prayer.image} 
                        alt={prayer.name}
                        className="prayer-image"
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <Box 
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(45deg, ${prayer.color}20, transparent)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <TimeIcon sx={{ 
                          fontSize: 40, 
                          color: 'white',
                          opacity: 0.8
                        }} />
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          color: 'white'
                        }}
                      >
                        {prayer.name}
                      </Typography>
                      
                      <Typography 
                        variant="h5" 
                        component="h4" 
                        sx={{ 
                          fontWeight: 500,
                          fontFamily: 'var(--font-family-arabic)',
                          direction: 'rtl',
                          mb: 2,
                          color: 'rgba(255,255,255,0.9)'
                        }}
                      >
                        {prayer.arabicName}
                      </Typography>
                      
                      <Typography 
                        variant="h4" 
                        component="p" 
                        sx={{ 
                          fontWeight: 700,
                          color: prayer.color,
                          fontSize: { xs: '1.5rem', md: '1.8rem' }
                        }}
                      >
                        {timing.timings?.[prayer.timeKey] || '--:--'}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem'
              }}
            >
              Prayer times are calculated based on your selected location. 
              Times may vary slightly depending on your exact position within the city.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}