'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IconHeart, IconLeaf, IconHospital } from '@/components/ui/Icons';
import Link from 'next/link';

export default function UnderstandPage() {
  const [activeTab, setActiveTab] = useState<'reproductive' | 'endocrine' | 'metabolic' | 'emotional'>('reproductive');

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
      <main className="page-main">

        {/* HEADER */}
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="understand-heading">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-tag reveal">Medical guide</span>
            <h1 id="understand-heading" className="section-title reveal" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
              Understanding <span className="accent">PCOS / PMOS</span>
            </h1>
            <p className="section-desc reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Explore the multi-system nature of Polycystic Ovary Syndrome, the terminology used in different contexts, and how the condition affects the body.
            </p>
          </div>
        </section>

        {/* WHAT IS PMOS / PCOS? */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: '#FFFFFF' }} aria-labelledby="what-is-heading">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ marginBottom: '2rem' }}>
              <span className="section-tag">01 — What is it?</span>
              <h2 id="what-is-heading" className="section-title">PMOS / PCOS</h2>
            </div>
            <div className="reveal" style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.2rem' }}>
                Polyendocrine Metabolic Ovarian Syndrome (PMOS) is the updated name for the condition previously known as Polycystic Ovary Syndrome (PCOS). The name was updated in 2026 to better reflect the condition&apos;s broader hormonal, metabolic and reproductive effects.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                PMOS affects around 1 in 8 women worldwide based on international evidence-based guidelines. It is a multi-system condition that involves interconnected endocrine, metabolic and emotional factors rather than purely ovarian features.
              </p>
            </div>
          </div>
        </section>

        {/* TERMINOLOGY CONTEXT */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="terminology-heading">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">02 — Terminology</span>
              <h2 id="terminology-heading" className="section-title">Understanding the <span className="accent">Terminology</span></h2>
              <p className="section-desc">Understanding historical names and clinical terminology.</p>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--soft-teal-border)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Current terminology (2026)</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PMOS</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                    <strong>Polyendocrine Metabolic Ovarian Syndrome.</strong> The updated international clinical name reflecting multi-system hormonal and metabolic health.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div style={{ background: '#FFFFFF', border: '1.5px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Former clinical name</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOS</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                    <strong>Polycystic Ovary Syndrome.</strong> The former clinical name used in historical literature and previous international guidelines.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Regional usage</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOD</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                    <strong>Polycystic Ovarian Disease.</strong> A commonly used term in South Asia, but it is not the current international clinical name for the condition.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--r-md)', padding: '1.2rem 1.5rem', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--nss-navy)' }}>What about PCOD?</strong> PCOD (Polycystic Ovarian Disease) is a commonly used term in South Asia, but it is not the current international clinical name for the condition. If you see PCOD used online or in conversation, the current international terminology is PMOS.
            </div>
          </div>
        </section>

        {/* THE FOUR PILLARS */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: '#FFFFFF' }} aria-labelledby="pillars-heading">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">03 — How it affects the body</span>
              <h2 id="pillars-heading" className="section-title">The four pillars of <span className="accent">PCOS/PMOS</span></h2>
              <p className="section-desc">A multi-system condition involving interconnected physiological systems.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }} role="tablist" aria-label="PCOS pillars">
              {(['reproductive', 'endocrine', 'metabolic', 'emotional'] as const).map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`pillar-panel-${tab}`}
                  id={`pillar-tab-${tab}`}
                >
                  {tab === 'reproductive' && 'Reproductive'}
                  {tab === 'endocrine' && 'Endocrine & Hormonal'}
                  {tab === 'metabolic' && 'Metabolic'}
                  {tab === 'emotional' && 'Emotional Wellbeing'}
                </button>
              ))}
            </div>

            <div className="summary-card reveal" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)', padding: '2.5rem', borderRadius: 'var(--r-lg)' }}>
              {activeTab === 'reproductive' && (
                <div role="tabpanel" id="pillar-panel-reproductive" aria-labelledby="pillar-tab-reproductive">
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Reproductive</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves irregular or delayed menstrual cycles, variable ovulation timing, and altered follicle development. Having irregular cycles does not mean ovulation is permanently absent — natural or medically supported ovulation remains possible and common.
                  </p>
                </div>
              )}
              {activeTab === 'endocrine' && (
                <div role="tabpanel" id="pillar-panel-endocrine" aria-labelledby="pillar-tab-endocrine">
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Endocrine &amp; Hormonal</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves shifts in androgen levels (testosterone, DHEAS) and pituitary hormone signalling (LH:FSH ratio), which can present as hormonal acne, facial hair growth (hirsutism), or hair thinning. These are physiological responses, not personal failings.
                  </p>
                </div>
              )}
              {activeTab === 'metabolic' && (
                <div role="tabpanel" id="pillar-panel-metabolic" aria-labelledby="pillar-tab-metabolic">
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Metabolic</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves how cells respond to insulin and regulate blood glucose. Insulin resistance — where cells respond less effectively to insulin — can occur in people of any body weight, both lean and higher BMI. It can contribute to energy fluctuations, weight changes and long-term metabolic health considerations.
                  </p>
                </div>
              )}
              {activeTab === 'emotional' && (
                <div role="tabpanel" id="pillar-panel-emotional" aria-labelledby="pillar-tab-emotional">
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Emotional Wellbeing</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Recognised in international guidelines (Monash 2023) as a core component of PCOS care. Fluctuating hormones, physical symptoms, and societal stigma can impact mood, anxiety, and body confidence. Addressing emotional wellbeing is as important as managing physical symptoms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HOW TO SUPPORT SOMEONE */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="support-heading">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">04 — Care &amp; Support</span>
              <h2 id="support-heading" className="section-title">For People Who <span className="accent">Care About Women</span></h2>
              <p className="section-desc">Empathetic, evidence-informed support from partners, family, friends and colleagues matters.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', listStyle: 'none', padding: 0 }}>
                {[
                  { icon: <IconHeart size={20} color="var(--soft-teal-accent)" />, bold: 'Listen without judgement', body: 'Avoid reducing symptoms to simple willpower, weight, or diet choices. Symptoms are physiological, not personal weakness.' },
                  { icon: <IconLeaf size={20} color="var(--soft-teal-accent)" />, bold: 'Avoid assuming infertility', body: 'PCOS does not mean permanent infertility. With appropriate care, most people can conceive.' },
                  { icon: <IconHospital size={20} color="var(--soft-teal-accent)" />, bold: 'Encourage professional care', body: 'Support seeking medical guidance from certified physicians rather than unverified online remedies or social media advice.' },
                  { icon: <IconHeart size={20} color="var(--soft-teal-accent)" />, bold: 'Support emotional wellbeing', body: 'Recognise that anxiety, mood shifts and body image concerns are real symptoms, not over-reactions. Validate their experience.' },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true">{item.icon}</span>
                    <div>
                      <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.15rem' }}>{item.bold}</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/symptoms" className="btn-primary-cta">
                Explore symptoms &amp; care →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
