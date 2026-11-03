import React, { useState, useEffect, useRef } from 'react';
import { Home, Briefcase, FolderGit2, Code2, Trophy, Mail, Github, Linkedin, Search, Terminal, Music, Pause } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const SIGNT = 'qN4ooNx77u0'; // Harry Styles — Sign of the Times (official video ID)

export default function FloatingDock({ personal, onOpenSearch, onOpenTerminal, musicEnabled = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [moonHint, setMoonHint] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const wantedRef = useRef(false);
  const musicEnabledRef = useRef(false);

  // Boot the hidden YouTube player once. pause/play preserves the position,
  // so "turning off" the music and turning it back on resumes where it stopped.
  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || playerRef.current || !window.YT || !window.YT.Player) return;
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: SIGNT,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: SIGNT,
          controls: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            try {
              e.target.setVolume(55);
            } catch {
              /* ignore */
            }
            if (wantedRef.current) {
              try {
                e.target.playVideo();
              } catch {
                /* autoplay may be blocked; user gesture will retry */
              }
            }
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 0 = ended (looped anyway)
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        createPlayer();
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.body.appendChild(tag);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleMusic = () => {
    const player = playerRef.current;
    // Music may only start after the moon has been clicked.
    if (!musicEnabledRef.current) {
      setMoonHint(true);
      window.setTimeout(() => setMoonHint(false), 2400);
      return;
    }
    if (!player) return; // still loading
    try {
      if (playing) {
        player.pauseVideo();
        wantedRef.current = false;
        setPlaying(false);
      } else {
        player.playVideo();
        wantedRef.current = true;
        setPlaying(true);
      }
    } catch {
      /* ignore */
    }
  };

  // The moon click is the only thing that starts the music.
  useEffect(() => {
    musicEnabledRef.current = musicEnabled;
    if (!musicEnabled) return;
    const player = playerRef.current;
    wantedRef.current = true;
    if (player && player.playVideo) {
      try {
        player.playVideo();
        setPlaying(true);
      } catch {
        /* blocked — retried via the moon click gesture path */
      }
    }
  }, [musicEnabled]);

  const dockItems = [
    { label: 'Home', href: '#about', icon: Home },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Skills', href: '#skills', icon: Code2 },
    { label: 'Achievements', href: '#achievements', icon: Trophy },
    { label: 'Contact', href: '#contact', icon: Mail },
    { label: 'CLI Terminal', action: 'terminal', icon: Terminal },
    { label: 'Search ⌘K', action: 'search', icon: Search },
    { label: musicEnabled ? (playing ? 'Pause “Sign of the Times”' : 'Play “Sign of the Times”') : 'The moon starts the music 🌕', action: 'music', icon: playing ? Pause : Music, active: playing },
    { label: 'GitHub', href: personal.github, external: true, icon: Github },
    { label: 'LinkedIn', href: personal.linkedin, external: true, icon: Linkedin },
  ];

  const handleClick = (e, item) => {
    sounds.playClick();
    if (item.action === 'search') {
      e.preventDefault();
      onOpenSearch();
    } else if (item.action === 'music') {
      e.preventDefault();
      toggleMusic();
    } else if (item.action === 'terminal') {
      e.preventDefault();
      onOpenTerminal();
    } else if (item.external) {
      // open external URL
    } else if (item.href) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* Moon-gate hint */}
      {moonHint && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sky-300/30 bg-[#090b10]/90 px-4 py-1.5 text-[11px] font-medium text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.35)] animate-fadeIn pointer-events-none">
          Click the moon 🌕 first — it starts the music
        </div>
      )}

      {/* Dock Outer Glow */}
      <div className="absolute -inset-2 rounded-full bg-white/5 blur-xl pointer-events-none" />

      {/* Dock Bar */}
      <div className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-full bg-[#07090e]/85 backdrop-blur-2xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip Label */}
              {isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#090b10] border border-white/20 text-[10px] font-mono font-semibold text-white whitespace-nowrap shadow-xl pointer-events-none animate-fadeIn">
                  {item.label}
                </div>
              )}

              {/* Dock Icon Button */}
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleClick(e, item)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered
                      ? 'scale-125 bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                      : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={(e) => handleClick(e, item)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'scale-125 bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                      : item.active
                        ? 'bg-sky-300 text-slate-950 border border-sky-200 shadow-[0_0_18px_rgba(186,230,253,0.55)] animate-pulse'
                        : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Hidden background player — “Sign of the Times” by Harry Styles (official embed).
          pause/play keeps the playback position so it resumes where you stopped it. */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute -left-[9999px] top-0 h-px w-px opacity-0 pointer-events-none"
      />
    </div>
  );
}
