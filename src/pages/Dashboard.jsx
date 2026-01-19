import { Plus, ChevronRight, Users, GraduationCap, Megaphone } from 'lucide-react'

const Dashboard = () => {
  const students = [
    { name: 'Martin', email: 'martin@email.com' },
    { name: 'Lefevre', email: 'lefevre@email.com' },
  ]

  const teachers = [
    { name: 'Dubois', email: 'dubois@email.com' },
    { name: 'Bernard', email: 'bernard@email.com' },
  ]

  const promotions = [
    { name: 'Promo 2022' },
    { name: 'Promo 2023' },
  ]

  return (
    <div>
      {/* CARDS SECTION */}
      <div style={styles.cardsRow}>
        {/* Créer un compte */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Créer un compte utilisateur</h3>
          <div style={styles.userTypes}>
            {['Directeur', 'Étudiant', 'Formateur'].map((type) => (
              <div key={type} style={styles.userTypeBtn}>
                <div style={styles.userTypeLeft}>
                  <div style={styles.userIcon}>
                    <Users size={18} color="white" />
                  </div>
                  <span style={styles.typeName}>{type}</span>
                </div>
                <ChevronRight size={20} color="#64748b" />
              </div>
            ))}
          </div>
        </div>

        {/* Créer un espace */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Créer un espace pédagogique</h3>
          <div style={styles.centerContent}>
            <div style={styles.spaceIllustration}>
              <GraduationCap size={50} color="white" />
            </div>
            <button style={styles.primaryBtn}>Créer un espace</button>
          </div>
        </div>

        {/* Gérer les promotions */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Gérer les promotions</h3>
          <div style={styles.centerContent}>
            <div style={styles.promoIllustration}>
              <Megaphone size={50} color="white" />
            </div>
            <button style={styles.secondaryBtn}>Voir les promotions</button>
          </div>
        </div>
      </div>

      {/* TABLES - Sans le bouton "Ajouter Étudiant" au milieu */}
      <div style={styles.tablesGrid}>
        {/* Étudiants */}
        <TableCard 
          title="Liste des Étudiants" 
          data={students}
          buttonText="Ajouter Étudiant"
        />
        
        {/* Formateurs */}
        <TableCard 
          title="Liste des Formateurs" 
          data={teachers}
          buttonText="Ajouter Formateur"
        />
        
        {/* Promotions */}
        <TableCard 
          title="Liste des Promotions" 
          data={promotions}
          buttonText="Ajouter Promotion"
          isPromotion
        />
      </div>
    </div>
  )
}

const TableCard = ({ title, data, buttonText, isPromotion }) => (
  <div style={styles.tableCard}>
    <div style={styles.tableHeader}>
      <h3 style={styles.tableTitle}>{title}</h3>
      <div>
        <button style={styles.addBtn}>
          <Plus size={16} /> {buttonText}
        </button>
      </div>
    </div>
    <div style={styles.tableBody}>
      {data.map((item, i) => (
        <div key={i} style={styles.tableRow}>
          <div>
            <div style={styles.rowName}>{item.name}</div>
            {item.email && <div style={styles.rowEmail}>{item.email}</div>}
          </div>
          <div style={styles.rowActions}>
            {isPromotion ? (
              <>
                <button style={styles.actionBtn}>Affecter</button>
                <button style={{...styles.actionBtn, color: '#10b981'}}>Modifier</button>
                <button style={{...styles.actionBtn, color: '#ef4444'}}>Supprimer</button>
              </>
            ) : (
              <button style={styles.actionBtn}>Modifier</button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const styles = {
  cardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
    marginBottom: '40px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1e293b',
  },
  userTypes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  userTypeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    background: '#f1f5f9',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  userTypeLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userIcon: {
    width: '35px',
    height: '35px',
    background: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeName: {
    fontWeight: '500',
    color: '#1e293b',
    fontSize: '15px',
  },
  centerContent: {
    textAlign: 'center',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  spaceIllustration: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoIllustration: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #f97316, #f59e0b)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  secondaryBtn: {
    background: 'white',
    color: '#3b82f6',
    padding: '12px 30px',
    borderRadius: '8px',
    border: '2px solid #3b82f6',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
  },
  tableCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '20px 20px',
    borderBottom: '2px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  tableTitle: {
    fontSize: '16px',
    fontWeight: '600',
  },
  addBtn: {
    background: '#3b82f6',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    width: '100%',
    justifyContent: 'center',
  },
  tableBody: {
    padding: '15px',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 10px',
    borderBottom: '1px solid #f1f5f9',
  },
  rowName: {
    fontWeight: '500',
    marginBottom: '4px',
    fontSize: '14px',
  },
  rowEmail: {
    fontSize: '12px',
    color: '#64748b',
  },
  rowActions: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '5px 10px',
    background: 'white',
    color: '#3b82f6',
    border: '1px solid #e2e8f0',
    borderRadius: '5px',
    fontSize: '11px',
  },
}

export default Dashboard