'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Citation {
  id: string;
  title: string;
  sub: string;
  badge: string;
  authors: string;
  journal: string;
  summary: string;
  background: string;
  keyFindings: string[];
  clinicalTakeaway: string;
  link: string;
}

export default function ResourcesPage() {
  const [sourceDrawerOpen, setSourceDrawerOpen] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const openSourceModal = (citation: Citation) => {
    setSelectedCitation(citation);
    setSourceDrawerOpen(true);
  };

  const recommendedSources = [
    {
      title: '1. International PMOS Guideline',
      sub: 'Monash University / International Evidence-Based Consensus',
      desc: 'International evidence-based guidance on assessment and management of PMOS.',
      url: 'https://www.monash.edu/medicine/sphpm/mchri/pcos/guideline'
    },
    {
      title: '2. PMOS Naming / International Consensus',
      sub: '2026 Medical Literature Update',
      desc: 'Evidence behind the 2026 terminology update from PCOS to PMOS.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/'
    },
    {
      title: '3. NHS (National Health Service)',
      sub: 'Patient & Health Education Portal',
      desc: 'Accessible patient-focused information about symptoms, diagnosis and treatment.',
      url: 'https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/'
    },
    {
      title: '4. Mayo Clinic',
      sub: 'Clinical & Patient Care Overview',
      desc: 'General medical information about symptoms, diagnosis and treatment.',
      url: 'https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353416'
    }
  ];

  const citations: Citation[] = [
    {
      id: 'monash-2023',
      title: '2023 International Evidence-Based Guideline for the Assessment and Management of PCOS / PMOS',
      sub: 'European Journal of Endocrinology & Human Reproduction',
      badge: 'MONASH UNIVERSITY CONSENSUS',
      authors: 'Teede HJ, Tay CT, Laven J, et al. (International PCOS Network)',
      journal: 'European Journal of Endocrinology, 2023; 189(2): G43–G64.',
      summary: 'Comprehensive international clinical guideline endorsed by 39 global medical societies across 71 countries.',
      background: 'Synthesizes high-quality systematic reviews and meta-analyses to update clinical standards for diagnosis, metabolic risk stratification, emotional health, and lifestyle management in women with PMOS globally.',
      keyFindings: [
        'Epidemiology: Affects an estimated 1 in 8 (8–13%) women of reproductive age worldwide, making it the most prevalent female endocrine-metabolic disorder.',
        'Diagnostic Standards: Applies refined Rotterdam criteria with emphasis on clinical or biochemical hyperandrogenism, irregular cycles, and multi-follicular ovarian morphology.',
        'Psychological Care: Establishes routine screening for anxiety, depression, and body image distress as an essential primary tier of healthcare.',
        'First-Line Interventions: Multicomponent lifestyle management (nutrition, exercise, behavioral strategies) is recommended prior to pharmacological therapies.'
      ],
      clinicalTakeaway: 'PMOS is a complex multi-system endocrine disorder requiring routine emotional wellbeing assessments alongside metabolic and reproductive care.',
      link: 'https://www.monash.edu/medicine/sphpm/mchri/pcos/guideline'
    },
    {
      id: 'singh-2023',
      title: 'Etiology, Current Management, and Gut-Axis Therapeutics in Polycystic Ovary Syndrome (PMOS)',
      sub: 'Journal of Clinical Medicine',
      badge: 'CLINICAL REVIEW PAPER',
      authors: 'Singh S, Pal N, Sharma E, et al.',
      journal: 'Journal of Clinical Medicine, 2023; 12(4): 1492.',
      summary: 'State-of-the-art review on metabolic signaling pathways, gut microbiome axis (DOGMA hypothesis), and targeted supplementation.',
      background: 'Investigates the physiological mechanisms driving hyperinsulinemia, ovarian hyperandrogenism, and systemic low-grade chronic inflammation in PMOS phenotypes.',
      keyFindings: [
        'Rotterdam Phenotypes: Evaluates four distinct clinical phenotypes (Phenotypes A–D) and their varying metabolic and reproductive risk profiles.',
        'Gut Microbiome Axis: Demonstrates that altered intestinal microflora composition directly correlates with insulin resistance and elevated serum testosterone levels.',
        'Cellular Inositol Signaling: Examines the physiological role of Myo-Inositol and D-Chiro-Inositol in enhancing insulin receptor sensitivity and cellular signaling.',
        'Exercise Physiology: Confirms structured aerobic and resistance exercise significantly improves peripheral glucose disposal independent of body weight loss.'
      ],
      clinicalTakeaway: 'Insulin sensitizing strategies and regular physical activity address root metabolic drivers of PMOS beyond superficial symptom suppression.',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9965551/'
    },
    {
      id: 'teede-2024',
      title: 'The International PCOS Guideline: Recommendations Across the Lifespan',
      sub: 'Fertility and Sterility',
      badge: 'LIFESPAN DIAGNOSTIC CRITERIA',
      authors: 'Teede HJ, Joham AE, Paulson RJ, et al.',
      journal: 'Fertility and Sterility, 2024; 121(2): 205–216.',
      summary: 'Lifespan recommendations for cardiovascular risk, diabetes screening, and adolescent-specific diagnostic guidelines.',
      background: 'Provides precise evidence-based diagnostic criteria for adolescents to prevent misdiagnosis during normal pubertal developmental transitions.',
      keyFindings: [
        'Adolescent Diagnostics: Adolescent diagnosis strictly requires BOTH ovulatory dysfunction and hyperandrogenism; pelvic ultrasound is not recommended within 8 years of menarche.',
        'Cardiovascular Screening: Recommends regular blood pressure and lipid profile assessments based on elevated lifetime metabolic risk.',
        'Diabetes Risk: Recommends 2-hour oral glucose tolerance testing (OGTT) for accurate glycemic status determination.'
      ],
      clinicalTakeaway: 'Adolescent diagnostic criteria must avoid over-diagnosing normal pubertal physiological shifts while ensuring appropriate metabolic monitoring.',
      link: 'https://www.fertstert.org/article/S0015-0282(23)00827-X/fulltext'
    },
    {
      id: 'barber-2023',
      title: 'Metabolic Dysfunction and Adipose Tissue Signaling in PMOS',
      sub: 'Nature Reviews Endocrinology',
      badge: 'NATURE REVIEWS ENDOCRINOLOGY',
      authors: 'Barber TM, Franks S.',
      journal: 'Nature Reviews Endocrinology, 2023; 19(9): 521–537.',
      summary: 'Comprehensive review of hyperinsulinemia, hepatic SHBG suppression, and ovarian androgen biosynthesis.',
      background: 'Explores the complex physiological feedback loops connecting pancreatic insulin secretion, liver hormone production, and ovarian androgen generation.',
      keyFindings: [
        'Synergistic Stimulation: Hyperinsulinemia acts synergistically with LH to stimulate ovarian theca cells to synthesize excess androgenic hormones.',
        'Hepatic Regulation: High circulating insulin suppresses liver production of Sex Hormone-Binding Globulin (SHBG), increasing free bioavailable testosterone.',
        'Adipocyte Function: Identifies tissue-level insulin resistance as a core pathological feature present in both lean and higher-weight individuals.'
      ],
      clinicalTakeaway: 'Hyperinsulinemia is a primary driver of elevated free testosterone in PMOS, reinforcing the critical role of metabolic care.',
      link: 'https://www.nature.com/articles/s41574-023-00862-y'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="page-main">

        {/* HEADER */}
        <section style={{ padding: '3.5rem 0 2rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <span className="section-tag">Clinical Evidence Base</span>
            <h1 className="section-title">
              Research &amp; <span className="accent">Resources</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Clinical research citations and authoritative evidence-backed medical literature informing this initiative.
            </p>
          </div>
        </section>

        {/* RECOMMENDED SOURCES SECTION */}
        <section style={{ padding: '3rem 0 3.5rem', background: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">Authoritative Portals</span>
              <h2 className="section-title">Recommended <span className="accent">Sources</span></h2>
              <p className="section-desc">Trusted international medical guidelines and health organizations.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '1.2rem', justifyContent: 'center' }}>
              {recommendedSources.map((s, idx) => (
                <div key={idx} className="reveal" style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-light)', borderRadius: 'var(--r-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: 'var(--nss-navy)', fontSize: '1.02rem', display: 'block', marginBottom: '0.2rem' }}>{s.title}</strong>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--nss-blue-accent)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.6rem' }}>{s.sub}</span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                  <div style={{ marginTop: '1.2rem' }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sec-link"
                      style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      Visit Official Portal ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLINICAL CITATIONS SECTION */}
        <section id="citations" style={{ padding: '2rem 0 5rem', background: 'var(--bg-main)' }}>
          <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div className="heading-box reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="section-tag">Clinical Literature</span>
              <h2 className="section-title">Research &amp; <span className="accent">Clinical Citations</span></h2>
              <p className="section-desc">Click any paper below to view detailed clinical abstract summaries, key findings, and medical evidence.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {citations.map((c) => (
                <div key={c.id} className="reveal" style={{ background: '#FFFFFF', padding: '1.5rem 1.8rem', borderRadius: 'var(--r-md)', border: '1.5px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--nss-blue-accent)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>{c.badge}</span>
                    <strong style={{ color: 'var(--nss-navy)', display: 'block', fontSize: '1.02rem', lineHeight: 1.35, marginBottom: '0.3rem' }}>{c.title}</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-body)', display: 'block' }}>{c.authors} ({c.sub})</span>
                  </div>
                  <button
                    className="btn-sec-link"
                    style={{ fontSize: '0.84rem', padding: '0.5rem 1.1rem', flexShrink: 0 }}
                    onClick={() => openSourceModal(c)}
                  >
                    Read Full Abstract
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* SOURCE DRAWER MODAL */}
      {sourceDrawerOpen && selectedCitation && (
        <div className="modal-overlay active" style={{ display: 'flex' }} onClick={() => setSourceDrawerOpen(false)}>
          <div className="modal-window" style={{ maxWidth: '680px', padding: '2.4rem 2rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSourceDrawerOpen(false)}>✕</button>
            <span className="modal-badge">Peer-Reviewed Clinical Abstract</span>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--nss-navy)', marginBottom: '0.4rem', lineHeight: 1.35 }}>
              {selectedCitation.title}
            </h3>
            
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--nss-blue-accent)', marginBottom: '1rem' }}>
              {selectedCitation.authors} · <em>{selectedCitation.journal}</em>
            </p>

            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--r-sm)', padding: '1rem 1.2rem', marginBottom: '1.2rem' }}>
              <strong style={{ fontSize: '0.82rem', color: 'var(--nss-navy)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.3rem' }}>Overview &amp; Scope:</strong>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>{selectedCitation.background}</p>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--nss-navy)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.6rem' }}>Key Clinical Findings:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedCitation.keyFindings.map((finding, idx) => (
                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--soft-teal-bg)', borderLeft: '4px solid var(--nss-blue-accent)', padding: '0.85rem 1.1rem', borderRadius: 'var(--r-sm)', marginBottom: '1.5rem' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--nss-navy)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.2rem' }}>Clinical Takeaway:</strong>
              <p style={{ fontSize: '0.86rem', color: 'var(--nss-navy)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                {selectedCitation.clinicalTakeaway}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <a
                href={selectedCitation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sec-link"
                style={{ fontSize: '0.84rem', padding: '0.5rem 1.1rem' }}
              >
                View Article / PubMed ↗
              </a>
              <button
                onClick={() => setSourceDrawerOpen(false)}
                className="btn-primary-cta"
                style={{ fontSize: '0.84rem', padding: '0.5rem 1.2rem', minHeight: '38px' }}
              >
                Close Abstract
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
