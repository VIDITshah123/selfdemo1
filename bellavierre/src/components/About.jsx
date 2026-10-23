import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMG = '/images/about_team_1792730260197.jpg';
const ACCENT_IMG = '/images/property_penthouse_1792730187324.jpg';

/* ── Animated Counter ─────────────────────── */
function Counter({ end, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const endNum = parseFloat(end.replace(/[^0-9.]/g, ''));
        gsap.fromTo(
          { val: 0 },
          { val: endNum },
          {
            duration,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.floor(this.targets()[0].val) + suffix;
            },
          }
        );
      },
    });
  }, [end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const imgMainRef = useRef(null);
  const imgAccentRef = useRef(null);
  const coverMainRef = useRef(null);
  const coverAccentRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // ── Main image reveal (cover slides away)
      tl.fromTo(coverMainRef.current,
        { scaleX: 1, transformOrigin: 'right' },
        { scaleX: 0, duration: 1.2, ease: 'power3.inOut' },
        0
      );
      tl.fromTo(imgMainRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1.4, ease: 'power3.out' },
        0
      );

      // ── Accent image reveal
      tl.fromTo(coverAccentRef.current,
        { scaleX: 1, transformOrigin: 'right' },
        { scaleX: 0, duration: 1.1, ease: 'power3.inOut' },
        0.3
      );
      tl.fromTo(imgAccentRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 1.3, ease: 'power3.out' },
        0.3
      );

      // ── Badge float in
      tl.fromTo(badgeRef.current,
        { opacity: 0, x: -30, y: 10 },
        { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
        0.7
      );

      // ── Content stagger
      tl.fromTo(contentRef.current?.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' },
        0.4
      );

      // ── Subtle parallax on image
      gsap.to(imgMainRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          {/* ── Image Column ── */}
          <div className="about-image-wrap" style={{ position: 'relative' }}>
            {/* Gold floating badge */}
            <div ref={badgeRef} className="about-badge floating-badge" style={{ opacity: 0 }}>
              <span className="about-badge-num">15+</span>
              <span className="about-badge-text">Years of<br />Excellence</span>
            </div>

            {/* Main image with reveal cover */}
            <div className="img-reveal-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                ref={imgMainRef}
                src={ABOUT_IMG}
                alt="Bellavierre Team"
                className="about-image-main"
                style={{ willChange: 'transform' }}
              />
              <div
                ref={coverMainRef}
                className="img-reveal-cover"
                style={{ background: 'var(--gold)', position: 'absolute', inset: 0, zIndex: 2 }}
              />
            </div>

            {/* Accent image with reveal cover */}
            <div
              className="img-reveal-wrap about-image-accent"
              style={{ position: 'absolute', bottom: -40, right: -40, width: '55%', overflow: 'hidden', border: '6px solid var(--dark-800)' }}
            >
              <img
                ref={imgAccentRef}
                src={ACCENT_IMG}
                alt="Luxury Property"
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block', willChange: 'transform' }}
              />
              <div
                ref={coverAccentRef}
                style={{ background: '#9d7a2e', position: 'absolute', inset: 0, zIndex: 2 }}
              />
            </div>
          </div>

          {/* ── Content Column ── */}
          <div ref={contentRef} className="about-content">
            <div className="eyebrow">
              <span className="gold-line" />
              Our Story
            </div>

            <h2 className="section-title">
              Crafting <em>Extraordinary</em><br />
              Real Estate Journeys
            </h2>

            <p className="about-text">
              Bellavierre Real Estate was founded on a singular belief — that every client
              deserves nothing less than the finest. For over 15 years, we have been the trusted
              advisors for discerning buyers, sellers, and investors across Dubai's most
              prestigious addresses.
            </p>
            <p className="about-text">
              Our multilingual team of RERA-certified specialists combines deep local market
              knowledge with global investment expertise, delivering a white-glove experience
              from the first conversation to the final key handover.
            </p>

            {/* Animated Stats */}
            <div className="about-stats">
              {[
                { end: '500', suffix: '+', label: 'Properties Sold' },
                { end: '2', suffix: 'B+', label: 'AED Transacted' },
                { end: '98', suffix: '%', label: 'Client Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-num">
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Signatures */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[
                { name: 'Amir Bellavierre', role: 'Founder & CEO' },
                { name: 'Sophia Martel', role: 'Head of Luxury Sales' },
              ].map((p) => (
                <div key={p.name}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    {p.role}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary"
              style={{ alignSelf: 'flex-start' }}
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Meet Our Team
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
