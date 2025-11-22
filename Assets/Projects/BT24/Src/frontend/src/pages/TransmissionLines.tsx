import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useSmartGridData } from '@/hooks/useSmartGridData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransmissionLineScene3D } from '@/components/DigitalTwin/TransmissionLineScene3D';
import { ImpedanceEditor } from '@/components/TransmissionLine/ImpedanceEditor';
import { LoadFlowResults } from '@/components/TransmissionLine/LoadFlowResults';
import { ShortCircuitAnalysis } from '@/components/TransmissionLine/ShortCircuitAnalysis';
import { calculateLoadFlow } from '@/utils/loadFlowAnalysis';
import { toast } from 'sonner';

interface LineImpedance {
  id: number;
  name: string;
  fromBus: number;
  toBus: number;
  resistance: number;
  reactance: number;
}

// Default impedance values from IEEE 5-bus system
const DEFAULT_LINES: LineImpedance[] = [
  { id: 1, name: 'Line 1', fromBus: 1, toBus: 2, resistance: 1.066, reactance: 2.634 },
  { id: 2, name: 'Line 2', fromBus: 1, toBus: 3, resistance: 4.266, reactance: 10.738 },
  { id: 3, name: 'Line 3', fromBus: 2, toBus: 3, resistance: 3.2, reactance: 8.0698 },
  { id: 4, name: 'Line 4', fromBus: 2, toBus: 4, resistance: 3.2, reactance: 8.0698 },
  { id: 5, name: 'Line 5', fromBus: 2, toBus: 5, resistance: 2.1333, reactance: 5.3568 },
  { id: 6, name: 'Line 6', fromBus: 3, toBus: 4, resistance: 0.533, reactance: 1.3784 },
  { id: 7, name: 'Line 7', fromBus: 4, toBus: 5, resistance: 4.266, reactance: 10.801 },
];

const TransmissionLines = () => {
  const gridData = useSmartGridData();
  
  // State for line impedances
  const [lines, setLines] = useState<LineImpedance[]>(DEFAULT_LINES);
  
  // State for load flow results
  const [loadFlowResults, setLoadFlowResults] = useState<any>({
    busResults: [],
    lineResults: [],
    convergence: { iterations: 0, converged: null, error: 0 }
  });
  
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);
  
  // Get generation power from nanogrids (using first nanogrid at Bus 1)
  const generationPower = gridData.nanogrids.length > 0 
    ? gridData.nanogrids[0].solar_output 
    : 50; // Default 50 kW

  // Prepare data for 3D visualization
  const busVoltages = loadFlowResults.busResults.length > 0
    ? loadFlowResults.busResults.map((b: any) => b.voltage)
    : [1.0, 1.0, 1.0, 1.0, 1.0];
  
  const busPowers = loadFlowResults.busResults.length > 0
    ? loadFlowResults.busResults.map((b: any) => b.pGen - b.pLoad)
    : [generationPower, -generationPower * 0.2, -generationPower * 0.3, -generationPower * 0.25, -generationPower * 0.25];
  
  const linesWithPowerFlow = lines.map((line, idx) => ({
    ...line,
    powerFlow: loadFlowResults.lineResults[idx]?.pFlow || 0
  }));

  const handleRunAnalysis = () => {
    setIsAnalysisRunning(true);
    toast.info('Running load flow analysis...');
    
    // Simulate analysis time
    setTimeout(() => {
      const results = calculateLoadFlow(lines, generationPower);
      setLoadFlowResults(results);
      setIsAnalysisRunning(false);
      
      if (results.convergence.converged) {
        toast.success(`Analysis converged in ${results.convergence.iterations} iterations!`);
      } else {
        toast.error('Analysis did not converge. Try adjusting parameters.');
      }
    }, 1000);
  };

  const handleResetLines = () => {
    setLines(DEFAULT_LINES);
    toast.success('Impedance values reset to IEEE 5-bus defaults');
  };
  

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        activeTab="transmission" 
        onTabChange={() => {}} 
        systemMode={gridData.systemStatus.mode}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            IEEE 5-Bus Transmission System
          </h1>
          <p className="text-muted-foreground">
            3D Digital Twin with Manual Impedance Input and Load Flow Analysis
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="visualization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visualization">3D Visualization</TabsTrigger>
            <TabsTrigger value="impedance">Line Impedance</TabsTrigger>
            <TabsTrigger value="analysis">Load Flow Analysis</TabsTrigger>
            <TabsTrigger value="shortcircuit">Short Circuit</TabsTrigger>
          </TabsList>

          {/* 3D Visualization Tab */}
          <TabsContent value="visualization" className="space-y-6">
            <TransmissionLineScene3D
              lines={linesWithPowerFlow}
              busVoltages={busVoltages}
              busPowers={busPowers}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Generation (Bus 1)</div>
                <div className="text-2xl font-bold text-green-500">{generationPower.toFixed(2)} kW</div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Total Lines</div>
                <div className="text-2xl font-bold text-blue-500">{lines.length}</div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">System Status</div>
                <div className="text-2xl font-bold text-purple-500">
                  {loadFlowResults.convergence.converged ? 'Converged' : 'Ready'}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Impedance Editor Tab */}
          <TabsContent value="impedance">
            <ImpedanceEditor
              lines={lines}
              onUpdate={setLines}
              onReset={handleResetLines}
            />
          </TabsContent>

          {/* Load Flow Analysis Tab */}
          <TabsContent value="analysis">
            <LoadFlowResults
              busResults={loadFlowResults.busResults}
              lineResults={loadFlowResults.lineResults}
              convergence={loadFlowResults.convergence}
              onRunAnalysis={handleRunAnalysis}
              isRunning={isAnalysisRunning}
            />
          </TabsContent>

          {/* Short Circuit Analysis Tab */}
          <TabsContent value="shortcircuit">
            <ShortCircuitAnalysis lines={lines} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TransmissionLines;
