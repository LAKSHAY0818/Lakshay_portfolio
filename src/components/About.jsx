import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const capabilities = [
  {
    title: 'AI product frontends',
    copy: 'React interfaces for hiring workflows, model-backed insights, dashboards, and candidate matching experiences.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    visual: 'interface',
  },
  {
    title: 'Full-stack web apps',
    copy: 'End-to-end product features with Node, Express, SQL/NoSQL data, authentication, payments, and API integration.',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'],
    visual: 'stack',
  },
  {
    title: 'RAG and LLM workflows',
    copy: 'Resume analysis, semantic retrieval, prompt templates, vector search, and practical GenAI application flows.',
    tags: ['Python', 'LangChain', 'OpenAI', 'Gemini', 'RAG Systems'],
    visual: 'rag',
  },
  {
    title: 'APIs and data pipelines',
    copy: 'Clean data movement between user forms, backend services, ML predictions, and production UI states.',
    tags: ['REST APIs', 'Git', 'GitHub', 'Docker', 'Redux'],
    visual: 'pipeline',
  },
];

const flowSteps = [
  ['UI', 'Recruiter action'],
  ['API', 'Validated request'],
  ['Model', 'RAG + scoring'],
  ['Output', 'Useful insight'],
];

const CapabilityVisual = ({ type }) => {
  if (type === 'stack') {
    return (
      <div className="capability-visual stack-visual" aria-hidden="true">
        <span>UI</span>
        <span>API</span>
        <span>DB</span>
      </div>
    );
  }

  if (type === 'rag') {
    return (
      <div className="capability-visual rag-visual" aria-hidden="true">
        <i />
        <i />
        <i />
        <strong>LLM</strong>
      </div>
    );
  }

  if (type === 'pipeline') {
    return (
      <div className="capability-visual pipeline-visual" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className="capability-visual interface-visual" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
};

const About = () => {
  const introRef = useRef(null);
  const shapeRef = useRef(null);
  const flowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ['start 78%', 'end 35%'],
  });
  const { scrollYProgress: shapeProgress } = useScroll({
    target: shapeRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ['start 70%', 'end 35%'],
  });

  const lineOne = useTransform(scrollYProgress, [0, 0.33], [70, 0]);
  const lineTwo = useTransform(scrollYProgress, [0.2, 0.58], [80, 0]);
  const lineThree = useTransform(scrollYProgress, [0.45, 0.85], [90, 0]);
  const opacityOne = useTransform(scrollYProgress, [0, 0.33], [0, 1]);
  const opacityTwo = useTransform(scrollYProgress, [0.2, 0.58], [0, 1]);
  const opacityThree = useTransform(scrollYProgress, [0.45, 0.85], [0, 1]);
  const floatA = useTransform(shapeProgress, [0, 1], [0, -180]);
  const floatB = useTransform(shapeProgress, [0, 1], [0, -320]);
  const floatC = useTransform(shapeProgress, [0, 1], [0, -120]);
  const flowScaleX = useTransform(flowProgress, [0, 1], [0.08, 1]);
  const packetX = useTransform(flowProgress, [0, 1], ['0%', '305%']);

  return (
    <section id="about" className="about-section">
      <div ref={introRef} className="about-intro">
        <h2>
          <span>
            <motion.span style={{ y: lineOne, opacity: opacityOne }}>1 year building</motion.span>
          </span>
          <span>
            <motion.span style={{ y: lineTwo, opacity: opacityTwo }}>
              production interfaces, APIs,
            </motion.span>
          </span>
          <span>
            <motion.span style={{ y: lineThree, opacity: opacityThree }}>
              and AI workflows people can actually use.
            </motion.span>
          </span>
        </h2>
      </div>

      <div ref={shapeRef} className="about-shapes" aria-hidden="true">
        <motion.div className="shape shape-sphere" style={{ y: floatA }} />
        <motion.div className="shape shape-capsule" style={{ y: floatB }} />
        <motion.div className="shape shape-soft" style={{ y: floatC }} />
      </div>

      <div ref={flowRef} className="container os-flow-wrap">
        <div className="os-flow-copy">
          <div className="section-eyebrow">Lakshay OS</div>
          <h2>Every feature has a path from action to intelligence.</h2>
          <p>
            I connect polished interfaces, reliable APIs, and AI workflows into product experiences
            that feel clear from the first interaction.
          </p>
        </div>
        <div className="os-flow-panel">
          <div className="flow-rail">
            <motion.span style={{ scaleX: flowScaleX }} />
            <motion.i style={{ x: packetX }} />
          </div>
          <div className="flow-steps">
            {flowSteps.map(([title, copy], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0.35, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <strong>{title}</strong>
                <span>{copy}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="container capabilities-wrap">
        <div className="section-eyebrow">Engineer Profile</div>
        <div className="capabilities-header">
          <h2>I help product teams ship useful software across:</h2>
          <p>
            My strongest lane is full-stack product engineering with a GenAI edge:
            polished interfaces, reliable APIs, and model-driven workflows that stay understandable to users.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item, index) => (
            <motion.article
              className="capability-card"
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
            >
              <div className="capability-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <CapabilityVisual type={item.visual} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="capability-tags">
                {item.tags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
