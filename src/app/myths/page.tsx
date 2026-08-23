'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const mythsList = [
  {
    id: 'm1',
    myth: 'PMOS means you can never get pregnant.',
    fact: 'With appropriate lifestyle care and evidence-based medical guidance, most individuals with PMOS can conceive naturally or with simple treatments.',
    details: 'Ovulation may be irregular, but ovaries contain healthy eggs. Medical care focuses on supporting regular ovulatory cycles.'
  },
  {
    id: 'm2',
    myth: 'PMOS is only about the ovaries and reproductive health.',
    fact: 'PMOS is a multi-system condition involving endocrine, metabolic, cardiovascular, and emotional health.',
    details: 'While reproductive symptoms are common, metabolic features (insulin sensitivity, lipid transport) and emotional wellbeing play equal roles in long-term management.'
  },
  {
    id: 'm3',
    myth: 'Everyone with PMOS has the exact same symptoms.',
    fact: 'PMOS is highly heterogeneous with multiple clinical phenotypes ranging from lean ovulatory to metabolic variants.',
    details: 'Symptoms vary widely between individuals. One person may experience acne and mood changes while another experiences cycle delays.'
  },
  {
    id: 'm4',
    myth: 'PMOS can be 100% reversed by a simple 7-day diet or herbal tea.',
    fact: 'PMOS is a lifelong hormonal and metabolic tendency managed through sustainable, long-term healthy habits.',
    details: 'There are no quick-fix cures. Sustainable nutrition, physical activity, sleep, and medical support provide long-term hormonal balance.'
  },
  {
    id: 'm5',
    myth: 'PMOS only affects individuals with higher body weight.',
    fact: 'PMOS occurs across all body types, including lean individuals — often driven by stress, adrenal, or genetic factors.',
    details: 'Weight is not a diagnostic requirement. Lean PMOS requires equal clinical care and attention.'
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

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">💡 Science Check & Evidence Care</span>
            <h1 className="section-title">
              PMOS <span className="accent">Myths vs Facts</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Debunking common misunderstandings with international medical evidence and learning what clinical research actually recommends for long-term health.
            </p>
          </div>
        </section>

        {/* MYTHS VS FACTS CARDS */}
        <section style={{ padding: '3rem 0 4rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {mythsList.map(m => (
                <div
                  key={m.id}
                  className="myth-card-expandable"
                  onClick={() => setExpandedMyth(expandedMyth === m.id ? null : m.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpandedMyth(expandedMyth === m.id ? null : m.id); }}
                  aria-expanded={expandedMyth === m.id}
                >
                  <div className="myth-header-row">
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>❌ Common Myth</span>
                      <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.25rem', lineHeight: 1.45 }}>{m.myth}</h3>
                    </div>
                    <span style={{ fontSize: '1.1rem', color: 'var(--nss-blue-accent)', flexShrink: 0, marginLeft: '0.8rem' }}>{expandedMyth === m.id ? '▲' : '▼'}</span>
                  </div>

                  {expandedMyth === m.id && (
                    <div className="myth-body-content">
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>✅ Medical Evidence &amp; Fact</span>
                      <p style={{ fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '0.45rem', lineHeight: 1.55 }}>{m.fact}</p>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.65 }}>{m.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT ACTUALLY HELPS */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌱 Sustainable Care</span>
              <h2 className="section-title">What <span className="accent">Actually Helps?</span></h2>
              <p className="section-desc">Evidence-based pillars recommended by international endocrine &amp; metabolic guidelines.</p>
            </div>

            <div className="row g-4">
              {[
                { n: '1', title: 'Sustainable Whole-Food Nutrition', body: 'Emphasise low-glycemic index (Low-GI) complex carbs, high prebiotic fibre, and anti-inflammatory healthy fats rather than extreme restrictive diets.' },
                { n: '2', title: 'Regular Physical Activity', body: 'A blend of resistance training and aerobic exercise enhances GLUT-4 cellular insulin sensitivity and supports cardiorespiratory fitness.' },
                { n: '3', title: 'Sleep Hygiene & Cortisol Control', body: '7–9 hours of consistent sleep helps regulate the hypothalamic-pituitary-adrenal (HPA) axis and reduces adrenal androgen surges.' },
                { n: '4', title: 'Individualised Clinical Care', body: 'Working with a physician to evaluate serum markers (insulin sensitivity, androgen levels, thyroid) for tailored care rather than one-size-fits-all plans.' },
              ].map((p, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-3">
                  <div className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)', height: '100%' }}>
                  <div className="pre-num">{p.n}</div>
                  <div className="pre-info">
                    <h5>{p.title}</h5>
                    <p>{p.body}</p>
                  </div>
                </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/resources" className="btn-primary-cta">
                📚 View Clinical Research &amp; Sources →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
