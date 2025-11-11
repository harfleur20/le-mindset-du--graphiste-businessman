import React, { useState } from 'react'
import './Faq.css'


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqData = [
    {
      question: "Quelle est la différence entre la version physique et l'ebook ?",
      answer: "La version physique est un livre imprimé de haute qualité avec packaging soigné, livré à votre domicile. L'ebook est un format numérique que vous recevez instantanément par email, compatible avec tous vos appareils (smartphone, tablette, ordinateur). Les deux versions incluent l'accès à la page d'or avec du contenu exclusif."
    },
    {
      question: "Combien de temps faut-il pour recevoir le livre physique ?",
      answer: "Pour le Cameroun : 2 à 5 jours ouvrables. Pour l'Europe : 7 à 14 jours ouvrables. Pour l'Amérique du Nord : 10 à 15 jours ouvrables. Vous recevrez un numéro de suivi pour suivre votre colis dès l'expédition."
    },
    {
      question: "Qu'est-ce que la MasterClass incluse dans l'offre Premium ?",
      answer: "La MasterClass est une formation exclusive de 4 heures avec les auteurs, comprenant : des stratégies avancées non couvertes dans le livre, des études de cas réels, des sessions de questions-réponses en direct, un accès à vie aux mises à jour, et un certificat de complétion."
    },
    {
      question: "Puis-je obtenir un remboursement si le livre ne me convient pas ?",
      answer: "Non, nous offrons pas de garantie de remboursement pour toutes les versions. Prenez le temps de bien lire le descriptif avant de passer à l'achat, contactez-nous si vous avez des intérogations sur le livre avant votre achat."
    },
    {
      question: "Comment accéder à la page d'or mentionnée ?",
      answer: "Après votre achat de package premium, vous recevrez un lien contenant des ressources exclusives, mises à jour, et bonus. Assurez-vous de vérifier votre email (y compris les spams) pour trouver le lien d'accès et ainsi votre nom inscrit sur la siteweb comme contribution officiel."
    },
    {
      question: "Le coaching personnalisé est-il limité dans le temps ?",
      answer: "Le coaching inclus dans l'offre Premium comprend 3 sessions de 45 minutes réparties sur 3 mois. Cela vous permet d'avoir un suivi personnalisé pour appliquer concrètement les stratégies du livre à votre situation spécifique."
    },
    {
      question: "Les versions numériques sont-elles compatibles avec Kindle ?",
      answer: "Oui, l'ebook est disponible en format PDF et EPUB, compatible avec Kindle, iPad, Android, et tous les lecteurs numériques. Vous recevrez les deux formats lors de votre achat."
    },
    {
      question: "Puis-je acheter le livre pour offrir ?",
      answer: "Absolument ! Vous pouvez commander plusieurs exemplaires. Pour les cadeaux, nous proposons même un service d'emballage cadeau personnalisé avec un message de votre part. Contactez-nous directement pour les commandes multiples."
    },
    {
      question: "Y a-t-il du contenu supplémentaire prévu après l'achat ?",
      answer: "Oui, tous les acheteurs reçoivent gratuitement les mises à jour et nouveaux contenus. Nous ajoutons régulièrement de nouvelles ressources dans la page d'or basées sur les retours des lecteurs et l'évolution du marché."
    },
    {
      question: "Comment contacter le support en cas de problème ?",
      answer: "Notre équipe support est disponible par email à support@academiecreatif.com et par WhatsApp au +237 6 96 75 30 65. Nous répondons sous 24 heures maximum, 7j/7."
    }
  ]

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">Questions Fréquentes</h2>
        <p className="faq-subtitle">
          Trouvez rapidement des réponses à vos interrogations
        </p>
        
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Vous avez d'autres questions à poser ?</p>
          <a 
            href="https://wa.me/message/FCSKO4BE4CKQK1" 
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
            Contactez nous WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default Faq