// Preview.jsx
import React from 'react';
import HTMLFlipBook from "react-pageflip";
import './Preview.css'; // Assurez-vous d'avoir les styles appropriés

function Preview() {
  // Tableau des URLs de vos images (10 pages sans couverture)
  const bookPages = [
    '/images/preview/page1.jpg',      // Page 1
    '/images/preview/page2.jpg',      // Page 2
    '/images/preview/page3.jpg',      // Page 3
    '/images/preview/page4.jpg',      // Page 4
    '/images/preview/page5.jpg',      // Page 5
    '/images/preview/page6.jpg',      // Page 6
    '/images/preview/page7.jpg',      // Page 7
    '/images/preview/page8.jpg',      // Page 8
    '/images/preview/page9.jpg',      // Page 9
    '/images/preview/page10.jpg',     // Page 10
  ];

  return (
    <div className="preview-container" id='preview'>
      {/* Titre et sous-titre */}
      <div className="preview-header">
        <h1 className="preview-title">Feuilletez le livre</h1>
        <p className="preview-subtitle">
          Découvrez un aperçu du contenu de ce livre
        </p>
        <div className="gold-divider"></div>
      </div>

      <HTMLFlipBook 
        width={400} 
        height={550}
        maxShadowOpacity={0.3}
        drawShadow={true}
        showCover={false}
        startPage={0}
        size='fixed'
        className="masterclass-book"
      >
        {/* Pages du livre - 10 pages avec message incitatif sur la dernière */}
        {bookPages.map((imageUrl, index) => (
          <div className="page" key={`page-${index}`}>
            <div className="page-content">
              <div className={`page-container ${index === bookPages.length - 1 ? 'last-page-container' : ''}`}>
                
                {/* Numéro de page (sauf pour la dernière) */}
                {index < bookPages.length - 1 && (
                  <div className="page-number">
                    Page {index + 1}
                  </div>
                )}

                {/* Image de la page */}
                <img 
                  src={imageUrl} 
                  alt={`Page ${index + 1} de la preview`}
                  className="page-image"
                  onError={(e) => {
                    console.error(`Erreur de chargement: ${imageUrl}`);
                    e.target.style.display = 'none';
                  }}
                />

                {/* Message spécial pour la dernière page (page 10) */}
                {index === bookPages.length - 1 && (
                  <div className="upsell-overlay">
                    <div className="upsell-content">
                      <h3>La suite vous attend !</h3>
                      <div className="gold-divider"></div>
                      <p>Cette preview vous a plu ?</p>
                      <p>Obtenez la version complète pour découvrir les stratégies avancées et bénéficier de l'accompagnement personnalisé de nos experts.</p>
                      <ul className="benefits-list">
                        <li>✅ Accès à toutes les pages du livre</li>
                        <li>✅ MasterClass exclusive avec les auteurs</li>
                        <li>✅ Coaching personnalisé</li>
                        <li>✅ Support prioritaire</li>
                      </ul>
                      <button className="upsell-button">
                        Obtenir le livre complet + MasterClass
                      </button>
                      <p className="upsell-note">Offre exclusive limitée dans le temps</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default Preview;