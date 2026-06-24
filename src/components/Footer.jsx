import { useState } from 'react';
import { MotionAsset } from './MotionSystem';
import Footer3D from './Footer3D';

const tools = ['Figma', 'React', 'Framer Motion', 'Node.js', 'Python', 'LangChain'];

const FORMSPREE_ID = 'xqevepeg';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'contact_form_submit');
        }
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-feedback contact-form-success" role="status">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="10" stroke="var(--clay)" strokeWidth="1.6" />
          <path d="M6.5 11l3 3 6-6" stroke="var(--clay)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Thanks — I&apos;ll get back to you soon.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What are you working on?"
          required
          rows={5}
        />
      </div>

      <div className="contact-form-footer">
        <button
          type="submit"
          className="contact-submit interactive"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending…' : 'Send message →'}
        </button>

        {status === 'error' && (
          <p className="contact-form-feedback contact-form-error" role="alert">
            Something went wrong.{' '}
            <a href={`mailto:${'lakshayoberoi1911'}@${'gmail.com'}`}>
              Try emailing me directly.
            </a>
          </p>
        )}
      </div>
    </form>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="deploy-sequence" aria-hidden="true">
        <div>
          <span>build</span>
          <span>test</span>
          <span>ship</span>
        </div>
        <MotionAsset src="/animations/deploy-sequence.json" className="deploy-lottie" playOnView speed={1.2} />
      </div>

      <div className="footer-cta">
        <div className="mobile-footer-visual" aria-hidden="true">
          <img src="/og-image.png" alt="" />
        </div>
        <h2>Let&apos;s build something useful, sharp, and AI-aware.</h2>
        <p>Currently building AI-powered products and open to impactful engineering opportunities.</p>
        <div className="mobile-footer-actions">
          <a className="interactive" href={`mailto:${'lakshayoberoi1911'}@${'gmail.com'}`}>
            Email me
          </a>
          <a
            className="interactive"
            href="/Lakshay_Oberoi_Resume.pdf"
            download="Lakshay_Oberoi_Resume.pdf"
          >
            Resume ↓
          </a>
        </div>
        <ContactForm />
      </div>

      <Footer3D tools={tools} />
    </footer>
  );
};

export default Footer;

