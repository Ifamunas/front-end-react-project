/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrdersState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await api.get('/mock/e-commerce/orders.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    })

    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'An Error Occurred'
    })
  }
})
export const { ordersRequest, ordersSuccess } = ordersSlice.actions

export default ordersSlice.reducer
