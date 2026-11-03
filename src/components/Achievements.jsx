import React from 'react';
import { Award, Trophy, Star, Users, Sparkles, GraduationCap } from 'lucide-react';

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-white/5 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs">
            <Trophy className="w-3.5 h-3.5" /> HONORS & LEADERSHIP // RECOGNITIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hackathons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-400">Leadership</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            National hackathon awards, top-tier open-source contributions, academic excellence, and society leadership.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-xl border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> {item.badge}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{item.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Organization */}
                <div className="text-xs font-mono text-sky-400 mb-3">
                  {item.organization}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Line */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>VERIFIED RECORD</span>
                <span className="text-sky-400">&gt;_ OFFICIALLY RECOGNIZED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
