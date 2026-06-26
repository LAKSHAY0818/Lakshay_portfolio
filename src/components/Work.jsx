import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const shippedWork = [
  {
    number: '01',
    title: 'Aagati',
    eyebrow: 'Public production work',
    type: 'Company website',
    url: 'https://aagati.com/',
    proof: 'Visit live site',
    visual: 'aagati',
    description:
      'Built, deployed, and now own the public Aagati company website solo across homepage, careers, service pages, and business-facing sections.',
    impact:
      'Improved the public face of Aagati for enterprise clients including TCS, HCL, and GlobalLogic.',
    stack: ['React', 'HTML', 'CSS', 'JavaScript', 'GoDaddy', 'Deployment'],
  },
  {
    number: '02',
    title: 'TalentSkout Website',
    eyebrow: 'Aagati product',
    type: 'Product website',
    url: 'https://talentskout.ai/',
    proof: 'Visit live site',
    visual: 'talentskout',
    description:
      'Built and deployed the TalentSkout marketing website, shaping the homepage around AI-powered candidate pre-screening and owning ongoing content updates.',
    impact:
      'Helped present the product as a clearer AI hiring platform for business users, partners, and placement teams.',
    stack: ['React', 'HTML', 'CSS', 'JavaScript', 'Responsive UI', 'Hostinger'],
  },
  {
    number: '03',
    title: 'TalentSkout Platform',
    eyebrow: 'Production platform',
    type: 'AI pre-screening platform',
    visual: 'platform',
    description:
      'Built core platform features across recruiter workflows and TS Pathfinder, including Resume Builder, notifications, interview proctoring, TTS, global search, and third-party API integrations.',
    impact:
      'Live production work supporting college beta testing, student pre-screening, and career-readiness workflows.',
    stack: ['React', 'Tailwind CSS', 'Redux', 'Python', 'FastAPI', 'LLM wrappers', 'Security'],
    flows: [
      {
        title: 'Recruiter Platform',
        copy: 'Pre-screening dashboards, candidate review, resume/job matching, pipeline states, and AI-assisted evaluation.',
      },
      {
        title: 'TS Pathfinder',
        copy: 'Registration, secure login, profiles, AI mock interviews, coding assessments, AI feedback, counselor workflow, and resume builder.',
      },
    ],
  },
  {
    number: '04',
    title: 'Client Project — Food Safety App',
    eyebrow: 'Client project',
    type: 'Phase 1 complete',
    proof: 'Know More',
    action: 'contact-modal',
    visual: 'zytama',
    description:
      "Contributed to Phase 1 of India's doctor-reviewed food safety app for mothers and children, converting Figma designs into Flutter screens and integrating REST APIs.",
    impact:
      'Built UI components for a product that helps mothers scan food products and get a personalised safety score quickly.',
    stack: ['Flutter', 'Dart', 'REST APIs', 'Figma to UI', 'Mobile UI'],
  },
  {
    number: '05',
    title: 'Confidential Wellness Suite',
    eyebrow: 'Client ecosystem',
    type: 'Website + mobile app + web app',
    visual: 'confidential',
    description:
      'Built a public consumer-facing website from Figma with a teammate and contributed to the private mobile app and web app product work before launch.',
    impact:
      'Supported a client product ecosystem across marketing, app, and web product surfaces while keeping the client identity private.',
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Figma to UI', 'Private app work'],
  },
];

const previewCards = ['Resume intake', 'Role match', 'AI score', 'Shortlist'];

const WorkbookPreview = () => (
  <motion.a
    className="workbook-card interactive"
    href="#shipped-work"
    aria-label="Open shipped work"
    whileHover={{ y: -8, rotate: -1.2 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="workbook-papers" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <div className="workbook-folder-front">
      <span className="workbook-label">Portfolio</span>
      <div className="workbook-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
    <div className="workbook-pages" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  </motion.a>
);

const ProofVisual = ({ item }) => (
  <div className={`proof-visual proof-visual-${item.visual}`} aria-hidden="true">
    <div className="proof-browser-bar">
      <span />
      <span />
      <span />
      <em>{item.url ? new URL(item.url).hostname : item.eyebrow}</em>
    </div>
    <div className="proof-screen">
      <div className="proof-brand-row">
        <strong>{item.title}</strong>
        <small>{item.type}</small>
      </div>
      <div className="proof-hero-line">
        <span />
        <span />
      </div>
      <div className="proof-ui-grid">
        <i />
        <i />
        <i />
      </div>
      <div className="proof-flow-strip">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
);

const ConfidentialProjectModal = ({ onClose, onContact }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="work-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="work-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-modal-title"
      >
        <button
          className="work-modal-close interactive"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          x
        </button>
        <h3 id="work-modal-title">Want to know more?</h3>
        <p>
          This is a confidential client project. Drop me a message and I&apos;ll share more
          details.
        </p>
        <button className="contact-submit interactive" type="button" onClick={onContact}>
          Get in Touch
        </button>
      </div>
    </div>
  );
};

const ShippedWorkCard = ({ item, index, onKnowMore }) => (
  <motion.article
    className="shipped-card"
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.58, delay: index * 0.08 }}
    onClick={() => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'project_click', { project_name: item.title });
      }
    }}
  >
    <div className="shipped-index">{item.number}</div>
    <ProofVisual item={item} />
    <div className="shipped-copy">
      <div className="project-meta">
        <span>{item.eyebrow}</span>
        <span>{item.type}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <strong className="project-metric">{item.impact}</strong>
      {item.flows && (
        <div className="proof-flow-cards">
          {item.flows.map((flow) => (
            <div key={flow.title}>
              <span>{flow.title}</span>
              <p>{flow.copy}</p>
            </div>
          ))}
        </div>
      )}
      <div className="project-stack proof-stack">
        {item.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {item.action === 'contact-modal' ? (
        <button className="proof-link proof-link-button interactive" type="button" onClick={onKnowMore}>
          {item.proof}
          <span aria-hidden="true">-&gt;</span>
        </button>
      ) : item.url ? (
        <a className="proof-link interactive" href={item.url} target="_blank" rel="noreferrer">
          {item.proof}
          <span aria-hidden="true">-&gt;</span>
        </a>
      ) : (
        <span className="proof-link proof-link-private">{item.eyebrow}</span>
      )}
    </div>
  </motion.article>
);

const Work = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleContactScroll = () => {
    setIsProjectModalOpen(false);

    window.requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <section id="work" className="work-section">
      <div className="work-prelude">
        <p>Curious?... Check out my</p>
        <div className="work-word" aria-label="Work">
          <span>W</span>
          <WorkbookPreview />
          <span>rk</span>
        </div>
        <p>Or keep scrolling</p>
      </div>

      <div className="project-showcase">
        <motion.div
          className="project-stage"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.75 }}
        >
          <div className="stage-window">
            <div className="stage-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="stage-grid">
              {previewCards.map((card, index) => (
                <motion.div
                  key={card}
                  className="stage-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                >
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{card}</strong>
                </motion.div>
              ))}
            </div>
            <div className="stage-flow" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.div>

        <div className="project-showcase-copy">
          <div className="section-eyebrow">Shipped Work</div>
          <h2>Real websites, product platforms, and private app work.</h2>
        </div>
      </div>

      <div id="shipped-work" className="shipped-work-wrap">
        <div className="section-kicker-row">
          <div>
            <div className="section-eyebrow">Proof of Work</div>
            <h2>Production work with real outcomes.</h2>
          </div>
        </div>
        <div className="shipped-list">
          {shippedWork.map((item, index) => (
            <ShippedWorkCard
              item={item}
              index={index}
              key={item.title}
              onKnowMore={() => setIsProjectModalOpen(true)}
            />
          ))}
        </div>
      </div>

      {isProjectModalOpen && (
        <ConfidentialProjectModal
          onClose={() => setIsProjectModalOpen(false)}
          onContact={handleContactScroll}
        />
      )}
    </section>
  );
};

export default Work;
