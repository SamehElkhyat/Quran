'use client'
import axios from "axios";
import Navebar from '../Navebar/page.jsx' 
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";


export default function App() {
const [Data, setData] = useState([])
const [query, setQuery] = useState("");
  



const getData = async () => {
const Respose =await axios.get(`https://www.mp3quran.net/api/v3/radios?language=ar`)
console.log(Respose.data.radios);
setData(Respose.data.radios);

} 

  useLayoutEffect(() => {
    getData();
  }, [])
  return (<>



<div>
    
    </div>
  <div id="navbar" className="navbar">
  <Navebar/>
  </div>
<div className="container">
  <div className="row">

  <TextField
              onChange={(event) => setQuery(event.target.value)}
              className="outlined"
              label="Search"
              variant="outlined"
            />
            {Data.filter((item) => {
              if (query === "") {
                return item.name;
              } else if (
                item.name.toLowerCase().includes(query.toLowerCase())
              ) {
                return item;
              }
            }).map((item) => (<>
            
            <div className="col-md-12 border-radius-100">
                <div className="">
                    <>
        <Accordion className="m-2 text-white bg-dark ">
          
        <AccordionSummary
        className="d-flex m-auto justify-content-center "
          aria-controls="panel1-content"
          id="panel1-header"
        >
        {String(item.name).split("-").slice(0.3).join("")}
        </AccordionSummary>
        <AccordionDetails>
        <div >                       
          
</div>
                          <Link
                        href={item.url}
                        key={item._id}
                      >
                        <Button variant="contained">Go</Button>
                      </Link>

        </AccordionDetails>
      </Accordion>






                   
                       </>
                </div>
              </div>
            </>
           
            ))}

   
  </div>
</div>



  </>

  );
}
