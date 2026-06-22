import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Software Engineer I — Growth & Ops',
    company: 'AagatiServe (TalentSkout)',
    date: 'Nov 2025',
    dateTo: 'Present',
    desc: 'Architected scalable React.js components serving 10,000+ users. Drove frontend performance optimization via code splitting, cutting bundle size by 25%. Built internal dashboards using React and REST APIs, saving 5+ hours/week. Reduced production bugs by 30%.',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'AagatiServe (TalentSkout)',
    date: 'Aug 2025',
    dateTo: 'Nov 2025',
    desc: 'Developed responsive pixel-perfect UI components, improving mobile usability scores by 15%. Translated Figma designs into reusable production-ready components. Integrated REST APIs with Redux state management. Resolved 25+ critical frontend bugs.',
  },
  {
    role: 'Campus Ambassador',
    company: 'TechLearn.live',
    date: 'Feb 2022',
    dateTo: 'Apr 2022',
    desc: 'Executed grassroots B2C marketing campaigns promoting edtech workshops to 150+ students, increasing event participation by 20%. Collected and analyzed participant feedback data to optimize content.',
  },
];

const Experience = () => {
  return (
    <section id="experience" style={{ padding: '4rem 0', width: '100%' }}>
      <div className="container" style={{ marginBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>04 — Where I've Been</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>My <span className="serif-italic">Journey</span></h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '0 2rem' }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="card"
            style={{ padding: '2.5rem', width: '100%', maxWidth: '800px', textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div style={{ color: 'var(--purple-light)', fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '1px' }}>
              {exp.date} — {exp.dateTo}
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--white)' }}>
              {exp.role}
            </h3>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--grey)', marginBottom: '1.2rem' }}>
              {exp.company}
            </h4>
            <p style={{ color: 'var(--grey-light)', lineHeight: 1.7, fontSize: '1rem', margin: '0 auto', maxWidth: '600px' }}>
              {exp.desc}
            </p>
          </motion.div>
        ))}

        {/* Education Card */}
        <motion.div
          className="card"
          style={{ padding: '2.5rem', width: '100%', maxWidth: '800px', textAlign: 'center', marginTop: '1rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ color: 'var(--purple-light)', fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '1px' }}>
            Sept 2021 — July 2025
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--white)' }}>
            B.E. Computer Science
          </h3>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--grey)', marginBottom: '1.2rem' }}>
            Chitkara University | Rajpura, Punjab
          </h4>
          <p style={{ color: 'var(--grey-light)', lineHeight: 1.7, fontSize: '1rem', margin: '0 auto', maxWidth: '600px' }}>
            GPA: 8.74/10.00. Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Software Engineering.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
