
/* =========================================
   ROSHNI DUBEY — PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector("header");
    const home = document.querySelector("#home");
    const nav = document.querySelector("nav");

    // 1. Add a professional typing animation
    if (home) {
        const typingLine = document.createElement("p");
        typingLine.className = "typing-line";
        typingLine.setAttribute("aria-live", "polite");

        const homeParagraph = home.querySelector("p");

        if (homeParagraph) {
            homeParagraph.insertAdjacentElement("afterend", typingLine);
        }

        const roles = [
            "BCA Student",
            "Aspiring Web Developer",
            "Python Programmer",
            "Future Full-Stack Developer"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];

            typingLine.textContent = currentRole.substring(
                0,
                characterIndex
            );

            if (!deleting) {
                characterIndex++;

                if (characterIndex > currentRole.length) {
                    deleting = true;
                    setTimeout(typeRole, 1200);
                    return;
                }
            } else {
                characterIndex--;

                if (characterIndex < 0) {
                    characterIndex = 0;
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeRole, deleting ? 45 : 85);
        }

        typeRole();
    }

    // 2. Create a theme toggle button
    const themeButton = document.createElement("button");
    themeButton.type = "button";
    themeButton.className = "theme-toggle";
    themeButton.setAttribute("aria-label", "Switch color theme");

    header?.appendChild(themeButton);

    function applyTheme(theme) {
        const isLight = theme === "light";

        body.classList.toggle("light-theme", isLight);
        themeButton.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
        themeButton.setAttribute(
            "aria-pressed",
            String(isLight)
        );
    }

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        // Theme still works if browser storage is unavailable.
    }

    applyTheme(savedTheme);

    themeButton.addEventListener("click", () => {
        const nextTheme = body.classList.contains("light-theme")
            ? "dark"
            : "light";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("portfolio-theme", nextTheme);
        } catch (error) {
            // The theme changes for this page even without storage.
        }
    });

    // 3. Reveal sections smoothly while scrolling
    const revealElements = document.querySelectorAll(
        "main section, #skills li, #projects article"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

    // 4. Highlight the active navigation link
    const navLinks = nav
        ? nav.querySelectorAll('a[href^="#"]')
        : [];

    function setActiveLink(id) {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length > 0) {
                    setActiveLink(visibleSections[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -55% 0px",
                threshold: [0, 0.15, 0.3, 0.5]
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const targetId = link.getAttribute("href").slice(1);
            setActiveLink(targetId);
        });
    });

    // 5. Add a Back-to-Top button
    const topButton = document.createElement("button");
    topButton.type = "button";
    topButton.className = "back-to-top";
    topButton.textContent = "↑";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.title = "Back to top";
    body.appendChild(topButton);

    function updateTopButton() {
        topButton.classList.toggle("show", window.scrollY > 350);
    }

    window.addEventListener("scroll", updateTopButton, {
        passive: true
    });

    updateTopButton();

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    });

    // 6. Update the copyright year automatically
    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.textContent =
            `© ${new Date().getFullYear()} Roshni Dubey. All Rights Reserved.`;
    }

    // 7. Make external links safer
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.rel = "noopener noreferrer";
    });
});
