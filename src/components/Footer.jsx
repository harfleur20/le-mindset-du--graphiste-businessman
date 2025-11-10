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
            <p>Transformez votre passion en entreprise prospère avec les stratégies éprouvées de Kenne Tsasse Francis.</p><br />
            <p>ISBN : 9798273028678 </p>
          </div>
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="#accueil" onClick={() => scrollToSection('accueil')}>Accueil</a></li>
              <li><a href="#auteur" onClick={() => scrollToSection('auteur')}>L'Auteur</a></li>
              <li><a href="#livre" onClick={() => scrollToSection('livre')}>Le Livre</a></li>
              <li><a href="#achat" onClick={() => scrollToSection('achat')}>Acheter</a></li>
              <li><a href="" onClick={() => scrollToSection('CGV')}>CGV</a></li>
              <li><a href="" onClick={() => scrollToSection('conditions generales')}>Conditions générales</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@academiecreatif.com">contact@academiecreatif.com</a></li>
              <li><a href="https://wa.me/237XXXXXXXXX">WhatsApp</a></li>
            </ul>
            <p>Tel : (+237) 680 95 03 19 / <br />(+237) 6 96 75 30 65</p>
            <br /><p>Siège : Douala, Cameroun</p>
          </div>
          <div className="footer-section">
            <h4>Note Importante</h4>
            <p>Le Mindset du graphiste businessman écrit par Francis Kenne et publié en indépendant par l'académie des Créatifs de Five Design Group Sarl</p><br />
            <p>Publié en : Juin 2025</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Le Mindset du Graphiste Businessman. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer