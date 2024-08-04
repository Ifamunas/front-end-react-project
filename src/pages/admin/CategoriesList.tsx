/* eslint-disable prettier/prettier */

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { FaEdit, FaRegTimesCircle } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'

import {
  addCategory,
  fetchCategory,
  removeCategory,
  updateCategory
} from '../../redux/slices/categories/categoriesSlice'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import AdminSidebar from '../../components/AdminSidebar'

function CategoriesList() {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categories)
  const dispatch: AppDispatch = useDispatch()

  const [categoryName, setCategoryName] = useState('')
  const [editing, isEditing] = useState(false)
  const [categoryId, setCategoryId] = useState(0)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!editing) {
      const newCategoryName = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategoryName))
    } else {
      const updateCategoryName = { id: categoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryName))
    }
  }

  const handleEdit = (id: number, name: string) => {
    setCategoryId(id)
    isEditing(true)
    setCategoryName(name)
  }

  const handleRemove = (id: number) => {
    dispatch(removeCategory(id))
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
                {editing ? 'Update Category' : 'Add Category'}
              </Button>
              <Form.Control
                aria-label="search-field"
                aria-describedby="search search-field"
                placeholder="Enter a new category"
                value={categoryName}
                onChange={handleChange}
              />
            </InputGroup>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button variant="secondary" onClick={() => handleEdit(category.id, category.name)}>
                  <FaEdit />
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(category.id)}>
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

export default CategoriesList
