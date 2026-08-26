import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

// 🩸 Irregular Periods / Cycle Drop Icon
export function IconBloodDrop({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

// ✨ Hormonal Acne / Sparkle Icon
export function IconSparkle({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-4.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m13 0l-2.1-2.1M6.6 6.6L4.5 4.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// 💇 Hair Changes Icon
export function IconHairThinning({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M6 3v12a6 6 0 0 0 12 0V3" />
      <path d="M12 3v18" />
    </svg>
  );
}

// ⚖️ Balance / Metabolic Scale Icon
export function IconScaleBalance({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 3v18M3 7h18M6 7l-3 7h6l-3-7zm12 0l-3 7h6l-3-7zM8 21h8" />
    </svg>
  );
}

// 😴 Sleep / Fatigue Moon Icon
export function IconSleepFatigue({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// 🌙 Pigmentation / Wellbeing Moon Star Icon
export function IconPigmentationMoon({ size = 24, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 3a9 9 0 0 0 9 9 9 9 0 1 1-9-9z" />
      <path d="M19 3v4m-2-2h4" />
    </svg>
  );
}

// 📞 Phone Icon
export function IconPhone({ size = 18, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ✉️ Email Icon
export function IconMail({ size = 18, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

// 💬 Chat / WhatsApp / Message Icon
export function IconMessage({ size = 18, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// ✅ Check Circle Success Icon
export function IconCheckCircle({ size = 48, color = 'currentColor', className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
