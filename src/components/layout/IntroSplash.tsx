'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if this is a browser page reload/refresh or direct initial page visit
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
    const hasSeenInSession = sessionStorage.getItem('cbit_nss_intro_seen');
    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get('replayIntro') === 'true';

    // Play intro if page was reloaded/refreshed, forced, or if it's the first visit of the session
    const shouldPlay = isReload || !hasSeenInSession || forceReplay;

    if (!shouldPlay) {
      // Skip intro on internal client page switching
      setTimeout(() => setVisible(false), 0);
      return;
    }

    // Play intro animation
    setTimeout(() => setVisible(true), 0);

    // Start silky smooth fade out at 1.3s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1300);

    // Unmount after 1.1s fade out completes (at 2.4s total)
    const doneTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('cbit_nss_intro_seen', 'true');
      } catch (e) {
        console.warn('SessionStorage unavailable:', e);
      }
    }, 2400);

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
          width={88}
          height={88}
          className="intro-clean-logo"
          priority
          unoptimized
        />
        <div className="intro-clean-text">
          <h2 className="intro-clean-title">CBIT NSS</h2>
          <p className="intro-clean-sub">Knowledge Beyond Symptoms 2026</p>
        </div>
      </div>
    </div>
  );
}
