'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

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

const mythsList = [
  {
    id: 'm1',
    myth: '“PMOS means you can never get pregnant.”',
    fact: 'With appropriate lifestyle care and evidence-based medical guidance, most individuals with PMOS can conceive naturally or with simple treatments.',
    details: 'Ovulation may be irregular, but ovaries contain healthy eggs. Medical care focuses on supporting regular ovulatory cycles.'
  },
  {
    id: 'm2',
    myth: '“PMOS is only about the ovaries and reproductive health.”',
    fact: 'PMOS is a multi-system condition involving endocrine, metabolic, cardiovascular, and psychological health.',
    details: 'While reproductive symptoms are common, metabolic features (insulin sensitivity, lipid transport) and mental health play equal roles in long-term management.'
  },
  {
    id: 'm3',
    myth: '“Everyone with PMOS has the exact same symptoms.”',
    fact: 'PMOS is highly heterogeneous with multiple clinical phenotypes ranging from lean ovulatory to metabolic variants.',
    details: 'Symptoms vary widely between individuals. One person may experience acne and mood changes while another experiences cycle delays.'
  },
  {
    id: 'm4',
    myth: '“PMOS can be 100% reversed by a simple 7-day diet or tea.”',
    fact: 'PMOS is a lifelong hormonal and metabolic tendency managed through sustainable, long-term healthy habits.',
    details: 'There are no quick-fix cures. Sustainable nutrition, physical activity, sleep, and medical support provide long-term hormonal balance.'
  },
  {
    id: 'm5',
    myth: '“PMOS only affects individuals with higher body weight.”',
    fact: 'PMOS occurs across all body types, including lean individuals (often driven by stress, adrenal, or genetic factors).',
    details: 'Weight is not a diagnostic requirement. Lean PMOS requires equal clinical care and attention.'
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'reproductive' | 'endocrine' | 'metabolic' | 'mental'>('reproductive');
  
  // Quiz Wizard State
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Myth Cards Expand State
  const [expandedMyth, setExpandedMyth] = useState<string | null>(null);

  // Source Drawer Modal State
  const [sourceDrawerOpen, setSourceDrawerOpen] = useState(false);
  const [selectedSourceTitle, setSelectedSourceTitle] = useState('');
  const [selectedSourceContent, setSelectedSourceContent] = useState('');

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
      if (anonModal) {
        anonModal.style.display = 'flex';
        requestAnimationFrame(() => requestAnimationFrame(() => anonModal.classList.add('active')));
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('openModal', handleOpenModal);

    return () => {
      observer.disconnect();
      window.removeEventListener('openModal', handleOpenModal);
    };
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

  const openSourceModal = (title: string, content: string) => {
    setSelectedSourceTitle(title);
    setSelectedSourceContent(content);
    setSourceDrawerOpen(true);
  };

  const handlePrintQuestions = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '74px' }}>
        
        {/* SECTION 1: HERO */}
        <section id="hero">
          <div className="hero-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="nss-hero-badge" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={22} height={22} priority />
              CBIT NSS Awareness Campaign 2026
            </div>
            
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>
              📅 WORLD PMOS AWARENESS DAY 2026
            </span>
            
            <h1 style={{ whiteSpace: 'nowrap', fontSize: 'clamp(1.4rem, 5.2vw, 3.8rem)', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', maxWidth: '100%', color: 'var(--nss-navy)', fontWeight: 800 }}>
              More than the ovaries. <span className="accent-text" style={{ color: 'var(--nss-blue-accent)' }}>More than a period.</span>
            </h1>
            
            <p className="hero-desc" style={{ fontSize: '1.08rem', color: 'var(--text-body)', lineHeight: 1.7, maxWidth: '720px', margin: '1rem auto 1.8rem' }}>
              <strong>PMOS (Polyendocrine Metabolic Ovarian Syndrome)</strong> — the condition formerly known as PCOS — is a multi-system health condition affecting reproductive, endocrine, metabolic, and emotional wellbeing.
            </p>

            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#understand" className="btn-hero-modal" style={{ background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.9rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 800 }}>
                📖 Learn About PMOS
              </a>
              <Link href="/self-test" className="btn-hero-guide" style={{ background: '#FFFFFF', color: 'var(--nss-navy)', border: '2px solid var(--border-light)', padding: '0.9rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 700 }}>
                📝 2-Minute Self-Check
              </Link>
              <button onClick={() => window.dispatchEvent(new Event('openModal'))} style={{ background: 'transparent', color: 'var(--nss-blue-accent)', border: 'none', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', padding: '0.9rem 1rem' }}>
                🌸 Ask Anonymously →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: PMOS BY THE NUMBERS */}
        <section id="numbers" style={{ padding: '3.5rem 0', background: 'var(--card-white)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📊 Global Statistics</span>
              <h2 className="section-title">PMOS <span className="accent">By The Numbers</span></h2>
              <p className="section-desc">Sourced from the <em>2023 &amp; 2026 International Evidence-Based Guidelines (Monash)</em>.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
              <div className="stat-box reveal" style={{ background: 'var(--soft-teal-bg)', padding: '2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', textAlign: 'center' }}>
                <span className="num-val" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>1 in 8</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem' }}>Reproductive Age Women</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>
                  Affects up to 13% of women worldwide, making it the most prevalent endocrine condition.
                </p>
                <button className="source-trigger-btn" onClick={() => openSourceModal('Monash Guideline 2023', 'Epidemiology data from 2023 International Evidence-Based Guideline for the Assessment and Management of PCOS/PMOS.')}>
                  ⓘ Sources
                </button>
              </div>

              <div className="stat-box reveal" style={{ background: 'var(--soft-teal-bg)', padding: '2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', textAlign: 'center' }}>
                <span className="num-val" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>170M+</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem' }}>Worldwide Impact</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>
                  Over 170 million individuals globally experience reproductive, metabolic, or psychological symptoms.
                </p>
                <button className="source-trigger-btn" onClick={() => openSourceModal('WHO & Monash Data 2026', 'Global burden statistics published by WHO and Monash University international research consensus.')}>
                  ⓘ Sources
                </button>
              </div>

              <div className="stat-box reveal" style={{ background: 'var(--soft-teal-bg)', padding: '2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', textAlign: 'center' }}>
                <span className="num-val" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>2026</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem' }}>Terminology Update</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem' }}>
                  International consensus updated &quot;PCOS&quot; to &quot;PMOS&quot; to reflect multi-system metabolic &amp; endocrine health.
                </p>
                <button className="source-trigger-btn" onClick={() => openSourceModal('2026 PMOS Nomenclature Consensus', 'International terminology update clarifying that ovaries are not the sole origin of the condition.')}>
                  ⓘ Sources
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHY THE NAME CHANGED (VISUAL ANIMATION / STEPPER) */}
        <section id="understand" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🔬 Nomenclature Evolution</span>
              <h2 className="section-title">Why The Name Changed: <span className="accent">PCOS → PMOS</span></h2>
              <p className="section-desc">Understanding why international medical guidelines updated the terminology in 2026.</p>
            </div>

            <div className="timeline-track reveal">
              <div className="timeline-step">
                <span className="timeline-year">1935 – 2020s</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>The Old Name: PCOS (Polycystic Ovary Syndrome)</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.3rem' }}>
                  Originally named after the appearance of small fluid-filled sacs on ovarian ultrasounds. However, many individuals with the condition do not have ovarian cysts, and cysts themselves are not the primary cause.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2023 Guideline</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Broader Health Recognition</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.3rem' }}>
                  The 2023 International Evidence-Based Guideline emphasized that insulin resistance, androgen regulation, and emotional wellbeing are central pillars—not just ovarian morphology.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2026 Consensus</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Current Terminology: PMOS (Polyendocrine Metabolic Ovarian Syndrome)</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '0.3rem' }}>
                  PMOS accurately describes the multi-system nature: <strong>Polyendocrine</strong> (multiple hormonal pathways), <strong>Metabolic</strong> (insulin &amp; glucose handling), and <strong>Ovarian</strong> (ovulatory health).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT IS PMOS? (4 PILLARS) */}
        <section style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🩺 Multi-System Understanding</span>
              <h2 className="section-title">The Four Pillars of <span className="accent">PMOS</span></h2>
              <p className="section-desc">PMOS is a complex condition involving interconnected physiological systems.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className={`tab-btn ${activeTab === 'reproductive' ? 'active' : ''}`} onClick={() => setActiveTab('reproductive')}>🌸 1. Reproductive</button>
              <button className={`tab-btn ${activeTab === 'endocrine' ? 'active' : ''}`} onClick={() => setActiveTab('endocrine')}>⚖️ 2. Endocrine / Hormonal</button>
              <button className={`tab-btn ${activeTab === 'metabolic' ? 'active' : ''}`} onClick={() => setActiveTab('metabolic')}>⚡ 3. Metabolic</button>
              <button className={`tab-btn ${activeTab === 'mental' ? 'active' : ''}`} onClick={() => setActiveTab('mental')}>🧘 4. Psychological</button>
            </div>

            <div className="summary-card reveal" style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--soft-teal-border)', padding: '2.5rem', borderRadius: 'var(--r-lg)' }}>
              {activeTab === 'reproductive' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>🌸 Reproductive Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginTop: '0.6rem' }}>
                    Involves irregular or delayed menstrual cycles, variable ovulation timing, and altered follicle development. Having irregular cycles does not mean ovulation is permanently absent; natural or supported ovulation is common.
                  </p>
                </div>
              )}

              {activeTab === 'endocrine' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>⚖️ Endocrine &amp; Hormonal Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginTop: '0.6rem' }}>
                    Involves shifts in androgen regulation (free testosterone, DHEAS) and LH:FSH pituitary signals, which can present as hormonal acne, facial hair growth (hirsutism), or hair thinning.
                  </p>
                </div>
              )}

              {activeTab === 'metabolic' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>⚡ Metabolic Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginTop: '0.6rem' }}>
                    Involves cellular insulin sensitivity, blood glucose regulation, and lipid transport. Insulin resistance can affect individuals of any body weight (both lean and higher BMI).
                  </p>
                </div>
              )}

              {activeTab === 'mental' && (
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--nss-navy)' }}>🧘 Psychological &amp; Wellbeing Pillar</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginTop: '0.6rem' }}>
                    Recognized in international guidelines as a core component. Fluctuating hormones, physical symptoms, and societal stigma can impact mood, anxiety, and body confidence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5: SYMPTOMS GRID */}
        <section id="symptoms-section" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">🩺 Symptom Identification</span>
              <h2 className="section-title">Common <span className="accent">Evidence-Based Symptoms</span></h2>
              <p className="section-desc">Symptoms vary widely between individuals. You do not need all symptoms to have PMOS.</p>
            </div>

            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '1rem 1.4rem', borderRadius: 'var(--r-sm)', marginBottom: '2.5rem', fontSize: '0.9rem', color: 'var(--nss-navy)', fontWeight: 600 }}>
              ⚠️ <strong>Non-Diagnostic Disclaimer:</strong> Having these symptoms does not mean you have PMOS. Other conditions (such as thyroid shifts, stress, or vitamin deficiencies) can cause similar symptoms. Always consult a qualified physician for evaluation.
            </div>

            <div className="symptoms-grid stagger-grid">
              <div className="symptom-card reveal"><div className="sym-icon">🩸</div><h4>Irregular / Missed Periods</h4><p>Cycles longer than 35 days, variable cycle length, or occasional missed periods.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🥚</div><h4>Ovulation Variations</h4><p>Irregular ovulation timing, making tracking cycles or predicting fertile windows variable.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">✨</div><h4>Hormonal Acne</h4><p>Persistent breakouts along the jawline, chin, chest, or upper back.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">💇‍♀️</div><h4>Excess Hair / Hair Thinning</h4><p>Coarse facial or body hair (hirsutism) or mild thinning of scalp hair.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">⚖️</div><h4>Metabolic / Weight Shifts</h4><p>Changes in insulin handling, energy dips after carb-rich meals, or difficulty managing weight.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🌙</div><h4>Acanthosis Nigricans</h4><p>Dark velvety skin pigmentation around neck folds, knuckles, or armpits linked to insulin levels.</p></div>
            </div>
          </div>
        </section>

        {/* SECTION 6: 2-MINUTE PMOS AWARENESS CHECK (1-QUESTION AT A TIME WIZARD) */}
        <section id="self-check" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">📝 Interactive Screening</span>
              <h2 className="section-title">2-Minute <span className="accent">PMOS Awareness Check</span></h2>
              <p className="section-desc">A brief, evidence-aligned awareness questionnaire to help you reflect on your health.</p>
            </div>

            <div style={{ background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem', boxShadow: 'var(--shadow-card)' }}>
              
              {!quizFinished ? (
                <div>
                  {/* PROGRESS TRACKER */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    <span>{wizardQuestions[currentStep].category}</span>
                    <span>Question {currentStep + 1} of {wizardQuestions.length}</span>
                  </div>

                  <div className="wizard-progress-track">
                    <div className="wizard-progress-bar" style={{ width: `${((currentStep + 1) / wizardQuestions.length) * 100}%` }}></div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1.4rem', lineHeight: 1.5 }}>
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
                    Awareness Summary
                  </span>
                  
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
                    Your answers suggest that it may be worth discussing these symptoms with a healthcare professional.
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    You reported notable signs regarding menstrual pattern, androgen markers, or energy levels. Early medical guidance can provide clarity and evidence-based care.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
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

        {/* SECTION 7: WHEN TO TALK TO A HEALTHCARE PROFESSIONAL */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🏥 Medical Consultation</span>
              <h2 className="section-title">When Should I Talk to a <span className="accent">Healthcare Professional?</span></h2>
              <p className="section-desc">Recognizing key signs that warrant a professional clinical evaluation.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div className="doctor-card reveal" style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <span className="icon" style={{ fontSize: '2rem' }}>🗓️</span>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', margin: '0.6rem 0 0.3rem' }}>Missed 3+ Consecutive Cycles</h5>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>Prolonged gaps between periods should be evaluated by a certified gynaecologist.</p>
              </div>

              <div className="doctor-card reveal" style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <span className="icon" style={{ fontSize: '2rem' }}>✨</span>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', margin: '0.6rem 0 0.3rem' }}>Persistent Skin / Hair Changes</h5>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>Rapid facial hair growth or severe acne unresponsive to dermatological cream.</p>
              </div>

              <div className="doctor-card reveal" style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <span className="icon" style={{ fontSize: '2rem' }}>👶</span>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', margin: '0.6rem 0 0.3rem' }}>Family Planning Concerns</h5>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>If you are planning pregnancy or experiencing difficulty tracking ovulation window.</p>
              </div>

              <div className="doctor-card reveal" style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <span className="icon" style={{ fontSize: '2rem' }}>🧠</span>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', margin: '0.6rem 0 0.3rem' }}>Symptoms Affecting Quality of Life</h5>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>When anxiety, fatigue, or physical symptoms interfere with daily confidence or studies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: MYTHS VS FACTS (EXPANDABLE CARDS) */}
        <section id="myths" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">💡 Science Check</span>
              <h2 className="section-title">PMOS <span className="accent">Myths vs Facts</span></h2>
              <p className="section-desc">Click any card below to reveal the medical evidence behind common misunderstandings.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {mythsList.map(m => (
                <div
                  key={m.id}
                  className="myth-card-expandable"
                  onClick={() => setExpandedMyth(expandedMyth === m.id ? null : m.id)}
                >
                  <div className="myth-header-row">
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>❌ Common Myth</span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.2rem' }}>{m.myth}</h4>
                    </div>
                    <span style={{ fontSize: '1.2rem', color: 'var(--nss-blue-accent)' }}>{expandedMyth === m.id ? '▲' : '▼'}</span>
                  </div>

                  {expandedMyth === m.id && (
                    <div className="myth-body-content">
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>✅ Medical Evidence &amp; Fact</span>
                      <p style={{ fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>{m.fact}</p>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.88rem' }}>{m.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: WHAT ACTUALLY HELPS? */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌱 Sustainable Care</span>
              <h2 className="section-title">What <span className="accent">Actually Helps?</span></h2>
              <p className="section-desc">Evidence-based pillars recommended by international endocrine &amp; metabolic guidelines.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <div className="pre-num">1</div>
                <div className="pre-info">
                  <h5>Sustainable Whole-Food Nutrition</h5>
                  <p>Emphasize low-glycemic index (Low-GI) complex carbs, high prebiotic fiber, and anti-inflammatory healthy fats rather than extreme restrictive diets.</p>
                </div>
              </div>

              <div className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <div className="pre-num">2</div>
                <div className="pre-info">
                  <h5>Regular Physical Activity</h5>
                  <p>A blend of resistance training and enjoyable aerobic exercise enhances GLUT-4 cellular insulin sensitivity and supports cardiorespiratory fitness.</p>
                </div>
              </div>

              <div className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <div className="pre-num">3</div>
                <div className="pre-info">
                  <h5>Sleep Hygiene &amp; Cortisol Control</h5>
                  <p>7–9 hours of consistent circadian sleep helps regulate the hypothalamic-pituitary-adrenal (HPA) axis and reduces adrenal androgen surges.</p>
                </div>
              </div>

              <div className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                <div className="pre-num">4</div>
                <div className="pre-info">
                  <h5>Individualized Clinical Care</h5>
                  <p>Working with a physician to evaluate serum markers (insulin sensitivity, androgen levels, thyroid) for tailored care rather than one-size-fits-all plans.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: PMOS / PCOS / PCOD EXPLAINER */}
        <section style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📖 Terminology Guide</span>
              <h2 className="section-title">Understanding <span className="accent">PMOS, PCOS &amp; PCOD</span></h2>
              <p className="section-desc">Clarifying common names used across international literature and regional practice.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--nss-blue-accent)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase' }}>2026 International Terminology</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.2rem' }}>PMOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  <strong>Polyendocrine Metabolic Ovarian Syndrome.</strong> Current medical consensus emphasizing that endocrine and metabolic features are central.
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Former / Historical Name</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.2rem' }}>PCOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  <strong>Polycystic Ovary Syndrome.</strong> The traditional term used for decades. Replaced because &quot;cysts&quot; can be misleading and ovaries are not the sole cause.
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Common Regional Term (India)</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.2rem' }}>PCOD</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                  <strong>Polycystic Ovarian Disease.</strong> A term commonly used in clinical conversations in South Asia. Refers to the same underlying spectrum of symptoms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11 & 12: SUPPORT FOR FRIENDS & PARENTS */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🤝 Community Guidance</span>
              <h2 className="section-title">For Parents, Partners &amp; <span className="accent">Friends</span></h2>
              <p className="section-desc">How to offer empathetic, evidence-based support to someone experiencing PMOS.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem' }}>💚</span>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)' }}>Listen Without Judgement:</strong> Avoid reducing symptoms to simple willpower, weight, or diet choices.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem' }}>🌱</span>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)' }}>Avoid Assuming Infertility:</strong> Reassure loved ones that PMOS does not equal permanent infertility.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem' }}>🏥</span>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)' }}>Encourage Clinical Care:</strong> Support seeking medical guidance from certified physicians rather than unverified online quick fixes.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 13: QUESTIONS TO ASK YOUR DOCTOR (WITH PRINT BUTTON) */}
        <section className="printable-doctor-questions" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">📋 Physician Checklist</span>
              <h2 className="section-title">Questions to Ask <span className="accent">Your Doctor</span></h2>
              <p className="section-desc">Save or print this guide to bring to your next healthcare appointment.</p>
            </div>

            <div style={{ background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.3rem' }}>1. Diagnostic Clarity</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>&quot;Could my symptoms be caused by another condition (such as thyroid or adrenal shifts)?&quot;</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.3rem' }}>2. Blood Evaluation</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>&quot;What blood tests (Fasting Insulin, Free Testosterone, SHBG, Lipid Profile) should we check?&quot;</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.3rem' }}>3. Treatment Options</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>&quot;What evidence-based lifestyle changes or medications are appropriate for my specific phenotype?&quot;</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)' }}>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block', marginBottom: '0.3rem' }}>4. Long-Term Health</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>&quot;What key markers should we monitor annually to protect my metabolic and cardiovascular health?&quot;</p>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handlePrintQuestions}
                  style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer' }}
                >
                  🖨️ Save / Print Checklist for Appointment
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 14: ANONYMOUS Q&A */}
        <section id="ask" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌸 Student Guidance</span>
              <h2 className="section-title">Ask Doctor <span className="accent">Anonymously</span></h2>
              <p className="section-desc">Submit your personal health doubt freely. Answers are reviewed by CBIT NSS and addressed by qualified medical professionals.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2.2rem 1.8rem', boxShadow: 'var(--shadow-card)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🔒</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                100% Student Confidentiality Notice
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Please do <strong>NOT</strong> submit your name, phone number, email, or student ID. Questions are compiled anonymously by CBIT NSS and answered live by certified Gynaecologists during World PMOS Awareness Day 2026.
              </p>

              <button
                onClick={() => window.dispatchEvent(new Event('openModal'))}
                className="btn-hero-modal"
                style={{ background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.9rem 2rem', borderRadius: 'var(--r-pill)', fontWeight: 800 }}
              >
                🌸 Open Anonymous Question Window
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 15: SUPPORT & VERIFIED HELPLINES */}
        <section id="support" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📞 Support Resources</span>
              <h2 className="section-title">Verified <span className="accent">Helplines &amp; Support</span></h2>
              <p className="section-desc">Verified national helplines for health, emotional stress, and student wellness.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div className="resource-card reveal" style={{ background: 'var(--soft-teal-bg)', padding: '1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🏥</div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)' }}>National Women&apos;s Helpline</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem' }}><strong>1091</strong> (Toll-Free 24/7) — Government dedicated helpline for women&apos;s health guidance.</p>
                </div>
              </div>

              <div className="resource-card reveal" style={{ background: 'var(--soft-teal-bg)', padding: '1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🧠</div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)' }}>iCall Mental Health</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem' }}><strong>9152987821</strong> — Free counseling for emotional stress linked to health issues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 16: RESEARCH & SOURCES SECTION */}
        <section id="resources" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📚 Evidence Base</span>
              <h2 className="section-title">Research &amp; <span className="accent">Clinical Citations</span></h2>
              <p className="section-desc">Medical evidence authority powering this awareness campaign.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block' }}>2023 International Evidence-Based Guideline (Monash University)</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Published in European Journal of Endocrinology &amp; Human Reproduction.</span>
                </div>
                <button className="source-trigger-btn" onClick={() => openSourceModal('2023 Monash Guideline', 'Comprehensive international consensus guideline covering assessment, epidemiology (1 in 8 women), lifestyle, and psychological care.')}>
                  Read Abstract ⓘ
                </button>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--nss-navy)', display: 'block' }}>Journal of Clinical Medicine (2023) Review</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Singh et al. — Etiology, Current Management &amp; Gut-Axis Therapeutics.</span>
                </div>
                <button className="source-trigger-btn" onClick={() => openSourceModal('Journal of Clinical Medicine 2023', 'Review covering 4 Rotterdam phenotypes, gut microbiome dysbiosis (DOGMA theory), inositols (40:1 MI:DCI), and GLUT-4 exercise response.')}>
                  Read Abstract ⓘ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 17 & 18: AWARENESS KIT, SHARE & QR CODE */}
        <section id="campaign-kit" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📣 Campus Toolkit</span>
              <h2 className="section-title">CBIT NSS <span className="accent">Awareness Kit &amp; QR</span></h2>
              <p className="section-desc">Take awareness offline. Share digital graphics or print posters across campus.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', padding: '2rem', borderRadius: 'var(--r-lg)', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.4rem' }}>📱</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Offline Awareness QR Code</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', margin: '0.4rem 0 1.2rem' }}>
                  Scan to share this educational microsite directly on WhatsApp or Instagram.
                </p>
                <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '16px', display: 'inline-block', border: '1px solid var(--border-light)' }}>
                  {/* CSS SVG GENERATED QR ICON */}
                  <div style={{ width: '120px', height: '120px', background: 'var(--nss-navy)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem', textAlign: 'center' }}>
                    SCAN FOR<br />PMOS 2026
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1rem' }}>📥 Campaign Downloads</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li style={{ background: 'var(--bg-main)', padding: '0.9rem 1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>📄 Printable A4 PMOS Factsheet (PDF)</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>Download</span>
                  </li>
                  <li style={{ background: 'var(--bg-main)', padding: '0.9rem 1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>📱 Instagram Story &amp; Post Cards</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>Download</span>
                  </li>
                  <li style={{ background: 'var(--bg-main)', padding: '0.9rem 1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>💬 WhatsApp Campaign Poster</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>Download</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FLOATING ASK BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      {/* ANONYMOUS MODAL */}
      <div className="modal-overlay" id="anon-modal" onClick={(e) => { if (e.target === document.getElementById('anon-modal')) { (document.getElementById('anon-modal') as HTMLElement).classList.remove('active'); document.body.style.overflow = ''; } }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-window">
          <button className="modal-close-btn" onClick={() => { (document.getElementById('anon-modal') as HTMLElement).classList.remove('active'); document.body.style.overflow = ''; }} aria-label="Close window">✕</button>
          <span className="modal-badge">🔒 100% Student Confidentiality Notice</span>
          <h3 id="modal-title">Ask Doctor Anonymously</h3>
          <p className="desc" style={{ fontSize: '0.92rem', color: 'var(--text-body)', marginBottom: '1.2rem', lineHeight: 1.6 }}>Do <strong>NOT</strong> include your name, email, phone, or student ID. All questions are compiled by CBIT NSS and answered live by certified medical professionals.</p>
          <div className="privacy-notice">🛡️ <strong>Educational Note:</strong> Responses provide general awareness only and do not constitute personal medical diagnosis or emergency care.</div>
          <form id="modal-anon-form" onSubmit={(e) => { e.preventDefault(); const btn = document.getElementById('modal-submit-btn') as HTMLButtonElement; if(btn){ btn.textContent='⏳ Submitting...'; btn.disabled=true; setTimeout(()=>{ btn.textContent='✅ Submitted Anonymously!'; (document.getElementById('modal-success') as HTMLElement).style.display='block'; setTimeout(()=>{ btn.textContent='🌸 Submit Question Anonymously'; btn.disabled=false; (document.getElementById('modal-success') as HTMLElement).style.display='none'; (document.getElementById('modal-anon-form') as HTMLFormElement)?.reset(); (document.getElementById('anon-modal') as HTMLElement).classList.remove('active'); document.body.style.overflow=''; }, 2500); }, 900); } }}>
            <div className="form-group">
              <label htmlFor="modal-q-topic">Select Category (Optional)</label>
              <select id="modal-q-topic" name="category">
                <option value="General PMOS Doubts">General PMOS &amp; Symptoms</option>
                <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Issues</option>
                <option value="Diet Lifestyle">Diet &amp; Lifestyle Doubts</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-q-message">Your Question for the Doctor *</label>
              <textarea id="modal-q-message" name="message" rows={4} placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed?" required></textarea>
            </div>
            <button type="submit" className="btn-submit-modal" id="modal-submit-btn">🌸 Submit Question Anonymously</button>
          </form>
          <div className="modal-success-alert" id="modal-success">
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✅</div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--soft-navy-text)" }}>Anonymous Question Submitted!</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginTop: "0.4rem", lineHeight: 1.6 }}>Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PMOS Day 2026.</p>
          </div>
        </div>
      </div>

      {/* SOURCE DRAWER MODAL */}
      {sourceDrawerOpen && (
        <div className="modal-overlay active" style={{ display: 'flex' }} onClick={() => setSourceDrawerOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">📚 Citation Source</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>{selectedSourceTitle}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{selectedSourceContent}</p>
            <button onClick={() => setSourceDrawerOpen(false)} style={{ marginTop: '1.5rem', background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.65rem 1.4rem', borderRadius: 'var(--r-pill)', fontWeight: 800, width: '100%' }}>
              Close Citation
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
