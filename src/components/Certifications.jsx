import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section-shell relative z-10">
      <div className="container-x">

        {/* Header */}
        <div className="mb-8">
          <span className="eyebrow">Credentials</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
            Certifications
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Credentials that complement the projects and experience above.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <div key={idx} className="card p-5 flex flex-col transition-colors hover:border-sky-400/25">
              <div className="w-10 h-10 rounded-xl border border-sky-400/25 bg-sky-400/10 flex items-center justify-center text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <h3 className="mt-4 font-semibold text-white leading-snug">{cert.name}</h3>
              <p className="mt-1.5 text-xs font-mono text-slate-500">{cert.issuer}</p>

              <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Completed {cert.year}
                </span>
                {cert.verifyUrl && cert.verifyUrl !== '#' && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Verify →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
