import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import './ChatAssistant.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface Props {
  lang: 'en' | 'hi';
}

const ChatAssistant: React.FC<Props> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: lang === 'en' 
        ? "Hello! I'm your Civic Assistant. Ask me anything about elections, voter registration, or political processes."
        : "नमस्ते! मैं आपका नागरिक सहायक हूँ। मुझसे चुनाव, मतदाता पंजीकरण, या राजनीतिक प्रक्रियाओं के बारे में कुछ भी पूछें।",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let botResponseText = lang === 'en'
        ? "This is a simulated AI response. In the full implementation, this will connect to the Gemini API to provide accurate, contextual election information."
        : "यह एक सिम्युलेटेड AI प्रतिक्रिया है। पूर्ण कार्यान्वयन में, यह सटीक चुनाव जानकारी प्रदान करने के लिए जेमिनी एपीआई से जुड़ेगा।";

      const lowerText = inputValue.toLowerCase();
      
      // Simulated knowledge base for demonstration
      if (lowerText.includes('process') || lowerText.includes('complete')) {
         botResponseText = lang === 'en' 
           ? "The complete Indian election process typically follows these steps: 1. Delimitation of constituencies. 2. Registration of voters and updating the Electoral Roll. 3. Notification of elections by the Election Commission. 4. Filing of Nominations by candidates. 5. Scrutiny of Nominations. 6. Campaigning. 7. Voting day (using EVMs). 8. Counting of votes and declaration of results."
           : "संपूर्ण भारतीय चुनाव प्रक्रिया आमतौर पर इन चरणों का पालन करती है: 1. निर्वाचन क्षेत्रों का परिसीमन। 2. मतदाताओं का पंजीकरण और निर्वाचक नामावली को अद्यतन करना। 3. चुनाव आयोग द्वारा चुनावों की अधिसूचना। 4. उम्मीदवारों द्वारा नामांकन दाखिल करना। 5. नामांकन की जांच। 6. चुनाव प्रचार। 7. मतदान का दिन (ईवीएम का उपयोग करके)। 8. वोटों की गिनती और परिणामों की घोषणा।";
      } else if (lowerText.includes('register')) {
         botResponseText = lang === 'en'
           ? "To register to vote in India, you must be an Indian citizen, 18 years of age or older on the qualifying date (usually Jan 1 of the year), and ordinarily resident in the constituency. You can register online through the National Voters' Service Portal (NVSP) or by filling out Form 6."
           : "भारत में मतदान करने के लिए पंजीकरण करने के लिए, आपको एक भारतीय नागरिक होना चाहिए, अर्हक तिथि (आमतौर पर वर्ष की 1 जनवरी) को 18 वर्ष या उससे अधिक आयु का होना चाहिए, और निर्वाचन क्षेत्र में सामान्य रूप से निवासी होना चाहिए। आप राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) के माध्यम से ऑनलाइन या फॉर्म 6 भरकर पंजीकरण कर सकते हैं।";
      } else if (lowerText.includes('evm') || lowerText.includes('machine')) {
         botResponseText = lang === 'en'
           ? "Electronic Voting Machines (EVMs) are used in Indian elections to record votes. They consist of a Control Unit and a Balloting Unit. Voter Verifiable Paper Audit Trail (VVPAT) machines are also used along with EVMs to allow voters to verify that their vote was cast correctly."
           : "इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) का उपयोग भारतीय चुनावों में वोट रिकॉर्ड करने के लिए किया जाता है। इनमें एक कंट्रोल यूनिट और एक बैलेटिंग यूनिट होती है। मतदाता सत्यापन योग्य पेपर ऑडिट ट्रेल (VVPAT) मशीनों का उपयोग EVM के साथ भी किया जाता है ताकि मतदाताओं को यह सत्यापित करने की अनुमति मिल सके कि उनका वोट सही ढंग से डाला गया था।";
      } else if (lowerText.includes('when') || lowerText.includes('next')) {
         botResponseText = lang === 'en'
           ? "General Elections to the Lok Sabha (Lower House of Parliament) are held every five years, unless dissolved earlier. State Legislative Assembly elections also happen every five years."
           : "लोकसभा (संसद के निचले सदन) के आम चुनाव हर पांच साल में होते हैं, जब तक कि पहले भंग न हो जाए। राज्य विधान सभा चुनाव भी हर पांच साल में होते हैं।";
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickPrompts = lang === 'en' 
    ? ["Explain the complete election process", "How do I register to vote?", "What is an EVM?"]
    : ["संपूर्ण चुनाव प्रक्रिया को समझाएं", "मैं मतदान के लिए पंजीकरण कैसे करूं?", "EVM क्या है?"];

  return (
    <div className="view-container chat-container">
      <div className="view-header">
        <h2>{lang === 'en' ? 'AI Chat Assistant' : 'एआई चैट सहायक'}</h2>
        <p>{lang === 'en' ? 'Get personalized answers to your election questions.' : 'अपने चुनाव संबंधी प्रश्नों के वैयक्तिकृत उत्तर प्राप्त करें।'}</p>
      </div>

      <div className="chat-interface">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="message-avatar"><Bot size={20} /></div>
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <div className="quick-prompts">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i} 
                className="prompt-btn"
                onClick={() => setInputValue(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={lang === 'en' ? 'Type your question here...' : 'अपना प्रश्न यहां टाइप करें...'}
            />
            <button type="submit" disabled={!inputValue.trim()} className="send-btn">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
