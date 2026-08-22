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
    question: '1. How would you describe your menstrual cycle regularity over the past 6 months?',
    options: [
      { label: 'Regular (Predictable 21–35 day cycles)', value: 'regular' },
      { label: 'Irregular (Delayed cycles > 35 days or missed months)', value: 'irregular', isFlag: true },
      { label: 'Absent (No periods for 3+ consecutive months)', value: 'absent', isFlag: true },
    ]
  },
  {
    id: 'q2',
    category: 'Skin & Hair Indicators',
    question: '2. Do you experience persistent jawline acne or unwanted coarse hair growth (chin, upper lip, chest)?',
    options: [
      { label: 'Rarely or never', value: 'none' },
      { label: 'Mild / occasional breakouts', value: 'mild' },
      { label: 'Persistent / moderate-to-severe hirsutism or acne', value: 'severe', isFlag: true },
    ]
  },
  {
    id: 'q3',
    category: 'Metabolic & Energy',
    question: '3. Do you notice unexplained abdominal weight shifts, intense sugar cravings, or severe post-meal fatigue?',
    options: [
      { label: 'No, my energy and weight remain stable', value: 'stable' },
      { label: 'Sometimes experience mild energy dips', value: 'sometimes' },
      { label: 'Frequently experience abdominal weight shifts & strong cravings', value: 'frequent', isFlag: true },
    ]
  },
  {
    id: 'q4',
    category: 'Emotional & Quality of Life',
    question: '4. Do physical symptoms or cycle unpredictability affect your mood, anxiety, or confidence?',
    options: [
      { label: 'Minimal or no impact', value: 'minimal' },
      { label: 'Moderate impact on confidence or mood', value: 'moderate' },
      { label: 'Significant emotional stress or anxiety', value: 'significant', isFlag: true },
    ]
  }
];

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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));
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
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizFinished(false);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <section id="self-check" style={{ padding: '4rem 0 5rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">🔬 Interactive Screening</span>
              <h2 className="section-title">2-Minute <span className="accent">PMOS Self-Check Wizard</span></h2>
              <p className="section-desc" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', margin: '0 auto', maxWidth: '100%', fontSize: 'clamp(0.72rem, 2.2vw, 0.98rem)' }}>
                Based on <em>Journal of Clinical Medicine (2023)</em> Rotterdam &amp; NIH Diagnostic Criteria for PMOS Phenotypes.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-lg)', padding: '2.4rem 2rem', boxShadow: 'var(--shadow-card)' }}>
              
              {!quizFinished ? (
                <div>
                  {/* PROGRESS TRACKER */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    <span>{wizardQuestions[currentStep].category}</span>
                    <span>Step {currentStep + 1} of {wizardQuestions.length}</span>
                  </div>

                  <div className="wizard-progress-track">
                    <div className="wizard-progress-bar" style={{ width: `${((currentStep + 1) / wizardQuestions.length) * 100}%` }}></div>
                  </div>

                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {wizardQuestions[currentStep].question}
                  </h3>

                  {/* OPTIONS */}
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

                  {/* NAV BUTTONS */}
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
                      {currentStep === wizardQuestions.length - 1 ? 'See Results →' : 'Next Step →'}
                    </button>
                  </div>
                </div>
              ) : (
                /* RESULT SCREEN */
                <div style={{ textAlign: 'center', animation: 'fade-in 0.4s ease' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>🩺</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Screening Summary
                  </span>
                  
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
                    Your answers suggest that it may be worth discussing these symptoms with a healthcare professional.
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    You reported notable indicators regarding cycle pattern, androgen signs, or energy levels. Seeking medical guidance can provide clarity and evidence-based care.
                  </p>

                  <div style={{ background: 'var(--soft-teal-bg)', padding: '1.2rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--soft-teal-border)' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.5rem' }}>📋 Recommended Next Steps:</h5>
                    <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                      <li>Track cycle dates and symptom severity for 2–3 months.</li>
                      <li>Consult a certified Gynaecologist or Endocrinologist for blood evaluation (Free Testosterone, Fasting Insulin, TSH).</li>
                      <li>Discuss sustainable nutrition, physical activity, and stress management.</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(124, 92, 252, 0.08)', padding: '0.8rem', borderRadius: 'var(--r-sm)', fontSize: '0.82rem', color: 'var(--nss-navy)', fontWeight: 600, marginBottom: '1.5rem' }}>
                    🛡️ <strong>Reminder:</strong> This is not a diagnostic test. No medical record or personal data is collected or saved.
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
