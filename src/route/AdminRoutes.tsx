/* eslint-disable prettier/prettier */

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'
import SignInForm from '../components/SignInForm'

function AdminRoutes() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  return isLoggedIn && userData.role === 'admin' ? <Outlet /> : <SignInForm />
}

export default AdminRoutes
