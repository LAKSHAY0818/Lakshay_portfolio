import React from 'react';
import { Scroll, Environment, ContactShadows } from '@react-three/drei';
import FloatingGlass from './FloatingGlass';

import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';

export default function Scene() {
  return (
    <>
      <color attach="background" args={['#09090b']} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      <FloatingGlass />



      <Scroll html style={{ width: '100vw' }}>
        <div style={{ position: 'relative', width: '100%', color: 'var(--white)', backgroundColor: 'rgba(9, 9, 11, 0.65)' }}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: '4rem' }}>
            <Hero />
          </div>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Skills />
          </div>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Projects />
          </div>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Experience />
          </div>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Contact />
          </div>
        </div>
      </Scroll>
    </>
  );
}
