document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Transition (Fade-in)
    document.body.classList.add('fade-in');

    // 2. Intercept links for fade-out transition
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"]):not([target="_blank"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only intercept local links
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const targetUrl = link.href;
                document.body.classList.remove('fade-in');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // Wait for transition duration (500ms)
            }
        });
    });

    // 3. Set Active Nav Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#nav-links-container a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            // Active state
            link.className = 'font-accent-label text-accent-label text-secondary border-b-2 border-secondary pb-1 opacity-80 transition-all duration-300';
        } else {
            // Inactive state
            link.className = 'font-accent-label text-accent-label text-on-background/80 hover:text-secondary transition-colors hover:scale-105 duration-300';
        }
    });
});
