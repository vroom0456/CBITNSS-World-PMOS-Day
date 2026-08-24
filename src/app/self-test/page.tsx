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
      <main className="page-main">
        <section id="self-check" style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(2rem, 5vw, 4rem)', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem' }}>

            {/* PAGE HEADER */}
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">Awareness screening</span>
              <h1 className="section-title">
                2-Minute <span className="accent">PCOS Self-Check</span>
              </h1>
              <p className="section-desc">
                An educational awareness tool informed by the 2023 International PCOS Guidelines (Monash University).
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

                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.3rem', lineHeight: 1.45 }}>
                    {wizardQuestions[currentStep].question}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                    {wizardQuestions[currentStep].description}
                  </p>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.6rem' }}>
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
                  <div className="wizard-nav-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
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
                      {currentStep === wizardQuestions.length - 1 ? (
                        <>
                          <span className="d-none d-sm-inline">View Personalised Summary →</span>
                          <span className="d-inline d-sm-none">View Summary →</span>
                        </>
                      ) : (
                        'Next →'
                      )}
                    </button>
                  </div>
                </div>

              ) : (
                /* ── ACCURATE PERSONALISED RESULT SCREEN (STREAMLINED & ELEGANT) ── */
                <div style={{ animation: 'fade-in 0.4s ease' }}>
                  
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.4rem' }}>
                      {flagCount === 0 ? '🌿' : flagCount <= 2 ? '💛' : '🩺'}
                    </span>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Awareness Summary &amp; Recommendations
                    </span>

                    <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.35rem', lineHeight: 1.35 }}>
                      {flagCount === 0 
                        ? 'No notable patterns identified'
                        : flagCount <= 2
                        ? 'Some patterns worth discussing'
                        : 'Several patterns worth discussing with a doctor'}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65, maxWidth: '580px', margin: '0.4rem auto 0' }}>
                      {flagCount === 0
                        ? 'Your answers suggest broadly regular patterns across cycle, skin, energy and mood. Keep supporting your health with balanced nutrition, regular movement and adequate sleep.'
                        : `You noted ${flagCount} area${flagCount > 1 ? 's' : ''} that may be worth mentioning at your next healthcare appointment. See suggested conversation starters below.`}
                    </p>
                  </div>

                  {/* CATEGORY-SPECIFIC TAILORED RECOMMENDATIONS */}
                  {flagCount > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Conversation starters for your doctor
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {isCycleFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: '18px', borderLeft: '4px solid var(--nss-blue-accent)', border: '1px solid var(--border-light)' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              🩸 Menstrual Cycle Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                              Track cycle start dates for 2–3 months using a period-tracking app or calendar. Schedule a consultation with a certified Gynaecologist to evaluate ovulatory health and rule out secondary causes.
                            </p>
                          </div>
                        )}

                        {isSkinFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: '18px', borderLeft: '4px solid var(--nss-blue-accent)', border: '1px solid var(--border-light)' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              ✨ Androgenic &amp; Skin Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                              Discuss serum free testosterone, DHEAS, and SHBG lab panels with your doctor. Avoid severe restrictive diets; focus on anti-inflammatory nutrition and non-comedogenic dermatological care.
                            </p>
                          </div>
                        )}

                        {isMetabolicFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: '18px', borderLeft: '4px solid #059669', border: '1px solid var(--border-light)' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              ⚡ Metabolic &amp; Glucose Sensitivity Care
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                              Ask your physician about Fasting Insulin, HbA1c, and Lipid Profile screenings. Emphasize low-glycemic index (Low-GI) complex carbohydrates, high prebiotic fiber, and resistance exercise to boost GLUT-4 cellular insulin sensitivity.
                            </p>
                          </div>
                        )}

                        {isEmotionalFlagged && (
                          <div className="recommendation-item" style={{ background: '#FFFFFF', padding: '1rem 1.2rem', borderRadius: '18px', borderLeft: '4px solid #9333EA', border: '1px solid var(--border-light)' }}>
                            <strong style={{ color: 'var(--nss-navy)', fontSize: '0.92rem', display: 'block', marginBottom: '0.2rem' }}>
                              🧠 Emotional wellbeing &amp; stress
                            </strong>
                            <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                              Anxiety and mood changes linked to PMOS are physiological responses — not personal weakness. Consistent sleep, stress-reduction practices and peer or professional support can help. Mention these to your doctor or a counsellor.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── PROMINENT MEDICAL DISCLAIMER NOTICE ── */}
                  <div style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-light)', borderRadius: '20px', padding: '1.2rem 1.4rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>🛡️</span>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Medical Disclaimer &amp; Clinical Notice
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
                          This self-check tool is provided <strong>strictly for campus health awareness and education</strong>. It does <strong>NOT</strong> constitute a clinical diagnosis, medical opinion, or personalized treatment plan. Symptoms like cycle delays, acne, or fatigue can result from various underlying factors. <strong>No personal data or answers are stored.</strong> Always consult a qualified healthcare provider for clinical evaluation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* POINTERS TO BRING TO YOUR DOCTOR */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                      Questions to bring to your doctor
                    </h3>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                      <li>&quot;Could these symptoms be caused by thyroid issues, vitamin deficiencies or stress?&quot;</li>
                      <li>&quot;Which tests would you recommend — hormone levels, insulin, thyroid (TSH)?&quot;</li>
                      <li>&quot;What lifestyle changes would you recommend for my specific situation?&quot;</li>
                    </ul>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={handlePrint}
                        className="btn-print-action"
                        style={{ cursor: 'pointer' }}
                      >
                        🖨️ Save / Print Checklist for Appointment
                      </button>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleResetQuiz}
                      className="btn-retake-action"
                      style={{ cursor: 'pointer' }}
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
