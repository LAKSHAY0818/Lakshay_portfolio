import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function CyberCar() {
  const group = useRef();
  const frontLeftWheel = useRef();
  const frontRightWheel = useRef();
  const backLeftWheel = useRef();
  const backRightWheel = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Scroll offset (0 to 1)
    const offset = scroll.offset;
    
    // Base animation: wheels spinning
    [frontLeftWheel, frontRightWheel, backLeftWheel, backRightWheel].forEach(wheel => {
      if (wheel.current) {
        wheel.current.rotation.x -= delta * 10;
      }
    });

    // Drift animation logic based on scroll
    // We'll interpolate position and rotation based on scroll offset
    // offset 0: parked
    // offset 0.2: drive left
    // offset 0.5: drift right
    // offset 0.8: drift left
    // offset 1: speed away
    
    // We use a sine wave for smooth drifting
    const targetX = Math.sin(offset * Math.PI * 4) * 4;
    const targetZ = -5 + (offset * -10); // slightly moving back
    const targetRotY = Math.cos(offset * Math.PI * 4) * 0.5; // steering angle
    const targetRotZ = Math.sin(offset * Math.PI * 8) * 0.1; // chassis tilt

    // Smooth dampening
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 4, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 4, delta);
    
    // Bouncing effect on Y axis
    group.current.position.y = -1 + Math.abs(Math.sin(state.clock.elapsedTime * 10)) * 0.05;
  });

  return (
    <group ref={group} position={[0, -1, -5]}>
      {/* Chassis */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[2, 0.3, 4]} />
        <meshPhysicalMaterial color="#111111" metalness={0.8} roughness={0.2} clearcoat={1} />
      </mesh>
      
      {/* Cabin */}
      <mesh position={[0, 0.75, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.4, 2]} />
        <meshPhysicalMaterial color="#050505" metalness={0.9} roughness={0.1} transmission={0.5} thickness={0.5} />
      </mesh>

      {/* Neon Underglow */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.05, 3.8]} />
        <meshBasicMaterial color="#00ffff" />
        <pointLight color="#00ffff" intensity={2} distance={5} position={[0, -0.2, 0]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.8, 0.4, 2.05]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
        <spotLight position={[0, 0, 0]} angle={0.3} penumbra={0.5} intensity={5} castShadow target-position={[0, 0, 10]} />
      </mesh>
      <mesh position={[0.8, 0.4, 2.05]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.8, 0.4, -2.05]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
        <pointLight color="#ff0000" intensity={1} distance={3} />
      </mesh>
      <mesh position={[0.8, 0.4, -2.05]}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <group position={[-1.1, 0.3, 1.2]}>
        <mesh ref={frontLeftWheel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
      </group>
      {/* Front Right */}
      <group position={[1.1, 0.3, 1.2]}>
        <mesh ref={frontRightWheel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
      </group>
      {/* Back Left */}
      <group position={[-1.1, 0.3, -1.2]}>
        <mesh ref={backLeftWheel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
      </group>
      {/* Back Right */}
      <group position={[1.1, 0.3, -1.2]}>
        <mesh ref={backRightWheel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
