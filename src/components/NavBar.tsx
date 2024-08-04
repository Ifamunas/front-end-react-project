/* eslint-disable prettier/prettier */
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

import { FaRegUser, FaShoppingCart } from 'react-icons/fa'

import { AppDispatch, RootState } from '../redux/store'

import { userLogout } from '../redux/slices/users/usersSlice'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import SearchBar from './SearchBar'
import Modal from 'react-bootstrap/Modal'
import SignInTabs from './SignInTabs'

function NavBar() {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const dispatch: AppDispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="nav-bar navbar-dark">
      <Container>
        <Navbar.Brand>
          {' '}
          <img src="src/images/logo.webp" alt="Jupiter Logo" width={35} height={35} /> Jupiter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={'/about-us'}>
              About us
            </Nav.Link>
            <Nav.Link as={Link} to={'/contact-us'}>
              Contact us
            </Nav.Link>
            {isLoggedIn && userData.role === 'admin' && (
              <Nav.Link as={Link} to={'/admin'}>
                Admin
              </Nav.Link>
            )}
            {!isLoggedIn && <Nav.Link onClick={handleShow}>Admin</Nav.Link>}

            <SearchBar></SearchBar>
            {!isLoggedIn && (
              <Button id="sign-btn" onClick={handleShow}>
                Sign in <FaRegUser></FaRegUser>
              </Button>
            )}
            {isLoggedIn && (
              <Button id="sign-btn" onClick={handleLogout}>
                Log out <FaRegUser></FaRegUser>
              </Button>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <img src="src\images\logo.webp" alt="Jupiter Logo" width={30} height={30} />
                  {'  '} Hi! Let&apos;s get started!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SignInTabs />
              </Modal.Body>
            </Modal>
            <Button id="cart-btn" onClick={() => navigate('cart')}>
              Cart <FaShoppingCart></FaShoppingCart>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
