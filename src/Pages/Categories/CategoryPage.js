import React, { useEffect, useState,useRef } from 'react'
import axios from '../../Axios'
import {Container, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loading from '../Products/Loading'
import  SearchIcon from  'D:/E-Commerce Frontend/client/src/Components/Navigation/istockphoto-1136192849-612x612.jpg'
import './Category.css'
import ProductPreview  from '../Products/ProductPreview'


const CategoryPage = () => {

    const {category} = useParams()
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const [loading, setLoading] = useState(false)
    const [products, setProduct] = useState([])
    const [searchTerm, setsearchTerm] = useState('')


    useEffect(()=>{
        setLoading(true)
        axios.get(`/products/category/${capitalizedCategory}`)
        .then(({data})=>{
          // console.log("API Response:", data); // Debugging
            setLoading(false)
            setProduct(data)
        })
        .catch(error =>{
            setLoading(false)
            console.log(error.message);
        })
    },[capitalizedCategory])

    if(loading){
        <Loading/>
    }


    // console.log("Initial products array:", products);

    const productsSearch = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // console.log("Filtered products array:", productsSearch);
    

    const InputRef = useRef()

  function focus(){
    InputRef.current.focus()
  }

  return (
   <>
   <div className='Category-Page-Container'>
  <div className={`pt-3 ${category}-banner-container category-banner-container`}>
    <h1
      style={{
        textAlign: 'center',
        fontFamily: "Georgia, 'Times New Roman', Times, serif"
      }}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </h1>
  </div>

  <div className='filter-container'>
    <input
      type='text'
      placeholder='Search for products'
      className='Category-Search-Bar'
      ref={InputRef}
      onChange={(e) => setsearchTerm(e.target.value)}
    />


    <div className='Category-Search-Image-Container'>
      <img
        src={SearchIcon}
        alt='Not-Found'
        className='Category-Search-Image'
        onClick={focus}
      />
    </div>
    {/* {console.log(productsSearch)} */}
    {productsSearch.length === 0 ? (

      <h1
        style={{
          position: 'relative',
          top: '110px',
          left: '-50%'
        }}
      >
        No products to show
      </h1>
    ) : (
      <Container>
        <Row>
          <Col md={{ span: '10', offset: '1' }}>
          
           <div className='Main-product-Container'>
              {productsSearch.map((product) => (
                <div key={product._id} className='Product-Preview-Wrapper'>
                  <ProductPreview {...product} />
                </div>
              ))}
            </div>
      
          </Col>
        </Row>
      </Container>
    )}
  </div>
</div>

   </>
  )
}

export default CategoryPage
