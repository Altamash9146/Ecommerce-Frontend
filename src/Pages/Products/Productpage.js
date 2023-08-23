import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import axios from '../../Axios';
import { Badge, ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading';
import Similarproduct from './Similarproduct';
import './Newproduct.style.css'
import { LinkContainer } from 'react-router-bootstrap';
import { useAddToCartMutation } from '../../Services/AppApi';
import ToastMessage from '../../Components/Navigation/ToastMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productpage = ({_id}) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const [addToCart,{isSuccess}] = useAddToCartMutation()
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    const GotoHome = () => {
        navigate('/');
    }

    const handleDragStart = (e) => e.preventDefault();

    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }

    const images = product.pictures.map((picture, index) => (
        <img
            key={index}
            className='Product-Carousel-Image'
            src={picture.url}
            alt='PRODUCT'
            onDragStart={handleDragStart}
        />
    ));

    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx} key={idx}>
                <Similarproduct {...product} />
            </div>
        ));
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    return (
    <>
    <h1 style={{
        fontFamily:"Georgia, 'Times New Roman', Times, serif",
        cursor:'pointer',
        fontSize:'30px'
    }} onClick={GotoHome}
    >
        Urban Hunters
    </h1>
    <Container className='pt-4' style={{
                            position:'relative'
    }}>
        <Row>
            <Col lg={6}>
                    <AliceCarousel 
                    mouseTracking items={images} controlsStrategy='alternate' />                       
            </Col>
            <Col lg={6} className='pt-4 product-page-metadata-container' >
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg='primary'>{product.category}</Badge>
                    </p>
                    <p>
                        <Badge className='product-price'>${product.price}</Badge>
                    </p>
                    <p style={{textAlign:'justify'}}
                        className='py-3'
                    >
                        <strong>Description:</strong>{product.description}
                    </p>

                    <ButtonGroup style={{ width: '90%' }}>
  <select className='New-Product-Input-Bar'>
    <option value='1'>1</option>
    <option value='2'>2</option>
    <option value='3'>3</option>
    <option value='5'>5</option>
    <option value='6'>6</option>
    <option value='7'>7</option>
    <option value='8'>8</option>
    <option value='9'>9</option>
    <option value='10'>10</option>
  </select>
  <button
    className='Cart-Button'
    onClick={() => {
      if (!user) {
        toast.warning('Please log in or sign up to add to cart');
        return;
      }

      const payload = {
        userId: user._id,
        productId: id,
        price: product.price,
        image: product.pictures[0].url,
      };
      addToCart(payload);
    }}
  >
    Add to cart
  </button>
</ButtonGroup>



                    {user && user.isAdmin && (
                        <LinkContainer to={`product/${product._id}/edit`} >
                            <button>Edit Products</button>
                        </LinkContainer>
                    )}
                    {isSuccess && <ToastMessage bg='info' title='Added to cart now' body={`${product.name} is in your cart`} />}
            </Col>
        </Row>
        <div className='similar-products-container'>
        <div className='my-4'>
                     <h2 style={{
                        textAlign:'center',
                        fontFamily:"Georgia, 'Times New Roman', Times, serif"
                     }} className='similar-products'>Similar Products</h2>
                    <div className='Similar-Products-Alice-Container'>
                <AliceCarousel 
                            mouseTracking 
                            items={similarProducts} 
                            controlsStrategy='alternate' 
                            responsive={responsive}
             />     
                </div>
            </div>
        </div>

            

    </Container>  
    <ToastContainer/>    
    </>
   
  )
}

export default Productpage
