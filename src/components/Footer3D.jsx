import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, MathUtils, DoubleSide } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Interactive Avatar Mesh
function AvatarMesh() {
  const meshRef = useRef();
  const geometryRef = useRef();

  // Load the transparent cartoon avatar image texture (with cache-busting query parameter)
  const texture = useLoader(TextureLoader, '/lakshay_avatar_clean.png?v=2');

  // Curve the plane geometry slightly backward at the left/right edges
  useEffect(() => {
    if (geometryRef.current) {
      const pos = geometryRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        // cylindrical curve backward: z = -0.15 * x^2
        pos.setZ(i, -0.15 * Math.pow(x, 2));
      }
      geometryRef.current.computeVertexNormals();
    }
  }, []);

  // Track the mouse coordinates and smoothly update mesh rotation and position
  useFrame((state) => {
    if (!meshRef.current) return;

    const { x, y } = state.pointer; // normalized coordinates from -1 to 1

    // Target rotation (yaw and pitch)
    const targetY = x * 0.4; // horizontal rotation
    const targetX = -y * 0.28; // vertical tilt

    // Smooth linear interpolation (lerp)
    meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.07);
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.07);

    // Parallax translation to enhance depth feel
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, x * 0.3, 0.07);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, y * 0.15, 0.07);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[3.2, 3.2, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        roughness={0.55}
        metalness={0.12}
        side={DoubleSide}
      />
    </mesh>
  );
}

// Complete 3D Scene layout
function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />

      {/* Front key light to light up the character mesh */}
      <directionalLight position={[2, 3, 5]} intensity={1.8} />

      {/* Warm back-lights from both sides to illuminate the curved edges of the mesh for rim lighting */}
      <directionalLight position={[-4, 2, -1]} intensity={1.5} color="#ffc09d" />
      <directionalLight position={[4, 2, -1]} intensity={1.5} color="#ffc09d" />

      {/* Soft warm spotlight directly behind the character for cinematic glow */}
      <spotLight
        position={[0, 0, -2.6]}
        angle={Math.PI / 2.5}
        penumbra={1}
        intensity={24}
        color="#ffc09d"
        distance={8}
      />

      <AvatarMesh />
    </>
  );
}

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Canvas rendering failed, falling back to static avatar:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Footer3D = ({ tools }) => {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [webGLSupported] = React.useState(() => {
    try {
      if (typeof navigator !== 'undefined' && /HeadlessChrome|Lighthouse|jsdom/i.test(navigator.userAgent)) {
        return false;
      }
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Check if reduced motion is enabled to avoid breaking user preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Settle the final poster composition as the footer becomes the active view.
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      })
      .fromTo(
        nameRef.current,
        { y: '8vh', scale: 1.08, opacity: 0.38, filter: 'blur(10px)' },
        { y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', ease: 'none' },
        0
      )
      .fromTo(
        canvasRef.current,
        { y: '7vh', scale: 0.94, opacity: 0.86 },
        { y: '0vh', scale: 1, opacity: 1, ease: 'none' },
        0.08
      )
      .fromTo(
        overlayRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.35
      );
    }, containerRef);

    return () => ctx.revert(); // clean up GSAP triggers
  }, []);

  return (
    <div ref={containerRef} id="final-footer" className="footer-3d-wrapper">
      {/* 3D WebGL Canvas Layer */}
      <div ref={canvasRef} className="footer-canvas-container">
        <CanvasErrorBoundary fallback={
          <div className="footer-avatar-fallback">
            <img src="/lakshay_avatar_clean.png" alt="Lakshay Oberoi" />
          </div>
        }>
          {webGLSupported ? (
            <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }}>
              <Scene />
            </Canvas>
          ) : (
            <div className="footer-avatar-fallback">
              <img src="/lakshay_avatar_clean.png" alt="Lakshay Oberoi" />
            </div>
          )}
        </CanvasErrorBoundary>
      </div>

      {/* Background name mark behind the avatar */}
      <div ref={nameRef} className="footer-text-container" aria-hidden="true">
        <h2 className="footer-name-part">
          <span>Lakshay</span>
          <span>Oberoi</span>
        </h2>
      </div>

      {/* Foreground Overlay Content Layer */}
      <div ref={overlayRef} className="footer-overlay-content">
        <div className="footer-columns">
          <div>
            <h3>Website made using:</h3>
            <ul>
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact:</h3>
            <ul>
              <li><a className="interactive" href="mailto:lakshayoberoi1911@gmail.com">Email</a></li>
              <li>
                <a
                  className="interactive"
                  href="https://linkedin.com/in/lakshayoberoi1911"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="interactive"
                  href="https://github.com/lakshayoberoi1911"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-info">
          <p>Full-Stack Engineer | Building AI products that people actually use.</p>
          <p>2026</p>
        </div>
      </div>
    </div>
  );
};

export default Footer3D;
