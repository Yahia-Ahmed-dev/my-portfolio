// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

//add translation

// Add scroll effect to navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(10, 10, 15, 0.95)";
    navbar.style.boxShadow = "0 0 30px rgba(255, 0, 60, 0.2)";
  } else {
    navbar.style.backgroundColor = "rgba(18, 18, 24, 0.85)";
    navbar.style.boxShadow = "0 0 30px rgba(255, 0, 60, 0.1)";
  }
});

// Simple animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements to animate
document
  .querySelectorAll(".project-card, .skill-item, .service-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".glow-circle").forEach((circle, index) => {
    circle.style.transform = `translateY(${scrollY * 0.05 * (index + 1)}px)`;
  });
});

// أنيميشنات Scroll متقدمة مع تأثيرات متنوعة
class AdvancedScrollAnimations {
  constructor() {
    this.scrollY = 0;
    this.lastScrollY = 0;
    this.scrollDirection = "down";
    this.init();
  }

  init() {
    this.setupScrollTracking();
    this.createScrollIndicators();
    this.addScrollTransformEffects();
    this.addMouseFollowEffect();
    this.addPageTransition();
  }

  setupScrollTracking() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      this.lastScrollY = this.scrollY;
      this.scrollY = window.scrollY;
      this.scrollDirection = this.scrollY > this.lastScrollY ? "down" : "up";

      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  onScroll() {
    this.applyScrollEffects();
    this.updateProgressIndicators();
    this.triggerScrollEvents();
    this.animateOnScrollDirection();
  }

  applyScrollEffects() {
    // Skew Effect على العناصر
    document.querySelectorAll("[data-skew]").forEach((el) => {
      const skewAmount = parseFloat(el.getAttribute("data-skew")) || 0.1;
      const skew = (this.scrollY * skewAmount) % 45;
      el.style.transform = `skewY(${skew}deg)`;
    });

    // Wave Effect
    document.querySelectorAll("[data-wave]").forEach((el) => {
      const waveIntensity = parseFloat(el.getAttribute("data-wave")) || 0.05;
      const wave = Math.sin(this.scrollY * waveIntensity) * 20;
      el.style.transform = `translateY(${wave}px)`;
    });

    // Pulse on Scroll
    if (this.scrollY % 500 < 10) {
      document.querySelectorAll("[data-pulse]").forEach((el) => {
        el.classList.add("pulse");
        setTimeout(() => el.classList.remove("pulse"), 1000);
      });
    }

    // Gradient Shift
    document.querySelectorAll("[data-gradient-shift]").forEach((el) => {
      const hue = (this.scrollY * 0.1) % 360;
      el.style.background = `linear-gradient(${hue}deg, var(--color1), var(--color2))`;
    });
  }

  createScrollIndicators() {
    // Create scroll progress
    const progressHTML = `
            <div class="scroll-progress-container">
                <div class="scroll-progress-bar"></div>
                <div class="scroll-direction-indicator">
                    <div class="scroll-arrow down">↓</div>
                    <div class="scroll-arrow up">↑</div>
                </div>
                <div class="scroll-percentage">0%</div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", progressHTML);

    // Add CSS for indicators
    const style = document.createElement("style");
    style.textContent = `
            .scroll-progress-container {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .scroll-progress-bar {
                width: 3px;
                height: 200px;
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
                background: linear-gradient(to bottom, #ff003c, #00ffea);
                transition: height 0.1s;
            }
            
            .scroll-direction-indicator {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
            }
            
            .scroll-arrow {
                color: rgba(255,255,255,0.3);
                font-size: 20px;
                transition: all 0.3s;
            }
            
            .scroll-arrow.active {
                color: #ff003c;
                text-shadow: 0 0 10px currentColor;
                transform: scale(1.3);
            }
            
            .scroll-percentage {
                color: white;
                font-family: monospace;
                font-size: 12px;
                background: rgba(0,0,0,0.5);
                padding: 5px 10px;
                border-radius: 10px;
            }
        `;
    document.head.appendChild(style);
  }

  updateProgressIndicators() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Update progress bar
    document.documentElement.style.setProperty("--progress", `${scrolled}%`);

    // Update percentage
    const percentageEl = document.querySelector(".scroll-percentage");
    if (percentageEl) {
      percentageEl.textContent = `${Math.round(scrolled)}%`;
    }

    // Update direction arrows
    const downArrow = document.querySelector(".scroll-arrow.down");
    const upArrow = document.querySelector(".scroll-arrow.up");

    if (this.scrollDirection === "down") {
      downArrow?.classList.add("active");
      upArrow?.classList.remove("active");
    } else {
      upArrow?.classList.add("active");
      downArrow?.classList.remove("active");
    }
  }

  addScrollTransformEffects() {
    // 3D Transform on Scroll
    document.querySelectorAll("[data-3d-rotate]").forEach((el) => {
      const sensitivity = parseFloat(el.getAttribute("data-3d-rotate")) || 0.1;

      window.addEventListener("scroll", () => {
        const rotateX = this.scrollY * sensitivity * 0.5;
        const rotateY = this.scrollY * sensitivity;

        el.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
      });
    });

    // Morphing Shapes
    document.querySelectorAll("[data-morph]").forEach((el) => {
      window.addEventListener("scroll", () => {
        const progress = (this.scrollY % 1000) / 1000;
        const morphValue = Math.sin(progress * Math.PI * 2) * 50;

        el.style.borderRadius = `${morphValue}% ${
          100 - morphValue
        }% ${morphValue}% ${100 - morphValue}%`;
        el.style.clipPath = `polygon(${morphValue}% 0%, 100% ${morphValue}%, ${
          100 - morphValue
        }% 100%, 0% ${100 - morphValue}%)`;
      });
    });
  }

  addMouseFollowEffect() {
    // Mouse following elements on scroll
    document.querySelectorAll("[data-mouse-follow]").forEach((el) => {
      const intensity = parseFloat(el.getAttribute("data-mouse-follow")) || 0.5;

      document.addEventListener("mousemove", (e) => {
        const x = (e.clientX - window.innerWidth / 2) * intensity;
        const y = (e.clientY - window.innerHeight / 2) * intensity;

        // Combine with scroll effect
        const scrollY = this.scrollY * 0.1;

        el.style.transform = `translate(${x}px, ${y + scrollY}px)`;
      });
    });
  }

  addPageTransition() {
    // Page transition on scroll sections
    const sections = document.querySelectorAll("section[data-section]");

    sections.forEach((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add active class to current section
              sections.forEach((s) => s.classList.remove("active"));
              section.classList.add("active");

              // Update body class for section-based styling
              document.body.className = "";
              document.body.classList.add(`section-${index + 1}`);

              // Trigger custom event
              document.dispatchEvent(
                new CustomEvent("sectionChange", {
                  detail: { index, section },
                })
              );
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
    });
  }

  animateOnScrollDirection() {
    // Different animations based on scroll direction
    document.querySelectorAll("[data-direction-animate]").forEach((el) => {
      if (this.scrollDirection === "down") {
        el.style.transform = "translateY(-10px) scale(1.02)";
        el.style.boxShadow = "0 20px 40px rgba(255,0,60,0.3)";
      } else {
        el.style.transform = "translateY(10px) scale(0.98)";
        el.style.boxShadow = "0 10px 20px rgba(0,255,234,0.3)";
      }
    });
  }

  triggerScrollEvents() {
    // Trigger events at specific scroll points
    const scrollPoints = [25, 50, 75, 100];
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    scrollPoints.forEach((point) => {
      if (scrolled >= point && scrolled < point + 1) {
        document.dispatchEvent(
          new CustomEvent("scrollMilestone", {
            detail: { percentage: point },
          })
        );

        // Visual feedback
        this.createMilestoneEffect(point);
      }
    });
  }

  createMilestoneEffect(percentage) {
    const effect = document.createElement("div");
    effect.className = "milestone-effect";
    effect.textContent = `${percentage}%`;
    effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 80px;
            font-weight: bold;
            color: rgba(255,0,60,0.1);
            z-index: 9999;
            pointer-events: none;
            animation: milestonePulse 1s ease-out;
        `;

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 1000);

    // Add animation style
    if (!document.querySelector("#milestone-styles")) {
      const style = document.createElement("style");
      style.id = "milestone-styles";
      style.textContent = `
                @keyframes milestonePulse {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                }
            `;
      document.head.appendChild(style);
    }
  }
}

// التهيئة
const scrollAnim = new AdvancedScrollAnimations();

gsap.registerPlugin(ScrollTrigger);

// تأثير Parallax للخلفية
gsap.to(".bg-glow", {
  y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.3,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});

// تأثير floating للعناصر الكرتونية
function createFloatingAnimations() {
  const elements = document.querySelectorAll(".float-icon, .float-code");

  elements.forEach((el, index) => {
    gsap.to(el, {
      y: () => Math.sin(Date.now() * 0.001 + index) * 20,
      rotation: () => Math.sin(Date.now() * 0.001 + index) * 10,
      duration: 2 + index * 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
}

// Add this code to your existing script.js

// Progress Bars Animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = `${width}%`;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => observer.observe(bar));
}

// Counter Animation for Stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.ceil(current) + (counter.textContent.includes("%") ? "%" : "+");
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent =
          target + (counter.textContent.includes("%") ? "%" : "+");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
}

// Initialize all animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  animateProgressBars();
  typingEffect();
  animateCounters();

  // Existing code...
});

// أبسط كود ممكن - بدون مكتبات
function simpleHeroFade() {
  const hero = document.querySelector(".hero");
  if (hero) {
    // بسيط جداً - نضيف كلاس visible بعد تأخير بسيط
    setTimeout(() => {
      hero.classList.add("visible");
    }, 300);
  }
}

// أو باستخدام GSAP بسيط
function gsapHeroFade() {
  const hero = document.querySelector(".hero");
  if (hero) {
    // إخفاء الهيرو أولاً
    gsap.set(hero, { opacity: 0, y: 30 });

    // ظهور تدريجي
    gsap.to(hero, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3,
    });
  }
}

// تشغيل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  // اختر أبسط واحد:

  // 1. CSS فقط (لا يحتاج JS)
  // - أضف الكلاس visible للهيرو في HTML مباشرة بعد تحميل الصفحة

  // 2. مع JS بسيط
  simpleHeroFade();

  // 3. مع GSAP
  // gsapHeroFade();
});
// ========== هامبرجر مينو ==========
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
  this.classList.toggle("open");
});

// إغلاق المنيو عند الضغط على رابط
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  });
});

// إغلاق المنيو عند التمرير
window.addEventListener("scroll", function () {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  }
});
