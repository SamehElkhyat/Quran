'use client'
import { useState } from 'react'
import { 
  AppBar, 
  Box, 
  Button, 
  Divider, 
  Drawer, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, 
  Toolbar, 
  Typography,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  Book as BookIcon,
  Radio as RadioIcon,
  AutoStories as TafsirIcon,
  AccessTime as PrayerIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { name: 'Home', href: '/', icon: <HomeIcon /> },
    { name: 'Quran', href: '/Quran', icon: <BookIcon /> },
    { name: 'Radio', href: '/About', icon: <RadioIcon /> },
    { name: 'Tafsir', href: '/Tafseer', icon: <TafsirIcon /> },
    { name: 'Prayer Times', href: '/Praying', icon: <PrayerIcon /> },
  ];
  
  const DrawerList = (
    <Box 
      sx={{ 
        width: 280,
        height: '100%',
        background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%)',
        color: 'white'
      }} 
      role="presentation" 
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          القرآن الكريم
        </Typography>
        <IconButton 
          onClick={toggleDrawer(false)}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(5px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: 500,
                    fontSize: '1.1rem'
                  } 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%', 
        p: 3,
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Typography variant="body2" sx={{ opacity: 0.7, textAlign: 'center' }}>
          Islamic Digital Platform
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(15, 81, 50, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 1, md: 2 } }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ 
                mr: 2, 
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontFamily: 'var(--font-family-arabic)',
                direction: 'rtl'
              }}
            >
              القرآن الكريم
            </Typography>
            
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.slice(1).map((item) => (
                  <Button
                    key={item.name}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer 
        anchor="left" 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}

