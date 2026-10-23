import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const contactDetails = [
  {
    icon: <MapPin size={20} />,
    label: 'Our Office',
    value: 'Level 22, Burj Al Arab Tower\nJumeirah Beach Road, Dubai\nUnited Arab Emirates',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+971 4 400 0000\n+971 50 123 4567 (WhatsApp)',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'enquiries@bellavierre.ae\nleasing@bellavierre.ae',
  },
  {
    icon: <Clock size={20} />,
    label: 'Working Hours',
    value: 'Monday – Saturday: 9am – 7pm\nSunday: 11am – 5pm',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    interest: '', message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="gold-line" />
            Get In Touch
          </div>
          <h2 className="section-title">
            Start Your<br />
            <em>Property Journey</em>
          </h2>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {contactDetails.map((d) => (
              <div key={d.label} className="contact-detail">
                <div className="contact-detail-icon">{d.icon}</div>
                <div>
                  <div className="contact-detail-label">{d.label}</div>
                  <div className="contact-detail-value" style={{ whiteSpace: 'pre-line' }}>
                    {d.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Embed Placeholder */}
            <div style={{
              marginTop: 20,
              height: 200,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 12,
              color: 'rgba(255,255,255,0.3)',
              fontSize: 13,
            }}>
              <MapPin size={28} style={{ color: 'var(--gold)', opacity: 0.6 }} />
              <span style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Burj Al Arab Tower, Dubai
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  padding: '80px 40px',
                  background: 'rgba(201,168,76,0.05)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <CheckCircle size={56} color="var(--gold)" />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, color: 'var(--white)' }}>
                  Thank You!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 320 }}>
                  Your enquiry has been received. A Bellavierre advisor will contact you within 24 hours.
                </p>
                <button className="btn-outline" onClick={() => setSubmitted(false)}>
                  Send Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+971 50 000 0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>I'm Interested In</label>
                  <select name="interest" value={form.interest} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option>Buying a Property</option>
                    <option>Renting a Property</option>
                    <option>Selling / Listing</option>
                    <option>Off-Plan Investment</option>
                    <option>Property Management</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us more about your requirements..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Send Enquiry
                  <ArrowRight size={16} />
                </button>

                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.7 }}>
                  By submitting this form, you agree to our Privacy Policy. Your data will never be shared with third parties.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
