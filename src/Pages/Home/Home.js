import React, { useEffect } from 'react'
import './Home.style.css'
import './ResHome.css'
import axios from '../../Axios'
import {Col,Row} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Navigation} from '../../Components'
import {RouteLinks,ResRouteLinks,FontAwesome} from '../../Components'
import CarouselRender from '../Carousel/Carousel'
import categories from '../Categories/Categories'
import discountVideo from '../Home/big-sale-offer-made-with-postermywall_cRW3c87E.mp4'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { updateProducts } from '../../Store/Feautures/ProductSlice'
import ProductPreview from '../Products/ProductPreview'
import Footer from '../../Components/Footer/Footer'


const Home = () => {
 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0,8);
   
  useEffect(() => {
    axios.get("/products")
    .then(({ data }) => dispatch(updateProducts(data)));
}, []);
  

  return (
   <>
    <Navigation/> 
    <FontAwesome/>
    <CarouselRender/>
    <RouteLinks/>
    <ResRouteLinks/>
    <video controls className='Video-Edit'>
        <source src={discountVideo} type="video/mp4"  />
        Your browser does not support the video tag.
      </video>

    <div className='Home-Container'>

      <div className='featured-products-container container mt-4'>
        <h2 style={{
          fontFamily:"Georgia, 'Times New Roman', Times, serif"
        }}>Products</h2>
          {/* Last Products Here */}
     <div className='d-flex justify-content-center flex-wrap' >
                  {lastProducts.map((product)=>(
                    <ProductPreview {...product} />
     ))}
     </div>

      <div>
        <Link to={"/category/All"} style={{
          textAlign:'right', display:'block', textDecoration:'none'
        }}>
          See More {">>"}
        </Link>
      </div>

      </div>

    <div className='recent-product-container container mt-4' >
    <h2 className='Category-Name'>Categories</h2>
    <Row>
  {categories.map((category) => (
  <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
      <Col md={4}>
      
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
            gap: '10px',
          }}
          className='category-title'
        >
        </div>
      </Col>
    </LinkContainer>
  ))}
</Row>


    </div>
    </div>
    <Footer/>
   </>
  )
}

export default Home