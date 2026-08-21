
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
        // deixa links dentro do conteúdo funcionar normalmente, sem toggle
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
