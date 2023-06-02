import React, { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import Home from './components/Home/Home'
import RootLayout from './layouts/RootLayout'
import AddProduct from './pages/AddProduct'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProtectedRoute from '../src/routes/ProtectedRoute'
import Users from './pages/Users'



const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('accessToken');
    if (loggedInUser) {
      setIsLoggedIn(true);
    } 
  }, []);

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: 
        <RootLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>,
      
      children: [
        {
          index: true,
          element: <Login setIsLoggedIn={setIsLoggedIn}/>
        },
        {
          path: '/product/:productId',
          element:
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        },
        {
          path: '/all-products',
          element: 
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        },
        {
          path: '/add-product',
          element: 
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        },
        {
          path: '/users',
          element:
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        },
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