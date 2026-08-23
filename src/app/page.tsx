'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [sourceDrawerOpen, setSourceDrawerOpen] = useState(false);
  const [selectedSourceTitle, setSelectedSourceTitle] = useState('');
  const [selectedSourceContent, setSelectedSourceContent] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const openSourceModal = (title: string, content: string) => {
    setSelectedSourceTitle(title);
    setSelectedSourceContent(content);
    setSourceDrawerOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* ─── 1. HERO ─── */}
        <section id="hero">
          <div className="hero-container">
            {/* Brand badge */}
            <div className="nss-hero-badge">
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={18} height={18} priority />
              <span>CBIT NSS</span>
            </div>

            {/* Event info — single compact line */}
            <div className="hero-event-info">
              <span>📅 1st Sept 2026 · 10:00 AM</span>
              <span className="hero-event-sep">·</span>
              <span>📍 Assembly Hall, CBIT</span>
            </div>

            <h1 className="hero-h1">
              PCOS Uncovered:{' '}
              <span className="accent-text">Awareness, Understanding &amp; Empowerment</span>
            </h1>

            <p className="hero-desc">
              Polycystic Ovary Syndrome (PCOS) is a common hormonal condition affecting millions — yet often misunderstood or undiagnosed. This World PCOS Day, explore reliable information about causes, symptoms, diagnosis and management.
            </p>

            {/* CTA Row */}
            <div className="hero-cta-row">
              {/* Primary — ask anonymous */}
              <button
                className="btn-primary-cta"
                onClick={() => window.dispatchEvent(new Event('openModal'))}
              >
                Ask a Doctor Anonymously
              </button>

              {/* Secondary links */}
              <div className="hero-sec-links">
                <Link href="/understand" className="btn-sec-link">Understand PMOS</Link>
                <Link href="/self-test" className="btn-sec-link">Self-Check →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. STATISTICS ─── */}
        <section id="numbers">
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">Global Statistics</span>
              <h2 className="section-title">PMOS <span className="accent">By The Numbers</span></h2>
              <p className="section-desc">Sourced from the <em>2023 &amp; 2026 International Evidence-Based Guidelines (Monash)</em>.</p>
            </div>

            <div id="stats-banner">
              {[
                { num: '1 in 8', label: 'Reproductive Age Women', desc: 'Affects up to 13% of women worldwide, making it the most prevalent hormonal condition.', src: 'Monash Guideline 2023', srcDesc: 'Epidemiology data from 2023 International Evidence-Based Guideline for the Assessment and Management of PCOS/PMOS.' },
                { num: '170M+', label: 'Worldwide Impact', desc: 'Over 170 million individuals globally experience reproductive, metabolic, or emotional symptoms.', src: 'WHO & Monash Data 2026', srcDesc: 'Global burden statistics published by WHO and Monash University international research consensus.' },
                { num: '2026', label: 'Terminology Update', desc: 'International consensus renamed the condition "PMOS" to reflect multi-system metabolic and endocrine health.', src: '2026 PMOS Nomenclature Consensus', srcDesc: 'International terminology update clarifying that ovaries are not the sole origin of the condition.' },
              ].map((s, i) => (
                <div key={i} className="stat-box reveal">
                  <span className="num-val">{s.num}</span>
                  <div className="stat-box-text">
                    <h3>{s.label}</h3>
                    <p>{s.desc}</p>
                    <button className="source-trigger-btn" onClick={() => openSourceModal(s.src, s.srcDesc)}>
                      ⓘ Sources
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. CAMPAIGN NAV HUB ─── */}
        <section className="section section-alt">
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">Explore</span>
              <h2 className="section-title">Campaign <span className="accent">Sections</span></h2>
              <p className="section-desc">Each topic has its own dedicated page.</p>
            </div>

            <div className="nav-hub-grid">
              {[
                { num: '01', icon: '🔬', tag: 'Medical Guide',   title: 'Understand PMOS & 4 Pillars',    desc: 'Why the name changed from PCOS to PMOS and the four multi-system health pillars.', link: '/understand' },
                { num: '02', icon: '🩺', tag: 'Symptom Care',    title: 'Symptoms & Clinical Care',        desc: 'Evidence-based symptoms, exercise response, gut microbiome and lab evaluations.', link: '/symptoms' },
                { num: '03', icon: '📝', tag: 'Interactive Tool', title: '2-Minute Self-Check Wizard',     desc: 'A brief awareness questionnaire with tailored results and doctor pointers.', link: '/self-test' },
                { num: '04', icon: '💡', tag: 'Science Check',   title: 'Myths vs Facts & Care',          desc: 'Debunking fertility, diet, and weight myths with evidence-backed guidance.', link: '/myths' },
                { num: '05', icon: '🌸', tag: 'Student Privacy', title: 'Ask a Doctor Anonymously',       desc: '100% anonymous medical doubt submission answered live by certified gynaecologists.', link: '/ask' },
                { num: '06', icon: '📚', tag: 'Campus Kit',      title: 'Research & Campus Kit',          desc: 'Monash citations, printable posters and the offline QR reference kit.', link: '/resources' },
              ].map((card, idx) => (
                <a key={idx} href={card.link} className="nav-hub-row reveal">
                  <span className="nhr-icon">{card.icon}</span>
                  <span className="nhr-tag">{card.tag}</span>
                  <div className="nhr-content">
                    <span className="nhr-num">{card.num}</span>
                    <div className="nhr-text">
                      <strong className="nhr-title">{card.title}</strong>
                      <span className="nhr-desc">{card.desc}</span>
                    </div>
                  </div>
                  <span className="nhr-arrow" aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* SOURCE DRAWER */}
      {sourceDrawerOpen && (
        <div
          className="modal-overlay active"
          style={{ display: 'flex' }}
          onClick={() => setSourceDrawerOpen(false)}
        >
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">📚 Citation Source</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>{selectedSourceTitle}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{selectedSourceContent}</p>
            <button
              onClick={() => setSourceDrawerOpen(false)}
              style={{ marginTop: '1.5rem', background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.65rem 1.4rem', borderRadius: '10px', fontWeight: 800, width: '100%', cursor: 'pointer', border: 'none' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
