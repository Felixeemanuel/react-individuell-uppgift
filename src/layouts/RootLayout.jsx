import React from 'react'
import { Outlet } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const RootLayout = ({ isLoggedIn, setIsLoggedIn}) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Outlet />
    </>
  )
}

export default RootLayout
