'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
      <main style={{ paddingTop: '80px' }}>

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">🔬 Medical & Nomenclature Guide</span>
            <h1 className="section-title">
              Understanding <span className="accent">PMOS</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Explore the physiological multi-system nature of PMOS, why the international medical community updated the terminology, and how the condition works.
            </p>
          </div>
        </section>

        {/* WHY THE NAME CHANGED */}
        <section style={{ padding: '3rem 0 4rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🔬 Nomenclature Evolution</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.1rem, 4.4vw, 2.35rem)' }}>
                Why the Name Changed: <br className="d-block d-md-none" /><span className="accent">PCOS → PMOS</span>
              </h2>
              <p className="section-desc">Understanding why international medical guidelines updated the terminology in 2026.</p>
            </div>

            <div className="timeline-track reveal">
              <div className="timeline-step">
                <span className="timeline-year">1935 – 2020s</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>The Old Name: PCOS — Polycystic Ovary Syndrome</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  Originally named after the appearance of fluid-filled sacs on ovarian ultrasounds. However, many individuals with the condition have no ovarian cysts, and cysts themselves are not the primary cause.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2023 Guideline</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Broader Health Recognition</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  The 2023 International Evidence-Based Guideline emphasised that insulin resistance, androgen regulation, and emotional wellbeing are central pillars — not just ovarian morphology.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2026 Consensus</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Current Terminology: PMOS — Polyendocrine Metabolic Ovarian Syndrome</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  PMOS accurately describes the multi-system nature: <strong>Polyendocrine</strong> (multiple hormonal pathways), <strong>Metabolic</strong> (insulin &amp; glucose handling), and <strong>Ovarian</strong> (ovulatory health).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE FOUR PILLARS */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🩺 Multi-System Understanding</span>
              <h2 className="section-title">The Four Pillars of <span className="accent">PMOS</span></h2>
              <p className="section-desc">PMOS is a complex condition involving interconnected physiological systems.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className={`tab-btn ${activeTab === 'reproductive' ? 'active' : ''}`} onClick={() => setActiveTab('reproductive')}>🌸 Reproductive</button>
              <button className={`tab-btn ${activeTab === 'endocrine' ? 'active' : ''}`} onClick={() => setActiveTab('endocrine')}>⚖️ Endocrine &amp; Hormonal</button>
              <button className={`tab-btn ${activeTab === 'metabolic' ? 'active' : ''}`} onClick={() => setActiveTab('metabolic')}>⚡ Metabolic</button>
              <button className={`tab-btn ${activeTab === 'emotional' ? 'active' : ''}`} onClick={() => setActiveTab('emotional')}>🧘 Emotional Wellbeing</button>
            </div>

            <div className="summary-card reveal" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)', padding: '2.5rem', borderRadius: 'var(--r-lg)' }}>
              {activeTab === 'reproductive' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>🌸 Reproductive Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves irregular or delayed menstrual cycles, variable ovulation timing, and altered follicle development. Having irregular cycles does not mean ovulation is permanently absent — natural or medically supported ovulation remains common.
                  </p>
                </div>
              )}
              {activeTab === 'endocrine' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>⚖️ Endocrine &amp; Hormonal Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves shifts in androgen regulation (free testosterone, DHEAS) and LH:FSH pituitary signals, which can present as hormonal acne, facial hair growth (hirsutism), or hair thinning.
                  </p>
                </div>
              )}
              {activeTab === 'metabolic' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>⚡ Metabolic Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Involves cellular insulin sensitivity, blood glucose regulation, and lipid transport. Insulin resistance can affect individuals of any body weight — both lean and higher BMI.
                  </p>
                </div>
              )}
              {activeTab === 'emotional' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>🧘 Emotional Wellbeing Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.75, marginTop: '0.6rem' }}>
                    Recognised in international guidelines as a core component. Fluctuating hormones, physical symptoms, and societal stigma can impact mood, anxiety, and body confidence. Addressing emotional wellbeing is as important as managing physical symptoms.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* TERMINOLOGY EXPLAINER: PMOS / PCOS / PCOD */}
        <section style={{ padding: '4rem 0', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📖 Terminology Guide</span>
              <h2 className="section-title">
                Understanding <span className="accent">PMOS, PCOS &amp; PCOD</span>
              </h2>
              <p className="section-desc">Clarifying common names used across international literature and regional practice.</p>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--nss-blue-accent)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>2026 International Terminology</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PMOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polyendocrine Metabolic Ovarian Syndrome.</strong> Current medical consensus emphasising that endocrine and metabolic features are central — not just the ovaries.
                </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Former / Historical Name</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polycystic Ovary Syndrome.</strong> The traditional term used for decades. Replaced because &quot;cysts&quot; can be misleading and ovaries are not the sole cause.
                </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)', height: '100%' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Common Regional Term (India)</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOD</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polycystic Ovarian Disease.</strong> A term commonly used in clinical conversations in South Asia. Refers to the same underlying spectrum of symptoms as PMOS.
                </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOR THOSE WHO CARE FOR WOMEN */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🤝 Community Guidance</span>
              <h2 className="section-title">
                For Those Who <span className="accent">Care for Women</span>
              </h2>
              <p className="section-desc">How to offer empathetic, evidence-based support to a loved one experiencing PMOS.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', listStyle: 'none', padding: 0 }}>
                {[
                  { icon: '💚', bold: 'Listen Without Judgement', body: 'Avoid reducing symptoms to simple willpower, weight, or diet choices. Symptoms are physiological, not personal weakness.' },
                  { icon: '🌱', bold: 'Avoid Assuming Infertility', body: 'PMOS does not equal permanent infertility. With appropriate care, most individuals can conceive.' },
                  { icon: '🏥', bold: 'Encourage Clinical Care', body: 'Support seeking medical guidance from certified physicians rather than unverified online quick fixes or traditional remedies without evidence.' },
                  { icon: '💜', bold: 'Support Emotional Wellbeing', body: 'Recognise that anxiety, mood shifts, and body image concerns are real symptoms — not over-reactions. Validate their experience.' },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                    <div>
                      <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.15rem' }}>{item.bold}</strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/self-test" style={{ background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.85rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.94rem', display: 'inline-block' }}>
                📝 Take the 2-Minute PMOS Self-Check →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
