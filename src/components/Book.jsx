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
            <p className="book-description">Le Mindset du Graphiste Businessman" est le guide essentiel pour tous les créatifs fatigués de la sous-tarification et des clients difficiles. Ce livre ne vous apprend pas à designer, mais à vendre votre valeur, à négocier vos contrats, et à structurer votre activité comme une véritable entreprise rentable.</p>
            <p className="book-description">Chaque matin, vous vous sentez frustré. Vous avez le talent, l'expérience, mais vous passez plus de temps à courir après les paiements et à justifier vos tarifs qu'à créer. Si la phrase "C'est trop cher" est la seule chose que vous entendez, vous n'avez pas un problème de design, vous avez un problème de Mindset.</p>
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