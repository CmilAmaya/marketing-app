import { NavLink } from 'react-router-dom'
import { Upload, HelpCircle, LogOut, BarChart2, Users, Database, ArrowBigUp } from 'lucide-react'
import avatar from '../assets/avatar.png'
import '../styles/sidebar.css'
import { useAuth } from '../context/AuthContext.jsx';

const itemsByRole = {
  admin: [
    { label: 'Upload File', to: '/upload', text: 'CSV file', letter:'U', icon:Upload},
    { label: 'Reports / Dashboard', to: '/reports', text: 'Access generated report', letter:'R', icon:BarChart2},
    { label: 'Users', to: '/users', text: 'Manage users', letter:'U', icon:Users},
    { label: 'Database', to: '/database', text: 'Access and manage database', letter:'U', icon:Database},
  ],
  user: [
    { label: 'Upload File', to: '/upload', text: 'CSV file', letter:'U', icon:Upload},
    { label: 'Reports / Dashboard', to: '/reports', text: 'Acess generated report', letter:'R', icon:BarChart2},
  ],
  buttons: [
    { label: 'Help', to: '/help', letter:'H', icon:HelpCircle},
    { label: 'Log out', to: '/logout', letter:'Q', icon:LogOut},
  ],
}

function Sidebar({ role }) {
  const items = itemsByRole[role] || []
  const bottomItems = itemsByRole.buttons
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.href = '/login';
  };

  return (
    <aside
      className='aside-sidebar'
    >
      <div>
        <div className='title-sidebar'>
          <img src={avatar} width="50px" height="50px"></img>
          <div className='title-name-sidebar'>
            <h4 className='name-sidebar'>Carlos Arevalo</h4>
            <h5 className='role-sidebar'>{role}</h5>
          </div>
        </div>
        <nav>
            <hr style={{ margin: '1rem 0' }} />
               {items.map((item) => {
                const Icon = item.icon;
                return (
                <NavLink 
                  className={({ isActive }) => isActive ? 'links-sidebar-selected' : 'links-sidebar'} 
                  key={item.to} 
                  to={item.to}>
                  <div className="main-link-content">
                      <Icon size={18} className="icon-sidebar" />
                      <div>
                          <h4 className="items-sidebar"> {item.label}</h4>
                          <p className="text-sidebar">{item.text}</p>
                      </div>
                  </div>
                  <p className="letter-sidebar">
                      <ArrowBigUp size={17} style={{ marginLeft: '4px' }} />
                      {item.letter} 
                  </p>
                </NavLink>
                );
            })}
        </nav>
      </div>

      <div>
        <hr style={{ margin: '1rem 0', color: '#ddd' }} />
        {bottomItems.map((item) => {
            const ButtonIcon = item.icon
            if(item.to === '/logout') {
              return (
                <a className="links-sidebar" key={item.to} href="/logout" onClick={handleLogout}>
                  <ButtonIcon size={18} className="icon-sidebar" />
                  <p className='items-sidebar'> {item.label} </p>
                  <p className="letter-sidebar">
                      <ArrowBigUp size={17} style={{ marginLeft: '4px' }} />
                      {item.letter} 
                  </p>
                </a>
              )
            }
            return(
                <NavLink className="links-sidebar" key={item.to} to={item.to}>
                    <ButtonIcon size={18} className="icon-sidebar" />
                    <p className='items-sidebar'> {item.label} </p>
                    <p className="letter-sidebar">
                        <ArrowBigUp size={17} style={{ marginLeft: '4px' }} />
                        {item.letter} 
                    </p>
                </NavLink>
            )
        })}
      </div>
    </aside>
  )
}

export default Sidebar