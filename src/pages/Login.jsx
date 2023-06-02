import React, { useState } from 'react'
import Formforlogin from '../components/formforlogin/Formforlogin'
// import Formforlogin from '../pages/Login'

const Login = ({ setIsLoggedIn, isLoggedIn}) => {
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <>
    <Formforlogin setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>
    </>
  )
}

export default Login