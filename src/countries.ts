// Country / dial-code options for the registration form. Qatar is first and is
// the default. `iso` is the ISO 3166-1 alpha-2 code used for the flag image.
export type Country = {
  iso: string;
  dial: string;
  en: string;
  ar: string;
  placeholder: string;
};

export const COUNTRIES: Country[] = [
  { iso: "qa", dial: "+974", en: "Qatar", ar: "قطر", placeholder: "XXXX XXXX" },
  { iso: "sa", dial: "+966", en: "Saudi Arabia", ar: "السعودية", placeholder: "5X XXX XXXX" },
  { iso: "ae", dial: "+971", en: "United Arab Emirates", ar: "الإمارات", placeholder: "5X XXX XXXX" },
  { iso: "kw", dial: "+965", en: "Kuwait", ar: "الكويت", placeholder: "XXXX XXXX" },
  { iso: "bh", dial: "+973", en: "Bahrain", ar: "البحرين", placeholder: "XXXX XXXX" },
  { iso: "om", dial: "+968", en: "Oman", ar: "عُمان", placeholder: "XXXX XXXX" },
  { iso: "jo", dial: "+962", en: "Jordan", ar: "الأردن", placeholder: "7X XXX XXXX" },
  { iso: "eg", dial: "+20", en: "Egypt", ar: "مصر", placeholder: "1X XXXX XXXX" },
  { iso: "lb", dial: "+961", en: "Lebanon", ar: "لبنان", placeholder: "XX XXX XXX" },
  { iso: "iq", dial: "+964", en: "Iraq", ar: "العراق", placeholder: "7XX XXX XXXX" },
  { iso: "ma", dial: "+212", en: "Morocco", ar: "المغرب", placeholder: "6XX XXX XXX" },
  { iso: "in", dial: "+91", en: "India", ar: "الهند", placeholder: "XXXXX XXXXX" },
  { iso: "pk", dial: "+92", en: "Pakistan", ar: "باكستان", placeholder: "3XX XXX XXXX" },
  { iso: "bd", dial: "+880", en: "Bangladesh", ar: "بنغلاديش", placeholder: "1XXX XXX XXX" },
  { iso: "lk", dial: "+94", en: "Sri Lanka", ar: "سريلانكا", placeholder: "7X XXX XXXX" },
  { iso: "np", dial: "+977", en: "Nepal", ar: "نيبال", placeholder: "98X XXX XXXX" },
  { iso: "ph", dial: "+63", en: "Philippines", ar: "الفلبين", placeholder: "9XX XXX XXXX" },
  { iso: "gb", dial: "+44", en: "United Kingdom", ar: "المملكة المتحدة", placeholder: "7XXX XXXXXX" },
];

export const flagUrl = (iso: string) => `https://flagcdn.com/w40/${iso}.png`;
