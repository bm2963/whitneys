document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");
  
    // If IntersectionObserver isn't available, show everything
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(el => el.classList.add("is-visible"));
      return;
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    reveals.forEach(el => observer.observe(el));
  });
  // Mobile hamburger menu
  (() => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");

    if (!toggle || !nav) return;

    const openMenu = () => {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
      if (!clickedInside) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close after tapping a link (nice on mobile)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMenu);
    });
  })();
