
const numStars = 300;
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = 1 + Math.random();
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${1 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(star);
}

document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const originalText = name.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let interval = null;
    let revertTimeout = null;

    function startScramble() {
        name.classList.add("scrambling"); // MinecraftEnchantment
        clearInterval(interval);
        interval = setInterval(() => {
            let scrambled = "";
            for (let i = 0; i < originalText.length; i++) {
                const char = originalText[i];
                scrambled += (char === " ") ? " " : chars[Math.floor(Math.random() * chars.length)];
            }
            name.textContent = scrambled;
        }, 50);
    }

    function stopScramble() {
        clearInterval(interval);
        name.textContent = originalText;
        name.classList.remove("scrambling"); // TheLedDisplay
    }

    name.addEventListener("mouseenter", () => {
        clearInterval(interval);
        clearTimeout(revertTimeout);
        startScramble();
    });

    name.addEventListener("mouseleave", () => {
        clearTimeout(revertTimeout);
        revertTimeout = setTimeout(() => {
            stopScramble();
        }, 2000); // 2 sec
    });
});

document.querySelectorAll('details').forEach((det) => {
    const summary = det.querySelector('summary');

    if (!summary) return;

    let content = det.querySelector(':scope > .details-content');

    if (!content) {
        content = document.createElement('div');
        content.className = 'details-content';

        Array.from(det.children)
            .filter(el => el !== summary)
            .forEach(el => content.appendChild(el));

        det.appendChild(content);
    }

    content.style.overflow = 'hidden';
    content.style.height = det.open ? `${content.scrollHeight}px` : '0px';
    content.style.opacity = det.open ? '1' : '0';

    det.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;

        e.preventDefault();

        const isOpen = det.hasAttribute('open');

        if (isOpen) {
            content.style.height = `${content.scrollHeight}px`;

            requestAnimationFrame(() => {
                content.style.height = '0px';
                content.style.opacity = '0';
            });

            content.addEventListener('transitionend', function close(event) {
                if (event.propertyName !== 'height') return;

                det.removeAttribute('open');
                content.removeEventListener('transitionend', close);
            });

        } else {
            det.setAttribute('open', '');

            content.style.height = '0px';
            content.style.opacity = '0';

            requestAnimationFrame(() => {
                content.style.height = `${content.scrollHeight}px`;
                content.style.opacity = '1';
            });
        }
    });
});

(() => {
    const nav = document.querySelector('header nav');
    const allNavLinks = Array.from(nav.querySelectorAll('a'));
    const navLinks = allNavLinks.filter(link => link.dataset.section);

    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    nav.appendChild(indicator);

    function moveIndicatorTo(link) {
        if (!link) {
            indicator.style.opacity = '0';
            return;
        }
        const linkRect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        indicator.style.opacity = '1';
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left - navRect.left}px`;
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const staticPageLink = allNavLinks.find(link => {
        const linkPage = link.getAttribute('href')?.split('/').pop();
        return linkPage === currentPage && !link.dataset.section;
    });

    if (staticPageLink) {
        allNavLinks.forEach(l => l.classList.remove('active-link'));
        staticPageLink.classList.add('active-link');
        moveIndicatorTo(staticPageLink);
        window.addEventListener('resize', () => moveIndicatorTo(staticPageLink));
        return;
    }

    const storedTarget = sessionStorage.getItem('scrollTarget');

    if (storedTarget) {
        sessionStorage.removeItem('scrollTarget');

        const sectionId = storedTarget.replace('#', '');
        const target = document.getElementById(sectionId);

        if (target) {
            requestAnimationFrame(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            const matchingLink = navLinks.find(l => l.dataset.section === sectionId);
            if (matchingLink) {
                allNavLinks.forEach(l => l.classList.remove('active-link'));
                matchingLink.classList.add('active-link');
                moveIndicatorTo(matchingLink);
            }
        }
    }

    if (navLinks.length === 0) return;

    const sections = navLinks
        .map(link => ({ link, section: document.getElementById(link.dataset.section) }))
        .filter(item => item.section);

    let lastActive = sections[0];

    function updateActiveSection() {
        if (sections.length === 0) return;

        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
        const scrolledToTop = window.scrollY <= 0;

        let current;

        if (scrolledToBottom) {
            current = sections[sections.length - 1];
        } else if (scrolledToTop) {
            current = sections[0];
        } else {
            const scrollPos = window.scrollY + window.innerHeight / 3;
            current = lastActive;

            for (const item of sections.slice(1, -1)) {
                if (item.section.offsetTop <= scrollPos) {
                    current = item;
                }
            }

            if (current === sections[0]) {
                current = sections[1] || sections[0];
            }
        }

        lastActive = current;

        navLinks.forEach(l => l.classList.remove('active-link'));
        current.link.classList.add('active-link');
        moveIndicatorTo(current.link);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.section === 'hero') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.getElementById(link.dataset.section);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            navLinks.forEach(l => l.classList.remove('active-link'));
            link.classList.add('active-link');
            moveIndicatorTo(link);
        });
    });

    window.addEventListener('scroll', updateActiveSection);
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
})();