'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface QuizResult {
  title: string;
  phenotypeTag: string;
  desc: string;
  clinicalDetails: string[];
  background: string;
  border: string;
  color: string;
}

declare global {
  interface Window {
    closeModal: () => void;
    closeModalOnOverlay: (e: React.SyntheticEvent) => void;
    handleModalAnonSubmit: (e: React.SyntheticEvent) => void;
  }
}

const quizQuestions = [
  { id: 'q1', category: 'Menstrual / Ovulatory', text: '1. Are your period cycles irregular, delayed (>35 days), or frequently missed?' },
  { id: 'q2', category: 'Hyperandrogenism', text: '2. Do you experience hirsutism (coarse unwanted hair growth on chin, upper lip, chest, or abdomen)?' },
  { id: 'q3', category: 'Hyperandrogenism', text: '3. Do you have stubborn hormonal acne along your jawline/back or persistent scalp hair thinning?' },
  { id: 'q4', category: 'Metabolic & Insulin', text: '4. Do you experience abdominal weight gain, intense sugar cravings, or fatigue after carb-heavy meals?' },
  { id: 'q5', category: 'Metabolic & Skin', text: '5. Have you noticed velvety dark skin patches (Acanthosis Nigricans) around neck folds, knuckles, or armpits?' },
  { id: 'q6', category: 'Gut & Inflammation', text: '6. Do you regularly experience persistent bloating, gut distress, high stress, or sluggish digestion?' },
];

export default function SelfTestPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
  });

  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));

    const anonModal = document.getElementById('anon-modal');
    const handleOpenModal = () => {
      if(anonModal) {
        anonModal.style.display = 'flex';
        requestAnimationFrame(() => requestAnimationFrame(() => anonModal.classList.add('active')));
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('openModal', handleOpenModal);
    window.closeModal = function() {
      if(anonModal) {
        anonModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { anonModal.style.display = 'none'; }, 400);
      }
    };
    window.closeModalOnOverlay = function(e: React.SyntheticEvent) { if (e.target === anonModal) window.closeModal(); };
    if(anonModal) anonModal.style.display = 'none';

    return () => {
      observer.disconnect();
      window.removeEventListener('openModal', handleOpenModal);
    };
  }, []);

  const toggleOption = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCalculate = () => {
    const selected = checkedItems;
    const count = Object.values(selected).filter(Boolean).length;
    
    const hasOvulatory = selected.q1;
    const hasAndrogen = selected.q2 || selected.q3;
    const hasMetabolic = selected.q4 || selected.q5 || selected.q6;

    if (count === 0) {
      setResult({
        title: '💧 Low Probability (Optimal Endocrine Balance)',
        phenotypeTag: 'Normal Physiological Status',
        desc: 'Based on Rotterdam & NIH clinical criteria, you exhibit minimal signs of hyperandrogenism, metabolic dysfunction, or ovulatory arrest.',
        clinicalDetails: [
          'Maintain a gut-friendly, low-glycemic index (Low-GI) diet.',
          'Continue 30+ minutes of daily physical activity to preserve insulin sensitivity.',
          'Schedule annual routine wellness checkups.'
        ],
        background: 'var(--soft-mint-bg)',
        border: '1.5px solid var(--soft-mint-border)',
        color: 'var(--nss-navy)',
      });
    } else if (hasOvulatory && hasAndrogen && hasMetabolic) {
      setResult({
        title: '🏥 Phenotype A / B Indication — High Clinical Likelihood',
        phenotypeTag: 'Classic Hyperandrogenic & Ovulatory Dysfunction',
        desc: 'Your assessment matches Rotterdam Phenotype A/B characteristics: elevated androgenic markers combined with ovulatory dysfunction and metabolic dysbiosis.',
        clinicalDetails: [
          'Strong correlation with hyperinsulinemia and LH/FSH ratio surge (J. Clin. Med. 2023).',
          'Recommended Action: Consult a Gynaecologist/Endocrinologist for Serum Free Testosterone, LH:FSH ratio, and Pelvic Ultrasound.',
          'Key Therapies: Low-GI / Ketogenic dietary pattern, Myo-Inositol (40:1 MI:DCI ratio), and gut microbiome restoration via Probiotics (Lactobacillus & Bifidobacterium).'
        ],
        background: 'var(--soft-teal-bg)',
        border: '1.5px solid var(--soft-teal-accent)',
        color: 'var(--nss-navy)',
      });
    } else if (hasAndrogen && !hasOvulatory) {
      setResult({
        title: '🩺 Phenotype C Indication — Ovulatory PCOD Variant',
        phenotypeTag: 'Hyperandrogenic Ovulatory Variant',
        desc: 'You exhibit androgenic signs (acne, hirsutism, hair loss) while maintaining regular menstrual cycles.',
        clinicalDetails: [
          'Often driven by elevated free testosterone and low Sex Hormone Binding Globulin (SHBG).',
          'Recommended Action: Check Serum DHEAS, Free Testosterone, and Vitamin D3 levels.',
          'Key Therapies: Resistance training, Spearmint tea (anti-androgenic), and Omega-3 supplementation to boost SHBG.'
        ],
        background: 'var(--soft-teal-bg)',
        border: '1.5px solid var(--soft-teal-border)',
        color: 'var(--nss-navy-dark)',
      });
    } else if (hasOvulatory && !hasAndrogen) {
      setResult({
        title: '🩺 Phenotype D Indication — Non-Hyperandrogenic PCOD',
        phenotypeTag: 'Non-Hyperandrogenic Ovulatory Dysfunction',
        desc: 'You experience cycle irregularities or metabolic signs without major cutaneous androgenic symptoms.',
        clinicalDetails: [
          'Frequently tied to stress-induced cortisol dysregulation, insulin resistance, or gut dysbiosis (DOGMA theory).',
          'Recommended Action: Fasting Glucose, HOMA-IR screening, and Thyroid (TSH) check.',
          'Key Therapies: High fermentable fiber diet, Vitamin D3 + Calcium supplementation, and stress reduction.'
        ],
        background: 'var(--soft-teal-bg)',
        border: '1.5px solid var(--soft-teal-border)',
        color: 'var(--nss-navy-dark)',
      });
    } else {
      setResult({
        title: '🩺 Mild Metabolic / Hormonal Indications',
        phenotypeTag: 'Early Stage Metabolic Sensitivity',
        desc: 'You exhibit early signs of metabolic or hormonal fluctuation. Early lifestyle interventions produce 90%+ recovery rates.',
        clinicalDetails: [
          'Focus on eliminating refined sugars and saturated trans-fats to reduce gut mucosal permeability (LPS leakage).',
          'Incorporate vigorous aerobic exercise and resistance training.',
          'Monitor cycle patterns over the next 60 days.'
        ],
        background: 'var(--soft-mint-bg)',
        border: '1.5px solid var(--soft-mint-border)',
        color: 'var(--nss-navy)',
      });
    }

    setTimeout(() => {
      document.getElementById('quiz-result-box')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section id="quiz-tool" style={{ padding: "3rem 0 5rem" }}>
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">🔬 Evidence-Based Assessment</span>
              <h2 className="section-title">PCOD / PMOS <span className="accent">Clinical Self-Test</span></h2>
              <p className="section-desc">Based on <em>Journal of Clinical Medicine (2023)</em> Rotterdam &amp; NIH Diagnostic Criteria for PCOD Phenotypes.</p>
            </div>
            
            <div className="quiz-card reveal">
              <div className="quiz-header">
                <h4>Check all clinical indicators that apply to you:</h4>
                <p>This screening tool evaluates hyperandrogenism, ovulatory arrest, metabolic dysbiosis, and gut-axis markers.</p>
              </div>
              
              <div className="quiz-list">
                {quizQuestions.map(q => (
                  <div 
                    key={q.id} 
                    className="quiz-row" 
                    onClick={() => toggleOption(q.id)}
                    style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.3rem', borderRadius: 'var(--r-sm)', background: checkedItems[q.id] ? 'var(--soft-teal-bg)' : 'rgba(245,242,255,0.4)', margin: '0.6rem 0', transition: 'all 0.2s ease', border: checkedItems[q.id] ? '1.5px solid var(--soft-teal-accent)' : '1px solid var(--border-light)' }}
                  >
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--soft-teal-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>{q.category}</span>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {q.text}
                      </span>
                    </div>
                    <input 
                      type="checkbox" 
                      id={q.id} 
                      checked={checkedItems[q.id]} 
                      onChange={() => {}} 
                      style={{ width: '22px', height: '22px', accentColor: 'var(--soft-teal-accent)', cursor: 'pointer', flexShrink: 0, marginLeft: '1rem' }}
                    />
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                className="btn-calc-quiz" 
                onClick={handleCalculate}
                style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1rem', marginTop: '1.5rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '1rem' }}
              >
                🔍 Analyze Clinical Assessment &amp; Phenotype
              </button>

              {result && (
                <div 
                  className="quiz-result-card active" 
                  id="quiz-result-box"
                  style={{
                    background: result.background,
                    border: result.border,
                    display: 'block',
                    marginTop: '1.8rem',
                    padding: '1.8rem',
                    borderRadius: 'var(--r-md)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--soft-teal-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {result.phenotypeTag}
                  </span>
                  <h4 id="quiz-res-title" style={{ color: result.color, fontSize: '1.3rem', fontWeight: 800, marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                    {result.title}
                  </h4>
                  <p id="quiz-res-desc" style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {result.desc}
                  </p>

                  <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(15,56,84,0.1)' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                      🔬 Research-Backed Next Steps (Journal of Clinical Medicine 2023):
                    </h5>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                      {result.clinicalDetails.map((detail, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3rem' }}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      {/* ANONYMOUS MODAL */}
      <div className="modal-overlay" id="anon-modal" onClick={(e) => window.closeModalOnOverlay(e)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-window">
          <div className="modal-header">
            <h3 id="modal-title">🌸 Ask Anonymous Question to Gynaecologist</h3>
            <button className="modal-close-btn" onClick={() => window.closeModal()} aria-label="Close window">✕</button>
          </div>
          <div className="privacy-notice">🛡️ <strong>100% Confidential:</strong> This window collects ZERO personal info. Your submission cannot be traced to you.</div>
          <form id="modal-anon-form" onSubmit={(e) => window.handleModalAnonSubmit(e)}>
            <div className="form-group">
              <label htmlFor="modal-q-topic">Select Topic Category (Optional)</label>
              <select id="modal-q-topic" name="category">
                <option value="General PCOD Doubts">General PCOD &amp; Symptoms</option>
                <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Issues</option>
                <option value="Diet Medication">Diet &amp; Medication Doubts</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-q-message">Your Anonymous Question for the Gynaecologist *</label>
              <textarea id="modal-q-message" name="message" rows={4} placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed?" required></textarea>
            </div>
            <button type="submit" className="btn-submit-modal" id="modal-submit-btn">🌸 Submit Question Anonymously</button>
          </form>
          <div className="modal-success-alert" id="modal-success">
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✅</div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--soft-navy-text)" }}>Anonymous Question Submitted!</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginTop: "0.4rem", lineHeight: 1.6 }}>Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PCOD Day 2026.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
