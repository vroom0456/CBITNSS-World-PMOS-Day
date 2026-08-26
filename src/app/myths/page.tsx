'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export interface MythItem {
  id: string;
  myth: string;
  fact: string;
  why: string;
  evidenceTitle: string;
  evidenceUrl: string;
}

const mythsList: MythItem[] = [
  {
    id: 'm1',
    myth: 'PMOS means you can never get pregnant.',
    fact: 'PMOS does not mean infertility.',
    why: 'PMOS can affect ovulation, which may make conception more difficult for some people. However, PMOS does not mean infertility. Many people with PMOS can conceive naturally or with medical support.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm2',
    myth: 'PMOS is defined by three core components: hormones, metabolism, and emotional wellbeing.',
    fact: 'PMOS is a complex condition that can affect reproductive, metabolic, psychological and other aspects of health.',
    why: 'Its effects can vary considerably from person to person, which is why care should be individualized. International guidelines also highlight cardiovascular, dermatological, and sleep-related features.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm3',
    myth: 'A 7-day diet or herbal tea can cure PMOS.',
    fact: 'There is no proven 7-day cure for PMOS.',
    why: 'Management is individualized and may include healthy lifestyle behaviours, symptom-specific treatment and medical care.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm4',
    myth: 'Lean PMOS is often driven by stress, adrenal or genetic factors.',
    fact: 'PMOS can affect people of all body sizes. Body weight is not a diagnostic requirement.',
    why: 'Symptoms can occur regardless of weight. Assuming someone\'s weight explains their symptoms can contribute to delayed recognition and appropriate care.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm5',
    myth: 'PMOS means you have ovarian cysts.',
    fact: 'The name doesn\'t mean that cysts are required for PMOS.',
    why: 'The ovarian appearance reflects arrested follicular development rather than pathological cysts. This is part of the reason for the terminology update to PMOS.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm6',
    myth: 'Having irregular periods means you have PMOS.',
    fact: 'Irregular periods can have many causes. PMOS requires appropriate clinical assessment.',
    why: 'The guideline uses specific diagnostic criteria and requires other causes to be excluded. It is important not to self-diagnose.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm7',
    myth: 'PMOS is just a fertility problem.',
    fact: 'PMOS can affect much more than reproductive health.',
    why: 'In addition to fertility, PMOS can affect metabolic, psychological, cardiovascular, skin and sleep-related aspects of health.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm8',
    myth: 'You can tell whether someone has PMOS just by looking at them.',
    fact: 'PMOS affects individuals across all body types and physical appearances.',
    why: 'PMOS occurs across all body sizes. Having a lower body weight does not rule out PMOS, and weight should not be used alone to determine whether someone has the condition.',
    evidenceTitle: '2026 International PMOS Guideline ↗',
    evidenceUrl: '/resources#citations'
  }
];

export default function MythsPage() {
  const [expandedMyth, setExpandedMyth] = useState<string | null>(null);
  const [exploredIds, setExploredIds] = useState<string[]>([]);

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

  const toggleMyth = (id: string) => {
    setExpandedMyth(prev => prev === id ? null : id);
    if (!exploredIds.includes(id)) {
      setExploredIds(prev => [...prev, id]);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* ── 01 HEADER ── */}
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="myths-heading">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-tag reveal">Evidence-based clarifications</span>
            <h1 id="myths-heading" className="section-title reveal" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
              Myths vs <span className="accent">Facts</span>
            </h1>
            <p className="section-desc reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Common misunderstandings about PMOS (formerly known as PCOS).
            </p>
          </div>
        </section>

        {/* ── 02 INTERACTIVE MYTHS ACCORDION ── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5% clamp(2.5rem, 6vw, 4rem)', background: '#FFFFFF' }} aria-labelledby="myths-list-heading">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>

            <h2 id="myths-list-heading" className="sr-only">List of PMOS myths and facts</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }} role="list">
              {mythsList.map(m => {
                const isExpanded = expandedMyth === m.id;

                return (
                  <div
                    key={m.id}
                    className={`myth-card-expandable ${isExpanded ? 'is-expanded' : ''}`}
                    role="listitem"
                  >
                    <button
                      className="myth-expand-btn"
                      onClick={() => toggleMyth(m.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`myth-body-${m.id}`}
                      id={`myth-trigger-${m.id}`}
                    >
                      <div style={{ flex: 1 }}>
                        

                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                          ❌ MYTH
                        </span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', lineHeight: 1.4, margin: 0 }}>
                          &ldquo;{m.myth}&rdquo;
                        </h3>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, marginTop: '0.2rem' }}>
                        <span className="d-none d-sm-inline" style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--soft-teal-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {isExpanded ? 'Hide' : 'Tap to reveal'}
                        </span>
                        <span
                          style={{ fontSize: '0.9rem', color: 'var(--soft-teal-accent)', transition: 'transform 0.25s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          aria-hidden="true"
                        >
                          ▼
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div
                        id={`myth-body-${m.id}`}
                        role="region"
                        aria-labelledby={`myth-trigger-${m.id}`}
                      >
                        <div className="myth-body-content">
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.35rem' }}>
                            ✓ CLINICAL FACT
                          </span>
                          <p style={{ fontWeight: 800, color: 'var(--nss-navy)', fontSize: '1.02rem', marginBottom: '0.6rem', lineHeight: 1.5 }}>
                            {m.fact}
                          </p>

                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>
                            WHY IT MATTERS &amp; MEDICAL EVIDENCE
                          </span>
                          <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '1.1rem' }}>
                            {m.why}
                          </p>

                          {/* EVIDENCE & ANONYMOUS ACTION ROW */}
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px dashed var(--border-light)' }}>
                            <Link href={m.evidenceUrl} className="myth-evidence-link">
                              🔗 {m.evidenceTitle}
                            </Link>
                            <Link href="/ask" className="myth-action-link">
                              💬 Still unsure? Ask anonymously →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 03 RECAP & SEAMLESS LEARNING JOURNEY ── */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="myths-journey-heading">
          <div style={{ maxWidth: '720px', margin: '0 auto' }} className="reveal">
            <span className="section-tag">Key takeaway</span>
            <h2 id="myths-journey-heading" className="section-title" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', marginBottom: '0.75rem' }}>
              What should you remember?
            </h2>
            <p className="section-desc" style={{ maxWidth: '580px', margin: '0 auto 2rem' }}>
              PMOS is common, manageable, and highly individual. Understanding evidence-backed facts empowers you to have clearer, more productive conversations with your healthcare provider.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/ask" className="btn-primary-cta">
                Ask an Anonymous Question →
              </Link>
              <Link href="/resources" className="btn-sec-link">
                Research &amp; Clinical Citations →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
