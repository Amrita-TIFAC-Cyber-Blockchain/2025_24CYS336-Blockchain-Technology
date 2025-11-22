// Short Circuit Analysis for Power Systems
// Uses Z-bus method for fault current calculations

interface LineData {
  id: number;
  name: string;
  fromBus: number;
  toBus: number;
  resistance: number;  // Ω
  reactance: number;   // Ω
}

interface ComplexNumber {
  real: number;
  imag: number;
}

interface ShortCircuitResult {
  faultLocation: {
    type: 'bus' | 'line';
    id: number;
    name: string;
  };
  faultCurrent: {
    magnitude: number;  // Amperes
    angle: number;      // Degrees
  };
  busVoltages: Array<{
    busNumber: number;
    voltageMagnitude: number;  // Per unit
    voltageAngle: number;      // Degrees
    voltageDrop: number;       // Percentage
  }>;
  lineCurrents: Array<{
    id: number;
    name: string;
    currentMagnitude: number;  // Amperes
    overloadPercentage: number;
  }>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Complex number operations
function complexAdd(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return { real: a.real + b.real, imag: a.imag + b.imag };
}

function complexMultiply(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return {
    real: a.real * b.real - a.imag * b.imag,
    imag: a.real * b.imag + a.imag * b.real
  };
}

function complexDivide(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  const denominator = b.real * b.real + b.imag * b.imag;
  if (denominator < 1e-10) {
    throw new Error('Division by near-zero complex number');
  }
  return {
    real: (a.real * b.real + a.imag * b.imag) / denominator,
    imag: (a.imag * b.real - a.real * b.imag) / denominator
  };
}

function complexMagnitude(c: ComplexNumber): number {
  return Math.sqrt(c.real * c.real + c.imag * c.imag);
}

function complexAngle(c: ComplexNumber): number {
  return Math.atan2(c.imag, c.real) * 180 / Math.PI;
}

// Build Z-bus matrix for short circuit analysis
function buildZbusMatrix(
  lines: LineData[],
  numBuses: number,
  baseZ: number
): ComplexNumber[][] {
  // Initialize Y-bus matrix
  const Ybus: ComplexNumber[][] = Array(numBuses)
    .fill(null)
    .map(() => Array(numBuses).fill(null).map(() => ({ real: 0, imag: 0 })));

  // Build Y-bus from line data
  lines.forEach(line => {
    const i = line.fromBus - 1;
    const j = line.toBus - 1;

    // Line impedance in per-unit
    const r = line.resistance / baseZ;
    const x = line.reactance / baseZ;
    const z: ComplexNumber = { real: r, imag: x };

    // Line admittance y = 1/z
    const y = complexDivide({ real: 1, imag: 0 }, z);

    // Add to diagonal elements
    Ybus[i][i] = complexAdd(Ybus[i][i], y);
    Ybus[j][j] = complexAdd(Ybus[j][j], y);

    // Subtract from off-diagonal elements
    Ybus[i][j] = complexAdd(Ybus[i][j], { real: -y.real, imag: -y.imag });
    Ybus[j][i] = complexAdd(Ybus[j][i], { real: -y.real, imag: -y.imag });
  });

  // Invert Y-bus to get Z-bus (simplified using Gauss-Jordan)
  return invertMatrix(Ybus);
}

// Matrix inversion using Gauss-Jordan elimination
function invertMatrix(matrix: ComplexNumber[][]): ComplexNumber[][] {
  const n = matrix.length;
  const result: ComplexNumber[][] = Array(n)
    .fill(null)
    .map((_, i) => 
      Array(n).fill(null).map((_, j) => 
        i === j ? { real: 1, imag: 0 } : { real: 0, imag: 0 }
      )
    );

  // Create augmented matrix [A | I]
  const augmented = matrix.map((row, i) => 
    [...row.map(c => ({ ...c })), ...result[i].map(c => ({ ...c }))]
  );

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    let maxVal = complexMagnitude(augmented[i][i]);
    
    for (let k = i + 1; k < n; k++) {
      const val = complexMagnitude(augmented[k][i]);
      if (val > maxVal) {
        maxVal = val;
        maxRow = k;
      }
    }

    // Swap rows
    if (maxRow !== i) {
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    }

    // Scale pivot row
    const pivot = augmented[i][i];
    if (complexMagnitude(pivot) < 1e-10) continue;
    
    for (let j = i; j < 2 * n; j++) {
      augmented[i][j] = complexDivide(augmented[i][j], pivot);
    }

    // Eliminate column
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmented[k][i];
        for (let j = i; j < 2 * n; j++) {
          const product = complexMultiply(factor, augmented[i][j]);
          augmented[k][j] = {
            real: augmented[k][j].real - product.real,
            imag: augmented[k][j].imag - product.imag
          };
        }
      }
    }
  }

  // Extract result matrix
  return augmented.map(row => row.slice(n));
}

export function calculateShortCircuit(
  lines: LineData[],
  faultLocation: { type: 'bus' | 'line'; id: number },
  baseVoltage: number = 11, // kV
  baseMVA: number = 100
): ShortCircuitResult {
  const numBuses = 5;
  const baseZ = (baseVoltage * baseVoltage) / baseMVA;
  const baseCurrentKA = baseMVA / (Math.sqrt(3) * baseVoltage);
  
  // Build Z-bus matrix
  const Zbus = buildZbusMatrix(lines, numBuses, baseZ);
  
  // Pre-fault voltages (all buses at 1.0 pu)
  const preFaultVoltages: ComplexNumber[] = Array(numBuses)
    .fill(null)
    .map(() => ({ real: 1.0, imag: 0 }));
  
  let faultBus: number;
  let faultName: string;
  
  if (faultLocation.type === 'bus') {
    faultBus = faultLocation.id - 1;
    faultName = `Bus ${faultLocation.id}`;
  } else {
    // Fault on line - assume at midpoint, use "from" bus
    const line = lines.find(l => l.id === faultLocation.id);
    if (!line) throw new Error('Line not found');
    faultBus = line.fromBus - 1;
    faultName = line.name;
  }
  
  // Calculate fault current: If = Vf / Zff
  const faultImpedance = Zbus[faultBus][faultBus];
  const faultCurrentPU = complexDivide(preFaultVoltages[faultBus], faultImpedance);
  const faultCurrentKA = complexMagnitude(faultCurrentPU) * baseCurrentKA;
  const faultCurrentAngle = complexAngle(faultCurrentPU);
  
  // Calculate bus voltages during fault: Vk = Vk0 - Zkf * If
  const busVoltages = preFaultVoltages.map((V0, k) => {
    const Zkf = Zbus[k][faultBus];
    const voltageDrop = complexMultiply(Zkf, faultCurrentPU);
    const faultVoltage = {
      real: V0.real - voltageDrop.real,
      imag: V0.imag - voltageDrop.imag
    };
    
    const magnitude = complexMagnitude(faultVoltage);
    const angle = complexAngle(faultVoltage);
    const dropPercentage = (1 - magnitude) * 100;
    
    return {
      busNumber: k + 1,
      voltageMagnitude: magnitude,
      voltageAngle: angle,
      voltageDrop: dropPercentage
    };
  });
  
  // Calculate line currents during fault
  const lineCurrents = lines.map(line => {
    const i = line.fromBus - 1;
    const j = line.toBus - 1;
    
    // Get voltages at both ends
    const Vi = busVoltages[i].voltageMagnitude * 
      Math.cos(busVoltages[i].voltageAngle * Math.PI / 180);
    const Vj = busVoltages[j].voltageMagnitude * 
      Math.cos(busVoltages[j].voltageAngle * Math.PI / 180);
    
    // Line current approximation
    const Vdiff = Math.abs(Vi - Vj);
    const Z = Math.sqrt(line.resistance * line.resistance + line.reactance * line.reactance);
    const currentPU = Vdiff / (Z / baseZ);
    const currentKA = currentPU * baseCurrentKA;
    
    // Assume 1.2 times normal current as thermal limit
    const normalCurrent = 0.5 * baseCurrentKA; // kA
    const overloadPercentage = (currentKA / normalCurrent) * 100;
    
    return {
      id: line.id,
      name: line.name,
      currentMagnitude: currentKA * 1000, // Convert to Amperes
      overloadPercentage
    };
  });
  
  // Determine fault severity
  let severity: 'low' | 'medium' | 'high' | 'critical';
  const maxVoltageDrop = Math.max(...busVoltages.map(b => b.voltageDrop));
  const maxOverload = Math.max(...lineCurrents.map(l => l.overloadPercentage));
  
  if (faultCurrentKA > 50 || maxVoltageDrop > 80 || maxOverload > 300) {
    severity = 'critical';
  } else if (faultCurrentKA > 30 || maxVoltageDrop > 60 || maxOverload > 200) {
    severity = 'high';
  } else if (faultCurrentKA > 15 || maxVoltageDrop > 40 || maxOverload > 150) {
    severity = 'medium';
  } else {
    severity = 'low';
  }
  
  return {
    faultLocation: {
      type: faultLocation.type,
      id: faultLocation.id,
      name: faultName
    },
    faultCurrent: {
      magnitude: faultCurrentKA * 1000, // Convert to Amperes
      angle: faultCurrentAngle
    },
    busVoltages,
    lineCurrents,
    severity
  };
}
