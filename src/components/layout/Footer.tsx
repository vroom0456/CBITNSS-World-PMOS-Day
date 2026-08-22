'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" style={{ background: '#1E162B', color: '#E6E0F0', padding: '3rem 0 2rem', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          
          {/* BRAND COLUMN */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={34} height={34} />
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 800 }}>CBIT NSS</h4>
                <p style={{ color: '#A88BF8', fontSize: '0.75rem', fontWeight: 700 }}>World PMOS Awareness Day 2026</p>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#B3A7C7', lineHeight: 1.6 }}>
              Dedicated student awareness microsite empowering young women with medically accurate information on Polyendocrine Metabolic Ovarian Syndrome (PMOS).
            </p>
          </div>

          {/* QUICK LINKS (Clean text, no emojis) */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Explore Awareness
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li><Link href="/" style={{ color: '#D4C9E8' }}>Home Overview</Link></li>
              <li><Link href="/understand" style={{ color: '#D4C9E8' }}>Understand PMOS &amp; 4 Pillars</Link></li>
              <li><Link href="/symptoms" style={{ color: '#D4C9E8' }}>Symptoms &amp; Clinical Care</Link></li>
              <li><Link href="/self-test" style={{ color: '#D4C9E8' }}>2-Minute Self-Check Wizard</Link></li>
              <li><Link href="/myths" style={{ color: '#D4C9E8' }}>Myths vs Facts</Link></li>
              <li><Link href="/ask" style={{ color: '#D4C9E8' }}>Ask Doctor Anonymously</Link></li>
              <li><Link href="/resources" style={{ color: '#D4C9E8' }}>Research &amp; Campus Kit</Link></li>
              <li><Link href="/about" style={{ color: '#D4C9E8' }}>CBIT NSS Executive Team</Link></li>
            </ul>
          </div>

          {/* MEDICAL DISCLAIMER & ANONYMITY (Clean text) */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Medical Disclaimer
            </h5>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.9rem 1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#B3A7C7', lineHeight: 1.55 }}>
              <strong>Educational Awareness Only:</strong> This microsite is designed strictly for campus health education. It is not a substitute for professional medical diagnosis, treatment, or individualized clinical advice. Always consult a qualified healthcare provider for medical concerns.
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.4rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', fontSize: '0.78rem', color: '#8C7B75' }}>
          <div>
            © 2026 CBIT NSS (National Service Scheme). World PMOS Awareness Campaign.
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: '#B3A7C7' }}>
            <Link href="/resources" style={{ color: 'inherit' }}>Sources &amp; References</Link>
            <span>•</span>
            <Link href="/ask" style={{ color: 'inherit' }}>Anonymous Q&amp;A Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
