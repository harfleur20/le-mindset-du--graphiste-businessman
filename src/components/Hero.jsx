import React from 'react'

const Hero = () => {
  return (
    <section className="hero" id="accueil">
      <div className="container">
        <div className="hero-content fade-in">
          <div className="hero-text">
            <h2 className="hero-title">Ils vous diront toujours que c'est  <span className="highlight"> Impossible</span> ! </h2>
            <p className="hero-subtitle">Jusqu'à ce qu'ils apprennent que vous utilisez les armes qu'ils n'ont pas, concevez les stratégies qu'ils ignorent et menez les combats qu'ils ont fuits.</p>
            <div className="hero-cta">
              <a href="#achat" className="btn btn-primary">Obtenir le livre maintenant</a>
              <a href="#livre" className="btn btn-secondary">En savoir plus</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="book-cover">
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero