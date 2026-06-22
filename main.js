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

// ── 저녁 메뉴 추천 ────────────────────────────────────
const MENUS = [
    { name: '삼겹살',    emoji: '🥩', cat: '한식', msg: '오늘은 불판 앞에서 행복하세요!' },
    { name: '치킨',      emoji: '🍗', cat: '한식', msg: '바삭한 치킨은 언제나 정답!' },
    { name: '김치찌개',  emoji: '🍲', cat: '한식', msg: '집밥의 왕, 김치찌개 한 그릇!' },
    { name: '된장찌개',  emoji: '🥘', cat: '한식', msg: '구수하고 따뜻한 저녁이에요.' },
    { name: '비빔밥',    emoji: '🍚', cat: '한식', msg: '쓱쓱 비벼서 한 입에 행복!' },
    { name: '냉면',      emoji: '🍜', cat: '한식', msg: '시원하고 깔끔한 저녁이에요.' },
    { name: '불고기',    emoji: '🔥', cat: '한식', msg: '달콤한 불고기 향이 솔솔~' },
    { name: '갈비찜',    emoji: '🍖', cat: '한식', msg: '특별한 날 같은 저녁이 될 거예요!' },
    { name: '순대국밥',  emoji: '🫕', cat: '한식', msg: '속이 따뜻해지는 국밥 한 그릇!' },
    { name: '제육볶음',  emoji: '🌶️', cat: '한식', msg: '매콤달콤, 밥도둑 등장!' },
    { name: '떡볶이',    emoji: '🍢', cat: '한식', msg: '포장마차 분위기로 즐겨보세요!' },
    { name: '족발',      emoji: '🐷', cat: '한식', msg: '탱글탱글한 족발에 소주 한잔?' },
    { name: '보쌈',      emoji: '🥬', cat: '한식', msg: '신선한 채소와 함께 쌈쌈하게!' },
    { name: '삼계탕',    emoji: '🍗', cat: '한식', msg: '몸보신하는 저녁, 건강하세요!' },
    { name: '짜장면',    emoji: '🍝', cat: '중식', msg: '검은 소스에 비벼 먹는 행복!' },
    { name: '짬뽕',      emoji: '🦐', cat: '중식', msg: '얼큰한 국물이 생각날 때!' },
    { name: '탕수육',    emoji: '🍖', cat: '중식', msg: '부먹? 찍먹? 어떻게 먹어도 맛있어요!' },
    { name: '마파두부',  emoji: '🌶️', cat: '중식', msg: '매콤하고 부드러운 마파두부!' },
    { name: '볶음밥',    emoji: '🍳', cat: '중식', msg: '고슬고슬 황금 볶음밥 어때요?' },
    { name: '초밥',      emoji: '🍣', cat: '일식', msg: '신선한 초밥으로 기분 업!' },
    { name: '라멘',      emoji: '🍜', cat: '일식', msg: '진한 육수에 면 한 그릇!' },
    { name: '돈까스',    emoji: '🍱', cat: '일식', msg: '바삭한 돈까스에 밥 한 공기!' },
    { name: '우동',      emoji: '🍵', cat: '일식', msg: '따뜻하고 담백한 우동 한 그릇!' },
    { name: '스시',      emoji: '🍱', cat: '일식', msg: '오마카세 분위기로 즐겨보세요!' },
    { name: '피자',      emoji: '🍕', cat: '양식', msg: '치즈가 쭈욱 늘어나는 행복!' },
    { name: '파스타',    emoji: '🍝', cat: '양식', msg: '이탈리아 감성으로 저녁 한 끼!' },
    { name: '버거',      emoji: '🍔', cat: '양식', msg: '두 손으로 크게 한 입!' },
    { name: '스테이크',  emoji: '🥩', cat: '양식', msg: '오늘만큼은 나를 위한 스테이크!' },
    { name: '샐러드',    emoji: '🥗', cat: '양식', msg: '가볍고 건강한 저녁 어때요?' },
];

let selectedCat = '전체';

// Category buttons
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCat = btn.dataset.cat;
        // Reset result on category change
        document.getElementById('menu-result').hidden = true;
    });
});

// Pick random menu
document.getElementById('menu-btn').addEventListener('click', () => {
    const pool = selectedCat === '전체'
        ? MENUS
        : MENUS.filter(m => m.cat === selectedCat);

    const pick = pool[Math.floor(Math.random() * pool.length)];

    // Dice roll animation
    const dice = document.querySelector('.menu-btn-dice');
    dice.classList.remove('rolling');
    void dice.offsetWidth; // reflow
    dice.classList.add('rolling');

    const resultEl  = document.getElementById('menu-result');
    const emojiEl   = document.getElementById('menu-emoji');
    const nameEl    = document.getElementById('menu-name');
    const badgeEl   = document.getElementById('menu-badge');
    const msgEl     = document.getElementById('menu-msg');

    emojiEl.textContent = pick.emoji;
    nameEl.textContent  = pick.name;
    badgeEl.textContent = pick.cat;
    msgEl.textContent   = pick.msg;

    // Force re-animation by toggling hidden
    resultEl.hidden = true;
    requestAnimationFrame(() => { resultEl.hidden = false; });
});
