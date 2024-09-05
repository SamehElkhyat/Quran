'use client'
import gsap from "gsap";
import Navebar from '../Navebar/page.jsx' 
import { useLayoutEffect } from "react";
import Image from "next/image.js";
import one from '../Images/44546.jpg'
import tow from '../Images/44568.jpg'
import three from '../Images/475333.jpg'
import four from '../Images/2533296.jpg'
import five from '../Images/2716474.jpg'
import Link from "next/link.js";

import { motion } from "framer-motion"
import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";



export default function App() {
 
  const DrawerList = (
    <Box className="bg-dark h-100 text-white" sx={{ width: 250 }} role="presentation" >
      <h1 className="bg-danger text-black">Quran Web</h1>
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
 
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useLayoutEffect(() => {
    
  const themain= gsap.context(()=>{
    const t1=gsap.timeline()
    t1.from("#intro",{
     xPercent:'-100',
     duration:1.3,
     delay:0.3

    })
    .from(['#title1','#title2','#title3','#title4'],{
      opacity:0,
      duration:1.3,
      yPercent:'+=30',
      stagger:0.3,

    })
  
    .to(['#title1','#title2','#title3','#title4'],{
      opacity:0,
      duration:1.3,
      yPercent:'-=30',
      stagger:0.3,

    }).to("#intro",{
      xPercent:'-100',
      duration:1.3,
      delay:0.3
 
     }).to('#welcome',{
      opacity:0,
      duration:.5,
      xPercent:-100


     }).from(["#navbar",'.footer','.container'],{
      opacity:0,
      duration:1,
      delay:1
 
     })
     .to(["#navbar",'.footer','.container'],{
      opacity:1,
      duration:1,
      delay:1
 
     })
     
  
  
  })
    return () => themain.revert()
  }, [])
  return (<>
  <div id="navbar" className="navbar">
  <Navebar/>
  </div>

<motion.div variants={item} id="intro" className="bg-success space-align position-absolute top-0 left-0 p-5 w-100 h-100 p-3">
<h1 id="title1" className="justify-content-center text-center display-1 p-2 font-weight-bold">تلاوات قرأنيه </h1>
<h1 id="title2" className="display-1 text-center font-weight-bold p-3">اذاعه القرأن الكريم مباشر</h1>
<h1 id="title3" className="display-1 text-center font-weight-bold p-3 w-10">روايات اسلاميه </h1>
<h1 id="title4" className="display-1 text-center font-weight-bold p-3 w-10">أحاديث وابتهالات</h1>
</motion.div>

<div className="container mains text-white">
<div className="row p-1 pic align-items-center ">

<div className="col-sm-4">
<Link className="li text-white text-decoration-none" href={'/Quran'}>
<Image className="Image w-100 h-100" src={one}></Image>
<h4 className="text text-center">سور قرأنيه</h4>
</Link>
</div>
<div className="col-sm-4">
<Link className="li text-white text-decoration-none" href={'/About'} >
<Image className="Image w-100  h-100"  src={tow}></Image>
<h4 className="text text-center">
    اذاعه القرأن الكريم
  
  </h4>
  </Link>
</div>
<div className="col-sm-4">
<Link className="li text-white text-decoration-none" href={'/Tafseer'} >
<Image className="Image w-100  h-100" src={three}></Image>
<h4 className="text text-center">   تفسير أيات قرأنيه</h4>
</Link>
</div>




</div>
</div>






  </>

  );
}
