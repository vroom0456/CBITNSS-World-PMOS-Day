# World PMOS Day 2026 - Awareness Campaign

![World PMOS Day 2026](https://img.shields.io/badge/Campaign-CBIT_NSS_2026--2027-2C3E50?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Mobile First](https://img.shields.io/badge/Mobile_First-Optimized-success?style=for-the-badge)

A premium, highly-responsive web platform built for the **CBIT NSS Core Committee 2026–2027** to raise awareness about Polycystic Metabolic Ovary Syndrome (PMOS) — a modernized and scientifically accurate terminology for what was formerly known as PCOS.

---

## 🎯 Campaign Mission & The Paradigm Shift

### Why PMOS? (PCOS → PMOS)
The historical term "Polycystic Ovary Syndrome" focuses solely on the reproductive aspect, leading to immense stigma and diagnostic confusion (many individuals with the condition do not even have ovarian cysts). This campaign champions the term **PMOS (Polycystic Metabolic Ovary Syndrome)** to reflect the latest international endocrine consensus: PMOS is a lifelong, multi-systemic metabolic and endocrine condition that impacts insulin sensitivity, cardiovascular health, and emotional wellbeing.

### Mission Statement
To destigmatize PMOS, provide evidence-based medical information, and offer confidential support resources to students on the CBIT campus and beyond. The platform serves as a central hub for health literacy, empowerment, and direct support.

---

## ✨ Comprehensive Features & Architecture

This platform is divided into several highly specialized modules tailored for public health education:

### 1. 🧠 Understand (Scientific Breakdown)
Deep-dive educational section exploring the pathophysiology of PMOS, explaining insulin resistance, androgen dominance, and the shift in medical nomenclature.

### 2. 🩺 Symptoms & Precautions
Detailed management pillars curated from international medical guidelines:
- **Daily Habits**: Resistance and aerobic exercise, sleep hygiene, and cortisol regulation.
- **Gut Microbiome**: Prebiotic and probiotic support for systemic inflammation.
- **Medical Care**: Inositols (40:1 ratio) and required clinical lab evaluations (Free T, Fasting Insulin, SHBG).
- **Emotional Wellbeing**: Recognizing mental health as a core physiological aspect of PMOS.
- **Doctor Advocacy Banner**: Encouraging individuals to confidently seek qualified healthcare.

### 3. 📋 Interactive Self-Test Wizard
A privacy-first, 4-step interactive assessment tool that evaluates:
- Menstrual & Ovulatory Patterns
- Clinical/Biochemical Hyperandrogenism (Acne, Hirsutism)
- Metabolic Indicators (Insulin Resistance, Acanthosis Nigricans)
- Emotional Wellbeing (Stress, Fatigue)

*Note: This is an educational tool, not a diagnostic instrument. It guides users to appropriate medical resources.*

### 4. 📞 Ask & Support Helplines
A dedicated support portal featuring:
- **Anonymous Q&A**: A secure interface for asking confidential health questions.
- **Verified Helplines**: One-tap calling for the National Women's Helpline (1091) and iCall Mental Health Support.
- **Campus Support**: Direct contact integration for CBIT's Women's Administrator.

### 5. 💡 Myths vs Facts
An expandable accordion interface debunking dangerous internet myths (e.g., "PMOS only affects higher body weights" or "PMOS means you can never conceive") with verified scientific facts.

### 6. 📥 Resources & Campus Toolkit
A digital download hub for taking awareness offline. Features A4 printable factsheets, Instagram story graphics, WhatsApp campaign posters, and a scannable Offline Awareness QR Code.

### 7. 🤝 About the Team
Profiles of the CBIT NSS Executive Body driving the campaign, featuring a special interactive spotlight on the Women's Administrator role.

---

## 🛠 Technical Stack & Engineering

This project was engineered with a strict focus on performance, accessibility, and flawless mobile responsiveness.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React Server Components).
- **Styling Architecture**: 
  - **Vanilla CSS + CSS Variables**: A robust custom design system (`var(--nss-blue-accent)`, `var(--soft-teal-bg)`).
  - **Fluid Typography**: Extensive use of CSS `clamp()` functions to ensure typography and padding scale flawlessly from 320px mobile screens to 4K desktop monitors.
  - **Bootstrap Grid Integration**: Fully migrated structural layouts utilizing Bootstrap's responsive `.row` and `.col-*` classes to guarantee perfect rendering across all devices without horizontal scrolling.
  - **Glassmorphism & Micro-animations**: Premium visual effects using `backdrop-filter`, staggered CSS reveals, and hover state transitions to create an "art-directed" public health experience.
- **Fonts**: Optimized delivery of `Geist` via `next/font`.
- **Build Tool**: Turbopack for ultra-fast local development.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vroom0456/World-PCOS-Day.git
   ```
2. Navigate to the project directory:
   ```bash
   cd World-PCOS-Day
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

---

## 🌐 Deployment

This project is configured for seamless deployment on [Vercel](https://vercel.com/).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings (`next build`).
4. The application will be deployed globally via Vercel's Edge Network.

*Because this project utilizes strict responsive CSS, static generation, and optimized Next.js Image/Font components, it will achieve near-perfect Lighthouse scores out of the box.*

---

## 👑 Project Leadership & Acknowledgments

This campaign was initiated, designed, and managed by the **CBIT NSS Executive Body 2026–2027**.

**Special Acknowledgment:**
- **D. Nomini** – *Women's Administrator (Student Support & Guidance)*. For her dedication to female student support, health awareness drives, and confidential personal guidance at CBIT.

---
*Built with ❤️ for World PMOS Day 2026.*
