import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: 'Bellavierre transformed what could have been an overwhelming experience into an absolute pleasure. Their knowledge of Dubai\'s luxury market is unparalleled. We found our dream penthouse in Downtown within three weeks.',
    name: 'James & Catherine Whitmore',
    role: 'London, UK — Palm Jumeirah Villa',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    stars: 5,
  },
  {
    id: 2,
    text: 'As an investor from Singapore, I needed a trusted partner in Dubai. Bellavierre\'s off-plan expertise and legal guidance ensured I made a sound investment. I\'ve purchased three properties through them now.',
    name: 'Liang Wei Chen',
    role: 'Singapore — Dubai Marina Apartments',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    stars: 5,
  },
  {
    id: 3,
    text: 'Exceptional service from start to finish. The team understood exactly what we wanted and never wasted our time. The white-glove experience they promise is real — they even arranged the interior designer for us.',
    name: 'Fatima Al Rashid',
    role: 'Abu Dhabi, UAE — Emirates Hills',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    stars: 5,
  },
];

const StarRow = ({ count }) => (
  <div className="testimonial-stars">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={14} fill="#C0A882" color="#C0A882" />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 20 }}>
            <span className="gold-line" />
            Client Stories
            <span className="gold-line" />
          </div>
          <h2 className="section-title">
            What Our Clients<br />
            <em>Say About Us</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <div className="testimonial-quote">&ldquo;</div>
              <StarRow count={t.stars} />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="testimonial-avatar"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(t.name) + '&background=c9a84c&color=000';
                  }}
                />
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
