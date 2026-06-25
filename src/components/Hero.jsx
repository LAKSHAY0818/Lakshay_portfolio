import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Hero = () => {
  const [hoveredName, setHoveredName] = useState(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const nameLeftX = useTransform(mouseX, [-1, 1], [-16, 10]);
  const nameRightX = useTransform(mouseX, [-1, 1], [-10, 16]);

  return (
    <section className="hero-shell" onMouseMove={handleMouseMove}>
      <div className="hero-media" aria-hidden="true">
        <img src="/lakshay_pftimg.png" alt="" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-kicker"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p>Full-Stack Engineer</p>
          <h2>Building AI products that people actually use.</h2>
          <span>Open to Full-Stack, Frontend, and GenAI Engineering opportunities.</span>
        </motion.div>

        <h1 className="hero-name-row">
          <motion.span
            className="hero-name hero-name-left interactive"
            style={{ x: nameLeftX }}
            onMouseEnter={() => setHoveredName('left')}
            onMouseLeave={() => setHoveredName(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              scaleX: hoveredName === 'left' ? 0.58 : hoveredName === 'right' ? 1.08 : 1,
              scaleY: hoveredName === 'left' ? 1.12 : hoveredName === 'right' ? 0.98 : 1,
            }}
            transition={{
              opacity: { duration: 0.9, ease: [0.33, 1, 0.68, 1] },
              y: { duration: 0.9, ease: [0.33, 1, 0.68, 1] },
              scaleX: { type: 'spring', stiffness: 190, damping: 18, mass: 0.45 },
              scaleY: { type: 'spring', stiffness: 190, damping: 18, mass: 0.45 },
            }}
          >
            Lakshay
          </motion.span>

          <motion.span
            className="hero-name hero-name-right interactive"
            style={{ x: nameRightX }}
            onMouseEnter={() => setHoveredName('right')}
            onMouseLeave={() => setHoveredName(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              scaleX: hoveredName === 'right' ? 0.58 : hoveredName === 'left' ? 1.08 : 1,
              scaleY: hoveredName === 'right' ? 1.12 : hoveredName === 'left' ? 0.98 : 1,
            }}
            transition={{
              opacity: { duration: 0.9, delay: 0.08, ease: [0.33, 1, 0.68, 1] },
              y: { duration: 0.9, delay: 0.08, ease: [0.33, 1, 0.68, 1] },
              scaleX: { type: 'spring', stiffness: 190, damping: 18, mass: 0.45 },
              scaleY: { type: 'spring', stiffness: 190, damping: 18, mass: 0.45 },
            }}
          >
            Oberoi
          </motion.span>
        </h1>

        <motion.div
          className="hero-footer-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span>React / Node / Python / LangChain</span>
          <a className="interactive" href="#work">View work</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
