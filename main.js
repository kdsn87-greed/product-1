const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const countBtns = document.querySelectorAll('.count-btn');
const html = document.documentElement;

let drawCount = 5;

// 다크/라이트 모드 토글
themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// 저장된 테마 복원
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);

// 추첨 개수 선택
countBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        drawCount = parseInt(btn.dataset.count);
        lottoNumbersContainer.innerHTML = '';
    });
});

// 번호 구간별 CSS 클래스
function getRangeClass(n) {
    if (n <= 9)  return 'range-1';
    if (n <= 18) return 'range-2';
    if (n <= 27) return 'range-3';
    if (n <= 36) return 'range-4';
    return 'range-5';
}

// 번호 생성
generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < drawCount) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    Array.from(numbers).sort((a, b) => a - b).forEach((number, i) => {
        const el = document.createElement('div');
        el.classList.add('lotto-number', getRangeClass(number));
        el.style.animationDelay = `${i * 0.08}s`;
        el.textContent = number;
        lottoNumbersContainer.appendChild(el);
    });
});
