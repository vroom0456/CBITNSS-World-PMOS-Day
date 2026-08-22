'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>CBIT NSS — World PCOD Day 2026</h4>
            <p>Organised by CBIT NSS Unit. Empowering women through awareness, care, and community.</p>
          </div>
          <div className="footer-links">
            <h5>Navigation</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/symptoms">Symptoms &amp; Care</Link></li>
              <li><Link href="/self-test">Self Test Quiz</Link></li>
              <li><Link href="/about">About &amp; Team</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>Support</h5>
            <ul>
              <li>
                <button onClick={() => window.dispatchEvent(new Event('openModal'))} style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', cursor: 'pointer', textDecoration: 'none' }}>
                  Ask Anonymous Question
                </button>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h5>Helplines</h5>
            <ul>
              <li><a href="tel:1091">Women&apos;s Help: 1091</a></li>
              <li><a href="tel:9152987821">iCall: 9152987821</a></li>
              <li><a href="tel:18602662345">Vandrevala: 1860-266-2345</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bar">
          <div>© 2026 CBIT NSS. All Rights Reserved.</div>
          <div>World PCOD Awareness Day 2026 🌸</div>
        </div>
      </div>
    </footer>
  );
}
