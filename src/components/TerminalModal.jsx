import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Trash2, Cpu } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function TerminalModal({ isOpen, onClose, data }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'ANUSHRUTI CYBER TERMINAL v4.2.0 (x86_64-pc-linux-gnu)'
    },
    {
      type: 'system',
      text: 'Type "help" to view all available commands, or "projects" to view work.'
    }
  ]);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      sounds.playTerminalKey();
      const newHistory = [...history, { type: 'user', text: input }];

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: `AVAILABLE COMMANDS:
  whoami        - Display Anushruti's background & GPA
  skills        - List technical stack (Languages, Frameworks, DBs)
  experience    - Display internship details (AIIMS, Mama's Baby Lounge, RPG)
  projects      - List featured projects (Work Mgmt, Library Mgmt, SIH)
  achievements  - Display hackathons, awards, and GSSoC status
  certifications- Display verified certifications
  contact       - Output email, phone, GitHub, and LinkedIn
  cat resume    - Open/download official Java Dev resume (PDF)
  clear         - Clear terminal console
  exit          - Close terminal window`
          });
          break;

        case 'whoami':
        case 'about':
          newHistory.push({
            type: 'output',
            text: `NAME: Anushruti
ROLE: Full-Stack Software Engineer — Java
DEGREE: B.Tech in Computer Science & Engineering @ BVCOE, New Delhi (Aug 2023 – Jul 2027)
GPA: 9.1 / 10.0
SUMMARY: Full-stack development with Java, Spring Boot, and Angular — REST APIs, backend performance, scalable delivery (Agile).`
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            text: `TECHNICAL SKILLS:
  Languages : Java, Python, C, C++, JavaScript (ES6+), SQL, HTML5, CSS3
  Frameworks: Spring Boot, Angular, Tailwind CSS, Scikit-learn, Pandas, NumPy
  Tools/DBs : Git, GitHub, Maven, CI/CD, PostgreSQL, MySQL, MongoDB, Figma, Vercel, REST APIs
  CS Core   : DSA, OOPS, DBMS, Computer Networks, Operating Systems, Compiler Design, Discrete Mathematics`
          });
          break;

        case 'experience':
          newHistory.push({
            type: 'output',
            text: `WORK EXPERIENCE:
1. AIIMS (Software Engineer Intern - EHS | Jun-Aug 2026)
   - EHS portal card registration module — Spring Boot, JSP, Angular for 100,000+ members.
   - ER/DFD/Use-Case workflow diagrams; Agile practices; Unit Testing.

2. Mama's Baby Lounge (Web Development Intern | Jul-Sep 2025)
   - React landing page; +25% engagement (Google Analytics).
   - JWT authentication supporting 10,000+ concurrent user sessions (Scrum sprints).

3. RPG Websolutions (Web Design & Development Intern | Jul 2025)
   - Homepage redesign across 15+ client modules; 45% load-time reduction.`
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            text: `FEATURED PROJECTS:
1. Work Management System - RBAC portal, real-time tracking | Java, Spring Boot, Angular, PostgreSQL, AWS, CI/CD
2. Library Management System - Automation + JWT auth, -30% latency | Java, Spring Boot, Angular, MySQL
3. SyncTransformer-Net (Deepfake Detection) - 97.5% Accuracy | Python, PyTorch, Wav2Vec2.0
4. AgriVision SIH (Crop Disease Detection) - 96.8% Accuracy | Python, PyTorch, CNN-LSTM`
          });
          break;

        case 'achievements':
          newHistory.push({
            type: 'output',
            text: `ACHIEVEMENTS & LEADERSHIP:
🏆 1st Prize: Technovate (2026)
🥉 3rd Runner-Up: Evotech (2026)
🥈 1st Runner-Up: Anugoonj '25, GGSIPU
⭐ Selected Contributor: GirlScript Summer of Code (GSSoC 2025 - Top 5% nationwide)
🚀 Selected Participant: Smart India Hackathon (SIH 2025)
👑 President: Aagaaz Music Society (150+ members, 2000+ event attendees)
💼 Head: E-Cell BVCOE (National Entrepreneurship Challenge @ IIT Bombay)`
          });
          break;

        case 'certifications':
          newHistory.push({
            type: 'output',
            text: `CERTIFICATIONS:
• DSA in Java - Coding Blocks (Jan 2026)
• MS Excel - Udemy (Aug 2025)`
          });
          break;

        case 'contact':
          newHistory.push({
            type: 'output',
            text: `CONTACT INFORMATION:
Email   : anushrutimalik@gmail.com
Phone   : +91 85956 20079
GitHub  : https://github.com/anushrutimalik
LinkedIn: https://linkedin.com/in/anushruti-malik`
          });
          break;

        case 'cat resume':
        case 'resume':
          window.open('/Anushruti_Resume.pdf', '_blank');
          newHistory.push({
            type: 'output',
            text: 'Opening Java Dev resume PDF in a new tab...'
          });
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'exit':
          onClose();
          return;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not recognized: "${input}". Type "help" for valid commands.`
          });
          break;
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c12]/95 shadow-[0_30px_120px_-20px_rgba(56,189,248,0.2)] flex flex-col h-[min(540px,85svh)]">
        
        {/* Terminal Title Bar */}
        <div className="px-5 py-3.5 border-b border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              Terminal
            </span>
            <span className="font-mono text-[11px] text-slate-500">anushruti@portfolio</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setHistory([]);
              }}
              className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear terminal history"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Close CLI (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body Output */}
        <div className="flex-1 p-5 font-mono text-[13px] leading-relaxed overflow-y-auto space-y-3 bg-[#05060a]/80 text-slate-200">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'system' && (
                <div className="text-sky-300">{item.text}</div>
              )}
              {item.type === 'user' && (
                <div className="flex items-center gap-2 text-slate-100">
                  <span className="text-sky-400">anushruti@system:~$</span>
                  <span>{item.text}</span>
                </div>
              )}
              {item.type === 'output' && (
                <pre className="mt-1 whitespace-pre-wrap pl-3 border-l border-sky-400/25 font-sans text-[13px] leading-[1.7] text-slate-300">
                  {item.text}
                </pre>
              )}
              {item.type === 'error' && (
                <div className="text-rose-400 pl-3 border-l-2 border-rose-500/50">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-5 py-3.5 border-t border-white/[0.07] flex items-center gap-2">
          <span className="text-sky-400 font-mono text-sm select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help', 'whoami', 'skills', 'projects'..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-[13px] focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleCommand({ key: 'Enter', preventDefault: () => {} })}
            className="flex items-center gap-1 text-[11px] font-mono text-sky-400/80 hover:text-sky-300"
          >
            <span>RUN</span> <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
