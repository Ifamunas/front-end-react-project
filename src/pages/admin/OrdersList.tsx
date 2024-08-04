/* eslint-disable prettier/prettier */
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'

import { fetchOrders } from '../../redux/slices/orders/ordersSlice'

import AdminSidebar from '../../components/AdminSidebar'
import Table from 'react-bootstrap/Table'

function OrdersList() {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orders)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product_ID</th>
            <th>User_ID</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productId}</td>
              <td>{order.userId}</td>
              <td>{order.purchasedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default OrdersList
