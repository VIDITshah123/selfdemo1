import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './index.css';
import './premium.css';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Marquee from './components/Marquee';
import Features from './components/Features';
import Properties from './components/Properties';
import ParallaxBanner from './components/ParallaxBanner';
import About from './components/About';
import Neighborhoods from './components/Neighborhoods';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const progressBarRef = useRef(null);

  // Loader simulation
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    if (loading) return;
    const bar = progressBarRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollTop / docHeight;
      gsap.set(bar, { scaleX: pct });
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [loading]);

  // Back-to-top visibility
  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Custom Premium Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="scroll-progress"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
      />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader progress={progress} />}
      </AnimatePresence>

      {/* Main App */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <SearchBar />
            <Marquee />
            <Features />
            <Properties />
            <ParallaxBanner />
            <About />
            <Neighborhoods />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}

      {/* Back to Top */}
      <button
        className={`back-to-top ${showTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={22} />
      </button>
    </>
  );
}
