import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../images/logo/logo.svg'



const Navbar = ({ isLoggedIn, setIsLoggedIn}) => {

  // Function to logout admin. Clear localStorage and navigate back to login page
  const handleLogout = () => {
    setIsLoggedIn(false); // set isLoggedIn to false on logout
    localStorage.removeItem('accessToken')

    console.log(isLoggedIn)
    
    //ClearAdmin function from reducers.js
    dispatch(clearAdmin())
    navigate('/');
  };

  return (
    <>
      <nav className='navbar'>
        <div className="logo">
          <Link to='/all-products' ><img src={Logo}></img></Link>
        </div>
        <ul>
          <li><NavLink className='nav-link' data-testid='test-1' to='/add-product'>Add Product</NavLink></li>
          { isLoggedIn ? (
            <>
            <li><NavLink className='nav-link' to='/all-products'>Products</NavLink></li>
            <li><NavLink className='nav-link' to='/' onClick={handleLogout}>Logout</NavLink></li>
            </>
          ) : (
            <li><NavLink className='nav-link' to='/'>Login</NavLink></li>
          )}
          <li><NavLink className='nav-link' to='/users'>Users</NavLink></li>
    
        </ul>
      </nav>
    </>
  );
};

export default Navbar;


