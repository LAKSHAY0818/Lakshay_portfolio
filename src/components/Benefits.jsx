import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const experience = [
  {
    role: 'Software Engineer',
    company: 'AagatiServe / TalentSkout',
    period: 'Nov 2024 - Present',
    badge: 'Production AI platform',
    details:
      'Built scalable React components and integrated AI-powered workflows for a production hiring platform supporting thousands of users. Reduced bundle size by 25% and collaborated across product and data teams.',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'AagatiServe / TalentSkout',
    period: 'Aug 2024 - Nov 2024',
    badge: 'Workflow UI + APIs',
    details:
      'Developed recruitment workflows, integrated 15+ REST APIs, managed Redux state across multiple data sources, and resolved 25+ frontend issues impacting user experience.',
  },
  {
    role: 'B.E. Computer Science',
    company: 'Chitkara University',
    period: 'Sept 2021 - July 2025',
    badge: 'CS + ML foundations',
    details:
      'B.E. Computer Science with a CGPA of 8.74/10, with coursework in Data Structures, DBMS, Operating Systems, Computer Networks, and Machine Learning fundamentals.',
  },
];

const strengths = [
  'I move seamlessly between UI details, APIs, and product goals to ship reliable experiences.',
  "I've shipped production AI features inside real products—not just demos.",
  'I design clean data flows because AI systems are only as reliable as their inputs.',
  'I thrive at the intersection of product, engineering, and AI.',
];

const metrics = [
  ['10K+', 'Users Supported'],
  ['25+', 'Frontend Issues Resolved'],
  ['25%', 'Bundle Reduction'],
  ['8.74', 'CGPA'],
  ['Production', 'AI Experience'],
];

const Benefits = () => {
  const benefitsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: benefitsRef,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress: entranceProgress } = useScroll({
    target: benefitsRef,
    offset: ['start end', 'start start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 32,
    mass: 0.62,
    restDelta: 0.001,
  });
  
  const entranceOpacity = useTransform(entranceProgress, [0.08, 0.72], [0, 1]);
  const headlineOneX = useTransform(smoothProgress, [0, 0.26, 0.5, 0.8], ['-108vw', '0vw', '0vw', '108vw']);
  const headlineTwoX = useTransform(smoothProgress, [0, 0.26, 0.5, 0.8], ['108vw', '0vw', '0vw', '-108vw']);
  const headlineY = useTransform(smoothProgress, [0, 0.52, 0.8], ['0vh', '0vh', '-10vh']);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.14, 0.58, 0.76], [0, 1, 1, 0]);
  const saveLineY = useTransform(smoothProgress, [0.58, 0.78], ['12vh', '0vh']);
  const saveLineOpacity = useTransform(smoothProgress, [0.58, 0.72], [0, 1]);
  const dividerScale = useTransform(smoothProgress, [0.54, 0.72], [0, 1]);

  return (
    <section className="cred-section">
      <section
        ref={benefitsRef}
        id="working-style"
        className="juan-benefits-section"
        aria-label="Working style"
      >
        <motion.div className="benefit-pinned-scene" style={{ opacity: entranceOpacity }}>
          <img
            className="benefit-photo-base"
            src="/lakshayside.png"
            alt=""
            aria-hidden="true"
          />
          <div className="benefit-photo-shade" />
          <motion.div
            className="benefit-headline benefit-headline-one"
            style={{ y: headlineY, opacity: headlineOpacity }}
          >
            <motion.div className="benefit-headline-line" style={{ x: headlineOneX }}>
              <h2>Good engineers</h2>
            </motion.div>
            <motion.div className="benefit-headline-line benefit-headline-line-lower" style={{ x: headlineTwoX }}>
              <h2>take time</h2>
            </motion.div>
          </motion.div>
          <motion.div className="benefit-divider" style={{ scaleX: dividerScale }} />
          <motion.div
            className="benefit-headline benefit-headline-two"
            style={{ y: saveLineY, opacity: saveLineOpacity }}
          >
            <h2>Great ones save it.</h2>
          </motion.div>
        </motion.div>
      </section>

      <div className="metrics-marquee" aria-hidden="true">
        <div>
          {[...metrics, ...metrics].map(([value, label], index) => (
            <span key={`${value}-${index}`}>
              <strong>{value}</strong>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="cred-statement">
        <h2>
          Good software <br />
          feels clear <br />
          even when the system is complex.
        </h2>
      </div>

      <div className="cred-grid container">
        <div className="cred-copy">
          <div className="section-eyebrow">Why Work With Me</div>
          <h2>
            I bridge product thinking, engineering execution, and AI systems.
          </h2>
          <div className="cred-orbit" aria-hidden="true">
            <span>React</span>
            <span>API</span>
            <span>AI</span>
            <span>Data</span>
          </div>
          <a className="text-link interactive" href="#about">Learn more about me</a>
        </div>

        <ul className="strength-list">
          {strengths.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="experience-wrap container">
        <div className="section-eyebrow">Experience</div>
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={`${item.role}-${item.period}`}>
              <div>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <small>{item.badge}</small>
              </div>
              <div>
                <h4>{item.company}</h4>
                <p>{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
