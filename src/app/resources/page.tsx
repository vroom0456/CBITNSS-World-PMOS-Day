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
            <span className="section-tag">📚 Evidence Base &amp; Campus Kit</span>
            <h1 className="section-title">
              Research &amp; <span className="accent">Resources</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Access international clinical research citations powering this campaign, downloadable campus posters, factsheets, and offline QR codes.
            </p>
          </div>
        </section>

        {/* CLINICAL CITATIONS SECTION */}
        <section style={{ padding: '3rem 0 4rem', background: '#FFFFFF' }}>
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
                  srcDesc: 'Comprehensive international consensus guideline covering assessment, epidemiology (1 in 8 women), lifestyle, and emotional care.'
                },
                {
                  title: 'Journal of Clinical Medicine (2023) — Singh et al.',
                  sub: 'Etiology, Current Management & Gut-Axis Therapeutics in PMOS/PCOS.',
                  src: 'Journal of Clinical Medicine 2023',
                  srcDesc: 'Review covering 4 Rotterdam phenotypes, gut microbiome dysbiosis (DOGMA theory), inositols (40:1 MI:DCI ratio), and GLUT-4 exercise response.'
                },
                {
                  title: '2026 International Terminology Consensus',
                  sub: 'Multi-center agreement updating PCOS to PMOS (Polyendocrine Metabolic Ovarian Syndrome).',
                  src: '2026 PMOS Consensus',
                  srcDesc: 'Consensus paper explaining the rationale for replacing PCOS with PMOS to accurately reflect metabolic and endocrine factors.'
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

        {/* AWARENESS KIT & QR */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📣 Campus Toolkit</span>
              <h2 className="section-title">CBIT NSS <span className="accent">Awareness Kit &amp; QR</span></h2>
              <p className="section-desc">Take awareness offline. Share digital graphics or print posters across campus.</p>
            </div>

            <div className="row g-4 align-items-center">
              <div className="col-12 col-md-6">
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', padding: '2rem', borderRadius: 'var(--r-lg)', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.4rem' }}>📱</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Offline Awareness QR Code</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', margin: '0.4rem 0 1.2rem', lineHeight: 1.6 }}>
                  Scan to share this educational microsite directly on WhatsApp or Instagram.
                </p>
                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '16px', display: 'inline-block', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '130px', height: '130px', background: 'var(--nss-navy)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem', textAlign: 'center' }}>
                    SCAN FOR<br />PMOS 2026
                  </div>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1rem' }}>📥 Campaign Downloads</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    '📄 Printable A4 PMOS Factsheet (PDF)',
                    '📱 Instagram Story & Post Cards',
                    '💬 WhatsApp Campaign Poster',
                  ].map((item, i) => (
                    <li key={i} style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--nss-navy)' }}>{item}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>Download</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
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
