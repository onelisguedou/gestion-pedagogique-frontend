import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Spaces from './pages/Spaces'
import Promotions from './pages/Promotions'
import Settings from './pages/Settings'
import Login from './pages/login'

// Composant pour protéger les routes
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Route de connexion (accessible sans authentification) */}
      <Route path="/login" element={<Login />} />
      
      {/* Routes protégées avec Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="spaces" element={<Spaces />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* Redirection par défaut vers login si non authentifié */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App