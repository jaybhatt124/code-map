// ============================================================
// CODEMAP — App logic (no backend — everything runs client-side)
// ============================================================

const STORAGE_KEY = "codemap_progress_v1";

function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch (e) { return {}; }
}
function setProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
}
function isDone(id) { return !!getProgress()[id]; }
function toggleDone(id) {
  const p = getProgress();
  if (p[id]) delete p[id]; else p[id] = true;
  setProgress(p);
  return !!p[id];
}
function doneCount() { return Object.keys(getProgress()).length; }

function diffColorVar(diff) {
  if (diff === "Foundation") return "var(--foundation)";
  if (diff === "Easy") return "var(--easy)";
  if (diff === "Medium") return "var(--medium)";
  return "var(--hard)";
}

// ---------------- ROADMAP (index.html) ----------------
function initRoadmap() {
  const root = document.getElementById("roadmap");
  if (!root) return;

  const params = { q: "", diff: "all" };

  function render() {
    root.innerHTML = "";
    TIERS.forEach((tier) => {
      const items = CONCEPTS.filter((c) => c.tier === tier.id)
        .filter((c) => (params.diff === "all" || c.difficulty === params.diff))
        .filter((c) => c.title.toLowerCase().includes(params.q.toLowerCase()));
      if (items.length === 0) return;

      const row = document.createElement("div");
      row.className = "tier-row";
      row.style.setProperty("--tier-color", tier.color);

      const head = document.createElement("div");
      head.className = "tier-head";
      head.innerHTML = `<span class="num mono">TIER ${tier.id}</span><h2>${tier.name}</h2><span class="count">${items.length} concepts</span>`;
      row.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "node-grid";
      items.forEach((c) => {
        const a = document.createElement("a");
        a.href = `concept.html?id=${c.id}`;
        a.className = "node" + (isDone(c.id) ? " done" : "");
        a.style.setProperty("--tier-color", tier.color);
        a.innerHTML = `<span class="diff">${c.difficulty}</span><h3>${c.title}</h3>`;
        grid.appendChild(a);
      });
      row.appendChild(grid);
      root.appendChild(row);
    });

    if (root.children.length === 0) {
      root.innerHTML = `<p style="color:var(--text-faint);font-family:var(--mono);padding:40px 0;">No concepts match "${params.q}".</p>`;
    }
    updateProgressPill();
  }

  const search = document.getElementById("search");
  if (search) search.addEventListener("input", (e) => { params.q = e.target.value; render(); });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      params.diff = chip.dataset.diff;
      render();
    });
  });

  render();
}

function updateProgressPill() {
  const pill = document.getElementById("progressPill");
  if (!pill) return;
  const total = CONCEPTS.length, done = doneCount();
  const pct = Math.round((done / total) * 100);
  pill.innerHTML = `<span>${done}/${total} learned</span><span class="bar"><i style="width:${pct}%"></i></span>`;
}

// ---------------- CONCEPT PAGE (concept.html) ----------------
function initConceptPage() {
  const mount = document.getElementById("conceptRoot");
  if (!mount) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const idx = CONCEPTS.findIndex((c) => c.id === id);
  const concept = CONCEPTS[idx];

  if (!concept) {
    mount.innerHTML = `<div class="wrap" style="padding:60px 0;"><p>Concept not found. <a href="index.html" style="color:var(--cyan)">Back to roadmap</a></p></div>`;
    return;
  }

  const tier = TIERS.find((t) => t.id === concept.tier);
  document.title = `${concept.title} — CODEMAP`;
  document.documentElement.style.setProperty("--tier-color", tier.color);

  const prev = CONCEPTS[idx - 1];
  const next = CONCEPTS[idx + 1];

  mount.innerHTML = `
    <header class="concept-header">
      <div class="wrap">
        <div class="crumb">
          <a href="index.html">← Roadmap</a> <span>/</span> <span>${tier.name}</span>
        </div>
        <span class="tag" style="--tier-color:${tier.color}">${concept.difficulty} · Tier ${tier.id}</span>
        <h1>${concept.title}</h1>
        <div class="header-actions">
          <button class="btn ${isDone(concept.id) ? "done-state" : "primary"}" id="doneBtn">
            ${isDone(concept.id) ? "✓ Learned" : "Mark as Learned"}
          </button>
        </div>
      </div>
    </header>

    <div class="wrap concept-body">
      <div class="grid-2">
        <div>
          <div class="panel"><h2>History &amp; Origin</h2><p>${concept.history}</p></div>
          <div class="panel"><h2>Definition</h2><p>${concept.definition}</p></div>
          <div class="panel analogy"><h2>Real-World Analogy</h2><p>${concept.analogy}</p></div>
          <div class="panel">
            <h2>Code Example</h2>
            <div class="code-tabs" id="codeTabs"></div>
            <pre class="code-block" id="codeBlock"></pre>
          </div>
          <div class="panel"><h2>Real-World Application</h2><p>${concept.application}</p></div>
          <div class="panel" id="quizPanel">
            <h2>Quick Check</h2>
            <div id="quizArea"></div>
          </div>
        </div>

        <div>
          <div class="viz-panel">
            <h2>Visualization</h2>
            <canvas id="viz"></canvas>
            <div class="viz-caption">watch it animate — this is ${concept.title.toLowerCase()} in motion</div>
          </div>
        </div>
      </div>

      <div class="pn-nav">
        ${prev ? `<a class="pn-card prev" href="concept.html?id=${prev.id}"><div class="lbl">← Previous</div><div class="ttl">${prev.title}</div></a>` : `<div></div>`}
        ${next ? `<a class="pn-card next" href="concept.html?id=${next.id}"><div class="lbl">Next →</div><div class="ttl">${next.title}</div></a>` : `<div></div>`}
      </div>
    </div>
  `;

  // done button
  document.getElementById("doneBtn").addEventListener("click", (e) => {
    const done = toggleDone(concept.id);
    e.target.textContent = done ? "✓ Learned" : "Mark as Learned";
    e.target.classList.toggle("done-state", done);
    e.target.classList.toggle("primary", !done);
  });

  // code tabs
  const langs = Object.keys(concept.code).filter((l) => concept.code[l]);
  const tabsEl = document.getElementById("codeTabs");
  const blockEl = document.getElementById("codeBlock");
  const labelMap = { c: "C", python: "Python", javascript: "JavaScript" };
  let activeLang = langs[0];
  function renderCode() {
    tabsEl.innerHTML = langs.map((l) => `<button class="code-tab ${l === activeLang ? "active" : ""}" data-lang="${l}">${labelMap[l] || l}</button>`).join("");
    blockEl.textContent = concept.code[activeLang];
    tabsEl.querySelectorAll(".code-tab").forEach((btn) => {
      btn.addEventListener("click", () => { activeLang = btn.dataset.lang; renderCode(); });
    });
  }
  renderCode();

  // visualization
  mountViz(document.getElementById("viz"), concept);

  // quiz — pick 2 random distractor definitions from other concepts
  const others = CONCEPTS.filter((c) => c.id !== concept.id);
  const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 2);
  const options = [{ text: concept.definition, correct: true }, ...shuffled.map((o) => ({ text: o.definition, correct: false }))]
    .sort(() => Math.random() - 0.5);
  const quizArea = document.getElementById("quizArea");
  quizArea.innerHTML = `
    <div class="quiz-q">Which definition correctly describes <strong>${concept.title}</strong>?</div>
    <div class="quiz-opts">
      ${options.map((o, i) => `<button class="quiz-opt" data-correct="${o.correct}">${o.text}</button>`).join("")}
    </div>
    <div class="quiz-feedback" id="quizFeedback"></div>
  `;
  quizArea.querySelectorAll(".quiz-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const correct = btn.dataset.correct === "true";
      quizArea.querySelectorAll(".quiz-opt").forEach((b) => b.disabled = true);
      btn.classList.add(correct ? "correct" : "wrong");
      document.getElementById("quizFeedback").textContent = correct
        ? "✓ Correct — nice work."
        : "✗ Not quite — the highlighted option below is correct.";
      if (!correct) {
        quizArea.querySelectorAll(".quiz-opt").forEach((b) => { if (b.dataset.correct === "true") b.classList.add("correct"); });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRoadmap();
  initConceptPage();
  updateProgressPill();
});
