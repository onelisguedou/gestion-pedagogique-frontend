import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Spaces from './pages/Spaces'
import Promotions from './pages/Promotions'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="spaces" element={<Spaces />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App