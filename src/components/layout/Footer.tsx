'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-brand-row">
            <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={28} height={28} className="footer-logo" />
            <div>
              <p className="footer-brand-name" style={{ margin: 0, lineHeight: 1.1 }}>CBIT NSS</p>
              <p className="footer-brand-sub" style={{ margin: 0, marginTop: '2px', lineHeight: 1.15 }}>World PMOS Awareness Day 2026</p>
            </div>
          </div>
          <p className="footer-brand-desc">
            Student awareness campaign empowering young women with medically accurate information on Polyendocrine Metabolic Ovarian Syndrome (PMOS).
          </p>
        </div>

        {/* Links column */}
        <div className="footer-links-col">
          <p className="footer-col-heading">Explore Pages</p>
          <ul className="footer-nav-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/understand">Understand PMOS</Link></li>
            <li><Link href="/symptoms">Symptoms &amp; Care</Link></li>
            <li><Link href="/self-test">Self-Check Wizard</Link></li>
            <li><Link href="/myths">Myths vs Facts</Link></li>
            <li><Link href="/ask">Ask a Doctor</Link></li>
            <li><Link href="/resources">Campus Kit</Link></li>
            <li><Link href="/about">About Us &amp; NSS Team</Link></li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p className="footer-col-heading">Medical Disclaimer</p>
          <p className="footer-disclaimer-text">
            <strong>Educational Awareness Only:</strong> This microsite is designed strictly for campus health education. It is not a substitute for professional medical diagnosis, treatment, or individualized clinical advice. Always consult a qualified healthcare provider.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bar">
        <span>© 2026 CBIT NSS. World PMOS Awareness Campaign.</span>
        <div className="footer-bar-links">
          <Link href="/resources">Sources</Link>
          <span>·</span>
          <Link href="/ask">Anonymous Q&amp;A Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
