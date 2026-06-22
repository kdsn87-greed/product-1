// ── Theme ────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── Starfield ────────────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        o: Math.random() * 0.55 + 0.15,
        vy: Math.random() * 0.12 + 0.04,
    }));
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,236,244,${s.o})`;
        ctx.fill();
        s.y -= s.vy;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
    }
    requestAnimationFrame(drawStars);
}

resize();
drawStars();
window.addEventListener('resize', resize);

// ── Ball logic ───────────────────────────────────────
function ballClass(n) {
    if (n <= 10) return 'yellow';
    if (n <= 20) return 'blue';
    if (n <= 30) return 'red';
    if (n <= 40) return 'gray';
    return 'green';
}

function drawNumbers() {
    const set = new Set();
    while (set.size < 6) set.add(Math.floor(Math.random() * 45) + 1);
    return Array.from(set).sort((a, b) => a - b);
}

// ── Render ───────────────────────────────────────────
const resultsEl = document.getElementById('results');
const generateBtn = document.getElementById('generate-btn');

const LEGEND = [
    { label: '1 – 10', cls: 'yellow', color: '#FBC400' },
    { label: '11 – 20', cls: 'blue',   color: '#069DDC' },
    { label: '21 – 30', cls: 'red',    color: '#EF4444' },
    { label: '31 – 40', cls: 'gray',   color: '#9CA3AF' },
    { label: '41 – 45', cls: 'green',  color: '#84C23B' },
];

generateBtn.addEventListener('click', () => {
    resultsEl.innerHTML = '';

    for (let r = 0; r < 5; r++) {
        const numbers = drawNumbers();
        const row = document.createElement('div');
        row.className = 'round-row';
        row.style.animationDelay = `${r * 0.08}s`;

        const label = document.createElement('div');
        label.className = 'round-label';
        label.textContent = `${r + 1}회`;
        row.appendChild(label);

        const ballsRow = document.createElement('div');
        ballsRow.className = 'balls-row';

        numbers.forEach((n, i) => {
            const ball = document.createElement('div');
            ball.className = `ball ${ballClass(n)}`;
            ball.textContent = n;
            ball.style.animationDelay = `${r * 0.08 + i * 0.06}s`;
            ballsRow.appendChild(ball);
        });

        row.appendChild(ballsRow);
        resultsEl.appendChild(row);
    }

    // Color legend below results
    const legend = document.createElement('div');
    legend.className = 'legend';
    LEGEND.forEach(item => {
        const el = document.createElement('div');
        el.className = 'legend-item';
        el.innerHTML = `<span class="legend-dot" style="background:${item.color}"></span>${item.label}`;
        legend.appendChild(el);
    });
    resultsEl.appendChild(legend);
});

