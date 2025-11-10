import React from 'react'
import './Purchase.css'

const Purchase = () => {
  const purchaseOptions = [
    {
      id: 1,
      title: "Offre Premium Complète",
      subtitle: "1 Livre + Packaging Exclusif",
      // Pas d'image pour la carte premium
      features: [
        "Livre physique format premium",
        "MasterClass avec les auteurs",
        "Coaching personnalisé inclus",
        "Accès communauté privée",
        "Support prioritaire",
        "Ressources exclusives"
      ],
      price: "25 000 FCFA",
      // oldPrice: "299€",
      // discount: "-30%",
      cta: {
        text: "Obtenir l'offre Premium",
        url: "#", // Remplacez par votre lien
        type: "premium"
      }
    },
    
    {
      id: 2,
      title: "Version Physique",
      subtitle: "Pour le Cameroun, L'Europe , Canada et les USA",
      image: "/amazon.png",
      features: [
        "Livraison locale & internationale",
        "Format premium",
        "Packaging soigné",
        "Accès à la page d'or"
      ],
      cta: [
        {
        text: "Achetez via WhatsApp",
        url: "https://wa.me/message/FCSKO4BE4CKQK1",
        type: "whatsapp",
        icon: "fab fa-whatsapp"
      },
      {
          text: "Acheter sur Amazon",
          url: "https://amazon.com",
          type: "secondary"
        }
      ]
    },
    {
      id: 3,
      title: "Version Ebook",
      subtitle: "Format numérique",
      image: "/chariow.png",
      features: [
        "Téléchargement immédiat",
        "Compatible tous appareils",
        "Fichiers Annexes (sur Chariow)",
        "Accès à la page d'or"
      ],
      cta: [
        {
          text: "Acheter sur Chariow",
          url: "https://we.academiecreatif.com/le-mindset-du-graphiste-businessman",
          type: "primary"
        },
        // {
        //   text: "Acheter sur Amazon",
        //   url: "https://amazon.com",
        //   type: "secondary"
        // }
      ]
    }
  ]

  return (
    <section className="purchase-section" id="achat">
      <div className="container">
        <h2 className="section-title">Obtenez Votre Exemplaire</h2>
        <div className="purchase-options">
          {purchaseOptions.map((option) => (
            <div key={option.id} className={`purchase-option fade-in ${option.id === 1 ? 'premium-option' : ''}`}>
              
              {/* Badge de réduction pour l'offre premium */}
              {option.id === 1 && (
                <div className="premium-badge">
                  <span className="discount-tag">{option.discount}</span>
                  <span className="offer-text">OFFRE EXCLUSIVE</span>
                </div>
              )}

              <div className="option-header">
                <h3>{option.title}</h3>
                <p className="option-subtitle">{option.subtitle}</p>
                
                {/* Prix pour l'offre premium */}
                {option.id === 1 && (
                  <div className="premium-pricing">
                    <span className="old-price">{option.oldPrice}</span>
                    <span className="current-price">{option.price}</span>
                  </div>
                )}
              </div>

              {/* Image uniquement pour les cartes non-premium */}
              {option.id !== 1 && option.image && (
                <div className="option-image">
                  <img src={option.image} alt={option.title} />
                  <p className='rouge'>Whatsapp uniquement pour les <br />livraisons au Cameroun</p>
                </div>
              )}

              <div className="option-features">
                <ul>
                  {option.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="option-cta">
                {Array.isArray(option.cta) ? (
                  option.cta.map((cta, index) => (
                    <a
                      key={index}
                      href={cta.url}
                      className={`btn btn-${cta.type}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cta.text}
                    </a>
                  ))
                ) : (
                  <a
                    href={option.cta.url}
                    className={`btn ${option.cta.type === 'premium' ? 'btn-premium' : option.cta.icon ? 'btn-whatsapp' : `btn-${option.cta.type}`}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {option.cta.icon && <i className={option.cta.icon}></i>}
                    {option.cta.text}
                  </a>
                )}
              </div>

              {/* Note d'urgence pour l'offre premium */}
              {option.id === 1 && (
                <div className="urgency-note">
                  <i className="fas fa-clock"></i>
                  Offre limitée dans le temps
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Purchase