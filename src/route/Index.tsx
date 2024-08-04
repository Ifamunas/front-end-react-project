/* eslint-disable prettier/prettier */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import ProtectedRoutes from './ProtectedRoutes'
import ProductDetails from '../pages/ProductDetails'
import AdminRoutes from './AdminRoutes'
import Admin from '../pages/admin/Admin'
import UsersList from '../pages/admin/usersList'
import OrdersList from '../pages/admin/ordersList'
import ProductsList from '../pages/admin/productsList'
import CategoriesList from '../pages/admin/categoriesList'

function Index() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/" element={<AdminRoutes />}>
          <Route path="admin" element={<ProductsList />} />
          <Route path="admin/users" element={<UsersList />} />
          <Route path="admin/orders" element={<OrdersList />} />
          <Route path="admin/products" element={<ProductsList />} />
          <Route path="admin/categories" element={<CategoriesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Index
