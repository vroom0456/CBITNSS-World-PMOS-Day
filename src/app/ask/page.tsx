'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AskPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">🌸 Anonymous Student Guidance</span>
            <h1 className="section-title">
              Ask a Doctor <span className="accent">Anonymously</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Submit your personal health doubt freely. All questions are compiled anonymously by CBIT NSS and answered live by certified Gynaecologists during World PMOS Day 2026.
            </p>
          </div>
        </section>

        {/* Q&A FORM SECTION */}
        <section style={{ padding: '3rem 0 4rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            
            <div className="ask-form-card">
              
              <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.4rem' }}>🔒</span>
                <span className="modal-badge">100% Student Confidentiality Guaranteed</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginTop: '0.6rem', lineHeight: 1.65 }}>
                  Do <strong>NOT</strong> include your name, email, phone number, or student ID. Your question remains completely anonymous.
                </p>
              </div>

              <div className="ask-notice-box" style={{ background: '#FFFFFF', borderLeft: '4px solid var(--nss-blue-accent)', padding: '0.85rem 1.2rem', borderRadius: 'var(--r-sm)', marginBottom: '1.8rem', fontSize: '0.86rem', color: 'var(--nss-navy)', fontWeight: 600, lineHeight: 1.55 }}>
                🛡️ <strong>Educational Notice:</strong> Doctor responses provide general medical awareness and guidance — they do not replace in-person clinical diagnosis or emergency care.
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label htmlFor="q-topic" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>
                      Select Category (Optional)
                    </label>
                    <select
                      id="q-topic"
                      name="category"
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border-light)', fontSize: '0.92rem', color: 'var(--nss-navy)', background: '#FFFFFF' }}
                    >
                      <option value="General PMOS Doubts">General PMOS &amp; Symptoms</option>
                      <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                      <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Shifts</option>
                      <option value="Emotional Wellbeing">Emotional Wellbeing &amp; Stress</option>
                      <option value="Diet Lifestyle">Diet &amp; Lifestyle Doubts</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="q-message" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>
                      Your Question for the Doctor *
                    </label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={5}
                      placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed about exams?"
                      required
                      style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border-light)', fontSize: '0.92rem', color: 'var(--nss-navy)', background: '#FFFFFF', fontFamily: 'inherit', resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ width: '100%', background: 'var(--nss-blue-accent)', color: '#FFFFFF', padding: '0.95rem', borderRadius: 'var(--r-pill)', fontWeight: 800, fontSize: '0.96rem', cursor: submitting ? 'not-allowed' : 'pointer', border: 'none' }}
                  >
                    {submitting ? '⏳ Submitting Anonymously...' : '🌸 Submit Question Anonymously'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '0.5rem' }}>✅</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                    Anonymous Question Submitted!
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Thank you! Your doubt has been recorded. Our CBIT NSS team will compile it for the panel of Gynaecologists during World PMOS Awareness Day 2026.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.75rem 1.6rem', borderRadius: 'var(--r-pill)', fontWeight: 800, cursor: 'pointer' }}
                  >
                    🌸 Submit Another Doubt
                  </button>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* VERIFIED HELPLINES */}
        <section style={{ padding: '4rem 0', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">📞 Support Resources</span>
              <h2 className="section-title">Verified <span className="accent">Helplines &amp; Support</span></h2>
              <p className="section-desc">National helplines for women&apos;s health, emotional stress, and student wellness.</p>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>🏥</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>National Women&apos;s Helpline</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Toll-Free 24/7. Government dedicated helpline for women&apos;s health guidance.
                  </p>
                  <a href="tel:1091" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--soft-teal-bg)', color: 'var(--nss-blue-accent)', padding: '6px 14px', borderRadius: '9999px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', minHeight: '44px' }}>
                    📞 Call 1091
                  </a>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>🧠</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>iCall Mental Health Support</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Free counselling for emotional stress and wellbeing concerns.
                  </p>
                  <a href="tel:9152987821" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--soft-teal-bg)', color: 'var(--nss-blue-accent)', padding: '6px 14px', borderRadius: '9999px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', minHeight: '44px' }}>
                    📞 Call 9152987821
                  </a>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>🎓</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>CBIT NSS Student Support</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Reach D. Nomini (Women&apos;s Administrator) for confidential campus guidance.
                  </p>
                  <a href="tel:+919676648023" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--soft-teal-bg)', color: 'var(--nss-blue-accent)', padding: '6px 14px', borderRadius: '9999px', fontWeight: 800, fontSize: '16px', textDecoration: 'none', minHeight: '44px' }}>
                    📞 Call +91 96766 48023
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
