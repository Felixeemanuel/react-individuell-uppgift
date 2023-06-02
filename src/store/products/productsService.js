import { db } from "../../firebase/config"
import { addDoc, collection, getDocs } from 'firebase/firestore'

const createProduct = async (productData) => {
  // Get products from 'products' collection in Firebase
  const collectionRef = collection(db, 'products')
  // Add productData to collectionRef
  const docRef = await addDoc(collectionRef, productData)

  if(!docRef.id) throw new Error('Something went wrong')

  console.log(docRef)
  return {id: docRef.id, ...productData}

}

const getAllAsync = async (col) => {
  const colRef = collection(db, col)
  const querySnapshot = await getDocs(colRef)

  // For each product in the snapshot, push to products array
  const products = []
  querySnapshot.forEach(doc => {
    products.push({id: doc.id, ...doc.data()})
  })

  return products
}

const productsService = {
  createProduct,
  getAllAsync
}

export default productsService
