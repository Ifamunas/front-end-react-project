/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaClipboardList, FaUserCog, FaThList } from 'react-icons/fa'
import Stack from 'react-bootstrap/Stack'
function AdminSidebar() {
  const navigate = useNavigate()
  return (
    <Stack gap={3} className="stack">
      <div className="p-22">Admin Dashboard</div>
      <div className="p-2" onClick={() => navigate('/admin/products')}>
        <FaBoxOpen /> Products
      </div>
      <div className="p-2" onClick={() => navigate('/admin/categories')}>
        <FaThList /> Categories
      </div>
      <div className="p-2" onClick={() => navigate('/admin/orders')}>
        <FaClipboardList /> Orders
      </div>
      <div className="p-2" onClick={() => navigate('/admin/users')}>
        <FaUserCog /> Users
      </div>
    </Stack>
  )
}
export default AdminSidebar
