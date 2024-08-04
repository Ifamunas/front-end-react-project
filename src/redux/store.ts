import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import usersReducer from './slices/users/usersSlice'
import categoriesReducer from './slices/categories/categoriesSlice'
import ordersReducer from './slices/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    categories: categoriesReducer,
    orders: ordersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
