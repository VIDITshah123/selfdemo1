import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Award, Users, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Award size={24} />,
    num: '01',
    title: 'Award-Winning Agency',
    desc: "Recognised as Dubai's top luxury real estate firm for 5 consecutive years by Arabian Business Awards.",
  },
  {
    icon: <Shield size={24} />,
    num: '02',
    title: 'Trusted & Certified',
    desc: 'Fully licensed by Dubai Land Department (DLD) and RERA-certified agents delivering transparent dealings.',
  },
  {
    icon: <Users size={24} />,
    num: '03',
    title: 'Global Network',
    desc: 'Our international team speaks 18+ languages and serves high-net-worth clients from over 50 countries.',
  },
  {
    icon: <Gem size={24} />,
    num: '04',
    title: 'White Glove Service',
    desc: 'From property search to handover — concierge-level service and a dedicated advisor at every step.',
  },
];

/* ── Spotlight Glow Card ─────────────────── */
function GlowCard({ feature, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.1) 0%, transparent 65%)`;
      glow.style.opacity = '1';
    };
    const onLeave = () => { glow.style.opacity = '0'; };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="feature-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Spotlight glow layer */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', inset: 0, opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="feature-num">{feature.num}</div>
        <div className="feature-icon">{feature.icon}</div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading
      gsap.fromTo('.features-eyebrow',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          ease: 'power3.out',
        }
      );

      gsap.fromTo('.features-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          delay: 0.15,
          ease: 'power3.out',
        }
      );

      // ── Cards with stagger + slide
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0,
          clipPath: 'inset(0 0 0% 0)',
          stagger: { amount: 0.5 },
          duration: 0.9,
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
          },
          ease: 'power3.out',
        }
      );

      // ── Line draw on each card's bottom border
      ScrollTrigger.create({
        trigger: '.features-grid',
        start: 'top 75%',
        onEnter: () => {
          gsap.to('.feature-card::before', { scaleX: 1, duration: 1.2, stagger: 0.15 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="features-section" id="services">
      <div className="container">
        {/* Header */}
        <div className="features-eyebrow eyebrow" style={{ marginBottom: 20, opacity: 0 }}>
          <span className="gold-line" />
          Why Bellavierre
        </div>
        <h2 className="features-title section-title" style={{ opacity: 0, marginBottom: 0 }}>
          An Unrivalled Standard<br />of <em>Excellence</em>
        </h2>

        {/* Cards */}
        <div className="features-grid" style={{ marginTop: 64 }}>
          {features.map((f, i) => (
            <GlowCard key={f.num} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
