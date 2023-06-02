import React, { useState, useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setAdmin } from '../../store/action';
import './Formforlogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { setToken } from '../../store/action';

const Formforlogin = ({ handleLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [emailError, setEmailError] = useState(false); 
  const [passwordError, setPasswordError] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to submit the form and login admin
  const submitLogin = async (e) => {
    // Get authentication from firebase/auth
    const auth = getAuth();
    const db = getFirestore();
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);

    // Update state of setEmailError to display error message
    if (!email) {
      setEmailError(true);
      return;
    }

    // Update state of setPasswordError to display error message
    if (!password) {
      setPasswordError(true);
      return;
    }

    // Useing signInWithEmailAndPassword from firebase to login admin
    try {
      const auth = getAuth();
      const adminLog = await signInWithEmailAndPassword(auth, email, password);
      const user = adminLog.user;
      const token = await user.getIdToken();
      // Update Redux store with Admin data
      dispatch(setAdmin(user));
      dispatch(setToken(token)); 
      // setIsLoggedIn(true)
      // console.log(isLoggedIn)
      // Save token in localStorage
      localStorage.setItem('accessToken', user.accessToken)

      //Get the correct admin from Firebase by query
      const adminQuery = query(collection(db, 'admins'), where('email', '==', email));
      const adminQuerySnapshot = await getDocs(adminQuery);

      if (!adminQuerySnapshot.empty) {
        const adminDoc = adminQuerySnapshot.docs[0];
        const adminData = adminDoc.data();
        console.log('Admin ID:', adminDoc.id);
        console.log(adminData);

      }


      handleLogin();
      // If we are successful, navigate to index
      navigate('/all-products')
      console.log('Token:', token); // Console log the token
      return user
    } catch (error) {
      console.log('Login error:', error);
      setLoginError(true);
    }
  };

  return (
    <div className="container">
    <div className='form-login-wrapper'>
    <div className="form-login-container">
      <Form noValidate onSubmit={submitLogin}>
        <h4>Please Login to Your Account</h4>
        <div className="input-group-login d-flex-form">
          <label className='form-label-link' htmlFor="email">E-mail* <Link className='form-link-register-padding' to='/register'>Don't have an Account yet?</Link></label>
          <input type="email" name="email" id="email" className='input-login' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group-login d-flex-form">
          <label htmlFor="password" className='form-label-link'>Password* <Link to='/forgotpassword' className='form-link-register-padding'>Forgot your password?</Link></label>
          <input type="password" name="password" id="password" className='input-login' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
        {/* { loading && <p>Loading...</p> }
        { error && <p className='text-danger'>{ error }</p> } */}
        </div>
        <div>
          <button className='btn-submit-login' type="submit">Submit</button>
        </div>
      </Form>
    </div>
  </div>
  </div>
  );
};

export default Formforlogin;

