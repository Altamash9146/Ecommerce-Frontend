import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.style.css'

const RouteLinks = () => {

  const [showHomeSubItems, setShowHomeSubItems] = useState(false);
  const [showIphoneSubItems, setShowIphoneSubItems] = useState(false);
  const [showLaptopSubItems, setShowLaptopSubItems] = useState(false);
  const [showWatchSubItems, setShowWatchSubItems] = useState(false);



  const handleSubitemsClick = () => {
    setShowHomeSubItems(!showHomeSubItems)
  };

  const handleHomeMouseEnter = () => {
    setShowHomeSubItems(true);  
  };

  const handleIphoneMouseEnter = () => {
    setShowIphoneSubItems(true);  
  };

  const handleLaptopMouseEnter = () => {
    setShowLaptopSubItems(true)
  }

  const handleWatchMouseEnter = () => {
    setShowWatchSubItems(true)
  }

  const handleMouseLeave = () => {
    setShowHomeSubItems(false);
    setShowIphoneSubItems(false)
    setShowLaptopSubItems(false)
    setShowWatchSubItems(false)

  };

  return (
    <div className='d-container'>
 

      <div className="Desktop-Navigation-Container">
        <NavLink to={"/"} activeclassname="active"
        onMouseEnter={handleHomeMouseEnter} onClick={handleSubitemsClick}
         >
          Home</NavLink>

        <NavLink to={"/category/iphone"} activeclassname="active"
                  onMouseEnter={handleIphoneMouseEnter} onClick={handleSubitemsClick} >
                  Iphone
        </NavLink>  

        <NavLink to={"/category/laptop"} activeclassname="active"
                onMouseEnter={handleLaptopMouseEnter} onClick={handleSubitemsClick} >
                  Laptop</NavLink>

        <NavLink to={"/category/watch"} activeclassname="active"
                onMouseEnter={handleWatchMouseEnter}  onClick={handleSubitemsClick}>
                  Watch</NavLink>
        </div>


 

   {
    showIphoneSubItems && 
    <div className='Iphone-Hover' onMouseLeave={handleMouseLeave}>
      <NavLink to={'/product/64e36ca1c3f5cfaed9a937b3'} className='Hover-Text'>iPhone X</NavLink>
      <NavLink to={'/product/64e371c8c3f5cfaed9a9384b'} className='Hover-Text'>iPhone 11</NavLink>
      <NavLink to={'/product/64e3772ac3f5cfaed9a9385a'}className='Hover-Text'>iPhone 12</NavLink>
      <NavLink to={'/product/64e377a5c3f5cfaed9a93869'}className='Hover-Text'>iPhone 13</NavLink>
      <NavLink to={'/product/64e37a13c3f5cfaed9a93878'} className='Hover-Text'>iPhone 14</NavLink>
    </div>
   }

{
    showLaptopSubItems && 
    <div className='Laptop-Hover' onMouseLeave={handleMouseLeave}>
      <NavLink to={'/product/64e3860ec3f5cfaed9a939b9'} className='Hover-Text'>Acer Chromebook</NavLink>
      <NavLink to={'/product/64db57e4ebea908759b0d4cf'} className='Hover-Text'>Apple Macbook</NavLink>
      <NavLink to={'/product/64de11f6923edc5863cfbe30'} className='Hover-Text'>ASUS Zenbook </NavLink>
      <NavLink to={'/product/64dcbe9514940fd4e6074164'} className='Hover-Text'> Dell XPS 13</NavLink>
      <NavLink to={'/product/64de2a73923edc5863cfbebd'} className='Hover-Text'>HP ENVY x360</NavLink>
    </div>
   }

{
    showWatchSubItems && 
    <div className='Watch-Hover' onMouseLeave={handleMouseLeave}>
      <NavLink to={'/product/64dbb463064a819664520e9a'} className='Hover-Text'>Titan Neo IV</NavLink>
      <NavLink to={'/product/64e38d17c3f5cfaed9a93a76'} className='Hover-Text'>Rolex Pearl</NavLink>
      <NavLink to={'/product/64e38ee2c3f5cfaed9a93aa9'} className='Hover-Text'>Fastrack-Exuberant</NavLink>
      <NavLink to={'/product/64e390a7c3f5cfaed9a93abe'} className='Hover-Text'>Rolex Daytona</NavLink>
      <NavLink to={'/product/64e39180c3f5cfaed9a93acd'} className='Hover-Text'>Apple Series 3</NavLink>
    </div>
   }


    
    {
      showHomeSubItems && 
      <div className='Home-Hover' onMouseLeave={handleMouseLeave}>
      <NavLink to={'/category/iphone'}className='Hover-Text'>IPhone </NavLink>
      <NavLink to={'/category/laptop'}className='Hover-Text'>Laptops</NavLink>
      <NavLink to={'/category/watch'}className='Hover-Text'>Watches</NavLink>

        </div>
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div> 
  )
}

export default RouteLinks
