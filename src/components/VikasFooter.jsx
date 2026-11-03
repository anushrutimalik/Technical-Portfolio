import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, ArrowUp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function VikasFooter({ personal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#04060d]/80 backdrop-blur-2xl border-t border-sky-300/15 text-slate-400 font-sans overflow-hidden shadow-[0_-20px_60px_-30px_rgba(56,189,248,0.35)] min-h-[calc(100svh-4rem)] flex flex-col justify-center py-24">


      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          {/* Headline CTA */}
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              From concept to creation, <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 bg-clip-text text-transparent">let's make it happen.</span>
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Looking for a high-performing Full-Stack & AI Software Engineer for your team or product? Get in touch.
            </p>
          </div>

          {/* Email Copy Box & Socials */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            
            {/* Email Pill */}
            <div className="inline-flex items-center justify-between p-2.5 rounded-2xl border border-sky-300/20 bg-sky-300/[0.06] backdrop-blur-md">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 px-3 text-slate-200 font-mono text-sm font-bold hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{personal.email}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-sky-300/10 text-slate-300 hover:text-white hover:bg-sky-300/20 transition-all cursor-pointer"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-sky-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-2 justify-center">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-3 rounded-2xl bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-sky-300/40 transition-all"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="p-3 rounded-2xl bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-sky-300/40 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <button
                onClick={scrollToTop}
                className="p-3 rounded-2xl bg-sky-300 text-slate-950 hover:bg-sky-200 transition-all cursor-pointer shadow-[0_0_18px_rgba(125,211,252,0.4)]"
                title="Scroll to Top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* Copyright Footer */}
        <div className="pt-12 mt-14 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Anushruti — All rights reserved.
          </div>
          <div className="flex items-center gap-2.5 text-slate-400">
            <span>B.Tech CSE (9.1 CGPA)</span>
            <span className="text-sky-400">✦</span>
            <span>AIIMS & Mama's Baby Lounge Alum</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
