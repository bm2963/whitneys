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
  // =======================
  // Gallery Lightbox
  // =======================
  (() => {
    const grid = document.getElementById("galleryGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("lightboxClose");

    if (!grid || !lightbox || !lightboxImg || !closeBtn) return;

    const open = (src, alt = "") => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "Salon photo";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      document.body.style.overflow = "";
    };

    grid.addEventListener("click", (e) => {
      const link = e.target.closest("a.gallery-item");
      if (!link) return;

      e.preventDefault();
      const img = link.querySelector("img");
      open(link.getAttribute("href"), img ? img.alt : "");
    });

    closeBtn.addEventListener("click", close);

    lightbox.addEventListener("click", (e) => {
      // clicking outside the image closes
      if (e.target === lightbox) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  })();