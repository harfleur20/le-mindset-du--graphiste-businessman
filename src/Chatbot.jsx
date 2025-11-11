import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Bonjour ! Je suis l'assistant de Francis Kenne. Je peux vous aider à choisir la bonne version du livre ou répondre à vos questions !",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([
    "Quelle est la différence entre les versions ?",
    "Combien coûte le livre ?", 
    "Comment commander ?",
    "Qu'est-ce que la Page d'Or ?"
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Base de connaissances étendue avec synonymes
  const detectIntent = (input) => {
    const patterns = {
      // Prix et achats
      prix: ['prix', 'coût', 'cher', 'combien', 'tarif', 'coute', 'acheter', 'payer', 'montant', 'argent'],
      versions: ['différence', 'version', 'quelle', 'choisir', 'meilleur', 'option', 'format', 'ebook', 'physique', 'digital', 'numérique'],
      commande: ['commander', 'acheter', 'obtenir', 'acquérir', 'payer', 'comment', 'procédure', 'processus', 'obtention'],
      
      // Contenu et livre
      contenu: ['contenu', 'apprendre', 'sujets', 'chapitres', 'dedans', 'thèmes', 'matière', 'programme', 'curriculum'],
      avantages: ['avantage', 'bénéfice', 'avantage', 'plus', 'intérêt', 'utilité', 'pourquoi'],
      objectifs: ['objectif', 'but', 'résultat', 'atteindre', 'accomplir', 'réaliser'],
      
      // Livraison et support
      livraison: ['livraison', 'délai', 'recevoir', 'shipping', 'delivery', 'expédition', 'colis', 'emballage', 'packaging'],
      support: ['support', 'problème', 'aide', 'contact', 'urgence', 'assistance', 'service client', 'sav'],
      
      // Auteur et entreprise
      auteur: ['auteur', 'francis', 'kenne', 'qui est', 'parcours', 'fondateur', 'créateur', 'écrivain'],
      entreprise: ['entreprise', 'société', 'académie', 'créatifs', 'five design', 'groupe', 'structure'],
      
      // Offres spéciales
      pageOr: ['page d\'or', 'page dor', 'or', 'exclusif', 'avantage', 'privilège', 'vip', 'premium'],
      masterclass: ['masterclass', 'formation', 'cours', 'vidéo', 'training', 'coaching', 'mentorat', 'accompagnement'],
      reduction: ['réduction', 'promotion', 'code', 'remise', 'rabais', 'solde', 'offre', 'RELANCEIO'],
      
      // Informations pratiques
      garantie: ['garantie', 'remboursement', 'satisfait', 'argent', 'politique', 'condition'],
      faq: ['faq', 'question', 'fréquente', 'réponse', 'doute', 'interrogation'],
      
      // Salutations
      salut: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'hi', 'bjr', 'bonsoir']
    };

    const inputLower = input.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => inputLower.includes(keyword))) {
        return intent;
      }
    }
    
    return 'inconnu';
  };

  // Réponse pour les questions inconnues
  const getUnknownResponse = () => {
    return `Je rencontre quelques difficultés techniques. Pour une réponse immédiate, vous pouvez :

• Consulter la FAQ sur notre site
• Nous contacter directement au +237 680 95 03 19
• Réessayer dans quelques instants`;
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const intent = detectIntent(input);
    
    const responses = {
      prix: `<div class="message-title">Détail des prix</div>

<div class="package">
  <div class="package-title">Ebook Digital</div>
  <div class="package-price">6.500F CFA</div>
  <div class="package-note">5.850F avec code RELANCEIO</div>
  <div class="package-item">Format PDF instantané</div>
  <div class="package-item">Compatible mobile & desktop</div>
</div>

<div class="package">
  <div class="package-title">Physique Premium</div>
  <div class="package-price">10.000F CFA</div>
  <div class="package-note">+ 1.000F de frais de livraison (Cameroun seulement)</div>
  <div class="package-item">Livre qualité premium</div>
  <div class="package-item">Packaging soigné</div>
</div>

<div class="package">
  <div class="package-title">Offre Exclusive</div>
  <div class="package-price">30.000F CFA</div>
  <div class="package-note">Coaching + Masterclass inclus</div>
  <div class="package-item">Communauté privée</div>
  <div class="package-item">Support prioritaire</div>
</div>

<div class="note">Investissement rentabilisé en 1-2 projets seulement</div>`,

      versions: `<div class="message-title">Comparaison des versions</div>

<div class="package">
  <div class="package-title">Ebook Digital</div>
  <div class="package-item">Format numérique instantané</div>
  <div class="package-item">Compatible tous appareils</div>
  <div class="package-item">Fichiers annexes inclus</div>
  <div class="package-item">Accès immédiat 24h/24</div>
</div>

<div class="package-spacer"></div>

<div class="package">
  <div class="package-title">Physique Premium</div>
  <div class="package-item">Livre premium + packaging luxe</div>
  <div class="package-item">Livraison au Cameroun</div>
  <div class="package-item">Édition collector numérotée</div>
  <div class="package-item">Matériau haute qualité</div>
</div>

<div class="package-spacer"></div>

<div class="package">
  <div class="package-title">Offre Exclusive</div>
  <div class="package-item">Livre physique premium</div>
  <div class="package-item">Masterclass vidéo exclusive</div>
  <div class="package-item">Coaching personnalisé</div>
  <div class="package-item">Communauté privée WhatsApp</div>
  <div class="package-item">Ressources bonus</div>
</div>`,

      commande: `<div class="message-title">Comment commander</div>

<div class="package">
  <div class="package-title">Par WhatsApp</div>
  <div class="package-item">Pour toutes les versions</div>
  <div class="package-item">Commande simple et rapide</div>
  <div class="package-item">Paiement mobile money</div>
  <div class="package-action">
    <a href="https://wa.me/message/FCSKO4BE4CKQK1" target="_blank" class="action-button">
      Commander sur WhatsApp
    </a>
  </div>
</div>

<div class="package">
  <div class="package-title">⚡ Ebook Instantané</div>
  <div class="package-item">Téléchargement immédiat</div>
  <div class="package-item">Paiement sécurisé en ligne</div>
  <div class="package-action">
    <a href="https://we.academiecreatif.com/le-mindset-du-graphiste-businessman/checkout" target="_blank" class="action-button">
      Acheter l'ebook
    </a>
  </div>
</div>

<div class="note">Livraison physique sous 2-5 jours au Cameroun</div>`,

      contenu: `<div class="message-title">Ce que vous apprendrez</div>

<div class="feature-section">
  <div class="section-title">🎯 Stratégies Business</div>
  <div class="feature-item">Fixer vos prix basés sur la valeur créée</div>
  <div class="feature-item">Techniques de vente efficaces en 2025</div>
  <div class="feature-item">Acquisition de clients premium</div>
</div>

<div class="feature-section">
  <div class="section-title">⚡ Productivité</div>
  <div class="feature-item">Automatisation de votre activité</div>
  <div class="feature-item">Gestion du temps et des projets</div>
  <div class="feature-item">Workflow optimisé</div>
</div>

<div class="feature-section">
  <div class="section-title">🚫 Pièges à éviter</div>
  <div class="feature-item">Éviter la sous-tarification</div>
  <div class="feature-item">Gérer les clients difficiles</div>
  <div class="feature-item">Échapper au burn-out</div>
</div>

<div class="note">Objectif : Atteindre 500.000 FCFA/mois avec des méthodes concrètes</div>`,

      avantages: `<div class="message-title">Avantages du livre</div>

<div class="feature-item">Transformation de passion en business rentable</div>
<div class="feature-item">Augmentation significative de vos revenus</div>
<div class="feature-item">Méthodes adaptées au marché africain</div>
<div class="feature-item">Techniques actuelles pour 2025 et au-delà</div>
<div class="feature-item">Communauté d'entraide de graphistes</div>
<div class="feature-item">Outils pratiques et templates inclus</div>

<div class="note">Basé sur l'expérience réelle de Francis Kenne</div>`,

      livraison: `<div class="message-title">Informations livraison</div>

<div class="package">
  <div class="package-title">🚚 Livraison Physique</div>
  <div class="package-item">Cameroun : 2-5 jours ouvrés</div>
  <div class="package-item">Frais de livraison : 1.000F CFA</div>
  <div class="package-item">Colis soigneusement emballé</div>
  <div class="package-item">Numéro de suivi fourni</div>
</div>

<div class="package">
  <div class="package-title">⚡ Livraison Digital</div>
  <div class="package-item">Ebook : Accès immédiat</div>
  <div class="package-item">Lien de téléchargement instantané</div>
  <div class="package-item">Support inclus</div>
</div>

<div class="note">Nous livrons uniquement au Cameroun pour les versions physiques</div>`,

      auteur: `<div class="message-title">Francis Kenne</div>

<div class="feature-section">
  <div class="section-title">Parcours</div>
  <div class="feature-item">Graphiste & entrepreneur camerounais</div>
  <div class="feature-item">8+ ans d'expérience en design</div>
  <div class="feature-item">Fondateur de Five Design Group</div>
  <div class="feature-item">Expert du marché africain</div>
</div>

<div class="feature-section">
  <div class="section-title">Réalisations</div>
  <div class="feature-item">A aidé 100+ créatifs à développer leur business</div>
  <div class="feature-item">Atteint 500.000 FCFA/mois en freelance</div>
  <div class="feature-item">Formateur et mentor reconnu</div>
</div>

<div class="note">"Parti de zéro, j'ai développé des méthodes qui marchent vraiment"</div>`,

      support: `<div class="message-title">Support client</div>

<div class="package">
  <div class="package-title">📞 Contact Direct</div>
  <div class="feature-item">WhatsApp : +237 680 95 03 19</div>
  <div class="feature-item">Email : contact@academiecreatif.com</div>
  <div class="feature-item">Réponse sous 24h maximum</div>
</div>

<div class="package">
  <div class="package-title">⭐ Support Premium</div>
  <div class="feature-item">Support prioritaire pour les acheteurs Exclusive</div>
  <div class="feature-item">Accès direct à l'équipe</div>
  <div class="feature-item">Résolution accélérée</div>
</div>

<div class="note">Nous sommes là pour vous accompagner à chaque étape</div>`,

      pageOr: `<div class="message-title">La Page d'Or</div>

<div class="package">
  <div class="package-title">🌟 Avantages Exclusifs</div>
  <div class="feature-item">Ressources supplémentaires gratuites</div>
  <div class="feature-item">Templates de contrats professionnels</div>
  <div class="feature-item">Grilles de tarification détaillées</div>
  <div class="feature-item">Accès communauté privée VIP</div>
  <div class="feature-item">Contenu inédit et mises à jour</div>
</div>

<div class="package">
  <div class="package-title">⏰ Offre Limitée</div>
  <div class="feature-item">Réservée aux 120 premiers acheteurs</div>
  <div class="feature-item">Accès à vie inclus</div>
  <div class="feature-item">Valeur estimée à 30.000F CFA</div>
</div>

<div class="note">Offre exceptionnelle - Plus que quelques places disponibles</div>`,

      masterclass: `<div class="message-title">Masterclass Exclusive</div>

<div class="package">
  <div class="package-title">💎 Contenu Premium</div>
  <div class="feature-item">Techniques avancées de négociation</div>
  <div class="feature-item">Automatisation complète du workflow</div>
  <div class="feature-item">Stratégies d'acquisition clients B2B</div>
  <div class="feature-item">Gestion du temps et productivité maximale</div>
  <div class="feature-item">Études de cas réels et concrets</div>
</div>

<div class="package">
  <div class="package-title">💎 Inclus dans l'Offre Exclusive</div>
  <div class="feature-item">6 modules vidéo complets</div>
  <div class="feature-item">Exercices pratiques</div>
  <div class="feature-item">Certificat de completion</div>
  <div class="feature-item">Accès à vie</div>
</div>

<div class="note">Valeur réelle : 50.000 FCFA - OFFERTE dans le pack Exclusive</div>`,

      reduction: `<div class="message-title">Code de Réduction</div>

<div class="package">
  <div class="package-title">🎁 RELANCEIO</div>
  <div class="feature-item">-10% sur la version Ebook</div>
  <div class="feature-item">Prix normal : 6.500F CFA</div>
  <div class="feature-item">Prix réduit : 5.850F CFA</div>
  <div class="feature-item">Économie : 650F CFA</div>
</div>

<div class="package">
  <div class="package-title">💡 Comment utiliser</div>
  <div class="feature-item">Disponible sur Chariow uniquement</div>
  <div class="feature-item">Valable pour la version Ebook</div>
  <div class="feature-item">Offre limitée dans le temps</div>
</div>

<div class="note">Profitez de cette réduction exclusive dès maintenant</div>`,

      garantie: `<div class="message-title">Garantie Satisfait ou Remboursé</div>

<div class="package">
  <div class="package-title">🛡️ Notre Engagement</div>
  <div class="feature-item">30 jours de garantie</div>
  <div class="feature-item">Remboursement intégral</div>
  <div class="feature-item">Sans condition cachée</div>
  <div class="feature-item">Processus simple et rapide</div>
</div>

<div class="package">
  <div class="package-title">📋 Conditions</div>
  <div class="feature-item">Valable pour toutes les versions</div>
  <div class="feature-item">Remboursement sous 7 jours</div>
  <div class="feature-item">Contact : contact@academiecreatif.com</div>
</div>

<div class="note">Nous croyons en la qualité de notre formation</div>`,

      entreprise: `<div class="message-title">Académie des Créatifs</div>

<div class="feature-section">
  <div class="section-title">Notre Mission</div>
  <div class="feature-item">Former les graphistes africains au business</div>
  <div class="feature-item">Développer l'entrepreneuriat créatif</div>
  <div class="feature-item">Créer une communauté d'excellence</div>
</div>

<div class="feature-section">
  <div class="section-title">Impact</div>
  <div class="feature-item">100+ créatifs accompagnés</div>
  <div class="feature-item">Communauté active et bienveillante</div>
  <div class="feature-item">Contenu adapté au marché local</div>
</div>

<div class="note">Membre de Five Design Group SARL</div>`,

      salut: `👋 Bonjour ! Je suis l'assistant de Francis Kenne.

Je peux vous aider sur :
• Les différentes versions du livre et leurs prix
• Comment commander simplement
• Le contenu détaillé et les bénéfices
• Les offres spéciales et réductions
• Le support et la livraison

Quelle est votre question ?`,

      inconnu: getUnknownResponse()
    };

    return responses[intent] || responses.inconnu;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSuggestions([]);

    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage = { 
        text: botResponse,
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  const renderMessage = (message) => {
    if (message.sender === 'bot' && message.text.includes('<div')) {
      return <div dangerouslySetInnerHTML={{ __html: message.text }} />;
    } else {
      return message.text.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ));
    }
  };

  return (
    <>
      <div 
        className={`chat-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="bubble-icon">...</div>
        <div className="bubble-pulse"></div>
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-info">
              <h4>Assistant Francis</h4>
              <span>En ligne • Reponse instantané</span>
            </div>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender} ${message.sender === 'bot' ? 'fade-in' : 'slide-in'}`}
              >
                {renderMessage(message)}
              </div>
            ))}
            
            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="suggestion-btn"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              className="chat-input"
            />
            <button 
              onClick={sendMessage}
              className="send-btn"
              disabled={!input.trim()}
            >
              <span>➤</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;