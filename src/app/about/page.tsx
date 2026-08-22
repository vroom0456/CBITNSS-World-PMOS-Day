'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* TEAM SECTION */}
        <section id="team" style={{ padding: "3rem 0 5rem", background: "var(--bg-main)" }}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="heading-box reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span className="section-tag">🤝 Unified Leadership</span>
              <h2 className="section-title">CBIT NSS Core Committee 2026–2027</h2>
              <p className="section-desc">Our dedicated CBIT NSS team leading the World PMOS Awareness Campaign across campus.</p>
            </div>

            {/* SPECIAL SPOTLIGHT: WOMEN'S ADMINISTRATOR */}
            <div className="women-admin-spotlight reveal" style={{ background: "#FFFFFF", border: "1.5px solid var(--soft-teal-border)", borderRadius: "var(--r-lg)", padding: "clamp(1.5rem, 5vw, 2.4rem) clamp(1.2rem, 5vw, 2rem)", marginBottom: "3rem" }}>
              <div className="spotlight-top" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span className="spotlight-badge" style={{ background: "var(--nss-blue-accent)", color: "#FFFFFF", padding: "0.3rem 0.9rem", borderRadius: "var(--r-pill)", fontSize: "0.78rem", fontWeight: 800 }}>👑 Special Role · Student Support &amp; Guidance</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>CBIT NSS Executive Body</span>
              </div>
              <div className="spotlight-body" style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                <div className="spotlight-avatar" style={{ width: "70px", height: "70px", borderRadius: "50%", background: "var(--nss-blue-accent)", color: "#FFFFFF", fontSize: "1.6rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>DN</div>
                <div className="spotlight-info">
                  <p className="role" style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--nss-blue-accent)", textTransform: "uppercase" }}>Women&apos;s Administrator</p>
                  <h3 className="name" style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--nss-navy)" }}>D. Nomini</h3>
                  <p className="desc" style={{ fontSize: "0.9rem", color: "var(--text-body)", marginTop: "0.2rem" }}>Dedicated campus administrator leading female student support, health awareness drives, and confidential personal guidance at CBIT.</p>
                  <div className="spotlight-actions" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <a href="tel:+919676648023" className="btn-contact-pill">📞 +91 96766 48023</a>
                    <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill">✉️ Email D. Nomini</a>
                    <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query%20regarding%20PMOS" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill">💬 Connect on WhatsApp</a>
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

      <Footer />
    </>
  );
}
