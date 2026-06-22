import { motion } from 'framer-motion';

const projects = [
  {
    num: '01',
    title: 'TalentSkout',
    subtitle: 'AI-Driven Hiring Platform',
    desc: 'Architected and deployed scalable React.js components serving 10,000+ users. Full product ownership across 20+ screens with focus on growth and operations.',
    stack: ['React', 'Redux', 'Tailwind CSS', 'REST APIs', 'Figma'],
    color: '#8b5cf6',
    year: '2025',
  },
  {
    num: '02',
    title: 'FashionStore',
    subtitle: 'Full-Stack E-Commerce & Growth Platform',
    desc: 'Production-ready e-commerce with JWT auth and Stripe payments. Engineered SQL queries reducing search time by 30%. Implemented Redux for state management. Stress-tested for 500+ concurrent transactions.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Redux', 'Stripe API'],
    color: '#06b6d4',
    year: '2024',
  },
  {
    num: '03',
    title: 'QuickWings',
    subtitle: 'Real-Time Social Media & Engagement',
    desc: 'Real-time social platform with tweets, likes, and profiles. Integrated Google OAuth via Firebase, reducing onboarding friction by 50%. SPA architecture with optimistic UI updates doubled user engagement.',
    stack: ['React', 'Node.js', 'Express', 'Firebase', 'Tailwind CSS'],
    color: '#22d3ee',
    year: '2024',
  },
];

const ProjectCard = ({ project }) => {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      className="project-card interactive spotlight-card"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6 }}
    >
      {/* Image area */}
      <div className="project-card-img">
        {/* Background gradient matching project colour */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${project.color}40 0%, #09090b 100%)`,
        }} />
        <span className="project-card-num" style={{ position: 'relative', zIndex: 1, color: `${project.color}90` }}>
          {project.num}
        </span>
        {/* Small decorative dots */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.4rem', zIndex: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}/>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }}/>
        </div>
        {/* Year badge */}
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 2,
          fontFamily: 'Space Mono, monospace', fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.5)', letterSpacing: '1px'
        }}>
          {project.year} — web
        </div>
      </div>

      {/* Body */}
      <div className="project-card-body">
        <div className="project-card-num-label">{project.num} — {project.subtitle}</div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-sub">{project.desc}</p>
        <div className="project-tags">
          {project.stack.map(t => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-header container" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>03 — Things I've Built</div>
        <h2 className="section-title">My <span className="serif-italic">Work</span></h2>
      </div>

      <div className="projects-scroll-track">
        {projects.map(p => (
          <ProjectCard key={p.num} project={p} />
        ))}

        {/* "More coming soon" card */}
        <motion.div
          className="project-card"
          style={{ minWidth: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border)', background: 'transparent' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--grey)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>＋</div>
            <div style={{ fontSize: '0.9rem' }}>More projects<br/>coming soon</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
