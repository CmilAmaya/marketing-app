import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout'
import Welcome from './pages/Welcome';
import Upload from './pages/Upload';
import Users from './pages/Users';
import Database from './pages/Database';
import Help from './pages/Help'
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const role = 'admin' 

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #835bfc'
          },
          success: {
            iconTheme: {
              primary: '#835bfc',
              secondary: '#fff',
            },
          }
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout role={role} />}>
          <Route index element={<Welcome />} />
          <Route path="upload" element={<Upload />} />
          <Route path="users" element={<Users />}/>
          <Route path="database" element={<Database />}/>
          <Route path="help" element={<Help role={role} />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
