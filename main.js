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
  