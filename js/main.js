// Hamburger menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü öffnen");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Menü schließen" : "Menü öffnen",
    );
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMenu();
      navToggle.focus();
    }
  });
}

// Flip cards: toggle on tap for touch devices
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

// Cookie Consent
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Echte ID einsetzen
const META_PIXEL_ID = "000000000000000"; // TODO: Echte ID einsetzen

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    name +
    "=" +
    value +
    "; expires=" +
    expires +
    "; path=/; SameSite=Lax" +
    secure;
}

function loadGoogleAnalytics() {
  if (GA_MEASUREMENT_ID.includes("XXXX")) return;
  if (document.getElementById("ga-script")) return;
  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
  script.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  };
}

function loadMetaPixel() {
  if (META_PIXEL_ID === "000000000000000") return;
  if (window.fbq) return;
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js",
  );
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function loadTrackingScripts() {
  loadGoogleAnalytics();
  loadMetaPixel();
}

const cookieBanner = document.getElementById("cookie-banner");
const cookieConsent = getCookie("yg_cookie_consent");

if (cookieConsent === "accepted") {
  loadTrackingScripts();
} else if (cookieConsent !== "declined" && cookieBanner) {
  cookieBanner.classList.add("visible");
}

if (cookieBanner) {
  document
    .getElementById("cookie-accept")
    .addEventListener("click", function () {
      setCookie("yg_cookie_consent", "accepted", 30);
      cookieBanner.classList.remove("visible");
      loadTrackingScripts();
    });

  document
    .getElementById("cookie-decline")
    .addEventListener("click", function () {
      setCookie("yg_cookie_consent", "declined", 30);
      cookieBanner.classList.remove("visible");
    });
}

// Scroll animations with Intersection Observer
const animatedElements = document.querySelectorAll(".animate-on-scroll");

if (animatedElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedElements.forEach((el) => observer.observe(el));
}
