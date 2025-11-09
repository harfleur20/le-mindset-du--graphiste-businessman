import React, { useState } from 'react'

const GoldenPage = () => {
  const [spotsLeft] = useState(120)

 

  return (
    <section className="golden-page-section">
      <div className="container">
        <div className="golden-page-content fade-in">
          <div className="golden-page-icon">
            <i className="fas fa-crown"></i>
          </div>
          <h2>Page d'Or Exclusif</h2>
          <p>Les 200 premiers acheteurs du livre auront accès à une page d'or exclusive avec :</p>
          <div className="golden-features">
            <div className="golden-feature">
              <i className="fas fa-brain"></i>
              <h4>Série de MasterClass Premium Privée</h4>
              <p>Une série de vidéos pour approfondir les concepts du livre</p>
            </div>
            <div className="golden-feature">
              <i className="fas fa-users"></i>
              <h4>Groupe Privé</h4>
              <p>Accès à un groupe d'entrepreneurs graphistes pour échanger et réseauter</p>
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