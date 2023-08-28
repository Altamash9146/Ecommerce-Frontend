import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from 'D:/E-Commerce Frontend/client/src/Components/Navigation/istockphoto-1136192849-612x612.jpg';
import './ResNav.style.css'
import Logo from '../Logo/Logo';

const Navigation = () => {
  const InputRef = useRef();
  const navigate = useNavigate();

  function focus() {
    InputRef.current.focus();
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchTerm = e.target.value;
      navigate(`/products/search?term=${searchTerm}`); 
    }
  };

  function Gotohome(){
    navigate('/')
  }

  return (
    <>
      <div className='Navbar-Container'>
      {/* <h1 className='heading' onClick={Gotohome}><NavLink to={"/product/64db57e4ebea908759b0d4cf"} >Urban Hunters</NavLink></h1> */}
        <Logo/>
        <div className='Search-Bar-Container'>
          <input
            id='searchInput'
            ref={InputRef}
            type='search'
            placeholder='Search for products, brands and more'
            className='Search-Bar'
            onKeyDown={handleSearch}
          />

          <div className='Search-Image-Container'>
            <img
              src={SearchIcon}
              alt='Not-Found'
              className='Search-Image'
              onClick={focus}
            />
          </div>
        </div>
        {/* AuthFunctionality */}
      </div>
    </>
  );
};

export default Navigation;
