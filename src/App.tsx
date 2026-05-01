import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, MessageSquare, Clock, ShieldAlert, Award, Layers } from 'lucide-react';
import './App.css';

// Placeholder components
import ChatAssistant from './components/ChatAssistant';
import Timeline from './components/Timeline';
import ScenarioSimulator from './components/ScenarioSimulator';
import QuizSystem from './components/QuizSystem';
import Flashcards from './components/Flashcards';

type ViewMode = 'chat' | 'timeline' | 'scenario' | 'quiz' | 'flashcards';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [activeView, setActiveView] = useState<ViewMode>('chat');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'en' ? 'hi' : 'en');

  const navItems = [
    { id: 'chat', label: lang === 'en' ? 'AI Assistant' : 'एआई सहायक', icon: <MessageSquare size={20} /> },
    { id: 'timeline', label: lang === 'en' ? 'Timeline' : 'समयरेखा', icon: <Clock size={20} /> },
    { id: 'scenario', label: lang === 'en' ? 'Scenarios' : 'परिदृश्य', icon: <ShieldAlert size={20} /> },
    { id: 'quiz', label: lang === 'en' ? 'Quizzes' : 'प्रश्नोत्तरी', icon: <Award size={20} /> },
    { id: 'flashcards', label: lang === 'en' ? 'Flashcards' : 'फ़्लैशकार्ड', icon: <Layers size={20} /> },
  ];

  return (
    <div className="app-container">
      <header className="top-nav">
        <div className="nav-brand">
          <div className="logo-icon">VS</div>
          <h1>VoteSmart</h1>
        </div>
        
        <div className="nav-controls">
          <button onClick={toggleLang} className="control-btn" title="Toggle Language">
            <Globe size={20} />
            <span className="lang-text">{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className="control-btn" title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id as ViewMode)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="content-area">
          {activeView === 'chat' && <ChatAssistant lang={lang} />}
          {activeView === 'timeline' && <Timeline lang={lang} />}
          {activeView === 'scenario' && <ScenarioSimulator lang={lang} />}
          {activeView === 'quiz' && <QuizSystem lang={lang} />}
          {activeView === 'flashcards' && <Flashcards lang={lang} />}
        </main>
      </div>
    </div>
  );
}

export default App;
