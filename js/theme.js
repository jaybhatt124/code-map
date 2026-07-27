// ═══════════════════════════════════════════
// CODEMAP — Dark/Light Theme Toggle
// ═══════════════════════════════════════════
(function() {
  var KEY = "codemap-theme";

  function getTheme() {
    return localStorage.getItem(KEY) || "dark";
  }

  function setTheme(theme) {
    localStorage.setItem(KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  }

  function toggle() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }

  // Apply on load (before render)
  document.documentElement.setAttribute("data-theme", getTheme());

  document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.innerHTML = getTheme() === "dark" ? "☀️" : "🌙";
      btn.addEventListener("click", toggle);
    }
  });
})();
