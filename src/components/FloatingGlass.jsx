import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingGlass() {
  const meshRef = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const offset = scroll.offset;
    
    // Base scroll rotation
    const scrollRotX = offset * Math.PI * 2;
    const scrollRotY = offset * Math.PI * 4;
    
    // Mouse tracking (normalized -1 to 1)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Combine scroll rotation with mouse tracking parallax
    const targetRotX = scrollRotX + (mouseY * 0.5);
    const targetRotY = scrollRotY + (mouseX * 0.5);
    
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta);

    // Subtle position parallax based on mouse
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, mouseX * 0.5, 4, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, mouseY * 0.5, 4, delta);
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshTransmissionMaterial 
            backside
            thickness={0.5}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            anisotropy={0.2}
            color="#ffffff"
          />
        </mesh>
      </Float>

      {/* Colorful lights behind the glass to create beautiful refractions */}
      <Float speed={3} floatIntensity={3}>
        <mesh position={[-3, 2, -5]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#0284c7" /> {/* Dimmer cyan */}
        </mesh>
      </Float>
      
      <Float speed={4} floatIntensity={4}>
        <mesh position={[3, -2, -5]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#be185d" /> {/* Dimmer pink */}
        </mesh>
      </Float>
      
      <Float speed={2} floatIntensity={5}>
        <mesh position={[0, -4, -6]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#047857" /> {/* Dimmer emerald */}
        </mesh>
      </Float>
    </group>
  );
}
