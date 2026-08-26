'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {

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

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* ─── 1. HERO ─── */}
        <section id="hero" aria-labelledby="hero-heading">
          <div className="hero-container">
            <div className="nss-hero-badge">
              <Image src="/nss-logo.png" alt="" width={80} height={80} aria-hidden="true" priority unoptimized />
              <span>CBIT NSS · PMOS Awareness 2026</span>
            </div>

            <h1 id="hero-heading" className="hero-h1">
              KNOWLEDGE<br />
              <span className="accent-text">BEYOND SYMPTOMS</span>
            </h1>

            <div className="hero-event-info" aria-label="Event details">
              <span>27 August 2026 · 11:00 AM</span>
              <span className="hero-event-sep" aria-hidden="true">·</span>
              <span>Assembly Hall, CBIT</span>
            </div>

            <p className="hero-desc">
              Polycystic Ovary Syndrome (PCOS/PCOD) affects 1 in 5 young women. CBIT NSS brings you a clear, evidence-backed guide and an anonymous Q&amp;A window for your personal health doubts.
            </p>

            <div className="hero-cta-row">
              <Link
                href="/ask"
                className="btn-primary-cta hero-ask-btn"
              >
                Ask an Anonymous Question →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 1.5 KEYNOTE SPEAKER SPOTLIGHT ─── */}
        <section id="speaker-spotlight" className="speaker-section" aria-label="PMOS Awareness Session Speaker">
          <div className="speaker-container">
            <div className="speaker-image-wrapper reveal-left">
              <div className="speaker-glow-backdrop" aria-hidden="true" />
              <div className="speaker-glow-secondary" aria-hidden="true" />
              <Image
                src="/dr-sindura-ganga.png"
                alt="Dr. Sindura Ganga - Consultant OBGYN & Laparoscopic Surgeon"
                width={520}
                height={580}
                className="speaker-photo-cutout"
                priority
                unoptimized
              />
              <div className="speaker-bottom-fade" aria-hidden="true" />
            </div>

            <div className="speaker-content reveal-right">
              <div className="speaker-eyebrow">
                <span>Knowledge Beyond Symptoms Session by</span>
              </div>
              <h2 className="speaker-name">
                Dr. Sindura Ganga
              </h2>
              <p className="speaker-title">
                MBBS, MS <span className="title-sep">|</span> Consultant OBGYN &amp; Laparoscopic Surgeon
              </p>
              <p className="speaker-bio">
                Leading the medical expert panel for Knowledge Beyond Symptoms 2026 at CBIT. Delivering evidence-backed guidance on hormonal health, PCOS management, and adolescent wellbeing.
              </p>
              <div className="speaker-cta-wrap" style={{ marginTop: '1.25rem', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <Link
                  href="/ask"
                  className="btn-primary-cta speaker-ask-btn"
                >
                  Ask Dr. Sindura an Anonymous Question
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT IS PMOS? ─── */}
        <section className="section" aria-labelledby="what-is-pmos">
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }}>
            <div className="heading-box reveal" style={{ maxWidth: '680px', margin: '0 auto 3rem' }}>
              <span className="section-tag">The condition</span>
              <h2 id="what-is-pmos" className="section-title">What is <span className="accent">PCOD &amp; PMOS?</span></h2>
              <p className="section-desc">
                Our campaign uses the name PMOS to reflect the multi-system nature of Polycystic Ovary Syndrome — a condition affecting hormones, metabolism, and emotional wellbeing, not just the ovaries.
              </p>
            </div>

            <div className="home-pillars-grid stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.2rem' }}>
              {[
                { label: 'Hormonal', desc: 'Androgen and pituitary signalling shifts that affect cycles, skin and hair.' },
                { label: 'Metabolic', desc: 'Insulin sensitivity and glucose regulation, regardless of body weight.' },
                { label: 'Reproductive', desc: 'Cycle regularity, ovulation patterns and follicle development.' },
                { label: 'Emotional', desc: 'Mood, anxiety and body confidence — recognised as a core component by international guidelines.' },
              ].map((p, i) => (
                <div key={i} className="pillar-item reveal">
                  <strong className="pillar-label">{p.label}</strong>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/understand" className="btn-sec-link">
                Explore the full guide →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 3. SYMPTOMS OVERVIEW ─── */}
        <section className="section section-alt" aria-labelledby="symptoms-overview">
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }}>
            <div className="heading-box reveal" style={{ maxWidth: '680px', margin: '0 auto 2.5rem' }}>
              <span className="section-tag">Symptoms</span>
              <h2 id="symptoms-overview" className="section-title">It doesn&apos;t look the <span className="accent">same for everyone.</span></h2>
              <p className="section-desc">PCOS/PCOD is highly individual. Common patterns include:</p>
            </div>

            <div className="home-symptoms-grid stagger-grid">
              {[
                { icon: '🩸', label: 'Irregular periods' },
                { icon: '✨', label: 'Hormonal acne' },
                { icon: '💇', label: 'Hair changes' },
                { icon: '⚖️', label: 'Metabolic shifts' },
                { icon: '😴', label: 'Fatigue' },
                { icon: '🌙', label: 'Mood & wellbeing' },
              ].map((s, i) => (
                <div key={i} className="home-symptom-chip reveal" aria-label={s.label}>
                  <span className="home-symptom-icon" aria-hidden="true">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/symptoms" className="btn-sec-link">
                Explore symptoms &amp; care →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 4. MYTH TEASER ─── */}
        <section className="section" aria-labelledby="myth-teaser">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 5%' }}>
            <div className="reveal" style={{ textAlign: 'center' }}>
              <span className="section-tag">Myth or fact?</span>
              <h2 id="myth-teaser" className="section-title" style={{ marginBottom: '1.5rem' }}>
                &ldquo;PCOS means you can&apos;t get pregnant.&rdquo;
              </h2>
              <div className="myth-verdict-badge" aria-label="This is a myth">
                MYTH
              </div>
              <p className="section-desc" style={{ marginTop: '1.2rem', marginBottom: '2rem' }}>
                With appropriate lifestyle support and medical guidance, most people with PCOS can conceive. Ovulation may be irregular, but healthy eggs remain present.
              </p>
              <Link href="/myths" className="btn-sec-link">
                See more myths vs facts →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 5. SELF-CHECK CTA ─── */}
        <section className="section section-alt" aria-labelledby="self-check-cta">
          <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
            <div className="reveal">
              <span className="section-tag">Awareness tool</span>
              <h2 id="self-check-cta" className="section-title">Not sure what your<br />symptoms might mean?</h2>
              <p className="section-desc" style={{ marginBottom: '0.75rem', maxWidth: '520px', margin: '0 auto 1rem' }}>
                A 2-minute educational questionnaire to help you recognise patterns and prepare for a healthcare conversation.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 600 }}>
                Not a diagnosis. No personal data stored.
              </p>
              <Link href="/self-test" className="btn-sec-link">
                Start the 2-min self-check →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 6. ASK A DOCTOR ─── */}
        <section className="section" aria-labelledby="ask-cta">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
            <div className="reveal">
              <span className="section-tag">Questions</span>
              <h2 id="ask-cta" className="section-title">Questions you were<br />afraid to ask?</h2>
              <p className="section-desc" style={{ marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                Submit anonymously. Your question will be compiled and presented to a medical panel at Knowledge Beyond Symptoms 2026.
              </p>
              <Link
                href="/ask"
                className="btn-primary-cta"
              >
                Ask anonymously →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 7. CBIT NSS ATTRIBUTION ─── */}
        <section className="section section-alt" aria-labelledby="about-cta">
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={200} height={200} style={{ width: '96px', height: '96px', borderRadius: '50%', border: '3.5px solid #567C8D', boxShadow: '0 10px 30px rgba(86, 124, 141, 0.25), 0 0 25px rgba(86, 124, 141, 0.35)', marginBottom: '0.4rem' }} unoptimized />
              <h2 id="about-cta" className="section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>Built by CBIT NSS</h2>
              <p className="section-desc" style={{ maxWidth: '480px' }}>
                A student-led initiative dedicated to making women&apos;s health information clear, credible and accessible.
              </p>
              <Link href="/about" className="btn-sec-link">
                Meet the team →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
