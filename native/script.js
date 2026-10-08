/* ==========================================================================
   STARTRADER — Qatar Live Workshop landing page
   Standalone vanilla JS: copy (i18n), language switch, registration form,
   FAQ accordion, header state and scroll-reveal. No framework, no build step.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Registration endpoint. The form posts JSON here; the server checks the
     Qatar Webinar Google Sheet for a duplicate number, saves the full
     registration to the Sheet and sends the lead to the CRM. When this page
     is hosted somewhere other than the Vercel project, keep the absolute URL
     and add this page's origin to ALLOWED_ORIGINS on Vercel (INTEGRATION.md).
     ---------------------------------------------------------------------- */
  var REGISTER_ENDPOINT =
    "https://startrader-webinar-qatar.vercel.app/api/register";

  /* ------------------------------------------------------------------------
     English copy (the HTML is already written in English; this is the source
     of truth when switching back from Arabic). Arabic lives in ar.js and is
     fetched only the first time a visitor picks it.
     ---------------------------------------------------------------------- */
  var translations = {
    en: {
      "languageName": "English",
      "hero": {
        "badge": "Free Live Workshop · Qatar",
        "title": {
          "main": "You've Been Watching the Markets.",
          "accent": "Now Know What Matters."
        },
        "lead": "For people who follow Gold, Oil, and global markets and want a clearer way to interpret what is driving market movement.",
        "tagline": [
          "Walk In With Questions.",
          "Leave With A Clearer Approach."
        ],
        "cta": "Reserve My Free Seat",
        "info": {
          "date": {
            "label": "29-09-2026",
            "sub": "Tuesday"
          },
          "time": {
            "label": "08:00 PM",
            "sub": "(Qatar Time)"
          },
          "online": {
            "label": "Online",
            "sub": "Free to attend"
          },
          "presenter": {
            "label": "Presented by",
            "sub": "Ghassan Albohtori"
          }
        },
        "trust": {
          "points": [
            "Regulated across multiple jurisdictions including ASIC | FSCA | CMA | FSA | FSC",
            "Global Multi-Asset Broker",
            "Official Partner of the NBA",
            "Official Partner of Porsche Carrera Cup Middle East"
          ],
          "nbaAlt": "Official Partner of the NBA",
          "porscheAlt": "Porsche Carrera Cup Middle East partner"
        }
      },
      "register": {
        "title": "Register Now",
        "subtitle": "Secure your spot for the upcoming webinar",
        "name": "Full Name",
        "namePlaceholder": "Enter your full name",
        "mobile": "Qatar Mobile Number",
        "mobilePlaceholder": "XXXX XXXX",
        "experience": "What best describes your trading experience?",
        "experienceOptions": {
          "current": "I am currently trading",
          "former": "I have traded before, but not currently",
          "new": "I am new to trading"
        },
        "errors": {
          "nameRequired": "Please enter your full name.",
          "nameInvalid": "Please use letters only (at least 2).",
          "mobileRequired": "Please enter your Qatar mobile number.",
          "mobileLength": "Enter the 8-digit number after +974.",
          "mobilePrefix": "Qatar mobile numbers start with 3, 5, 6 or 7.",
          "experienceRequired": "Please choose one option.",
          "consentRequired": "Please accept the terms to continue."
        },
        "duplicate": "This mobile number is already registered for the webinar.",
        "consent": {
          "before": "I agree to STARTRADER's ",
          "terms": "Terms & Conditions",
          "termsUrl": "https://www.startrader.com/legal-documents/",
          "and": " and ",
          "privacy": "Privacy Policy",
          "privacyUrl": "https://www.startrader.com/privacy-policy/",
          "after": ". I understand that trading CFDs carries a high level of risk and may not be suitable for all investors."
        },
        "button": "Register",
        "sending": "Registering…",
        "error": "Something went wrong. Please try again.",
        "success": {
          "title": "You're registered!",
          "body": "Thank you, {name}. Your seat for the live workshop is confirmed.",
          "detail": "We'll send the joining details to {phone}."
        },
        "haveAccount": "Already have an account?",
        "signIn": "Sign In",
        "signInUrl": "https://myaccount.startrader.com/login"
      },
      "why": {
        "title": "Why this workshop",
        "subtitle": "Market moves can be overwhelming. We can help simplify it",
        "cards": [
          "Gold, oil, the dollar, the relationship between different assets can be difficult to navigate.",
          "If you feel confused about the market, this workshop is for you.",
          "Start using a clearer process for what to focus on, what to ignore, and what to do next."
        ]
      },
      "who": {
        "title": "Who is it for",
        "subtitle": "This Workshop Is For Market Followers Who Want More Clarity",
        "items": [
          "You follow Gold, Oil, Forex, or global market news",
          "You watch market updates but still feel unsure what matters most",
          "You do not want to depend on random opinions or signals",
          "You want a clear way for reading market movement",
          "You have traded before but want more structure",
          "You are considering your next step and want more clarity first"
        ],
        "tags": [
          "No advanced knowledge is required.",
          "You just need a better way to deal with market data."
        ]
      },
      "walk": {
        "title": "What you'll walk away with",
        "subtitle": "Leave With a Clear Vision of How Markets Move. By the end of the workshop, you will have:",
        "items": [
          "A simple process for deciding what deserves your attention",
          "A clearer way to find useful information about the market",
          "A practical routine for following Gold, Oil, and economic events",
          "A stronger understanding of how experienced participants view markets",
          "More confidence in interpreting market moves"
        ]
      },
      "inside": {
        "title": "Inside the workshop",
        "subtitle": "60-Minute Live Workshop",
        "rows": [
          "Why market information creates confusion, and why more news does not always mean better decisions",
          "How experienced market participants filter market noise and focus on what matters first",
          "Applying the process to Gold, Oil, the US dollar, and recent market events",
          "Building a simple market routine you can use before reacting to market moves",
          "Live Q&A with the analyst"
        ],
        "cta": "Reserve My Free Seat"
      },
      "presenter": {
        "eyebrow": "Meet Your Presenter",
        "name": "Ghassan Albohtori",
        "role": "Senior Market Analyst · STARTRADER",
        "bio": [
          "With more than 10 years of experience in financial markets, Ghassan has helped thousands of market followers better understand global economic developments, commodities, and market behavior.",
          "Through hundreds of educational sessions and media appearances, he has become known for simplifying complex market topics and helping participants connect market events with real-world implications.",
          "His interactive approach encourages discussion, practical thinking, and a clearer understanding of how experienced market participants interpret changing market conditions."
        ],
        "stats": [
          {
            "num": "10+",
            "cap": "Years in markets"
          },
          {
            "num": "100s",
            "cap": "Educational sessions"
          },
          {
            "num": "1,000s",
            "cap": "Followers guided"
          }
        ]
      },
      "includes": {
        "title": "Included With Your Registration",
        "toolkit": "Your Market Decision Toolkit",
        "receives": "Every registered attendee receives:",
        "items": [
          "Full workshop recording",
          "Presentation slides",
          "Market Decision Checklist",
          "Weekly Market Routine",
          "Economic Event Prioritization Guide",
          "Live Q&A access"
        ],
        "note": "These resources are designed to help you keep using the process after the workshop ends."
      },
      "about": {
        "title": "About STARTRADER",
        "paras": [
          "STARTRADER is a globally regulated multi-asset broker providing access to financial markets, trading technology, analyst-led insights, and market education.",
          "Trusted by clients globally and supported by global partnerships including the NBA and Porsche Carrera Cup Middle East, STARTRADER remains committed to helping traders and market followers better understand financial markets through analyst-led sessions, educational resources, and market insights."
        ]
      },
      "faq": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "Is this workshop free?",
            "a": "Yes. Registration and attendance are free."
          },
          {
            "q": "Do I need trading experience?",
            "a": "No. Basic market interest is enough. The workshop is designed for people who already follow markets and want a clearer process."
          },
          {
            "q": "Who is this workshop for?",
            "a": "People who follow Gold, Oil, Forex, currencies, or global market news and want a clearer way to deal with market noise."
          },
          {
            "q": "Will I receive trading signals?",
            "a": "No. This is not a signals session. The workshop is designed to help you build your own process for reading market movement."
          },
          {
            "q": "What markets will be discussed?",
            "a": "Gold, Oil, the US dollar, and major economic events will be used as practical examples."
          },
          {
            "q": "Will there be a recording?",
            "a": "Yes. Registered attendees will receive the recording after the session."
          },
          {
            "q": "What language is the workshop in?",
            "a": "The workshop will be available in English and Arabic."
          },
          {
            "q": "How will I receive access?",
            "a": "Access details and reminders will be sent by email and/or mobile before the workshop. A STARTRADER team member may also contact you if support is needed before the session."
          }
        ]
      },
      "final": {
        "title": "Markets Keep Moving, Know What Matters.",
        "subtitle": "When Gold moves, oil reacts, or new economic news breaks, you should not have to start from zero every time.",
        "pills": [
          "Join this free live workshop",
          "Walk in with market noise.",
          "Leave with a clearer process for deciding what matters next.",
          "Registration is free and takes less than a minute."
        ],
        "button": "Reserve My Free Seat"
      },
      "footer": {
        "disclaimer": "Trading involves risk. CFD trading is not suitable for all investors. This workshop is for educational purposes only and does not constitute financial advice, investment advice, or a recommendation to buy or sell any financial product."
      }
    },
  };
  var AR_SCRIPT = "ar.js";

  /* Registration rules — keep in sync with src/registration.ts. */
  var QATAR_DIAL = "+974";
  // Qatar mobile numbers: 8 digits starting with 3, 5, 6 or 7.
  var QATAR_MOBILE_PREFIXES = ["3", "5", "6", "7"];
  var EXPERIENCE_OPTIONS = ["current", "former", "new"];
  var TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term",
    "utm_content", "gclid", "fbclid"];

  /* ------------------------------------------------------------------------
     Internationalisation — swap [data-i18n] text, placeholders, links and
     alt text, and set <html lang>/<html dir>. Elements without a value for
     the active language keep their HTML text (content can never blank out).
     ---------------------------------------------------------------------- */
  var STORAGE_KEY = "startrader-lang";
  var currentLang = "en";

  function resolve(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  // Load the Arabic copy once, on demand.
  var arLoading = null;
  function loadLang(lang) {
    if (translations[lang]) return Promise.resolve();
    if (lang !== "ar") return Promise.reject();
    if (!arLoading) {
      arLoading = new Promise(function (resolveLoad, rejectLoad) {
        var s = document.createElement("script");
        s.src = AR_SCRIPT;
        s.async = true;
        s.onload = function () {
          if (window.STARTRADER_I18N_AR) {
            translations.ar = window.STARTRADER_I18N_AR;
            resolveLoad();
          } else rejectLoad();
        };
        s.onerror = function () {
          arLoading = null; // allow a retry later
          rejectLoad();
        };
        document.head.appendChild(s);
      });
    }
    return arLoading;
  }

  function applyLang(lang) {
    currentLang = translations[lang] ? lang : "en";
    var dict = translations[currentLang];

    var root = document.documentElement;
    root.lang = currentLang;
    root.dir = currentLang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (e) {
      /* ignore storage failures */
    }

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n"));
      if (value != null) el.textContent = value;
    });

    // Rows that only exist in some languages collapse when their key is
    // absent in the active language.
    document.querySelectorAll("[data-i18n-optional]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-optional");
      el.style.display = resolve(dict, key) == null ? "none" : "";
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n-ph"));
      if (value != null) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-href]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n-href"));
      if (value != null) el.setAttribute("href", value);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n-alt"));
      if (value != null) el.setAttribute("alt", value);
    });

    updateLangMenu();
    renderForm();
  }

  // Switching never reloads the page, so URL parameters and anything typed
  // into the form are kept.
  function switchLang(lang) {
    loadLang(lang).then(
      function () {
        applyLang(lang);
      },
      function () {
        /* Arabic file failed to load (offline) — stay on current language */
      }
    );
  }

  /* ------------------------------------------------------------------------
     Language selector (navbar dropdown)
     ---------------------------------------------------------------------- */
  var langRoot = document.querySelector(".lang");
  var langTrigger = langRoot.querySelector(".lang__trigger");
  var langMenu = langRoot.querySelector(".lang__menu");
  var langChev = langRoot.querySelector(".lang__chev");
  var langItems = langMenu.querySelectorAll(".lang__item");

  function setMenuOpen(open) {
    langMenu.hidden = !open;
    langTrigger.setAttribute("aria-expanded", String(open));
    langChev.classList.toggle("lang__chev--open", open);
  }

  function updateLangMenu() {
    langItems.forEach(function (item) {
      var active = item.getAttribute("data-lang") === currentLang;
      item.classList.toggle("lang__item--active", active);
      var tick = item.querySelector("svg");
      if (tick) tick.style.display = active ? "" : "none";
    });
  }

  langTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    setMenuOpen(langMenu.hidden);
  });
  document.addEventListener("mousedown", function (e) {
    if (!langRoot.contains(e.target)) setMenuOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenuOpen(false);
  });
  langItems.forEach(function (item) {
    item.addEventListener("click", function () {
      switchLang(item.getAttribute("data-lang"));
      setMenuOpen(false);
    });
  });

  /* ------------------------------------------------------------------------
     Header — solid bar (with frosted blur) once the page is scrolled
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".header");
  var headerScrolled = false;
  function onScroll() {
    var s = window.scrollY > 8;
    if (s !== headerScrolled) {
      headerScrolled = s;
      header.classList.toggle("header--scrolled", s);
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------------------------
     FAQ accordion — single item open at a time
     ---------------------------------------------------------------------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var wasOpen = item.getAttribute("data-open") === "true";
      document.querySelectorAll(".faq__item").forEach(function (it) {
        it.setAttribute("data-open", "false");
        it.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.setAttribute("data-open", "true");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ------------------------------------------------------------------------
     Registration form: validates as the visitor types, keeps Register
     disabled until every field is valid, then posts to REGISTER_ENDPOINT.
     ---------------------------------------------------------------------- */
  var form = document.querySelector("form.form-card");
  var successCard = document.querySelector(".form-card--success");
  var submitBtn = form.querySelector('button[type="submit"]');
  var errorEl = form.querySelector(".form-error");
  var nameInput = form.querySelector("#fullName");
  var mobileInput = form.querySelector("#mobile");
  var consentInput = form.querySelector('input[name="consent"]');
  var radios = form.querySelectorAll('input[name="experience"]');
  var touched = {};
  var duplicate = false;
  var failed = false;
  var sending = false;

  function cleanName(v) {
    return v.replace(/\s+/g, " ").trim();
  }

  // Digits only, max 8; drops a pasted +974 / 00974 country code.
  function normalizeMobile(v) {
    var d = v.replace(/\D/g, "");
    if (d.indexOf("00974") === 0 && d.length > 8) d = d.slice(5);
    else if (d.indexOf("974") === 0 && d.length > 8) d = d.slice(3);
    return d.slice(0, 8);
  }

  function formatMobile(d) {
    return d.length > 4 ? d.slice(0, 4) + " " + d.slice(4) : d;
  }

  var NAME_OK = /^[\p{L}\p{M}' .\-’]+$/u;
  var HAS_LETTER = /\p{L}/u;

  function experienceValue() {
    for (var i = 0; i < radios.length; i++) if (radios[i].checked) return radios[i].value;
    return "";
  }

  function validate() {
    var e = {};
    var name = cleanName(nameInput.value);
    if (!name) e.fullName = "nameRequired";
    else if (name.length < 2 || name.length > 100 || !HAS_LETTER.test(name) || !NAME_OK.test(name))
      e.fullName = "nameInvalid";
    var m = mobileInput.value;
    if (!m) e.mobile = "mobileRequired";
    else if (!/^\d{8}$/.test(m)) e.mobile = "mobileLength";
    else if (QATAR_MOBILE_PREFIXES.indexOf(m.charAt(0)) === -1) e.mobile = "mobilePrefix";
    if (EXPERIENCE_OPTIONS.indexOf(experienceValue()) === -1) e.experience = "experienceRequired";
    if (!consentInput.checked) e.consent = "consentRequired";
    return e;
  }

  function showError(field, message) {
    var el = document.getElementById(field + "-error");
    var wrap = form.querySelector('[data-field="' + field + '"]');
    el.hidden = !message;
    el.textContent = message || "";
    if (wrap) wrap.classList.toggle(field === "consent" ? "consent--invalid" : "field--invalid", !!message);
    var input = field === "fullName" ? nameInput : field === "mobile" ? mobileInput : field === "consent" ? consentInput : null;
    if (input) {
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    }
  }

  function renderForm() {
    var r = translations[currentLang].register;
    var errors = validate();
    ["fullName", "mobile", "experience", "consent"].forEach(function (f) {
      var msg = touched[f] && errors[f] ? r.errors[errors[f]] : "";
      if (f === "mobile" && duplicate) msg = r.duplicate;
      showError(f, msg);
    });
    var valid = Object.keys(errors).length === 0 && !duplicate;
    submitBtn.disabled = !valid || sending;
    submitBtn.textContent = sending ? r.sending : r.button;
    if (sending) submitBtn.setAttribute("aria-busy", "true");
    else submitBtn.removeAttribute("aria-busy");
    errorEl.hidden = !failed;
    errorEl.textContent = failed ? r.error : "";
    if (!successCard.hidden) renderSuccess();
    return valid;
  }

  var confirmed = { name: "", phone: "" };
  function renderSuccess() {
    var s = translations[currentLang].register.success;
    successCard.querySelector(".form-success__body").textContent =
      s.body.replace("{name}", confirmed.name);
    var detail = successCard.querySelector(".form-success__detail");
    var parts = s.detail.split("{phone}");
    detail.textContent = "";
    detail.appendChild(document.createTextNode(parts[0]));
    var bdi = document.createElement("bdi");
    bdi.dir = "ltr";
    bdi.textContent = confirmed.phone;
    detail.appendChild(bdi);
    detail.appendChild(document.createTextNode(parts[1] || ""));
  }

  function touch(f) {
    touched[f] = true;
  }

  nameInput.addEventListener("input", renderForm);
  nameInput.addEventListener("blur", function () {
    if (nameInput.value) touch("fullName");
    renderForm();
  });
  mobileInput.addEventListener("input", function () {
    var d = normalizeMobile(mobileInput.value);
    if (mobileInput.value !== d) mobileInput.value = d;
    duplicate = false;
    if (d.length === 8) touch("mobile");
    renderForm();
  });
  mobileInput.addEventListener("blur", function () {
    if (mobileInput.value) touch("mobile");
    renderForm();
  });
  radios.forEach(function (r) {
    r.addEventListener("change", function () {
      touch("experience");
      renderForm();
    });
  });
  consentInput.addEventListener("change", function () {
    touch("consent");
    renderForm();
  });

  function readTracking() {
    var out = {};
    try {
      var params = new URLSearchParams(window.location.search);
      TRACKING_KEYS.forEach(function (k) {
        var v = params.get(k);
        if (v) out[k] = v.slice(0, 200);
      });
    } catch (e) {
      /* ignore */
    }
    return out;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;
    touched = { fullName: true, mobile: true, experience: true, consent: true };
    if (!renderForm()) return;

    failed = false;
    sending = true;
    renderForm();

    var name = cleanName(nameInput.value);
    var mobile = mobileInput.value;
    fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: name,
        mobile: mobile,
        experience: experienceValue(),
        consent: consentInput.checked,
        language: currentLang,
        pageUrl: window.location.href.slice(0, 500),
        referrer: document.referrer.slice(0, 500),
        tracking: readTracking(),
        website: form.querySelector('input[name="website"]').value
      })
    })
      .then(function (res) {
        return res.json().catch(function () {
          return null;
        });
      })
      .then(function (json) {
        sending = false;
        if (json && json.ok) {
          confirmed = { name: name.split(" ")[0], phone: QATAR_DIAL + " " + formatMobile(mobile) };
          form.hidden = true;
          successCard.hidden = false;
          renderSuccess();
          var title = successCard.querySelector(".form-card__title");
          title.focus({ preventScroll: true });
          successCard.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
        if (json && json.code === "duplicate") duplicate = true;
        else failed = true;
        renderForm();
      })
      .catch(function () {
        sending = false;
        failed = true;
        renderForm();
      });
  });

  /* Floating mobile CTA steps aside while the form is on screen, so it never
     covers the Register button. */
  (function initFloatingCta() {
    var cta = document.querySelector(".floating-cta");
    var section = document.getElementById("register");
    if (!cta || !section || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(
      function (entries) {
        var inView = entries[0].isIntersecting;
        cta.classList.toggle("floating-cta--hidden", inView);
        if (inView) {
          cta.setAttribute("aria-hidden", "true");
          cta.setAttribute("tabindex", "-1");
        } else {
          cta.removeAttribute("aria-hidden");
          cta.removeAttribute("tabindex");
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    ).observe(section);
  })();

  /* ------------------------------------------------------------------------
     Reveal-on-scroll — add .is-visible to .reveal / .stagger on first view.
     Hidden states only apply once <html> has .reveal-on, which is added after
     everything already on screen has been marked visible — so the first
     screen paints in its final state and never waits on this script.
     No getBoundingClientRect: measuring would force the browser to lay out
     the below-the-fold sections that content-visibility lets it skip.
     ---------------------------------------------------------------------- */
  (function initReveal() {
    var nodes = Array.prototype.slice.call(
      document.querySelectorAll(".reveal, .stagger")
    );
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    var initial = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
        else observer.observe(entry.target);
      });
      initial.disconnect();
      document.documentElement.classList.add("reveal-on");
    });
    nodes.forEach(function (n) {
      initial.observe(n);
    });
  })();

  /* ------------------------------------------------------------------------
     Warm the below-the-fold italic font once the page has settled, so it's
     cached before the visitor scrolls to the note that uses it.
     ---------------------------------------------------------------------- */
  window.addEventListener("load", function () {
    var idle =
      window.requestIdleCallback ||
      function (cb) {
        return setTimeout(cb, 1500);
      };
    idle(function () {
      if (document.fonts && document.fonts.load) {
        document.fonts
          .load('italic 300 12px "Plus Jakarta Sans"')
          .catch(function () {});
      }
    });
  });

  /* ------------------------------------------------------------------------
     Boot — the HTML is English already; only switch if Arabic was saved.
     ---------------------------------------------------------------------- */
  var saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  updateLangMenu();
  renderForm(); // picks up values the browser restored (e.g. Back button)
  if (saved === "ar") switchLang("ar");
})();
