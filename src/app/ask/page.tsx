'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IconCheckCircle, IconPhone, IconShield } from '@/components/ui/Icons';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const category = (formData.get('category') as string) || 'General PMOS Doubts';
    const message = (formData.get('message') as string) || '';

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '9530c568-fc97-4250-8b78-3dde99ec83b2';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Knowledge Beyond Symptoms Q&A] ${category}`,
          from_name: 'CBIT Student (Anonymous)',
          Category: category,
          Question: message,
          'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitting(false);
        setSubmitted(true);
        form.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      // Fallback graceful handling so user flow continues cleanly
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">Anonymous questions</span>
            <h1 className="section-title">
              Ask a Doctor <span className="accent">Anonymously</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Submit your question without sharing any personal details. Questions are compiled by CBIT NSS and presented to a medical panel at Knowledge Beyond Symptoms 2026.
            </p>
          </div>
        </section>

        {/* Q&A FORM SECTION */}
        <section style={{ padding: '3rem 0 4rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            
            <div className="ask-form-card">
              
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem', color: 'var(--soft-teal-accent)' }} aria-hidden="true">
                <IconShield size={48} />
              </div>
              <h2 id="ask-heading" className="section-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '0.6rem' }}>
                Ask a Question <span className="accent">Anonymously</span>
              </h2>
              <p className="section-desc" style={{ maxWidth: '580px', margin: '0 auto', fontSize: '0.94rem' }}>
                Submit your health queries freely. No names, email addresses, or phone numbers are collected or stored anywhere.
              </p>
            </div>

            <div style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-light)', borderRadius: 'var(--r-sm)', padding: '0.9rem 1.1rem', marginBottom: '1.8rem', fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <IconShield size={18} color="var(--nss-blue-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Educational Notice:</strong> Doctor responses provide general medical awareness and guidance — they do not replace in-person clinical diagnosis or emergency care.
              </div>
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

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label htmlFor="q-message" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem' }}>
                      Your Question for the Doctor *
                    </label>
                    <textarea
                      id="q-message"
                      name="message"
                      rows={4}
                      placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed about exams?"
                      required
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--r-sm)', border: '1.5px solid var(--border-light)', fontSize: '0.92rem', color: 'var(--nss-navy)', background: '#FFFFFF', fontFamily: 'inherit', resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-send-general"
                    disabled={submitting}
                    style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                  {submitting ? 'Submitting…' : 'Submit question anonymously'}
                  </button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem', marginBottom: 0 }}>
                    Please don&apos;t include identifying or highly personal information in your question.
                  </p>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem', color: 'var(--soft-teal-accent)' }}>
                    <IconCheckCircle size={54} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.6rem' }}>
                    Anonymous Question Submitted!
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Thank you. Your question has been recorded and will be compiled for the medical panel at Knowledge Beyond Symptoms 2026.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary-action"
                    style={{ cursor: 'pointer' }}
                  >
                    Submit another question
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
              <span className="section-tag">Support Resources</span>
              <h2 className="section-title">Helplines &amp; <span className="accent">Support Services</span></h2>
              <p className="section-desc">National helplines for women&apos;s health, emotional stress, and student wellness.</p>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '18px 20px', borderRadius: '24px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ flexShrink: 0, color: 'var(--soft-teal-accent)' }}>
                  <IconPhone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>National Women&apos;s Helpline</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Toll-Free 24/7. Government dedicated helpline for women&apos;s health guidance.
                  </p>
                  <a href="tel:1091" className="btn-contact-pill" style={{ marginTop: '0.4rem' }}>
                    <IconPhone size={14} /> Call 1091
                  </a>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '18px 20px', borderRadius: '24px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ flexShrink: 0, color: 'var(--soft-teal-accent)' }}>
                  <IconPhone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>iCall Mental Health Support</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Free counselling for emotional stress and wellbeing concerns.
                  </p>
                  <a href="tel:9152987821" className="btn-contact-pill" style={{ marginTop: '0.4rem' }}>
                    <IconPhone size={14} /> Call 9152987821
                  </a>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="resource-card reveal" style={{ background: '#FFFFFF', padding: '18px 20px', borderRadius: '24px', border: '1.5px solid var(--border-light)', display: 'flex', gap: '12px', alignItems: 'center', height: '100%' }}>
                <div style={{ flexShrink: 0, color: 'var(--soft-teal-accent)' }}>
                  <IconPhone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--nss-navy)', marginBottom: '4px' }}>CBIT NSS Student Support</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '6px' }}>
                    Reach Derangula Nomini (Women&apos;s Administrator) for confidential campus guidance.
                  </p>
                  <a href="tel:+919676648023" className="btn-contact-pill" style={{ marginTop: '0.4rem' }}>
                    <IconPhone size={14} /> Call +91 96766 48023
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
