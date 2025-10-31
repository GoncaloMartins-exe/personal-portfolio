
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
