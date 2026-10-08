/**
 * Qatar Webinar registrations — Google Sheet web app.
 *
 * Paste this into the Sheet's Extensions → Apps Script editor, set SECRET in
 * Project Settings → Script properties, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Full steps: INTEGRATION.md.
 *
 * The landing page's server (/api/register) calls this with:
 *   { secret, action: "register",  row: {...} }        → { result: "added" | "duplicate" }
 *   { secret, action: "crmStatus", mobileDigits, status } → { result: "added" }
 */

var SHEET_NAME = 'Registrations';

// Column order in the Sheet. Header text is what people see; key is the field
// sent by the landing page.
var COLUMNS = [
  ['submittedAtQatar', 'Submitted (Qatar time)'],
  ['fullName', 'Full Name'],
  ['mobile', 'Mobile'],
  ['experience', 'Trading Experience'],
  ['consent', 'Consent'],
  ['language', 'Page Language'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
  ['pageUrl', 'Page URL'],
  ['referrer', 'Referrer'],
  ['ipCountry', 'IP Country'],
  ['userAgent', 'Device / Browser'],
  ['submittedAt', 'Submitted (UTC, ISO)'],
  ['mobileDigits', 'Mobile (digits, for duplicate check)'],
  ['crmStatus', 'CRM Status'],
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || body.secret !== secret) return reply({ error: 'unauthorized' });

    var lock = LockService.getScriptLock();
    lock.waitLock(15000); // one write at a time, so duplicates can't slip in
    try {
      var sheet = getSheet();
      if (body.action === 'register') return reply(register(sheet, body.row || {}));
      if (body.action === 'crmStatus') return reply(setCrmStatus(sheet, body));
      return reply({ error: 'unknown action' });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return reply({ error: String(err) });
  }
}

function register(sheet, row) {
  var digits = String(row.mobileDigits || '').replace(/\D/g, '');
  if (!/^974\d{8}$/.test(digits)) return { error: 'invalid mobile' };
  if (findRow(sheet, digits) > 0) return { result: 'duplicate' };

  var values = COLUMNS.map(function (c) {
    var v = c[0] === 'mobileDigits' ? digits : row[c[0]];
    v = v == null ? '' : String(v);
    // Stop the Sheet from treating text as a formula (e.g. "+974 …" or "=…").
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  });
  sheet.appendRow(values);
  return { result: 'added' };
}

function setCrmStatus(sheet, body) {
  var digits = String(body.mobileDigits || '').replace(/\D/g, '');
  var r = findRow(sheet, digits);
  if (r > 0) sheet.getRange(r, colIndex('crmStatus')).setValue(String(body.status || ''));
  return { result: 'added' };
}

/** Row number holding this mobile, or -1. Compares digits only. */
function findRow(sheet, digits) {
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var values = sheet.getRange(2, colIndex('mobileDigits'), last - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).replace(/\D/g, '') === digits) return i + 2;
  }
  return -1;
}

function colIndex(key) {
  for (var i = 0; i < COLUMNS.length; i++) if (COLUMNS[i][0] === key) return i + 1;
  throw new Error('no column ' + key);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    // Keep the digits column as text so leading digits are never altered.
    sheet.getRange(1, colIndex('mobileDigits'), sheet.getMaxRows(), 1).setNumberFormat('@');
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
