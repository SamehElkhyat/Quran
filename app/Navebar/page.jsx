'use client'
import { useState } from 'react'
import './navbar.css'
import main from '../Images/allah_PNG8.png'
import Image from 'next/image'
import { AppBar, Box, Button, Divider, Drawer, IconButton,List,ListItem,ListItemButton,ListItemText,MenuIcon, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { AccessAlarm, ThreeDRotation,HomeIcon } from '@mui/icons-material';

export default function Page() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  
  const DrawerList = (

    <Box className="bg-black h-100 text-white" sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h1 className="topSlider p-3 text-black">Quran Web</h1>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
       
<Link className='text-white text-decoration-none' href='/'><h4>Home</h4></Link>               
              <ListItemText />
            </ListItemButton>
          </ListItem>

          
            <ListItem disablePadding>
          
            <ListItemButton>

            <Link className='text-white text-decoration-none' href='/Quran'><h4>Quran</h4></Link>               
               
            <ListItemText />
          
            </ListItemButton>
          
            </ListItem>

            <ListItem disablePadding>
          
            <ListItemButton>
          
            <Link className='text-white text-decoration-none' href='/About'><h4>Radio</h4></Link>               
               
              <ListItemText />
          
            </ListItemButton>
          
          </ListItem>
          
          <ListItem disablePadding>
            
            <ListItemButton>

            <Link className='text-white text-decoration-none' href='/Tafseer'><h4>Tafseer</h4></Link>               
               
              <ListItemText />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
     
    </Box>
  );
  return <>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet"/>

  <Drawer className='' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

<Box className="w-100 position-absolute top-0" sx={{ flexGrow: 1 }}>

      <AppBar className='main bg-danger'>
        <Toolbar>
 
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h4 className='allah'>القرأن الكريم</h4>

          </Typography>
          
          <Button onClick={toggleDrawer(true)} className='men text-white'>Menu</Button>



        </Toolbar>
      </AppBar>
    </Box>
  </>
}

