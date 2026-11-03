import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Briefcase, FolderGit2, Code2, Trophy, Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function CommandPalette({ isOpen, onClose, data }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const items = [
    { type: 'Section', name: 'About & Bio', href: '#about', icon: FileText },
    { type: 'Section', name: 'Work Experience (AIIMS, Mama\'s Baby Lounge, RPG)', href: '#experience', icon: Briefcase },
    { type: 'Section', name: 'Projects & Case Studies', href: '#projects', icon: FolderGit2 },
    { type: 'Section', name: 'Skills & Competencies', href: '#skills', icon: Code2 },
    { type: 'Section', name: 'Hackathons & Achievements', href: '#achievements', icon: Trophy },
    { type: 'Section', name: 'Contact & Communication', href: '#contact', icon: Mail },
    { type: 'Project', name: 'SyncTransformer-Net: Deepfake Detection (97.5% Acc)', href: '#projects', icon: FolderGit2 },
    { type: 'Project', name: 'AgriVision: Crop Disease Detection SIH 2025', href: '#projects', icon: FolderGit2 },
    { type: 'Project', name: 'Work Management System (Spring Boot + Angular)', href: '#projects', icon: FolderGit2 },
    { type: 'Project', name: 'Library Management System (Spring Boot + JWT)', href: '#projects', icon: FolderGit2 },
    { type: 'Action', name: 'GitHub Profile (anushrutimalik)', href: data.personal.github, external: true, icon: Github },
    { type: 'Action', name: 'LinkedIn Profile (anushruti-malik)', href: data.personal.linkedin, external: true, icon: Linkedin },
  ];

  const filtered = query.trim() === ''
    ? items
    : items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.type.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item) => {
    sounds.playClick();
    onClose();
    if (item.external) {
      window.open(item.href, '_blank');
    } else {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0b0c12]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_30px_120px_-20px_rgba(56,189,248,0.15)] overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search sections, projects, resume..."
            className="w-full bg-transparent text-slate-100 text-[15px] font-medium focus:outline-none placeholder:text-slate-500"
          />
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              Nothing found for “{query}” — try a project, section, or “resume”
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:text-sky-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[14px] leading-snug font-medium text-slate-200 group-hover:text-white transition-colors">
                        {item.name}
                      </div>
                      <div className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                        {item.type}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Navigate & search</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500">ESC close</span>
            <span className="text-[10px] font-mono text-slate-500">⌘K toggle</span>
          </div>
        </div>

      </div>
    </div>
  );
}
