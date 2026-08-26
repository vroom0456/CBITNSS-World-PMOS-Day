---
name: cbit-nss-pmos-website
description: >-
  Guidelines, design standards, medical terminology conventions, vector icon system,
  and maintenance workflows for the CBIT NSS World PMOS Day ("Knowledge Beyond Symptoms") website.
  Use when making updates to content, mobile layout styling, clinical citations, or component design.
---

# CBIT NSS World PMOS Day — Website Maintenance & Guidelines Skill

This skill documents the design system, medical accuracy standards, layout rules, vector icon architecture, and quality assurance workflows established for the **CBIT NSS World PMOS Day ("Knowledge Beyond Symptoms")** production website ([https://cbitnss-world-pmos-day.vercel.app/](https://cbitnss-world-pmos-day.vercel.app/)).

---

## 1. Medical Accuracy & Terminology Standards

- **Official Terminology**: Always use **PMOS (Polyendocrine Metabolic Ovarian Syndrome)** alongside PCOS to accurately reflect multi-organ endocrine and metabolic involvement beyond ovarian morphology, following the 2026 international medical consensus.
- **Evidence-Based Statistics**: Cite **1 in 8 women (8–13%)** globally affected by PMOS/PCOS based on the **2023 Monash University International Evidence-Based Guideline**.
- **Clinical Citations & Abstracts**: When displaying clinical literature (e.g. on `/resources`), include full peer-reviewed abstract drawer modals with:
  - Journal & Authors
  - Overview & Scope
  - Bulleted Key Findings (e.g. Rotterdam criteria, gut microbiome axis, cellular inositol signaling, adolescent diagnostic guidelines)
  - Highlighted **Clinical Takeaway** box
  - Direct PubMed / primary literature link (`↗`)
- **Privacy & Safety Disclaimer**: Maintain explicit educational notices confirming that doctor responses and website materials provide general awareness and do not replace in-person clinical diagnosis or emergency care.

---

## 2. Visual Design & Typography Rules

- **Brand Palette (5-Color System)**:
  - **Primary Navy (`#0C2B40`)**: Headings, navigation, authority text, footers.
  - **Secondary Teal (`#567C8D`)**: Secondary buttons, section tags, interactive elements.
  - **Soft Teal Accent (`#00A896` / `var(--soft-teal-accent)`)**: Primary CTA accents, icon highlights, active states.
  - **Off-White Background (`var(--bg-main)` / `#F7F9FA`)**: Clean section backgrounds.
  - **Pure White (`#FFFFFF`)**: Component cards & modal windows.
- **Heading Gradients**: Maintain subtle text gradient clipping on headings (`linear-gradient(135deg, #0C2B40 0%, #567C8D 100%)`) without heavy drop-shadows or distracting glassmorphism blur filters.
- **No Emojis in Headings or UI**: Do **NOT** use graphic emojis in section tags, headings, modal badges, or buttons. All visual icons must use the SVG vector icon system (`src/components/ui/Icons.tsx`).

---

## 3. Vector Icon System (`src/components/ui/Icons.tsx`)

All UI graphics must be clean, resolution-independent SVG vector components using `currentColor` and standard props (`size`, `color`, `className`, `style`).

| Vector Icon Component | Purpose & Usage |
| :--- | :--- |
| `IconBloodDrop` | Irregular periods & cycle variations chip / card |
| `IconSparkle` | Hormonal acne & skin changes |
| `IconHairThinning` | Hirsutism & hair thinning |
| `IconScaleBalance` | Metabolic shifts & weight dynamics |
| `IconSleepFatigue` | Fatigue & energy dips |
| `IconPigmentationMoon` | Acanthosis nigricans & mood wellbeing |
| `IconPhone` | Phone contact pills (`+91 96766 48023`, `1091`, `9152987821`) |
| `IconMail` | Email contact pills (`Email Derangula Nomini`) |
| `IconMessage` | WhatsApp contact pills & Q&A action links |
| `IconCheckCircle` | Submission success modal alerts |
| `IconShield` | Educational medical notice & privacy badges |
| `IconHeart` | Empathetic care ("You deserve proper medical care") & support items |
| `IconLeaf` | Infertility misconception clarity & growth points |
| `IconHospital` | Professional medical guidance & hospital care |
| `IconExternalLink` | Primary source & PubMed literature links |

---

## 4. Mobile & Desktop QA Guidelines

- **Doctor Cutout Photo Centering**:
  - In mobile viewports (`@media (max-width: 900px)`), keep doctor cutout photographs centered using `margin: 0 auto !important; transform: none !important;`.
  - Avoid horizontal translation offsets (`translateX(...)`) that shift images off-center on narrow screens.
  - Apply smooth bottom mask fading (`-webkit-mask-image: linear-gradient(...)`) and `.speaker-bottom-fade` overlay for natural image base transitions into cards.
- **Core Committee Team Section**: Keep the team directory on `/about` clean and complete with direct core committee listings, avoiding unnecessary collapsible toggles or card clutter.

---

## 5. Verification & Deployment Workflow

1. **Local Build Check**: Always run `npm run build` locally after making changes to verify TypeScript compilation, JSX syntax, and Turbopack page generation with **0 errors**.
2. **Git Commit & Push**: Commit with clear descriptive messages and push directly to `origin/main` for automatic Vercel production deployment.
