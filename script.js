// script.js - AIM Association of Intelligence Mind
// Initialize navbar behavior. Safe to call multiple times (e.g. after async injection).
function initNavbar() {
    // Hamburger toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks && !hamburger.__nav_initialized) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        // flag so we don't double-bind
        hamburger.__nav_initialized = true;
    }

    // Navbar shrink on scroll
    if (!window.__nav_scroll_initialized) {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        window.__nav_scroll_initialized = true;
    }
}

// Run on initial load in case navbar is already present
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});

// Small helper to inject navbar and initialize
async function injectNavbar(placeholderId = 'navbar-placeholder') {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
        const res = await fetch('navbar.html');
        const html = await res.text();
        el.innerHTML = html;
        initNavbar();
    } catch (err) {
        console.error('Failed to load navbar:', err);
    }
}

// If a placeholder exists at load, inject automatically
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar-placeholder')) {
        injectNavbar();
        // ensure content isn't hidden under navbar on pages without .hero
        setTimeout(()=>{
            const nav = document.querySelector('.navbar');
            if (nav && !document.querySelector('.hero')) {
                const h = nav.getBoundingClientRect().height;
                document.body.style.paddingTop = h + 'px';
            }
        }, 100);
    }
});
