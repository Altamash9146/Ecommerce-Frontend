import React from 'react'
import {NavLink} from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <>
        <NavLink to={"/"} style={{ textDecoration:'none'}}><h1 className='heading'>Urban Hunters</h1></NavLink>
    </>
  )
}

export default Logo
