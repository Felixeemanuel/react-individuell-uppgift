import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productsService from "./productsService"

const initialState = {
  product: null, // Holds the single product
  error: null, // Holds the error message, if any
  loading: false // Indicates whether the product is being fetched
}

// Async thunk action creator to fetch a product by ID
export const getProductById = createAsyncThunk('singleProduct/getById', async (id, thunkAPI) => {
  try {
    // Fetch the product using the service
    return await productsService.getByIdAsync(id) 
  } catch (err) {
    console.log(err.message) 
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Create a slice for the singleProduct feature
export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    clearProduct: (state) => {
      // Clear the single product
      state.product = null 
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for getProductById action
      .addCase(getProductById.pending, (state) => {
        state.loading = true
      })
      // Handle fulfilled state for getProductById action
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
        state.error = null
      })
      // Handle rejected state for getProductById action
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false
        state.product = null
        state.error = action.payload 
      })
  }
})

// Extract the clearProduct action
export const { clearProduct } = singleProductSlice.actions 

// Export the reducer function
export default singleProductSlice.reducer 
