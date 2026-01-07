/**
 * Yahya Ahmed Portfolio Script
 * بناءً على الهوية البصرية (Neon Red & Yellow)
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. تفعيل ظهور الهيرو (Hero Section) ---
  const heroContainer = document.querySelector(".hero-container");
  if (heroContainer) {
    setTimeout(() => {
      heroContainer.style.opacity = "1";
      heroContainer.style.transform = "translateY(0)";
      heroContainer.style.transition = "all 1s ease-out";
    }, 300);
  }

  // --- 2. الهامبرجر مينو (Hamburger Menu) ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
      }
    });
  }

  // --- 3. مراقب الظهور (Scroll Observer) ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        if (entry.target.classList.contains("skill-item")) {
          const bar = entry.target.querySelector(".progress-fill");
          if (bar) {
            const width =
              bar.parentElement.previousElementSibling.querySelector(
                ".skill-percentage"
              ).innerText;
            bar.style.width = width;
          }
        }

        const statNumber = entry.target.querySelector(".stat-number");
        if (statNumber && !statNumber.classList.contains("counted")) {
          animateValue(statNumber);
        }
      }
    });
  }, observerOptions);

  const elementsToWatch = document.querySelectorAll(
    ".project-card, .service-card, .skill-item, .section-title, .about-section, .stat"
  );
  elementsToWatch.forEach((el) => revealOnScroll.observe(el));

  // --- 4. دالة عد الأرقام (Counter Animation) ---
  function animateValue(obj) {
    obj.classList.add("counted");
    const text = obj.innerText;
    const target = parseInt(text.replace(/[^0-9]/g, ""));
    const suffix = text.replace(/[0-9]/g, "");
    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerText = Math.floor(progress * target) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  // --- 5. منطق مؤشر التمرير الجانبي (Scroll Progress Indicator) ---
  let lastScrollTop = 0;

  function createScrollIndicators() {
    const progressHTML = `
            <div class="scroll-progress-container">
                <div class="scroll-progress-bar"></div>
                <div class="scroll-direction-indicator">
                    <div class="scroll-arrow up">↑</div>
                    <div class="scroll-arrow down">↓</div>
                </div>
                <div class="scroll-percentage">0%</div>
            </div>`;

    document.body.insertAdjacentHTML("beforeend", progressHTML);

    const style = document.createElement("style");
    style.textContent = `
            .scroll-progress-container {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            .scroll-progress-bar {
                width: 4px;
                height: 180px;
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
                overflow: hidden;
                position: relative;
            }
            .scroll-progress-bar::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: var(--progress, 0%);
                background: linear-gradient(to bottom, #ff003c, #ffcc00);
                box-shadow: 0 0 10px #ff003c;
                transition: height 0.1s;
            }
            .scroll-direction-indicator {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }
            .scroll-arrow {
                color: rgba(255,255,255,0.2);
                font-size: 18px;
                transition: all 0.3s;
                line-height: 1;
            }
            .scroll-arrow.active {
                color: #ffcc00;
                text-shadow: 0 0 8px #ffcc00;
                transform: scale(1.4);
            }
            .scroll-percentage {
                color: white;
                font-family: 'Cairo', sans-serif;
                font-size: 11px;
                font-weight: bold;
                background: rgba(13, 13, 18, 0.9);
                padding: 4px 8px;
                border-radius: 6px;
                border: 1px solid rgba(255,255,255,0.1);
                min-width: 35px;
                text-align: center;
            }
        `;
    document.head.appendChild(style);
  }

  function updateProgressIndicators() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // تحديث شريط التقدم والنسبة
    document.documentElement.style.setProperty("--progress", `${scrolled}%`);
    const percentageEl = document.querySelector(".scroll-percentage");
    if (percentageEl) percentageEl.textContent = `${Math.round(scrolled)}%`;

    // تحديد اتجاه التمرير وتحديث الأسهم
    const downArrow = document.querySelector(".scroll-arrow.down");
    const upArrow = document.querySelector(".scroll-arrow.up");

    if (winScroll > lastScrollTop) {
      downArrow?.classList.add("active");
      upArrow?.classList.remove("active");
    } else {
      upArrow?.classList.add("active");
      downArrow?.classList.remove("active");
    }
    lastScrollTop = winScroll <= 0 ? 0 : winScroll;
  }

  // تشغيل المؤشرات
  createScrollIndicators();
  window.addEventListener("scroll", () => {
    updateProgressIndicators();

    // تأثير النافبار الأصلي
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "15px 40px";
      navbar.style.background = "rgba(5, 5, 7, 0.95)";
      navbar.style.boxShadow = "0 5px 20px rgba(255, 0, 60, 0.2)";
    } else {
      navbar.style.padding = "20px 40px";
      navbar.style.background = "rgba(13, 13, 18, 0.92)";
      navbar.style.boxShadow = "none";
    }
  });
});
