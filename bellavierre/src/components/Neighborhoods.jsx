import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

const neighborhoods = [
  {
    name: 'Downtown Dubai',
    count: '42 Properties',
    img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=700&q=80',
  },
  {
    name: 'Palm Jumeirah',
    count: '38 Properties',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80',
  },
  {
    name: 'Dubai Marina',
    count: '56 Properties',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    name: 'Business Bay',
    count: '29 Properties',
    img: 'https://images.unsplash.com/photo-1586101068682-27ac2d4a0cff?w=700&q=80',
  },
  {
    name: 'Dubai Hills',
    count: '34 Properties',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
  },
  {
    name: 'Jumeirah Bay',
    count: '12 Properties',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80',
  },
];

export default function Neighborhoods() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal
      gsap.fromTo('.neighborhoods-eyebrow',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo('.neighborhoods-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          delay: 0.1,
        }
      );

      // ── Cards stagger
      gsap.fromTo('.neighborhood-card',
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1, duration: 0.8,
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
          },
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="neighborhoods-section" id="neighborhoods">
      <div className="container">
        <div className="section-header">
          <div>
            <div
              className="neighborhoods-eyebrow eyebrow"
              style={{ marginBottom: 20, opacity: 0 }}
            >
              <span className="gold-line" />
              Prime Locations
            </div>
            <h2
              className="neighborhoods-title section-title"
              style={{ opacity: 0 }}
            >
              Explore Dubai's Finest<br />
              <em>Neighbourhoods</em>
            </h2>
          </div>
          <p className="section-subtitle">
            From the iconic waterfront of Palm Jumeirah to the vibrant heart of Downtown — find your perfect address.
          </p>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        className="neighborhoods-track"
        style={{ paddingLeft: 40, paddingRight: 40 }}
      >
        {neighborhoods.map((n) => (
          <div key={n.name} className="neighborhood-card" style={{ opacity: 0 }}>
            <img
              src={n.img}
              alt={n.name}
              className="neighborhood-image"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/hero_dubai_skyline_1792730173932.jpg';
              }}
            />
            <div className="neighborhood-overlay" />
            <div className="neighborhood-info">
              <div className="neighborhood-name">{n.name}</div>
              <div className="neighborhood-count">{n.count}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
