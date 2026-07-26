// ============================================================
// CODEMAP — Visualization Engine
// Lightweight canvas renderers, one per "viz" key in data.js.
// Every renderer has the signature: (ctx, w, h, t, concept) => void
// t = seconds elapsed, looped by the animation driver below.
// ============================================================

const PALETTE = {
  bg: "#F8FAFC", panel: "#FFFFFF", panel2: "#F1F5F9",
  border: "#CBD5E1", text: "#1E293B", dim: "#475569", faint: "#94A3B8",
  cyan: "#0D9488", blue: "#2563EB", indigo: "#6366F1",
  violet: "#7C3AED", pink: "#DB2777", rose: "#E11D48", amber: "#D97706",
};

// ---------- drawing helpers ----------
function rr(ctx, x, y, w, h, r) {
  if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.arcTo(x + w, y, x + w, y + r.tr, r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.arcTo(x + w, y + h, x + w - r.br, y + h, r.br);
  ctx.lineTo(x + r.bl, y + h);
  ctx.arcTo(x, y + h, x, y + h - r.bl, r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.arcTo(x, y, x + r.tl, y, r.tl);
  ctx.closePath();
}
function box(ctx, x, y, w, h, opts = {}) {
  const { fill = PALETTE.panel2, stroke = PALETTE.border, r = 8, lw = 1.5, glow } = opts;
  rr(ctx, x, y, w, h, r);
  if (glow) { ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = 14; }
  ctx.fillStyle = fill; ctx.fill();
  if (glow) ctx.restore();
  ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
}
function txt(ctx, x, y, s, opts = {}) {
  const { size = 12, color = PALETTE.text, align = "center", mono = true, weight = "500", baseline = "middle" } = opts;
  ctx.font = `${weight} ${size}px ${mono ? "'JetBrains Mono',monospace" : "Inter,sans-serif"}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(s, x, y);
}
function arrow(ctx, x1, y1, x2, y2, opts = {}) {
  const { color = PALETTE.cyan, lw = 2, dash = null, dashOffset = 0, head = 7 } = opts;
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = lw;
  if (dash) { ctx.setLineDash(dash); ctx.lineDashOffset = -dashOffset; }
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
  const ang = Math.atan2(y2 - y1, x2 - x1);
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(ang - 0.5), y2 - head * Math.sin(ang - 0.5));
  ctx.lineTo(x2 - head * Math.cos(ang + 0.5), y2 - head * Math.sin(ang + 0.5));
  ctx.closePath(); ctx.fill();
  ctx.restore();
}
function clear(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
}
function pulse(t, speed = 1) { return (Math.sin(t * speed) + 1) / 2; }
function cyclePos(t, period, n) { return Math.floor((t / period) % n); }

// ============================================================
// RENDERERS
// ============================================================
const VIZ = {};

VIZ["timeline"] = (ctx, w, h, t) => {
  const events = [["1843", "Ada Lovelace's algorithm"], ["1957", "FORTRAN"], ["1972", "C"], ["1991", "Python"], ["1995", "JavaScript"]];
  const y = h / 2, x0 = 40, x1 = w - 40;
  arrow(ctx, x0, y, x1, y, { color: PALETTE.border, lw: 2, head: 0 });
  const active = cyclePos(t, 1.1, events.length);
  events.forEach((e, i) => {
    const x = x0 + (x1 - x0) * (i / (events.length - 1));
    const on = i === active;
    ctx.beginPath(); ctx.arc(x, y, on ? 8 : 5, 0, 7);
    ctx.fillStyle = on ? PALETTE.cyan : PALETTE.faint; ctx.fill();
    if (on) { ctx.save(); ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 16; ctx.fill(); ctx.restore(); }
    txt(ctx, x, y - 22, e[0], { color: on ? PALETTE.cyan : PALETTE.dim, size: 12, weight: "700" });
    txt(ctx, x, y + 26, e[1], { color: on ? PALETTE.text : PALETTE.faint, size: 9.5, mono: false });
  });
};

VIZ["pipeline"] = (ctx, w, h, t, c) => {
  const stages = c && c.id === "functional-programming" ? ["input", "map()", "filter()", "output"]
    : c && c.id === "async-programming" ? ["request", "await…", "response", "continue"]
    : ["source code", "compile/parse", "machine code", "run"];
  const n = stages.length, pad = 40, gap = (w - pad * 2) / n;
  const active = cyclePos(t, 0.7, n + 1);
  for (let i = 0; i < n; i++) {
    const x = pad + gap * i + 10, bw = gap - 20;
    const on = i <= active % (n + 1) && active <= n;
    box(ctx, x, h / 2 - 24, bw, 48, { fill: i === active ? PALETTE.panel2 : PALETTE.panel, stroke: i === active ? PALETTE.cyan : PALETTE.border, glow: i === active ? PALETTE.cyan : null });
    txt(ctx, x + bw / 2, h / 2, stages[i], { size: 10.5, color: i === active ? PALETTE.cyan : PALETTE.dim });
    if (i < n - 1) arrow(ctx, x + bw + 2, h / 2, x + bw + gap - 22, h / 2, { color: PALETTE.border });
  }
};

VIZ["flowchart"] = (ctx, w, h, t) => {
  const cx = w / 2;
  const on = cyclePos(t, 1, 4);
  const oval = (y, label, active) => { box(ctx, cx - 55, y, 110, 34, { r: 17, fill: active ? PALETTE.cyan : PALETTE.panel2, stroke: active ? PALETTE.cyan : PALETTE.border }); txt(ctx, cx, y + 17, label, { color: active ? "#051018" : PALETTE.text, size: 11, weight: "700" }); };
  const diamond = (y, label, active) => { ctx.save(); ctx.translate(cx, y + 20); ctx.rotate(Math.PI / 4); box(ctx, -26, -26, 52, 52, { fill: active ? PALETTE.cyan : PALETTE.panel2, stroke: active ? PALETTE.cyan : PALETTE.border, r: 6 }); ctx.restore(); txt(ctx, cx, y + 20, label, { color: active ? "#051018" : PALETTE.text, size: 10, weight: "700" }); };
  oval(10, "START", on === 0);
  arrow(ctx, cx, 44, cx, 66, { color: PALETTE.border });
  diamond(66, "age>=18?", on === 1);
  arrow(ctx, cx, 106, cx, 128, { color: PALETTE.border });
  oval(128, on >= 2 ? (on === 2 ? "Adult" : "Minor") : "Adult / Minor", on === 2 || on === 3);
  txt(ctx, cx, h - 16, "flowchart logic", { color: PALETTE.faint, size: 9.5, mono: false });
};

VIZ["memory-boxes"] = (ctx, w, h, t) => {
  const items = [["age", "20", PALETTE.cyan], ["price", "99.5", PALETTE.blue], ["name", '"Jay"', PALETTE.pink]];
  const bw = 130, gap = 24, total = items.length * bw + (items.length - 1) * gap, x0 = (w - total) / 2;
  items.forEach((it, i) => {
    const x = x0 + i * (bw + gap), y = h / 2 - 30;
    const on = cyclePos(t, 1.2, items.length) === i;
    box(ctx, x, y, bw, 60, { fill: PALETTE.panel2, stroke: on ? it[2] : PALETTE.border, glow: on ? it[2] : null });
    txt(ctx, x + bw / 2, y + 20, it[0], { size: 11, color: PALETTE.dim });
    txt(ctx, x + bw / 2, y + 42, it[1], { size: 15, color: on ? it[2] : PALETTE.text, weight: "700" });
  });
  txt(ctx, w / 2, h - 18, "named boxes in memory", { color: PALETTE.faint, size: 9.5, mono: false });
};

VIZ["operators"] = (ctx, w, h, t) => {
  const ops = [["5", "+", "3", "8"], ["5", "==", "5", "true"], ["1", "&&", "0", "false"]];
  const i = cyclePos(t, 1.2, ops.length);
  const [a, op, b, res] = ops[i];
  const cy = h / 2, cx = w / 2, s = 60;
  [a, op, b].forEach((v, idx) => {
    const x = cx - s * 1.6 + idx * s * 1.6;
    txt(ctx, x, cy, v, { size: 26, color: idx === 1 ? PALETTE.cyan : PALETTE.text, weight: "700" });
  });
  arrow(ctx, cx - 10, cy + 34, cx - 10, cy + 54, { color: PALETTE.border });
  box(ctx, cx - 46, cy + 58, 92, 34, { fill: PALETTE.panel2, stroke: PALETTE.cyan, glow: PALETTE.cyan });
  txt(ctx, cx, cy + 75, String(res), { size: 14, color: PALETTE.cyan, weight: "700" });
};

VIZ["io-flow"] = (ctx, w, h, t, c) => {
  const isFile = c && c.id === "file-handling";
  const p = pulse(t, 2);
  const leftLbl = isFile ? "program" : "keyboard";
  const rightLbl = isFile ? "data.txt" : "screen";
  box(ctx, 30, h / 2 - 26, 100, 52, { stroke: PALETTE.blue }); txt(ctx, 80, h / 2, leftLbl, { size: 11 });
  box(ctx, w - 130, h / 2 - 26, 100, 52, { stroke: PALETTE.pink }); txt(ctx, w - 80, h / 2, rightLbl, { size: 11 });
  box(ctx, w / 2 - 40, h / 2 - 26, 80, 52, { fill: PALETTE.panel2, stroke: PALETTE.cyan, glow: PALETTE.cyan }); txt(ctx, w / 2, h / 2, "program", { size: 10.5, color: PALETTE.cyan });
  arrow(ctx, 132, h / 2, w / 2 - 42, h / 2, { color: PALETTE.blue, dash: [6, 6], dashOffset: t * 30 });
  arrow(ctx, w / 2 + 42, h / 2, w - 132, h / 2, { color: PALETTE.pink, dash: [6, 6], dashOffset: t * 30 });
};

VIZ["readability"] = (ctx, w, h, t) => {
  const lines = ["// calc area of circle", "float area = 3.14*r*r;"];
  const y0 = h / 2 - 30;
  txt(ctx, w / 2, y0, lines[0], { color: PALETTE.faint, size: 12, align: "center" });
  txt(ctx, w / 2, y0 + 26, lines[1], { color: PALETTE.text, size: 12, align: "center" });
  const p = pulse(t, 1.5);
  ctx.save(); ctx.globalAlpha = 0.5 + p * 0.5;
  txt(ctx, w / 2, y0 + 60, "human-readable · machine-ignored", { color: PALETTE.cyan, size: 10, mono: false });
  ctx.restore();
};

VIZ["type-cast"] = (ctx, w, h, t) => {
  const p = cyclePos(t, 1.3, 2);
  box(ctx, w / 2 - 140, h / 2 - 25, 110, 50, { stroke: PALETTE.blue });
  txt(ctx, w / 2 - 85, h / 2 - 8, '"10"', { size: 16, color: PALETTE.blue, weight: "700" });
  txt(ctx, w / 2 - 85, h / 2 + 12, "string", { size: 9, color: PALETTE.faint });
  arrow(ctx, w / 2 - 25, h / 2, w / 2 + 25, h / 2, { color: p === 1 ? PALETTE.cyan : PALETTE.border });
  box(ctx, w / 2 + 30, h / 2 - 25, 110, 50, { stroke: p === 1 ? PALETTE.cyan : PALETTE.border, glow: p === 1 ? PALETTE.cyan : null });
  txt(ctx, w / 2 + 85, h / 2 - 8, "10", { size: 16, color: p === 1 ? PALETTE.cyan : PALETTE.text, weight: "700" });
  txt(ctx, w / 2 + 85, h / 2 + 12, "integer", { size: 9, color: PALETTE.faint });
};

VIZ["branch"] = VIZ["flowchart"];

VIZ["loop-counter"] = (ctx, w, h, t) => {
  const n = 6, i = cyclePos(t, 0.5, n);
  const s = 46, gap = 12, total = n * s + (n - 1) * gap, x0 = (w - total) / 2, y = h / 2 - s / 2;
  for (let k = 0; k < n; k++) {
    const on = k <= i;
    box(ctx, x0 + k * (s + gap), y, s, s, { fill: on ? PALETTE.panel2 : PALETTE.panel, stroke: k === i ? PALETTE.cyan : (on ? PALETTE.blue : PALETTE.border), glow: k === i ? PALETTE.cyan : null });
    txt(ctx, x0 + k * (s + gap) + s / 2, y + s / 2, String(k), { color: k === i ? PALETTE.cyan : (on ? PALETTE.text : PALETTE.faint), weight: "700" });
  }
  txt(ctx, w / 2, y + s + 30, `i = ${i}`, { color: PALETTE.dim, size: 11 });
};

VIZ["grid"] = (ctx, w, h, t) => {
  const n = 3, s = 40, gap = 8, total = n * s + (n - 1) * gap;
  const x0 = w / 2 - total / 2, y0 = h / 2 - total / 2;
  const idx = cyclePos(t, 0.35, n * n);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const k = i * n + j, on = k === idx;
    box(ctx, x0 + j * (s + gap), y0 + i * (s + gap), s, s, { fill: on ? PALETTE.panel2 : PALETTE.panel, stroke: on ? PALETTE.cyan : PALETTE.border, glow: on ? PALETTE.cyan : null });
    txt(ctx, x0 + j * (s + gap) + s / 2, y0 + i * (s + gap) + s / 2, `${i},${j}`, { size: 9.5, color: on ? PALETTE.cyan : PALETTE.faint });
  }
};

VIZ["call-stack"] = (ctx, w, h, t, c) => {
  const isBacktrack = c && c.id === "backtracking";
  const frames = isBacktrack ? ["solve(0)", "solve(1)", "solve(2)", "✗ backtrack"] : ["fact(3)", "fact(2)", "fact(1)", "fact(0)=1"];
  const stage = cyclePos(t, 0.6, frames.length * 2);
  const growing = stage < frames.length;
  const depth = growing ? stage + 1 : frames.length * 2 - stage;
  const bw = 150, bh = 32, x0 = w / 2 - bw / 2, yBase = h - 40;
  for (let i = 0; i < depth; i++) {
    const y = yBase - i * (bh + 6);
    const top = i === depth - 1;
    box(ctx, x0, y - bh, bw, bh, { fill: top ? PALETTE.panel2 : PALETTE.panel, stroke: top ? PALETTE.cyan : PALETTE.border, glow: top ? PALETTE.cyan : null });
    txt(ctx, x0 + bw / 2, y - bh / 2, frames[i], { size: 11, color: top ? PALETTE.cyan : PALETTE.dim });
  }
  txt(ctx, w / 2, 22, growing ? "calling…" : "returning…", { color: PALETTE.faint, size: 10, mono: false });
};

VIZ["array-boxes"] = (ctx, w, h, t, c) => {
  const isStr = c && c.id === "strings";
  const items = isStr ? ["J", "a", "y"] : [10, 20, 30, 40, 50];
  const s = 50, gap = 6, total = items.length * s + (items.length - 1) * gap, x0 = (w - total) / 2, y = h / 2 - s / 2;
  const on = cyclePos(t, 0.9, items.length);
  items.forEach((v, i) => {
    box(ctx, x0 + i * (s + gap), y, s, s, { fill: i === on ? PALETTE.panel2 : PALETTE.panel, stroke: i === on ? PALETTE.cyan : PALETTE.border, glow: i === on ? PALETTE.cyan : null });
    txt(ctx, x0 + i * (s + gap) + s / 2, y + s / 2 - 6, String(v), { size: 15, color: i === on ? PALETTE.cyan : PALETTE.text, weight: "700" });
    txt(ctx, x0 + i * (s + gap) + s / 2, y + s + 12, `[${i}]`, { size: 9, color: PALETTE.faint });
  });
};

VIZ["struct-box"] = (ctx, w, h, t) => {
  const fields = [["name", '"Jay"'], ["age", "20"]];
  const bw = 190, bh = 90, x = w / 2 - bw / 2, y = h / 2 - bh / 2;
  box(ctx, x, y, bw, bh, { stroke: PALETTE.cyan, glow: pulse(t, 1.5) > 0.7 ? PALETTE.cyan : null });
  txt(ctx, w / 2, y + 16, "struct Student", { size: 10, color: PALETTE.cyan, weight: "700" });
  fields.forEach((f, i) => {
    txt(ctx, x + 16, y + 42 + i * 22, f[0], { align: "left", size: 11, color: PALETTE.dim });
    txt(ctx, x + bw - 16, y + 42 + i * 22, f[1], { align: "right", size: 11, color: PALETTE.text });
  });
};

VIZ["pointer-arrow"] = (ctx, w, h, t) => {
  const p = pulse(t, 1.2);
  box(ctx, 60, h / 2 - 25, 100, 50, { fill: PALETTE.panel2, stroke: PALETTE.blue });
  txt(ctx, 110, h / 2 - 8, "x", { size: 12, color: PALETTE.dim });
  txt(ctx, 110, h / 2 + 12, "10", { size: 16, color: PALETTE.text, weight: "700" });
  box(ctx, w - 170, h / 2 - 25, 110, 50, { fill: PALETTE.panel2, stroke: PALETTE.cyan, glow: p > 0.5 ? PALETTE.cyan : null });
  txt(ctx, w - 115, h / 2 - 8, "p", { size: 12, color: PALETTE.dim });
  txt(ctx, w - 115, h / 2 + 12, "0x7ffc..", { size: 11, color: PALETTE.cyan });
  arrow(ctx, w - 118, h / 2 + 30, 112, h / 2 + 30, { color: PALETTE.cyan, dash: [5, 5], dashOffset: t * 25 });
  txt(ctx, w / 2, h / 2 + 48, "p points to the address of x", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["function-box"] = (ctx, w, h, t) => {
  const stage = cyclePos(t, 0.8, 3);
  box(ctx, 20, h / 2 - 20, 90, 40, { stroke: stage === 0 ? PALETTE.cyan : PALETTE.border, glow: stage === 0 ? PALETTE.cyan : null });
  txt(ctx, 65, h / 2, "add(3,4)", { size: 10.5, color: stage === 0 ? PALETTE.cyan : PALETTE.dim });
  box(ctx, w / 2 - 70, h / 2 - 30, 140, 60, { fill: PALETTE.panel2, stroke: stage === 1 ? PALETTE.cyan : PALETTE.border, glow: stage === 1 ? PALETTE.cyan : null });
  txt(ctx, w / 2, h / 2, "return a+b", { size: 11, color: stage === 1 ? PALETTE.cyan : PALETTE.text });
  box(ctx, w - 110, h / 2 - 20, 90, 40, { stroke: stage === 2 ? PALETTE.cyan : PALETTE.border, glow: stage === 2 ? PALETTE.cyan : null });
  txt(ctx, w - 65, h / 2, "7", { size: 15, color: stage === 2 ? PALETTE.cyan : PALETTE.text, weight: "700" });
  arrow(ctx, 112, h / 2, w / 2 - 72, h / 2, { color: stage >= 1 ? PALETTE.cyan : PALETTE.border });
  arrow(ctx, w / 2 + 72, h / 2, w - 112, h / 2, { color: stage >= 2 ? PALETTE.cyan : PALETTE.border });
};

VIZ["scope-boxes"] = (ctx, w, h, t) => {
  box(ctx, w / 2 - 150, 20, 300, h - 40, { stroke: PALETTE.blue, fill: "rgba(125,211,252,0.04)" });
  txt(ctx, w / 2, 40, "global scope (globalX)", { size: 10, color: PALETTE.blue });
  const p = pulse(t, 1.5);
  box(ctx, w / 2 - 90, 70, 180, h - 110, { stroke: p > 0.5 ? PALETTE.cyan : PALETTE.border, fill: "rgba(94,234,212,0.05)", glow: p > 0.5 ? PALETTE.cyan : null });
  txt(ctx, w / 2, 92, "demo() { local scope }", { size: 10, color: PALETTE.cyan });
  txt(ctx, w / 2, h / 2 + 20, "localY = 5", { size: 12, color: PALETTE.text });
};

VIZ["modules"] = (ctx, w, h, t) => {
  const modules = ["math", "your program"];
  const p = cyclePos(t, 1, 2);
  box(ctx, 40, h / 2 - 25, 130, 50, { stroke: PALETTE.pink, glow: p === 0 ? PALETTE.pink : null });
  txt(ctx, 105, h / 2, "math module", { size: 10.5, color: PALETTE.pink });
  box(ctx, w - 170, h / 2 - 25, 130, 50, { fill: PALETTE.panel2, stroke: PALETTE.cyan });
  txt(ctx, w - 105, h / 2, "your program", { size: 10.5, color: PALETTE.cyan });
  arrow(ctx, 172, h / 2, w - 172, h / 2, { color: PALETTE.pink, dash: [6, 6], dashOffset: t * 30 });
  txt(ctx, w / 2, h / 2 - 40, "import", { size: 10, color: PALETTE.faint });
};

VIZ["class-diagram"] = (ctx, w, h, t, c) => {
  const id = c ? c.id : "";
  if (id === "inheritance") return VIZ["tree-diagram"](ctx, w, h, t);
  const p = pulse(t, 1.2);
  box(ctx, w / 2 - 90, 24, 180, 64, { stroke: PALETTE.cyan, fill: PALETTE.panel2 });
  txt(ctx, w / 2, 44, "class Car", { size: 11, color: PALETTE.cyan, weight: "700" });
  txt(ctx, w / 2, 64, "- brand   + drive()", { size: 9.5, color: PALETTE.dim });
  const objs = [["myCar", "Toyota"], ["yourCar", "Honda"]];
  objs.forEach((o, i) => {
    const x = w / 2 - 100 + i * 200;
    const on = cyclePos(t, 1, 2) === i;
    arrow(ctx, w / 2 + (i === 0 ? -30 : 30), 90, x, 130, { color: on ? PALETTE.cyan : PALETTE.border });
    box(ctx, x - 55, 132, 110, 48, { fill: on ? PALETTE.panel2 : PALETTE.panel, stroke: on ? PALETTE.cyan : PALETTE.border, glow: on ? PALETTE.cyan : null });
    txt(ctx, x, 150, o[0], { size: 10, color: on ? PALETTE.cyan : PALETTE.dim });
    txt(ctx, x, 168, o[1], { size: 10, color: PALETTE.text });
  });
  txt(ctx, w / 2, h - 16, "objects created from one class", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["tree-diagram"] = (ctx, w, h, t) => {
  const parentY = 40, childY = 140;
  const on = pulse(t, 1.2) > 0.5;
  box(ctx, w / 2 - 70, parentY, 140, 46, { stroke: PALETTE.indigo, fill: PALETTE.panel2 });
  txt(ctx, w / 2, parentY + 23, "class Animal", { size: 10.5, color: PALETTE.indigo });
  [["Dog", w / 2 - 110], ["Cat", w / 2 + 110]].forEach((pair, i) => {
    arrow(ctx, w / 2, parentY + 46, pair[1], childY, { color: on ? PALETTE.cyan : PALETTE.border });
    box(ctx, pair[1] - 60, childY, 120, 46, { stroke: on ? PALETTE.cyan : PALETTE.border, fill: PALETTE.panel2, glow: on ? PALETTE.cyan : null });
    txt(ctx, pair[1], childY + 23, `class ${pair[0]}`, { size: 10.5, color: on ? PALETTE.cyan : PALETTE.text });
  });
  txt(ctx, w / 2, h - 14, "child classes inherit the parent", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["growth-chart"] = (ctx, w, h, t) => {
  const pad = 36, x0 = pad, y0 = h - pad, x1 = w - pad, y1 = pad;
  arrow(ctx, x0, y0, x1, y0, { color: PALETTE.border, head: 5 });
  arrow(ctx, x0, y0, x0, y1, { color: PALETTE.border, head: 5 });
  txt(ctx, x1 - 10, y0 + 16, "n", { size: 10, color: PALETTE.faint });
  txt(ctx, x0 - 4, y1, "time", { size: 9, color: PALETTE.faint, align: "right" });
  const curves = [
    { fn: (x) => x * 0.15, color: PALETTE.cyan, label: "O(1)/O(log n)" },
    { fn: (x) => x, color: PALETTE.blue, label: "O(n)" },
    { fn: (x) => x * x / (x1 - x0), color: PALETTE.pink, label: "O(n\u00b2)" },
  ];
  const reveal = (Math.sin(t * 0.6) + 1) / 2;
  curves.forEach((cv) => {
    ctx.beginPath();
    for (let x = 0; x <= (x1 - x0) * reveal; x += 2) {
      const y = y0 - Math.min(cv.fn(x), y0 - y1);
      if (x === 0) ctx.moveTo(x0 + x, y); else ctx.lineTo(x0 + x, y);
    }
    ctx.strokeStyle = cv.color; ctx.lineWidth = 2.5; ctx.stroke();
  });
  curves.forEach((cv, i) => txt(ctx, x0 + 60, y1 + 12 + i * 14, cv.label, { size: 9.5, color: cv.color, align: "left" }));
};

VIZ["linked-list"] = (ctx, w, h, t) => {
  const vals = [10, 20, 30, "NULL"];
  const bw = 80, gap = 34, total = vals.length * bw + (vals.length - 1) * gap, x0 = (w - total) / 2, y = h / 2 - 22;
  const on = cyclePos(t, 0.9, vals.length);
  vals.forEach((v, i) => {
    const x = x0 + i * (bw + gap);
    const active = i === on;
    box(ctx, x, y, bw, 44, { fill: active ? PALETTE.panel2 : PALETTE.panel, stroke: active ? PALETTE.cyan : PALETTE.border, glow: active ? PALETTE.cyan : null });
    txt(ctx, x + bw / 2, y + 22, String(v), { size: 12.5, color: active ? PALETTE.cyan : PALETTE.text, weight: "700" });
    if (i < vals.length - 1) arrow(ctx, x + bw + 2, y + 22, x + bw + gap - 2, y + 22, { color: i < on ? PALETTE.cyan : PALETTE.border });
  });
};

VIZ["stack"] = (ctx, w, h, t) => {
  const n = 4, bw = 130, bh = 36;
  const cyc = cyclePos(t, 0.7, n * 2);
  const count = cyc < n ? cyc + 1 : n * 2 - cyc;
  const x0 = w / 2 - bw / 2, yBase = h - 36;
  for (let i = 0; i < count; i++) {
    const y = yBase - i * (bh + 5);
    const top = i === count - 1;
    box(ctx, x0, y - bh, bw, bh, { fill: top ? PALETTE.panel2 : PALETTE.panel, stroke: top ? PALETTE.cyan : PALETTE.border, glow: top ? PALETTE.cyan : null });
    txt(ctx, x0 + bw / 2, y - bh / 2, `item ${i}`, { size: 10.5, color: top ? PALETTE.cyan : PALETTE.dim });
  }
  txt(ctx, w / 2, 22, cyc < n ? "push()" : "pop()", { size: 11, color: PALETTE.cyan });
  txt(ctx, w / 2, 40, "LIFO — top only", { size: 9, color: PALETTE.faint, mono: false });
};

VIZ["queue"] = (ctx, w, h, t) => {
  const n = 5, bw = 56, gap = 8, total = n * bw + (n - 1) * gap, x0 = (w - total) / 2, y = h / 2 - 22;
  const shift = cyclePos(t, 0.9, n);
  for (let i = 0; i < n; i++) {
    const front = i === 0;
    box(ctx, x0 + i * (bw + gap), y, bw, 44, { fill: front ? PALETTE.panel2 : PALETTE.panel, stroke: front ? PALETTE.cyan : PALETTE.border, glow: front ? PALETTE.cyan : null });
    txt(ctx, x0 + i * (bw + gap) + bw / 2, y + 22, `#${(i + shift) % 20}`, { size: 10.5, color: front ? PALETTE.cyan : PALETTE.text });
  }
  txt(ctx, x0, y - 14, "front (dequeue)", { size: 9, color: PALETTE.faint, align: "left" });
  txt(ctx, x0 + total, y - 14, "rear (enqueue)", { size: 9, color: PALETTE.faint, align: "right" });
};

VIZ["binary-tree"] = (ctx, w, h, t) => {
  const nodes = [[w / 2, 30, 8], [w / 2 - 90, 90, 4], [w / 2 + 90, 90, 12], [w / 2 - 135, 150, 2], [w / 2 - 45, 150, 6]];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4]];
  const active = cyclePos(t, 0.7, nodes.length);
  edges.forEach((e) => arrow(ctx, nodes[e[0]][0], nodes[e[0]][1] + 16, nodes[e[1]][0], nodes[e[1]][1] - 16, { color: PALETTE.border, head: 0 }));
  nodes.forEach((n, i) => {
    const on = i === active;
    ctx.beginPath(); ctx.arc(n[0], n[1], 16, 0, 7);
    ctx.fillStyle = on ? PALETTE.panel2 : PALETTE.panel; ctx.fill();
    ctx.strokeStyle = on ? PALETTE.cyan : PALETTE.border; ctx.lineWidth = 1.5;
    if (on) { ctx.save(); ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 12; }
    ctx.stroke(); if (on) ctx.restore();
    txt(ctx, n[0], n[1], String(n[2]), { size: 11, color: on ? PALETTE.cyan : PALETTE.text, weight: "700" });
  });
};

VIZ["graph"] = (ctx, w, h, t) => {
  const nodes = { A: [w / 2, 30], B: [w / 2 - 110, 100], C: [w / 2 + 110, 100], D: [w / 2 - 60, 175], E: [w / 2 + 60, 175] };
  const edges = [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"], ["B", "C"]];
  const order = ["A", "B", "C", "D", "E"];
  const active = order[cyclePos(t, 0.6, order.length)];
  edges.forEach((e) => arrow(ctx, nodes[e[0]][0], nodes[e[0]][1], nodes[e[1]][0], nodes[e[1]][1], { color: PALETTE.border, head: 0 }));
  Object.entries(nodes).forEach(([k, p]) => {
    const on = k === active;
    ctx.beginPath(); ctx.arc(p[0], p[1], 18, 0, 7);
    ctx.fillStyle = on ? PALETTE.panel2 : PALETTE.panel; ctx.fill();
    ctx.strokeStyle = on ? PALETTE.cyan : PALETTE.border; ctx.lineWidth = 1.5;
    if (on) { ctx.save(); ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 12; }
    ctx.stroke(); if (on) ctx.restore();
    txt(ctx, p[0], p[1], k, { size: 11, color: on ? PALETTE.cyan : PALETTE.text, weight: "700" });
  });
  txt(ctx, w / 2, h - 14, "visiting node " + active, { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["hash-buckets"] = (ctx, w, h, t) => {
  const buckets = 5, keys = [["jay", 1], ["sam", 3], ["mia", 1], ["kai", 4]];
  const bw = 60, gap = 14, total = buckets * bw + (buckets - 1) * gap, x0 = (w - total) / 2, y = h / 2;
  const on = cyclePos(t, 1, keys.length);
  for (let i = 0; i < buckets; i++) box(ctx, x0 + i * (bw + gap), y, bw, 40, { stroke: PALETTE.border });
  keys.forEach((k, i) => {
    const active = i === on;
    const x = x0 + k[1] * (bw + gap) + bw / 2;
    txt(ctx, x, y - 20 - (active ? 6 : 0), k[0], { size: 10.5, color: active ? PALETTE.cyan : PALETTE.faint });
    if (active) { ctx.save(); ctx.strokeStyle = PALETTE.cyan; ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 10; box(ctx, x0 + k[1] * (bw + gap), y, bw, 40, { stroke: PALETTE.cyan, fill: PALETTE.panel2 }); ctx.restore(); }
    txt(ctx, x, y + 20, active ? "hash()" : "", { size: 8.5, color: PALETTE.cyan });
  });
};

VIZ["sorting-bars"] = (ctx, w, h, t) => {
  const base = [5, 2, 4, 1, 3];
  const step = cyclePos(t, 0.55, 6);
  let arr = base.slice();
  for (let s = 0; s < step; s++) {
    for (let i = 0; i < arr.length - 1 - s; i++) if (arr[i] > arr[i + 1]) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }
  const bw = 46, gap = 14, total = arr.length * bw + (arr.length - 1) * gap, x0 = (w - total) / 2, base_y = h - 30;
  const maxV = 5;
  arr.forEach((v, i) => {
    const bh = (v / maxV) * (h - 70);
    const x = x0 + i * (bw + gap);
    box(ctx, x, base_y - bh, bw, bh, { fill: PALETTE.panel2, stroke: PALETTE.cyan, glow: PALETTE.cyan });
    txt(ctx, x + bw / 2, base_y - bh - 12, String(v), { size: 11, color: PALETTE.cyan });
  });
  txt(ctx, w / 2, 20, `pass ${Math.min(step, 5)}/4`, { size: 10, color: PALETTE.faint });
};

VIZ["binary-search"] = (ctx, w, h, t) => {
  const arr = [2, 5, 8, 12, 16, 23, 38, 45];
  const target = 23;
  let low = 0, high = arr.length - 1, steps = [];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ low, high, mid });
    if (arr[mid] === target) break;
    else if (arr[mid] < target) low = mid + 1; else high = mid - 1;
  }
  const s = steps[cyclePos(t, 1, steps.length)];
  const bw = 42, gap = 8, total = arr.length * bw + (arr.length - 1) * gap, x0 = (w - total) / 2, y = h / 2 - 21;
  arr.forEach((v, i) => {
    const inRange = i >= s.low && i <= s.high;
    const isMid = i === s.mid;
    box(ctx, x0 + i * (bw + gap), y, bw, 42, { fill: isMid ? PALETTE.panel2 : (inRange ? PALETTE.panel2 : PALETTE.panel), stroke: isMid ? PALETTE.cyan : (inRange ? PALETTE.blue : PALETTE.border), glow: isMid ? PALETTE.cyan : null });
    txt(ctx, x0 + i * (bw + gap) + bw / 2, y + 21, String(v), { size: 11, color: isMid ? PALETTE.cyan : (inRange ? PALETTE.text : PALETTE.faint) });
  });
  txt(ctx, w / 2, y - 16, `searching for ${target} — mid=${arr[s.mid]}`, { size: 10, color: PALETTE.dim, mono: false });
};

VIZ["dp-table"] = (ctx, w, h, t) => {
  const n = 8, fibs = [0, 1];
  for (let i = 2; i < n; i++) fibs.push(fibs[i - 1] + fibs[i - 2]);
  const on = cyclePos(t, 0.5, n);
  const bw = 50, gap = 8, total = n * bw + (n - 1) * gap, x0 = (w - total) / 2, y = h / 2 - 21;
  fibs.forEach((v, i) => {
    const filled = i <= on;
    box(ctx, x0 + i * (bw + gap), y, bw, 42, { fill: filled ? PALETTE.panel2 : PALETTE.panel, stroke: i === on ? PALETTE.cyan : (filled ? PALETTE.blue : PALETTE.border), glow: i === on ? PALETTE.cyan : null });
    txt(ctx, x0 + i * (bw + gap) + bw / 2, y + 21, filled ? String(v) : "?", { size: 12, color: i === on ? PALETTE.cyan : PALETTE.text });
  });
  txt(ctx, w / 2, y - 16, "memo table — each value computed once", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["greedy"] = (ctx, w, h, t) => {
  const coins = [25, 10, 5, 1];
  const on = cyclePos(t, 0.9, coins.length);
  const r0 = 34;
  coins.forEach((c, i) => {
    const x = w / 2 - 150 + i * 100, y = h / 2, active = i === on, r = r0 * (c / 25) * 0.8 + 12;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7);
    ctx.fillStyle = active ? PALETTE.panel2 : PALETTE.panel; ctx.fill();
    ctx.strokeStyle = active ? PALETTE.amber : PALETTE.border; ctx.lineWidth = 2;
    if (active) { ctx.save(); ctx.shadowColor = PALETTE.amber; ctx.shadowBlur = 14; }
    ctx.stroke(); if (active) ctx.restore();
    txt(ctx, x, y, String(c), { size: 12, color: active ? PALETTE.amber : PALETTE.text, weight: "700" });
  });
  txt(ctx, w / 2, h - 20, "always take the biggest that fits", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["try-catch"] = (ctx, w, h, t) => {
  const fail = cyclePos(t, 1.6, 3) === 1;
  box(ctx, w / 2 - 110, 30, 220, 50, { stroke: PALETTE.blue }); txt(ctx, w / 2, 55, "try { risky() }", { size: 11, color: PALETTE.blue });
  arrow(ctx, w / 2, 82, w / 2, 108, { color: fail ? PALETTE.rose : PALETTE.border });
  box(ctx, w / 2 - 110, 110, 220, 50, { stroke: fail ? PALETTE.rose : PALETTE.border, glow: fail ? PALETTE.rose : null });
  txt(ctx, w / 2, 135, fail ? "⚠ error caught!" : "catch (err) { … }", { size: 11, color: fail ? PALETTE.rose : PALETTE.dim });
  txt(ctx, w / 2, h - 20, "program keeps running safely", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["threads"] = (ctx, w, h, t) => {
  const rows = 3;
  for (let r = 0; r < rows; r++) {
    const y = 50 + r * 55;
    arrow(ctx, 40, y, w - 40, y, { color: PALETTE.border, head: 0 });
    const x = 40 + ((t * 60 + r * 70) % (w - 80));
    ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fillStyle = [PALETTE.cyan, PALETTE.pink, PALETTE.amber][r]; ctx.fill();
    txt(ctx, 20, y, `T${r + 1}`, { size: 9, color: PALETTE.faint, align: "right" });
  }
};

VIZ["memory-stack-heap"] = (ctx, w, h, t) => {
  box(ctx, 30, 20, w * 0.4, h - 40, { stroke: PALETTE.blue });
  txt(ctx, 30 + w * 0.2, 38, "stack", { size: 11, color: PALETTE.blue, weight: "700" });
  const sN = cyclePos(t, 0.7, 4);
  for (let i = 0; i < sN; i++) { const y = h - 40 - i * 26; box(ctx, 46, y - 20, w * 0.4 - 32, 20, { fill: PALETTE.panel2, stroke: PALETTE.blue }); }
  box(ctx, w * 0.55, 20, w * 0.42, h - 40, { stroke: PALETTE.pink });
  txt(ctx, w * 0.55 + w * 0.21, 38, "heap", { size: 11, color: PALETTE.pink, weight: "700" });
  const seedRand = (i) => { const x = Math.sin(i * 999) * 10000; return x - Math.floor(x); };
  for (let i = 0; i < 5; i++) {
    const active = cyclePos(t, 0.7, 5) === i;
    const bx = w * 0.6 + seedRand(i) * (w * 0.32 - 40);
    const by = 60 + seedRand(i + 10) * (h - 110);
    box(ctx, bx, by, 34, 22, { fill: active ? PALETTE.panel2 : PALETTE.panel, stroke: active ? PALETTE.pink : PALETTE.border, glow: active ? PALETTE.pink : null });
  }
};

VIZ["generics"] = (ctx, w, h, t) => {
  const types = ["int", "string", "User"];
  const on = cyclePos(t, 1, types.length);
  box(ctx, w / 2 - 90, h / 2 - 30, 180, 60, { stroke: PALETTE.cyan, fill: PALETTE.panel2 });
  txt(ctx, w / 2, h / 2 - 8, "Box<T>", { size: 13, color: PALETTE.cyan, weight: "700" });
  txt(ctx, w / 2, h / 2 + 14, `T = ${types[on]}`, { size: 11, color: PALETTE.text });
};

VIZ["async-timeline"] = (ctx, w, h, t) => {
  const y1 = h / 2 - 30, y2 = h / 2 + 30;
  txt(ctx, 40, y1, "main", { size: 10, color: PALETTE.dim, align: "left" });
  txt(ctx, 40, y2, "network", { size: 10, color: PALETTE.dim, align: "left" });
  const x0 = 90, x1 = w - 40;
  arrow(ctx, x0, y1, x1, y1, { color: PALETTE.border, head: 0 });
  arrow(ctx, x0, y2, x1, y2, { color: PALETTE.border, head: 0 });
  const p = (t % 2.4) / 2.4;
  const reqX = x0 + (x1 - x0) * 0.15;
  const resX = x0 + (x1 - x0) * 0.75;
  arrow(ctx, reqX, y1, reqX, y2, { color: PALETTE.cyan });
  arrow(ctx, resX, y2, resX, y1, { color: PALETTE.cyan });
  const dotX = x0 + (x1 - x0) * p;
  ctx.beginPath(); ctx.arc(dotX, dotX < reqX + 6 || dotX > resX - 6 ? y1 : y2, 6, 0, 7);
  ctx.fillStyle = PALETTE.amber; ctx.fill();
  txt(ctx, w / 2, h - 12, "main keeps running while network responds", { size: 9, color: PALETTE.faint, mono: false });
};

VIZ["database-table"] = (ctx, w, h, t) => {
  const rows = [["1", "Jay", "20"], ["2", "Sam", "22"]];
  const cols = ["id", "name", "age"];
  const cw = 90, x0 = w / 2 - (cw * cols.length) / 2, y0 = 40;
  cols.forEach((c, i) => { box(ctx, x0 + i * cw, y0, cw, 30, { fill: PALETTE.panel2, stroke: PALETTE.cyan }); txt(ctx, x0 + i * cw + cw / 2, y0 + 15, c, { size: 10.5, color: PALETTE.cyan, weight: "700" }); });
  const on = cyclePos(t, 1, rows.length);
  rows.forEach((r, ri) => r.forEach((v, ci) => {
    const active = ri === on;
    box(ctx, x0 + ci * cw, y0 + 30 + ri * 30, cw, 30, { fill: active ? PALETTE.panel2 : PALETTE.panel, stroke: active ? PALETTE.cyan : PALETTE.border });
    txt(ctx, x0 + ci * cw + cw / 2, y0 + 30 + ri * 30 + 15, v, { size: 10, color: active ? PALETTE.text : PALETTE.dim });
  }));
};

VIZ["api-flow"] = (ctx, w, h, t) => {
  const p = (t % 2) / 2;
  box(ctx, 30, h / 2 - 26, 100, 52, { stroke: PALETTE.blue }); txt(ctx, 80, h / 2, "client", { size: 11, color: PALETTE.blue });
  box(ctx, w - 130, h / 2 - 26, 100, 52, { stroke: PALETTE.pink }); txt(ctx, w - 80, h / 2, "server", { size: 11, color: PALETTE.pink });
  const going = p < 0.5;
  const x = going ? 132 + (w - 264) * (p * 2) : 132 + (w - 264) * (1 - (p - 0.5) * 2);
  ctx.beginPath(); ctx.arc(x, h / 2, 6, 0, 7); ctx.fillStyle = PALETTE.cyan; ctx.fill();
  txt(ctx, w / 2, h / 2 - 40, going ? "GET /users" : "200 OK { json }", { size: 10.5, color: PALETTE.cyan });
};

VIZ["git-branches"] = (ctx, w, h, t) => {
  const mainY = h / 2 + 30, featY = h / 2 - 30;
  arrow(ctx, 40, mainY, w - 40, mainY, { color: PALETTE.blue, head: 0 });
  const forkX = w * 0.35, mergeX = w * 0.7;
  arrow(ctx, forkX, mainY, mergeX, featY, { color: PALETTE.cyan, head: 0 });
  arrow(ctx, mergeX, featY, mergeX + 40, mainY, { color: PALETTE.cyan, head: 0 });
  [forkX, mergeX].forEach((x, i) => { ctx.beginPath(); ctx.arc(x, i === 0 ? mainY : featY, 5, 0, 7); ctx.fillStyle = PALETTE.cyan; ctx.fill(); });
  const on = cyclePos(t, 0.8, 4);
  const dots = [[80, mainY], [forkX + 40, featY], [mergeX - 20, featY], [mergeX + 60, mainY]];
  const d = dots[on];
  ctx.beginPath(); ctx.arc(d[0], d[1], 7, 0, 7); ctx.fillStyle = PALETTE.amber;
  ctx.save(); ctx.shadowColor = PALETTE.amber; ctx.shadowBlur = 10; ctx.fill(); ctx.restore();
  txt(ctx, 40, mainY + 18, "main", { size: 9, color: PALETTE.faint, align: "left" });
  txt(ctx, forkX + 20, featY - 12, "feature branch", { size: 9, color: PALETTE.faint });
};

VIZ["test-pass-fail"] = (ctx, w, h, t) => {
  const tests = [["add(2,3)==5", true], ["sub(5,2)==3", true], ["div(4,0)", false]];
  const on = cyclePos(t, 0.8, tests.length);
  tests.forEach((tc, i) => {
    const y = 50 + i * 46, active = i === on;
    box(ctx, w / 2 - 130, y, 260, 34, { fill: PALETTE.panel2, stroke: active ? (tc[1] ? PALETTE.cyan : PALETTE.rose) : PALETTE.border, glow: active ? (tc[1] ? PALETTE.cyan : PALETTE.rose) : null });
    txt(ctx, w / 2 - 110, y + 17, tc[0], { size: 10.5, color: PALETTE.text, align: "left" });
    txt(ctx, w / 2 + 110, y + 17, active ? (tc[1] ? "✓ pass" : "✗ fail") : "", { size: 10.5, color: tc[1] ? PALETTE.cyan : PALETTE.rose, align: "right" });
  });
};

VIZ["network-packets"] = (ctx, w, h, t) => {
  box(ctx, 30, h / 2 - 25, 90, 50, { stroke: PALETTE.blue }); txt(ctx, 75, h / 2, "you", { size: 11, color: PALETTE.blue });
  box(ctx, w - 120, h / 2 - 25, 90, 50, { stroke: PALETTE.pink }); txt(ctx, w - 75, h / 2, "server", { size: 11, color: PALETTE.pink });
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.5 + i / 3) % 1);
    const x = 122 + (w - 244) * p;
    ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(p * Math.PI);
    box(ctx, x, h / 2 - 12, 26, 24, { fill: PALETTE.panel2, stroke: PALETTE.cyan, r: 4 });
    ctx.restore();
  }
  txt(ctx, w / 2, h / 2 - 44, "data split into packets", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["lock-shield"] = (ctx, w, h, t) => {
  const cx = w / 2, cy = h / 2 - 10, p = pulse(t, 1.5);
  ctx.save();
  ctx.strokeStyle = PALETTE.cyan; ctx.lineWidth = 2.5;
  if (p > 0.6) { ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 16; }
  ctx.beginPath();
  ctx.moveTo(cx, cy - 50);
  ctx.bezierCurveTo(cx + 46, cy - 50, cx + 46, cy - 10, cx + 46, cy - 10);
  ctx.lineTo(cx + 46, cy + 30);
  ctx.bezierCurveTo(cx + 46, cy + 55, cx, cy + 66, cx, cy + 66);
  ctx.bezierCurveTo(cx, cy + 66, cx - 46, cy + 55, cx - 46, cy + 30);
  ctx.lineTo(cx - 46, cy - 10);
  ctx.bezierCurveTo(cx - 46, cy - 10, cx - 46, cy - 50, cx, cy - 50);
  ctx.closePath(); ctx.stroke();
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, 8, 0, 7); ctx.fillStyle = PALETTE.cyan; ctx.fill();
  txt(ctx, cx, h - 22, "encrypt · validate · hash", { size: 9.5, color: PALETTE.faint, mono: false });
};

VIZ["client-server"] = VIZ["api-flow"];

VIZ["mobile-screen"] = (ctx, w, h, t) => {
  const sw = 110, sh = h - 40, x0 = w / 2 - sw / 2, y0 = 20;
  box(ctx, x0, y0, sw, sh, { r: 16, stroke: PALETTE.cyan, fill: PALETTE.panel2 });
  const items = 3, on = cyclePos(t, 1, items);
  for (let i = 0; i < items; i++) {
    const y = y0 + 24 + i * 40;
    box(ctx, x0 + 12, y, sw - 24, 28, { fill: i === on ? PALETTE.panel : PALETTE.bg, stroke: i === on ? PALETTE.cyan : PALETTE.border, glow: i === on ? PALETTE.cyan : null });
  }
  box(ctx, x0 + sw / 2 - 14, y0 + sh - 14, 28, 5, { r: 3, stroke: PALETTE.border });
};

VIZ["neural-network"] = (ctx, w, h, t) => {
  const layers = [3, 4, 4, 2];
  const xs = layers.map((_, i) => 50 + i * ((w - 100) / (layers.length - 1)));
  const positions = layers.map((n, li) => Array.from({ length: n }, (_, i) => [xs[li], h / (n + 1) * (i + 1)]));
  for (let l = 0; l < positions.length - 1; l++) {
    positions[l].forEach((p1) => positions[l + 1].forEach((p2) => {
      ctx.save(); ctx.globalAlpha = 0.18; ctx.strokeStyle = PALETTE.border; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); ctx.restore();
    }));
  }
  const activeLayer = cyclePos(t, 0.6, layers.length);
  positions.forEach((layer, li) => layer.forEach((p) => {
    const on = li === activeLayer;
    ctx.beginPath(); ctx.arc(p[0], p[1], 8, 0, 7);
    ctx.fillStyle = on ? PALETTE.cyan : PALETTE.panel2;
    if (on) { ctx.save(); ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 10; ctx.fill(); ctx.restore(); }
    else ctx.fill();
    ctx.strokeStyle = on ? PALETTE.cyan : PALETTE.border; ctx.stroke();
  }));
};

VIZ["iot-devices"] = (ctx, w, h, t) => {
  const cx = w / 2, cy = h / 2;
  ctx.beginPath(); ctx.arc(cx, cy, 26, 0, 7); ctx.fillStyle = PALETTE.panel2; ctx.strokeStyle = PALETTE.cyan; ctx.lineWidth = 2; ctx.fill(); ctx.stroke();
  txt(ctx, cx, cy, "cloud", { size: 10, color: PALETTE.cyan });
  const devices = [["sensor", -140, -50], ["bulb", 140, -50], ["thermostat", -140, 60], ["camera", 140, 60]];
  devices.forEach((d, i) => {
    const x = cx + d[1], y = cy + d[2];
    const on = cyclePos(t, 0.7, devices.length) === i;
    arrow(ctx, cx, cy, x, y, { color: on ? PALETTE.cyan : PALETTE.border, dash: [4, 5], dashOffset: t * 20, head: 0 });
    box(ctx, x - 40, y - 16, 80, 32, { fill: on ? PALETTE.panel2 : PALETTE.panel, stroke: on ? PALETTE.cyan : PALETTE.border, glow: on ? PALETTE.cyan : null });
    txt(ctx, x, y, d[0], { size: 9.5, color: on ? PALETTE.cyan : PALETTE.dim });
  });
};

// generic fallback (used only if a viz key is somehow missing)
VIZ["__fallback"] = (ctx, w, h, t, c) => {
  const p = pulse(t, 1.2);
  ctx.beginPath(); ctx.arc(w / 2, h / 2, 30 + p * 6, 0, 7);
  ctx.strokeStyle = PALETTE.cyan; ctx.lineWidth = 2;
  ctx.save(); ctx.shadowColor = PALETTE.cyan; ctx.shadowBlur = 14; ctx.stroke(); ctx.restore();
  txt(ctx, w / 2, h / 2, (c && c.title) || "concept", { size: 11, color: PALETTE.text, mono: false });
};

// ============================================================
// Animation driver
// ============================================================
function mountViz(canvas, concept) {
  const ctx = canvas.getContext("2d");
  let raf = null, start = performance.now();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const renderer = VIZ[concept.viz] || VIZ["__fallback"];

  function frame(now) {
    const t = (now - start) / 1000;
    const rect = canvas.getBoundingClientRect();
    clear(ctx, rect.width, rect.height);
    try {
      renderer(ctx, rect.width, rect.height, t, concept);
    } catch (e) {
      VIZ["__fallback"](ctx, rect.width, rect.height, t, concept);
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
}
