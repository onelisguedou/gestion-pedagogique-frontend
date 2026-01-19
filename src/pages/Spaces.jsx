import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { getSpaces, createSpace, getUsers, getPromotions } from '../services/api'

const Spaces = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nomCours: '',
    formateur: '',
    promotion: ''
  })

  const [spaces, setSpaces] = useState([])
  const [formateurs, setFormateurs] = useState([])
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)

  // Charger les espaces, formateurs et promotions au démarrage
  useEffect(() => {
    loadSpaces()
    loadFormateurs()
    loadPromotions()
  }, [])

  const loadSpaces = async () => {
    try {
      const data = await getSpaces()
      setSpaces(data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur lors du chargement des espaces:', error)
      setLoading(false)
    }
  }

  const loadFormateurs = async () => {
    try {
      const users = await getUsers()
      // Filtrer uniquement les formateurs
      const formateursList = users.filter(user => user.role === 'Formateur')
      setFormateurs(formateursList)
    } catch (error) {
      console.error('Erreur lors du chargement des formateurs:', error)
    }
  }

  const loadPromotions = async () => {
    try {
      const data = await getPromotions()
      setPromotions(data)
    } catch (error) {
      console.error('Erreur lors du chargement des promotions:', error)
    }
  }

  // Couleurs aléatoires pour les nouveaux espaces
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]

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
      await createSpace(formData)
      alert('Espace pédagogique créé avec succès !')
      setShowModal(false)
      loadSpaces() // Recharger la liste
      
      // Réinitialiser le formulaire
      setFormData({
        nomCours: '',
        formateur: '',
        promotion: ''
      })
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'espace')
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        Chargement des espaces...
      </div>
    )
  }

  return (
    <div>
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Total Espaces</span>
            <div style={{...styles.statIcon, background: '#3b82f6'}}></div>
          </div>
          <div style={styles.statValue}>{spaces.length}</div>
          <div style={styles.statTrend}>Tous domaines</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Espaces Actifs</span>
            <div style={{...styles.statIcon, background: '#10b981'}}></div>
          </div>
          <div style={styles.statValue}>{spaces.length}</div>
          <div style={styles.statTrend}>En cours</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Formateurs Actifs</span>
            <div style={{...styles.statIcon, background: '#8b5cf6'}}></div>
          </div>
          <div style={styles.statValue}>{formateurs.length}</div>
          <div style={styles.statTrend}>Disponibles</div>
        </div>
      </div>

      {/* Header avec bouton */}
      <div style={styles.pageHeader}>
        <h3 style={styles.pageTitle}>Tous les Espaces</h3>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={18} /> Créer un espace
        </button>
      </div>

      {/* Cards Grid */}
      {spaces.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
          Aucun espace pédagogique pour le moment. Cliquez sur "Créer un espace" pour commencer.
        </div>
      ) : (
        <div style={styles.cardsGrid}>
          {spaces.map((space, i) => (
            <div key={space.id} style={styles.spaceCard}>
              <div style={{
                ...styles.spaceImage, 
                background: colors[i % colors.length]
              }}></div>
              <div style={styles.spaceContent}>
                <div style={styles.spaceName}>{space.nomCours}</div>
                <div style={styles.spaceInfo}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Formateur:</span>
                    <span style={styles.infoValue}>{space.formateur}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Promotion:</span>
                    <span style={styles.infoValue}>{space.promotion}</span>
                  </div>
                </div>
                <div style={styles.spaceMeta}>
                  <span>👥 {space.students} étudiants</span>
                  <span>📚 {space.courses} cours</span>
                </div>
                <div style={styles.actionBtns}>
                  <button style={styles.actionBtn}>Voir</button>
                  <button style={styles.actionBtn}>Gérer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Formulaire */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Créer un Espace Pédagogique</h2>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom du Cours *</label>
                <input
                  type="text"
                  name="nomCours"
                  value={formData.nomCours}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Ex: Développement Web Avancé"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Formateur *</label>
                <select
                  name="formateur"
                  value={formData.formateur}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="">-- Sélectionner un formateur --</option>
                  {formateurs.length === 0 ? (
                    <option disabled>Aucun formateur disponible</option>
                  ) : (
                    formateurs.map((formateur) => (
                      <option key={formateur.id} value={`${formateur.prenom} ${formateur.nom}`}>
                        {formateur.prenom} {formateur.nom} ({formateur.email})
                      </option>
                    ))
                  )}
                </select>
                {formateurs.length === 0 && (
                  <small style={styles.helpText}>
                    💡 Ajoutez d'abord des formateurs dans la page Utilisateurs
                  </small>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Promotion *</label>
                <select
                  name="promotion"
                  value={formData.promotion}
                  onChange={handleInputChange}
                  style={styles.select}
                  required
                >
                  <option value="">-- Sélectionner une promotion --</option>
                  {promotions.length === 0 ? (
                    <option disabled>Aucune promotion disponible</option>
                  ) : (
                    promotions.map((promo) => (
                      <option key={promo.id} value={promo.name}>
                        {promo.name} ({promo.year}) - {promo.students} étudiants
                      </option>
                    ))
                  )}
                </select>
                {promotions.length === 0 && (
                  <small style={styles.helpText}>
                    💡 Ajoutez d'abord des promotions dans la page Promotions
                  </small>
                )}
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
                  Créer l'espace
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
    color: '#64748b',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '18px',
    fontWeight: '600',
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
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  spaceCard: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  spaceImage: {
    width: '100%',
    height: '150px',
  },
  spaceContent: {
    padding: '20px',
  },
  spaceName: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  spaceInfo: {
    marginBottom: '10px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: '13px',
    color: '#1e293b',
    fontWeight: '500',
  },
  spaceMeta: {
    display: 'flex',
    gap: '15px',
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '15px',
  },
  actionBtns: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '6px 16px',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '13px',
    flex: 1,
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
  helpText: {
    display: 'block',
    marginTop: '5px',
    fontSize: '12px',
    color: '#64748b',
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

export default Spaces
  







