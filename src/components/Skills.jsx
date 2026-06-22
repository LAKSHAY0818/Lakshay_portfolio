import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  { category: 'Languages', items: 'JavaScript (ES6+), Python, Java, C++, SQL, HTML5, CSS3' },
  { category: 'Frameworks & Libraries', items: 'React.js, Node.js, Express.js, Redux, Tailwind CSS, REST APIs' },
  { category: 'Databases', items: 'MongoDB, MySQL, Firebase' },
  { category: 'Developer Tools', items: 'Git, GitHub, Agile/Scrum, Figma, Stripe API, OAuth, Google Analytics, HubSpot CRM' },
  { category: 'Growth & Ops Skills', items: 'Marketing Automation, CRM Management, SEO Tooling, Sales Funnel Analytics, Campaign Tracking, A/B Testing, Landing Page Optimization, Internal Tooling, Cross-functional Coordination' }
];



export default function Skills() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div style={{ width: '100%', padding: '2rem', textAlign: 'center' }}>
      <div className="section-label" style={{ justifyContent: 'center' }}>02 — Core Competencies</div>
      <h2 className="section-title" style={{ marginBottom: '2rem' }}>
        Technical <span className="serif-italic">Skills</span>
      </h2>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.category}
            className="spotlight-card interactive"
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              padding: '1.8rem 1.5rem',
              background: 'rgba(24, 24, 27, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
              alignItems: 'center'
            }}
            whileHover={{ scale: 1.05, borderColor: '#06b6d4', boxShadow: '0 0 20px rgba(6,182,212,0.2)' }}
          >
            {/* Accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
            
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Space Mono, monospace' }}>{skill.category}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              {skill.items.split(', ').map(item => (
                <span key={item} style={{
                  fontSize: '0.8rem',
                  fontFamily: 'Space Mono, monospace',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '50px',
                  border: '1px solid var(--border)',
                  color: 'var(--grey-light)',
                  background: 'rgba(255,255,255, 0.03)'
                }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
