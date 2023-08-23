import React from 'react'
import './Carousel.style.css'
import Carousel from 'react-bootstrap/Carousel';
import c1 from './corousel_1.png'
import c2 from './corousel_2.png'
import c3 from './corousel_3.png'
import { useNavigate } from 'react-router-dom';


const CarouselRender = () => {
  const navi = useNavigate()

  const handleIphone8 = ()=>{
      navi('/product/64da7a4d65fabd145385d0a4')
  }

  const handleIphone10 = ()=>{
      navi('/product/64e36ca1c3f5cfaed9a937b3')
  }

  return (
<div className='Carousel-Container'>
<Carousel>
      <Carousel.Item interval={1000}>
       <img 
            className="d-block w-100 C-Image"
            src={c1}
            alt="First slide" 
            onClick={handleIphone10}/>
        <Carousel.Caption>
          <h3 className='Carousel-Heading'  onClick={handleIphone10}>Iphone X</h3>
          <p className='Carousel-desc'  onClick={handleIphone10}>Packed with Innovative Features Including a Super Retina Display, TrueDepth Camera System, Face ID and A11 Bionic Chip with Neural Engine</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item interval={500}>
      <img 
            className="d-block w-100 C-Image"
            src={c2}
            alt="First slide" 
            />
        <Carousel.Caption>
          <h3 className='Carousel-Heading'>All New Beats Headphones</h3>
          <p className='Carousel-desc'>Beats Studio Pro - Premium Wireless Noise Cancelling Headphones</p>
        </Carousel.Caption>
      </Carousel.Item> */}
      <Carousel.Item>
      <img 
            className="d-block w-100 C-Image"
            src={c3}
            alt="First slide" 
            onClick={handleIphone8}/>
        <Carousel.Caption>
          <h3 className='Carousel-Heading' onClick={handleIphone8}>Apple Iphone 8</h3>
          <p className='Carousel-desc' onClick={handleIphone8}>
          iPhone 8 and iPhone 8 Plus: A new generation of iPhone
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  


</div>
  )
}

export default CarouselRender
