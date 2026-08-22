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

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* SYMPTOMS SECTION */}
        <section id="symptoms" style={{ padding: "3rem 0 4rem" }}>
          <div className="container">
            <div className="heading-box reveal"><span className="section-tag">🩺 Symptom Tracker</span><h2 className="section-title">Common <span className="accent">PCOD Symptoms</span></h2><p className="section-desc">Every body is unique. You may experience one or multiple symptoms from this list.</p></div>
            <div className="symptoms-grid stagger-grid">
              <div className="symptom-card reveal"><div className="sym-icon">🩸</div><h4>Irregular Periods</h4><p>Cycles longer than 35 days, missed periods for 2+ months, or chronic anovulatory cycles.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">⚖️</div><h4>Abdominal Obesity &amp; Insulin Resistance</h4><p>Targeted weight gain around abdominal region due to elevated fasting insulin and hyperinsulinemia.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">✨</div><h4>Hormonal Acne &amp; Hirsutism</h4><p>Persistent jawline acne and unwanted coarse hair growth driven by excess free testosterone.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">💇‍♀️</div><h4>Androgenic Alopecia</h4><p>Scalp hair thinning caused by conversion of testosterone into dihydrotestosterone (DHT).</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">😴</div><h4>Fatigue &amp; Low-Grade Inflammation</h4><p>Chronic low-grade systemic inflammation, oxidative stress, and mitochondrial dysfunction.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🌙</div><h4>Acanthosis Nigricans</h4><p>Dark velvety skin pigmentation on neck folds, armpits, or knuckles linked to insulin resistance.</p></div>
            </div>
          </div>
        </section>

        {/* RESEARCH-BACKED PRECAUTIONS SECTION */}
        <section id="precautions" style={{ padding: "3rem 0 4rem", background: "#fff" }}>
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">🔬 Clinical Evidence</span>
              <h2 className="section-title">Evidence-Based <span className="accent">Management Protocol</span></h2>
              <p className="section-desc">Recommendations synthesized from clinical trials published in <em>Journal of Clinical Medicine (2023)</em>.</p>
            </div>
            
            <div className="tab-buttons reveal">
              <button className="tab-btn active" onClick={(e) => window.showTab('daily', e.currentTarget)}>🌅 Exercise &amp; Movement</button>
              <button className="tab-btn" onClick={(e) => window.showTab('microbiome', e.currentTarget)}>🦠 Gut Microbiome Care</button>
              <button className="tab-btn" onClick={(e) => window.showTab('medical', e.currentTarget)}>💊 Inositols &amp; Clinical Checks</button>
              <button className="tab-btn" onClick={(e) => window.showTab('mental', e.currentTarget)}>🧘 Mental &amp; Sleep Care</button>
            </div>

            {/* TAB 1: EXERCISE */}
            <div className="tab-content active" id="tab-daily">
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Vigorous Resistance &amp; Aerobic Exercise</h5>
                    <p>Clinical trials show high-intensity exercise enhances GLUT-4 glucose transporter expression, significantly lowering fasting insulin, HOMA-IR, and serum testosterone levels.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Circadian Sleep &amp; Cortisol Regulation</h5>
                    <p>8 hours of restorative sleep regulates the HPO axis and reduces hypercortisolemia (which otherwise promotes adrenal androgen production).</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">3</div>
                  <div className="pre-info">
                    <h5>Targeted Weight Loss (5-10% Loss Benefits)</h5>
                    <p>Losing 5-10% of total body weight drastically improves menstrual cyclicity, reduces Free Androgen Index (FAI), and restores natural ovulation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 2: GUT MICROBIOME (DOGMA THEORY) */}
            <div className="tab-content" id="tab-microbiome" style={{ display: "none" }}>
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Probiotic Supplementation (Lactobacillus &amp; Bifidobacterium)</h5>
                    <p>Restores gut microbial diversity, reduces LPS mucosal endotoxemia, boosts SHBG levels, and significantly lowers free testosterone &amp; oxidative stress (MDA).</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Prebiotic Fermentable Fiber (Inulin, FOS, Resistant Dextrin)</h5>
                    <p>Promotes Short-Chain Fatty Acid (SCFA) production (especially Butyrate) which seals the gut epithelial barrier and lowers triglycerides &amp; LDL cholesterol.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">3</div>
                  <div className="pre-info">
                    <h5>Anti-Inflammatory Gut Nutrients</h5>
                    <p>Flaxseed oil (rich in α-linolenic acid/Omega-3) and Curcumin modulate the sex steroid hormone-microbiota axis to ease inflammatory symptoms.</p>
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
                    <h5>Myo-Inositol &amp; D-Chiro-Inositol (40:1 Physiological Ratio)</h5>
                    <p>Restores intracellular InsP3 messenger signaling to optimize glucose intake, normalize the LH/FSH ratio, and improve oocyte maturation &amp; fertility outcomes.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Vitamin D3 (25(OH)D) + Calcium Supplementation</h5>
                    <p>Restores abnormal serum Anti-Müllerian Hormone (AMH) levels, enhances FSH receptor sensitivity, and lowers fasting blood sugar &amp; hirsutism markers.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">3</div>
                  <div className="pre-info">
                    <h5>Clinical Lab Screening</h5>
                    <p>Comprehensive evaluation: Free Testosterone, Fasting Insulin (HOMA-IR), SHBG, Lipid Profile, TSH, and Pelvic Ultrasound for ovarian volume.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB 4: MENTAL */}
            <div className="tab-content" id="tab-mental" style={{ display: "none" }}>
              <div className="precautions-list">
                <div className="pre-card">
                  <div className="pre-num">1</div>
                  <div className="pre-info">
                    <h5>Stress Management (Cortisol-Androgen Control)</h5>
                    <p>Chronic stress increases 11beta-HSD1 and 5alpha-reductase activity, accelerating peripheral androgen synthesis. Daily mindfulness reduces ACTH stimulation.</p>
                  </div>
                </div>
                <div className="pre-card">
                  <div className="pre-num">2</div>
                  <div className="pre-info">
                    <h5>Quality of Life (QoL) Support</h5>
                    <p>Clinical studies emphasize holistic well-being over rigid quick-fixes. Sustainable hormonal balance requires 3 to 6 months of consistent habit building.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIET SECTION */}
        <section id="diet" style={{ padding: "3rem 0 4rem" }}>
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">🥗 Nutritional Science</span>
              <h2 className="section-title">Clinical <span className="accent">Dietary Protocols</span></h2>
              <p className="section-desc">Low-Glycemic Index (Low-GI) &amp; Anti-Inflammatory diet guidelines from recent medical literature.</p>
            </div>
            
            <div className="diet-grid">
              <div className="diet-card eat reveal-left">
                <h4>✅ Recommended Low-GI &amp; Anti-Inflammatory Foods</h4>
                <ul className="diet-list">
                  <li><strong>Low-GI Complex Carbs:</strong> Quinoa, Oats, Ragi, Jowar, Brown Rice (reduces ghrelin &amp; fasting insulin).</li>
                  <li><strong>High Fiber &amp; Prebiotics:</strong> Broccoli, Spinach, Garlic, Onions, Berries (fuels SCFA-producing gut bacteria).</li>
                  <li><strong>Omega-3 Healthy Fats:</strong> Flaxseed oil, Walnuts, Chia seeds, Almonds (boosts SHBG synthesis).</li>
                  <li><strong>Fermented Foods / Probiotics:</strong> Curd, Kefir, Fermented vegetables (enhances *Lactobacillus* diversity).</li>
                  <li><strong>Anti-Androgenic Drinks:</strong> Spearmint Tea (proven to lower free androgen index).</li>
                </ul>
              </div>
              <div className="diet-card avoid reveal-right">
                <h4>❌ Inflammatory Foods to Eliminate / Restrict</h4>
                <ul className="diet-list">
                  <li><strong>Saturated Fats:</strong> Deep-fried snacks, excess lard/palm oil (induces LPS-mediated TNF-α &amp; SOCS-3 inflammation).</li>
                  <li><strong>High Fructose &amp; Refined Sugars:</strong> Packaged juices, sodas, sweets (exacerbates endocrine abnormalities).</li>
                  <li><strong>High-GI Simple Carbs:</strong> Maida, white bread, pastries, instant noodles (causes acute glycemic &amp; insulin spikes).</li>
                  <li><strong>Excessive Caffeine:</strong> Limit coffee to 1 cup daily to prevent adrenal cortisol &amp; androgen surges.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      {/* ANONYMOUS MODAL */}
      <div className="modal-overlay" id="anon-modal" onClick={(e) => window.closeModalOnOverlay(e)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-container">
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
