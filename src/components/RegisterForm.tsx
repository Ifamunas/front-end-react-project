/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent, useState } from 'react'

import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'

import { useNavigate } from 'react-router-dom'

import { addUser, fetchUsers } from '../redux/slices/users/usersSlice'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

function RegisterForm() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user'
  })

  const [validated, setValidated] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    const newUser = { id: new Date().getTime(), ...user }
    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    navigate('login')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control required type="text" placeholder="First name" onChange={handleChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.{' '}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control required type="text" placeholder="Last name" onChange={handleChange} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.{' '}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom03">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required onChange={handleChange} />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default RegisterForm
