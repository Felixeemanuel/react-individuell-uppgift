import React from 'react';
import { Link } from 'react-router-dom'
import DeleteProduct from './buttons/DeleteProduct';
import EditProduct from './buttons/EditProduct';
import './product.css';
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

function Product({ product, onDelete }) {

  const navigate = useNavigate()
  
  // Function to handle delete doc 
  const handleClickDelete = async () => {
    console.log('Product id: ', product.productId)
    try {
      await deleteDoc(doc(db, 'products', product.productId));
      onDelete(product.productId)
      console.log('Product id: ', product.productId)
      navigate('/all-products')
    } catch (err) {
      console.log('Something went wrong when deleting product', err.message);
    }
  };

  return (
    <Link 
    product={product} 
    productid={product.productId} 
    to={ `/product/${product.productId}` } 
    className='productLink
    '>
      <div className='productContainer productLink'>
        <div className='left'>
          <img src={product.imageURL[0]} alt={product.title} />
          <h3>{product.title}</h3>
          </div>
        <div className="buttons">
          <DeleteProduct handleClickDelete={handleClickDelete} />
        </div>
      </div>
    </Link>
  );
}

export default Product;