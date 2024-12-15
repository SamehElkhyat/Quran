'use client'
import React, { useEffect, useState } from 'react'
import Asr from "../Images/img/asr-prayer-mosque.png";
import Dhuru from "../Images/img/dhhr-prayer-mosque.png";
import Fajr from "../Images/img/fajr-prayer.png";
import Isha from "../Images/img/night-prayer-mosque.png";
import Maghrep from "../Images/img/sunset-prayer-mosque.png";
import axios from 'axios';
import Image from 'next/image';

function App() {

  const [Timing, setTiming] = useState({})
  const [timingCity, settimingCity] = useState("cairo")
  const [loading, setLoading] = useState(true)

  const getTiming = async () => {
    try {

      const { data } = await axios(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${timingCity}`)
      setTiming(data.data)
      console.log(data.data);

    } catch {

      console.log("Error TO Get Data From The Api");

    } finally {

      setLoading(false)

    }
  }
  useEffect(() => {
    getTiming();
  }, [])
  return <>
    <div className="container">
      <div id="PraySection" className="row">
        {loading ? (
          <h1>Loading.......</h1>
        ) : <>
          <div className="timingSection">
            <h1 className='gregorian'>{Timing.date.gregorian.date}</h1>
            <h1 className='hijri'>{Timing.date.hijri.date}</h1>
          </div>
          <div className="mainItem">
            <div className="AboutItem  text-center m-2 p-0 justify-content-center">
              <Image className='w-100 h-100' src={Fajr} alt="" />
              <h3 className='AboutTitle'>الفجر</h3>
              <h5 className='AboutTitle'>{Timing.timings.Fajr}</h5>
            </div>
            <div className="AboutItem text-center m-2 p-0 justify-content-center">
              <Image className='w-100 h-100' src={Dhuru} alt="" />
              <h3 className='AboutTitle'>الضهر</h3>
              <h5 className='AboutTitle'>{Timing.timings.Dhuhr}</h5>
            </div>
            <div className="AboutItem  text-center m-2 p-0 justify-content-center">
              <Image className='w-100 h-100' src={Asr} alt="" />
              <h3 className='AboutTitle'>العصر</h3>
              <h5 className='AboutTitle'>{Timing.timings.Asr}</h5>
            </div>
            <div className="AboutItem  text-center m-2 p-0 justify-content-center">
              <Image className='w-100 h-100' src={Maghrep} alt="" />
              <h3 className='AboutTitle'>المغرب</h3>
              <h5 className='AboutTitle'>{Timing.timings.Maghrib}</h5>
            </div>
            <div className="AboutItem  text-center m-2 p-0 justify-content-center">
              <Image className='w-100 h-100' src={Isha} alt="" />
              <h3 className='AboutTitle'>العشاء</h3>
              <h5 className='AboutTitle'>{Timing.timings.Isha}</h5>
            </div>
          </div>
        </>
        }
      </div></div>
  </>
}
export default App