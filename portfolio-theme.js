const portfolioThemeKey = 'portfolio-theme';
const portfolioThemeToggle = document.getElementById('portfolioThemeToggle');
const savedPortfolioTheme = localStorage.getItem(portfolioThemeKey);
const preferredPortfolioTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setSharedPortfolioTheme(theme) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.portfolioTheme = theme;
    portfolioThemeToggle.setAttribute('aria-label', `switch to ${nextTheme} mode`);
    portfolioThemeToggle.innerHTML = theme === 'dark'
        ? '<i class="fa-regular fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-regular fa-moon" aria-hidden="true"></i>';
}

setSharedPortfolioTheme(savedPortfolioTheme === 'dark' || savedPortfolioTheme === 'light'
    ? savedPortfolioTheme
    : preferredPortfolioTheme);

portfolioThemeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.portfolioTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(portfolioThemeKey, nextTheme);
    setSharedPortfolioTheme(nextTheme);
});
