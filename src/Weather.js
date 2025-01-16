import React, { useState } from 'react'

function Weather() {
    const[city,setCity]=useState();
    const handleCityChange = (event)=>{
        setCity(event.target.value)
    }
    const handleClick =()=>{
        
    }
  return (
    <div className=''>
      <input text='text' placeholder='Enter City Name' value={city} onChange={handleCityChange}></input>
      <button onClick={handleClick}>Get Weather</button>
    </div>
  )
}

export default Weather
