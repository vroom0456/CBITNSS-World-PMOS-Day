'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: { label: string; value: string; isFlag?: boolean }[];
}

const wizardQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'Menstrual Pattern',
    question: 'How would you describe your menstrual cycle regularity over the past 6 months?',
    options: [
      { label: 'Regular — predictable cycles every 21–35 days', value: 'regular' },
      { label: 'Irregular — delayed cycles beyond 35 days or missed months', value: 'irregular', isFlag: true },
      { label: 'Absent — no periods for 3 or more consecutive months', value: 'absent', isFlag: true },
    ]
  },
  {
    id: 'q2',
    category: 'Skin & Hair Signs',
    question: 'Do you experience persistent jawline acne or unwanted coarse hair growth (chin, upper lip, chest)?',
    options: [
      { label: 'Rarely or never', value: 'none' },
      { label: 'Mild or occasional breakouts', value: 'mild', isFlag: true },
      { label: 'Persistent or moderate-to-severe facial hair and acne', value: 'severe', isFlag: true },
    ]
  },
  {
    id: 'q3',
    category: 'Metabolic & Energy',
    question: 'Do you notice unexplained abdominal weight shifts, intense sugar cravings, or severe post-meal fatigue?',
    options: [
      { label: 'No — energy and weight remain stable', value: 'stable' },
      { label: 'Sometimes — mild energy dips after meals', value: 'sometimes', isFlag: true },
      { label: 'Frequently — strong cravings and persistent fatigue', value: 'frequent', isFlag: true },
    ]
  },
  {
    id: 'q4',
    category: 'Emotional Wellbeing',
    question: 'Do physical symptoms or cycle unpredictability affect your mood, anxiety, or emotional confidence?',
    options: [
      { label: 'Minimal or no impact', value: 'minimal' },
      { label: 'Moderate impact on confidence or mood', value: 'moderate', isFlag: true },
      { label: 'Significant emotional stress or persistent anxiety', value: 'significant', isFlag: true },
    ]
  }
];

function countFlags(answers: Record<string, string>): number {
  let flagCount = 0;
  wizardQuestions.forEach(q => {
    const answer = answers[q.id];
    if (!answer) return;
    const selected = q.options.find(o => o.value === answer);
    if (selected?.isFlag) flagCount++;
  });
  return flagCount;
}

function getResultTone(flagCount: number): { emoji: string; headline: string; message: string; urgency: 'low' | 'moderate' | 'high' } {
  if (flagCount === 0) {
    return {
      emoji: '🌿',
      headline: 'Your responses show no significant indicators at this time.',
      message: 'You appear to have regular cycles and stable wellbeing. Continue supporting your health with balanced nutrition, adequate sleep, and annual well-woman check-ups.',
      urgency: 'low'
    };
  } else if (flagCount <= 2) {
    return {
      emoji: '💛',
      headline: 'You flagged a few indicators worth monitoring.',
      message: 'Some of your answers suggest mild signs that may be worth discussing with a healthcare professional at your next routine appointment. Early awareness is always beneficial.',
      urgency: 'moderate'
    };
  } else {
    return {
      emoji: '🩺',
      headline: 'Your responses suggest it would be worthwhile consulting a healthcare professional.',
      message: 'You reported multiple indicators across cycle patterns, skin or hair changes, metabolic energy, or emotional wellbeing. Seeking a clinical evaluation can provide clarity and personalised evidence-based care.',
      urgency: 'high'
    };
  }
}

export default function SelfTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
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

  const flagCount = countFlags(answers);
  const resultTone = getResultTone(flagCount);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section id="self-check" style={{ padding: '4rem 0 5rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>

            {/* Header */}
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">🔬 Interactive Screening</span>
              <h1 className="section-title">
                2-Minute <span className="accent">PMOS Self-Check Wizard</span>
              </h1>
              <p className="section-desc">
                Based on{' '}
                <em>Journal of Clinical Medicine (2023)</em>{' '}
                Rotterdam &amp; NIH Diagnostic Criteria for PMOS Phenotypes.
              </p>
            </div>

            {/* Non-diagnostic notice */}
            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '0.9rem 1.2rem', borderRadius: 'var(--r-sm)', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--nss-navy)', fontWeight: 600, lineHeight: 1.6 }}>
              ⚠️ <strong>This is not a diagnostic test.</strong> No personal data is recorded or stored. This awareness tool is designed to help you reflect on your health patterns and decide whether to seek medical guidance.
            </div>

            {/* Wizard Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-lg)', padding: '2.4rem 2rem', boxShadow: 'var(--shadow-card)' }}>

              {!quizFinished ? (
                <div>
                  {/* Progress header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    <span>{wizardQuestions[currentStep].category}</span>
                    <span>Step {currentStep + 1} of {wizardQuestions.length}</span>
                  </div>

                  <div className="wizard-progress-track">
                    <div className="wizard-progress-bar" style={{ width: `${((currentStep + 1) / wizardQuestions.length) * 100}%` }}></div>
                  </div>

                  <h2 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1.5rem', lineHeight: 1.55 }}>
                    {wizardQuestions[currentStep].question}
                  </h2>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem' }}>
                    {wizardQuestions[currentStep].options.map((opt, idx) => (
                      <button
                        key={idx}
                        className={`wizard-option-btn ${answers[wizardQuestions[currentStep].id] === opt.value ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(wizardQuestions[currentStep].id, opt.value)}
                      >
                        <span>{opt.label}</span>
                        <span>{answers[wizardQuestions[currentStep].id] === opt.value ? '✓' : ''}</span>
                      </button>
                    ))}
                  </div>

                  {/* Nav buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      style={{ opacity: currentStep === 0 ? 0.4 : 1, cursor: currentStep === 0 ? 'not-allowed' : 'pointer', background: 'transparent', border: '1.5px solid var(--border-light)', padding: '0.65rem 1.2rem', borderRadius: 'var(--r-pill)', fontWeight: 700, color: 'var(--nss-navy)' }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!answers[wizardQuestions[currentStep].id]}
                      style={{ opacity: !answers[wizardQuestions[currentStep].id] ? 0.5 : 1, cursor: !answers[wizardQuestions[currentStep].id] ? 'not-allowed' : 'pointer', background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800 }}
                    >
                      {currentStep === wizardQuestions.length - 1 ? 'See My Summary →' : 'Next →'}
                    </button>
                  </div>
                </div>

              ) : (
                /* ── Result screen — nuanced based on flag count ── */
                <div style={{ textAlign: 'center', animation: 'fade-in 0.4s ease' }}>
                  <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '0.4rem' }}>{resultTone.emoji}</span>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Awareness Summary
                  </span>

                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.5rem', marginBottom: '0.8rem', lineHeight: 1.48 }}>
                    {resultTone.headline}
                  </h2>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.68, marginBottom: '1.4rem' }}>
                    {resultTone.message}
                  </p>

                  {resultTone.urgency !== 'low' && (
                    <div style={{ background: 'var(--soft-teal-bg)', padding: '1.2rem 1.4rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.2rem', border: '1px solid var(--soft-teal-border)' }}>
                      <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.5rem' }}>📋 Suggested Next Steps</h5>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
                        <li>Track cycle dates and symptom patterns in a journal or period-tracking app for 2–3 months.</li>
                        <li>Consult a Gynaecologist or Endocrinologist — mention hormonal, metabolic, and emotional concerns together.</li>
                        {resultTone.urgency === 'high' && (
                          <li>Ask about blood evaluations: Free Testosterone, Fasting Insulin, SHBG, TSH, and Lipid Profile.</li>
                        )}
                        <li>Discuss sustainable lifestyle adjustments — nutrition, movement, consistent sleep, and stress management.</li>
                      </ul>
                    </div>
                  )}

                  {resultTone.urgency === 'low' && (
                    <div style={{ background: '#f0fdf4', padding: '1rem 1.4rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.2rem', border: '1px solid #bbf7d0', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.65 }}>
                      ✅ Continue supporting your health with balanced whole foods, regular physical activity (150 min/week), consistent sleep, and annual well-woman check-ups with your doctor.
                    </div>
                  )}

                  <div style={{ background: 'rgba(124, 92, 252, 0.08)', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.8rem', color: 'var(--nss-navy)', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    🛡️ <strong>Important:</strong> This is an awareness tool, not a diagnostic test. No personal data is recorded or stored. Please consult a qualified physician for a clinical evaluation.
                  </div>

                  <button
                    onClick={handleResetQuiz}
                    style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer' }}
                  >
                    🔄 Retake Awareness Check
                  </button>
                </div>
              )}

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
