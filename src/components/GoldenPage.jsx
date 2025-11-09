import React, { useState } from 'react'

const GoldenPage = () => {
  const [spotsLeft] = useState(120)

 

  return (
    <section className="golden-page-section">
      <div className="container">
        <div className="golden-page-content fade-in">
          <div className="golden-page-icon">
            <i class="fas fa-gift"></i>
          </div>
          <h2>Offre Exclusive</h2>
          <p>Les 200 premiers acheteurs du livre auront accès à notre page d'or en plus des offres exclusives comme :</p>
          <div className="golden-features">
            <div className="golden-feature">
              <i className="fas fa-brain"></i>
              <h4>Série de MasterClass Premium Privée</h4>
              <p>Coaching personnalisé avec des experts pour approfondir les concepts du livre</p>
            </div>
            <div className="golden-feature">
              <i className="fas fa-users"></i>
              <h4>Groupe Privé</h4>
              <p>Accès à un groupe d'entrepreneurs, graphistes & freelancers pour échanger et réseauter</p>
            </div>
            <div className="golden-feature">
              <i className="fas fa-tools"></i>
              <h4>Ressources Supplémentaires</h4>
              <p>Modèles de contrats, grilles de tarification et autres outils pratiques</p>
            </div>
          </div>
          <p className="golden-warning">Il ne reste que <span id="golden-spots">{spotsLeft}</span> places disponibles!</p>
        </div>
      </div>
    </section>
  )
}

export default GoldenPage