import React, { useState } from 'react'
import "./Auth.style.css"
import "./ResAuth.style.css"
import  {NavLink, useNavigate} from 'react-router-dom'
import { useRegisterMutation } from '../../Services/AppApi'
import {Alert} from 'react-bootstrap'

const Signup = () => {

  const navigate = useNavigate()
  const[formdata, setFormdata] = useState({
              name:'', number:'',email:"",password:''
  })

  const [register,{isLoading,isError,error}] = useRegisterMutation()

  const handleOnchange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'number') {
      // Ensure that the mobile number contains only numbers and is at most 10 digits long
      const mobileNumber = value.replace(/\D/g, '').slice(0, 10);
      setFormdata((prevData) => ({ ...prevData, [name]: mobileNumber }));
    } else {
      setFormdata((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register({ ...formdata });
      
      if (response.data) {
        navigate('/');
      } else if (response.error && response.error.message === 'Email Already Exists') {
 
        console.log('Email Already Exists');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
}
  return (
    <>
    <h3>Urban Hunters</h3>
    <div className='Class-for-Container-Center'>
    <div className='Signup-Container'>
    <form onSubmit={handleOnSubmit}>
    <h4>Create Account</h4>
    {isError && <Alert variant='danger'>{error.data}</Alert> }
    <label className='Form-Labels'>Your name</label>

    <input
                         type='text' 
                        placeholder='First and last name' 
                        value={formdata.name}
                        name='name'
                        onChange={handleOnchange}
                        required 
                        className='Signup-Input-Bar'
    />

    <label className='Form-Labels'>Mobile Number </label>
    <input 
                          type='number'
                          placeholder='Mobile number' 
                          value={formdata.number}
                          name='number'
                          onChange={handleOnchange}
                          required
                          className='Signup-Input-Bar'
     />

    <label className='Form-Labels' >Email</label>
    <input 
                            type='email'  
                            placeholder='Your email'
                            value={formdata.email}
                            name='email'
                            onChange={handleOnchange}
                            required
                            className='Signup-Input-Bar'
    /> 

    <label className='Form-Labels' >Password</label>
    <input 
                          type='password' 
                          placeholder='create a unique password ' 
                          value={formdata.password}
                          name='password'
                          onChange={handleOnchange}
                          required
                          className='Signup-Input-Bar'
    />

    
    <button disabled={isLoading} className='Signup-Form-Button'>
        Continue
    </button>

    <div>Already registered,<NavLink to={'/login'}  className='Signup-Form-link'> click here</NavLink></div>
    </form>
    </div>
    </div>
    </>
  )
}

export default Signup