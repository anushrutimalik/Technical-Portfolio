import React, { useState } from 'react';
import { FolderGit2, Github, ExternalLink, Eye, Cpu, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Projects({ projects, onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Full Stack', 'Machine Learning'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative z-10 border-t border-white/5 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs">
              <FolderGit2 className="w-3.5 h-3.5" /> FEATURED PROJECTS // CASE STUDIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Software Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-400">Deployments</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Full-stack enterprise applications and enterprise full-stack systems engineered for performance and precision.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(filter);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-xl p-6 sm:p-8 border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-sky-500 to-rose-500 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs font-bold uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-sky-400" /> {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs">
                <button
                  onClick={() => {
                    sounds.playOpenModal();
                    onSelectProject(project);
                  }}
                  className="flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> CASE STUDY &gt;
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                    title="View Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sounds.playClick()}
                    className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                    title="Live Demo / HuggingFace"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
