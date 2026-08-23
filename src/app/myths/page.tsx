'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const mythsList = [
  {
    id: 'm1',
    myth: 'PCOS means you can never get pregnant.',
    fact: 'Most people with PCOS can conceive, naturally or with medical support.',
    details: 'Ovulation may be irregular, but healthy eggs are usually present. With appropriate lifestyle support and medical guidance, many people with PCOS conceive without difficulty. Speak to a gynaecologist to understand your individual situation.'
  },
  {
    id: 'm2',
    myth: 'PCOS is only about the ovaries and reproductive health.',
    fact: 'PCOS is a multi-system condition involving hormones, metabolism, and emotional wellbeing.',
    details: 'While reproductive symptoms are common, metabolic features (insulin sensitivity, lipid balance) and emotional wellbeing are equally central — and equally deserving of care. International guidelines now recognise all three as core components.'
  },
  {
    id: 'm3',
    myth: 'Everyone with PCOS has exactly the same symptoms.',
    fact: 'PCOS is highly individual. Symptoms vary considerably between people.',
    details: 'One person may experience acne and mood changes; another may only notice cycle delays. There is no single typical presentation. This is why a clinical evaluation — not self-diagnosis — is important.'
  },
  {
    id: 'm4',
    myth: 'PCOS can be fully reversed by a 7-day diet or herbal tea.',
    fact: 'There is no quick fix. PCOS is managed through sustainable, long-term healthy habits.',
    details: 'Sustainable nutrition, regular physical activity, consistent sleep and appropriate medical support can significantly improve symptoms over time. Extreme or rapid interventions are not supported by clinical evidence and may be harmful.'
  },
  {
    id: 'm5',
    myth: 'PCOS only affects people with higher body weight.',
    fact: 'PCOS occurs across all body types, including lean individuals.',
    details: 'Body weight is not a diagnostic requirement. Lean PCOS, often driven by stress, adrenal or genetic factors, requires equal clinical attention. Assuming weight is the cause can delay appropriate care.'
  }
];

export default function MythsPage() {
  const [expandedMyth, setExpandedMyth] = useState<string | null>(null);

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
  };

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* HEADER */}
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="myths-heading">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span className="section-tag reveal">Common misconceptions</span>
            <h1 id="myths-heading" className="section-title reveal" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
              Myths vs <span className="accent">Facts</span>
            </h1>
            <p className="section-desc reveal" style={{ maxWidth: '580px', margin: '0 auto' }}>
              Common misunderstandings about PCOS — addressed with evidence from international medical research.
            </p>
          </div>
        </section>

        {/* MYTHS ACCORDION */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5% clamp(2.5rem, 6vw, 4rem)', background: '#FFFFFF' }} aria-labelledby="myths-list-heading">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2 id="myths-list-heading" className="sr-only">List of myths and facts</h2>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
              role="list"
            >
              {mythsList.map(m => (
                <div
                  key={m.id}
                  className="myth-card-expandable"
                  role="listitem"
                >
                  <button
                    className="myth-expand-btn"
                    onClick={() => toggleMyth(m.id)}
                    aria-expanded={expandedMyth === m.id}
                    aria-controls={`myth-body-${m.id}`}
                    id={`myth-trigger-${m.id}`}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>
                        Common myth
                      </span>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', lineHeight: 1.45 }}>
                        {m.myth}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: '1rem', color: 'var(--nss-blue-accent)', flexShrink: 0, marginLeft: '0.8rem', transition: 'transform 0.25s ease', transform: expandedMyth === m.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    id={`myth-body-${m.id}`}
                    role="region"
                    aria-labelledby={`myth-trigger-${m.id}`}
                    hidden={expandedMyth !== m.id}
                  >
                    <div className="myth-body-content">
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                        Medical evidence
                      </span>
                      <p style={{ fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '0.5rem', lineHeight: 1.55 }}>{m.fact}</p>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.65 }}>{m.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH CTA */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="myths-cta">
          <div style={{ maxWidth: '600px', margin: '0 auto' }} className="reveal">
            <h2 id="myths-cta" className="section-title" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', marginBottom: '0.75rem' }}>
              Want to go deeper?
            </h2>
            <p className="section-desc" style={{ marginBottom: '2rem' }}>
              View the clinical citations and research that inform this campaign.
            </p>
            <Link href="/resources" className="btn-primary-cta">
              Research &amp; sources →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
