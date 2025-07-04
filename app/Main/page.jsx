'use client'
import { useLayoutEffect, useState } from "react";
import Image from "next/image.js";
import Link from "next/link.js";
import { motion } from "framer-motion";
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Book as BookIcon,
  Radio as RadioIcon,
  AutoStories as TafsirIcon,
  AccessTime as PrayerIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';

// Import images
import one from '../Images/44546.jpg';
import two from '../Images/44568.jpg';
import three from '../Images/475333.jpg';
import four from '../Images/2533296.jpg';
import five from '../Images/2716474.jpg';

export default function MainPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      title: "Quran Recitations",
      arabicTitle: "سور قرأنيه",
      description: "Listen to beautiful Quran recitations from renowned reciters",
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      image: one,
      href: '/Quran',
      color: '#198754'
    },
    {
      title: "Islamic Radio",
      arabicTitle: "اذاعه القرأن الكريم",
      description: "Stream live Islamic radio stations from around the world",
      icon: <RadioIcon sx={{ fontSize: 40 }} />,
      image: two,
      href: '/About',
      color: '#0dcaf0'
    },
    {
      title: "Quran Tafsir",
      arabicTitle: "تفسير أيات قرأنيه",
      description: "Explore detailed interpretations and explanations of Quranic verses",
      icon: <TafsirIcon sx={{ fontSize: 40 }} />,
      image: three,
      href: '/Tafseer',
      color: '#ffc107'
    },
    {
      title: "Prayer Times",
      arabicTitle: "أوقات الصلاة",
      description: "Get accurate prayer times for your location",
      icon: <PrayerIcon sx={{ fontSize: 40 }} />,
      image: four,
      href: '/Praying',
      color: '#dc3545'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              fontFamily: 'var(--font-family-arabic)',
              direction: 'rtl',
              textAlign: 'center',
              color: 'white',
              mb: 2
            }}
          >
            القرآن الكريم
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <div className="loading-spinner"></div>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                fontFamily: 'var(--font-family-arabic)',
                direction: 'rtl',
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                background: 'linear-gradient(45deg, #ffc107, #198754)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              القرآن الكريم
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 400,
                opacity: 0.9,
                mb: 4,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              Islamic Digital Platform
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                maxWidth: 600,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Discover a comprehensive Islamic platform featuring Quran recitations, prayer times, 
              Islamic radio stations, and detailed Quranic interpretations.
            </Typography>
          </Box>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Card 
                    component={Link}
                    href={feature.href}
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        borderColor: feature.color,
                        '& .feature-image': {
                          transform: 'scale(1.1)'
                        },
                        '& .play-icon': {
                          opacity: 1,
                          transform: 'scale(1.2)'
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <Image 
                        src={feature.image} 
                        alt={feature.title}
                        className="feature-image"
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <Box 
                        className="play-icon"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: 0,
                          transition: 'all 0.3s ease',
                          color: 'white',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          borderRadius: '50%',
                          p: 1
                        }}
                      >
                        <PlayIcon sx={{ fontSize: 40 }} />
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: feature.color
                      }}>
                        {feature.icon}
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          color: 'white'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant="h6" 
                        component="h4" 
                        sx={{ 
                          fontWeight: 500,
                          fontFamily: 'var(--font-family-arabic)',
                          direction: 'rtl',
                          mb: 2,
                          color: 'rgba(255,255,255,0.9)'
                        }}
                      >
                        {feature.arabicTitle}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.8,
                          color: 'rgba(255,255,255,0.8)'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography 
              variant="h4" 
              component="h3" 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                color: 'white'
              }}
            >
              Start Your Spiritual Journey
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                mb: 4,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Explore our comprehensive Islamic platform designed to enhance your spiritual experience 
              with authentic Quran recitations, accurate prayer times, and insightful interpretations.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              component={Link}
              href="/Quran"
              sx={{
                background: 'linear-gradient(45deg, #198754, #0f5132)',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0f5132, #198754)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }
              }}
            >
              Explore Quran
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
