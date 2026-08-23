'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
  { avatar: 'NK', role: 'President', name: 'Nithesh Kumar', phone: '+91 85229 92585', tel: '+918522992585', email: 'n.nitheshkumar8106@gmail.com' },
  { avatar: 'BS', role: 'Vice President', name: 'Bandaru Sampath', phone: '+91 72071 27045', tel: '+917207127045', email: 'sampathkavali45@gmail.com' },
  { avatar: 'KH', role: 'General Secretary', name: 'Kusam Harinya Reddy', phone: '+91 63028 98414', tel: '+916302898414', email: 'harinyareddy.k@gmail.com' },
  { avatar: 'VA', role: 'Joint Secretary · Documentation', name: 'Veldandi Aishwarya', phone: '+91 73961 08692', tel: '+917396108692', email: 'aishwaryaveldandi21@gmail.com' },
  { avatar: 'SS', role: 'Joint Secretary · Logistics', name: 'Sai Sankeerth Reddy', phone: '+91 94415 62832', tel: '+919441562832', email: 'saisankeerthreddy2610@gmail.com' },
  { avatar: 'MF', role: 'Treasurer', name: 'Mohammad Fasiuddin', phone: '+91 63019 48215', tel: '+916301948215', email: 'fasiuddin3558@gmail.com' },
  { avatar: 'SP', role: 'Head · External Affairs', name: 'S. Sai Priya', phone: '+91 63095 89152', tel: '+916309589152', email: '10bsaipriya@gmail.com' },
  { avatar: 'TP', role: 'Events & Outreach Head', name: 'B. Teja Praharsha', phone: '+91 62810 11433', tel: '+916281011433', email: 'tejapraharsha23@gmail.com' },
  { avatar: 'SR', role: 'Technical Head', name: 'Vummal Reddy Snehitha Reddy', phone: '+91 76750 21038', tel: '+917675021038', email: 'vummalreddysnehitha@gmail.com' },
  { avatar: 'NR', role: 'Design Head', name: 'Budhur Neha Reddy', phone: '+91 98661 91349', tel: '+919866191349', email: 'budhurnehareddy@gmail.com' },
  { avatar: 'VT', role: 'Media Head', name: 'Varun Teja Cherukuthota', phone: '+91 79814 67284', tel: '+917981467284', email: 'varuntejacherukuthota.0456@gmail.com' },
  { avatar: 'PS', role: 'Road Safety Coordinator', name: 'Rakuditi Purna Sandeep', phone: '+91 63031 05090', tel: '+916303105090', email: 'purnasandeeprakuditi@gmail.com' },
  { avatar: 'WA', role: 'Anti-Ragging Coordinator', name: 'Shaik Wasim Akram', phone: '+91 95028 98222', tel: '+919502898222', email: 'Shaikwasimakram20@gmail.com' },
];

export default function HomePage() {
  const [sourceDrawerOpen, setSourceDrawerOpen] = useState(false);
  const [selectedSourceTitle, setSelectedSourceTitle] = useState('');
  const [selectedSourceContent, setSelectedSourceContent] = useState('');

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

  const openSourceModal = (title: string, content: string) => {
    setSelectedSourceTitle(title);
    setSelectedSourceContent(content);
    setSourceDrawerOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* ─── 1. HERO ─── */}
        <section id="hero">
          <div className="hero-container">
            {/* Brand badge */}
            <div className="nss-hero-badge">
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={18} height={18} priority />
              <span>CBIT NSS</span>
            </div>

            {/* Event info — single compact line */}
            <div className="hero-event-info">
              <span>📅 1st Sept 2026 · 10:00 AM</span>
              <span className="hero-event-sep">·</span>
              <span>📍 Assembly Hall, CBIT</span>
            </div>

            <h1 className="hero-h1">
              PCOS Uncovered:{' '}
              <span className="accent-text">Awareness, Understanding &amp; Empowerment</span>
            </h1>

            <p className="hero-desc">
              Polycystic Ovary Syndrome (PCOS) is a common hormonal condition affecting millions — yet often misunderstood or undiagnosed. This World PCOS Day, explore reliable information about causes, symptoms, diagnosis and management.
            </p>

            {/* CTA Row — Highlighted Single Primary Action */}
            <div className="hero-cta-row">
              <button
                className="btn-primary-cta"
                onClick={() => window.dispatchEvent(new Event('openModal'))}
              >
                🌸 Ask a Doctor Anonymously →
              </button>
            </div>
          </div>
        </section>

        {/* ─── 2. STATISTICS ─── */}
        <section id="numbers">
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">Global Statistics</span>
              <h2 className="section-title">PMOS <span className="accent">By The Numbers</span></h2>
              <p className="section-desc">Sourced from the <em>2023 &amp; 2026 International Evidence-Based Guidelines (Monash)</em>.</p>
            </div>

            <div id="stats-banner" className="stats-cards-grid">
              {[
                { num: '1 in 8', label: 'Reproductive Age Women', desc: 'Affects up to 13% of women worldwide, making it the most prevalent hormonal condition.', src: 'Monash Guideline 2023', srcDesc: 'Epidemiology data from 2023 International Evidence-Based Guideline for the Assessment and Management of PCOS/PMOS.' },
                { num: '170M+', label: 'Worldwide Impact', desc: 'Over 170 million individuals globally experience reproductive, metabolic, or emotional symptoms.', src: 'WHO & Monash Data 2026', srcDesc: 'Global burden statistics published by WHO and Monash University international research consensus.' },
                { num: '2026', label: 'Terminology Update', desc: 'International consensus renamed the condition "PMOS" to reflect multi-system metabolic and endocrine health.', src: '2026 PMOS Nomenclature Consensus', srcDesc: 'International terminology update clarifying that ovaries are not the sole origin of the condition.' },
              ].map((s, i) => (
                <div key={i} className="stat-box reveal">
                  <span className="num-val">{s.num}</span>
                  <h3 className="stat-label">{s.label}</h3>
                  <p className="stat-desc">{s.desc}</p>
                  <button className="source-trigger-btn" onClick={() => openSourceModal(s.src, s.srcDesc)}>
                    ⓘ Sources
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. CAMPAIGN NAV HUB ─── */}
        <section className="section section-alt">
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">Explore</span>
              <h2 className="section-title">Campaign <span className="accent">Sections</span></h2>
              <p className="section-desc">Each topic has its own dedicated page.</p>
            </div>

            <div className="nav-hub-grid">
              {[
                { num: '01', icon: '🔬', tag: 'Medical Guide',   title: 'Understand PMOS & 4 Pillars',    desc: 'Why the name changed from PCOS to PMOS and the four multi-system health pillars.', link: '/understand' },
                { num: '02', icon: '🩺', tag: 'Symptom Care',    title: 'Symptoms & Clinical Care',        desc: 'Evidence-based symptoms, exercise response, gut microbiome and lab evaluations.', link: '/symptoms' },
                { num: '03', icon: '📝', tag: 'Interactive Tool', title: '2-Minute Self-Check Wizard',     desc: 'A brief awareness questionnaire with tailored results and doctor pointers.', link: '/self-test' },
                { num: '04', icon: '💡', tag: 'Science Check',   title: 'Myths vs Facts & Care',          desc: 'Debunking fertility, diet, and weight myths with evidence-backed guidance.', link: '/myths' },
                { num: '05', icon: '🌸', tag: 'Student Privacy', title: 'Ask a Doctor Anonymously',       desc: '100% anonymous medical doubt submission answered live by certified gynaecologists.', link: '/ask' },
                { num: '06', icon: '📚', tag: 'Campus Kit',      title: 'Research & Campus Kit',          desc: 'Monash citations, printable posters and the offline QR reference kit.', link: '/resources' },
              ].map((card, idx) => (
                <a key={idx} href={card.link} className="nav-hub-row reveal">
                  <span className="nhr-icon">{card.icon}</span>
                  <span className="nhr-tag">{card.tag}</span>
                  <div className="nhr-content">
                    <span className="nhr-num">{card.num}</span>
                    <div className="nhr-text">
                      <strong className="nhr-title">{card.title}</strong>
                      <span className="nhr-desc">{card.desc}</span>
                    </div>
                  </div>
                  <span className="nhr-arrow" aria-hidden>›</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. EXECUTIVE COMMITTEE & LEADERSHIP ─── */}
        <section id="team" className="section" style={{ background: 'var(--bg-main)' }}>
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">🤝 Unified Leadership</span>
              <h2 className="section-title">CBIT NSS <span className="accent">Core Committee 2026–2027</span></h2>
              <p className="section-desc">Our dedicated CBIT NSS team leading the World PMOS Awareness Campaign across campus.</p>
            </div>

            {/* SPECIAL SPOTLIGHT: WOMEN'S ADMINISTRATOR */}
            <div className="women-admin-spotlight reveal">
              <div className="spotlight-top">
                <span className="spotlight-badge">👑 Student Support &amp; Guidance</span>
                <span className="spotlight-sub">CBIT NSS Executive Body</span>
              </div>
              <div className="spotlight-body">
                <div className="spotlight-avatar">DN</div>
                <div className="spotlight-info">
                  <p className="role">Women&apos;s Administrator</p>
                  <h3 className="name">D. Nomini</h3>
                  <p className="desc">Dedicated campus administrator leading female student support, health awareness drives, and confidential personal guidance at CBIT.</p>
                  <div className="spotlight-actions">
                    <a href="tel:+919676648023" className="btn-contact-pill">📞 +91 96766 48023</a>
                    <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill">✉️ Email D. Nomini</a>
                    <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query%20regarding%20PMOS" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill">💬 WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>

            {/* FULL EXECUTIVE COMMITTEE GRID */}
            <div className="team-grid stagger-grid">
              {teamMembers.map((m, idx) => (
                <div key={idx} className="member-card reveal">
                  <div className="member-top">
                    <div className="member-avatar">{m.avatar}</div>
                    <div className="member-meta">
                      <div className="role-pill">{m.role}</div>
                      <div className="name">{m.name}</div>
                    </div>
                  </div>
                  <div className="member-actions">
                    <a href={`tel:${m.tel}`} className="btn-contact-pill">📞 {m.phone}</a>
                    <a href={`mailto:${m.email}`} className="btn-contact-pill">✉️ Email {m.name.split(' ')[0]}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* SOURCE DRAWER */}
      {sourceDrawerOpen && (
        <div
          className="modal-overlay active"
          style={{ display: 'flex' }}
          onClick={() => setSourceDrawerOpen(false)}
        >
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">📚 Citation Source</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.8rem' }}>{selectedSourceTitle}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.65 }}>{selectedSourceContent}</p>
            <button
              onClick={() => setSourceDrawerOpen(false)}
              style={{ marginTop: '1.5rem', background: 'var(--nss-navy)', color: '#FFFFFF', padding: '0.65rem 1.4rem', borderRadius: '10px', fontWeight: 800, width: '100%', cursor: 'pointer', border: 'none' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
