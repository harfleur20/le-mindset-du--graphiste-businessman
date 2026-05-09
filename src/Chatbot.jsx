import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chatbot.css';

const wait = (duration) => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Bonjour ! Je suis Eveline, l'assistante de Francis Kenne. Je peux vous aider à choisir la bonne version du livre ou répondre à vos questions !",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [suggestions, setSuggestions] = useState([
    "Quelle est la différence entre les versions ?",
    "Comment profiter du code MINDSET2026 ?",
    "Comment commander ?",
    "Quelle offre me conseillez-vous ?"
  ]);
  
  const messagesEndRef = useRef(null);
  const proactiveSentRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [typingText]);

  useEffect(() => {
    document.body.classList.toggle('chatbot-open', isOpen);

    return () => {
      document.body.classList.remove('chatbot-open');
    };
  }, [isOpen]);

  const typeBotMessage = useCallback(async (message) => {
    setTypingText('');
    const botMessage = typeof message === 'string' ? { text: message, sender: 'bot' } : { ...message, sender: 'bot' };

    const initialDelay = Math.min(1200, Math.max(500, botMessage.text.length * 8));
    await wait(initialDelay);

    setMessages(prev => [...prev, botMessage]);
    setTypingText('');
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (proactiveSentRef.current || isLoading) return;

      proactiveSentRef.current = true;
      setIsOpen(true);
      setSuggestions([
        "Je suis graphiste débutant",
        "Je veux mieux vendre mes services",
        "Je veux profiter de -50%"
      ]);
      setIsLoading(true);

      await typeBotMessage(`Vous parcourez le site depuis un moment. Si vous êtes graphiste ou créatif, le livre peut vous aider à passer d'un simple talent à une vraie activité structurée.

En ce moment, l'Ebook est à -50% avec le code MINDSET2026. Vous voulez que je vous aide à choisir l'offre la plus adaptée à votre situation ?`);
      setIsLoading(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, [isLoading, typeBotMessage]);

  const getAssistantUnavailableMessage = () => {
    return `Je suis désolée, je n'arrive pas à joindre Eveline pour l'instant.

Vous pouvez réessayer dans quelques instants, ou contacter directement l'équipe sur WhatsApp : +237 680 95 03 19`;
  };

  const askHuggingFaceAssistant = async (message) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Assistant IA indisponible');
    }

    const data = await response.json();

    if (!data.answer) {
      throw new Error('Réponse IA vide');
    }

    return {
      text: data.answer,
      actions: data.actions || []
    };
  };

  const sendMessage = async () => {
    const currentInput = input.trim();

    if (!currentInput || isLoading) return;

    const userMessage = { text: currentInput, sender: 'user' };
    proactiveSentRef.current = true;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSuggestions([]);
    setIsLoading(true);

    try {
      const botResponse = await askHuggingFaceAssistant(currentInput);
      await typeBotMessage(botResponse);
    } catch (error) {
      console.warn(error);
      await typeBotMessage(getAssistantUnavailableMessage());
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
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
      const formattedText = message.text
        .replace(/:\s+-\s+/g, ':\n- ')
        .replace(/\s+(\d+)\.\s+/g, '\n$1. ')
        .replace(/\s+-\s+/g, '\n- ');

      const textContent = formattedText.split('\n').map((line, i) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) return null;

        if (/^(\d+\.|-)\s+/.test(trimmedLine)) {
          return <p key={i} className="message-list-item">{trimmedLine}</p>;
        }

        return <p key={i}>{trimmedLine}</p>;
      });

      if (message.sender !== 'bot' || !message.actions?.length) {
        return textContent;
      }

      return (
        <>
          {textContent}
          <div className="message-actions">
            {message.actions.map((action, index) => (
              <a
                key={`${action.url}-${index}`}
                href={action.url}
                className={`message-action ${action.type === 'whatsapp' ? 'whatsapp' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {action.label}
              </a>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div 
        className={`chat-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="bubble-icon" aria-hidden="true">
          <i className="fas fa-comments"></i>
        </div>
        <div className="bubble-pulse"></div>
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">
              <img src="/advisor-avatar.png" alt="Conseillère en ligne" />
              <span className="live-status" aria-label="En ligne"></span>
            </div>
            <div className="chat-info">
              <h4>Assistante de Francis</h4>
              <span>{isLoading ? 'En train d’écrire...' : 'En ligne • Réponse personnalisée'}</span>
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

            {isLoading && !typingText && (
              <div className="message bot fade-in">
                <div className="typing-indicator" aria-label="Assistant en train d'écrire">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
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
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              className="send-btn"
              disabled={!input.trim() || isLoading}
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
