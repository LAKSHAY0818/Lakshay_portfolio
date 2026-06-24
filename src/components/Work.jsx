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
      'Single owner for the public Aagati website - building, maintaining, updating, and deploying the homepage, careers, service pages, and business-facing sections.',
    impact:
      'Improved public-facing brand quality, usability, and business presentation across the company site.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Animations', 'Deployment'],
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
      'Owned the public product website experience for TalentSkout with responsive pages, content updates, visual polish, animations, and deployment support.',
    impact:
      'Helped present the product as a clearer, more credible AI pre-screening platform for business users and partners.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Animations', 'Responsive UI'],
  },
  {
    number: '03',
    title: 'TalentSkout Platform',
    eyebrow: 'Private production preview',
    type: 'AI pre-screening platform',
    visual: 'platform',
    description:
      'Worked on the live platform across recruiter workflows and TS Pathfinder, the student-facing product experience.',
    impact:
      'Beta-tested with colleges and built for large-scale student pre-screening and career-readiness workflows.',
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

const projects = [
  {
    number: '01',
    title: 'AI Resume Analyzer with RAG',
    type: 'GenAI application',
    year: '2026',
    metric: 'Semantic resume matching',
    description:
      'RAG-based resume analysis flow that matches candidates with job descriptions using LLM extraction, vector retrieval, and tuned prompts.',
    stack: ['Python', 'LangChain', 'Hugging Face', 'Pinecone', 'OpenAI API'],
  },
  {
    number: '02',
    title: 'TalentSkout AI Hiring Platform',
    type: 'Production product frontend',
    year: '2024 - 2026',
    metric: '10,000+ users',
    description:
      'AI-powered recruitment UI and data workflows serving 10,000+ users, with React components, Redux state, API integration, and model-backed insights.',
    stack: ['React', 'Redux', 'REST APIs', 'Python', 'Figma'],
  },
  {
    number: '03',
    title: 'Sentiment Analysis Chatbot',
    type: 'NLP service',
    year: '2025',
    metric: 'Sub-200ms API target',
    description:
      'BERT-powered chatbot for sentiment classification and response quality control, exposed through a Flask API with sub-200ms target latency.',
    stack: ['Python', 'TensorFlow', 'NLTK', 'Flask', 'Transformers'],
  },
  {
    number: '04',
    title: 'FashionStore E-Commerce',
    type: 'Full-stack platform',
    year: '2024',
    metric: 'Recommendation engine',
    description:
      'E-commerce platform with product recommendation features, REST APIs, SQL queries, data extraction scripts, auth, and application-model communication.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Python'],
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

const ShippedWorkCard = ({ item, index }) => (
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
      {item.url ? (
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

const ProjectPreview = ({ project }) => (
  <div className="case-preview" aria-hidden="true">
    <div className="case-preview-top">
      <span>{project.number}</span>
      <strong>{project.metric}</strong>
    </div>
    <div className="case-preview-screen">
      <i />
      <i />
      <i />
      <em>{project.title.split(' ')[0]}</em>
    </div>
    <div className="case-preview-flow">
      {project.stack.slice(0, 4).map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </div>
);

const Work = () => {
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
            <ShippedWorkCard item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>

      <div id="project-list" className="project-list technical-builds-list">
        <div className="section-kicker-row technical-builds-header">
          <div>
            <div className="section-eyebrow">Technical Builds</div>
            <h2>Technical builds across AI, APIs, and product workflows.</h2>
          </div>
        </div>
        {projects.map((project) => (
          <motion.article
            className="project-row case-panel interactive"
            key={project.title}
            onClick={() => {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'project_click', { project_name: project.title });
              }
            }}
          >
            <div className="project-number">{project.number}</div>
            <ProjectPreview project={project} />
            <div className="project-main">
              <div className="project-meta">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <strong className="project-metric">{project.metric}</strong>
              <p>{project.description}</p>
            </div>
            <div className="project-stack">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Work;
