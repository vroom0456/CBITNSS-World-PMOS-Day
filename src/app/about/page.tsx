'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

// ─── TEAM DATA ────────────────────────────────────────────────────────────────
// Personal phone numbers and email addresses have been removed from public
// display. The campaign contact is available in the contact section below.

const leadership = [
  { avatar: 'NK', role: 'President', name: 'Nithesh Kumar' },
  { avatar: 'BS', role: 'Vice President', name: 'Bandaru Sampath' },
  { avatar: 'KH', role: 'General Secretary', name: 'Kusam Harinya Reddy' },
];

const campaignTeam = [
  { role: 'Documentation', name: 'Veldandi Aishwarya' },
  { role: 'Logistics', name: 'Sai Sankeerth Reddy' },
  { role: 'Treasurer', name: 'Mohammad Fasiuddin' },
  { role: 'External Affairs', name: 'S. Sai Priya' },
  { role: 'Events & Outreach', name: 'B. Teja Praharsha' },
  { role: 'Technical', name: 'Vummal Reddy Snehitha Reddy' },
  { role: 'Design', name: 'Budhur Neha Reddy' },
  { role: 'Media', name: 'Varun Teja Cherukuthota' },
];

const coordinators = [
  { role: 'Road Safety', name: 'Rakuditi Purna Sandeep' },
  { role: 'Anti-Ragging', name: 'Shaik Wasim Akram' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');
}

export default function AboutPage() {
  const [teamOpen, setTeamOpen] = useState(true);
  const [coordOpen, setCoordOpen] = useState(false);

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

        {/* ── 03 OUR APPROACH ── */}
        <section style={{ padding: 'clamp(2.5rem, 6vw, 4rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="approach-section">
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <span className="section-tag">Our approach</span>
              <h2 id="approach-section" className="section-title">Four principles</h2>
            </div>
            <div className="stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.2rem' }}>
              {[
                { label: 'Evidence-led', body: 'Grounded in published international guidelines — primarily the 2023 Monash University PCOS guidelines.' },
                { label: 'Student-friendly', body: 'Written for a campus audience — clear language, no unnecessary clinical jargon.' },
                { label: 'Privacy-conscious', body: 'No personal data collected. Anonymous questions only. No identifying information required.' },
                { label: 'Non-diagnostic', body: 'We provide health awareness, not medical diagnosis. Always consult a qualified healthcare provider.' },
              ].map((p, i) => (
                <div key={i} className="approach-item reveal">
                  <strong className="approach-label">{p.label}</strong>
                  <p className="approach-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 LEADERSHIP ── */}
        <section id="team" style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 5%', background: '#FFFFFF' }} aria-labelledby="team-section">
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <span className="section-tag">The team</span>
              <h2 id="team-section" className="section-title">The people behind<br />the campaign</h2>
              <p className="section-desc">CBIT NSS Core Committee 2026–2027</p>
            </div>

            {/* LEADERSHIP — 3 featured cards */}
            <div className="leadership-grid stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.2rem', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              {leadership.map((m, i) => (
                <div key={i} className="leadership-card reveal" aria-label={`${m.name}, ${m.role}`}>
                  <div className="leadership-avatar" aria-hidden="true">{getInitials(m.name)}</div>
                  <strong className="leadership-name">{m.name}</strong>
                  <span className="leadership-role">{m.role}</span>
                </div>
              ))}
            </div>

            {/* CAMPAIGN TEAM — accordion on mobile */}
            <div className="team-accordion">
              <button
                className="team-accordion-header"
                onClick={() => setTeamOpen(v => !v)}
                aria-expanded={teamOpen}
                aria-controls="campaign-team-panel"
              >
                <span>Campaign Team</span>
                <span className="team-accordion-chevron" aria-hidden="true">{teamOpen ? '▲' : '▼'}</span>
              </button>
              <div
                id="campaign-team-panel"
                className={`team-accordion-panel${teamOpen ? ' open' : ''}`}
                hidden={!teamOpen}
              >
                <ul className="campaign-team-list" role="list">
                  {campaignTeam.map((m, i) => (
                    <li key={i} className="campaign-team-row">
                      <span className="campaign-team-role">{m.role}</span>
                      <span className="campaign-team-name">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COORDINATORS */}
            <div className="team-accordion" style={{ marginTop: '0.75rem' }}>
              <button
                className="team-accordion-header"
                onClick={() => setCoordOpen(v => !v)}
                aria-expanded={coordOpen}
                aria-controls="coordinators-panel"
              >
                <span>Campus Coordinators</span>
                <span className="team-accordion-chevron" aria-hidden="true">{coordOpen ? '▲' : '▼'}</span>
              </button>
              <div
                id="coordinators-panel"
                className={`team-accordion-panel${coordOpen ? ' open' : ''}`}
                hidden={!coordOpen}
              >
                <ul className="campaign-team-list" role="list">
                  {coordinators.map((m, i) => (
                    <li key={i} className="campaign-team-row">
                      <span className="campaign-team-role">{m.role}</span>
                      <span className="campaign-team-name">{m.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 WOMEN'S ADMINISTRATOR / CAMPUS SUPPORT ── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="support-section">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <span className="section-tag">Campus support</span>
              <h2 id="support-section" className="section-title">Need confidential guidance?</h2>
              <p className="section-desc">Our Women&apos;s Administrator provides confidential campus support for female students.</p>
            </div>
            <div className="support-card reveal">
              <div className="support-avatar" aria-hidden="true">DN</div>
              <div>
                <strong className="support-name">D. Nomini</strong>
                <span className="support-role">Women&apos;s Administrator, CBIT</span>
                <p className="support-desc">Dedicated campus support for female students on health, welfare, and personal concerns.</p>
                <div className="support-actions">
                  <a href="tel:+919676648023" className="btn-contact-pill" aria-label="Call D. Nomini">
                    Call
                  </a>
                  <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill" aria-label="Email D. Nomini">
                    Email
                  </a>
                  <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill" aria-label="WhatsApp D. Nomini">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 CBIT NSS ── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: '#FFFFFF', textAlign: 'center' }} aria-labelledby="nss-section">
          <div style={{ maxWidth: '560px', margin: '0 auto' }} className="reveal">
            <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={60} height={60} style={{ borderRadius: '50%', marginBottom: '1rem' }} />
            <h2 id="nss-section" className="section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)' }}>CBIT NSS</h2>
            <p className="section-desc" style={{ marginBottom: '0' }}>
              The National Service Scheme at Chaitanya Bharathi Institute of Technology, Hyderabad. Student-led social service since its founding, covering health awareness, road safety, and community engagement.
            </p>
          </div>
        </section>

        {/* ── 07 MEDICAL DISCLAIMER ── */}
        <section style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="disclaimer-section">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="about-disclaimer reveal">
              <h2 id="disclaimer-section" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--nss-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Medical Disclaimer</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
                This website is designed strictly for campus health education and awareness. It is <strong>not</strong> a substitute for professional medical diagnosis, personalised treatment, or clinical advice. Symptoms described on this site can result from various conditions. Always consult a qualified healthcare provider — a gynaecologist, endocrinologist, or general practitioner — for accurate diagnosis and care.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
