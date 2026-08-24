'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export interface MythItem {
  id: string;
  num: string;
  category: string;
  myth: string;
  fact: string;
  why: string;
  evidenceTitle: string;
  evidenceUrl: string;
}

const mythsList: MythItem[] = [
  {
    id: 'm1',
    num: '01',
    category: 'FERTILITY',
    myth: 'PMOS means you can never get pregnant.',
    fact: 'PMOS does not mean infertility.',
    why: 'PMOS can make ovulation irregular, which may make conception more difficult for some people. However, many people with PMOS can become pregnant, with or without evidence-based medical treatment.',
    evidenceTitle: 'International PMOS Guideline 2026 (Fertility & Ovulation Assessment)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm2',
    num: '02',
    category: 'OVARIES & DIAGNOSIS',
    myth: 'You need ovarian cysts to have PMOS.',
    fact: 'Despite the historical name, ovarian cysts are not required for diagnosis.',
    why: 'The small fluid-filled follicles seen on ultrasound are immature follicles — not true cysts. Diagnosis relies on a combination of irregular cycles, clinical/biochemical androgen signs, and ultrasound findings according to the International PMOS criteria.',
    evidenceTitle: 'Monash International PMOS Diagnostic Criteria Update 2026',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm3',
    num: '03',
    category: 'DIAGNOSIS',
    myth: 'Irregular periods automatically mean PMOS.',
    fact: 'Irregular periods can have many underlying causes.',
    why: 'Menstrual delays can stem from thyroid dysfunction, hyperprolactinaemia, severe stress, or nutritional deficits. PMOS diagnosis requires a structured clinical assessment to rule out secondary causes rather than evaluating one symptom alone.',
    evidenceTitle: 'International PMOS Guideline 2026 (Differential Diagnosis Protocol)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm4',
    num: '04',
    category: 'BODY TYPE & WEIGHT',
    myth: 'You can tell whether someone has PMOS just by looking at them.',
    fact: 'PMOS affects individuals across all body types and physical appearances.',
    why: 'PMOS occurs across all body sizes. Having a lower body weight does not rule out PMOS, and weight should not be used alone to determine whether someone has the condition.',
    evidenceTitle: 'Monash International PMOS Guideline 2026 (Weight Stigma & Inclusive Care)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm5',
    num: '05',
    category: 'SYSTEMIC HEALTH',
    myth: 'PMOS is just a fertility or reproductive problem.',
    fact: 'PMOS can affect reproductive, metabolic, psychological and broader long-term health.',
    why: 'PMOS can involve hormonal balance, glucose sensitivity, cardiovascular health, sleep patterns, and emotional wellbeing. Symptoms and long-term health considerations vary significantly between individuals.',
    evidenceTitle: 'International PMOS Guideline 2026 (Multidisciplinary & Psychological Care)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm6',
    num: '06',
    category: 'TREATMENT & CURES',
    myth: 'A 7-day diet or herbal tea can cure PMOS.',
    fact: 'There is no proven quick cure for PMOS.',
    why: 'Management is individualized and may include healthy lifestyle behaviours, symptom-specific treatment and medical care. Sustainable, long-term habits are far more effective and safer than unproven rapid detoxes or extreme restrictive diets.',
    evidenceTitle: 'Monash International PMOS Guideline 2026 (Lifestyle & Evidence-Based Therapy)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm7',
    num: '07',
    category: 'PHARMACOTHERAPY',
    myth: 'Oral contraceptive pills are the only treatment for PMOS.',
    fact: 'Treatment is multidimensional and tailored to your individual health goals.',
    why: 'While oral contraceptives can help manage cycle regularity and androgenic symptoms for some, treatment options also include metabolic therapies (such as metformin), lifestyle interventions, dermatological care, and fertility support depending on personal needs.',
    evidenceTitle: 'International PMOS Guideline 2026 (Pharmacological Management Options)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm8',
    num: '08',
    category: 'AGE & DEMOGRAPHICS',
    myth: 'PMOS only develops after pregnancy or later in adult life.',
    fact: 'PMOS commonly manifests during adolescence around the onset of puberty.',
    why: 'Hormonal and metabolic features often appear during teenage years. Early awareness and adolescent-specific diagnostic guidelines ensure young women receive supportive care without premature misdiagnosis.',
    evidenceTitle: 'International PMOS Guideline 2026 (Adolescent Diagnostic Algorithms)',
    evidenceUrl: '/resources#citations'
  },
  {
    id: 'm9',
    num: '09',
    category: 'MENTAL HEALTH',
    myth: 'Mood swings and anxiety in PMOS are just personal weakness.',
    fact: 'Psychological distress in PMOS is a physiological and biological reality.',
    why: 'Hormonal fluctuations, insulin resistance, and systemic inflammation contribute directly to elevated anxiety and depressive symptoms. International guidelines recommend routine emotional wellbeing screening as part of standard PMOS care.',
    evidenceTitle: 'Monash International PMOS Guideline 2026 (Mental Health & Quality of Life)',
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
              Common misconceptions about PMOS (previously called PCOS) — addressed with evidence from the 2026 Monash International PMOS Guidelines.
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <span className="myth-num-badge">{m.num} / {String(mythsList.length).padStart(2, '0')}</span>
                          <span className="myth-category-chip">{m.category}</span>
                        </div>

                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
                          ❌ MYTH
                        </span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', lineHeight: 1.4, margin: 0 }}>
                          &ldquo;{m.myth}&rdquo;
                        </h3>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--soft-teal-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                              🔗 {m.evidenceTitle} ↗
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
              <Link href="/self-test" className="btn-sec-link">
                2-Minute Self-Check Tool →
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
