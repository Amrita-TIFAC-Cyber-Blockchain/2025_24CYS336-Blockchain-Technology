import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Stars } from '@react-three/drei';
import { NanogridModel } from './NanogridModel';
import { EnergyFlow } from './EnergyFlow';
import { BusModel } from './BusModel';
import { PowerLine } from './PowerLine';

interface Transaction {
  id: string;
  transaction_hash: string;
  sender_address: string;
  receiver_address: string;
  amount_kwh: number;
  created_at: string;
}

interface NanogridData {
  nanogrid_id: number;
  address: string;
  solar_output: number;
  load_demand: number;
  battery_soc: number;
}

interface SceneProps {
  nanogrids: NanogridData[];
  transactions: Transaction[];
  onNanogridClick?: (nanogrid: NanogridData) => void;
}

export const Scene = ({ nanogrids, transactions, onNanogridClick }: SceneProps) => {
  // IEEE 5-Bus System Configuration
  const busPositions: { [key: number]: [number, number, number] } = {
    1: [0, 0, -12], // Generation Bus (center back)
    2: [-8, 0, 0],  // Load Bus 1 (left)
    3: [-4, 0, 8],  // Load Bus 2 (front left)
    4: [4, 0, 8],   // Load Bus 3 (front right)
    5: [8, 0, 0],   // Load Bus 4 (right)
  };

  // Bus connections (transmission lines)
  const busConnections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  // Calculate bus power levels
  const calculateBusPower = (busNumber: number) => {
    if (busNumber === 1) {
      // Generation bus - sum of all solar output
      return nanogrids.reduce((sum, ng) => sum + ng.solar_output, 0);
    } else {
      // Load buses - distribute nanogrids across buses 2-5
      const nanogridIndex = busNumber - 2;
      const nanogridsPerBus = Math.ceil(nanogrids.length / 4);
      const startIdx = nanogridIndex * nanogridsPerBus;
      const endIdx = Math.min(startIdx + nanogridsPerBus, nanogrids.length);
      
      const busNanogrids = nanogrids.slice(startIdx, endIdx);
      const generation = busNanogrids.reduce((sum, ng) => sum + ng.solar_output, 0);
      const load = busNanogrids.reduce((sum, ng) => sum + ng.load_demand, 0);
      
      return generation - load; // Positive = surplus, Negative = deficit
    }
  };

  // Arrange nanogrids around their respective load buses
  const getNanogridPosition = (index: number): [number, number, number] => {
    const busNumber = Math.floor(index / Math.ceil(nanogrids.length / 4)) + 2; // Buses 2-5
    const busPos = busPositions[Math.min(busNumber, 5)];
    const localIndex = index % Math.ceil(nanogrids.length / 4);
    const angle = (localIndex / Math.ceil(nanogrids.length / 4)) * Math.PI * 2;
    const radius = 3;
    
    return [
      busPos[0] + Math.cos(angle) * radius,
      busPos[1],
      busPos[2] + Math.sin(angle) * radius
    ];
  };

  // Find active energy flows from recent transactions
  const getActiveFlows = () => {
    const now = Date.now();
    const recentTransactions = transactions.filter(tx => {
      const txTime = new Date(tx.created_at).getTime();
      return now - txTime < 10000; // Last 10 seconds
    });

    return recentTransactions.map(tx => {
      const senderIndex = nanogrids.findIndex(n => n.address.toLowerCase() === tx.sender_address.toLowerCase());
      const receiverIndex = nanogrids.findIndex(n => n.address.toLowerCase() === tx.receiver_address.toLowerCase());
      
      if (senderIndex === -1 || receiverIndex === -1) return null;

      return {
        from: getNanogridPosition(senderIndex),
        to: getNanogridPosition(receiverIndex),
        amount: tx.amount_kwh
      };
    }).filter(Boolean);
  };

  const activeFlows = getActiveFlows();

  return (
    <Canvas
      camera={{ position: [0, 15, 20], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#444444" />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />
      
      {/* Grid Floor */}
      <Grid
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6366f1"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#8b5cf6"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid
      />

      {/* IEEE 5-Bus System */}
      {/* Bus 1 - Generation */}
      <BusModel
        busNumber={1}
        busType="generation"
        position={busPositions[1]}
        activePower={calculateBusPower(1)}
        voltage={1.05}
      />

      {/* Buses 2-5 - Load Buses */}
      {[2, 3, 4, 5].map((busNum) => (
        <BusModel
          key={busNum}
          busNumber={busNum}
          busType="load"
          position={busPositions[busNum]}
          activePower={calculateBusPower(busNum)}
          voltage={1.0}
        />
      ))}

      {/* Transmission Lines between Buses */}
      {busConnections.map((conn, index) => {
        const powerFlow = calculateBusPower(conn.from) * 0.2; // Simplified power flow
        return (
          <PowerLine
            key={`line-${index}`}
            from={busPositions[conn.from]}
            to={busPositions[conn.to]}
            power={powerFlow}
            active={true}
          />
        );
      })}

      {/* Nanogrids distributed across load buses */}
      {nanogrids.map((nanogrid, index) => (
        <NanogridModel
          key={nanogrid.nanogrid_id}
          nanogrid={nanogrid}
          position={getNanogridPosition(index)}
          onClick={() => onNanogridClick?.(nanogrid)}
        />
      ))}

      {/* Energy Flows between Nanogrids */}
      {activeFlows.map((flow, index) => (
        flow && (
          <EnergyFlow
            key={`flow-${index}`}
            from={flow.from}
            to={flow.to}
            active={true}
            amount={flow.amount}
          />
        )
      ))}

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};
