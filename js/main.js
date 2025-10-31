
const numStars = 300;
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2;
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
