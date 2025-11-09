import React from 'react'
import livre from '/images/livre-2.png'

const Book = () => {
  return (
    <section className="book-section" id="livre">
      <div className="container">
        <h2 className="section-title">Le Livre</h2>
        <div className="book-content fade-in">
          <div className="book-details">
            <h3>Le Mindset du Graphiste Businessman</h3>
            <p className="book-description">Ce livre est un carnet de route pour aider les graphistes, freelancers et les plus débutants à passer du statut de "graphiste qui survit" à celui d'entrepreneur créatif qui prospère. Il s'appuie sur le parcours de l'auteur, de ses débuts difficiles à un revenu stable et confortable de plus de 500 000 Francs CFA par mois.</p>
            <p className="book-description">L'ouvrage n'est pas une théorie, mais une boîte à outils abordant des sujets cruciaux comme la gestion des clients malhonnêtes, la fixation des prix basés sur la valeur, et la construction d'un système pour automatiser son activité. Il insiste sur l'importance de développer un état d'esprit de "businessman" pour transformer la passion en un business solide.</p>
            <div className="book-features">
              <h4>Ce que vous apprendrez :</h4>
              <ul>
                <li><i className="fas fa-check"></i> Gérer les clients difficiles et malhonnêtes</li>
                <li><i className="fas fa-check"></i> Fixer vos prix basés sur la valeur créée</li>
                <li><i className="fas fa-check"></i> Construire un système pour automatiser votre activité</li>
                <li><i className="fas fa-check"></i> Développer un état d'esprit de businessman</li>
                <li><i className="fas fa-check"></i> Atteindre un revenu stable de 500 000 FCFA/mois</li>
              </ul>
            </div>
          </div>
          <div className="book-cover-large">
            <img 
              src={livre}
              alt="Couverture du livre Le Mindset du Graphiste Businessman"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/350x500/4a00e0/ffffff?text=Couverture+Livre'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Book