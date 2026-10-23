import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_IMG = '/images/property_villa_1792730211463.jpg';

export default function ParallaxBanner() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Deep parallax — image moves slower than scroll
      gsap.to(bgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // ── Title splits up from below
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out' },
        0
      );
      tl.fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.35
      );
      tl.fromTo(actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.55
      );

      // ── Scale overlay from dark to slight fade on scroll
      gsap.fromTo('.parallax-banner-overlay',
        { opacity: 0.75 },
        {
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="parallax-banner" style={{ overflow: 'hidden' }}>
      {/* Deep parallax bg — set height larger than container */}
      <div
        style={{
          position: 'absolute',
          inset: '-25%',
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        <img
          ref={bgRef}
          src={PARALLAX_IMG}
          alt="Luxury Villa Dubai"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div className="parallax-banner-overlay" />
      <div className="noise-overlay" />

      <div className="parallax-banner-content">
        <div
          className="eyebrow"
          style={{ justifyContent: 'center', marginBottom: 24 }}
        >
          <span className="gold-line" />
          Your Dream Awaits
          <span className="gold-line" />
        </div>

        <h2
          ref={titleRef}
          className="parallax-banner-title"
          style={{ opacity: 0, willChange: 'transform, clip-path' }}
        >
          Ready to Find Your<br />
          Perfect <em>Dubai Home?</em>
        </h2>

        <p
          ref={subRef}
          className="parallax-banner-sub"
          style={{ opacity: 0 }}
        >
          Let our expert advisors guide you through Dubai's most prestigious real estate portfolio.
          Private viewings available 7 days a week.
        </p>

        <div
          ref={actionsRef}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', opacity: 0 }}
        >
          <a
            href="#contact"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Schedule a Viewing
            <ArrowRight size={16} />
          </a>
          <a href="tel:+97144000000" className="btn-outline">
            +971 4 400 0000
          </a>
        </div>
      </div>
    </div>
  );
}
