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

  const detectIntent = (input) => {
    const patterns = {
      prix: ['prix', 'coût', 'cher', 'combien', 'tarif', 'coute'],
      versions: ['différence', 'version', 'quelle', 'choisir', 'meilleur'],
      commande: ['commander', 'acheter', 'obtenir', 'acquérir', 'payer'],
      contenu: ['contenu', 'apprendre', 'sujets', 'chapitres', 'dedans'],
      livraison: ['livraison', 'délai', 'recevoir', 'shipping', 'delivery'],
      auteur: ['auteur', 'francis', 'kenne', 'qui est', 'parcours'],
      support: ['support', 'problème', 'aide', 'contact', 'urgence'],
      pageOr: ['page d\'or', 'page dor', 'or', 'exclusif', 'avantage'],
      masterclass: ['masterclass', 'formation', 'cours', 'vidéo', 'training'],
      salut: ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'hi']
    };

    for (const [intent, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return intent;
      }
    }
    
    return 'default';
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
</div>

<div class="package">
  <div class="package-title">Physique Premium</div>
  <div class="package-price">10.000F CFA</div>
  <div class="package-note">+ 1000f de frais Livraison (CMR Only)</div>
</div>

<div class="package">
  <div class="package-title">Offre Exclusive</div>
  <div class="package-price">30.000F CFA</div>
  <div class="package-note">Coaching + Masterclass inclus</div>
</div>

<div class="note">Investissement rentabilisé en 1-2 projets</div>`,

      versions: `<div class="message-title">Comparaison des versions</div>

<div class="package">
  <div class="package-title">Ebook Digital</div>
  <div class="package-item">Format numérique instantané</div>
  <div class="package-item">Compatible tous appareils</div>
  <div class="package-item">Fichiers annexes inclus</div>
</div>

<div class="package-spacer"></div>

<div class="package">
  <div class="package-title">Physique Premium</div>
  <div class="package-item">Livre premium + packaging luxe</div>
  <div class="package-item">Livraison internationale</div>
  <div class="package-item">Édition collector</div>
</div>

<div class="package-spacer"></div>

<div class="package">
  <div class="package-title">Offre Ultimate</div>
  <div class="package-item">Tout du physique +</div>
  <div class="package-item">Masterclass exclusive</div>
  <div class="package-item">Coaching personnalisé</div>
  <div class="package-item">Communauté privée</div>
</div>`,

      commande: `<div class="message-title">Comment commander</div>

<div class="package">
  <div class="package-title">WhatsApp</div>
  <div class="package-item">Pour offre premium</div>
  <div class="package-item">+237 680 95 03 19</div>
</div>

<div class="package">
  <div class="package-title">Amazon</div>
  <div class="package-item">Version physique</div>
  <div class="package-item">Livraison internationale</div>
</div>

<div class="package">
  <div class="package-title">Chariow</div>
  <div class="package-item">Ebook</div>
  <div class="package-item">Téléchargement immédiat</div>
</div>

<div class="note">120 premières commandes : accès Page d'Or</div>`,

      contenu: `<div class="message-title">Ce que vous apprendrez</div>

<div class="feature-item">Fixer vos prix basés sur la valeur</div>
<div class="feature-item">Techniques de vente 2025</div>
<div class="feature-item">Acquisition clients en Afrique</div>
<div class="feature-item">Automatisation de votre activité</div>
<div class="feature-item">Éviter les pièges du freelance</div>
<div class="feature-item">Atteindre 500.000 FCFA/mois</div>

<div class="note">Stratégies concrètes testées sur le marché africain</div>`,

      livraison: `<div class="message-title">Informations livraison</div>

<div class="feature-item">Cameroun : 2-5 jours ouvrés</div>
<div class="feature-item">Europe/Canada/USA : 7-14 jours</div>
<div class="feature-item">Ebook : Immédiat après paiement</div>
<div class="feature-item">Suivi : Colis traçable fourni</div>

<div class="note">Packaging soigné pour une expérience mémorable</div>`,

      auteur: `<div class="message-title">Francis Kenne</div>

<div class="feature-item">Graphiste & entrepreneur camerounais</div>
<div class="feature-item">8+ ans d'expérience en design</div>
<div class="feature-item">Fondateur de Five Design Group</div>
<div class="feature-item">Spécialiste du marché africain</div>
<div class="feature-item">A aidé 100+ créatifs</div>

<div class="note">"Parti de zéro, j'ai généré 500.000 FCFA/mois avec ces méthodes"</div>`,

      support: `<div class="message-title">Support client</div>

<div class="feature-item">WhatsApp : +237 680 95 03 19</div>
<div class="feature-item">Email : contact@academiecreatif.com</div>
<div class="feature-item">Réponse : Sous 24h maximum</div>
<div class="feature-item">Support prioritaire pour Premium</div>

<div class="note">Nous sommes là pour vous accompagner</div>`,

      pageOr: `<div class="message-title">La Page d'Or</div>

<div class="package-title">Avantages exclusifs</div>
<div class="feature-item">Ressources supplémentaires</div>
<div class="feature-item">Templates de contrats</div>
<div class="feature-item">Grilles de tarification</div>
<div class="feature-item">Communauté privée</div>
<div class="feature-item">Contenu inédit</div>

<div class="note">Offre limitée - 120 places disponibles</div>`,

      masterclass: `<div class="message-title">Masterclass exclusive</div>

<div class="package-title">Contenu Premium inclus</div>
<div class="feature-item">Techniques avancées de négociation</div>
<div class="feature-item">Automatisation complète du workflow</div>
<div class="feature-item">Stratégies d'acquisition B2B</div>
<div class="feature-item">Gestion du temps et productivité</div>
<div class="feature-item">Études de cas réels</div>

<div class="note">Valeur réelle : 50.000 FCFA - OFFERTE dans le pack Premium</div>`,

      salut: `👋 Bonjour ! Je suis l'assistant de Francis Kenne.

Je peux vous aider sur :
• Les différentes versions du livre
• Les prix et avantages  
• Comment commander
• Le contenu détaillé
• Les témoignages

Quelle est votre question ?`,

      default: `<div class="message-title">Comment puis-je vous aider ?</div>

<div class="package-title">Questions fréquentes</div>
<div class="feature-item">Prix et réductions</div>
<div class="feature-item">Différences entre versions</div>
<div class="feature-item">Comment commander</div>
<div class="feature-item">Contenu du livre</div>
<div class="feature-item">Livraison et délais</div>

<div class="note">Posez-moi une question précise</div>`
    };

    return responses[intent] || responses.default;
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
    if (message.sender === 'bot') {
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
        <div className="bubble-icon">🤖</div>
        <div className="bubble-pulse"></div>
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">🤖</div>
            <div className="chat-info">
              <h4>Assistant Francis</h4>
              <span>En ligne • Réponse instantanée</span>
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
              placeholder="Tapez votre message..."
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