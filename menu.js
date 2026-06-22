// ── Theme ─────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const saved = localStorage.getItem('menu-theme') || 'dark';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('menu-theme', next);
});

// ── Menu data ─────────────────────────────────────────
const MENUS = [
    { name: '삼겹살',   emoji: '🥩', cat: '한식', msg: '오늘은 불판 앞에서 행복하세요!' },
    { name: '치킨',     emoji: '🍗', cat: '한식', msg: '바삭한 치킨은 언제나 정답!' },
    { name: '김치찌개', emoji: '🍲', cat: '한식', msg: '집밥의 왕, 김치찌개 한 그릇!' },
    { name: '된장찌개', emoji: '🥘', cat: '한식', msg: '구수하고 따뜻한 저녁이에요.' },
    { name: '비빔밥',   emoji: '🍚', cat: '한식', msg: '쓱쓱 비벼서 한 입에 행복!' },
    { name: '냉면',     emoji: '🍜', cat: '한식', msg: '시원하고 깔끔한 저녁이에요.' },
    { name: '불고기',   emoji: '🔥', cat: '한식', msg: '달콤한 불고기 향이 솔솔~' },
    { name: '갈비찜',   emoji: '🍖', cat: '한식', msg: '특별한 날 같은 저녁이 될 거예요!' },
    { name: '순대국밥', emoji: '🫕', cat: '한식', msg: '속이 따뜻해지는 국밥 한 그릇!' },
    { name: '제육볶음', emoji: '🌶️', cat: '한식', msg: '매콤달콤, 밥도둑 등장!' },
    { name: '떡볶이',   emoji: '🍢', cat: '한식', msg: '포장마차 분위기로 즐겨보세요!' },
    { name: '족발',     emoji: '🐷', cat: '한식', msg: '탱글탱글한 족발에 소주 한잔?' },
    { name: '보쌈',     emoji: '🥬', cat: '한식', msg: '신선한 채소와 함께 쌈쌈하게!' },
    { name: '삼계탕',   emoji: '🍗', cat: '한식', msg: '몸보신하는 저녁, 건강하세요!' },
    { name: '짜장면',   emoji: '🍝', cat: '중식', msg: '검은 소스에 비벼 먹는 행복!' },
    { name: '짬뽕',     emoji: '🦐', cat: '중식', msg: '얼큰한 국물이 생각날 때!' },
    { name: '탕수육',   emoji: '🍖', cat: '중식', msg: '부먹? 찍먹? 어떻게 먹어도 맛있어요!' },
    { name: '마파두부', emoji: '🌶️', cat: '중식', msg: '매콤하고 부드러운 마파두부!' },
    { name: '볶음밥',   emoji: '🍳', cat: '중식', msg: '고슬고슬 황금 볶음밥 어때요?' },
    { name: '초밥',     emoji: '🍣', cat: '일식', msg: '신선한 초밥으로 기분 업!' },
    { name: '라멘',     emoji: '🍜', cat: '일식', msg: '진한 육수에 면 한 그릇!' },
    { name: '돈까스',   emoji: '🍱', cat: '일식', msg: '바삭한 돈까스에 밥 한 공기!' },
    { name: '우동',     emoji: '🍵', cat: '일식', msg: '따뜻하고 담백한 우동 한 그릇!' },
    { name: '스시',     emoji: '🍣', cat: '일식', msg: '오마카세 분위기로 즐겨보세요!' },
    { name: '피자',     emoji: '🍕', cat: '양식', msg: '치즈가 쭈욱 늘어나는 행복!' },
    { name: '파스타',   emoji: '🍝', cat: '양식', msg: '이탈리아 감성으로 저녁 한 끼!' },
    { name: '버거',     emoji: '🍔', cat: '양식', msg: '두 손으로 크게 한 입!' },
    { name: '스테이크', emoji: '🥩', cat: '양식', msg: '오늘만큼은 나를 위한 스테이크!' },
    { name: '샐러드',   emoji: '🥗', cat: '양식', msg: '가볍고 건강한 저녁 어때요?' },
];

// ── State ─────────────────────────────────────────────
let selectedCat = '전체';
let lastPick = null;

function getPool() {
    return selectedCat === '전체' ? MENUS : MENUS.filter(m => m.cat === selectedCat);
}

// ── Category filter ───────────────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCat = btn.dataset.cat;
        renderGrid();
        document.getElementById('result-card').hidden = true;
        lastPick = null;
    });
});

// ── Pick ──────────────────────────────────────────────
function pick() {
    const pool = getPool();
    let next = pool[Math.floor(Math.random() * pool.length)];
    // avoid same pick twice in a row if pool is large enough
    if (pool.length > 1 && next === lastPick) {
        next = pool[Math.floor(Math.random() * pool.length)];
    }
    lastPick = next;
    showResult(next);
}

document.getElementById('pick-btn').addEventListener('click', () => {
    rollDice();
    pick();
});
document.getElementById('reroll-btn').addEventListener('click', () => {
    rollDice();
    pick();
});

function rollDice() {
    const dice = document.querySelector('.dice-icon');
    dice.classList.remove('rolling');
    void dice.offsetWidth;
    dice.classList.add('rolling');
}

// ── Render result ─────────────────────────────────────
function showResult(item) {
    const card  = document.getElementById('result-card');
    const emoji = document.getElementById('result-emoji');
    const name  = document.getElementById('result-name');
    const badge = document.getElementById('result-badge');
    const msg   = document.getElementById('result-msg');

    card.hidden = true;
    requestAnimationFrame(() => {
        emoji.textContent = item.emoji;
        name.textContent  = item.name;
        badge.textContent = item.cat;
        msg.textContent   = item.msg;
        card.hidden = false;

        // Highlight matching chip
        document.querySelectorAll('.menu-chip').forEach(chip => {
            chip.classList.toggle('highlighted', chip.dataset.name === item.name);
        });

        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ── Menu grid ─────────────────────────────────────────
const gridEl = document.getElementById('menu-grid');

function renderGrid() {
    gridEl.innerHTML = '';
    const pool = getPool();
    pool.forEach((item, i) => {
        const chip = document.createElement('div');
        chip.className = 'menu-chip';
        chip.dataset.name = item.name;
        chip.style.animationDelay = `${i * 0.03}s`;
        chip.innerHTML = `
            <span class="chip-emoji">${item.emoji}</span>
            <div class="chip-name">${item.name}</div>
            <div class="chip-cat">${item.cat}</div>
        `;
        chip.addEventListener('click', () => {
            lastPick = item;
            showResult(item);
        });
        gridEl.appendChild(chip);
    });
}

renderGrid();
