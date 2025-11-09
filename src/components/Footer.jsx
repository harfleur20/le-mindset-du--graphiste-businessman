import React from 'react'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Le Mindset du Graphiste Businessman</h3>
            <p>Transformez votre passion en entreprise prospère avec les stratégies éprouvées de Kenne Tsasse Francis.</p>
          </div>
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="#accueil" onClick={() => scrollToSection('accueil')}>Accueil</a></li>
              <li><a href="#auteur" onClick={() => scrollToSection('auteur')}>L'Auteur</a></li>
              <li><a href="#livre" onClick={() => scrollToSection('livre')}>Le Livre</a></li>
              <li><a href="#achat" onClick={() => scrollToSection('achat')}>Acheter</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@example.com">contact@example.com</a></li>
              <li><a href="https://wa.me/237XXXXXXXXX">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Le Mindset du Graphiste Businessman. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer