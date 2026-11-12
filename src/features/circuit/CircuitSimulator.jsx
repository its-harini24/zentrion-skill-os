/**
 * Zentrion Circuit Simulator — Visual Digital Electronics Design & Simulation Lab
 * Inspired by CircuitVerse, Logisim Evolution, and Tinkercad Circuits.
 * Designed with Zentrion's blue-green design system.
 *
 * Wire interaction rewrite (v2):
 * - Mouse position tracked via ref + direct SVG DOM mutation → zero re-render jitter
 * - Pan/zoom live-synced to refs for stable svgPoint() without stale closures
 * - Orthogonal (elbow) wire routing — no curve instability
 * - Enlarged pin hit targets (r=14) with visual feedback rings
 * - Drag threshold prevents accidental drags on click
 * - Right-click / Escape cancels in-progress wire
 */

import React, {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/common/ThemeToggle/ThemeToggle";
import zentrionLogo from "../../assets/zentrion-logo.png";
import { simulate, getComponentDef, generateTruthTable } from "./simulation/engine.js";
import {
  ComponentShape, getPinPositions, compSize, COMP_W, COMP_H, SEG7_W, SEG7_H, IC_W, IC_H,
} from "./components/ComponentShapes.jsx";
import { EXPERIMENTS } from "./data/experiments.js";
import "./CircuitSimulator.css";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const PIN_R       = 8;    // visible pin circle radius (large & easy to see)
const PIN_HIT_R   = 16;   // invisible click-target radius (32px diameter — easy to click)
const GRID        = 20;
const DRAG_THRESH = 4;    // pixels of movement before we commit to a drag

let _uid = 100;
const uid  = () => `c${_uid++}`;
const wuid = () => `w${_uid++}`;

const snap = (v) => Math.round(v / GRID) * GRID;

/* ─── Clean orthogonal wire routing (horizontal & vertical segments only) ─── */
function orthoPath(x1, y1, x2, y2) {
  if (x2 >= x1 + 16) {
    // Forward left-to-right connection: step out horizontally, turn vertically, enter horizontally
    const mx = Math.round((x1 + x2) / 2);
    return `M ${x1},${y1} H ${mx} V ${y2} H ${x2}`;
  }
  // Reverse or aligned connection: step out right, route around, enter input from left
  const exitX  = x1 + 24;
  const enterX = x2 - 24;
  const midY   = Math.round((y1 + y2) / 2);
  return `M ${x1},${y1} H ${exitX} V ${midY} H ${enterX} V ${y2} H ${x2}`;
}

/* ─── Component library definition ──────────────────────────────────────── */
const LIBRARY = [
  {
    category: "Logic Gates",
    items: [
      { type: "AND",  label: "AND Gate" },
      { type: "OR",   label: "OR Gate" },
      { type: "NOT",  label: "NOT Gate" },
      { type: "NAND", label: "NAND Gate" },
      { type: "NOR",  label: "NOR Gate" },
      { type: "XOR",  label: "XOR Gate" },
      { type: "XNOR", label: "XNOR Gate" },
    ],
  },
  {
    category: "Input Devices",
    items: [
      { type: "SWITCH", label: "Toggle Switch" },
      { type: "BUTTON", label: "Push Button" },
      { type: "CONST0", label: "Logic 0 (GND)" },
      { type: "CONST1", label: "Logic 1 (VCC)" },
      { type: "CLOCK",  label: "Clock Pulse" },
    ],
  },
  {
    category: "Output Devices",
    items: [
      { type: "LED",    label: "LED Indicator" },
      { type: "OUTPUT", label: "Digital Probe" },
      { type: "SEG7",   label: "7-Seg Display" },
    ],
  },
  {
    category: "Wiring & Signal",
    items: [
      { type: "SPLITTER", label: "Signal Splitter" },
    ],
  },
  {
    category: "Supported ICs (7400 Series)",
    items: [
      { type: "IC_7408", label: "IC 7408 (Quad AND)" },
      { type: "IC_7404", label: "IC 7404 (Hex NOT)" },
      { type: "IC_7432", label: "IC 7432 (Quad OR)" },
      { type: "IC_7400", label: "IC 7400 (Quad NAND)" },
      { type: "IC_7486", label: "IC 7486 (Quad XOR)" },
      { type: "IC_7447", label: "IC 7447 (BCD to 7-Seg)" },
      { type: "IC_74181", label: "IC 74181 (ALU)", unavailable: true },
      { type: "IC_74193", label: "IC 74193 (Counter)", unavailable: true },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════════
   CircuitSimulator Component
   ════════════════════════════════════════════════════════════════════════════ */
export default function CircuitSimulator() {
  const navigate = useNavigate();

  /* ── Circuit Graph State ── */
  const [components, setComponents] = useState([]);
  const [wires,      setWires]      = useState([]);
  const [simResults, setSimResults] = useState({});
  const [wireValues, setWireValues] = useState({});

  /* ── Simulation Controls ── */
  const [isSimRunning, setIsSimRunning] = useState(true);
  const [clockTick,    setClockTick]    = useState(0);

  /* ── Interaction State (React State — drives re-renders) ── */
  const [selected,   setSelected]   = useState(null);
  const [selType,    setSelType]    = useState(null);
  const [connecting, setConnecting] = useState(null); // { compId, pinIdx, pinType }
  const [pan,        setPan]        = useState({ x: 70, y: 50 });
  const [zoom,       setZoom]       = useState(1);

  /* ── Sidebar & Panel State ── */
  const [leftTab,    setLeftTab]    = useState("library");
  const [activeExp,  setActiveExp]  = useState(null);
  const [expStep,    setExpStep]    = useState(0);
  const [bottomTab,  setBottomTab]  = useState("results");
  const [bottomOpen, setBottomOpen] = useState(true);
  const [truthTable, setTruthTable] = useState(null);
  const [warnings,   setWarnings]   = useState([]);
  const [circuitName,setCircuitName]= useState("My Circuit");
  const [toast,      setToast]      = useState(null);

  /* ── Refs — never cause re-renders, always up-to-date ── */
  const svgRef         = useRef(null);
  const previewPathRef = useRef(null); // the SVG <path> for rubberband wire preview
  const clockRef       = useRef(null);
  const toastRef       = useRef(null);
  const lastToggleRef  = useRef(0);

  // Live-sync pan/zoom into refs so svgPoint() never uses stale values
  const panRef  = useRef(pan);
  const zoomRef = useRef(zoom);
  useLayoutEffect(() => { panRef.current  = pan;  }, [pan]);
  useLayoutEffect(() => { zoomRef.current = zoom; }, [zoom]);

  // Live-sync connecting & components into refs (read inside event handlers)
  const connectingRef  = useRef(connecting);
  const componentsRef  = useRef(components);
  const wiresRef       = useRef(wires);
  useLayoutEffect(() => { connectingRef.current  = connecting;  }, [connecting]);
  useLayoutEffect(() => { componentsRef.current  = components;  }, [components]);
  useLayoutEffect(() => { wiresRef.current       = wires;       }, [wires]);

  // Drag tracking — stored in refs to avoid state churn during drag
  const dragRef = useRef(null);
  // {id, offX, offY, startClientX, startClientY, hasMoved, origX, origY}

  // Pan tracking
  const panStartRef = useRef(null);

  // Rubberband start point (also in a ref so preview handler is stable)
  const rbStartRef = useRef(null);

  /* ── Toast helper ── */
  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  /* ── Coordinate Transform — reads from refs, always correct ── */
  const svgPoint = useCallback((clientX, clientY) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (clientX - rect.left  - panRef.current.x) / zoomRef.current,
      y: (clientY - rect.top   - panRef.current.y) / zoomRef.current,
    };
  }, []); // stable — reads refs, no deps

  /* ── Simulation ── */
  const runSimRef = useRef(null);
  const runSim = useCallback((comps, ws) => {
    if (!isSimRunning) return;
    const { results, wireValues: wv, warnings: warns } = simulate(comps, ws);
    setSimResults(results);
    setWireValues(wv);
    setWarnings(warns || []);
    setTruthTable(generateTruthTable(comps, ws));
  }, [isSimRunning]);
  runSimRef.current = runSim;

  useEffect(() => {
    runSimRef.current(components, wires);
  }, [components, wires, clockTick]); // eslint-disable-line

  /* ── Clock Oscillator ── */
  useEffect(() => {
    const clockComps = components.filter(c => c.type === "CLOCK");
    clearInterval(clockRef.current);
    if (!clockComps.length || !isSimRunning) return;

    // Use minimum interval or 600ms default
    const intervals = clockComps.map(c => c.interval || 600);
    const minInterval = Math.min(...intervals);

    clockRef.current = setInterval(() => {
      setComponents(prev => {
        const next = prev.map(c =>
          c.type === "CLOCK" ? { ...c, state: c.state === 1 ? 0 : 1 } : c
        );
        const sim = simulate(next, wiresRef.current);
        setSimResults(sim.results);
        setWireValues(sim.wireValues);
        setWarnings(sim.warnings || []);
        return next;
      });
      setClockTick(t => t + 1);
    }, Math.max(100, minInterval));

    return () => clearInterval(clockRef.current);
  }, [components.filter(c => c.type === "CLOCK").length, isSimRunning, components.map(c => c.type === "CLOCK" ? c.interval : 0).join(",")]); // eslint-disable-line

  /* ── Pin World Coordinates ── */
  const getPinWorldPos = useCallback((compId, pinIdx, pinType) => {
    const comp = componentsRef.current.find(c => c.id === compId);
    if (!comp) return null;
    const pins = getPinPositions(comp.type, comp.rotation || 0);
    const list = pinType === "out" ? pins.outputs : pins.inputs;
    const pin  = list[pinIdx];
    if (!pin) return null;
    return { x: comp.x + pin.x, y: comp.y + pin.y };
  }, []);

  /* ── Rubberband preview update — no React re-render ── */
  const updatePreviewPath = useCallback((clientX, clientY) => {
    const path = previewPathRef.current;
    const start = rbStartRef.current;
    if (!path || !start) return;
    const { x, y } = svgPoint(clientX, clientY);
    path.setAttribute("d", orthoPath(start.x, start.y, x, y));
    path.setAttribute("visibility", "visible");
  }, [svgPoint]);

  const hidePreviewPath = useCallback(() => {
    const path = previewPathRef.current;
    if (path) path.setAttribute("visibility", "hidden");
    rbStartRef.current = null;
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────
     CLICK-TO-CONNECT WIRING — onPinClick
     ───────────────────────────────────────────────────────────────────────── */
  const onPinClick = useCallback((e, compId, pinIdx, pinType) => {
    e.stopPropagation();
    e.preventDefault();
    const conn = connectingRef.current;

    /* ── SCENARIO 1: NOT currently in wire-connection mode ── */
    if (!conn) {
      if (pinType === "out") {
        // Step 1: Student clicks an output pin to enter wire mode
        const pos = getPinWorldPos(compId, pinIdx, "out");
        rbStartRef.current = pos;
        setConnecting({ compId, pinIdx, pinType: "out" });
        showToast("Output pin selected. Now click an input pin to connect.", "info");
        return;
      }

      if (pinType === "in") {
        // Student clicked input pin first
        const hasWire = wiresRef.current.some(w => w.toId === compId && w.toPinIdx === pinIdx);
        if (hasWire) {
          showToast("This input pin already has a connected wire. Click the wire to select & delete it.", "info");
        } else {
          showToast("Click an output pin first to start wiring, then click this input pin.", "info");
        }
        return;
      }
    }

    /* ── SCENARIO 2: ALREADY in wire-connection mode ── */
    // Rule 1: Clicking the selected source pin again cancels connection mode
    if (conn.compId === compId && conn.pinIdx === pinIdx && conn.pinType === pinType) {
      hidePreviewPath();
      setConnecting(null);
      showToast("Wire connection cancelled.", "info");
      return;
    }

    // Rule 2: Prevent connecting Output-to-Output
    if (conn.pinType === "out" && pinType === "out") {
      showToast("Invalid connection: Cannot connect output to output. Please click a valid input pin.", "error");
      return;
    }

    // Rule 3: Prevent connecting Input-to-Input
    if (conn.pinType === "in" && pinType === "in") {
      showToast("Invalid connection: Cannot connect input to input.", "error");
      return;
    }

    // Valid pair: Output to Input
    const fromCompId = conn.pinType === "out" ? conn.compId : compId;
    const fromPin    = conn.pinType === "out" ? conn.pinIdx : pinIdx;
    const toCompId   = conn.pinType === "out" ? compId     : conn.compId;
    const toPin      = conn.pinType === "out" ? pinIdx     : conn.pinIdx;

    // Rule 4: Prevent duplicate connection between identical pins
    const isDuplicate = wiresRef.current.some(
      w => w.fromId === fromCompId && w.fromPinIdx === fromPin && w.toId === toCompId && w.toPinIdx === toPin
    );
    if (isDuplicate) {
      showToast("This connection already exists.", "warn");
      return;
    }

    // Rule 5: Prevent multiple wires feeding the same input pin
    const isInputOccupied = wiresRef.current.some(
      w => w.toId === toCompId && w.toPinIdx === toPin
    );
    if (isInputOccupied) {
      showToast("This input pin already has a connected wire. Remove the existing wire first.", "warn");
      return;
    }

    // Connect immediately without dragging!
    const id = wuid();
    setWires(prev => [...prev, { id, fromId: fromCompId, fromPinIdx: fromPin, toId: toCompId, toPinIdx: toPin }]);
    hidePreviewPath();
    setConnecting(null);
    showToast("Wire connected successfully ✓", "success");
  }, [getPinWorldPos, showToast, hidePreviewPath]);

  /* ─────────────────────────────────────────────────────────────────────────
     COMPONENT DRAGGING
     ───────────────────────────────────────────────────────────────────────── */
  const onCompPointerDown = useCallback((e, id) => {
    if (connectingRef.current) return; // in wire-draw mode — don't interfere
    if (e.button !== 0) return;

    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);

    const comp = componentsRef.current.find(c => c.id === id);
    if (!comp) return;
    const { x: wx, y: wy } = svgPoint(e.clientX, e.clientY);

    dragRef.current = {
      id,
      offX: wx - comp.x,
      offY: wy - comp.y,
      startClientX: e.clientX,
      startClientY: e.clientY,
      hasMoved: false,
      origX: comp.x,
      origY: comp.y,
    };

    setSelected(id);
    setSelType("comp");
  }, [svgPoint]);

  const onCompPointerMove = useCallback((e) => {
    const dr = dragRef.current;
    if (!dr) return;
    if (!dr.hasMoved) {
      const dist = Math.hypot(e.clientX - dr.startClientX, e.clientY - dr.startClientY);
      if (dist < DRAG_THRESH) return;
      dr.hasMoved = true;
    }
    const { x, y } = svgPoint(e.clientX, e.clientY);
    setComponents(prev =>
      prev.map(c =>
        c.id === dr.id
          ? { ...c, x: snap(x - dr.offX), y: snap(y - dr.offY) }
          : c
      )
    );
  }, [svgPoint]);

  const onCompPointerUp = useCallback((e, id, type) => {
    const dr = dragRef.current;
    if (!dr) return;
    if (!dr.hasMoved && type === "SWITCH") {
      // It was a click — toggle the switch
      const now = Date.now();
      if (now - lastToggleRef.current >= 100) {
        lastToggleRef.current = now;
        setComponents(prev => {
          const next = prev.map(c => c.id === id ? { ...c, state: c.state === 1 ? 0 : 1 } : c);
          const sim = simulate(next, wiresRef.current);
          setSimResults(sim.results);
          setWireValues(sim.wireValues);
          setWarnings(sim.warnings || []);
          setTruthTable(generateTruthTable(next, wiresRef.current));
          return next;
        });
      }
    }
    dragRef.current = null;
    e.currentTarget?.releasePointerCapture?.(e.pointerId);
  }, []);

  /* ─────────────────────────────────────────────────────────────────────────
     SVG MOUSE HANDLERS
     ───────────────────────────────────────────────────────────────────────── */
  const onSvgPointerMove = useCallback((e) => {
    // Update rubberband wire preview — direct DOM, no React re-render
    if (connectingRef.current && rbStartRef.current) {
      updatePreviewPath(e.clientX, e.clientY);
    }
    // Pan
    if (panStartRef.current) {
      setPan({
        x: e.clientX - panStartRef.current.ox,
        y: e.clientY - panStartRef.current.oy,
      });
    }
  }, [updatePreviewPath]);

  const onSvgPointerDown = useCallback((e) => {
    const isBg = e.target === svgRef.current
      || e.target.classList.contains("canvas-bg");
    if (!isBg) return;
    if (connectingRef.current) {
      // Click on empty canvas cancels wire
      hidePreviewPath();
      setConnecting(null);
      return;
    }
    if (e.button === 0) {
      setSelected(null);
      setSelType(null);
      panStartRef.current = { ox: e.clientX - panRef.current.x, oy: e.clientY - panRef.current.y };
    }
  }, [hidePreviewPath]);

  const onSvgPointerUp = useCallback(() => {
    panStartRef.current = null;
  }, []);

  const onSvgContextMenu = useCallback((e) => {
    if (connectingRef.current) {
      e.preventDefault();
      hidePreviewPath();
      setConnecting(null);
      showToast("Wire cancelled", "info");
    }
  }, [hidePreviewPath, showToast]);

  /* ── Zoom on wheel ── */
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setZoom(z => {
      const nz = Math.max(0.25, Math.min(3, z * factor));
      setPan(p => ({
        x: mx - (mx - p.x) * (nz / z),
        y: my - (my - p.y) * (nz / z),
      }));
      return nz;
    });
  }, []);

  // Attach wheel passively=false (required by browsers to call preventDefault)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  /* ── Push Button Press & Release (Momentary Action: 1 while held, 0 when released) ── */
  const onButtonPointerDown = useCallback((e, id) => {
    e.stopPropagation();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setComponents(prev => {
      const next = prev.map(c => c.id === id ? { ...c, state: 1 } : c);
      const sim = simulate(next, wiresRef.current);
      setSimResults(sim.results); setWireValues(sim.wireValues);
      setWarnings(sim.warnings || []);
      setTruthTable(generateTruthTable(next, wiresRef.current));
      return next;
    });
  }, []);

  const onButtonPointerUp = useCallback((e, id) => {
    e.stopPropagation();
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    setComponents(prev => {
      const next = prev.map(c => c.id === id ? { ...c, state: 0 } : c);
      const sim = simulate(next, wiresRef.current);
      setSimResults(sim.results); setWireValues(sim.wireValues);
      setWarnings(sim.warnings || []);
      setTruthTable(generateTruthTable(next, wiresRef.current));
      return next;
    });
  }, []);

  /* ── Library drag-drop ── */
  const onLibDragStart = (e, type, unavailable) => {
    if (unavailable) {
      e.preventDefault();
      showToast("This IC component is not yet available in this simulator version.", "warn");
      return;
    }
    e.dataTransfer.setData("compType", type);
  };

  const onCanvasDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("compType");
    if (!type) return;
    const rect = svgRef.current.getBoundingClientRect();
    const { w, h } = compSize(type);
    const rawX = (e.clientX - rect.left - panRef.current.x) / zoomRef.current;
    const rawY = (e.clientY - rect.top  - panRef.current.y) / zoomRef.current;
    const x = snap(rawX - w / 2);
    const y = snap(rawY - h / 2);
    const id = uid();
    const def = getComponentDef(type);
    setComponents(prev => [
      ...prev,
      {
        id,
        type,
        x,
        y,
        state: 0,
        label: def.label,
        rotation: 0,
        interval: type === "CLOCK" ? 600 : undefined,
        color: type === "LED" ? "red" : undefined,
      },
    ]);
    setSelected(id);
    setSelType("comp");
    showToast(`Added ${def.label} to canvas`, "success");
  };

  /* ── Wire coordinate computer ── */
  const wireCoords = (w) => {
    const from = components.find(c => c.id === w.fromId);
    const to   = components.find(c => c.id === w.toId);
    if (!from || !to) return null;
    const fPins = getPinPositions(from.type, from.rotation || 0);
    const tPins = getPinPositions(to.type, to.rotation || 0);
    const fp = fPins.outputs[w.fromPinIdx];
    const tp = tPins.inputs[w.toPinIdx];
    if (!fp || !tp) return null;
    return {
      x1: from.x + fp.x, y1: from.y + fp.y,
      x2: to.x   + tp.x, y2: to.y   + tp.y,
    };
  };

  /* ── Circuit actions ── */
  const resetCircuit = () => {
    setComponents(prev => prev.map(c => ({ ...c, state: 0 })));
    showToast("Circuit inputs reset to logic 0 (LOW)", "info");
  };

  const clearCanvas = () => {
    setComponents([]); setWires([]);
    setSelected(null); setSelType(null);
    hidePreviewPath(); setConnecting(null);
    setActiveExp(null);
    setSimResults({}); setWireValues({});
    showToast("Canvas cleared — ready to build new circuit", "info");
  };

  const fitView = () => { setZoom(1); setPan({ x: 70, y: 50 }); };

  const deleteSelected = useCallback(() => {
    if (!selected) return;
    if (selType === "wire") {
      setWires(prev => prev.filter(w => w.id !== selected));
      showToast("Wire removed", "info");
    } else {
      setWires(prev => prev.filter(w => w.fromId !== selected && w.toId !== selected));
      setComponents(prev => prev.filter(c => c.id !== selected));
      showToast("Component removed", "info");
    }
    setSelected(null); setSelType(null);
  }, [selected, selType, showToast]);

  const rotateSelected = useCallback(() => {
    if (!selected || selType !== "comp") return;
    setComponents(prev =>
      prev.map(c => c.id === selected ? { ...c, rotation: ((c.rotation || 0) + 90) % 360 } : c)
    );
    showToast("Component rotated 90°", "info");
  }, [selected, selType, showToast]);

  /* ── Load experiment ── */
  const loadExperimentCircuit = (exp, mode = "prewired") => {
    const res = mode === "challenge" && exp.buildChallenge
      ? exp.buildChallenge()
      : exp.buildCircuit();
    setComponents(res.components);
    setWires(res.wires || []);
    setCircuitName(res.name);
    setSelected(null); setSelType(null);
    hidePreviewPath(); setConnecting(null);
    setActiveExp(exp); setExpStep(0);
    setLeftTab("experiments");
    showToast(`Loaded: ${exp.title} (${mode === "challenge" ? "Hands-on Mode" : "Pre-wired"})`, "success");
  };

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handler = (e) => {
      if (document.activeElement.tagName === "INPUT") return;
      if (e.key === "Delete" || e.key === "Backspace") deleteSelected();
      if (e.key === "r" || e.key === "R") rotateSelected();
      if (e.key === "Escape") {
        if (connectingRef.current) {
          hidePreviewPath();
          setConnecting(null);
          showToast("Wire connection cancelled.", "info");
        } else {
          setSelected(null);
          setSelType(null);
        }
      }
      if (e.key === "f" || e.key === "F") fitView();
      if (e.key === " ") { e.preventDefault(); setIsSimRunning(r => !r); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [deleteSelected, rotateSelected, hidePreviewPath]);

  /* ── Derived selection ── */
  const selComp = selType === "comp" ? components.find(c => c.id === selected) : null;
  const selDef  = selComp ? getComponentDef(selComp.type) : null;
  const selRes  = selComp ? simResults[selComp.id] : null;
  const selWire = selType === "wire" ? wires.find(w => w.id === selected) : null;

  /* ── When connecting state changes, sync the rubberband start position ── */
  useEffect(() => {
    if (!connecting) {
      hidePreviewPath();
      return;
    }
    const pos = getPinWorldPos(connecting.compId, connecting.pinIdx, connecting.pinType);
    if (pos) rbStartRef.current = pos;
  }, [connecting, getPinWorldPos, hidePreviewPath]);

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="csd-page">

      {/* ════ 1. HEADER NAVBAR ════ */}
      <header className="csd-navbar">
        <div className="csd-nav-left">
          <button className="csd-logo-btn" onClick={() => navigate("/")} aria-label="Zentrion Home">
            <img src={zentrionLogo} alt="Zentrion" className="csd-logo-img" />
          </button>
          <div className="csd-dept-pill">ECE · Digital Electronics Lab</div>
        </div>

        <div className="csd-title-row">
          <input
            className="csd-circuit-name"
            value={circuitName}
            onChange={e => setCircuitName(e.target.value)}
            aria-label="Circuit Name"
            placeholder="Untitled Circuit"
          />
        </div>

        <div className="csd-nav-actions">
          <ThemeToggle />
          <button className="csd-nav-btn" onClick={() => navigate(-1)}>← Exit Lab</button>
        </div>
      </header>

      {/* ════ 2. SIMULATION CONTROLS TOOLBAR ════ */}
      <div className="csd-toolbar">
        <button
          className={`csd-tool-btn ${isSimRunning ? "active-run" : "paused"}`}
          onClick={() => setIsSimRunning(r => !r)}
          title="Toggle Simulation (Spacebar)"
        >
          {isSimRunning ? "⏸ Pause Simulation" : "▶ Run Simulation"}
        </button>

        <button className="csd-tool-btn" onClick={resetCircuit} title="Reset all input switches to 0">
          ↺ Reset Inputs
        </button>

        <button className="csd-tool-btn danger" onClick={clearCanvas} title="Clear all components and wires">
          🗑 Clear Canvas
        </button>

        <div className="csd-tool-sep" />

        <button className="csd-tool-btn" onClick={() => setZoom(z => Math.min(3, z * 1.15))} title="Zoom In">+</button>
        <span className="csd-zoom-label">{Math.round(zoom * 100)}%</span>
        <button className="csd-tool-btn" onClick={() => setZoom(z => Math.max(0.25, z / 1.15))} title="Zoom Out">−</button>
        <button className="csd-tool-btn" onClick={fitView} title="Fit View (F)">⌖ Fit</button>

        <div className="csd-tool-sep" />

        {selected && selType === "comp" && (
          <button className="csd-tool-btn" onClick={rotateSelected} title="Rotate Component 90° (R)">
            ↻ Rotate (R)
          </button>
        )}
        {selected && (
          <button className="csd-tool-btn danger" onClick={deleteSelected} title="Delete Selected (Del)">
            ✕ Delete ({selType === "wire" ? "Wire" : "Gate"})
          </button>
        )}

        <div className="csd-tool-hint-right">
          {connecting ? (
            <span className="csd-hint-connecting">
              🔌 Click a destination input pin &nbsp;|&nbsp; <strong>Click source pin</strong>, <strong>Esc</strong> or <strong>Right-click</strong> to cancel
            </span>
          ) : (
            <span className="csd-hint-idle">
              💡 Click output pin → click input pin to wire &nbsp;·&nbsp; Click switches to toggle (0 / 1)
            </span>
          )}
        </div>
      </div>

      {/* ════ 3. MAIN THREE-PANE BODY ════ */}
      <div className="csd-body">

        {/* ── LEFT PANE: Library & Experiments ── */}
        <aside className="csd-library">
          <div className="csd-left-tabs">
            <button
              className={`csd-left-tab ${leftTab === "library" ? "active" : ""}`}
              onClick={() => setLeftTab("library")}
            >
              📦 Component Library
            </button>
            <button
              className={`csd-left-tab ${leftTab === "experiments" ? "active" : ""}`}
              onClick={() => setLeftTab("experiments")}
            >
              🧪 Guided Experiments
            </button>
          </div>

          {leftTab === "library" && (
            <div className="csd-library-scroll">
              <p className="csd-lib-instruction">Drag components onto the canvas:</p>
              {LIBRARY.map(cat => (
                <div key={cat.category} className="csd-lib-category">
                  <p className="csd-lib-cat-label">{cat.category}</p>
                  <div className="csd-lib-items-grid">
                    {cat.items.map(item => {
                      const sz = compSize(item.type);
                      const isUnavail = Boolean(item.unavailable);
                      return (
                        <div
                          key={item.type}
                          className={`csd-lib-item ${isUnavail ? "unavailable" : ""}`}
                          draggable={!isUnavail}
                          onDragStart={e => onLibDragStart(e, item.type, isUnavail)}
                          title={isUnavail ? `${item.label} — Coming Soon (Unavailable)` : `Drag ${item.label} to canvas`}
                          style={isUnavail ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                        >
                          <svg
                            width={item.type === "SEG7" ? 36 : item.type.startsWith("IC_") ? 52 : 44}
                            height={item.type === "SEG7" ? 48 : item.type.startsWith("IC_") ? 40 : 30}
                            viewBox={`0 0 ${sz.w} ${sz.h}`}
                            className="csd-lib-preview"
                          >
                            <ComponentShape type={item.type} />
                          </svg>
                          <span>{item.label}</span>
                          {isUnavail && <span className="csd-unavail-tag">Unavailable</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {leftTab === "experiments" && (
            <div className="csd-library-scroll">
              {!activeExp ? (
                <>
                  <p className="csd-lib-instruction">Choose a guided lab experiment:</p>
                  <div className="csd-exp-list">
                    {EXPERIMENTS.map(exp => (
                      <article key={exp.id} className="csd-exp-card" onClick={() => loadExperimentCircuit(exp)}>
                        <div className="csd-exp-card-header">
                          <span className="csd-exp-icon">{exp.icon}</span>
                          <div>
                            <strong>{exp.title}</strong>
                            <span className={`csd-exp-level ${exp.level.toLowerCase()}`}>{exp.level}</span>
                          </div>
                        </div>
                        <p className="csd-exp-card-desc">{exp.description}</p>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="csd-exp-active-pane">
                  <div className="csd-exp-active-head">
                    <span className="csd-exp-icon">{activeExp.icon}</span>
                    <div>
                      <h3>{activeExp.title}</h3>
                      <span className={`csd-exp-level ${activeExp.level.toLowerCase()}`}>{activeExp.level}</span>
                    </div>
                  </div>

                  <p className="csd-exp-intro">{activeExp.description}</p>

                  <div className="csd-exp-theory-box">
                    <span className="csd-box-title">Theory & Boolean Logic:</span>
                    <pre>{activeExp.theory}</pre>
                  </div>

                  <div className="csd-exp-steps-box">
                    <span className="csd-box-title">Step {expStep + 1} of {activeExp.steps.length}:</span>
                    <p className="csd-step-instruction">{activeExp.steps[expStep]}</p>
                    <div className="csd-step-nav-row">
                      <button
                        className="csd-step-btn"
                        onClick={() => setExpStep(s => Math.max(0, s - 1))}
                        disabled={expStep === 0}
                      >
                        ← Prev
                      </button>
                      <div className="csd-step-indicators">
                        {activeExp.steps.map((_, i) => (
                          <span
                            key={i}
                            className={`csd-step-dot ${i === expStep ? "active" : i < expStep ? "done" : ""}`}
                            onClick={() => setExpStep(i)}
                          />
                        ))}
                      </div>
                      <button
                        className="csd-step-btn"
                        onClick={() => setExpStep(s => Math.min(activeExp.steps.length - 1, s + 1))}
                        disabled={expStep === activeExp.steps.length - 1}
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  <div className="csd-exp-action-buttons">
                    <button
                      className="csd-exp-load-btn"
                      onClick={() => loadExperimentCircuit(activeExp, "prewired")}
                    >
                      ⚡ Load Pre-wired Circuit
                    </button>
                    {activeExp.buildChallenge && (
                      <button
                        className="csd-exp-challenge-btn"
                        onClick={() => loadExperimentCircuit(activeExp, "challenge")}
                      >
                        ✏️ Hands-on: Wire it Yourself
                      </button>
                    )}
                    <button
                      className="csd-exp-back-btn"
                      onClick={() => setActiveExp(null)}
                    >
                      ← Back to All Experiments
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* ── CENTER PANE: Circuit Canvas ── */}
        <div
          className="csd-canvas-wrap"
          onDragOver={e => e.preventDefault()}
          onDrop={onCanvasDrop}
        >
          <svg
            ref={svgRef}
            className="csd-canvas"
            onPointerMove={onSvgPointerMove}
            onPointerDown={onSvgPointerDown}
            onPointerUp={onSvgPointerUp}
            onContextMenu={onSvgContextMenu}
            style={{
              cursor: panStartRef.current
                ? "grabbing"
                : connecting
                ? "crosshair"
                : "default",
            }}
          >
            {/* ── Grid dots ── */}
            <defs>
              <pattern
                id="circuit-grid"
                width={GRID * zoom}
                height={GRID * zoom}
                patternUnits="userSpaceOnUse"
                x={pan.x % (GRID * zoom)}
                y={pan.y % (GRID * zoom)}
              >
                <circle
                  cx={GRID * zoom / 2}
                  cy={GRID * zoom / 2}
                  r="1"
                  fill="var(--border)"
                  opacity="0.65"
                />
              </pattern>
            </defs>
            <rect className="canvas-bg" width="100%" height="100%" fill="url(#circuit-grid)" />

            {/* ── All canvas content in transformed group ── */}
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>

              {/* ── WIRES ── */}
              {wires.map(w => {
                const coords = wireCoords(w);
                if (!coords) return null;
                const val = wireValues[w.id] ?? 0;
                const isSelected = selType === "wire" && selected === w.id;
                const isHigh = val === 1;
                const d = orthoPath(coords.x1, coords.y1, coords.x2, coords.y2);

                return (
                  <g key={w.id} className="csd-wire-group">
                    {/* Wide invisible hit target for easy wire clicking & deletion */}
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(0,0,0,0.001)"
                      strokeWidth="18"
                      pointerEvents="stroke"
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.stopPropagation();
                        if (!connecting) {
                          setSelected(w.id);
                          setSelType("wire");
                          showToast("Wire selected. Press Delete or click ✕ Delete to remove.", "info");
                        }
                      }}
                    />
                    {/* Visible wire */}
                    <path
                      d={d}
                      fill="none"
                      stroke={
                        isSelected ? "#ef4444"
                          : isHigh  ? "var(--primary, #0f766e)"
                          : "var(--border, #94a3b8)"
                      }
                      strokeWidth={isSelected ? 3.5 : isHigh ? 2.8 : 2}
                      strokeDasharray={isSelected ? "6 3" : "none"}
                      className={`csd-wire ${isHigh ? "wire-high" : "wire-low"}`}
                      pointerEvents="none"
                    />
                    {/* Signal value dot at midpoint */}
                    <circle
                      cx={(coords.x1 + coords.x2) / 2}
                      cy={coords.y2}
                      r="4"
                      fill={isHigh ? "var(--primary, #0f766e)" : "var(--border, #94a3b8)"}
                      stroke="#ffffff"
                      strokeWidth="1"
                      pointerEvents="none"
                    />
                  </g>
                );
              })}

              {/* ── Rubberband wire preview — rendered by React once, mutated by DOM directly ── */}
              <path
                ref={previewPathRef}
                d="M0,0"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                pointerEvents="none"
                visibility="hidden"
                className="csd-preview-wire"
              />

              {/* ── COMPONENTS ── */}
              {components.map(comp => {
                const res = simResults[comp.id];
                const outVal = res?.outputValues?.[0] ?? 0;
                const inVal  = res?.inputValues?.[0]  ?? 0;
                const isSelected = selType === "comp" && selected === comp.id;
                const def = getComponentDef(comp.type);
                const rot = comp.rotation || 0;
                const pins = getPinPositions(comp.type, rot);
                const { w: cw, h: ch } = compSize(comp.type);
                const cx = cw / 2;
                const cy = ch / 2;

                return (
                  <g
                    key={comp.id}
                    transform={`translate(${comp.x},${comp.y})`}
                    className={`csd-component ${isSelected ? "selected" : ""}`}
                    onPointerDown={e => onCompPointerDown(e, comp.id)}
                    onPointerMove={onCompPointerMove}
                    onPointerUp={e => onCompPointerUp(e, comp.id, comp.type)}
                    onPointerCancel={e => { dragRef.current = null; e.currentTarget?.releasePointerCapture?.(e.pointerId); }}
                    onClick={e => {
                      e.stopPropagation();
                      if (!dragRef.current?.hasMoved) {
                        setSelected(comp.id);
                        setSelType("comp");
                      }
                    }}
                    style={{ cursor: "grab" }}
                  >
                    {/* Selection outline */}
                    {isSelected && (
                      <rect
                        x="-8" y="-8"
                        width={cw + 16} height={ch + 16}
                        rx="10"
                        fill="none"
                        stroke="var(--blue, #2563eb)"
                        strokeWidth="1.8"
                        strokeDasharray="6 3"
                        pointerEvents="none"
                      />
                    )}

                    {/* Component SVG Graphics */}
                    <g transform={`rotate(${rot}, ${cx}, ${cy})`}>
                      <ComponentShape
                        type={comp.type}
                        state={comp.state ?? 0}
                        outputValue={comp.type === "LED" ? inVal : outVal}
                        inputValues={res?.inputValues ?? []}
                        color={comp.color || "red"}
                      />
                    </g>

                    {/* Component Label */}
                    <text
                      x={cx} y={-10}
                      textAnchor="middle"
                      fontSize="9"
                      fill="var(--text-muted)"
                      fontWeight="700"
                      className="csd-comp-label"
                    >
                      {comp.label}
                    </text>

                    {/* ── INPUT PINS ── */}
                    {pins.inputs.map((pin, i) => {
                      const isValidTarget = connecting && connecting.pinType === "out"
                        && connecting.compId !== comp.id;
                      const isAlreadyWired = wires.some(w => w.toId === comp.id && w.toPinIdx === i);
                      const currentVal = res?.inputValues?.[i] ?? 0;

                      return (
                        <g
                          key={`in_${i}`}
                          className="csd-pin-node input-node"
                          onPointerDown={e => e.stopPropagation()}
                          onClick={e => onPinClick(e, comp.id, i, "in")}
                          style={{
                            cursor: isValidTarget && !isAlreadyWired
                              ? "pointer"
                              : connecting
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          {/* Large invisible hit target (32px diameter) */}
                          <circle
                            cx={pin.x} cy={pin.y}
                            r={PIN_HIT_R}
                            fill="transparent"
                            stroke="none"
                            pointerEvents="all"
                            style={{ pointerEvents: "all" }}
                          />
                          {/* Glowing target ring when in wire-connection mode */}
                          {isValidTarget && !isAlreadyWired && (
                            <circle
                              cx={pin.x} cy={pin.y}
                              r={PIN_HIT_R + 1}
                              fill="rgba(14, 165, 233, 0.2)"
                              stroke="#0284c7"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                              className="csd-pin-target-ring"
                              pointerEvents="none"
                            />
                          )}
                          {/* Visible pin circle */}
                          <circle
                            cx={pin.x} cy={pin.y}
                            r={PIN_R}
                            fill={
                              isValidTarget && !isAlreadyWired
                                ? "#0284c7"
                                : currentVal === 1
                                ? "var(--primary, #0f766e)"
                                : "var(--card, #ffffff)"
                            }
                            stroke={
                              isValidTarget && !isAlreadyWired
                                ? "#ffffff"
                                : "var(--primary, #0f766e)"
                            }
                            strokeWidth="2"
                            className="csd-pin-circle"
                            pointerEvents="none"
                          />
                          {/* Pin label */}
                          <text
                            x={pin.x + (pin.x < cx ? 11 : -11)}
                            y={pin.y + 3.5}
                            textAnchor={pin.x < cx ? "start" : "end"}
                            fontSize="8"
                            fill="var(--text-muted)"
                            fontWeight="800"
                            pointerEvents="none"
                          >
                            {pin.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* ── OUTPUT PINS ── */}
                    {pins.outputs.map((pin, i) => {
                      const currentOut = res?.outputValues?.[i] ?? 0;
                      const isSource = connecting && connecting.compId === comp.id && connecting.pinIdx === i;

                      return (
                        <g
                          key={`out_${i}`}
                          className="csd-pin-node output-node"
                          onPointerDown={e => e.stopPropagation()}
                          onClick={e => onPinClick(e, comp.id, i, "out")}
                          style={{
                            cursor: isSource
                              ? "pointer"
                              : connecting
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          {/* Large invisible hit target (32px diameter) */}
                          <circle
                            cx={pin.x} cy={pin.y}
                            r={PIN_HIT_R}
                            fill="transparent"
                            stroke="none"
                            pointerEvents="all"
                            style={{ pointerEvents: "all" }}
                          />
                          {/* Pulse ring for active source pin */}
                          {isSource && (
                            <circle
                              cx={pin.x} cy={pin.y}
                              r={PIN_HIT_R + 1}
                              fill="rgba(37,99,235,0.2)"
                              stroke="#2563eb"
                              strokeWidth="2.5"
                              className="csd-pin-source-pulse"
                              pointerEvents="none"
                            />
                          )}
                          {/* Visible pin circle */}
                          <circle
                            cx={pin.x} cy={pin.y}
                            r={PIN_R}
                            fill={
                              isSource
                                ? "#2563eb"
                                : currentOut === 1
                                ? "var(--primary, #0f766e)"
                                : "var(--card, #ffffff)"
                            }
                            stroke={isSource ? "#ffffff" : "var(--primary, #0f766e)"}
                            strokeWidth="2"
                            className="csd-pin-circle"
                            pointerEvents="none"
                          />
                          {/* Pin label */}
                          <text
                            x={pin.x + (pin.x > cx ? 11 : -11)}
                            y={pin.y + 3.5}
                            textAnchor={pin.x > cx ? "start" : "end"}
                            fontSize="8"
                            fill="var(--text-muted)"
                            fontWeight="800"
                            pointerEvents="none"
                          >
                            {pin.label}
                          </text>
                        </g>
                      );
                    })}

                    {/* ── BUTTON overlay (Momentary Press & Release) ── */}
                    {comp.type === "BUTTON" && (
                      <rect
                        x="8" y="8" width="64" height="44" rx="8"
                        fill="transparent"
                        style={{ cursor: "pointer" }}
                        onPointerDown={e => onButtonPointerDown(e, comp.id)}
                        onPointerUp={e => onButtonPointerUp(e, comp.id)}
                        onPointerCancel={e => onButtonPointerUp(e, comp.id)}
                        onPointerLeave={e => {
                          if (comp.state === 1) onButtonPointerUp(e, comp.id);
                        }}
                        title="Press and hold for HIGH (1); release for LOW (0)"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Empty canvas hint */}
          {components.length === 0 && (
            <div className="csd-empty-hero">
              <span className="csd-empty-icon">⚡</span>
              <h2>Digital Electronics Design Canvas</h2>
              <p>Drag gates & switches from the library to build your circuit,</p>
              <p className="csd-empty-sub">or start with a hands-on experiment:</p>
              <div className="csd-empty-actions">
                <button
                  className="csd-quick-btn primary"
                  onClick={() => loadExperimentCircuit(EXPERIMENTS[0])}
                >
                  🔬 AND-NOT Circuit (Milestone)
                </button>
                <button
                  className="csd-quick-btn"
                  onClick={() => loadExperimentCircuit(EXPERIMENTS[2])}
                >
                  🔌 Basic AND Gate
                </button>
                <button
                  className="csd-quick-btn"
                  onClick={() => loadExperimentCircuit(EXPERIMENTS[7])}
                >
                  ➕ Half Adder
                </button>
              </div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className={`csd-toast-banner toast-${toast.type}`}>
              {toast.msg}
            </div>
          )}
        </div>

        {/* ── RIGHT PANE: Properties ── */}
        <aside className="csd-props">
          <div className="csd-props-header">
            <h3>Properties</h3>
          </div>

          {selType === "comp" && selComp && selDef && (
            <div className="csd-props-content">
              <div className="csd-prop-section">
                <span className="csd-prop-eyebrow">COMPONENT</span>
                <h4 className="csd-prop-title">{selDef.label}</h4>
                <p className="csd-prop-desc">{selDef.description}</p>
              </div>

              <div className="csd-prop-field">
                <label>Label</label>
                <input
                  type="text"
                  value={selComp.label}
                  onChange={e =>
                    setComponents(prev =>
                      prev.map(c => c.id === selComp.id ? { ...c, label: e.target.value } : c)
                    )
                  }
                  className="csd-prop-input"
                />
              </div>

              <div className="csd-prop-field">
                <label>Rotation</label>
                <div className="csd-rot-row">
                  <span>{selComp.rotation || 0}°</span>
                  <button className="csd-rot-btn" onClick={rotateSelected}>↻ Rotate 90°</button>
                </div>
              </div>

              {/* Component Specific Interactive Controls */}
              {selComp.type === "SWITCH" && (
                <div className="csd-prop-field">
                  <label>Switch Control</label>
                  <button
                    className={`csd-prop-action-btn ${selComp.state === 1 ? "active-high" : "active-low"}`}
                    onClick={() => {
                      setComponents(prev => {
                        const next = prev.map(c => c.id === selComp.id ? { ...c, state: c.state === 1 ? 0 : 1 } : c);
                        const sim = simulate(next, wiresRef.current);
                        setSimResults(sim.results); setWireValues(sim.wireValues);
                        setWarnings(sim.warnings || []);
                        setTruthTable(generateTruthTable(next, wiresRef.current));
                        return next;
                      });
                    }}
                  >
                    {selComp.state === 1 ? "⚡ Switch is ON (1) — Click for OFF" : "⚪ Switch is OFF (0) — Click for ON"}
                  </button>
                </div>
              )}

              {selComp.type === "BUTTON" && (
                <div className="csd-prop-field">
                  <label>Momentary Button Control</label>
                  <button
                    className={`csd-prop-action-btn ${selComp.state === 1 ? "active-high" : "active-low"}`}
                    onPointerDown={e => onButtonPointerDown(e, selComp.id)}
                    onPointerUp={e => onButtonPointerUp(e, selComp.id)}
                    onPointerCancel={e => onButtonPointerUp(e, selComp.id)}
                    onPointerLeave={e => {
                      if (selComp.state === 1) onButtonPointerUp(e, selComp.id);
                    }}
                  >
                    {selComp.state === 1 ? "⚡ PRESSED (Output: 1)" : "👇 Hold Down for HIGH (1)"}
                  </button>
                  <span className="csd-prop-hint">Outputs logic 1 while pressed; logic 0 when released.</span>
                </div>
              )}

              {selComp.type === "CLOCK" && (
                <div className="csd-prop-field">
                  <label>Clock Frequency & Interval</label>
                  <div className="csd-clock-btn-row">
                    {[200, 500, 600, 1000, 2000].map(ms => (
                      <button
                        key={ms}
                        className={`csd-clock-chip ${(selComp.interval || 600) === ms ? "selected" : ""}`}
                        onClick={() => {
                          setComponents(prev => prev.map(c => c.id === selComp.id ? { ...c, interval: ms } : c));
                        }}
                      >
                        {ms >= 1000 ? `${ms / 1000}s` : `${ms}ms`}
                      </button>
                    ))}
                  </div>
                  <div className="csd-clock-meta">
                    <span>Rate: <strong>{(1000 / (selComp.interval || 600)).toFixed(1)} Hz</strong></span>
                    <span>State: <strong className={selComp.state === 1 ? "csd-text-high" : "csd-text-low"}>{selComp.state === 1 ? "HIGH (1)" : "LOW (0)"}</strong></span>
                  </div>
                </div>
              )}

              {selComp.type === "LED" && (
                <div className="csd-prop-field">
                  <label>LED Indicator Color</label>
                  <div className="csd-led-palette">
                    {[
                      { id: "red", label: "Red", hex: "#ef4444" },
                      { id: "green", label: "Green", hex: "#10b981" },
                      { id: "blue", label: "Blue", hex: "#3b82f6" },
                      { id: "amber", label: "Amber", hex: "#f59e0b" },
                    ].map(col => (
                      <button
                        key={col.id}
                        className={`csd-color-pill ${(selComp.color || "red") === col.id ? "active" : ""}`}
                        onClick={() => {
                          setComponents(prev => prev.map(c => c.id === selComp.id ? { ...c, color: col.id } : c));
                        }}
                      >
                        <span className="csd-color-circle" style={{ background: col.hex }} />
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selComp.type === "SEG7" && (
                <div className="csd-prop-field">
                  <label>7-Segment Decoder Breakdown</label>
                  <div className="csd-seg-grid">
                    {["a", "b", "c", "d", "e", "f", "g"].map((seg, i) => {
                      const on = selRes?.inputValues?.[i] === 1;
                      return (
                        <div key={seg} className={`csd-seg-cell ${on ? "on" : "off"}`}>
                          <strong>{seg}</strong>
                          <span>{on ? "1" : "0"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="csd-prop-pins">
                <span className="csd-prop-eyebrow">LIVE LOGIC STATE</span>
                {selDef.inputs > 0 && (
                  <div className="csd-pins-table">
                    <span className="csd-pins-head">Input Pins</span>
                    {selRes?.inputValues?.map((val, i) => {
                      const pinPos = getPinPositions(selComp.type, 0).inputs[i];
                      const lbl = pinPos?.label || `Pin ${i + 1}`;
                      return (
                        <div key={i} className="csd-pin-row">
                          <span>{lbl}:</span>
                          <span className={`csd-val-badge ${val === 1 ? "high" : "low"}`}>
                            {val === 1 ? "HIGH (1)" : "LOW (0)"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {selDef.outputs > 0 && (
                  <div className="csd-pins-table">
                    <span className="csd-pins-head">Output Pins</span>
                    {selRes?.outputValues?.map((val, i) => {
                      const pinPos = getPinPositions(selComp.type, 0).outputs[i];
                      const lbl = pinPos?.label || `Output ${i + 1}`;
                      return (
                        <div key={i} className="csd-pin-row">
                          <span>{lbl}:</span>
                          <span className={`csd-val-badge ${val === 1 ? "high" : "low"}`}>
                            {val === 1 ? "HIGH (1)" : "LOW (0)"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="csd-prop-actions">
                <button className="csd-btn-delete" onClick={deleteSelected}>
                  ✕ Delete Component
                </button>
              </div>
            </div>
          )}

          {selType === "wire" && selWire && (
            <div className="csd-props-content">
              <div className="csd-prop-section">
                <span className="csd-prop-eyebrow">SELECTED CONNECTION</span>
                <h4 className="csd-prop-title">Signal Wire</h4>
              </div>
              <div className="csd-prop-field">
                <label>Carried Signal</label>
                <span className={`csd-val-badge ${wireValues[selWire.id] === 1 ? "high" : "low"}`}>
                  {wireValues[selWire.id] === 1 ? "LOGIC 1 (HIGH)" : "LOGIC 0 (LOW)"}
                </span>
              </div>
              <div className="csd-prop-actions">
                <button className="csd-btn-delete" onClick={deleteSelected}>✕ Delete Wire</button>
              </div>
            </div>
          )}

          {!selected && (
            <div className="csd-props-content">
              <div className="csd-prop-section">
                <span className="csd-prop-eyebrow">CIRCUIT OVERVIEW</span>
                <h4 className="csd-prop-title">Active Workspace</h4>
              </div>
              <div className="csd-stat-list">
                <div className="csd-stat-item"><span>Components</span><strong>{components.length}</strong></div>
                <div className="csd-stat-item"><span>Wires</span><strong>{wires.length}</strong></div>
                <div className="csd-stat-item">
                  <span>Input Switches</span>
                  <strong>{components.filter(c => c.type === "SWITCH" || c.type === "BUTTON").length}</strong>
                </div>
                <div className="csd-stat-item">
                  <span>Outputs & LEDs</span>
                  <strong>{components.filter(c => c.type === "LED" || c.type === "OUTPUT" || c.type === "SEG7").length}</strong>
                </div>
                <div className="csd-stat-item">
                  <span>Engine Status</span>
                  <span className={`csd-status-pill ${isSimRunning ? "running" : "paused"}`}>
                    {isSimRunning ? "LIVE EVAL" : "PAUSED"}
                  </span>
                </div>
              </div>
              <div className="csd-shortcuts-card">
                <span className="csd-prop-eyebrow">SHORTCUTS</span>
                <ul>
                  <li><kbd>Click Output Pin</kbd> Start wire</li>
                  <li><kbd>Click Input Pin</kbd> Complete wire</li>
                  <li><kbd>Esc / Right-click</kbd> Cancel wire</li>
                  <li><kbd>R</kbd> Rotate selected</li>
                  <li><kbd>Del</kbd> Delete selected</li>
                  <li><kbd>Space</kbd> Pause/Run</li>
                  <li><kbd>F</kbd> Fit view</li>
                  <li><kbd>Scroll</kbd> Zoom in/out</li>
                </ul>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ════ 4. BOTTOM PANEL ════ */}
      <footer className={`csd-bottom-panel ${bottomOpen ? "open" : "collapsed"}`}>
        <div className="csd-bottom-bar">
          <div className="csd-bottom-tab-buttons">
            <button
              className={`csd-btab ${bottomTab === "results" ? "active" : ""}`}
              onClick={() => { setBottomTab("results"); setBottomOpen(true); }}
            >
              📊 Live Signal Readings
            </button>
            <button
              className={`csd-btab ${bottomTab === "truth" ? "active" : ""}`}
              onClick={() => { setBottomTab("truth"); setBottomOpen(true); }}
            >
              🗂 Truth Table
            </button>
            <button
              className={`csd-btab ${bottomTab === "diagnostics" ? "active" : ""}`}
              onClick={() => { setBottomTab("diagnostics"); setBottomOpen(true); }}
            >
              🔍 Circuit Diagnostics {warnings.length > 0 && `(${warnings.length})`}
            </button>
          </div>
          <button className="csd-panel-toggle" onClick={() => setBottomOpen(o => !o)}>
            {bottomOpen ? "▾ Minimize" : "▴ Expand"}
          </button>
        </div>

        {bottomOpen && (
          <div className="csd-bottom-body">
            {bottomTab === "results" && (
              <div className="csd-results-view">
                {components.length === 0 ? (
                  <p className="csd-empty-msg">Add gates and switches on the canvas to inspect signal propagation.</p>
                ) : (
                  <table className="csd-data-table">
                    <thead>
                      <tr>
                        <th>Component</th><th>Type</th><th>Inputs</th><th>Output State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {components.map(c => {
                        const r = simResults[c.id];
                        const def = getComponentDef(c.type);
                        return (
                          <tr
                            key={c.id}
                            className={selType === "comp" && selected === c.id ? "row-selected" : ""}
                            onClick={() => { setSelected(c.id); setSelType("comp"); }}
                          >
                            <td><strong>{c.label || def.label}</strong></td>
                            <td><span className="csd-type-tag">{c.type}</span></td>
                            <td>{r?.inputValues?.length ? `[${r.inputValues.join(", ")}]` : "—"}</td>
                            <td>
                              {r?.outputValues?.map((val, idx) => (
                                <span key={idx} className={`csd-val-badge ${val === 1 ? "high" : "low"}`}>
                                  {val}
                                </span>
                              )) || "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {bottomTab === "truth" && (
              <div className="csd-truth-view">
                {!truthTable ? (
                  <p className="csd-empty-msg">
                    Connect input switches and output probes / LEDs through logic gates to generate the truth table automatically.
                  </p>
                ) : (
                  <div className="csd-table-scroll">
                    <table className="csd-data-table">
                      <thead>
                        <tr>
                          {truthTable.inputLabels.map(l => <th key={l} className="th-input">{l}</th>)}
                          {truthTable.outputLabels.map(l => <th key={l} className="th-output">{l}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {truthTable.rows.map((row, idx) => (
                          <tr key={idx}>
                            {row.inputs.map((val, i) => <td key={i}>{val}</td>)}
                            {row.outputs.map((val, i) => (
                              <td key={i}>
                                <span className={`csd-val-badge ${val === 1 ? "high" : "low"}`}>{val}</span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {bottomTab === "diagnostics" && (
              <div className="csd-diag-view">
                {warnings.length === 0 ? (
                  <div className="csd-diag-clean">
                    <span>✅</span>
                    <p>Circuit connections healthy — no unconnected inputs or logic errors found.</p>
                  </div>
                ) : (
                  <ul className="csd-diag-list">
                    {warnings.map((w, i) => <li key={i}>⚠️ {w}</li>)}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </footer>
    </div>
  );
}
