import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { motion } from 'framer-motion';
import { ArrowRight, Bed, Bath, Maximize } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, Observer);

const properties = [
  {
    id: 1,
    badge: 'Featured',
    image: '/images/property_penthouse_1792730187324.jpg',
    location: 'Downtown Dubai',
    name: 'Aria Sky Penthouse',
    beds: 4, baths: 5, size: '8,500',
    price: 'AED 28,500,000',
  },
  {
    id: 2,
    badge: 'New Listing',
    image: '/images/property_villa_1792730211463.jpg',
    location: 'Palm Jumeirah',
    name: 'Coral Frond Villa',
    beds: 6, baths: 7, size: '14,200',
    price: 'AED 62,000,000',
  },
  {
    id: 3,
    badge: 'Off-Plan',
    image: '/images/property_apartment_1792730223264.jpg',
    location: 'Dubai Marina',
    name: 'Lumière Residences',
    beds: 2, baths: 3, size: '3,200',
    price: 'AED 4,800,000',
  },
  {
    id: 4,
    badge: 'Exclusive',
    image: '/images/property_townhouse_1792730247748.jpg',
    location: 'Dubai Hills Estate',
    name: 'Maison Vert Townhouse',
    beds: 5, baths: 5, size: '5,800',
    price: 'AED 9,200,000',
  },
  {
    id: 5,
    badge: 'Sea View',
    image: '/images/property_villa_1792730211463.jpg',
    location: 'Jumeirah Bay Island',
    name: 'Bespoke Waterfront Villa',
    beds: 7, baths: 8, size: '18,500',
    price: 'AED 95,000,000',
  },
];

/* ── 3D Tilt Card ────────────────────────── */
function TiltCard({ property }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 12,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0, rotateX: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="property-card-h tilt-card">
      <div className="property-image-wrap">
        <img src={property.image} alt={property.name} loading="lazy" />
        <div className="property-overlay" />
        <span className="property-badge">{property.badge}</span>
      </div>
      <div className="property-info">
        <div className="property-location">{property.location}</div>
        <h3 className="property-name">{property.name}</h3>
        <div className="property-details">
          <span className="property-detail"><Bed size={13} />{property.beds} Beds</span>
          <span className="property-detail"><Bath size={13} />{property.baths} Baths</span>
          <span className="property-detail"><Maximize size={13} />{property.size} sq.ft</span>
        </div>
        <div className="property-footer">
          <div>
            <div className="property-price">{property.price}</div>
            <div className="property-price-label">Starting From</div>
          </div>
          <button className="property-arrow" aria-label="View property">
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading reveal
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
          ease: 'power3.out',
        }
      );

      // ── Cards stagger fade-in
      gsap.fromTo('.property-card-h',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8,
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
          },
          ease: 'power3.out',
        }
      );

      // ── Horizontal scroll driven by vertical scroll (desktop only)
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        const track = trackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            gsap.set(track, { x: -self.progress * totalScroll });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="properties-section properties-horizontal-wrapper" id="properties">
      {/* Header */}
      <div className="container" ref={headingRef} style={{ opacity: 0, paddingBottom: 0 }}>
        <div className="section-header" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="gold-line" />
              Exclusive Listings
            </div>
            <h2 className="section-title">
              Featured <em>Properties</em>
            </h2>
          </div>
          <p className="section-subtitle">
            Drag to explore Dubai's finest homes — each one a masterpiece of design and investment potential.
          </p>
        </div>
      </div>

      {/* Horizontal scrolling track */}
      <div ref={trackRef} className="properties-horizontal-track">
        {properties.map((p) => (
          <TiltCard key={p.id} property={p} />
        ))}
      </div>

      {/* Drag hint */}
      <div className="drag-hint">
        <span className="drag-hint-arrow" />
        Drag to explore
      </div>

      {/* View All CTA */}
      <div style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 20 }}>
        <a href="#" className="btn-outline">
          View All Properties
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
