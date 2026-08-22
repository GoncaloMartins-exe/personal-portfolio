(function () {
    const base = window.basePath || '';

    const headerHTML = `
        <header>
            <nav>
                <ul>
                    <li class="logo-item"><img src="${base}assets/images/LogoGM.png" alt="Logo" class="logo-header"></li>
                    <li class="nav-name">Gonçalo Martins</li>
                    <li><a href="${base}html/index.html" data-section="hero">Home</a></li>
                    <li><a href="${base}html/index.html#about" data-section="about">About Me</a></li>
                    <li><a href="${base}html/projects.html">Projects</a></li>
                    <li><a href="${base}html/index.html#contact" data-section="contact">Contact</a></li>
                    <li>CV</li>
                </ul>
            </nav>
        </header>
    `;

    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.outerHTML = headerHTML;
    }
})();