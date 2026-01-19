import { Plus } from 'lucide-react'

const Button = ({ 
  children, 
  variant = 'primary', 
  icon, 
  onClick,
  ...props 
}) => {
  const styles = {
    primary: {
      background: '#3b82f6',
      color: 'white',
      padding: '12px 25px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '15px',
      transition: 'all 0.2s',
    },
    secondary: {
      background: 'white',
      color: '#3b82f6',
      padding: '12px 30px',
      borderRadius: '8px',
      border: '2px solid #3b82f6',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
    },
  }

  return (
    <button 
      style={styles[variant]} 
      onClick={onClick}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  )
}

export default Button