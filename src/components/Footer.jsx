import { MotionAsset } from './MotionSystem';
import Footer3D from './Footer3D';

const tools = ['Figma', 'React', 'Framer Motion', 'Node.js', 'Python', 'LangChain'];

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
        <h2>Let&apos;s build something useful, sharp, and AI-aware.</h2>
        <p>Currently building AI-powered products and open to impactful engineering opportunities.</p>
        <a className="footer-email interactive" href="mailto:lakshayoberoi1911@gmail.com">
          Let&apos;s talk
          <span>lakshayoberoi1911@gmail.com</span>
        </a>
      </div>

      <Footer3D tools={tools} />
    </footer>
  );
};

export default Footer;
