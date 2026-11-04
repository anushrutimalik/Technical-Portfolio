import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import StardustButton from './StardustButton';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

export default function Contact({ personal }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // honeypot — humans never see this, bots fill it
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    sounds.playClick();
    setStatus('sending');
    setErrorMessage('');

    // No endpoint configured yet: fall back to the visitor's mail client
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(formState.subject || `Portfolio contact from ${formState.name}`);
      const body = encodeURIComponent(`${formState.message}\n\n— ${formState.name} (${formState.email})`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          _gotcha: formState._gotcha,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || `Form service responded with ${res.status}.`);
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Network error — check your connection and try again.');
      setStatus('error');
    }
  };

  const contactRows = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: 'Location', value: personal.location, href: null },
  ];

  return (
    <section id="contact" className="section-shell relative z-10">
      <div className="container-x">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="eyebrow">Contact</span>
          <h2 className="mt-3 t-section-title">
            Let's work <span className="text-sky-300">together</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl font-light leading-relaxed">
            Open to Java software engineering roles, full-stack collaborations, or just talking shop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* Direct contact card */}
          <div className="lg:col-span-5 card p-5">
            <span className="eyebrow">Direct lines</span>

            <div className="mt-6 space-y-4">
              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 text-sky-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-medium text-white hover:text-sky-300 transition-colors break-words"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="mt-1 font-medium text-white">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-6">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Message form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 card p-5 space-y-4">
            {status === 'success' && (
              <div className="flex items-center gap-2.5 rounded-xl border border-sky-400/30 bg-sky-400/10 p-4 text-sm text-sky-200" role="status">
                <CheckCircle className="w-5 h-5 text-sky-300 shrink-0" />
                Message sent — it landed in Anushruti's inbox. I'll get back to you shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">
                <AlertCircle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
                <span>
                  Couldn't send that — {errorMessage}{' '}
                  <a href={`mailto:${personal.email}`} className="underline font-semibold hover:text-rose-100">
                    Email directly instead
                  </a>.
                </span>
              </div>
            )}

            {/* Honeypot — invisible to humans, catches bots */}
            <input
              type="text"
              name="_gotcha"
              value={formState._gotcha}
              onChange={(e) => setFormState({ ...formState, _gotcha: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-slate-500">Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Sarah Connor"
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-slate-500">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="sarah@techcorp.com"
                  className="field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-slate-500">Subject</label>
              <input
                id="contact-subject"
                type="text"
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                placeholder="Full-Stack Java opportunity"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-[10px] font-mono uppercase tracking-widest text-slate-500">Message *</label>
              <textarea
                id="contact-message"
                rows="4"
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about the role or project..."
                className="field resize-none"
              />
            </div>

            <StardustButton
              type="submit"
              disabled={status === 'sending'}
              size="lg"
              className="w-full !h-12 !rounded-xl text-sm"
              innerClassName="text-sm"
              ariaLabel="Send message"
            >
              {status === 'sending' ? (
                <span>Sending…</span>
              ) : (
                <>
                  Send message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </StardustButton>
          </form>

        </div>
      </div>
    </section>
  );
}
