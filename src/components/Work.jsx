import { motion } from 'framer-motion';

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

const previewCards = ['Resume.pdf', 'JD vector', 'Score 87%', 'Shortlist'];

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
        <p>Curious? Start with the projects.</p>
        <a className="work-folder interactive" href="#project-list" aria-label="Jump to project list">
          <span>Work</span>
        </a>
        <p>Or keep scrolling.</p>
      </div>

      <div className="work-title-row">
        <span>W</span>
        <span>o</span>
        <span>rk</span>
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
          <div className="section-eyebrow">Selected Builds</div>
          <h2>Not just cards. Each project shows the product system behind it.</h2>
          <p>
            The work section now behaves like a product lab: data comes in, APIs move it,
            models interpret it, and the interface makes it useful.
          </p>
        </div>
      </div>

      <div id="project-list" className="project-list">
        {projects.map((project) => (
          <motion.article
            className="project-row case-panel interactive"
            key={project.title}
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
