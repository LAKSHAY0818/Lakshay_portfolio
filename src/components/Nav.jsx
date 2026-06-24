import { motion } from 'framer-motion';

const Nav = () => {
  return (
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
          onClick={() => {
            if (typeof window.gtag === 'function') {
              window.gtag('event', 'resume_download');
            }
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M5.5 1v6.5M2.5 5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.5 9.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          CV
        </a>
      </div>
    </motion.nav>
  );
};

export default Nav;
