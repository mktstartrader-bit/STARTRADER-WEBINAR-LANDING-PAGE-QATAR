// Registration rules shared by the form (browser) and /api/register (server),
// so both sides accept exactly the same input. No imports: keep it portable.

export const QATAR_DIAL = "+974";

// Qatar mobile numbers are 8 digits and start with 3, 5, 6 or 7.
// (Landlines start with 4, service numbers with 8 or 9.) To tighten this to
// specific operator ranges later, edit this list only.
export const QATAR_MOBILE_PREFIXES = ["3", "5", "6", "7"];

export const EXPERIENCE_OPTIONS = ["current", "former", "new"] as const;
export type Experience = (typeof EXPERIENCE_OPTIONS)[number];

// English labels used in the Google Sheet and CRM, whatever the page language.
export const EXPERIENCE_LABELS: Record<Experience, string> = {
  current: "I am currently trading",
  former: "I have traded before, but not currently",
  new: "I am new to trading",
};

export type RegistrationInput = {
  fullName: string;
  mobile: string; // 8 national digits, no dial code
  experience: string;
  consent: boolean;
};

export type FieldError =
  | "nameRequired"
  | "nameInvalid"
  | "mobileRequired"
  | "mobileLength"
  | "mobilePrefix"
  | "experienceRequired"
  | "consentRequired";

export type FieldErrors = Partial<
  Record<keyof RegistrationInput, FieldError>
>;

/** Collapse runs of whitespace and trim. */
export function cleanName(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Digits only, at most 8. Also accepts a pasted international number such as
 * "+974 5512 3456" or "00974 5512 3456" by dropping the country code.
 */
export function normalizeMobile(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("00974") && digits.length > 8) digits = digits.slice(5);
  else if (digits.startsWith("974") && digits.length > 8) digits = digits.slice(3);
  return digits.slice(0, 8);
}

/** "55123456" -> "5512 3456" (display only). */
export function formatMobile(digits: string): string {
  return digits.length > 4 ? `${digits.slice(0, 4)} ${digits.slice(4)}` : digits;
}

export function validateName(value: string): FieldError | undefined {
  const name = cleanName(value);
  if (!name) return "nameRequired";
  // At least 2 characters, at least one letter (any script), no digits,
  // and only letters, spaces, apostrophes, hyphens and dots.
  if (
    name.length < 2 ||
    name.length > 100 ||
    !/\p{L}/u.test(name) ||
    !/^[\p{L}\p{M}' .\-’]+$/u.test(name)
  ) {
    return "nameInvalid";
  }
  return undefined;
}

export function validateMobile(value: string): FieldError | undefined {
  if (!value) return "mobileRequired";
  if (!/^\d+$/.test(value) || value.length !== 8) return "mobileLength";
  if (!QATAR_MOBILE_PREFIXES.some((p) => value.startsWith(p))) {
    return "mobilePrefix";
  }
  return undefined;
}

export function validateExperience(value: string): FieldError | undefined {
  return (EXPERIENCE_OPTIONS as readonly string[]).includes(value)
    ? undefined
    : "experienceRequired";
}

export function validateRegistration(input: RegistrationInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = validateName(input.fullName);
  if (name) errors.fullName = name;
  const mobile = validateMobile(input.mobile);
  if (mobile) errors.mobile = mobile;
  const experience = validateExperience(input.experience);
  if (experience) errors.experience = experience;
  if (input.consent !== true) errors.consent = "consentRequired";
  return errors;
}

/** What /api/register answers. */
export type RegisterResponse =
  | { ok: true }
  | { ok: false; code: "duplicate" | "invalid" | "unavailable"; errors?: FieldErrors };
