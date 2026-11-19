/* =====================================================================
   app.js · builds the home page and article pages from ARTICLES
   ===================================================================== */

// ---- saved progress (only in this browser; safe if storage is blocked)
const STORE_KEY = "theoryDeskProgress";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ---------------------------- HOME PAGE ---------------------------- */
function renderHome() {
  const grid = document.getElementById("grid");
  if (!grid) return;
  const progress = loadProgress();
  let done = 0;

  grid.innerHTML = ARTICLES.map(a => {
    const p = progress[a.id];
    if (p) done++;
    const badge = p ? `<span class="badge done">✓ Quiz ${p.score}/${p.total}</span>` : `<span>${a.minutes} min read</span>`;
    return `
      <a class="card" href="article.html?id=${a.id}">
        <div class="meta"><span class="unit">Unit ${a.unit} · ${esc(a.topic)}</span>${badge}</div>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.dek)}</p>
        <div class="tags">${a.concepts.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>
      </a>`;
  }).join("");

  document.getElementById("progressFill").style.width = (done / ARTICLES.length * 100) + "%";
  document.getElementById("progressText").textContent = `${done} of ${ARTICLES.length} units quizzed`;
}

/* --------------------------- ARTICLE PAGE -------------------------- */
function renderArticle() {
  const root = document.getElementById("article");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id") || ARTICLES[0].id;
  const i = ARTICLES.findIndex(a => a.id === id);
  if (i < 0) { root.innerHTML = `<p>Article not found. <a href="index.html">Back to all units</a>.</p>`; return; }
  const a = ARTICLES[i];
  const prev = ARTICLES[i - 1], next = ARTICLES[i + 1];
  document.title = `${a.topic} · The Theory Desk`;

  // wrap tables so they scroll on phones
  const body = a.body.replace(/<table class="data">/g, '<div class="table-scroll"><table class="data">').replace(/<\/table>/g, "</table></div>");

  root.innerHTML = `
    <header>
      <div class="kicker">Unit ${a.unit} · ${esc(a.topic)}</div>
      <h1>${esc(a.title)}</h1>
      <p class="dek">${esc(a.dek)}</p>
      <div class="byline">${a.minutes} min read · Business case study · Companies are fictional; the statistics are real.</div>
    </header>
    <div class="concepts">${a.concepts.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>
    <div class="prose">${body}<div id="widget"></div></div>

    <section class="box">
      <h2>📌 The theory in one line each</h2>
      <ul class="takeaways">${a.takeaways.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </section>

    <section class="box">
      <h2>🚫 Common misconceptions</h2>
      ${a.myths.map(m => `
        <div class="myth">
          <div class="m"><small>Myth</small>${esc(m.myth)}</div>
          <div class="t"><small>Actually</small>${esc(m.truth)}</div>
        </div>`).join("")}
    </section>

    <section class="box">
      <h2>🧠 Check your understanding</h2>
      <p style="color:var(--muted);margin-top:-6px">Concept questions, no calculator needed. Pick an answer to see the reasoning.</p>
      <div id="quiz"></div>
      <div class="score" id="score"></div>
      <button class="btn ghost" id="retry" style="display:none">Try again</button>
    </section>

    <nav class="pager">
      ${prev ? `<a href="article.html?id=${prev.id}"><small>← Unit ${prev.unit}</small>${esc(prev.topic)}</a>` : `<a href="index.html"><small>←</small>All units</a>`}
      ${next ? `<a href="article.html?id=${next.id}" style="text-align:right"><small>Unit ${next.unit} →</small>${esc(next.topic)}</a>` : `<a href="index.html" style="text-align:right"><small>→</small>All units</a>`}
    </nav>`;

  renderQuiz(a);
  if (a.widget === "clt") cltWidget(document.getElementById("widget"));
  if (a.widget === "ci") ciWidget(document.getElementById("widget"));
  window.scrollTo(0, 0);
}

function renderQuiz(a) {
  const quiz = document.getElementById("quiz");
  const scoreEl = document.getElementById("score");
  const retry = document.getElementById("retry");
  let answered = 0, correct = 0;

  quiz.innerHTML = a.quiz.map((q, qi) => `
    <div class="q" data-q="${qi}">
      <p class="stem">${qi + 1}. ${esc(q.q)}</p>
      ${q.options.map((o, oi) => `<button class="opt" data-o="${oi}">${esc(o)}</button>`).join("")}
      <div class="why">${esc(q.why)}</div>
    </div>`).join("");
  scoreEl.textContent = "";
  retry.style.display = "none";

  quiz.querySelectorAll(".q").forEach(box => {
    const q = a.quiz[+box.dataset.q];
    box.querySelectorAll("button.opt").forEach(btn => {
      btn.addEventListener("click", () => {
        const pick = +btn.dataset.o;
        box.querySelectorAll("button.opt").forEach(b => {
          b.disabled = true;
          if (+b.dataset.o === q.answer) b.classList.add("right");
        });
        if (pick === q.answer) correct++; else btn.classList.add("wrong");
        box.classList.add("answered");
        answered++;
        if (answered === a.quiz.length) {
          scoreEl.textContent = `You got ${correct} of ${a.quiz.length}. ` +
            (correct === a.quiz.length ? "You've got the theory down." : "Re-read the parts tied to the ones you missed, then try again.");
          retry.style.display = "inline-block";
          const p = loadProgress();
          if (!p[a.id] || correct >= p[a.id].score) p[a.id] = { score: correct, total: a.quiz.length };
          saveProgress(p);
        }
      });
    });
  });
  retry.onclick = () => renderQuiz(a);
}

/* ------------------------ SIMULATION HELPERS ----------------------- */
// a right-skewed "customer spend" population: gamma-like, mean ≈ $60
function drawSpend() {
  // sum of exponentials → gamma(shape 1.2-ish via mix); simple & skewed
  const u = Math.random();
  return -Math.log(1 - u) * 50 + (Math.random() < 0.15 ? -Math.log(1 - Math.random()) * 70 : 0);
}
const SPEND_MEAN = 50 + 0.15 * 70; // 60.5

function histogram(values, lo, hi, bins) {
  const counts = new Array(bins).fill(0);
  const w = (hi - lo) / bins;
  values.forEach(v => { const k = Math.floor((v - lo) / w); if (k >= 0 && k < bins) counts[k]++; });
  return counts;
}

function histSVG(counts, lo, hi, color, markX, label) {
  const W = 320, H = 170, pad = 22;
  const max = Math.max(1, ...counts);
  const bw = (W - 2 * pad) / counts.length;
  const x = v => pad + (v - lo) / (hi - lo) * (W - 2 * pad);
  let bars = counts.map((c, k) => {
    const h = c / max * (H - 2 * pad);
    return `<rect x="${(pad + k * bw).toFixed(1)}" y="${(H - pad - h).toFixed(1)}" width="${Math.max(bw - 1, 1).toFixed(1)}" height="${h.toFixed(1)}" fill="${color}" rx="1"/>`;
  }).join("");
  const mark = markX != null ? `<line x1="${x(markX)}" x2="${x(markX)}" y1="${pad - 6}" y2="${H - pad}" stroke="var(--bad)" stroke-width="2" stroke-dasharray="4 3"/>
    <text x="${x(markX) + 4}" y="${pad}" font-size="10" fill="var(--bad)">${label || ""}</text>` : "";
  const ticks = [lo, (lo + hi) / 2, hi].map(t => `<text x="${x(t)}" y="${H - 6}" font-size="10" fill="var(--muted)" text-anchor="middle">$${Math.round(t)}</text>`).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img"><line x1="${pad}" x2="${W - pad}" y1="${H - pad}" y2="${H - pad}" stroke="var(--line)"/>${bars}${mark}${ticks}</svg>`;
}

/* ---------------------------- CLT WIDGET --------------------------- */
function cltWidget(el) {
  el.innerHTML = `
  <div class="sim">
    <h3>Simulation: the Central Limit Theorem</h3>
    <p class="note">Left: one random sample of customers (it looks skewed, like the population). Right: the means of many samples. The dashed line is the true mean μ ≈ $${SPEND_MEAN.toFixed(1)}.</p>
    <div class="controls">
      <label>Sample size n
        <select id="cltN"><option>2</option><option>5</option><option selected>30</option><option>100</option><option>400</option></select></label>
      <button class="btn" id="clt1">Draw 1 sample</button>
      <button class="btn" id="clt100">Draw 500 samples</button>
      <button class="btn ghost" id="cltReset">Reset</button>
    </div>
    <div class="panels">
      <div><div class="panel-title">Latest sample's individual spends (the DATA)</div><div id="cltA"></div></div>
      <div><div class="panel-title">Sample means x̄ (the SAMPLING DISTRIBUTION)</div><div id="cltB"></div></div>
    </div>
    <div class="stats" id="cltStats"></div>
  </div>`;
  let means = [], last = [];
  const nSel = el.querySelector("#cltN");
  const lo = 0, hi = 300, mlo = 0, mhi = 150;

  function sample() {
    const n = +nSel.value;
    last = Array.from({ length: n }, drawSpend);
    means.push(last.reduce((s, v) => s + v, 0) / n);
  }
  function draw() {
    const n = +nSel.value;
    el.querySelector("#cltA").innerHTML = histSVG(histogram(last, lo, hi, 30), lo, hi, "var(--muted)", SPEND_MEAN, "μ");
    el.querySelector("#cltB").innerHTML = histSVG(histogram(means, mlo, mhi, 40), mlo, mhi, "var(--accent)", SPEND_MEAN, "μ");
    if (means.length > 1) {
      const m = means.reduce((s, v) => s + v, 0) / means.length;
      const sd = Math.sqrt(means.reduce((s, v) => s + (v - m) ** 2, 0) / (means.length - 1));
      el.querySelector("#cltStats").innerHTML =
        `<b>${means.length}</b> samples of n = <b>${n}</b> · average of x̄'s: <b>$${m.toFixed(2)}</b> · SD of x̄'s (standard error): <b>$${sd.toFixed(2)}</b>. Try a 4× bigger n and watch the SE roughly halve.`;
    } else el.querySelector("#cltStats").textContent = "Draw some samples to begin.";
  }
  el.querySelector("#clt1").onclick = () => { sample(); draw(); };
  el.querySelector("#clt100").onclick = () => { for (let k = 0; k < 500; k++) sample(); draw(); };
  el.querySelector("#cltReset").onclick = () => { means = []; last = []; draw(); };
  nSel.onchange = () => { means = []; last = []; draw(); };
  draw();
}

/* ---------------------------- CI WIDGET ---------------------------- */
function ciWidget(el) {
  const TRUE_P = 0.60;
  el.innerHTML = `
  <div class="sim">
    <h3>Simulation: what "95% confident" means</h3>
    <p class="note">Pretend we know the truth: exactly <b>60%</b> of all customers would buy. Each line is a confidence interval from a new random sample. <span style="color:var(--accent)">Blue</span> intervals capture 60%; <span style="color:var(--bad)">red</span> ones miss.</p>
    <div class="controls">
      <label>n <select id="ciN"><option>50</option><option>100</option><option selected>400</option><option>1600</option></select></label>
      <label>Confidence <select id="ciC"><option value="1.645">90%</option><option value="1.96" selected>95%</option><option value="2.576">99%</option></select></label>
      <button class="btn" id="ci20">Take 20 samples</button>
      <button class="btn ghost" id="ciReset">Reset</button>
    </div>
    <div id="ciPlot"></div>
    <div class="stats" id="ciStats"></div>
  </div>`;
  let ivs = [];
  const nSel = el.querySelector("#ciN"), cSel = el.querySelector("#ciC");
  function take(k) {
    const n = +nSel.value, z = +cSel.value;
    for (let j = 0; j < k; j++) {
      let x = 0; for (let t = 0; t < n; t++) if (Math.random() < TRUE_P) x++;
      const ph = x / n, me = z * Math.sqrt(ph * (1 - ph) / n);
      ivs.push({ lo: ph - me, hi: ph + me, ph });
    }
  }
  function draw() {
    const show = ivs.slice(-60);
    const W = 640, rowH = 6, H = Math.max(60, show.length * rowH + 30), pad = 30;
    const lo = 0.35, hi = 0.85;
    const x = v => pad + (Math.min(Math.max(v, lo), hi) - lo) / (hi - lo) * (W - 2 * pad);
    const lines = show.map((iv, k) => {
      const hit = iv.lo <= TRUE_P && TRUE_P <= iv.hi;
      const y = 14 + k * rowH;
      const c = hit ? "var(--accent)" : "var(--bad)";
      return `<line x1="${x(iv.lo)}" x2="${x(iv.hi)}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="${hit ? 2 : 3}"/><circle cx="${x(iv.ph)}" cy="${y}" r="1.8" fill="${c}"/>`;
    }).join("");
    const ticks = [0.4, 0.5, 0.6, 0.7, 0.8].map(t => `<text x="${x(t)}" y="${H - 4}" font-size="11" fill="var(--muted)" text-anchor="middle">${t * 100}%</text>`).join("");
    el.querySelector("#ciPlot").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img">
      <line x1="${x(TRUE_P)}" x2="${x(TRUE_P)}" y1="4" y2="${H - 16}" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="4 3"/>${lines}${ticks}</svg>`;
    const hits = ivs.filter(iv => iv.lo <= TRUE_P && TRUE_P <= iv.hi).length;
    el.querySelector("#ciStats").innerHTML = ivs.length
      ? `<b>${hits}</b> of <b>${ivs.length}</b> intervals captured the true 60% (<b>${(hits / ivs.length * 100).toFixed(1)}%</b>). Any single interval either caught it or didn't; the confidence level is the long-run hit rate.${ivs.length > 60 ? " (Showing the latest 60.)" : ""}`
      : "Take some samples to begin.";
  }
  el.querySelector("#ci20").onclick = () => { take(20); draw(); };
  el.querySelector("#ciReset").onclick = () => { ivs = []; draw(); };
  nSel.onchange = cSel.onchange = () => { ivs = []; draw(); };
  draw();
}

renderHome();
renderArticle();
