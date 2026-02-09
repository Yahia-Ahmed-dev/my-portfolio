// ===== الكود الرئيسي المحسّن =====
document.addEventListener("DOMContentLoaded", function () {
  // 1. التمرير السلس للنافبار
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // 2. تأثير النافبار عند التمرير
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 15, 0.95)";
      navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });

  // 3. إظهار العناصر عند التمرير (Intersection Observer)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // لا نوقف المراقبة حتى نضمن الظهور
      }
    });
  }, observerOptions);

  // مراقبة جميع العناصر التي نريد إظهارها
  const elementsToReveal = document.querySelectorAll(
    ".section, .project-card, .service-card, .feature, .stat, .about-section",
  );

  elementsToReveal.forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });

  // 4. عداد الإحصائيات
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent);
      let current = 0;
      const increment = target / 30;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + "+";
          setTimeout(updateCounter, 50);
        } else {
          counter.textContent = target + "+";
        }
      };

      // تشغيل العداد عند ظهور العنصر
      const counterObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            updateCounter();
            counterObserver.disconnect();
          }
        },
        { threshold: 0.5 },
      );

      counterObserver.observe(counter);
    });
  }

  // 5. قائمة الهاتف
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
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
  }

  // 6. تحديث السنة
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 7. التأكد من تحميل الصور
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });

    // Fallback في حالة فشل التحميل
    img.addEventListener("error", () => {
      console.log(`Failed to load image: ${img.src}`);
      img.style.opacity = "0.5";
    });
  });

  // تشغيل الدوال
  animateCounters();

  // إضافة كلاس no-js للمتصفحات التي لا تدعم JS
  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js-enabled");
});

// التأكد من ظهور المحتوى حتى لو فشل تحميل JS
window.addEventListener("load", () => {
  // إظهار جميع الأقسام بعد تحميل الصفحة
  setTimeout(() => {
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
  }, 1000);
});
const title = document.querySelector(".contact-title");
// ممكن تضيف هنا كود لو عايز النص يتكتب حرف حرف أول ما يوصل عنده السكرول
