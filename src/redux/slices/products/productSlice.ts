/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action) => {
      state.items.push(action.payload)
    },
    removeProduct: (state, action) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload)
      state.items = filteredItems
    },
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProductsByPrice: (state, action) => {
      const sortCriteria = action.payload
      if (sortCriteria === 'low') {
        state.items.sort((a, b) => a.price - b.price)
      } 
      else {
        state.items.sort((a, b) => b.price - a.price)
      }
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.items.find((item) => item.id === id)
      if(foundProduct)
      state.singleProduct = foundProduct
    },

  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'An Error Occurred'
    })
  }
})
export const {
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  searchProduct,
  sortProductsByPrice,
  findProductById
} = productSlice.actions

export default productSlice.reducer
