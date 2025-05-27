import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Upload from './pages/Upload';
import Users from './pages/Users';
import Database from './pages/Database';
import Help from './pages/Help';
import Login from './pages/Login';
import Report from './pages/Report';
import './App.css';

function App() {
  const { user } = useAuth();
  const location = useLocation();

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
      <Routes location={location}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Welcome />} />
          <Route path="upload" element={<Upload />} />
          <Route path="users" element={<Users />}/>
          <Route path="database" element={<Database />}/>
          <Route path="help" element={<Help />}/>
          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
