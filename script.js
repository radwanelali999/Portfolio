/* REVOKE EPK - static motion layer */
(function () {
  "use strict";

  /* Copyright year */
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML = "&copy; " + new Date().getFullYear() + " Revoke";
  }

  /* Nav backdrop toggle - runs regardless of motion preference */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Reduced motion or no GSAP: make sure all reveal content is visible. */
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    var hidden = document.querySelectorAll(".reveal");
    for (var i = 0; i < hidden.length; i++) {
      hidden[i].style.opacity = "1";
      hidden[i].style.transform = "none";
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Hero entrance */
  gsap.from(".hero-line", {
    y: 46,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.15,
  });
  gsap.from(".nav", { y: -20, opacity: 0, duration: 0.8, ease: "power2.out" });

  /* Hero image parallax + scale (disabled on mobile to prevent overflow) */
  if (window.matchMedia("(min-width: 769px)").matches) {
    gsap.to(".hero-img", {
      yPercent: 16,
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  /* Generic reveals */
  gsap.utils.toArray(".reveal").forEach(function (el) {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  /* Featured background image - scale + fade paradigm */
  gsap.fromTo(
    ".featured-img",
    { scale: 1.04, opacity: 0.5 },
    {
      scale: 1.16,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".featured",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );

  /* Gallery - pin the title on desktop while shots scroll past */
  var mm = gsap.matchMedia();

  mm.add("(min-width: 901px)", function () {
    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom bottom",
      pin: ".gallery-pin",
      pinSpacing: false,
    });
  });

  /* Gallery shots - each scales up + fades in on scroll */
  gsap.utils.toArray(".gallery-shot").forEach(function (fig) {
    var img = fig.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.18, opacity: 0.35 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: fig,
          start: "top 90%",
          end: "top 35%",
          scrub: true,
        },
      },
    );
  });
})();
