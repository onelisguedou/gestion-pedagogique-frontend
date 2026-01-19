import { Link, useLocation } from 'react-router-dom'
import { Home, Users, GraduationCap, Tag, Settings, LogOut } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Utilisateurs' },
    { path: '/spaces', icon: GraduationCap, label: 'Espaces pédagogiques' },
    { path: '/promotions', icon: Tag, label: 'Promotions' },
    { path: '/settings', icon: Settings, label: 'Paramètres' },
  ]

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoBox}></div>
      </div>
      
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {})
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
        
        <div style={styles.navItem} onClick={() => alert('Déconnexion')}>
          <LogOut size={20} />
          <span>Déconnexion</span>
        </div>
      </nav>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '210px',
    background: '#384456',
    color: 'white',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
  },
  logo: {
    padding: '20px',
    background: '#2d3748',
    borderBottom: '1px solid #4a5568',
  },
  logoBox: {
    width: '45px',
    height: '45px',
    background: '#4a5568',
    borderRadius: '6px',
  },
  nav: {
    paddingTop: '10px',
  },
  navItem: {
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#cbd5e0',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  navItemActive: {
    background: '#3b82f6',
    color: 'white',
    borderLeft: '4px solid #2563eb',
  },
}

export default Sidebar