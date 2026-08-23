'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  description: string;
  options: { label: string; value: string; isFlag?: boolean }[];
}

const wizardQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: '1. Menstrual & Ovulatory Pattern',
    question: 'How would you describe your menstrual cycle regularity over the past 6 to 12 months?',
    description: 'Cycle length is calculated from the 1st day of one period to the 1st day of the next.',
    options: [
      { label: 'Regular — predictable cycles every 21 to 35 days', value: 'regular' },
      { label: 'Irregular — delayed cycles longer than 35 days or variable timing', value: 'irregular', isFlag: true },
      { label: 'Absent — no periods for 3 or more consecutive months', value: 'absent', isFlag: true },
    ]
  },
  {
    id: 'q2',
    category: '2. Androgenic & Skin Indicators',
    question: 'Do you experience persistent facial acne or unwanted coarse hair growth?',
    description: 'Refers to acne along the jawline/chin or hair growth on chin, upper lip, chest, or abdomen.',
    options: [
      { label: 'Rarely or never — clear skin and normal hair patterns', value: 'none' },
      { label: 'Mild — occasional jawline breakouts or minor facial hair', value: 'mild', isFlag: true },
      { label: 'Moderate to Severe — persistent cystic acne or noticeable coarse hair growth', value: 'severe', isFlag: true },
    ]
  },
  {
    id: 'q3',
    category: '3. Metabolic & Glucose Handling',
    question: 'Do you experience severe post-meal energy crashes, intense sugar cravings, or central weight shifts?',
    description: 'Insulin resistance can affect individuals of any body weight, including lean individuals.',
    options: [
      { label: 'No — steady daily energy and stable weight balance', value: 'stable' },
      { label: 'Sometimes — mild energy dips after carbohydrate meals', value: 'sometimes', isFlag: true },
      { label: 'Frequently — strong sugar cravings, heavy post-meal fatigue, or dark skin folds', value: 'frequent', isFlag: true },
    ]
  },
  {
    id: 'q4',
    category: '4. Emotional Wellbeing & Stress Axis',
    question: 'Do physical symptoms or cycle unpredictability affect your mood, anxiety, or confidence?',
    description: 'International guidelines emphasize emotional health as a core component of PMOS.',
    options: [
      { label: 'Minimal or no impact — feeling emotionally balanced', value: 'minimal' },
      { label: 'Moderate impact — occasional stress, mood swings, or body confidence worries', value: 'moderate', isFlag: true },
      { label: 'Significant impact — persistent anxiety, low mood, or severe health-related stress', value: 'significant', isFlag: true },
    ]
  }
];

export default function SelfTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

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

  const handleOptionSelect = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleNextStep = () => {
    if (currentStep < wizardQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Flag Analysis
  const flaggedQuestions = wizardQuestions.filter(q => {
    const ans = answers[q.id];
    if (!ans) return false;
    const selected = q.options.find(o => o.value === ans);
    return selected?.isFlag;
  });

  const flagCount = flaggedQuestions.length;

  const isCycleFlagged = flaggedQuestions.some(q => q.id === 'q1');
  const isSkinFlagged = flaggedQuestions.some(q => q.id === 'q2');
  const isMetabolicFlagged = flaggedQuestions.some(q => q.id === 'q3');
  const isEmotionalFlagged = flaggedQuestions.some(q => q.id === 'q4');

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section id="self-check" style={{ padding: '3.5rem 0 5rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem' }}>

            {/* PAGE HEADER */}
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">🔬 Interactive Awareness Screening</span>
              <h1 className="section-title">
                2-Minute <span className="accent">PMOS Self-Check Wizard</span>
              </h1>
              <p className="section-desc">
                Aligned with the <em>2023 &amp; 2026 International Evidence-Based Guidelines (Monash)</em>.
              </p>
            </div>

            {/* TOP NOTICE */}
            <div className="quiz-top-notice" style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '0.95rem 1.3rem', borderRadius: 'var(--r-sm)', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--nss-navy)', fontWeight: 600, lineHeight: 1.6, boxShadow: 'var(--shadow-soft)' }}>
              🛡️ <strong>Educational Awareness Tool:</strong> No personal data or answers are stored. This self-check helps you evaluate symptom patterns to prepare for a healthcare consultation.
            </div>

            {/* WIZARD CARD */}
            <div className={`wizard-card ${quizFinished ? 'quiz-results-mode' : ''}`}>

              {!quizFinished ? (
                <div>
                  {/* Progress tracker */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>
                    <span>{wizardQuestions[currentStep].category}</span>
                    <span>Step {currentStep + 1} of {wizardQuestions.length}</span>
                  </div>

                  <div className="wizard-progress-track" style={{ marginBottom: '1.5rem' }}>
                    <div className="wizard-progress-bar" style={{ width: `${((currentStep + 1) / wizardQuestions.length) * 100}%` }}></div>
                  </div>

                  <h2 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                    {wizardQuestions[currentStep].question}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.6rem' }}>
                    {wizardQuestions[currentStep].description}
                  </p>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.8rem' }}>
                    {wizardQuestions[currentStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        className={`wizard-option-btn ${answers[wizardQuestions[currentStep].id] === opt.value ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(wizardQuestions[currentStep].id, opt.value)}
                        style={{ textAlign: 'left' }}
                      >
                        <span style={{ flex: 1 }}>{opt.label}</span>
                        <span style={{ fontSize: '1.1rem', marginLeft: '0.5rem' }}>{answers[wizardQuestions[currentStep].id] === opt.value ? '✓' : ''}</span>
                      </button>
                    ))}
                  </div>

                  {/* Nav buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      className="wizard-nav-prev"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      style={{ opacity: currentStep === 0 ? 0.4 : 1, cursor: currentStep === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      ← Back
                    </button>
                    <button
                      className="wizard-nav-next"
                      onClick={handleNextStep}
                      disabled={!answers[wizardQuestions[currentStep].id]}
                      style={{ opacity: !answers[wizardQuestions[currentStep].id] ? 0.5 : 1, cursor: !answers[wizardQuestions[currentStep].id] ? 'not-allowed' : 'pointer' }}
                    >
                      {currentStep === wizardQuestions.length - 1 ? 'View Personalised Summary →' : 'Next →'}
                    </button>
                  </div>
                </div>

              ) : (
                /* ── ACCURATE PERSONALISED RESULT SCREEN ── */
                <div style={{ animation: 'fade-in 0.4s ease' }}>
                  
                  <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
                    <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '0.4rem' }}>
                      {flagCount === 0 ? '🌿' : flagCount <= 2 ? '💛' : '🩺'}
                    </span>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      Awareness Summary &amp; Recommendations
                    </span>

                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem', lineHeight: 1.4 }}>
                      {flagCount === 0 
                        ? 'No Significant Indicators Flagged'
                        : flagCount <= 2
                        ? 'Mild PMOS Indicators Observed'
                        : 'Multiple PMOS Indicators Flagged'}
                    </h2>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                      {flagCount === 0
                        ? 'Your answers indicate stable cycle regularity, clear skin, balanced energy, and emotional wellbeing. Continue supporting your overall health with balanced whole-food nutrition and regular movement.'
                        : `You flagged ${flagCount} area${flagCount > 1 ? 's' : ''} out of 4 core pillars. Review your category-specific recommendations below.`}
                    </p>
                  </div>

                  {/* CATEGORY-SPECIFIC TAILORED RECOMMENDATIONS */}
                  {flagCount > 0 && (
                    <div className="result-block-box result-recommendations-box">
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📋 Tailored Clinical Recommendations
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {isCycleFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: 'var(--r-sm)', borderLeft: '4px solid var(--nss-blue-accent)' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              🩸 Menstrual Cycle Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                              Track cycle start dates for 2–3 months using a period-tracking app or calendar. Schedule a consultation with a certified Gynaecologist to evaluate ovulatory health and rule out secondary causes.
                            </p>
                          </div>
                        )}

                        {isSkinFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: 'var(--r-sm)', borderLeft: '4px solid #7C5CFC' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              ✨ Androgenic &amp; Skin Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                              Discuss serum free testosterone, DHEAS, and SHBG lab panels with your doctor. Avoid severe restrictive diets; focus on anti-inflammatory nutrition and non-comedogenic dermatological care.
                            </p>
                          </div>
                        )}

                        {isMetabolicFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: 'var(--r-sm)', borderLeft: '4px solid #059669' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              ⚡ Metabolic &amp; Glucose Sensitivity Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                              Ask your physician about Fasting Insulin, HbA1c, and Lipid Profile screenings. Emphasize low-glycemic index (Low-GI) complex carbohydrates, high prebiotic fiber, and resistance exercise to boost GLUT-4 cellular insulin sensitivity.
                            </p>
                          </div>
                        )}

                        {isEmotionalFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: 'var(--r-sm)', borderLeft: '4px solid #9333EA' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              🧘 Emotional Wellbeing &amp; Stress Axis Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                              Recognize that anxiety and mood swings linked to PMOS are physiological HPA-axis responses — not personal weakness. Prioritize 7–9 hours of circadian sleep, stress-reduction techniques, and peer or professional counseling.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── PROMINENT MEDICAL DISCLAIMER BOX UNDER RECOMMENDATIONS ── */}
                  <div className="result-disclaimer-box">
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>🛡️</span>
                      <div>
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: '#92400E', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Medical Disclaimer &amp; Clinical Notice
                        </h4>
                        <p style={{ fontSize: '0.86rem', color: '#78350F', lineHeight: 1.65 }}>
                          This self-check tool is provided <strong>strictly for campus health awareness and education</strong>. It does <strong>NOT</strong> constitute a clinical diagnosis, medical opinion, or personalized treatment plan. Symptoms like cycle delays, acne, or fatigue can result from various underlying factors (including thyroid shifts, stress, or nutritional deficits). <strong>No personal data or answers are stored.</strong> Always consult a qualified healthcare provider (Gynaecologist or Endocrinologist) for an accurate clinical diagnosis and tailored medical care.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* POINTERS TO BRING TO YOUR DOCTOR */}
                  <div className="result-block-box result-pointers-box">
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>
                      📋 Key Pointers to Bring to Your Doctor
                    </h3>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                      <li><strong>Diagnostic Differential:</strong> &quot;Could my symptoms be caused by thyroid shifts, vitamin deficiencies, or adrenal variation?&quot;</li>
                      <li><strong>Blood Panel Screening:</strong> &quot;Which blood tests (Free Testosterone, Fasting Insulin, SHBG, Lipid Profile, TSH) should we run?&quot;</li>
                      <li><strong>Lifestyle &amp; Phenotype Care:</strong> &quot;What evidence-based nutrition or exercise habits suit my specific phenotype?&quot;</li>
                    </ul>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={handlePrint}
                        style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.7rem 1.5rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', border: 'none' }}
                      >
                        🖨️ Save / Print Checklist for Appointment
                      </button>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleResetQuiz}
                      style={{ background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.75rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer', border: 'none' }}
                    >
                      🔄 Retake Self-Check
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
