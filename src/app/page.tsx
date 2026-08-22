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

const mythsList = [
  {
    id: 'm1',
    myth: 'PMOS means you can never get pregnant.',
    fact: 'With appropriate lifestyle care and evidence-based medical guidance, most individuals with PMOS can conceive naturally or with simple treatments.',
    details: 'Ovulation may be irregular, but ovaries contain healthy eggs. Medical care focuses on supporting regular ovulatory cycles.'
  },
  {
    id: 'm2',
    myth: 'PMOS is only about the ovaries and reproductive health.',
    fact: 'PMOS is a multi-system condition involving endocrine, metabolic, cardiovascular, and emotional health.',
    details: 'While reproductive symptoms are common, metabolic features (insulin sensitivity, lipid transport) and emotional wellbeing play equal roles in long-term management.'
  },
  {
    id: 'm3',
    myth: 'Everyone with PMOS has the exact same symptoms.',
    fact: 'PMOS is highly heterogeneous with multiple clinical phenotypes ranging from lean ovulatory to metabolic variants.',
    details: 'Symptoms vary widely between individuals. One person may experience acne and mood changes while another experiences cycle delays.'
  },
  {
    id: 'm4',
    myth: 'PMOS can be 100% reversed by a simple 7-day diet or herbal tea.',
    fact: 'PMOS is a lifelong hormonal and metabolic tendency managed through sustainable, long-term healthy habits.',
    details: 'There are no quick-fix cures. Sustainable nutrition, physical activity, sleep, and medical support provide long-term hormonal balance.'
  },
  {
    id: 'm5',
    myth: 'PMOS only affects individuals with higher body weight.',
    fact: 'PMOS occurs across all body types, including lean individuals — often driven by stress, adrenal, or genetic factors.',
    details: 'Weight is not a diagnostic requirement. Lean PMOS requires equal clinical care and attention.'
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'reproductive' | 'endocrine' | 'metabolic' | 'emotional'>('reproductive');

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

  const flagCount = countFlags(answers);

  function getResultTone(): { emoji: string; headline: string; message: string; urgency: 'low' | 'moderate' | 'high' } {
    if (flagCount === 0) {
      return {
        emoji: '🌿',
        headline: 'Your responses show no significant indicators at this time.',
        message: 'You appear to have regular cycles and stable wellbeing. Continue supporting your health with balanced nutrition, adequate sleep, and annual check-ups.',
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

  const resultTone = getResultTone();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '74px' }}>

        {/* ─── SECTION 1: HERO ─── */}
        <section id="hero">
          <div className="hero-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="nss-hero-badge" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={22} height={22} priority />
              CBIT NSS Awareness Campaign 2026
            </div>

            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>
              📅 World PMOS Awareness Day 2026
            </span>

            {/* Heading — natural wrapping, no ellipsis */}
            <h1 style={{ fontSize: 'clamp(2rem, 5.5vw, 3.8rem)', lineHeight: 1.18, color: 'var(--nss-navy)', fontWeight: 800, textAlign: 'center', margin: '0 auto 1.2rem', maxWidth: '840px' }}>
              More Than the Ovaries.{' '}
              <span className="accent-text" style={{ color: 'var(--nss-blue-accent)' }}>More Than a Period.</span>
            </h1>

            <p className="hero-desc" style={{ fontSize: '1.06rem', color: 'var(--text-body)', lineHeight: 1.75, maxWidth: '700px', margin: '0 auto 2rem', textAlign: 'center' }}>
              <strong>PMOS (Polyendocrine Metabolic Ovarian Syndrome)</strong> — the condition formerly known as PCOS — affects reproductive, endocrine, metabolic, and emotional health in 1 in 8 women worldwide.
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

        {/* ─── SECTION 2: PMOS BY THE NUMBERS ─── */}
        <section id="numbers" style={{ padding: '3.5rem 0', background: 'var(--card-white)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📊 Global Statistics</span>
              <h2 className="section-title">PMOS <span className="accent">By The Numbers</span></h2>
              <p className="section-desc">Sourced from the <em>2023 &amp; 2026 International Evidence-Based Guidelines (Monash)</em>.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
              {[
                { num: '1 in 8', label: 'Reproductive Age Women', desc: 'Affects up to 13% of women worldwide, making it the most prevalent hormonal condition.', src: 'Monash Guideline 2023', srcDesc: 'Epidemiology data from 2023 International Evidence-Based Guideline for the Assessment and Management of PCOS/PMOS.' },
                { num: '170M+', label: 'Worldwide Impact', desc: 'Over 170 million individuals globally experience reproductive, metabolic, or emotional symptoms.', src: 'WHO & Monash Data 2026', srcDesc: 'Global burden statistics published by WHO and Monash University international research consensus.' },
                { num: '2026', label: 'Terminology Update', desc: 'International consensus renamed the condition "PMOS" to reflect multi-system metabolic and endocrine health.', src: '2026 PMOS Nomenclature Consensus', srcDesc: 'International terminology update clarifying that ovaries are not the sole origin of the condition.' },
              ].map((s, i) => (
                <div key={i} className="stat-box reveal" style={{ background: 'var(--soft-teal-bg)', padding: '2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', textAlign: 'center' }}>
                  <span className="num-val" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>{s.num}</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem' }}>{s.label}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>{s.desc}</p>
                  <button className="source-trigger-btn" style={{ marginTop: '0.8rem' }} onClick={() => openSourceModal(s.src, s.srcDesc)}>
                    ⓘ Sources
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: WHY THE NAME CHANGED ─── */}
        <section id="understand" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🔬 Nomenclature Evolution</span>
              <h2 className="section-title">
                Why the Name Changed:{' '}
                <span className="accent">PCOS → PMOS</span>
              </h2>
              <p className="section-desc">Understanding why international medical guidelines updated the terminology in 2026.</p>
            </div>

            <div className="timeline-track reveal">
              <div className="timeline-step">
                <span className="timeline-year">1935 – 2020s</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>The Old Name: PCOS — Polycystic Ovary Syndrome</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  Originally named after the appearance of fluid-filled sacs on ovarian ultrasounds. However, many individuals with the condition have no ovarian cysts, and cysts themselves are not the primary cause.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2023 Guideline</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Broader Health Recognition</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  The 2023 International Evidence-Based Guideline emphasised that insulin resistance, androgen regulation, and emotional wellbeing are central pillars — not just ovarian morphology.
                </p>
              </div>

              <div className="timeline-step">
                <span className="timeline-year">2026 Consensus</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)' }}>Current Terminology: PMOS — Polyendocrine Metabolic Ovarian Syndrome</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginTop: '0.3rem' }}>
                  PMOS accurately describes the multi-system nature: <strong>Polyendocrine</strong> (multiple hormonal pathways), <strong>Metabolic</strong> (insulin &amp; glucose handling), and <strong>Ovarian</strong> (ovulatory health).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: WHAT IS PMOS? (4 PILLARS — tab renamed Emotional Wellbeing) ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🩺 Multi-System Understanding</span>
              <h2 className="section-title">The Four Pillars of <span className="accent">PMOS</span></h2>
              <p className="section-desc">PMOS is a complex condition involving interconnected physiological systems.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button className={`tab-btn ${activeTab === 'reproductive' ? 'active' : ''}`} onClick={() => setActiveTab('reproductive')}>🌸 Reproductive</button>
              <button className={`tab-btn ${activeTab === 'endocrine' ? 'active' : ''}`} onClick={() => setActiveTab('endocrine')}>⚖️ Endocrine & Hormonal</button>
              <button className={`tab-btn ${activeTab === 'metabolic' ? 'active' : ''}`} onClick={() => setActiveTab('metabolic')}>⚡ Metabolic</button>
              <button className={`tab-btn ${activeTab === 'emotional' ? 'active' : ''}`} onClick={() => setActiveTab('emotional')}>🧘 Emotional Wellbeing</button>
            </div>

            <div className="summary-card reveal" style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--soft-teal-border)', padding: '2.5rem', borderRadius: 'var(--r-lg)' }}>
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

        {/* ─── SECTION 5: SYMPTOMS GRID ─── */}
        <section id="symptoms-section" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">🩺 Symptom Identification</span>
              <h2 className="section-title">Common <span className="accent">Evidence-Based Symptoms</span></h2>
              <p className="section-desc">Symptoms vary widely between individuals. You do not need all of them to have PMOS.</p>
            </div>

            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '1rem 1.4rem', borderRadius: 'var(--r-sm)', marginBottom: '2.5rem', fontSize: '0.9rem', color: 'var(--nss-navy)', fontWeight: 600 }}>
              ⚠️ <strong>Non-Diagnostic Notice:</strong> Having these symptoms does not mean you have PMOS. Other conditions (such as thyroid shifts, stress, or vitamin deficiencies) can cause similar symptoms. Always consult a qualified physician for evaluation.
            </div>

            <div className="symptoms-grid stagger-grid">
              <div className="symptom-card reveal"><div className="sym-icon">🩸</div><h4>Irregular or Missed Periods</h4><p>Cycles longer than 35 days, variable cycle length, or occasional missed periods.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🥚</div><h4>Ovulation Variations</h4><p>Irregular ovulation timing, making cycle tracking and predicting fertile windows variable.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">✨</div><h4>Hormonal Acne</h4><p>Persistent breakouts along the jawline, chin, chest, or upper back driven by androgen levels.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">💇‍♀️</div><h4>Excess Hair or Hair Thinning</h4><p>Coarse facial or body hair (hirsutism) or mild thinning of scalp hair.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">⚖️</div><h4>Metabolic and Weight Shifts</h4><p>Changes in insulin handling, energy dips after meals, or difficulty managing body weight.</p></div>
              <div className="symptom-card reveal"><div className="sym-icon">🌙</div><h4>Acanthosis Nigricans</h4><p>Dark velvety skin pigmentation around neck folds, knuckles, or armpits linked to insulin levels.</p></div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/symptoms" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--soft-teal-bg)', border: '1.5px solid var(--soft-teal-border)', color: 'var(--nss-navy)', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.92rem' }}>
                📋 View Full Symptoms &amp; Management Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: 2-MINUTE PMOS AWARENESS CHECK ─── */}
        <section id="self-check" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">📝 Interactive Screening</span>
              <h2 className="section-title">2-Minute <span className="accent">PMOS Awareness Check</span></h2>
              <p className="section-desc">A brief, evidence-aligned questionnaire to help you reflect on your health patterns.</p>
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

                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1.4rem', lineHeight: 1.55 }}>
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
                      {currentStep === wizardQuestions.length - 1 ? 'See My Summary →' : 'Next →'}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── RESULT SCREEN — nuanced based on flag count ── */
                <div style={{ textAlign: 'center', animation: 'fade-in 0.4s ease' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{resultTone.emoji}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Awareness Summary
                  </span>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.5rem', marginBottom: '0.8rem', lineHeight: 1.45 }}>
                    {resultTone.headline}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {resultTone.message}
                  </p>

                  {resultTone.urgency !== 'low' && (
                    <div style={{ background: '#FFFFFF', padding: '1.2rem 1.4rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.2rem', border: '1px solid var(--border-light)' }}>
                      <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.5rem' }}>📋 Suggested Next Steps</h5>
                      <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                        <li>Track your cycle dates and symptom patterns for 2–3 months using a journal or app.</li>
                        <li>Consult a Gynaecologist or Endocrinologist — mention hormonal, metabolic, and emotional concerns together.</li>
                        {resultTone.urgency === 'high' && (
                          <li>Ask about blood evaluations: Free Testosterone, Fasting Insulin, SHBG, TSH, and Lipid Profile.</li>
                        )}
                        <li>Discuss sustainable lifestyle changes — nutrition, movement, sleep, and stress management.</li>
                      </ul>
                    </div>
                  )}

                  {resultTone.urgency === 'low' && (
                    <div style={{ background: '#FFFFFF', padding: '1rem 1.4rem', borderRadius: 'var(--r-md)', textAlign: 'left', marginBottom: '1.2rem', border: '1px solid var(--border-light)', fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.65 }}>
                      ✅ Continue supporting your health with balanced whole foods, regular physical activity (150 min/week), consistent sleep, and annual well-woman check-ups.
                    </div>
                  )}

                  <div style={{ background: 'rgba(124, 92, 252, 0.08)', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.8rem', color: 'var(--nss-navy)', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    🛡️ <strong>Important:</strong> This is an awareness tool, not a diagnostic test. No personal data is recorded or stored.
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleResetQuiz}
                      style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.7rem 1.4rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      🔄 Retake Check
                    </button>
                    <Link href="/self-test" style={{ background: '#FFFFFF', color: 'var(--nss-navy)', border: '1.5px solid var(--border-light)', padding: '0.7rem 1.4rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.9rem', display: 'inline-block' }}>
                      📝 Full Self-Check →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: WHEN TO TALK TO A HEALTHCARE PROFESSIONAL ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🏥 Medical Consultation</span>
              <h2 className="section-title">
                When Should I Talk to a{' '}
                <span className="accent">Healthcare Professional?</span>
              </h2>
              <p className="section-desc">Key signs that warrant a clinical evaluation — consulting early leads to better outcomes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                { icon: '🗓️', title: 'Missed 3+ Consecutive Cycles', desc: 'Prolonged gaps between periods should be evaluated by a certified gynaecologist.' },
                { icon: '✨', title: 'Persistent Skin or Hair Changes', desc: 'Rapid facial hair growth or severe acne unresponsive to standard dermatological treatment.' },
                { icon: '👶', title: 'Family Planning Concerns', desc: 'If you are planning pregnancy or experiencing difficulty tracking your ovulation window.' },
                { icon: '🧠', title: 'Symptoms Affecting Daily Life', desc: 'When anxiety, fatigue, or physical symptoms interfere with confidence, studies, or work.' },
              ].map((item, i) => (
                <div key={i} className="doctor-card reveal" style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                  <span className="icon" style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <h5 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--nss-navy)', margin: '0.6rem 0 0.3rem' }}>{item.title}</h5>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: MYTHS VS FACTS ─── */}
        <section id="myths" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">💡 Science Check</span>
              <h2 className="section-title">PMOS <span className="accent">Myths vs Facts</span></h2>
              <p className="section-desc">Tap any card to reveal the medical evidence behind common misunderstandings.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {mythsList.map(m => (
                <div
                  key={m.id}
                  className="myth-card-expandable"
                  onClick={() => setExpandedMyth(expandedMyth === m.id ? null : m.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpandedMyth(expandedMyth === m.id ? null : m.id); }}
                  aria-expanded={expandedMyth === m.id}
                >
                  <div className="myth-header-row">
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.08em' }}>❌ Common Myth</span>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.25rem', lineHeight: 1.45 }}>{m.myth}</h4>
                    </div>
                    <span style={{ fontSize: '1.1rem', color: 'var(--nss-blue-accent)', flexShrink: 0, marginLeft: '0.8rem' }}>{expandedMyth === m.id ? '▲' : '▼'}</span>
                  </div>

                  {expandedMyth === m.id && (
                    <div className="myth-body-content">
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.3rem' }}>✅ Medical Evidence &amp; Fact</span>
                      <p style={{ fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '0.45rem', lineHeight: 1.55 }}>{m.fact}</p>
                      <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', lineHeight: 1.65 }}>{m.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 9: WHAT ACTUALLY HELPS? ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌱 Sustainable Care</span>
              <h2 className="section-title">What <span className="accent">Actually Helps?</span></h2>
              <p className="section-desc">Evidence-based pillars recommended by international endocrine &amp; metabolic guidelines.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {[
                { n: '1', title: 'Sustainable Whole-Food Nutrition', body: 'Emphasise low-glycemic index (Low-GI) complex carbs, high prebiotic fibre, and anti-inflammatory healthy fats rather than extreme restrictive diets.' },
                { n: '2', title: 'Regular Physical Activity', body: 'A blend of resistance training and aerobic exercise enhances GLUT-4 cellular insulin sensitivity and supports cardiorespiratory fitness.' },
                { n: '3', title: 'Sleep Hygiene & Cortisol Control', body: '7–9 hours of consistent sleep helps regulate the hypothalamic-pituitary-adrenal (HPA) axis and reduces adrenal androgen surges.' },
                { n: '4', title: 'Individualised Clinical Care', body: 'Working with a physician to evaluate serum markers (insulin sensitivity, androgen levels, thyroid) for tailored care rather than one-size-fits-all plans.' },
              ].map((p, i) => (
                <div key={i} className="pre-card" style={{ background: '#FFFFFF', padding: '1.6rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)' }}>
                  <div className="pre-num">{p.n}</div>
                  <div className="pre-info">
                    <h5>{p.title}</h5>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 10: PMOS / PCOS / PCOD EXPLAINER ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📖 Terminology Guide</span>
              <h2 className="section-title">
                Understanding <span className="accent">PMOS, PCOS &amp; PCOD</span>
              </h2>
              <p className="section-desc">Clarifying common names used across international literature and regional practice.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'var(--soft-teal-bg)', border: '1.5px solid var(--nss-blue-accent)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>2026 International Terminology</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PMOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polyendocrine Metabolic Ovarian Syndrome.</strong> Current medical consensus emphasising that endocrine and metabolic features are central — not just the ovaries.
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Former / Historical Name</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOS</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polycystic Ovary Syndrome.</strong> The traditional term used for decades. Replaced because &quot;cysts&quot; can be misleading and ovaries are not the sole cause.
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', padding: '1.8rem', borderRadius: 'var(--r-md)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Common Regional Term (India)</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)' }}>PCOD</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>
                  <strong>Polycystic Ovarian Disease.</strong> A term commonly used in clinical conversations in South Asia. Refers to the same underlying spectrum of symptoms as PMOS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 11: FOR THOSE WHO CARE FOR WOMEN ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🤝 Community Guidance</span>
              <h2 className="section-title">
                For Those Who{' '}
                <span className="accent">Care for Women</span>
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
          </div>
        </section>

        {/* ─── SECTION 12: POINTERS TO BRING TO YOUR DOCTOR ─── */}
        <section className="printable-doctor-questions" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">📋 Physician Checklist</span>
              <h2 className="section-title">
                Pointers to Bring to{' '}
                <span className="accent">Your Doctor</span>
              </h2>
              <p className="section-desc">Save or print this checklist to bring to your next healthcare appointment.</p>
            </div>

            <div style={{ background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', borderRadius: 'var(--r-lg)', padding: '2rem 1.8rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                {[
                  { num: '01', title: 'Diagnostic Clarity', pointer: 'Ask if your symptoms could be caused by another condition — thyroid shifts, adrenal variation, or vitamin deficiencies.' },
                  { num: '02', title: 'Blood Evaluation', pointer: 'Request blood tests for Free Testosterone, Fasting Insulin, SHBG, Lipid Profile, and TSH.' },
                  { num: '03', title: 'Treatment Options', pointer: 'Ask which evidence-based lifestyle changes or medications are appropriate for your specific phenotype.' },
                  { num: '04', title: 'Long-Term Health', pointer: 'Ask which metabolic and cardiovascular markers to monitor annually for long-term wellbeing.' },
                ].map((p, i) => (
                  <div key={i} style={{ background: '#FFFFFF', padding: '1.2rem 1.4rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>Point {p.num}</span>
                    <strong style={{ color: 'var(--nss-navy)', display: 'block', fontSize: '0.92rem', marginBottom: '0.3rem' }}>{p.title}</strong>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', lineHeight: 1.6 }}>{p.pointer}</p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handlePrintQuestions}
                  style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer' }}
                >
                  🖨️ Save or Print for Appointment
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 13: ANONYMOUS Q&A ─── */}
        <section id="ask" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">🌸 Student Guidance</span>
              <h2 className="section-title">Ask a Doctor <span className="accent">Anonymously</span></h2>
              <p className="section-desc">Submit your personal health doubt freely. Answers are reviewed by CBIT NSS and addressed by qualified medical professionals during the Awareness Day event.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2.2rem 1.8rem', boxShadow: 'var(--shadow-card)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🔒</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                100% Student Confidentiality
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
                Do <strong>NOT</strong> include your name, phone number, email, or student ID. Questions are compiled anonymously and answered live by certified Gynaecologists during World PMOS Awareness Day 2026.
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

        {/* ─── SECTION 14: SUPPORT & VERIFIED HELPLINES ─── */}
        <section id="support" style={{ padding: '4rem 0', background: 'var(--card-white)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📞 Support Resources</span>
              <h2 className="section-title">Verified <span className="accent">Helplines &amp; Support</span></h2>
              <p className="section-desc">National helplines for women&apos;s health, emotional stress, and student wellness.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div className="resource-card reveal" style={{ background: 'var(--soft-teal-bg)', padding: '1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🏥</div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)' }}>National Women&apos;s Helpline</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem', lineHeight: 1.55 }}>
                    <strong>1091</strong> — Toll-Free 24/7. Government dedicated helpline for women&apos;s health guidance.
                  </p>
                </div>
              </div>

              <div className="resource-card reveal" style={{ background: 'var(--soft-teal-bg)', padding: '1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🧠</div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)' }}>iCall Mental Health Support</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem', lineHeight: 1.55 }}>
                    <strong>9152987821</strong> — Free counselling for emotional stress and wellbeing concerns.
                  </p>
                </div>
              </div>

              <div className="resource-card reveal" style={{ background: 'var(--soft-teal-bg)', padding: '1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--soft-teal-border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>🎓</div>
                <div>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)' }}>CBIT NSS Student Support</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', marginTop: '0.2rem', lineHeight: 1.55 }}>
                    Reach D. Nomini (Women&apos;s Administrator) at <strong>+91 96766 48023</strong> for confidential guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 15: RESEARCH & SOURCES ─── */}
        <section id="resources" style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📚 Evidence Base</span>
              <h2 className="section-title">Research &amp; <span className="accent">Clinical Citations</span></h2>
              <p className="section-desc">The medical evidence base powering this awareness campaign.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  title: '2023 International Evidence-Based Guideline — Monash University',
                  sub: 'Published in European Journal of Endocrinology & Human Reproduction.',
                  src: '2023 Monash Guideline',
                  srcDesc: 'Comprehensive international consensus guideline covering assessment, epidemiology (1 in 8 women), lifestyle, and emotional care.'
                },
                {
                  title: 'Journal of Clinical Medicine (2023) — Singh et al.',
                  sub: 'Etiology, Current Management & Gut-Axis Therapeutics in PMOS/PCOS.',
                  src: 'Journal of Clinical Medicine 2023',
                  srcDesc: 'Review covering 4 Rotterdam phenotypes, gut microbiome dysbiosis (DOGMA theory), inositols (40:1 MI:DCI ratio), and GLUT-4 exercise response.'
                },
              ].map((r, i) => (
                <div key={i} style={{ background: '#FFFFFF', padding: '1.2rem 1.5rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)', display: 'block', fontSize: '0.94rem' }}>{r.title}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.sub}</span>
                  </div>
                  <button className="source-trigger-btn" onClick={() => openSourceModal(r.src, r.srcDesc)}>
                    Read Abstract ⓘ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 16: AWARENESS KIT & QR ─── */}
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
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', margin: '0.4rem 0 1.2rem', lineHeight: 1.6 }}>
                  Scan to share this educational microsite directly on WhatsApp or Instagram.
                </p>
                <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '16px', display: 'inline-block', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '120px', height: '120px', background: 'var(--nss-navy)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.8rem', textAlign: 'center' }}>
                    SCAN FOR<br />PMOS 2026
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '1rem' }}>📥 Campaign Downloads</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[
                    '📄 Printable A4 PMOS Factsheet (PDF)',
                    '📱 Instagram Story & Post Cards',
                    '💬 WhatsApp Campaign Poster',
                  ].map((item, i) => (
                    <li key={i} style={{ background: 'var(--bg-main)', padding: '0.9rem 1.2rem', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem' }}>{item}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--nss-blue-accent)' }}>Download</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FLOATING ASK BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      {/* ANONYMOUS MODAL */}
      <div
        className="modal-overlay"
        id="anon-modal"
        onClick={(e) => {
          if (e.target === document.getElementById('anon-modal')) {
            (document.getElementById('anon-modal') as HTMLElement).classList.remove('active');
            document.body.style.overflow = '';
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-window">
          <button
            className="modal-close-btn"
            onClick={() => {
              (document.getElementById('anon-modal') as HTMLElement).classList.remove('active');
              document.body.style.overflow = '';
            }}
            aria-label="Close window"
          >✕</button>
          <span className="modal-badge">🔒 100% Student Confidentiality</span>
          <h3 id="modal-title">Ask a Doctor Anonymously</h3>
          <p className="desc" style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
            Do <strong>NOT</strong> include your name, email, phone, or student ID. All questions are compiled by CBIT NSS and answered live by certified medical professionals.
          </p>
          <div className="privacy-notice">🛡️ <strong>Educational Notice:</strong> Responses provide general awareness only and do not constitute personal medical diagnosis or emergency care.</div>
          <form
            id="modal-anon-form"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = document.getElementById('modal-submit-btn') as HTMLButtonElement;
              if (btn) {
                btn.textContent = '⏳ Submitting...';
                btn.disabled = true;
                setTimeout(() => {
                  btn.textContent = '✅ Submitted Anonymously!';
                  (document.getElementById('modal-success') as HTMLElement).style.display = 'block';
                  setTimeout(() => {
                    btn.textContent = '🌸 Submit Question Anonymously';
                    btn.disabled = false;
                    (document.getElementById('modal-success') as HTMLElement).style.display = 'none';
                    (document.getElementById('modal-anon-form') as HTMLFormElement)?.reset();
                    (document.getElementById('anon-modal') as HTMLElement).classList.remove('active');
                    document.body.style.overflow = '';
                  }, 2500);
                }, 900);
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="modal-q-topic">Select Category (Optional)</label>
              <select id="modal-q-topic" name="category">
                <option value="General PMOS Doubts">General PMOS &amp; Symptoms</option>
                <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Issues</option>
                <option value="Emotional Wellbeing">Emotional Wellbeing &amp; Anxiety</option>
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
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--soft-navy-text)' }}>Anonymous Question Submitted!</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.65 }}>Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PMOS Day 2026.</p>
          </div>
        </div>
      </div>

      {/* SOURCE DRAWER MODAL */}
      {sourceDrawerOpen && (
        <div className="modal-overlay active" style={{ display: 'flex' }} onClick={() => setSourceDrawerOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">📚 Citation Source</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>{selectedSourceTitle}</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.7 }}>{selectedSourceContent}</p>
            <button
              onClick={() => setSourceDrawerOpen(false)}
              style={{ marginTop: '1.5rem', background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.65rem 1.4rem', borderRadius: 'var(--r-pill)', fontWeight: 800, width: '100%' }}
            >
              Close Citation
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
