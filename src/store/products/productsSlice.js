// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState = {
  products: [],
  error: null,
  loading: false
}

// Defines an async thunk action creator addProduct that creates a new product using a service and handles errors
export const addProduct = createAsyncThunk('product-list/add', async (productData, thunkAPI) => {
  try {
    return await productsService.createProduct(productData)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

// Defines an async thunk action creator getProducts that fetches all products from a service and handles errors.
export const getProducts = createAsyncThunk('product-list/getAll', async (_, thunkAPI) => {
  try {
    return await productsService.getAllAsync('products')
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const productsSlice = createSlice({
  name: 'Product-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state for addProduct action
      .addCase(addProduct.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      // Handle fulfilled state for addProduct action
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = null; // Clear any existing error
        state.products = [...state.products, action.payload];
      })
      // Handle rejected state for addProduct action
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.payload; // Set the error message
      })

      // Handle pending state for getProducts action
      .addCase(getProducts.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      // Handle fulfilled state for getProducts action
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = null; // Clear any existing error
        state.products = action.payload; // Update the products array with the fetched products
      })
      // Handle rejected state for getProducts action
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.error = action.payload; // Set the error message
      });
  },
});

export default productsSlice.reducer;
