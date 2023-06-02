import { getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pdetails from '../components/Pdetails/Pdetails';
import { db } from '../firebase/config';

function ProductDetails() {
  
  return (
    <>
        <Pdetails />
    </>
  );
}

export default ProductDetails;
