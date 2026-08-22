'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav id="navbar" role="navigation" aria-label="Main Navigation">
        <Link href="/" className="nav-brand" onClick={closeDrawer}>
          <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={34} height={34} className="nss-logo-img" />
          <div className="brand-text">
            <span className="title">CBIT NSS</span>
            <span className="subtitle">World PCOD & PMOS Day · 2026</span>
          </div>
        </Link>
        <ul className="nav-links" role="list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/symptoms">Symptoms &amp; Care</Link></li>
          <li><Link href="/self-test">Self Test</Link></li>
          <li><Link href="/about">About &amp; Team</Link></li>
          <li>
            <button className="nav-btn-modal" onClick={() => window.dispatchEvent(new Event('openModal'))}>
              🌸 Ask Anonymous
            </button>
          </li>
        </ul>
        <button 
          className={`mobile-menu-btn ${drawerOpen ? 'active' : ''}`} 
          id="mobile-btn" 
          aria-label="Toggle menu"
          onClick={toggleDrawer}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${drawerOpen ? 'active' : ''}`} id="mobile-drawer">
        <Link href="/" className="m-link" onClick={closeDrawer}>Home</Link>
        <Link href="/symptoms" className="m-link" onClick={closeDrawer}>Symptoms &amp; Care</Link>
        <Link href="/self-test" className="m-link" onClick={closeDrawer}>Self Test Quiz</Link>
        <Link href="/about" className="m-link" onClick={closeDrawer}>About &amp; NSS Team</Link>
        <button 
          className="nav-btn-modal" 
          onClick={() => { closeDrawer(); window.dispatchEvent(new Event('openModal')); }} 
          style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
        >
          🌸 Ask Anonymous Question
        </button>
      </div>
    </>
  );
}
