// Theme Toggle (Dark/Light Mode)
// Handles theme switching and persistence

(function () {
    const THEME_KEY = 'gustavs-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get saved theme or detect system preference
    function getInitialTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return LIGHT;
        }
        return DARK; // Default to dark (matches current site design)
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const icon = document.getElementById('theme-toggle-icon');
        if (!icon) return;

        if (theme === LIGHT) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Toggle between themes
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || DARK;
        const next = current === DARK ? LIGHT : DARK;
        applyTheme(next);
    }

    // Initialize on DOM ready
    function init() {
        // Apply initial theme immediately (before paint)
        const initialTheme = getInitialTheme();
        applyTheme(initialTheme);

        // Set up toggle button click handler
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }

        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? LIGHT : DARK);
                }
            });
        }
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose toggle function globally
    window.toggleTheme = toggleTheme;
})();
