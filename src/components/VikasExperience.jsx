import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function VikasExperience({ experiences }) {
  return (
    <section id="experience" className="section-shell relative z-20">
      <div className="container-x">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="eyebrow">Experience</span>
          <h2 className="mt-3 t-section-title">
            Where I've <span className="text-sky-300">built</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Software engineering internships focused on scalable backends, high-speed frontends, and shipping reliable systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/[0.08] space-y-4 ml-1">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative card p-5 transition-all duration-300"
            >
              {/* Node */}
              <div className="absolute -left-[31px] sm:-left-[45px] top-8 h-3 w-3 rounded-full bg-sky-400 ring-4 ring-[#07070c]" aria-hidden="true" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 pb-4 border-b border-white/[0.06]">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{exp.company}</h3>
                  <p className="mt-1 text-sm font-medium text-sky-400">{exp.role}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip"><Calendar className="w-3.5 h-3.5" /> {exp.period}</span>
                  <span className="chip"><MapPin className="w-3.5 h-3.5" /> {exp.location}</span>
                </div>
              </div>

              <ul className="mt-3 space-y-2 text-[13px] text-slate-300 font-light">
                {exp.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-400/90 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                <span className="mr-1 text-[10px] font-mono uppercase tracking-widest text-slate-600">Stack</span>
                {exp.skills.map((skill, idx) => (
                  <span key={idx} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
