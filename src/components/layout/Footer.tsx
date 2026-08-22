'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" style={{ background: '#1E162B', color: '#E6E0F0', padding: '4rem 0 2rem', marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* BRAND COLUMN */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <Image src="/nss-logo.png" alt="CBIT NSS Logo" width={38} height={38} />
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 800 }}>CBIT NSS</h4>
                <p style={{ color: '#A88BF8', fontSize: '0.78rem', fontWeight: 700 }}>World PMOS Awareness Day 2026</p>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#B3A7C7', lineHeight: 1.65 }}>
              Dedicated student awareness microsite empowering young women with medically accurate information on Polyendocrine Metabolic Ovarian Syndrome (PMOS).
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.2rem' }}>
              Explore Awareness
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><Link href="/" style={{ color: '#D4C9E8', transition: 'color 0.2s' }}>🏠 Home &amp; Overview</Link></li>
              <li><Link href="/#understand" style={{ color: '#D4C9E8' }}>🔬 Why The Name Changed to PMOS</Link></li>
              <li><Link href="/symptoms" style={{ color: '#D4C9E8' }}>🩺 Symptoms &amp; Clinical Care</Link></li>
              <li><Link href="/self-test" style={{ color: '#D4C9E8' }}>📝 2-Minute Self-Check Wizard</Link></li>
              <li><Link href="/#myths" style={{ color: '#D4C9E8' }}>💡 Myths vs Facts</Link></li>
              <li><Link href="/#ask" style={{ color: '#D4C9E8' }}>🌸 Ask Doctor Anonymously</Link></li>
              <li><Link href="/about" style={{ color: '#D4C9E8' }}>🤝 CBIT NSS Executive Team</Link></li>
            </ul>
          </div>

          {/* MEDICAL DISCLAIMER & ANONYMITY */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.2rem' }}>
              Medical Disclaimer
            </h5>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', fontSize: '0.82rem', color: '#B3A7C7', lineHeight: 1.6 }}>
              🛡️ <strong>Educational Awareness Only:</strong> This microsite is designed strictly for campus health education. It is not a substitute for professional medical diagnosis, treatment, or individualized clinical advice. Always consult a qualified healthcare provider for medical concerns.
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.8rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.82rem', color: '#8C7B75' }}>
          <div>
            © 2026 CBIT NSS (National Service Scheme). World PMOS Awareness Campaign.
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', color: '#B3A7C7' }}>
            <Link href="/#resources" style={{ color: 'inherit' }}>Sources &amp; References</Link>
            <span>•</span>
            <Link href="/#ask" style={{ color: 'inherit' }}>Anonymous Q&amp;A Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
