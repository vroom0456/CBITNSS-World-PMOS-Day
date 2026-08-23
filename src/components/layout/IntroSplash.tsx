'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start smooth fade out at 1.1s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1100);

    // Unmount completely at 1.7s
    const doneTimer = setTimeout(() => {
      setVisible(false);
    }, 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-clean-splash ${fading ? 'fade-out' : ''}`} aria-hidden="true">
      <div className="intro-clean-box">
        <Image
          src="/nss-logo.png"
          alt="CBIT NSS Logo"
          width={80}
          height={80}
          className="intro-clean-logo"
          priority
        />
        <div className="intro-clean-text">
          <h2 className="intro-clean-title">CBIT NSS</h2>
          <p className="intro-clean-sub">World PMOS Day 2026</p>
        </div>
      </div>
    </div>
  );
}
