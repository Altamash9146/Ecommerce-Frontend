import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signup,Login } from '../Components'
import Home from '../Pages/Home/Home'
import Newproduct from '../Pages/Products/Newproduct'
import Productpage from '../Pages/Products/Productpage'
import CategoryPage from '../Pages/Categories/CategoryPage'
import ScrolltoTop from '../Pages/Scroller/ScrolltoTop'
import CartPage from '../Components/Navigation/CartPage'
import SearchResults from '../Components/Navigation/SearchResults'
import Orders from '../Pages/Orders/Orders'
import AdminDashboard from '../Pages/Admin/AdminDashboard/AdminDashboard'
import EditProduct from '../Pages/Products/EditProducts'

const Routing = () => {
  const user = useSelector((state) => state.user);

  return (
   <>
   <BrowserRouter>
    <ScrolltoTop/>

    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/products/search" element={<SearchResults />} />
        {!user && (<>
                      <Route path='/signup' element={<Signup/>}/>
                      <Route path='/login' element = {<Login/>}/>
        </>)}

          {user && (
            <>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/orders' element={<Orders/>}/>
            </>
          )}
              {user && user.isAdmin && (
                <>
                  <Route path='/admin' element={<AdminDashboard/>}/>
                  <Route path='/product/:id/edit' element={<EditProduct/>}/>
                </>
              )}

            <Route path='/new-product' element={<Newproduct/>}/>
            <Route path='/product/:id' element={<Productpage/>}/>
            <Route path='/category/:category' element={<CategoryPage/>}/>
   
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default Routing