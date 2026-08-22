'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
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
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
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

  const openSourceModal = (title: string, content: string) => {
    setSelectedSourceTitle(title);
    setSelectedSourceContent(content);
    setSourceDrawerOpen(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '74px' }}>

        {/* ─── 1. HERO SECTION (Unique to Homepage) ─── */}
        <section id="hero">
          <div className="hero-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="nss-hero-badge" style={{ background: '#FFFFFF', border: '1.5px solid var(--soft-teal-border)' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={22} height={22} priority />
              CBIT NSS Awareness Campaign 2026
            </div>

            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>
              📅 World PMOS Awareness Day 2026
            </span>

            <h1 style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3.8rem)', lineHeight: 1.22, color: 'var(--nss-navy)', fontWeight: 800, textAlign: 'center', margin: '0 auto 1.2rem', maxWidth: '840px' }}>
              More Than the Ovaries.{' '}
              <span className="accent-text" style={{ color: 'var(--nss-blue-accent)' }}>More Than a Period.</span>
            </h1>

            <p className="hero-desc" style={{ fontSize: '1.06rem', color: 'var(--text-body)', lineHeight: 1.75, maxWidth: '700px', margin: '0 auto 2rem', textAlign: 'center' }}>
              <strong>PMOS (Polyendocrine Metabolic Ovarian Syndrome)</strong> — the condition formerly known as PCOS — affects reproductive, endocrine, metabolic, and emotional health in 1 in 8 women worldwide.
            </p>

            <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/understand" className="btn-hero-modal" style={{ background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.9rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 800 }}>
                📖 Understand PMOS
              </Link>
              <Link href="/self-test" className="btn-hero-guide" style={{ background: '#FFFFFF', color: 'var(--nss-navy)', border: '2px solid var(--border-light)', padding: '0.9rem 1.8rem', borderRadius: 'var(--r-pill)', fontWeight: 700 }}>
                📝 2-Minute Self-Check
              </Link>
              <button onClick={() => window.dispatchEvent(new Event('openModal'))} style={{ background: 'transparent', color: 'var(--nss-blue-accent)', border: 'none', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', padding: '0.9rem 1rem' }}>
                🌸 Ask Anonymously →
              </button>
            </div>
          </div>
        </section>

        {/* ─── 2. GLOBAL STATISTICS (Unique to Homepage) ─── */}
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
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginTop: '0.4rem' }}>{s.label}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', marginTop: '0.4rem', lineHeight: 1.6 }}>{s.desc}</p>
                  <button className="source-trigger-btn" style={{ marginTop: '0.8rem' }} onClick={() => openSourceModal(s.src, s.srcDesc)}>
                    ⓘ Sources
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. CAMPAIGN NAVIGATION HUB (Unique to Homepage) ─── */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-tag">🧭 Campaign Navigation Hub</span>
              <h2 className="section-title">Explore <span className="accent">PMOS Campaign Sections</span></h2>
              <p className="section-desc">Each topic has its own dedicated page. Select a section below to learn more.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
              {[
                {
                  icon: '🔬',
                  tag: 'Medical Guide',
                  title: 'Understand PMOS & 4 Pillars',
                  desc: 'Learn why the name changed from PCOS to PMOS and explore the reproductive, endocrine, metabolic, and emotional health pillars.',
                  link: '/understand',
                  btn: 'Open Medical Guide →'
                },
                {
                  icon: '🩺',
                  tag: 'Symptom Care',
                  title: 'Symptoms & Clinical Care',
                  desc: 'View common evidence-based symptoms, exercise response, gut microbiome support, and clinical lab evaluations.',
                  link: '/symptoms',
                  btn: 'Open Symptoms Guide →'
                },
                {
                  icon: '📝',
                  tag: 'Interactive Tool',
                  title: '2-Minute Self-Check Wizard',
                  desc: 'Take a brief 1-question-at-a-time awareness questionnaire with tailored results and doctor appointment pointers.',
                  link: '/self-test',
                  btn: 'Start Self-Check →'
                },
                {
                  icon: '💡',
                  tag: 'Science Check',
                  title: 'Myths vs Facts & Care',
                  desc: 'Interactive cards debunking fertility, diet, and weight myths alongside evidence-backed lifestyle guidance.',
                  link: '/myths',
                  btn: 'Open Myths & Science →'
                },
                {
                  icon: '🌸',
                  tag: 'Student Privacy',
                  title: 'Ask a Doctor Anonymously',
                  desc: 'Submit your health doubts with 100% student confidentiality. Answered live by certified Gynaecologists.',
                  link: '/ask',
                  btn: 'Submit Doubt Anonymously →'
                },
                {
                  icon: '📚',
                  tag: 'Campus Kit',
                  title: 'Research & Campus Kit',
                  desc: 'Review Monash and Journal of Clinical Medicine citations, download printable A4 posters, and access offline QR code.',
                  link: '/resources',
                  btn: 'Open Research & Kit →'
                },
              ].map((card, idx) => (
                <div key={idx} className="symptom-card reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--r-lg)', padding: '2rem 1.6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '2.2rem' }}>{card.icon}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--nss-blue-accent)', background: 'var(--soft-teal-bg)', border: '1px solid var(--soft-teal-border)', padding: '0.25rem 0.75rem', borderRadius: 'var(--r-pill)', textTransform: 'uppercase' }}>
                        {card.tag}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.5rem' }}>{card.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{card.desc}</p>
                  </div>
                  <Link href={card.link} style={{ background: 'var(--soft-teal-bg)', color: 'var(--nss-navy)', border: '1.5px solid var(--soft-teal-border)', padding: '0.75rem 1.2rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.88rem', textAlign: 'center', display: 'block' }}>
                    {card.btn}
                  </Link>
                </div>
              ))}
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
                <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Shifts</option>
                <option value="Emotional Wellbeing">Emotional Wellbeing &amp; Stress</option>
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
