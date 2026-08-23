'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

const allTeamMembers = [
  { id: 'nk', name: 'Nithesh Kumar', role: 'President', initials: 'NK', phone: '+91 85229 92585', tel: '+918522992585', email: 'n.nitheshkumar8106@gmail.com' },
  { id: 'bs', name: 'Bandaru Sampath', role: 'Vice President', initials: 'BS', phone: '+91 72071 27045', tel: '+917207127045', email: 'sampathkavali45@gmail.com' },
  { id: 'kh', name: 'Kusam Harinya Reddy', role: 'General Secretary', initials: 'KH', phone: '+91 63028 98414', tel: '+916302898414', email: 'harinyareddy.k@gmail.com' },
  { id: 'va', name: 'Veldandi Aishwarya', role: 'Joint Secretary · Documentation', initials: 'VA', phone: '+91 73961 08692', tel: '+917396108692', email: 'aishwaryaveldandi21@gmail.com' },
  { id: 'ss', name: 'Sai Sankeerth Reddy', role: 'Joint Secretary · Logistics', initials: 'SS', phone: '+91 94415 62832', tel: '+919441562832', email: 'saisankeerthreddy2610@gmail.com' },
  { id: 'mf', name: 'Mohammad Fasiuddin', role: 'Treasurer', initials: 'MF', phone: '+91 63019 48215', tel: '+916301948215', email: 'fasiuddin3558@gmail.com' },
  { id: 'sp', name: 'S. Sai Priya', role: 'Head · External Affairs', initials: 'SP', phone: '+91 63095 89152', tel: '+916309589152', email: '10bsaipriya@gmail.com' },
  { id: 'tp', name: 'B. Teja Praharsha', role: 'Events & Outreach Head', initials: 'TP', phone: '+91 62810 11433', tel: '+916281011433', email: 'tejapraharsha23@gmail.com' },
  { id: 'sr', name: 'Vummal Reddy Snehitha Reddy', role: 'Technical Head', initials: 'SR', phone: '+91 76750 21038', tel: '+917675021038', email: 'vummalreddysnehitha@gmail.com' },
  { id: 'nr', name: 'Budhur Neha Reddy', role: 'Design Head', initials: 'NR', phone: '+91 98661 91349', tel: '+919866191349', email: 'budhurnehareddy@gmail.com' },
  { id: 'vt', name: 'Varun Teja Cherukuthota', role: 'Media Head', initials: 'VT', phone: '+91 79814 67284', tel: '+917981467284', email: 'varuntejacherukuthota.0456@gmail.com' },
  { id: 'ps', name: 'Rakuditi Purna Sandeep', role: 'Road Safety Coordinator', initials: 'PS', phone: '+91 63031 05090', tel: '+916303105090', email: 'purnasandeeprakuditi@gmail.com' },
  { id: 'wa', name: 'Shaik Wasim Akram', role: 'Anti-Ragging Coordinator', initials: 'WA', phone: '+91 95028 98222', tel: '+919502898222', email: 'Shaikwasimakram20@gmail.com' },
];

export default function AboutPage() {
  const [openMemberId, setOpenMemberId] = useState<string | null>(null);

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

  const toggleMember = (id: string) => {
    setOpenMemberId(prev => (prev === id ? null : id));
  };

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

        {/* ── 02 D. NOMINI — TOP EXECUTIVE SPOTLIGHT ── */}
        <section style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5%', background: '#FFFFFF' }} aria-labelledby="support-section">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <span className="section-tag">👑 Student Support &amp; Guidance</span>
              <h2 id="support-section" className="section-title">Women&apos;s Administrator</h2>
              <p className="section-desc">CBIT NSS Executive Body — Leading female student support &amp; personal guidance.</p>
            </div>
            
            <div className="women-admin-spotlight reveal">
              <div className="spotlight-top">
                <span className="spotlight-badge">👑 Special Role · Student Support</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>CBIT Executive Body</span>
              </div>
              <div className="spotlight-body">
                <div className="spotlight-avatar" aria-hidden="true">DN</div>
                <div className="spotlight-info">
                  <p className="role">Women&apos;s Administrator</p>
                  <h3 className="name">D. Nomini</h3>
                  <p className="desc">Dedicated campus administrator leading female student support, health awareness drives, and confidential personal guidance at CBIT.</p>
                  <div className="spotlight-actions">
                    <a href="tel:+919676648023" className="btn-contact-pill">📞 +91 96766 48023</a>
                    <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill">✉️ Email D. Nomini</a>
                    <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query%20regarding%20PMOS" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill">💬 Connect on WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 TEAM DIRECTORY (UNIFIED LIST WITH DROPDOWN CONTACT INFO) ── */}
        <section id="team" style={{ padding: 'clamp(2.5rem, 6vw, 4.5rem) 5%', background: 'var(--bg-main)' }} aria-labelledby="team-section">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">CBIT NSS Team</span>
              <h2 id="team-section" className="section-title">Organising Committee</h2>
              <p className="section-desc">Click on any team member to view their direct contact information.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }} role="list">
              {allTeamMembers.map((m) => {
                const isOpen = openMemberId === m.id;
                return (
                  <div
                    key={m.id}
                    className={`member-dropdown-card ${isOpen ? 'open' : ''}`}
                    style={{
                      background: '#FFFFFF',
                      border: '1.5px solid var(--border-light)',
                      borderRadius: 'var(--r-md)',
                      overflow: 'hidden',
                      transition: 'all 0.25s ease',
                      boxShadow: isOpen ? 'var(--shadow-card)' : 'var(--shadow-soft)',
                    }}
                    role="listitem"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMember(m.id)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '1.1rem 1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: 'var(--soft-mint-bg)',
                            color: 'var(--nss-navy)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            flexShrink: 0,
                            border: '2px solid var(--nss-blue-accent)'
                          }}
                        >
                          {m.initials}
                        </div>
                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.1rem' }}>
                            {m.role}
                          </span>
                          <strong style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--nss-navy)', display: 'block' }}>
                            {m.name}
                          </strong>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--nss-blue-accent)',
                          fontWeight: 800,
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </button>

                    {/* DROPDOWN CONTACT INFO */}
                    {isOpen && (
                      <div
                        style={{
                          padding: '0.8rem 1.4rem 1.2rem',
                          borderTop: '1px solid var(--border-light)',
                          background: 'var(--soft-teal-bg)',
                          display: 'flex',
                          gap: '0.75rem',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          animation: 'fade-in 0.25s ease'
                        }}
                      >
                        <a
                          href={`tel:${m.tel}`}
                          className="btn-contact-pill"
                          style={{ background: '#FFFFFF', padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--nss-navy)', borderRadius: '9999px', border: '1px solid var(--soft-teal-border)' }}
                        >
                          📞 {m.phone}
                        </a>
                        <a
                          href={`mailto:${m.email}`}
                          className="btn-contact-pill"
                          style={{ background: 'var(--nss-navy)', padding: '0.45rem 0.95rem', fontSize: '0.82rem', fontWeight: 800, color: '#FFFFFF', borderRadius: '9999px' }}
                        >
                          ✉️ Email {m.name.split(' ')[0]}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 04 WHY WE BUILT THIS ── */}
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
