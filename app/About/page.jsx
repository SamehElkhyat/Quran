'use client'
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  useTheme,
  useMediaQuery,
  InputAdornment,
  IconButton
} from "@mui/material";
import {
  Search as SearchIcon,
  PlayArrow as PlayIcon,
  Radio as RadioIcon,
  Language as LanguageIcon,
  Clear as ClearIcon,
  VolumeUp as VolumeIcon
} from '@mui/icons-material';

export default function RadioPage() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`https://www.mp3quran.net/api/v3/radios?language=ar`);
      setData(response.data.radios);
      setFilteredData(response.data.radios);
    } catch (err) {
      console.error("Error fetching radio data:", err);
      setError("Failed to fetch Islamic radio stations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredData(data);
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
            Loading Islamic Radio Stations...
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
              إذاعة القرآن الكريم
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
              Islamic Radio Stations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.8,
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem'
              }}
            >
              Listen to live Islamic radio stations from around the world, featuring Quran recitations, 
              Islamic lectures, and spiritual content.
            </Typography>
          </Box>
        </motion.div>

        {/* Search Section */}
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
              <Typography variant="h6" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                Search Radio Stations
              </Typography>
              <TextField
                fullWidth
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by station name..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: query && (
                    <InputAdornment position="end">
                      <IconButton onClick={clearSearch} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
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
                  }
                }}
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.6)',
                    opacity: 1
                  }
                }}
              />
              {query && (
                <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>
                  Found {filteredData.length} station{filteredData.length !== 1 ? 's' : ''}
                </Typography>
              )}
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

        {/* Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {filteredData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                        borderColor: 'var(--accent-color)',
                        '& .play-icon': {
                          opacity: 1,
                          transform: 'scale(1.2)'
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', p: 3, textAlign: 'center' }}>
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
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          borderRadius: '50%',
                          p: 1,
                          zIndex: 2
                        }}
                      >
                        <PlayIcon sx={{ fontSize: 30 }} />
                      </Box>
                      
                      <RadioIcon sx={{ 
                        fontSize: 60, 
                        color: 'var(--accent-color)', 
                        mb: 2 
                      }} />
                      
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 2,
                          color: 'white',
                          fontSize: { xs: '1rem', md: '1.1rem' }
                        }}
                      >
                        {String(item.name).split("-").slice(0, 3).join(" ")}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Chip 
                          icon={<VolumeIcon />}
                          label="Live Radio"
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            '& .MuiChip-icon': { color: 'var(--accent-color)' }
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ p: 3, pt: 0 }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          mb: 1
                        }}>
                          Station Type:
                        </Typography>
                        <Chip 
                          icon={<LanguageIcon />}
                          label="Arabic"
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '0.7rem',
                            '& .MuiChip-icon': { color: 'var(--accent-color)' }
                          }}
                        />
                      </Box>
                      
                      <Button
                        component={Link}
                        href={item.url || '#'}
                        target="_blank"
                        variant="contained"
                        fullWidth
                        startIcon={<PlayIcon />}
                        sx={{
                          background: 'linear-gradient(45deg, #198754, #0f5132)',
                          color: 'white',
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #0f5132, #198754)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        Listen Live
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* No Results */}
        {filteredData.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                No radio stations found
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Try adjusting your search terms or browse all available stations.
              </Typography>
            </Box>
          </motion.div>
        )}

        {/* Footer Info */}
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
              All radio stations are sourced from mp3quran.net and provide live Islamic content 
              including Quran recitations, Islamic lectures, and spiritual programs.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
