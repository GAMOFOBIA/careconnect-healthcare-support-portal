import { useState, useRef, useEffect } from 'react';

const FAQ_RESPONSES = {
  'how can i get support?': {
    question: 'How can I get support?',
    answer:
      'You can request support by visiting our Patient Support page. Fill out the form with your details and describe the help you need. Our team will review your request and connect you with the right resources within 24–48 hours.',
    link: '/patient-support',
    linkText: 'Go to Patient Support',
  },
  'how can i volunteer?': {
    question: 'How can I volunteer?',
    answer:
      'We welcome volunteers with diverse skills! Visit our Volunteer Registration page, share your skills and availability, and tell us what motivates you. Our coordinator will reach out to match you with meaningful opportunities.',
    link: '/volunteer',
    linkText: 'Register as Volunteer',
  },
  'what services are available?': {
    question: 'What services are available?',
    answer:
      'CareConnect offers four core support services: Emotional Support for mental wellness, Caregiver Guidance for family caregivers, Financial Help for navigating costs, and Medical Information to help you understand treatment options.',
    link: '/patient-support',
    linkText: 'Request Support',
  },
  'contact information': {
    question: 'Contact information',
    answer:
      'Reach us at support@careconnect.org or call +1 (800) 555-CARE. Office hours are Monday through Friday, 9 AM to 6 PM. You can also send us a message through our Contact page.',
    link: '/contact',
    linkText: 'Send a Message',
  },
};

const QUICK_QUESTIONS = Object.values(FAQ_RESPONSES).map((item) => item.question);

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m the CareConnect assistant. Ask me about support, volunteering, services, or contact info.',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findResponse = (userInput) => {
    const normalized = userInput.toLowerCase().trim();

    for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return response;
      }
    }

    const partialMatch = Object.entries(FAQ_RESPONSES).find(([key]) =>
      key.split(' ').some((word) => normalized.includes(word) && word.length > 4)
    );

    if (partialMatch) return partialMatch[1];

    return null;
  };

  const addBotMessage = (response) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: response.answer,
        link: response.link,
        linkText: response.linkText,
      },
    ]);
  };

  const handleQuestion = (question) => {
    setMessages((prev) => [...prev, { type: 'user', text: question }]);

    const response = findResponse(question);
    if (response) {
      setTimeout(() => addBotMessage(response), 400);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: 'bot',
            text: 'I can help with support requests, volunteering, available services, and contact information. Try one of the quick questions below!',
          },
        ]);
      }, 400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleQuestion(input);
    setInput('');
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <h4>CareConnect Assistant</h4>
              <span className="chatbot-status">Online</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              &times;
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <p>{msg.text}</p>
                {msg.link && (
                  <a href={msg.link} className="chatbot-link">
                    {msg.linkText} &rarr;
                  </a>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-questions">
            {QUICK_QUESTIONS.map((q) => (
              <button key={q} onClick={() => handleQuestion(q)} className="quick-btn">
                {q}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
            />
            <button type="submit" aria-label="Send message">Send</button>
          </form>
        </div>
      )}

      <button
        className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open chat assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default Chatbot;
