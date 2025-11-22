import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PowerLineProps {
  from: [number, number, number];
  to: [number, number, number];
  power: number; // Positive = from->to, Negative = to->from
  active?: boolean;
}

export const PowerLine = ({ from, to, power, active = true }: PowerLineProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const direction = power >= 0 ? 1 : -1;
  const powerMagnitude = Math.abs(power);
  const normalized = Math.min(powerMagnitude / 100, 1);

  // Create line geometry
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  // Create particle geometry for power flow animation
  const particleCount = 20;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount;
    particlePositions[i * 3] = from[0] + (to[0] - from[0]) * t;
    particlePositions[i * 3 + 1] = from[1] + (to[1] - from[1]) * t;
    particlePositions[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Animate particles flowing along the line
  useFrame((state) => {
    if (particlesRef.current && active) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        let t = (i / particleCount + state.clock.elapsedTime * 0.2 * direction) % 1;
        if (t < 0) t += 1;
        
        positions[i * 3] = from[0] + (to[0] - from[0]) * t;
        positions[i * 3 + 1] = from[1] + (to[1] - from[1]) * t;
        positions[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Main Power Line */}
      <primitive ref={lineRef} object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: power >= 0 ? '#10b981' : '#3b82f6',
        linewidth: 2,
        opacity: 0.8,
        transparent: true
      }))} />

      {/* Thick glow line */}
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: power >= 0 ? '#10b981' : '#3b82f6',
        linewidth: 4,
        opacity: normalized * 0.3,
        transparent: true
      }))} />

      {/* Animated particles showing power flow */}
      {active && powerMagnitude > 0.1 && (
        <points ref={particlesRef} geometry={particleGeometry}>
          <pointsMaterial
            color={power >= 0 ? '#10b981' : '#3b82f6'}
            size={0.15}
            sizeAttenuation={true}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
};
