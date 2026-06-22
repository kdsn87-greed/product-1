// ── Theme ─────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── Form submission ───────────────────────────────────
const form    = document.getElementById('contact-form');
const formWrap = document.getElementById('form-wrap');
const success = document.getElementById('success-card');
const submitBtn = document.getElementById('submit-btn');
const btnText   = submitBtn.querySelector('.btn-text');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    btnText.textContent = '전송 중...';

    const data = new FormData(form);

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' },
        });

        if (res.ok) {
            formWrap.hidden = true;
            success.hidden  = false;
        } else {
            const json = await res.json();
            const msg = json?.errors?.map(e => e.message).join(', ') || '전송에 실패했습니다.';
            alert(msg);
            submitBtn.disabled = false;
            btnText.textContent = '문의 보내기';
        }
    } catch {
        alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        submitBtn.disabled = false;
        btnText.textContent = '문의 보내기';
    }
});
