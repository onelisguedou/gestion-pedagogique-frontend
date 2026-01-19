import { useState, useEffect } from 'react'
import { Plus, Search, X, UserPlus } from 'lucide-react'
import { getPromotions, createPromotion, getUsers } from '../services/api'

const Promotions = () => {
  const [showModal, setShowModal] = useState(false)
  const [showAffectModal, setShowAffectModal] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    students: 0,
    status: ''
  })
  const [affectData, setAffectData] = useState({
    etudiantId: '',
    promotionId: ''
  })

  const [promotions, setPromotions] = useState([])
  const [etudiants, setEtudiants] = useState([])
  const [loading, setLoading] = useState(true)

  // Charger les promotions et étudiants au démarrage
  useEffect(() => {
    loadPromotions()
    loadEtudiants()
  }, [])

  const loadPromotions = async () => {
    try {
      const data = await getPromotions()
      console.log('Promotions chargées:', data)
      setPromotions(data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur lors du chargement des promotions:', error)
      setLoading(false)
    }
  }

  const loadEtudiants = async () => {
    try {
      const users = await getUsers()
      const etudiantsList = users.filter(user => user.role === 'Étudiant')
      setEtudiants(etudiantsList)
    } catch (error) {
      console.error('Erreur lors du chargement des étudiants:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAffectChange = (e) => {
    const { name, value } = e.target
    setAffectData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Déterminer le statut en fonction de l'année
    const currentYear = new Date().getFullYear()
    let status = 'Nouvelle'
    if (parseInt(formData.year) < currentYear) {
      status = 'Terminée'
    } else if (parseInt(formData.year) === currentYear) {
      status = 'En cours'
    }
    
    const promotionData = {
      name: formData.name,
      year: formData.year,
      students: parseInt(formData.students) || 0,
      status: status
    }

    console.log('Données envoyées:', promotionData)
    
    try {
      const newPromotion = await createPromotion(promotionData)
      console.log('Promotion créée:', newPromotion)
      
      alert('Promotion créée avec succès !')
      setShowModal(false)
      loadPromotions() // Recharger la liste
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        year: '',
        students: 0,
        status: ''
      })
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Erreur : ' + (error.response?.data?.message || error.message))
    }
  }

  const handleAffectSubmit = async (e) => {
    e.preventDefault()
    alert('Fonctionnalité d\'affectation en cours de développement')
  }

  const openAffectModal = (promotion = null) => {
    if (promotion) {
      setSelectedPromotion(promotion)
      setAffectData(prev => ({
        ...prev,
        promotionId: promotion.id.toString()
      }))
    }
    setShowAffectModal(true)
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        Chargement des promotions...
      </div>
    )
  }

  return (
    <div>
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Promotions Actives</span>
            <div style={{...styles.statIcon, background: '#f97316'}}></div>
          </div>
          <div style={styles.statValue}>
            {promotions.filter(p => p.status === 'En cours' || p.status === 'Nouvelle').length}
          </div>
          <div style={styles.statTrend}>En cours</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Total Étudiants</span>
            <div style={{...styles.statIcon, background: '#3b82f6'}}></div>
          </div>
          <div style={styles.statValue}>
            {promotions.reduce((acc, promo) => acc + promo.students, 0)}
          </div>
          <div style={styles.statTrend}>Dans toutes les promotions</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <span style={styles.statLabel}>Taux de Réussite</span>
            <div style={{...styles.statIcon, background: '#10b981'}}></div>
          </div>
          <div style={styles.statValue}>87%</div>
          <div style={styles.statTrend}>Moyenne générale</div>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>Liste des Promotions</h2>
          <div style={styles.tableActions}>
            <div style={styles.searchBox}>
              <Search size={18} color="#64748b" />
              <input 
                type="text" 
                placeholder="Rechercher une promotion..." 
                style={styles.searchInput}
              />
            </div>
            <button style={styles.affectBtn} onClick={() => openAffectModal()}>
              <UserPlus size={18} /> Affecter Étudiant
            </button>
            <button style={styles.addBtn} onClick={() => setShowModal(true)}>
              <Plus size={18} /> Ajouter Promotion
            </button>
          </div>
        </div>

        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Nom de la Promotion</th>
              <th style={styles.th}>Année</th>
              <th style={styles.th}>Étudiants</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Aucune promotion pour le moment. Cliquez sur "Ajouter Promotion" pour commencer.
                </td>
              </tr>
            ) : (
              promotions.map((promo) => (
                <tr key={promo.id} style={styles.tr}>
                  <td style={styles.td}>{promo.name}</td>
                  <td style={styles.td}>{promo.year}</td>
                  <td style={styles.td}>{promo.students}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: promo.status === 'En cours' ? '#dbeafe' : promo.status === 'Nouvelle' ? '#dcfce7' : '#f1f5f9',
                      color: promo.status === 'En cours' ? '#1e40af' : promo.status === 'Nouvelle' ? '#166534' : '#64748b',
                    }}>
                      {promo.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button 
                        style={{...styles.actionBtn, color: '#3b82f6'}}
                        onClick={() => openAffectModal(promo)}
                      >
                        Affecter
                      </button>
                      <button style={{...styles.actionBtn, color: '#10b981'}}>Modifier</button>
                      <button style={{...styles.actionBtn, color: '#ef4444'}}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Créer Promotion */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Créer une Promotion</h2>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom de la Promotion *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Ex: Promo 2026"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Année *</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                  placeholder="Ex: 2026"
                  min="2020"
                  max="2030"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre d'étudiants initial</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Ex: 0 (sera mis à jour automatiquement)"
                  min="0"
                />
                <small style={styles.helpText}>
                  Le nombre sera automatiquement mis à jour lors de l'affectation des étudiants
                </small>
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
                  Créer la promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Affecter Étudiant */}
      {showAffectModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAffectModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Affecter un Étudiant à une Promotion</h2>
              <button style={styles.closeBtn} onClick={() => setShowAffectModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAffectSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sélectionner un Étudiant *</label>
                <select
                  name="etudiantId"
                  value={affectData.etudiantId}
                  onChange={handleAffectChange}
                  style={styles.select}
                  required
                >
                  <option value="">-- Choisir un étudiant --</option>
                  {etudiants.map((etudiant) => (
                    <option key={etudiant.id} value={etudiant.id}>
                      {etudiant.prenom} {etudiant.nom} ({etudiant.email})
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Sélectionner une Promotion *</label>
                <select
                  name="promotionId"
                  value={affectData.promotionId}
                  onChange={handleAffectChange}
                  style={styles.select}
                  required
                >
                  <option value="">-- Choisir une promotion --</option>
                  {promotions.map((promotion) => (
                    <option key={promotion.id} value={promotion.id}>
                      {promotion.name} ({promotion.year}) - {promotion.students} étudiants
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formActions}>
                <button 
                  type="button" 
                  style={styles.cancelBtn}
                  onClick={() => setShowAffectModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Affecter l'étudiant
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
  affectBtn: {
    background: '#10b981',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    cursor: 'pointer',
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
    padding: '15px 25px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#475569',
    fontSize: '14px',
  },
  tr: {
    borderTop: '1px solid #e2e8f0',
  },
  td: {
    padding: '15px 25px',
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

export default Promotions