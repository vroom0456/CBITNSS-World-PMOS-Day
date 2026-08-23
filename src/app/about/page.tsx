'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

const allTeamMembers = [
  { id: 'nk', name: 'Nithesh Kumar', role: 'President', initials: 'NK' },
  { id: 'bs', name: 'Bandaru Sampath', role: 'Vice President', initials: 'BS' },
  { id: 'kh', name: 'Kusam Harinya Reddy', role: 'General Secretary', initials: 'KH' },
  { id: 'dn', name: 'Derangula Nomini', role: "Women's Administrator", initials: 'DN' },
  { id: 'va', name: 'Veldandi Aishwarya', role: 'Joint Secretary · Documentation', initials: 'VA' },
  { id: 'ss', name: 'Sai Sankeerth Reddy', role: 'Joint Secretary · Logistics', initials: 'SS' },
  { id: 'mf', name: 'Mohammad Fasiuddin', role: 'Treasurer', initials: 'MF' },
  { id: 'sp', name: 'S. Sai Priya', role: 'Head · External Affairs', initials: 'SP' },
  { id: 'tp', name: 'B. Teja Praharsha', role: 'Events & Outreach Head', initials: 'TP' },
  { id: 'sr', name: 'Vummal Reddy Snehitha Reddy', role: 'Technical Head', initials: 'SR' },
  { id: 'nr', name: 'Budhur Neha Reddy', role: 'Design Head', initials: 'NR' },
  { id: 'vt', name: 'Varun Teja Cherukuthota', role: 'Media Head', initials: 'VT' },
  { id: 'ps', name: 'Rakuditi Purna Sandeep', role: 'Road Safety Coordinator', initials: 'PS' },
  { id: 'wa', name: 'Shaik Wasim Akram', role: 'Anti-Ragging Coordinator', initials: 'WA' },
];

export default function AboutPage() {
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

        {/* ── 01 HERO ── */}
        <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 5% clamp(2rem, 5vw, 3rem)', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="about-hero-heading">
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span className="section-tag reveal">About the campaign</span>
            <h1 id="about-hero-heading" className="section-title reveal" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
              Making women&apos;s health<br />easier to <span className="accent">understand.</span>
            </h1>
            <p className="section-desc reveal" style={{ maxWidth: '540px', margin: '0 auto' }}>
              World PMOS Day 2026 is a student-led awareness initiative by CBIT NSS, dedicated to making reliable information about Polycystic Ovary Syndrome (PCOS/PMOS) accessible, non-stigmatising and actionable for young women.
            </p>
          </div>
        </section>

        {/* ── 02 WHY WE BUILT THIS ── */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: '#FFFFFF' }} aria-labelledby="why-section">
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <span className="section-tag">Why this matters</span>
              <h2 id="why-section" className="section-title">Why we built this</h2>
            </div>
            <div className="stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
              {[
                { label: 'Understand', body: 'Medical information about PCOS/PMOS should not require a clinical background to comprehend.' },
                { label: 'Recognise', body: 'Symptoms deserve attention and care, not dismissal or stigma.' },
                { label: 'Act', body: 'Awareness should lead to informed conversations with healthcare professionals — not self-diagnosis.' },
              ].map((w, i) => (
                <div key={i} className="about-why-card reveal">
                  <strong className="about-why-label">{w.label}</strong>
                  <p className="about-why-body">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 DERANGULA NOMINI — TOP EXECUTIVE SPOTLIGHT & EXCLUSIVE CAMPUS CONTACT ── */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="support-section">
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">👑 Campus Support &amp; Guidance</span>
              <h2 id="support-section" className="section-title">Women&apos;s Administrator</h2>
              <p className="section-desc">CBIT NSS Executive Body — Exclusive campus contact for female student support &amp; confidential personal guidance.</p>
            </div>
            
            <div className="women-admin-spotlight reveal">
              <div className="spotlight-body">
                <div className="spotlight-avatar" aria-hidden="true">DN</div>
                <div className="spotlight-info">
                  <h3 className="name">Derangula Nomini</h3>
                  <p className="desc">
                    Dedicated campus administrator leading female student support, health awareness drives, and confidential personal guidance at CBIT. For any campus inquiries, health support, or confidential guidance, reach out directly below.
                  </p>
                  <div className="spotlight-actions">
                    <a href="tel:+919676648023" className="btn-contact-pill">📞 +91 96766 48023</a>
                    <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill">✉️ Email Derangula Nomini</a>
                    <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query%20regarding%20PMOS" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill">💬 Connect on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 TEAM DIRECTORY — CORE COMMITTEE (SIMPLE CLEAN LIST) ── */}
        <section id="team" style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 5%', background: '#FFFFFF' }} aria-labelledby="team-section">
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-tag">CBIT NSS Team</span>
              <h2 id="team-section" className="section-title">Core Committee</h2>
              <p className="section-desc">The dedicated student leaders of CBIT NSS guiding campus health &amp; awareness initiatives.</p>
            </div>

            <div className="team-simple-list-wrap reveal">
              <ul className="team-simple-list">
                {allTeamMembers.map((m) => (
                  <li key={m.id} className="team-simple-item">
                    <span className="member-name">{m.name}</span>
                    <span className="member-role">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 05 CBIT NSS ABOUT ── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: 'var(--bg-main)', textAlign: 'center' }} aria-labelledby="nss-section">
          <div style={{ maxWidth: '560px', margin: '0 auto' }} className="reveal">
            <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={60} height={60} style={{ borderRadius: '50%', marginBottom: '1rem' }} />
            <h2 id="nss-section" className="section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)' }}>CBIT NSS</h2>
            <p className="section-desc" style={{ marginBottom: '0' }}>
              The National Service Scheme at Chaitanya Bharathi Institute of Technology, Hyderabad. Student-led social service since its founding, covering health awareness, road safety, and community engagement.
            </p>
          </div>
        </section>

        {/* ── 06 MEDICAL DISCLAIMER ── */}
        <section style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 5%', background: '#FFFFFF' }} aria-labelledby="disclaimer-section">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="about-disclaimer reveal">
              <h2 id="disclaimer-section" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--nss-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Medical Disclaimer</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
                This website is designed strictly for campus health education and awareness. It is <strong>not</strong> a substitute for professional medical diagnosis, personalised treatment, or clinical advice. Always consult a qualified healthcare provider for accurate diagnosis and care.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
