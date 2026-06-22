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
      </div>
    </motion.nav>
  );
};

export default Nav;
