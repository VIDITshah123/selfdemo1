import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'Neighborhoods', href: '#neighborhoods' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNav(e, '#hero')}>
            <img src="/logo.png" alt="Bellavierre Real Estate" className="navbar-logo" />
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="navbar-cta"
            onClick={(e) => handleNav({ preventDefault: () => {} }, '#contact')}
            style={{ display: 'none' }}
          />
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="navbar-cta"
          >
            Book a Viewing
          </a>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            <img src="/logo.png" alt="Bellavierre" style={{ height: 60, marginBottom: 20, filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.3))' }} />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="btn-primary"
              style={{ marginTop: 16 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Book a Viewing
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
