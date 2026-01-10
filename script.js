// ملف JavaScript خفيف ومحسن
(function () {
  "use strict";

  // دالة تهيئة الأساسية
  function init() {
    // إعداد السنة الحالية
    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
    // إعداد القائمة المتنقلة
    setupMobileMenu();

    // إعداد مراقبة الظهور
    setupIntersectionObserver();

    // إعداد التمرير السلس
    setupSmoothScroll();
  }

  // إعداد القائمة المتنقلة
  function setupMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("active");
    });

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
      });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
      }
    });
  }

  // إعداد مراقبة الظهور للأنيميشن
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // عد الأرقام في الإحصائيات
            if (entry.target.classList.contains("stat")) {
              animateCounter(entry.target.querySelector(".stat-number"));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // مراقبة العناصر
    const elements = document.querySelectorAll(
      ".project-card, .service-card, .feature, .stat, .section-title"
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  // دالة عد الأرقام
  function animateCounter(element) {
    if (!element || element.classList.contains("animated")) return;

    element.classList.add("animated");
    const target = parseInt(element.textContent);
    const duration = 1500;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      element.textContent = Math.floor(progress * target) + "+";

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // إعداد التمرير السلس
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // إضافة CSS للعناصر المرئية
  const style = document.createElement("style");
  style.textContent = `
        .project-card, .service-card, .feature, .stat, .section-title {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.visible, 
        .service-card.visible, 
        .feature.visible, 
        .stat.visible, 
        .section-title.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
  document.head.appendChild(style);

  // تهيئة التطبيق عند تحميل الصفحة
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
