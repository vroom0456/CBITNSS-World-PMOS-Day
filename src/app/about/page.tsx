'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

declare global {
  interface Window {
    closeModal: () => void;
    closeModalOnOverlay: (e: React.SyntheticEvent) => void;
    handleGenContactSubmit: (e: React.SyntheticEvent) => void;
    handleModalAnonSubmit: (e: React.SyntheticEvent) => void;
  }
}

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
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));

    const anonModal = document.getElementById('anon-modal');
    const handleOpenModal = () => {
      if(anonModal) {
        anonModal.style.display = 'flex';
        requestAnimationFrame(() => requestAnimationFrame(() => anonModal.classList.add('active')));
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('openModal', handleOpenModal);
    window.closeModal = function() {
      if(anonModal) {
        anonModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { anonModal.style.display = 'none'; }, 400);
      }
    };
    window.closeModalOnOverlay = function(e: React.SyntheticEvent) { if (e.target === anonModal) window.closeModal(); };
    if(anonModal) anonModal.style.display = 'none';

    window.handleGenContactSubmit = function(e: React.SyntheticEvent) {
      e.preventDefault();
      const btn = document.getElementById('gen-submit-btn') as HTMLButtonElement;
      if(btn) {
        btn.textContent = '⏳ Sending...'; btn.disabled = true;
        setTimeout(() => {
          btn.textContent = '✅ Sent Successfully!';
          const alert = document.getElementById('gen-success-alert');
          if(alert) alert.style.display = 'block';
          setTimeout(() => {
            btn.textContent = '✉️ Send Message to CBIT NSS'; btn.disabled = false;
            if(alert) alert.style.display = 'none';
            (document.getElementById('gen-contact-form') as HTMLFormElement)?.reset();
          }, 3500);
        }, 900);
      }
    };

    return () => {
      observer.disconnect();
      window.removeEventListener('openModal', handleOpenModal);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        {/* DOCTOR ADVOCACY BANNER */}
        <section id="doctor" style={{ padding: "3rem 0 2rem" }}>
          <div className="container">
            <div className="doctor-advocacy-banner reveal">
              <div style={{ fontSize: "2.5rem" }}>💜</div>
              <div>
                <h4>Remember: You Deserve Proper Medical Care</h4>
                <p>Never hesitate to advocate for your health. If you feel unwell, consult a qualified healthcare provider. Our CBIT NSS team stands with you!</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" style={{ padding: "2rem 0 5rem" }}>
          <div className="container">
            <div className="heading-box reveal">
              <span className="section-tag">🤝 Unified Leadership</span>
              <h2 className="section-title">CBIT NSS Core Committee 2026–2027</h2>
              <p className="section-desc">Our dedicated CBIT NSS team available to support students across campus.</p>
            </div>

            {/* SPECIAL SPOTLIGHT: WOMEN'S ADMINISTRATOR */}
            <div className="women-admin-spotlight reveal">
              <div className="spotlight-top">
                <span className="spotlight-badge">👑 Special Role · Student Support &amp; Guidance</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)" }}>CBIT NSS Executive Body</span>
              </div>
              <div className="spotlight-body">
                <div className="spotlight-avatar">DN</div>
                <div className="spotlight-info">
                  <p className="role">Women&apos;s Administrator</p>
                  <h3 className="name">D. Nomini</h3>
                  <p className="desc">Dedicated campus administrator leading female student support, health awareness drives, and confidential personal guidance at CBIT.</p>
                  <div className="spotlight-actions" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <a href="tel:+919676648023" className="btn-contact-pill">📞 +91 96766 48023</a>
                    <a href="mailto:nominiderangula@gmail.com" className="btn-contact-pill">✉️ Email D. Nomini</a>
                    <a href="https://wa.me/919676648023?text=Hi%20Nomini,%20I%20have%20a%20query%20regarding%20PCOD" target="_blank" rel="noopener noreferrer" className="btn-contact-pill whatsapp-pill">💬 Connect on WhatsApp</a>
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

            {/* GENERAL CONTACT FORM */}
            <div className="contact-form-grid" style={{ gridTemplateColumns: "1fr", maxWidth: "680px", margin: "4rem auto 0" }}>
              <div className="form-panel reveal">
                <h4>Send Us a Direct Message</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginBottom: "1.5rem" }}>Have a non-anonymous query or want to join CBIT NSS initiatives? Send us a direct message below.</p>
                <form id="gen-contact-form" onSubmit={(e) => window.handleGenContactSubmit(e)}>
                  <div className="input-field"><label htmlFor="gname">Your Name</label><input type="text" id="gname" placeholder="Enter your full name" required /></div>
                  <div className="input-field"><label htmlFor="gemail">Email Address</label><input type="email" id="gemail" placeholder="student@cbit.ac.in" required /></div>
                  <div className="input-field"><label htmlFor="gsubject">Topic / Purpose</label><select id="gsubject"><option value="Event Volunteering">Event Volunteering</option><option value="PCOD Drive Support">PCOD Drive Support</option><option value="General Query">General Query</option></select></div>
                  <div className="input-field"><label htmlFor="gmsg">Your Message</label><textarea id="gmsg" rows={4} placeholder="How can our team help you?" required></textarea></div>
                  <button type="submit" className="btn-send-general" id="gen-submit-btn">✉️ Send Message to CBIT NSS</button>
                </form>
                <div id="gen-success-alert" style={{ display: "none", marginTop: "1rem", padding: "1rem", background: "var(--soft-navy-bg)", borderRadius: "var(--r-sm)", color: "var(--soft-navy-text)", fontWeight: 700 }}>✅ Message Sent Successfully! Our team will respond shortly.</div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* FLOATING ACTION BUTTON */}
      <button className="floating-ask-btn" onClick={() => window.dispatchEvent(new Event('openModal'))} aria-label="Ask an anonymous question">🌸 Ask Anonymous</button>

      {/* ANONYMOUS MODAL */}
      <div className="modal-overlay" id="anon-modal" onClick={(e) => window.closeModalOnOverlay(e)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-window">
          <div className="modal-header">
            <h3 id="modal-title">🌸 Ask Anonymous Question to Gynaecologist</h3>
            <button className="modal-close-btn" onClick={() => window.closeModal()} aria-label="Close window">✕</button>
          </div>
          <div className="privacy-notice">🛡️ <strong>100% Confidential:</strong> This window collects ZERO personal info. Your submission cannot be traced to you.</div>
          <form id="modal-anon-form" onSubmit={(e) => window.handleModalAnonSubmit(e)}>
            <div className="form-group">
              <label htmlFor="modal-q-topic">Select Topic Category (Optional)</label>
              <select id="modal-q-topic" name="category">
                <option value="General PCOD Doubts">General PCOD &amp; Symptoms</option>
                <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Issues</option>
                <option value="Diet Medication">Diet &amp; Medication Doubts</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-q-message">Your Anonymous Question for the Gynaecologist *</label>
              <textarea id="modal-q-message" name="message" rows={4} placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed?" required></textarea>
            </div>
            <button type="submit" className="btn-submit-modal" id="modal-submit-btn">🌸 Submit Question Anonymously</button>
          </form>
          <div className="modal-success-alert" id="modal-success">
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✅</div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--soft-navy-text)" }}>Anonymous Question Submitted!</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginTop: "0.4rem", lineHeight: 1.6 }}>Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PCOD Day 2026.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
