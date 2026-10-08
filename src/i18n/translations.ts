// All user-facing copy lives here so English/Arabic stay in sync and the
// Arabic wording can be reviewed/corrected in one place. Arabic strings are
// transcribed from the supplied content — verify before go-live.

const en = {
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
      date: { label: "29-09-2026", sub: "Tuesday" },
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
      nbaAlt: "Official Partner of the NBA",
      porscheAlt: "Porsche Carrera Cup Middle East partner",
    },
  },

  register: {
    title: "Register Now",
    subtitle: "Secure your spot for the upcoming webinar",
    name: "Full Name",
    namePlaceholder: "Enter your full name",
    mobile: "Qatar Mobile Number",
    mobilePlaceholder: "XXXX XXXX",
    experience: "What best describes your trading experience?",
    experienceOptions: {
      current: "I am currently trading",
      former: "I have traded before, but not currently",
      new: "I am new to trading",
    },
    errors: {
      nameRequired: "Please enter your full name.",
      nameInvalid: "Please use letters only (at least 2).",
      mobileRequired: "Please enter your Qatar mobile number.",
      mobileLength: "Enter the 8-digit number after +974.",
      mobilePrefix: "Qatar mobile numbers start with 3, 5, 6 or 7.",
      experienceRequired: "Please choose one option.",
      consentRequired: "Please accept the terms to continue.",
    },
    duplicate: "This mobile number is already registered for the webinar.",
    consent: {
      before: "I agree to STARTRADER's ",
      terms: "Terms & Conditions",
      termsUrl: "https://www.startrader.com/legal-documents/",
      and: " and ",
      privacy: "Privacy Policy",
      privacyUrl: "https://www.startrader.com/privacy-policy/",
      after:
        ". I understand that trading CFDs carries a high level of risk and may not be suitable for all investors.",
    },
    button: "Register",
    sending: "Registering…",
    error: "Something went wrong. Please try again.",
    success: {
      title: "You're registered!",
      body: "Thank you, {name}. Your seat for the live workshop is confirmed.",
      detail: "We'll send the joining details to {phone}.",
    },
    haveAccount: "Already have an account?",
    signIn: "Sign In",
    signInUrl: "https://myaccount.startrader.com/login",
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
    subtitle: "This Workshop Is For Market Followers Who Want More Clarity",
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
    toolkit: "Your Market Decision Toolkit",
    receives: "Every registered attendee receives:",
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
};

export type Translation = typeof en;

export type Lang = "en" | "ar";

export { en };

// English ships in the main bundle; Arabic is a separate chunk fetched the
// first time it's needed, then cached here.
const loaded: Partial<Record<Lang, Translation>> = { en };

export function getTranslation(lang: Lang): Translation | undefined {
  return loaded[lang];
}

export async function loadTranslation(lang: Lang): Promise<Translation> {
  const hit = loaded[lang];
  if (hit) return hit;
  const t = (await import("./ar")).default;
  loaded.ar = t;
  return t;
}
