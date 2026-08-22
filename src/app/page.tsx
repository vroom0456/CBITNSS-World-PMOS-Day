'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

declare global {
  interface Window {
    closeModal: () => void;
    closeModalOnOverlay: (e: React.SyntheticEvent) => void;
    handleModalAnonSubmit: (e: React.SyntheticEvent) => void;
  }
}

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(r => observer.observe(r));

    let statsTriggered = false;
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statsTriggered) {
        statsTriggered = true;
        document.querySelectorAll('.num-val').forEach(counter => {
          const target = +(counter.getAttribute('data-target') || 0);
          const duration = 1800;
          const start = performance.now();
          function animate(now: number) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            counter.textContent = Math.floor(eased * target).toString();
            if (p < 1) requestAnimationFrame(animate);
            else { counter.textContent = target.toString(); counter.setAttribute('style', 'animation: counter-pop 0.4s ease'); }
          }
          requestAnimationFrame(animate);
        });
      }
    }, {threshold: 0.3});
    const sb = document.getElementById('stats-banner');
    if (sb) statsObs.observe(sb);

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
    window.closeModalOnOverlay = function(e) { if (e.target === anonModal) window.closeModal(); };
    if(anonModal) anonModal.style.display = 'none';

    window.handleModalAnonSubmit = async function(e) {
      e.preventDefault();
      const topicEl = document.getElementById('modal-q-topic') as HTMLSelectElement;
      const messageEl = document.getElementById('modal-q-message') as HTMLTextAreaElement;
      const btn = document.getElementById('modal-submit-btn') as HTMLButtonElement;
      const form = document.getElementById('modal-anon-form') as HTMLFormElement;
      const successBox = document.getElementById('modal-success');

      if (!messageEl || !messageEl.value.trim()) return;
      if (btn) { btn.textContent = '⏳ Submitting...'; btn.disabled = true; }

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: '9530c568-fc97-4250-8b78-3dde99ec83b2',
            subject: `[PCOD Q&A] ${topicEl?.value || 'General'}`,
            from_name: 'CBIT Student (Anonymous)',
            'Topic': topicEl?.value,
            'Question': messageEl.value,
            'Submitted': new Date().toLocaleString('en-IN', {timeZone:'Asia/Kolkata'})
          })
        });
        const data = await res.json();
        if (data.success) {
          if (form) form.style.display = 'none';
          if (successBox) successBox.classList.add('active');
          setTimeout(() => {
            window.closeModal();
            setTimeout(() => {
              if (form) { form.style.display = 'block'; form.reset(); }
              if (successBox) successBox.classList.remove('active');
              if (btn) { btn.textContent = '🌸 Submit Question Anonymously'; btn.disabled = false; }
            }, 450);
          }, 3000);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch {
        if (btn) {
          btn.textContent = '⚠️ Please try again';
          setTimeout(() => {
            btn.textContent = '🌸 Submit Question Anonymously';
            btn.disabled = false;
          }, 3000);
        }
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
      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <span className="hero-sparkle">🌸</span>
          <span className="hero-sparkle">💜</span>
          <span className="hero-sparkle">✨</span>
          <span className="hero-sparkle">🌷</span>
          <div className="hero-container">
            <div className="nss-hero-badge"><Image src="/nss-logo.png" alt="CBIT NSS Logo" width={22} height={22} />CBIT NSS Awareness Campaign 2026</div>
            <span className="hero-date">📅 September 1, 2026 · World PCOD &amp; PMOS Day</span>
            <h1>Understanding <span className="accent-text">PCOD &amp; PMOS</span> 🌸</h1>
            <p className="hero-desc">Polycystic Ovarian Disease &amp; PMOS affect 1 in 5 young women. CBIT NSS brings you a clear, easy-to-understand guide and a 100% anonymous Q&amp;A window for your personal health doubts. 💕</p>
            <div className="hero-buttons">
              <button className="btn-hero-modal" onClick={() => window.dispatchEvent(new Event('openModal'))}>🌸 Ask Anonymous Question to Gynaecologist</button>
              <Link href="/symptoms" className="btn-hero-guide">📖 View Symptoms &amp; Care</Link>
            </div>
          </div>
        </section>

        {/* 24/7 TOLLFREE HELPLINES DIRECTLY BELOW HERO */}
        <section id="resources" className="helplines-section reveal" style={{ padding: "2.5rem 0" }}>
          <div className="container">
            <div className="helpline-header">
              <span className="helpline-badge">🆘 24/7 Support</span>
              <h3>Women&apos;s Helplines &amp; Emergency Contacts</h3>
            </div>
            <div className="helpline-pills">
              <div className="h-pill">
                <span className="h-name">Women&apos;s Helpline</span>
                <a href="tel:1091" className="h-num">1091</a>
                <span className="h-desc">Toll-Free 24/7</span>
              </div>
              <div className="h-pill">
                <span className="h-name">iCall Counseling</span>
                <a href="tel:9152987821" className="h-num">9152987821</a>
                <span className="h-desc">Psychosocial Support</span>
              </div>
              <div className="h-pill">
                <span className="h-name">Vandrevala Foundation</span>
                <a href="tel:18602662345" className="h-num">1860-266-2345</a>
                <span className="h-desc">Mental Health Care</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BANNER */}
        <div id="stats-banner" className="reveal">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-box reveal">
                <div className="stat-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#567C8D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 7.5v5"/><path d="M7.5 13l4.5-2 4.5 2"/><path d="M4.5 19.5c2-2 4.5-3 7.5-3s5.5 1 7.5 3"/><path d="M3.5 16.5c1.5-1.5 4.5-2 8.5-2s7 .5 8.5 2"/></svg>
                </div>
                <div><span className="num-val" data-target="20">0</span><span className="num-unit">%</span><div className="stat-lbl">Indian Women Affected</div></div>
              </div>
              <div className="stat-box reveal">
                <div className="stat-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#567C8D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div><span className="num-val" data-target="70">0</span><span className="num-unit">%</span><div className="stat-lbl">Remain Undiagnosed</div></div>
              </div>
              <div className="stat-box reveal">
                <div className="stat-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#567C8D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div><span className="num-val" data-target="100">0</span><span className="num-unit">%</span><div className="stat-lbl">Manageable via Lifestyle</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT PCOD SECTION */}
        <section id="about" style={{ padding: "3rem 0 4rem" }}>
          <div className="container">
            <div className="heading-box reveal"><span className="section-tag">🌸 Understanding Health</span><h2 className="section-title">What Happens in <span className="accent">PCOD / PMOS?</span></h2><p className="section-desc">PCOD and PMOS affect systemic endocrine and ovarian health. Here everything is explained in clean, simple terms.</p></div>
            
            <div className="reveal" style={{ background: "var(--soft-pink-bg)", border: "1.5px solid var(--soft-pink-border)", padding: "1.3rem 1.8rem", borderRadius: "var(--r-md)", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "1.2rem", textAlign: "left" }}>
              <div style={{ width: 44, height: 44, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(15,56,84,0.08)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F4858" strokeWidth="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7v10"/><path d="M9 12h6"/></svg>
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--nss-navy)", lineHeight: 1.65 }}>
                <strong>Medical Nomenclature Consensus (PMOS):</strong> Medical authorities now designate PCOS/PCOD as <strong>PMOS (Polyendocrine Metabolic Ovarian Syndrome)</strong> to accurately highlight that the condition impacts whole-body endocrine &amp; metabolic health beyond ovaries.
              </div>
            </div>

            <div className="about-grid">
              <div className="about-box reveal-left">
                <h4>Medical Overview</h4>
                <p>PCOD (Polycystic Ovarian Disease) occurs when immature or partially mature eggs build up inside ovaries due to hormonal imbalance (higher level of androgens/male hormones). Over time, these form small harmless fluid-filled sacs called cysts.</p>
                <p style={{ marginTop: "1rem" }}>With early awareness, dietary tweaks, and stress management, 90%+ of PCOD cases can be reversed naturally without heavy medication!</p>
              </div>
              <div className="about-box reveal-right">
                <h4>PCOD vs PMOS / PCOS Difference</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.7)", padding: "1rem 1.2rem", borderRadius: "var(--r-sm)", borderLeft: "4px solid var(--soft-teal-accent)" }}>
                    <strong style={{ color: "var(--nss-navy)" }}>PCOD:</strong> Common (1 in 5 women). Ovaries release partially mature eggs causing irregular periods. Easily manageable with diet &amp; daily walk.
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.7)", padding: "1rem 1.2rem", borderRadius: "var(--r-sm)", borderLeft: "4px solid var(--nss-navy)" }}>
                    <strong style={{ color: "var(--nss-navy)" }}>PMOS / PCOS:</strong> Severe metabolic condition where ovaries stop ovulation entirely. Requires clinical guidance and structured medical supervision.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MYTHS VS FACTS SECTION */}
        <section id="myths" style={{ padding: "3rem 0 4rem", background: "#fff" }}>
          <div className="container">
            <div className="heading-box reveal"><span className="section-tag">💡 Science Check</span><h2 className="section-title">PCOD <span className="accent">Myths vs Facts</span></h2><p className="section-desc">Let&apos;s clear common misunderstandings with medical facts.</p></div>
            <div className="myths-grid stagger-grid">
              <div className="myth-card reveal"><div className="myth-top"><span className="tag-myth">❌ Myth</span><p>&quot;Women with PCOD can never get pregnant.&quot;</p></div><div className="fact-bottom"><span className="tag-fact">✅ Fact</span><p>Most women with PCOD conceive naturally or with simple lifestyle changes &amp; medical guidance.</p></div></div>
              <div className="myth-card reveal"><div className="myth-top"><span className="tag-myth">❌ Myth</span><p>&quot;PCOD only affects overweight women.&quot;</p></div><div className="fact-bottom"><span className="tag-fact">✅ Fact</span><p>PCOD occurs in women of all body types, including lean PCOD driven by stress or genetics.</p></div></div>
              <div className="myth-card reveal"><div className="myth-top"><span className="tag-myth">❌ Myth</span><p>&quot;PCOD completely disappears after marriage.&quot;</p></div><div className="fact-bottom"><span className="tag-fact">✅ Fact</span><p>PCOD requires consistent healthy lifestyle management regardless of marital status.</p></div></div>
              <div className="myth-card reveal"><div className="myth-top"><span className="tag-myth">❌ Myth</span><p>&quot;The pill is the only treatment available.&quot;</p></div><div className="fact-bottom"><span className="tag-fact">✅ Fact</span><p>Diet, daily exercise, and stress management are the primary first-line treatments for PCOD root cause.</p></div></div>
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
            <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--nss-teal-dark)" }}>Anonymous Question Submitted!</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", marginTop: "0.4rem", lineHeight: 1.6 }}>Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PCOD Day 2026.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
