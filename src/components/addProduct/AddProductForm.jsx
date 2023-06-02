import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/products/productsSlice'
import './addproduct.css'

const AddProductForm = () => {

  // UseState for every imageURL
  const [imageURL, setImageURL] = useState('');
  const [imageURL1, setImageURL1] = useState('');
  const [imageURL2, setImageURL2] = useState('');
  const [imageURL3, setImageURL3] = useState('');
  const [imageURL4, setImageURL4] = useState('');
  const [imageURL5, setImageURL5] = useState('');

  const dispatch = useDispatch()

  // Set all fields in the object to empty strings
  const [productData, setProductData] = useState({
    
    title: '',
    category: '',
    price: '',
    shortDescription: '',
    description: '',
    imageURL: []
  })

  // Handle the change event for input fields and update the product data state.
  const handleChange = e => {
    const { id, value } = e.target
    // setImageURL(['"' + imageURL1 + '", "' + imageURL2 + '", "' + imageURL3 + '", "' + imageURL4 + '", "' + imageURL5 + '"'])
    // console.log(imageURL)
    setProductData(form => {
      return {
        ...form,
        [id]: value
      }
    })
  }

  const navigate = useNavigate()

  // Submits the form and creates a new object (Product) with an array of Images and converts the price to a number
  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      ...productData,
      imageURL: [imageURL1, imageURL2, imageURL3, imageURL4, imageURL5],
      price: +productData.price
    }

    // Update the Redux store with the new product
    dispatch(addProduct(data))
    navigate('/all-products')
  }

  return (
    <div className='center'>

    <div className='center addProductform'>
      <h1 className='text-center'>Add a new product</h1>
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name" className="form-label">Product Title:</label>
          <input type="text" className="form-control" id='title' value={productData.title} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="shortDescription" className="form-label">Short Description:</label>
          <textarea className='form-control' id="shortDescription" rows="1" value={productData.shortDescription} onChange={handleChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="price" className="form-label">Product Price:</label>
          <input type="number" inputMode='decimal' className="form-control" id='price' value={productData.price} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="category" className="form-label">Category:</label>
          <textarea className='form-control' id="category" rows="1" value={productData.category} onChange={handleChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="description" className="form-label">Product Description:</label>
          <textarea className='form-control' id="description" rows="3" value={productData.description} onChange={handleChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="imageURL1" className="form-label">Image Url 1:</label>
          <input type="text" className="form-control" id='imageURL1' value={imageURL1} onChange={(e) => setImageURL1(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="imageURL2" className="form-label">Image Url 2:</label>
          <input type="text" className="form-control" id='imageURL2' value={imageURL2} onChange={(e) => setImageURL2(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="imageURL3" className="form-label">Image Url 3:</label>
          <input type="text" className="form-control" id='imageURL3' value={imageURL3} onChange={(e) => setImageURL3(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="imageURL4" className="form-label">Image Url 4:</label>
          <input type="text" className="form-control" id='imageURL4' value={imageURL4} onChange={(e) => setImageURL4(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="imageURL5" className="form-label">Image Url 5:</label>
          <input type="text" className="form-control" id='imageURL5' value={imageURL5} onChange={(e) => setImageURL5(e.target.value)} />
        </div>
        <div className='center'>
        <button className="btn btn-primary addProductFormBtn">Add Product</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddProductForm