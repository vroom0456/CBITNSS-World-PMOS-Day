'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  const openModal = () => {
    setModalOpen(true);
    setModalSubmitted(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Listen for openModal event dispatched from any page/button
  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener('openModal', handler);
    return () => window.removeEventListener('openModal', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    setTimeout(() => {
      setModalSubmitting(false);
      setModalSubmitted(true);
      setTimeout(() => {
        closeModal();
        setModalSubmitted(false);
        (e.target as HTMLFormElement).reset?.();
      }, 2500);
    }, 900);
  };

  return (
    <>
      {/* ── MAIN NAV BAR ── */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main Navigation">
        <Link href="/" className="nav-brand">
          <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={30} height={30} className="nss-logo-img" priority />
          <div className="brand-text">
            <span className="title">CBIT NSS</span>
            <span className="subtitle">World PMOS Awareness Day · 2026</span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="nav-links" role="list">
          <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link href="/understand" className={pathname === '/understand' ? 'active' : ''}>Understand</Link></li>
          <li><Link href="/symptoms" className={pathname === '/symptoms' ? 'active' : ''}>Symptoms</Link></li>
          <li><Link href="/self-test" className={pathname === '/self-test' ? 'active' : ''}>Self-Check</Link></li>
          <li><Link href="/myths" className={pathname === '/myths' ? 'active' : ''}>Myths</Link></li>
          <li><Link href="/ask" className={pathname === '/ask' ? 'active' : ''}>Ask</Link></li>
          <li><Link href="/resources" className={pathname === '/resources' ? 'active' : ''}>Resources</Link></li>
          <li><Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li>
            <button className="nav-btn-modal" onClick={openModal}>
              Ask Anonymous
            </button>
          </li>
        </ul>
      </nav>

      {/* ── MOBILE SLIDE-DOWN DRAWER ── */}
      <div
        className={`mobile-nav-drawer ${drawerOpen ? 'active' : ''}`}
        id="mobile-drawer"
        aria-hidden={!drawerOpen}
      >
        <Link href="/" className="m-link" onClick={closeDrawer}>Home</Link>
        <Link href="/understand" className="m-link" onClick={closeDrawer}>Understand PMOS</Link>
        <Link href="/symptoms" className="m-link" onClick={closeDrawer}>Symptoms &amp; Care</Link>
        <Link href="/self-test" className="m-link" onClick={closeDrawer}>2-Min Self-Check</Link>
        <Link href="/myths" className="m-link" onClick={closeDrawer}>Myths vs Facts</Link>
        <Link href="/ask" className="m-link" onClick={closeDrawer}>Ask Doctor</Link>
        <Link href="/resources" className="m-link" onClick={closeDrawer}>Research &amp; Resources</Link>
        <Link href="/about" className="m-link" onClick={closeDrawer}>NSS Team</Link>
        <button
          className="drawer-ask-btn"
          onClick={() => { closeDrawer(); openModal(); }}
        >
          Ask a Doctor Anonymously
        </button>
      </div>

      {/* ── MOBILE BOTTOM NAV — 5 direct tabs ── */}
      <div className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          <span className="bnav-icon">⌂</span>
          <span>Home</span>
        </Link>
        <Link href="/understand" className={pathname === '/understand' ? 'active' : ''}>
          <span className="bnav-icon">📖</span>
          <span>Learn</span>
        </Link>
        <Link href="/self-test" className={pathname === '/self-test' ? 'active' : ''}>
          <span className="bnav-icon">✓</span>
          <span>Check</span>
        </Link>
        <Link href="/myths" className={pathname === '/myths' ? 'active' : ''}>
          <span className="bnav-icon">💡</span>
          <span>Myths</span>
        </Link>
        <Link href="/ask" className={pathname === '/ask' ? 'active' : ''}>
          <span className="bnav-icon">💬</span>
          <span>Ask</span>
        </Link>
      </div>

      {/* ── GLOBAL ANONYMOUS MODAL — renders on ALL pages ── */}
      <div
        className={`modal-overlay${modalOpen ? ' active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-modal-title"
        style={{ display: modalOpen ? 'flex' : 'none' }}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="modal-window" onClick={e => e.stopPropagation()}>
          <button
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Close"
          >✕</button>

          {!modalSubmitted ? (
            <>
              <span className="modal-badge">🔒 100% Student Confidentiality</span>
              <h3 id="global-modal-title">Ask a Doctor Anonymously</h3>
              <p className="desc">
                Do <strong>NOT</strong> include your name, email, phone, or student ID. All questions are compiled by CBIT NSS and answered live by certified medical professionals.
              </p>
              <div className="privacy-notice">
                🛡️ <strong>Educational Notice:</strong> Responses provide general awareness only and do not constitute personal medical diagnosis or emergency care.
              </div>
              <form onSubmit={handleModalSubmit} id="global-anon-form">
                <div className="form-group">
                  <label htmlFor="modal-category">Select Category (Optional)</label>
                  <select id="modal-category" name="category">
                    <option value="General PMOS Doubts">General PMOS &amp; Symptoms</option>
                    <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                    <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Shifts</option>
                    <option value="Emotional Wellbeing">Emotional Wellbeing &amp; Stress</option>
                    <option value="Diet Lifestyle">Diet &amp; Lifestyle Doubts</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="modal-message">Your Question for the Doctor *</label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={4}
                    placeholder="Type your doubt freely here... e.g. Is it normal to miss periods for 2 months when stressed?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-submit-modal"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting ? '⏳ Submitting...' : '🌸 Submit Question Anonymously'}
                </button>
              </form>
            </>
          ) : (
            <div className="modal-success-alert" style={{ display: 'block' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>✅</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Anonymous Question Submitted!</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                Thank you! Your doubt has been recorded. Our CBIT NSS team will ask the Gynaecologist live during World PMOS Day 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
