/* ==========================================================================
   STARTRADER — Qatar Live Workshop landing page
   Standalone vanilla JS: copy (i18n), language switch, form, accordion,
   header state, and scroll-reveal animations. No build step, no framework.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Lead delivery (Web3Forms). The access key is public by design.
     TO GO LIVE: replace with the real key emailed to you by Web3Forms.
     ---------------------------------------------------------------------- */
  var WEB3FORMS_ACCESS_KEY = "dc84ab1b-ebc4-4791-a54c-81e71ce7b0d8";
  var LEAD_CC = []; // extra recipients — add emails here, no other changes needed
  var LEAD_SUBJECT = "New Qatar Webinar Registration";
  var LEAD_FROM_NAME = "STARTRADER Qatar Webinar";

  /* ------------------------------------------------------------------------
     All user-facing copy. English/Arabic kept side by side so wording can be
     reviewed in one place. Arabic is transcribed from supplied content.
     ---------------------------------------------------------------------- */
  var translations = {
    en: {
      languageName: "English",
      hero: {
        badge: "Free Live Workshop · Qatar",
        title: {
          main: "You've Been Watching the Markets.",
          accent: "Now Know What Matters.",
        },
        lead: "For people who follow Gold, Oil, and global markets and want a clearer way to interpret what is driving market movement.",
        tagline: ["Walk In With Questions.", "Leave With A Clearer Approach."],
        cta: "Reserve My Free Seat",
        info: {
          date: { label: "05-08-2026", sub: "Wednesday" },
          time: { label: "08:00 PM", sub: "(Qatar Time)" },
          online: { label: "Online", sub: "Free to attend" },
          presenter: { label: "Presented by", sub: "Ghassan Albohtori" },
        },
        trust: {
          points: [
            "Regulated across multiple jurisdictions including ASIC | FSCA | CMA | FSA | FSC",
            "Global Multi-Asset Broker",
            "Official Partner of the NBA",
            "Official Partner of Porsche Carrera Cup Middle East",
          ],
        },
      },
      register: {
        title: "Reserve Your Free Seat",
        fullName: "Full Name",
        fullNamePlaceholder: "Your full name",
        mobile: "Mobile Number",
        phonePlaceholder: "5000 0000",
        email: "Email Address",
        emailPlaceholder: "your@example.com",
        note: "Enter your correct mobile number so our team can send access details, reminders, and contact you before the session to help you attend smoothly.",
        button: "Reserve My Free Seat",
        sending: "Sending…",
        submitted: "You're Registered ✓",
        error: "Something went wrong. Please try again.",
        microcopy: "Takes less than 60 seconds to register",
        caption: "Free registration · Live session · Instant confirmation",
      },
      why: {
        title: "Why this workshop",
        subtitle: "Market moves can be overwhelming. We can help simplify it",
        cards: [
          "Gold, oil, the dollar, the relationship between different assets can be difficult to navigate.",
          "If you feel confused about the market, this workshop is for you.",
          "Start using a clearer process for what to focus on, what to ignore, and what to do next.",
        ],
      },
      who: {
        title: "Who is it for",
        subtitle:
          "This Workshop Is For Market Followers Who Want More Clarity",
        items: [
          "You follow Gold, Oil, Forex, or global market news",
          "You watch market updates but still feel unsure what matters most",
          "You do not want to depend on random opinions or signals",
          "You want a clear way for reading market movement",
          "You have traded before but want more structure",
          "You are considering your next step and want more clarity first",
        ],
        tags: [
          "No advanced knowledge is required.",
          "You just need a better way to deal with market data.",
        ],
      },
      walk: {
        title: "What you'll walk away with",
        subtitle:
          "Leave With a Clear Vision of How Markets Move. By the end of the workshop, you will have:",
        items: [
          "A simple process for deciding what deserves your attention",
          "A clearer way to find useful information about the market",
          "A practical routine for following Gold, Oil, and economic events",
          "A stronger understanding of how experienced participants view markets",
          "More confidence in interpreting market moves",
        ],
      },
      inside: {
        title: "Inside the workshop",
        subtitle: "60-Minute Live Workshop",
        rows: [
          "Why market information creates confusion, and why more news does not always mean better decisions",
          "How experienced market participants filter market noise and focus on what matters first",
          "Applying the process to Gold, Oil, the US dollar, and recent market events",
          "Building a simple market routine you can use before reacting to market moves",
          "Live Q&A with the analyst",
        ],
        cta: "Reserve My Free Seat",
      },
      presenter: {
        eyebrow: "Meet Your Presenter",
        name: "Ghassan Albohtori",
        role: "Senior Market Analyst · STARTRADER",
        bio: [
          "With more than 10 years of experience in financial markets, Ghassan has helped thousands of market followers better understand global economic developments, commodities, and market behavior.",
          "Through hundreds of educational sessions and media appearances, he has become known for simplifying complex market topics and helping participants connect market events with real-world implications.",
          "His interactive approach encourages discussion, practical thinking, and a clearer understanding of how experienced market participants interpret changing market conditions.",
        ],
        stats: [
          { num: "10+", cap: "Years in markets" },
          { num: "100s", cap: "Educational sessions" },
          { num: "1,000s", cap: "Followers guided" },
        ],
      },
      includes: {
        title: "Included With Your Registration",
        items: [
          "Full workshop recording",
          "Presentation slides",
          "Market Decision Checklist",
          "Weekly Market Routine",
          "Economic Event Prioritization Guide",
          "Live Q&A access",
        ],
        note: "These resources are designed to help you keep using the process after the workshop ends.",
      },
      about: {
        title: "About STARTRADER",
        paras: [
          "STARTRADER is a globally regulated multi-asset broker providing access to financial markets, trading technology, analyst-led insights, and market education.",
          "Trusted by clients globally and supported by global partnerships including the NBA and Porsche Carrera Cup Middle East, STARTRADER remains committed to helping traders and market followers better understand financial markets through analyst-led sessions, educational resources, and market insights.",
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            q: "Is this workshop free?",
            a: "Yes. Registration and attendance are free.",
          },
          {
            q: "Do I need trading experience?",
            a: "No. Basic market interest is enough. The workshop is designed for people who already follow markets and want a clearer process.",
          },
          {
            q: "Who is this workshop for?",
            a: "People who follow Gold, Oil, Forex, currencies, or global market news and want a clearer way to deal with market noise.",
          },
          {
            q: "Will I receive trading signals?",
            a: "No. This is not a signals session. The workshop is designed to help you build your own process for reading market movement.",
          },
          {
            q: "What markets will be discussed?",
            a: "Gold, Oil, the US dollar, and major economic events will be used as practical examples.",
          },
          {
            q: "Will there be a recording?",
            a: "Yes. Registered attendees will receive the recording after the session.",
          },
          {
            q: "What language is the workshop in?",
            a: "The workshop will be available in English and Arabic.",
          },
          {
            q: "How will I receive access?",
            a: "Access details and reminders will be sent by email and/or mobile before the workshop. A STARTRADER team member may also contact you if support is needed before the session.",
          },
        ],
      },
      final: {
        title: "Markets Keep Moving, Know What Matters.",
        subtitle:
          "When Gold moves, oil reacts, or new economic news breaks, you should not have to start from zero every time.",
        pills: [
          "Join this free live workshop",
          "Walk in with market noise.",
          "Leave with a clearer process for deciding what matters next.",
          "Registration is free and takes less than a minute.",
        ],
        button: "Reserve My Free Seat",
      },
      footer: {
        disclaimer:
          "Trading involves risk. CFD trading is not suitable for all investors. This workshop is for educational purposes only and does not constitute financial advice, investment advice, or a recommendation to buy or sell any financial product.",
      },
    },

    ar: {
      languageName: "العربية",
      hero: {
        badge: "ندوة مباشرة مجانية · قطر",
        title: {
          main: "تعرف على أهم العوامل التي تؤثر في حركة",
          accent: "الذهب والنفط والأسواق العالمية",
        },
        lead: "ندوة للمهتمين بالذهب والنفط والدولار، لفهم أهم العوامل التي تؤثر على تحركات الأسواق وقراءة الأحداث الاقتصادية بطريقة أوضح. هذه ندوة مباشرة ومنظمة تركز على تحليل السوق.",
        tagline: [
          "اكتشف كيف ينظر المحللون إلى تحركات السوق،",
          "وما العوامل التي تستحق المتابعة قبل اتخاذ أي خطوة.",
        ],
        cta: "احجز مقعدك المجاني",
        info: {
          date: { label: "05-08-2026", sub: "الأربعاء" },
          time: { label: "08:00 مساءً", sub: "بتوقيت قطر" },
          online: { label: "أونلاين", sub: "حضور مجاني" },
          presenter: { label: "مقدمة من قبل", sub: "غسان البحتري" },
        },
        trust: {
          points: [
            "خاضع للتنظيم في عدة ولايات قضائية بما في ذلك ASIC | FSCA | CMA | FSA | FSC",
            "وسيط عالمي للأصول المتعددة",
            "شريك رسمي للرابطة الوطنية لكرة السلة (NBA)",
            "شريك رسمي لبطولة كأس بورش كاريرا الشرق الأوسط",
          ],
        },
      },
      register: {
        title: "احجز مقعدك المجاني",
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "اسمك الكامل",
        mobile: "رقم الجوال",
        phonePlaceholder: "5000 0000",
        email: "البريد الإلكتروني",
        emailPlaceholder: "your@example.com",
        note: "أدخل رقم جوالك الصحيح حتى يتمكن فريقنا من إرسال تفاصيل الدخول والتذكيرات والتواصل معك قبل الجلسة لضمان حضورك بسلاسة.",
        button: "احجز مقعدك المجاني",
        sending: "جارٍ الإرسال…",
        submitted: "تم تسجيلك ✓",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        microcopy: "التسجيل يستغرق أقل من 60 ثانية",
        caption: "تسجيل مجاني · جلسة مباشرة · تأكيد فوري",
      },
      why: {
        title: "لماذا هذه الندوة؟",
        subtitle:
          "قد تبدو تحركات الأسواق معقدة أحيانًا. هذه الندوة ستساعدك على فهم أهم العوامل المؤثرة بطريقة أبسط وأكثر وضوحًا.",
        cards: [
          "العلاقة بين الذهب والنفط والدولار قد تكون غير واضحة للكثير من المتابعين.",
          "إذا كنت تشعر بالحيرة تجاه السوق، فهذه الندوة لك.",
          "تهدف هذه الندوة إلى مساعدتك في استخدام طريقة أكثر وضوحًا لتحديد ما يجب التركيز عليه، وما يجب تجاهله، وما يجب فعله لاحقًا.",
        ],
      },
      who: {
        title: "لمن هذه الندوة؟",
        subtitle: "هذه الندوة مخصصة لمتابعي السوق الراغبين في مزيد من الوضوح",
        items: [
          "تتابع أخبار الذهب، أو النفط، أو الأسهم، أو الأسواق العالمية",
          "تتابع تحديثات السوق ولكنك لا تزال غير متأكد من أهم الأمور",
          "لا ترغب في الاعتماد على آراء أو إشارات عشوائية",
          "تريد طريقة واضحة لقراءة تحركات السوق",
          "تفكر في خطوتك التالية، وتريد فهمًا أوضح قبل اتخاذ أي خطوة",
        ],
        tags: [
          "لا يشترط معرفة مسبقة.",
          "كل ما تحتاجه هو طريقة أفضل للتعامل مع بيانات السوق.",
        ],
      },
      walk: {
        title: "ما الذي ستستفيد منه",
        subtitle:
          "احصل على رؤية واضحة لكيفية تحرك الأسواق. بنهاية هذه الندوة، ستكون لديك:",
        items: [
          "طريقة بسيطة لتحديد ما يستحق اهتمامك",
          "طريقة أوضح للعثور على معلومات مفيدة حول السوق",
          "روتين عملي لمتابعة الذهب والنفط والأحداث الاقتصادية",
          "فهم أعمق لكيفية نظر المستثمرين ذوي الخبرة إلى الأسواق",
          "ثقة أكبر في تفسير تحركات الأسواق",
        ],
      },
      inside: {
        title: "داخل الندوة",
        subtitle: "ندوة مباشرة لمدة 60 دقيقة",
        rows: [
          "لماذا تُسبب معلومات السوق الارتباك، ولماذا لا يعني كثرة الأخبار بالضرورة اتخاذ قرارات أفضل؟",
          "كيف يقوم المستثمرون بتصفية بيانات السوق ويركزون على الأهم أولًا",
          "تطبيق هذه العملية على الذهب والنفط والدولار الأمريكي وأحداث السوق الأخيرة",
          "بناء روتين بسيط للسوق يمكنك استخدامه قبل التفاعل مع تحركات السوق",
          "جلسة أسئلة وأجوبة مباشرة مع المحلل",
        ],
        cta: "احجز مقعدك المجاني",
      },
      presenter: {
        eyebrow: "مقدم الندوة",
        name: "غسان البحتري",
        role: "محلل الأسواق المالية · STARTRADER",
        bio: [
          "بخبرة تزيد عن عشر سنوات في الأسواق المالية، ساعد غسان العديد من المتابعين على فهم التطورات الاقتصادية العالمية والسلع وسلوك السوق بشكل أفضل.",
          "ومن خلال العديد من الجلسات التعليمية والظهور الإعلامي، اشتهر بتبسيط المواضيع المعقدة ومساعدة المشاركين على ربط أحداث السوق بتداعياتها الواقعية.",
          "يشجع أسلوبه التفاعلي على النقاش والتفكير العملي وفهم أعمق لكيفية تفسير المشاركين ذوي الخبرة للسوق المتغير.",
        ],
        stats: [
          { num: "+10", cap: "سنوات في الأسواق" },
          { num: "+100", cap: "جلسة تعليمية" },
          { num: "+1,000", cap: "متابع تمت مساعدته" },
        ],
      },
      includes: {
        title: "ما الذي ستحصل عليه عند التسجيل",
        items: [
          "تسجيل كامل للندوة",
          "شرائح العرض التقديمي",
          "تقييم قرارات السوق",
          "إمكانية طرح الأسئلة والإجابة عليها مباشرة",
        ],
        note: "صُممت هذه الموارد لمساعدتك على مواصلة تطبيق المعلومات التي تحصل عليها خلال الندوة.",
      },
      about: {
        title: "عن ستار تريدر",
        paras: [
          "ستار تريدر هي شركة عالمية مرخصة توفر إمكانية الوصول إلى أسواق متعددة، مع أدوات تداول، دعم، محتوى تحليلي، وبرامج تعليمية تساعد المتداولين على متابعة الأسواق بطريقة أكثر تنظيمًا.",
          "كما أن ستار تريدر شريك رسمي لكل من الرابطة الوطنية لكرة السلة (NBA) وكأس بورش كاريرا الشرق الأوسط.",
        ],
      },
      faq: {
        title: "أسئلة متكررة",
        items: [
          {
            q: "هل هذه الورشة مجانية؟",
            a: "نعم، التسجيل والحضور مجانيان.",
          },
          {
            q: "هل أحتاج إلى خبرة في الأسواق المالية؟",
            a: "لا. يكفي الاهتمام الأساسي بالسوق. صُممت هذه الورشة للأشخاص الذين يتابعون الأسواق بالفعل ويرغبون في اتباع منهجية أكثر وضوحًا.",
          },
          {
            q: "لمن هذه الورشة؟",
            a: "للأشخاص الذين يتابعون أخبار الذهب، والنفط، والأسهم، أو العملات، أو الأسواق العالمية ويرغبون في طريقة أكثر وضوحًا للتعامل مع تقلبات السوق.",
          },
          {
            q: "هل سأتلقى إشارات تداول؟",
            a: "لا. هذه ليست جلسة إشارات. صُممت الورشة لمساعدتك على بناء منهجك الخاص لقراءة حركة السوق.",
          },
          {
            q: "ما هي الأسواق التي سيتم مناقشتها؟",
            a: "سيتم استخدام الذهب، والنفط، والدولار الأمريكي، والأحداث الاقتصادية الرئيسية كأمثلة عملية.",
          },
          {
            q: "هل سيكون هناك تسجيل؟",
            a: "نعم، سيتلقى المسجلون التسجيل بعد انتهاء الندوة.",
          },
          {
            q: "ما هي لغة الندوة؟",
            a: "ستكون الورشة متاحة باللغتين الإنجليزية والعربية.",
          },
          {
            q: "كيف سأحصل على رابط الوصول؟",
            a: "سيتم إرسال تفاصيل الوصول والتذكيرات عبر البريد الإلكتروني و/أو الهاتف قبل بدء الورشة. قد تتواصل معك أحد أعضاء فريق STARTRADER إذا كنت بحاجة إلى دعم قبل بدء الورشة.",
          },
        ],
      },
      final: {
        title: "الذهب والنفط والدولار في حركة مستمرة. تعرّف على ما يستحق المتابعة",
        subtitle:
          "عندما يتحرك الذهب، أو يتفاعل النفط، أو تظهر أخبار اقتصادية جديدة، لا ينبغي أن تبدأ من الصفر في كل مرة.",
        pills: [
          "انضم إلى هذه الندوة المباشرة المجانية",
          "ادخل وسط ضجيج السوق.",
          "اخرج بمفاهيم أوضح لتحديد أولوياتك.",
          "التسجيل مجاني ولا يستغرق أكثر من دقيقة.",
        ],
        button: "احجز مقعدك المجاني",
      },
      footer: {
        disclaimer:
          "ينطوي التداول على مخاطر. لا يُناسب تداول العقود مقابل الفروقات جميع المستثمرين. هذه الورشة لأغراض تعليمية فقط، ولا تُعد نصيحة مالية أو استشارية، ولا توصية بشراء أو بيع أي منتج مالي.",
      },
    },
  };

  /* ------------------------------------------------------------------------
     Internationalisation — swap all [data-i18n] text / placeholders and set
     <html lang>/<html dir>. Elements without a value for the active language
     (e.g. list items that only exist in English) are hidden.
     ---------------------------------------------------------------------- */
  var STORAGE_KEY = "startrader-lang";
  var currentLang = "en";

  function resolve(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
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
      // If a key is missing, keep the element's HTML fallback text so content
      // can never blank out.
      if (value != null) el.textContent = value;
    });

    // Rows that only exist in some languages (e.g. the English "Included" and
    // "Who is it for" lists are longer than the Arabic ones): collapse the
    // whole row when its key is absent in the active language, show otherwise.
    document.querySelectorAll("[data-i18n-optional]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-optional");
      el.style.display = resolve(dict, key) == null ? "none" : "";
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var value = resolve(dict, el.getAttribute("data-i18n-ph"));
      if (value != null) el.setAttribute("placeholder", value);
    });

    updateLangMenu();
    refreshSubmitButton();
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
      applyLang(item.getAttribute("data-lang"));
      setMenuOpen(false);
    });
  });

  /* ------------------------------------------------------------------------
     Header — lift into a solid bar once the page is scrolled
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("header--scrolled", window.scrollY > 8);
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
     Registration form → Web3Forms
     ---------------------------------------------------------------------- */
  var form = document.querySelector(".form-card");
  var submitBtn = form.querySelector('button[type="submit"]');
  var errorEl = form.querySelector(".form-error");
  var status = "idle"; // idle | sending | success | error

  function refreshSubmitButton() {
    var r = translations[currentLang].register;
    submitBtn.textContent =
      status === "sending"
        ? r.sending
        : status === "success"
          ? r.submitted
          : r.button;
    submitBtn.disabled = status === "sending" || status === "success";
    errorEl.style.display = status === "error" ? "" : "none";
    if (status === "error") errorEl.textContent = r.error;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (status === "sending" || status === "success") return;

    var data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", LEAD_SUBJECT);
    data.append("from_name", LEAD_FROM_NAME);
    if (LEAD_CC.length > 0) data.append("cc", LEAD_CC.join(", "));

    // Store the mobile with its country code so the lead is dial-ready.
    var mobile = String(data.get("mobile") || "").trim();
    if (mobile) data.set("mobile", "+974 " + mobile);

    status = "sending";
    refreshSubmitButton();

    fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        if (json && json.success) {
          status = "success";
          form.reset();
        } else {
          status = "error";
        }
        refreshSubmitButton();
      })
      .catch(function () {
        status = "error";
        refreshSubmitButton();
      });
  });

  /* ------------------------------------------------------------------------
     Reveal-on-scroll — add .is-visible to .reveal / .stagger on first view.
     Honours prefers-reduced-motion and degrades where IO is unavailable.
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

    nodes.forEach(function (n) {
      observer.observe(n);
    });
  })();

  /* ------------------------------------------------------------------------
     Boot — restore the saved language (defaults to English)
     ---------------------------------------------------------------------- */
  var saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  applyLang(saved === "ar" ? "ar" : "en");
})();
