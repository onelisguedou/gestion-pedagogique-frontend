import { useState, useEffect } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { getUsers, createUser } from '../services/api'

const Users = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    role: 'Étudiant'
  })
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await createUser(formData)
      alert('Utilisateur créé avec succès !')
      setShowModal(false)
      loadUsers() // Recharger la liste
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        role: 'Étudiant'
      })
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'utilisateur')
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        Chargement des utilisateurs...
      </div>
    )
  }

  return (
    <div>
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Total Utilisateurs</span>
            <div style={{...styles.statIcon, background: '#3b82f6'}}></div>
          </div>
          <div style={styles.statValue}>{users.length}</div>
          <div style={styles.statTrend}>+12% ce mois</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Étudiants</span>
            <div style={{...styles.statIcon, background: '#10b981'}}></div>
          </div>
          <div style={styles.statValue}>
            {users.filter(u => u.role === 'Étudiant').length}
          </div>
          <div style={styles.statTrend}>85% du total</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Formateurs</span>
            <div style={{...styles.statIcon, background: '#8b5cf6'}}></div>
          </div>
          <div style={styles.statValue}>
            {users.filter(u => u.role === 'Formateur').length}
          </div>
          <div style={styles.statTrend}>15% du total</div>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>Liste des Utilisateurs</h2>
          <div style={styles.tableActions}>
            <div style={styles.searchBox}>
              <Search size={18} color="#64748b" />
              <input 
                type="text" 
                placeholder="Rechercher un utilisateur..." 
                style={styles.searchInput}
              />
            </div>
            <button style={styles.addBtn} onClick={() => setShowModal(true)}>
              <Plus size={18} /> Ajouter Utilisateur
            </button>
          </div>
        </div>

        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Prénom</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rôle</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Aucun utilisateur pour le moment. Cliquez sur "Ajouter Utilisateur" pour commencer.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.nom}</td>
                  <td style={styles.td}>{user.prenom}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: user.status === 'Actif' ? '#dcfce7' : '#fee2e2',
                      color: user.status === 'Actif' ? '#166534' : '#991b1b',
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button style={styles.actionBtn}>Voir</button>
                      <button style={styles.actionBtn}>Modifier</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Formulaire */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Ajouter un Utilisateur</h2>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="Entrez le nom"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="Entrez le prénom"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="exemple@email.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mot de passe *</label>
                <input
                  type="password"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Rôle *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="Étudiant">Étudiant</option>
                  <option value="Formateur">Formateur</option>
                  <option value="Directeur">Directeur</option>
                </select>
              </div>

              <div style={styles.formActions}>
                <button 
                  type="button" 
                  style={styles.cancelBtn}
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Ajouter l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  statLabel: {
    color: '#64748b',
    fontSize: '14px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '5px',
  },
  statTrend: {
    fontSize: '14px',
    color: '#10b981',
  },
  tableCard: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '20px 25px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  tableTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  tableActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    background: 'white',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    width: '250px',
  },
  addBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    background: '#f8fafc',
  },
  th: {
    padding: '15px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#475569',
    fontSize: '14px',
  },
  tr: {
    borderTop: '1px solid #e2e8f0',
  },
  td: {
    padding: '15px 20px',
    color: '#334155',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionBtns: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '6px 12px',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    padding: '25px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: '25px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#334155',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    background: 'white',
  },
  formActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '25px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
  },
  cancelBtn: {
    padding: '10px 20px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    background: 'white',
    color: '#64748b',
    fontWeight: '500',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    background: '#3b82f6',
    color: 'white',
    fontWeight: '500',
    cursor: 'pointer',
  },
}

export default Users