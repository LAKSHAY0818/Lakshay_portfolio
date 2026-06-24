import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LO_LINK_URL = 'https://linkedin.com/in/lakshayoberoi1911';

const Nav = () => {
  const [activeSection, setActiveSection] = useState('');
  const [pillVisible, setPillVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        setPillVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setPillVisible(true);
      }

      lastScrollY = Math.max(currentScrollY, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targets = ['about', 'work', 'shipped-work']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        setActiveSection(visibleEntry.target.id === 'about' ? 'about' : 'work');
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const trackResumeDownload = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'resume_download');
    }
  };

  return (
    <>
      <motion.nav
        className="site-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      >
        <a className="nav-brand interactive" href="/" aria-label="Lakshay Oberoi home">
          <span>Lakshay</span>
          <span>Oberoi</span>
        </a>

        <div className="nav-center">
          <a className="interactive" href="#about">About</a>
          <a className="nav-mark interactive" href="/" aria-label="Home">lo</a>
          <a className="interactive" href="#work">Work</a>
        </div>

        <div className="nav-links">
          <a className="interactive" href="mailto:lakshayoberoi1911@gmail.com">Email</a>
          <a
            className="interactive"
            href="https://linkedin.com/in/lakshayoberoi1911"
            target="_blank"
            rel="noopener noreferrer"
          >
            in
          </a>
          <a
            className="interactive"
            href="https://github.com/lakshayoberoi1911"
            target="_blank"
            rel="noopener noreferrer"
          >
            GH
          </a>
          <a
            className="nav-resume interactive"
            href="/Lakshay_Oberoi_Resume.pdf"
            download="Lakshay_Oberoi_Resume.pdf"
            aria-label="Download resume PDF"
            onClick={trackResumeDownload}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 1v6.5M2.5 5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 9.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            CV
          </a>
        </div>
      </motion.nav>

      <nav
        className={`mobile-pill-nav${pillVisible ? '' : ' mobile-pill-nav-hidden'}`}
        aria-label="Mobile primary navigation"
      >
        <button
          className={`mobile-pill-item interactive${activeSection === 'about' ? ' is-active' : ''}`}
          type="button"
          onClick={() => scrollToSection('about')}
        >
          About
        </button>
        <a
          className="mobile-pill-item interactive"
          href={LO_LINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Lakshay Oberoi profile"
        >
          /lo
        </a>
        <button
          className={`mobile-pill-item interactive${activeSection === 'work' ? ' is-active' : ''}`}
          type="button"
          onClick={() => scrollToSection('shipped-work')}
        >
          Work
        </button>
        <a
          className="mobile-pill-item mobile-pill-resume interactive"
          href="/Lakshay_Oberoi_Resume.pdf"
          download="Lakshay_Oberoi_Resume.pdf"
          onClick={trackResumeDownload}
        >
          Resume ↓
        </a>
      </nav>
    </>
  );
};

export default Nav;
