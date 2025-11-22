import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface NanogridData {
  nanogrid_id: number;
  address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
}

interface NanogridModelProps {
  nanogrid: NanogridData;
  position: [number, number, number];
  onClick?: () => void;
}

export const NanogridModel = ({ nanogrid, position, onClick }: NanogridModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const solarRef = useRef<THREE.Mesh>(null);

  // Animate solar panels based on output
  useFrame((state) => {
    if (solarRef.current) {
      const pulseSpeed = nanogrid.solar_output / 100;
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.05;
      solarRef.current.scale.setScalar(scale);
    }
  });

  const batteryLevel = nanogrid.battery_soc / 100;
  const solarIntensity = nanogrid.solar_output / 100;
  const loadDemand = nanogrid.load_demand / 100;

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Base Platform */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Battery Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
        <meshStandardMaterial
          color={batteryLevel > 0.7 ? '#10b981' : batteryLevel > 0.3 ? '#f59e0b' : '#ef4444'}
          emissive={batteryLevel > 0.7 ? '#10b981' : batteryLevel > 0.3 ? '#f59e0b' : '#ef4444'}
          emissiveIntensity={batteryLevel * 0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Battery Level Indicator */}
      <mesh position={[0, -1 + batteryLevel * 2, 0]}>
        <cylinderGeometry args={[0.75, 0.75, batteryLevel * 2, 32]} />
        <meshStandardMaterial
          color={batteryLevel > 0.7 ? '#10b981' : batteryLevel > 0.3 ? '#f59e0b' : '#ef4444'}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Solar Panel */}
      <mesh ref={solarRef} position={[0, 2, 0]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2, 0.05, 1.5]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#3b82f6"
          emissiveIntensity={solarIntensity * 2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Solar Panel Grid */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-0.75 + i * 0.5, 2.03, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.02, 0.05, 1.5]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      ))}

      {/* Energy Glow */}
      <pointLight
        position={[0, 0, 0]}
        color={batteryLevel > 0.7 ? '#10b981' : batteryLevel > 0.3 ? '#f59e0b' : '#ef4444'}
        intensity={batteryLevel * 2}
        distance={5}
      />

      {/* Solar Glow */}
      <pointLight position={[0, 2, 0]} color="#3b82f6" intensity={solarIntensity * 3} distance={4} />

      {/* Load Demand Indicator */}
      {loadDemand > 0.1 && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={loadDemand}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {nanogrid.nanogrid_id}
      </Text>

      {/* Stats */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.15}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        ⚡ {nanogrid.solar_output.toFixed(1)} kWh
      </Text>

      <Text
        position={[0, -2.3, 0]}
        fontSize={0.15}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        🔋 {nanogrid.battery_soc.toFixed(1)}%
      </Text>
    </group>
  );
};
