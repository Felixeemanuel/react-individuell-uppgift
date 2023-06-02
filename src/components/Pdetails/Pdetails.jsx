import { getDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { Form, useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { updateDoc } from 'firebase/firestore';
import './pdetails.css'

function Pdetails() {

    // Get ID of product from useParams
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [edit, setEdit] = useState(false)

    //Either empty or data from productDetail
    const [updateProduct, setUpdateProduct] = useState({
        title: productDetail.title || '',
        category: productDetail.category || '',
        description: productDetail.description || '',
        imageURL: productDetail.imageURL || '',
        price: productDetail.price || '',
        shortDescription: productDetail.shortDescription || '',
    })

    // Fetch products collection from Firebase
    const docRef = doc(db, 'products', productId);

    useEffect(() => {
      const getProductDetail = async () => {
        const docSnap = await getDoc(docRef);
        
        // If we get a product, set it to an object ProductData
        if (docSnap.exists()) {
          const productData = {
            productId: docSnap.id,
            category: docSnap.data().category,
            description: docSnap.data().description,
            imageURL: docSnap.data().imageURL,
            price: docSnap.data().price,
            shortDescription: docSnap.data().shortDescription,
            title: docSnap.data().title,
          };

          // Update state setProductDetail with productData object
          setProductDetail(productData);
        } else {
          console.log('Product not found');
        }
      };
      getProductDetail();
    }, [productId]);

    // Handle the change event for input fields and update the setUpdateProduct state.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateProduct((prevState) => ({ ...prevState, [name]: value }));
    };

// Function to handle form submit
const handleSave = () => {
    // Save to input field values or previous values of productDetail to a new array
    const updatedProduct = {
        ...productDetail,
        title: updateProduct.title || productDetail.title,
        category: updateProduct.category || productDetail.category,
        description: updateProduct.description || productDetail.description,
        imageURL: updateProduct.imageURL || productDetail.imageURL,
        price: updateProduct.price || productDetail.price,
        shortDescription: updateProduct.shortDescription || productDetail.shortDescription
    };


    // Update firebase document and update states of setUpdateProduct and setProductDetail
    updateDoc(docRef, updatedProduct)
    .then(docRef => {
        console.log('doc updated')
        setUpdateProduct(updatedProduct)
        setProductDetail(updatedProduct)
    }) .catch ( err => {
        console.log(err.message)
    })

    // Update state of setEdit to return back to productDetails view to see the new changes
    setEdit(false)
}

  return (
    <>
        <div className="wrapper">
        <div className="detailsContainer">
        { edit ? (
            // If edit state is true, display form / if false display productDetails view
        <Form className='detailsForm'>
            <div className="form-control">
                <label>Title</label>
                <input onChange={handleChange} type="text" name='title' placeholder={productDetail.title}/>
            </div>
            <div className="form-control">
                <label>Category</label>
                <input type="text" name='category' placeholder={productDetail.category}/>
            </div>
            <div className="form-control">
                <label>Description</label>
                <input onChange={handleChange} type="text" name='description' placeholder={productDetail.description}/>
            </div>
            <div className="form-control">
                <label>Image 1</label>
                <input onChange={handleChange} type="text" name='images' placeholder={productDetail.imageURL[0]}/>
            </div>
            <div className="form-control">
                <label>Image 2</label>
                <input onChange={handleChange} type="text" name='images' placeholder={productDetail.imageURL[1]}/>
            </div>
            <div className="form-control">
                <label>Image 3</label>
                <input onChange={handleChange} type="text" name='images' placeholder={productDetail.imageURL[2]}/>
            </div>
            <div className="form-control">
                <label>Image 4</label>
                <input onChange={handleChange} type="text" name='images' placeholder={productDetail.imageURL[3]}/>
            </div>
            <div className="form-control">
                <label>Image 5</label>
                <input onChange={handleChange} type="text" name='images' placeholder={productDetail.imageURL[4]}/>
            </div>
            <div className="form-control">
                <label>Price</label>
                <input onChange={handleChange} type="text" name='price' placeholder={`${productDetail.price} :-`}/>
            </div>
            <div className="form-control">
                <label>Short Description</label>
                <textarea onChange={handleChange} className='textarea' type="text" name='shortDescription' placeholder={productDetail.description}/>
            </div>
        </Form>
        ): (
            <>
            <div className="images">
                <div className="largeImageContainer">
                  {productDetail.imageURL && productDetail.imageURL[0] && (
                    <img src={productDetail.imageURL[0]} alt={productDetail.title} />
                  )}
                </div>
                <div className="smallImageContainer">
                  {productDetail.imageURL &&
                    productDetail.imageURL.slice(1, 5).map((url, index) => (
                      <img key={index} src={url} alt={productDetail.title} />
                    ))}
                </div>
            </div>
            <div className="details">
                <div className="textDetails">
                    <h3>{productDetail.title}</h3>
                    <p>{productDetail.shortDescription}</p>
                    <p>{productDetail.description}</p>
                    <p>{productDetail.category}</p>
                </div>
                <div className="pricing">
                    <h4>{productDetail.price} :-</h4>
                </div>
            </div>
        </>
        )}
        </div>
        </div>
        <div>
            { edit ? (
                <button onClick={handleSave} className='editBtn'>Save changes</button>

            ):(
                <button onClick={() => setEdit(true)} className='editBtn'>Edit Product</button>
            )}
        </div>
    
    </>
  )
}

export default Pdetails

