import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, RefreshCcw, CheckCircle } from 'lucide-react';
import './ScenarioSimulator.css';

interface Props {
  lang: 'en' | 'hi';
}

type NodeId = 'start' | 'provisional_ballot' | 'wrong_polling_place' | 'go_to_correct' | 'success';

interface ScenarioNode {
  id: NodeId;
  titleEn: string;
  titleHi: string;
  textEn: string;
  textHi: string;
  options: {
    labelEn: string;
    labelHi: string;
    nextId: NodeId;
  }[];
  isEnd?: boolean;
}

const scenarioGraph: Record<NodeId, ScenarioNode> = {
  start: {
    id: 'start',
    titleEn: 'Election Day Challenge',
    titleHi: 'चुनाव दिवस की चुनौती',
    textEn: "You arrive at your polling place, but the poll worker says your name is not on the voter roll. What do you do?",
    textHi: "आप अपने मतदान केंद्र पर पहुंचते हैं, लेकिन मतदान कर्मी का कहना है कि आपका नाम मतदाता सूची में नहीं है। आप क्या करते हैं?",
    options: [
      { labelEn: "Leave and don't vote", labelHi: "छोड़ दो और वोट मत दो", nextId: 'start' }, // Loop back to encourage better choice
      { labelEn: "Ask for a provisional ballot", labelHi: "अनंतिम मतपत्र के लिए पूछें", nextId: 'provisional_ballot' },
      { labelEn: "Check if you are at the correct polling place", labelHi: "जांचें कि क्या आप सही मतदान केंद्र पर हैं", nextId: 'wrong_polling_place' }
    ]
  },
  provisional_ballot: {
    id: 'provisional_ballot',
    titleEn: 'Provisional Ballot Requested',
    titleHi: 'अनंतिम मतपत्र का अनुरोध किया गया',
    textEn: "Good choice! A provisional ballot allows you to cast a vote that will be counted once your eligibility is verified. You have successfully navigated the scenario.",
    textHi: "अच्छा विकल्प! एक अनंतिम मतपत्र आपको वोट डालने की अनुमति देता है जिसे आपकी पात्रता सत्यापित होने के बाद गिना जाएगा। आपने सफलतापूर्वक परिदृश्य को नेविगेट किया है।",
    options: [],
    isEnd: true
  },
  wrong_polling_place: {
    id: 'wrong_polling_place',
    titleEn: 'Checking Location',
    titleHi: 'स्थान की जाँच',
    textEn: "You check your voter portal on your phone and realize you are at the wrong precinct. The correct one is 2 miles away.",
    textHi: "आप अपने फोन पर अपने मतदाता पोर्टल की जांच करते हैं और महसूस करते हैं कि आप गलत क्षेत्र में हैं। सही 2 मील दूर है।",
    options: [
      { labelEn: "Go to the correct polling place", labelHi: "सही मतदान केंद्र पर जाएं", nextId: 'go_to_correct' },
      { labelEn: "Ask to vote here anyway", labelHi: "वैसे भी यहाँ वोट करने के लिए पूछें", nextId: 'provisional_ballot' }
    ]
  },
  go_to_correct: {
    id: 'go_to_correct',
    titleEn: 'Arrived at Correct Location',
    titleHi: 'सही स्थान पर पहुंचे',
    textEn: "You arrive at the correct polling place. Your name is on the list, and you cast your ballot successfully!",
    textHi: "आप सही मतदान केंद्र पर पहुंचें। आपका नाम सूची में है, और आपने अपना मतपत्र सफलतापूर्वक डाला!",
    options: [],
    isEnd: true
  },
  success: {
    id: 'success',
    titleEn: '', titleHi: '', textEn: '', textHi: '', options: [] // unreachable
  }
};

const ScenarioSimulator: React.FC<Props> = ({ lang }) => {
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>('start');
  const currentNode = scenarioGraph[currentNodeId];

  const handleOptionClick = (nextId: NodeId) => {
    setCurrentNodeId(nextId);
  };

  const resetScenario = () => {
    setCurrentNodeId('start');
  };

  return (
    <div className="view-container scenario-container">
      <div className="view-header">
        <h2>{lang === 'en' ? 'Scenario Simulator' : 'परिदृश्य सिम्युलेटर'}</h2>
        <p>{lang === 'en' ? 'Navigate real-world election scenarios.' : 'वास्तविक दुनिया के चुनाव परिदृश्यों को नेविगेट करें।'}</p>
      </div>

      <div className="scenario-card">
        <div className="scenario-icon">
          {currentNode.isEnd ? <CheckCircle size={48} color="var(--success-color)" /> : <ShieldAlert size={48} color="var(--warning-color)" />}
        </div>
        
        <div className="scenario-content">
          <h3>{lang === 'en' ? currentNode.titleEn : currentNode.titleHi}</h3>
          <p>{lang === 'en' ? currentNode.textEn : currentNode.textHi}</p>
        </div>

        {!currentNode.isEnd ? (
          <div className="scenario-options">
            {currentNode.options.map((opt, idx) => (
              <button 
                key={idx} 
                className="scenario-option-btn"
                onClick={() => handleOptionClick(opt.nextId)}
              >
                <span>{lang === 'en' ? opt.labelEn : opt.labelHi}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        ) : (
          <div className="scenario-end">
            <button className="reset-btn" onClick={resetScenario}>
              <RefreshCcw size={16} />
              {lang === 'en' ? 'Try Another Scenario' : 'एक और परिदृश्य आज़माएं'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioSimulator;
