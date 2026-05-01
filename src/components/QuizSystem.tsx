import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle } from 'lucide-react';
import './QuizSystem.css';

interface Props {
  lang: 'en' | 'hi';
}

interface Question {
  id: number;
  textEn: string;
  textHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    textEn: "Which body is responsible for conducting free and fair elections in India?",
    textHi: "भारत में स्वतंत्र और निष्पक्ष चुनाव कराने के लिए कौन सा निकाय जिम्मेदार है?",
    optionsEn: [
      "The Supreme Court of India",
      "The Election Commission of India",
      "The Parliament",
      "The President of India"
    ],
    optionsHi: [
      "भारत का सर्वोच्च न्यायालय",
      "भारत निर्वाचन आयोग",
      "संसद",
      "भारत के राष्ट्रपति"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    textEn: "What does VVPAT stand for in the context of Indian elections?",
    textHi: "भारतीय चुनावों के संदर्भ में VVPAT का क्या अर्थ है?",
    optionsEn: [
      "Voter Verified Paper Audit Trail",
      "Voting Verification Protocol And Tracking",
      "Voter Validation Process And Testing",
      "Visual Vote Printing And Tracking"
    ],
    optionsHi: [
      "वोटर वेरिफाइड पेपर ऑडिट ट्रेल",
      "वोटिंग वेरिफिकेशन प्रोटोकॉल एंड ट्रैकिंग",
      "वोटर वैलिडेशन प्रोसेस एंड टेस्टिंग",
      "विज़ुअल वोट प्रिंटिंग एंड ट्रैकिंग"
    ],
    correctIndex: 0
  },
  {
    id: 3,
    textEn: "What is the minimum voting age for citizens in India?",
    textHi: "भारत में नागरिकों के लिए मतदान की न्यूनतम आयु क्या है?",
    optionsEn: [
      "21 years",
      "16 years",
      "18 years",
      "25 years"
    ],
    optionsHi: [
      "21 वर्ष",
      "16 वर्ष",
      "18 वर्ष",
      "25 वर्ष"
    ],
    correctIndex: 2
  }
];

const QuizSystem: React.FC<Props> = ({ lang }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === question.correctIndex) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getBadges = () => {
    if (score >= 30) return lang === 'en' ? 'Civic Master 🏆' : 'नागरिक मास्टर 🏆';
    if (score >= 20) return lang === 'en' ? 'Informed Citizen 🏅' : 'जागरूक नागरिक 🏅';
    return lang === 'en' ? 'Novice Voter 🌱' : 'नौसिखिया मतदाता 🌱';
  };

  return (
    <div className="view-container quiz-container">
      <div className="view-header">
        <h2>{lang === 'en' ? 'Gamified Quiz System' : 'गेमीफाइड क्विज़ सिस्टम'}</h2>
        <p>{lang === 'en' ? 'Test your knowledge and earn badges.' : 'अपने ज्ञान का परीक्षण करें और बैज अर्जित करें।'}</p>
      </div>

      {!showResults ? (
        <div className="quiz-card">
          <div className="quiz-progress">
            <span>{lang === 'en' ? 'Question' : 'प्रश्न'} {currentQuestion + 1} / {quizQuestions.length}</span>
            <span className="quiz-score">{lang === 'en' ? 'Score' : 'स्कोर'}: {score}</span>
          </div>
          
          <h3 className="quiz-question">
            {lang === 'en' ? question.textEn : question.textHi}
          </h3>

          <div className="quiz-options">
            {(lang === 'en' ? question.optionsEn : question.optionsHi).map((opt, index) => {
              let optionClass = 'quiz-option';
              let Icon = null;

              if (isAnswered) {
                if (index === question.correctIndex) {
                  optionClass += ' correct';
                  Icon = CheckCircle2;
                } else if (index === selectedAnswer) {
                  optionClass += ' incorrect';
                  Icon = XCircle;
                }
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                >
                  <span>{opt}</span>
                  {Icon && <Icon size={20} />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <Award size={64} color="var(--primary-color)" />
          <h3>{lang === 'en' ? 'Quiz Completed!' : 'प्रश्नोत्तरी पूर्ण!'}</h3>
          <p className="final-score">{lang === 'en' ? 'Your Score' : 'आपका स्कोर'}: {score} / {quizQuestions.length * 10}</p>
          
          <div className="badge-earned">
            <p>{lang === 'en' ? 'Badge Earned:' : 'अर्जित बैज:'}</p>
            <div className="badge-badge">{getBadges()}</div>
          </div>

          <button className="reset-btn" onClick={resetQuiz}>
            {lang === 'en' ? 'Play Again' : 'फिर से खेलें'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSystem;
