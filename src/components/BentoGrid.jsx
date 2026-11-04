import React, { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import CapabilityModal from './CapabilityModal';

const capabilities = [
  { label: 'Backend', index: '01', desc: 'Spring Boot REST services with JWT auth, Hibernate/JPA persistence, and PostgreSQL tuned at the query level.' },
  { label: 'Frontend', index: '02', desc: 'Angular & TypeScript SPAs — fast, accessible, production-grade interfaces.' },
  { label: 'Microservices', index: '03', desc: 'API design, service decomposition, and JWT-secured endpoints on Spring Boot.' },
  { label: 'Databases', index: '04', desc: 'PostgreSQL, MySQL and MongoDB — schema design, indexing, and query optimization.' },
  { label: 'Full-Stack', index: '05', desc: 'From schema to shipped — one engineer across the whole delivery path.' },
];

const stackGroups = [
  { label: 'Backend', items: ['Java', 'Spring Boot', 'Hibernate', 'Maven', 'JSP'] },
  { label: 'Frontend', items: ['Angular', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs'] },
  { label: 'Tooling', items: ['Git & GitHub', 'CI/CD', 'AWS', 'Figma'] },
];

export default function BentoGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="how-i-work" aria-label="How I work" className="section-shell relative z-20">
      <div className="container-x">

        {/* Section header */}
        <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/[0.07] pb-6">
          <div>
            <span className="eyebrow">What I do</span>
            <h2 className="mt-4 t-section-title">
              How I <span className="text-sky-300">work</span>
            </h2>
          </div>
          <p className="hidden sm:block max-w-[180px] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-slate-600">
            Capabilities<br />and daily stack
          </p>
        </div>

        {/* Split editorial panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a0e]/60">

          {/* Left — interactive capability index */}
          <div className="md:col-span-7 p-6 sm:p-8">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
              <span>Capabilities</span>
              <span>01—05</span>
            </div>

            <ul className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.07]">
              {capabilities.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSelected(item);
                    }}
                    aria-haspopup="dialog"
                    className="group flex w-full items-center gap-5 py-4 text-left focus:outline-none focus-visible:bg-white/[0.03]"
                  >
                    <span className="font-mono text-[11px] text-slate-600 transition-colors duration-200 group-hover:text-sky-400">
                      {item.index}
                    </span>
                    <span className="font-display text-xl sm:text-2xl tracking-tight text-slate-500 transition-colors duration-200 group-hover:text-slate-100">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 -translate-x-1 translate-y-1 text-slate-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-80"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex min-h-[3rem] items-start gap-2.5 text-sm font-light leading-relaxed text-slate-500">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70" aria-hidden="true" />
              Tap any capability — a detail card opens with the work where I've used it.
            </p>
          </div>

          {/* Right — grouped daily stack */}
          <div className="md:col-span-5 flex flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
              <span>What I use</span>
              <span>Daily</span>
            </div>

            <dl className="mt-5 divide-y divide-white/[0.06] border-y border-white/[0.07]">
              {stackGroups.map((group) => (
                <div key={group.label} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4">
                  <dt className="pt-0.5 font-mono text-[10px] uppercase leading-4 tracking-[0.18em] text-slate-600">
                    {group.label}
                  </dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="text-[13px] leading-5 text-slate-300">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex items-end justify-between gap-6 border-t border-white/[0.07] pt-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">Availability</p>
                <p className="mt-2 text-sm font-semibold text-white">Open to full-time roles · 2026/27</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <MapPin className="h-3 w-3" /> New Delhi · UTC+5:30
                </p>
              </div>

              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Capability detail card */}
      {selected && <CapabilityModal capability={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
