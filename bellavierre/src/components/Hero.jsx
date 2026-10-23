import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = '/images/hero_dubai_skyline_1792730173932.jpg';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // ── Background Ken Burns
      gsap.fromTo(bgRef.current,
        { scale: 1.18 },
        { scale: 1.04, duration: 2.4, ease: 'power2.out' }
      );

      // ── Overlay fade
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      );

      // ── Eyebrow reveal
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.5
      );

      // ── Line 1 — clip reveal from left
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
        0.75
      );

      // ── Line 2 — clip reveal from left (delayed)
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
        0.95
      );

      // ── Subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.2
      );

      // ── Buttons
      tl.fromTo(actionsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.45
      );

      // ── Stats stagger
      tl.fromTo('.hero-stat',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.7 },
        1.6
      );

      // ── Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        2.1
      );

      // ── Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(bgRef.current, {
            y: self.progress * 220,
          });
        },
      });

      // ── Overlay darkens as you scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(overlayRef.current, {
            opacity: 0.5 + self.progress * 0.4,
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollDown = () =>
    document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} className="hero" id="hero" style={{ overflow: 'hidden' }}>
      {/* Film grain */}
      <div className="noise-overlay" />

      {/* Parallax Background */}
      <div className="hero-bg" style={{ overflow: 'hidden', position: 'absolute', inset: 0 }}>
        <img
          ref={bgRef}
          src={HERO_IMG}
          alt="Dubai Skyline"
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }}
        />
      </div>
      <div ref={overlayRef} className="hero-overlay" style={{ opacity: 0 }} />
      <div className="hero-overlay-bottom" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0 }}>
          <span className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">Dubai's Premier Luxury Agency</span>
        </div>

        {/* Title — two separate lines for individual reveal */}
        <h1 className="hero-title" style={{ overflow: 'visible' }}>
          <span
            ref={line1Ref}
            style={{
              display: 'block',
              clipPath: 'inset(0 100% 0 0)',
              willChange: 'clip-path',
            }}
          >
            Where Luxury
          </span>
          <span
            ref={line2Ref}
            style={{
              display: 'block',
              clipPath: 'inset(0 100% 0 0)',
              willChange: 'clip-path',
            }}
          >
            Meets <em>Perfection</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
          Discover an extraordinary collection of Dubai's most prestigious properties —
          penthouses, villas &amp; residences curated for the discerning few.
        </p>

        {/* CTA Buttons */}
        <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
          <MagneticBtn
            href="#properties"
            primary
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Properties
            <ArrowRight size={16} />
          </MagneticBtn>
          <MagneticBtn
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book a Consultation
          </MagneticBtn>
        </div>
      </div>

      {/* Stats */}
      <div className="hero-stats">
        {[
          { num: '500+', label: 'Properties Sold' },
          { num: 'AED 2B+', label: 'Total Transactions' },
          { num: '15+', label: 'Years in Dubai' },
        ].map((stat) => (
          <div key={stat.label} className="hero-stat" style={{ opacity: 0 }}>
            <div className="hero-stat-num">{stat.num}</div>
            <div className="hero-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="hero-scroll-indicator"
        onClick={scrollDown}
        style={{ opacity: 0, cursor: 'none' }}
      >
        <span className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}

/* ── Magnetic Button ─────────────────────── */
function MagneticBtn({ children, href, onClick, primary }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.38, y: y * 0.38, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={primary ? 'btn-magnetic' : 'btn-magnetic-outline'}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
    >
      {children}
    </a>
  );
}
