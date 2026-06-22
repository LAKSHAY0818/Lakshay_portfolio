import React from 'react';
import { motion } from 'framer-motion';

const ContactInfo = ({ label, value, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="interactive"
    whileHover={{ scale: 1.05, y: -2 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      minWidth: '240px',
      transition: 'background 0.3s',
      textDecoration: 'none'
    }}
  >
    <div style={{ color: 'var(--purple-light)', fontSize: '0.8rem', fontFamily: 'Space Mono, monospace', letterSpacing: '2px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
      {label}
    </div>
    <div style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 600 }}>
      {value}
    </div>
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '8rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--purple)',
          boxShadow: '0 0 50px var(--purple-glow)',
          borderRadius: '30px',
          padding: '5rem 2rem',
          maxWidth: '1000px',
          width: '100%',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="section-label" style={{ justifyContent: 'center' }}>05 — Contact Me</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Let's Build Something <span className="serif-italic">Extraordinary.</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--grey)', maxWidth: '600px', margin: '0 auto 3.5rem auto', lineHeight: 1.7 }}>
          Whether you're looking to build a new product, scale an existing platform, or just want to connect — I'm always open to discussing new opportunities and exciting ideas.
        </p>
        
        {/* Contact Info Grid */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <ContactInfo 
            label="Email" 
            value="lakshayoberoi1911@gmail.com" 
            href="mailto:lakshayoberoi1911@gmail.com" 
          />
          <ContactInfo 
            label="LinkedIn" 
            value="/in/lakshayoberoi1911" 
            href="https://linkedin.com/in/lakshayoberoi1911" 
          />
          <ContactInfo 
            label="Phone" 
            value="+91-8168937976" 
            href="tel:+918168937976" 
          />
          <ContactInfo 
            label="Location" 
            value="Yamuna Nagar, Haryana" 
            href="https://maps.google.com/?q=Yamuna+Nagar,+Haryana,+India" 
          />
        </div>
        
        <a
          href="mailto:lakshayoberoi1911@gmail.com"
          className="btn-primary interactive"
          style={{ padding: '1.2rem 4rem', fontSize: '1.1rem' }}
        >
          Send a Message ↗
        </a>
      </motion.div>

      <motion.footer
        style={{ marginTop: '6rem', color: 'var(--grey)', fontSize: '0.85rem', fontFamily: 'Space Mono, monospace' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>© 2026 Lakshay Oberoi — Crafted with React, Three.js & Framer Motion</p>
      </motion.footer>
    </section>
  );
};

export default Contact;
