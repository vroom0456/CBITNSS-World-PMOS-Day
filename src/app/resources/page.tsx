'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ResourcesPage() {
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
      <main style={{ paddingTop: '80px' }}>

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">📚 Clinical Evidence Base</span>
            <h1 className="section-title">
              Research &amp; <span className="accent">Resources</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Clinical research citations and evidence-backed medical literature informing this initiative.
            </p>
          </div>
        </section>

        {/* CLINICAL CITATIONS SECTION */}
        <section style={{ padding: '3rem 0 5rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🔬 Clinical Evidence</span>
              <h2 className="section-title">Research &amp; <span className="accent">Clinical Citations</span></h2>
              <p className="section-desc">The medical evidence base powering this awareness campaign.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  title: '2023 International Evidence-Based Guideline — Monash University',
                  sub: 'Published in European Journal of Endocrinology & Human Reproduction.',
                  src: '2023 Monash Guideline',
                  srcDesc: 'Comprehensive international consensus guideline covering PCOS assessment, epidemiology (estimated 1 in 8 women affected), lifestyle recommendations, and emotional wellbeing as a core care component.'
                },
                {
                  title: 'Journal of Clinical Medicine (2023) — Singh et al.',
                  sub: 'Etiology, Current Management & Gut-Axis Therapeutics in PCOS.',
                  src: 'Journal of Clinical Medicine 2023',
                  srcDesc: 'Review covering the four Rotterdam PCOS phenotypes, gut microbiome research (DOGMA theory), inositol supplementation (40:1 MI:DCI ratio evidence), and exercise-induced metabolic benefit in PCOS.'
                }
              ].map((r, i) => (
                <div key={i} style={{ background: 'var(--soft-teal-bg)', padding: '1.4rem 1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)', display: 'block', fontSize: '0.96rem' }}>{r.title}</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-body)' }}>{r.sub}</span>
                  </div>
                  <button className="source-trigger-btn" onClick={() => openSourceModal(r.src, r.srcDesc)}>
                    Read Abstract ⓘ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* SOURCE DRAWER MODAL */}
      {sourceDrawerOpen && (
        <div className="modal-overlay active" style={{ display: 'flex' }} onClick={() => setSourceDrawerOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">📚 Citation Source</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>{selectedSourceTitle}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.7 }}>{selectedSourceContent}</p>
            <button
              onClick={() => setSourceDrawerOpen(false)}
              className="btn-modal-close-action"
            >
              Close Citation
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
