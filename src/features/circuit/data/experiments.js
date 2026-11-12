/**
 * Zentrion Circuit Lab — Guided Experiment Definitions
 * Pure digital logic circuit definitions for hands-on student experimentation.
 */

export const EXPERIMENTS = [
  // ── MILESTONE 1: COMBINED AND-NOT CIRCUIT ──────────────────────────────
  {
    id: "exp-and-not",
    title: "Combined AND-NOT Circuit",
    icon: "🔬",
    level: "Beginner",
    description: "Two switches feed into an AND gate, its output is inverted by a NOT gate, driving an LED indicator.",
    theory: "Logic Expression: Y = NOT(A AND B) = (A·B)̄\nThis composite circuit behaves identically to a NAND gate!\nTruth Table:\n  A=0, B=0 → AND=0 → NOT=1 → LED ON\n  A=1, B=0 → AND=0 → NOT=1 → LED ON\n  A=0, B=1 → AND=0 → NOT=1 → LED ON\n  A=1, B=1 → AND=1 → NOT=0 → LED OFF",
    steps: [
      "Observe the two switches connected to the AND gate inputs.",
      "The AND gate output connects directly to the NOT gate input.",
      "The NOT gate output powers the red LED.",
      "With both switches at 0: AND output is 0, NOT inverts it to 1, LED is ON.",
      "Toggle Switch A to 1 (Switch B remains 0): AND is still 0, LED remains ON.",
      "Now toggle Switch B to 1: BOTH inputs are 1, AND produces 1, NOT inverts to 0, LED turns OFF!",
    ],
    buildCircuit: () => {
      const swA  = { id: "an_swA",  type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const swB  = { id: "an_swB",  type: "SWITCH", x: 60,  y: 220, state: 0, label: "Switch B", rotation: 0 };
      const and  = { id: "an_and",  type: "AND",    x: 240, y: 140, state: 0, label: "AND Gate", rotation: 0 };
      const not  = { id: "an_not",  type: "NOT",    x: 420, y: 140, state: 0, label: "NOT Gate", rotation: 0 };
      const led  = { id: "an_led",  type: "LED",    x: 600, y: 140, state: 0, label: "Output LED", rotation: 0 };
      const components = [swA, swB, and, not, led];
      const wires = [
        { id: "an_w1", fromId: "an_swA", fromPinIdx: 0, toId: "an_and", toPinIdx: 0 },
        { id: "an_w2", fromId: "an_swB", fromPinIdx: 0, toId: "an_and", toPinIdx: 1 },
        { id: "an_w3", fromId: "an_and", fromPinIdx: 0, toId: "an_not", toPinIdx: 0 },
        { id: "an_w4", fromId: "an_not", fromPinIdx: 0, toId: "an_led", toPinIdx: 0 },
      ];
      return { components, wires, name: "Combined AND-NOT Circuit" };
    },
    buildChallenge: () => {
      // Hands-on mode: places components on canvas with NO wires!
      const swA  = { id: "an_swA",  type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const swB  = { id: "an_swB",  type: "SWITCH", x: 60,  y: 220, state: 0, label: "Switch B", rotation: 0 };
      const and  = { id: "an_and",  type: "AND",    x: 240, y: 140, state: 0, label: "AND Gate", rotation: 0 };
      const not  = { id: "an_not",  type: "NOT",    x: 420, y: 140, state: 0, label: "NOT Gate", rotation: 0 };
      const led  = { id: "an_led",  type: "LED",    x: 600, y: 140, state: 0, label: "Output LED", rotation: 0 };
      return { components: [swA, swB, and, not, led], wires: [], name: "Hands-on: Build AND-NOT Circuit" };
    },
  },

  // ── TWO SWITCHES → OR GATE → XOR GATE → LED ──────────────────────────────
  {
    id: "exp-or-xor",
    title: "OR → XOR Cascade Circuit",
    icon: "🔀",
    level: "Beginner",
    description: "Two switches feed into an OR gate, which connects to an XOR gate with Switch B, driving an LED indicator.",
    theory: "Logic Expression: Y = (A OR B) ⊕ B = A · B̄\nTruth Table:\n  A=0, B=0 → OR=0, XOR(0,0)=0 → LED OFF (0)\n  A=0, B=1 → OR=1, XOR(1,1)=0 → LED OFF (0)\n  A=1, B=0 → OR=1, XOR(1,0)=1 → LED ON  (1)\n  A=1, B=1 → OR=1, XOR(1,1)=0 → LED OFF (0)",
    steps: [
      "Click Switch A and Switch B to observe the 4 combinations (00, 01, 10, 11).",
      "Notice that the OR gate output is HIGH whenever A=1 or B=1.",
      "The XOR gate compares the OR output with Switch B.",
      "The LED turns ON ONLY when Switch A=1 and Switch B=0!",
    ],
    buildCircuit: () => {
      const swA  = { id: "ox_swA",  type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const swB  = { id: "ox_swB",  type: "SWITCH", x: 60,  y: 240, state: 0, label: "Switch B", rotation: 0 };
      const orG  = { id: "ox_or",   type: "OR",     x: 240, y: 130, state: 0, label: "OR Gate", rotation: 0 };
      const xorG = { id: "ox_xor",  type: "XOR",    x: 420, y: 170, state: 0, label: "XOR Gate", rotation: 0 };
      const led  = { id: "ox_led",  type: "LED",    x: 600, y: 170, state: 0, label: "Output LED", rotation: 0 };
      const components = [swA, swB, orG, xorG, led];
      const wires = [
        { id: "ox_w1", fromId: "ox_swA", fromPinIdx: 0, toId: "ox_or",  toPinIdx: 0 },
        { id: "ox_w2", fromId: "ox_swB", fromPinIdx: 0, toId: "ox_or",  toPinIdx: 1 },
        { id: "ox_w3", fromId: "ox_or",  fromPinIdx: 0, toId: "ox_xor", toPinIdx: 0 },
        { id: "ox_w4", fromId: "ox_swB", fromPinIdx: 0, toId: "ox_xor", toPinIdx: 1 },
        { id: "ox_w5", fromId: "ox_xor", fromPinIdx: 0, toId: "ox_led", toPinIdx: 0 },
      ];
      return { components, wires, name: "OR → XOR Cascade Circuit" };
    },
    buildChallenge: () => {
      const swA  = { id: "ox_swA",  type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const swB  = { id: "ox_swB",  type: "SWITCH", x: 60,  y: 240, state: 0, label: "Switch B", rotation: 0 };
      const orG  = { id: "ox_or",   type: "OR",     x: 240, y: 130, state: 0, label: "OR Gate", rotation: 0 };
      const xorG = { id: "ox_xor",  type: "XOR",    x: 420, y: 170, state: 0, label: "XOR Gate", rotation: 0 };
      const led  = { id: "ox_led",  type: "LED",    x: 600, y: 170, state: 0, label: "Output LED", rotation: 0 };
      return { components: [swA, swB, orG, xorG, led], wires: [], name: "Hands-on: Build OR-XOR Circuit" };
    },
  },

  // ── AND GATE ─────────────────────────────────────────────────────────────
  {
    id: "exp-and",
    title: "AND Gate",
    icon: "🔌",
    level: "Beginner",
    description: "Explore the AND gate. The output is HIGH only when BOTH inputs are HIGH.",
    theory: "Boolean Expression: Y = A · B\nTruth table:\n  0 · 0 = 0\n  1 · 0 = 0\n  0 · 1 = 0\n  1 · 1 = 1",
    steps: [
      "Click Switch A to turn it HIGH (wire turns teal).",
      "Notice the LED remains OFF because Switch B is still LOW (0).",
      "Click Switch B to turn it HIGH as well.",
      "Now both inputs are 1: the AND gate produces 1 and the LED glows brightly!",
    ],
    buildCircuit: () => {
      const sw1 = { id: "e1_sw1", type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const sw2 = { id: "e1_sw2", type: "SWITCH", x: 60,  y: 200, state: 0, label: "Switch B", rotation: 0 };
      const and = { id: "e1_and", type: "AND",    x: 240, y: 130, state: 0, label: "AND Gate", rotation: 0 };
      const led = { id: "e1_led", type: "LED",    x: 420, y: 130, state: 0, label: "Output LED", rotation: 0 };
      return {
        components: [sw1, sw2, and, led],
        wires: [
          { id: "e1_w1", fromId: "e1_sw1", fromPinIdx: 0, toId: "e1_and", toPinIdx: 0 },
          { id: "e1_w2", fromId: "e1_sw2", fromPinIdx: 0, toId: "e1_and", toPinIdx: 1 },
          { id: "e1_w3", fromId: "e1_and", fromPinIdx: 0, toId: "e1_led", toPinIdx: 0 },
        ],
        name: "AND Gate Experiment",
      };
    },
    buildChallenge: () => {
      const sw1 = { id: "e1_sw1", type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const sw2 = { id: "e1_sw2", type: "SWITCH", x: 60,  y: 200, state: 0, label: "Switch B", rotation: 0 };
      const and = { id: "e1_and", type: "AND",    x: 240, y: 130, state: 0, label: "AND Gate", rotation: 0 };
      const led = { id: "e1_led", type: "LED",    x: 420, y: 130, state: 0, label: "Output LED", rotation: 0 };
      return { components: [sw1, sw2, and, led], wires: [], name: "Hands-on: Wire an AND Gate" };
    },
  },

  // ── OR GATE ──────────────────────────────────────────────────────────────
  {
    id: "exp-or",
    title: "OR Gate",
    icon: "⚡",
    level: "Beginner",
    description: "Explore the OR gate. The output is HIGH when AT LEAST ONE input is HIGH.",
    theory: "Boolean Expression: Y = A + B\nTruth table:\n  0 + 0 = 0\n  1 + 0 = 1\n  0 + 1 = 1\n  1 + 1 = 1",
    steps: [
      "Both switches start LOW (0) — LED is OFF.",
      "Toggle only Switch A HIGH → LED illuminates immediately.",
      "Toggle Switch A LOW, then Switch B HIGH → LED stays ON.",
      "Turn both switches HIGH → LED remains ON.",
    ],
    buildCircuit: () => {
      const sw1 = { id: "e2_sw1", type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const sw2 = { id: "e2_sw2", type: "SWITCH", x: 60,  y: 200, state: 0, label: "Switch B", rotation: 0 };
      const or  = { id: "e2_or",  type: "OR",     x: 240, y: 130, state: 0, label: "OR Gate", rotation: 0 };
      const led = { id: "e2_led", type: "LED",    x: 420, y: 130, state: 0, label: "Output LED", rotation: 0 };
      return {
        components: [sw1, sw2, or, led],
        wires: [
          { id: "e2_w1", fromId: "e2_sw1", fromPinIdx: 0, toId: "e2_or",  toPinIdx: 0 },
          { id: "e2_w2", fromId: "e2_sw2", fromPinIdx: 0, toId: "e2_or",  toPinIdx: 1 },
          { id: "e2_w3", fromId: "e2_or",  fromPinIdx: 0, toId: "e2_led", toPinIdx: 0 },
        ],
        name: "OR Gate Experiment",
      };
    },
  },

  // ── NOT GATE ─────────────────────────────────────────────────────────────
  {
    id: "exp-not",
    title: "NOT Gate (Inverter)",
    icon: "🔁",
    level: "Beginner",
    description: "Inverts the input signal: 0 becomes 1, and 1 becomes 0.",
    theory: "Boolean Expression: Y = Ā\nTruth table:\n  Input 0 → Output 1\n  Input 1 → Output 0",
    steps: [
      "Switch starts at 0 (LOW) — LED is illuminated because NOT 0 = 1.",
      "Click the switch to flip it to 1 (HIGH) — the LED turns OFF instantly.",
    ],
    buildCircuit: () => {
      const sw  = { id: "e3_sw",  type: "SWITCH", x: 60,  y: 140, state: 0, label: "Input Switch", rotation: 0 };
      const not = { id: "e3_not", type: "NOT",    x: 240, y: 140, state: 0, label: "NOT Inverter", rotation: 0 };
      const led = { id: "e3_led", type: "LED",    x: 420, y: 140, state: 0, label: "Output LED", rotation: 0 };
      return {
        components: [sw, not, led],
        wires: [
          { id: "e3_w1", fromId: "e3_sw",  fromPinIdx: 0, toId: "e3_not", toPinIdx: 0 },
          { id: "e3_w2", fromId: "e3_not", fromPinIdx: 0, toId: "e3_led", toPinIdx: 0 },
        ],
        name: "NOT Gate Experiment",
      };
    },
  },

  // ── NAND GATE ────────────────────────────────────────────────────────────
  {
    id: "exp-nand",
    title: "NAND Gate (Universal)",
    icon: "🔗",
    level: "Beginner",
    description: "Universal gate. Output is LOW only when BOTH inputs are HIGH.",
    theory: "Expression: Y = (A·B)̄\nTruth table:\n  0,0 → 1\n  1,0 → 1\n  0,1 → 1\n  1,1 → 0",
    steps: [
      "Both switches LOW → LED is ON.",
      "Turn either switch HIGH → LED remains ON.",
      "Turn BOTH switches HIGH → LED turns OFF.",
    ],
    buildCircuit: () => {
      const sw1  = { id: "e4_sw1",  type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const sw2  = { id: "e4_sw2",  type: "SWITCH", x: 60,  y: 200, state: 0, label: "Switch B", rotation: 0 };
      const nand = { id: "e4_nand", type: "NAND",   x: 240, y: 130, state: 0, label: "NAND Gate", rotation: 0 };
      const led  = { id: "e4_led",  type: "LED",    x: 420, y: 130, state: 0, label: "Output LED", rotation: 0 };
      return {
        components: [sw1, sw2, nand, led],
        wires: [
          { id: "e4_w1", fromId: "e4_sw1",  fromPinIdx: 0, toId: "e4_nand", toPinIdx: 0 },
          { id: "e4_w2", fromId: "e4_sw2",  fromPinIdx: 0, toId: "e4_nand", toPinIdx: 1 },
          { id: "e4_w3", fromId: "e4_nand", fromPinIdx: 0, toId: "e4_led",  toPinIdx: 0 },
        ],
        name: "NAND Gate Experiment",
      };
    },
  },

  // ── NOR GATE ─────────────────────────────────────────────────────────────
  {
    id: "exp-nor",
    title: "NOR Gate (Universal)",
    icon: "🛡️",
    level: "Beginner",
    description: "Universal gate. Output is HIGH only when BOTH inputs are LOW.",
    theory: "Expression: Y = (A+B)̄\nTruth table:\n  0,0 → 1\n  1,0 → 0\n  0,1 → 0\n  1,1 → 0",
    steps: [
      "Both switches LOW → LED is ON.",
      "Flip either switch to HIGH → LED turns OFF.",
    ],
    buildCircuit: () => {
      const sw1 = { id: "en_sw1", type: "SWITCH", x: 60,  y: 100, state: 0, label: "Switch A", rotation: 0 };
      const sw2 = { id: "en_sw2", type: "SWITCH", x: 60,  y: 200, state: 0, label: "Switch B", rotation: 0 };
      const nor = { id: "en_nor", type: "NOR",    x: 240, y: 130, state: 0, label: "NOR Gate", rotation: 0 };
      const led = { id: "en_led", type: "LED",    x: 420, y: 130, state: 0, label: "Output LED", rotation: 0 };
      return {
        components: [sw1, sw2, nor, led],
        wires: [
          { id: "en_w1", fromId: "en_sw1", fromPinIdx: 0, toId: "en_nor", toPinIdx: 0 },
          { id: "en_w2", fromId: "en_sw2", fromPinIdx: 0, toId: "en_nor", toPinIdx: 1 },
          { id: "en_w3", fromId: "en_nor", fromPinIdx: 0, toId: "en_led", toPinIdx: 0 },
        ],
        name: "NOR Gate Experiment",
      };
    },
  },

  // ── HALF ADDER ───────────────────────────────────────────────────────────
  {
    id: "exp-half-adder",
    title: "Half Adder Circuit",
    icon: "➕",
    level: "Intermediate",
    description: "Adds two 1-bit numbers to produce Sum (XOR) and Carry (AND).",
    theory: "Equations:\n  Sum   = A ⊕ B (XOR)\n  Carry = A · B (AND)\nValues:\n  0 + 0 = 0 (Sum 0, Carry 0)\n  1 + 0 = 1 (Sum 1, Carry 0)\n  0 + 1 = 1 (Sum 1, Carry 0)\n  1 + 1 = 10₂ (Sum 0, Carry 1)",
    steps: [
      "Switch A and Switch B represent the two binary bits being added.",
      "Sum LED reflects the XOR output.",
      "Carry LED reflects the AND output.",
      "Toggle A=1, B=1: Sum goes 0, Carry turns 1 (representing binary 10, decimal 2).",
    ],
    buildCircuit: () => {
      const swA  = { id: "ha_swA",  type: "SWITCH", x: 40,  y: 80,  state: 0, label: "Bit A", rotation: 0 };
      const swB  = { id: "ha_swB",  type: "SWITCH", x: 40,  y: 220, state: 0, label: "Bit B", rotation: 0 };
      const xor  = { id: "ha_xor",  type: "XOR",    x: 220, y: 90,  state: 0, label: "XOR (Sum)", rotation: 0 };
      const and  = { id: "ha_and",  type: "AND",    x: 220, y: 220, state: 0, label: "AND (Carry)", rotation: 0 };
      const ledS = { id: "ha_ledS", type: "LED",    x: 420, y: 90,  state: 0, label: "Sum (S)", rotation: 0 };
      const ledC = { id: "ha_ledC", type: "LED",    x: 420, y: 220, state: 0, label: "Carry (C)", rotation: 0 };
      return {
        components: [swA, swB, xor, and, ledS, ledC],
        wires: [
          { id: "ha_w1", fromId: "ha_swA", fromPinIdx: 0, toId: "ha_xor",  toPinIdx: 0 },
          { id: "ha_w2", fromId: "ha_swB", fromPinIdx: 0, toId: "ha_xor",  toPinIdx: 1 },
          { id: "ha_w3", fromId: "ha_swA", fromPinIdx: 0, toId: "ha_and",  toPinIdx: 0 },
          { id: "ha_w4", fromId: "ha_swB", fromPinIdx: 0, toId: "ha_and",  toPinIdx: 1 },
          { id: "ha_w5", fromId: "ha_xor", fromPinIdx: 0, toId: "ha_ledS", toPinIdx: 0 },
          { id: "ha_w6", fromId: "ha_and", fromPinIdx: 0, toId: "ha_ledC", toPinIdx: 0 },
        ],
        name: "Half Adder",
      };
    },
  },

  // ── FULL ADDER ───────────────────────────────────────────────────────────
  {
    id: "exp-full-adder",
    title: "Full Adder Circuit",
    icon: "🔢",
    level: "Intermediate",
    description: "Adds three inputs: A, B, and Carry-In (Cin) to generate Sum and Carry-Out (Cout).",
    theory: "Built from two Half Adders and an OR gate:\n  Sum  = A ⊕ B ⊕ Cin\n  Cout = (A·B) + (Cin · (A ⊕ B))\nWhen A=1, B=1, Cin=1 → Sum=1, Cout=1 (binary 11₂ = 3).",
    steps: [
      "Three switches represent Bit A, Bit B, and Cin.",
      "Test all 8 combinations (000 through 111).",
      "Notice how Cout feeds cleanly into the next stage of an ALU.",
    ],
    buildCircuit: () => {
      const swA   = { id: "fa_swA",   type: "SWITCH", x: 20,  y: 60,  state: 0, label: "Bit A", rotation: 0 };
      const swB   = { id: "fa_swB",   type: "SWITCH", x: 20,  y: 180, state: 0, label: "Bit B", rotation: 0 };
      const swCin = { id: "fa_swCin", type: "SWITCH", x: 20,  y: 300, state: 0, label: "Cin", rotation: 0 };
      const xor1  = { id: "fa_xor1",  type: "XOR",    x: 180, y: 100, state: 0, label: "XOR 1", rotation: 0 };
      const xor2  = { id: "fa_xor2",  type: "XOR",    x: 360, y: 150, state: 0, label: "XOR 2", rotation: 0 };
      const and1  = { id: "fa_and1",  type: "AND",    x: 180, y: 230, state: 0, label: "AND 1", rotation: 0 };
      const and2  = { id: "fa_and2",  type: "AND",    x: 360, y: 270, state: 0, label: "AND 2", rotation: 0 };
      const or1   = { id: "fa_or1",   type: "OR",     x: 520, y: 240, state: 0, label: "OR Gate", rotation: 0 };
      const ledS  = { id: "fa_ledS",  type: "LED",    x: 540, y: 140, state: 0, label: "Sum (S)", rotation: 0 };
      const ledC  = { id: "fa_ledC",  type: "LED",    x: 680, y: 240, state: 0, label: "Cout", rotation: 0 };
      return {
        components: [swA, swB, swCin, xor1, xor2, and1, and2, or1, ledS, ledC],
        wires: [
          { id: "fa_w1",  fromId: "fa_swA",   fromPinIdx: 0, toId: "fa_xor1", toPinIdx: 0 },
          { id: "fa_w2",  fromId: "fa_swB",   fromPinIdx: 0, toId: "fa_xor1", toPinIdx: 1 },
          { id: "fa_w3",  fromId: "fa_swA",   fromPinIdx: 0, toId: "fa_and1", toPinIdx: 0 },
          { id: "fa_w4",  fromId: "fa_swB",   fromPinIdx: 0, toId: "fa_and1", toPinIdx: 1 },
          { id: "fa_w5",  fromId: "fa_xor1",  fromPinIdx: 0, toId: "fa_xor2", toPinIdx: 0 },
          { id: "fa_w6",  fromId: "fa_swCin", fromPinIdx: 0, toId: "fa_xor2", toPinIdx: 1 },
          { id: "fa_w7",  fromId: "fa_xor1",  fromPinIdx: 0, toId: "fa_and2", toPinIdx: 0 },
          { id: "fa_w8",  fromId: "fa_swCin", fromPinIdx: 0, toId: "fa_and2", toPinIdx: 1 },
          { id: "fa_w9",  fromId: "fa_and1",  fromPinIdx: 0, toId: "fa_or1",  toPinIdx: 0 },
          { id: "fa_w10", fromId: "fa_and2",  fromPinIdx: 0, toId: "fa_or1",  toPinIdx: 1 },
          { id: "fa_w11", fromId: "fa_xor2",  fromPinIdx: 0, toId: "fa_ledS", toPinIdx: 0 },
          { id: "fa_w12", fromId: "fa_or1",   fromPinIdx: 0, toId: "fa_ledC", toPinIdx: 0 },
        ],
        name: "Full Adder",
      };
    },
  },

  // ── MULTIPLEXER ──────────────────────────────────────────────────────────
  {
    id: "exp-mux",
    title: "2-to-1 Multiplexer (MUX)",
    icon: "🔀",
    level: "Intermediate",
    description: "Selects between two data inputs (D0, D1) based on a control select line (S).",
    theory: "Logic Expression:\n  Y = (D0 · S̄) + (D1 · S)\nWhen S=0, output Y follows D0.\nWhen S=1, output Y follows D1.",
    steps: [
      "Select Switch (S) starts at 0: Output follows Data Input D0.",
      "Toggle D0 to see the output respond.",
      "Flip Select S to 1: Now Output ignores D0 and strictly follows D1!",
    ],
    buildCircuit: () => {
      const swD0 = { id: "mx_d0", type: "SWITCH", x: 40,  y: 60,  state: 1, label: "Data D0", rotation: 0 };
      const swD1 = { id: "mx_d1", type: "SWITCH", x: 40,  y: 200, state: 0, label: "Data D1", rotation: 0 };
      const swS  = { id: "mx_s",  type: "SWITCH", x: 40,  y: 330, state: 0, label: "Select S", rotation: 0 };
      const notS = { id: "mx_not", type: "NOT",   x: 200, y: 320, state: 0, label: "NOT S", rotation: 0 };
      const and0 = { id: "mx_a0", type: "AND",    x: 360, y: 80,  state: 0, label: "AND (D0·S̄)", rotation: 0 };
      const and1 = { id: "mx_a1", type: "AND",    x: 360, y: 220, state: 0, label: "AND (D1·S)", rotation: 0 };
      const orY  = { id: "mx_or", type: "OR",     x: 520, y: 150, state: 0, label: "OR (Y)", rotation: 0 };
      const ledY = { id: "mx_led", type: "LED",   x: 680, y: 150, state: 0, label: "Selected Y", rotation: 0 };
      return {
        components: [swD0, swD1, swS, notS, and0, and1, orY, ledY],
        wires: [
          { id: "mx_w1", fromId: "mx_d0",  fromPinIdx: 0, toId: "mx_a0",  toPinIdx: 0 },
          { id: "mx_w2", fromId: "mx_s",   fromPinIdx: 0, toId: "mx_not", toPinIdx: 0 },
          { id: "mx_w3", fromId: "mx_not", fromPinIdx: 0, toId: "mx_a0",  toPinIdx: 1 },
          { id: "mx_w4", fromId: "mx_d1",  fromPinIdx: 0, toId: "mx_a1",  toPinIdx: 0 },
          { id: "mx_w5", fromId: "mx_s",   fromPinIdx: 0, toId: "mx_a1",  toPinIdx: 1 },
          { id: "mx_w6", fromId: "mx_a0",  fromPinIdx: 0, toId: "mx_or",  toPinIdx: 0 },
          { id: "mx_w7", fromId: "mx_a1",  fromPinIdx: 0, toId: "mx_or",  toPinIdx: 1 },
          { id: "mx_w8", fromId: "mx_or",  fromPinIdx: 0, toId: "mx_led", toPinIdx: 0 },
        ],
        name: "2-to-1 Multiplexer",
      };
    },
  },

  // ── SEVEN-SEGMENT DISPLAY ────────────────────────────────────────────────
  {
    id: "exp-seg7",
    title: "Seven-Segment Display Driver",
    icon: "📟",
    level: "Intermediate",
    description: "Control all 7 segments (a, b, c, d, e, f, g) independently to form digits 0 through 9.",
    theory: "To display digit '8': Turn ON all segments a, b, c, d, e, f, g.\nTo display digit '1': Turn ON segments b and c.\nTo display digit '0': Turn ON all except segment g.",
    steps: [
      "The 7 switches on the left correspond directly to segments a through g.",
      "Turn on 'b' and 'c' → notice the number 1 appears on the display!",
      "Turn on 'a', 'b', 'g', 'e', 'd' → the number 2 appears!",
      "Experiment forming letters like A, C, E, and F.",
    ],
    buildCircuit: () => {
      const labels = ["a", "b", "c", "d", "e", "f", "g"];
      const switches = labels.map((lbl, i) => ({
        id: `s7_sw_${lbl}`,
        type: "SWITCH",
        x: 60,
        y: 40 + i * 50,
        state: [0, 1, 2, 3, 4, 5].includes(i) ? 1 : 0, // Digit '0' preset
        label: `Seg ${lbl}`,
        rotation: 0,
      }));
      const seg7 = { id: "s7_disp", type: "SEG7", x: 300, y: 120, state: 0, label: "Display", rotation: 0 };
      const wires = labels.map((lbl, i) => ({
        id: `s7_w_${lbl}`,
        fromId: `s7_sw_${lbl}`,
        fromPinIdx: 0,
        toId: "s7_disp",
        toPinIdx: i,
      }));
      return {
        components: [...switches, seg7],
        wires,
        name: "Seven-Segment Display",
      };
    },
  },

  // ── BINARY COUNTER / CLOCK OSCILLATOR ────────────────────────────────────
  {
    id: "exp-clock-oscillator",
    title: "Clock Pulse & Flip-Flop",
    icon: "⏱️",
    level: "Intermediate",
    description: "Watch a clock signal oscillate automatically and toggle an inverter and LED.",
    theory: "Sequential digital systems rely on clock pulses for synchronization.\nClock produces continuous alternating 0 and 1 pulses.",
    steps: [
      "Watch the Clock oscillator icon pulse.",
      "The NOT gate inverts each pulse in real-time.",
      "The Probe component tracks the fluctuating values.",
    ],
    buildCircuit: () => {
      const clk   = { id: "ck_clk", type: "CLOCK",  x: 60,  y: 120, state: 0, label: "Clock Pulse", rotation: 0 };
      const not   = { id: "ck_not", type: "NOT",    x: 240, y: 120, state: 0, label: "Inverter", rotation: 0 };
      const probe = { id: "ck_prb", type: "OUTPUT", x: 420, y: 80,  state: 0, label: "Inverted Q", rotation: 0 };
      const led   = { id: "ck_led", type: "LED",    x: 420, y: 180, state: 0, label: "Pulse LED", rotation: 0 };
      return {
        components: [clk, not, probe, led],
        wires: [
          { id: "ck_w1", fromId: "ck_clk", fromPinIdx: 0, toId: "ck_not", toPinIdx: 0 },
          { id: "ck_w2", fromId: "ck_not", fromPinIdx: 0, toId: "ck_prb", toPinIdx: 0 },
          { id: "ck_w3", fromId: "ck_not", fromPinIdx: 0, toId: "ck_led", toPinIdx: 0 },
        ],
        name: "Clock Pulse & Flip-Flop",
      };
    },
  },
];

export const experiments = EXPERIMENTS;
export default EXPERIMENTS;
