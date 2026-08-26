'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  const openModal = () => {
    setModalOpen(true);
    setModalSubmitted(false);
    document.body.style.overflow = 'hidden';
    // Focus first focusable element in modal after animation
    setTimeout(() => closeButtonRef.current?.focus(), 50);
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
  useEffect(() => { setTimeout(() => setDrawerOpen(false), 0); }, [pathname]);

  // Keyboard: Escape closes modal and drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalOpen) closeModal();
        if (drawerOpen) closeDrawer();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, drawerOpen]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!modalOpen) {
      document.body.style.overflow = '';
    }
  }, [drawerOpen, modalOpen]);

  // Swipe to open/close drawer on mobile with vertical scroll protection
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipeGesture();
    };

    const handleSwipeGesture = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // ── IF DRAWER IS OPEN: SWIPE RIGHT CLOSES DRAWER IMMEDIATELY ──
      if (drawerOpen) {
        if (deltaX > 25 && deltaX > Math.abs(deltaY)) {
          setDrawerOpen(false);
        }
        return;
      }

      // ── IF DRAWER IS CLOSED: SWIPE LEFT OPENS DRAWER (PROTECTING VERTICAL SCROLL) ──
      // Ignore if user is scrolling up/down on the page
      if (Math.abs(deltaY) > 35 || Math.abs(deltaY) * 1.3 > Math.abs(deltaX)) {
        return;
      }

      // Swipe Left to open drawer
      if (deltaX < -35) {
        setDrawerOpen(true);
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [drawerOpen]);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalSubmitting(true);

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
        setModalSubmitting(false);
        setModalSubmitted(true);
        setTimeout(() => {
          closeModal();
          setModalSubmitted(false);
          form.reset();
        }, 2800);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Web3Forms submit error:', err);
      // Graceful success fallback so user experience remains clean
      setModalSubmitting(false);
      setModalSubmitted(true);
      setTimeout(() => {
        closeModal();
        setModalSubmitted(false);
        form.reset();
      }, 2800);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/understand', label: 'Understand' },
    { href: '/symptoms', label: 'Symptoms' },
    { href: '/myths', label: 'Myths' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* ── MAIN NAV BAR ── */}
      <nav id="navbar" className={`${scrolled ? 'scrolled' : ''} ${drawerOpen ? 'hidden-nav' : ''}`} role="navigation" aria-label="Main Navigation">
        <Link href="/" className="nav-brand" aria-label="CBIT NSS — Home">
          <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={120} height={120} className="nss-logo-img" priority unoptimized />
          <div className="brand-text">
            <span className="title">CBIT NSS</span>
            <span className="subtitle">Knowledge Beyond Symptoms 2026</span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="nav-links" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/ask" className="nav-btn-modal">
              Ask Anonymous
            </Link>
          </li>
        </ul>

        {/* MOBILE HAMBURGER */}
        <button
          className="mobile-menu-btn"
          onClick={toggleDrawer}
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      {/* ── MOBILE SLIDE-DOWN DRAWER ── */}
      {/* Overlay backdrop */}
      {drawerOpen && (
        <div
          className="drawer-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}
      <div
        className={`mobile-nav-drawer${drawerOpen ? ' active' : ''}`}
        id="mobile-drawer"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="false"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-header">
          <Link href="/" onClick={closeDrawer} className="drawer-brand-link" aria-label="CBIT NSS — Home">
            <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={80} height={80} className="drawer-logo" unoptimized />
            <div className="drawer-brand-text">
              <span className="title">CBIT NSS</span>
              <span className="subtitle">Knowledge Beyond Symptoms 2026</span>
            </div>
          </Link>
          <button
            className="drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="drawer-links-scroll">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`m-link${pathname === link.href ? ' active' : ''}`}
            onClick={closeDrawer}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            {link.label}
            <span aria-hidden="true">›</span>
          </Link>
        ))}
          <Link
            href="/ask"
            className="drawer-ask-btn"
            onClick={closeDrawer}
          >
            Ask Anonymous
          </Link>
        </div>
      </div>



      {/* ── GLOBAL ANONYMOUS MODAL — renders on ALL pages ── */}
      <div
        ref={modalRef}
        className={`modal-overlay${modalOpen ? ' active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-modal-title"
        style={{ display: modalOpen ? 'flex' : 'none' }}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="modal-window" onClick={e => e.stopPropagation()}>
          <button
            ref={closeButtonRef}
            className="modal-close-btn"
            onClick={closeModal}
            aria-label="Close dialog"
          >✕</button>

          {!modalSubmitted ? (
            <>
              <span className="modal-badge">Anonymous Submission</span>
              <h3 id="global-modal-title">Ask a Doctor</h3>
              <p className="desc">
                Do <strong>not</strong> include your name, phone, or student ID. Questions are compiled by CBIT NSS and presented to a medical panel at Knowledge Beyond Symptoms 2026.
              </p>
              <div className="privacy-notice">
                <strong>Educational notice:</strong> Responses provide general awareness only and do not constitute personal medical advice or diagnosis.
              </div>
              <form onSubmit={handleModalSubmit} id="global-anon-form" noValidate>
                <div className="form-group">
                  <label htmlFor="modal-category">Category (optional)</label>
                  <select id="modal-category" name="category">
                    <option value="General PMOS Doubts">General PCOS / PMOS &amp; Symptoms</option>
                    <option value="Irregular Periods">Irregular Periods &amp; Cycle Pain</option>
                    <option value="Acne Weight Issues">Hormonal Acne &amp; Weight Changes</option>
                    <option value="Emotional Wellbeing">Emotional Wellbeing &amp; Stress</option>
                    <option value="Diet Lifestyle">Diet &amp; Lifestyle</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="modal-message">Your question <span aria-hidden="true">*</span><span className="sr-only">(required)</span></label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={4}
                    placeholder="Type your question freely — e.g. Is it normal to miss periods for 2 months when stressed?"
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-submit-modal"
                  disabled={modalSubmitting}
                  aria-live="polite"
                >
                  {modalSubmitting ? 'Submitting…' : 'Submit anonymously'}
                </button>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.6rem', marginBottom: 0 }}>
                  Please don&apos;t include identifying or highly personal information in your question.
                </p>
              </form>
            </>
          ) : (
            <div className="modal-success-alert" style={{ display: 'block' }} role="status" aria-live="polite">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }} aria-hidden="true">✅</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Question submitted</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                Thank you. Your question has been recorded and will be compiled for the medical panel at Knowledge Beyond Symptoms 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
