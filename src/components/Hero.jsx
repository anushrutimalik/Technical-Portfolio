import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Code2, Sparkles, Database, Brain, Laptop, Github, Linkedin, Mail } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Hero({ personal, stats, onOpenTerminal }) {
  const roles = [
    "Full-Stack Software Engineer",
    "AI & Deep Learning Researcher",
    "Spring Boot & Angular Architect",
    "Top Performer @ BVCOE (9.1 GPA)"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetRole.substring(0, displayText.length + 1));
        if (displayText === targetRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(targetRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <section id="about" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center cyber-grid overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/40 text-sky-400 text-xs font-mono shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>SYSTEM ONLINE // {personal.status}</span>
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 text-glow-sky">ANUSHRUTI</span>
              </h1>
              
              {/* Typewriter Role */}
              <div className="h-10 sm:h-12 flex items-center font-mono text-xl sm:text-2xl text-slate-300">
                <span className="text-sky-500 mr-2">&gt;</span>
                <span className="text-sky-300 font-semibold">{displayText}</span>
                <span className="w-2.5 h-6 bg-sky-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bio Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Computer Science undergraduate (<span className="text-sky-400 font-semibold font-mono">9.1 CGPA</span>) at Bharati Vidyapeeth's College of Engineering, New Delhi. 
              Experienced in building scalable healthcare backends with <span className="text-sky-300 font-semibold font-mono">Spring Boot & Spring AI</span> at AIIMS, high-throughput auth systems handling <span className="text-sky-300 font-semibold font-mono">10,000+ sessions</span>, and multi-modal deep learning architectures achieving <span className="text-rose-400 font-semibold font-mono">97.5% accuracy</span> in deepfake detection.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-sky-500 hover:from-sky-400 hover:to-sky-400 text-slate-950 font-bold tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  sounds.playOpenModal();
                  onOpenTerminal();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 border border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:border-sky-400 transition-all font-semibold cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>LAUNCH TERMINAL</span>
              </button>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sounds.playClick()}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => sounds.playClick()}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Code Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel rounded-xl p-5 border border-sky-500/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] font-mono text-xs text-slate-300 space-y-4">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-sky-500/80 inline-block" />
                  <span className="text-slate-400 text-[11px] ml-2">AnushrutiProfile.java</span>
                </div>
                <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                  JAVA 21 / SPRING AI
                </span>
              </div>

              {/* Code Snippet */}
              <div className="space-y-1.5 text-slate-300 leading-relaxed overflow-x-auto font-mono text-[11px] sm:text-xs">
                <p><span className="text-rose-400">@RestController</span></p>
                <p><span className="text-sky-400">public class</span> <span className="text-amber-300">SoftwareEngineer</span> &#123;</p>
                <p className="pl-4"><span className="text-purple-400">private final</span> String name = <span className="text-sky-300">"Anushruti"</span>;</p>
                <p className="pl-4"><span className="text-purple-400">private final</span> double cgpa = <span className="text-sky-300">9.1</span>;</p>
                <p className="pl-4"><span className="text-purple-400">private final</span> String[] stack = &#123; <span className="text-sky-300">"Spring Boot"</span>, <span className="text-sky-300">"Angular"</span>, <span className="text-sky-300">"React"</span>, <span className="text-sky-300">"PyTorch"</span> &#125;;</p>
                <br />
                <p className="pl-4"><span className="text-rose-400">@GetMapping</span>(<span className="text-sky-300">"/status"</span>)</p>
                <p className="pl-4"><span className="text-sky-400">public</span> ResponseEntity&lt;Map&lt;String, Object&gt;&gt; <span className="text-blue-300">getCapabilities</span>() &#123;</p>
                <p className="pl-8"><span className="text-sky-400">return</span> ResponseEntity.ok(Map.of(</p>
                <p className="pl-12"><span className="text-sky-300">"internships"</span>, List.of(<span className="text-sky-300">"AIIMS EHS Portal"</span>, <span className="text-sky-300">"Mama's Baby Lounge"</span>),</p>
                <p className="pl-12"><span className="text-sky-300">"hackathons"</span>, <span className="text-sky-300">"1st Prize Technovate '26 | SIH Finalist"</span>,</p>
                <p className="pl-12"><span className="text-sky-300">"deepfakeMLAccuracy"</span>, <span className="text-sky-300">"97.5%"</span></p>
                <p className="pl-8">));</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>

              {/* Bottom Quick Badges */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px]">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                  <Database className="w-3 h-3 text-sky-400" /> PostgreSQL / MySQL
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-sky-400" /> Wav2Vec2 / CNN-LSTM
                </span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                  <Laptop className="w-3 h-3 text-rose-400" /> JWT Auth / REST
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Key Metrics Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 sm:p-5 rounded-xl border border-white/10 hover:border-sky-500/40 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400 group-hover:text-glow-sky transition-all">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
