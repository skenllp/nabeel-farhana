/* ==========================================================================
   Nabeel & Farhana — Wedding Invitation
   All editable content lives in weddingData below.
   ========================================================================== */

const weddingData = {
  groomName: "Muhammed Nabeel AS",
  brideName: "Farhana N",
  weddingDate: "2026-08-15", // YYYY-MM-DD
  weddingTime: "12:00",      // 24hr HH:MM, local venue time (IST, UTC+5:30)
  venue: "K.T.C.T Auditorium",
  address: "Kaduvayil, Thottakadu",
  googleMaps: "", // paste a direct Google Maps link here to override the auto-search link
  rsvpNumber: "", // leave blank — RSVP button is disabled for this invitation
  parents: {
    groom: "Son of Mr. Abdul Aleem & Mrs. Seenamol, Marancode, Thottakadu P.O, Kallambalam",
    bride: "Daughter of Mr. Nazar A (Late) & Zeenath Beevi, Firdous, Erattakalingu, Chirayinkeezhu P.O"
  },
  theme: {
    primary: "#4d1420",
    secondary: "#cfaa6b",
    background: "#fbf5ea",
    text: "#2a1712"
  },
  music: "assets/music/music.mp3"
};

document.addEventListener("DOMContentLoaded", () => {
  initLoaderDismiss();
  initCountdown();
  initMusic();
  initSideNav();
  initMapsLink();
  initAOS();
});

/* ---------------------------------- Opening transition (bismillah loader) ---------------------------------- */
function initLoaderDismiss() {
  const loader = document.getElementById("bismillah-loader");
  const pageWrap = document.getElementById("page-wrap");
  if (!loader || !pageWrap) return;

  let dismissed = false;

  // Auto-dismiss after 6.5s if the guest doesn't tap
  const autoDismiss = setTimeout(dismiss, 6500);

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    clearTimeout(autoDismiss);

    // 1. Loader blurs and fades away
    loader.classList.add("is-exit");

    // 2. Main page simultaneously blurs in
    document.body.classList.remove("loading");
    pageWrap.classList.add("is-revealed");

    // 3. Remove loader from DOM after the transition finishes
    setTimeout(() => loader.classList.add("is-gone"), 1100);
  }

  loader.addEventListener("click", dismiss);
  loader.addEventListener("touchstart", dismiss, { passive: true });
}

/* ---------------------------------- Countdown ---------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  if (!daysEl) return;

  // Venue is in India (IST, UTC+05:30)
  const target = new Date(`${weddingData.weddingDate}T${weddingData.weddingTime}:00+05:30`).getTime();

  const pad = (n) => String(Math.max(n, 0)).padStart(2, "0");

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------------------------------- Background music (autoplay + mute toggle) ---------------------------------- */
function initMusic() {
  const audio = document.getElementById("bg-music");
  const muteBtn = document.getElementById("mute-btn");
  const iconSound = document.getElementById("icon-sound");
  const iconMuted = document.getElementById("icon-muted");
  if (!audio || !muteBtn || !weddingData.music) return;

  audio.src = weddingData.music;
  audio.load();

  // Attempt autoplay on first user interaction (browser policy)
  let started = false;
  function startMusic() {
    if (started) return;
    audio.volume = 0.45;
    audio.play().catch(() => {}); // silently fail if still blocked
    started = true;
  }
  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("scroll", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });

  // Also try immediate autoplay (works on some browsers / after reload)
  window.addEventListener("load", () => {
    audio.volume = 0.45;
    audio.play().then(() => { started = true; }).catch(() => {});
  });

  // Mute / unmute toggle
  muteBtn.addEventListener("click", () => {
    startMusic();
    if (audio.paused) {
      audio.play();
      iconSound.style.display = "";
      iconMuted.style.display = "none";
    } else {
      audio.pause();
      iconSound.style.display = "none";
      iconMuted.style.display = "";
    }
  });
}

/* ---------------------------------- Side nav active state ---------------------------------- */
function initSideNav() {
  const dots = document.querySelectorAll(".side-nav__dot");
  const sections = Array.from(dots).map((d) => document.querySelector(d.getAttribute("href")));
  if (!dots.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = sections.indexOf(entry.target);
      dots.forEach((d) => d.removeAttribute("aria-current"));
      if (dots[idx]) dots[idx].setAttribute("aria-current", "true");
    });
  }, { threshold: 0.5 });

  sections.forEach((s) => s && observer.observe(s));
}

/* ---------------------------------- Google Maps link ---------------------------------- */
function initMapsLink() {
  const link = document.getElementById("mapsBtn");
  if (!link) return;
  if (weddingData.googleMaps) {
    link.href = weddingData.googleMaps;
  } else {
    const query = encodeURIComponent(`${weddingData.venue}, ${weddingData.address}`);
    link.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
}

/* ---------------------------------- AOS init ---------------------------------- */
function initAOS() {
  if (window.AOS) {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 60 });
  }
}

