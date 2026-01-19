import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      
      <div style={styles.mainContent}>
        <Header />
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  mainContent: {
    marginLeft: '210px',
    width: 'calc(100vw - 210px)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'auto',
  },
  content: {
    padding: '35px',
    flex: 1,
    background: '#f8fafc',
  },
}

export default Layout