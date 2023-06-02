import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './products/productsSlice'
import authSlice from './auth/authSlice'

export const store = configureStore({
  reducer: {
    productList: productsSlice,
    auth: authSlice
  }
})