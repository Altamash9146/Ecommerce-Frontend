import React from 'react'
import  {NavLink} from 'react-router-dom'
import "./Auth.style.css"
import "./ResAuth.style.css"
import {Button, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../../Store/Feautures/UserSlice'

const AuthFunctionality = ({Auth}) => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = ()=>{
        dispatch(logout())
  }

  return (
   <>
   { Auth && 
    <div className='Button-Container user-container'>
    {!user && (
      <div>
        <NavLink to={'/login'}>
          <button className='Login-Btn Btn-Style'>Sign in</button>
        </NavLink>
        <div className='New-Customer-Link'>
          New Customer?
          <NavLink to={'/signup'} className='Start-here'>
            Start here
          </NavLink>
        </div>
      </div>
    )}


    {user && (
    <NavDropdown title={<div className='user-email'>{user.email}</div>}  id='basic-nav-dropdown'>
      {user.isAdmin && (
        <>
          <LinkContainer to="/admin">
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/new-product">
                <NavDropdown.Item>Create Product</NavDropdown.Item>
          </LinkContainer>
        </>
      )}

        {!user.isAdmin && (
           <>
           <LinkContainer to={'/cart'}>
                  <NavDropdown.Item>Cart</NavDropdown.Item>
           </LinkContainer>
 
           <LinkContainer to={'/orders'}>
                    <NavDropdown.Item>My orders</NavDropdown.Item>
           </LinkContainer>
         </>
        )}
        <NavDropdown.Divider/>
        <Button
          variant='danger' onClick={handleLogout} className='logout-btn'
        >Logout</Button>
 </NavDropdown>
      )}
  </div>
   }
   
   </>
  )
}

export default AuthFunctionality
