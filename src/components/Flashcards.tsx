import React, { useState } from 'react';
import { RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import './Flashcards.css';

interface Props {
  lang: 'en' | 'hi';
}

interface Flashcard {
  id: number;
  termEn: string;
  termHi: string;
  definitionEn: string;
  definitionHi: string;
}

const flashcardsData: Flashcard[] = [
  {
    id: 1,
    termEn: "Election Commission of India (ECI)",
    termHi: "भारत निर्वाचन आयोग (ECI)",
    definitionEn: "An autonomous constitutional authority responsible for administering election processes in India at national and state levels.",
    definitionHi: "राष्ट्रीय और राज्य स्तर पर भारत में चुनाव प्रक्रियाओं के प्रशासन के लिए जिम्मेदार एक स्वायत्त संवैधानिक प्राधिकरण।"
  },
  {
    id: 2,
    termEn: "EVM (Electronic Voting Machine)",
    termHi: "EVM (इलेक्ट्रॉनिक वोटिंग मशीन)",
    definitionEn: "A secure electronic device used to record votes. It consists of a Control Unit and a Balloting Unit.",
    definitionHi: "वोट रिकॉर्ड करने के लिए उपयोग किया जाने वाला एक सुरक्षित इलेक्ट्रॉनिक उपकरण। इसमें एक कंट्रोल यूनिट और एक बैलेटिंग यूनिट होती है।"
  },
  {
    id: 3,
    termEn: "VVPAT",
    termHi: "VVPAT",
    definitionEn: "Voter Verifiable Paper Audit Trail. A machine attached to the EVM that prints a paper slip allowing the voter to verify their vote.",
    definitionHi: "वोटर वेरिफाइड पेपर ऑडिट ट्रेल। EVM से जुड़ी एक मशीन जो एक पेपर स्लिप प्रिंट करती है जिससे मतदाता अपने वोट को सत्यापित कर सकता है।"
  },
  {
    id: 4,
    termEn: "NOTA (None of the Above)",
    termHi: "NOTA (इनमें से कोई नहीं)",
    definitionEn: "A ballot option allowing voters to indicate their disapproval of all the candidates in a voting system.",
    definitionHi: "एक मतपत्र विकल्प जो मतदाताओं को मतदान प्रणाली में सभी उम्मीदवारों की अस्वीकृति को इंगित करने की अनुमति देता है।"
  },
  {
    id: 5,
    termEn: "Model Code of Conduct (MCC)",
    termHi: "आदर्श आचार संहिता (MCC)",
    definitionEn: "A set of guidelines issued by the ECI for the conduct of political parties and candidates during elections, ensuring free and fair polling.",
    definitionHi: "स्वतंत्र और निष्पक्ष मतदान सुनिश्चित करने के लिए, चुनाव के दौरान राजनीतिक दलों और उम्मीदवारों के आचरण के लिए ECI द्वारा जारी दिशा-निर्देशों का एक समूह।"
  }
];

const Flashcards: React.FC<Props> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcardsData[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  return (
    <div className="view-container flashcards-container">
      <div className="view-header">
        <h2>{lang === 'en' ? 'Election Flashcards' : 'चुनाव फ्लैशकार्ड'}</h2>
        <p>{lang === 'en' ? 'Master key election concepts and terminology.' : 'प्रमुख चुनाव अवधारणाओं और शब्दावली में महारत हासिल करें।'}</p>
      </div>

      <div className="flashcard-deck">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <span className="card-category">{lang === 'en' ? 'Term' : 'शब्द'}</span>
              <h3>{lang === 'en' ? card.termEn : card.termHi}</h3>
              <p className="flip-hint">
                <RefreshCw size={16} />
                {lang === 'en' ? 'Click to flip' : 'पलटने के लिए क्लिक करें'}
              </p>
            </div>
            <div className="flashcard-back">
              <span className="card-category">{lang === 'en' ? 'Definition' : 'परिभाषा'}</span>
              <p className="definition-text">{lang === 'en' ? card.definitionEn : card.definitionHi}</p>
            </div>
          </div>
        </div>

        <div className="flashcard-controls">
          <button className="nav-btn" onClick={handlePrev}>
            <ArrowLeft size={20} />
            {lang === 'en' ? 'Previous' : 'पिछला'}
          </button>
          <span className="card-counter">
            {currentIndex + 1} / {flashcardsData.length}
          </span>
          <button className="nav-btn" onClick={handleNext}>
            {lang === 'en' ? 'Next' : 'अगला'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
