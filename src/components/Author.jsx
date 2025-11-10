import React from 'react'
import photofrancis from '../assets/photo-francis.webp'
import photofrancis2 from '/photo-francis.png'

const Author = () => {
  return (
    <section className="author-section" id="auteur">
      <div className="container">
        <h2 className="section-title">L'Auteur</h2>
        <div className="author-content fade-in">
          <div className="author-image">
            <img className='pc-nxt'
              src={photofrancis} 
              alt="Kenne Tsasse Francis"
            />
            <img className='mobile-nxt'
              src={photofrancis2} 
              alt="Kenne Tsasse Francis"
            />
          </div>
          <div className="author-info">
            <h3>Kenne Tsasse Francis</h3>
            <p className="author-bio">Graphiste et entrepreneur web camerounais dont le parcours incarne la résilience et la transformation. Parti avec peu de moyens (son premier emploi étant payé en sandwich), il a su tirer parti des difficultés du marché africain pour structurer son activité et adopter une vision stratégique.</p>
            <p className="author-bio">Dans son livre, il partage comment il a bâti un système lui permettant de générer plus de 500 000 FCFA par mois, en adoptant un véritable état d'esprit de businessman. Son objectif : prouver qu'en Afrique, il est possible de vivre de sa passion grâce à la discipline, à l'intelligence et à un bon accompagnement.</p>
            <div className="author-stats">
              <div className="stat">
                <span className="stat-value">500 000+</span>
                <span className="stat-label">FCFA/mois</span>
              </div>
              <div className="stat">
                <span className="stat-value">8+</span>
                <span className="stat-label">Ans d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-value">100+</span>
                <span className="stat-label">Clients satisfaits</span>
              </div>
              <div className="stat">
                <span className="stat-value">CEO</span>
                <span className="stat-label">Five Design group SARL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Author