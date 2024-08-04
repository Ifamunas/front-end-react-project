/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: false,
  userData: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
    },
    userLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
    },
    userRequest: (state) => {
      state.isLoading = true
    },
    userSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filteredUsers
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload
    })

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'An Error Occurred'
    })
  }
})
export const { removeUser, addUser, userRequest, userSuccess, userLogin, userLogout } =
  usersSlice.actions

export default usersSlice.reducer
