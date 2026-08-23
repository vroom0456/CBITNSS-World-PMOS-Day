'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user has already seen intro in this tab session
    const hasSeenIntro = typeof window !== 'undefined' && sessionStorage.getItem('cbit_nss_intro_seen');
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forceReplay = params?.get('replayIntro') === 'true';

    if (hasSeenIntro && !forceReplay) {
      // User has seen intro: do not show again for fast page navigation
      setVisible(false);
      return;
    }

    // First time in session: show intro
    setVisible(true);

    // Start smooth fade out at 1.1s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1100);

    // Unmount completely at 1.7s and save session marker
    const doneTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('cbit_nss_intro_seen', 'true');
      } catch (e) {
        console.warn('SessionStorage unavailable:', e);
      }
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
