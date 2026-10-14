/* =========================================
   L'ÉLÉGANCE FRANÇAISE
   Language + Scroll + Interaction
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const languageToggle = document.getElementById("languageToggle");
    const languageLabel = document.getElementById("languageLabel");
    const html = document.documentElement;

    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("readingProgress");

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    let currentLanguage = "fr";


    /* =====================================
       FRENCH / ENGLISH TRANSLATION
    ===================================== */

    function setLanguage(language) {
        currentLanguage = language;

        html.lang = language;

        document.querySelectorAll("[data-fr][data-en]").forEach(element => {
            const translation = element.getAttribute(`data-${language}`);

            if (translation !== null) {
                element.textContent = translation;
            }
        });

        if (languageLabel) {
            languageLabel.textContent =
                language === "fr" ? "EN" : "FR";
        }

        if (languageToggle) {
            languageToggle.setAttribute(
                "aria-label",
                language === "fr"
                    ? "Switch to English"
                    : "Passer en français"
            );
        }

        document.title =
            language === "fr"
                ? "L'Élégance Française — The Art of French Fashion"
                : "L'Élégance Française — The Art of French Fashion";

        const description = document.querySelector(
            'meta[name="description"]'
        );

        if (description) {
            description.content =
                language === "fr"
                    ? "Découvrez l'élégance intemporelle de la mode française, des maisons de couture et de la Fashion Week de Paris."
                    : "Discover the timeless elegance of French fashion, couture houses and Paris Fashion Week.";
        }

        try {
            localStorage.setItem("elegance-language", language);
        } catch (error) {
            // The site still works if browser storage is unavailable.
        }
    }


    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            const nextLanguage =
                currentLanguage === "fr" ? "en" : "fr";

            setLanguage(nextLanguage);
        });
    }


    /* =====================================
       RESTORE LANGUAGE PREFERENCE

       French remains the default for first-time
       visitors. The preference is remembered
       after the visitor changes the language.
    ===================================== */

    try {
        const savedLanguage = localStorage.getItem("elegance-language");

        if (savedLanguage === "en" || savedLanguage === "fr") {
            setLanguage(savedLanguage);
        } else {
            setLanguage("fr");
        }
    } catch (error) {
        setLanguage("fr");
    }


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    function closeMenu() {
        if (!mainNav || !menuToggle) return;

        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = "fa-solid fa-bars";
        }

        menuToggle.setAttribute("aria-label", "Open navigation");
    }


    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle("menu-open", isOpen);

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    /* =====================================
       SCROLL EFFECTS
    ===================================== */

    let scrollTicking = false;

    function updateScrollEffects() {
        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (header) {
            header.classList.toggle("scrolled", scrollTop > 60);
        }

        if (progress) {
            const percentage =
                scrollableHeight > 0
                    ? (scrollTop / scrollableHeight) * 100
                    : 0;

            progress.style.width = `${percentage}%`;
        }

        scrollTicking = false;
    }


    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateScrollEffects);
            scrollTicking = true;
        }
    }, { passive: true });

    updateScrollEffects();


    /* =====================================
       SCROLL-REVEAL ANIMATIONS

       Sections appear gently as they enter
       the visitor's viewport.
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================
       SMOOTH IN-PAGE NAVIGATION

       Account for the fixed header when
       visitors click internal navigation.
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            closeMenu();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================
       OPTIONAL IMAGE DEPTH EFFECT

       Subtle movement on larger screens.
       Disabled on touch devices.
    ===================================== */

    const hero = document.querySelector(".hero");
    const heroImage = document.querySelector(".hero-image");

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    if (hero && heroImage && finePointer.matches) {
        hero.addEventListener("pointermove", event => {
            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.transform =
                `scale(1.04) translate(${x * -8}px, ${y * -8}px)`;
        });

        hero.addEventListener("pointerleave", () => {
            heroImage.style.transform = "";
        });
    }

});