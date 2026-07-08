// Where registration leads are delivered.
//
// Leads are emailed through Web3Forms (https://web3forms.com). The access key
// below is tied to the primary inbox registered on Web3Forms
// (currently: sithu.aung@startrader.com). It is safe to keep in client code —
// Web3Forms access keys are public by design.
//
// TO GO LIVE: replace the placeholder below with the real access key emailed to
// you by Web3Forms after you verify sithu.aung@startrader.com.
export const WEB3FORMS_ACCESS_KEY = "dc84ab1b-ebc4-4791-a54c-81e71ce7b0d8";

// Extra people who should also receive every lead. Add their emails here later —
// no other code changes needed.
export const LEAD_CC: string[] = [];

// Subject line and sender label shown on the lead notification email.
export const LEAD_SUBJECT = "New Qatar Webinar Registration";
export const LEAD_FROM_NAME = "STARTRADER Qatar Webinar";
