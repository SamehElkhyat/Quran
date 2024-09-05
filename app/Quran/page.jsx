"use client";
import axios from "axios";
import Navebar from "../Navebar/page.jsx";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function App() {
  
  const [Data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const Respose = await axios.get(`https://mp3quran.net/api/v3/reciters`);
    console.log(Respose.data.reciters);
    setData(Respose.data.reciters);
  };

  useLayoutEffect(() => {
    getData();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div id="navbar" className="navbar">
        <Navebar />
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
            }).map((item) => (
              <div className="col-md-12 border-radius-100">
                <div className="">
                  {item.moshaf.map((moshafs) => (
                    <>
        <Accordion className="m-2 text-white bg-dark ">
          
        <AccordionSummary
        className="d-flex m-auto justify-content-center "
          aria-controls="panel1-content"
          id="panel1-header"
        >
        {String(item.name).split("-").slice(0, 3).join("")}
        </AccordionSummary>
        <AccordionDetails>
        <div >                       
          
           {moshafs._id===item._id? String(moshafs.name).split("-").slice(0.3).join(""):<></>}
</div>
                          <Link
                        href={moshafs.server}
                        key={item._id}
                      >
                        <Button variant="contained">Go</Button>
                      </Link>

        </AccordionDetails>
      </Accordion>






                   
                       </>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
}
