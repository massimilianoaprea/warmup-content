/* =========================================================
   WARM UP CONTEST — main.js
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: ombra/sfondo allo scroll ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri il menu");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Anno corrente nel footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Hero: palla che traccia la traiettoria ---------- */
  var path = document.getElementById("arcPath");
  var ball = document.getElementById("arcBall");
  if (path && ball && !reduce && path.getTotalLength) {
    var len = path.getTotalLength();
    var start = null;
    var dur = 2600;
    function step(ts) {
      if (start === null) start = ts;
      var t = ((ts - start) % dur) / dur;
      // ease-in-out
      var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      var p = path.getPointAtLength(e * len);
      ball.setAttribute("cx", p.x);
      ball.setAttribute("cy", p.y);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Galleria: filtri per edizione + lightbox ---------- */
  var gallery = document.getElementById("gallery");
  var lb = document.getElementById("lightbox");
  if (gallery && lb) {
    var figEls = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var lbImg = document.getElementById("lbImg");
    var lbClose = document.getElementById("lbClose");
    var lbPrev = document.getElementById("lbPrev");
    var lbNext = document.getElementById("lbNext");
    var lastFocus = null;
    var view = figEls.slice();
    var current = 0;

    function visibleFigs() {
      return figEls.filter(function (f) { return !f.hasAttribute("hidden"); });
    }
    function show(i) {
      view = visibleFigs();
      if (!view.length) return;
      current = (i + view.length) % view.length;
      var img = view[current].querySelector("img");
      lbImg.src = img.src; lbImg.alt = img.alt;
    }
    function open(fig) {
      view = visibleFigs();
      current = view.indexOf(fig); if (current < 0) current = 0;
      lastFocus = document.activeElement;
      show(current);
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    }
    function close() {
      lb.classList.remove("open"); lbImg.src = ""; document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    figEls.forEach(function (fig) {
      fig.setAttribute("role", "button");
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("click", function () { open(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); }
      });
    });
    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", function () { show(current - 1); });
    lbNext.addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    /* filtri per edizione */
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".gal-tab"));
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var f = tab.getAttribute("data-filter");
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        figEls.forEach(function (fig) {
          var match = (f === "all" || fig.getAttribute("data-edition") === f);
          if (match) fig.removeAttribute("hidden");
          else fig.setAttribute("hidden", "");
        });
      });
    });
  }
})();
