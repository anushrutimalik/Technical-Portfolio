import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Layers, Code } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = project ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-3xl my-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c12]/95 shadow-[0_30px_120px_-20px_rgba(56,189,248,0.25)]">

        {/* Header */}
        <div className="relative px-6 sm:px-8 pt-7 pb-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
              {project.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{project.year}</span>
          </div>

          <h3 className="mt-4 pr-10 font-display text-3xl sm:text-4xl text-white leading-[1.05]">
            {project.title}
          </h3>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute right-5 top-6 rounded-full border border-white/10 p-2 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto px-6 sm:px-8 py-7">
          <section>
            <h4 className="eyebrow"><Cpu className="w-3.5 h-3.5" /> Overview</h4>
            <p className="mt-3 text-[15px] leading-[1.75] text-slate-300 font-light">
              {project.summary}
            </p>
          </section>

          <hr className="hairline my-7" />

          <section>
            <h4 className="eyebrow"><CheckCircle2 className="w-3.5 h-3.5" /> Engineering highlights</h4>
            <ul className="mt-4 space-y-2.5">
              {project.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span className="text-[14px] leading-relaxed text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="hairline my-7" />

          <section>
            <h4 className="eyebrow"><Layers className="w-3.5 h-3.5" /> Architecture</h4>
            <p className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-[14px] leading-[1.75] text-slate-300 font-light">
              {project.architecture}
            </p>
          </section>

          <section className="mt-7">
            <h4 className="eyebrow"><Code className="w-3.5 h-3.5" /> Technologies</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="chip">{t}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-6 sm:px-8 py-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Case study</span>

          <div className="flex items-center gap-2.5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            >
              <Github className="w-3.5 h-3.5" /> Source
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-slate-200"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live demo
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
