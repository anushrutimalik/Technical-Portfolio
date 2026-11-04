import React, { useState } from 'react';
import { Eye, ArrowUpRight, Github } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import StardustButton from './StardustButton';

export default function VikasProjects({ projects, onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Full Stack', 'Machine Learning'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-shell relative z-20">
      <div className="container-x">

        {/* Header */}
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="mt-3 t-section-title">
              Featured <span className="text-sky-300">projects</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Full-stack systems with Spring Boot, Angular and PostgreSQL — built, shipped and benchmarked.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(filter);
                }}
                aria-pressed={activeFilter === filter}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-white text-slate-950'
                    : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className="card p-5 flex flex-col transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Meta */}
              <div className="flex items-center justify-between gap-4">
                <span className="chip uppercase">{project.category}</span>
                <span className="font-mono text-xs text-slate-500">{String(idx + 1).padStart(2, '0')} / {project.year}</span>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {project.title}
              </h3>

              <p className="mt-3 text-[13px] text-slate-400 leading-relaxed font-light">
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <span key={i} className="chip">{t}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between gap-4">
                <StardustButton
                  size="sm"
                  onClick={() => {
                    sounds.playOpenModal();
                    onSelectProject(project);
                  }}
                  ariaLabel={`Open case study for ${project.title}`}
                >
                  Case study
                  <Eye className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </StardustButton>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-2.5 rounded-lg text-slate-400 hover:text-white border border-white/[0.08] hover:border-white/20 transition-all"
                    aria-label="View on GitHub"
                    title="View on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="p-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-all"
                      aria-label="Open live demo"
                      title="Live demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
