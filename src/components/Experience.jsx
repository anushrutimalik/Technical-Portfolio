import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Experience({ experiences }) {
  return (
    <section id="experience" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" /> WORK HISTORY // INTERNSHIPS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-400">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Hands-on software engineering and web development internships at top healthcare institutions and digital products.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-sky-500/30 pl-6 sm:pl-10 space-y-12 ml-2 sm:ml-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative group glass-panel p-6 sm:p-8 rounded-xl border border-white/10 hover:border-sky-500/40 transition-all duration-300 shadow-xl"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-[#050508] shadow-[0_0_12px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="text-sky-400 font-mono text-sm font-semibold mt-1">
                    {exp.role}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded border border-slate-700/60 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-900 px-3 py-1 rounded border border-slate-700/60 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <ul className="space-y-3 mb-6 text-sm text-slate-300">
                {exp.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Skill Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-slate-500 mr-2">TECH USED:</span>
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 font-mono text-[11px] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
