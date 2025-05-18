import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Layout({ role }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role={role} />
      <div style={{ flex: 1}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout