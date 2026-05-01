import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import './Timeline.css';

interface Props {
  lang: 'en' | 'hi';
}

interface TimelineEvent {
  id: number;
  date: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}

const events: TimelineEvent[] = [
  {
    id: 1,
    date: 'Step 1',
    titleEn: 'Delimitation of Constituencies',
    titleHi: 'निर्वाचन क्षेत्रों का परिसीमन',
    descEn: 'The boundaries of the constituencies are drawn based on population data from the latest census.',
    descHi: 'नवीनतम जनगणना के जनसंख्या आंकड़ों के आधार पर निर्वाचन क्षेत्रों की सीमाएँ खींची जाती हैं।'
  },
  {
    id: 2,
    date: 'Step 2',
    titleEn: 'Voter Registration',
    titleHi: 'मतदाता पंजीकरण',
    descEn: 'Eligible citizens must register on the electoral roll. Check your status online via the NVSP portal.',
    descHi: 'पात्र नागरिकों को निर्वाचक नामावली में पंजीकरण कराना होगा। NVSP पोर्टल के माध्यम से ऑनलाइन अपनी स्थिति जांचें।'
  },
  {
    id: 3,
    date: 'Step 3',
    titleEn: 'Notification of Elections',
    titleHi: 'चुनावों की अधिसूचना',
    descEn: 'The Election Commission of India (ECI) announces the election dates and phases, enforcing the Model Code of Conduct.',
    descHi: 'भारत निर्वाचन आयोग (ECI) आदर्श आचार संहिता लागू करते हुए चुनाव की तारीखों और चरणों की घोषणा करता है।'
  },
  {
    id: 4,
    date: 'Step 4',
    titleEn: 'Filing Nominations',
    titleHi: 'नामांकन दाखिल करना',
    descEn: 'Candidates from various political parties and independents file their nomination papers, which are then scrutinized.',
    descHi: 'विभिन्न राजनीतिक दलों और निर्दलीय उम्मीदवार अपना नामांकन पत्र दाखिल करते हैं, जिसकी बाद में जांच की जाती है।'
  },
  {
    id: 5,
    date: 'Step 5',
    titleEn: 'Campaigning',
    titleHi: 'चुनाव प्रचार',
    descEn: 'Candidates campaign to win votes. Campaigning ends 48 hours before the polling begins.',
    descHi: 'उम्मीदवार वोट जीतने के लिए प्रचार करते हैं। मतदान शुरू होने से 48 घंटे पहले प्रचार समाप्त हो जाता है।'
  },
  {
    id: 6,
    date: 'Step 6',
    titleEn: 'Voting Day',
    titleHi: 'मतदान का दिन',
    descEn: 'Voters cast their votes securely using Electronic Voting Machines (EVMs) at designated polling stations.',
    descHi: 'मतदाता निर्धारित मतदान केंद्रों पर इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) का उपयोग करके सुरक्षित रूप से अपना वोट डालते हैं।'
  },
  {
    id: 7,
    date: 'Step 7',
    titleEn: 'Counting & Results',
    titleHi: 'मतगणना और परिणाम',
    descEn: 'EVMs are secured and votes are counted on a scheduled day to declare the final winners.',
    descHi: 'ईवीएम को सुरक्षित रखा जाता है और अंतिम विजेताओं की घोषणा करने के लिए एक निर्धारित दिन पर वोटों की गिनती की जाती है।'
  }
];

const Timeline: React.FC<Props> = ({ lang }) => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="view-container timeline-container">
      <div className="view-header">
        <h2>{lang === 'en' ? 'Interactive Timeline' : 'इंटरैक्टिव समयरेखा'}</h2>
        <p>{lang === 'en' ? 'Follow the steps of the election process from start to finish.' : 'शुरू से अंत तक चुनाव प्रक्रिया के चरणों का पालन करें।'}</p>
      </div>

      <div className="timeline">
        {events.map((event, index) => (
          <div key={event.id} className={`timeline-item ${expandedId === event.id ? 'expanded' : ''}`}>
            <div className="timeline-marker">
              <div className="timeline-dot">
                <Calendar size={16} />
              </div>
              {index < events.length - 1 && <div className="timeline-line"></div>}
            </div>
            
            <div className="timeline-content" onClick={() => toggleExpand(event.id)}>
              <div className="timeline-header">
                <div className="timeline-date">{event.date}</div>
                <div className="timeline-title-row">
                  <h3>{lang === 'en' ? event.titleEn : event.titleHi}</h3>
                  {expandedId === event.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              <div className="timeline-body">
                <p>{lang === 'en' ? event.descEn : event.descHi}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
