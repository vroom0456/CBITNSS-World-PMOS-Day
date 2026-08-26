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

  const recommendedSources = [
    {
      title: '1. International PMOS Guideline',
      sub: 'Monash University / International Evidence-Based Consensus',
      desc: 'International evidence-based guidance on assessment and management of PMOS.',
      url: 'https://www.monash.edu/medicine/sphpm/mchri/pcos/guideline'
    },
    {
      title: '2. PMOS Naming / International Consensus',
      sub: '2026 Medical Literature Update',
      desc: 'Evidence behind the 2026 terminology update from PCOS to PMOS.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/'
    },
    {
      title: '3. NHS (National Health Service)',
      sub: 'Patient & Health Education Portal',
      desc: 'Accessible patient-focused information about symptoms, diagnosis and treatment.',
      url: 'https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/'
    },
    {
      title: '4. Mayo Clinic',
      sub: 'Clinical & Patient Care Overview',
      desc: 'General medical information about symptoms, diagnosis and treatment.',
      url: 'https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353416'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">📚 Clinical Evidence Base</span>
            <h1 className="section-title">
              Research &amp; <span className="accent">Resources</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Clinical research citations and authoritative evidence-backed medical literature informing this initiative.
            </p>
          </div>
        </section>

        {/* RECOMMENDED SOURCES SECTION */}
        <section style={{ padding: '3rem 0 3.5rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌐 Authoritative Portals</span>
              <h2 className="section-title">Recommended <span className="accent">Sources</span></h2>
              <p className="section-desc">Trusted international medical guidelines and health organizations.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '1.2rem', justifyContent: 'center' }}>
              {recommendedSources.map((s, idx) => (
                <div key={idx} className="reveal" style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-light)', borderRadius: 'var(--r-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)', fontSize: '1.02rem', display: 'block', marginBottom: '0.2rem' }}>{s.title}</strong>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.6rem' }}>{s.sub}</span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                  <div style={{ marginTop: '1.2rem' }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sec-link"
                      style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      Visit Official Portal ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLINICAL CITATIONS SECTION */}
        <section id="citations" style={{ padding: '2rem 0 5rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🔬 Clinical Literature</span>
              <h2 className="section-title">Research &amp; <span className="accent">Clinical Citations</span></h2>
              <p className="section-desc">The medical evidence base powering this awareness campaign.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  title: '2023 International Evidence-Based Guideline — Monash University',
                  sub: 'Published in European Journal of Endocrinology & Human Reproduction.',
                  src: '2023 Monash Guideline',
                  srcDesc: 'Comprehensive international consensus guideline covering PMOS assessment, epidemiology (estimated 1 in 8 women affected), lifestyle recommendations, and emotional wellbeing as a core care component.'
                },
                {
                  title: 'Journal of Clinical Medicine (2023) — Singh et al.',
                  sub: 'Etiology, Current Management & Gut-Axis Therapeutics in PMOS.',
                  src: 'Journal of Clinical Medicine 2023',
                  srcDesc: 'Review covering Rotterdam criteria phenotypes, gut microbiome research, cellular second messengers, and exercise-induced metabolic benefit in PMOS.'
                }
              ].map((r, i) => (
                <div key={i} className="reveal" style={{ background: '#FFFFFF', padding: '1.4rem 1.6rem', borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)', display: 'block', fontSize: '0.96rem' }}>{r.title}</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-body)' }}>{r.sub}</span>
                  </div>
                  <button className="source-trigger-btn" onClick={() => openSourceModal(r.src, r.srcDesc)}>
                    Read Summary ⓘ
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
            <span className="modal-badge">📚 Citation Summary</span>
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
