/* eslint-disable prettier/prettier */
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FaRegTimesCircle } from 'react-icons/fa'

import { AppDispatch, RootState } from '../../redux/store'

import { fetchUsers, removeUser } from '../../redux/slices/users/usersSlice'

import AdminSidebar from '../../components/AdminSidebar'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function ProductsList() {
  const { users, isLoading, error } = useSelector((state: RootState) => state.users)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleRemove = (id: number) => {
    dispatch(removeUser(id))
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(user.id)}>
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
