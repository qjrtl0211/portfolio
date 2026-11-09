// 스크롤 등장 효과
const revealTargets = document.querySelectorAll(
  ".section-label, .section-desc, .about-text, .about-facts, .career-item, " +
    ".experience-grid > div, .project-card, .skills-grid > div, .contact-inner"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      // 같은 순간에 보이기 시작한 요소는 시차를 두고 등장
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          const el = entry.target;
          el.style.transitionDelay = `${i * 80}ms`;
          el.classList.add("is-visible");
          revealObserver.unobserve(el);

          // 등장이 끝나면 reveal 스타일을 제거해 hover 효과가 정상 동작하게 함
          el.addEventListener(
            "transitionend",
            () => {
              el.classList.remove("reveal", "is-visible");
              el.style.transitionDelay = "";
            },
            { once: true }
          );
        });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// 현재 섹션에 맞춰 메뉴 강조
const navLinks = document.querySelectorAll("nav ul a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

// Hero 글로우가 마우스를 따라 움직임 (마우스 환경 + 동작 줄이기 미설정 시)
const hero = document.querySelector("#hero");
const canFollow = window.matchMedia(
  "(hover: hover) and (prefers-reduced-motion: no-preference)"
).matches;

if (hero && canFollow) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--mx", `${x}%`);
    hero.style.setProperty("--my", `${y}%`);
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.removeProperty("--mx");
    hero.style.removeProperty("--my");
  });
}
