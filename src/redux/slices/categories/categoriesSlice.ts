/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    },
    addCategory: (state, action) => {
      state.categories = [action.payload, ...state.categories]
    },
    removeCategory: (state, action) => {
      const filteredItems = state.categories.filter(
        (category) => category.id !== action.payload
      )
      state.categories = filteredItems
    },
    updateCategory: (state, action) => {
      const {id, name } = action.payload
      const foundCategory = state.categories.find((category) => category.id === id)
      if (foundCategory){
        foundCategory.name = name
      }
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })

    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'An Error Occurred'
    })
  }
})
export const { removeCategory, addCategory, updateCategory, categoriesRequest, categoriesSuccess } = categoriesSlice.actions

export default categoriesSlice.reducer
