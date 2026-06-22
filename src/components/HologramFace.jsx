import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const HologramMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
  },
  // vertex shader
  `
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Slight parallax deformation
      pos.x += sin(pos.y * 5.0 + uTime) * 0.02 * uMouse.x;
      pos.y += cos(pos.x * 5.0 + uTime) * 0.02 * uMouse.y;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // RGB shift based on mouse and time
      float rOffset = sin(uTime * 2.0) * 0.02 * uMouse.x;
      float bOffset = cos(uTime * 2.0) * 0.02 * uMouse.y;
      
      float r = texture2D(uTexture, vec2(uv.x + rOffset, uv.y)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, vec2(uv.x - bOffset, uv.y)).b;
      
      vec4 texColor = vec4(r, g, b, 1.0);
      
      // Scanlines
      float scanline = sin(uv.y * 150.0 + uTime * 10.0) * 0.04;
      
      // Holographic Neon tint
      vec3 neonTint = vec3(0.0, 0.5, 1.0) * 0.3; 
      
      // Masking circle (fade out edges of the plane so it looks like it's floating)
      float dist = distance(uv, vec2(0.5));
      float mask = smoothstep(0.5, 0.25, dist);
      
      gl_FragColor = vec4(texColor.rgb + scanline + neonTint, texColor.a * mask * 0.7);
    }
  `
);

extend({ HologramMaterial });

const FaceMesh = ({ mousePos }) => {
  const materialRef = useRef();
  const texture = useTexture('/assets/lakshay.jpg');
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly interpolate mouse position for the shader
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, mousePos.x, 0.05);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, mousePos.y, 0.05);
    }
  });

  return (
    <mesh position={[0, -0.5, -3]}>
      {/* 5x6 aspect ratio roughly matches portrait */}
      <planeGeometry args={[7, 8.4, 64, 64]} />
      <hologramMaterial 
        ref={materialRef} 
        uTexture={texture}
        transparent={true} 
      />
    </mesh>
  );
};

const HologramFace = ({ mousePos }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <ambientLight intensity={0.5} />
      <React.Suspense fallback={null}>
        <FaceMesh mousePos={mousePos} />
      </React.Suspense>
    </Canvas>
  );
};

export default HologramFace;
