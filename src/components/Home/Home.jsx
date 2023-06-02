import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config'
import Product from '../product/Product'

function Home({ handleClickDelete }) {

    const [products, setProducts] = useState([])

    // Fetch product from firebase
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const orderRef = collection(db, 'products');
            const querySnapshot = await getDocs(orderRef);
      
            const productData = querySnapshot.docs.map((doc) => ({
              productId: doc.id,
              category: doc.data().category,
              description: doc.data().description,
              imageURL: doc.data().imageURL,
              price: doc.data().price,
              shortDescription: doc.data().shortDescription,
              title: doc.data().title,
            }));
      
            // Set state to array of product objects
            setProducts(productData);
          } catch (error) {
            console.log('Error fetching products: ', error);
          }
        };
      
        fetchProducts();
      }, []);

      // Delete function, takes in product ID and returns a new array without the deleted product
      const handleDeleteProduct = (deletedProductId) => {
        setProducts(prevProducts => prevProducts.filter(product => product.productId !== deletedProductId));
      };



  return (
    <div className='adminProductContainer'>
        {
          // If we have any products, return each <Product /> component, otherwise show <p> tag
            products.length > 0
            ? products.map(product => 
            <Product 
            key={product.productId} 
            product={product}
            handleClickDelete={handleClickDelete}
            onDelete={handleDeleteProduct}
            />)
            : <p>Nothing to show</p>
        }
    </div>
  )
}

export default Home