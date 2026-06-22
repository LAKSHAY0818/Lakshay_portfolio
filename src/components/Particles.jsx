import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles({ count = 3000, speedRef }) {
  const mesh = useRef();

  // Generate random positions and colors for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    // Monochromatic techy color palette
    const palette = ['#ffffff', '#cccccc', '#999999', '#555555'];
    const seeded = (index) => {
      const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seeded(i * 3) - 0.5) * 60; // x
      positions[i * 3 + 1] = (seeded(i * 3 + 1) - 0.5) * 60; // y
      positions[i * 3 + 2] = (seeded(i * 3 + 2) - 0.5) * 100 - 50; // z (depth)

      color.set(palette[Math.floor(seeded(i * 3 + 3) * palette.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    const speedMultiplier = speedRef?.current || 1;
    mesh.current.rotation.z += delta * 0.02 * speedMultiplier;
    
    // Move particles towards camera to simulate flying
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += delta * 15 * speedMultiplier; // move along Z
      // Reset if they pass the camera
      if (positions[i * 3 + 2] > 20) {
        positions[i * 3 + 2] = -80;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}
