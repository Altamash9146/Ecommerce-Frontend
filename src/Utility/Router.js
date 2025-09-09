import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signup,Login } from '../Components'

const Home = React.lazy(() => import('../Pages/Home/Home'));
const Newproduct = React.lazy(() => import('../Pages/Products/Newproduct'));
const Productpage = React.lazy(() => import('../Pages/Products/Productpage'));
const CategoryPage = React.lazy(() => import('../Pages/Categories/CategoryPage'));
const ScrolltoTop = React.lazy(() => import('../Pages/Scroller/ScrolltoTop'));
const CartPage = React.lazy(() => import('../Components/Navigation/CartPage'));
const SearchResults = React.lazy(() => import('../Components/Navigation/SearchResults'));
const Orders = React.lazy(() => import('../Pages/Orders/Orders'));
const AdminDashboard = React.lazy(() => import('../Pages/Admin/AdminDashboard/AdminDashboard'));
const EditProduct = React.lazy(() => import('../Pages/Products/EditProducts'));

const Routing = () => {
  const user = useSelector((state) => state.user);

  return (
   <>
   <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
   </BrowserRouter>
   </>
  )
}

export default Routing