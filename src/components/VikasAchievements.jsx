import React from 'react';
import { Trophy } from 'lucide-react';

export default function VikasAchievements({ achievements }) {
  const badgeStyles = {
    'Winner': 'text-amber-300 border-amber-400/30 bg-amber-400/10',
    'Runner-Up': 'text-amber-300 border-amber-400/30 bg-amber-400/10',
    'Finalist': 'text-slate-300 border-white/15 bg-white/5',
    'Top 5% Contributor': 'text-sky-300 border-sky-400/30 bg-sky-400/10',
    'National Participant': 'text-slate-300 border-white/15 bg-white/5',
    'Leadership': 'text-sky-300 border-sky-400/30 bg-sky-400/10',
    'Academic Excellence': 'text-sky-300 border-sky-400/30 bg-sky-400/10',
  };

  return (
    <section id="achievements" className="section-shell relative z-20">
      <div className="container-x">

        {/* Header */}
        <div className="mb-8">
          <span className="eyebrow">Recognition</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
            Honors & <span className="text-sky-300">leadership</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Hackathon prizes, national programs, open-source work, and collegiate leadership.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, idx) => {
            const badge = badgeStyles[item.badge] ?? 'text-slate-300 border-white/15 bg-white/5';
            return (
              <div key={idx} className="card p-4 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${badge}`}>
                    <Trophy className="w-3.5 h-3.5" /> {item.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{item.year}</span>
                </div>

                <h3 className="mt-3 text-[15px] font-semibold text-white leading-snug">{item.title}</h3>
                <div className="mt-1 text-[11px] font-mono text-slate-500">{item.organization}</div>
                <p className="mt-2.5 text-[11px] leading-snug text-slate-400 font-light">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
