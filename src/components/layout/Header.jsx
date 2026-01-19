import { Bell } from 'lucide-react'

const Header = () => {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>Bienvenue, Monsieur Dupont</h1>
      
      <div style={styles.right}>
        <div style={styles.notificationIcon}>
          <Bell size={20} color="white" />
          <div style={styles.badge}>3</div>
        </div>
        
        <div style={styles.userProfile}>
          <div style={styles.avatar}></div>
          <span style={{ fontWeight: '500', color: '#334155' }}>M. Dupont</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'white',
    padding: '20px 35px',
    borderBottom: '2px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    width: '100%',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#1e293b',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notificationIcon: {
    width: '45px',
    height: '45px',
    background: '#ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  badge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#dc2626',
    color: 'white',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    border: '2px solid white',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '45px',
    height: '45px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    borderRadius: '50%',
  },
}

export default Header