/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'

import { fetchUsers, userLogin } from '../redux/slices/users/usersSlice'

import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

export const SignInForm = () => {
  const { users } = useSelector((state: RootState) => state.users)
  const [user, setUser] = useState({ email: '', password: '' })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const userFound = users.find((userData) => userData.email === user.email)
      if (userFound && userFound.password === user.password) {
        dispatch(userLogin(userFound))
        toast.success('Successfully logged in!')
        if (userFound.role === 'visitor') {
          navigate('/')
        } else {
          navigate('admin')
        }
      } else {
        toast.error('Email address or password incorrect.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="center">
      <Form className="sign-form" onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control
            name="email"
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default SignInForm
