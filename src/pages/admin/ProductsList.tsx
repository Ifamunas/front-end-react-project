/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FaRegTimesCircle, FaEdit } from 'react-icons/fa'

import { AppDispatch, RootState } from '../../redux/store'

import { addProduct, fetchProducts, removeProduct } from '../../redux/slices/products/productSlice'

import AdminSidebar from '../../components/AdminSidebar'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

function ProductsList() {
  const { items, isLoading, error } = useSelector((state: RootState) => state.products)
  const dispatch: AppDispatch = useDispatch()

  const [product, setProduct] = useState('')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value)
  }

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newProduct = { id: new Date().getTime(), name: product }
    dispatch(addProduct(newProduct))
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <Table responsive>
        <thead>
          <tr>
            <InputGroup>
              <Button
                variant="success"
                id="button-addon2"
                aria-label="add-button"
                onClick={handleSubmit}>
                Add Product
              </Button>
              <Form.Control
                aria-label="search-field"
                aria-describedby="search search-field"
                placeholder="Enter a new product"
                onChange={handleChange}
              />
            </InputGroup>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Categories</th>
            <th>Variants</th>
            <th>Sizes</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td
                style={{
                  columnWidth: '0.1rem',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}>
                {item.image}
              </td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.categories.join(' , ')}</td>
              <td>{item.variants.join(' , ')}</td>
              <td>{item.sizes.join(' , ')}</td>
              <td>
                <Button variant="secondary">
                  <FaEdit />
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item.id)}>
                  <FaRegTimesCircle />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductsList
