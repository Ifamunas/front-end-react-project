/* eslint-disable prettier/prettier */

import { useSelector } from 'react-redux'

import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import SignInForm from '../components/SignInForm'

function ProtectedRoutes() {
  const { isLoggedIn } = useSelector((state: RootState) => state.users)
  return isLoggedIn ? <Outlet /> : <SignInForm />
}

export default ProtectedRoutes
