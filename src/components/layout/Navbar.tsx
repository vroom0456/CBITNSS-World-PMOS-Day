'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main Navigation">
        <Link href="/" className="nav-brand" onClick={closeDrawer}>
          <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={34} height={34} className="nss-logo-img" priority />
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
            <button className="nav-btn-modal" onClick={() => window.dispatchEvent(new Event('openModal'))}>
              🌸 Ask Anonymous
            </button>
          </li>
        </ul>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className={`mobile-menu-btn ${drawerOpen ? 'active' : ''}`} 
          id="mobile-btn" 
          aria-label="Toggle drawer menu"
          onClick={toggleDrawer}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mobile-nav-drawer ${drawerOpen ? 'active' : ''}`} id="mobile-drawer">
        <Link href="/" className="m-link" onClick={closeDrawer}>🏠 Home</Link>
        <Link href="/understand" className="m-link" onClick={closeDrawer}>🔬 Understand PMOS</Link>
        <Link href="/symptoms" className="m-link" onClick={closeDrawer}>🩺 Symptoms &amp; Care</Link>
        <Link href="/self-test" className="m-link" onClick={closeDrawer}>📝 2-Min Self-Check</Link>
        <Link href="/myths" className="m-link" onClick={closeDrawer}>💡 Myths vs Facts</Link>
        <Link href="/ask" className="m-link" onClick={closeDrawer}>🌸 Ask Doctor Anonymously</Link>
        <Link href="/resources" className="m-link" onClick={closeDrawer}>📚 Research &amp; Resources</Link>
        <Link href="/about" className="m-link" onClick={closeDrawer}>🤝 NSS Core Team</Link>
        <button 
          className="nav-btn-modal" 
          onClick={() => { closeDrawer(); window.dispatchEvent(new Event('openModal')); }} 
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
        >
          🌸 Ask Anonymous Question
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/understand" className={pathname === '/understand' ? 'active' : ''}>
          <span className="nav-icon">💡</span>
          <span>Learn</span>
        </Link>
        <Link href="/self-test" className={pathname === '/self-test' ? 'active' : ''}>
          <span className="nav-icon">📝</span>
          <span>Check</span>
        </Link>
        <Link href="/ask" className={pathname === '/ask' ? 'active' : ''}>
          <span className="nav-icon">🌸</span>
          <span>Ask</span>
        </Link>
        <button onClick={toggleDrawer}>
          <span className="nav-icon">☰</span>
          <span>Menu</span>
        </button>
      </div>
    </>
  );
}
