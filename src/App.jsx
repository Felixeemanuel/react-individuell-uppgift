import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllProducts } from './store/products/productsSlice'
import { clearProduct, getProductById } from './store/products/singleProductSlice'
import { useParams } from 'react-router-dom'
import { getProducts } from './store/products/productsSlice'
import Loader from './components/loader/Loader'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import UserProfile from './pages/UserProfile'
import AddProduct from './pages/AddProducts'



const App = () => {

  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if(loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setIsLoggedIn(true)
    }
  }, [])
  // ____________________________________________________________________________
  
  // Sending a dispatch to get the products from FireBase
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const { products, loading, error } = useSelector(state => state.products)
  // ____________________________________________________________________________


  // Router - sending products to the pages that need them.
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <>{ 
            products.length > 0
                ? <Home key={products._id} products={products}/>
                : <h2>No products to show</h2>
              }</>
          
        },
        {
          index: true,
          element: <Home />
        },
        {
          path: 'products',
          element: <>{ 
            products.length > 0
                ? <Products key={products.id} products={products} />
                : <h2>No products to show</h2>
              }</>
        },
        {
          path: 'addProduct',
          element: <AddProduct />,
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'login',
          element: <Login setIsLoggedIn={setIsLoggedIn} />
        },
        {
          path: 'userprofile',
          element: <UserProfile />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'cart',
          element: <Cart />
        },

        {
          path: 'products',
          element:<Products/>
            
        },
        {
          path: 'productDetails/:id',
          element: <ProductDetails />
        },
        {
          path: 'productDetails',
          element: <ProductDetails />
        },
        {
          path: 'forgotpassword',
          element: <ForgotPassword />
        }

      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App