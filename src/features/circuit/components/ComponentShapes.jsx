/**
 * Zentrion Circuit Simulator — Component SVG Shapes
 * ANSI/IEEE digital logic symbols, input/output indicators, and 7400-series ICs.
 * Pure SVG rendering styled with Zentrion theme variables.
 */

import React from "react";
import { getComponentDef } from "../simulation/engine.js";

export const COMP_W = 80;
export const COMP_H = 60;
export const SEG7_W = 100;
export const SEG7_H = 120;
export const IC_W = 130;
export const IC_H = 110;
export const IC_7447_H = 120;

/** Return component bounding box size */
export const compSize = (type) => {
  if (type === "SEG7") return { w: SEG7_W, h: SEG7_H };
  if (type === "IC_7447") return { w: IC_W, h: IC_7447_H };
  if (type.startsWith("IC_")) return { w: IC_W, h: IC_H };
  return { w: COMP_W, h: COMP_H };
};

/** Rotate a 2D point (px, py) around center (cx, cy) by angle degrees */
export function rotatePoint(px, py, cx, cy, angle = 0) {
  if (!angle) return { x: px, y: py };
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const nx = cos * (px - cx) - sin * (py - cy) + cx;
  const ny = sin * (px - cx) + cos * (py - cy) + cy;
  return { x: Math.round(nx), y: Math.round(ny) };
}

/** Pin positions relative to component origin, accounting for rotation */
export function getPinPositions(type, rotation = 0) {
  const def = getComponentDef(type);
  const { w: W, h: H } = compSize(type);
  const cx = W / 2;
  const cy = H / 2;

  let rawInputs = [];
  let rawOutputs = [];

  if (type === "SEG7") {
    const labels = ["a", "b", "c", "d", "e", "f", "g"];
    rawInputs = labels.map((lbl, i) => ({
      x: 0,
      y: Math.round(16 + i * (H - 32) / 6),
      label: lbl,
    }));
    rawOutputs = [];
  } else if (type === "SWITCH" || type === "BUTTON" || type === "CONST0" || type === "CONST1" || type === "CLOCK") {
    rawInputs = [];
    rawOutputs = [{ x: W, y: Math.round(H / 2), label: "Q" }];
  } else if (type === "LED" || type === "OUTPUT") {
    rawInputs = [{ x: 0, y: Math.round(H / 2), label: "IN" }];
    rawOutputs = [];
  } else if (type === "SPLITTER") {
    rawInputs = [{ x: 0, y: Math.round(H / 2), label: "IN" }];
    rawOutputs = [
      { x: W, y: Math.round(H * 0.33), label: "Q1" },
      { x: W, y: Math.round(H * 0.67), label: "Q2" },
    ];
  } else if (type === "IC_7408" || type === "IC_7432" || type === "IC_7400" || type === "IC_7486") {
    // Quad 2-Input Gate ICs (8 inputs on left, 4 outputs on right)
    const inLabels = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"];
    rawInputs = inLabels.map((lbl, i) => ({
      x: 0,
      y: Math.round(14 + i * (H - 28) / 7),
      label: lbl,
    }));
    const outLabels = ["1Y", "2Y", "3Y", "4Y"];
    rawOutputs = outLabels.map((lbl, i) => ({
      x: W,
      y: Math.round(20 + i * (H - 40) / 3),
      label: lbl,
    }));
  } else if (type === "IC_7404") {
    // Hex Inverter IC (6 inputs on left, 6 outputs on right)
    const inLabels = ["1A", "2A", "3A", "4A", "5A", "6A"];
    rawInputs = inLabels.map((lbl, i) => ({
      x: 0,
      y: Math.round(16 + i * (H - 32) / 5),
      label: lbl,
    }));
    const outLabels = ["1Y", "2Y", "3Y", "4Y", "5Y", "6Y"];
    rawOutputs = outLabels.map((lbl, i) => ({
      x: W,
      y: Math.round(16 + i * (H - 32) / 5),
      label: lbl,
    }));
  } else if (type === "IC_7447") {
    // BCD to 7-Segment Decoder (4 inputs on left: A, B, C, D; 7 outputs on right: a-g)
    const inLabels = ["A (1)", "B (2)", "C (4)", "D (8)"];
    rawInputs = inLabels.map((lbl, i) => ({
      x: 0,
      y: Math.round(22 + i * (H - 44) / 3),
      label: lbl,
    }));
    const outLabels = ["a", "b", "c", "d", "e", "f", "g"];
    rawOutputs = outLabels.map((lbl, i) => ({
      x: W,
      y: Math.round(14 + i * (H - 28) / 6),
      label: lbl,
    }));
  } else {
    // Standard 1-input or 2-input logic gates
    if (def.inputs === 1) {
      rawInputs = [{ x: 0, y: Math.round(H / 2), label: "A" }];
    } else if (def.inputs === 2) {
      rawInputs = [
        { x: 0, y: Math.round(H / 3), label: "A" },
        { x: 0, y: Math.round((2 * H) / 3), label: "B" },
      ];
    }
    if (def.outputs === 1) {
      rawOutputs = [{ x: W, y: Math.round(H / 2), label: "Y" }];
    }
  }

  // Apply rotation transformation
  const inputs = rawInputs.map(p => {
    const r = rotatePoint(p.x, p.y, cx, cy, rotation);
    return { ...p, x: r.x, y: r.y };
  });

  const outputs = rawOutputs.map(p => {
    const r = rotatePoint(p.x, p.y, cx, cy, rotation);
    return { ...p, x: r.x, y: r.y };
  });

  return { inputs, outputs };
}

/* ─────────────────────── Seven-Segment Display SVG ─────────────────────── */
function SevenSegDisplay({ inputValues = [] }) {
  const seg = inputValues;
  const on = "var(--primary, #0f766e)";
  const off = "rgba(100, 116, 139, 0.18)";
  const c = (i) => (seg[i] === 1 ? on : off);

  const bx = 14, by = 10, bw = 72, bh = 100;
  const t = 6;
  const p = 5;

  const x0 = bx + p + t;
  const x1 = bx + bw - p - t;
  const mx = bx + bw / 2;
  const y0 = by + p;
  const ym = by + bh / 2;
  const y1 = by + bh - p;

  const segLen = x1 - x0 - 2;
  const segVLen = ym - y0 - t - 2;

  // Compute hex digit if standard BCD or all match
  const binStr = [
    seg[0] ? 1 : 0,
    seg[1] ? 1 : 0,
    seg[2] ? 1 : 0,
    seg[3] ? 1 : 0,
    seg[4] ? 1 : 0,
    seg[5] ? 1 : 0,
    seg[6] ? 1 : 0,
  ].join("");

  const patterns = {
    "1111110": "0", "0110000": "1", "1101101": "2", "1111001": "3",
    "0110011": "4", "1011011": "5", "1011111": "6", "1110000": "7",
    "1111111": "8", "1111011": "9", "1110111": "A", "0011111": "b",
    "1001110": "C", "0111101": "d", "1001111": "E", "1000111": "F",
  };
  const char = patterns[binStr] || "";

  return (
    <>
      <rect x={bx} y={by} width={bw} height={bh} rx="8"
        fill="#0b0f19" stroke="var(--border)" strokeWidth="2" />
      <text x={mx} y={by - 3} textAnchor="middle" fontSize="8"
        fill="var(--text-muted)" fontWeight="800">7-SEGMENT</text>

      {/* Segment a (top horizontal) */}
      <rect x={x0 + 2} y={y0 + 1} width={segLen} height={t} rx="2" fill={c(0)} opacity={seg[0] ? 1 : 0.25} />
      {/* Segment b (top-right vertical) */}
      <rect x={x1} y={y0 + t + 1} width={t} height={segVLen} rx="2" fill={c(1)} opacity={seg[1] ? 1 : 0.25} />
      {/* Segment c (bot-right vertical) */}
      <rect x={x1} y={ym + 2} width={t} height={segVLen} rx="2" fill={c(2)} opacity={seg[2] ? 1 : 0.25} />
      {/* Segment d (bottom horizontal) */}
      <rect x={x0 + 2} y={y1 - t} width={segLen} height={t} rx="2" fill={c(3)} opacity={seg[3] ? 1 : 0.25} />
      {/* Segment e (bot-left vertical) */}
      <rect x={x0 - t} y={ym + 2} width={t} height={segVLen} rx="2" fill={c(4)} opacity={seg[4] ? 1 : 0.25} />
      {/* Segment f (top-left vertical) */}
      <rect x={x0 - t} y={y0 + t + 1} width={t} height={segVLen} rx="2" fill={c(5)} opacity={seg[5] ? 1 : 0.25} />
      {/* Segment g (middle horizontal) */}
      <rect x={x0 + 2} y={ym - t / 2} width={segLen} height={t} rx="2" fill={c(6)} opacity={seg[6] ? 1 : 0.25} />

      {/* Detected digit indicator badge */}
      {char ? (
        <text x={bx + bw - 10} y={by + bh - 6} fontSize="11" fill="var(--primary)" fontWeight="900">
          {char}
        </text>
      ) : (
        <text x={bx + bw - 10} y={by + bh - 6} fontSize="8" fill="var(--text-muted)" fontWeight="600">
          --
        </text>
      )}

      {/* Pin labels */}
      {["a","b","c","d","e","f","g"].map((lbl, i) => (
        <text key={lbl} x={2} y={Math.round(16 + i * (SEG7_H - 32) / 6 + 3.5)}
          fontSize="7" fill="var(--text-muted)" fontWeight="800">{lbl}</text>
      ))}
    </>
  );
}

/* ─────────────────────── Integrated Circuit (DIP-Package) SVG ─────────────────────── */
function ICShape({ type, inputValues = [], outputValues = [] }) {
  const { w: W, h: H } = compSize(type);
  const stroke = "var(--primary, #0f766e)";

  const icTitles = {
    IC_7408: { code: "SN7408N", title: "QUAD 2-IN AND", gates: "4x AND" },
    IC_7404: { code: "SN7404N", title: "HEX INVERTER", gates: "6x NOT" },
    IC_7432: { code: "SN7432N", title: "QUAD 2-IN OR",  gates: "4x OR"  },
    IC_7400: { code: "SN7400N", title: "QUAD 2-IN NAND",gates: "4x NAND"},
    IC_7486: { code: "SN7486N", title: "QUAD 2-IN XOR", gates: "4x XOR" },
    IC_7447: { code: "SN7447N", title: "BCD TO 7-SEG",  gates: "DECODER"},
  };

  const meta = icTitles[type] || { code: type, title: "INTEGRATED CIRCUIT", gates: "" };
  const pins = getPinPositions(type, 0);

  return (
    <>
      {/* DIP Package Body */}
      <rect
        x="10" y="8" width={W - 20} height={H - 16} rx="6"
        fill="#111827" stroke="var(--border)" strokeWidth="2"
      />
      {/* Semicircular orientation notch at top */}
      <path
        d={`M ${W / 2 - 8},8 A 8,8 0 0,0 ${W / 2 + 8},8`}
        fill="var(--background, #0f172a)"
        stroke="var(--border)"
        strokeWidth="1.6"
      />
      {/* Pin 1 orientation dimple */}
      <circle cx="18" cy="18" r="2.5" fill="#475569" />

      {/* Chip markings */}
      <text x={W / 2} y={H / 2 - 6} textAnchor="middle" fontSize="9" fill="#f8fafc" fontWeight="900" letterSpacing="0.08em">
        {meta.code}
      </text>
      <text x={W / 2} y={H / 2 + 7} textAnchor="middle" fontSize="6.5" fill="var(--primary)" fontWeight="800">
        {meta.title}
      </text>
      <text x={W / 2} y={H / 2 + 18} textAnchor="middle" fontSize="6" fill="#94a3b8" fontWeight="700">
        {meta.gates}
      </text>

      {/* Pin leads (left side) */}
      {pins.inputs.map((pin, i) => (
        <g key={`lead_in_${i}`}>
          <line x1="0" y1={pin.y} x2="10" y2={pin.y} stroke={stroke} strokeWidth="2" />
          <text x="12" y={pin.y + 3} fontSize="6" fill="#94a3b8" fontWeight="800">
            {pin.label}
          </text>
        </g>
      ))}

      {/* Pin leads (right side) */}
      {pins.outputs.map((pin, i) => (
        <g key={`lead_out_${i}`}>
          <line x1={W - 10} y1={pin.y} x2={W} y2={pin.y} stroke={stroke} strokeWidth="2" />
          <text x={W - 12} y={pin.y + 3} textAnchor="end" fontSize="6" fill="#94a3b8" fontWeight="800">
            {pin.label}
          </text>
        </g>
      ))}
    </>
  );
}

/* ─────────────────────── ComponentShape ─────────────────────── */
export function ComponentShape({ type, state = 0, outputValue = 0, inputValues = [], color = "red" }) {
  const fill   = "var(--card, #ffffff)";
  const stroke = "var(--primary, #0f766e)";
  const sw = 2.4;

  if (type.startsWith("IC_")) {
    return <ICShape type={type} inputValues={inputValues} outputValues={[]} />;
  }

  switch (type) {
    // ── AND GATE ──────────────────────────────────────────────
    case "AND":
      return (
        <>
          <path
            d="M 18,10 L 42,10 A 20,20 0 0,1 42,50 L 18,50 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <line x1="0" y1="20" x2="18" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="18" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="62" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── OR GATE ───────────────────────────────────────────────
    case "OR":
      return (
        <>
          <path
            d="M 16,10 Q 25,30 16,50 Q 38,50 64,30 Q 38,10 16,10 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <line x1="0" y1="20" x2="20.5" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="20.5" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="64" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── NOT GATE ──────────────────────────────────────────────
    case "NOT":
      return (
        <>
          <polygon
            points="18,12 58,30 18,48"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <circle cx="63" cy="30" r="4.5" fill={fill} stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="30" x2="18" y2="30" stroke={stroke} strokeWidth={sw} />
          <line x1="67.5" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── NAND GATE ─────────────────────────────────────────────
    case "NAND":
      return (
        <>
          <path
            d="M 16,10 L 38,10 A 20,20 0 0,1 38,50 L 16,50 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <circle cx="62" cy="30" r="4" fill={fill} stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="20" x2="16" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="16" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="66" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── NOR GATE ──────────────────────────────────────────────
    case "NOR":
      return (
        <>
          <path
            d="M 14,10 Q 23,30 14,50 Q 36,50 60,30 Q 36,10 14,10 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <circle cx="64" cy="30" r="4" fill={fill} stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="20" x2="18.5" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="18.5" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="68" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── XOR GATE ──────────────────────────────────────────────
    case "XOR":
      return (
        <>
          <path
            d="M 10,10 Q 19,30 10,50"
            fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round"
          />
          <path
            d="M 16,10 Q 25,30 16,50 Q 38,50 64,30 Q 38,10 16,10 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <line x1="0" y1="20" x2="14.5" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="14.5" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="64" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── XNOR GATE ─────────────────────────────────────────────
    case "XNOR":
      return (
        <>
          <path
            d="M 8,10 Q 17,30 8,50"
            fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round"
          />
          <path
            d="M 14,10 Q 23,30 14,50 Q 36,50 60,30 Q 36,10 14,10 Z"
            fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
          />
          <circle cx="64" cy="30" r="4" fill={fill} stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="20" x2="12.5" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="0" y1="40" x2="12.5" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="68" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── TOGGLE SWITCH ─────────────────────────────────────────
    case "SWITCH": {
      const on = state === 1;
      const trackFill = on ? "var(--primary, #0f766e)" : "var(--border, #cbd5e1)";
      const knobX = on ? 52 : 28;
      return (
        <g className="csd-switch-graphic">
          <rect x="6" y="8" width="68" height="44" rx="8" fill={fill} stroke={stroke} strokeWidth={sw} />
          <text x="40" y="5" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">SWITCH</text>
          {/* Switch slider track */}
          <rect x="18" y="20" width="44" height="20" rx="10" fill={trackFill} opacity={on ? 1 : 0.6} />
          {/* Track 0/1 indicator label */}
          <text x={on ? 30 : 50} y="34" textAnchor="middle" fontSize="10" fill={on ? "#ffffff" : "var(--text-muted)"} fontWeight="900">
            {on ? "1" : "0"}
          </text>
          {/* Switch slider knob */}
          <circle cx={knobX} cy="30" r="8" fill="#ffffff" stroke={on ? "var(--primary, #0f766e)" : "var(--text-muted)"} strokeWidth="2" />
          {/* Output connection stub */}
          <line x1="74" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
          {/* Switch Status text */}
          <text x="40" y="58" textAnchor="middle" fontSize="8" fill={on ? "var(--primary)" : "var(--text-muted)"} fontWeight="800">
            {on ? "ON (HIGH)" : "OFF (LOW)"}
          </text>
        </g>
      );
    }

    // ── PUSH BUTTON (Momentary Action) ────────────────────────
    case "BUTTON": {
      const pressed = state === 1;
      return (
        <>
          <rect x="8" y="8" width="64" height="44" rx="8" fill={fill} stroke={stroke} strokeWidth={sw} />
          <text x="40" y="6" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">BUTTON</text>
          <circle cx="40" cy="30" r={pressed ? 11 : 13}
            fill={pressed ? "var(--primary)" : "var(--primary-light, #e6f4f3)"}
            stroke={stroke} strokeWidth={sw} />
          <line x1="72" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
          <text x="40" y="58" textAnchor="middle" fontSize="8" fill={pressed ? "var(--primary)" : "var(--text-muted)"} fontWeight="800">
            {pressed ? "PRESSED (1)" : "HOLD / PUSH"}
          </text>
        </>
      );
    }

    // ── CONST 0 (GND) ─────────────────────────────────────────
    case "CONST0":
      return (
        <>
          <rect x="8" y="12" width="64" height="36" rx="8" fill="var(--card, #fff)" stroke={stroke} strokeWidth={sw} />
          <text x="40" y="28" textAnchor="middle" fontSize="18" fill="var(--text-muted)" fontWeight="900">0</text>
          <text x="40" y="42" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">GND (LOW)</text>
          <line x1="72" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── CONST 1 (VCC) ─────────────────────────────────────────
    case "CONST1":
      return (
        <>
          <rect x="8" y="12" width="64" height="36" rx="8" fill="var(--primary-light, #e6f4f3)" stroke={stroke} strokeWidth={sw} />
          <text x="40" y="28" textAnchor="middle" fontSize="18" fill="var(--primary)" fontWeight="900">1</text>
          <text x="40" y="42" textAnchor="middle" fontSize="8" fill="var(--primary)" fontWeight="700">VCC (HIGH)</text>
          <line x1="72" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
        </>
      );

    // ── CLOCK OSCILLATOR ──────────────────────────────────────
    case "CLOCK": {
      const active = state === 1;
      return (
        <>
          <rect x="8" y="10" width="64" height="40" rx="8"
            fill={active ? "var(--primary-light)" : fill} stroke={stroke} strokeWidth={sw} />
          <text x="40" y="8" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">CLOCK</text>
          <polyline points="14,34 14,22 26,22 26,34 38,34 38,22 50,22 50,34 62,34"
            fill="none" stroke={active ? stroke : "var(--text-muted)"} strokeWidth="2.2" />
          <line x1="72" y1="30" x2="80" y2="30" stroke={stroke} strokeWidth={sw} />
          <text x="40" y="58" textAnchor="middle" fontSize="8"
            fill={active ? "var(--primary)" : "var(--text-muted)"} fontWeight="800">
            {active ? "HIGH (1)" : "LOW (0)"}
          </text>
        </>
      );
    }

    // ── SIGNAL SPLITTER ───────────────────────────────────────
    case "SPLITTER":
      return (
        <>
          <line x1="0" y1="30" x2="40" y2="30" stroke={stroke} strokeWidth={sw} />
          <line x1="40" y1="20" x2="40" y2="40" stroke={stroke} strokeWidth={sw} />
          <line x1="40" y1="20" x2="80" y2="20" stroke={stroke} strokeWidth={sw} />
          <line x1="40" y1="40" x2="80" y2="40" stroke={stroke} strokeWidth={sw} />
          <circle cx="40" cy="30" r="4.5" fill={stroke} />
          <text x="40" y="10" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">SPLIT</text>
        </>
      );

    // ── LED INDICATOR ─────────────────────────────────────────
    case "LED": {
      const lit = outputValue === 1 || state === 1;
      const palette = {
        red: { on: "#ef4444", border: "#dc2626", off: "rgba(239, 68, 68, 0.2)" },
        green: { on: "#10b981", border: "#059669", off: "rgba(16, 185, 129, 0.2)" },
        blue: { on: "#3b82f6", border: "#2563eb", off: "rgba(59, 130, 246, 0.2)" },
        amber: { on: "#f59e0b", border: "#d97706", off: "rgba(245, 158, 11, 0.2)" },
      };
      const clr = palette[color] || palette.red;

      return (
        <>
          <defs>
            <filter id={`ledGlow_${color}_${lit ? 1 : 0}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line x1="0" y1="30" x2="16" y2="30" stroke={stroke} strokeWidth={sw} />
          <circle cx="40" cy="30" r="18"
            fill={lit ? clr.on : clr.off}
            stroke={lit ? clr.border : "rgba(100, 116, 139, 0.4)"}
            strokeWidth={sw}
            filter={lit ? `url(#ledGlow_${color}_1)` : "none"}
          />
          {lit && <circle cx="34" cy="24" r="4" fill="rgba(255,255,255,0.6)" />}
          <text x="40" y="34" textAnchor="middle" fontSize="10"
            fill={lit ? "#ffffff" : "var(--text-muted)"} fontWeight="900">
            {lit ? "ON" : "OFF"}
          </text>
          <text x="40" y="58" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">LED</text>
        </>
      );
    }

    // ── DIGITAL OUTPUT PROBE ──────────────────────────────────
    case "OUTPUT": {
      const val = outputValue ?? 0;
      const isHigh = val === 1;
      return (
        <>
          <line x1="0" y1="30" x2="8" y2="30" stroke={stroke} strokeWidth={sw} />
          <rect x="8" y="12" width="64" height="36" rx="8"
            fill={isHigh ? "var(--primary-light, #e6f4f3)" : fill} stroke={stroke} strokeWidth={sw} />
          <text x="40" y="30" textAnchor="middle" fontSize="20"
            fill={isHigh ? "var(--primary)" : "var(--text)"} fontWeight="900">{val}</text>
          <text x="40" y="43" textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="700">PROBE</text>
        </>
      );
    }

    // ── SEVEN-SEGMENT DISPLAY ─────────────────────────────────
    case "SEG7":
      return <SevenSegDisplay inputValues={inputValues} />;

    default:
      return (
        <>
          <rect x="8" y="8" width="64" height="44" rx="6" fill={fill} stroke={stroke} strokeWidth={sw} />
          <text x="40" y="34" textAnchor="middle" fontSize="11" fill={stroke} fontWeight="700">{type}</text>
        </>
      );
  }
}
