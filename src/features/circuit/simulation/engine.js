/**
 * Zentrion Circuit Simulator — Digital Logic Simulation Engine
 * True topological-sort (Kahn's algorithm) + iterative relaxation for cyclic feedback.
 * Supports:
 * - Logic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
 * - Input Devices: SWITCH, BUTTON, CONST0, CONST1, CLOCK
 * - Output Devices: LED, OUTPUT (Probe), SEG7 (7-Segment Display)
 * - Routing & Signal: SPLITTER
 * - Integrated Circuits (ICs): IC_7408, IC_7404, IC_7432, IC_7400, IC_7486, IC_7447
 */

// BCD to 7-Segment Active-HIGH Truth Table (0 to 15 / F)
const BCD_7SEG_TABLE = [
  [1, 1, 1, 1, 1, 1, 0], // 0: a, b, c, d, e, f
  [0, 1, 1, 0, 0, 0, 0], // 1: b, c
  [1, 1, 0, 1, 1, 0, 1], // 2: a, b, d, e, g
  [1, 1, 1, 1, 0, 0, 1], // 3: a, b, c, d, g
  [0, 1, 1, 0, 0, 1, 1], // 4: b, c, f, g
  [1, 0, 1, 1, 0, 1, 1], // 5: a, c, d, f, g
  [1, 0, 1, 1, 1, 1, 1], // 6: a, c, d, e, f, g
  [1, 1, 1, 0, 0, 0, 0], // 7: a, b, c
  [1, 1, 1, 1, 1, 1, 1], // 8: a, b, c, d, e, f, g
  [1, 1, 1, 1, 0, 1, 1], // 9: a, b, c, d, f, g
  [1, 1, 1, 0, 1, 1, 1], // A: a, b, c, e, f, g
  [0, 0, 1, 1, 1, 1, 1], // b: c, d, e, f, g
  [1, 0, 0, 1, 1, 1, 0], // C: a, d, e, f
  [0, 1, 1, 1, 1, 0, 1], // d: b, c, d, e, g
  [1, 0, 0, 1, 1, 1, 1], // E: a, d, e, f, g
  [1, 0, 0, 0, 1, 1, 1], // F: a, e, f, g
];

/** Evaluate one component given its resolved input values */
export function evaluateGate(type, inputs) {
  const a = inputs[0] ?? 0;
  const b = inputs[1] ?? 0;

  switch (type) {
    // ── Single & Dual Logic Gates ──
    case "AND":
      return [(a & b) & 1];
    case "OR":
      return [(a | b) & 1];
    case "NOT":
      return [a === 1 ? 0 : 1];
    case "NAND":
      return [((a & b) & 1) === 1 ? 0 : 1];
    case "NOR":
      return [((a | b) & 1) === 1 ? 0 : 1];
    case "XOR":
      return [(a ^ b) & 1];
    case "XNOR":
      return [((a ^ b) & 1) === 1 ? 0 : 1];

    // ── Input Devices (pass state) ──
    case "SWITCH":
    case "BUTTON":
    case "CLOCK":
      return [inputs[0] ?? 0];
    case "CONST0":
      return [0];
    case "CONST1":
      return [1];

    // ── Signal Splitter (1 Input → 2 Identical Outputs) ──
    case "SPLITTER":
      return [a, a];

    // ── Sink Outputs ──
    case "LED":
    case "OUTPUT":
    case "SEG7":
      return [];

    // ── Integrated Circuit: IC 7408 (Quad 2-Input AND) ──
    case "IC_7408": {
      const y1 = (inputs[0] ?? 0) & (inputs[1] ?? 0);
      const y2 = (inputs[2] ?? 0) & (inputs[3] ?? 0);
      const y3 = (inputs[4] ?? 0) & (inputs[5] ?? 0);
      const y4 = (inputs[6] ?? 0) & (inputs[7] ?? 0);
      return [y1 & 1, y2 & 1, y3 & 1, y4 & 1];
    }

    // ── Integrated Circuit: IC 7404 (Hex Inverter) ──
    case "IC_7404": {
      return [
        (inputs[0] ?? 0) === 1 ? 0 : 1,
        (inputs[1] ?? 0) === 1 ? 0 : 1,
        (inputs[2] ?? 0) === 1 ? 0 : 1,
        (inputs[3] ?? 0) === 1 ? 0 : 1,
        (inputs[4] ?? 0) === 1 ? 0 : 1,
        (inputs[5] ?? 0) === 1 ? 0 : 1,
      ];
    }

    // ── Integrated Circuit: IC 7432 (Quad 2-Input OR) ──
    case "IC_7432": {
      const y1 = (inputs[0] ?? 0) | (inputs[1] ?? 0);
      const y2 = (inputs[2] ?? 0) | (inputs[3] ?? 0);
      const y3 = (inputs[4] ?? 0) | (inputs[5] ?? 0);
      const y4 = (inputs[6] ?? 0) | (inputs[7] ?? 0);
      return [y1 & 1, y2 & 1, y3 & 1, y4 & 1];
    }

    // ── Integrated Circuit: IC 7400 (Quad 2-Input NAND) ──
    case "IC_7400": {
      const y1 = ((inputs[0] ?? 0) & (inputs[1] ?? 0)) === 1 ? 0 : 1;
      const y2 = ((inputs[2] ?? 0) & (inputs[3] ?? 0)) === 1 ? 0 : 1;
      const y3 = ((inputs[4] ?? 0) & (inputs[5] ?? 0)) === 1 ? 0 : 1;
      const y4 = ((inputs[6] ?? 0) & (inputs[7] ?? 0)) === 1 ? 0 : 1;
      return [y1, y2, y3, y4];
    }

    // ── Integrated Circuit: IC 7486 (Quad 2-Input XOR) ──
    case "IC_7486": {
      const y1 = (inputs[0] ?? 0) ^ (inputs[1] ?? 0);
      const y2 = (inputs[2] ?? 0) ^ (inputs[3] ?? 0);
      const y3 = (inputs[4] ?? 0) ^ (inputs[5] ?? 0);
      const y4 = (inputs[6] ?? 0) ^ (inputs[7] ?? 0);
      return [y1 & 1, y2 & 1, y3 & 1, y4 & 1];
    }

    // ── Integrated Circuit: IC 7447 (BCD to 7-Segment Decoder) ──
    case "IC_7447": {
      const bit0 = inputs[0] ?? 0;
      const bit1 = inputs[1] ?? 0;
      const bit2 = inputs[2] ?? 0;
      const bit3 = inputs[3] ?? 0;
      const val = (bit0 & 1) | ((bit1 & 1) << 1) | ((bit2 & 1) << 2) | ((bit3 & 1) << 3);
      return BCD_7SEG_TABLE[val] ? [...BCD_7SEG_TABLE[val]] : [0, 0, 0, 0, 0, 0, 0];
    }

    default:
      return [0];
  }
}

function setPinValue(map, compId, pinType, pinIdx, val) {
  map[`${compId}:${pinType}:${pinIdx}`] = val;
}
function getPinValue(map, compId, pinType, pinIdx) {
  return map[`${compId}:${pinType}:${pinIdx}`];
}

/** Returns pin counts and metadata for each component type */
export function getComponentDef(type) {
  const defs = {
    AND: { inputs: 2, outputs: 1, label: "AND Gate", category: "gate", description: "Output is HIGH (1) only when BOTH inputs are HIGH (1)." },
    OR: { inputs: 2, outputs: 1, label: "OR Gate", category: "gate", description: "Output is HIGH (1) when AT LEAST ONE input is HIGH (1)." },
    NOT: { inputs: 1, outputs: 1, label: "NOT Gate", category: "gate", description: "Inverts input signal: 0 becomes 1, and 1 becomes 0." },
    NAND: { inputs: 2, outputs: 1, label: "NAND Gate", category: "gate", description: "Universal gate. Output is LOW (0) only when both inputs are HIGH (1)." },
    NOR: { inputs: 2, outputs: 1, label: "NOR Gate", category: "gate", description: "Universal gate. Output is HIGH (1) only when both inputs are LOW (0)." },
    XOR: { inputs: 2, outputs: 1, label: "XOR Gate", category: "gate", description: "Exclusive OR. Output is HIGH (1) when inputs differ." },
    XNOR: { inputs: 2, outputs: 1, label: "XNOR Gate", category: "gate", description: "Exclusive NOR. Output is HIGH (1) when inputs are identical." },
    SWITCH: { inputs: 0, outputs: 1, label: "Toggle Switch", category: "input", description: "Click on canvas to toggle between logic 0 (LOW) and logic 1 (HIGH)." },
    BUTTON: { inputs: 0, outputs: 1, label: "Push Button", category: "input", description: "Momentary contact: outputs 1 while pressed and 0 when released." },
    CONST0: { inputs: 0, outputs: 1, label: "Logic 0 (GND)", category: "input", description: "Constant LOW voltage (ground / 0V)." },
    CONST1: { inputs: 0, outputs: 1, label: "Logic 1 (VCC)", category: "input", description: "Constant HIGH voltage (power supply / 5V)." },
    CLOCK: { inputs: 0, outputs: 1, label: "Clock Pulse", category: "input", description: "Oscillates continuously between 0 and 1 at a configurable frequency." },
    SPLITTER: { inputs: 1, outputs: 2, label: "Signal Splitter", category: "wiring", description: "Takes 1 input signal and duplicates it across 2 output lines." },
    LED: { inputs: 1, outputs: 0, label: "LED Indicator", category: "output", description: "Lights up bright red when input is HIGH (1), turns off when LOW (0)." },
    OUTPUT: { inputs: 1, outputs: 0, label: "Digital Probe", category: "output", description: "Displays exact digital logic state (0 or 1)." },
    SEG7: { inputs: 7, outputs: 0, label: "7-Segment Display", category: "output", description: "Displays decimal/hex digits across 7 independent inputs (a, b, c, d, e, f, g)." },

    // Supported Integrated Circuits
    IC_7408: { inputs: 8, outputs: 4, label: "IC 7408 (Quad AND)", category: "ic", description: "Standard DIP IC containing 4 independent 2-input AND gates." },
    IC_7404: { inputs: 6, outputs: 6, label: "IC 7404 (Hex Inverter)", category: "ic", description: "Standard DIP IC containing 6 independent NOT logic inverters." },
    IC_7432: { inputs: 8, outputs: 4, label: "IC 7432 (Quad OR)", category: "ic", description: "Standard DIP IC containing 4 independent 2-input OR gates." },
    IC_7400: { inputs: 8, outputs: 4, label: "IC 7400 (Quad NAND)", category: "ic", description: "Standard DIP IC containing 4 independent 2-input NAND gates." },
    IC_7486: { inputs: 8, outputs: 4, label: "IC 7486 (Quad XOR)", category: "ic", description: "Standard DIP IC containing 4 independent 2-input XOR gates." },
    IC_7447: { inputs: 4, outputs: 7, label: "IC 7447 (BCD to 7-Seg)", category: "ic", description: "Decodes 4-bit binary-coded decimal (A, B, C, D) into 7-segment display drivers (a-g)." },
  };
  return defs[type] || { inputs: 2, outputs: 1, label: type, category: "gate", description: "" };
}

/**
 * Run full digital logic simulation over the connected circuit graph.
 * Uses Kahn's algorithm for acyclic sections and iterative propagation for feedback loops.
 *
 * @param {Object[]} components – array of component instances
 * @param {Object[]} wires      – array of wire instances
 * @returns {{ results, wireValues, errors, warnings }}
 */
export function simulate(components, wires) {
  if (!components || !components.length) {
    return { results: {}, wireValues: {}, errors: [], warnings: [] };
  }

  const compMap = {};
  components.forEach(c => { compMap[c.id] = c; });

  const pinValues = {};
  const warnings = [];
  const errors = [];

  // 1. Seed input sources (Switches, Buttons, Constants, Clocks)
  components.forEach(c => {
    if (c.type === "CONST0") {
      setPinValue(pinValues, c.id, "out", 0, 0);
    } else if (c.type === "CONST1") {
      setPinValue(pinValues, c.id, "out", 0, 1);
    } else if (c.type === "SWITCH" || c.type === "BUTTON" || c.type === "CLOCK") {
      setPinValue(pinValues, c.id, "out", 0, c.state ?? 0);
    }
  });

  // 2. Build wire connections graph
  const inEdges = {};
  const outEdges = {};
  components.forEach(c => {
    inEdges[c.id] = [];
    outEdges[c.id] = [];
  });

  wires.forEach(w => {
    if (inEdges[w.toId] !== undefined) {
      inEdges[w.toId].push({ fromId: w.fromId, fromPinIdx: w.fromPinIdx, toPinIdx: w.toPinIdx, wireId: w.id });
    }
    if (outEdges[w.fromId] !== undefined) {
      outEdges[w.fromId].push(w.toId);
    }
  });

  // Check for floating inputs on logic gates
  components.forEach(c => {
    const def = getComponentDef(c.type);
    if (def.inputs > 0) {
      const connectedPins = new Set(inEdges[c.id].map(e => e.toPinIdx));
      if (connectedPins.size < def.inputs) {
        warnings.push(`${c.label || def.label} has ${def.inputs - connectedPins.size} unconnected input pin(s) (defaulting to 0).`);
      }
    }
  });

  // 3. Kahn's Topological Sort
  const inDegree = {};
  components.forEach(c => { inDegree[c.id] = 0; });

  const sources = new Set(["SWITCH", "BUTTON", "CONST0", "CONST1", "CLOCK"]);
  const topoQueue = [];

  components.forEach(c => {
    if (sources.has(c.type)) {
      topoQueue.push(c.id);
    } else {
      inDegree[c.id] = inEdges[c.id].length;
      if (inDegree[c.id] === 0) {
        topoQueue.push(c.id);
      }
    }
  });

  const processedInTopo = new Set();
  let qi = 0;

  while (qi < topoQueue.length) {
    const cid = topoQueue[qi++];
    if (processedInTopo.has(cid)) continue;
    processedInTopo.add(cid);

    const c = compMap[cid];
    if (c && !sources.has(c.type)) {
      const def = getComponentDef(c.type);
      const inputVals = [];
      for (let i = 0; i < def.inputs; i++) {
        inputVals.push(getPinValue(pinValues, cid, "in", i) ?? 0);
      }

      inEdges[cid].forEach(edge => {
        const upstreamOut = getPinValue(pinValues, edge.fromId, "out", edge.fromPinIdx);
        if (upstreamOut !== undefined) {
          inputVals[edge.toPinIdx] = upstreamOut;
          setPinValue(pinValues, cid, "in", edge.toPinIdx, upstreamOut);
        }
      });

      const outputs = evaluateGate(c.type, inputVals);
      outputs.forEach((val, idx) => setPinValue(pinValues, cid, "out", idx, val));
    }

    outEdges[cid].forEach(toId => {
      inDegree[toId] = Math.max(0, (inDegree[toId] ?? 1) - 1);
      if (inDegree[toId] === 0 && !processedInTopo.has(toId)) {
        topoQueue.push(toId);
      }
    });
  }

  // 4. Iterative propagation for feedback loops / sequential logic
  const unprocessed = components.filter(c => !processedInTopo.has(c.id));
  if (unprocessed.length > 0) {
    for (let pass = 0; pass < 5; pass++) {
      unprocessed.forEach(c => {
        const def = getComponentDef(c.type);
        const inputVals = [];
        for (let i = 0; i < def.inputs; i++) {
          inputVals.push(getPinValue(pinValues, c.id, "in", i) ?? 0);
        }
        inEdges[c.id].forEach(edge => {
          const upstreamOut = getPinValue(pinValues, edge.fromId, "out", edge.fromPinIdx);
          if (upstreamOut !== undefined) {
            inputVals[edge.toPinIdx] = upstreamOut;
            setPinValue(pinValues, c.id, "in", edge.toPinIdx, upstreamOut);
          }
        });
        const outputs = evaluateGate(c.type, inputVals);
        outputs.forEach((val, idx) => setPinValue(pinValues, c.id, "out", idx, val));
      });
    }
  }

  // 5. Ensure sink components (LED, OUTPUT, SEG7) have all input pins resolved
  components.forEach(c => {
    const def = getComponentDef(c.type);
    if (def.outputs === 0) {
      inEdges[c.id].forEach(edge => {
        const upstreamOut = getPinValue(pinValues, edge.fromId, "out", edge.fromPinIdx);
        if (upstreamOut !== undefined) {
          setPinValue(pinValues, c.id, "in", edge.toPinIdx, upstreamOut);
        }
      });
    }
  });

  // 6. Collect results per component
  const results = {};
  components.forEach(c => {
    const def = getComponentDef(c.type);
    const inputVals = Array.from({ length: def.inputs }, (_, i) => getPinValue(pinValues, c.id, "in", i) ?? 0);
    const outputVals = Array.from({ length: def.outputs }, (_, i) => getPinValue(pinValues, c.id, "out", i) ?? 0);
    results[c.id] = { inputValues: inputVals, outputValues: outputVals };
  });

  // 7. Wire signal values
  const wireValues = {};
  wires.forEach(w => {
    wireValues[w.id] = getPinValue(pinValues, w.fromId, "out", w.fromPinIdx) ?? 0;
  });

  return { results, wireValues, errors, warnings };
}

/** Generate a truth table for the circuit given its switches and output probes */
export function generateTruthTable(components, wires) {
  const switches = components.filter(c => c.type === "SWITCH");
  const outputs = components.filter(c => c.type === "LED" || c.type === "OUTPUT");
  if (!switches.length || !outputs.length) return null;
  if (switches.length > 6) return null; // limit to 2^6 = 64 combinations for instant calculation

  const rows = [];
  const combos = 1 << switches.length;

  for (let mask = 0; mask < combos; mask++) {
    const tempComponents = components.map(c => {
      if (c.type !== "SWITCH") return c;
      const idx = switches.findIndex(s => s.id === c.id);
      return { ...c, state: (mask >> (switches.length - 1 - idx)) & 1 };
    });

    const { results } = simulate(tempComponents, wires);
    const inputs = switches.map((s, i) => (mask >> (switches.length - 1 - i)) & 1);
    const outs = outputs.map(l => results[l.id]?.inputValues[0] ?? 0);
    rows.push({ inputs, outputs: outs });
  }

  return {
    inputLabels: switches.map((s, i) => s.label || `In ${i + 1}`),
    outputLabels: outputs.map((l, i) => l.label || `Out ${i + 1}`),
    rows,
  };
}
