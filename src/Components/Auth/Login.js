import React, { useState } from 'react'
import "./Auth.style.css"
import "./ResAuth.style.css"
import  {NavLink,useNavigate} from 'react-router-dom'
import { useLoginMutation } from '../../Services/AppApi'
import {Alert} from 'react-bootstrap'

const Login = () => {

  const navigate = useNavigate()

  const [formdata, setFormdata] = useState(
    {
      email:'', password:''
    }
  )

  const [login,{isLoading,isError,error}] = useLoginMutation()

  const handleOnchange = (event)=>{
    const  {name, value} = event.target
    setFormdata({...formdata , [name]:value})
}

const handleOnSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await login({ ...formdata });
    
    if (response.data) {
      navigate('/');
    } else if (response.error && response.error.message === 'Invalid Credentials') {

      console.log('Invalid Credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

  return (
    <>
     <h3 className='Login-title' >Urban Hunters</h3>
    <div className='Class-for-Container-Center-Login'>
    <div className='Signup-Container'>

    <form onSubmit={handleOnSubmit}>
    <h4>Sign in </h4>
    {isError && <Alert variant='danger'>{error.data}</Alert> }
    <label className='Form-Labels'>Email</label>
    <input 
                            type='email'  
                            name='email'
                            value={formdata.email}
                            placeholder='Your email'
                            onChange={handleOnchange}
                            required
                            className='Signup-Input-Bar'
    /> 

    <label className='Form-Labels' >Password</label>
    <input 
                          type='password' 
                          name='password'
                          value={formdata.password}
                          placeholder='At least 6 characters' 
                          onChange={handleOnchange}
                          required
                          className='Signup-Input-Bar'
    />

    <button className='Signup-Form-Button' disabled={isLoading} >
        Continue
    </button>

    <div>New to Urban Hunters, <NavLink to={'/signup'}  className='Signup-Form-link'> click here</NavLink></div>
    </form>
    </div>
    </div>
    </>
  )
}

export default Login