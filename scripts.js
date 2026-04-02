document.addEventListener('DOMContentLoaded', () => {
    // Theme (light/dark)
    const THEME_KEY = 'theme';
    const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches;
    const savedTheme = localStorage.getItem(THEME_KEY);

    let particleRgb = null;

    function getParticleRgb() {
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb');
        return (raw || '').trim() || '255, 255, 255';
    }

    function getInitialTheme() {
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        return prefersLight ? 'light' : 'dark';
    }

    function ensureThemeToggle() {
        let btn = document.getElementById('theme-toggle');
        if (btn) return btn;

        btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.type = 'button';
        btn.className = 'theme-toggle';
        document.body.appendChild(btn);
        return btn;
    }

    function setTheme(theme) {
        document.body.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);

        const next = theme === 'light' ? 'dark' : 'light';
        const btn = ensureThemeToggle();
        btn.innerHTML = next === 'light'
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', `Switch to ${next} mode`);
        btn.dataset.nextTheme = next;

        particleRgb = getParticleRgb();
    }

    const themeToggle = ensureThemeToggle();
    themeToggle.addEventListener('click', () => {
        const nextTheme = themeToggle.dataset.nextTheme === 'light' ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    setTheme(getInitialTheme());

    // Skill bubble toggle
    const bubbles = document.querySelectorAll('.skill-bubble');
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', () => {
            bubble.classList.toggle('selected');
        });
    });

    // Particles
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleRgb}, ${p.opacity})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
});
