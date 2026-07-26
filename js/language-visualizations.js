// ============================================================
// CODEMAP — Educational Language Visualizations
// Animated, student-friendly canvas animations for each language
// Each animation TEACHES a core concept visually
// ============================================================

(function() {
  var P = {
    bg: "#F8FAFC", panel: "#FFFFFF", panel2: "#F1F5F9",
    border: "#CBD5E1", text: "#1E293B", dim: "#475569", faint: "#94A3B8",
    cyan: "#0D9488", blue: "#2563EB", pink: "#DB2777", amber: "#D97706",
    rose: "#E11D48", green: "#16A34A", orange: "#EA580C"
  };

  // ── Drawing Helpers ──
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  }
  function box(ctx,x,y,w,h,o) {
    o=o||{}; var r=o.r||8, fill=o.fill||P.panel2, stroke=o.stroke||P.border, glow=o.glow;
    rr(ctx,x,y,w,h,r);
    if(glow){ctx.save();ctx.shadowColor=glow;ctx.shadowBlur=16;}
    ctx.fillStyle=fill; ctx.fill();
    if(glow) ctx.restore();
    ctx.strokeStyle=stroke; ctx.lineWidth=1.5; ctx.stroke();
  }
  function txt(ctx,x,y,s,o) {
    o=o||{}; var sz=o.sz||12, c=o.c||P.text, a=o.a||"center", w=o.w||"500", m=o.m!==false;
    ctx.font=w+" "+sz+"px "+(m?"'JetBrains Mono',monospace":"Inter,sans-serif");
    ctx.fillStyle=c; ctx.textAlign=a; ctx.textBaseline="middle"; ctx.fillText(s,x,y);
  }
  function arrow(ctx,x1,y1,x2,y2,o) {
    o=o||{}; var c=o.c||P.border, lw=o.lw||2, hd=o.hd!==undefined?o.hd:6;
    ctx.save(); ctx.strokeStyle=c; ctx.lineWidth=lw;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore();
    if(hd>0){var ag=Math.atan2(y2-y1,x2-x1);ctx.save();ctx.fillStyle=c;ctx.beginPath();
    ctx.moveTo(x2,y2);ctx.lineTo(x2-hd*Math.cos(ag-0.5),y2-hd*Math.sin(ag-0.5));
    ctx.lineTo(x2-hd*Math.cos(ag+0.5),y2-hd*Math.sin(ag+0.5));ctx.closePath();ctx.fill();ctx.restore();}
  }
  function pl(t,s){return(Math.sin(t*(s||1))+1)/2;}
  function cyc(t,p,n){return Math.floor((t/p)%n);}
  function lerp(a,b,t){return a+(b-a)*Math.min(1,Math.max(0,t));}

  // ── Animated Code Typewriter ──
  function typewriter(ctx, x, y, code, t, opts) {
    opts = opts || {};
    var speed = opts.speed || 30;
    var maxChars = Math.floor(t * speed);
    var lines = code.split("\n");
    var displayed = "";
    var charCount = 0;
    for (var i = 0; i < lines.length; i++) {
      for (var j = 0; j < lines[i].length; j++) {
        charCount++;
        if (charCount <= maxChars) displayed += lines[i][j];
      }
      if (i < lines.length - 1 && charCount <= maxChars) displayed += "\n";
    }
    var arr = displayed.split("\n");
    for (var k = 0; k < arr.length; k++) {
      var lineColor = opts.colors ? (opts.colors[k] || P.cyan) : P.cyan;
      txt(ctx, x, y + k * 18, arr[k], { sz: 11, c: lineColor, a: "left" });
    }
    if (charCount <= maxChars) {
      var blink = Math.sin(t * 4) > 0;
      if (blink) {
        var lastLine = arr[arr.length - 1] || "";
        var tw = ctx.measureText(lastLine).width;
        ctx.fillStyle = P.cyan;
        ctx.fillRect(x + tw + 2, y + (arr.length - 1) * 18 - 7, 2, 14);
      }
    }
  }

  // ── Animated Memory Box ──
  function memBox(ctx, x, y, w, h, label, value, color, active) {
    box(ctx, x, y, w, h, { stroke: active ? color : P.border, glow: active ? color : null });
    txt(ctx, x + w/2, y + 12, label, { sz: 8, c: P.faint });
    txt(ctx, x + w/2, y + h - 10, value, { sz: 12, c: active ? color : P.text, w: "700" });
  }

  // ── Animated Arrow with Data Flow ──
  function dataArrow(ctx, x1, y1, x2, y2, t, color, data) {
    var p = (t % 2) / 2;
    arrow(ctx, x1, y1, x2, y2, { c: P.border, lw: 1.5, hd: 5 });
    var dx = x2 - x1, dy = y2 - y1;
    var px = x1 + dx * p, py = y1 + dy * p;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = color || P.cyan;
    ctx.save(); ctx.shadowColor = color || P.cyan; ctx.shadowBlur = 10;
    ctx.fill(); ctx.restore();
    if (data) {
      txt(ctx, px, py - 12, data, { sz: 8, c: color || P.cyan });
    }
  }

  // ══════════════════════════════════════════════
  // PER-LANGUAGE EDUCATIONAL VISUALIZATIONS
  // ══════════════════════════════════════════════

  // ── C: Memory Layout with Pointers ──
  function vizC(ctx, w, h, t) {
    var phase = cyc(t, 4, 3);
    txt(ctx, w/2, 18, "C: Direct Memory Access with Pointers", { sz: 11, c: P.cyan, w: "700" });

    // Memory stack
    var stackX = 30, stackY = 50, stackW = w * 0.35, stackH = h - 80;
    box(ctx, stackX, stackY, stackW, stackH, { r: 10, stroke: P.blue });
    txt(ctx, stackX + stackW/2, stackY + 16, "STACK MEMORY", { sz: 9, c: P.blue, w: "700" });

    var vars = [
      { name: "int x", value: "10", addr: "0x7FF0" },
      { name: "int y", value: "25", addr: "0x7FF4" },
      { name: "char c", value: "'A'", addr: "0x7FF8" }
    ];
    vars.forEach(function(v, i) {
      var vy = stackY + 40 + i * 50;
      var on = phase === 0 && cyc(t, 1, vars.length) === i;
      memBox(ctx, stackX + 10, vy, stackW - 20, 42, v.name + "  " + v.addr, v.value, on ? P.cyan : P.dim, on);
    });

    // Pointer pointing to x
    var ptrY = stackY + 40 + 50 * 2 + 50;
    memBox(ctx, stackX + 10, ptrY, stackW - 20, 42, "int *p = &x", "0x7FF0", P.orange, phase === 1);

    // Arrow from pointer to x
    if (phase === 1) {
      var arrowStartX = stackX + stackW - 10;
      var arrowEndX = stackX + stackW + 20;
      var targetY = stackY + 40 + 21;
      ctx.save();
      ctx.strokeStyle = P.orange;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -t * 30;
      ctx.beginPath();
      ctx.moveTo(arrowStartX, ptrY + 21);
      ctx.quadraticCurveTo(arrowStartX + 40, ptrY + 21, arrowStartX + 40, targetY);
      ctx.quadraticCurveTo(arrowStartX + 40, targetY, arrowEndX, targetY);
      ctx.stroke();
      ctx.restore();
      txt(ctx, arrowStartX + 50, ptrY - 10, "points to", { sz: 9, c: P.orange, m: false });
    }

    // Right side: explanation
    var rightX = stackX + stackW + 50;
    var rightW = w - rightX - 30;
    box(ctx, rightX, stackY, rightW, stackH, { r: 10, stroke: P.cyan });

    if (phase === 0) {
      txt(ctx, rightX + rightW/2, stackY + 20, "VARIABLES", { sz: 10, c: P.cyan, w: "700" });
      var expl = [
        "Each variable has:",
        "",
        "1. A NAME (x, y, c)",
        "2. A VALUE (10, 25, 'A')",
        "3. A MEMORY ADDRESS",
        "   (like a house number)",
        "",
        "int x = 10 lives at",
        "address 0x7FF0 in RAM"
      ];
      expl.forEach(function(line, i) {
        txt(ctx, rightX + 16, stackY + 46 + i * 22, line, { sz: 10, c: line ? P.dim : P.text, a: "left", m: false });
      });
    } else if (phase === 1) {
      txt(ctx, rightX + rightW/2, stackY + 20, "POINTERS", { sz: 10, c: P.orange, w: "700" });
      var expl2 = [
        "A pointer stores an",
        "ADDRESS, not a value.",
        "",
        "int *p = &x",
        "p now holds 0x7FF0",
        "(address of x)",
        "",
        "*p = 20 changes x!",
        "(* means 'go to address')"
      ];
      expl2.forEach(function(line, i) {
        txt(ctx, rightX + 16, stackY + 46 + i * 22, line, { sz: 10, c: line ? P.dim : P.text, a: "left", m: false });
      });
    } else {
      txt(ctx, rightX + rightW/2, stackY + 20, "WHY DANGEROUS", { sz: 10, c: P.rose, w: "700" });
      var expl3 = [
        "Pointers can point to:",
        "",
        "  Valid memory  (safe)",
        "  Freed memory  (crash!)",
        "  Other vars    (corrupt!)",
        "  NULL          (segfault!)",
        "",
        "This power + risk is why",
        "C is called 'unsafe'"
      ];
      expl3.forEach(function(line, i) {
        txt(ctx, rightX + 16, stackY + 46 + i * 22, line, { sz: 10, c: line ? P.dim : P.text, a: "left", m: false });
      });
    }

    // Bottom bar
    var barY = h - 18;
    var phases = ["Variables in Memory", "Pointers Reference Addresses", "Power + Danger of Pointers"];
    txt(ctx, w/2, barY, phases[phase], { sz: 9, c: P.faint, m: false });
  }

  // ── Python: Dynamic Typing in Action ──
  function vizPython(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 4);
    txt(ctx, w/2, 18, "Python: Dynamic Typing & Indentation", { sz: 11, c: P.cyan, w: "700" });

    // Left: Variable boxes changing type
    var leftX = 30, leftY = 50;
    box(ctx, leftX, leftY, w * 0.45, h - 80, { r: 10, stroke: P.blue });
    txt(ctx, leftX + w * 0.225, leftY + 16, "DYNAMIC TYPING", { sz: 9, c: P.blue, w: "700" });

    var varStates = [
      [{ name: "x", val: "42", type: "int", color: P.cyan }],
      [{ name: "x", val: '"hello"', type: "str", color: P.pink }],
      [{ name: "x", val: "[1, 2, 3]", type: "list", color: P.green }],
      [{ name: "x", val: "True", type: "bool", color: P.amber }]
    ];

    var cur = varStates[phase];
    cur.forEach(function(v, i) {
      var vy = leftY + 50 + i * 80;
      memBox(ctx, leftX + 20, vy, w * 0.45 - 40, 60, "x : " + v.type, v.val, v.color, true);
    });

    // Transition arrows between states
    if (phase > 0) {
      var arrowY = leftY + 50 + 30;
      for (var i = 0; i < phase; i++) {
        var prevColor = varStates[i][0].color;
        txt(ctx, leftX + w * 0.225, arrowY - 80 + i * 80, "  " + varStates[i][0].val + "  " + varStates[i][0].type, { sz: 9, c: P.faint });
        if (i < phase) {
          arrow(ctx, leftX + w * 0.225, arrowY - 40 + i * 80, leftX + w * 0.225, arrowY - 10 + i * 80, { c: P.faint, hd: 4 });
        }
      }
    }

    // Right side explanation
    var rightX = leftX + w * 0.45 + 20;
    var rightW = w - rightX - 20;
    box(ctx, rightX, leftY, rightW, h - 80, { r: 10, stroke: P.green });

    if (phase === 0) {
      txt(ctx, rightX + rightW/2, leftY + 20, "NO TYPE DECLARATION", { sz: 10, c: P.green, w: "700" });
      var expl = [
        "x = 42  # integer",
        "x = \"hello\" # now string!",
        "",
        "Python figures out the",
        "type at RUNTIME, not",
        "compile time.",
        "",
        "This is DYNAMIC typing.",
        "Flexible but less safe."
      ];
      expl.forEach(function(l, i) {
        txt(ctx, rightX + 14, leftY + 46 + i * 22, l, { sz: 10, c: P.dim, a: "left", m: false });
      });
    } else if (phase === 1) {
      txt(ctx, rightX + rightW/2, leftY + 20, "TYPE CHANGES FREELY", { sz: 10, c: P.pink, w: "700" });
      var expl2 = [
        "x can become ANY type:",
        "",
        "  int  -> str",
        "  str  -> list",
        "  list -> dict",
        "",
        "No compiler stops you.",
        "Runtime errors possible."
      ];
      expl2.forEach(function(l, i) {
        txt(ctx, rightX + 14, leftY + 46 + i * 22, l, { sz: 10, c: P.dim, a: "left", m: false });
      });
    } else if (phase === 2) {
      txt(ctx, rightX + rightW/2, leftY + 20, "INDENTATION = SYNTAX", { sz: 10, c: P.cyan, w: "700" });
      var code = "if age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Minor\")";
      typewriter(ctx, rightX + 14, leftY + 46, code, t - 10.5, { speed: 25, colors: [P.text, P.cyan, P.text, P.cyan] });
    } else {
      txt(ctx, rightX + rightW/2, leftY + 20, "LIST COMPREHENSIONS", { sz: 10, c: P.pink, w: "700" });
      var code2 = "squares = [x**2\n  for x in range(5)]\n# [0, 1, 4, 9, 16]";
      typewriter(ctx, rightX + 14, leftY + 46, code2, t - 14, { speed: 20, colors: [P.pink, P.cyan, P.green] });
    }

    txt(ctx, w/2, h - 18, "Python = readable, flexible, dynamic", { sz: 9, c: P.faint, m: false });
  }

  // ── JavaScript: Event Loop ──
  function vizJavaScript(ctx, w, h, t) {
    var phase = cyc(t, 2.5, 3);
    txt(ctx, w/2, 18, "JavaScript: Event Loop & Single Thread", { sz: 11, c: P.cyan, w: "700" });

    var cx = w / 2, cy = h / 2;

    // Call Stack
    box(ctx, 30, 50, w * 0.25, h - 90, { r: 10, stroke: P.blue });
    txt(ctx, 30 + w * 0.125, 66, "CALL STACK", { sz: 9, c: P.blue, w: "700" });
    var stackItems = phase === 0 ? ["main()", "fetchData()"] : phase === 1 ? ["main()"] : ["main()", "callback()"];
    stackItems.forEach(function(item, i) {
      box(ctx, 40, h - 50 - (i + 1) * 36, w * 0.25 - 20, 30, {
        fill: i === stackItems.length - 1 ? P.panel2 : P.panel,
        stroke: i === stackItems.length - 1 ? P.cyan : P.border,
        glow: i === stackItems.length - 1 ? P.cyan : null
      });
      txt(ctx, 30 + w * 0.125, h - 50 - (i + 1) * 36 + 15, item, { sz: 10, c: i === stackItems.length - 1 ? P.cyan : P.dim });
    });

    // Web APIs / Async area
    var asyncX = 30 + w * 0.25 + 15;
    var asyncW = w * 0.2;
    box(ctx, asyncX, 50, asyncW, h - 90, { r: 10, stroke: P.orange });
    txt(ctx, asyncX + asyncW/2, 66, "WEB APIs", { sz: 9, c: P.orange, w: "700" });
    if (phase >= 1) {
      box(ctx, asyncX + 10, 90, asyncW - 20, 40, { stroke: P.orange });
      txt(ctx, asyncX + asyncW/2, 110, "fetch()...", { sz: 10, c: P.orange });
    }
    if (phase === 2) {
      box(ctx, asyncX + 10, 140, asyncW - 20, 40, { stroke: P.green });
      txt(ctx, asyncX + asyncW/2, 160, "setTimeout", { sz: 10, c: P.green });
    }

    // Event Loop (circle)
    var loopX = asyncX + asyncW + 15;
    var loopR = 35;
    var loopCY = cy;
    ctx.beginPath();
    ctx.arc(loopX, loopCY, loopR, 0, Math.PI * 2);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 3;
    ctx.save();
    ctx.shadowColor = P.cyan;
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.restore();

    // Spinning indicator
    var angle = t * 2;
    var dotX = loopX + Math.cos(angle) * loopR;
    var dotY = loopCY + Math.sin(angle) * loopR;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = P.cyan;
    ctx.fill();
    txt(ctx, loopX, loopCY, "LOOP", { sz: 9, c: P.cyan, w: "700" });

    // Callback Queue
    var qX = loopX + loopR + 15;
    var qW = w - qX - 30;
    box(ctx, qX, 50, qW, h - 90, { r: 10, stroke: P.green });
    txt(ctx, qX + qW/2, 66, "CALLBACK QUEUE", { sz: 9, c: P.green, w: "700" });
    if (phase === 2) {
      box(ctx, qX + 10, 90, qW - 20, 36, { stroke: P.green });
      txt(ctx, qX + qW/2, 108, "callback()", { sz: 10, c: P.green });
    }

    // Labels
    var labels = [
      "JS is SINGLE-THREADED — only one thing runs at a time",
      "Async work (fetch, setTimeout) happens in Web APIs",
      "Event Loop moves finished callbacks to the stack"
    ];
    txt(ctx, w/2, h - 20, labels[phase], { sz: 9, c: P.dim, m: false });
  }

  // ── TypeScript: Type Checking Process ──
  function vizTypeScript(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "TypeScript: Types Check, Then Erase", { sz: 11, c: P.cyan, w: "700" });

    var stageW = (w - 80) / 3;
    var stages = [
      { title: "TypeScript Code", color: P.cyan, code: "let age: number = 25;\nlet name: string = \"Jay\";\nage = name; // ERROR!" },
      { title: "Type Checker", color: P.orange, code: "" },
      { title: "JavaScript Output", color: P.green, code: "let age = 25;\nlet name = \"Jay\";\n// error removed!" }
    ];

    stages.forEach(function(s, i) {
      var x = 30 + i * (stageW + 10);
      var on = phase === i;
      box(ctx, x, 50, stageW, h - 90, { r: 10, stroke: on ? s.color : P.border, glow: on ? s.color : null });
      txt(ctx, x + stageW/2, 66, s.title, { sz: 10, c: on ? s.color : P.dim, w: "700" });

      if (i === 0) {
        typewriter(ctx, x + 14, 90, stages[0].code, t * 15, { speed: 40, colors: [P.text, P.text, P.rose] });
      } else if (i === 2) {
        if (phase >= 2) {
          typewriter(ctx, x + 14, 90, stages[2].code, t * 12, { speed: 35, colors: [P.text, P.text, P.faint] });
        }
      }

      if (i < 2) {
        arrow(ctx, x + stageW + 2, h/2, x + stageW + 8, h/2, { c: P.faint });
      }
    });

    // Phase 1: type checking animation
    if (phase === 1) {
      var checkX = 30 + stageW + 10;
      var items = [
        { text: "age : number", ok: true },
        { text: "name : string", ok: true },
        { text: "age = name", ok: false }
      ];
      items.forEach(function(item, i) {
        var y = 90 + i * 30;
        var animProgress = Math.max(0, Math.min(1, (t % 3) * 2 - i * 0.5));
        if (animProgress > 0) {
          txt(ctx, checkX + stageW/2, y, item.text, { sz: 10, c: item.ok ? P.green : P.rose });
          var icon = item.ok ? "  OK" : "  ERROR";
          txt(ctx, checkX + stageW/2, y + 14, icon, { sz: 9, c: item.ok ? P.green : P.rose });
        }
      });
    }

    // Explanation
    var expl = [
      "TypeScript adds TYPES that JavaScript doesn't have",
      "The type checker runs at COMPILE TIME to find bugs",
      "After checking, ALL types are REMOVED — pure JavaScript runs"
    ];
    txt(ctx, w/2, h - 20, expl[phase], { sz: 9, c: P.dim, m: false });
  }

  // ── Rust: Ownership System ──
  function vizRust(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 4);
    txt(ctx, w/2, 18, "Rust: Ownership & Borrowing Rules", { sz: 11, c: P.cyan, w: "700" });

    var cx = w/2, cy = h/2;

    if (phase === 0) {
      // One owner per value
      txt(ctx, cx, 48, "RULE 1: Each value has ONE owner", { sz: 10, c: P.cyan, w: "700" });
      box(ctx, cx - 100, 70, 200, 50, { stroke: P.cyan, glow: P.cyan });
      txt(ctx, cx, 95, "let s1 = String::from(\"hi\")", { sz: 10, c: P.text });

      arrow(ctx, cx, 125, cx, 160, { c: P.cyan });

      box(ctx, cx - 100, 165, 200, 40, { stroke: P.cyan });
      txt(ctx, cx, 185, "s1  -->  heap: \"hi\"", { sz: 10, c: P.cyan });

      // Move
      arrow(ctx, cx + 110, 95, cx + 110, 165, { c: P.orange });
      txt(ctx, cx + 130, 130, "MOVE", { sz: 10, c: P.orange, w: "700" });

      box(ctx, cx - 100, 220, 200, 40, { stroke: P.border });
      txt(ctx, cx, 240, "let s2 = s1;  // s1 moved!", { sz: 10, c: P.rose });

      txt(ctx, cx, h - 20, "s1 is NO LONGER valid after move", { sz: 9, c: P.rose, m: false });
    } else if (phase === 1) {
      // Shared borrow
      txt(ctx, cx, 48, "RULE 2: Multiple SHARED borrows (&T)", { sz: 10, c: P.green, w: "700" });
      box(ctx, cx - 80, 70, 160, 40, { stroke: P.green });
      txt(ctx, cx, 90, "let s = String::from(\"hi\")", { sz: 9, c: P.text });

      ["&s1", "&s2", "&s3"].forEach(function(b, i) {
        var bx = cx - 120 + i * 100;
        box(ctx, bx, 140, 80, 34, { stroke: P.green, glow: cyc(t, 0.8, 3) === i ? P.green : null });
        txt(ctx, bx + 40, 157, b, { sz: 10, c: P.green });
        arrow(ctx, bx + 40, 138, cx, 112, { c: P.green, hd: 4, lw: 1.5 });
      });

      txt(ctx, cx, 210, "ALL can read at the same time", { sz: 10, c: P.dim });
      txt(ctx, cx, h - 20, "Shared borrows = READ-ONLY access, multiple OK", { sz: 9, c: P.green, m: false });
    } else if (phase === 2) {
      // Mutable borrow
      txt(ctx, cx, 48, "RULE 3: ONE mutable borrow (&mut T)", { sz: 10, c: P.orange, w: "700" });
      box(ctx, cx - 80, 70, 160, 40, { stroke: P.orange });
      txt(ctx, cx, 90, "let s = String::from(\"hi\")", { sz: 9, c: P.text });

      box(ctx, cx - 60, 140, 120, 34, { stroke: P.orange, glow: P.orange });
      txt(ctx, cx, 157, "&mut s", { sz: 10, c: P.orange });
      arrow(ctx, cx, 138, cx, 112, { c: P.orange, hd: 4, lw: 2 });

      // X mark for second borrow
      box(ctx, cx + 80, 140, 100, 34, { stroke: P.rose });
      txt(ctx, cx + 130, 157, "&s  X", { sz: 10, c: P.rose });

      txt(ctx, cx, 200, "Only ONE writer allowed", { sz: 10, c: P.dim });
      txt(ctx, cx, 220, "Prevents DATA RACES at compile time!", { sz: 10, c: P.cyan });

      txt(ctx, cx, h - 20, "Mutable borrow = WRITE access, exclusive", { sz: 9, c: P.orange, m: false });
    } else {
      // No null - Option<T>
      txt(ctx, cx, 48, "RULE 4: No null — use Option<T>", { sz: 10, c: P.pink, w: "700" });

      box(ctx, cx - 140, 70, 130, 70, { stroke: P.pink });
      txt(ctx, cx - 75, 90, "Some(42)", { sz: 11, c: P.pink, w: "700" });
      txt(ctx, cx - 75, 112, "has a value", { sz: 9, c: P.dim });

      box(ctx, cx + 10, 70, 130, 70, { stroke: P.faint });
      txt(ctx, cx + 75, 90, "None", { sz: 11, c: P.faint, w: "700" });
      txt(ctx, cx + 75, 112, "explicitly empty", { sz: 9, c: P.dim });

      arrow(ctx, cx - 75, 150, cx - 75, 185, { c: P.pink });
      box(ctx, cx - 120, 190, 90, 40, { stroke: P.green });
      txt(ctx, cx - 75, 210, "match!", { sz: 10, c: P.green });

      arrow(ctx, cx + 75, 150, cx + 75, 185, { c: P.faint });
      box(ctx, cx + 30, 190, 90, 40, { stroke: P.rose });
      txt(ctx, cx + 75, 210, "handle it", { sz: 10, c: P.rose });

      txt(ctx, cx, h - 20, "No null pointer exceptions — EVER", { sz: 9, c: P.cyan, m: false });
    }
  }

  // ── Java: JVM & Object Model ──
  function vizJava(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "Java: Write Once, Run Anywhere (JVM)", { sz: 11, c: P.cyan, w: "700" });

    var cx = w/2;

    if (phase === 0) {
      // Source to bytecode
      txt(ctx, cx, 48, "COMPILATION", { sz: 10, c: P.cyan, w: "700" });

      box(ctx, 30, 70, w * 0.28, h - 110, { r: 10, stroke: P.orange });
      txt(ctx, 30 + w * 0.14, 88, "MyClass.java", { sz: 10, c: P.orange });
      var code = "public class MyClass {\n  public static void\n  main(String[] args) {\n    System.out.println(\n      \"Hello Java!\");\n  }\n}";
      typewriter(ctx, 42, 110, code, t * 20, { speed: 50 });

      arrow(ctx, 30 + w * 0.28 + 5, h/2, 30 + w * 0.28 + w * 0.12, h/2, { c: P.cyan });
      txt(ctx, 30 + w * 0.28 + w * 0.06, h/2 - 16, "javac", { sz: 10, c: P.cyan, w: "700" });

      box(ctx, 30 + w * 0.28 + w * 0.14, 70, w * 0.28, h - 110, { r: 10, stroke: P.cyan });
      txt(ctx, 30 + w * 0.28 + w * 0.28, 88, "MyClass.class", { sz: 10, c: P.cyan });
      txt(ctx, 30 + w * 0.28 + w * 0.28, 120, "BYTECODE:", { sz: 9, c: P.dim });
      var bytecode = "0: getstatic  System.out\n3: ldc \"Hello Java!\"\n5: invokevirtual println\n8: return";
      typewriter(ctx, 30 + w * 0.28 + w * 0.15 + 12, 140, bytecode, t * 25, { speed: 60 });

      // JVM
      arrow(ctx, 30 + w * 0.28 + w * 0.42 + 5, h/2, w - 60 - w * 0.35, h/2, { c: P.pink });
      box(ctx, w - 30 - w * 0.35, 70, w * 0.35, h - 110, { r: 10, stroke: P.pink });
      txt(ctx, w - 30 - w * 0.175, 88, "JVM", { sz: 12, c: P.pink, w: "800" });
      txt(ctx, w - 30 - w * 0.175, 110, "Runs on:", { sz: 9, c: P.dim });
      ["Windows", "macOS", "Linux", "Any OS"].forEach(function(os, i) {
        box(ctx, w - 30 - w * 0.35 + 10, 130 + i * 30, w * 0.35 - 20, 24, { r: 4, stroke: P.border });
        txt(ctx, w - 30 - w * 0.175, 142 + i * 30, os, { sz: 9, c: P.dim });
      });
    } else if (phase === 1) {
      // Object model
      txt(ctx, cx, 48, "OBJECT MODEL: Everything is an Object", { sz: 10, c: P.cyan, w: "700" });

      // Class
      box(ctx, cx - 100, 70, 200, 50, { stroke: P.cyan });
      txt(ctx, cx, 85, "class Car", { sz: 11, c: P.cyan, w: "700" });
      txt(ctx, cx, 105, "- brand: String", { sz: 9, c: P.dim });

      // Objects
      [["myCar", "Toyota", -110], ["yourCar", "Honda", 110]].forEach(function(o) {
        arrow(ctx, cx + (o[2] < 0 ? -30 : 30), 122, cx + o[2], 160, { c: P.cyan });
        box(ctx, cx + o[2] - 55, 162, 110, 40, { stroke: P.cyan });
        txt(ctx, cx + o[2], 175, o[0], { sz: 9, c: P.cyan });
        txt(ctx, cx + o[2], 192, o[1], { sz: 9, c: P.text });
      });

      // Garbage collector
      txt(ctx, cx, 240, "GARBAGE COLLECTOR automatically frees memory", { sz: 10, c: P.green });
      box(ctx, cx - 140, 260, 280, 40, { stroke: P.green });
      txt(ctx, cx, 280, "No malloc/free — GC handles it!", { sz: 10, c: P.green });
    } else {
      // Collections
      txt(ctx, cx, 48, "COLLECTIONS FRAMEWORK", { sz: 10, c: P.cyan, w: "700" });

      var collections = [
        { name: "ArrayList", desc: "Dynamic array", color: P.cyan },
        { name: "HashMap", desc: "Key-value pairs", color: P.pink },
        { name: "LinkedList", desc: "Doubly-linked list", color: P.green },
        { name: "HashSet", desc: "Unique elements", color: P.amber }
      ];

      collections.forEach(function(c, i) {
        var bx = 30 + (i % 2) * (w/2);
        var by = 70 + Math.floor(i/2) * 100;
        box(ctx, bx, by, w/2 - 40, 80, { stroke: c.color });
        txt(ctx, bx + (w/2 - 40)/2, by + 20, c.name, { sz: 12, c: c.color, w: "700" });
        txt(ctx, bx + (w/2 - 40)/2, by + 44, c.desc, { sz: 10, c: P.dim });
        txt(ctx, bx + (w/2 - 40)/2, by + 64, "java.util." + c.name.toLowerCase(), { sz: 8, c: P.faint });
      });
    }

    txt(ctx, cx, h - 20, ["Bytecode compiles once, JVM runs everywhere", "Classes → Objects → GC manages memory", "Rich Collections API for data structures"][phase], { sz: 9, c: P.dim, m: false });
  }

  // ── Go: Goroutines & Channels ──
  function vizGo(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "Go: Goroutines & Channels", { sz: 11, c: P.cyan, w: "700" });

    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "GOROUTINES: Lightweight Threads", { sz: 10, c: P.cyan, w: "700" });

      // OS Thread vs Goroutine comparison
      var threadY = 80;
      box(ctx, 30, threadY, w - 60, 44, { stroke: P.rose });
      txt(ctx, 30 + 80, threadY + 22, "OS Thread", { sz: 10, c: P.rose, w: "700" });
      txt(ctx, w/2, threadY + 22, "1 MB stack   |   ~1000 max", { sz: 10, c: P.dim });

      var goY = 134;
      box(ctx, 30, goY, w - 60, 44, { stroke: P.cyan, glow: P.cyan });
      txt(ctx, 30 + 80, goY + 22, "Goroutine", { sz: 10, c: P.cyan, w: "700" });
      txt(ctx, w/2, goY + 22, "2 KB stack   |   millions at once!", { sz: 10, c: P.cyan });

      // Animated goroutines
      var numGo = 12;
      for (var i = 0; i < numGo; i++) {
        var gx = 50 + (i % 6) * ((w - 100) / 6);
        var gy = 200 + Math.floor(i / 6) * 50;
        var active = cyc(t, 0.4, numGo) === i;
        box(ctx, gx, gy, 50, 34, { r: 6, stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
        txt(ctx, gx + 25, gy + 17, "G" + i, { sz: 9, c: active ? P.cyan : P.dim });
      }

      txt(ctx, cx, h - 20, "Goroutines start with just 2KB — scale to millions", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      // Channels
      txt(ctx, cx, 48, "CHANNELS: Safe Communication Between Goroutines", { sz: 10, c: P.cyan, w: "700" });

      // Sender
      box(ctx, 30, 90, w * 0.25, h - 150, { r: 10, stroke: P.orange });
      txt(ctx, 30 + w * 0.125, 108, "SENDER", { sz: 10, c: P.orange, w: "700" });
      txt(ctx, 30 + w * 0.125, 130, "ch <- data", { sz: 11, c: P.orange });

      // Channel (pipe)
      var chX = 30 + w * 0.25 + 20;
      var chW = w * 0.35;
      box(ctx, chX, 90, chW, h - 150, { r: 10, stroke: P.cyan, glow: P.cyan });
      txt(ctx, chX + chW/2, 108, "CHANNEL", { sz: 10, c: P.cyan, w: "700" });

      // Animated data in channel
      for (var j = 0; j < 4; j++) {
        var dataPhase = ((t * 0.8 + j * 0.25) % 1);
        var dx = chX + 20 + dataPhase * (chW - 40);
        ctx.beginPath();
        ctx.arc(dx, h/2, 6, 0, Math.PI * 2);
        ctx.fillStyle = P.cyan;
        ctx.save();
        ctx.globalAlpha = 0.3 + 0.7 * (1 - dataPhase);
        ctx.fill();
        ctx.restore();
        txt(ctx, dx, h/2 - 14, j, { sz: 8, c: P.cyan });
      }

      // Receiver
      box(ctx, w - 30 - w * 0.25, 90, w * 0.25, h - 150, { r: 10, stroke: P.green });
      txt(ctx, w - 30 - w * 0.125, 108, "RECEIVER", { sz: 10, c: P.green, w: "700" });
      txt(ctx, w - 30 - w * 0.125, 130, "data := <-ch", { sz: 11, c: P.green });

      txt(ctx, cx, h - 20, "Channels SEND and RECEIVE data safely between goroutines", { sz: 9, c: P.dim, m: false });
    } else {
      // Error handling
      txt(ctx, cx, 48, "ERROR HANDLING: explicit, no exceptions", { sz: 10, c: P.cyan, w: "700" });

      var code = 'result, err := divide(10, 0)\nif err != nil {\n    log.Fatal(err)\n}\nfmt.Println(result)';
      typewriter(ctx, 60, 80, code, t * 18, { speed: 40, colors: [P.text, P.rose, P.text, P.cyan] });

      // Show the pattern
      box(ctx, 30, 210, w - 60, 60, { stroke: P.cyan });
      var patterns = [
        { x: 80, label: "function", color: P.cyan },
        { x: w/2 - 30, label: "error check", color: P.orange },
        { x: w - 130, label: "use result", color: P.green }
      ];
      patterns.forEach(function(p, i) {
        if (i < 2) arrow(ctx, p.x + 40, 240, p.x + 70, 240, { c: P.faint, hd: 4 });
        txt(ctx, p.x, 240, p.label, { sz: 10, c: p.color });
      });

      txt(ctx, cx, h - 20, "No try/catch — every error is handled explicitly", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── C++: RAII & Memory Safety ──
  function vizCpp(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "C++: RAII & Smart Pointers", { sz: 11, c: P.cyan, w: "700" });

    var cx = w/2;

    if (phase === 0) {
      // RAII
      txt(ctx, cx, 48, "RAII: Resource Acquisition Is Initialization", { sz: 10, c: P.cyan, w: "700" });

      var steps = [
        { label: "Create Object", desc: "Constructor acquires resource", color: P.green },
        { label: "Use Object", desc: "Normal operations", color: P.cyan },
        { label: "Destroy Object", desc: "Destructor releases resource", color: P.rose }
      ];

      steps.forEach(function(s, i) {
        var sx = 30 + i * ((w - 60) / 3);
        var sw = (w - 60) / 3 - 10;
        var active = cyc(t, 1.5, 3) === i;
        box(ctx, sx, 70, sw, 90, { stroke: active ? s.color : P.border, glow: active ? s.color : null });
        txt(ctx, sx + sw/2, 90, s.label, { sz: 10, c: active ? s.color : P.dim, w: "700" });
        txt(ctx, sx + sw/2, 115, s.desc, { sz: 9, c: P.dim });
        if (i < 2) arrow(ctx, sx + sw + 2, 115, sx + sw + 8, 115, { c: P.faint });
      });

      // Smart pointers
      var spY = 180;
      txt(ctx, cx, spY, "SMART POINTERS: Automatic Memory Management", { sz: 10, c: P.orange, w: "700" });

      var ptrs = [
        { name: "unique_ptr", desc: "One owner, auto-delete", color: P.cyan },
        { name: "shared_ptr", desc: "Multiple owners, ref count", color: P.green },
        { name: "weak_ptr", desc: "Non-owning reference", color: P.faint }
      ];

      ptrs.forEach(function(p, i) {
        var px = 30 + i * ((w - 60) / 3);
        var pw = (w - 60) / 3 - 10;
        box(ctx, px, spY + 20, pw, 70, { stroke: p.color });
        txt(ctx, px + pw/2, spY + 40, p.name, { sz: 10, c: p.color, w: "700" });
        txt(ctx, px + pw/2, spY + 62, p.desc, { sz: 9, c: P.dim });
        txt(ctx, px + pw/2, spY + 78, "auto p = make_...", { sz: 8, c: P.faint });
      });

      txt(ctx, cx, h - 20, "RAII = no memory leaks. Smart pointers = no manual delete", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      // STL Containers
      txt(ctx, cx, 48, "STL: Standard Template Library", { sz: 10, c: P.cyan, w: "700" });

      var containers = [
        { name: "vector", desc: "Dynamic array", visual: "[ 1 | 2 | 3 | 4 | 5 ]", color: P.cyan },
        { name: "map", desc: "Key-value pairs", visual: "{ a:1, b:2, c:3 }", color: P.pink },
        { name: "set", desc: "Unique sorted", visual: "{ 1, 2, 3, 4, 5 }", color: P.green }
      ];

      containers.forEach(function(c, i) {
        var cy = 70 + i * 80;
        box(ctx, 30, cy, w - 60, 65, { stroke: c.color });
        txt(ctx, 100, cy + 20, c.name, { sz: 12, c: c.color, w: "700", a: "left" });
        txt(ctx, 100, cy + 42, c.desc, { sz: 10, c: P.dim, a: "left" });
        txt(ctx, w - 50, cy + 30, c.visual, { sz: 10, c: P.text, a: "right" });
      });

      txt(ctx, cx, h - 20, "Templates = write once, work with ANY type", { sz: 9, c: P.dim, m: false });
    } else {
      // Templates
      txt(ctx, cx, 48, "TEMPLATES: Generic Type-Safe Code", { sz: 10, c: P.cyan, w: "700" });

      var code = 'template <typename T>\nT maximum(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nmaximum<int>(3, 7);    // 7\nmaximum<double>(3.14, 2.7); // 3.14';
      typewriter(ctx, 60, 80, code, t * 20, { speed: 50, colors: [P.cyan, P.text, P.text, P.text, P.text, P.green, P.pink] });

      txt(ctx, cx, h - 20, "One function works for int, double, string, and any type", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── SQL: Query Execution ──
  function vizSQL(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "SQL: Declarative Query Language", { sz: 11, c: P.cyan, w: "700" });

    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "SELECT: Ask for WHAT you want", { sz: 10, c: P.cyan, w: "700" });

      // Table
      var tblX = 30, tblY = 70;
      var cols = ["id", "name", "age"];
      var rows = [["1", "Jay", "20"], ["2", "Sam", "22"], ["3", "Mia", "19"]];
      var cw = 80;
      cols.forEach(function(c, i) {
        box(ctx, tblX + i * cw, tblY, cw, 28, { fill: P.panel2, stroke: P.cyan });
        txt(ctx, tblX + i * cw + cw/2, tblY + 14, c, { sz: 10, c: P.cyan, w: "700" });
      });
      rows.forEach(function(r, ri) {
        r.forEach(function(v, ci) {
          var ry = tblY + 28 + ri * 28;
          var highlight = ri === cyc(t, 1.2, rows.length);
          box(ctx, tblX + ci * cw, ry, cw, 28, { stroke: highlight ? P.amber : P.border });
          txt(ctx, tblX + ci * cw + cw/2, ry + 14, v, { sz: 10, c: highlight ? P.amber : P.dim });
        });
      });

      // Query
      var qX = tblX + cols.length * cw + 30;
      var qW = w - qX - 30;
      box(ctx, qX, tblY, qW, 120, { stroke: P.green });
      txt(ctx, qX + qW/2, tblY + 16, "QUERY", { sz: 9, c: P.green, w: "700" });
      var query = "SELECT name\nFROM users\nWHERE age > 18";
      typewriter(ctx, qX + 14, tblY + 38, query, t * 15, { speed: 30, colors: [P.cyan, P.orange, P.amber] });

      // Result
      txt(ctx, cx, tblY + 170, "RESULT:", { sz: 10, c: P.green, w: "700" });
      var resultRows = rows.filter(function(r) { return parseInt(r[2]) > 18; });
      resultRows.forEach(function(r, i) {
        box(ctx, cx - 80, tblY + 190 + i * 28, 160, 24, { stroke: P.green });
        txt(ctx, cx, tblY + 202 + i * 28, r[1] + "  (age " + r[2] + ")", { sz: 10, c: P.green });
      });

      txt(ctx, cx, h - 20, "You say WHAT you want — the database figures out HOW", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      // JOIN
      txt(ctx, cx, 48, "JOIN: Combine Tables", { sz: 10, c: P.cyan, w: "700" });

      // Users table
      box(ctx, 30, 70, 160, 30, { fill: P.panel2, stroke: P.cyan });
      txt(ctx, 110, 85, "USERS", { sz: 10, c: P.cyan, w: "700" });
      [["1", "Jay"], ["2", "Sam"]].forEach(function(r, i) {
        box(ctx, 30, 100 + i * 28, 160, 26, { stroke: cyc(t, 1, 2) === i ? P.cyan : P.border });
        txt(ctx, 110, 113 + i * 28, r[0] + "  " + r[1], { sz: 10, c: cyc(t, 1, 2) === i ? P.cyan : P.dim });
      });

      // Orders table
      box(ctx, w - 190, 70, 160, 30, { fill: P.panel2, stroke: P.pink });
      txt(ctx, w - 110, 85, "ORDERS", { sz: 10, c: P.pink, w: "700" });
      [["1", "1", "$50"], ["2", "2", "$30"], ["3", "1", "$20"]].forEach(function(r, i) {
        box(ctx, w - 190, 100 + i * 28, 160, 26, { stroke: cyc(t, 1, 3) === i ? P.pink : P.border });
        txt(ctx, w - 110, 113 + i * 28, "order#" + r[0] + " user:" + r[1] + " " + r[2], { sz: 9, c: cyc(t, 1, 3) === i ? P.pink : P.dim });
      });

      // JOIN result
      txt(ctx, cx, 210, "INNER JOIN result:", { sz: 10, c: P.green, w: "700" });
      var jResult = [["Jay", "$50"], ["Jay", "$20"], ["Sam", "$30"]];
      jResult.forEach(function(r, i) {
        box(ctx, cx - 100, 230 + i * 28, 200, 24, { stroke: P.green });
        txt(ctx, cx, 242 + i * 28, r[0] + "  " + r[1], { sz: 10, c: P.green });
      });

      txt(ctx, cx, h - 20, "JOIN matches rows from different tables by related columns", { sz: 9, c: P.dim, m: false });
    } else {
      // SQL Injection warning
      txt(ctx, cx, 48, "SQL INJECTION: The #1 Security Risk", { sz: 10, c: P.rose, w: "700" });

      // Bad query
      box(ctx, 30, 70, w/2 - 40, 120, { stroke: P.rose });
      txt(ctx, 30 + (w/2 - 40)/2, 88, "DANGEROUS", { sz: 10, c: P.rose, w: "700" });
      var badCode = 'query = "SELECT * FROM\n  users WHERE name = \'\n  " + userInput + "\'"';
      typewriter(ctx, 44, 110, badCode, t * 20, { speed: 40, colors: [P.rose, P.rose, P.rose] });

      // Good query
      box(ctx, w/2 + 10, 70, w/2 - 40, 120, { stroke: P.green });
      txt(ctx, w/2 + 10 + (w/2 - 40)/2, 88, "SAFE", { sz: 10, c: P.green, w: "700" });
      var goodCode = 'query = "SELECT * FROM\n  users WHERE name = ?"\nparams = [userInput]';
      typewriter(ctx, w/2 + 24, 110, goodCode, t * 15, { speed: 40, colors: [P.green, P.green, P.cyan] });

      txt(ctx, cx, 220, "NEVER concatenate user input into SQL!", { sz: 11, c: P.rose, w: "700" });
      txt(ctx, cx, 245, "Always use parameterized queries (prepared statements)", { sz: 10, c: P.green });

      txt(ctx, cx, h - 20, "SQL injection can destroy your entire database", { sz: 9, c: P.rose, m: false });
    }
  }

  // ── C#: LINQ & Properties ──
  function vizCSharp(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "C#: LINQ, Properties & Async/Await", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "LINQ: Query Collections Like SQL", { sz: 10, c: P.cyan, w: "700" });
      var code = 'var adults = users\n  .Where(u => u.Age >= 18)\n  .OrderBy(u => u.Name)\n  .Select(u => u.Name);';
      typewriter(ctx, 60, 80, code, t * 15, { speed: 40, colors: [P.text, P.cyan, P.pink, P.green] });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "PROPERTIES: Controlled Access", { sz: 10, c: P.cyan, w: "700" });
      var code2 = 'public class Person {\n  public string Name { get; set; }\n  public int Age { get; init; }\n}';
      typewriter(ctx, 60, 80, code2, t * 15, { speed: 40, colors: [P.text, P.cyan, P.green, P.pink] });
    } else {
      txt(ctx, cx, 48, "ASYNC/AWAIT: Non-Blocking Operations", { sz: 10, c: P.cyan, w: "700" });
      var code3 = 'var data = await\n  client.GetStringAsync(url);\nConsole.WriteLine(data);';
      typewriter(ctx, 60, 80, code3, t * 15, { speed: 40, colors: [P.text, P.cyan, P.green] });
    }

    txt(ctx, cx, h - 20, ["LINQ makes data queries readable and type-safe", "Properties combine fields + methods elegantly", "Async code reads like synchronous code"][phase], { sz: 9, c: P.dim, m: false });
  }

  // ── Kotlin: Null Safety ──
  function vizKotlin(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 3);
    txt(ctx, w/2, 18, "Kotlin: Null Safety & Coroutines", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "NULL SAFETY: No More NullPointer exceptions", { sz: 10, c: P.cyan, w: "700" });

      // Nullable vs non-nullable
      box(ctx, 30, 80, w/2 - 40, 100, { stroke: P.green });
      txt(ctx, 30 + (w/2 - 40)/2, 98, "String (non-null)", { sz: 10, c: P.green, w: "700" });
      txt(ctx, 30 + (w/2 - 40)/2, 120, 'name = "Jay"', { sz: 11, c: P.text });
      txt(ctx, 30 + (w/2 - 40)/2, 145, "name = null  // COMPILE ERROR", { sz: 9, c: P.rose });

      box(ctx, w/2 + 10, 80, w/2 - 40, 100, { stroke: P.orange });
      txt(ctx, w/2 + 10 + (w/2 - 40)/2, 98, "String? (nullable)", { sz: 10, c: P.orange, w: "700" });
      txt(ctx, w/2 + 10 + (w/2 - 40)/2, 120, 'maybe = null', { sz: 11, c: P.text });
      txt(ctx, w/2 + 10 + (w/2 - 40)/2, 145, "maybe?.length  // safe call", { sz: 9, c: P.orange });

      txt(ctx, cx, h - 20, "The compiler FORCES you to handle null — no crashes", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "DATA CLASSES: Auto-generated Boilerplate", { sz: 10, c: P.cyan, w: "700" });
      var code = 'data class User(\n  val name: String,\n  val age: Int\n)\n\nval u = User("Jay", 20)\n// auto: equals, toString,\n// hashCode, copy, destructuring';
      typewriter(ctx, 60, 80, code, t * 12, { speed: 40, colors: [P.cyan, P.text, P.text, P.text, P.text, P.green, P.green] });
    } else {
      txt(ctx, cx, 48, "COROUTINES: Async Without Callbacks", { sz: 10, c: P.cyan, w: "700" });
      var code2 = 'suspend fun fetch(): User {\n  delay(1000) // non-blocking\n  return api.getUser()\n}\n\nval user = fetch() // async!';
      typewriter(ctx, 60, 80, code2, t * 12, { speed: 40, colors: [P.cyan, P.pink, P.text, P.text, P.text, P.green] });
    }

    txt(ctx, cx, h - 20, ["Null safety eliminates the #1 crash cause", "One line replaces 50 lines of boilerplate", "Reads like sync, works like async"][phase], { sz: 9, c: P.dim, m: false });
  }

  // ── Swift: Optionals & ARC ──
  function vizSwift(ctx, w, h, t) {
    var phase = cyc(t, 3, 3);
    txt(ctx, w/2, 18, "Swift: Optionals & Memory Safety", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "OPTIONALS: Safe Nil Handling", { sz: 10, c: P.cyan, w: "700" });
      var code = 'var name: String? = nil\n\nif let n = name {\n  print(n)\n} else {\n  print("No name")\n}\n\nlet safe = name ?? "Default"';
      typewriter(ctx, 60, 80, code, t * 15, { speed: 40, colors: [P.orange, P.text, P.green, P.text, P.rose, P.text, P.cyan] });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "ARC: Automatic Reference Counting", { sz: 10, c: P.cyan, w: "700" });
      // Visual showing ARC
      box(ctx, cx - 80, 80, 160, 50, { stroke: P.cyan });
      txt(ctx, cx, 105, "class Car", { sz: 12, c: P.cyan, w: "700" });

      var refs = ["var a = Car()", "var b = a", "var c = a"];
      refs.forEach(function(r, i) {
        var ry = 150 + i * 40;
        box(ctx, 30, ry, w - 60, 32, { stroke: P.green });
        txt(ctx, cx, ry + 16, r + "  // refcount: " + (3 - i), { sz: 10, c: P.text });
      });

      box(ctx, 30, 280, w - 60, 40, { stroke: P.rose });
      txt(ctx, cx, 300, "c = nil  // refcount drops to 2", { sz: 10, c: P.rose });
    } else {
      txt(ctx, cx, 48, "PLAYGROUNDS: Learn By Doing", { sz: 10, c: P.cyan, w: "700" });
      var code2 = '// Try this in Xcode Playgrounds:\nlet numbers = [1, 2, 3, 4, 5]\nlet doubled = numbers.map { $0 * 2 }\nprint(doubled) // [2,4,6,8,10]';
      typewriter(ctx, 60, 80, code2, t * 15, { speed: 40, colors: [P.faint, P.cyan, P.pink, P.green] });
    }

    txt(ctx, cx, h - 20, ["Optionals handle nil safely at compile time", "ARC counts references — zero leaks, zero crashes", "Playgrounds give instant visual feedback"][phase], { sz: 9, c: P.dim, m: false });
  }

  // ── Ruby: Everything is an Object ──
  function vizRuby(ctx, w, h, t) {
    txt(ctx, w/2, 18, "Ruby: Everything is an Object", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    var objects = [
      { val: "42", methods: [".even?", ".times", ".next"], color: P.cyan },
      { val: '"hello"', methods: [".upcase", ".length", ".reverse"], color: P.pink },
      { val: "[1,2,3]", methods: [".map", ".sort", ".sum"], color: P.green },
      { val: "true", methods: [".to_s", ".!", "nil?"], color: P.amber }
    ];

    var on = cyc(t, 1.5, objects.length);
    objects.forEach(function(o, i) {
      var oy = 55 + i * 70;
      var active = i === on;
      box(ctx, 30, oy, w * 0.3, 55, { stroke: active ? o.color : P.border, glow: active ? o.color : null });
      txt(ctx, 30 + w * 0.15, oy + 18, o.val, { sz: 12, c: active ? o.color : P.text, w: "700" });
      txt(ctx, 30 + w * 0.15, oy + 38, "EVERYTHING is an object", { sz: 8, c: P.faint });

      // Methods
      o.methods.forEach(function(m, mi) {
        var mx = w * 0.35 + 50 + mi * 80;
        box(ctx, mx, oy + 8, 70, 38, { stroke: active ? o.color : P.border });
        txt(ctx, mx + 35, oy + 27, m, { sz: 10, c: active ? o.color : P.dim });
        if (mi < 2) arrow(ctx, mx + 72, oy + 27, mx + 82, oy + 27, { c: P.faint, hd: 3 });
      });
    });

    var expl = [
      "Numbers have methods: 42.even? => true",
      "Strings have methods: \"hi\".reverse => \"ih\"",
      "Arrays have methods: [1,2,3].sum => 6",
      "Booleans have methods: true.to_s => \"true\""
    ];
    txt(ctx, cx, h - 20, expl[on], { sz: 9, c: P.dim, m: false });
  }

  // ── PHP: Web Request Lifecycle ──
  function vizPHP(ctx, w, h, t) {
    txt(ctx, w/2, 18, "PHP: Web Request → Response Cycle", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    var steps = [
      { label: "Browser", desc: "sends request", color: P.blue },
      { label: "Web Server", desc: "Apache/Nginx", color: P.orange },
      { label: "PHP", desc: "processes code", color: P.purple || P.pink },
      { label: "Database", desc: "MySQL query", color: P.green },
      { label: "Response", desc: "HTML back", color: P.cyan }
    ];

    var active = cyc(t, 1, steps.length);
    steps.forEach(function(s, i) {
      var sx = 20 + i * ((w - 40) / 5);
      var sw = (w - 40) / 5 - 8;
      var on = i === active;
      box(ctx, sx, 70, sw, 80, { stroke: on ? s.color : P.border, glow: on ? s.color : null });
      txt(ctx, sx + sw/2, 92, s.label, { sz: 10, c: on ? s.color : P.dim, w: "700" });
      txt(ctx, sx + sw/2, 118, s.desc, { sz: 9, c: P.dim });
      if (i < steps.length - 1) arrow(ctx, sx + sw + 1, 110, sx + sw + 7, 110, { c: P.faint });
    });

    // Animated request flowing through
    var reqX = 20 + active * ((w - 40) / 5);
    ctx.beginPath();
    ctx.arc(reqX + 30, 145, 5, 0, Math.PI * 2);
    ctx.fillStyle = P.cyan;
    ctx.save(); ctx.shadowColor = P.cyan; ctx.shadowBlur = 10; ctx.fill(); ctx.restore();

    txt(ctx, cx, h - 20, "Every page load = request → PHP → database → HTML → response", { sz: 9, c: P.dim, m: false });
  }

  // ── Assembly: CPU Execution ──
  function vizAssembly(ctx, w, h, t) {
    txt(ctx, w/2, 18, "Assembly: Direct CPU Instruction Control", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    // Registers
    box(ctx, 30, 50, w * 0.4, h - 90, { r: 10, stroke: P.blue });
    txt(ctx, 30 + w * 0.2, 66, "CPU REGISTERS", { sz: 9, c: P.blue, w: "700" });

    var regs = [
      { name: "RAX", value: "0000 002A", desc: "accumulator (result)" },
      { name: "RBX", value: "0000 0005", desc: "base register" },
      { name: "RCX", value: "0000 0000", desc: "counter" },
      { name: "RIP", value: "0040 1020", desc: "instruction pointer" }
    ];

    regs.forEach(function(r, i) {
      var ry = 84 + i * 50;
      var active = cyc(t, 1, regs.length) === i;
      memBox(ctx, 40, ry, w * 0.4 - 20, 40, r.name + "  " + r.desc, r.value, active ? P.cyan : P.dim, active);
    });

    // Assembly code
    var rightX = 30 + w * 0.4 + 15;
    var rightW = w - rightX - 20;
    box(ctx, rightX, 50, rightW, h - 90, { r: 10, stroke: P.cyan });
    txt(ctx, rightX + rightW/2, 66, "INSTRUCTIONS", { sz: 9, c: P.cyan, w: "700" });

    var instrs = [
      { addr: "0x1020", op: "MOV", args: "RAX, 42", desc: "load 42 into RAX" },
      { addr: "0x1024", op: "ADD", args: "RAX, RBX", desc: "add RBX to RAX" },
      { addr: "0x1028", op: "MOV", args: "[mem], RAX", desc: "store result" },
      { addr: "0x102C", op: "RET", args: "", desc: "return to caller" }
    ];

    var activeInstr = cyc(t, 0.8, instrs.length);
    instrs.forEach(function(ins, i) {
      var iy = 84 + i * 55;
      var on = i === activeInstr;
      box(ctx, rightX + 10, iy, rightW - 20, 45, { stroke: on ? P.cyan : P.border, glow: on ? P.cyan : null });
      txt(ctx, rightX + 20, iy + 12, ins.addr, { sz: 8, c: P.faint, a: "left" });
      txt(ctx, rightX + rightW - 20, iy + 12, ins.op, { sz: 11, c: on ? P.cyan : P.text, w: "700", a: "right" });
      txt(ctx, rightX + 20, iy + 32, ins.args + "  ; " + ins.desc, { sz: 8, c: P.dim, a: "left" });
    });

    // Instruction pointer arrow
    var ipY = 84 + activeInstr * 55 + 22;
    ctx.beginPath();
    ctx.moveTo(rightX + 5, ipY);
    ctx.lineTo(rightX + 12, ipY);
    ctx.strokeStyle = P.amber;
    ctx.lineWidth = 2;
    ctx.stroke();

    txt(ctx, cx, h - 20, "Each instruction = 1 CPU operation. No abstractions.", { sz: 9, c: P.dim, m: false });
  }

  // ── R: Vectorized Operations & Statistics ──
  function vizR(ctx, w, h, t) {
    var phase = cyc(t, 4, 3);
    txt(ctx, w/2, 18, "R: Vectorized Operations & Statistical Computing", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "VECTORIZED OPS: Apply to All Elements at Once", { sz: 10, c: P.cyan, w: "700" });
      // Show vector with values flowing through operation
      var vals = [1, 2, 3, 4, 5];
      var out = vals.map(function(v) { return v * 2; });
      var boxW = 50, gap = 10, startX = cx - (vals.length * (boxW + gap)) / 2;
      vals.forEach(function(v, i) {
        var bx = startX + i * (boxW + gap);
        var active = i <= cyc(t, 0.6, vals.length);
        box(ctx, bx, 80, boxW, 40, { stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
        txt(ctx, bx + boxW/2, 100, String(v), { sz: 12, c: active ? P.cyan : P.text, w: "700" });
        // Arrow down
        if (active) arrow(ctx, bx + boxW/2, 124, bx + boxW/2, 148, { c: P.green, hd: 5 });
        // Output
        box(ctx, bx, 152, boxW, 40, { stroke: active ? P.green : P.border });
        txt(ctx, bx + boxW/2, 172, String(out[i]), { sz: 12, c: active ? P.green : P.text, w: "700" });
      });
      txt(ctx, cx, 145, "× 2", { sz: 14, c: P.pink, w: "700" });
      typewriter(ctx, 50, 220, 'nums <- c(1, 2, 3, 4, 5)\nresult <- nums * 2\n# [1] 2 4 6 8 10', t * 12, { speed: 35, colors: [P.cyan, P.green, P.faint] });
      txt(ctx, cx, h - 20, "No loops needed — R applies the operation to every element", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "DATA FRAMES: Tables of Mixed Types", { sz: 10, c: P.cyan, w: "700" });
      var cols = ["name", "age", "score"];
      var rows = [["Jay", "20", "92"], ["Ana", "22", "88"], ["Sam", "19", "95"]];
      var colW = 100, startX = cx - (cols.length * colW) / 2;
      cols.forEach(function(c, i) {
        box(ctx, startX + i * colW, 78, colW - 4, 30, { fill: P.panel, stroke: P.cyan });
        txt(ctx, startX + i * colW + colW/2 - 2, 93, c, { sz: 10, c: P.cyan, w: "700" });
      });
      rows.forEach(function(row, ri) {
        var active = ri <= cyc(t, 0.8, rows.length);
        row.forEach(function(cell, ci) {
          box(ctx, startX + ci * colW, 110 + ri * 34, colW - 4, 30, { stroke: active ? P.green : P.border });
          txt(ctx, startX + ci * colW + colW/2 - 2, 125 + ri * 34, cell, { sz: 10, c: active ? P.text : P.dim });
        });
      });
      typewriter(ctx, 50, 240, 'df <- data.frame(\n  name = c("Jay","Ana"),\n  age  = c(20, 22),\n  score = c(92, 88)\n)\nsummary(df$score)', t * 10, { speed: 30, colors: [P.cyan, P.text, P.text, P.text, P.text, P.green] });
      txt(ctx, cx, h - 20, "Data frames are R's core structure — like spreadsheets in code", { sz: 9, c: P.dim, m: false });
    } else {
      txt(ctx, cx, 48, "STATISTICAL PLOTS: Built-In Visualization", { sz: 10, c: P.cyan, w: "700" });
      // Animated scatter plot
      var plotX = cx - 140, plotY = 80, plotW = 280, plotH = 180;
      box(ctx, plotX, plotY, plotW, plotH, { stroke: P.border });
      // Axes
      arrow(ctx, plotX + 5, plotY + plotH - 5, plotX + plotW - 5, plotY + plotH - 5, { c: P.faint, hd: 4 });
      arrow(ctx, plotX + 5, plotY + plotH - 5, plotX + 5, plotY + 5, { c: P.faint, hd: 4 });
      txt(ctx, plotX + plotW / 2, plotY + plotH + 16, "x values", { sz: 9, c: P.faint });
      txt(ctx, plotX - 14, plotY + plotH / 2, "y", { sz: 9, c: P.faint });
      // Points appearing one by one
      var pts = [[30,140],[60,110],[90,120],[120,80],[150,90],[180,50],[210,60],[240,30]];
      var show = Math.floor((t % 4) / 4 * pts.length);
      pts.forEach(function(p, i) {
        if (i > show) return;
        ctx.beginPath();
        ctx.arc(plotX + p[0], plotY + p[1], 4, 0, Math.PI * 2);
        ctx.fillStyle = P.cyan;
        ctx.save(); ctx.shadowColor = P.cyan; ctx.shadowBlur = 8;
        ctx.fill(); ctx.restore();
      });
      // Trend line
      if (show > 2) {
        arrow(ctx, plotX + 20, plotY + 155, plotX + plotW - 10, plotY + 20, { c: P.pink, lw: 1.5, hd: 0 });
        txt(ctx, plotX + plotW - 30, plotY + 15, "lm(y ~ x)", { sz: 9, c: P.pink });
      }
      typewriter(ctx, 50, 290, 'plot(x, y, col="blue")\nabline(lm(y ~ x), col="red")\ncor(x, y)  # correlation', t * 12, { speed: 35, colors: [P.cyan, P.rose, P.green] });
      txt(ctx, cx, h - 20, "One line of R makes a publication-quality plot", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── Dart: Widget Tree & Null Safety ──
  function vizDart(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 3);
    txt(ctx, w/2, 18, "Dart: Flutter's Language — Widget Trees & Null Safety", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "WIDGET TREE: UI as Nested Widgets", { sz: 10, c: P.cyan, w: "700" });
      // Tree visualization
      var tree = { label: "MaterialApp", x: cx, y: 85, children: [
        { label: "Scaffold", x: cx - 100, y: 140, children: [
          { label: "AppBar", x: cx - 140, y: 195, children: [] },
          { label: "Body", x: cx - 60, y: 195, children: [
            { label: "Column", x: cx - 60, y: 250, children: [] }
          ]}
        ]},
        { label: "Drawer", x: cx + 100, y: 140, children: [] }
      ]};
      function drawNode(n, t2) {
        var show = t2 > 0;
        if (!show) return;
        var bw = ctx.measureText(n.label).width + 20;
        box(ctx, n.x - bw/2, n.y - 14, bw, 28, { stroke: P.cyan, glow: P.cyan });
        txt(ctx, n.x, n.y, n.label, { sz: 9, c: P.text, w: "600" });
        n.children.forEach(function(ch) {
          arrow(ctx, n.x, n.y + 14, ch.x, ch.y - 14, { c: P.faint, lw: 1, hd: 4 });
          drawNode(ch, t2 - 0.5);
        });
      }
      drawNode(tree, (t % 3.5) * 1.5);
      typewriter(ctx, 30, 290, 'class MyApp extends StatelessWidget {\n  @override\n  Widget build(ctx) => MaterialApp(\n    home: Scaffold(\n      body: Column(children: [...])\n    )\n  );\n}', t * 10, { speed: 25, colors: [P.cyan, P.text, P.text, P.text, P.green, P.green, P.text, P.text] });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "NULL SAFETY: Compile-Time Null Checks", { sz: 10, c: P.cyan, w: "700" });
      box(ctx, 30, 80, w/2 - 45, 100, { stroke: P.green });
      txt(ctx, 30 + (w/2 - 45)/2, 98, "String (non-nullable)", { sz: 10, c: P.green, w: "700" });
      txt(ctx, 30 + (w/2 - 45)/2, 120, 'name = "Jay"', { sz: 11, c: P.text });
      txt(ctx, 30 + (w/2 - 45)/2, 145, "name = null  // COMPILE ERROR", { sz: 9, c: P.rose });
      box(ctx, w/2 + 15, 80, w/2 - 45, 100, { stroke: P.orange });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 98, "String? (nullable)", { sz: 10, c: P.orange, w: "700" });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 120, "String? maybe = null", { sz: 11, c: P.text });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 145, "maybe?.length  // safe", { sz: 9, c: P.orange });
      typewriter(ctx, 50, 220, 'String name = "Jay";    // non-null\nString? email = null;   // nullable\n\nprint(name.length);     // OK\nprint(email?.length);   // safe call\nprint(email ?? "none"); // fallback', t * 12, { speed: 35, colors: [P.green, P.orange, P.text, P.text, P.text, P.cyan] });
      txt(ctx, cx, h - 20, "Dart's null safety eliminates null pointer exceptions at compile time", { sz: 9, c: P.dim, m: false });
    } else {
      txt(ctx, cx, 48, "ASYNC/AWAIT & Futures", { sz: 10, c: P.cyan, w: "700" });
      // Animated Future flow
      var stages = ["Call API", "await...", "Get Data", "Update UI"];
      stages.forEach(function(s, i) {
        var sx = 40 + i * (w - 80) / 3;
        var active = i <= cyc(t, 0.7, stages.length);
        box(ctx, sx, 90, 110, 40, { stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
        txt(ctx, sx + 55, 110, s, { sz: 10, c: active ? P.cyan : P.dim, w: "600" });
        if (i < stages.length - 1 && active) {
          arrow(ctx, sx + 112, 110, sx + (w - 80) / 3 - 2, 110, { c: P.faint, hd: 4 });
        }
      });
      typewriter(ctx, 50, 160, 'Future<User> fetchUser() async {\n  final resp = await http.get(\n    Uri.parse("https://api.example.com/user")\n  );\n  return User.fromJson(jsonDecode(resp.body));\n}\n\n// Usage:\nfinal user = await fetchUser();\nprint(user.name);', t * 10, { speed: 25, colors: [P.cyan, P.text, P.text, P.text, P.green, P.text, P.text, P.text, P.cyan] });
      txt(ctx, cx, h - 20, "async/await makes asynchronous code read like synchronous", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── Scala: Pattern Matching & Functional Composition ──
  function vizScala(ctx, w, h, t) {
    var phase = cyc(t, 4, 3);
    txt(ctx, w/2, 18, "Scala: Functional + Object-Oriented Fusion", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "PATTERN MATCHING: Destructure & Branch", { sz: 10, c: P.cyan, w: "700" });
      var code = 'sealed trait Shape\ncase class Circle(r: Double) extends Shape\ncase class Rect(w: Double, h: Double) extends Shape\n\nval s: Shape = Circle(5.0)\ns match {\n  case Circle(r) => s"Area: ${math.Pi * r * r}"\n  case Rect(w, h) => s"Area: ${w * h}"\n}';
      typewriter(ctx, 40, 78, code, t * 12, { speed: 22, colors: [P.cyan, P.pink, P.green, P.text, P.text, P.text, P.amber, P.green, P.amber, P.green] });
      // Animated matching
      var matchPhase = (t % 4) * 2;
      if (matchPhase > 2) {
        var shapes = [
          { label: "Circle(5)", x: cx - 80, y: h - 90, color: P.cyan },
          { label: "Rect(3,4)", x: cx + 80, y: h - 90, color: P.green }
        ];
        var active = cyc(t, 1, 2);
        shapes.forEach(function(s, i) {
          var glow = i === active;
          box(ctx, s.x - 55, s.y - 16, 110, 32, { stroke: glow ? s.color : P.border, glow: glow ? s.color : null });
          txt(ctx, s.x, s.y, s.label, { sz: 10, c: glow ? s.color : P.dim, w: "600" });
          if (glow) {
            var area = i === 0 ? "78.5" : "12.0";
            txt(ctx, s.x, s.y + 28, "→ Area: " + area, { sz: 10, c: s.color, w: "700" });
          }
        });
      }
      txt(ctx, cx, h - 20, "Pattern matching is exhaustive — compiler checks all cases", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "HIGHER-ORDER FUNCTIONS: Compose Operations", { sz: 10, c: P.cyan, w: "700" });
      // Visual: data flowing through chained transforms
      var data = [1, 2, 3, 4, 5];
      var ops = ["filter(_ > 2)", "map(_ * 10)", "reduce(_ + _)"];
      var opColors = [P.rose, P.cyan, P.green];
      // Data boxes
      var startX = 30, boxW = 40;
      data.forEach(function(d, i) {
        var bx = startX + i * (boxW + 6);
        var filtered = d > 2;
        box(ctx, bx, 80, boxW, 36, { stroke: filtered ? P.cyan : P.faint });
        txt(ctx, bx + boxW/2, 98, String(d), { sz: 11, c: filtered ? P.text : P.faint, w: "600" });
        if (filtered) {
          arrow(ctx, bx + boxW/2, 120, bx + boxW/2, 150, { c: P.faint, hd: 3 });
          var mapped = d * 10;
          box(ctx, bx, 154, boxW, 36, { stroke: P.cyan });
          txt(ctx, bx + boxW/2, 172, String(mapped), { sz: 11, c: P.cyan, w: "600" });
        }
      });
      // Arrow to result
      arrow(ctx, cx, 200, cx, 230, { c: P.green, hd: 5 });
      box(ctx, cx - 40, 234, 80, 36, { stroke: P.green, glow: P.green });
      txt(ctx, cx, 252, "120", { sz: 14, c: P.green, w: "700" });
      txt(ctx, cx, 284, "filter → map → reduce  (functional pipeline)", { sz: 10, c: P.dim });
      typewriter(ctx, 30, 300, 'val result = List(1,2,3,4,5)\n  .filter(_ > 2)\n  .map(_ * 10)\n  .reduce(_ + _)\n// result: 120', t * 12, { speed: 30, colors: [P.cyan, P.rose, P.cyan, P.green, P.faint] });
    } else {
      txt(ctx, cx, 48, "CASE CLASSES: Immutable Data + Auto Methods", { sz: 10, c: P.cyan, w: "700" });
      var code = 'case class User(\n  name: String,\n  age: Int\n)\n\nval u1 = User("Jay", 20)\nval u2 = u1.copy(age = 21)\nval User(n, a) = u1  // destructuring\n\n// Auto-generated:\n// equals, toString, hashCode, copy';
      typewriter(ctx, 40, 80, code, t * 12, { speed: 22, colors: [P.cyan, P.text, P.text, P.green, P.text, P.pink, P.cyan, P.faint, P.faint, P.faint, P.faint] });
      // Visual: showing what case class gives you
      var extras = ["==", "toString", "hashCode", "copy", "unapply"];
      extras.forEach(function(e, i) {
        var ex = 40 + i * 100;
        var show = i <= cyc(t, 0.5, extras.length);
        box(ctx, ex, 310, 85, 32, { stroke: show ? P.green : P.border });
        txt(ctx, ex + 42, 326, e, { sz: 9, c: show ? P.green : P.dim, w: "600" });
      });
      txt(ctx, cx, 350, "case class = data class + pattern matching + copy", { sz: 10, c: P.dim });
      txt(ctx, cx, h - 20, "Write 3 lines, get 5 features for free", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── Perl: Regex & Text Processing ──
  function vizPerl(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 3);
    txt(ctx, w/2, 18, "Perl: The Swiss Army Chainsaw of Text Processing", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "REGEX ENGINE: Pattern Matching in Action", { sz: 10, c: P.cyan, w: "700" });
      // Animated regex matching
      var text = "My phone is 555-1234 and email is test@example.com";
      var pattern = /\\d{3}-\\d{4}/;
      var matchStart = 13, matchEnd = 22;
      var scroll = Math.max(0, (t % 3.5) * 40 - 40);
      // Text box
      box(ctx, 20, 80, w - 40, 44, { stroke: P.border });
      var charW = 8.5;
      for (var i = 0; i < text.length; i++) {
        var cx2 = 30 + i * charW;
        var inMatch = i >= matchStart && i < matchEnd;
        var color = inMatch ? P.green : P.text;
        if (inMatch) {
          ctx.fillStyle = P.green + "22";
          ctx.fillRect(cx2 - 1, 82, charW, 40);
        }
        txt(ctx, cx2, 102, text[i], { sz: 10, c: color, a: "left", m: false });
      }
      // Pattern box
      box(ctx, 20, 140, w - 40, 36, { stroke: P.cyan });
      txt(ctx, cx, 158, 'Pattern: /\\d{3}-\\d{4}/  →  Match: "555-1234"', { sz: 11, c: P.cyan, w: "600" });
      typewriter(ctx, 30, 200, 'my $text = "Call 555-1234 or 555-5678";\nif ($text =~ /(\\d{3}-\\d{4})/) {\n    print "Found: $1\\n";\n}\n# Found: 555-1234', t * 12, { speed: 35, colors: [P.cyan, P.text, P.green, P.text, P.faint] });
      txt(ctx, cx, h - 20, "Perl's regex is built into the language syntax with =~ operator", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "SUBSTITUTION & TRANSLITERATION", { sz: 10, c: P.cyan, w: "700" });
      // Before → After transformation
      var before = "Hello World 2024";
      var after = "hello world 2024";
      box(ctx, 30, 85, w/2 - 45, 50, { stroke: P.rose });
      txt(ctx, 30 + (w/2 - 45)/2, 110, before, { sz: 12, c: P.text });
      arrow(ctx, w/2 - 10, 110, w/2 + 10, 110, { c: P.green, hd: 6 });
      box(ctx, w/2 + 15, 85, w/2 - 45, 50, { stroke: P.green });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 110, after, { sz: 12, c: P.green });
      txt(ctx, cx, 150, 's/Hello/hello/  →  s/upper/lower/', { sz: 10, c: P.cyan });
      // Transliteration
      var trBefore = "abc123";
      var trAfter = "ABC123";
      box(ctx, 30, 175, w/2 - 45, 40, { stroke: P.amber });
      txt(ctx, 30 + (w/2 - 45)/2, 195, trBefore, { sz: 12, c: P.text });
      arrow(ctx, w/2 - 10, 195, w/2 + 10, 195, { c: P.green, hd: 6 });
      box(ctx, w/2 + 15, 175, w/2 - 45, 40, { stroke: P.green });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 195, trAfter, { sz: 12, c: P.green });
      txt(ctx, cx, 230, 'tr/a-z/A-Z/  →  transliterate case', { sz: 10, c: P.amber });
      typewriter(ctx, 30, 260, '$text = "Hello World";\n$text =~ s/Hello/Hi/;      # substitution\n$text =~ tr/a-z/A-Z/;      # transliteration\nprint $text;  # "HI WORLD"', t * 12, { speed: 35, colors: [P.cyan, P.text, P.text, P.text, P.green] });
    } else {
      txt(ctx, cx, 48, "SUBROUTINES & CONTEXT", { sz: 10, c: P.cyan, w: "700" });
      // Show list vs scalar context
      var items = ["apple", "banana", "cherry"];
      // List context
      box(ctx, 30, 85, w/2 - 45, 110, { stroke: P.cyan });
      txt(ctx, 30 + (w/2 - 45)/2, 100, "LIST CONTEXT", { sz: 9, c: P.cyan, w: "700" });
      items.forEach(function(it, i) {
        txt(ctx, 30 + (w/2 - 45)/2, 122 + i * 20, it, { sz: 11, c: P.text });
      });
      // Scalar context
      box(ctx, w/2 + 15, 85, w/2 - 45, 110, { stroke: P.pink });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 100, "SCALAR CONTEXT", { sz: 9, c: P.pink, w: "700" });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 130, "3", { sz: 28, c: P.pink, w: "700" });
      txt(ctx, w/2 + 15 + (w/2 - 45)/2, 170, "(count only)", { sz: 9, c: P.dim });
      typewriter(ctx, 30, 220, 'sub greet {\n    my $name = shift;\n    return "Hello, $name!";\n}\n\nmy @names = ("Jay", "Ana");\ngreet($_) for @names;  # list context\nmy $count = @names;   # scalar: 2', t * 12, { speed: 30, colors: [P.cyan, P.text, P.green, P.text, P.text, P.text, P.amber] });
      txt(ctx, cx, h - 20, "Context determines how Perl interprets expressions — unique to Perl", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── Lua: Tables & Metatables ──
  function vizLua(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 3);
    txt(ctx, w/2, 18, "Lua: Lightweight Scripting — Tables & Metatables", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "TABLES: Lua's Only Data Structure", { sz: 10, c: P.cyan, w: "700" });
      // Array-style table
      box(ctx, 30, 80, w * 0.45, 140, { stroke: P.cyan });
      txt(ctx, 30 + w * 0.225, 96, "Array Table", { sz: 10, c: P.cyan, w: "700" });
      var arr = ["one", "two", "three"];
      arr.forEach(function(v, i) {
        var ry = 112 + i * 30;
        box(ctx, 40, ry, w * 0.43 - 20, 26, { stroke: P.faint });
        txt(ctx, 55, ry + 13, "[" + (i+1) + "]", { sz: 9, c: P.faint, a: "left" });
        txt(ctx, 40 + w * 0.43 - 30, ry + 13, v, { sz: 10, c: P.text, a: "right" });
      });
      // Dict-style table
      box(ctx, w * 0.5, 80, w * 0.45, 140, { stroke: P.pink });
      txt(ctx, w * 0.5 + w * 0.225, 96, "Dictionary Table", { sz: 10, c: P.pink, w: "700" });
      var dict = [["name", '"Jay"'], ["age", "20"], ["city", '"NYC"']];
      dict.forEach(function(kv, i) {
        var ry = 112 + i * 30;
        box(ctx, w * 0.5 + 10, ry, w * 0.43 - 20, 26, { stroke: P.faint });
        txt(ctx, w * 0.5 + 25, ry + 13, kv[0], { sz: 9, c: P.faint, a: "left" });
        txt(ctx, w * 0.5 + w * 0.43 - 20, ry + 13, kv[1], { sz: 10, c: P.pink, a: "right" });
      });
      typewriter(ctx, 30, 240, 'local fruits = {"apple", "banana", "cherry"}\nlocal person = { name="Jay", age=20, city="NYC" }\n\nprint(fruits[1])     -- "apple"\nprint(person.name)   -- "Jay"', t * 12, { speed: 35, colors: [P.cyan, P.pink, P.text, P.text, P.green, P.green] });
      txt(ctx, cx, h - 20, "Tables are arrays AND dictionaries — one structure to rule them all", { sz: 9, c: P.dim, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "METATABLES: Override Default Behavior", { sz: 10, c: P.cyan, w: "700" });
      // Visual: __add metamethod
      box(ctx, 30, 85, 130, 50, { stroke: P.cyan });
      txt(ctx, 95, 100, "Vec{1,2}", { sz: 11, c: P.cyan, w: "600" });
      txt(ctx, 95, 120, "+", { sz: 16, c: P.pink, w: "700" });
      box(ctx, 180, 85, 130, 50, { stroke: P.green });
      txt(ctx, 245, 100, "Vec{3,4}", { sz: 11, c: P.green, w: "600" });
      arrow(ctx, 315, 110, 350, 110, { c: P.amber, hd: 6 });
      box(ctx, 360, 85, 130, 50, { stroke: P.amber, glow: P.amber });
      txt(ctx, 425, 100, "Vec{4,6}", { sz: 11, c: P.amber, w: "700" });
      // Show metatable concept
      box(ctx, 30, 160, w - 60, 36, { stroke: P.faint });
      txt(ctx, cx, 178, 'metatable.__add = function(a,b) ... end  →  custom + operator', { sz: 9, c: P.faint });
      typewriter(ctx, 30, 215, 'local mt = {\n  __add = function(a, b)\n    return setmetatable(\n      {a[1]+b[1], a[2]+b[2]}, mt\n    )\n  end\n}\n\nlocal v1 = setmetatable({1,2}, mt)\nlocal v2 = setmetatable({3,4}, mt)\nprint(v1[1]+v2[1], v1[2]+v2[2])  -- 4  6', t * 10, { speed: 22, colors: [P.cyan, P.text, P.text, P.green, P.text, P.text, P.text, P.text, P.cyan, P.green, P.text, P.amber, P.amber] });
      txt(ctx, cx, h - 20, "Metatables let you redefine operators — Lua's most powerful feature", { sz: 9, c: P.dim, m: false });
    } else {
      txt(ctx, cx, 48, "COROUTINES: Cooperative Multithreading", { sz: 10, c: P.cyan, w: "700" });
      // Animated coroutine execution
      var coros = [
        { label: "main", color: P.cyan, y: 90 },
        { label: "co1", color: P.green, y: 160 },
        { label: "co2", color: P.pink, y: 230 }
      ];
      // Timeline bars
      var barX = 60, barW = w - 120;
      coros.forEach(function(c, i) {
        box(ctx, 30, c.y, 40, 36, { stroke: c.color });
        txt(ctx, 50, c.y + 18, c.label, { sz: 9, c: c.color, w: "600" });
        box(ctx, barX, c.y + 3, barW, 30, { stroke: P.border });
      });
      // Animated execution blocks
      var cycle = (t * 2) % 6;
      if (cycle < 2) {
        // main runs
        ctx.fillStyle = P.cyan + "44";
        ctx.fillRect(barX, 93, barW * (cycle / 2), 24);
        txt(ctx, barX + barW * (cycle / 2) / 2, 105, "running", { sz: 9, c: P.cyan });
      } else if (cycle < 4) {
        ctx.fillStyle = P.cyan + "44";
        ctx.fillRect(barX, 93, barW, 24);
        // co1 runs
        var p = (cycle - 2) / 2;
        ctx.fillStyle = P.green + "44";
        ctx.fillRect(barX, 163, barW * p, 24);
        txt(ctx, barX + barW * p / 2, 175, "yield → resume", { sz: 9, c: P.green });
      } else {
        ctx.fillStyle = P.cyan + "44";
        ctx.fillRect(barX, 93, barW, 24);
        ctx.fillStyle = P.green + "44";
        ctx.fillRect(barX, 163, barW, 24);
        var p2 = (cycle - 4) / 2;
        ctx.fillStyle = P.pink + "44";
        ctx.fillRect(barX, 233, barW * p2, 24);
        txt(ctx, barX + barW * p2 / 2, 245, "coroutine.resume", { sz: 9, c: P.pink });
      }
      typewriter(ctx, 30, 290, 'co = coroutine.create(function()\n  print("step 1")\n  coroutine.yield()\n  print("step 2")\nend)\ncoroutine.resume(co)  -- "step 1"\ncoroutine.resume(co)  -- "step 2"', t * 10, { speed: 25, colors: [P.cyan, P.text, P.green, P.text, P.text, P.text, P.text] });
      txt(ctx, cx, h - 20, "Coroutines pause/resume cooperatively — no preemption, no race conditions", { sz: 9, c: P.dim, m: false });
    }
  }

  // ── Fallback for other languages ──
  function vizDefault(ctx, w, h, t, lang) {
    var p = pl(t, 1.2);
    var cx = w/2, cy = h/2;

    // Central icon
    ctx.beginPath();
    ctx.arc(cx, cy - 30, 35 + p * 5, 0, Math.PI * 2);
    ctx.fillStyle = P.panel2;
    ctx.strokeStyle = lang.color;
    ctx.lineWidth = 2.5;
    ctx.save(); ctx.shadowColor = lang.color; ctx.shadowBlur = 20;
    ctx.fill(); ctx.stroke(); ctx.restore();
    txt(ctx, cx, cy - 30, lang.icon, { sz: 22, c: lang.color, w: "800" });

    // Stats ring
    var stats = [
      { label: "Year", value: String(lang.year), angle: -Math.PI * 0.7 },
      { label: "Type", value: lang.typed.split(" ")[0], angle: -Math.PI * 0.3 },
      { label: "Runs", value: lang.compiled ? "Compiled" : "Interpreted", angle: Math.PI * 0.3 },
      { label: "Paradigm", value: lang.paradigm.split(",")[0], angle: Math.PI * 0.7 }
    ];

    stats.forEach(function(s, i) {
      var on = cyc(t, 1.5, stats.length) === i;
      var r = 85;
      var sx = cx + Math.cos(s.angle) * r;
      var sy = cy - 30 + Math.sin(s.angle) * r;
      box(ctx, sx - 44, sy - 16, 88, 32, { stroke: on ? lang.color : P.border, glow: on ? lang.color : null });
      txt(ctx, sx, sy - 3, s.label, { sz: 8, c: P.faint, w: "600" });
      txt(ctx, sx, sy + 10, s.value, { sz: 9, c: on ? lang.color : P.text, w: "700" });
    });

    txt(ctx, cx, h - 16, lang.name + " at a glance", { sz: 10, c: P.faint, m: false });
  }

  // ── HTML: DOM Tree & Semantic Elements ──
  function vizHTML(ctx, w, h, t) {
    var phase = cyc(t, 3, 4);
    txt(ctx, w/2, 18, "HTML: Structuring Web Content", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "THE DOM TREE: Elements as Nested Nodes", { sz: 10, c: P.cyan, w: "700" });
      var nodes = [
        { label: "html", x: cx, y: 80, color: P.cyan },
        { label: "head", x: cx-90, y: 135, color: P.blue },
        { label: "body", x: cx+90, y: 135, color: P.green },
        { label: "title", x: cx-120, y: 190, color: P.blue },
        { label: "h1", x: cx+30, y: 190, color: P.green },
        { label: "p", x: cx+90, y: 190, color: P.green },
        { label: "div", x: cx+150, y: 190, color: P.amber }
      ];
      var edges = [[0,1],[0,2],[1,3],[2,4],[2,5],[2,6]];
      edges.forEach(function(e) {
        arrow(ctx, nodes[e[0]].x, nodes[e[0]].y+14, nodes[e[1]].x, nodes[e[1]].y-14, { c: P.faint, lw: 1.5, hd: 4 });
      });
      var hi = cyc(t, 0.5, nodes.length);
      nodes.forEach(function(n, i) {
        var bw = n.label.length*8+20;
        box(ctx, n.x-bw/2, n.y-12, bw, 24, { stroke: i===hi ? n.color : P.border, glow: i===hi ? n.color : null });
        txt(ctx, n.x, n.y, n.label, { sz: 9, c: i===hi ? n.color : P.dim, w: "600" });
      });
      typewriter(ctx, 30, 240, '<html>\n  <head><title>My Page</title></head>\n  <body>\n    <h1>Hello World</h1>\n    <p>Welcome to HTML</p>\n  </body>\n</html>', t*12, { speed: 28, colors: [P.cyan,P.blue,P.text,P.green,P.green,P.text,P.cyan] });
      txt(ctx, cx, h-18, "Every HTML tag becomes a node in the Document Object Model tree", { sz: 9, c: P.faint, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "SEMANTIC ELEMENTS: Meaning Over Appearance", { sz: 10, c: P.cyan, w: "700" });
      var tags = [
        { tag: "<header>", desc: "Page intro & nav", color: P.blue },
        { tag: "<nav>", desc: "Navigation links", color: P.cyan },
        { tag: "<main>", desc: "Primary content", color: P.green },
        { tag: "<article>", desc: "Self-contained piece", color: P.amber },
        { tag: "<section>", desc: "Thematic group", color: P.pink },
        { tag: "<aside>", desc: "Side content", color: P.orange },
        { tag: "<footer>", desc: "Page bottom info", color: P.faint }
      ];
      var hi2 = cyc(t, 0.8, tags.length);
      tags.forEach(function(t2, i) {
        var y = 72+i*30;
        box(ctx, 30, y, w-60, 24, { stroke: i===hi2 ? t2.color : P.border, glow: i===hi2 ? t2.color : null });
        txt(ctx, 70, y+12, t2.tag, { sz: 10, c: i===hi2 ? t2.color : P.dim, a: "left", w: "700" });
        txt(ctx, w-50, y+12, t2.desc, { sz: 9, c: i===hi2 ? t2.color : P.faint, a: "right" });
      });
      txt(ctx, cx, h-18, "Semantic tags tell browsers & screen readers what content MEANS", { sz: 9, c: P.faint, m: false });
    } else if (phase === 2) {
      txt(ctx, cx, 48, "FORMS: Collecting User Input", { sz: 10, c: P.cyan, w: "700" });
      var inputs = [
        { type: "text", lbl: "Name", icon: "Aa" },
        { type: "email", lbl: "Email", icon: "@" },
        { type: "number", lbl: "Age", icon: "#" },
        { type: "date", lbl: "Birthday", icon: "Cal" },
        { type: "range", lbl: "Rating", icon: "~" }
      ];
      var hi3 = cyc(t, 0.7, inputs.length);
      inputs.forEach(function(inp, i) {
        var y = 75+i*38;
        box(ctx, 30, y, 70, 30, { stroke: i===hi3 ? P.cyan : P.border, glow: i===hi3 ? P.cyan : null });
        txt(ctx, 65, y+15, inp.icon, { sz: 10, c: i===hi3 ? P.cyan : P.dim });
        txt(ctx, 110, y+15, inp.lbl, { sz: 10, c: i===hi3 ? P.text : P.dim, a: "left" });
        box(ctx, 190, y, w-240, 30, { stroke: i===hi3 ? P.green : P.border });
        txt(ctx, 280, y+15, 'type="'+inp.type+'"', { sz: 9, c: i===hi3 ? P.green : P.faint });
      });
      typewriter(ctx, 30, 285, '<form action="/api/users" method="POST">\n  <input type="email" required>\n  <input type="range" min="0" max="10">\n  <button type="submit">Send</button>\n</form>', t*12, { speed: 30, colors: [P.cyan,P.green,P.amber,P.text] });
      txt(ctx, cx, h-18, "HTML5 inputs give built-in validation, mobile keyboards & date pickers", { sz: 9, c: P.faint, m: false });
    } else {
      txt(ctx, cx, 48, "ACCESSIBILITY: Web For Everyone", { sz: 10, c: P.cyan, w: "700" });
      var items = [
        { item: "alt text on images", desc: "Describe for screen readers", color: P.green },
        { item: "ARIA roles", desc: "Label interactive elements", color: P.cyan },
        { item: "keyboard navigation", desc: "Tab through all controls", color: P.amber },
        { item: "semantic HTML", desc: "Use <nav>, <main>, <button>", color: P.pink },
        { item: "color contrast", desc: "4.5:1 minimum ratio", color: P.orange }
      ];
      var hi4 = cyc(t, 1, items.length);
      items.forEach(function(it, i) {
        var y = 75+i*38;
        box(ctx, 30, y, w-60, 30, { stroke: i===hi4 ? it.color : P.border, glow: i===hi4 ? it.color : null });
        txt(ctx, 50, y+15, it.item, { sz: 10, c: i===hi4 ? it.color : P.dim, a: "left", w: "600" });
        txt(ctx, w-50, y+15, it.desc, { sz: 9, c: i===hi4 ? it.color : P.faint, a: "right" });
      });
      txt(ctx, cx, h-18, "Accessible HTML works for ALL users — screen readers, keyboard, mouse", { sz: 9, c: P.faint, m: false });
    }
  }

  // ── CSS: Box Model & Layout ──
  function vizCSS(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 4);
    txt(ctx, w/2, 18, "CSS: Styling & Layout for the Web", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "THE BOX MODEL: Every Element is a Box", { sz: 10, c: P.cyan, w: "700" });
      var cy = 165;
      box(ctx, cx-130, cy-65, 260, 130, { r: 8, stroke: P.amber, fill: P.amber+"11" });
      txt(ctx, cx-115, cy-52, "margin", { sz: 8, c: P.amber, a: "left", w: "600" });
      box(ctx, cx-100, cy-42, 200, 84, { r: 6, stroke: P.pink, fill: P.pink+"11" });
      txt(ctx, cx-85, cy-30, "border", { sz: 8, c: P.pink, a: "left", w: "600" });
      box(ctx, cx-70, cy-22, 140, 44, { r: 4, stroke: P.green, fill: P.green+"11" });
      txt(ctx, cx-58, cy-12, "padding", { sz: 8, c: P.green, a: "left", w: "600" });
      box(ctx, cx-40, cy-6, 80, 20, { stroke: P.cyan });
      txt(ctx, cx, cy+4, "content", { sz: 9, c: P.cyan, w: "700" });
      var pulse = Math.sin(t*2)*6;
      ctx.save();
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 2;
      ctx.setLineDash([4,4]);
      ctx.strokeRect(cx-40-pulse, cy-6-pulse, 80+pulse*2, 20+pulse*2);
      ctx.restore();
      typewriter(ctx, 30, 260, '.box {\n  margin: 20px;\n  border: 2px solid #333;\n  padding: 15px;\n  width: 300px;\n  box-sizing: border-box;\n}', t*12, { speed: 30, colors: [P.text,P.amber,P.pink,P.green,P.cyan,P.orange] });
      txt(ctx, cx, h-18, "Margin (outside) → Border → Padding (inside) → Content", { sz: 9, c: P.faint, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "FLEXBOX: One-Dimensional Layout", { sz: 10, c: P.cyan, w: "700" });
      var fp = cyc(t, 1.5, 3);
      var boxY = 80, boxH = 100;
      box(ctx, 30, boxY, w-60, boxH, { stroke: P.blue });
      txt(ctx, cx, boxY+14, "display: flex", { sz: 9, c: P.blue, w: "700" });
      var items = [0,1,2,3];
      var itemW = 55, itemH = 36;
      var gap = fp===0 ? 8 : fp===1 ? 28 : 4;
      var totalW = items.length*itemW+(items.length-1)*gap;
      var sX = cx-totalW/2;
      items.forEach(function(i) {
        var ix = sX+i*(itemW+gap);
        var active = cyc(t,0.8,items.length)===i;
        box(ctx, ix, boxY+34, itemW, itemH, { stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
        txt(ctx, ix+itemW/2, boxY+52, "Item "+(i+1), { sz: 9, c: active ? P.cyan : P.dim });
      });
      var labels = ["justify-content: center", "gap: 28px", "gap: 4px (compact)"];
      txt(ctx, cx, boxY+boxH+24, labels[fp], { sz: 10, c: P.green, w: "600" });
      typewriter(ctx, 30, 230, '.container {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}', t*12, { speed: 30, colors: [P.text,P.blue,P.green,P.cyan,P.amber] });
      txt(ctx, cx, h-18, "Flexbox aligns items along ONE axis — row or column", { sz: 9, c: P.faint, m: false });
    } else if (phase === 2) {
      txt(ctx, cx, 48, "CSS GRID: Two-Dimensional Layout", { sz: 10, c: P.cyan, w: "700" });
      var cols = 4, rows = 3;
      var cW = (w-100)/cols, cH = 42;
      var gX = 50, gY = 80;
      for (var c = 0; c <= cols; c++) arrow(ctx, gX+c*cW, gY, gX+c*cW, gY+rows*cH, { c: P.faint, lw: 1, hd: 0 });
      for (var r = 0; r <= rows; r++) arrow(ctx, gX, gY+r*cH, gX+cols*cW, gY+r*cH, { c: P.faint, lw: 1, hd: 0 });
      var cells = [
        { col:0,row:0,spanC:2,spanR:1,label:"Header",color:P.cyan },
        { col:2,row:0,spanC:2,spanR:1,label:"Nav",color:P.blue },
        { col:0,row:1,spanC:1,spanR:2,label:"Side",color:P.pink },
        { col:1,row:1,spanC:2,spanR:1,label:"Main",color:P.green },
        { col:3,row:1,spanC:1,spanR:2,label:"Aside",color:P.amber },
        { col:1,row:2,spanC:2,spanR:1,label:"Footer",color:P.orange }
      ];
      cells.forEach(function(cell, ci) {
        var cellX = gX+cell.col*cW, cellY = gY+cell.row*cH;
        var cellWW = cell.spanC*cW, cellHH = cell.spanR*cH;
        var active = cyc(t,0.7,cells.length)===ci;
        box(ctx, cellX+2, cellY+2, cellWW-4, cellHH-4, { r:4, stroke: active?cell.color:P.border, fill: active?cell.color+"22":P.panel2 });
        txt(ctx, cellX+cellWW/2, cellY+cellHH/2, cell.label, { sz:9, c: active?cell.color:P.dim, w:"600" });
      });
      txt(ctx, cx, h-18, "Grid handles rows AND columns — perfect for page layouts", { sz: 9, c: P.faint, m: false });
    } else {
      txt(ctx, cx, 48, "ANIMATIONS & TRANSITIONS", { sz: 10, c: P.cyan, w: "700" });
      var anims = [
        { name: "transition", desc: "Smooth property change", color: P.cyan },
        { name: "@keyframes", desc: "Multi-step animation", color: P.pink },
        { name: "transform", desc: "rotate, scale, translate", color: P.green },
        { name: "opacity", desc: "Fade in / out", color: P.amber }
      ];
      var hi = cyc(t, 1, anims.length);
      anims.forEach(function(a, i) {
        var y = 78+i*46;
        var pulse = i===hi ? Math.sin(t*4)*4 : 0;
        box(ctx, 30+pulse, y, w-60, 36, { stroke: i===hi?a.color:P.border, glow: i===hi?a.color:null });
        txt(ctx, 60, y+18, a.name, { sz: 11, c: i===hi?a.color:P.dim, a: "left", w: "700" });
        txt(ctx, w-50, y+18, a.desc, { sz: 9, c: i===hi?a.color:P.faint, a: "right" });
      });
      typewriter(ctx, 30, 280, '.btn {\n  transition: transform 0.3s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,0,0,0.2);\n}', t*12, { speed: 30, colors: [P.text,P.cyan,P.text,P.green,P.amber] });
      txt(ctx, cx, h-18, "Only animate transform & opacity for 60fps — avoid layout triggers", { sz: 9, c: P.faint, m: false });
    }
  }

  // ── DSA: Algorithms & Data Structures ──
  function vizDSA(ctx, w, h, t) {
    var phase = cyc(t, 3, 4);
    txt(ctx, w/2, 18, "Data Structures & Algorithms", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "BIG-O NOTATION: How Code Scales", { sz: 10, c: P.cyan, w: "700" });
      var gX = 40, gY = 80, gW = w-80, gH = 160;
      box(ctx, gX, gY, gW, gH, { stroke: P.border });
      arrow(ctx, gX, gY+gH, gX+gW, gY+gH, { c: P.faint, hd: 4 });
      arrow(ctx, gX, gY+gH, gX, gY, { c: P.faint, hd: 4 });
      txt(ctx, gX+gW/2, gY+gH+14, "Input size (n)", { sz: 9, c: P.faint });
      var curves = [
        { label: "O(1)", color: P.green, fn: function(x) { return 0.08; } },
        { label: "O(log n)", color: P.cyan, fn: function(x) { return Math.log(x+1)/Math.log(101); } },
        { label: "O(n)", color: P.blue, fn: function(x) { return x/100; } },
        { label: "O(n²)", color: P.rose, fn: function(x) { return (x*x)/10000; } }
      ];
      var anim = Math.min(1, (t%3)/2);
      curves.forEach(function(cv) {
        ctx.beginPath();
        ctx.strokeStyle = cv.color;
        ctx.lineWidth = 2;
        for (var x = 0; x <= 100*anim; x += 2) {
          var px = gX+(x/100)*gW;
          var py = gY+gH-cv.fn(x)*gH*0.85;
          if (x===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.stroke();
        var lx = gX+gW+5;
        var ly = gY+gH-cv.fn(100)*gH*0.85;
        txt(ctx, lx, ly, cv.label, { sz: 8, c: cv.color, w: "700" });
      });
      typewriter(ctx, 40, 280, 'O(1)     = instant\nO(log n) = fast (binary search)\nO(n)     = linear scan\nO(n²)    = nested loops', t*12, { speed: 30, colors: [P.green,P.cyan,P.blue,P.rose] });
      txt(ctx, cx, h-18, "Big-O tells you how runtime GROWS as input gets bigger", { sz: 9, c: P.faint, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "SORTING: Rearranging Elements", { sz: 10, c: P.cyan, w: "700" });
      var arr = [5,3,8,1,4,7,2,6];
      var bW = (w-80)/arr.length;
      var maxV = 8;
      var swapI = Math.floor((t*3)%(arr.length*2));
      var dArr = arr.slice();
      for (var i = 0; i < Math.min(swapI, arr.length*2); i++) {
        var si = i%arr.length;
        if (si<arr.length-1 && dArr[si]>dArr[si+1]) {
          var tmp=dArr[si]; dArr[si]=dArr[si+1]; dArr[si+1]=tmp;
        }
      }
      dArr.forEach(function(v, idx) {
        var bx = 40+idx*bW;
        var bh = (v/maxV)*140;
        var active = idx===swapI%arr.length || idx===(swapI%arr.length)+1;
        box(ctx, bx+2, 230-bh, bW-4, bh, { r:3, stroke: active?P.rose:P.cyan, fill: active?P.rose+"33":P.cyan+"22" });
        txt(ctx, bx+bW/2, 238, String(v), { sz: 10, c: active?P.rose:P.cyan, w: "700" });
      });
      var algos = [
        { name: "Bubble", cplx: "O(n²)", color: P.rose },
        { name: "Merge", cplx: "O(n log n)", color: P.green },
        { name: "Quick", cplx: "O(n log n) avg", color: P.cyan }
      ];
      algos.forEach(function(a, i) {
        var ax = 60+i*150;
        box(ctx, ax, 250, 130, 34, { stroke: a.color });
        txt(ctx, ax+65, 262, a.name, { sz: 10, c: a.color, w: "700" });
        txt(ctx, ax+65, 278, a.cplx, { sz: 8, c: P.dim });
      });
      txt(ctx, cx, h-18, "Bubble=O(n²) | Merge=O(n log n) | Quick=O(n log n) avg", { sz: 9, c: P.faint, m: false });
    } else if (phase === 2) {
      txt(ctx, cx, 48, "BINARY SEARCH: Find in O(log n)", { sz: 10, c: P.cyan, w: "700" });
      var sorted = [2,5,8,12,16,23,38,45,67,91];
      var target = 23;
      var lo = 0, hi2 = sorted.length-1;
      var step = Math.floor((t*1.2)%5);
      for (var s = 0; s < step; s++) {
        var mid = Math.floor((lo+hi2)/2);
        if (sorted[mid]<target) lo=mid+1; else hi2=mid-1;
      }
      var mid2 = Math.floor((lo+hi2)/2);
      var cw2 = Math.min(48,(w-60)/sorted.length);
      var sx2 = (w-sorted.length*cw2)/2;
      sorted.forEach(function(v, i) {
        var bx2 = sx2+i*cw2;
        var inR = i>=lo && i<=hi2;
        var isMid = i===mid2;
        var found = v===target && step>=4;
        box(ctx, bx2+1, 80, cw2-2, 34, { stroke: found?P.green:(isMid?P.amber:(inR?P.cyan:P.faint)) });
        txt(ctx, bx2+cw2/2, 97, String(v), { sz: 10, c: found?P.green:(isMid?P.amber:(inR?P.text:P.faint)), w: "600" });
      });
      if (step<5) {
        txt(ctx, sx2+lo*cw2+cw2/2, 126, "low", { sz: 8, c: P.green, w: "700" });
        txt(ctx, sx2+mid2*cw2+cw2/2, 126, "mid", { sz: 8, c: P.amber, w: "700" });
        txt(ctx, sx2+hi2*cw2+cw2/2, 126, "high", { sz: 8, c: P.rose, w: "700" });
      }
      var status = step<5 ? "Checking middle element..." : "Found 23 at index 5!";
      txt(ctx, cx, 150, status, { sz: 11, c: step>=4?P.green:P.amber, w: "700" });
      typewriter(ctx, 30, 180, 'def binary_search(arr, target):\n    lo, hi = 0, len(arr)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if arr[mid]==target: return mid\n        elif arr[mid]<target: lo=mid+1\n        else: hi=mid-1\n    return -1', t*12, { speed: 22, colors: [P.cyan,P.text,P.amber,P.text,P.green,P.text,P.text] });
      txt(ctx, cx, h-18, "Each step cuts the search space in HALF — O(log n)", { sz: 9, c: P.faint, m: false });
    } else {
      txt(ctx, cx, 48, "RECURSION & DYNAMIC PROGRAMMING", { sz: 10, c: P.cyan, w: "700" });
      var tree = [
        { label: "fib(4)", x: cx, y: 80, color: P.cyan },
        { label: "fib(3)", x: cx-85, y: 135, color: P.blue },
        { label: "fib(2)", x: cx+85, y: 135, color: P.blue },
        { label: "fib(2)", x: cx-120, y: 190, color: P.pink },
        { label: "fib(1)", x: cx-50, y: 190, color: P.green },
        { label: "fib(1)", x: cx+50, y: 190, color: P.green },
        { label: "fib(0)", x: cx+120, y: 190, color: P.faint }
      ];
      var tE = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
      tE.forEach(function(e) { arrow(ctx, tree[e[0]].x, tree[e[0]].y+14, tree[e[1]].x, tree[e[1]].y-14, { c: P.faint, lw: 1, hd: 3 }); });
      var hi = cyc(t, 0.7, tree.length);
      tree.forEach(function(n, i) {
        box(ctx, n.x-28, n.y-12, 56, 24, { stroke: i===hi?n.color:P.border, glow: i===hi?n.color:null });
        txt(ctx, n.x, n.y, n.label, { sz: 9, c: i===hi?n.color:P.dim, w: "600" });
      });
      txt(ctx, cx, 228, "Without memo: O(2^n)  |  With memo: O(n)", { sz: 10, c: P.green, w: "700" });
      var memo = ["fib(0)=0","fib(1)=1","fib(2)=1","fib(3)=2","fib(4)=3"];
      memo.forEach(function(m, i) {
        var mx = 50+i*90;
        var shown = i <= Math.floor((t%3)*2);
        box(ctx, mx, 245, 80, 22, { stroke: shown?P.green:P.border });
        txt(ctx, mx+40, 256, m, { sz: 8, c: shown?P.green:P.faint });
      });
      txt(ctx, cx, h-18, "DP caches solved subproblems — turns exponential into linear", { sz: 9, c: P.faint, m: false });
    }
  }

  // ── DBMS: Database Concepts ──
  function vizDBMS(ctx, w, h, t) {
    var phase = cyc(t, 3.5, 3);
    txt(ctx, w/2, 18, "Database Management Systems", { sz: 11, c: P.cyan, w: "700" });
    var cx = w/2;

    if (phase === 0) {
      txt(ctx, cx, 48, "NORMALIZATION: Removing Redundancy", { sz: 10, c: P.cyan, w: "700" });
      var forms = [
        { label: "1NF", desc: "Atomic values only", color: P.blue },
        { label: "2NF", desc: "No partial deps", color: P.green },
        { label: "3NF", desc: "No transitive deps", color: P.amber }
      ];
      var hi = cyc(t, 1.5, 3);
      forms.forEach(function(f, i) {
        var fx = 40+i*((w-80)/3);
        var fw = (w-80)/3-10;
        box(ctx, fx, 75, fw, 70, { r:8, stroke: i===hi?f.color:P.border, glow: i===hi?f.color:null });
        txt(ctx, fx+fw/2, 95, f.label, { sz: 18, c: i===hi?f.color:P.dim, w: "800" });
        txt(ctx, fx+fw/2, 120, f.desc, { sz: 9, c: i===hi?f.color:P.dim, w: "600" });
        if (i<2) arrow(ctx, fx+fw+2, 110, fx+fw+8, 110, { c: P.faint, hd: 4 });
      });
      typewriter(ctx, 30, 175, '-- 1NF: No lists in cells\nCREATE TABLE enrollments (\n  student_id INT,\n  course VARCHAR(50),\n  grade CHAR(2)\n);', t*12, { speed: 25, colors: [P.blue,P.cyan,P.text,P.text,P.text] });
      txt(ctx, cx, h-18, "1NF→2NF→3NF each removes a type of bad dependency", { sz: 9, c: P.faint, m: false });
    } else if (phase === 1) {
      txt(ctx, cx, 48, "ER MODEL: Entities, Attributes, Relationships", { sz: 10, c: P.cyan, w: "700" });
      // Student entity
      box(ctx, cx-150, 80, 100, 36, { stroke: P.cyan, glow: P.cyan });
      txt(ctx, cx-100, 98, "Student", { sz: 12, c: P.cyan, w: "700" });
      ["id","name","email"].forEach(function(a, i) {
        txt(ctx, cx-100, 126+i*16, a, { sz: 8, c: P.dim });
      });
      // Course entity
      box(ctx, cx+50, 80, 100, 36, { stroke: P.green, glow: P.green });
      txt(ctx, cx+100, 98, "Course", { sz: 12, c: P.green, w: "700" });
      ["code","title","credits"].forEach(function(a, i) {
        txt(ctx, cx+100, 126+i*16, a, { sz: 8, c: P.dim });
      });
      // Relationship
      diamond(ctx, cx, 98, 38, 18, { stroke: P.amber, glow: P.amber });
      txt(ctx, cx, 98, "enrolled", { sz: 8, c: P.amber, w: "700" });
      arrow(ctx, cx-112, 98, cx-40, 98, { c: P.faint, hd: 4 });
      arrow(ctx, cx+40, 98, cx+112, 98, { c: P.faint, hd: 4 });
      txt(ctx, cx-125, 88, "M", { sz: 10, c: P.cyan, w: "700" });
      txt(ctx, cx+125, 88, "N", { sz: 10, c: P.green, w: "700" });
      // Junction table
      txt(ctx, cx, 200, "M:N becomes a junction table:", { sz: 10, c: P.amber, w: "700" });
      var cols3 = ["student_id","course_code","grade"];
      cols3.forEach(function(c, i) {
        box(ctx, cx-120+i*90, 220, 86, 22, { fill: P.panel2, stroke: P.amber });
        txt(ctx, cx-120+i*90+43, 231, c, { sz: 8, c: P.amber, w: "600" });
      });
      [["1","CS101","A"],["2","MATH201","B"]].forEach(function(r, ri) {
        r.forEach(function(v, ci) {
          box(ctx, cx-120+ci*90, 244+ri*22, 86, 20, { stroke: P.border });
          txt(ctx, cx-120+ci*90+43, 254+ri*22, v, { sz: 9, c: P.dim });
        });
      });
      txt(ctx, cx, h-18, "Entities→tables, Attributes→columns, Relationships→foreign keys", { sz: 9, c: P.faint, m: false });
    } else {
      txt(ctx, cx, 48, "JOINS: Combining Tables by Related Columns", { sz: 10, c: P.cyan, w: "700" });
      var t1x = 30, t2x = cx+10, tW = cx-50;
      box(ctx, t1x, 80, tW, 24, { fill: P.panel2, stroke: P.cyan });
      txt(ctx, t1x+tW/2, 92, "STUDENTS", { sz: 10, c: P.cyan, w: "700" });
      [["1","Jay"],["2","Ana"],["3","Sam"]].forEach(function(r, i) {
        box(ctx, t1x, 106+i*22, tW, 20, { stroke: cyc(t,1,3)===i?P.cyan:P.border });
        txt(ctx, t1x+tW/2, 116+i*22, r[0]+"  "+r[1], { sz: 9, c: cyc(t,1,3)===i?P.cyan:P.dim });
      });
      box(ctx, t2x, 80, tW, 24, { fill: P.panel2, stroke: P.pink });
      txt(ctx, t2x+tW/2, 92, "ENROLLMENTS", { sz: 10, c: P.pink, w: "700" });
      [["1","CS101"],["2","MATH201"],["1","PHY301"]].forEach(function(r, i) {
        box(ctx, t2x, 106+i*22, tW, 20, { stroke: cyc(t,1,3)===i?P.pink:P.border });
        txt(ctx, t2x+tW/2, 116+i*22, "stu:"+r[0]+" crs:"+r[1], { sz: 9, c: cyc(t,1,3)===i?P.pink:P.dim });
      });
      arrow(ctx, cx-5, 170, cx+5, 170, { c: P.green, hd: 5 });
      txt(ctx, cx, 162, "JOIN", { sz: 10, c: P.green, w: "700" });
      txt(ctx, cx, 192, "Result:", { sz: 10, c: P.green, w: "700" });
      [["Jay","CS101"],["Ana","MATH201"],["Jay","PHY301"]].forEach(function(r, i) {
        box(ctx, cx-80, 208+i*22, 160, 20, { stroke: P.green });
        txt(ctx, cx, 218+i*22, r[0]+" → "+r[1], { sz: 10, c: P.green });
      });
      typewriter(ctx, 30, 295, 'SELECT s.name, e.course\nFROM students s\nJOIN enrollments e\n  ON s.id = e.student_id;', t*12, { speed: 30, colors: [P.cyan,P.pink,P.text,P.green] });
      txt(ctx, cx, h-18, "JOIN matches rows from different tables using a shared column", { sz: 9, c: P.faint, m: false });
    }
  }

  // ══════════════════════════════
  // LANGUAGE → VISUALIZATION MAP
  // ══════════════════════════════
  var LANG_VIZ_MAP = {
    c: vizC,
    java: vizJava,
    python: vizPython,
    javascript: vizJavaScript,
    php: vizPHP,
    html: vizHTML,
    css: vizCSS,
    dsa: vizDSA,
    dbms: vizDBMS
  };

  // ══════════════════════════════════════════════
  // SUBTOPIC-SPECIFIC VISUALIZATIONS
  // ══════════════════════════════════════════════

  // ── Diamond helper for decisions ──
  function diamond(ctx, cx, cy, hw, hh, o) {
    o = o || {};
    ctx.beginPath();
    ctx.moveTo(cx, cy - hh);
    ctx.lineTo(cx + hw, cy);
    ctx.lineTo(cx, cy + hh);
    ctx.lineTo(cx - hw, cy);
    ctx.closePath();
    if (o.glow) { ctx.save(); ctx.shadowColor = o.glow; ctx.shadowBlur = 14; }
    ctx.fillStyle = o.fill || P.panel2;
    ctx.fill();
    if (o.glow) ctx.restore();
    ctx.strokeStyle = o.stroke || P.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // ═══════════════ CONTROL FLOW ═══════════════

  function subIf(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "If Statement — Single Branch Decision", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2, phase = cyc(t, 2.5, 3);
    // Diamond
    diamond(ctx, cx, 110, 80, 30, { stroke: P.amber, glow: P.amber });
    txt(ctx, cx, 110, "x > 5 ?", { sz: 11, c: P.amber, w: "700" });
    // True path
    var trueOn = phase === 0 || phase === 2;
    arrow(ctx, cx + 82, 110, cx + 140, 110, { c: trueOn ? P.green : P.faint });
    txt(ctx, cx + 110, 98, "true", { sz: 9, c: P.green, w: "700" });
    box(ctx, cx + 145, 85, 130, 50, { stroke: trueOn ? P.green : P.border, glow: trueOn ? P.green : null });
    txt(ctx, cx + 210, 110, "execute body", { sz: 10, c: trueOn ? P.green : P.dim });
    // False path
    arrow(ctx, cx, 142, cx, 200, { c: P.faint });
    txt(ctx, cx + 10, 172, "false", { sz: 9, c: P.rose });
    box(ctx, cx - 65, 205, 130, 40, { stroke: P.rose });
    txt(ctx, cx, 225, "skip (do nothing)", { sz: 10, c: P.rose });
    // Code
    typewriter(ctx, 40, 280, 'if (x > 5) {\n    console.log("Big!");\n}', t * 12, { speed: 35, colors: [P.amber, P.green] });
    txt(ctx, w/2, h - 18, "The condition is checked — only the true path runs", { sz: 9, c: P.faint, m: false });
  }

  function subIfElse(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "If-Else — Two Branches, One Runs", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2, phase = cyc(t, 3, 2);
    diamond(ctx, cx, 110, 80, 30, { stroke: P.amber, glow: P.amber });
    txt(ctx, cx, 110, "x > 5 ?", { sz: 11, c: P.amber, w: "700" });
    // True
    var showTrue = phase === 0;
    arrow(ctx, cx + 82, 110, cx + 140, 110, { c: showTrue ? P.green : P.faint });
    txt(ctx, cx + 110, 98, "true", { sz: 9, c: P.green, w: "700" });
    box(ctx, cx + 145, 85, 120, 50, { stroke: showTrue ? P.green : P.border, glow: showTrue ? P.green : null });
    txt(ctx, cx + 205, 105, "Big!", { sz: 11, c: showTrue ? P.green : P.dim, w: "700" });
    txt(ctx, cx + 205, 122, "if-branch", { sz: 8, c: P.faint });
    // False
    var showFalse = phase === 1;
    arrow(ctx, cx - 82, 110, cx - 140, 110, { c: showFalse ? P.orange : P.faint });
    txt(ctx, cx - 110, 98, "false", { sz: 9, c: P.orange, w: "700" });
    box(ctx, cx - 265, 85, 120, 50, { stroke: showFalse ? P.orange : P.border, glow: showFalse ? P.orange : null });
    txt(ctx, cx - 205, 105, "Small!", { sz: 11, c: showFalse ? P.orange : P.dim, w: "700" });
    txt(ctx, cx - 205, 122, "else-branch", { sz: 8, c: P.faint });
    // Both paths converge
    arrow(ctx, cx, 142, cx, 200, { c: P.faint });
    box(ctx, cx - 60, 205, 120, 36, { stroke: P.cyan });
    txt(ctx, cx, 223, "continue", { sz: 10, c: P.cyan });
    typewriter(ctx, 50, 270, 'if (x > 5) {\n    console.log("Big!");\n} else {\n    console.log("Small!");\n}', t * 10, { speed: 30, colors: [P.amber, P.green, P.text, P.orange] });
    txt(ctx, w/2, h - 18, "Exactly ONE branch runs — true or false", { sz: 9, c: P.faint, m: false });
  }

  function subNestedIf(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Nested If — Decisions Inside Decisions", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 3);
    // Outer diamond
    diamond(ctx, 120, 100, 70, 28, { stroke: P.amber, glow: phase === 0 ? P.amber : null });
    txt(ctx, 120, 100, "x > 5 ?", { sz: 10, c: P.amber, w: "700" });
    // True -> inner diamond
    arrow(ctx, 192, 100, 240, 100, { c: P.green });
    txt(ctx, 216, 88, "true", { sz: 9, c: P.green, w: "700" });
    diamond(ctx, 300, 100, 65, 28, { stroke: P.pink, glow: phase >= 1 ? P.pink : null });
    txt(ctx, 300, 100, "y > 3 ?", { sz: 10, c: P.pink, w: "700" });
    // Inner true
    arrow(ctx, 367, 100, 400, 100, { c: phase >= 1 ? P.green : P.faint });
    box(ctx, 405, 78, 90, 44, { stroke: phase >= 1 ? P.green : P.border, glow: phase >= 1 ? P.green : null });
    txt(ctx, 450, 100, "both true", { sz: 9, c: phase >= 1 ? P.green : P.dim });
    // Inner false
    arrow(ctx, 300, 130, 300, 170, { c: phase === 2 ? P.orange : P.faint });
    box(ctx, 255, 175, 90, 36, { stroke: phase === 2 ? P.orange : P.border });
    txt(ctx, 300, 193, "x yes, y no", { sz: 9, c: phase === 2 ? P.orange : P.dim });
    // Outer false
    arrow(ctx, 120, 130, 120, 180, { c: phase === 0 ? P.rose : P.faint });
    box(ctx, 70, 185, 100, 36, { stroke: phase === 0 ? P.rose : P.border });
    txt(ctx, 120, 203, "x <= 5", { sz: 9, c: phase === 0 ? P.rose : P.dim });
    typewriter(ctx, 30, 255, 'if (x > 5) {\n    if (y > 3) {\n        // both true\n    } else {\n        // x yes, y no\n    }\n} else {\n    // x <= 5\n}', t * 10, { speed: 22, colors: [P.amber, P.pink, P.green, P.text, P.orange, P.text, P.text, P.text, P.rose] });
    txt(ctx, w/2, h - 18, "Each nested if adds another level of decision-making", { sz: 9, c: P.faint, m: false });
  }

  function subIfElseLadder(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "If-Else Ladder — Sequential Conditions", { sz: 11, c: P.cyan, w: "700" });
    var active = cyc(t, 1.8, 5);
    var conditions = ["x < 10", "x < 20", "x < 30", "x < 40", "else"];
    var colors = [P.green, P.cyan, P.blue, P.pink, P.orange];
    var labels = ["grade D", "grade C", "grade B", "grade A", "grade A+"];
    var startX = 50;
    conditions.forEach(function(c, i) {
      var y = 60 + i * 48;
      var on = i === active;
      // Stair-step offset
      var offsetX = i * 18;
      box(ctx, startX + offsetX, y, w - 80 - offsetX, 38, { stroke: on ? colors[i] : P.border, glow: on ? colors[i] : null });
      txt(ctx, startX + offsetX + 20, y + 19, "else if (" + c + ")", { sz: 10, c: on ? colors[i] : P.dim, a: "left", w: on ? "700" : "500" });
      txt(ctx, w - 60, y + 19, labels[i], { sz: 10, c: on ? colors[i] : P.faint, a: "right" });
      if (on) {
        // Highlight arrow
        ctx.beginPath();
        ctx.moveTo(startX + offsetX - 10, y + 19);
        ctx.lineTo(startX + offsetX - 2, y + 19);
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
    // x value
    var xVal = 15 + active * 8;
    txt(ctx, 30, 60 + active * 48 + 19, "x=" + xVal, { sz: 10, c: colors[active], w: "700", a: "right" });
    txt(ctx, w/2, h - 18, "Checked top to bottom — first matching condition runs", { sz: 9, c: P.faint, m: false });
  }

  function subForLoop(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "For Loop — Counter-Based Repetition", { sz: 11, c: P.cyan, w: "700" });
    var iteration = cyc(t, 1.2, 5);
    var cx = w / 2;
    // Loop body
    box(ctx, cx - 100, 70, 200, 50, { stroke: P.cyan });
    txt(ctx, cx, 88, "for (i = 0; i < 5; i++)", { sz: 10, c: P.cyan, w: "600" });
    txt(ctx, cx, 106, "init / condition / increment", { sz: 8, c: P.faint });
    // Arrow down
    arrow(ctx, cx, 122, cx, 160, { c: P.faint });
    // Body box
    box(ctx, cx - 90, 165, 180, 40, { stroke: iteration < 5 ? P.green : P.faint, glow: iteration < 5 ? P.green : null });
    txt(ctx, cx, 185, "loop body — iter " + (iteration + 1), { sz: 10, c: iteration < 5 ? P.green : P.faint });
    // Circular arrow back up
    ctx.beginPath();
    ctx.arc(cx + 120, 185, 30, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.strokeStyle = P.amber;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.lineDashOffset = -t * 20;
    ctx.stroke();
    ctx.setLineDash([]);
    arrow(ctx, cx + 120, 155, cx + 120, 125, { c: P.amber, hd: 5 });
    txt(ctx, cx + 150, 185, "i++", { sz: 9, c: P.amber, w: "700" });
    // Counter display
    var counterY = 240;
    txt(ctx, cx, counterY, "Counter i:", { sz: 10, c: P.dim });
    for (var i = 0; i < 5; i++) {
      var bx = cx - 120 + i * 55;
      var on = i === iteration;
      box(ctx, bx, counterY + 12, 45, 34, { stroke: on ? P.cyan : P.border, glow: on ? P.cyan : null });
      txt(ctx, bx + 22, counterY + 29, String(i), { sz: 14, c: on ? P.cyan : P.dim, w: "700" });
    }
    typewriter(ctx, 40, 310, 'for (let i = 0; i < 5; i++) {\n    console.log(i);\n}\n// prints 0 1 2 3 4', t * 12, { speed: 35, colors: [P.cyan, P.green, P.text, P.faint] });
    txt(ctx, w/2, h - 18, "Init once, check before each iteration, increment after", { sz: 9, c: P.faint, m: false });
  }

  function subWhileLoop(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "While Loop — Condition-First Repetition", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 1.5, 2);
    var cx = w / 2;
    // Condition at top
    diamond(ctx, cx, 90, 90, 30, { stroke: P.amber, glow: P.amber });
    txt(ctx, cx, 90, "count < 5 ?", { sz: 10, c: P.amber, w: "700" });
    // True -> body
    arrow(ctx, cx + 92, 90, cx + 140, 90, { c: P.green });
    txt(ctx, cx + 116, 78, "true", { sz: 9, c: P.green, w: "700" });
    arrow(ctx, cx + 140, 90, cx + 140, 140, { c: P.green, hd: 4 });
    box(ctx, cx - 70, 145, 210, 40, { stroke: P.green, glow: phase === 0 ? P.green : null });
    txt(ctx, cx + 35, 165, "count++; // body", { sz: 10, c: phase === 0 ? P.green : P.dim });
    // Loop back arrow
    ctx.beginPath();
    ctx.moveTo(cx + 35, 145);
    ctx.lineTo(cx + 35, 120);
    ctx.lineTo(cx - 90, 120);
    ctx.lineTo(cx - 90, 60);
    ctx.lineTo(cx, 60);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.lineDashOffset = -t * 25;
    ctx.stroke();
    ctx.setLineDash([]);
    arrow(ctx, cx - 1, 60, cx, 58, { c: P.cyan, hd: 4 });
    // False -> exit
    arrow(ctx, cx, 122, cx, 230, { c: P.rose });
    txt(ctx, cx + 12, 180, "false", { sz: 9, c: P.rose, w: "700" });
    box(ctx, cx - 50, 235, 100, 36, { stroke: P.rose });
    txt(ctx, cx, 253, "exit loop", { sz: 10, c: P.rose });
    typewriter(ctx, 40, 295, 'let count = 0;\nwhile (count < 5) {\n    count++;\n}\n// count is now 5', t * 12, { speed: 35, colors: [P.cyan, P.amber, P.green, P.text, P.faint] });
    txt(ctx, w/2, h - 18, "Condition checked BEFORE each iteration — may never run", { sz: 9, c: P.faint, m: false });
  }

  function subDoWhileLoop(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Do-While Loop — Execute Then Check", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    // Body at top
    box(ctx, cx - 90, 70, 180, 50, { stroke: P.green, glow: P.green });
    txt(ctx, cx, 88, "do {", { sz: 10, c: P.green, w: "700" });
    txt(ctx, cx, 106, "count++; // body", { sz: 10, c: P.text });
    // Arrow down
    arrow(ctx, cx, 122, cx, 165, { c: P.faint });
    // Condition at bottom
    diamond(ctx, cx, 200, 90, 30, { stroke: P.amber, glow: P.amber });
    txt(ctx, cx, 200, "count < 5 ?", { sz: 10, c: P.amber, w: "700" });
    // True -> loop back up
    ctx.beginPath();
    ctx.moveTo(cx - 92, 200);
    ctx.lineTo(cx - 140, 200);
    ctx.lineTo(cx - 140, 95);
    ctx.lineTo(cx - 90, 95);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.lineDashOffset = -t * 25;
    ctx.stroke();
    ctx.setLineDash([]);
    arrow(ctx, cx - 91, 95, cx - 90, 95, { c: P.cyan, hd: 4 });
    txt(ctx, cx - 155, 148, "true", { sz: 9, c: P.cyan, w: "700" });
    // False -> exit
    arrow(ctx, cx + 92, 200, cx + 140, 200, { c: P.rose });
    arrow(ctx, cx + 140, 200, cx + 140, 260, { c: P.rose, hd: 5 });
    txt(ctx, cx + 160, 200, "false", { sz: 9, c: P.rose, w: "700" });
    box(ctx, cx + 80, 265, 120, 36, { stroke: P.rose });
    txt(ctx, cx + 140, 283, "exit loop", { sz: 10, c: P.rose });
    // Key insight
    box(ctx, cx - 130, 310, 260, 36, { stroke: P.cyan });
    txt(ctx, cx, 328, "Guarantees body runs AT LEAST ONCE", { sz: 10, c: P.cyan });
    typewriter(ctx, 30, 370, 'let count = 0;\ndo {\n    count++;\n} while (count < 5);', t * 12, { speed: 35, colors: [P.cyan, P.green, P.text, P.amber] });
    txt(ctx, w/2, h - 18, "Body runs first, THEN condition is checked", { sz: 9, c: P.faint, m: false });
  }

  function subSwitch(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Switch Statement — Multiple Branch Selection", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var activeCase = cyc(t, 1.5, 4);
    // Central node
    box(ctx, cx - 60, 65, 120, 40, { stroke: P.pink, glow: P.pink });
    txt(ctx, cx, 85, "switch(day)", { sz: 11, c: P.pink, w: "700" });
    // Cases
    var cases = [
      { label: 'case "Mon"', result: "Start week", color: P.green },
      { label: 'case "Wed"', result: "Midweek", color: P.cyan },
      { label: 'case "Fri"', result: "TGIF!", color: P.amber },
      { label: 'default', result: "Other day", color: P.faint }
    ];
    cases.forEach(function(c, i) {
      var y = 140 + i * 55;
      var on = i === activeCase;
      // Branch line
      arrow(ctx, cx, 107, cx, y, { c: on ? c.color : P.border, lw: on ? 2 : 1 });
      // Case box
      box(ctx, cx - 80, y, 160, 40, { stroke: on ? c.color : P.border, glow: on ? c.color : null });
      txt(ctx, cx - 30, y + 14, c.label, { sz: 10, c: on ? c.color : P.dim, a: "left" });
      txt(ctx, cx - 30, y + 30, "→ " + c.result, { sz: 9, c: on ? c.color : P.faint, a: "left" });
      if (on) {
        // Match indicator
        txt(ctx, cx + 70, y + 20, "✓", { sz: 14, c: c.color });
      }
    });
    typewriter(ctx, 30, 380, 'switch (day) {\n    case "Mon": startWeek(); break;\n    case "Wed": midweek();   break;\n    default:     otherDay();\n}', t * 10, { speed: 25, colors: [P.pink, P.green, P.cyan, P.text, P.faint] });
    txt(ctx, w/2, h - 18, "Only the matching case runs — use break to prevent fall-through", { sz: 9, c: P.faint, m: false });
  }

  function subBreakContinue(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Break & Continue — Loop Control", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 2);
    var cx = w / 2;
    if (phase === 0) {
      // Break demo
      txt(ctx, cx, 48, "BREAK: Exit Loop Early", { sz: 10, c: P.rose, w: "700" });
      // Loop iterations
      for (var i = 0; i < 5; i++) {
        var bx = 40 + i * 85;
        var stopped = i >= 3;
        var active = i === cyc(t, 0.8, 3);
        box(ctx, bx, 75, 72, 40, { stroke: stopped ? P.faint : (active ? P.cyan : P.border), glow: active ? P.cyan : null });
        txt(ctx, bx + 36, 90, "i = " + i, { sz: 10, c: stopped ? P.faint : (active ? P.cyan : P.dim) });
        if (i === 2 && !stopped) {
          txt(ctx, bx + 36, 105, "break!", { sz: 9, c: P.rose, w: "700" });
        }
        if (stopped) {
          txt(ctx, bx + 36, 90, "X", { sz: 16, c: P.rose });
        }
        if (i < 4) arrow(ctx, bx + 74, 95, bx + 79, 95, { c: stopped ? P.faint : P.faint, hd: 3 });
      }
      typewriter(ctx, 40, 140, 'for (let i = 0; i < 5; i++) {\n    if (i === 3) break;  // EXIT\n    console.log(i);  // 0, 1, 2\n}', t * 12, { speed: 35, colors: [P.cyan, P.rose, P.text, P.green] });
    } else {
      // Continue demo
      txt(ctx, cx, 48, "CONTINUE: Skip to Next Iteration", { sz: 10, c: P.amber, w: "700" });
      for (var j = 0; j < 5; j++) {
        var bx2 = 40 + j * 85;
        var skipped = j === 2;
        var active2 = j === cyc(t, 0.8, 5);
        box(ctx, bx2, 75, 72, 40, { stroke: skipped ? P.faint : (active2 ? P.cyan : P.border), glow: active2 ? P.cyan : null });
        txt(ctx, bx2 + 36, 90, "i = " + j, { sz: 10, c: skipped ? P.faint : (active2 ? P.cyan : P.dim) });
        if (skipped) {
          txt(ctx, bx2 + 36, 105, "skip!", { sz: 9, c: P.amber, w: "700" });
          // Arrow over the skipped
          ctx.beginPath();
          ctx.moveTo(bx2 + 10, 70);
          ctx.quadraticCurveTo(bx2 + 36, 50, bx2 + 70, 70);
          ctx.strokeStyle = P.amber;
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        if (j < 4) arrow(ctx, bx2 + 74, 95, bx2 + 79, 95, { c: P.faint, hd: 3 });
      }
      typewriter(ctx, 40, 140, 'for (let i = 0; i < 5; i++) {\n    if (i === 2) continue; // SKIP\n    console.log(i);  // 0,1,3,4\n}', t * 12, { speed: 35, colors: [P.cyan, P.amber, P.text, P.green] });
    }
    txt(ctx, w/2, h - 18, phase === 0 ? "break exits the loop entirely" : "continue skips to the next iteration", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ DATA STRUCTURES ═══════════════

  function subLinkedList(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Singly Linked List — Node → Next → Node → null", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 2.5) % 3;
    var nodes = [10, 20, 30, 40];
    var nodeW = 70, nodeH = 40, gap = 35;
    var startX = 30;
    var baseY = 120;

    for (var i = 0; i < nodes.length; i++) {
      var nx = startX + i * (nodeW + gap);
      box(ctx, nx, baseY, nodeW * 0.6, nodeH, { stroke: P.cyan, fill: P.panel });
      txt(ctx, nx + nodeW * 0.3, baseY + nodeH/2, String(nodes[i]), { sz: 13, c: P.cyan, w: "700" });
      box(ctx, nx + nodeW * 0.6, baseY, nodeW * 0.4, nodeH, { stroke: P.border });
      if (i < nodes.length - 1) {
        txt(ctx, nx + nodeW * 0.8, baseY + nodeH/2, "→", { sz: 14, c: P.green });
      } else {
        txt(ctx, nx + nodeW * 0.8, baseY + nodeH/2, "∅", { sz: 11, c: P.faint });
      }
      if (i < nodes.length - 1) {
        arrow(ctx, nx + nodeW + 2, baseY + nodeH/2, nx + nodeW + gap - 2, baseY + nodeH/2, { c: P.green, lw: 2, hd: 6 });
      }
      txt(ctx, nx + nodeW/2, baseY - 12, "node " + i, { sz: 8, c: P.faint });
    }

    arrow(ctx, startX + nodeW/2, baseY - 35, startX + nodeW/2, baseY - 5, { c: P.amber, lw: 2, hd: 5 });
    txt(ctx, startX + nodeW/2, baseY - 44, "HEAD", { sz: 10, c: P.amber, w: "700" });

    if (phase === 0) {
      var travIdx = Math.floor((t * 1.5) % nodes.length);
      var tx = startX + travIdx * (nodeW + gap) + nodeW/2;
      box(ctx, startX + travIdx * (nodeW + gap) - 3, baseY - 3, nodeW + 6, nodeH + 6, { stroke: P.amber, glow: P.amber, r: 10 });
      txt(ctx, tx, baseY + nodeH + 30, "→ Traversing: " + nodes[travIdx], { sz: 10, c: P.amber, w: "700" });
    } else if (phase === 1) {
      var insertX = startX + 1 * (nodeW + gap) - 15;
      var insertProgress = Math.min(1, (t % 2.5) / 2);
      var iy = lerp(baseY - 60, baseY, insertProgress);
      box(ctx, insertX, iy, nodeW * 0.6, nodeH, { stroke: P.pink, glow: P.pink });
      txt(ctx, insertX + nodeW * 0.3, iy + nodeH/2, "15", { sz: 13, c: P.pink, w: "700" });
      txt(ctx, insertX + nodeW/2, iy - 14, "INSERT", { sz: 9, c: P.pink, w: "700" });
      if (insertProgress > 0.5) {
        arrow(ctx, startX + nodeW, baseY + nodeH/2, insertX, iy + nodeH/2, { c: P.pink, lw: 2, hd: 5 });
        txt(ctx, w/2, baseY + nodeH + 50, "Insert 15: 10.next → 15, 15.next → 20", { sz: 10, c: P.pink });
      }
    } else {
      var delIdx = 1;
      var dx = startX + delIdx * (nodeW + gap) + nodeW/2;
      ctx.save();
      ctx.globalAlpha = 0.4 + Math.sin(t * 5) * 0.3;
      box(ctx, startX + delIdx * (nodeW + gap) - 3, baseY - 3, nodeW + 6, nodeH + 6, { stroke: P.rose, glow: P.rose, r: 10 });
      txt(ctx, dx, baseY + nodeH/2, "✕", { sz: 22, c: P.rose, w: "700" });
      ctx.restore();
      arrow(ctx, startX + nodeW, baseY + nodeH/2, startX + 2 * (nodeW + gap), baseY + nodeH/2, { c: P.rose, lw: 2, hd: 5 });
      txt(ctx, w/2, baseY + nodeH + 50, "Delete 20: 10.next → 30 (bypass node)", { sz: 10, c: P.rose });
    }

    box(ctx, 20, 220, w - 40, 50, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 235, "Singly: each node has data + pointer to next. Traversal is O(n).", { sz: 10, c: P.dim });
    txt(ctx, w/2, 252, "Insert/Delete at head: O(1) | at position: O(n)", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "Nodes connected by pointers — last node points to null", { sz: 9, c: P.faint, m: false });
  }

  function subStack(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Stack — LIFO (Last In, First Out)", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 2.5) % 3;
    var stackData = [10, 20, 30, 40];
    var cellW = 80, cellH = 36;
    var startX = w/2 - cellW/2;
    var baseY = 280;
    var stackH = stackData.length * (cellH + 4);

    ctx.beginPath();
    ctx.moveTo(startX - 10, baseY - stackH - 20);
    ctx.lineTo(startX - 10, baseY + 10);
    ctx.lineTo(startX + cellW + 10, baseY + 10);
    ctx.lineTo(startX + cellW + 10, baseY - stackH - 20);
    ctx.strokeStyle = P.dim;
    ctx.lineWidth = 2;
    ctx.stroke();

    for (var i = 0; i < stackData.length; i++) {
      var iy = baseY - (i + 1) * (cellH + 4);
      box(ctx, startX, iy, cellW, cellH, { stroke: i === stackData.length - 1 ? P.cyan : P.border, fill: P.panel2 });
      txt(ctx, startX + cellW/2, iy + cellH/2, String(stackData[i]), { sz: 13, c: i === stackData.length - 1 ? P.cyan : P.text, w: "700" });
      txt(ctx, startX + cellW + 20, iy + cellH/2, i === stackData.length - 1 ? "← TOP" : "", { sz: 9, c: P.amber, a: "left" });
    }

    if (phase === 0) {
      var pushProgress = Math.min(1, (t % 2.5) / 1.5);
      var py = lerp(baseY - stackH - 80, baseY - stackH - 4, pushProgress);
      box(ctx, startX, py, cellW, cellH, { stroke: P.green, glow: P.green });
      txt(ctx, startX + cellW/2, py + cellH/2, "50", { sz: 13, c: P.green, w: "700" });
      txt(ctx, startX + cellW + 20, py + cellH/2, "PUSH", { sz: 10, c: P.green, w: "700" });
      arrow(ctx, startX + cellW/2, py - 5, startX + cellW/2, py + cellH + 5, { c: P.green, lw: 2, hd: 5 });
    } else if (phase === 1) {
      var popProgress = Math.min(1, (t % 2.5) / 1.5);
      var topY = baseY - stackH - 4;
      var popY = lerp(topY, topY - 80, popProgress);
      ctx.globalAlpha = 1 - popProgress * 0.6;
      box(ctx, startX, popY, cellW, cellH, { stroke: P.rose, glow: P.rose });
      txt(ctx, startX + cellW/2, popY + cellH/2, "40", { sz: 13, c: P.rose, w: "700" });
      ctx.globalAlpha = 1;
      txt(ctx, startX + cellW + 20, popY + cellH/2, "POP", { sz: 10, c: P.rose, w: "700" });
    } else {
      var topIdx = stackData.length - 1;
      var topY2 = baseY - (topIdx + 1) * (cellH + 4);
      box(ctx, startX - 4, topY2 - 4, cellW + 8, cellH + 8, { stroke: P.amber, glow: P.amber, r: 10 });
      txt(ctx, startX + cellW/2, topY2 + cellH/2, "PEEK", { sz: 9, c: P.amber, w: "700" });
    }

    var infoX = startX + cellW + 60;
    box(ctx, infoX, baseY - 120, 160, 80, { r: 6, stroke: P.dim });
    txt(ctx, infoX + 80, baseY - 105, "Operations:", { sz: 10, c: P.text, w: "700" });
    txt(ctx, infoX + 10, baseY - 85, "push(x) — O(1) add to top", { sz: 9, c: P.green });
    txt(ctx, infoX + 10, baseY - 70, "pop() — O(1) remove top", { sz: 9, c: P.rose });
    txt(ctx, infoX + 10, baseY - 55, "peek() — O(1) view top", { sz: 9, c: P.amber });
    txt(ctx, infoX + 10, baseY - 40, " isEmpty() — O(1)", { sz: 9, c: P.dim });
    txt(ctx, w/2, h - 18, "LIFO — like a stack of plates, only access the top", { sz: 9, c: P.faint, m: false });
  }

  function subQueue(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Queue — FIFO (First In, First Out)", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 2.5) % 3;
    var queueData = [10, 20, 30, 40];
    var cellW = 60, cellH = 44, gap = 6;
    var totalW = queueData.length * (cellW + gap);
    var startX = (w - totalW) / 2;
    var baseY = 130;

    ctx.beginPath();
    ctx.moveTo(startX - 20, baseY - 8);
    ctx.lineTo(startX - 20, baseY + cellH + 8);
    ctx.lineTo(startX + totalW + 20, baseY + cellH + 8);
    ctx.lineTo(startX + totalW + 20, baseY - 8);
    ctx.strokeStyle = P.dim;
    ctx.lineWidth = 2;
    ctx.stroke();

    txt(ctx, startX, baseY - 22, "FRONT", { sz: 9, c: P.green, w: "700" });
    arrow(ctx, startX, baseY - 14, startX, baseY - 8, { c: P.green, lw: 1.5, hd: 4 });
    txt(ctx, startX + totalW, baseY - 22, "REAR", { sz: 9, c: P.amber, w: "700" });
    arrow(ctx, startX + totalW, baseY - 14, startX + totalW, baseY - 8, { c: P.amber, lw: 1.5, hd: 4 });

    for (var i = 0; i < queueData.length; i++) {
      var ix = startX + i * (cellW + gap);
      var isFront = i === 0;
      box(ctx, ix, baseY, cellW, cellH, { stroke: isFront ? P.green : P.border });
      txt(ctx, ix + cellW/2, baseY + cellH/2, String(queueData[i]), { sz: 13, c: isFront ? P.green : P.text, w: "700" });
    }

    if (phase === 0) {
      var ep = Math.min(1, (t % 2.5) / 1.5);
      var ex = lerp(startX + totalW + cellW + gap + 30, startX + totalW + gap, ep);
      box(ctx, ex, baseY, cellW, cellH, { stroke: P.cyan, glow: P.cyan });
      txt(ctx, ex + cellW/2, baseY + cellH/2, "50", { sz: 13, c: P.cyan, w: "700" });
      txt(ctx, ex + cellW/2, baseY + cellH + 20, "ENQUEUE", { sz: 10, c: P.cyan, w: "700" });
      arrow(ctx, ex + cellW + 10, baseY + cellH/2, ex - 5, baseY + cellH/2, { c: P.cyan, lw: 2, hd: 5 });
    } else if (phase === 1) {
      var dp = Math.min(1, (t % 2.5) / 1.5);
      var dx = lerp(startX, startX - cellW - 40, dp);
      ctx.globalAlpha = 1 - dp * 0.6;
      box(ctx, dx, baseY, cellW, cellH, { stroke: P.rose, glow: P.rose });
      txt(ctx, dx + cellW/2, baseY + cellH/2, "10", { sz: 13, c: P.rose, w: "700" });
      ctx.globalAlpha = 1;
      txt(ctx, dx + cellW/2, baseY + cellH + 20, "DEQUEUE", { sz: 10, c: P.rose, w: "700" });
      arrow(ctx, dx - 5, baseY + cellH/2, dx - cellW, baseY + cellH/2, { c: P.rose, lw: 2, hd: 5 });
    } else {
      box(ctx, startX - 4, baseY - 4, cellW + 8, cellH + 8, { stroke: P.amber, glow: P.amber, r: 10 });
      txt(ctx, startX + cellW/2, baseY + cellH/2 + cellH + 18, "PEEK: " + queueData[0], { sz: 10, c: P.amber, w: "700" });
    }

    box(ctx, 20, 230, w - 40, 70, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 248, "Operations:", { sz: 10, c: P.text, w: "700" });
    txt(ctx, w/2, 266, "enqueue(x) — O(1) add to rear  |  dequeue() — O(1) remove from front", { sz: 9, c: P.dim });
    txt(ctx, w/2, 284, "peek() — O(1) view front  |  Uses: BFS, print queue, task scheduling", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "FIFO — like a line at a store, first person served first", { sz: 9, c: P.faint, m: false });
  }

  function subBinaryTree(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Binary Search Tree — Left < Root < Right", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 3) % 3;

    var tree = [
      { val: 50, x: w/2, y: 65 },
      { val: 30, x: w/2-90, y: 135 },
      { val: 70, x: w/2+90, y: 135 },
      { val: 20, x: w/2-135, y: 205 },
      { val: 40, x: w/2-50, y: 205 },
      { val: 60, x: w/2+50, y: 205 },
      { val: 80, x: w/2+135, y: 205 }
    ];
    var edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

    for (var e = 0; e < edges.length; e++) {
      var p = tree[edges[e][0]], c = tree[edges[e][1]];
      arrow(ctx, p.x, p.y + 16, c.x, c.y - 16, { c: P.border, lw: 1.5, hd: 4 });
    }

    var highlightIdx = -1;
    if (phase === 0) {
      var inOrder = [3, 1, 4, 0, 5, 2, 6];
      var travStep = Math.floor((t * 1.5) % inOrder.length);
      highlightIdx = inOrder[travStep];
    }

    for (var i = 0; i < tree.length; i++) {
      var n = tree[i];
      var isHigh = i === highlightIdx;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = isHigh ? "rgba(252,211,77,0.2)" : P.panel2;
      ctx.fill();
      if (isHigh) { ctx.save(); ctx.shadowColor = P.amber; ctx.shadowBlur = 12; }
      ctx.strokeStyle = isHigh ? P.amber : P.cyan;
      ctx.lineWidth = 2;
      ctx.stroke();
      if (isHigh) ctx.restore();
      txt(ctx, n.x, n.y, String(n.val), { sz: 11, c: isHigh ? P.amber : P.cyan, w: "700" });
    }

    if (phase === 0) {
      var inOrderVals = [20, 30, 40, 50, 60, 70, 80];
      var step = Math.floor((t * 1.5) % inOrder.length);
      txt(ctx, w/2, 260, "In-order traversal: " + inOrderVals.slice(0, step + 1).join(" → ") + " → ...", { sz: 10, c: P.amber });
    } else if (phase === 1) {
      txt(ctx, w/2, 260, "BST Property: left child < parent < right child", { sz: 10, c: P.cyan });
    } else {
      txt(ctx, w/2, 260, "Search: O(log n) average | Worst: O(n) if unbalanced", { sz: 10, c: P.green });
    }

    box(ctx, 20, 285, w - 40, 50, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 300, "Traversals: In-order (sorted) | Pre-order | Post-order | Level-order", { sz: 9, c: P.dim });
    txt(ctx, w/2, 318, "Insert/Delete: O(log n) average | Used in: databases, file systems, heaps", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "Each node has at most 2 children — left < parent < right", { sz: 9, c: P.faint, m: false });
  }

  function subHashTable(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Hash Table — Key → Hash → Bucket (O(1) lookup)", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 3) % 3;

    var buckets = [
      { idx: 0, items: ["age:25"] },
      { idx: 1, items: [] },
      { idx: 2, items: ["name:Jay", "user:Sam"] },
      { idx: 3, items: ["city:NYC"] },
      { idx: 4, items: [] },
      { idx: 5, items: ["email:j@x.com"] }
    ];

    var bucketW = 70, bucketH = 40, gap = 8;
    var startX = (w - buckets.length * (bucketW + gap)) / 2;
    var baseY = 100;

    for (var i = 0; i < buckets.length; i++) {
      var bx = startX + i * (bucketW + gap);
      var b = buckets[i];
      var hasCollision = b.items.length > 1;
      box(ctx, bx, baseY, bucketW, bucketH, { stroke: hasCollision ? P.rose : P.border });
      txt(ctx, bx + bucketW/2, baseY + 12, "[" + i + "]", { sz: 8, c: P.faint });

      for (var j = 0; j < b.items.length; j++) {
        var itemY = baseY + 20 + j * 20;
        txt(ctx, bx + bucketW/2, itemY + 8, b.items[j], { sz: 8, c: hasCollision ? P.rose : P.cyan });
      }
    }

    if (phase === 0) {
      var key = "name";
      var hashVal = 2;
      box(ctx, 30, 190, 100, 36, { stroke: P.amber, glow: P.amber });
      txt(ctx, 80, 208, '"' + key + '"', { sz: 11, c: P.amber, w: "700" });
      box(ctx, 160, 190, 100, 36, { stroke: P.cyan });
      txt(ctx, 210, 208, "hash()", { sz: 11, c: P.cyan });
      arrow(ctx, 260, 208, startX + hashVal * (bucketW + gap) + bucketW/2, baseY + bucketH + 5, { c: P.amber, lw: 2, hd: 6 });
      box(ctx, startX + hashVal * (bucketW + gap) - 3, baseY - 3, bucketW + 6, bucketH + 6, { stroke: P.amber, glow: P.amber, r: 8 });
      txt(ctx, w/2, 250, 'hash("name") = hash(name) % 6 = 2', { sz: 10, c: P.amber });
    } else if (phase === 1) {
      box(ctx, 30, 190, w - 60, 50, { r: 6, stroke: P.rose });
      txt(ctx, w/2, 205, "COLLISION: 'name' and 'user' both hash to index 2!", { sz: 10, c: P.rose, w: "700" });
      txt(ctx, w/2, 222, "Resolution: Chaining (linked list at each bucket)", { sz: 9, c: P.dim });
      box(ctx, startX + 2 * (bucketW + gap) - 3, baseY - 3, bucketW + 6, bucketH + 6, { stroke: P.rose, glow: P.rose, r: 8 });
    } else {
      txt(ctx, w/2, 210, "Lookup: O(1) average | Insert: O(1) average", { sz: 11, c: P.green, w: "700" });
      txt(ctx, w/2, 232, "Worst case O(n) if many collisions — keep load factor < 0.75", { sz: 9, c: P.dim });
    }

    txt(ctx, w/2, h - 18, "Hash function maps keys to array indices for instant access", { sz: 9, c: P.faint, m: false });
  }

  function subHeap(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Min-Heap — Parent ≤ Children", { sz: 12, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 3) % 3;

    var heapVals = [2, 5, 8, 12, 7, 10, 15];
    var positions = [
      { x: w/2, y: 65 },
      { x: w/2-80, y: 135 }, { x: w/2+80, y: 135 },
      { x: w/2-120, y: 205 }, { x: w/2-40, y: 205 },
      { x: w/2+40, y: 205 }, { x: w/2+120, y: 205 }
    ];
    var parentOf = function(i) { return Math.floor((i-1)/2); };

    for (var i = 1; i < heapVals.length; i++) {
      var p = positions[parentOf(i)], c = positions[i];
      arrow(ctx, p.x, p.y + 16, c.x, c.y - 16, { c: P.border, lw: 1.5, hd: 4 });
    }

    for (var j = 0; j < heapVals.length; j++) {
      var pp = positions[j];
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = P.panel2;
      ctx.fill();
      ctx.strokeStyle = j === 0 ? P.amber : P.cyan;
      ctx.lineWidth = 2;
      ctx.stroke();
      txt(ctx, pp.x, pp.y, String(heapVals[j]), { sz: 11, c: j === 0 ? P.amber : P.cyan, w: "700" });
    }

    txt(ctx, w/2, 42, "ROOT (minimum)", { sz: 9, c: P.amber, w: "700" });

    if (phase === 0) {
      txt(ctx, w/2, 260, "Insert 1: add at end, bubble up comparing with parent", { sz: 10, c: P.green });
    } else if (phase === 1) {
      txt(ctx, w/2, 260, "Extract min: remove root, move last to root, sink down", { sz: 10, c: P.rose });
    } else {
      txt(ctx, w/2, 260, "Heap property: parent ≤ both children (min-heap)", { sz: 10, c: P.cyan });
    }

    box(ctx, 20, 285, w - 40, 50, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 300, "Insert: O(log n) | Extract min: O(log n) | Peek: O(1)", { sz: 9, c: P.dim });
    txt(ctx, w/2, 318, "Used in: priority queues, heap sort, Dijkstra's algorithm", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "Complete binary tree with heap property maintained", { sz: 9, c: P.faint, m: false });
  }

  function subGraph(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Graph — BFS Traversal", { sz: 12, c: P.cyan, w: "700" });

    var graphNodes = [
      { val: "A", x: w/2, y: 70 },
      { val: "B", x: w/2-100, y: 140 },
      { val: "C", x: w/2+100, y: 140 },
      { val: "D", x: w/2-140, y: 220 },
      { val: "E", x: w/2-20, y: 220 },
      { val: "F", x: w/2+100, y: 220 }
    ];
    var graphEdges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,4]];

    var bfsOrder = [0, 1, 2, 3, 4, 5];
    var bfsStep = Math.floor((t * 1.2) % bfsOrder.length);
    var visited = bfsOrder.slice(0, bfsStep + 1);

    for (var e = 0; e < graphEdges.length; e++) {
      var n1 = graphNodes[graphEdges[e][0]], n2 = graphNodes[graphEdges[e][1]];
      var bothVisited = visited.indexOf(graphEdges[e][0]) !== -1 && visited.indexOf(graphEdges[e][1]) !== -1;
      arrow(ctx, n1.x, n1.y, n2.x, n2.y, { c: bothVisited ? P.green : P.border, lw: bothVisited ? 2 : 1.5, hd: 5 });
    }

    for (var i = 0; i < graphNodes.length; i++) {
      var gn = graphNodes[i];
      var isVisited = visited.indexOf(i) !== -1;
      var isCurrent = i === bfsOrder[bfsStep];
      ctx.beginPath();
      ctx.arc(gn.x, gn.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = isCurrent ? "rgba(252,211,77,0.2)" : (isVisited ? "rgba(74,222,128,0.15)" : P.panel2);
      ctx.fill();
      if (isCurrent) { ctx.save(); ctx.shadowColor = P.amber; ctx.shadowBlur = 12; }
      ctx.strokeStyle = isCurrent ? P.amber : (isVisited ? P.green : P.border);
      ctx.lineWidth = 2;
      ctx.stroke();
      if (isCurrent) ctx.restore();
      txt(ctx, gn.x, gn.y, gn.val, { sz: 12, c: isCurrent ? P.amber : (isVisited ? P.green : P.text), w: "700" });
    }

    txt(ctx, 30, 260, "BFS Queue:", { sz: 10, c: P.text, w: "700" });
    var queueItems = bfsOrder.slice(bfsStep + 1, bfsStep + 4);
    for (var q = 0; q < queueItems.length; q++) {
      box(ctx, 110 + q * 40, 250, 36, 24, { stroke: P.cyan });
      txt(ctx, 110 + q * 40 + 18, 262, graphNodes[queueItems[q]].val, { sz: 10, c: P.cyan });
    }

    txt(ctx, w/2, 290, "Visited: " + visited.map(function(v) { return graphNodes[v].val; }).join(" → "), { sz: 10, c: P.green, w: "700" });

    box(ctx, 20, 315, w - 40, 40, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 335, "BFS uses queue (FIFO) | DFS uses stack (LIFO) | O(V + E)", { sz: 9, c: P.dim });
    txt(ctx, w/2, h - 18, "Nodes = vertices, Lines = edges — traverse level by level (BFS)", { sz: 9, c: P.faint, m: false });
  }

  function subDoublyLinkedList(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Doubly Linked List — prev ⇄ data ⇄ next", { sz: 12, c: P.cyan, w: "700" });
    var nodes = [10, 20, 30];
    var cellW = 24, dataW = 40, totalNodeW = cellW + dataW + cellW;
    var gap = 30;
    var startX = 30;
    var baseY = 110;
    var phase = Math.floor(t / 3) % 3;

    for (var i = 0; i < nodes.length; i++) {
      var nx = startX + i * (totalNodeW + gap);
      box(ctx, nx, baseY, cellW, 36, { stroke: P.dim });
      txt(ctx, nx + cellW/2, baseY + 18, i === 0 ? "∅" : "←", { sz: 10, c: i === 0 ? P.faint : P.green });
      box(ctx, nx + cellW, baseY, dataW, 36, { stroke: P.cyan });
      txt(ctx, nx + cellW + dataW/2, baseY + 18, String(nodes[i]), { sz: 13, c: P.cyan, w: "700" });
      box(ctx, nx + cellW + dataW, baseY, cellW, 36, { stroke: P.dim });
      txt(ctx, nx + cellW + dataW + cellW/2, baseY + 18, i === nodes.length-1 ? "∅" : "→", { sz: 10, c: i === nodes.length-1 ? P.faint : P.green });
      if (i < nodes.length - 1) {
        var ax1 = nx + totalNodeW + 2;
        var ax2 = nx + totalNodeW + gap - 2;
        arrow(ctx, ax1, baseY + 10, ax2, baseY + 10, { c: P.green, lw: 2, hd: 5 });
        arrow(ctx, ax2, baseY + 26, ax1, baseY + 26, { c: P.orange, lw: 2, hd: 5 });
      }
    }

    arrow(ctx, startX + totalNodeW/2, baseY - 30, startX + totalNodeW/2, baseY - 5, { c: P.amber, lw: 2, hd: 5 });
    txt(ctx, startX + totalNodeW/2, baseY - 38, "HEAD", { sz: 10, c: P.amber, w: "700" });

    if (phase === 0) {
      var idx = Math.floor((t * 1.2) % nodes.length);
      var nx2 = startX + idx * (totalNodeW + gap);
      box(ctx, nx2 - 2, baseY - 2, totalNodeW + 4, 40, { stroke: P.amber, glow: P.amber, r: 8 });
      txt(ctx, w/2, baseY + 55, "→ Forward traversal: visit " + nodes[idx], { sz: 10, c: P.amber });
    } else if (phase === 1) {
      var idx2 = nodes.length - 1 - Math.floor((t * 1.2) % nodes.length);
      var nx3 = startX + idx2 * (totalNodeW + gap);
      box(ctx, nx3 - 2, baseY - 2, totalNodeW + 4, 40, { stroke: P.orange, glow: P.orange, r: 8 });
      txt(ctx, w/2, baseY + 55, "← Backward traversal: visit " + nodes[idx2], { sz: 10, c: P.orange });
    } else {
      var insX = startX + 2 * (totalNodeW + gap) - 10;
      var ip = Math.min(1, (t % 3) / 2);
      var iy = lerp(baseY - 70, baseY, ip);
      box(ctx, insX, iy, totalNodeW, 36, { stroke: P.pink, glow: P.pink });
      txt(ctx, insX + totalNodeW/2, iy + 18, "25", { sz: 13, c: P.pink, w: "700" });
      txt(ctx, insX + totalNodeW/2, iy - 12, "INSERT", { sz: 9, c: P.pink, w: "700" });
    }

    box(ctx, 20, 190, w - 40, 46, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 205, "Doubly: traverse forward AND backward. Each node has prev + next.", { sz: 10, c: P.dim });
    txt(ctx, w/2, 222, "Delete at any position: O(1) if you have the node reference", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "Bidirectional traversal — useful for LRU caches, browser history", { sz: 9, c: P.faint, m: false });
  }

  function subCircularLinkedList(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Circular Linked List — Last → First (no null)", { sz: 12, c: P.cyan, w: "700" });
    var nodes = [10, 20, 30, 40, 50];
    var n = nodes.length;
    var cx = w / 2, cy = 180;
    var radius = 100;
    var nodeR = 24;

    var positions = [];
    for (var i = 0; i < n; i++) {
      var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      positions.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius
      });
    }

    for (var i = 0; i < n; i++) {
      var next = (i + 1) % n;
      var px = positions[i].x, py = positions[i].y;
      var nxx = positions[next].x, nyy = positions[next].y;
      var dx = nxx - px, dy = nyy - py;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var ux = dx/dist, uy = dy/dist;
      arrow(ctx, px + ux * (nodeR + 4), py + uy * (nodeR + 4),
                nxx - ux * (nodeR + 4), nyy - uy * (nodeR + 4),
                { c: P.green, lw: 2, hd: 6 });
    }

    for (var j = 0; j < n; j++) {
      ctx.beginPath();
      ctx.arc(positions[j].x, positions[j].y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = P.panel2;
      ctx.fill();
      ctx.strokeStyle = P.cyan;
      ctx.lineWidth = 2;
      ctx.stroke();
      txt(ctx, positions[j].x, positions[j].y, String(nodes[j]), { sz: 12, c: P.cyan, w: "700" });
    }

    var travIdx = Math.floor(t * 1.5) % n;
    ctx.beginPath();
    ctx.arc(positions[travIdx].x, positions[travIdx].y, nodeR + 5, 0, Math.PI * 2);
    ctx.strokeStyle = P.amber;
    ctx.lineWidth = 3;
    ctx.save(); ctx.shadowColor = P.amber; ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.restore();
    txt(ctx, w/2, cy + radius + 50, "Traversing: " + nodes[travIdx] + " → " + nodes[(travIdx + 1) % n], { sz: 10, c: P.amber, w: "700" });

    var last = positions[n-1], first = positions[0];
    txt(ctx, (last.x + first.x) / 2 - 30, (last.y + first.y) / 2 - 20, "last→first!", { sz: 9, c: P.rose, w: "700" });

    box(ctx, 20, 310, w - 40, 46, { r: 6, stroke: P.dim });
    txt(ctx, w/2, 325, "Circular: no null terminator. Last node points back to head.", { sz: 10, c: P.dim });
    txt(ctx, w/2, 342, "Useful for: round-robin scheduling, music playlists, Josephus problem", { sz: 9, c: P.faint });
    txt(ctx, w/2, h - 18, "Complete cycle — no beginning or end", { sz: 9, c: P.faint, m: false });
  }

  function subQueueCircular(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Circular Queue — Ring Buffer", { sz: 12, c: P.cyan, w: "700" });
    var slots = 6;
    var cx = w/2, cy = 160, radius = 90;
    var slotW = 40;
    var front = 1, rear = 4;

    for (var i = 0; i < slots; i++) {
      var angle = (i / slots) * Math.PI * 2 - Math.PI/2;
      var sx = cx + Math.cos(angle) * radius;
      var sy = cy + Math.sin(angle) * radius;
      var isFilled = (front <= rear) ? (i >= front && i <= rear) : (i >= front || i <= rear);
      var isFront = i === front;
      var isRear = i === rear;
      ctx.beginPath();
      ctx.arc(sx, sy, slotW/2, 0, Math.PI * 2);
      ctx.fillStyle = isFilled ? P.panel2 : "rgba(34,49,81,0.2)";
      ctx.fill();
      ctx.strokeStyle = isFront ? P.green : (isRear ? P.amber : (isFilled ? P.cyan : P.border));
      ctx.lineWidth = 2;
      ctx.stroke();
      txt(ctx, sx, sy, "[" + i + "]", { sz: 8, c: P.faint });
      if (isFront) txt(ctx, sx, sy - slotW/2 - 12, "F", { sz: 9, c: P.green, w: "700" });
      if (isRear) txt(ctx, sx, sy + slotW/2 + 12, "R", { sz: 9, c: P.amber, w: "700" });
    }

    txt(ctx, w/2, cy + radius + 40, "Circular: wraps around — no wasted space like linear queue", { sz: 10, c: P.dim });
    txt(ctx, w/2, h - 18, "Ring buffer — efficient for fixed-size queues (buffers, streaming)", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ FUNCTIONS ═══════════════

  function subFunctionDeclaration(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Function Declaration — Named Reusable Block", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    // Function box
    box(ctx, 40, 65, w - 80, 180, { r: 12, stroke: P.cyan });
    // Header
    box(ctx, 40, 65, w - 80, 40, { r: 12, fill: P.cyan + "22", stroke: P.cyan });
    txt(ctx, cx, 85, "function greet(name)", { sz: 13, c: P.cyan, w: "700" });
    // Parts
    box(ctx, 60, 120, 110, 36, { stroke: P.pink });
    txt(ctx, 115, 138, 'name (param)', { sz: 9, c: P.pink });
    arrow(ctx, 175, 138, 200, 138, { c: P.faint, hd: 4 });
    box(ctx, 205, 120, 160, 36, { stroke: P.green });
    txt(ctx, 285, 138, '"Hello, " + name', { sz: 9, c: P.green });
    arrow(ctx, 285, 158, 285, 175, { c: P.faint, hd: 4 });
    box(ctx, 230, 178, 110, 36, { stroke: P.amber });
    txt(ctx, 285, 196, 'return result', { sz: 9, c: P.amber });
    // Labels
    txt(ctx, 60, 108, "PARAMETERS", { sz: 8, c: P.faint, a: "left" });
    txt(ctx, 205, 108, "BODY", { sz: 8, c: P.faint, a: "left" });
    // Call
    box(ctx, 40, 265, w - 80, 50, { stroke: P.orange, glow: P.orange });
    txt(ctx, cx, 282, "greet('Alice')  →  'Hello, Alice!'", { sz: 11, c: P.orange, w: "600" });
    txt(ctx, cx, 302, "Call the function with an argument", { sz: 9, c: P.faint });
    typewriter(ctx, 40, 340, 'function greet(name) {\n    return "Hello, " + name;\n}\nconsole.log(greet("Alice"));', t * 10, { speed: 30, colors: [P.cyan, P.green, P.text, P.orange] });
    txt(ctx, cx, h - 18, "Functions encapsulate reusable logic — define once, call many times", { sz: 9, c: P.faint, m: false });
  }

  function subParameters(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Parameters vs Arguments", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    // Function definition
    box(ctx, 40, 65, w - 80, 50, { stroke: P.cyan });
    txt(ctx, cx, 80, "function add(a, b) { ... }", { sz: 12, c: P.cyan, w: "600" });
    txt(ctx, cx, 100, "↑ PARAMETERS (placeholders)", { sz: 9, c: P.faint });
    // Arguments flowing in
    var phase = cyc(t, 2, 3);
    var argSets = [
      [{ val: "3", color: P.green }, { val: "5", color: P.pink }],
      [{ val: "10", color: P.green }, { val: "20", color: P.pink }],
      [{ val: '"hi"', color: P.green }, { val: '"!"', color: P.pink }]
    ];
    var args = argSets[phase];
    // Animated arrows from args to params
    dataArrow(ctx, cx - 60, 160, cx - 30, 115, t, P.green, args[0].val);
    dataArrow(ctx, cx + 60, 160, cx + 30, 115, t + 0.5, P.pink, args[1].val);
    // Argument boxes
    box(ctx, cx - 100, 145, 80, 36, { stroke: P.green });
    txt(ctx, cx - 60, 163, "add(" + args[0].val, { sz: 11, c: P.green, w: "600" });
    box(ctx, cx + 20, 145, 80, 36, { stroke: P.pink });
    txt(ctx, cx + 60, 163, args[1].val + ")", { sz: 11, c: P.pink, w: "600" });
    txt(ctx, cx, 195, "↑ ARGUMENTS (actual values)", { sz: 9, c: P.faint });
    // Result
    box(ctx, cx - 60, 220, 120, 40, { stroke: P.amber, glow: P.amber });
    var result = phase === 2 ? '"hi!"' : String(parseInt(args[0].val) + parseInt(args[1].val));
    txt(ctx, cx, 240, "→ " + result, { sz: 14, c: P.amber, w: "700" });
    typewriter(ctx, 40, 290, '// a, b are PARAMETERS\nfunction add(a, b) { return a + b; }\n\n// 3, 5 are ARGUMENTS\nadd(3, 5); // → 8', t * 10, { speed: 30, colors: [P.faint, P.cyan, P.text, P.faint, P.green, P.pink, P.amber] });
    txt(ctx, cx, h - 18, "Parameters are placeholders; Arguments are the values you pass in", { sz: 9, c: P.faint, m: false });
  }

  function subRecursion(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Recursion — Function Calling Itself", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var phase = cyc(t, 4, 4);
    // Stack frames growing
    var frames = ["factorial(5)", "factorial(4)", "factorial(3)", "factorial(2)", "factorial(1)"];
    var visible = phase + 1;
    // Stack visualization
    box(ctx, 30, 55, w * 0.45, h - 90, { r: 10, stroke: P.blue });
    txt(ctx, 30 + w * 0.225, 70, "CALL STACK", { sz: 9, c: P.blue, w: "700" });
    for (var i = 0; i < visible && i < frames.length; i++) {
      var fy = h - 60 - (i + 1) * 44;
      var isTop = i === visible - 1;
      var baseCase = i === frames.length - 1 && phase >= 3;
      box(ctx, 40, fy, w * 0.45 - 20, 38, {
        stroke: baseCase ? P.green : (isTop ? P.cyan : P.border),
        glow: isTop ? (baseCase ? P.green : P.cyan) : null
      });
      txt(ctx, 30 + w * 0.225, fy + 19, frames[i], { sz: 10, c: baseCase ? P.green : (isTop ? P.cyan : P.dim) });
    }
    // Right side: calculation
    var rightX = 30 + w * 0.45 + 20;
    var rightW = w - rightX - 30;
    box(ctx, rightX, 55, rightW, h - 90, { r: 10, stroke: P.amber });
    txt(ctx, rightX + rightW / 2, 70, "CALCULATION", { sz: 9, c: P.amber, w: "700" });
    if (phase >= 3) {
      var calcLines = [
        "factorial(1) = 1",
        "factorial(2) = 2 × 1 = 2",
        "factorial(3) = 3 × 2 = 6",
        "factorial(4) = 4 × 6 = 24",
        "factorial(5) = 5 × 24 = 120"
      ];
      for (var j = 0; j < Math.min(phase - 2, 5); j++) {
        txt(ctx, rightX + 16, 100 + j * 28, calcLines[j], { sz: 10, c: j === 0 ? P.green : P.text, a: "left", m: false });
      }
    }
    typewriter(ctx, rightX + 10, 260, 'function factorial(n) {\n    if (n <= 1) return 1;\n    return n * factorial(n-1);\n}', t * 10, { speed: 30, colors: [P.cyan, P.green, P.amber] });
    txt(ctx, cx, h - 18, "Each call adds a stack frame until base case, then unwinds", { sz: 9, c: P.faint, m: false });
  }

  function subScope(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Function Scope — Local vs Global", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // Global scope (outer box)
    box(ctx, 30, 55, w - 60, h - 90, { r: 12, stroke: P.cyan });
    txt(ctx, cx, 70, "GLOBAL SCOPE", { sz: 10, c: P.cyan, w: "700" });
    // Global variable
    memBox(ctx, 50, 90, 130, 36, "global x", "10", P.cyan, phase >= 0);
    // Function scope
    box(ctx, 50, 145, w - 100, 130, { r: 10, stroke: P.green });
    txt(ctx, cx, 160, "FUNCTION SCOPE — greet()", { sz: 9, c: P.green, w: "700" });
    // Local variable
    memBox(ctx, 70, 180, 120, 36, "local name", '"Jay"', P.green, phase >= 1);
    // Access from inside
    if (phase >= 2) {
      box(ctx, 220, 180, w - 280, 36, { stroke: P.amber });
      txt(ctx, 220 + (w - 280) / 2, 198, "CAN access global x", { sz: 10, c: P.amber });
    }
    // Blocked access
    if (phase === 2) {
      box(ctx, 70, 230, 160, 36, { stroke: P.rose });
      txt(ctx, 150, 248, "x can't see 'name'", { sz: 10, c: P.rose });
    }
    typewriter(ctx, 50, 295, 'let x = 10;          // global\n\nfunction greet() {\n    let name = "Jay"; // local\n    console.log(x);   // OK!\n}\n\nconsole.log(name); // ERROR!', t * 10, { speed: 28, colors: [P.cyan, P.text, P.cyan, P.green, P.amber, P.text, P.rose] });
    txt(ctx, cx, h - 18, "Inner scopes can see outer — outer cannot see inner", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ VARIABLES ═══════════════

  function subVarDeclaration(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Variable Declaration — Naming a Value", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 2.5, 3);
    var cx = w / 2;
    // Memory allocation visual
    var vars = [
      { name: "age", value: "25", type: "int", color: P.cyan },
      { name: "name", value: '"Jay"', type: "string", color: P.pink },
      { name: "active", value: "true", type: "bool", color: P.amber }
    ];
    vars.forEach(function(v, i) {
      var vy = 65 + i * 70;
      var on = i === phase;
      // Type label
      box(ctx, 40, vy, 80, 50, { stroke: on ? v.color : P.border, glow: on ? v.color : null });
      txt(ctx, 80, vy + 16, v.type, { sz: 10, c: on ? v.color : P.dim, w: "700" });
      txt(ctx, 80, vy + 36, v.name, { sz: 11, c: on ? v.color : P.text, w: "600" });
      // Arrow to memory
      arrow(ctx, 122, vy + 25, 170, vy + 25, { c: on ? v.color : P.faint });
      // Memory box
      memBox(ctx, 175, vy, 100, 50, v.type + " memory", v.value, v.color, on);
      // Assignment
      if (on) {
        box(ctx, 300, vy, 150, 50, { stroke: v.color, glow: v.color });
        txt(ctx, 375, vy + 18, v.name + " = " + v.value, { sz: 11, c: v.color, w: "600" });
        txt(ctx, 375, vy + 36, "declared & assigned", { sz: 9, c: P.faint });
      }
    });
    typewriter(ctx, 40, 290, 'int age = 25;          // integer\nstring name = "Jay";   // text\nbool active = true;    // boolean', t * 10, { speed: 30, colors: [P.cyan, P.pink, P.amber] });
    txt(ctx, cx, h - 18, "Declaration = type + name + value stored in memory", { sz: 9, c: P.faint, m: false });
  }

  function subVarScope(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Variable Scope — Where Variables Are Visible", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // Outer block (global)
    box(ctx, 30, 55, w - 60, h - 85, { r: 12, stroke: P.cyan });
    txt(ctx, cx, 70, "Global Scope", { sz: 10, c: P.cyan, w: "700" });
    memBox(ctx, 50, 88, 140, 32, "x", "10 (global)", P.cyan, true);
    // Function block
    box(ctx, 50, 135, w - 100, 100, { r: 10, stroke: P.green });
    txt(ctx, cx, 150, "Function Scope", { sz: 9, c: P.green, w: "700" });
    memBox(ctx, 70, 170, 120, 32, "x", "20 (local)", P.green, phase >= 1);
    txt(ctx, 220, 186, "← Shadows global x", { sz: 9, c: P.amber, a: "left" });
    // If block inside
    if (phase >= 2) {
      box(ctx, 70, 210, 200, 60, { r: 8, stroke: P.pink });
      txt(ctx, 170, 226, "Block Scope (if)", { sz: 8, c: P.pink, w: "700" });
      memBox(ctx, 80, 238, 100, 26, "y", "5", P.pink, true);
      txt(ctx, 210, 251, "y only visible here", { sz: 8, c: P.faint, a: "left" });
    }
    typewriter(ctx, 40, phase >= 2 ? 300 : 270, 'let x = 10;       // global\nfunction test() {\n    let x = 20;   // local shadows!\n    if (true) {\n        let y = 5; // block scope\n    }\n    // y doesn\'t exist here\n}', t * 10, { speed: 25, colors: [P.cyan, P.text, P.green, P.text, P.pink, P.text, P.rose] });
    txt(ctx, cx, h - 18, "Variables are only visible within their declaring block", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ SORTING ═══════════════

  function renderSortVis(ctx, w, h, t, steps, title, codeStr, complexity) {
    var cx = w / 2;
    txt(ctx, cx, 18, title, { sz: 13, c: P.cyan, w: "700" });

    var stepIdx = Math.floor(t * 2.5) % steps.length;
    var step = steps[stepIdx];
    var arr = step.arr;
    var n = arr.length;
    var maxVal = 9;
    var barW = Math.min(50, (w - 80) / n - 8);
    var gap = 8;
    var totalW = n * (barW + gap) - gap;
    var startX = (w - totalW) / 2;
    var baseY = 300;
    var maxBarH = 200;

    box(ctx, 20, 40, w - 40, 36, { stroke: P.dim });
    txt(ctx, cx, 58, "Step " + (stepIdx + 1) + "/" + steps.length + " — " + (step.msg || ""), { sz: 10, c: P.dim });

    for (var i = 0; i < n; i++) {
      var bx = startX + i * (barW + gap);
      var barH = (arr[i] / maxVal) * maxBarH;
      var isComparing = step.cmp && (step.cmp[0] === i || step.cmp[1] === i);
      var isSorted = step.sorted && step.sorted.indexOf(i) !== -1;
      var color = isComparing ? P.amber : (isSorted ? P.green : P.border);
      var glow = isComparing ? P.amber : (isSorted ? P.green : null);

      rr(ctx, bx, baseY - barH, barW, barH, 4);
      ctx.fillStyle = isComparing ? "rgba(252,211,77,0.3)" : (isSorted ? "rgba(74,222,128,0.15)" : "rgba(34,49,81,0.5)");
      ctx.fill();
      if (glow) { ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = 12; }
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      if (glow) ctx.restore();

      txt(ctx, bx + barW / 2, baseY - barH / 2, String(arr[i]), { sz: 14, c: color, w: "700" });
      txt(ctx, bx + barW / 2, baseY + 14, "[" + i + "]", { sz: 8, c: P.faint });
    }

    if (step.cmp && step.cmp[0] >= 0 && step.cmp[1] >= 0) {
      var x1 = startX + step.cmp[0] * (barW + gap) + barW / 2;
      var x2 = startX + step.cmp[1] * (barW + gap) + barW / 2;
      txt(ctx, (x1 + x2) / 2, baseY + 32, "compare", { sz: 9, c: P.amber, w: "700" });
      arrow(ctx, x1, baseY + 24, x2, baseY + 24, { c: P.amber, lw: 1.5, hd: 4 });
    }

    typewriter(ctx, 20, 340, codeStr, t * 10, { speed: 25 });
    txt(ctx, cx, h - 18, complexity, { sz: 9, c: P.faint, m: false });
  }

  function bubbleSortSteps(input) {
    var arr = input.slice(), steps = [], sorted = [];
    steps.push({ arr: arr.slice(), cmp: null, sorted: sorted.slice(), msg: "Unsorted array — ready to bubble!" });
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - 1 - i; j++) {
        steps.push({ arr: arr.slice(), cmp: [j, j+1], sorted: sorted.slice(), msg: "Compare arr[" + j + "]=" + arr[j] + " and arr[" + (j+1) + "]=" + arr[j+1] });
        if (arr[j] > arr[j+1]) {
          var tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
          steps.push({ arr: arr.slice(), cmp: [j, j+1], sorted: sorted.slice(), msg: "SWAP! " + arr[j+1] + " > " + arr[j] });
        }
      }
      sorted.unshift(arr.length - 1 - i);
      steps.push({ arr: arr.slice(), cmp: null, sorted: sorted.slice(), msg: "Pass " + (i+1) + " done — " + arr[arr.length-1-i] + " is in place" });
    }
    steps.push({ arr: arr.slice(), cmp: null, sorted: Array.from({length:arr.length}, function(_,i){return i}), msg: "SORTED!" });
    return steps;
  }

  function selectionSortSteps(input) {
    var arr = input.slice(), steps = [], sorted = [];
    steps.push({ arr: arr.slice(), cmp: null, sorted: [], msg: "Unsorted array — find minimum each pass" });
    for (var i = 0; i < arr.length - 1; i++) {
      var minIdx = i;
      for (var j = i + 1; j < arr.length; j++) {
        steps.push({ arr: arr.slice(), cmp: [minIdx, j], sorted: sorted.slice(), msg: "Compare min=" + arr[minIdx] + " with arr[" + j + "]=" + arr[j] });
        if (arr[j] < arr[minIdx]) { minIdx = j; }
      }
      if (minIdx !== i) {
        var tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
        steps.push({ arr: arr.slice(), cmp: [i, minIdx], sorted: sorted.slice(), msg: "SWAP minimum " + arr[minIdx] + " to position " + i });
      }
      sorted.push(i);
      steps.push({ arr: arr.slice(), cmp: null, sorted: sorted.slice(), msg: arr[i] + " placed at position " + i });
    }
    sorted.push(arr.length - 1);
    steps.push({ arr: arr.slice(), cmp: null, sorted: sorted.slice(), msg: "SORTED!" });
    return steps;
  }

  function insertionSortSteps(input) {
    var arr = input.slice(), steps = [];
    steps.push({ arr: arr.slice(), cmp: null, sorted: [0], msg: "Start with first element sorted" });
    for (var i = 1; i < arr.length; i++) {
      var key = arr[i], j = i - 1;
      steps.push({ arr: arr.slice(), cmp: [i, j], sorted: [], msg: "Pick arr[" + i + "]=" + key + ", compare with sorted portion" });
      while (j >= 0 && arr[j] > key) {
        steps.push({ arr: arr.slice(), cmp: [j, j+1], sorted: [], msg: arr[j] + " > " + key + " — shift right" });
        arr[j + 1] = arr[j]; j--;
        steps.push({ arr: arr.slice(), cmp: [j+1, j+2], sorted: [], msg: "Shifted! Now check position " + j });
      }
      arr[j + 1] = key;
      var sortedIndices = []; for (var k = 0; k <= i; k++) sortedIndices.push(k);
      steps.push({ arr: arr.slice(), cmp: [j+1, -1], sorted: sortedIndices, msg: "Insert " + key + " at position " + (j+1) });
    }
    steps.push({ arr: arr.slice(), cmp: null, sorted: Array.from({length:arr.length}, function(_,i){return i}), msg: "SORTED!" });
    return steps;
  }

  function mergeSortSteps(input) {
    var arr = input.slice(), steps = [];
    steps.push({ arr: arr.slice(), cmp: null, sorted: [], msg: "Unsorted array — divide and conquer" });

    function ms(a, lo, hi) {
      if (lo >= hi) return;
      var mid = Math.floor((lo + hi) / 2);
      steps.push({ arr: arr.slice(), cmp: [lo, hi], sorted: [], msg: "Split [" + lo + ".." + hi + "] at mid=" + mid });
      ms(a, lo, mid);
      ms(a, mid + 1, hi);
      var merged = [], i = lo, j = mid + 1;
      while (i <= mid && j <= hi) {
        steps.push({ arr: arr.slice(), cmp: [i, j], sorted: [], msg: "Compare " + a[i] + " vs " + a[j] });
        if (a[i] <= a[j]) { merged.push(a[i++]); } else { merged.push(a[j++]); }
      }
      while (i <= mid) merged.push(a[i++]);
      while (j <= hi) merged.push(a[j++]);
      for (var k = 0; k < merged.length; k++) a[lo + k] = merged[k];
      steps.push({ arr: arr.slice(), cmp: null, sorted: [], msg: "Merged [" + lo + ".." + hi + "]: " + merged.join(",") });
    }

    ms(arr, 0, arr.length - 1);
    steps.push({ arr: arr.slice(), cmp: null, sorted: Array.from({length:arr.length}, function(_,i){return i}), msg: "SORTED!" });
    return steps;
  }

  function quickSortSteps(input) {
    var arr = input.slice(), steps = [];
    steps.push({ arr: arr.slice(), cmp: null, sorted: [], msg: "Unsorted array — pick pivot, partition" });

    function qs(a, lo, hi) {
      if (lo >= hi) return;
      var pivot = a[hi], i = lo;
      steps.push({ arr: arr.slice(), cmp: [hi, -1], sorted: [], msg: "Pivot = " + pivot + " (index " + hi + ")" });
      for (var j = lo; j < hi; j++) {
        steps.push({ arr: arr.slice(), cmp: [j, hi], sorted: [], msg: "Compare arr[" + j + "]=" + a[j] + " with pivot=" + pivot });
        if (a[j] < pivot) {
          var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
          steps.push({ arr: arr.slice(), cmp: [i, j], sorted: [], msg: a[j] + " < pivot — swap to left" });
          i++;
        }
      }
      var tmp2 = a[i]; a[i] = a[hi]; a[hi] = tmp2;
      steps.push({ arr: arr.slice(), cmp: [i, hi], sorted: [], msg: "Place pivot " + pivot + " at final position " + i });
      qs(a, lo, i - 1);
      qs(a, i + 1, hi);
    }

    qs(arr, 0, arr.length - 1);
    steps.push({ arr: arr.slice(), cmp: null, sorted: Array.from({length:arr.length}, function(_,i){return i}), msg: "SORTED!" });
    return steps;
  }

  function subBubbleSort(canvas, ctx, w, h, t) {
    var steps = bubbleSortSteps([5, 3, 8, 1, 4, 7, 2, 6]);
    var code = 'for (let i = 0; i < n; i++)\n  for (let j = 0; j < n-1-i; j++)\n    if (arr[j] > arr[j+1])\n      swap(arr, j, j+1);';
    renderSortVis(ctx, w, h, t, steps, "Bubble Sort — Compare & Swap Adjacent", code, "O(n²) time | O(1) space — largest element bubbles to end each pass");
  }

  function subMergeSort(canvas, ctx, w, h, t) {
    var steps = mergeSortSteps([5, 3, 8, 1, 4, 7, 2, 6]);
    var code = 'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  let mid = arr.length / 2;\n  let left = mergeSort(arr.slice(0, mid));\n  let right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}';
    renderSortVis(ctx, w, h, t, steps, "Merge Sort — Divide, Sort, Merge", code, "O(n log n) time | O(n) space — stable, divide and conquer");
  }

  function subQuickSort(canvas, ctx, w, h, t) {
    var steps = quickSortSteps([5, 3, 8, 1, 4, 7, 2, 6]);
    var code = 'function quickSort(arr, lo, hi) {\n  if (lo >= hi) return;\n  let pivot = arr[hi];\n  let i = lo;\n  for (let j = lo; j < hi; j++)\n    if (arr[j] < pivot) swap(arr, i++, j);\n  swap(arr, i, hi);\n  quickSort(arr, lo, i-1);\n  quickSort(arr, i+1, hi);\n}';
    renderSortVis(ctx, w, h, t, steps, "Quick Sort — Pivot & Partition", code, "O(n log n) avg | O(n²) worst — in-place, cache-friendly");
  }

  // ═══════════════ SEARCHING ═══════════════

  function subLinearSearch(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 18, "Linear Search — Check Every Element", { sz: 11, c: P.cyan, w: "700" });
    var arr = [4, 7, 2, 9, 1, 6, 3, 8];
    var target = 6;
    var scanIdx = cyc(t, 0.5, arr.length);
    var found = arr[scanIdx] === target;
    var barW = 44, gap = 8;
    var startX = (w - arr.length * (barW + gap)) / 2;

    txt(ctx, w / 2, 48, "Looking for: " + target, { sz: 10, c: P.amber, w: "700" });

    arr.forEach(function(v, i) {
      var bx = startX + i * (barW + gap);
      var scanning = i === scanIdx;
      var alreadyChecked = i < scanIdx;
      var isFound = found && i === scanIdx;
      box(ctx, bx, 80, barW, 50, {
        stroke: isFound ? P.green : (scanning ? P.amber : (alreadyChecked ? P.faint : P.border)),
        glow: scanning ? P.amber : null
      });
      txt(ctx, bx + barW / 2, 105, String(v), { sz: 13, c: isFound ? P.green : (scanning ? P.amber : (alreadyChecked ? P.faint : P.text)), w: "700" });
      // Scanning pointer
      if (scanning) {
        txt(ctx, bx + barW / 2, 70, "▼", { sz: 14, c: P.amber });
      }
      if (alreadyChecked) {
        txt(ctx, bx + barW / 2, 140, "✗", { sz: 12, c: P.rose });
      }
      if (isFound) {
        txt(ctx, bx + barW / 2, 140, "✓", { sz: 12, c: P.green });
      }
    });

    txt(ctx, w / 2, 170, found ? "Found " + target + " at index " + scanIdx + "!" : "Checking index " + scanIdx + "...", {
      sz: 10, c: found ? P.green : P.dim, w: "700"
    });
    typewriter(ctx, 30, 200, 'function linearSearch(arr, target) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === target) return i;\n    }\n    return -1;\n}\n// Time: O(n) — worst case check all', t * 10, { speed: 22, colors: [P.cyan, P.text, P.amber, P.green, P.text, P.faint] });
    txt(ctx, w / 2, h - 18, "Scan every element one by one — simple but O(n)", { sz: 9, c: P.faint, m: false });
  }

  function subBinarySearch(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Binary Search — Halve the Search Space", { sz: 11, c: P.cyan, w: "700" });
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    var target = 6;
    var barW = 44, gap = 8;
    var startX = (w - arr.length * (barW + gap)) / 2;
    var phase = cyc(t, 1.5, 4);
    var low = 0, high = arr.length - 1;
    var mid;
    // Simulate binary search steps
    var steps = [
      { low: 0, high: 7, mid: 3 },
      { low: 4, high: 7, mid: 5 },
      { low: 4, high: 5, mid: 4 },
      { low: 5, high: 5, mid: 5 }
    ];
    var step = steps[Math.min(phase, 3)];
    low = step.low; high = step.high; mid = step.mid;

    arr.forEach(function(v, i) {
      var bx = startX + i * (barW + gap);
      var inRange = i >= low && i <= high;
      var isMid = i === mid;
      var isTarget = v === target && isMid;
      box(ctx, bx, 80, barW, 50, {
        stroke: isTarget ? P.green : (isMid ? P.amber : (inRange ? P.cyan : P.faint)),
        glow: isMid ? P.amber : null
      });
      txt(ctx, bx + barW / 2, 105, String(v), {
        sz: 13,
        c: isTarget ? P.green : (isMid ? P.amber : (inRange ? P.text : P.faint)),
        w: "700"
      });
      if (isMid) txt(ctx, bx + barW / 2, 70, "mid", { sz: 8, c: P.amber, w: "700" });
    });

    // Range labels
    txt(ctx, startX + low * (barW + gap) + barW / 2, 145, "low", { sz: 8, c: P.cyan, w: "700" });
    txt(ctx, startX + high * (barW + gap) + barW / 2, 145, "high", { sz: 8, c: P.pink, w: "700" });

    var midVal = arr[mid];
    var cmp = midVal < target ? " < " + target + " → go right" : (midVal > target ? " > " + target + " → go left" : " = " + target + " → FOUND!");
    txt(ctx, w / 2, 170, "arr[" + mid + "] = " + midVal + cmp, { sz: 10, c: midVal === target ? P.green : P.amber });
    typewriter(ctx, 30, 200, 'function binarySearch(arr, target) {\n    let lo = 0, hi = arr.length - 1;\n    while (lo <= hi) {\n        let mid = (lo + hi) >> 1;\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}\n// Time: O(log n) — halves each step', t * 10, { speed: 18, colors: [P.cyan, P.text, P.text, P.amber, P.green, P.cyan, P.pink, P.text, P.text, P.faint] });
    txt(ctx, w / 2, h - 18, "Each step halves the search — requires sorted array, O(log n)", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ OOP ═══════════════

  function subEncapsulation(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Encapsulation — Hide Data, Expose Interface", { sz: 13, c: P.cyan, w: "700" });
    var cx = w / 2;
    var phase = Math.floor(t / 3) % 2;
    
    var classX = cx - 110, classY = 55, classW = 220, classH = 180;
    box(ctx, classX, classY, classW, classH, { stroke: P.cyan, r: 10 });
    txt(ctx, cx, classY + 18, "class BankAccount", { sz: 11, c: P.cyan, w: "700" });
    
    ctx.beginPath();
    ctx.moveTo(classX + 10, classY + 35);
    ctx.lineTo(classX + classW - 10, classY + 35);
    ctx.strokeStyle = P.border;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    box(ctx, classX + 10, classY + 40, classW - 20, 60, { fill: "rgba(74,222,128,0.08)", stroke: P.green, r: 6 });
    txt(ctx, classX + 25, classY + 52, "+ public", { sz: 9, c: P.green, w: "700", a: "left" });
    txt(ctx, classX + 25, classY + 68, "deposit(amount)", { sz: 10, c: P.text, a: "left" });
    txt(ctx, classX + 25, classY + 84, "getBalance()", { sz: 10, c: P.text, a: "left" });
    
    box(ctx, classX + 10, classY + 105, classW - 20, 65, { fill: "rgba(252,165,165,0.08)", stroke: P.rose, r: 6 });
    txt(ctx, classX + 25, classY + 117, "- private", { sz: 9, c: P.rose, w: "700", a: "left" });
    txt(ctx, classX + 25, classY + 133, "_balance", { sz: 10, c: P.text, a: "left" });
    txt(ctx, classX + 25, classY + 149, "_pin", { sz: 10, c: P.text, a: "left" });
    
    if (phase === 0) {
      box(ctx, cx + 140, 90, 140, 40, { stroke: P.rose, glow: P.rose });
      txt(ctx, cx + 210, 102, "account._balance", { sz: 9, c: P.rose, a: "center" });
      txt(ctx, cx + 210, 118, "X ACCESS DENIED", { sz: 9, c: P.rose, w: "700" });
      arrow(ctx, cx + 140, 110, classX + classW - 5, 137, { c: P.rose, lw: 2, hd: 5 });
      txt(ctx, classX + classW - 20, classY + 117, "LOCKED", { sz: 8, c: P.rose, w: "700" });
    } else {
      box(ctx, cx + 140, 70, 140, 40, { stroke: P.green, glow: P.green });
      txt(ctx, cx + 210, 82, "account.deposit(100)", { sz: 9, c: P.green, a: "center" });
      txt(ctx, cx + 210, 98, "CHECK WORKS!", { sz: 9, c: P.green, w: "700" });
      arrow(ctx, cx + 140, 90, classX + classW - 5, 70, { c: P.green, lw: 2, hd: 5 });
      txt(ctx, cx + 210, 130, "-> internally modifies _balance", { sz: 8, c: P.dim });
    }
    
    box(ctx, 20, 260, w - 40, 50, { r: 6, stroke: P.dim });
    txt(ctx, cx, 275, "Public: interface for outside world | Private: internal implementation", { sz: 10, c: P.dim });
    txt(ctx, cx, 292, "Benefits: security, flexibility to change internals without breaking code", { sz: 9, c: P.faint });
    
    typewriter(ctx, 20, 330, 'class BankAccount:\n    def __init__(self, balance):\n        self.__balance = balance  # private\n\n    def deposit(self, amount):  # public\n        self.__balance += amount\n\n    def getBalance(self):       # public\n        return self.__balance', t * 10, { speed: 20 });
    
    txt(ctx, cx, h - 18, "Encapsulation = data hiding + public interface for controlled access", { sz: 9, c: P.faint, m: false });
  }

  function subInheritance(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Inheritance — Child Inherits from Parent", { sz: 13, c: P.cyan, w: "700" });
    var cx = w / 2;
    var phase = Math.floor(t / 3) % 3;
    
    var px = cx - 100, py = 50, pw = 200, ph = 100;
    box(ctx, px, py, pw, ph, { stroke: P.cyan, r: 10 });
    txt(ctx, cx, py + 18, "class Animal", { sz: 11, c: P.cyan, w: "700" });
    ctx.beginPath(); ctx.moveTo(px+10, py+30); ctx.lineTo(px+pw-10, py+30); ctx.strokeStyle = P.border; ctx.lineWidth = 1; ctx.stroke();
    txt(ctx, cx, py + 45, "eat()", { sz: 10, c: P.text });
    txt(ctx, cx, py + 62, "sleep()", { sz: 10, c: P.text });
    txt(ctx, cx, py + 82, "speak()  <- override", { sz: 10, c: P.amber });
    
    arrow(ctx, cx, py + ph + 5, cx, py + ph + 35, { c: P.green, lw: 3, hd: 8 });
    txt(ctx, cx + 30, py + ph + 20, "extends", { sz: 9, c: P.green, w: "700" });
    
    var cy2 = py + ph + 45, cw = 200, ch = 120;
    box(ctx, cx - cw/2, cy2, cw, ch, { stroke: P.green, r: 10 });
    txt(ctx, cx, cy2 + 18, "class Dog(Animal)", { sz: 11, c: P.green, w: "700" });
    ctx.beginPath(); ctx.moveTo(cx-cw/2+10, cy2+30); ctx.lineTo(cx+cw/2-10, cy2+30); ctx.strokeStyle = P.border; ctx.lineWidth = 1; ctx.stroke();
    
    txt(ctx, cx, cy2 + 45, "eat()      <- inherited", { sz: 10, c: P.dim });
    txt(ctx, cx, cy2 + 62, "sleep()   <- inherited", { sz: 10, c: P.dim });
    
    var overrideGlow = Math.sin(t * 3) > 0;
    txt(ctx, cx, cy2 + 82, "speak()  -> \"Woof!\"", { sz: 10, c: overrideGlow ? P.amber : P.green, w: "700" });
    if (overrideGlow) {
      box(ctx, cx - 80, cy2 + 72, 160, 18, { stroke: P.amber, glow: P.amber, r: 4 });
    }
    
    txt(ctx, cx, cy2 + 102, "fetch()   <- own method", { sz: 10, c: P.cyan });
    
    if (phase === 0) {
      txt(ctx, cx, 340, "Child inherits ALL parent methods and can override specific ones", { sz: 10, c: P.dim });
    } else if (phase === 1) {
      txt(ctx, cx, 340, "Override: child provides its own version of speak()", { sz: 10, c: P.amber });
    } else {
      txt(ctx, cx, 340, "Reuse code: write once in parent, use everywhere in children", { sz: 10, c: P.green });
    }
    
    typewriter(ctx, 20, 360, 'class Animal:\n    def speak(self): pass\n\nclass Dog(Animal):\n    def speak(self): return "Woof!"\n\nclass Cat(Animal):\n    def speak(self): return "Meow!"', t * 10, { speed: 22 });
    
    txt(ctx, cx, h - 18, "is-a relationship: Dog IS-A Animal — inherits behavior, adds/overrides", { sz: 9, c: P.faint, m: false });
  }

  function subPolymorphism(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Polymorphism — One Interface, Many Forms", { sz: 13, c: P.cyan, w: "700" });
    var cx = w / 2;
    
    box(ctx, cx - 70, 45, 140, 32, { stroke: P.amber, glow: P.amber, r: 6 });
    txt(ctx, cx, 61, "shape.draw()", { sz: 12, c: P.amber, w: "700" });
    
    var objects = [
      { name: "Circle", x: cx - 140, color: P.cyan },
      { name: "Square", x: cx, color: P.green },
      { name: "Triangle", x: cx + 140, color: P.pink }
    ];
    
    for (var i = 0; i < 3; i++) {
      arrow(ctx, cx, 80, objects[i].x, 115, { c: objects[i].color, lw: 2, hd: 5 });
    }
    
    for (var j = 0; j < 3; j++) {
      var obj = objects[j];
      var shapeY = 140;
      
      box(ctx, obj.x - 55, shapeY, 110, 50, { stroke: obj.color });
      txt(ctx, obj.x, shapeY + 15, "class " + obj.name, { sz: 10, c: obj.color, w: "700" });
      txt(ctx, obj.x, shapeY + 35, "draw() ->", { sz: 9, c: P.dim });
      
      var drawY = 210;
      if (j === 0) {
        var r = 25 + Math.sin(t * 2) * 5;
        ctx.beginPath();
        ctx.arc(obj.x, drawY + 25, r, 0, Math.PI * 2);
        ctx.strokeStyle = P.cyan;
        ctx.lineWidth = 2;
        ctx.save(); ctx.shadowColor = P.cyan; ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
        txt(ctx, obj.x, drawY + 65, "draw() -> Circle", { sz: 9, c: P.cyan });
      } else if (j === 1) {
        var sz = 40 + Math.sin(t * 2) * 6;
        box(ctx, obj.x - sz/2, drawY + 5, sz, sz, { stroke: P.green });
        txt(ctx, obj.x, drawY + 65, "draw() -> Square", { sz: 9, c: P.green });
      } else {
        ctx.beginPath();
        ctx.moveTo(obj.x, drawY + 5);
        ctx.lineTo(obj.x - 25, drawY + 50);
        ctx.lineTo(obj.x + 25, drawY + 50);
        ctx.closePath();
        ctx.strokeStyle = P.pink;
        ctx.lineWidth = 2;
        ctx.save(); ctx.shadowColor = P.pink; ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
        txt(ctx, obj.x, drawY + 65, "draw() -> Triangle", { sz: 9, c: P.pink });
      }
    }
    
    var activeIdx = Math.floor(t * 0.8) % 3;
    var pulse = 0.3 + Math.abs(Math.sin(t * 3)) * 0.7;
    ctx.globalAlpha = pulse;
    ctx.beginPath();
    ctx.arc(objects[activeIdx].x, 61, 8, 0, Math.PI * 2);
    ctx.fillStyle = objects[activeIdx].color;
    ctx.fill();
    ctx.globalAlpha = 1;
    
    box(ctx, 20, 300, w - 40, 40, { r: 6, stroke: P.dim });
    txt(ctx, cx, 315, "Same method name, different behavior depending on object type", { sz: 10, c: P.dim });
    txt(ctx, cx, 332, "Achieved via: method overriding + dynamic dispatch (virtual methods)", { sz: 9, c: P.faint });
    
    typewriter(ctx, 20, 355, 'shapes = [Circle(), Square(), Triangle()]\nfor shape in shapes:\n    shape.draw()  # each draws differently!', t * 10, { speed: 22 });
    
    txt(ctx, cx, h - 18, "Polymorphism: call the same method, get different results per object type", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ VARIABLES ═══════════════

  function subVarInitialization(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Variable Initialization — Assigning a Value", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 4);
    var cx = w / 2;
    var vars = [
      { name: "count", val: "0", color: P.cyan },
      { name: "name", val: '"Alice"', color: P.pink },
      { name: "ratio", val: "3.14", color: P.amber },
      { name: "ready", val: "true", color: P.green }
    ];
    vars.forEach(function(v, i) {
      var vy = 60 + i * 60;
      var active = i === phase;
      box(ctx, 50, vy, 110, 44, { stroke: active ? v.color : P.border, glow: active ? v.color : null });
      txt(ctx, 105, vy + 14, v.name, { sz: 11, c: active ? v.color : P.dim, w: "700" });
      txt(ctx, 105, vy + 34, "= ___", { sz: 9, c: P.faint });
      arrow(ctx, 162, vy + 22, 195, vy + 22, { c: active ? v.color : P.faint, hd: 5 });
      var fillProg = active ? Math.min(1, (t % 3) * 0.8) : 0;
      box(ctx, 200, vy, 120, 44, { stroke: active ? v.color : P.border });
      ctx.save();
      ctx.beginPath();
      ctx.rect(202, vy + 2, fillProg * 116, 40);
      ctx.fillStyle = v.color;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.restore();
      if (fillProg > 0.3) {
        txt(ctx, 260, vy + 22, v.val, { sz: 13, c: v.color, w: "700" });
      }
    });
    if (phase >= 0) {
      var activeV = vars[phase];
      txt(ctx, cx, 305, "Assignment: " + activeV.name + " ← " + activeV.val, { sz: 10, c: activeV.color });
    }
    typewriter(ctx, 50, 325, 'var count = 0;\nvar name = "Alice";\nvar ratio = 3.14;\nvar ready = true;', t * 10, { speed: 28, colors: [P.cyan, P.pink, P.pamber || P.amber, P.green] });
    txt(ctx, cx, h - 18, "Initialization = declaration + first assignment in one step", { sz: 9, c: P.faint, m: false });
  }

  function subNamingRules(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Variable Naming Rules — Valid vs Invalid", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var phase = cyc(t, 3.5, 4);
    var names = [
      { name: "myVar", valid: true, reason: "camelCase OK" },
      { name: "_private", valid: true, reason: "underscore OK" },
      { name: "count2", valid: true, reason: "digits OK" },
      { name: "2invalid", valid: false, reason: "can't start with digit" }
    ];
    var altNames = [
      { name: "user-name", valid: false, reason: "no hyphens" },
      { name: "class", valid: false, reason: "reserved keyword" },
      { name: "my var", valid: false, reason: "no spaces" },
      { name: "$price", valid: true, reason: "special chars OK" }
    ];
    var showSet = phase < 2 ? names : altNames;
    var offset = phase < 2 ? 0 : 4;
    showSet.forEach(function(n, i) {
      var iy = 65 + i * 55;
      var active = i === (phase % 2 === 0 ? cyc(t, 0.9, 4) : cyc(t, 0.9, 4));
      box(ctx, 40, iy, 180, 40, { stroke: active ? (n.valid ? P.green : P.rose) : P.border, glow: active ? (n.valid ? P.green : P.rose) : null });
      txt(ctx, 130, iy + 20, n.name, { sz: 13, c: active ? (n.valid ? P.green : P.rose) : P.text, w: "600" });
      var markX = 235;
      txt(ctx, markX, iy + 20, n.valid ? "✓" : "✗", { sz: 18, c: n.valid ? P.green : P.rose, w: "700" });
      box(ctx, 270, iy, 160, 40, { stroke: P.faint });
      txt(ctx, 350, iy + 20, n.reason, { sz: 9, c: P.dim });
    });
    var captions = [
      "Valid: letters, digits, $, _ — can't start with digit",
      "Valid: case matters — myVar !== myvar",
      "More valid patterns: _count, $el, userName2",
      "Invalid: reserved words, hyphens, spaces"
    ];
    txt(ctx, cx, 290, captions[phase], { sz: 10, c: P.amber });
    typewriter(ctx, 50, 310, '// Good names:\nlet userName = "Jay";\nlet _count = 0;\nlet $price = 9.99;\n// Bad names:\n// let 2fast = 1;', t * 10, { speed: 25, colors: [P.faint, P.green, P.green, P.green, P.rose, P.rose, P.rose] });
    txt(ctx, cx, h - 18, "Good names describe purpose: camelCase, snake_case, or $ prefixes", { sz: 9, c: P.faint, m: false });
  }

  function subMutability(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Mutability — let (changeable) vs const (locked)", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // let variable — changes
    var letY = 60;
    box(ctx, 30, letY, cx - 50, 160, { r: 10, stroke: P.green });
    txt(ctx, 30 + (cx - 50) / 2, letY + 18, "let score = 10", { sz: 11, c: P.green, w: "700" });
    box(ctx, 50, letY + 40, 120, 50, { stroke: P.green, glow: phase === 0 ? P.green : null });
    txt(ctx, 110, letY + 65, "score", { sz: 10, c: P.green, w: "600" });
    var letVals = ["10", "20", "30"];
    txt(ctx, 110, letY + 88, "→ " + letVals[phase], { sz: 14, c: P.green, w: "700" });
    if (phase === 0) {
      txt(ctx, 180, letY + 65, "CAN change ✓", { sz: 10, c: P.green });
      arrow(ctx, 110, letY + 92, 110, letY + 120, { c: P.green, hd: 5 });
      box(ctx, 50, letY + 110, 120, 40, { stroke: P.green });
      txt(ctx, 110, letY + 130, "→ " + letVals[1], { sz: 13, c: P.green, w: "700" });
    }
    // const variable — locked
    var constY = letY + 180;
    box(ctx, 30, constY, cx - 50, 160, { r: 10, stroke: P.rose });
    txt(ctx, 30 + (cx - 50) / 2, constY + 18, "const PI = 3.14", { sz: 11, c: P.rose, w: "700" });
    box(ctx, 50, constY + 40, 120, 50, { stroke: P.rose });
    txt(ctx, 110, constY + 65, "PI", { sz: 10, c: P.rose, w: "600" });
    txt(ctx, 110, constY + 88, "3.14", { sz: 14, c: P.rose, w: "700" });
    if (phase === 2) {
      // Lock icon
      ctx.save();
      ctx.strokeStyle = P.rose;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(190, constY + 65, 10, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(180, constY + 65, 20, 18);
      ctx.stroke();
      ctx.restore();
      txt(ctx, 190, constY + 100, "LOCKED ✗", { sz: 10, c: P.rose, w: "700" });
    }
    // Right side: comparison
    var rightX = cx + 10;
    var rightW = w - rightX - 30;
    box(ctx, rightX, 60, rightW, 280, { r: 10, stroke: P.cyan });
    txt(ctx, rightX + rightW / 2, 80, "WHEN TO USE", { sz: 10, c: P.cyan, w: "700" });
    var tips = [
      "let → value will change",
      "  score += 10",
      "  count++",
      "  name = newName",
      "",
      "const → value stays the same",
      "  const API = 'url'",
      "  const PI = 3.14",
      "  const user = {...}",
      "",
      "Default: use const.",
      "Switch to let when needed."
    ];
    tips.forEach(function(l, i) {
      txt(ctx, rightX + 14, 104 + i * 20, l, { sz: 9, c: l.indexOf("let") === 0 || l.indexOf("const") === 0 ? P.cyan : P.dim, a: "left", m: false, w: l.indexOf("let") === 0 || l.indexOf("const") === 0 ? "700" : "500" });
    });
    typewriter(ctx, 30, 355, 'let score = 10;\nscore = 20;   // OK\n\nconst PI = 3.14;\nPI = 3;       // ERROR!', t * 10, { speed: 25, colors: [P.green, P.green, P.text, P.rose, P.rose, P.rose] });
    txt(ctx, cx, h - 18, "let = mutable (can change), const = immutable (locked)", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ FUNCTIONS ═══════════════

  function subReturnValues(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Return Values — Functions Produce Output", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3.5, 4);
    var cx = w / 2;
    // Function box
    box(ctx, 40, 60, 200, 100, { r: 10, stroke: P.cyan });
    txt(ctx, 140, 80, "function add(a, b)", { sz: 10, c: P.cyan, w: "700" });
    txt(ctx, 140, 100, "{", { sz: 10, c: P.dim });
    txt(ctx, 140, 120, "  return a + b;", { sz: 10, c: P.green });
    txt(ctx, 140, 140, "}", { sz: 10, c: P.dim });
    // Inputs
    var inputSets = [
      { a: "3", b: "5", result: "8" },
      { a: "10", b: "20", result: "30" },
      { a: "7", b: "7", result: "14" },
      { a: "-1", b: "1", result: "0" }
    ];
    var input = inputSets[phase];
    // Input arrow
    box(ctx, 30, 190, 100, 44, { stroke: P.orange });
    txt(ctx, 80, 212, "add(" + input.a + ", " + input.b + ")", { sz: 9, c: P.orange });
    arrow(ctx, 80, 236, 80, 164, { c: P.orange, hd: 5 });
    txt(ctx, 60, 246, "INPUT", { sz: 8, c: P.orange, w: "700" });
    // Output arrow
    box(ctx, 160, 190, 100, 44, { stroke: P.green, glow: P.green });
    txt(ctx, 210, 212, "return " + input.result, { sz: 12, c: P.green, w: "700" });
    arrow(ctx, 210, 190, 210, 164, { c: P.green, hd: 5 });
    txt(ctx, 210, 246, "OUTPUT", { sz: 8, c: P.green, w: "700" });
    // Animated data flow
    var flowP = (t % 2) / 2;
    var flowX = lerp(80, 210, flowP);
    var flowY = lerp(190, 160, flowP);
    ctx.beginPath();
    ctx.arc(flowX, flowY, 5, 0, Math.PI * 2);
    ctx.fillStyle = P.amber;
    ctx.save();
    ctx.shadowColor = P.amber;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
    // Right: usage examples
    var rightX = 290;
    var rightW = w - rightX - 20;
    if (rightW > 80) {
      box(ctx, rightX, 60, rightW, 260, { r: 10, stroke: P.pink });
      txt(ctx, rightX + rightW / 2, 78, "USING RETURNS", { sz: 9, c: P.pink, w: "700" });
      var uses = [
        "let sum = add(3, 5);",
        "// sum is now 8",
        "",
        "let x = add(1, 2) * 3;",
        "// x is 9",
        "",
        "if (add(1,1) === 2) {",
        "  // true!",
        "}"
      ];
      uses.forEach(function(l, i) {
        txt(ctx, rightX + 10, 100 + i * 20, l, { sz: 9, c: P.dim, a: "left", m: false });
      });
    }
    typewriter(ctx, 30, 310, 'function add(a, b) {\n    return a + b;\n}\nlet result = add(3, 5); // 8', t * 10, { speed: 28, colors: [P.cyan, P.text, P.green, P.green] });
    txt(ctx, cx, h - 18, "return sends a value back to wherever the function was called", { sz: 9, c: P.faint, m: false });
  }

  function subDefaultParams(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Default Parameters — Fallback Values", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // Function definition
    box(ctx, 40, 60, w - 80, 80, { r: 10, stroke: P.cyan });
    txt(ctx, cx, 80, "function greet(name = \"World\", time = \"Day\")", { sz: 10, c: P.cyan, w: "700" });
    txt(ctx, cx, 100, "{  return `Good ${time}, ${name}!`;  }", { sz: 10, c: P.dim });
    // Three call scenarios
    var calls = [
      { args: "greet()", name: '"World"', time: '"Day"', color: P.green, label: "All defaults" },
      { args: 'greet("Alice")', name: '"Alice"', time: '"Day"', color: P.amber, label: "Override name" },
      { args: 'greet("Bob", "Night")', name: '"Bob"', time: '"Night"', color: P.pink, label: "Override both" }
    ];
    var active = phase;
    calls.forEach(function(c, i) {
      var cy = 170 + i * 60;
      var on = i === active;
      box(ctx, 40, cy, 160, 44, { stroke: on ? c.color : P.border, glow: on ? c.color : null });
      txt(ctx, 120, cy + 22, c.args, { sz: 9, c: on ? c.color : P.dim });
      arrow(ctx, 202, cy + 22, 230, cy + 22, { c: on ? c.color : P.faint, hd: 5 });
      // Params shown
      box(ctx, 235, cy, 90, 20, { stroke: on ? P.cyan : P.faint });
      txt(ctx, 280, cy + 10, "name=" + c.name, { sz: 8, c: on ? P.cyan : P.faint });
      box(ctx, 235, cy + 22, 90, 20, { stroke: on ? P.pink : P.faint });
      txt(ctx, 280, cy + 32, "time=" + c.time, { sz: 8, c: on ? P.pink : P.faint });
      // Label
      txt(ctx, 340, cy + 22, c.label, { sz: 9, c: on ? c.color : P.faint, a: "left" });
      // Result
      if (on) {
        var result = "Good " + c.time.replace(/"/g, "") + ", " + c.name.replace(/"/g, "") + "!";
        box(ctx, 400, cy, w - 440, 44, { stroke: c.color, glow: c.color });
        txt(ctx, 400 + (w - 440) / 2, cy + 22, '"' + result + '"', { sz: 10, c: c.color });
      }
    });
    typewriter(ctx, 40, 360, 'function greet(name="World", time="Day") {\n    return `Good ${time}, ${name}!`;\n}\ngreet();               // "Good Day, World!"\ngreet("Alice");        // "Good Day, Alice!"\ngreet("Bob","Night");  // "Good Night, Bob!"', t * 10, { speed: 22, colors: [P.cyan, P.text, P.green, P.green, P.amber, P.pink] });
    txt(ctx, cx, h - 18, "Default params let callers skip arguments — function fills in the blanks", { sz: 9, c: P.faint, m: false });
  }

  function subReturnValuesViz(canvas, ctx, w, h, t) { subReturnValues(canvas, ctx, w, h, t); }

  // ═══════════════ ARRAYS ═══════════════

  function subIndexing(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Array Indexing — Access by Position", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var arr = ["A", "B", "C", "D", "E"];
    var cellW = 60, gap = 8;
    var startX = cx - (arr.length * (cellW + gap)) / 2;
    var baseY = 100;
    var highlight = cyc(t, 1.2, arr.length);
    // Array boxes
    arr.forEach(function(v, i) {
      var bx = startX + i * (cellW + gap);
      var active = i === highlight;
      box(ctx, bx, baseY, cellW, 50, { stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
      txt(ctx, bx + cellW / 2, baseY + 25, v, { sz: 16, c: active ? P.cyan : P.text, w: "700" });
      // Index label below
      txt(ctx, bx + cellW / 2, baseY + 66, "[" + i + "]", { sz: 10, c: active ? P.amber : P.faint, w: "600" });
    });
    // Arrow pointing to current index
    var arrowX = startX + highlight * (cellW + gap) + cellW / 2;
    ctx.save();
    ctx.strokeStyle = P.amber;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(arrowX, baseY - 20);
    ctx.lineTo(arrowX, baseY - 6);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(arrowX - 5, baseY - 10);
    ctx.lineTo(arrowX, baseY - 4);
    ctx.lineTo(arrowX + 5, baseY - 10);
    ctx.fillStyle = P.amber;
    ctx.fill();
    ctx.restore();
    txt(ctx, arrowX, baseY - 30, "index " + highlight, { sz: 10, c: P.amber, w: "700" });
    // Access pattern shown
    box(ctx, 40, 200, w - 80, 60, { r: 8, stroke: P.green });
    txt(ctx, cx, 220, "arr[" + highlight + "] = \"" + arr[highlight] + "\"", { sz: 14, c: P.green, w: "700" });
    txt(ctx, cx, 244, "Zero-indexed: first element is [0], not [1]", { sz: 10, c: P.dim });
    typewriter(ctx, 40, 290, 'let arr = ["A","B","C","D","E"];\narr[0];  // "A" (first)\narr[2];  // "C" (third)\narr.length; // 5\narr[arr.length - 1]; // "E" (last)', t * 10, { speed: 25, colors: [P.cyan, P.green, P.green, P.amber, P.amber] });
    txt(ctx, cx, h - 18, "Arrays are zero-indexed: position [0] is the first element", { sz: 9, c: P.faint, m: false });
  }

  function subIteration(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Array Iteration — Visit Each Element", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var arr = [10, 25, 40, 15, 30];
    var cellW = 55, gap = 8;
    var startX = cx - (arr.length * (cellW + gap)) / 2;
    var baseY = 90;
    var cursor = cyc(t, 0.8, arr.length);
    // Array
    arr.forEach(function(v, i) {
      var bx = startX + i * (cellW + gap);
      var visited = i <= cursor;
      var active = i === cursor;
      box(ctx, bx, baseY, cellW, 44, { stroke: active ? P.amber : (visited ? P.green : P.border), glow: active ? P.amber : null });
      txt(ctx, bx + cellW / 2, baseY + 22, String(v), { sz: 13, c: active ? P.amber : (visited ? P.green : P.text), w: "700" });
    });
    // Moving arrow
    var arrowX = startX + cursor * (cellW + gap) + cellW / 2;
    arrow(ctx, arrowX, baseY - 20, arrowX, baseY - 6, { c: P.amber, hd: 6 });
    txt(ctx, arrowX, baseY - 30, "i = " + cursor, { sz: 10, c: P.amber, w: "700" });
    // Running sum
    var sum = 0;
    for (var j = 0; j <= cursor; j++) sum += arr[j];
    box(ctx, 40, 170, w - 80, 50, { r: 8, stroke: P.cyan });
    txt(ctx, cx, 185, "Processing: arr[" + cursor + "] = " + arr[cursor], { sz: 11, c: P.cyan });
    txt(ctx, cx, 205, "Running sum = " + sum, { sz: 10, c: P.green });
    // Three common patterns
    var patterns = [
      { label: "for loop", code: "for (let i=0; i<arr.length; i++)", color: P.cyan },
      { label: "for...of", code: "for (let v of arr)", color: P.green },
      { label: "forEach", code: "arr.forEach(v => ...)", color: P.pink }
    ];
    patterns.forEach(function(p, i) {
      var py = 240 + i * 35;
      box(ctx, 40, py, w - 80, 28, { r: 6, stroke: p.color });
      txt(ctx, 80, py + 14, p.label, { sz: 9, c: p.color, w: "700", a: "left" });
      txt(ctx, 200, py + 14, p.code, { sz: 9, c: P.dim, a: "left", m: false });
    });
    txt(ctx, cx, h - 18, "Iteration visits every element — use for, for...of, or forEach", { sz: 9, c: P.faint, m: false });
  }

  function subMultiDimensional(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Multi-Dimensional Arrays — Grids & Matrices", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    var cellW = 50, cellH = 44;
    var startX = cx - (3 * (cellW + 6)) / 2;
    var baseY = 70;
    var hlRow = cyc(t, 1.2, 3);
    var hlCol = cyc(t * 1.5, 1.2, 3);
    // Row labels
    for (var r = 0; r < 3; r++) {
      txt(ctx, startX - 30, baseY + r * (cellH + 6) + cellH / 2, "[" + r + "]", { sz: 9, c: P.faint });
    }
    // Col labels
    for (var c = 0; c < 3; c++) {
      txt(ctx, startX + c * (cellW + 6) + cellW / 2, baseY - 14, "[" + c + "]", { sz: 9, c: P.faint });
    }
    // Grid
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        var bx = startX + c * (cellW + 6);
        var by = baseY + r * (cellH + 6);
        var isRow = r === hlRow;
        var isCol = c === hlCol;
        var active = isRow && isCol;
        box(ctx, bx, by, cellW, cellH, {
          stroke: active ? P.amber : (isRow ? P.cyan : (isCol ? P.pink : P.border)),
          glow: active ? P.amber : null
        });
        txt(ctx, bx + cellW / 2, by + cellH / 2, String(grid[r][c]), {
          sz: 14, c: active ? P.amber : (isRow ? P.cyan : (isCol ? P.pink : P.text)), w: "700"
        });
      }
    }
    // Access pattern
    box(ctx, 40, 230, w - 80, 40, { r: 6, stroke: P.green });
    txt(ctx, cx, 250, "grid[" + hlRow + "][" + hlCol + "] = " + grid[hlRow][hlCol], { sz: 12, c: P.green, w: "700" });
    typewriter(ctx, 40, 290, 'let grid = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\ngrid[1][2]; // 6 (row 1, col 2)', t * 10, { speed: 22, colors: [P.cyan, P.text, P.text, P.text, P.text, P.green] });
    txt(ctx, cx, h - 18, "Two indices: [row][column] — like a spreadsheet or chess board", { sz: 9, c: P.faint, m: false });
  }

  function subSlicing(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Array Slicing — Extract a Sub-Range", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var arr = [10, 20, 30, 40, 50, 60, 70];
    var cellW = 48, gap = 6;
    var startX = cx - (arr.length * (cellW + gap)) / 2;
    var baseY = 80;
    var phase = cyc(t, 3, 3);
    var slices = [
      { start: 1, end: 4, label: "arr.slice(1, 4)", color: P.green },
      { start: 0, end: 3, label: "arr.slice(0, 3)", color: P.cyan },
      { start: 3, end: 7, label: "arr.slice(3)", color: P.pink }
    ];
    var sl = slices[phase];
    // Full array
    arr.forEach(function(v, i) {
      var bx = startX + i * (cellW + gap);
      var inSlice = i >= sl.start && i < sl.end;
      box(ctx, bx, baseY, cellW, 44, { stroke: inSlice ? sl.color : P.border, glow: inSlice ? sl.color : null });
      txt(ctx, bx + cellW / 2, baseY + 22, String(v), { sz: 12, c: inSlice ? sl.color : P.dim, w: "600" });
      txt(ctx, bx + cellW / 2, baseY + 56, "[" + i + "]", { sz: 8, c: P.faint });
    });
    // Brackets showing slice range
    var bracketStart = startX + sl.start * (cellW + gap);
    var bracketEnd = startX + sl.end * (cellW + gap) - gap;
    ctx.save();
    ctx.strokeStyle = sl.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bracketStart, baseY - 8);
    ctx.lineTo(bracketStart, baseY - 14);
    ctx.lineTo(bracketEnd, baseY - 14);
    ctx.lineTo(bracketEnd, baseY - 8);
    ctx.stroke();
    ctx.restore();
    txt(ctx, (bracketStart + bracketEnd) / 2, baseY - 24, sl.label, { sz: 10, c: sl.color, w: "700" });
    // Result slice below
    txt(ctx, cx, 160, "Result:", { sz: 10, c: P.dim });
    var sliceVals = arr.slice(sl.start, sl.end);
    var resStartX = cx - (sliceVals.length * (cellW + gap)) / 2;
    sliceVals.forEach(function(v, i) {
      var bx = resStartX + i * (cellW + gap);
      box(ctx, bx, 175, cellW, 40, { stroke: sl.color, glow: sl.color });
      txt(ctx, bx + cellW / 2, 195, String(v), { sz: 13, c: sl.color, w: "700" });
    });
    typewriter(ctx, 40, 240, 'let arr = [10,20,30,40,50,60,70];\narr.slice(1, 4); // [20,30,40]\narr.slice(0, 3); // [10,20,30]\narr.slice(3);    // [40,50,60,70]\n// Original array is unchanged!', t * 10, { speed: 22, colors: [P.cyan, P.green, P.cyan, P.pink, P.faint] });
    txt(ctx, cx, h - 18, "slice(start, end) extracts elements from start up to but NOT including end", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ STRINGS ═══════════════

  function subConcatenation(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "String Concatenation — Joining Text", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    var pairs = [
      { a: '"Hello"', b: '" World"', result: '"Hello World"', sep: " + ", color: P.green },
      { a: '"Total: "', b: '"$42"', result: '"Total: $42"', sep: " + ", color: P.amber },
      { a: '"Good"', b: '" morning"', result: '"Good morning"', sep: " + ", color: P.pink }
    ];
    var p = pairs[phase];
    // Two boxes merging
    var mergeP = Math.min(1, (t % 3) * 0.6);
    var boxW = 120, boxH = 50;
    var gap = lerp(100, 10, mergeP);
    var leftX = cx - gap / 2 - boxW;
    var rightX = cx + gap / 2;
    box(ctx, leftX, 80, boxW, boxH, { stroke: P.cyan, glow: mergeP < 1 ? P.cyan : null });
    txt(ctx, leftX + boxW / 2, 105, p.a, { sz: 12, c: P.cyan, w: "600" });
    box(ctx, rightX, 80, boxW, boxH, { stroke: P.pink, glow: mergeP < 1 ? P.pink : null });
    txt(ctx, rightX + boxW / 2, 105, p.b, { sz: 12, c: P.pink, w: "600" });
    // Plus sign
    txt(ctx, cx, 105, p.sep, { sz: 16, c: P.amber, w: "700" });
    // Result
    if (mergeP > 0.5) {
      var resW = 200;
      box(ctx, cx - resW / 2, 155, resW, 50, { stroke: p.color, glow: p.color });
      txt(ctx, cx, 180, p.result, { sz: 14, c: p.color, w: "700" });
      arrow(ctx, cx, 132, cx, 153, { c: p.color, hd: 5 });
    }
    // Template literal alternative
    box(ctx, 30, 230, w - 60, 50, { r: 8, stroke: P.cyan });
    txt(ctx, cx, 248, "Better: use template literals `Hello ${name}`", { sz: 10, c: P.cyan });
    typewriter(ctx, 30, 300, '// Concatenation:\nlet msg = "Hello" + " " + "World";\n\n// Template literals (better):\nlet name = "Jay";\nlet msg2 = `Hello ${name}!`;', t * 10, { speed: 25, colors: [P.faint, P.text, P.text, P.faint, P.text, P.cyan] });
    txt(ctx, cx, h - 18, "+ joins strings, but template literals are cleaner and more readable", { sz: 9, c: P.faint, m: false });
  }

  function subInterpolation(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "String Interpolation — Embed Values in Text", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // Template string with placeholders
    var template = "Hello, {name}! You are {age}.";
    var replacements = [
      { name: "Alice", age: "25" },
      { name: "Bob", age: "30" },
      { name: "Mia", age: "19" }
    ];
    var rep = replacements[phase];
    var finalStr = template.replace("{name}", rep.name).replace("{age}", rep.age);
    // Template box
    box(ctx, 30, 60, w - 60, 50, { r: 8, stroke: P.cyan });
    txt(ctx, cx, 85, "Template: `" + template + "`", { sz: 11, c: P.cyan });
    // Placeholders highlighted
    var placeholderY = 130;
    var parts = ["Hello, ", "{name}", "! You are ", "{age}", "."];
    var px = 60;
    parts.forEach(function(part) {
      var isPlaceholder = part.charAt(0) === "{";
      var pw = ctx.measureText(part).width + 10;
      if (isPlaceholder) {
        box(ctx, px, placeholderY, pw, 30, { stroke: P.amber, glow: P.amber });
        txt(ctx, px + pw / 2, placeholderY + 15, part, { sz: 11, c: P.amber, w: "700" });
        // Value being inserted
        var val = part === "{name}" ? rep.name : rep.age;
        arrow(ctx, px + pw / 2, placeholderY - 5, px + pw / 2, placeholderY + 2, { c: P.green, hd: 4 });
        txt(ctx, px + pw / 2, placeholderY - 16, '"' + val + '"', { sz: 10, c: P.green, w: "700" });
      } else {
        txt(ctx, px + pw / 2, placeholderY + 15, part, { sz: 11, c: P.dim });
      }
      px += pw;
    });
    // Result
    box(ctx, 30, 190, w - 60, 50, { r: 8, stroke: P.green, glow: P.green });
    txt(ctx, cx, 215, "Result: \"" + finalStr + "\"", { sz: 13, c: P.green, w: "700" });
    typewriter(ctx, 30, 260, 'let name = "' + rep.name + '";\nlet age = ' + rep.age + ';\n\n// Template literals with ${}:\nlet msg = `Hello, ${name}! You are ${age}.`;\n// "' + finalStr + '"', t * 10, { speed: 22, colors: [P.text, P.text, P.faint, P.cyan, P.cyan, P.green] });
    txt(ctx, cx, h - 18, "${} inside backticks inserts variable values directly into strings", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ ERROR HANDLING ═══════════════

  function subTryCatch(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Try-Catch — Graceful Error Handling", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3.5, 3);
    var cx = w / 2;
    // Try block
    var tryX = 40, tryW = cx - 60;
    box(ctx, tryX, 60, tryW, 200, { r: 10, stroke: P.green });
    txt(ctx, tryX + tryW / 2, 78, "try", { sz: 12, c: P.green, w: "700" });
    var tryCode = ['let data = JSON.parse(input);', 'console.log(data.name);', 'processData(data);'];
    tryCode.forEach(function(l, i) {
      var highlight = phase === 0 && i === cyc(t, 0.6, 3);
      txt(ctx, tryX + 16, 108 + i * 30, l, { sz: 9, c: highlight ? P.green : P.dim, a: "left", m: false });
    });
    // Catch block
    var catchX = cx + 20, catchW = cx - 60;
    box(ctx, catchX, 60, catchW, 200, { r: 10, stroke: phase === 1 ? P.rose : P.border, glow: phase === 1 ? P.rose : null });
    txt(ctx, catchX + catchW / 2, 78, "catch (err)", { sz: 12, c: P.rose, w: "700" });
    var catchCode = ['console.error(err.message);', 'showErrorPage(err);', 'logToServer(err);'];
    catchCode.forEach(function(l, i) {
      txt(ctx, catchX + 16, 108 + i * 30, l, { sz: 9, c: phase === 1 ? P.rose : P.dim, a: "left", m: false });
    });
    // Flow arrow
    if (phase === 0) {
      // Normal flow through try
      arrow(ctx, tryX + tryW / 2, 95, tryX + tryW / 2, 265, { c: P.green, hd: 5 });
      txt(ctx, tryX + tryW / 2, 275, "Normal path", { sz: 9, c: P.green });
    } else if (phase === 1) {
      // Error diverts to catch
      arrow(ctx, tryX + 40, 160, catchX, 160, { c: P.rose, hd: 6, lw: 2 });
      txt(ctx, cx, 150, "ERROR!", { sz: 12, c: P.rose, w: "700" });
      arrow(ctx, catchX + catchW / 2, 95, catchX + catchW / 2, 265, { c: P.rose, hd: 5 });
      txt(ctx, catchX + catchW / 2, 275, "Error path", { sz: 9, c: P.rose });
    } else {
      // Both paths work
      arrow(ctx, tryX + tryW / 2, 265, tryX + tryW / 2, 295, { c: P.green, hd: 5 });
      arrow(ctx, catchX + catchW / 2, 265, catchX + catchW / 2, 295, { c: P.rose, hd: 5 });
      box(ctx, 40, 300, w - 80, 30, { stroke: P.cyan });
      txt(ctx, cx, 315, "Program continues either way — no crash!", { sz: 10, c: P.cyan });
    }
    txt(ctx, cx, h - 18, "try wraps risky code, catch handles errors gracefully", { sz: 9, c: P.faint, m: false });
  }

  function subThrowingErrors(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Throwing Errors — Raising Exceptions", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3.5, 3);
    var cx = w / 2;
    // Call stack boxes
    var stackFrames = [
      { name: "main()", y: 260, color: P.dim },
      { name: "fetchUser()", y: 200, color: P.dim },
      { name: "parseData()", y: 140, color: phase >= 1 ? P.rose : P.dim }
    ];
    stackFrames.forEach(function(f, i) {
      var active = i === 2 && phase >= 1;
      box(ctx, 50, f.y, 200, 44, { stroke: active ? P.rose : P.border, glow: active ? P.rose : null });
      txt(ctx, 150, f.y + 22, f.name, { sz: 11, c: active ? P.rose : f.color, w: "600" });
      if (i < 2) arrow(ctx, 150, f.y - 4, 150, f.y + 4, { c: P.faint, hd: 4 });
    });
    if (phase >= 1) {
      // Error icon being thrown upward
      var errY = lerp(140, 80, Math.min(1, (t % 3.5) * 0.8));
      ctx.save();
      ctx.fillStyle = P.rose;
      ctx.shadowColor = P.rose;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, errY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      txt(ctx, cx, errY, "!", { sz: 18, c: P.text, w: "900" });
      txt(ctx, cx, errY - 32, "throw new Error(...)", { sz: 10, c: P.rose, w: "700" });
    }
    // Right side explanation
    var rightX = 280;
    var rightW = w - rightX - 20;
    if (rightW > 60) {
      box(ctx, rightX, 60, rightW, 280, { r: 10, stroke: P.orange });
      txt(ctx, rightX + rightW / 2, 78, "ERROR TRAVELS UP", { sz: 10, c: P.orange, w: "700" });
      var arrows = [
        "parseData() throws",
        "  ↓ caught by?",
        "fetchUser() — no catch",
        "  ↓ continues up",
        "main() — has catch!",
        "  → error handled"
      ];
      arrows.forEach(function(l, i) {
        txt(ctx, rightX + 10, 104 + i * 24, l, { sz: 9, c: i === 4 ? P.green : P.dim, a: "left", m: false });
      });
    }
    typewriter(ctx, 30, 320, 'function parseData(input) {\n  if (!input) throw new Error("No data");\n  return JSON.parse(input);\n}\n// Error bubbles up the call stack', t * 10, { speed: 22, colors: [P.cyan, P.rose, P.text, P.text, P.faint] });
    txt(ctx, cx, h - 18, "throw creates an error that travels up the call stack until caught", { sz: 9, c: P.faint, m: false });
  }

  function subFinally(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Finally — Always Runs, No Matter What", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 3);
    var cx = w / 2;
    // Three paths
    var paths = [
      { label: "Normal", color: P.green, startY: 60 },
      { label: "Error", color: P.rose, startY: 130 },
      { label: "Return", color: P.amber, startY: 200 }
    ];
    paths.forEach(function(p, i) {
      var active = i === phase;
      box(ctx, 30, p.startY, 100, 40, { stroke: active ? p.color : P.border, glow: active ? p.color : null });
      txt(ctx, 80, p.startY + 20, p.label, { sz: 10, c: active ? p.color : P.dim, w: "700" });
      // Arrow to finally
      arrow(ctx, 132, p.startY + 20, cx - 40, p.startY + 20, { c: active ? p.color : P.faint, hd: 5 });
    });
    // Finally block (convergence point)
    box(ctx, cx - 40, 60, 120, 200, { r: 12, stroke: P.cyan, glow: P.cyan });
    txt(ctx, cx + 20, 80, "finally", { sz: 12, c: P.cyan, w: "700" });
    var finallyCode = ["cleanup()", "closeFile()", "release()"];
    finallyCode.forEach(function(l, i) {
      txt(ctx, cx + 20, 120 + i * 30, l, { sz: 10, c: P.cyan });
    });
    // Right side: explanation
    var rightX = cx + 100;
    var rightW = w - rightX - 20;
    if (rightW > 60) {
      box(ctx, rightX, 60, rightW, 200, { r: 10, stroke: P.dim });
      txt(ctx, rightX + rightW / 2, 80, "WHEN IT RUNS", { sz: 9, c: P.cyan, w: "700" });
      var reasons = [
        "✓ After try succeeds",
        "✓ After catch handles",
        "✓ After return executes",
        "✓ Even on uncaught errors",
        "",
        "Use for cleanup:",
        "  close connections",
        "  release locks",
        "  free resources"
      ];
      reasons.forEach(function(l, i) {
        txt(ctx, rightX + 10, 104 + i * 18, l, { sz: 9, c: P.dim, a: "left", m: false });
      });
    }
    typewriter(ctx, 30, 285, 'try {\n  openFile();\n  processData();\n} catch (err) {\n  handleError(err);\n} finally {\n  closeFile(); // ALWAYS runs\n}', t * 10, { speed: 22, colors: [P.green, P.text, P.text, P.rose, P.text, P.cyan, P.cyan] });
    txt(ctx, cx, h - 18, "finally always executes — whether try succeeds, fails, or returns", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ SORTING ═══════════════

  function subInsertionSort(canvas, ctx, w, h, t) {
    var steps = insertionSortSteps([5, 3, 8, 1, 4, 7, 2, 6]);
    var code = 'for (let i = 1; i < n; i++) {\n  let key = arr[i], j = i - 1;\n  while (j >= 0 && arr[j] > key) {\n    arr[j+1] = arr[j]; j--;\n  }\n  arr[j+1] = key;\n}';
    renderSortVis(ctx, w, h, t, steps, "Insertion Sort — Pick & Place at Correct Position", code, "O(n²) time | O(1) space — efficient for small/nearly sorted arrays");
  }

  function subSelectionSort(canvas, ctx, w, h, t) {
    var steps = selectionSortSteps([5, 3, 8, 1, 4, 7, 2, 6]);
    var code = 'for (let i = 0; i < n; i++) {\n  let minIdx = i;\n  for (let j = i+1; j < n; j++)\n    if (arr[j] < arr[minIdx]) minIdx = j;\n  swap(arr, i, minIdx);\n}';
    renderSortVis(ctx, w, h, t, steps, "Selection Sort — Find Minimum, Swap to Front", code, "O(n²) time | O(1) space — minimal swaps, good for small arrays");
  }

  // ═══════════════ SEARCHING ═══════════════

  function subHashSearch(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Hash Search — Key → Hash → Direct Lookup", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 3, 3);
    var cx = w / 2;
    // Key
    var keys = ['"name"', '"age"', '"email"'];
    var hashes = [2, 0, 3];
    var buckets = [null, '"email"', '"name"', '"age"'];
    var key = keys[phase];
    var hash = hashes[phase];
    // Key box
    box(ctx, 30, 70, 100, 44, { stroke: P.amber, glow: P.amber });
    txt(ctx, 80, 92, "Key: " + key, { sz: 10, c: P.amber, w: "700" });
    // Hash function
    box(ctx, 150, 70, 120, 44, { stroke: P.orange });
    txt(ctx, 210, 85, "hash()", { sz: 10, c: P.orange, w: "700" });
    txt(ctx, 210, 102, "function", { sz: 8, c: P.dim });
    arrow(ctx, 132, 92, 148, 92, { c: P.amber, hd: 5 });
    // Index
    box(ctx, 290, 70, 60, 44, { stroke: P.green, glow: P.green });
    txt(ctx, 320, 92, "[" + hash + "]", { sz: 14, c: P.green, w: "700" });
    arrow(ctx, 272, 92, 288, 92, { c: P.orange, hd: 5 });
    // Buckets
    var bucketX = 30, bucketY = 150, bucketW = 80, bucketGap = 10;
    for (var i = 0; i < 4; i++) {
      var bx = bucketX + i * (bucketW + bucketGap);
      var isActive = i === hash;
      box(ctx, bx, bucketY, bucketW, 44, { stroke: isActive ? P.green : P.border, glow: isActive ? P.green : null });
      txt(ctx, bx + bucketW / 2, bucketY + 12, "[" + i + "]", { sz: 8, c: P.faint });
      txt(ctx, bx + bucketW / 2, bucketY + 32, buckets[i] || "empty", { sz: 10, c: isActive ? P.green : P.dim });
      if (isActive) {
        arrow(ctx, 320, 116, bx + bucketW / 2, bucketY - 4, { c: P.green, hd: 5, lw: 2 });
      }
    }
    // Time complexity
    box(ctx, 30, 220, w - 60, 40, { r: 6, stroke: P.cyan });
    txt(ctx, cx, 240, "O(1) average — direct bucket access, no scanning!", { sz: 11, c: P.cyan, w: "700" });
    typewriter(ctx, 30, 280, '// Hash table lookup:\nlet map = {};\nmap["name"] = "Jay";  // hash("name") → bucket 2\nmap["age"] = 25;     // hash("age") → bucket 0\nmap["name"];         // O(1) — direct access!', t * 10, { speed: 22, colors: [P.faint, P.cyan, P.amber, P.amber, P.green] });
    txt(ctx, cx, h - 18, "Hash function maps keys to array indices — instant lookup, no searching", { sz: 9, c: P.faint, m: false });
  }

  function subDfsBfs(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "DFS vs BFS — Two Graph Traversal Strategies", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 2);
    var cx = w / 2;
    // Simple graph
    var nodes = [
      { id: 0, label: "A", x: cx, y: 80 },
      { id: 1, label: "B", x: cx - 80, y: 140 },
      { id: 2, label: "C", x: cx + 80, y: 140 },
      { id: 3, label: "D", x: cx - 120, y: 210 },
      { id: 4, label: "E", x: cx - 40, y: 210 },
      { id: 5, label: "F", x: cx + 40, y: 210 },
      { id: 6, label: "G", x: cx + 120, y: 210 }
    ];
    var edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
    // DFS order (deep first)
    var dfsOrder = [0, 1, 3, 4, 2, 5, 6];
    // BFS order (level by level)
    var bfsOrder = [0, 1, 2, 3, 4, 5, 6];
    var order = phase === 0 ? dfsOrder : bfsOrder;
    var color = phase === 0 ? P.cyan : P.green;
    var label = phase === 0 ? "DFS — Go Deep First" : "BFS — Go Level by Level";
    // Draw edges
    edges.forEach(function(e) {
      var n1 = nodes[e[0]], n2 = nodes[e[1]];
      arrow(ctx, n1.x, n1.y + 16, n2.x, n2.y - 16, { c: P.faint, lw: 1, hd: 3 });
    });
    // Animate visit order
    var visitCount = Math.floor((t * 1.2) % (order.length + 2));
    nodes.forEach(function(n, i) {
      var visitIdx = order.indexOf(i);
      var visited = visitIdx < visitCount;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = P.panel2;
      if (visited) { ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = 12; }
      ctx.fill();
      if (visited) ctx.restore();
      ctx.strokeStyle = visited ? color : P.border;
      ctx.lineWidth = 2;
      ctx.stroke();
      txt(ctx, n.x, n.y, n.label, { sz: 12, c: visited ? color : P.dim, w: "700" });
      // Visit number
      if (visited && visitIdx >= 0) {
        txt(ctx, n.x + 24, n.y - 14, "#" + (visitIdx + 1), { sz: 8, c: color, w: "700" });
      }
    });
    // Label
    txt(ctx, cx, 260, label, { sz: 12, c: color, w: "700" });
    // Visit sequence
    var seq = order.slice(0, visitCount).map(function(i) { return nodes[i].label; }).join(" → ");
    txt(ctx, cx, 285, "Visited: " + (seq || "..."), { sz: 10, c: P.dim });
    typewriter(ctx, 30, 310, '// DFS: use a STACK (go deep)\n// BFS: use a QUEUE (level order)\n\nfunction dfs(node) {\n  visit(node);\n  for (child of node.children)\n    dfs(child);\n}', t * 10, { speed: 22, colors: [phase === 0 ? P.cyan : P.faint, phase === 1 ? P.green : P.faint, P.text, P.text, P.text, P.text, P.text] });
    txt(ctx, cx, h - 18, "DFS explores depth-first (stack), BFS explores breadth-first (queue)", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ OOP ═══════════════

  function subAbstraction(canvas, ctx, w, h, t) {
    txt(ctx, w/2, 16, "Abstraction — Simple Interface, Complex Implementation", { sz: 13, c: P.cyan, w: "700" });
    var cx = w / 2;
    
    box(ctx, cx - 120, 50, 240, 80, { stroke: P.green, glow: P.green, r: 10 });
    txt(ctx, cx, 70, "Car Interface", { sz: 12, c: P.green, w: "700" });
    txt(ctx, cx, 90, "start()   stop()   accelerate()", { sz: 10, c: P.text });
    txt(ctx, cx, 108, "steer()   brake()   getSpeed()", { sz: 10, c: P.text });
    
    ctx.globalAlpha = 0.3 + Math.abs(Math.sin(t * 0.5)) * 0.2;
    box(ctx, cx - 140, 145, 280, 100, { stroke: P.rose, r: 8 });
    txt(ctx, cx, 160, "Complex Internals (HIDDEN)", { sz: 10, c: P.rose, w: "700" });
    txt(ctx, cx, 178, "engine management, fuel injection, ignition timing,", { sz: 8, c: P.dim });
    txt(ctx, cx, 192, "transmission control, ABS, traction control,", { sz: 8, c: P.dim });
    txt(ctx, cx, 206, "ECU calibration, O2 sensors, turbo boost...", { sz: 8, c: P.dim });
    txt(ctx, cx, 224, "-> User doesn't need to know any of this!", { sz: 9, c: P.rose });
    ctx.globalAlpha = 1;
    
    arrow(ctx, cx, 132, cx, 143, { c: P.faint, lw: 1, hd: 4 });
    txt(ctx, cx + 90, 138, "abstraction layer", { sz: 8, c: P.faint });
    
    var userX = lerp(cx - 180, cx - 120, (Math.sin(t * 1.5) + 1) / 2);
    txt(ctx, userX, 90, "USER", { sz: 10, c: P.amber, w: "700" });
    
    box(ctx, 30, 270, w - 60, 55, { r: 6, stroke: P.dim });
    txt(ctx, cx, 285, "User calls: car.start() -> simple, clean, easy", { sz: 10, c: P.green });
    txt(ctx, cx, 303, "Behind scenes: 1000s of lines of engine code execute automatically", { sz: 9, c: P.dim });
    
    typewriter(ctx, 20, 340, 'class Car:\n    def start(self):\n        self._engine.ignition()\n        self._fuel.inject()\n        self._ecu.calibrate()\n        # user just calls car.start()!', t * 10, { speed: 20 });
    
    txt(ctx, cx, h - 18, "Abstraction: show only essential features, hide implementation complexity", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ TIME COMPLEXITY ═══════════════

  function subBigONotation(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Big O Notation — How Algorithms Scale", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    // Graph area
    var graphX = 50, graphY = 60, graphW = w * 0.55, graphH = 240;
    box(ctx, graphX, graphY, graphW, graphH, { r: 8, stroke: P.faint });
    // Axes
    arrow(ctx, graphX, graphY + graphH - 20, graphX + graphW - 10, graphY + graphH - 20, { c: P.dim, hd: 5 });
    arrow(ctx, graphX, graphY + graphH - 20, graphX, graphY + 10, { c: P.dim, hd: 5 });
    txt(ctx, graphX + graphW / 2, graphY + graphH - 5, "Input size (n)", { sz: 8, c: P.dim });
    txt(ctx, graphX - 10, graphY + graphH / 2, "Time", { sz: 8, c: P.dim });
    // Growth curves
    var curves = [
      { label: "O(1)", color: P.green, fn: function(x) { return 10; } },
      { label: "O(log n)", color: P.cyan, fn: function(x) { return 10 + 30 * Math.log(x + 1); } },
      { label: "O(n)", color: P.amber, fn: function(x) { return 10 + x * 1.5; } },
      { label: "O(n²)", color: P.rose, fn: function(x) { return 10 + x * x * 0.04; } }
    ];
    curves.forEach(function(c, ci) {
      ctx.beginPath();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2.5;
      ctx.save();
      ctx.shadowColor = c.color;
      ctx.shadowBlur = 6;
      for (var px = 0; px <= graphW - 30; px++) {
        var xVal = (px / (graphW - 30)) * 50;
        var yVal = Math.min(graphH - 30, c.fn(xVal));
        var drawX = graphX + 10 + px;
        var drawY = graphY + graphH - 20 - yVal;
        if (px === 0) ctx.moveTo(drawX, drawY);
        else ctx.lineTo(drawX, drawY);
      }
      ctx.stroke();
      ctx.restore();
      // Label at end
      var endX = graphX + graphW - 20;
      var endY = graphY + graphH - 20 - Math.min(graphH - 30, c.fn(50));
      txt(ctx, endX, endY - 10, c.label, { sz: 9, c: c.color, w: "700", a: "right" });
    });
    // Right side: description
    var rightX = graphX + graphW + 20;
    var rightW = w - rightX - 20;
    if (rightW > 60) {
      box(ctx, rightX, graphY, rightW, graphH, { r: 8, stroke: P.dim });
      txt(ctx, rightX + rightW / 2, graphY + 18, "COMPARISON", { sz: 9, c: P.cyan, w: "700" });
      var descs = [
        { o: "O(1)", desc: "Constant — same time always", color: P.green },
        { o: "O(log n)", desc: "Logarithmic — very fast", color: P.cyan },
        { o: "O(n)", desc: "Linear — scales with input", color: P.amber },
        { o: "O(n²)", desc: "Quadratic — slow for big data", color: P.rose }
      ];
      descs.forEach(function(d, i) {
        txt(ctx, rightX + 10, graphY + 42 + i * 48, d.o, { sz: 11, c: d.color, w: "700", a: "left" });
        txt(ctx, rightX + 10, graphY + 60 + i * 48, d.desc, { sz: 8, c: P.dim, a: "left", m: false });
      });
    }
    typewriter(ctx, 30, 320, '// O(1): array[index], hash[key]\n// O(log n): binary search\n// O(n): linear search, loop\n// O(n²): nested loops, bubble sort', t * 10, { speed: 25, colors: [P.green, P.cyan, P.amber, P.rose] });
    txt(ctx, cx, h - 18, "Big O describes how runtime grows as input size increases", { sz: 9, c: P.faint, m: false });
  }

  function subSpaceComplexity(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Space Complexity — Memory Usage Over Time", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 2);
    var cx = w / 2;

    if (phase === 0) {
      txt(ctx, cx, 48, "O(1) SPACE: Constant Memory", { sz: 10, c: P.green, w: "700" });
      var programs = [
        { label: "Iterative Sum", space: 0.12, color: P.green, code: "function sum(arr) {\n  let total = 0;\n  for (let v of arr)\n    total += v;\n  return total;\n}" },
        { label: "Two Pointers", space: 0.10, color: P.cyan, code: "function isPal(s) {\n  let lo = 0, hi = s.length-1;\n  while (lo < hi)\n    if (s[lo++] !== s[hi--])\n      return false;\n  return true;\n}" }
      ];
      programs.forEach(function(p, i) {
        var py = 70 + i * 130;
        box(ctx, 30, py, 180, 110, { r: 8, stroke: p.color, glow: i === cyc(t, 2, 2) ? p.color : null });
        txt(ctx, 120, py + 16, p.label, { sz: 10, c: p.color, w: "700" });
        var lines = p.code.split("\n");
        lines.forEach(function(l, li) {
          txt(ctx, 42, py + 34 + li * 14, l, { sz: 8, c: P.dim, a: "left", m: false });
        });
        var barMaxW = w - 250;
        box(ctx, 230, py + 20, barMaxW, 28, { r: 6, stroke: P.border });
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = p.color;
        ctx.fillRect(232, py + 22, barMaxW * p.space, 24);
        ctx.restore();
        txt(ctx, 236, py + 34, "O(1) — fixed memory", { sz: 9, c: p.color, a: "left" });
      });
      box(ctx, 230, 210, w - 260, 40, { stroke: P.green });
      txt(ctx, 230 + (w - 260) / 2, 230, "Same memory regardless of input size", { sz: 10, c: P.green });
      txt(ctx, cx, h - 18, "O(1) space: uses a fixed number of variables no matter the input", { sz: 9, c: P.faint, m: false });
    } else {
      txt(ctx, cx, 48, "O(n) SPACE: Grows With Input", { sz: 10, c: P.rose, w: "700" });
      var programs2 = [
        { label: "Copy Array", space: 0.6, color: P.amber, code: "function copy(arr) {\n  let result = [];\n  for (let v of arr)\n    result.push(v);\n  return result;\n}" },
        { label: "Recursive Factorial", space: 0.5, color: P.rose, code: "function fact(n) {\n  if (n <= 1) return 1;\n  return n * fact(n-1);\n  // stack grows: O(n)\n}" }
      ];
      programs2.forEach(function(p, i) {
        var py = 70 + i * 130;
        box(ctx, 30, py, 180, 110, { r: 8, stroke: p.color, glow: i === cyc(t, 2, 2) ? p.color : null });
        txt(ctx, 120, py + 16, p.label, { sz: 10, c: p.color, w: "700" });
        var lines = p.code.split("\n");
        lines.forEach(function(l, li) {
          txt(ctx, 42, py + 34 + li * 14, l, { sz: 8, c: P.dim, a: "left", m: false });
        });
        var barMaxW = w - 250;
        box(ctx, 230, py + 20, barMaxW, 28, { r: 6, stroke: P.border });
        var growFactor = Math.min(1, (t % 4) / 3);
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = p.color;
        ctx.fillRect(232, py + 22, barMaxW * p.space * growFactor, 24);
        ctx.restore();
        txt(ctx, 236, py + 34, "O(n) — grows with input", { sz: 9, c: p.color, a: "left" });
      });
      box(ctx, 230, 210, w - 260, 40, { stroke: P.rose });
      txt(ctx, 230 + (w - 260) / 2, 230, "Memory usage scales linearly with input size", { sz: 10, c: P.rose });
      txt(ctx, cx, h - 18, "O(n) space: memory grows proportionally to input size", { sz: 9, c: P.faint, m: false });
    }
  }

  function subCommonComplexities(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Common Complexities — Side-by-Side Comparison", { sz: 11, c: P.cyan, w: "700" });
    var cx = w / 2;
    var complexities = [
      { bigO: "O(1)", name: "Constant", example: "Array index, HashMap get", color: P.green, bar: 0.08 },
      { bigO: "O(log n)", name: "Logarithmic", example: "Binary search", color: P.cyan, bar: 0.18 },
      { bigO: "O(n)", name: "Linear", example: "Linear search, for loop", color: P.amber, bar: 0.35 },
      { bigO: "O(n log n)", name: "Linearithmic", example: "Merge sort, quicksort", color: P.orange, bar: 0.50 },
      { bigO: "O(n²)", name: "Quadratic", example: "Bubble sort, nested loops", color: P.rose, bar: 0.75 },
      { bigO: "O(2ⁿ)", name: "Exponential", example: "Recursive Fibonacci", color: P.pink, bar: 1.0 }
    ];
    // Animated n value
    var nVal = Math.floor(lerp(1, 16, (t % 5) / 5));
    complexities.forEach(function(c, i) {
      var iy = 55 + i * 42;
      var barW = c.bar * (w * 0.4) * (nVal / 16);
      // Label
      txt(ctx, 60, iy + 14, c.bigO, { sz: 11, c: c.color, w: "700", a: "right" });
      // Bar
      box(ctx, 80, iy, Math.max(4, barW), 28, { r: 4, stroke: c.color, fill: c.color });
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillRect(80, iy, Math.max(4, barW), 28);
      ctx.restore();
      // Name + example
      txt(ctx, 86, iy + 14, c.name + " — " + c.example, { sz: 8, c: P.text, a: "left" });
    });
    // n label
    txt(ctx, cx, 330, "n = " + nVal, { sz: 12, c: P.cyan, w: "700" });
    typewriter(ctx, 30, 350, '// Fast:          // Slow:\nO(1)   lookup     O(n²) nested loop\nO(log n) search   O(2ⁿ) recursion\n// Always aim for the top!', t * 10, { speed: 25, colors: [P.green, P.rose, P.cyan, P.pink, P.faint] });
    txt(ctx, cx, h - 18, "Faster algorithms = fewer operations = better performance at scale", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ RECURSION ═══════════════

  function subBaseCase(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Base Case — Where Recursion Stops", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 4);
    var cx = w / 2;
    // Stack frames
    var frames = [
      { label: "factorial(5)", returnVal: "5 × 24 = 120", y: 300 },
      { label: "factorial(4)", returnVal: "4 × 6 = 24", y: 252 },
      { label: "factorial(3)", returnVal: "3 × 2 = 6", y: 204 },
      { label: "factorial(2)", returnVal: "2 × 1 = 2", y: 156 },
      { label: "factorial(1)", returnVal: "BASE → 1", y: 108 }
    ];
    // Left: stack frames
    box(ctx, 30, 70, w * 0.5, h - 110, { r: 10, stroke: P.blue });
    txt(ctx, 30 + w * 0.25, 86, "CALL STACK", { sz: 9, c: P.blue, w: "700" });
    var visibleDown = Math.min(phase + 1, 5);
    for (var i = 0; i < visibleDown; i++) {
      var f = frames[i];
      var isBase = i === 4;
      var isUnwinding = phase >= 3 && i <= (phase - 3);
      box(ctx, 45, f.y, w * 0.5 - 30, 40, {
        stroke: isBase ? P.green : (isUnwinding ? P.amber : P.border),
        glow: isBase && phase >= 2 ? P.green : null
      });
      txt(ctx, 30 + w * 0.25, f.y + 20, f.label, {
        sz: 10, c: isBase ? P.green : (isUnwinding ? P.amber : P.dim)
      });
    }
    // Right: return values appearing
    var rightX = 30 + w * 0.5 + 15;
    var rightW = w - rightX - 20;
    if (rightW > 60) {
      box(ctx, rightX, 70, rightW, h - 110, { r: 10, stroke: P.amber });
      txt(ctx, rightX + rightW / 2, 86, "RETURN VALUES", { sz: 9, c: P.amber, w: "700" });
      if (phase >= 2) {
        for (var j = 4; j >= Math.max(0, 4 - (phase - 2)); j--) {
          var fj = frames[j];
          var ry = 110 + (4 - j) * 44;
          box(ctx, rightX + 10, ry, rightW - 20, 36, { stroke: j === 4 ? P.green : P.amber });
          txt(ctx, rightX + rightW / 2, ry + 18, fj.returnVal, { sz: 9, c: j === 4 ? P.green : P.amber });
        }
      }
    }
    // Caption
    var cap = phase < 2 ? "Building up: recursive calls keep calling..." : phase < 3 ? "Base case hit! factorial(1) = 1 — recursion STOPS" : "Unwinding: each call returns its value back up";
    txt(ctx, cx, h - 55, cap, { sz: 10, c: phase === 2 ? P.green : P.dim });
    typewriter(ctx, 30, h - 40, 'function factorial(n) {\n  if (n <= 1) return 1;  // BASE CASE\n  return n * factorial(n - 1);\n}', t * 10, { speed: 28, colors: [P.cyan, P.green, P.amber] });
    txt(ctx, cx, h - 18, "Base case stops recursion — without it, infinite loop (stack overflow!)", { sz: 9, c: P.faint, m: false });
  }

  function subTailRecursion(canvas, ctx, w, h, t) {
    txt(ctx, w / 2, 18, "Tail Recursion — Optimized Stack Usage", { sz: 11, c: P.cyan, w: "700" });
    var phase = cyc(t, 4, 2);
    var cx = w / 2;
    if (phase === 0) {
      // Normal recursion — growing stack
      txt(ctx, cx, 48, "NORMAL Recursion: Stack Grows", { sz: 10, c: P.rose, w: "700" });
      var frames = ["factorial(5,1)", "factorial(4,5)", "factorial(3,20)", "factorial(2,60)", "factorial(1,120)"];
      var visible = Math.min(Math.floor((t % 4) * 1.5) + 1, 5);
      for (var i = 0; i < visible; i++) {
        var fy = 280 - i * 44;
        var isTop = i === visible - 1;
        box(ctx, 50, fy, 220, 38, { stroke: isTop ? P.rose : P.border, glow: isTop ? P.rose : null });
        txt(ctx, 160, fy + 19, frames[i], { sz: 10, c: isTop ? P.rose : P.dim });
      }
      // Stack height indicator
      var stackH = visible * 44;
      ctx.save();
      ctx.strokeStyle = P.rose;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(40, 280);
      ctx.lineTo(40, 280 - stackH + 38);
      ctx.stroke();
      ctx.restore();
      txt(ctx, 25, 280 - stackH / 2, visible + " frames", { sz: 9, c: P.rose });
      // Right side
      var rightX = 300;
      var rightW = w - rightX - 20;
      if (rightW > 60) {
        box(ctx, rightX, 70, rightW, 250, { r: 10, stroke: P.rose });
        txt(ctx, rightX + rightW / 2, 90, "PROBLEM", { sz: 10, c: P.rose, w: "700" });
        var probs = ["Each call adds a", "new stack frame.", "", "Memory grows with", "recursion depth.", "", "Stack overflow risk!"];
        probs.forEach(function(l, i) {
          txt(ctx, rightX + 10, 116 + i * 22, l, { sz: 9, c: P.dim, a: "left", m: false });
        });
      }
    } else {
      // Tail recursion — flat stack
      txt(ctx, cx, 48, "TAIL Recursion: Stack Reused (O(1))", { sz: 10, c: P.green, w: "700" });
      // Single frame that changes
      var vals = ["factorial(5,1)", "factorial(4,5)", "factorial(3,20)", "factorial(2,60)", "factorial(1,120)"];
      var curIdx = Math.floor((t % 4) * 1.5) % vals.length;
      box(ctx, 100, 200, 250, 50, { stroke: P.green, glow: P.green });
      txt(ctx, 225, 225, vals[curIdx], { sz: 12, c: P.green, w: "700" });
      txt(ctx, 225, 270, "SAME frame — reused!", { sz: 10, c: P.green });
      // Flat indicator
      ctx.save();
      ctx.strokeStyle = P.green;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 200);
      ctx.lineTo(80, 250);
      ctx.stroke();
      ctx.restore();
      txt(ctx, 60, 225, "1 frame", { sz: 9, c: P.green });
      // Right side
      var rightX2 = 380;
      var rightW2 = w - rightX2 - 20;
      if (rightW2 > 60) {
        box(ctx, rightX2, 70, rightW2, 250, { r: 10, stroke: P.green });
        txt(ctx, rightX2 + rightW2 / 2, 90, "BENEFIT", { sz: 10, c: P.green, w: "700" });
        var benefits = ["Compiler optimizes:", "reuses the same", "stack frame.", "", "O(1) memory!", "", "No stack overflow."];
        benefits.forEach(function(l, i) {
          txt(ctx, rightX2 + 10, 116 + i * 22, l, { sz: 9, c: P.dim, a: "left", m: false });
        });
      }
    }
    typewriter(ctx, 30, 310, '// Tail-recursive (optimized):\nfunction fact(n, acc) {\n  if (n <= 1) return acc;\n  return fact(n - 1, n * acc);\n}\nfact(5, 1); // → 120, O(1) memory!', t * 10, { speed: 22, colors: [P.faint, P.cyan, P.green, P.text, P.text, P.green] });
    txt(ctx, cx, h - 18, "Tail recursion: the recursive call is the LAST action — enables O(1) optimization", { sz: 9, c: P.faint, m: false });
  }

  // ═══════════════ FALLBACK ═══════════════

  function subtopicFallback(canvas, ctx, w, h, t, subtopicId) {
    var cx = w / 2, cy = h / 2;
    var p = pl(t, 1.5);
    // Pulsing border
    ctx.beginPath();
    rr(ctx, 30, 30, w - 60, h - 60, 16);
    ctx.strokeStyle = P.cyan;
    ctx.lineWidth = 2 + p * 2;
    ctx.save();
    ctx.shadowColor = P.cyan;
    ctx.shadowBlur = 10 + p * 15;
    ctx.stroke();
    ctx.restore();
    // Title
    txt(ctx, cx, cy - 10, subtopicId.replace(/-/g, " ").toUpperCase(), { sz: 16, c: P.cyan, w: "700" });
    txt(ctx, cx, cy + 20, "Visualization coming soon", { sz: 11, c: P.dim });
    // Decorative dots
    for (var i = 0; i < 6; i++) {
      var angle = (t * 0.5 + i * Math.PI / 3);
      var dx = cx + Math.cos(angle) * 80;
      var dy = cy + 50 + Math.sin(angle) * 30;
      ctx.beginPath();
      ctx.arc(dx, dy, 3, 0, Math.PI * 2);
      ctx.fillStyle = P.faint;
      ctx.globalAlpha = 0.3 + p * 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // ═══════════════ CATEGORY ANIMATION FUNCTIONS ═══════════════

  function subMemoryManagement(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 6, 4);
    txt(ctx, cx, 22, "Memory Management", { sz: 14, c: P.cyan, w: "700" });
    var cells = [
      { addr: "0x100", val: "42" }, { addr: "0x104", val: "7" },
      { addr: "0x108", val: "99" }, { addr: "0x10C", val: "0" }
    ];
    var cellX = 40, cellW = 100, cellH = 38;
    cells.forEach(function(c, i) {
      var cy2 = 60 + i * (cellH + 8);
      var active = i === phase;
      box(ctx, cellX, cy2, cellW, cellH, { stroke: active ? P.cyan : P.border, glow: active ? P.cyan : null });
      txt(ctx, cellX + 16, cy2 + cellH / 2, c.addr, { sz: 9, c: P.dim, a: "left" });
      txt(ctx, cellX + cellW - 16, cy2 + cellH / 2, c.val, { sz: 12, c: active ? P.cyan : P.text, w: "700", a: "right" });
    });
    var ptrX = 220, ptrY = 60 + phase * (cellH + 8) + cellH / 2;
    var pulse = pl(t, 2);
    box(ctx, ptrX, ptrY - 16, 80, 32, { stroke: P.orange, glow: P.orange });
    txt(ctx, ptrX + 40, ptrY, "ptr \u2192", { sz: 11, c: P.orange, w: "700" });
    arrow(ctx, ptrX, ptrY, cellX + cellW, 60 + phase * (cellH + 8) + cellH / 2, { c: P.orange, lw: 2, hd: 6 });
    txt(ctx, cx, h - 20, "Pointer stores address of target memory cell", { sz: 9, c: P.faint });
  }

  function subAssembly(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 4);
    txt(ctx, cx, 22, "Assembly Architecture", { sz: 14, c: P.cyan, w: "700" });
    var regs = ["RAX", "RBX", "RCX", "RDX"];
    var vals = ["0x0F", "0x14", "0x00", "0xFF"];
    regs.forEach(function(r, i) {
      var rx = 20 + i * 72, ry = 55;
      var active = phase < 2 ? i === 0 : i === 2;
      box(ctx, rx, ry, 64, 36, { stroke: active ? P.green : P.border, glow: active ? P.green : null });
      txt(ctx, rx + 32, ry + 12, r, { sz: 8, c: P.dim });
      txt(ctx, rx + 32, ry + 26, vals[i], { sz: 10, c: active ? P.green : P.text, w: "700" });
    });
    var stackX = cx + 60, stackY = 110, stackW = 120;
    box(ctx, stackX, stackY, stackW, h - 140, { r: 8, stroke: P.blue });
    txt(ctx, stackX + stackW / 2, stackY + 14, "STACK", { sz: 9, c: P.blue, w: "700" });
    var stackItems = [];
    if (phase >= 2) stackItems.push("0x00");
    if (phase >= 3) stackItems.push("0x14");
    stackItems.forEach(function(v, i) {
      var sy = stackY + 30 + i * 30;
      box(ctx, stackX + 10, sy, stackW - 20, 24, { stroke: P.blue });
      txt(ctx, stackX + stackW / 2, sy + 12, v, { sz: 10, c: P.blue, w: "700" });
    });
    if (phase < 2) {
      var srcIdx = phase === 0 ? 0 : 2;
      var tgtY = stackY + 30 + stackItems.length * 30;
      dataArrow(ctx, 20 + srcIdx * 72 + 32, 91, stackX + stackW / 2, tgtY, t, P.green, vals[srcIdx]);
      txt(ctx, cx - 30, 160, "PUSH", { sz: 10, c: P.green, w: "700" });
    } else {
      txt(ctx, cx - 30, 160, "POP", { sz: 10, c: P.rose, w: "700" });
    }
    txt(ctx, cx, h - 16, "Registers hold data; stack stores local variables", { sz: 9, c: P.faint });
  }

  function subOwnership(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 3);
    txt(ctx, cx, 22, "Ownership Transfer", { sz: 14, c: P.cyan, w: "700" });
    var boxes2 = [
      { name: "x", val: "val", x: 30, y: 90 },
      { name: "y", val: "", x: cx - 40, y: 90 },
      { name: "z", val: "", x: w - 120, y: 90 }
    ];
    if (phase === 0) { boxes2[0].val = "val"; boxes2[0].active = true; }
    if (phase === 1) { boxes2[0].faded = true; boxes2[1].val = "val"; boxes2[1].active = true; }
    if (phase === 2) { boxes2[1].faded = true; boxes2[2].val = "val"; boxes2[2].active = true; }
    boxes2.forEach(function(b) {
      var alpha = b.faded ? 0.3 : 1;
      ctx.globalAlpha = alpha;
      box(ctx, b.x, b.y, 80, 60, { stroke: b.active ? P.green : (b.faded ? P.border : P.border), glow: b.active ? P.green : null });
      txt(ctx, b.x + 40, b.y + 16, b.name, { sz: 11, c: P.text, w: "700" });
      txt(ctx, b.x + 40, b.y + 38, b.val || "---", { sz: 10, c: b.active ? P.green : P.dim });
      if (b.faded) {
        ctx.strokeStyle = P.rose; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x + 5, b.y + 30); ctx.lineTo(b.x + 75, b.y + 30); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
    if (phase === 0) {
      dataArrow(ctx, 110, 120, cx - 40, 120, t, P.green, "move");
    } else if (phase === 1) {
      dataArrow(ctx, cx + 40, 120, w - 120, 120, t, P.green, "move");
    }
    txt(ctx, cx, h - 16, "Ownership transfers to prevent data races; old variable is invalidated", { sz: 9, c: P.faint });
  }

  function subEnumAlgebraic(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 3, 3);
    txt(ctx, cx, 22, "Algebraic Types / Enums", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 60, 50, 120, 36, { stroke: P.pink, glow: P.pink });
    txt(ctx, cx, 68, "Result<T, E>", { sz: 11, c: P.pink, w: "700" });
    var variants = [
      { name: "Some(val)", color: P.green },
      { name: "None", color: P.dim },
      { name: "Err(msg)", color: P.rose }
    ];
    variants.forEach(function(v, i) {
      var vx = 30 + i * 130, vy = 120;
      var active = i === phase;
      box(ctx, vx, vy, 110, 36, { stroke: active ? v.color : P.border, glow: active ? v.color : null });
      txt(ctx, vx + 55, vy + 18, v.name, { sz: 10, c: active ? v.color : P.dim, w: active ? "700" : "500" });
      arrow(ctx, cx, 86, vx + 55, vy, { c: P.border });
    });
    var desc = ["Has a value", "No value", "Error occurred"];
    txt(ctx, cx, 180, desc[phase], { sz: 12, c: variants[phase].color });
    typewriter(ctx, 30, 210, 'enum Result<T, E> {\n  Some(T),\n  None,\n  Err(E)\n}', t * 10, { speed: 18, colors: [P.faint, P.pink, P.green, P.dim, P.rose] });
    txt(ctx, cx, h - 16, "Enums model multiple possible states with associated data", { sz: 9, c: P.faint });
  }

  function subGenerics(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 2);
    txt(ctx, cx, 22, "Generics & Templates", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 55, 50, 110, 36, { stroke: P.pink, glow: P.pink });
    txt(ctx, cx, 68, "Box<T>", { sz: 12, c: P.pink, w: "700" });
    var tParam = phase === 0 ? "T = int" : "T = String";
    var tColor = phase === 0 ? P.green : P.blue;
    var boxLabel = phase === 0 ? "Box<int>" : "Box<String>";
    var boxVal = phase === 0 ? "42" : "\"hello\"";
    dataArrow(ctx, cx, 86, cx, 130, t, P.amber, tParam);
    box(ctx, cx - 55, 135, 110, 36, { stroke: tColor, glow: tColor });
    txt(ctx, cx, 153, boxLabel, { sz: 11, c: tColor, w: "700" });
    box(ctx, cx - 35, 190, 70, 30, { stroke: tColor });
    txt(ctx, cx, 205, boxVal, { sz: 10, c: tColor });
    typewriter(ctx, 30, 240, 'template <typename T>\nclass Box {\n  T value;\n};\nBox<int> b1;\nBox<String> b2;', t * 10, { speed: 20, colors: [P.faint, P.pink, P.text, P.text, P.green, P.blue] });
    txt(ctx, cx, h - 16, "Type parameters enable writing code that works with any type", { sz: 9, c: P.faint });
  }

  function subClosures(canvas, ctx, w, h, t) {
    var cx = w / 2, glow = pl(t, 2);
    txt(ctx, cx, 22, "Closures & Lambdas", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, 20, 50, w - 40, 80, { r: 10, stroke: P.dim });
    txt(ctx, cx, 66, "outer scope", { sz: 10, c: P.faint });
    box(ctx, 30, 80, 70, 36, { stroke: P.amber, glow: glow > 0.5 ? P.amber : null });
    txt(ctx, 65, 98, "captured", { sz: 9, c: P.amber, w: "700" });
    box(ctx, 20, 150, w - 40, 100, { r: 10, stroke: P.cyan });
    txt(ctx, cx, 166, "closure (inner function)", { sz: 10, c: P.cyan });
    box(ctx, 40, 180, 90, 36, { stroke: P.amber, glow: P.amber });
    txt(ctx, 85, 198, "captured", { sz: 9, c: P.amber, w: "700" });
    box(ctx, 160, 180, 90, 36, { stroke: P.green });
    txt(ctx, 205, 198, "own var", { sz: 9, c: P.green });
    arrow(ctx, 65, 116, 85, 180, { c: P.amber, lw: 1.5, hd: 5 });
    var alpha2 = lerp(0.4, 1, glow);
    ctx.save(); ctx.globalAlpha = alpha2;
    box(ctx, 30, 80, 70, 36, { stroke: P.amber, glow: P.amber });
    ctx.restore();
    typewriter(ctx, 30, 270, 'function outer() {\n  let x = 10;\n  return () => x;\n}\nconst fn = outer();\nfn(); // → 10', t * 10, { speed: 22, colors: [P.faint, P.cyan, P.amber, P.cyan, P.text, P.green] });
    txt(ctx, cx, h - 16, "Closures capture outer variables even after the outer scope exits", { sz: 9, c: P.faint });
  }

  function subDatabase(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 3);
    txt(ctx, cx, 22, "Database Operations", { sz: 14, c: P.cyan, w: "700" });
    var tX1 = 20, tX2 = cx + 20, tY = 60;
    [tX1, tX2].forEach(function(tx, ti) {
      box(ctx, tx, tY, 140, 90, { r: 6, stroke: ti === 0 ? P.blue : P.green });
      txt(ctx, tx + 70, tY + 12, ti === 0 ? "users" : "orders", { sz: 9, c: ti === 0 ? P.blue : P.green, w: "700" });
      for (var r = 0; r < 3; r++) {
        ctx.fillStyle = P.panel2; ctx.fillRect(tx + 5, tY + 28 + r * 20, 130, 18);
        ctx.strokeStyle = P.border; ctx.lineWidth = 0.5;
        ctx.strokeRect(tx + 5, tY + 28 + r * 20, 130, 18);
        var highlight = r === phase && ti === 0;
        if (highlight) {
          ctx.fillStyle = P.cyan + "22"; ctx.fillRect(tx + 5, tY + 28 + r * 20, 130, 18);
        }
      }
    });
    arrow(ctx, tX1 + 140, tY + 45, tX2, tY + 45, { c: P.amber, lw: 2, hd: 7 });
    txt(ctx, cx, tY + 36, "JOIN", { sz: 9, c: P.amber, w: "700" });
    var resultY = tY + 110;
    box(ctx, cx - 80, resultY, 160, 70, { r: 6, stroke: P.green });
    txt(ctx, cx, resultY + 14, "result", { sz: 9, c: P.green, w: "700" });
    for (var r2 = 0; r2 < 2; r2++) {
      ctx.fillStyle = P.panel2; ctx.fillRect(cx - 75, resultY + 30 + r2 * 18, 150, 16);
      ctx.strokeStyle = P.border; ctx.lineWidth = 0.5;
      ctx.strokeRect(cx - 75, resultY + 30 + r2 * 18, 150, 16);
    }
    txt(ctx, cx, h - 16, "Joins combine rows from two tables based on matching keys", { sz: 9, c: P.faint });
  }

  function subInterface(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 2);
    txt(ctx, cx, 22, "Interfaces & Abstract Classes", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 70, 50, 140, 44, { stroke: P.pink, glow: P.pink });
    txt(ctx, cx, 64, "<<interface>>", { sz: 9, c: P.faint, a: "center" });
    txt(ctx, cx, 80, "Drawable", { sz: 11, c: P.pink, w: "700" });
    var methods = ["draw()", "resize()"];
    methods.forEach(function(m, i) {
      txt(ctx, cx, 106 + i * 16, m, { sz: 9, c: P.dim, m: false });
    });
    var classes = ["Circle", "Rectangle"];
    var classColors = [P.green, P.blue];
    classes.forEach(function(c, i) {
      var bx = 30 + i * (w / 2 - 30), by = 170;
      var active = phase === i;
      box(ctx, bx, by, 130, 50, { stroke: active ? classColors[i] : P.border, glow: active ? classColors[i] : null });
      txt(ctx, bx + 65, by + 14, c, { sz: 11, c: active ? classColors[i] : P.text, w: "700" });
      txt(ctx, bx + 65, by + 34, active ? "draw() \u2192 \u25C6" : "draw() \u2192 \u25A0", { sz: 9, c: P.dim });
      arrow(ctx, bx + 65, by, cx, 94, { c: P.border, lw: 1.5, hd: 5 });
    });
    typewriter(ctx, 30, 240, 'interface Drawable {\n  draw(): void;\n}\nclass Circle implements Drawable {\n  draw() { /* ... */ }\n}', t * 10, { speed: 22, colors: [P.faint, P.pink, P.text, P.green, P.green] });
    txt(ctx, cx, h - 16, "Interfaces define contracts; classes provide concrete implementations", { sz: 9, c: P.faint });
  }

  function subAsync(canvas, ctx, w, h, t) {
    var cx = w / 2;
    txt(ctx, cx, 22, "Async / Concurrency", { sz: 14, c: P.cyan, w: "700" });
    var tlY1 = 70, tlY2 = 140, tlX = 30, tlEnd = w - 30;
    txt(ctx, 15, tlY1 + 10, "main", { sz: 9, c: P.blue, a: "left" });
    txt(ctx, 15, tlY2 + 10, "async", { sz: 9, c: P.green, a: "left" });
    arrow(ctx, tlX, tlY1, tlEnd, tlY1, { c: P.border });
    arrow(ctx, tlX, tlY2, tlEnd, tlY2, { c: P.border });
    var progress = (t % 6) / 6;
    var mainX = tlX + (tlEnd - tlX) * Math.min(progress * 2, 1);
    var awaitX = tlX + (tlEnd - tlX) * 0.5;
    var resolveX = tlX + (tlEnd - tlX) * 0.75;
    ctx.beginPath(); ctx.arc(mainX, tlY1, 5, 0, Math.PI * 2);
    ctx.fillStyle = P.blue; ctx.save(); ctx.shadowColor = P.blue; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();
    if (progress > 0.5 && progress < 0.75) {
      ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = P.amber; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(awaitX, tlY1 - 15); ctx.lineTo(awaitX, tlY2 + 15); ctx.stroke(); ctx.restore();
      txt(ctx, awaitX, tlY1 - 22, "await", { sz: 8, c: P.amber });
    }
    if (progress >= 0.5) {
      var asyncProg = Math.min((progress - 0.5) * 4, 1);
      var asyncX = tlX + (resolveX - tlX) * asyncProg;
      ctx.beginPath(); ctx.arc(asyncX, tlY2, 5, 0, Math.PI * 2);
      ctx.fillStyle = P.green; ctx.save(); ctx.shadowColor = P.green; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();
    }
    if (progress >= 0.75) {
      ctx.beginPath(); ctx.arc(resolveX, tlY1, 5, 0, Math.PI * 2);
      ctx.fillStyle = P.green; ctx.fill();
      txt(ctx, resolveX, tlY1 - 16, "resolve", { sz: 8, c: P.green });
    }
    typewriter(ctx, 30, 180, 'async function fetchData() {\n  const data = await fetch(url);\n  return data.json();\n}', t * 10, { speed: 22, colors: [P.faint, P.green, P.amber, P.green] });
    txt(ctx, cx, h - 16, "Async operations yield control while waiting; resume on completion", { sz: 9, c: P.faint });
  }

  function subIterators(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 5);
    txt(ctx, cx, 22, "Iterators & Generators", { sz: 14, c: P.cyan, w: "700" });
    var arrX = 20, arrY = 60, elemW = 50, elemH = 36;
    var items = ["A", "B", "C", "D", "E"];
    items.forEach(function(item, i) {
      var ex = arrX + i * (elemW + 8);
      var active = i === phase;
      box(ctx, ex, arrY, elemW, elemH, { stroke: active ? P.amber : P.border, glow: active ? P.amber : null });
      txt(ctx, ex + elemW / 2, arrY + elemH / 2, item, { sz: 12, c: active ? P.amber : P.text, w: "700" });
    });
    var ptrX = arrX + phase * (elemW + 8) + elemW / 2;
    arrow(ctx, ptrX, arrY + elemH + 6, ptrX, arrY + elemH + 20, { c: P.amber, lw: 2, hd: 5 });
    txt(ctx, ptrX, arrY + elemH + 30, "iter", { sz: 9, c: P.amber, w: "700" });
    var yieldY = arrY + elemH + 55;
    txt(ctx, 20, yieldY, "yield:", { sz: 10, c: P.green, a: "left" });
    for (var j = 0; j <= phase; j++) {
      var yx = 80 + j * 40;
      box(ctx, yx, yieldY - 10, 34, 22, { stroke: P.green });
      txt(ctx, yx + 17, yieldY + 1, items[j], { sz: 10, c: P.green });
    }
    typewriter(ctx, 30, yieldY + 40, 'function* gen(arr) {\n  for (let x of arr) yield x;\n}\nlet it = gen(["A","B","C"]);\nit.next(); // { value: "A" }', t * 10, { speed: 22, colors: [P.faint, P.amber, P.green, P.text, P.green] });
    txt(ctx, cx, h - 16, "Iterators traverse collections; generators yield values lazily", { sz: 9, c: P.faint });
  }

  function subDecorator(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 3);
    txt(ctx, cx, 22, "Decorators", { sz: 14, c: P.cyan, w: "700" });
    var coreW = 120, coreH = 50, coreX = cx - coreW / 2, coreY = 140;
    if (phase >= 2) {
      box(ctx, coreX - 30, coreY - 30, coreW + 60, coreH + 60, { r: 10, stroke: P.pink, glow: P.pink });
      txt(ctx, cx, coreY - 40, "Decorator B", { sz: 9, c: P.pink });
    }
    if (phase >= 1) {
      box(ctx, coreX - 15, coreY - 15, coreW + 30, coreH + 30, { r: 10, stroke: P.amber, glow: P.amber });
      txt(ctx, cx, coreY - 25, "Decorator A", { sz: 9, c: P.amber });
    }
    box(ctx, coreX, coreY, coreW, coreH, { stroke: P.green, glow: P.green });
    txt(ctx, cx, coreY + coreH / 2, "function()", { sz: 11, c: P.green, w: "700" });
    txt(ctx, cx, 70, "Wrapping layers: @decorator", { sz: 10, c: P.dim });
    var labels = ["@cache", "@log", "@validate"];
    labels.forEach(function(l, i) {
      var lx = 30 + i * 120, ly = 90;
      var show = i < phase;
      ctx.globalAlpha = show ? 0.5 : 1;
      box(ctx, lx, ly, 100, 28, { stroke: show ? P.dim : P.cyan });
      txt(ctx, lx + 50, ly + 14, l, { sz: 9, c: show ? P.dim : P.cyan });
      ctx.globalAlpha = 1;
    });
    typewriter(ctx, 30, coreY + coreH + 30, '@cache\n@log\ndef myFunc():\n  pass', t * 10, { speed: 20, colors: [P.pink, P.amber, P.green, P.text] });
    txt(ctx, cx, h - 16, "Decorators wrap functions to add behavior without modifying them", { sz: 9, c: P.faint });
  }

  function subTraits(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Traits & Mixins", { sz: 14, c: P.cyan, w: "700" });
    var traits = ["TraitA", "TraitB", "TraitC"];
    var tColors = [P.green, P.blue, P.pink];
    traits.forEach(function(tr, i) {
      var ty = 50 + i * 42;
      var active = i === phase;
      box(ctx, cx - 60, ty, 120, 32, { stroke: active ? tColors[i] : P.border, glow: active ? tColors[i] : null });
      txt(ctx, cx, ty + 16, tr, { sz: 10, c: active ? tColors[i] : P.dim, w: active ? "700" : "500" });
    });
    var classY = 190;
    box(ctx, cx - 70, classY, 140, 40, { stroke: P.cyan, glow: P.cyan });
    txt(ctx, cx, classY + 20, "MyClass", { sz: 12, c: P.cyan, w: "700" });
    traits.forEach(function(tr, i) {
      arrow(ctx, cx - 40 + i * 40, classY, cx - 40 + i * 40, 50 + i * 42 + 32, { c: tColors[i], lw: 1.5, hd: 5 });
    });
    typewriter(ctx, 30, classY + 55, 'trait TraitA { fn a(); }\ntrait TraitB { fn b(); }\nclass MyClass: TraitA, TraitB {\n  fn a() { ... }\n  fn b() { ... }\n}', t * 10, { speed: 22, colors: [P.faint, P.green, P.blue, P.cyan, P.text, P.text] });
    txt(ctx, cx, h - 16, "Traits define shared behavior; classes can implement multiple traits", { sz: 9, c: P.faint });
  }

  function subMethods(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 4);
    txt(ctx, cx, 22, "Method Resolution / Prototypes", { sz: 14, c: P.cyan, w: "700" });
    var chain = [
      { name: "myObj", methods: ["sayHello()"], color: P.cyan },
      { name: "prototype", methods: ["toString()"], color: P.blue },
      { name: "Object.prototype", methods: ["hasOwnProperty()"], color: P.pink },
      { name: "null", methods: [], color: P.dim }
    ];
    chain.forEach(function(node, i) {
      var ny = 55 + i * 55;
      var active = i === phase;
      var nw = i < 3 ? 160 : 80;
      box(ctx, cx - nw / 2, ny, nw, 40, { stroke: active ? node.color : P.border, glow: active ? node.color : null });
      txt(ctx, cx, ny + 14, node.name, { sz: 10, c: active ? node.color : P.dim, w: active ? "700" : "500" });
      if (node.methods.length) {
        txt(ctx, cx, ny + 30, node.methods[0], { sz: 8, c: P.faint });
      }
      if (i < chain.length - 1) {
        arrow(ctx, cx, ny + 40, cx, ny + 55, { c: P.border, lw: 1.5, hd: 4 });
        txt(ctx, cx + 16, ny + 48, "__proto__", { sz: 7, c: P.faint });
      }
    });
    var found = phase < 3;
    var foundLabel = found ? "Found: " + chain[phase].methods[0] : "Not found!";
    txt(ctx, cx, 290, foundLabel, { sz: 11, c: found ? P.green : P.rose, w: "700" });
    txt(ctx, cx, h - 16, "JS looks up the prototype chain until a method is found", { sz: 9, c: P.faint });
  }

  function subTesting(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Testing Concepts", { sz: 14, c: P.cyan, w: "700" });
    var tests = [
      { name: "test_add()", pass: true },
      { name: "test_mul()", pass: true },
      { name: "test_div()", pass: false }
    ];
    tests.forEach(function(test, i) {
      var ty = 55 + i * 44;
      var show = i <= phase;
      var passed = show ? test.pass : null;
      var icon = show ? (test.pass ? "\u2713" : "\u2717") : "?";
      var color = show ? (test.pass ? P.green : P.rose) : P.dim;
      box(ctx, 30, ty, w - 60, 34, { stroke: show ? color : P.border });
      txt(ctx, 50, ty + 17, test.name, { sz: 11, c: show ? P.text : P.dim, a: "left" });
      txt(ctx, w - 50, ty + 17, icon, { sz: 14, c: color, w: "700" });
    });
    var barY = 200;
    var passCount = Math.min(phase + 1, 2);
    var total = phase + 1;
    ctx.fillStyle = P.panel2; ctx.fillRect(30, barY, w - 60, 20);
    var barW = ((w - 60) * passCount) / tests.length;
    ctx.fillStyle = P.green; ctx.fillRect(30, barY, barW, 20);
    if (total <= 2) { ctx.fillStyle = P.rose; ctx.fillRect(30 + barW, barY, (w - 60) / tests.length, 20); }
    txt(ctx, cx, barY + 10, passCount + "/" + (phase + 1) + " passed", { sz: 9, c: P.text, w: "700" });
    typewriter(ctx, 30, 240, 'test("add", () => {\n  expect(add(1,2)).toBe(3);\n});\ntest("div", () => {\n  expect(div(10,0)).toThrow();\n});', t * 10, { speed: 22, colors: [P.faint, P.green, P.text, P.text, P.rose, P.text] });
    txt(ctx, cx, h - 16, "Tests verify correctness; run them to catch regressions", { sz: 9, c: P.faint });
  }

  function subPHP(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "PHP Ecosystem", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 60, 50, 120, 36, { stroke: P.pink, glow: P.pink });
    txt(ctx, cx, 68, "composer.json", { sz: 10, c: P.pink, w: "700" });
    var libs = ["monolog", "guzzle", "eloquent"];
    libs.forEach(function(lib, i) {
      var lx = 20 + i * 140, ly = 120;
      var active = phase === i;
      box(ctx, lx, ly, 110, 36, { stroke: active ? P.green : P.border, glow: active ? P.green : null });
      txt(ctx, lx + 55, ly + 18, lib, { sz: 10, c: active ? P.green : P.dim });
      arrow(ctx, cx, 86, lx + 55, ly, { c: P.border });
    });
    var status = ["installing...", "autoloading...", "ready!"];
    txt(ctx, cx, 180, status[phase], { sz: 11, c: P.green, w: "700" });
    typewriter(ctx, 30, 210, '{\n  "require": {\n    "monolog/monolog": "^3.0"\n  }\n}', t * 10, { speed: 18, colors: [P.faint, P.pink, P.text, P.green, P.text] });
    txt(ctx, cx, h - 16, "Composer manages PHP dependencies and PSR-4 autoloading", { sz: 9, c: P.faint });
  }

  function subLuaTable(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 2);
    txt(ctx, cx, 22, "Lua Tables & Metatables", { sz: 14, c: P.cyan, w: "700" });
    var tblX = 30, tblY = 55, tblW = 140;
    box(ctx, tblX, tblY, tblW, 100, { r: 6, stroke: P.blue });
    txt(ctx, tblX + tblW / 2, tblY + 14, "table", { sz: 9, c: P.blue, w: "700" });
    var kvs = [["name", '"Lua"'], ["len", "3"], ["val", "nil"]];
    kvs.forEach(function(kv, i) {
      var ky = tblY + 30 + i * 22;
      txt(ctx, tblX + 15, ky, kv[0], { sz: 9, c: P.amber, a: "left" });
      txt(ctx, tblX + tblW - 15, ky, kv[1], { sz: 9, c: kv[1] === "nil" ? P.rose : P.text, a: "right" });
    });
    var mtX = cx + 30, mtY = 55, mtW = 140;
    box(ctx, mtX, mtY, mtW, 80, { r: 6, stroke: P.pink });
    txt(ctx, mtX + mtW / 2, mtY + 14, "metatable", { sz: 9, c: P.pink, w: "700" });
    txt(ctx, mtX + mtW / 2, mtY + 40, "__index", { sz: 10, c: P.amber, a: "left" });
    txt(ctx, mtX + mtW - 15, mtY + 40, "fallback", { sz: 9, c: P.dim, a: "right" });
    arrow(ctx, tblX + tblW, tblY + 50, mtX, mtY + 40, { c: P.pink, lw: 1.5, hd: 5 });
    if (phase === 1) {
      var lookupY = tblY + 30 + 2 * 22;
      dataArrow(ctx, tblX + tblW / 2, tblY + 110, mtX + mtW / 2, mtY + 80, t, P.amber, "miss");
      txt(ctx, cx, tblY + 130, "lookup in metatable", { sz: 9, c: P.amber });
    }
    typewriter(ctx, 30, 170, 'local mt = { __index = { x = 10 } }\nlocal t = setmetatable({}, mt)\nprint(t.x) -- 10 (via metatable)', t * 10, { speed: 20, colors: [P.faint, P.pink, P.blue, P.text, P.amber] });
    txt(ctx, cx, h - 16, "Metatables enable operator overloading and fallback lookups in Lua", { sz: 9, c: P.faint });
  }

  function subPythonFeatures(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Python Comprehensions", { sz: 14, c: P.cyan, w: "700" });
    var input = [1, 2, 3, 4, 5];
    var inputX = 20, inputY = 55;
    txt(ctx, inputX, inputY, "input:", { sz: 9, c: P.dim, a: "left" });
    input.forEach(function(v, i) {
      box(ctx, inputX + 50 + i * 36, inputY - 10, 30, 22, { stroke: P.blue });
      txt(ctx, inputX + 65 + i * 36, inputY + 1, v, { sz: 10, c: P.blue });
    });
    var fnX = cx - 30, fnY = inputY + 40;
    box(ctx, fnX, fnY, 60, 28, { stroke: P.amber });
    txt(ctx, fnX + 30, fnY + 14, "x * 2", { sz: 9, c: P.amber });
    var activeIdx = phase < 3 ? phase : 2;
    var output = input.map(function(x) { return x * 2; });
    var outputY = fnY + 50;
    txt(ctx, 20, outputY, "output:", { sz: 9, c: P.dim, a: "left" });
    output.forEach(function(v, i) {
      var show = i <= activeIdx;
      ctx.globalAlpha = show ? 1 : 0.3;
      box(ctx, 70 + i * 36, outputY - 10, 30, 22, { stroke: P.green });
      txt(ctx, 85 + i * 36, outputY + 1, v, { sz: 10, c: P.green });
      ctx.globalAlpha = 1;
    });
    if (activeIdx < input.length) {
      arrow(ctx, inputX + 65 + activeIdx * 36, inputY + 12, fnX + 30, fnY, { c: P.amber, lw: 1 });
      arrow(ctx, fnX + 30, fnY + 28, 85 + activeIdx * 36, outputY - 10, { c: P.green, lw: 1 });
    }
    typewriter(ctx, 30, outputY + 30, 'result = [x * 2 for x in range(1, 6)]\n# [2, 4, 6, 8, 10]', t * 10, { speed: 20, colors: [P.green, P.text, P.faint] });
    txt(ctx, cx, h - 16, "Comprehensions transform collections inline: [expr for x in iter]", { sz: 9, c: P.faint });
  }

  function subDartFlutter(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Dart / Flutter Widgets", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 50, 50, 100, 36, { stroke: P.blue, glow: phase === 0 ? P.blue : null });
    txt(ctx, cx, 68, "Parent", { sz: 11, c: P.blue, w: "700" });
    var children = ["Child1", "Child2", "Child3"];
    var cColors = [P.green, P.pink, P.amber];
    children.forEach(function(ch, i) {
      var chX = 20 + i * 130, chY = 130;
      var active = i === phase;
      box(ctx, chX, chY, 100, 34, { stroke: active ? cColors[i] : P.border, glow: active ? cColors[i] : null });
      txt(ctx, chX + 50, chY + 17, ch, { sz: 10, c: active ? cColors[i] : P.dim });
      arrow(ctx, cx - 40 + i * 40, 86, chX + 50, chY, { c: P.border, lw: 1.5, hd: 5 });
    });
    if (phase >= 1) {
      var rebuildIdx = phase - 1;
      txt(ctx, 20 + rebuildIdx * 130 + 50, 178, "setState \u2192 rebuild", { sz: 8, c: cColors[rebuildIdx] });
      ctx.save(); ctx.strokeStyle = cColors[rebuildIdx]; ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.arc(70 + rebuildIdx * 130, 147, 24, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
    typewriter(ctx, 30, 210, 'class Parent extends StatelessWidget {\n  build() => Column(\n    children: [\n      Child1(), Child2()\n    ]\n  );\n}', t * 10, { speed: 20, colors: [P.faint, P.blue, P.text, P.green, P.pink, P.text, P.text] });
    txt(ctx, cx, h - 16, "Flutter rebuilds only the affected widget subtree on state change", { sz: 9, c: P.faint });
  }

  function subKotlinSwift(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Scope Functions", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 50, 50, 100, 36, { stroke: P.blue });
    txt(ctx, cx, 68, "obj", { sz: 11, c: P.blue, w: "700" });
    var fns = [".let", ".apply", ".run"];
    var fColors = [P.green, P.amber, P.pink];
    fns.forEach(function(fn, i) {
      var fx = 20 + i * 140, fy = 120;
      var active = i === phase;
      box(ctx, fx, fy, 110, 32, { stroke: active ? fColors[i] : P.border, glow: active ? fColors[i] : null });
      txt(ctx, fx + 55, fy + 16, fn, { sz: 11, c: active ? fColors[i] : P.dim, w: "700" });
      arrow(ctx, cx, 86, fx + 55, fy, { c: P.border });
    });
    var desc = ["it -> transform", "this -> configure", "this -> return"];
    txt(ctx, cx, 170, desc[phase], { sz: 11, c: fColors[phase], w: "700" });
    typewriter(ctx, 30, 200, 'val result = obj.let {\n  it.toUpperCase()\n}\nobj.apply {\n  this.name = "New"\n}', t * 10, { speed: 20, colors: [P.faint, P.green, P.text, P.text, P.amber, P.text] });
    txt(ctx, cx, h - 16, "Scope functions provide concise ways to operate on objects in context", { sz: 9, c: P.faint });
  }

  function subRFeatures(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 4);
    txt(ctx, cx, 22, "R Data Pipelines", { sz: 14, c: P.cyan, w: "700" });
    var steps = ["raw data", "filter", "transform", "plot"];
    var sColors = [P.dim, P.blue, P.amber, P.green];
    steps.forEach(function(s, i) {
      var sx = 20 + i * (w - 40) / 4, sy = 60;
      var active = i === phase;
      box(ctx, sx, sy, 80, 32, { stroke: active ? sColors[i] : P.border, glow: active ? sColors[i] : null });
      txt(ctx, sx + 40, sy + 16, s, { sz: 9, c: active ? sColors[i] : P.dim, w: active ? "700" : "500" });
      if (i < steps.length - 1) {
        arrow(ctx, sx + 80, sy + 16, sx + (w - 40) / 4, sy + 16, { c: P.border });
      }
    });
    var pipeY = 120;
    dataArrow(ctx, 60, pipeY, w - 60, pipeY, t, sColors[phase], "data");
    typewriter(ctx, 30, 160, 'df %>%\n  filter(age > 18) %>%\n  mutate(score = x * 2) %>%\n  ggplot(aes(x, y)) +\n  geom_point()', t * 10, { speed: 20, colors: [P.faint, P.blue, P.amber, P.green, P.green] });
    txt(ctx, cx, h - 16, "R pipes (%>%) chain data transformations left to right", { sz: 9, c: P.faint });
  }

  function subPerlFeatures(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 3);
    txt(ctx, cx, 22, "Perl References & Context", { sz: 14, c: P.cyan, w: "700" });
    var refs = [
      { name: "scalar ref", val: "\\$x", color: P.green },
      { name: "array ref", val: "\\@arr", color: P.blue },
      { name: "hash ref", val: "\\%hash", color: P.pink }
    ];
    refs.forEach(function(r, i) {
      var rx = 20 + i * 140, ry = 55;
      var active = i === phase;
      box(ctx, rx, ry, 120, 48, { stroke: active ? r.color : P.border, glow: active ? r.color : null });
      txt(ctx, rx + 60, ry + 16, r.name, { sz: 9, c: active ? r.color : P.dim });
      txt(ctx, rx + 60, ry + 34, r.val, { sz: 11, c: active ? r.color : P.text, w: "700" });
    });
    if (phase < 3) {
      var derefY = 130;
      arrow(ctx, cx - 20 + phase * 40, 103, cx, derefY, { c: P.amber, lw: 2, hd: 6 });
      txt(ctx, cx, derefY + 8, "->  dereference", { sz: 10, c: P.amber });
    }
    typewriter(ctx, 30, 170, 'my $x = 10;\nmy $ref = \\$x;\nprint $$ref;  # 10\nmy @arr = (1,2,3);\nmy $aref = \\@arr;', t * 10, { speed: 20, colors: [P.faint, P.green, P.text, P.amber, P.blue, P.text] });
    txt(ctx, cx, h - 16, "Perl references point to data; dereference with $$, @$, %$", { sz: 9, c: P.faint });
  }

  function subRubyFeatures(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 4, 2);
    txt(ctx, cx, 22, "Ruby Open Classes", { sz: 14, c: P.cyan, w: "700" });
    box(ctx, cx - 60, 50, 120, 40, { stroke: P.blue, glow: phase === 0 ? P.blue : null });
    txt(ctx, cx, 70, "String", { sz: 12, c: P.blue, w: "700" });
    txt(ctx, cx, 84, "existing methods", { sz: 8, c: P.dim });
    var methods2 = ["reverse", "upcase", "greet"];
    methods2.forEach(function(m, i) {
      var mx = 20 + i * 130, my = 120;
      var isNew = i === 2;
      var active = (phase === 1 && isNew);
      ctx.globalAlpha = isNew && phase === 0 ? 0.3 : 1;
      box(ctx, mx, my, 100, 30, { stroke: active ? P.green : (isNew ? P.amber : P.border), glow: active ? P.green : null });
      txt(ctx, mx + 50, my + 15, m, { sz: 10, c: active ? P.green : (isNew ? P.amber : P.text) });
      ctx.globalAlpha = 1;
      if (isNew) arrow(ctx, cx, 90, mx + 50, my, { c: P.amber, lw: 1.5, hd: 5 });
    });
    if (phase === 1) {
      txt(ctx, cx, 168, "Dynamically added!", { sz: 11, c: P.green, w: "700" });
    }
    typewriter(ctx, 30, 180, 'class String\n  def greet\n    "Hello, #{self}!"\n  end\nend\n"World".greet # => "Hello, World!"', t * 10, { speed: 20, colors: [P.faint, P.blue, P.green, P.text, P.text, P.green] });
    txt(ctx, cx, h - 16, "Ruby allows modifying existing classes at runtime (open classes)", { sz: 9, c: P.faint });
  }

  function subErrorChain(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 3);
    txt(ctx, cx, 22, "Error Propagation", { sz: 14, c: P.cyan, w: "700" });
    var fns = ["funcA()", "funcB()", "funcC()"];
    var fColors = [P.rose, P.amber, P.green];
    fns.forEach(function(fn, i) {
      var fx = 30 + i * (w - 60) / 3, fy = 70;
      var active = i === phase;
      box(ctx, fx, fy, 100, 36, { stroke: active ? fColors[i] : P.border, glow: active ? fColors[i] : null });
      txt(ctx, fx + 50, fy + 18, fn, { sz: 10, c: active ? fColors[i] : P.dim });
    });
    for (var i = 0; i < 2; i++) {
      var ax = 130 + i * (w - 60) / 3;
      arrow(ctx, ax, 88, ax + (w - 60) / 3 - 30, 88, { c: P.border, lw: 1.5, hd: 5 });
    }
    var errY = 140;
    if (phase === 0) {
      txt(ctx, 80, errY, "throws Error!", { sz: 11, c: P.rose, w: "700" });
      box(ctx, 30, errY + 16, 100, 28, { stroke: P.rose });
      txt(ctx, 80, errY + 30, "NetworkError", { sz: 9, c: P.rose });
    } else if (phase === 1) {
      txt(ctx, cx, errY, "catches & wraps", { sz: 11, c: P.amber, w: "700" });
      box(ctx, cx - 60, errY + 16, 120, 28, { stroke: P.amber });
      txt(ctx, cx, errY + 30, "WrappedError", { sz: 9, c: P.amber });
    } else {
      txt(ctx, w - 80, errY, "receives wrapped", { sz: 11, c: P.green, w: "700" });
      box(ctx, w - 140, errY + 16, 120, 28, { stroke: P.green });
      txt(ctx, w - 80, errY + 30, "FinalHandler", { sz: 9, c: P.green });
    }
    if (phase > 0) {
      arrow(ctx, 80, 170, cx, 170, { c: P.amber, lw: 1.5, hd: 5 });
    }
    if (phase > 1) {
      arrow(ctx, cx + 20, 170, w - 80, 170, { c: P.green, lw: 1.5, hd: 5 });
    }
    typewriter(ctx, 30, 210, 'funcA() {\n  throw new NetworkError();\n}\nfuncB() {\n  try { funcA(); }\n  catch(e) { throw new WrappedError(e); }\n}', t * 10, { speed: 18, colors: [P.faint, P.rose, P.text, P.text, P.amber, P.text, P.text] });
    txt(ctx, cx, h - 16, "Errors propagate up the call stack; each layer can wrap or rethrow", { sz: 9, c: P.faint });
  }

  function subGoConcurrency(canvas, ctx, w, h, t) {
    var cx = w / 2, phase = cyc(t, 5, 2);
    txt(ctx, cx, 22, "Go Goroutines & Channels", { sz: 14, c: P.cyan, w: "700" });
    var goX = 20, goY = 55;
    box(ctx, goX, goY, 100, 40, { stroke: P.green, glow: P.green });
    txt(ctx, goX + 50, goY + 14, "goroutine", { sz: 9, c: P.green, w: "700" });
    txt(ctx, goX + 50, goY + 28, "producer", { sz: 8, c: P.dim });
    var chX = cx - 40, chY = goY;
    box(ctx, chX, chY, 80, 40, { r: 20, stroke: P.amber, glow: P.amber });
    txt(ctx, chX + 40, chY + 20, "chan", { sz: 10, c: P.amber, w: "700" });
    var consX = w - 120, consY = goY;
    box(ctx, consX, consY, 100, 40, { stroke: P.blue, glow: P.blue });
    txt(ctx, consX + 50, consY + 14, "goroutine", { sz: 9, c: P.blue, w: "700" });
    txt(ctx, consX + 50, consY + 28, "consumer", { sz: 8, c: P.dim });
    arrow(ctx, goX + 100, goY + 20, chX, chY + 20, { c: P.green, lw: 1.5, hd: 5 });
    arrow(ctx, chX + 80, chY + 20, consX, consY + 20, { c: P.blue, lw: 1.5, hd: 5 });
    dataArrow(ctx, chX + 10, chY + 20, chX + 70, chY + 20, t, P.amber, "msg");
    var ch2Y = chY + 60;
    if (phase === 1) {
      txt(ctx, cx, ch2Y + 10, "buffered: not blocking", { sz: 10, c: P.green });
    } else {
      txt(ctx, cx, ch2Y + 10, "unbuffered: synchronized", { sz: 10, c: P.amber });
    }
    typewriter(ctx, 30, ch2Y + 35, 'ch := make(chan int)\ngo func() { ch <- 42 }()\nval := <-ch\nfmt.Println(val) // 42', t * 10, { speed: 20, colors: [P.faint, P.amber, P.green, P.blue, P.text] });
    txt(ctx, cx, h - 16, "Goroutines communicate via channels; synchronized data passing", { sz: 9, c: P.faint });
  }

  // ═══════════════ NEW CATEGORY FUNCTIONS ═══════════════

  function subIsolate(canvas, ctx, w, h, t) {
    var cx = w / 2, cy = h / 2;
    var phase = Math.floor(t * 0.5) % 3;
    var boxW = 140, boxH = 50;
    box(ctx, cx - 160, cy - 30, boxW, boxH, { stroke: P.green, glow: P.green });
    txt(ctx, cx - 160 + boxW / 2, cy - 30 + 15, "Main Isolate", { sz: 11, c: P.green, w: "700" });
    txt(ctx, cx - 160 + boxW / 2, cy - 30 + 32, "UI thread", { sz: 9, c: P.dim });
    var isoX = cx + 20;
    if (phase === 0) {
      box(ctx, isoX, cy - 30, boxW, boxH, { stroke: P.amber, glow: P.amber });
      txt(ctx, isoX + boxW / 2, cy - 30 + 15, "Worker Isolate", { sz: 11, c: P.amber, w: "700" });
      txt(ctx, isoX + boxW / 2, cy - 30 + 32, "computation", { sz: 9, c: P.dim });
      arrow(ctx, cx - 160 + boxW, cy - 10, isoX, cy - 10, { c: P.blue, lw: 1.5, hd: 5 });
      dataArrow(ctx, cx - 160 + boxW + 5, cy - 10, isoX - 5, cy - 10, t, P.blue, "msg");
      txt(ctx, cx, cy + 50, "Message passing between isolates", { sz: 10, c: P.faint });
    } else if (phase === 1) {
      box(ctx, isoX, cy - 30, boxW, boxH, { stroke: P.amber, glow: P.amber });
      txt(ctx, isoX + boxW / 2, cy - 30 + 15, "Processing...", { sz: 11, c: P.amber, w: "700" });
      var barW = boxW * 0.8;
      var progress = ((t * 2) % 1);
      ctx.fillStyle = P.green;
      ctx.fillRect(isoX + (boxW - barW) / 2, cy - 30 + 35, barW * progress, 6);
      ctx.strokeStyle = P.dim;
      ctx.strokeRect(isoX + (boxW - barW) / 2, cy - 30 + 35, barW, 6);
      txt(ctx, cx, cy + 50, "Isolates run independently, no shared memory", { sz: 10, c: P.faint });
    } else {
      box(ctx, isoX, cy - 30, boxW, boxH, { stroke: P.blue, glow: P.blue });
      txt(ctx, isoX + boxW / 2, cy - 30 + 15, "Result", { sz: 11, c: P.blue, w: "700" });
      txt(ctx, isoX + boxW / 2, cy - 30 + 32, "SendPort.send()", { sz: 9, c: P.dim });
      arrow(ctx, isoX, cy - 10, cx - 160 + boxW, cy - 10, { c: P.green, lw: 1.5, hd: 5 });
      dataArrow(ctx, isoX - 5, cy - 10, cx - 160 + boxW + 5, cy - 10, t, P.green, "result");
      txt(ctx, cx, cy + 50, "Each isolate has its own memory and event loop", { sz: 10, c: P.faint });
    }
    typewriter(ctx, 30, h - 60, 'final port = ReceivePort();\nawait Isolate.spawn(entryPoint, port.sendPort);\nawait for (var msg in port) { print(msg); }', t * 10, { speed: 25, colors: [P.faint, P.green, P.amber, P.blue] });
  }

  function subWindowFunctions(canvas, ctx, w, h, t) {
    var cx = w / 2, cy = h / 2 - 20;
    var cols = ["name", "dept", "salary", "ROW_NUMBER", "RANK"];
    var rows = [
      ["Alice", "Eng", "90K", "1", "1"],
      ["Bob", "Eng", "80K", "2", "2"],
      ["Carol", "Sales", "85K", "1", "1"],
      ["Dave", "Sales", "75K", "2", "2"],
    ];
    var colW = Math.min(100, (w - 80) / cols.length);
    var startX = cx - (cols.length * colW) / 2;
    var rowH = 22;
    var headerY = cy - rows.length * rowH / 2;
    for (var c = 0; c < cols.length; c++) {
      var isWindow = c >= 3;
      ctx.fillStyle = isWindow ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)";
      ctx.fillRect(startX + c * colW, headerY, colW, rowH);
      ctx.strokeStyle = P.dim;
      ctx.strokeRect(startX + c * colW, headerY, colW, rowH);
      txt(ctx, startX + c * colW + colW / 2, headerY + 14, cols[c], { sz: 9, c: isWindow ? P.blue : P.text, w: isWindow ? "700" : "400" });
    }
    var animRow = Math.floor(t * 1.5) % rows.length;
    for (var r = 0; r < rows.length; r++) {
      for (var c2 = 0; c2 < cols.length; c2++) {
        var isW2 = c2 >= 3;
        var ry = headerY + (r + 1) * rowH;
        ctx.fillStyle = r === animRow ? "rgba(59,130,246,0.08)" : (isW2 ? "rgba(59,130,246,0.05)" : "rgba(255,255,255,0.02)");
        ctx.fillRect(startX + c2 * colW, ry, colW, rowH);
        ctx.strokeStyle = P.dim;
        ctx.strokeRect(startX + c2 * colW, ry, colW, rowH);
        txt(ctx, startX + c2 * colW + colW / 2, ry + 14, rows[r][c2], { sz: 9, c: isW2 ? P.blue : P.text });
      }
    }
    typewriter(ctx, 30, h - 70, 'SELECT name, department, salary,\n  ROW_NUMBER() OVER (\n    PARTITION BY department ORDER BY salary DESC\n  ) AS rank\nFROM employees;', t * 10, { speed: 20, colors: [P.faint, P.blue, P.green, P.amber, P.text] });
    txt(ctx, cx, h - 16, "Window functions compute across row sets without collapsing them", { sz: 9, c: P.faint });
  }

  function subStringPatterns(canvas, ctx, w, h, t) {
    var cx = w / 2;
    var patternY = 40;
    var textStr = "Hello World 123";
    var textY = patternY + 40;
    var font = "14px monospace";
    ctx.font = font;
    var charW = ctx.measureText("M").width;
    var startX = cx - (textStr.length * charW) / 2;
    var matchStart = 6, matchEnd = 11;
    var charPhase = Math.floor(t * 3) % textStr.length;
    for (var i = 0; i < textStr.length; i++) {
      var chX = startX + i * charW;
      var isMatch = i >= matchStart && i < matchEnd;
      var isCurrent = i === charPhase;
      ctx.fillStyle = isMatch ? "rgba(59,130,246,0.25)" : (isCurrent ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.05)");
      ctx.fillRect(chX, textY, charW - 1, 22);
      ctx.strokeStyle = isMatch ? P.blue : (isCurrent ? P.amber : P.dim);
      ctx.strokeRect(chX, textY, charW - 1, 22);
      txt(ctx, chX + charW / 2, textY + 15, textStr[i], { sz: 13, c: isMatch ? P.blue : P.text });
    }
    txt(ctx, cx, patternY, "%a+ matches alphabetic sequences", { sz: 12, c: P.amber, w: "700" });
    var patStr = "%a+";
    ctx.font = "13px monospace";
    var patW = ctx.measureText(patStr).width;
    var patX = cx - patW / 2;
    ctx.fillStyle = "rgba(251,191,36,0.15)";
    ctx.fillRect(patX - 4, patternY + 18, patW + 8, 18);
    txt(ctx, cx, patternY + 31, patStr, { sz: 12, c: P.amber });
    var infoY = textY + 40;
    txt(ctx, cx, infoY, "%w = alphanum  %d = digit  %s = space  %p = punct", { sz: 10, c: P.dim });
    var captures = ["2024", "01", "15"];
    var capY = infoY + 25;
    txt(ctx, cx, capY, "date:match('(%d+)-(%d+)-(%d+)')", { sz: 10, c: P.faint });
    for (var j = 0; j < captures.length; j++) {
      var capX = cx - 80 + j * 65;
      var capVisible = Math.floor(t * 2) % (captures.length + 1) > j;
      if (capVisible) {
        ctx.fillStyle = "rgba(74,222,128,0.15)";
        ctx.fillRect(capX - 5, capY + 15, 50, 18);
        txt(ctx, capX + 20, capY + 28, "$" + (j + 1) + " = " + captures[j], { sz: 10, c: P.green });
      }
    }
    typewriter(ctx, 30, h - 65, "local date = '2024-01-15'\nlocal y, m, d = date:match('(%d+)-(%d+)-(%d+)')\nprint(y, m, d)  -- 2024 01 15", t * 10, { speed: 25, colors: [P.faint, P.amber, P.green, P.blue] });
    txt(ctx, cx, h - 16, "Lua patterns use %w %d %s for character classes with capture groups", { sz: 9, c: P.faint });
  }

  function subComparator(canvas, ctx, w, h, t) {
    var cx = w / 2;
    drawBackground(ctx, w, h, "Comparable vs Comparator");
    var items = [
      { name: "Bob", age: 30 },
      { name: "Alice", age: 25 },
      { name: "Charlie", age: 35 }
    ];
    var phases = [
      { label: "Original", key: null },
      { label: "byAge (Comparator)", key: "age" },
      { label: "byName (Comparator)", key: "name" }
    ];
    var phaseIdx = Math.min(Math.floor(t / 3), phases.length - 1);
    var sorted = items.slice();
    if (phaseIdx >= 1) {
      var k = phases[phaseIdx].key;
      sorted.sort(function(a, b) { return a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0; });
    }
    for (var i = 0; i < sorted.length; i++) {
      var bx = cx - 140, by = 70 + i * 55, bw = 280, bh = 40;
      var delay = i * 0.3;
      var progress = Math.max(0, Math.min(1, (t - phaseIdx * 3 - delay) / 0.8));
      var eased = 1 - Math.pow(1 - progress, 3);
      var targetY = 70 + i * 55;
      ctx.fillStyle = "rgba(139,92,246,0.12)";
      ctx.strokeStyle = "rgba(139,92,246,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, targetY, bw, bh, 6);
      ctx.fill();
      ctx.stroke();
      txt(ctx, cx, targetY + 16, sorted[i].name + "  (age " + sorted[i].age + ")", { sz: 13, c: P.white });
    }
    var phaseLabel = phases[phaseIdx].label;
    txt(ctx, cx, 50, phaseLabel, { sz: 12, c: P.amber });
    var codeX = 30, codeY = h - 100;
    typewriter(ctx, codeX, codeY, "Comparator<Person> byAge = Comparator.comparingInt(p -> p.age);\nComparator<Person> byName = Comparator.comparing(p -> p.name);\npeople.sort(byAge);\npeople.sort(byName);", t * 8, { sz: 10, speed: 15, colors: [P.faint, P.amber, P.green] });
    txt(ctx, cx, h - 16, "Comparable defines natural ordering; Comparator is a swappable strategy", { sz: 9, c: P.faint });
  }

  function subCollectionsFramework(canvas, ctx, w, h, t) {
    var cx = w / 2;
    drawBackground(ctx, w, h, "Java Collections Framework");
    var boxes = [
      { label: "List", color: P.blue, items: ["A", "B", "A", "C"], note: "ordered, duplicates" },
      { label: "Set", color: P.green, items: ["A", "B", "C"], note: "unordered, unique" },
      { label: "Map", color: P.amber, items: ["k1→10", "k2→20"], note: "key→value pairs" }
    ];
    var activeIdx = Math.min(Math.floor(t / 3), boxes.length - 1);
    for (var i = 0; i < boxes.length; i++) {
      var bx = 20 + i * ((w - 40) / 3);
      var bw = (w - 40) / 3 - 15;
      var isActive = i === activeIdx;
      var scale = isActive ? 1.05 : 0.95;
      var opacity = isActive ? 1.0 : 0.4;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = "rgba(30,30,50,0.9)";
      ctx.strokeStyle = boxes[i].color;
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(bx, 65, bw, 200, 8);
      ctx.fill();
      ctx.stroke();
      txt(ctx, bx + bw / 2, 85, boxes[i].label, { sz: 16, c: boxes[i].color });
      var items = boxes[i].items;
      for (var j = 0; j < items.length; j++) {
        var itemDelay = isActive ? j * 0.4 : 0;
        var itemVisible = Math.max(0, Math.min(1, (t - activeIdx * 3 - itemDelay) / 0.3));
        if (itemVisible > 0) {
          var iy = 110 + j * 28;
          ctx.fillStyle = boxes[i].color + "20";
          ctx.beginPath();
          ctx.roundRect(bx + 10, iy, bw - 20, 22, 4);
          ctx.fill();
          txt(ctx, bx + bw / 2, iy + 12, items[j], { sz: 12, c: P.white });
        }
      }
      txt(ctx, bx + bw / 2, 280, boxes[i].note, { sz: 9, c: P.dim });
      ctx.globalAlpha = 1;
    }
    var implIdx = Math.min(Math.floor(t / 3), 2);
    var impls = ["ArrayList / LinkedList", "HashSet / TreeSet", "HashMap / TreeMap"];
    if (activeIdx < impls.length) {
      txt(ctx, cx, 310, "Impl: " + impls[activeIdx], { sz: 11, c: P.faint });
    }
    typewriter(ctx, 30, h - 100, "List<String> list = new ArrayList<>();\nSet<Integer> set = new HashSet<>();\nMap<String, Integer> map = new HashMap<>();", t * 8, { sz: 10, speed: 15, colors: [P.blue, P.green, P.amber] });
    txt(ctx, cx, h - 16, "List keeps order & duplicates  |  Set enforces uniqueness  |  Map stores key-value pairs", { sz: 9, c: P.faint });
  }

  // ═══════════════ JAVA-SPECIFIC VISUALIZATIONS ═══════════════

  function subJavaClasses(canvas, ctx, w, h, t) {
    var cx = w / 2;
    var phase = Math.floor(t / 3) % 4;
    txt(ctx, cx, 16, "Java Classes & Objects", { sz: 13, c: P.cyan, w: "700" });

    // Parent class (shown in phases 0,1)
    if (phase < 3) {
      var pX = cx - 105, pY = 48, pW = 210, pH = 95;
      box(ctx, pX, pY, pW, pH, { stroke: P.blue, r: 8 });
      if (phase >= 1) {
        box(ctx, pX + 1, pY + 1, pW - 2, 24, { fill: "rgba(125,211,252,0.12)", r: 8 });
      }
      txt(ctx, cx, pY + 14, "abstract class Animal", { sz: 10, c: P.blue, w: "700" });
      ctx.beginPath(); ctx.moveTo(pX + 8, pY + 28); ctx.lineTo(pX + pW - 8, pY + 28); ctx.strokeStyle = P.border; ctx.lineWidth = 1; ctx.stroke();
      txt(ctx, cx, pY + 42, "- name: String", { sz: 9, c: P.rose, a: "center" });
      txt(ctx, cx, pY + 56, "+ getName(): String", { sz: 9, c: P.green, a: "center" });
      txt(ctx, cx, pY + 72, "+ speak(): void", { sz: 9, c: P.amber, a: "center" });
      txt(ctx, pX + pW - 12, pY + 86, "abstract", { sz: 7, c: P.faint, a: "right" });

      // Inheritance arrow
      arrow(ctx, cx, pY + pH + 4, cx, pY + pH + 30, { c: P.green, lw: 2, hd: 6 });
      txt(ctx, cx + 30, pY + pH + 18, "extends", { sz: 8, c: P.green, w: "700" });
    }

    // Child class
    var cY = (phase < 3) ? pY + pH + 40 : 48;
    var cW = 220, cH = 110;
    box(ctx, cx - cW / 2, cY, cW, cH, { stroke: P.green, r: 8 });
    box(ctx, cx - cW / 2 + 1, cY + 1, cW - 2, 24, { fill: "rgba(74,222,128,0.12)", r: 8 });
    var childLabel = phase < 3 ? "class Dog extends Animal" : "class Dog extends Animal";
    txt(ctx, cx, cY + 14, childLabel, { sz: 10, c: P.green, w: "700" });
    ctx.beginPath(); ctx.moveTo(cx - cW / 2 + 8, cY + 28); ctx.lineTo(cx + cW / 2 - 8, cY + 28); ctx.strokeStyle = P.border; ctx.lineWidth = 1; ctx.stroke();
    txt(ctx, cx, cY + 42, "- breed: String", { sz: 9, c: P.rose, a: "center" });
    txt(ctx, cx, cY + 56, "+ speak(): void  // override", { sz: 9, c: P.amber, a: "center" });
    txt(ctx, cx, cY + 72, "+ fetch(): void  // own", { sz: 9, c: P.cyan, a: "center" });

    // Object instantiation
    if (phase >= 2) {
      var oY = cY + cH + 15;
      box(ctx, cx - 90, oY, 180, 50, { stroke: P.amber, glow: P.amber, r: 6 });
      txt(ctx, cx, oY + 16, "Animal myDog = new Dog();", { sz: 9, c: P.amber, w: "700" });
      txt(ctx, cx, oY + 34, "myDog.speak(); // dynamic dispatch", { sz: 9, c: P.green });
    }

    // Annotations
    var annotations = [
      { id: 0, y: pY + 40, label: "@Override", active: phase === 1 },
      { id: 1, y: cY + 54, label: "@Override", active: phase === 3 }
    ];
    annotations.forEach(function(a) {
      if (a.active) {
        var pulse = 0.5 + Math.abs(Math.sin(t * 4)) * 0.5;
        ctx.globalAlpha = pulse;
        box(ctx, cx + 85, a.y - 2, 70, 18, { stroke: P.pink, r: 4 });
        txt(ctx, cx + 120, a.y + 7, a.label, { sz: 8, c: P.pink });
        ctx.globalAlpha = 1;
      }
    });

    typewriter(ctx, 15, 340, 'abstract class Animal {\n    String name;\n    abstract void speak();\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println("Woof"); }\n}', t * 10, { speed: 18 });
    txt(ctx, cx, h - 16, "Classes: blueprint for objects | Abstract: no instantiation | @Override: redefine parent method", { sz: 9, c: P.faint });
  }

  function subJavaStreams(canvas, ctx, w, h, t) {
    var cx = w / 2;
    txt(ctx, cx, 16, "Java Stream Pipeline", { sz: 13, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 2.5) % 4;
    var srcItems = [1, 2, 3, 4, 5, 6, 7, 8];
    var filterItems = srcItems.filter(function(x) { return x % 2 === 0; });
    var mapItems = filterItems.map(function(x) { return x * 10; });

    // Source stage
    var srcY = 55;
    box(ctx, 15, srcY, 80, 30, { stroke: P.blue, r: 6 });
    txt(ctx, 55, srcY + 15, "Source", { sz: 9, c: P.blue, w: "700" });
    srcItems.forEach(function(v, i) {
      var sx = 15 + i * 28, sy = srcY + 35;
      box(ctx, sx, sy, 24, 20, { stroke: P.blue, r: 4 });
      txt(ctx, sx + 12, sy + 10, "" + v, { sz: 8, c: P.blue });
    });

    // Arrow → filter
    if (phase >= 1) {
      arrow(ctx, 98, srcY + 50, 130, srcY + 50, { c: P.green, lw: 1.5, hd: 4 });
    }

    // Filter stage
    var fX = 135, fY = srcY;
    box(ctx, fX, fY, 100, 30, { stroke: P.green, r: 6 });
    txt(ctx, fX + 50, fY + 15, ".filter(x%2==0)", { sz: 8, c: P.green, w: "700" });
    if (phase >= 1) {
      filterItems.forEach(function(v, i) {
        var fx = fX + i * 38, fy = fY + 35;
        box(ctx, fx, fy, 32, 20, { stroke: P.green, r: 4 });
        txt(ctx, fx + 16, fy + 10, "" + v, { sz: 8, c: P.green });
      });
    }

    // Arrow → map
    if (phase >= 2) {
      arrow(ctx, fX + 103, fY + 50, fX + 138, fY + 50, { c: P.amber, lw: 1.5, hd: 4 });
    }

    // Map stage
    var mX = fX + 143, mY = srcY;
    box(ctx, mX, mY, 100, 30, { stroke: P.amber, r: 6 });
    txt(ctx, mX + 50, mY + 15, ".map(x -> x*10)", { sz: 8, c: P.amber, w: "700" });
    if (phase >= 2) {
      mapItems.forEach(function(v, i) {
        var mx = mX + i * 38, my = mY + 35;
        box(ctx, mx, my, 34, 20, { stroke: P.amber, r: 4 });
        txt(ctx, mx + 17, my + 10, "" + v, { sz: 8, c: P.amber });
      });
    }

    // Arrow → collect
    if (phase >= 3) {
      arrow(ctx, mX + 103, mY + 50, mX + 138, mY + 50, { c: P.pink, lw: 1.5, hd: 4 });
    }

    // Collect stage
    var cX = mX + 143, cY = srcY;
    if (cX + 80 < w) {
      box(ctx, cX, cY, 80, 30, { stroke: P.pink, r: 6 });
      txt(ctx, cX + 40, cY + 15, ".toList()", { sz: 9, c: P.pink, w: "700" });
      if (phase >= 3) {
        box(ctx, cX - 5, cY + 35, 90, 20, { stroke: P.pink, r: 4 });
        txt(ctx, cX + 40, cY + 45, "[" + mapItems.join(",") + "]", { sz: 8, c: P.pink });
      }
    }

    // Pipeline info
    box(ctx, 15, 155, w - 30, 35, { r: 6, stroke: P.dim });
    var stages = ["Source: List.of(1..8)", "Filter: keep even", "Map: multiply by 10", "Collect: to List"];
    txt(ctx, cx, 172, stages[phase], { sz: 10, c: phase === 0 ? P.blue : phase === 1 ? P.green : phase === 2 ? P.amber : P.pink });

    typewriter(ctx, 15, 205, 'List<Integer> result = List.of(1,2,3,4,5,6,7,8)\n    .stream()\n    .filter(x -> x % 2 == 0)\n    .map(x -> x * 10)\n    .toList(); // [20,40,60,80]', t * 10, { speed: 18 });
    txt(ctx, cx, h - 16, "Streams: lazy pipeline — data flows through source → intermediate → terminal operations", { sz: 9, c: P.faint });
  }

  function subJavaAnnotations(canvas, ctx, w, h, t) {
    var cx = w / 2;
    var phase = Math.floor(t / 3) % 4;
    txt(ctx, cx, 16, "Java Annotations — Metadata", { sz: 13, c: P.cyan, w: "700" });

    // Annotation boxes
    var annotations = [
      { name: "@Override", desc: "method overrides parent", color: P.green },
      { name: "@Deprecated", desc: "do not use anymore", color: P.rose },
      { name: "@SuppressWarnings", desc: "suppress compiler warnings", color: P.amber },
      { name: "@FunctionalInterface", desc: "single abstract method", color: P.blue }
    ];

    annotations.forEach(function(a, i) {
      var ax = 15, ay = 48 + i * 40;
      var active = i === phase;
      var glowColor = active ? a.color : null;
      box(ctx, ax, ay, w - 30, 32, { stroke: active ? a.color : P.border, glow: glowColor, r: 6 });
      if (active) {
        box(ctx, ax + 1, ay + 1, 90, 30, { fill: a.color + "20", r: 6 });
        txt(ctx, ax + 45, ay + 16, a.name, { sz: 10, c: a.color, w: "700" });
      } else {
        txt(ctx, ax + 45, ay + 16, a.name, { sz: 10, c: P.dim });
      }
      txt(ctx, ax + 110, ay + 16, "— " + a.desc, { sz: 9, c: active ? P.text : P.dim, a: "left" });
    });

    // Code block on right
    var codeX = w - 170, codeY = 48;
    box(ctx, codeX, codeY, 155, 140, { r: 6, stroke: P.dim });
    txt(ctx, codeX + 78, codeY + 14, "Custom Annotation:", { sz: 8, c: P.faint, w: "700" });
    typewriter(ctx, codeX + 8, codeY + 28, '@interface Validated {\n    String field();\n    int min() default 0;\n    int max() default 100;\n    String message()\n      default "invalid";\n}', t * 10, { speed: 25, sz: 8 });

    // Meta-annotation section
    var metaY = 210;
    txt(ctx, cx, metaY, "@Target — where can this annotation be placed?", { sz: 10, c: P.text });
    var targets = ["METHOD", "FIELD", "PARAMETER", "TYPE"];
    targets.forEach(function(tgt, i) {
      var tx = 30 + i * 90;
      var highlight = phase >= 2;
      box(ctx, tx, metaY + 15, 80, 22, { stroke: highlight ? P.blue : P.border, r: 4 });
      txt(ctx, tx + 40, metaY + 26, tgt, { sz: 8, c: highlight ? P.blue : P.dim });
    });

    // Retention
    txt(ctx, cx, metaY + 50, "@Retention — when is this annotation available?", { sz: 10, c: P.text });
    var retentions = ["SOURCE", "CLASS", "RUNTIME"];
    retentions.forEach(function(r, i) {
      var rx = 50 + i * 100;
      var active2 = phase === 3 && i === 2;
      box(ctx, rx, metaY + 65, 85, 22, { stroke: active2 ? P.amber : P.border, r: 4, glow: active2 ? P.amber : null });
      txt(ctx, rx + 42, metaY + 76, r, { sz: 8, c: active2 ? P.amber : P.dim });
    });

    typewriter(ctx, 15, 320, '@Target(ElementType.METHOD)\n@Retention(RetentionPolicy.RUNTIME)\npublic @interface Validated {\n    String field();\n    int min() default 0;\n}', t * 10, { speed: 18 });
    txt(ctx, cx, h - 16, "Annotations add metadata — @Target controls placement, @Retention controls lifetime", { sz: 9, c: P.faint });
  }

  function subJavaExceptions(canvas, ctx, w, h, t) {
    var cx = w / 2;
    txt(ctx, cx, 16, "Java Exception Hierarchy", { sz: 13, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 3) % 3;

    // Throwable (root)
    var tY = 48;
    box(ctx, cx - 50, tY, 100, 26, { stroke: P.rose, r: 6, glow: P.rose });
    txt(ctx, cx, tY + 13, "Throwable", { sz: 10, c: P.rose, w: "700" });

    // Two branches
    arrow(ctx, cx - 25, tY + 28, cx - 75, tY + 55, { c: P.amber, lw: 2, hd: 5 });
    arrow(ctx, cx + 25, tY + 28, cx + 75, tY + 55, { c: P.green, lw: 2, hd: 5 });

    // Error branch (left)
    var eX = cx - 115, eY = tY + 58;
    box(ctx, eX, eY, 80, 24, { stroke: P.amber, r: 6 });
    txt(ctx, eX + 40, eY + 12, "Error", { sz: 10, c: P.amber, w: "700" });
    var errors = ["OutOfMemoryError", "StackOverflowError", "IOException"];
    errors.forEach(function(e, i) {
      arrow(ctx, eX + 40, eY + 26, eX + 40, eY + 42 + i * 22, { c: P.faint, lw: 1, hd: 3 });
      box(ctx, eX - 5, eY + 42 + i * 22, 90, 18, { stroke: P.faint, r: 4 });
      txt(ctx, eX + 40, eY + 51 + i * 22, e, { sz: 7, c: P.dim });
    });
    txt(ctx, eX + 40, eY + 125, "UNCHECKED — don't catch", { sz: 7, c: P.amber, w: "700" });

    // Exception branch (right)
    var exX = cx + 35, exY = tY + 58;
    box(ctx, exX, exY, 80, 24, { stroke: P.green, r: 6 });
    txt(ctx, exX + 40, exY + 12, "Exception", { sz: 10, c: P.green, w: "700" });

    // Checked vs unchecked split
    arrow(ctx, exX + 20, exY + 26, exX, exY + 52, { c: P.blue, lw: 1.5, hd: 4 });
    arrow(ctx, exX + 60, exY + 26, exX + 80, exY + 52, { c: P.pink, lw: 1.5, hd: 4 });

    // Checked
    box(ctx, exX - 15, exY + 52, 75, 20, { stroke: P.blue, r: 4 });
    txt(ctx, exX + 22, exY + 62, "CHECKED", { sz: 8, c: P.blue, w: "700" });
    var checked = ["IOException", "SQLException", "ParseException"];
    checked.forEach(function(c, i) {
      box(ctx, exX - 10, exY + 78 + i * 20, 68, 16, { stroke: P.faint, r: 3 });
      txt(ctx, exX + 24, exY + 86 + i * 20, c, { sz: 6, c: P.dim });
    });

    // Unchecked
    box(ctx, exX + 55, exY + 52, 75, 20, { stroke: P.pink, r: 4 });
    txt(ctx, exX + 92, exY + 62, "UNCHECKED", { sz: 8, c: P.pink, w: "700" });
    var unchecked = ["NPE", "AIOOBE", "IAE"];
    unchecked.forEach(function(u, i) {
      box(ctx, exX + 60, exY + 78 + i * 20, 65, 16, { stroke: P.faint, r: 3 });
      txt(ctx, exX + 92, exY + 86 + i * 20, u, { sz: 7, c: P.dim });
    });

    // Try-catch flow (phase 1+)
    if (phase >= 1) {
      var tryY = 310;
      box(ctx, 20, tryY, 130, 35, { stroke: P.green, r: 6 });
      txt(ctx, 85, tryY + 12, "try {", { sz: 9, c: P.green, w: "700" });
      txt(ctx, 85, tryY + 26, "risky code", { sz: 8, c: P.text });

      arrow(ctx, 153, tryY + 18, 175, tryY + 18, { c: P.faint, lw: 1.5, hd: 4 });

      box(ctx, 178, tryY, 120, 35, { stroke: P.amber, r: 6 });
      txt(ctx, 238, tryY + 12, "catch (Ex e) {", { sz: 9, c: P.amber, w: "700" });
      txt(ctx, 238, tryY + 26, "handle error", { sz: 8, c: P.text });

      if (phase >= 2) {
        arrow(ctx, 300, tryY + 18, 325, tryY + 18, { c: P.faint, lw: 1.5, hd: 4 });
        box(ctx, 328, tryY, 80, 35, { stroke: P.blue, r: 6 });
        txt(ctx, 368, tryY + 12, "finally {", { sz: 9, c: P.blue, w: "700" });
        txt(ctx, 368, tryY + 26, "always runs", { sz: 8, c: P.text });
      }
    }

    typewriter(ctx, 15, 365, 'try {\n    FileReader f = new FileReader("x.txt");\n} catch (FileNotFoundException e) {\n    System.out.println("Not found");\n} finally {\n    // always runs\n}', t * 10, { speed: 18 });
    txt(ctx, cx, h - 16, "Checked: must handle (compile-time) | Unchecked: runtime bugs | Finally: always executes", { sz: 9, c: P.faint });
  }

  function subJavaConcurrency(canvas, ctx, w, h, t) {
    var cx = w / 2;
    txt(ctx, cx, 16, "Java Concurrency", { sz: 13, c: P.cyan, w: "700" });
    var phase = Math.floor(t / 2.5) % 4;

    // Thread timeline
    var tlY1 = 60, tlY2 = 120, tlY3 = 180, tlX = 30, tlEnd = w - 30;
    var threadNames = ["main", "worker-1", "worker-2"];
    var threadColors = [P.blue, P.green, P.pink];
    var threadYs = [tlY1, tlY2, tlY3];

    threadYs.forEach(function(ty, i) {
      box(ctx, 5, ty - 8, 55, 18, { stroke: threadColors[i], r: 4 });
      txt(ctx, 32, ty + 1, threadNames[i], { sz: 8, c: threadColors[i], w: "700" });
      arrow(ctx, tlX, ty, tlEnd, ty, { c: P.border, lw: 1 });
    });

    // Main thread progress
    var mainProg = (t % 8) / 8;
    var mainX = tlX + (tlEnd - tlX) * mainProg;
    ctx.beginPath(); ctx.arc(mainX, tlY1, 5, 0, Math.PI * 2);
    ctx.fillStyle = P.blue;
    ctx.save(); ctx.shadowColor = P.blue; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();

    // Worker threads start at different times
    if (mainProg > 0.15) {
      var w1Prog = Math.min((mainProg - 0.15) * 1.5, 1);
      var w1X = tlX + (tlEnd - tlX) * 0.15 + (tlEnd - tlX) * 0.5 * w1Prog;
      ctx.beginPath(); ctx.arc(Math.min(w1X, tlEnd), tlY2, 5, 0, Math.PI * 2);
      ctx.fillStyle = P.green;
      ctx.save(); ctx.shadowColor = P.green; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();
    }
    if (mainProg > 0.3) {
      var w2Prog = Math.min((mainProg - 0.3) * 1.5, 1);
      var w2X = tlX + (tlEnd - tlX) * 0.3 + (tlEnd - tlX) * 0.4 * w2Prog;
      ctx.beginPath(); ctx.arc(Math.min(w2X, tlEnd), tlY3, 5, 0, Math.PI * 2);
      ctx.fillStyle = P.pink;
      ctx.save(); ctx.shadowColor = P.pink; ctx.shadowBlur = 8; ctx.fill(); ctx.restore();
    }

    // Synchronized block indicator
    if (phase >= 1 && phase <= 2) {
      var syncX = tlX + (tlEnd - tlX) * 0.4;
      var syncW = 80;
      box(ctx, syncX, tlY1 - 30, syncW, 15, { stroke: P.amber, r: 3 });
      txt(ctx, syncX + syncW / 2, tlY1 - 22, "synchronized", { sz: 7, c: P.amber, w: "700" });
      // Lock icon
      ctx.save(); ctx.setLineDash([2, 2]); ctx.strokeStyle = P.amber; ctx.lineWidth = 1;
      ctx.strokeRect(syncX + 5, tlY2 - 15, syncW - 10, tlY3 - tlY2 + 30);
      ctx.restore();
    }

    // Executor service
    if (phase === 3) {
      var exY = 220;
      box(ctx, 20, exY, w - 40, 55, { stroke: P.amber, r: 6, glow: P.amber });
      txt(ctx, cx, exY + 16, "ExecutorService pool = Executors.newFixedThreadPool(3);", { sz: 9, c: P.amber, w: "700" });
      txt(ctx, cx, exY + 34, "pool.submit(() -> doWork());  // runs on available thread", { sz: 9, c: P.green });
      txt(ctx, cx, exY + 50, "CompletableFuture.supplyAsync(() -> compute())", { sz: 9, c: P.blue });
    }

    // CompletableFuture
    if (phase === 2) {
      var fY = 230;
      box(ctx, 20, fY, w - 40, 40, { stroke: P.blue, r: 6, glow: P.blue });
      txt(ctx, cx, fY + 15, "CompletableFuture<String> future = ", { sz: 9, c: P.blue, w: "700" });
      txt(ctx, cx, fY + 30, "  CompletableFuture.supplyAsync(() -> \"result\");", { sz: 9, c: P.blue });
    }

    typewriter(ctx, 15, 300, 'ExecutorService pool = Executors.newFixedThreadPool(3);\nFuture<String> f1 = pool.submit(() -> fetchUser());\nFuture<String> f2 = pool.submit(() -> fetchOrder());\nString user = f1.get();  // blocks until done\nString order = f2.get();', t * 10, { speed: 18 });
    txt(ctx, cx, h - 16, "Threads run in parallel | synchronized = mutual exclusion | ExecutorService manages thread pool", { sz: 9, c: P.faint });
  }

  // ═══════════════ DISPATCH MAP ═══════════════

  var SUBTOPIC_VIZ_MAP = {
    // ── Control Flow (9) ──
    "if": subIf,
    "if-else": subIfElse,
    "nested-if": subNestedIf,
    "if-else-ladder": subIfElseLadder,
    "for-loop": subForLoop,
    "while-loop": subWhileLoop,
    "do-while-loop": subDoWhileLoop,
    "switch": subSwitch,
    "break-continue": subBreakContinue,

    // ── Data Structures (10) ──
    "linked-list": subLinkedList,
    "singly-linked-list": subLinkedList,
    "doubly-linked-list": subDoublyLinkedList,
    "circular-linked-list": subCircularLinkedList,
    "doubly-linked-list-c": subDoublyLinkedList,
    "circular-linked-list-c": subCircularLinkedList,
    "stack": subStack,
    "queue": subQueue,
    "queue-circular": subQueueCircular,
    "binary-tree": subBinaryTree,
    "hash-table": subHashTable,
    "heap": subHeap,
    "graph": subGraph,

    // ── Functions (7) ──
    "function-declaration": subFunctionDeclaration,
    "declaration": subFunctionDeclaration,
    "parameters": subParameters,
    "recursion": subRecursion,
    "scope": subScope,
    "return-values": subReturnValues,
    "default-params": subDefaultParams,

    // ── Variables (5) ──
    "variable-declaration": subVarDeclaration,
    "variable-scope": subVarScope,
    "naming-rules": subNamingRules,
    "mutability": subMutability,
    "initialization": subVarInitialization,

    // ── Sorting (5) ──
    "bubble-sort": subBubbleSort,
    "merge-sort": subMergeSort,
    "quick-sort": subQuickSort,
    "insertion-sort": subInsertionSort,
    "selection-sort": subSelectionSort,

    // ── Searching (4) ──
    "linear-search": subLinearSearch,
    "binary-search": subBinarySearch,
    "hash-search": subHashSearch,
    "dfs-bfs": subDfsBfs,

    // ── OOP (4) ──
    "encapsulation": subEncapsulation,
    "inheritance": subInheritance,
    "polymorphism": subPolymorphism,
    "abstraction": subAbstraction,

    // ── Time Complexity (3) ──
    "big-o-notation": subBigONotation,
    "common-complexities": subCommonComplexities,
    "space-complexity": subSpaceComplexity,

    // ── Recursion (2) ──
    "base-case": subBaseCase,
    "tail-recursion": subTailRecursion,

    // ── Strings (2) ──
    "concatenation": subConcatenation,
    "interpolation": subInterpolation,

    // ── Arrays (4) ──
    "indexing": subIndexing,
    "iteration": subIteration,
    "slicing": subSlicing,
    "multi-dimensional": subMultiDimensional,

    // ── Error Handling (3) ──
    "try-catch": subTryCatch,
    "throwing-errors": subThrowingErrors,
    "finally": subFinally,

    // ── Memory/Pointers (14) ──
    "pointer-basics": subMemoryManagement,
    "pointer-arithmetic": subMemoryManagement,
    "pointers-to-pointers": subMemoryManagement,
    "dangling-pointers": subMemoryManagement,
    "buffer-overflows": subMemoryManagement,
    "malloc-free": subMemoryManagement,
    "calloc-realloc": subMemoryManagement,
    "stack-frame": subMemoryManagement,
    "struct-basics": subMemoryManagement,
    "struct-padding": subMemoryManagement,
    "struct-pointers": subMemoryManagement,
    "struct-arrays": subMemoryManagement,
    "null-pointers": subMemoryManagement,
    "memory-leaks": subMemoryManagement,

    // ── Assembly (20) ──
    "general-registers": subAssembly,
    "flags-register": subAssembly,
    "base-plus-offset": subAssembly,
    "register-indirect": subAssembly,
    "direct-addressing": subAssembly,
    "push-pop": subAssembly,
    "exit-syscall": subAssembly,
    "read-syscall": subAssembly,
    "mmap-syscall": subAssembly,
    "syscall-basics": subAssembly,
    "calling-convention": subAssembly,
    "caller-saved": subAssembly,
    "procedure-flow": subAssembly,
    "stack-asm": subAssembly,
    "stack-addressing": subAssembly,
    "rax-special": subAssembly,
    "integers": subAssembly,
    "floats": subAssembly,
    "characters": subAssembly,
    "booleans": subAssembly,

    // ── Ownership (17) ──
    "ownership-rules": subOwnership,
    "immutable-borrow": subOwnership,
    "mutable-borrow": subOwnership,
    "lifetimes": subOwnership,
    "drop-trait": subOwnership,
    "move-semantics": subOwnership,
    "move-assignment": subOwnership,
    "move-constructors": subOwnership,
    "rule-of-five": subOwnership,
    "rvalue-references": subOwnership,
    "std-move": subOwnership,
    "shared-ptr": subOwnership,
    "unique-ptr": subOwnership,
    "weak-ptr": subOwnership,
    "copy-on-write": subOwnership,
    "strong-references": subOwnership,
    "copy-method": subOwnership,

    // ── Enums/Algebraic (12) ──
    "option-enum": subEnumAlgebraic,
    "result-enum": subEnumAlgebraic,
    "sealed-hierarchy": subEnumAlgebraic,
    "sealed-interfaces": subEnumAlgebraic,
    "enum-basics": subEnumAlgebraic,
    "enum-types": subEnumAlgebraic,
    "enum-methods": subEnumAlgebraic,
    "enums-value": subEnumAlgebraic,
    "discriminated-unions": subEnumAlgebraic,
    "records": subJavaClasses,
    "basic-union": subEnumAlgebraic,
    "option-basics": subEnumAlgebraic,

    // ── Generics (14) ──
    "generic-classes": subGenerics,
    "generic-functions": subGenerics,
    "wildcard-types": subGenerics,
    "bounded-type-params": subGenerics,
    "default-type-params": subGenerics,
    "type-erasure": subGenerics,
    "type-casting": subGenerics,
    "type-inference": subGenerics,
    "class-templates": subGenerics,
    "function-templates": subGenerics,
    "template-specialization": subGenerics,
    "index-signatures": subGenerics,
    "type-alias-union": subGenerics,
    "default-implementations": subGenerics,

    // ── Closures (14) ──
    "basic-closure": subClosures,
    "closure-loop": subClosures,
    "closure-privacy": subClosures,
    "partial-application": subClosures,
    "memoization": subClosures,
    "lambda": subClosures,
    "higher-order": subClosures,
    "function-literals": subClosures,
    "closures": subClosures,
    "closure": subClosures,
    "function-pointers": subClosures,
    "blocks": subClosures,
    "blocks-as-closures": subClosures,
    "procs": subClosures,

    // ── Database (34) ──
    "inner-join": subDatabase,
    "left-right-join": subDatabase,
    "full-join": subDatabase,
    "self-join": subDatabase,
    "cross-join": subDatabase,
    "merge-joins": subDatabase,
    "table-basics": subDatabase,
    "select-statement": subDatabase,
    "composite-index": subDatabase,
    "btree-index": subDatabase,
    "unique-index": subDatabase,
    "covering-index": subDatabase,
    "cursor-usage": subDatabase,
    "begin-commit": subDatabase,
    "savepoints": subDatabase,
    "rollback": subDatabase,
    "create-procedure": subDatabase,
    "isolation-levels": subDatabase,
    "create-dataframe": subDatabase,
    "dplyr-verbs": subDatabase,
    "tidyr-pivot": subDatabase,
    "table-operations": subDatabase,
    "geoms": subDatabase,
    "faceting": subDatabase,
    "themes": subDatabase,
    "ggplot-basics": subDatabase,
    "formula-basics": subDatabase,
    "formula-operators": subDatabase,
    "factor-handling": subDatabase,
    "ifelse-vectorized": subDatabase,
    "apply-family": subDatabase,
    "list-set-map": subDatabase,
    "unmodifiable-collections": subDatabase,

    // ── Interfaces (20) ──
    "abstract-classes": subInterface,
    "abstract-trait-methods": subInterface,
    "abstract-vs-concrete": subInterface,
    "inner-classes": subInterface,
    "multiple-interfaces": subInterface,
    "interface-basics": subInterface,
    "interface-composition": subInterface,
    "extending-interfaces": subInterface,
    "empty-interface": subInterface,
    "generic-interfaces": subInterface,
    "functional-interfaces": subInterface,
    "class-syntax": subInterface,
    "class-basics": subInterface,
    "constructors-destructors": subInterface,
    "inheritance-java": subInterface,
    "instanceof-guard": subInterface,
    "open-classes": subInterface,
    "extending": subInterface,
    "concerns": subInterface,

    // ── Async (9) ──
    "promise-basics": subAsync,
    "promise-all": subAsync,
    "async-await-basics": subAsync,
    "future-basics": subAsync,
    "completer": subAsync,
    "launch-async": subAsync,
    "stream-basics": subJavaStreams,
    "streaming": subAsync,
    "events": subAsync,

    // ── Iterators (13) ──
    "basic-generator": subIterators,
    "pipeline-generators": subIterators,
    "generator-expressions": subIterators,
    "yield-from": subIterators,
    "map-flatmap": subIterators,
    "for-yield": subIterators,
    "for-with-guards": subIterators,
    "for-with-options": subIterators,
    "coroutine-as-iterator": subIterators,
    "coroutine-context": subIterators,
    "coroutine-create": subIterators,
    "coroutine-values": subIterators,

    // ── Decorators (3) ──
    "basic-decorator": subDecorator,
    "decorator-with-args": subDecorator,
    "class-decorator": subDecorator,
    "stacking-decorators": subDecorator,

    // ── Traits (12) ──
    "existentials": subTraits,
    "self-types": subTraits,
    "common-traits": subTraits,
    "stackable-traits": subTraits,
    "trait-bounds": subTraits,
    "trait-conflict": subTraits,
    "trait-properties": subTraits,
    "mixin-basics": subTraits,
    "multiple-mixins": subTraits,
    "mixin-on": subTraits,
    "abstract-mixin": subTraits,

    // ── Methods (7) ──
    "monkey-patching": subMethods,
    "method-missing": subMethods,
    "prototype-chain": subMethods,
    "prototype-methods": subMethods,
    "prototypal-inheritance": subMethods,
    "which-find": subMethods,
    "auto-vivification": subMethods,

    // ── Testing (5) ──
    "assertions": subTesting,
    "mocking": subTesting,
    "test-cases": subTesting,
    "test-runners": subTesting,
    "unit-tests": subTesting,

    // ── PHP (18) ──
    "composer-json": subPHP,
    "composer-scripts": subPHP,
    "psr4-autoload": subPHP,
    "package-basics": subPHP,
    "lock-file": subPHP,
    "package-managers": subPHP,
    "namespaces": subPHP,
    "exports": subPHP,
    "exporting": subPHP,
    "property-types": subPHP,
    "property-validation": subPHP,
    "computed-properties": subPHP,
    "readonly-properties": subPHP,
    "auto-properties": subPHP,
    "null-cascade": subPHP,
    "null-assertion": subPHP,
    "non-null-assertions": subPHP,
    "optional-chaining": subPHP,
    "optional-readonly": subPHP,
    "safe-calls": subPHP,

    // ── Lua (11) ──
    "nested-tables": subLuaTable,
    "tostring-metamethod": subLuaTable,
    "call-metamethod": subLuaTable,
    "with-statement": subLuaTable,
    "eval": subLuaTable,

    // ── Python (27) ──
    "basic-comprehension": subPythonFeatures,
    "nested-comprehensions": subPythonFeatures,
    "dict-comprehensions": subPythonFeatures,
    "walrus-in-comprehension": subPythonFeatures,
    "contextlib": subPythonFeatures,
    "custom-context-manager": subPythonFeatures,
    "everything-is-object": subPythonFeatures,
    "common-methods": subPythonFeatures,
    "built-in-methods": subPythonFeatures,
    "operator-overloading": subPythonFeatures,
    "duck-typing": subPythonFeatures,

    // ── Dart (19) ──
    "widget-composition": subDartFlutter,
    "stateless-widget": subDartFlutter,
    "stateful-widget": subDartFlutter,
    "component-naming": subDartFlutter,
    "late-keyword": subDartFlutter,
    "nullable-types": subDartFlutter,
    "nullable-extensions": subDartFlutter,
    "non-nullable-default": subDartFlutter,
    "extension-basics": subDartFlutter,
    "extension-properties": subDartFlutter,
    "null-assertion": subDartFlutter,

    // ── Kotlin/Swift (16) ──
    "scope-functions": subKotlinSwift,
    "let-else": subKotlinSwift,
    "let-nullable": subKotlinSwift,
    "if-let": subKotlinSwift,
    "data-class-basics": subKotlinSwift,
    "destructuring": subKotlinSwift,
    "destructuring-collections": subKotlinSwift,
    "capture-lists": subKotlinSwift,

    // ── R (14) ──
    "tidyr-pivot": subRFeatures,

    // ── Perl (17) ──
    "wantarray": subPerlFeatures,
    "hash-ref": subPerlFeatures,
    "scalar-ref": subPerlFeatures,
    "array-ref": subPerlFeatures,
    "scalar-list-context": subPerlFeatures,
    "regex-captures": subPerlFeatures,
    "regex-matching": subPerlFeatures,
    "regex-modifiers": subPerlFeatures,
    "regex-substitution": subPerlFeatures,
    "oo-packages": subPerlFeatures,
    "packages": subPerlFeatures,
    "constants": subPerlFeatures,
    "varargs": subPerlFeatures,
    "context": subPerlFeatures,

    // ── Ruby (6) ──
    "extend": subRubyFeatures,

    // ── Go Concurrency (14) ──
    "goroutine-basics": subGoConcurrency,
    "goroutine-scheduling": subGoConcurrency,
    "goroutine-leaks": subGoConcurrency,
    "channel-basics": subGoConcurrency,
    "channel-range": subGoConcurrency,
    "waitgroup": subGoConcurrency,
    "cancellation": subGoConcurrency,
    "producer-consumer": subGoConcurrency,
    "buffered-channels": subGoConcurrency,
    "task-parallel": subGoConcurrency,
    "structured-concurrency": subGoConcurrency,
    "panic-recover": subGoConcurrency,
    "if-err-nil": subGoConcurrency,

    // ── Error Chain (7) ──
    "custom-errors": subErrorChain,
    "error-handling-dart": subErrorChain,
    "error-handling-sql": subErrorChain,
    "exception-handling": subErrorChain,
    "error-propagation": subErrorChain,
    "error-wrapping": subErrorChain,

    // ── Scala (remaining) ──
    "for-comprehensions": subIterators,
    "extractor-objects": subTraits,
    "match-basics": subEnumAlgebraic,
    "match-structs": subEnumAlgebraic,
    "type-patterns": subEnumAlgebraic,
    "tuple-patterns": subEnumAlgebraic,
    "path-dependent-types": subGenerics,

    // ═══════════════ NEW LANGUAGE SUBTOPICS ═══════════════

    // ── Async (27) ──
    "async-await": subAsync,
    "async-fn": subAsync,
    "async-generator": subAsync,
    "async-pattern": subAsync,
    "async-stream": subAsync,
    "async-traits": subAsync,
    "async-await-dart": subAsync,
    "async-await-swift": subAsync,
    "await-keyword": subAsync,
    "await-pattern": subAsync,
    "launch-async-kotlin": subAsync,
    "suspend-fn": subAsync,
    "suspend-functions": subAsync,
    "suspend-resume": subAsync,
    "flow-kotlin": subAsync,
    "with-context": subAsync,
    "future-composition": subAsync,
    "future-recovery": subAsync,
    "promise-future": subAsync,
    "task-basic": subAsync,
    "task-swift": subAsync,
    "taskgroup-swift": subAsync,
    "cancellation-token": subAsync,
    "completable-future": subJavaConcurrency,
    "executor-service": subJavaConcurrency,
    "when-all-any": subAsync,
    "synchronized-locks": subJavaConcurrency,
    "thread-basics": subJavaConcurrency,
    "tokio-runtime": subAsync,
    "reactive-patterns": subAsync,
    "fiber-basic": subAsync,
    "practical-usage": subAsync,
    "getReturn-value": subAsync,
    "actor-swift": subAsync,
    "error-handling": subAsync,

    // ── Iterators/Streams (22) ──
    "stream-mapping": subJavaStreams,
    "stream-collectors": subJavaStreams,
    "stream-reduce": subJavaStreams,
    "stream-creation": subJavaStreams,
    "terminal-ops": subJavaStreams,
    "intermediate-ops": subJavaStreams,
    "collectors": subJavaStreams,
    "generator-function": subIterators,
    "custom-iterable": subIterators,
    "for-of-loop": subIterators,
    "yield-keyword": subIterators,
    "each-map-select": subIterators,
    "reduce-inject": subIterators,
    "sort-group-by": subIterators,
    "chunk-min-max": subIterators,
    "zip-take": subIterators,
    "map-reduce": subIterators,
    "coroutine-pipeline": subIterators,
    "coroutine-state-machine": subIterators,
    "coroutine-error": subIterators,
    "worker-pool": subIterators,
    "pipeline-pattern": subIterators,
    "rate-limiting": subIterators,
    "fan-out-fan-in": subIterators,
    "go-keyword": subIterators,
    "map-flatmap": subIterators,
    "iterating-collections": subJavaStreams,
    "sorting-collections": subJavaStreams,

    // ── Java Collections Framework (8) ──
    "list-implementation": subJavaStreams,
    "set-implementations": subJavaStreams,
    "map-implementations": subJavaStreams,
    "collections-utility": subJavaStreams,
    "iterators-java": subJavaStreams,
    "comparable-comparator": subJavaStreams,
    "list-set-map": subJavaStreams,
    "unmodifiable-collections": subJavaStreams,

    // ── Isolate (4) ──
    "isolate-spawn": subIsolate,
    "isolate-lifecycle": subIsolate,
    "send-port-receive": subIsolate,
    "compute-function": subIsolate,

    // ── Window Functions (4) ──
    "window-aggregates": subWindowFunctions,
    "row-number": subWindowFunctions,
    "rank-dense-rank": subWindowFunctions,
    "lag-lead": subWindowFunctions,

    // ── String Patterns (4) ──
    "pattern-basics": subStringPatterns,
    "gmatch-gsub": subStringPatterns,
    "captures": subStringPatterns,
    "char-classes": subStringPatterns,

    // ── Enums/Algebraic types (30) ──
    "sealed-class-syntax": subEnumAlgebraic,
    "sealed-classes-dart": subEnumAlgebraic,
    "sealed-permits": subEnumAlgebraic,
    "sealed-trait-hierarchy": subEnumAlgebraic,
    "records-dart": subEnumAlgebraic,
    "record-syntax": subEnumAlgebraic,
    "record-class": subEnumAlgebraic,
    "record-struct": subEnumAlgebraic,
    "switch-expression": subEnumAlgebraic,
    "match-expression": subEnumAlgebraic,
    "match-enum": subEnumAlgebraic,
    "pattern-switch": subEnumAlgebraic,
    "pattern-match-3": subEnumAlgebraic,
    "destructuring-dart": subEnumAlgebraic,
    "deconstruction": subEnumAlgebraic,
    "with-expression": subEnumAlgebraic,
    "case-class-basics": subEnumAlgebraic,
    "case-class-companion": subEnumAlgebraic,
    "case-class-copy": subEnumAlgebraic,
    "case-class-extraction": subEnumAlgebraic,
    "case-class-pattern": subEnumAlgebraic,
    "exhaustive-when": subEnumAlgebraic,
    "enum-classes": subEnumAlgebraic,
    "value-classes": subEnumAlgebraic,
    "compact-ctors": subEnumAlgebraic,
    "result-syntax": subEnumAlgebraic,
    "result-map": subEnumAlgebraic,
    "result-switch": subEnumAlgebraic,
    "array-destructuring": subEnumAlgebraic,
    "object-destructuring": subEnumAlgebraic,
    "nested-destructuring": subEnumAlgebraic,
    "parameter-destructuring": subEnumAlgebraic,

    // ── Generics/Type system (27) ──
    "constraints": subGenerics,
    "sfinae-concepts": subGenerics,
    "variadic-templates": subGenerics,
    "type-traits": subGenerics,
    "blanket-impls": subGenerics,
    "basic-conditional": subGenerics,
    "infer-keyword": subGenerics,
    "distributive-types": subGenerics,
    "built-in-conditionals": subGenerics,
    "associated-types": subGenerics,
    "trait-objects": subGenerics,
    "trait-bounds-advanced": subGenerics,
    "partial-required": subGenerics,
    "readonly-modifier": subGenerics,
    "key-remapping": subGenerics,
    "pick-omit": subGenerics,
    "const-inference": subGenerics,
    "return-type-inference": subGenerics,
    "contextual-typing": subGenerics,
    "satisfies-operator": subGenerics,
    "literal-unions": subGenerics,
    "union-inference": subGenerics,
    "union-types": subGenerics,
    "event-names": subGenerics,
    "css-types": subGenerics,
    "string-patterns": subGenerics,
    "type-classes": subGenerics,
    "default-implementations": subGenerics,

    // ── Database/SQL (18) ──
    "cte-basics": subDatabase,
    "cte-multiple": subDatabase,
    "cte-pagination": subDatabase,
    "recursive-cte": subDatabase,
    "partial-index": subDatabase,
    "explain-analyze": subDatabase,
    "gin-index": subDatabase,
    "savepoint-partial": subDatabase,
    "acid-overview": subDatabase,
    "deadlock-prevention": subDatabase,
    "linq-query-syntax": subDatabase,
    "linq-method-syntax": subDatabase,
    "linq-grouping": subDatabase,
    "linq-aggregation": subDatabase,
    "query-syntax": subDatabase,
    "deferred-execution": subDatabase,
    "group-by": subDatabase,
    "aggregate-ops": subDatabase,

    // ── Lua Table (15) ──
    "metatable-basics": subLuaTable,
    "metatable-oop": subLuaTable,
    "lua-inheritance": subLuaTable,
    "polymorphism": subLuaTable,
    "encapsulation": subLuaTable,
    "array-style": subLuaTable,
    "varargs": subLuaTable,
    "linked-list-lua": subLuaTable,
    "stack-lua": subLuaTable,
    "queue-lua": subLuaTable,
    "hash-table-lua": subLuaTable,
    "binary-tree-lua": subLuaTable,
    "module-returns": subLuaTable,
    "require-load": subLuaTable,
    "package-path": subLuaTable,
    "luarocks": subLuaTable,

    // ── Assembly (14) ──
    "sse-intro": subAssembly,
    "avx-intro": subAssembly,
    "packed-operations": subAssembly,
    "simd-data-layout": subAssembly,
    "elf-format": subAssembly,
    "gdb-basics": subAssembly,
    "objdump-disasm": subAssembly,
    "build-process": subAssembly,
    "linked-list-asm": subAssembly,
    "hash-table-asm": subAssembly,
    "system-v-amd64": subAssembly,
    "windows-x64": subAssembly,
    "recursion-stack": subAssembly,
    "callee-saved-regs": subAssembly,

    // ── Interfaces/OOP (30) ──
    "class-basics": subJavaClasses,
    "constructors-destructors": subInterface,
    "inheritance-java": subJavaClasses,
    "abstract-classes": subJavaClasses,
    "abstract-trait-methods": subInterface,
    "inner-classes": subJavaClasses,
    "multiple-interfaces": subInterface,
    "interface-basics": subInterface,
    "interface-composition": subInterface,
    "extending-interfaces": subInterface,
    "empty-interface": subInterface,
    "generic-interfaces": subInterface,
    "functional-interfaces": subInterface,
    "class-syntax": subInterface,
    "sealed-interfaces": subInterface,
    "instanceof-guard": subInterface,
    "open-classes": subInterface,
    "extending": subInterface,
    "concerns": subInterface,
    "implicit-interfaces": subInterface,
    "implicit-interface": subInterface,
    "interface-composition-go": subInterface,
    "empty-interface-go": subInterface,
    "error-interface-go": subInterface,
    "protocol-syntax": subInterface,
    "protocol-extension": subInterface,
    "protocol-composition-swift": subInterface,
    "protocol-basics": subInterface,
    "protocol-extensions": subInterface,
    "protocol-inheritance": subInterface,
    "existential-types": subInterface,
    "inheritance-isa": subInterface,
    "checked-unchecked": subJavaExceptions,
    "try-with-resources": subJavaExceptions,
    "multi-catch": subJavaExceptions,
    "custom-exceptions": subJavaExceptions,
    "vector-deque": subInterface,
    "list-forward-list": subInterface,
    "set-map": subInterface,
    "unordered-map": subInterface,
    "expression-bodied": subInterface,

    // ── Traits/Decorators (15) ──
    "trait-basics": subTraits,
    "self-types": subTraits,
    "common-traits": subTraits,
    "stackable-traits": subTraits,
    "trait-bounds": subTraits,
    "mixin-basics": subTraits,
    "multiple-mixins": subTraits,
    "mixin-on": subTraits,
    "abstract-mixin": subTraits,
    "implicit-val-basics": subTraits,
    "implicit-classes": subTraits,
    "implicit-conversions": subTraits,
    "built-in-extensions": subTraits,
    "chaining-extensions": subTraits,
    "extension-syntax": subTraits,

    // ── Decorators (3) ──
    "method-decorator": subDecorator,
    "parameter-decorator": subDecorator,
    "decorator-factory": subDecorator,

    // ── Methods (12) ──
    "method-missing-ruby": subMethods,
    "define-method": subMethods,
    "eval-dynamic": subMethods,
    "send-dispatch": subMethods,
    "attr-macros": subMethods,
    "method-receiver": subMethods,
    "struct-embedding-go": subMethods,
    "struct-literals": subMethods,
    "json-tags": subMethods,
    "proxy-handler": subMethods,
    "reflect-api": subMethods,
    "monkey-patching": subMethods,

    // ── Closures (16) ──
    "lambda-syntax": subClosures,
    "capture-modes": subClosures,
    "generic-lambdas": subClosures,
    "std-function": subClosures,
    "closures-r": subClosures,
    "function-factory": subClosures,
    "memoization-r": subClosures,
    "lambdas": subClosures,
    "block-syntax": subClosures,
    "proc-object": subClosures,
    "lambda-object": subClosures,
    "ampersand-conversion": subClosures,
    "lambda-receiver": subClosures,
    "dsl-marker": subClosures,
    "html-dsl": subClosures,
    "delegate-basics": subClosures,
    "func-action": subClosures,
    "predicate": subClosures,

    // ── Ownership (12) ──
    "clone-deep": subOwnership,
    "dangling-references": subOwnership,
    "result-enum-rust": subOwnership,
    "question-mark": subOwnership,
    "custom-errors-rust": subOwnership,
    "box-type": subOwnership,
    "rc-type": subOwnership,
    "refcell-type": subOwnership,
    "arc-type": subOwnership,
    "arc-basics": subOwnership,
    "weak-references": subOwnership,
    "structs-value": subOwnership,
    "mutating-methods": subOwnership,
    "init-only": subOwnership,

    // ── Rust Macros (4) ──
    "macro-rules": subOwnership,
    "derive-macros": subOwnership,
    "macro-repetition": subOwnership,
    "proc-macros": subOwnership,

    // ── Error Chain (7) ──
    "if-err-nil-go": subErrorChain,
    "sentinel-errors": subErrorChain,
    "error-wrapping-go": subErrorChain,
    "errors-is-as": subErrorChain,
    "result-enum": subErrorChain,

    // ── Go Concurrency (7) ──
    "context-background": subGoConcurrency,
    "with-timeout": subGoConcurrency,
    "with-value": subGoConcurrency,
    "done-channel": subGoConcurrency,
    "select-statement": subGoConcurrency,
    "channel-range": subGoConcurrency,

    // ── PHP (27) ──
    "named-arguments": subPHP,
    "constructor-promotion": subPHP,
    "match-expression": subPHP,
    "null-safe": subPHP,
    "enum-types": subPHP,
    "readonly-property": subPHP,
    "readonly-class": subPHP,
    "immutability-pattern": subPHP,
    "value-object": subPHP,
    "dto-pattern": subPHP,
    "attribute-syntax": subPHP,
    "target-modes": subPHP,
    "reflection-reading": subPHP,
    "framework-usage": subPHP,
    "custom-attribute": subPHP,
    "backed-enum": subPHP,
    "pure-enum": subPHP,
    "match-enum": subPHP,
    "from-tryFrom": subPHP,
    "suspend-resume": subPHP,
    "async-pattern": subPHP,

    // ── Ruby (23) ──
    "multiple-inclusion": subRubyFeatures,
    "concerns": subRubyFeatures,
    "module-include": subRubyFeatures,
    "module-extend": subRubyFeatures,
    "prepend-pattern": subRubyFeatures,
    "concern-pattern": subRubyFeatures,
    "namespace": subRubyFeatures,
    "guard-clause": subRubyFeatures,
    "memoization-or-equals": subRubyFeatures,
    "tap-method": subRubyFeatures,
    "safe-navigation": subRubyFeatures,
    "enum-types": subPHP,

    // ── Python (5) ──
    "suppress-redirect": subPythonFeatures,

    // ── Kotlin/Swift (14) ──
    "infix-functions": subKotlinSwift,
    "component-naming": subKotlinSwift,
    "let-null": subKotlinSwift,
    "elvis-operator": subKotlinSwift,
    "safe-call": subKotlinSwift,
    "scope-functions": subKotlinSwift,

    // ── Dart (7) ──
    "builder-pattern": subDartFlutter,
    "built-in-extensions": subDartFlutter,
    "linked-list-dart": subDartFlutter,
    "stack-dart": subDartFlutter,
    "queue-dart": subDartFlutter,
    "binary-tree-dart": subDartFlutter,
    "hash-table-dart": subDartFlutter,

    // ── Swift (8) ──
    "optional-basics": subKotlinSwift,
    "optional-binding": subKotlinSwift,
    "state-wrapper": subPHP,
    "binding-wrapper": subPHP,
    "observed-object": subPHP,
    "environment-object": subPHP,
    "custom-wrapper": subPHP,
    "view-protocol": subPHP,
    "modifiers": subPHP,
    "state-binding": subPHP,
    "lists-navigation": subPHP,

    // ── R (16) ──
    "vectorized-ops": subRFeatures,
    "interaction-terms": subRFeatures,
    "readr-import": subRFeatures,
    "purrr-functional": subRFeatures,
    "read-write": subRFeatures,
    "reshape": subRFeatures,
    "join-merge": subRFeatures,
    "stringr-string": subRFeatures,
    "lubridate-dates": subRFeatures,
    "ui-layout": subRFeatures,
    "reactive-values": subRFeatures,
    "render-outputs": subRFeatures,
    "observe-event": subRFeatures,
    "deployment": subRFeatures,
    "t-test": subRFeatures,
    "linear-model": subRFeatures,
    "chi-squared": subRFeatures,
    "anova-test": subRFeatures,
    "confidence-interval": subRFeatures,
    "linked-list-r": subRFeatures,
    "stack-r": subRFeatures,
    "hash-table-r": subRFeatures,
    "binary-tree-r": subRFeatures,

    // ── Perl (19) ──
    "modules": subPerlFeatures,
    "named-captures": subPerlFeatures,
    "non-greedy": subPerlFeatures,
    "zero-width-assertion": subPerlFeatures,
    "interpolation-qr": subPerlFeatures,
    "recursive-regex": subPerlFeatures,
    "anonymous-ref": subPerlFeatures,
    "nested-structures": subPerlFeatures,
    "wantarray-function": subPerlFeatures,
    "context-sensitive": subPerlFeatures,
    "hash-context": subPerlFeatures,
    "function-signatures": subPerlFeatures,
    "postfix-deref": subPerlFeatures,
    "autodie": subPerlFeatures,
    "say-feature": subPerlFeatures,
    "linked-list-perl": subPerlFeatures,
    "stack-perl": subPerlFeatures,
    "queue-perl": subPerlFeatures,
    "hash-table-perl": subPerlFeatures,
    "binary-tree-perl": subPerlFeatures,
    "blessed-reference": subPerlFeatures,
    "class-package": subPerlFeatures,
    "moose-moo": subPerlFeatures,
    "role-composition": subPerlFeatures,

    // ── Java (17) ──
    "built-in-annotations": subJavaAnnotations,
    "custom-annotations": subJavaAnnotations,
    "meta-annotations": subJavaAnnotations,
    "annotation-processing": subJavaAnnotations,
    "stream-creation": subJavaStreams,
    "intermediate-ops": subJavaStreams,
    "terminal-ops": subJavaStreams,
    "collectors": subJavaStreams,
    "record-syntax": subJavaClasses,
    "sealed-permits": subJavaClasses,
    "pattern-switch": subJavaClasses,
    "compact-ctors": subJavaClasses,
    "list-set-map": subJavaStreams,
    "unmodifiable-collections": subJavaStreams,
    "generic-classes": subGenerics,
    "bounded-type-params": subGenerics,
    "wildcard-types": subGenerics,
    "type-erasure": subGenerics,

    // ── C++ (7) ──
    "make-unique-make-shared": subOwnership,
    "lambda-syntax": subClosures,
    "capture-modes": subClosures,
    "generic-lambdas": subClosures,
    "std-function": subClosures,
    "variadic-templates": subGenerics,
    "sfinae-concepts": subGenerics,
    "type-traits": subGenerics,

    // ── JavaScript (11) ──
    "error-handling": subAsync,
    "proxy-handler": subMethods,
    "reactive-patterns": subMethods,
    "weakref-api": subOwnership,
    "finalization-registry": subOwnership,
    "weakmap-weakset": subOwnership,
    "cache-patterns": subOwnership,
    "structured-clone": subOwnership,
    "json-methods": subOwnership,
    "deep-copy": subOwnership,
    "serialization": subOwnership,

    // ── TypeScript (10) ──
    "typeof-guard": subInterface,
    "custom-type-predicates": subInterface,
    "truthiness-guard": subInterface,
    "conditional-types": subGenerics,
    "method-decorator": subDecorator,
    "class-decorator": subDecorator,

    // ── C# (19) ──
    "linq-query-syntax": subDatabase,
    "linq-method-syntax": subDatabase,
    "linq-grouping": subDatabase,
    "linq-aggregation": subDatabase,
    "delegate-basics": subClosures,
    "func-action": subClosures,
    "predicate": subClosures,
    "query-syntax": subDatabase,
    "method-syntax": subDatabase,
    "deferred-execution": subDatabase,
    "group-by": subDatabase,
    "aggregate-ops": subDatabase,
    "init-only": subOwnership,
    "span-basics": subAssembly,
    "readonly-span": subAssembly,
    "stackalloc": subAssembly,
    "array-pool": subAssembly,
    "zero-allocation": subAssembly,

    // ── C (10) ──
    "header-files": subPHP,
    "include-guards": subPHP,
    "compilation-units": subPHP,
    "makefile-basics": subPHP,
    "fopen-fclose": subPHP,
    "fgets-fputs": subPHP,
    "fread-fwrite": subPHP,
    "fprintf-fscanf": subPHP,
    "include": subPHP,
    "define-macros": subPHP,
    "ifdef-conditional": subPHP,
    "pragma-once": subPHP,
    "bitwise-and-or": subAssembly,
    "bit-shifts": subAssembly,
    "bit-flags": subAssembly,
    "bit-manipulation-tricks": subAssembly,

    // ── Data Structures (language-specific, 35) ──
    "linked-list-scala": subLinkedList,
    "linked-list-perl": subPerlFeatures,
    "stack-scala": subStack,
    "queue-scala": subQueue,
    "binary-tree-scala": subBinaryTree,
    "hash-table-scala": subHashTable,
    "binary-tree-perl": subPerlFeatures,
    "hash-table-perl": subPerlFeatures,

    // ── Scala Case Class (4) ──
    "case-class-extraction": subEnumAlgebraic,
    "sealed-hierarchy": subEnumAlgebraic,

    // ── Scala Concurrency (3) ──
    "for-comprehension-futures": subIterators,
    "for-desugared": subIterators,
    "future-recovery": subAsync,

    // ── Scala Implicit (4) ──
    "implicit-val-basics": subTraits,
    "implicit-classes": subTraits,
    "implicit-conversions": subTraits,
    "type-classes": subTraits,

    // ── Lua Module (4) ──
    "module-returns": subLuaTable,
    "require-load": subLuaTable,
    "package-path": subLuaTable,
    "luarocks": subLuaTable,

    // ── Final remaining (8) ──
    "error-interface": subInterface,
    "operator-overload": subMethods,
    "property-pattern": subEnumAlgebraic,
    "relational-pattern": subEnumAlgebraic,
    "stack-alignment": subAssembly,
    "tuple-pattern": subEnumAlgebraic,
    "type-pattern": subEnumAlgebraic,
    "validation-proxy": subMethods,

    // ── C: data-sections (3) ──
    "data-section": subAssembly,
    "bss-section": subAssembly,
    "rodata-section": subAssembly,

    // ── C++: stl-algorithms (3) ──
    "stl-sort-find": subIterators,
    "stl-transform-accumulate": subIterators,
    "stl-remove-erase": subIterators,

    // ── Python: type-hints (3) ──
    "th-basics": subGenerics,
    "th-generics": subGenerics,
    "th-protocols": subInterface,

    // ── Python: dataclasses (3) ──
    "dc-basics": subEnumAlgebraic,
    "dc-frozen": subEnumAlgebraic,
    "dc-post-init": subEnumAlgebraic,

    // ── Python: asyncio (3) ──
    "asyncio-gather": subAsync,
    "asyncio-queues": subAsync,
    "asyncio-exceptions": subErrorChain,

    // ── JavaScript: modules-es6 (3) ──
    "named-default-export": subInterface,
    "module-re-exports": subInterface,
    "dynamic-import": subAsync,

    // ── JavaScript: error-patterns (3) ──
    "custom-error-classes": subErrorChain,
    "async-error-handling": subErrorChain,
    "error-boundary-pattern": subErrorChain,

    // ── TypeScript: utility-types (3) ──
    "ut-partial-required": subGenerics,
    "ut-pick-omit": subGenerics,
    "ut-readonly-record": subGenerics,

    // ── Go: generics-go (3) ──
    "generic-functions": subGenerics,
    "generic-types": subGenerics,
    "type-constraints": subGenerics,

    // ── Ruby: rails-patterns (3) ──
    "active-record-basics": subInterface,
    "service-objects": subInterface,
    "concern-pattern": subInterface,

    // ── PHP: composer-advanced (3) ──
    "version-constraints": subInterface,
    "composer-scripts": subInterface,
    "private-repositories": subInterface,

    // ── SQL: triggers (3) ──
    "trigger-basics": subDatabase,
    "trigger-audit": subDatabase,
    "trigger-cascade": subDatabase,

    // ── R: ggplot2-advanced (4) ──
    "stat-transforms": subRFeatures,
    "coordinate-systems": subRFeatures,
    "scale-customization": subRFeatures,
    "annotations-labels": subRFeatures,

    // ── Dart: flutter-widgets (3) ──
    "material-widgets": subDartFlutter,
    "layout-widgets": subDartFlutter,
    "state-management": subDartFlutter,

    // ── Lua: lua-tables-advanced (3) ──
    "set-as-table": subLuaTable,
    "ordered-iter": subLuaTable,
    "multi-table": subLuaTable,

    // ── File I/O (4) ──
    "reading-files": subDatabase,
    "writing-files": subDatabase,
    "file-exists": subDatabase,
    "paths": subDatabase,

    // ── Modules (2) ──
    "creating-modules": subInterface,
    "importing": subInterface,

    // ── Enums (3) ──
    "enum-flags": subEnumAlgebraic,
    "enum-values": subEnumAlgebraic,
    "creation": subEnumAlgebraic,

    // ── Dynamic Arrays (3) ──
    "da-malloc-realloc": subMemoryManagement,
    "da-resize-pattern": subMemoryManagement,
    "da-struct-wrapper": subMemoryManagement,

    // ── Recursion (2) ──
    "recursive-case": subRecursion,
    "tree-recursion": subRecursion,

    // ── Immutability / Amortized (2) ──
    "amortized": subMemoryManagement,
    "immutability": subOwnership,

    // ═══════════════ DATA-TYPES (120+) ═══════════════
    // ── C: data-types (5) ──
    "c-integers": subEnumAlgebraic,
    "c-floats": subEnumAlgebraic,
    "c-booleans": subEnumAlgebraic,
    "c-characters": subEnumAlgebraic,
    "void-type": subEnumAlgebraic,

    // ── C++: data-types (4) ──
    "cpp-fundamental": subEnumAlgebraic,
    "cpp-auto-decltype": subEnumAlgebraic,
    "cpp-enum-class": subEnumAlgebraic,
    "cpp-reference-types": subEnumAlgebraic,

    // ── Java: data-types (4) ──
    "java-primitives": subEnumAlgebraic,
    "java-wrapper-classes": subEnumAlgebraic,
    "java-string-immutability": subEnumAlgebraic,
    "java-generics-type-safety": subEnumAlgebraic,

    // ── Python: data-types (6) ──
    "py-dynamic-typing": subEnumAlgebraic,
    "py-int-float": subEnumAlgebraic,
    "py-strings": subEnumAlgebraic,
    "py-lists-tuples": subEnumAlgebraic,
    "py-dicts-sets": subEnumAlgebraic,
    "py-booleans-none": subEnumAlgebraic,

    // ── JavaScript: data-types (5) ──
    "js-number": subEnumAlgebraic,
    "js-string": subEnumAlgebraic,
    "js-boolean-null-undefined": subEnumAlgebraic,
    "js-symbol-bigint": subEnumAlgebraic,
    "js-typeof-truthy": subEnumAlgebraic,

    // ── TypeScript: data-types (5) ──
    "ts-primitives": subEnumAlgebraic,
    "ts-union-intersection": subEnumAlgebraic,
    "ts-tuple-array": subEnumAlgebraic,
    "ts-enum-literal": subEnumAlgebraic,
    "ts-never-unknown": subEnumAlgebraic,

    // ── C#: data-types (4) ──
    "csharp-value-types": subEnumAlgebraic,
    "csharp-reference-types": subEnumAlgebraic,
    "csharp-nullable": subEnumAlgebraic,
    "csharp-records": subEnumAlgebraic,

    // ── Go: data-types (4) ──
    "go-basic-types": subEnumAlgebraic,
    "go-slices-maps": subEnumAlgebraic,
    "go-structs": subEnumAlgebraic,
    "go-type-inference": subEnumAlgebraic,

    // ── Rust: data-types (5) ──
    "rust-primitives": subEnumAlgebraic,
    "rust-option-result": subEnumAlgebraic,
    "rust-ownership-types": subEnumAlgebraic,
    "rust-slices": subEnumAlgebraic,
    "rust-enums": subEnumAlgebraic,

    // ── Swift: data-types (4) ──
    "swift-value-types": subEnumAlgebraic,
    "swift-optionals": subEnumAlgebraic,
    "swift-type-inference": subEnumAlgebraic,
    "swift-collections": subEnumAlgebraic,

    // ── Kotlin: data-types (4) ──
    "kotlin-primitives": subEnumAlgebraic,
    "kotlin-null-safety-types": subEnumAlgebraic,
    "kotlin-collections": subEnumAlgebraic,
    "kotlin-type-inference": subEnumAlgebraic,

    // ── Ruby: data-types (5) ──
    "ruby-objects": subEnumAlgebraic,
    "ruby-numbers": subEnumAlgebraic,
    "ruby-strings": subEnumAlgebraic,
    "ruby-symbols": subEnumAlgebraic,
    "ruby-range-hash": subEnumAlgebraic,

    // ── PHP: data-types (4) ──
    "php-scalar-types": subEnumAlgebraic,
    "php-arrays": subEnumAlgebraic,
    "php-null": subEnumAlgebraic,
    "php-type-juggling": subEnumAlgebraic,

    // ── SQL: data-types (4) ──
    "sql-numeric": subDatabase,
    "sql-string": subDatabase,
    "sql-date-time": subDatabase,
    "sql-boolean-json": subDatabase,

    // ── Assembly: data-types (4) ──
    "asm-data-sizes": subAssembly,
    "asm-signed-unsigned": subAssembly,
    "asm-float-simd": subAssembly,
    "asm-string-bytes": subAssembly,

    // ── R: data-types (5) ──
    "r-numeric": subRFeatures,
    "r-character": subRFeatures,
    "r-logical": subRFeatures,
    "r-factor": subRFeatures,
    "r-list-dataframe": subRFeatures,

    // ── Dart: data-types (4) ──
    "dart-primitives": subDartFlutter,
    "dart-nullable": subDartFlutter,
    "dart-collections": subDartFlutter,
    "dart-records": subDartFlutter,

    // ── Scala: data-types (4) ──
    "scala-primitives": subEnumAlgebraic,
    "scala-option-either": subEnumAlgebraic,
    "scala-case-class": subEnumAlgebraic,
    "scala-collections": subEnumAlgebraic,

    // ── Perl: data-types (5) ──
    "perl-scalars": subPerlFeatures,
    "perl-arrays": subPerlFeatures,
    "perl-hashes": subPerlFeatures,
    "perl-references": subPerlFeatures,
    "perl-typeglobs": subPerlFeatures,

    // ── Lua: data-types (5) ──
    "lua-number": subLuaTable,
    "lua-string": subLuaTable,
    "lua-nil-boolean": subLuaTable,
    "lua-table": subLuaTable,
    "lua-function": subLuaTable,

    // ═══════════════ OOP-CONCEPTS ═══════════════
    // ── Java: oop-concepts (4) ──
    "class-basics-java": subJavaClasses,
    "inheritance-java-oop": subJavaClasses,
    "polymorphism-java-oop": subJavaClasses,
    "abstraction-java-oop": subJavaClasses,

    // ── Python: oop-concepts (4) ──
    "class-basics-py": subInterface,
    "inheritance-py": subInheritance,
    "polymorphism-py": subPolymorphism,
    "encapsulation-py": subEncapsulation,

    // ── C++: oop-concepts (4) ──
    "class-basics-cpp": subInterface,
    "inheritance-cpp": subInheritance,
    "polymorphism-cpp": subPolymorphism,
    "encapsulation-cpp": subEncapsulation,

    // ═══════════════ INTERFACES-TS ═══════════════
    "interface-basics-ts": subInterface,
    "interface-extending-ts": subInterface,
    "interface-composition-ts": subInterface,

    // ═══════════════ JAVA COLLECTIONS ═══════════════
    "queue-interface": subQueue,
    "sorted-collections": subCollectionsFramework,

    // ═══════════════ HTML SUBTOPICS ═══════════════
    "sectioning-elements": vizHTML,
    "heading-hierarchy": vizHTML,
    "lists": vizHTML,
    "document-outline": vizHTML,
    "input-types": vizHTML,
    "form-attributes": vizHTML,
    "validation-attrs": vizHTML,
    "form-events": vizHTML,
    "aria-roles": vizHTML,
    "landmarks": vizHTML,
    "keyboard-nav": vizHTML,
    "screen-readers": vizHTML,
    "seo-meta": vizHTML,
    "open-graph": vizHTML,
    "viewport-charset": vizHTML,
    "social-media": vizHTML,

    // ═══════════════ CSS SPECIFICITY ═══════════════
    "specificity-calc": vizCSS,
    "cascade": vizCSS,
    "pseudo-classes": vizCSS,
    "pseudo-elements": vizCSS,
    "combinators": vizCSS,

    // ═══════════════ DSA SUBTOPICS ═══════════════
    "best-worst-average": vizDSA,
    "selection-insertion-sort": vizDSA,
    "recursion-basics": vizDSA,
    "tabulation": vizDSA,
    "knapsack": vizDSA,
    "bfs": vizDSA,
    "dfs": vizDSA,
    "shortest-path": vizDSA,
    "topological-sort": vizDSA,
    "inorder-preorder-postorder": vizDSA,
    "level-order": vizDSA,
    "bst-operations": vizDSA,
    "balanced-trees": vizDSA,

    // ═══════════════ DBMS SUBTOPICS ═══════════════
    "first-nf": vizDBMS,
    "second-nf": vizDBMS,
    "third-nf": vizDBMS,
    "bcnf": vizDBMS,
    "entities-attributes": vizDBMS,
    "relationships": vizDBMS,
    "cardinality": vizDBMS,
    "er-notation": vizDBMS,
    "hash-index": vizDBMS,
    "atomicity": vizDBMS,
    "consistency": vizDBMS,
    "isolation": vizDBMS,
    "durability": vizDBMS,
    "ctes": vizDBMS,
    "subqueries": vizDBMS,
    "exists-case": vizDBMS,
    "trigger-types": vizDBMS,
    "stored-procedures": vizDBMS,
    "cursors": vizDBMS,

    // ═══════════════ HTML ELEMENTS/MEDIA/TABLES ═══════════════
    "block-inline": vizHTML,
    "nesting-rules": vizHTML,
    "void-elements": vizHTML,
    "data-attributes": vizHTML,
    "images": vizHTML,
    "video-audio": vizHTML,
    "canvas-svg": vizHTML,
    "table-structure": vizHTML,
    "spanning": vizHTML,
    "table-accessibility": vizHTML,

    // ═══════════════ CSS RESPONSIVE ═══════════════
    "media-queries": vizCSS,
    "viewport-units": vizCSS,
    "responsive-patterns": vizCSS,

    // ═══════════════ DSA ADDITIONAL ═══════════════
    "what-is-algorithm": vizDSA,
    "pseudocode": vizDSA,
    "algorithm-design": vizDSA,
    "two-pointer": vizDSA,
    "sliding-window": vizDSA,
    "prefix-sum": vizDSA,
    "linked-list-basics": vizDSA,
    "fast-slow-pointer": vizDSA,
    "stack-operations": vizDSA,
    "queue-operations": vizDSA,

    // ═══════════════ DBMS ADDITIONAL ═══════════════
    "tables-keys": vizDBMS,
    "constraints": vizDBMS,
    "schema-design": vizDBMS,
    "inner-join": vizDBMS,
    "outer-joins": vizDBMS,
    "self-join": vizDBMS,
    "document-store": vizDBMS,
    "kv-column-graph": vizDBMS,
    "cap-theorem": vizDBMS

  };

  function mountSubtopicViz(canvas, subtopicId, conceptId) {
    var ctx = canvas.getContext("2d");
    var raf = null;
    var start = performance.now();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var renderer = SUBTOPIC_VIZ_MAP[subtopicId] || function(c, w, h, t) {
      subtopicFallback(canvas, c, w, h, t, subtopicId);
    };

    function frame(now) {
      var t = (now - start) / 1000;
      var rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      try {
        renderer(canvas, ctx, rect.width, rect.height, t);
      } catch (e) {
        subtopicFallback(canvas, ctx, rect.width, rect.height, t, subtopicId);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return function () {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }

  window.mountSubtopicViz = mountSubtopicViz;

  // ══════════════════════════════════════════════
  // MOUNT FUNCTION
  // ══════════════════════════════════════════════
  window.mountLangViz = function(canvas, lang) {
    var ctx = canvas.getContext("2d");
    var raf = null;
    var start = performance.now();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var renderer = LANG_VIZ_MAP[lang.id] || function(c, w, h, t) { vizDefault(c, w, h, t, lang); };

    function frame(now) {
      var t = (now - start) / 1000;
      var rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      try {
        renderer(ctx, rect.width, rect.height, t, lang);
      } catch(e) {
        vizDefault(ctx, rect.width, rect.height, t, lang);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return function() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  };
})();
