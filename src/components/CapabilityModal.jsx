import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Briefcase, FolderGit2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const DETAILS = {
  'Backend': {
    summary:
      'Java + Spring Boot services that survive real traffic: REST APIs, JWT-secured access, Hibernate/JPA persistence with query-level tuning, unit tests, and Agile delivery end to end.',
    applied: [
      { name: 'AIIMS — EHS Portal', meta: 'Software Engineer Intern · Jun–Aug 2026', note: 'Card registration module in Spring Boot + JSP serving 100,000+ members; ER/DFD/Use-Case workflows, unit testing, Agile delivery.', tech: ['Spring Boot', 'JSP', 'Angular', 'Unit Testing'] },
      { name: 'Work Management System', meta: 'Project · Jan–Feb 2026', note: 'Highly scalable task portal — RBAC, real-time status tracking, RESTful APIs on a microservices architecture with AWS CI/CD.', tech: ['Spring Boot', 'PostgreSQL', 'AWS', 'CI/CD'] },
      { name: 'Library Management System', meta: 'Project · Feb–Mar 2026', note: 'Inventory, issuance and records automation with JWT auth; tuned queries cut search latency by 30%.', tech: ['Spring Boot', 'MySQL', 'JWT'] },
    ],
  },
  'Frontend': {
    summary:
      'Angular + TypeScript single-page apps with measured outcomes — fast renders, accessible UI, real analytics. I iterate on UX with Google Analytics, not vibes.',
    applied: [
      { name: "Mama's Baby Lounge", meta: 'Web Development Intern · Jul–Sep 2025', note: 'Dynamic React landing page that lifted engagement by 25% (measured with Google Analytics); JWT auth for 10,000+ concurrent sessions in Scrum sprints.', tech: ['React', 'JWT', 'Google Analytics'] },
      { name: 'RPG Websolutions', meta: 'Web Design & Development Intern · Jul 2025', note: 'Homepage redesign spanning 15+ client modules — 45% load-time reduction, 35% mobile-traffic surge through optimized responsive CSS.', tech: ['CSS', 'Lazy Loading', 'Responsive'] },
      { name: 'AIIMS — EHS Portal', meta: 'Software Engineer Intern · Jun–Aug 2026', note: 'Angular views for the card registration flow used by medical staff managing digital health records.', tech: ['Angular', 'TypeScript', 'JSP'] },
    ],
  },
  'Microservices': {
    summary:
      'Service decomposition with clear contracts: RBAC boundaries, real-time status sync, containerised CI/CD to AWS, and APIs that stay boring under load.',
    applied: [
      { name: 'Work Management System', meta: 'Project · Jan–Feb 2026', note: 'Microservices-flavoured decomposition — auth, tasks, and notifications as REST services behind RBAC, with CI/CD pipelines to AWS.', tech: ['Spring Boot', 'REST', 'RBAC', 'AWS'] },
      { name: 'Library Management System', meta: 'Project · Feb–Mar 2026', note: 'Auth and inventory services sharing a MySQL store; JWT validation centralised for both user roles.', tech: ['Spring Boot', 'JWT', 'MySQL'] },
      { name: 'AIIMS — EHS Portal', meta: 'Software Engineer Intern · Jun–Aug 2026', note: 'Componentised card-registration flow delivered inside a large existing healthcare system under Agile ceremonies.', tech: ['Spring Boot', 'Agile', 'Scrum'] },
    ],
  },
  'Databases': {
    summary:
      'Schema-first thinking: ER modelling, indexing, query optimisation, and integrity constraints — PostgreSQL, MySQL, and MongoDB in production contexts.',
    applied: [
      { name: 'Work Management System', meta: 'Project · Jan–Feb 2026', note: 'PostgreSQL schema for tasks, teams and RBAC; indexed for sub-100ms dashboard reads across active sprints.', tech: ['PostgreSQL', 'Indexing'] },
      { name: 'Library Management System', meta: 'Project · Feb–Mar 2026', note: 'MySQL schema for catalogue, issuance and members — query rewrite and indexing cut search latency by 30%.', tech: ['MySQL', 'Query Tuning'] },
      { name: 'AIIMS — EHS Portal', meta: 'Software Engineer Intern · Jun–Aug 2026', note: 'ER and DFD models drive the 100,000+ member records design; data integrity rules documented before build.', tech: ['ER Design', 'DFD'] },
    ],
  },
  'Full-Stack': {
    summary:
      'One engineer from schema to shipped UI — backend services, database design, frontend SPAs, and the deployment path. The goal is always the same: something that works in prod.',
    applied: [
      { name: 'Work Management System', meta: 'Project · Jan–Feb 2026', note: 'End-to-end: Angular UI → Spring Boot services → PostgreSQL on AWS with CI/CD; RBAC across manager and member views.', tech: ['Java', 'Spring Boot', 'Angular'] },
      { name: 'Library Management System', meta: 'Project · Feb–Mar 2026', note: 'Full-stack delivery solo: schema, APIs, frontend, JWT auth — production-quality and measurably faster.', tech: ['Spring Boot', 'Angular', 'MySQL'] },
      { name: 'Three internships, one arc', meta: 'AIIMS · Mama\'s Baby Lounge · RPG Websolutions', note: 'Frontend-heavy → auth/security → backend/enterprise. Each role levelled up the same stack.', tech: ['React', 'Angular', 'Spring Boot'] },
      { name: 'Smart India Hackathon 2025', meta: 'SIH · Sep–Oct 2025', note: 'AgriVision — hybrid CNN-LSTM on 50,000+ crop images, 96.8% accuracy across 15 disease classes; shipped under hackathon pressure.', tech: ['Python', 'PyTorch'] },
    ],
  },
};

export default function CapabilityModal({ capability, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!capability) return null;
  const detail = DETAILS[capability.label] ?? {
    summary: capability.desc,
    applied: [],
  };

  const scrollToProjects = () => {
    sounds.playClick();
    onClose();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1200] bg-black/75 backdrop-blur-xl flex items-start sm:items-center justify-center overflow-y-auto p-3 sm:p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={capability.label}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[calc(100svh_-_1.5rem)] sm:max-h-[calc(100svh_-_2rem)] overflow-hidden rounded-3xl border border-sky-300/15 bg-[#0b0c12]/95 shadow-[0_30px_120px_-20px_rgba(125,211,252,0.22)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />

        {/* Header */}
        <div className="relative shrink-0 px-5 sm:px-6 pt-5 pb-4 border-b border-white/[0.07] flex items-start gap-4">
          <div className="min-w-0">
            <span className="eyebrow">Capability · {capability.index}</span>
            <h3 className="mt-2.5 font-display text-2xl sm:text-3xl text-white tracking-tight leading-tight">
              {capability.label}
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="ml-auto shrink-0 rounded-full border border-white/10 p-2 text-slate-400 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/50"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-4">
          <p className="text-sm leading-[1.7] text-slate-300 font-light">{detail.summary}</p>

          <h4 className="eyebrow mt-5"><FolderGit2 className="w-3.5 h-3.5" /> Where I've applied it</h4>
          <ul className="mt-3 space-y-2.5">
            {detail.applied.map((item, idx) => (
              <li key={idx} className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-[13px] font-semibold text-white">{item.name}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{item.meta}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 font-light">{item.note}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 flex items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-5 sm:px-6 py-3.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <Briefcase className="w-3.5 h-3.5" /> Resume-backed
          </span>
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-sky-200 transition-colors"
          >
            See the work
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
