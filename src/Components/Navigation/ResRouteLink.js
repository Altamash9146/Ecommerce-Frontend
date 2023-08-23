import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.style.css'
import './ResNav.style.css'

const ResRouteLinks = ({nav}) => {

  return (
    <div className='res-container' >
       { nav && 
        <div className="Navigation-Container">
        <NavLink to={"/"} activeclassname="active" className='Navigation-Hover home'>
               Home
        </NavLink> <hr/>

        <NavLink to={"/category/iphone"} activeclassname="active" 
                                  className='Navigation-Hover'
                                  style={{
                                    textDecoration:'none',
                                    color:'brown'
                                  }}
                                  >
                                                              Iphone
        </NavLink> <hr/>

        <NavLink to={"/category/laptop"} activeclassname="active" 
                                        className='Navigation-Hover'
                                        style={{
                                          textDecoration:'none',
                                          color:'brown'
                                        }}
                                        >
                                                                  Laptop
        </NavLink> <hr/>

        <NavLink to={"/category/watch"} activeclassname="active" 
                                            className='Navigation-Hover'
                                            style={{
                                              textDecoration:'none',
                                              color:'brown'
                                            }}
                                            >
                                                                     Watch
        </NavLink>
        
    
        </div>
       }
    </div>
  )
}

export default ResRouteLinks
