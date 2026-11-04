import React, { useState } from 'react';
import { Code2, Layers, Wrench, BookOpen, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Skills({ skills }) {
  const [activeTab, setActiveTab] = useState('languages');

  const categories = [
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'frameworks', label: 'Frameworks', icon: Layers },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'coursework', label: 'Coursework', icon: BookOpen },
  ];

  const renderBars = (items, dotClass, gradClass) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="card-2 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
              {item.name}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{item.tag}</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full ${gradClass}`}
              style={{ width: `${item.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="relative z-10 min-h-[100svh] flex items-center py-10">
      <div className="container-x w-full">

        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <span className="eyebrow">Skills</span>
            <h2 className="mt-3 t-section-title">
              Technical <span className="text-sky-300">proficiency</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
            Core CS foundations paired with enterprise backend engineering, frontend SPAs, and Java and Spring Boot delivery.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-2" role="tablist">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(cat.id);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950'
                    : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="card p-4 sm:p-5">
          {activeTab === 'languages' && renderBars(skills.languages, 'bg-sky-400', 'bg-gradient-to-r from-sky-400 to-sky-300')}
          {activeTab === 'frameworks' && renderBars(skills.frameworks, 'bg-sky-400', 'bg-gradient-to-r from-sky-400 to-sky-300')}

          {activeTab === 'tools' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.tools.map((item, idx) => (
                <div key={idx} className="card-2 p-3 text-center transition-colors hover:border-sky-400/30">
                  <div className="text-sm font-semibold text-slate-100">{item.name}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    {item.level}% proficient
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coursework' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {skills.coursework.map((subject, idx) => (
                <div
                  key={idx}
                  className="card-2 flex items-center gap-3 p-3 text-sm text-slate-200 transition-colors hover:border-sky-400/30"
                >
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="leading-snug">{subject}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
