import React from 'react'

const Purchase = () => {
  const purchaseOptions = [
    {
      id: 1,
      title: "Version Physique",
      subtitle: "Pour l'Europe, USA et Canada",
      image: "/amazon.png",
      features: [
        "Livraison internationale",
        "Format premium",
        "Packaging soigné",
        "Accès à la page d'or"
      ],
      cta: {
        text: "Acheter sur Amazon",
        url: "https://amazon.com",
        type: "primary"
      }
    },
    {
      id: 2,
      title: "Version Physique",
      subtitle: "Pour le Cameroun",
      image: "/academie.png",
      features: [
        "Livraison locale",
        "Format premium",
        "Packaging soigné",
        "Accès à la page d'or"
      ],
      cta: {
        text: "Achetez via WhatsApp",
        url: "https://wa.me/message/FCSKO4BE4CKQK1",
        type: "whatsapp",
        icon: "fab fa-whatsapp"
      }
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
        {
          text: "Acheter sur Amazon",
          url: "https://amazon.com",
          type: "secondary"
        }
      ]
    }
  ]

  return (
    <section className="purchase-section" id="achat">
      <div className="container">
        <h2 className="section-title">Obtenez Votre Exemplaire</h2>
        <div className="purchase-options">
          {purchaseOptions.map((option) => (
            <div key={option.id} className="purchase-option fade-in">
              <div className="option-header">
                <h3>{option.title}</h3>
                <p className="option-subtitle">{option.subtitle}</p>
              </div>
              <div className="option-image">
                <img src={option.image} alt={option.title} />
              </div>
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
                    className={`btn ${option.cta.icon ? 'btn-whatsapp' : `btn-${option.cta.type}`}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {option.cta.icon && <i className={option.cta.icon}></i>}
                    {option.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Purchase