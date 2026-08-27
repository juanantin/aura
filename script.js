// Starfield background
(function starfield() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.floor((w * h) / 3500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.012 + 0.003,
      hue: Math.random() > 0.75 ? "246,199,74" : "255,255,255",
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.a += s.speed;
      const twinkle = (Math.sin(s.a * Math.PI * 2) + 1) / 2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.hue}, ${0.2 + twinkle * 0.8})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  tick();
})();

// Copy contract address
(function copyCA() {
  const btn = document.getElementById("copy-ca");
  const toast = document.getElementById("toast");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const ca = btn.getAttribute("data-ca") || "";
    try {
      await navigator.clipboard.writeText(ca);
    } catch (err) {
      const ta = document.createElement("textarea");
      ta.value = ca;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    toast.classList.add("show");
    clearTimeout(btn._toastTimer);
    btn._toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  });
})();
