// ═══════════════════════════════════════════
// CODEMAP — Interactive Viz Controls
// ═══════════════════════════════════════════

var CONCEPT_INPUTS = {
  // ── C Programming (cpfc) ──
  "flowchart-algorithm":  { type:"string",  label:"Algorithm (e.g. factorial 5, max3 10 20 30)", default:"factorial 5", placeholder:"factorial 5 / max2 10 25 / gcd 12 8 / sum 10 ..." },
  "overview-of-c":        null,
  "constants-variables":  { type:"numbers", label:"Values to declare", default:"20, 85, 65", placeholder:"e.g. age, marks, rollno" },
  "data-types-c":         null,
  "io-operations":        { type:"numbers", label:"Values to print", default:"42, 3.14, 72", placeholder:"e.g. 42, 3.14, 72" },
  "operators-expressions":{ type:"numbers", label:"Two numbers", default:"10, 3", placeholder:"e.g. 10, 3" },
  "if-statement":         { type:"number",  label:"Number to check", default:"15", placeholder:"e.g. 15" },
  "if-else-statement":    { type:"number",  label:"Number to check", default:"7", placeholder:"e.g. 7" },
  "nested-if-statement":  { type:"numbers", label:"Three numbers", default:"10, 25, 18", placeholder:"e.g. 10, 25, 18" },
  "else-if-ladder":       { type:"number",  label:"Marks (0-100)", default:"82", placeholder:"e.g. 82" },
  "switch-statement":     { type:"number",  label:"Day number (1-7)", default:"3", placeholder:"e.g. 3" },
  "goto-statement":       null,
  "while-loop":           { type:"number",  label:"Count to N", default:"10", placeholder:"e.g. 10" },
  "do-while-loop":        { type:"number",  label:"Count to N", default:"5", placeholder:"e.g. 5" },
  "for-loop":             { type:"number",  label:"N (sum 1 to N)", default:"10", placeholder:"e.g. 10" },
  "break-continue":       null,
  "arrays-1d":            { type:"numbers", label:"Array elements", default:"4, 7, 2, 9, 1, 6", placeholder:"e.g. 4, 7, 2, 9, 1, 6" },
  "arrays-2d":            { type:"numbers", label:"Rows, Cols, then values", default:"2, 3, 1, 2, 3, 4, 5, 6", placeholder:"e.g. 2, 3, 1, 2, 3, 4, 5, 6" },
  "pointers-intro":       { type:"number",  label:"Value for pointer", default:"42", placeholder:"e.g. 42" },
  "address-indirection":  { type:"numbers", label:"Two values (swap)", default:"10, 25", placeholder:"e.g. 10, 25" },
  "void-null-pointers":   null,
  "function-types":       null,
  "passing-arrays":       { type:"numbers", label:"Array elements", default:"1, 2, 3, 4, 5", placeholder:"e.g. 1, 2, 3, 4, 5" },
  "recursion-c":          { type:"number",  label:"N (factorial)", default:"5", placeholder:"e.g. 5" },
  "scope-visibility":     null,
  "strings-c":            { type:"strings", label:"Two strings", default:"Hello, World", placeholder:"e.g. Hello, World" },
  "file-io-c":            null,

  // ── Python (python) ──
  "py-history":              null,
  "py-features":             null,
  "py-variables":            { type:"numbers", label:"Values to assign", default:"20, 85, 65", placeholder:"e.g. 20, 85, 65" },
  "py-type-casting":         null,
  "py-io":                   { type:"numbers", label:"Values to print", default:"42, 3.14, 72", placeholder:"e.g. 42, 3.14, 72" },
  "py-data-types":           null,
  "py-arithmetic-ops":       { type:"numbers", label:"Two numbers", default:"17, 5", placeholder:"e.g. 17, 5" },
  "py-logical-ops":          null,
  "py-comparison-ops":       { type:"numbers", label:"Two numbers", default:"5, 3", placeholder:"e.g. 5, 3" },
  "py-assignment-ops":       { type:"number",  label:"Starting value", default:"10", placeholder:"e.g. 10" },
  "py-bitwise-ops":          { type:"numbers", label:"Two numbers", default:"5, 3", placeholder:"e.g. 5, 3" },
  "py-membership-ops":       { type:"strings", label:"String, Search term", default:"Hello World, World", placeholder:"e.g. Hello World, World" },
  "py-identity-ops":         null,
  "py-if-elif-else":         { type:"number",  label:"Marks (0-100)", default:"82", placeholder:"e.g. 82" },
  "py-while-loop":           { type:"number",  label:"Count to N", default:"10", placeholder:"e.g. 10" },
  "py-for-loop-range":       { type:"number",  label:"N (range)", default:"10", placeholder:"e.g. 10" },
  "py-break-continue-pass":  null,
  "py-nested-loops":         { type:"number",  label:"N (multiplication table)", default:"5", placeholder:"e.g. 5" },
  "py-lists":                { type:"numbers", label:"List elements", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "py-tuples":               { type:"strings", label:"Tuple elements", default:"red, green, blue", placeholder:"e.g. red, green, blue" },
  "py-sets":                 { type:"numbers", label:"Set A elements", default:"1, 2, 3, 4, 5", placeholder:"e.g. 1, 2, 3, 4, 5" },
  "py-dictionaries":         { type:"kv",      label:"Key:Value pairs", default:"name:Ali, age:20, grade:A", placeholder:"e.g. name:Ali, age:20" },
  "py-built-in-functions":   { type:"numbers", label:"Numbers", default:"3, 1, 4, 1, 5, 9, 2, 6", placeholder:"e.g. 3, 1, 4, 1, 5, 9, 2, 6" },
  "py-file-handling":        null,
  "py-functions":            { type:"numbers", label:"Arguments", default:"5, 3", placeholder:"e.g. 5, 3" },
  "py-recursion":            { type:"number",  label:"N (factorial)", default:"5", placeholder:"e.g. 5" },
  "py-scope":                null,
  "py-modules-packages":     null,
  "py-matplotlib":           { type:"numbers", label:"Data points", default:"2, 4, 1, 5, 3, 6", placeholder:"e.g. 2, 4, 1, 5, 3, 6" },
  "py-numpy":                { type:"numbers", label:"Array elements", default:"1, 2, 3, 4, 5", placeholder:"e.g. 1, 2, 3, 4, 5" },

  // ── Data Structures (ds) ──
  "ds-basics":               null,
  "algorithm-complexity":    { type:"number",  label:"N value", default:"10", placeholder:"e.g. 10" },
  "big-o-omega-theta":       { type:"number",  label:"N value", default:"8", placeholder:"e.g. 8" },
  "arrays-row-column":       { type:"numbers", label:"Rows, Cols", default:"3, 4", placeholder:"e.g. 3, 4" },
  "array-operations":        { type:"numbers", label:"Array + position", default:"10, 20, 30, 40, 50", placeholder:"e.g. 10, 20, 30, 40, 50" },
  "stack":                   { type:"numbers", label:"Elements to push", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "infix-prefix-postfix":    { type:"string",  label:"Infix expression", default:"A+B*C", placeholder:"e.g. A+B*C" },
  "recursion-ds":            { type:"number",  label:"N (factorial)", default:"5", placeholder:"e.g. 5" },
  "queue-simple":            { type:"numbers", label:"Elements to enqueue", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "queue-circular":          { type:"numbers", label:"Elements to enqueue", default:"10, 20, 30, 40, 50", placeholder:"e.g. 10, 20, 30, 40, 50" },
  "pointers-structures":     null,
  "singly-linked-list":      { type:"numbers", label:"Elements", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "circular-linked-list":    { type:"numbers", label:"Elements", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "doubly-linked-list":      { type:"numbers", label:"Elements", default:"10, 20, 30, 40", placeholder:"e.g. 10, 20, 30, 40" },
  "tree-terminology":        { type:"numbers", label:"Tree values (BFS order)", default:"50, 30, 70, 20, 40, 60, 80", placeholder:"e.g. 50, 30, 70, 20, 40, 60, 80" },
  "tree-traversals":         { type:"numbers", label:"Tree values (BFS order)", default:"50, 30, 70, 20, 40, 60, 80", placeholder:"e.g. 50, 30, 70, 20, 40, 60, 80" },
  "bst":                     { type:"numbers", label:"Values to insert", default:"50, 30, 70, 20, 40, 60, 80", placeholder:"e.g. 50, 30, 70, 20, 40, 60, 80" },
  "graph-terminology":       null,
  "graph-types":             null,
  "bubble-sort":             { type:"numbers", label:"Array to sort", default:"5, 3, 8, 1, 4, 7, 2, 6", placeholder:"e.g. 5, 3, 8, 1, 4, 7, 2, 6" },
  "selection-sort":          { type:"numbers", label:"Array to sort", default:"5, 3, 8, 1, 4, 7, 2, 6", placeholder:"e.g. 5, 3, 8, 1, 4, 7, 2, 6" },
  "insertion-sort":          { type:"numbers", label:"Array to sort", default:"5, 3, 8, 1, 4, 7, 2, 6", placeholder:"e.g. 5, 3, 8, 1, 4, 7, 2, 6" },
  "quick-sort":              { type:"numbers", label:"Array to sort", default:"5, 3, 8, 1, 4, 7, 2, 6", placeholder:"e.g. 5, 3, 8, 1, 4, 7, 2, 6" },
  "merge-sort":              { type:"numbers", label:"Array to sort", default:"5, 3, 8, 1, 4, 7, 2, 6", placeholder:"e.g. 5, 3, 8, 1, 4, 7, 2, 6" },
  "radix-sort":              { type:"numbers", label:"Array to sort", default:"170, 45, 75, 90, 802, 24, 2, 66", placeholder:"e.g. 170, 45, 75, 90, 802, 24, 2, 66" },
  "linear-search":           { type:"search",  label:"Array, Target", default:"4, 7, 2, 9, 1, 6, 3, 8 | 6", placeholder:"e.g. 4, 7, 2, 9, 1, 6, 3, 8 | 6" },
  "binary-search":           { type:"search",  label:"Sorted array, Target", default:"1, 2, 3, 4, 5, 6, 7, 8 | 6", placeholder:"e.g. 1, 2, 3, 4, 5, 6, 7, 8 | 6" },
  "hashing":                 { type:"numbers", label:"Keys to insert", default:"15, 25, 35, 45, 55", placeholder:"e.g. 15, 25, 35, 45, 55" }
};

function parseUserData(config, raw) {
  if (!config || !raw || !raw.trim()) return null;
  var val = raw.trim();
  if (config.type === "numbers" || config.type === "number") {
    var nums = val.split(/[,\s]+/).map(Number).filter(function(n) { return !isNaN(n); });
    return config.type === "number" ? { value: nums[0] || 0 } : { numbers: nums };
  }
  if (config.type === "strings") {
    return { strings: val.split(",").map(function(s) { return s.trim(); }) };
  }
  if (config.type === "string") {
    return { text: val };
  }
  if (config.type === "kv") {
    var pairs = {};
    val.split(",").forEach(function(p) {
      var kv = p.split(":");
      if (kv.length === 2) pairs[kv[0].trim()] = kv[1].trim();
    });
    return { pairs: pairs };
  }
  if (config.type === "search") {
    var parts = val.split("|");
    if (parts.length === 2) {
      var nums = parts[0].split(/[,\s]+/).map(Number).filter(function(n) { return !isNaN(n); });
      var target = Number(parts[1].trim());
      return { numbers: nums, target: target };
    }
    return { numbers: val.split(/[,\s]+/).map(Number).filter(function(n) { return !isNaN(n); }), target: 0 };
  }
  return { text: val };
}

function mountVizControls(containerEl, conceptId, vizState) {
  var config = CONCEPT_INPUTS[conceptId];
  if (!config) {
    containerEl.innerHTML = '<div class="viz-controls viz-controls--minimal"><div class="viz-step-display"><span class="viz-step-label">Step</span><span class="viz-step-num" id="vizStepNum">1</span><span class="viz-step-sep">/</span><span class="viz-step-total" id="vizStepTotal">1</span></div></div>';
    return;
  }
  var inputHtml = '';
  if (config.type === "search") {
    inputHtml = '<input type="text" class="viz-input" id="vizInput" placeholder="' + config.placeholder + '" value="' + config.default + '">';
  } else if (config.type === "kv") {
    inputHtml = '<input type="text" class="viz-input" id="vizInput" placeholder="' + config.placeholder + '" value="' + config.default + '">';
  } else if (config.type === "number") {
    inputHtml = '<input type="number" class="viz-input" id="vizInput" placeholder="' + config.placeholder + '" value="' + config.default + '">';
  } else {
    inputHtml = '<input type="text" class="viz-input" id="vizInput" placeholder="' + config.placeholder + '" value="' + config.default + '">';
  }

  containerEl.innerHTML =
    '<div class="viz-controls">' +
      '<div class="viz-controls-row">' +
        '<label class="viz-label">' + config.label + '</label>' +
        inputHtml +
        '<button class="viz-btn viz-btn-apply" id="vizApply">Apply</button>' +
      '</div>' +
      '<div class="viz-controls-row">' +
        '<div class="viz-btn-group">' +
          '<button class="viz-btn viz-btn-play" id="vizPlay" title="Pause">⏸</button>' +
          '<button class="viz-btn viz-btn-reset" id="vizReset" title="Reset">↺</button>' +
        '</div>' +
        '<div class="viz-step-display">' +
          '<span class="viz-step-label">Step</span>' +
          '<span class="viz-step-num" id="vizStepNum">0</span>' +
          '<span class="viz-step-sep">/</span>' +
          '<span class="viz-step-total" id="vizStepTotal">0</span>' +
          '<span class="viz-step-msg" id="vizStepMsg"></span>' +
        '</div>' +
      '</div>' +
    '</div>';

  var applyBtn = document.getElementById("vizApply");
  var playBtn  = document.getElementById("vizPlay");
  var resetBtn = document.getElementById("vizReset");
  var inputEl  = document.getElementById("vizInput");

  applyBtn.addEventListener("click", function() {
    var ud = parseUserData(config, inputEl.value);
    vizState.userData = ud;
    vizState.resetTime = true;
  });

  inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") applyBtn.click();
  });

  playBtn.addEventListener("click", function() {
    vizState.running = !vizState.running;
    playBtn.innerHTML = vizState.running ? "⏸" : "▶";
    playBtn.title = vizState.running ? "Pause" : "Play";
  });

  resetBtn.addEventListener("click", function() {
    vizState.resetTime = true;
    vizState.running = true;
    playBtn.innerHTML = "⏸";
    playBtn.title = "Pause";
  });

  var ud = parseUserData(config, config.default);
  vizState.userData = ud;
}

function updateStepDisplay(vizState) {
  var numEl = document.getElementById("vizStepNum");
  var totEl = document.getElementById("vizStepTotal");
  var msgEl = document.getElementById("vizStepMsg");
  if (numEl) numEl.textContent = vizState.step || 0;
  if (totEl) totEl.textContent = vizState.total || 0;
  if (msgEl) msgEl.textContent = vizState.message || "";
}
