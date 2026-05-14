import React, { useState, useRef, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Send, Bot, User, Loader2, Wrench } from 'lucide-react';

const ASK_AGENT_QUERY = gql`
  query AskAgent($prompt: String!) {
    askAgent(prompt: $prompt) {
      text
      toolsUsed
    }
  }
`;

export default function AskAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm Helpexa, your Agentic Assistant. I can check your HR requests, IT tickets, or Expenses. How can I help you today?", tools: [] }
  ]);
  
  const [askAgent, { loading }] = useLazyQuery(ASK_AGENT_QUERY, {
    onCompleted: (data) => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: data.askAgent.text, 
        tools: data.askAgent.toolsUsed || [] 
      }]);
    },
    onError: (error) => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Sorry, I encountered an error: ${error.message}`, 
        tools: [] 
      }]);
    }
  });

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    
    askAgent({ variables: { prompt: userMessage } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <div className="header">
        <h1>ASK AI</h1>
        <p>Your Agentic Enterprise Assistant</p>
      </div>

      <div className="glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '20px' }}>
        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                alignItems: 'center', 
                marginBottom: '4px',
                color: 'var(--text-muted)',
                fontSize: '0.75rem'
              }}>
                {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                {msg.role === 'ai' ? 'Helpexa Agent' : 'You'}
              </div>
              <div style={{ 
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
              {msg.tools && msg.tools.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                  {msg.tools.map(tool => (
                    <span key={tool} style={{ 
                      fontSize: '0.65rem', 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      color: 'var(--success)', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Wrench size={10} /> {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '8px', color: 'var(--text-muted)', alignItems: 'center' }}>
              <Loader2 size={16} className="spin" />
              <span style={{ fontSize: '0.875rem' }}>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <input 
            type="text" 
            placeholder="Ask me anything (e.g. 'Summarize my IT tickets')" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '8px', 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--border)', 
              color: 'white',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="btn" 
            style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Send size={18} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
