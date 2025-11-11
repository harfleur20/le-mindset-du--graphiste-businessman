import React from 'react'
import './Purchase.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import iconLivre from '/rf.png'

const Purchase = () => {
  const purchaseOptions = [
    {
      id: 1,
      title: "Offre Premium Complète",
      subtitle: "1 Livre + Packaging Exclusif",
      features: [
        "Livre physique format premium",
        "Masterclass exclusive",
        "Coaching personnalisé inclus",
        "Accès communauté privée",
        "Support client prioritaire",
        "Ressources exclusives",
        "Livraison gratuite (CMR ONLY)"
      ],
      price: "30 000 FCFA",
      cta: {
        text: "Obtenir l'offre Premium",
        url: "https://we.academiecreatif.com/offre-package-or/checkout",
        type: "premium"
      }
    },
    {
      id: 2,
      title: "Version Physique",
      subtitle: "Pour le Cameroun, L'Europe , Canada et les USA",
      image: "/academie.png",
      features: [
        "Livraison locale & internationale",
        "Format papier de qualité",
        "Accès aux fichiers annexes",
        "Masterclass générale",
        "Packaging soigné",
        "Livraison aux frais de l'acheteur"
      ],
      cta: [
        {
          text: "Commandez WhatsApp",
          url: "https://wa.me/message/FCSKO4BE4CKQK1",
          type: "whatsapp",
          icon: "fab fa-whatsapp" // ✅ Icône correcte
        },
        // {
        //   text: "Acheter sur Amazon",
        //   url: "https://amazon.com",
        //   type: "secondary"
        // }
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
          text: "Acheter maintenant",
          url: "https://we.academiecreatif.com/le-mindset-du-graphiste-businessman/checkout",
          type: "primary"
        }
      ]
    }
  ]

  return (
    <section className="purchase-section" id="achat">
      <div className="container">
        <img src={iconLivre} alt="" className='petit-livre'/>
        <h2 className="section-title">Obtenez Votre Exemplaire</h2>
        <div className="purchase-options">
          {purchaseOptions.map((option) => (
            <div key={option.id} className={`purchase-option fade-in ${option.id === 1 ? 'premium-option' : ''}`}>
              
              {/* Header */}
              <div className="option-header">
                <h3>{option.title}</h3>
                <p className="option-subtitle">{option.subtitle}</p>
                
                {option.id === 1 && option.price && (
                  <div className="premium-pricing">
                    <span className="current-price">{option.price}</span>
                  </div>
                )}
              </div>

              {/* Image */}
              {option.id !== 1 && option.image && (
                <div className="option-image">
                  <img src={option.image} alt={option.title} />
                  {/* <p className='rouge'>Whatsapp uniquement pour les <br />livraisons au Cameroun</p> */}
                </div>
              )}

              {/* Features */}
              <div className="option-features">
                <ul>
                  {option.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA - CORRIGÉ */}
              <div className="option-cta">
                {Array.isArray(option.cta) ? (
                  // Pour les tableaux de CTA (options 2 et 3)
                  option.cta.map((cta, index) => (
                    <a
                      key={index}
                      href={cta.url}
                      className={`btn ${cta.icon ? 'btn-whatsapp' : `btn-${cta.type}`}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cta.icon && <i className={cta.icon}></i>}
                      {cta.text}
                    </a>
                  ))
                ) : (
                  // Pour les CTA simples (option 1)
                  <a
                    href={option.cta.url}
                    className={`btn btn-${option.cta.type}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {option.cta.text}
                  </a>
                )}
              </div>

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