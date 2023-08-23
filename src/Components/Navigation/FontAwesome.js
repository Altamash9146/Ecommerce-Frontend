import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faShoppingCart,faUser } from '@fortawesome/free-solid-svg-icons'
import ResRouteLinks from './ResRouteLink'
import AuthFunctionality from '../Auth/AuthFunctionality'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './ResNav.style.css'


const FontAwesome = () => {

    const user = useSelector((state) => state.user)

    const [nav , setNav] = useState(false)
    const [Auth, setAuth] = useState(false)

    const handleDisplay = ()=>{
            setNav(!nav)
    }

    const handleAuth = ()=>{
      setAuth(!Auth)
    }

  return (
    <div>
            <FontAwesomeIcon icon={faBars} className='Hamburger' 
              onClick={handleDisplay}
            />

                  <LinkContainer to="/cart">
                <Nav.Link>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className='Shopping-cart'
                    onClick={() => {
                      if (!user) {
                        alert('Please log in or sign up to add to cart');
                      }
                    }}
                  />
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>


      <FontAwesomeIcon icon={faUser} className='User-Icon'
        onClick={handleAuth}/>

      

      <ResRouteLinks nav={nav}/>
      <AuthFunctionality Auth={Auth}/>

    </div>
  )
}

export default FontAwesome
