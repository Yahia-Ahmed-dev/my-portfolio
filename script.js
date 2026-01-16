// 1. التمرير السلس (Smooth Scroll) - أساسي لتجربة المستخدم
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// 2. تأثير الـ Navbar والـ Glow (دمجناهم في مستمع واحد خفيف)
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const navbar = document.querySelector(".navbar");
      const scrollY = window.scrollY;

      // تغيير الـ Navbar
      if (scrollY > 100) {
        navbar.style.background = "rgba(10, 10, 15, 0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
      } else {
        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";
      }

      // تحريك دوائر الإضاءة (Parallax خفيف)
      document.querySelectorAll(".glow-circle").forEach((circle, index) => {
        circle.style.transform = `translateY(${
          scrollY * 0.05 * (index + 1)
        }px)`;
      });

      ticking = false;
    });
    ticking = true;
  }
});

// 3. أنيميشن ظهور العناصر (Intersection Observer) - أداء عالي جداً
const appearanceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        appearanceObserver.unobserve(entry.target); // تشغيل مرة واحدة فقط لتوفير الأداء
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".project-card, .skill-item, .service-card, .section-title")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    appearanceObserver.observe(el);
  });

// 4. عداد الأرقام (Stats Counter) - مهم للمصداقية
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.innerText);
    const step = target / 50;
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.ceil(current) + "+";
        setTimeout(update, 30);
      } else {
        counter.innerText = target + "+";
      }
    };

    // تشغيل العداد عند الرؤية فقط
    new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        update();
        observer.disconnect();
      }
    }).observe(counter);
  });
};

// تشغيل الوظائف عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  animateCounters();
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. أنيميشن ظهور العناصر (Intersection Observer)
  const appearanceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible"); // نستخدم كلاس بدلاً من تغيير الـ style مباشرة
          appearanceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // تحديد كل العناصر التي نريدها أن تظهر تدريجياً
  const animatedElements = document.querySelectorAll(
    ".project-card, .service-card, .section-title, .feature, .stat, .about-section"
  );

  animatedElements.forEach((el) => {
    el.classList.add("reveal-on-scroll"); // نعطيها الخصائص المبدئية (مختفية)
    appearanceObserver.observe(el);
  });

  // 2. تشغيل العدادات
  animateCounters();
});

// دالة العداد
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(
      counter.getAttribute("data-target") || counter.innerText
    );
    let current = 0;
    const increment = target / 30;

    const update = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current) + "+";
        setTimeout(update, 50);
      } else {
        counter.innerText = target + "+";
      }
    };

    new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        update();
        observer.disconnect();
      }
    }).observe(counter);
  });
}

// تحديث السنة
document.getElementById("currentYear").textContent = new Date().getFullYear();

// قائمة الموبايل
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("active"); // أضف تنسيق active في CSS ليظهر القائمة
});
