import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

class LottieErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Lottie player failed to render, falling back to static animation:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Preloader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const audioStartedRef = useRef(false);
  const ctxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);
  const dotLottieRef = useRef(null);

  // Setup scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Web Audio API minimal synth sweep
  useEffect(() => {
    const startAudio = () => {
      if (audioStartedRef.current) return;
      audioStartedRef.current = true;

      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        ctxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const now = ctx.currentTime;

        // Main gain node for volume control & fade
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0, now);
        mainGain.gain.linearRampToValueAtTime(0.24, now + 1.8);
        mainGain.gain.setValueAtTime(0.24, now + 4.2);
        mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.6);
        mainGain.connect(ctx.destination);
        gainNodeRef.current = mainGain;

        // Low-pass filter with slight resonance to sweep frequencies
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(2.5, now);
        filter.frequency.setValueAtTime(65, now);
        filter.frequency.exponentialRampToValueAtTime(350, now + 3.8);
        filter.connect(mainGain);

        // Fundamental oscillator (triangle wave)
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(55, now); // A1 note
        osc1.connect(filter);
        osc1.start(now);
        osc1Ref.current = osc1;

        // Octave harmonic oscillator (sine wave)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(110, now); // A2 note
        osc2.detune.setValueAtTime(8, now); // Chorus detune
        osc2.connect(filter);
        osc2.start(now);
        osc2Ref.current = osc2;

      } catch (e) {
        console.warn('Audio synthesis failed to initialize:', e);
      }

      // Cleanup window interaction listeners
      window.removeEventListener('click', startAudio);
      window.removeEventListener('mousemove', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };

    // Listen for any interactions to boot up the audio
    window.addEventListener('click', startAudio);
    window.addEventListener('mousemove', startAudio);
    window.addEventListener('touchstart', startAudio);

    // Auto-trigger fallback: if user doesn't interact, try to start immediately (browser might block it)
    setTimeout(startAudio, 100);

    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('mousemove', startAudio);
      window.removeEventListener('touchstart', startAudio);
      
      // Clean up audio nodes on unmount if they exist
      try {
        if (osc1Ref.current) osc1Ref.current.stop();
        if (osc2Ref.current) osc2Ref.current.stop();
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
          ctxRef.current.close();
        }
      } catch (e) {}
    };
  }, []);

  // Backup timeout in case the Lottie fails or complete callback isn't fired
  useEffect(() => {
    const backupTimeout = setTimeout(() => {
      handleExit();
    }, 6200);

    return () => clearTimeout(backupTimeout);
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    // Let Framer Motion exit animation complete before removing preloader from DOM
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            y: '-100vh', 
            scale: 0.98,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#050505',
            zIndex: 99998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div className="preloader-container">
            <LottieErrorBoundary fallback={
              <div className="lottie-fallback-text" style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#ffc09d',
                letterSpacing: '0.12em',
                textAlign: 'center',
                textTransform: 'uppercase',
                textShadow: '0 0 15px rgba(255, 192, 157, 0.35)',
                animation: 'pulse 1.8s ease-in-out infinite'
              }}>
                BE BOLD
              </div>
            }>
              <DotLottieReact
                src="/animations/Be%20Bold.lottie"
                loop={false}
                autoplay={true}
                dotLottieRefCallback={(dotLottie) => {
                  if (!dotLottie) return;
                  dotLottieRef.current = dotLottie;
                  dotLottie.addEventListener('complete', () => {
                    handleExit();
                  });
                }}
              />
            </LottieErrorBoundary>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
