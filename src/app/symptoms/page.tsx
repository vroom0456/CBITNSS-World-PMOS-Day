'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IconBloodDrop, IconSparkle, IconHairThinning, IconScaleBalance, IconSleepFatigue, IconPigmentationMoon } from '@/components/ui/Icons';
import Link from 'next/link';

declare global {
  interface Window {
    showTab: (tabName: string, btn: HTMLElement) => void;
  }
}

export default function SymptomsPage() {
  const [scienceOpen, setScienceOpen] = useState(false);
  const [careTab, setCareTab] = useState<'daily' | 'nutrition' | 'medical' | 'emotional'>('daily');

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
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(1.5rem, 4vw, 2.5rem)', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="symptoms-heading">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-tag reveal">Symptoms</span>
            <h1 id="symptoms-heading" className="section-title reveal" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
              Symptoms &amp; <span className="accent">What May Help</span>
            </h1>
            <p className="section-desc reveal" style={{ maxWidth: '600px', margin: '0 auto' }}>
              PCOS/PMOS symptoms vary widely between individuals. This page outlines common patterns and evidence-informed approaches that a healthcare provider may discuss with you.
            </p>
          </div>
        </section>

        {/* NON-DIAGNOSTIC DISCLAIMER */}
        <div style={{ padding: '0 5% 0', background: 'var(--bg-main)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '1rem' }}>
            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '1rem 1.4rem', borderRadius: 'var(--r-sm)', fontSize: '0.9rem', color: 'var(--nss-navy)', fontWeight: 600 }} role="note">
              <strong>Educational Notice:</strong> Having these symptoms does not mean you have PMOS. Symptoms can have many possible causes. A healthcare professional can help determine what may be contributing to them.
            </div>
          </div>
        </div>

        {/* SYMPTOMS GRID */}
        <section id="symptoms" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="common-symptoms-heading">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">Common patterns</span>
              <h2 id="common-symptoms-heading" className="section-title">Common <span className="accent">PMOS symptoms</span></h2>
              <p className="section-desc">Every body is unique — not everyone experiences all of these.</p>
            </div>

            <div className="symptoms-grid stagger-grid">
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconBloodDrop size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Irregular periods</h3><p>Cycles longer than 35 days, variable cycle length, or occasionally missed periods.</p></div>
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconScaleBalance size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Metabolic changes</h3><p>Weight shifts or insulin-related changes, occurring at any body weight.</p></div>
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconSparkle size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Hormonal acne</h3><p>Persistent breakouts — often along the jawline — driven by androgen levels.</p></div>
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconHairThinning size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Hair changes</h3><p>Coarse facial or body hair growth (hirsutism), or scalp hair thinning.</p></div>
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconSleepFatigue size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Fatigue</h3><p>Persistent energy dips or post-meal fatigue, which may be related to insulin sensitivity.</p></div>
              <div className="symptom-card reveal"><div className="symptom-icon" aria-hidden="true"><IconPigmentationMoon size={24} color="var(--soft-teal-accent)" /></div><h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>Skin pigmentation</h3><p>Dark, velvety patches on neck folds, armpits or knuckles (acanthosis nigricans).</p></div>
            </div>
          </div>
        </section>

        {/* WHAT MAY HELP */}
        <section id="care" style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: '#FFFFFF' }} aria-labelledby="care-heading">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">Evidence-informed care</span>
              <h2 id="care-heading" className="section-title">What <span className="accent">may help</span></h2>
              <p className="section-desc">
                These approaches are based on published guidelines and should be discussed with your healthcare provider — not used as a self-treatment plan.
              </p>
            </div>

            <div className="tab-buttons reveal" style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }} role="tablist" aria-label="Care areas">
              <button className={`tab-btn ${careTab === 'daily' ? 'active' : ''}`} onClick={() => setCareTab('daily')} role="tab" aria-selected={careTab === 'daily'} aria-controls="tab-daily">Exercise &amp; Movement</button>
              <button className={`tab-btn ${careTab === 'nutrition' ? 'active' : ''}`} onClick={() => setCareTab('nutrition')} role="tab" aria-selected={careTab === 'nutrition'} aria-controls="tab-nutrition">Nutrition</button>
              <button className={`tab-btn ${careTab === 'medical' ? 'active' : ''}`} onClick={() => setCareTab('medical')} role="tab" aria-selected={careTab === 'medical'} aria-controls="tab-medical">Medical evaluation</button>
              <button className={`tab-btn ${careTab === 'emotional' ? 'active' : ''}`} onClick={() => setCareTab('emotional')} role="tab" aria-selected={careTab === 'emotional'} aria-controls="tab-emotional">Emotional wellbeing</button>
            </div>

            {/* TAB 1: EXERCISE */}
            {careTab === 'daily' && (
              <div className="tab-content active" id="tab-daily" role="tabpanel">
                <div className="precautions-list">
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">1</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Regular physical activity</h3>
                      <p>A mix of resistance and aerobic exercise can support insulin sensitivity and overall cardiovascular health. Even 30 minutes of moderate movement most days has shown benefit in research.</p>
                    </div>
                  </div>
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">2</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Consistent sleep</h3>
                      <p>Regular, adequate sleep supports overall health and wellbeing and may be an important part of healthy lifestyle habits.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NUTRITION */}
            {careTab === 'nutrition' && (
              <div className="tab-content active" id="tab-nutrition" role="tabpanel">
                <div className="precautions-list">
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">1</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Balanced, whole-food nutrition</h3>
                      <p>A balanced eating pattern and regular physical activity can support overall metabolic health. Individual needs vary, so consider discussing nutrition with a qualified healthcare professional.</p>
                    </div>
                  </div>
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">2</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Gut health support</h3>
                      <p>Probiotic and prebiotic foods (yoghurt, fermented foods, fibre-rich vegetables) may support gut microbial diversity and reduce systemic inflammation — though evidence is still emerging.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MEDICAL */}
            {careTab === 'medical' && (
              <div className="tab-content active" id="tab-medical" role="tabpanel">
                <div className="precautions-list">
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">1</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Clinical evaluation</h3>
                      <p>A doctor may recommend blood tests to evaluate hormone levels, insulin sensitivity, thyroid function and lipid profile. An ultrasound may also be part of the diagnostic process.</p>
                    </div>
                  </div>
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">2</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Supplements to discuss with your doctor</h3>
                      <p>Some people may discuss inositol with their healthcare professional. Evidence for benefits varies, and supplementation should be individualised.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: EMOTIONAL */}
            {careTab === 'emotional' && (
              <div className="tab-content active" id="tab-emotional" role="tabpanel">
                <div className="precautions-list">
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">1</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Emotional wellbeing</h3>
                      <p>International guidelines recognise emotional health as a core component of PMOS care. Mindfulness, counselling, and peer support can help reduce chronic stress and improve quality of life.</p>
                    </div>
                  </div>
                  <div className="pre-card">
                    <div className="pre-num" aria-hidden="true">2</div>
                    <div className="pre-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.35rem' }}>Reducing stigma</h3>
                      <p>Anxiety, mood shifts and body image concerns are real physiological responses — not personal weakness. Seeking support from healthcare professionals and trusted people is a sign of strength.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE: SCIENCE */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <button
                onClick={() => setScienceOpen(v => !v)}
                aria-expanded={scienceOpen}
                aria-controls="science-panel"
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--nss-blue-accent)', padding: 0 }}
              >
                <span>{scienceOpen ? '▲' : '▼'}</span>
                <span>Want to understand the underlying science?</span>
              </button>
              <div id="science-panel" hidden={!scienceOpen}>
                <div style={{ marginTop: '1.2rem', background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-md)', padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Detailed mechanisms — for the scientifically curious</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                    <li><strong>Insulin signalling:</strong> In PMOS, GLUT-4 glucose transporter expression in muscle cells can be reduced, impairing cellular insulin uptake. This contributes to compensatory hyperinsulinaemia, which stimulates ovarian androgen production.</li>
                    <li><strong>HPA axis &amp; cortisol:</strong> Chronic stress activates the hypothalamic-pituitary-adrenal (HPA) axis, elevating cortisol. Elevated cortisol can increase adrenal androgen production and disrupt ovulatory cycles.</li>
                    <li><strong>Gut microbiome:</strong> Emerging research suggests dysbiosis of gut microbiota may reduce short-chain fatty acid (SCFA) production and compromise gut epithelial barrier integrity, potentially contributing to systemic inflammation in PMOS.</li>
                    <li><strong>Inositol mechanisms:</strong> Inositol acts as a cellular second messenger. Evidence for benefits varies, and supplementation should be individualised with a healthcare professional.</li>
                  </ul>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
                    Source: Singh et al., Journal of Clinical Medicine (2023). These mechanisms are an active area of research — speak to a clinician for personalised guidance.
                  </p>
                  <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                    <Link href="/resources" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--nss-blue-accent)', textDecoration: 'underline' }}>
                      View clinical citations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCTOR ADVOCACY BANNER */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="care-cta">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="doctor-advocacy-banner reveal" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)', padding: 'clamp(1.5rem, 5vw, 2.4rem)', borderRadius: 'var(--r-lg)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '2.5rem', flexShrink: 0 }} aria-hidden="true">💜</div>
              <div>
                <h2 id="care-cta" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.3rem' }}>You deserve proper medical care</h2>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  If symptoms are affecting your daily life, consult a qualified healthcare provider. This page is educational — not a replacement for clinical care.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/myths" className="btn-primary-cta">
                Explore myths vs facts →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
