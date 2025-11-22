import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stars, Environment } from '@react-three/drei';
import { BusModel } from './BusModel';
import { PowerLine } from './PowerLine';

interface LineData {
  id: number;
  fromBus: number;
  toBus: number;
  resistance: number; // R in Ω
  reactance: number;  // X in Ω
  powerFlow: number;  // kW
}

interface TransmissionLineScene3DProps {
  lines: LineData[];
  busVoltages: number[]; // Per unit voltages for each bus
  busPowers: number[]; // Power at each bus (positive = generation, negative = load)
}

export const TransmissionLineScene3D = ({ lines, busVoltages, busPowers }: TransmissionLineScene3DProps) => {
  // Define bus positions in 3D space to match the IEEE 5-bus topology
  // Bus 1 (Generation) at top, buses 2,3 in middle tier, buses 4,5 at bottom
  const busPositions: Record<number, [number, number, number]> = {
    1: [0, 8, 0],      // Bus 1 - Generation (top center)
    2: [-6, 4, 0],     // Bus 2 - Load (middle left)
    3: [6, 4, 0],      // Bus 3 - Load (middle right)
    4: [-4, 0, 0],     // Bus 4 - Load (bottom left)
    5: [4, 0, 0],      // Bus 5 - Load (bottom right)
  };

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border bg-gradient-to-b from-slate-900 to-slate-950">
      <Canvas
        camera={{ position: [0, 5, 25], fov: 60 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <hemisphereLight intensity={0.3} groundColor="#1e293b" />

        {/* Environment */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />

        {/* Grid floor */}
        <Grid
          args={[30, 30]}
          position={[0, -3, 0]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#334155"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#475569"
          fadeDistance={40}
        />

        {/* Render Buses */}
        {[1, 2, 3, 4, 5].map((busNum) => (
          <BusModel
            key={busNum}
            busNumber={busNum}
            busType={busNum === 1 ? 'generation' : 'load'}
            position={busPositions[busNum]}
            activePower={busPowers[busNum - 1]}
            voltage={busVoltages[busNum - 1]}
          />
        ))}

        {/* Render Transmission Lines */}
        {lines.map((line) => (
          <PowerLine
            key={line.id}
            from={busPositions[line.fromBus]}
            to={busPositions[line.toBus]}
            power={line.powerFlow}
            active={true}
          />
        ))}

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
};