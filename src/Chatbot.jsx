import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Bonjour ! Je suis l'assistant de Francis. Je peux vous aider à choisir la bonne version du livre ou répondre à vos questions !",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Message utilisateur
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulation réponse IA
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage = { 
        text: botResponse,
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('prix') || input.includes('coût') || input.includes('cher')) {
      return "💰 **Ebook** : 10.000F (-20% avec RELANCEIO) • **Physique** : 25.000F • **Premium** : 75.000F\n\nC'est un investissement qui se rentabilise rapidement !";
    }
    
    if (input.includes('différence') || input.includes('version')) {
      return "📚 **Ebook** : Format numérique • **Physique** : Livre premium + packaging • **Premium** : Coaching + masterclass + communauté privée + ressources exclusives";
    }
    
    if (input.includes('commander') || input.includes('acheter') || input.includes('obtenir')) {
      return "🎯 Parfait ! • **WhatsApp** : Pour offre premium • **Amazon** : Version physique • **Chariow** : Ebook\n\nQuelle version vous intéresse ?";
    }
    
    if (input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
      return "👋 Bonjour ! Ravie de vous aider ! Posez-moi toutes vos questions sur le livre 'Le Mindset du Graphiste Businessman'";
    }
    
    return "🤔 Je peux vous aider sur : • Les prix et versions • Comment commander • Les bénéfices du livre • Conseils personnalisés\n\nQuelle est votre question précise ?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <div 
        className={`chat-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="bubble-icon">🤖</div>
        <div className="bubble-pulse"></div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
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

          {/* Messages */}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender} ${message.sender === 'bot' ? 'fade-in' : 'slide-in'}`}
              >
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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