import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnergyFlowProps {
  from: [number, number, number];
  to: [number, number, number];
  active: boolean;
  amount: number;
}

export const EnergyFlow = ({ from, to, active, amount }: EnergyFlowProps) => {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 50;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      arr[i * 3] = from[0] + (to[0] - from[0]) * t;
      arr[i * 3 + 1] = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI * 2) * 0.5;
      arr[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
    }
    return arr;
  }, [from, to]);

  useFrame((state) => {
    if (particlesRef.current && active) {
      const positions = particlesRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount + time * 0.2) % 1);
        const x = from[0] + (to[0] - from[0]) * t;
        const y = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI * 4 + time) * 0.3;
        const z = from[2] + (to[2] - from[2]) * t;

        positions.setXYZ(i, x, y, z);
      }
      positions.needsUpdate = true;
    }
  });

  if (!active) return null;

  return (
    <>
      {/* Flow Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([...from, ...to])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10b981" transparent opacity={0.3} linewidth={2} />
      </line>

      {/* Energy Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#10b981"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </>
  );
};
