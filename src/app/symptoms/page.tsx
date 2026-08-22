'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

declare global {
  interface Window {
    showTab: (tabName: string, btn: HTMLElement) => void;
    closeModal: () => void;
    closeModalOnOverlay: (e: React.SyntheticEvent) => void;
    handleModalAnonSubmit: (e: React.SyntheticEvent) => void;
  }
}

export default function SymptomsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));

    window.showTab = function(tabName, btn) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => { c.classList.remove('active'); (c as HTMLElement).style.display = 'none'; });
      btn.classList.add('active');
      const tab = document.getElementById('tab-' + tabName);
      if(tab) {
        tab.style.display = 'block';
        void tab.offsetWidth;
        tab.classList.add('active');
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* SYMPTOMS SECTION */}
        <section id="symptoms" style={{ padding: "3rem 0 4rem", background: "var(--bg-main)" }}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="heading-box reveal" style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span className="section-tag">🩺 Symptom Identification</span>
              <h2 className="section-title">Common <span className="accent">PMOS Symptoms</span></h2>
              <p className="section-desc">Symptoms vary widely between individuals. Every body is unique.</p>
            </div>

            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '1rem 1.4rem', borderRadius: 'var(--r-sm)', marginBottom: '2.5rem', fontSize: '0.9rem', color: 'var(--nss-navy)', fontWeight: 600 }}>
              ⚠️ <strong>Non-Diagnostic Disclaimer:</strong> Having these symptoms does not mean you have PMOS. Other conditions can cause similar symptoms. Always consult a qualified physician for evaluation.
            </div>

            <div className="symptoms-grid stagger-grid">
              <div className="symptom-card reveal"><div className="sym-icon">🩸</div><h4>Irregular Periods</h4><p>Cycles longer than 35 days, variable cycle length, or occasional missed periods.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">⚖️</div><h4>Metabolic / Insulin Shifts</h4><p>Targeted weight changes or insulin resistance regardless of body weight.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">✨</div><h4>Hormonal Acne</h4><p>Persistent jawline acne driven by free androgen levels.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">💇‍♀️</div><h4>Excess Hair / Hair Thinning</h4><p>Coarse facial/body hair growth (hirsutism) or scalp hair thinning.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">😴</div><h4>Fatigue &amp; Low-Grade Inflammation</h4><p>Persistent energy dips, post-meal fatigue, or systemic inflammation markers.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🌙</div><h4>Acanthosis Nigricans</h4><p>Dark velvety skin pigmentation on neck folds, armpits, or knuckles.</p></div>
            </div>
          </div>
        </section>

        {/* CLINICAL MANAGEMENT PROTOCOL */}
        <section id="precautions" style={{ padding: "3rem 0 4rem", background: "var(--card-white)" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="heading-box reveal" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span className="section-tag">🔬 Clinical Evidence</span>
              <h2 className="section-title">Evidence-Based <span className="accent">Management Protocol</span></h2>
              <p className="section-desc">Recommendations synthesized from clinical trials published in international guidelines.</p>
            </div>
            
            <div className="tab-buttons reveal" style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
              <button className="tab-btn active" onClick={(e) => window.showTab('daily', e.currentTarget)}>🌅 Exercise &amp; Movement</button>
              <button className="tab-btn" onClick={(e) => window.showTab('microbiome', e.currentTarget)}>🦠 Gut Microbiome Care</button>
              <button className="tab-btn" onClick={(e) => window.showTab('medical', e.currentTarget)}>💊 Inositols &amp; Clinical Checks</button>
              <button className="tab-btn" onClick={(e) => window.showTab('emotional', e.currentTarget)}>🧘 Emotional Wellbeing</button>
            </div>

            {/* TAB 1: EXERCISE */}
            <div className="tab-content active" id="tab-daily">
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Resistance &amp; Aerobic Exercise</h5>
                    <p>Clinical trials show regular exercise enhances GLUT-4 glucose transporter expression, supporting fasting insulin sensitivity and cardiorespiratory fitness.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Circadian Sleep &amp; Cortisol Regulation</h5>
                    <p>7–9 hours of restorative sleep regulates the HPA axis and reduces hypercortisolemia, supporting natural adrenal health.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 2: GUT MICROBIOME */}
            <div className="tab-content" id="tab-microbiome" style={{ display: "none" }}>
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Probiotic &amp; Prebiotic Support</h5>
                    <p>Supports gut microbial diversity, short-chain fatty acid (SCFA) production, and gut epithelial barrier integrity, which may help reduce systemic inflammation in PMOS.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 3: INOSITOLS & MEDICAL */}
            <div className="tab-content" id="tab-medical" style={{ display: "none" }}>
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Myo-Inositol &amp; D-Chiro-Inositol (40:1 Ratio)</h5>
                    <p>Supports intracellular insulin messenger signaling to help regulate ovulation rates and glucose transport.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Clinical Lab Evaluation</h5>
                    <p>Comprehensive physician screening: Free Testosterone, Fasting Insulin, SHBG, Lipid Profile, and TSH.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 4: EMOTIONAL WELLBEING */}
            <div className="tab-content" id="tab-emotional" style={{ display: "none" }}>
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Emotional Wellbeing &amp; Body Confidence</h5>
                    <p>International guidelines highlight emotional wellbeing as a core pillar of PMOS care. Mindfulness, therapy, and peer support reduce chronic stress and improve quality of life.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Reducing Stigma &amp; Seeking Support</h5>
                    <p>Acknowledging emotional challenges as physiological — not personal weakness — encourages seeking support from healthcare professionals and trusted individuals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCTOR ADVOCACY BANNER */}
        <section id="doctor" style={{ padding: "3rem 0 4rem", background: "var(--bg-main)" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="doctor-advocacy-banner reveal" style={{ background: "#FFFFFF", border: "1.5px solid var(--soft-teal-border)", padding: "2rem", borderRadius: "var(--r-lg)", display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <div style={{ fontSize: "2.5rem" }}>💜</div>
              <div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--nss-navy)" }}>Remember: You Deserve Proper Medical Care</h4>
                <p style={{ fontSize: "0.92rem", color: "var(--text-body)", marginTop: "0.3rem", lineHeight: 1.6 }}>
                  Never hesitate to advocate for your health. If you feel unwell, consult a qualified healthcare provider. Our CBIT NSS team stands with you!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ASK BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      <Footer />
    </>
  );
}
