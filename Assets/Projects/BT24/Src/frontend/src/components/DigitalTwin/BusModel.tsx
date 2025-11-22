import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface BusModelProps {
  busNumber: number;
  busType: 'generation' | 'load';
  position: [number, number, number];
  activePower: number;
  voltage: number;
  onClick?: () => void;
}

export const BusModel = ({ busNumber, busType, position, activePower, voltage, onClick }: BusModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Animate based on power flow
  useFrame((state) => {
    if (coreRef.current) {
      const pulseSpeed = Math.abs(activePower) / 50;
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.08;
      coreRef.current.scale.setScalar(scale);
    }
  });

  const isGenerating = busType === 'generation' || activePower > 0;
  const powerLevel = Math.abs(activePower) / 100;
  const voltageNormalized = voltage / 1.0; // Assuming 1.0 p.u. nominal

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Base Platform */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.15, 32]} />
        <meshStandardMaterial 
          color={busType === 'generation' ? '#1e40af' : '#334155'} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>

      {/* Bus Core - Different for generation vs load */}
      {busType === 'generation' ? (
        <>
          {/* Generation Bus - Larger, glowing */}
          <mesh ref={coreRef} position={[0, 0.5, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={powerLevel * 1.5}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
          
          {/* Generation indicator rings */}
          {[0.3, 0.6, 0.9].map((offset, i) => (
            <mesh key={i} position={[0, 0.5 + offset, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.3 + i * 0.2, 0.05, 16, 32]} />
              <meshStandardMaterial
                color="#3b82f6"
                emissive="#3b82f6"
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </>
      ) : (
        <>
          {/* Load Bus - Cubic/transformer style */}
          <mesh ref={coreRef} position={[0, 0.5, 0]}>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial
              color={isGenerating ? '#10b981' : '#ef4444'}
              emissive={isGenerating ? '#10b981' : '#ef4444'}
              emissiveIntensity={powerLevel * 0.8}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>

          {/* Load indicator */}
          <mesh position={[0, 1.3, 0]}>
            <coneGeometry args={[0.3, 0.5, 4]} />
            <meshStandardMaterial
              color={isGenerating ? '#10b981' : '#f59e0b'}
              emissive={isGenerating ? '#10b981' : '#f59e0b'}
              emissiveIntensity={powerLevel}
            />
          </mesh>
        </>
      )}

      {/* Power Glow */}
      <pointLight
        position={[0, 0.5, 0]}
        color={busType === 'generation' ? '#10b981' : isGenerating ? '#10b981' : '#ef4444'}
        intensity={powerLevel * 3}
        distance={8}
      />

      {/* Bus Number Label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Bus {busNumber}
      </Text>

      {/* Bus Type Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color={busType === 'generation' ? '#10b981' : '#f59e0b'}
        anchorX="center"
        anchorY="middle"
      >
        {busType === 'generation' ? 'GEN' : 'LOAD'}
      </Text>

      {/* Power Stats */}
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {activePower.toFixed(1)} kW
      </Text>

      {/* Voltage Stats */}
      <Text
        position={[0, -1.9, 0]}
        fontSize={0.18}
        color={voltageNormalized > 0.95 && voltageNormalized < 1.05 ? '#10b981' : '#f59e0b'}
        anchorX="center"
        anchorY="middle"
      >
        V: {voltage.toFixed(3)} p.u.
      </Text>
    </group>
  );
};
