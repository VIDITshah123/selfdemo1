import { motion } from 'framer-motion';

const SocialIcon = ({ letter }) => (
  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'serif', lineHeight: 1 }}>{letter}</span>
);

const footerLinks = {
  Properties: [
    'Penthouses',
    'Villas & Mansions',
    'Apartments',
    'Townhouses',
    'Off-Plan Projects',
    'Investment Properties',
  ],
  Company: [
    'About Bellavierre',
    'Our Team',
    'Awards & Recognitions',
    'Press & Media',
    'Careers',
    'Blog & Insights',
  ],
  Services: [
    'Property Management',
    'Interior Design',
    'Mortgage Advisory',
    'Legal Services',
    'Relocation Services',
    'Valuation',
  ],
};

const socials = [
  { label: 'In', href: '#', aria: 'Instagram' },
  { label: 'Li', href: '#', aria: 'LinkedIn' },
  { label: 'Fb', href: '#', aria: 'Facebook' },
  { label: 'Yt', href: '#', aria: 'YouTube' },
  { label: 'X', href: '#', aria: 'Twitter / X' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src="/logo.png" alt="Bellavierre Real Estate" className="footer-logo" />
            <p className="footer-brand-desc">
              Dubai's premier luxury real estate agency, curating extraordinary properties
              for discerning buyers and investors worldwide since 2009.
            </p>
            <div className="footer-social">
              {socials.map((s) => (
                <a
                  key={s.aria}
                  href={s.href}
                  className="footer-social-link"
                  aria-label={s.aria}
                >
                  <SocialIcon letter={s.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4>{title}</h4>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Bellavierre Real Estate LLC. All rights reserved.
            RERA Licence No. 12345 | DLD Broker ID: 98765
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
