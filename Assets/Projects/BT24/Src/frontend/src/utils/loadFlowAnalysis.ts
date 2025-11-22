// Load Flow Analysis using Gauss-Seidel Method
// For IEEE 5-Bus System (more reliable convergence than Newton-Raphson)

interface BusData {
  type: 'slack' | 'pv' | 'pq';
  voltage: number;  // p.u. magnitude
  angle: number;    // radians
  pGen: number;     // kW
  qGen: number;     // kVAR
  pLoad: number;    // kW
  qLoad: number;    // kVAR
}

interface ComplexNumber {
  real: number;
  imag: number;
}

interface LineData {
  fromBus: number;
  toBus: number;
  resistance: number;  // Ω
  reactance: number;   // Ω
}

interface LoadFlowResult {
  busResults: Array<{
    busNumber: number;
    voltage: number;
    angle: number;
    pGen: number;
    qGen: number;
    pLoad: number;
    qLoad: number;
  }>;
  lineResults: Array<{
    id: number;
    name: string;
    fromBus: number;
    toBus: number;
    pFlow: number;
    qFlow: number;
    losses: number;
  }>;
  convergence: {
    iterations: number;
    converged: boolean;
    error: number;
  };
}

export function calculateLoadFlow(
  lines: Array<{ id: number; name: string; fromBus: number; toBus: number; resistance: number; reactance: number }>,
  generationPower: number // Total generation at Bus 1 in kW
): LoadFlowResult {
  // Validate generation power
  if (!Number.isFinite(generationPower) || generationPower <= 0 || generationPower > 100000) {
    throw new Error('Generation power must be between 0 and 100,000 kW');
  }
  
  // Validate line impedances
  for (const line of lines) {
    if (!Number.isFinite(line.resistance) || line.resistance < 0.0001 || line.resistance > 10) {
      throw new Error(`Invalid resistance for line ${line.name}: must be between 0.0001 and 10 Ω`);
    }
    if (!Number.isFinite(line.reactance) || line.reactance < 0.0001 || line.reactance > 10) {
      throw new Error(`Invalid reactance for line ${line.name}: must be between 0.0001 and 10 Ω`);
    }
  }
  
  const numBuses = 5;
  const baseMVA = 100; // Base power in MVA for per-unit system
  const baseKV = 11; // Base voltage in kV
  const baseZ = (baseKV * baseKV) / baseMVA; // Base impedance
  
  // Initialize bus data
  const buses: BusData[] = [
    // Bus 1 - Slack bus (generation)
    { type: 'slack', voltage: 1.0, angle: 0, pGen: generationPower, qGen: 0, pLoad: 0, qLoad: 0 },
    // Bus 2 - Load bus
    { type: 'pq', voltage: 1.0, angle: 0, pGen: 0, qGen: 0, pLoad: generationPower * 0.2, qLoad: generationPower * 0.1 },
    // Bus 3 - Load bus
    { type: 'pq', voltage: 1.0, angle: 0, pGen: 0, qGen: 0, pLoad: generationPower * 0.3, qLoad: generationPower * 0.15 },
    // Bus 4 - Load bus
    { type: 'pq', voltage: 1.0, angle: 0, pGen: 0, qGen: 0, pLoad: generationPower * 0.25, qLoad: generationPower * 0.12 },
    // Bus 5 - Load bus
    { type: 'pq', voltage: 1.0, angle: 0, pGen: 0, qGen: 0, pLoad: generationPower * 0.25, qLoad: generationPower * 0.13 },
  ];

  // Build admittance matrix (Y-bus) - complex numbers
  const Ybus = buildYbusMatrix(lines, numBuses, baseZ);

  // Run Gauss-Seidel power flow
  const maxIterations = 100;
  const tolerance = 0.0001;
  let iteration = 0;
  let converged = false;
  let maxError = 1;

  // Convert buses to complex voltage representation
  const V: ComplexNumber[] = buses.map(bus => ({
    real: bus.voltage * Math.cos(bus.angle),
    imag: bus.voltage * Math.sin(bus.angle)
  }));

  // Gauss-Seidel iteration
  while (iteration < maxIterations && !converged) {
    const Vold = V.map(v => ({ ...v }));
    maxError = 0;

    // Update voltage for each PQ bus (skip slack bus 0)
    for (let i = 1; i < numBuses; i++) {
      if (buses[i].type === 'pq') {
        // Calculate net power injection in per-unit
        const pNet = (buses[i].pGen - buses[i].pLoad) / (baseMVA * 1000); // Convert kW to p.u.
        const qNet = (buses[i].qGen - buses[i].qLoad) / (baseMVA * 1000); // Convert kVAR to p.u.

        // Calculate sum of YV for all buses except i
        let sum: ComplexNumber = { real: 0, imag: 0 };
        for (let j = 0; j < numBuses; j++) {
          if (j !== i) {
            const yv = complexMultiply(Ybus[i][j], V[j]);
            sum = complexAdd(sum, yv);
          }
        }

        // Calculate new voltage: V[i] = (1/Y[i][i]) * ((P[i] - jQ[i])/V[i]* - sum)
        const Vconj: ComplexNumber = { real: V[i].real, imag: -V[i].imag };
        const Vmag2 = V[i].real * V[i].real + V[i].imag * V[i].imag;
        
        if (Vmag2 > 0.0001) { // Avoid division by zero
          const powerTerm: ComplexNumber = {
            real: (pNet * V[i].real + qNet * V[i].imag) / Vmag2,
            imag: (pNet * V[i].imag - qNet * V[i].real) / Vmag2
          };

          const diff = complexSubtract(powerTerm, sum);
          const Ynew = complexDivide(diff, Ybus[i][i]);

          // Apply acceleration factor for better convergence
          const alpha = 1.3;
          V[i].real = V[i].real + alpha * (Ynew.real - V[i].real);
          V[i].imag = V[i].imag + alpha * (Ynew.imag - V[i].imag);

          // Limit voltage magnitude
          const Vmag = Math.sqrt(V[i].real * V[i].real + V[i].imag * V[i].imag);
          if (Vmag > 1.1) {
            V[i].real *= 1.1 / Vmag;
            V[i].imag *= 1.1 / Vmag;
          } else if (Vmag < 0.9) {
            V[i].real *= 0.9 / Vmag;
            V[i].imag *= 0.9 / Vmag;
          }
        }

        // Calculate error
        const error = Math.sqrt(
          Math.pow(V[i].real - Vold[i].real, 2) + 
          Math.pow(V[i].imag - Vold[i].imag, 2)
        );
        maxError = Math.max(maxError, error);
      }
    }

    // Check convergence
    if (maxError < tolerance) {
      converged = true;
    }

    iteration++;
  }

  // Convert complex voltages back to magnitude and angle
  for (let i = 0; i < numBuses; i++) {
    buses[i].voltage = Math.sqrt(V[i].real * V[i].real + V[i].imag * V[i].imag);
    buses[i].angle = Math.atan2(V[i].imag, V[i].real);
  }

  // Calculate line power flows using complex voltages
  const lineResults = lines.map((line) => {
    const i = line.fromBus - 1;
    const j = line.toBus - 1;
    
    // Line impedance in per-unit
    const r = line.resistance / baseZ;
    const x = line.reactance / baseZ;
    const z: ComplexNumber = { real: r, imag: x };
    const y = complexDivide({ real: 1, imag: 0 }, z);
    
    // Voltage difference
    const Vdiff = complexSubtract(V[i], V[j]);
    
    // Current: I = Y * (Vi - Vj)
    const I = complexMultiply(y, Vdiff);
    
    // Power flow: S = V * I*
    const Iconj: ComplexNumber = { real: I.real, imag: -I.imag };
    const S = complexMultiply(V[i], Iconj);
    
    // Losses: I^2 * Z
    const I2 = complexMultiply(I, { real: I.real, imag: -I.imag });
    const Sloss = complexMultiply(I2, z);
    
    return {
      id: line.id,
      name: line.name,
      fromBus: line.fromBus,
      toBus: line.toBus,
      pFlow: S.real * baseMVA * 1000, // Convert to kW
      qFlow: S.imag * baseMVA * 1000, // Convert to kVAR
      losses: Math.abs(Sloss.real) * baseMVA * 1000, // Convert to kW
    };
  });

  // Prepare bus results
  const busResults = buses.map((bus, idx) => ({
    busNumber: idx + 1,
    voltage: bus.voltage,
    angle: (bus.angle * 180) / Math.PI, // Convert to degrees
    pGen: bus.pGen,
    qGen: bus.qGen,
    pLoad: bus.pLoad,
    qLoad: bus.qLoad,
  }));

  return {
    busResults,
    lineResults,
    convergence: {
      iterations: iteration,
      converged,
      error: maxError,
    },
  };
}

// Build Y-bus matrix with complex numbers
function buildYbusMatrix(
  lines: Array<{ fromBus: number; toBus: number; resistance: number; reactance: number }>,
  numBuses: number,
  baseZ: number
): ComplexNumber[][] {
  const Ybus: ComplexNumber[][] = Array(numBuses)
    .fill(null)
    .map(() => Array(numBuses).fill(null).map(() => ({ real: 0, imag: 0 })));

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
    Ybus[i][j] = complexSubtract(Ybus[i][j], y);
    Ybus[j][i] = complexSubtract(Ybus[j][i], y);
  });

  return Ybus;
}

// Complex number operations
function complexAdd(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return { real: a.real + b.real, imag: a.imag + b.imag };
}

function complexSubtract(a: ComplexNumber, b: ComplexNumber): ComplexNumber {
  return { real: a.real - b.real, imag: a.imag - b.imag };
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
    throw new Error('Complex division by near-zero value - invalid impedance configuration');
  }
  return {
    real: (a.real * b.real + a.imag * b.imag) / denominator,
    imag: (a.imag * b.real - a.real * b.imag) / denominator
  };
}